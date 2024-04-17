/* eslint-disable camelcase */

//
// Application configuration
//

// Support for Nynorsk (nn) and English (en)
const lang = getLanguageSupport('nn');

// Map marker for power generator
const stationMarker = {
    symbol: 'circle',
    radius: 10,
    fillColor: 'green'
};

// Map marker for water reservoir
const reservoirMarker = {
    symbol: 'mapmarker',
    radius: 8,
    fillColor: '#33C'
};

// Map marker for water intake
const intakeMarker = {
    symbol: 'triangle-down',
    radius: 6,
    fillColor: 'red'
};

const defaultZoom = 9;


// Global variables
let dashboard = null; // The Dashboard is created after MQTT connection
let maxConnectedGenerators; // Number of power generators


// Creates the dashboard
async function dashboardCreate() {
    const powerUnit = 'MW';

    const commonChartOptions = {
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                stickyTracking: false
            }
        }
    };

    // Create configuration for power generator units
    const pu = await createPowerGeneratorUnit();

    return await Dashboards.board('container', {
        dataPool: {
            connectors: pu.connectors
        },
        components: pu.components
    });

    function createInfoComponent() {
        return {
            type: 'HTML',
            renderTo: 'el-info',
            chartOptions: {
                chart: {
                    styledMode: false
                }
            }
        };
    }

    async function createPowerGeneratorUnit() {
        const powerGenUnits = {
            connectors: [],
            components: []
        };

        // Information on power station level
        powerGenUnits.components.push(
            createInfoComponent()
        );

        // Map on power station level
        powerGenUnits.components.push(
            await createMapComponent()
        );

        for (let i = 0; i < maxConnectedGenerators; i++) {
            // Power generator index (1...n)
            const pgIdx = i + 1;

            // Data connector ID
            const connId = 'mqtt-data-' + pgIdx;

            // Data connectors
            powerGenUnits.connectors.push(
                createDataConnector(connId)
            );

            // Dash components
            powerGenUnits.components.push(
                createKpiComponent(pgIdx)
            );
            powerGenUnits.components.push(
                createChartComponent(connId, pgIdx)
            );
            powerGenUnits.components.push(
                createDatagridComponent(connId, pgIdx)
            );
        }
        return powerGenUnits;
    }

    function createDataConnector(connId) {
        return {
            id: connId,
            type: 'JSON',
            options: {
                firstRowAsNames: false,
                columnNames: ['time', 'power'],
                data: [
                    // TBD: to be removed? Still seems to be needed...
                    [Date.UTC(2024, 0, 1), 0]
                ],
                // TBD: messes up syncing
                dataModifier: {
                    type: 'Sort',
                    orderByColumn: 'time'
                }
            }
        };
    }

    async function createMapComponent() {
        return {
            type: 'Highcharts',
            renderTo: 'el-map',
            chartConstructor: 'mapChart',
            title: lang.tr('mapTitle'),
            chartOptions: {
                ...commonChartOptions,
                chart: {
                    styledMode: false,
                    animation: false
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        alignTo: 'spacingBox'
                    }
                },
                series: [{
                    type: 'tiledwebmap',
                    provider: {
                        type: 'OpenStreetMap',
                        theme: 'Standard'
                    }
                }, {
                    type: 'mappoint',
                    name: 'stations',
                    color: 'white',
                    dataLabels: {
                        align: 'left',
                        crop: false,
                        enabled: true,
                        format: '{point.name}',
                        padding: 0,
                        verticalAlign: 'bottom',
                        y: -2,
                        x: 10
                    },
                    marker: {
                        symbol: 'square'
                    },
                    tooltip: {
                        headerFormat: '',
                        footerFormat: '',
                        pointFormatter: function () {
                            let rows = '';
                            this.info.forEach(item => {
                                rows += `<tr>
                                    <td>${item.name}</td>
                                    <td>${item.value}</td>
                                    <td>${item.unit}</td>
                                </tr>`;
                            });

                            return `<table class="map-tooltip">
                            <caption>${this.name}</caption>
                            ${rows}
                            </table>`;
                        }
                    },
                    data: [] // Populated on update
                }],
                tooltip: {
                    useHTML: true
                }
            }
        };
    }

    function createKpiComponent(pgIdx) {
        return {
            type: 'KPI',
            renderTo: 'kpi-agg-' + pgIdx,
            title: '',
            chartOptions: {
                ...commonChartOptions,
                chart: {
                    spacing: [8, 8, 8, 8],
                    type: 'solidgauge',
                    styledMode: true
                },
                /*
                plotOptions: {
                    series: {
                        stickyTracking: false,
                    }
                },
                */
                pane: {
                    background: {
                        innerRadius: '90%',
                        outerRadius: '120%',
                        shape: 'arc'
                    },
                    center: ['50%', '70%'],
                    endAngle: 90,
                    startAngle: -90
                },
                yAxis: {
                    title: {
                        text: lang.hdr('P_gen'),
                        y: -80
                    },
                    labels: {
                        distance: '105%',
                        y: 5,
                        align: 'auto'
                    },
                    lineWidth: 2,
                    minorTicks: false,
                    tickWidth: 2,
                    tickAmount: 2,
                    visible: true,
                    min: 0,
                    max: 0 // Populated at update
                },
                series: [{
                    name: lang.tr('P_gen'),
                    enableMouseTracking: true,
                    innerRadius: '90%',
                    radius: '120%'
                }],
                tooltip: {
                    valueSuffix: ' ' + powerUnit
                }
            }
        };
    }

    function createChartComponent(connId, pgIdx) {
        return {
            type: 'Highcharts',
            renderTo: 'chart-agg-' + pgIdx,
            connector: {
                id: connId,
                columnAssignment: [{
                    seriesId: lang.tr('P_gen'),
                    data: ['time', 'power']
                }]
            },
            chartOptions: {
                ...commonChartOptions,
                chart: {
                    type: 'spline',
                    animation: true
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    min: 0,
                    max: 0, // Populated on update
                    title: {
                        text: lang.hdr('P_gen')
                    }
                },
                tooltip: {
                    valueSuffix: ' ' + powerUnit
                }
            }
        };
    }

    function createDatagridComponent(connId, pgIdx) {
        return {
            type: 'DataGrid',
            renderTo: 'data-grid-' + pgIdx,
            connector: {
                id: connId
            },
            dataGridOptions: {
                editable: false,
                columns: {
                    time: {
                        headerFormat: lang.tr('Measure time') + ' (UTC)',
                        cellFormatter: function () {
                            // eslint-disable-next-line max-len
                            return Highcharts.dateFormat('%Y-%m-%d', this.value) + ' ' +
                                Highcharts.dateFormat('%H:%M:%S', this.value);
                        }
                    },
                    power: {
                        headerFormat: lang.tr('P_gen') +
                            ' (' + lang.unit('P_gen') + ')'
                    }
                }
            }
        };
    }
}


