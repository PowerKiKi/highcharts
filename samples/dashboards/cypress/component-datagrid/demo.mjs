import Dashboards from '../../../../code/dashboards/es-modules/masters/dashboards.src.js';
import DataGrid from '../../../../code/datagrid/es-modules/masters/datagrid.src.js';
import Highcharts from '../../../../code/es-modules/masters/highcharts.src.js';
import '../../../../code/es-modules/masters/modules/draggable-points.src.js';

Highcharts.win.Highcharts = Highcharts;


Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid.DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const csvData = document.getElementById('csv').innerText;

Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'connector-1',
            type: 'CSV',
            options: {
                csv: csvData
            }
        }]
    },
    gui: {
        layouts: [{
            rows: [{
                cells: [{
                    id: 'dashboard-col-0'
                }, {
                    id: 'dashboard-col-1'
                }]
            }]
        }]
    },
    components: [
        {
            cell: 'dashboard-col-0',
            connector: {
                id: 'connector-1'
            },
            type: 'Highcharts',
            sync: {
                highlight: true,
                visibility: true,
                extremes: true
            },
            columnAssignment: {
                Food: 'x',
                'Vitamin A': 'y',
                hiddenColumn: null
            },
            chartOptions: {
                xAxis: {
                    type: 'category'
                },
                chart: {
                    animation: false,
                    type: 'column',
                    zoomType: 'x'
                },
                plotOptions: {
                    series: {
                        animation: false,
                        dragDrop: {
                            draggableY: true,
                            dragPrecisionY: 1
                        }
                    }
                }
            }
        }, {
            cell: 'dashboard-col-1',
            type: 'DataGrid',
            connector: {
                id: 'connector-1'
            },
            editable: true,
            sync: {
                highlight: true,
                visibility: true,
                extremes: true
            },
            visibleColumns: ['Food', 'Vitamin A'],
            dataGridOptions: {
                columns: {
                    'Vitamin A': {
                        headerFormat: '{text} (IU)'
                    }
                }
            }
        }
    ]
}, true);
