const chartOptions = {
    series: [{
        data: [1, 2, 3, 4]
    }]
};

const stockChartOptions = {
    title: {
        text: 'AAPL stock price by minute'
    },
    series: [{
        name: 'AAPL',
        type: 'candlestick',
        data: [
            [1318606740000, 420.15, 420.25, 420, 420.09],
            [1318606800000, 420.09, 420.15, 419.88, 420.04],
            [1318606860000, 420.04, 420.1, 419.88, 420.07],
            [1318606920000, 420.07, 420.21, 420.02, 420.16],
            [1318606980000, 420.14, 420.31, 420.01, 420.12],
            [1318607040000, 420.12, 420.29, 420.03, 420.15],
            [1318607100000, 420.15, 420.285, 420.05, 420.248],
            [1318607160000, 420.2588, 420.38, 420.11, 420.2556],
            [1318607220000, 420.24, 420.45, 420.15, 420.3601],
            [1318607280000, 420.4, 420.43, 420.15, 420.24],
            [1318607340000, 420.26, 420.319, 420.05, 420.12],
            [1318607400000, 420.13, 420.23, 420, 420.05],
            [1318607460000, 420.05, 420.29, 420, 420.27],
            [1318607520000, 420.258, 420.35, 420.17, 420.21],
            [1318607580000, 420.2, 420.35, 420.18, 420.28],
            [1318607640000, 420.3, 420.6, 420.29, 420.5958],
            [1318607700000, 420.58, 421.14, 420.575, 421.0975],
            [1318607760000, 421.07, 421.49, 420.7, 421.46],
            [1318607820000, 421.4601, 421.71, 421.36, 421.69],
            [1318607880000, 421.69, 421.94, 421.663, 421.94],
            [1318607940000, 421.94, 422, 421.8241, 422]
        ],
        tooltip: {
            valueDecimals: 2
        }
    }]
};

Dashboards.board('container', {
    gui: {
        layouts: [{
            id: 'layout-1',
            rows: [{
                cells: [{
                    id: 'dashboard-col-0'
                }, {
                    id: 'dashboard-col-1'
                }]
            }]
        }]
    },
    components: [{
        renderTo: 'dashboard-col-0',
        type: 'Highcharts',
        chartConstructor: 'chart',
        chartOptions
    }, {
        renderTo: 'dashboard-col-1',
        type: 'Highcharts',
        chartConstructor: 'stockChart',
        chartOptions: stockChartOptions
    }]
});