async function dashboardUpdate(powerStationData) {
    const dataPool = dashboard.dataPool;

    // Clear content of data table
    await dashboardReset();

    // Update all generators of the power station
    for (let i = 0; i < powerStationData.nGenerators; i++) {
        const pgIdx = i + 1;
        const connId = 'mqtt-data-' + pgIdx;

        const dataTable = await dataPool.getConnectorTable(connId);

        // Get measurement history (24 hours, 10 minute intervals)
        const hist = powerStationData.aggs[i].P_hist;
        let time = new Date(hist.start).valueOf();

        const interval = hist.res * 1000; // Resolution: seconds
        const rowData = [];
        const histLen = hist.values.length;

        for (let j = 0; j < histLen; j++) {
            const power = hist.values[j];

            // Add row with historical data
            rowData.push([time, power]);

            // Next measurement
            time += interval;
        }

        // Add the latest measurement
        const latest = new Date(powerStationData.tst_iso).valueOf();
        const power = powerStationData.aggs[i].P_gen;
        rowData.push([latest, power]);

        // Add all rows to the data table
        await dataTable.setRows(rowData);
    }

    // Refresh all Dashboards components
    await dashboardsComponentUpdate(powerStationData);
}


async function dashboardConnect(powerStationData) {
    // Launch  Dashboard
    if (dashboard === null) {
        dashboard = await dashboardCreate();
    }

    const dataPool = dashboard.dataPool;
    for (let i = 0; i < powerStationData.nGenerators; i++) {
        const puId = i + 1;
        const dataTable = await dataPool.getConnectorTable('mqtt-data-' + puId);

        // Clear the data
        await dataTable.deleteRows();
    }

    await dashboardsComponentUpdate(powerStationData);
}


async function dashboardsComponentUpdate(powerStationData) {
    function getComponent(dashboard, id) {
        return dashboard.mountedComponents.map(c => c.component)
            .find(c => c.options.renderTo === id);
    }

    function getInfoRecord(item, fields) {
        const ret = [];
        fields.forEach(field => {
            ret.push({
                name: lang.tr(field),
                value: item !== null && item[field] !== null ?
                    item[field] : '-',
                unit: lang.unit(field)
            });
        });
        return ret;
    }

    function getHeaderFields(fields) {
        const cols = getInfoRecord(null, fields);
        let colHtml = '';

        cols.forEach(col => {
            const name = lang.tr(col.name);
            colHtml += `<th>${name}</th>`;
        });

        return colHtml;
    }

    function getUnitFields(fields) {
        const cols = getInfoRecord(null, fields);
        let colHtml = '';

        cols.forEach(col => {
            colHtml += `<th>${col.unit}</th>`;
        });

        return colHtml;
    }

    function getDataFields(item, fields) {
        const cols = getInfoRecord(item, fields);
        let colHtml = '';

        cols.forEach(col => {
            colHtml += `<td>${col.value}</td>`;
        });

        return colHtml;
    }

    function getIntakeHtml(powerStationData) {
        if (powerStationData.nIntakes === 0) {
            const str = lang.tr('No intakes');

            return `<h3 class="intake">${str}</h3>`;
        }

        // Description
        let html = '';
        if (powerStationData.description !== null) {
            html = `<span class="pw-descr">
            ${powerStationData.description}</span>`;

        }
        const intake = lang.tr('intakes');
        const name = lang.tr('Name');

        // Fields to display
        const fields = ['q_min_set', 'q_min_act'];
        let colHtml = getHeaderFields(fields);
        const colHtmlUnit = getUnitFields(fields);

        html += `<table class="intake"><caption>${intake}</caption>
            <tr><th>${name}</th>${colHtml}</tr>
            <tr class="unit"><th></th>${colHtmlUnit}</tr>`;

        for (let i = 0; i < powerStationData.nIntakes; i++) {
            const item = powerStationData.intakes[i];
            const name = item.name.replace('_', ' ');

            colHtml = getDataFields(item, fields);
            html += `<tr><td>${name}</td>${colHtml}</tr>`;
        }
        html += '</table>';

        return html;
    }

    function getReservoirHtml(powerStationData) {
        if (powerStationData.nReservoirs === 0) {
            const str = lang.tr('No connected reservoirs');

            return `<h3 class="intake">${str}</h3>`;
        }

        // Fields to display in table
        const fields = [
            'volume', 'drain', 'energy',
            'h', 'LRV', 'HRV', 'net_flow'
        ];
        let colHtml = getHeaderFields(fields);
        const colHtmlUnit = getUnitFields(fields);
        const name = lang.tr('Name');
        const res = lang.tr('reservoirs');

        let html = `<table class="intake"><caption>${res}</caption>
            <tr><th>${name}</th>${colHtml}</tr>
            <tr class="unit"><th></th>${colHtmlUnit}</tr>`;

        for (let i = 0; i < powerStationData.nReservoirs; i++) {
            const item = powerStationData.reservoirs[i];
            colHtml = getDataFields(item, fields);

            html += `<tr><td>${item.name}</td>${colHtml}</tr>`;
        }
        html += '</table>';

        return html;
    }

    async function addIntakeMarkers(mapComp, powerStationData) {
        // Fields to display in tooltip
        const fields = ['q_min_set', 'q_min_act'];

        for (let i = 0; i < powerStationData.nIntakes; i++) {
            const item = powerStationData.intakes[i];
            if (item.location === null) {
                continue;
            }

            // Add reservoir to map
            await mapComp.addPoint({
                name: item.name,
                lon: item.location.lon,
                lat: item.location.lat,
                marker: intakeMarker,
                info: getInfoRecord(item, fields)
            });
        }
    }

    async function addReservoirMarkers(mapComp, powerStationData) {
        // Fields to display in tooltip
        const fields = ['h', 'volume', 'drain'];

        for (let i = 0; i < powerStationData.nReservoirs; i++) {
            const item = powerStationData.reservoirs[i];
            if (item.location === null) {
                continue;
            }

            // Add reservoir to map
            await mapComp.addPoint({
                name: item.name,
                lon: item.location.lon,
                lat: item.location.lat,
                marker: reservoirMarker,
                info: getInfoRecord(item, fields)
            });
        }
    }

    async function updateMap(powerStationData) {
        // Map
        const mapComp = getComponent(dashboard, 'el-map');
        const mapPoints = mapComp.chart.series[1];

        // Erase existing points
        while (mapPoints.data.length > 0) {
            await mapPoints.data[0].remove();
        }

        const fields = ['q_turb', 'P_gen'];
        const item = powerStationData.aggs[0];

        // Power station marker
        const location = powerStationData.location;
        await mapPoints.addPoint({
            name: powerStationData.name,
            lon: location.lon,
            lat: location.lat,
            marker: stationMarker,
            info: getInfoRecord(item, fields)
        });

        // Add reservoir markers if present
        await addReservoirMarkers(mapPoints, powerStationData);

        // Add intake markers if present
        await addIntakeMarkers(mapPoints, powerStationData);

        // Adjust map view to new location
        const mapView = mapComp.chart.mapView;
        await mapView.setView(
            [location.lon, location.lat],
            defaultZoom
        );
    }

    const stationName = powerStationData.name;
    const location = powerStationData.location;

    // Update map
    await updateMap(powerStationData);

    // Information
    const posInfo = `${location.lon} (lon.), ${location.lat} (lat.)`;

    const infoComp = getComponent(dashboard, 'el-info');
    await infoComp.update({
        title: stationName
    });

    const intakeHtml = getIntakeHtml(powerStationData);
    const reservoirHtml = getReservoirHtml(powerStationData);

    const el = document.querySelector(
        'div#el-info .highcharts-dashboards-component-content'
    );
    el.innerHTML = `<div id="info-container">
    <h3>${posInfo}</h3>
    ${intakeHtml}
    ${reservoirHtml}
    </div>
    `;

    // Update dashboard components
    for (let i = 0; i < powerStationData.nGenerators; i++) {
        const aggInfo = powerStationData.aggs[i];
        const pgIdx = i + 1;
        const connId = 'mqtt-data-' + pgIdx;
        const maxPower = aggInfo.P_max;
        const chartOptions = {
            yAxis: {
                max: maxPower
            }
        };

        // Add generator name only if the station has multiple generators
        let aggName = stationName;
        if (powerStationData.nGenerators > 1) {
            aggName += ` "${aggInfo.name}"`;
        }

        // Get data
        const dataTable = await dashboard.dataPool.getConnectorTable(connId);
        const rowCount = await dataTable.getRowCount();

        // KPI
        const kpiComp = getComponent(dashboard, 'kpi-agg-' + pgIdx);
        await kpiComp.update({
            value: rowCount > 0 ?
                dataTable.getCellAsNumber('power', rowCount - 1) : 0,
            chartOptions: chartOptions,
            title: aggName
        });

        // Chart
        const chartComp = getComponent(dashboard, 'chart-agg-' + pgIdx);
        await chartComp.update({
            connector: {
                id: connId
            },
            chartOptions: chartOptions,
            title: aggName
        });

        // Datagrid
        const gridComp = getComponent(dashboard, 'data-grid-' + pgIdx);
        await gridComp.update({
            connector: {
                id: connId
            },
            title: aggName
        });
    }
}


async function dashboardReset() {
    const dataPool = dashboard.dataPool;
    for (let i = 0; i < maxConnectedGenerators; i++) {
        const puId = i + 1;
        const dataTable = await dataPool.getConnectorTable('mqtt-data-' + puId);

        // Clear the data
        await dataTable.deleteRows();
        await dataTable.modified.deleteRows();
    }
}


function uiSetComponentVisibility(visible, nUnits = 0) {
    const powUnitCells = document.getElementsByClassName('el-aggr');

    for (let i = 0; i < powUnitCells.length; i++) {
        const el = powUnitCells[i];
        const unitVisible = visible && i < nUnits;

        el.style.display = unitVisible ? 'flex' : 'none';
    }

    let el = document.getElementById('el-info');
    el.style.display = visible ? 'flex' : 'none';

    el = document.getElementById('el-map');
    el.style.display = visible ? 'flex' : 'none';
}


/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

// Documentation for PAHO MQTT client:
//     https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js/
//     https://eclipse.dev/paho/files/jsdoc/Paho.MQTT.Client.html

// MQTT handle
let mqtt = null;

// MQTT connection parameters
const host = 'mqtt.sognekraft.no';
const port = 8083;
let mqttActiveTopic = null;
const mqttQos = 0;

// Authentication (from popup dialog)
let user = null;
let password = null;

// Connection status
let connectFlag;
let nMsg;
let nGenerators;

// Connection status UI
const connectBar = {
    offColor: '', // Populated from CSS
    onColor: 'hsla(202.19deg, 100%, 37.65%, 1)',
    errColor: 'red'
};

// Overview of power stations, as MQTT topic.
const powerStationLookup = {
    'Årøy I': {
        topic: 'prod/SOG/aaroy_I/overview'
    },
    'Årøy II': {
        topic: 'prod/SOG/aaroy_II/overview'
    },
    Mundalselvi: {
        topic: 'prod/SOG/mundalselvi/overview'
    },
    Dyrnesli: {
        topic: 'prod/VAD/dyrnesli/overview'
    },
    Leikanger: {
        topic: 'prod/LEIK/leikanger/overview'
    },
    Fosseteigen: {
        topic: 'prod/KUV/fosseteigen/overview'
    },
    Nydalselva: {
        topic: 'prod/NYD/nydalselva/overview'
    }
};

/*
 *  Application interface
 */
window.onload = () => {
    // Initialize the data transport
    mqttInit();

    // Determine the maximum number of supported power generators (aggregat)
    // per power station. The number is determined by the definition in the HTML file.
    maxConnectedGenerators = document.getElementsByClassName('el-aggr').length;

    // UI objects
    const el = document.getElementById('connect-bar');
    connectBar.offColor = el.style.backgroundColor; // From CSS

    const dropDownButton = document.getElementById('dropdown-button');

    // Language dependencies
    dropDownButton.title = lang.tr('powerStationHelp');
    dropDownButton.innerHTML = lang.tr('Power station') + '&nbsp;&#9662;';
    document.getElementById('user-label').innerText = lang.tr('Username');
    document.getElementById('pass-label').innerText = lang.tr('Password');
    document.getElementById('auth-submit').value = lang.tr('Apply');

    // Authentication dialog
    const authDialog = document.getElementById('auth-dialog');
    document.getElementById('auth-submit').onclick = () => {
        user = document.getElementById('username').value;
        password = document.getElementById('password').value;

        mqttConnect();
        authDialog.style.display = 'none';
    };

    // Get the element that closes the authentication popup
    const authClose = document.getElementById('auth-close');

    // When the user clicks on (x), close the authentication popup
    authClose.onclick = onConnectCancel;

    // Populate power station selection menu
    const dropdownDiv = document.getElementById('dropdownContent');
    let keyId = 1; // Keyboard shortcut ALT + x
    for (const key of Object.keys(powerStationLookup)) {
        dropdownDiv.innerHTML += `<a class="dropdown-select" href="#" accessKey="${keyId}">${key}</a>`;
        keyId += 1;
    }

    // Custom click handler
    window.onclick = event => {
        if (event.target !== dropDownButton) {
            // Power station menu items
            if (event.target.matches('.dropdown-select')) {
                const name = event.target.innerText;
                if (name in powerStationLookup) {
                    onStationClicked(name);
                }
            }

            // Hide the power station menu if the user clicks outside of it
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const item = dropdowns[i];
                if (item.classList.contains('show')) {
                    item.classList.remove('show');
                }
            }

            // Close authentication dialog
            if (event.target === authDialog) {
                onConnectCancel();
            }
        }
    };

    // Hide the logo on small devices
    window.onresize = () => {
        uiSetLogoVisibility(connectFlag);
    };
};


/*
 *  Application user interface
 */
function onConnectClicked() {
    // Connect to (or disconnect from) the MQTT server
    if (connectFlag) {
        mqttDisconnect();
    } else {
        if (user === null) {
            // Show authentication dialog
            document.getElementById('auth-dialog').style.display = 'block';
        } else {
            mqttConnect();
        }
    }
}


function onConnectCancel() {
    document.getElementById('auth-dialog').style.display = 'none';
    document.getElementById('connect-toggle').checked = false;
    user = null;
    password = null;
}


function onStationSelectClicked() {
    // Reveals the dropdown list of power stations
    document.getElementById('dropdownContent').classList.toggle('show');
}


async function onStationClicked(station) {
    nGenerators = 0;

    // Change topic to currently selected power station
    await mqttResubscribe(powerStationLookup[station].topic);
}


/*
 *  MQTT API
 */
function mqttInit() {
    const cname = 'orderform-' + Math.floor(Math.random() * 10000);

    // eslint-disable-next-line no-undef
    mqtt = new Paho.MQTT.Client(host, port, cname);

    // Register callbacks
    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;

    // Connection status
    nMsg = 0;
    nGenerators = 0;
    connectFlag = false;
}


function mqttConnect() {
    if (connectFlag) {
        uiShowError('Already connected');
        return;
    }

    // Connect to broker
    mqtt.connect({
        useSSL: true,
        timeout: 5,
        cleanSession: true,
        onSuccess: onConnect,
        onFailure: onFailure,
        userName: user,
        password: password
    });
}


function mqttSubscribe(topic) {
    if (connectFlag) {
        // Subscribe to new topic
        mqtt.subscribe(topic, {
            qos: mqttQos
        });
        console.log('Subscribed: ' + topic);
    } else {
        uiShowError('Not connected, operation not possible');
    }
}


async function mqttResubscribe(newTopic) {
    if (connectFlag) {
        // Unsubscribe any existing topics
        const unsubscribeOptions = {
            onSuccess: async () => {
                console.log('Unsubscribed: ' + mqttActiveTopic);
                mqttSubscribe(newTopic);
                mqttActiveTopic = newTopic;
            },
            onFailure: () => {
                uiShowError('Unsubscribe failed');
            },
            timeout: 10
        };
        mqtt.unsubscribe('/#', unsubscribeOptions);
    } else {
        uiShowError('Not connected, operation not possible');
    }
}


function mqttUnubscribe() {
    if (connectFlag) {
        // Unsubscribe any existing topics
        console.log('Unsubscribe: ' + mqttActiveTopic);
        mqtt.unsubscribe(mqttActiveTopic);
    } else {
        uiShowError('Not connected, operation not possible');
    }
}


function mqttDisconnect() {
    if (!connectFlag) {
        uiShowError('Already disconnected');
        return;
    }
    // Unsubscribe any existing topics
    mqtt.unsubscribe('/#');

    // Disconnect
    uiShowStatus('');
    mqtt.disconnect();

    // Hide Dashboard components
    uiSetComponentVisibility(false);
}


/*
 *  MQTT callbacks
 */
async function onConnectionLost(resp) {
    nGenerators = 0;
    connectFlag = false;
    uiSetConnectStatus(false);

    if (resp.errorCode !== 0) {
        uiShowError(resp.errorMessage);
    }
    onConnectCancel();
}


function onFailure(resp) {
    nGenerators = 0;
    connectFlag = false;

    uiSetConnectStatus(false);
    uiShowError(resp.errorMessage);
    onConnectCancel();
}


async function onMessageArrived(mqttPacket) {
    if (mqttActiveTopic !== mqttPacket.destinationName) {
        console.log('Topic ignored: ' + mqttPacket.destinationName);
        return;
    }

    // Process incoming active topic
    const powerStationData = JSON.parse(mqttPacket.payloadString);
    powerStationData.nGenerators = powerStationData.aggs.length;
    powerStationData.nIntakes = powerStationData.intakes.length;
    powerStationData.nReservoirs = powerStationData.reservoirs.length;

    if (nMsg === 0) {
        // Connect and create the Dashboard when the first packet arrives
        await dashboardConnect(powerStationData);
    }

    // Has a power generator been added or removed?
    if (nGenerators !== powerStationData.nGenerators) {
        nGenerators = powerStationData.nGenerators;
        uiSetComponentVisibility(true, powerStationData.nGenerators);
    }

    // Update Dashboard
    dashboardUpdate(powerStationData);

    // Update header
    uiShowStatus(`<b>${powerStationData.name}</b>`);

    nMsg++;
}


async function onConnect() {
    // Connection successful
    connectFlag = true;
    nGenerators = 0;

    console.log('Connected to ' + host + ' on port ' + port);
    uiSetConnectStatus(true);
    uiShowStatus('noStation');

    // Subscribe if a topic exists
    if (mqttActiveTopic !== null) {
        mqttSubscribe(mqttActiveTopic);
    }
}

/*
 *  Custom UI (not Dashboard)
 */
function uiSetConnectStatus(connected) {
    let el = document.getElementById('connect-bar');
    el.style.backgroundColor = connected ? connectBar.onColor : connectBar.offColor;

    el = document.getElementById('dropdown-container');
    el.style.visibility = connected ? 'visible' : 'hidden';

    el = document.getElementById('connect-toggle');
    el.checked = connected;

    // Use logo image only when connected, otherwise text
    uiSetLogoVisibility(connected);
}


function uiSetLogoVisibility(connected) {
    // Use logo image only when connected and on a wider screen,
    // otherwise text only.
    let el = document.getElementById('logo-img');
    if (el) {
        const showLogo = (window.innerWidth > 576) && connected;
        el.style.display = showLogo ? 'inline' : 'none';

        el = document.getElementById('logo-text');
        el.style.display = showLogo ? 'none' : 'block';
    }
}


function uiShowStatus(msg) {
    document.getElementById('connect-status').innerHTML = lang.tr(msg);
}


function uiShowError(msg) {
    const el = document.getElementById('connect-bar');

    el.style.backgroundColor = connectBar.errColor;
    document.getElementById('connect-status').innerHTML = 'Error: ' + msg;
}


//
// Language support
//
function getLanguageSupport(lang) {
    return {
        // Selected language
        current: lang,

        // Translations, fixed strings
        Username: {
            nn: 'Brukarnamn'
        },
        Password: {
            nn: 'Passord'
        },
        Apply: {
            nn: 'Bruk'
        },
        Name: {
            nn: 'Namn'
        },
        'Power station': {
            nn: 'Kraftverk'
        },
        'Location unknown': {
            nn: 'Ukjend plassering'
        },
        'No connected reservoirs': {
            nn: 'Ingen tilknyta magasin'
        },
        'No intakes': {
            nn: 'Ingen inntak'
        },
        mapTitle: {
            nn: 'Kraftverk med magasin og inntak',
            en: 'Power station with water reservoirs and intake'
        },
        noStation: {
            nn: 'Ingen kraftverk valgd',
            en: 'No power station selected'
        },
        powerStationHelp: {
            en: 'Click to select a power station',
            nn: 'Klikk for å velgja kraftstasjon'
        },

        // Power generation parameters
        'Measure time': {
            nn: 'Måletidspunkt',
            unit: 'UTC'
        },
        P_gen: {
            nn: 'Effekt',
            en: 'Generated power',
            unit: 'MW'
        },
        q_turb: {
            nn: 'Vassforbruk',
            en: 'Water usage',
            unit: 'm3/sek'
        },
        h: {
            nn: 'Høgde',
            en: 'Elevation',
            unit: 'moh'
        },
        location: {
            nn: 'Plassering',
            en: 'Location',
            unit: 'lat/lon'
        },
        volume: {
            nn: 'Volum',
            en: 'Volume',
            unit: 'mill. m3'
        },
        intakes: {
            nn: 'Inntak',
            en: 'Intakes'
        },
        reservoirs: {
            nn: 'Vassmagasin',
            en: 'Reservoirs'
        },
        drain: {
            nn: 'Avlaup',
            en: 'Drain',
            unit: 'm3/sek'
        },
        inflow: {
            nn: 'Tilsig',
            en: 'Inflow',
            unit: 'm3/sek'
        },
        level: {
            nn: 'Nivå',
            en: 'level',
            unit: 'moh'
        },
        HRV: {
            nn: 'Høgaste regulerte vasstand',
            en: 'Highest regulated level',
            unit: 'moh'
        },
        LRV: {
            nn: 'Lågaste regulerte vasstand',
            en: 'Lowest regulated level',
            unit: 'moh'
        },
        energy: {
            nn: 'Energi',
            en: 'Energy',
            unit: 'MWh'
        },
        net_flow: {
            nn: 'Netto endring',
            en: 'Net flow',
            unit: 'm3/sek'
        },
        q_min_set: {
            nn: 'Minstevassføring krav',
            en: 'Required minimal flow',
            unit: 'm3/sek'
        },
        q_min_act: {
            nn: 'Minstevassføring målt',
            en: 'Measured minimal flow',
            unit: 'm3/sek'
        },

        // Translator function
        tr: function (str) {
            const item = str in this ? this[str] : null;
            if (item === null) {
                // No translation exists, return original
                return str;
            }

            let ret = str;
            if (this.current in this[str]) {
                ret = this[str][this.current];
            }

            return ret;
        },

        // Get measurement unit (if applicable)
        unit: function (id) {
            if (id in this) {
                if ('unit' in this[id]) {
                    return this[id].unit;
                }
            }
            return '';
        },

        // Name + unit
        hdr: function (id) {
            return this.tr(id) + ' (' + this.unit(id) + ')';
        }
    };
}
