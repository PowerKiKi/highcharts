Highcharts.theme = {
    chart: {
        style: {
            fontFamily: 'Roboto Condensed'
        },
        backgroundColor: '#323331'
    },
    yAxis: {
        gridLineColor: '#B71C1C',
        labels: {
            format: '{value} C',
            useHTML: true
        }
    },
    plotOptions: {
        series: {
            showInLegend: false
        }
    }
};

Highcharts.setOptions(Highcharts.theme);

Highcharts.chart('container', {
    title: {
        text: 'Animated Spiral',
        style: {
            color: '#909090'
        }
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    plotOptions: {
        series: {
            turboThreshold: 0,
            marker: {
                enabled: false
            },
            animation: true,
            pointIntervalUnit: 'month'
        }
    },
    chart: {
        polar: true,
        events: {
            load: function () {
                console.log('ready');
                const duration = 16 * 1000;
                const delta = duration / this.series.length;
                let delay = 2000;

                this.series.map(function (e) {
                    setTimeout(function () {
                        e.update({
                            color: e.options.color2,
                            enableMouseTracking: true
                        });
                        e.chart.setTitle({
                            text: e.name
                        });
                    }, delay);
                    delay = delay + delta;
                    return delay;
                });
            }
        }
    },
    legend: {
        enabled: false
    },
    xAxis: {
        type: 'datetime',
        min: 0,
        max: 31536000000,
        labels: {
            format: '{value:%B}'
        }
    },
    tooltip: {
        headerFormat: '{point.key}',
        xDateFormat: '%B',
        pointFormat: ' {series.name}: {point.y}'
    },
    series: [
        {
            year: 1850,
            data: [
                -0.702, -0.284, -0.732, -0.57, -0.325, -0.213, -0.128, -0.233,
                -0.444, -0.452, -0.19, -0.268
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(87,16,107,0.65)',
            name: 1850
        },
        {
            year: 1851,
            data: [
                -0.303, -0.362, -0.485, -0.445, -0.302, -0.189, -0.215, -0.153,
                -0.108, -0.063, -0.03, -0.067
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(168,46,93,0.65)',
            name: 1851
        },
        {
            year: 1852,
            data: [
                -0.308, -0.477, -0.505, -0.559, -0.209, -0.038, -0.016, -0.195,
                -0.125, -0.216, -0.187, 0.083
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(168,46,93,0.65)',
            name: 1852
        },
        {
            year: 1853,
            data: [
                -0.177, -0.33, -0.318, -0.352, -0.268, -0.179, -0.059, -0.148,
                -0.409, -0.359, -0.256, -0.444
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(98,20,108,0.65)',
            name: 1853
        },
        {
            year: 1854,
            data: [
                -0.36, -0.28, -0.284, -0.349, -0.23, -0.215, -0.228, -0.163,
                -0.115, -0.188, -0.369, -0.232
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(142,36,102,0.65)',
            name: 1854
        },
        {
            year: 1855,
            data: [
                -0.176, -0.4, -0.303, -0.217, -0.336, -0.16, -0.268, -0.159,
                -0.339, -0.211, -0.212, -0.51
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(129,31,106,0.65)',
            name: 1855
        },
        {
            year: 1856,
            data: [
                -0.119, -0.373, -0.513, -0.371, -0.119, -0.288, -0.297, -0.305,
                -0.459, -0.384, -0.608, -0.44
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(57,12,92,0.65)',
            name: 1856
        },
        {
            year: 1857,
            data: [
                -0.512, -0.344, -0.434, -0.646, -0.567, -0.31, -0.544, -0.327,
                -0.393, -0.467, -0.665, -0.356
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(15,7,40,0.65)',
            name: 1857
        },
        {
            year: 1858,
            data: [
                -0.532, -0.707, -0.55, -0.517, -0.651, -0.58, -0.324, -0.28,
                -0.339, -0.2, -0.644, -0.3
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(4,2,14,0.65)',
            name: 1858
        },
        {
            year: 1859,
            data: [
                -0.307, -0.192, -0.334, -0.203, -0.31, -0.25, -0.285, -0.104,
                -0.575, -0.255, -0.316, -0.363
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(95,19,107,0.65)',
            name: 1859
        },
        {
            year: 1860,
            data: [
                -0.186, -0.428, -0.643, -0.335, -0.29, -0.307, -0.116, -0.193,
                -0.229, -0.198, -0.508, -0.752
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(90,17,107,0.65)',
            name: 1860
        },
        {
            year: 1861,
            data: [
                -0.89, -0.506, -0.465, -0.395, -0.761, -0.183, -0.221, -0.107,
                -0.331, -0.355, -0.424, -0.253
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(54,12,89,0.65)',
            name: 1861
        },
        {
            year: 1862,
            data: [
                -0.749, -0.773, -0.402, -0.24, -0.232, -0.338, -0.34, -0.694,
                -0.413, -0.42, -0.753, -0.889
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(29,12,68,0.65)',
            name: 1862
        },
        {
            year: 1863,
            data: [
                0.131, -0.02, -0.356, -0.241, -0.32, -0.402, -0.416, -0.321,
                -0.324, -0.381, -0.333, -0.351
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(74,12,106,0.65)',
            name: 1863
        },
        {
            year: 1864,
            data: [
                -0.937, -0.63, -0.509, -0.538, -0.449, -0.162, -0.146, -0.31,
                -0.439, -0.701, -0.468, -0.602
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(9,4,25,0.65)',
            name: 1864
        },
        {
            year: 1865,
            data: [
                -0.093, -0.602, -0.639, -0.224, -0.26, -0.27, -0.128, -0.207,
                -0.075, -0.272, -0.191, -0.338
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(132,32,105,0.65)',
            name: 1865
        },
        {
            year: 1866,
            data: [
                0.039, -0.212, -0.595, -0.263, -0.528, 0.108, 0.027, -0.261,
                -0.225, -0.417, -0.301, -0.337
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(113,25,108,0.65)',
            name: 1866
        },
        {
            year: 1867,
            data: [
                -0.305, 0.022, -0.714, -0.251, -0.542, -0.295, -0.231, -0.225,
                -0.095, -0.179, -0.309, -0.624
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(111,24,108,0.65)',
            name: 1867
        },
        {
            year: 1868,
            data: [
                -0.704, -0.466, -0.07, -0.371, -0.069, -0.176, 0.147, -0.037,
                -0.196, -0.232, -0.5, -0.12
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(176,50,89,0.65)',
            name: 1868
        },
        {
            year: 1869,
            data: [
                -0.259, 0.27, -0.589, -0.224, -0.281, -0.37, -0.286, -0.072,
                -0.186, -0.422, -0.375, -0.355
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(105,23,108,0.65)',
            name: 1869
        },
        {
            year: 1870,
            data: [
                -0.078, -0.45, -0.406, -0.214, -0.165, -0.209, 0.016, -0.262,
                -0.263, -0.393, -0.164, -0.723
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(134,33,104,0.65)',
            name: 1870
        },
        {
            year: 1871,
            data: [
                -0.527, -0.546, 0.013, -0.144, -0.315, -0.223, -0.011, -0.221,
                -0.457, -0.479, -0.54, -0.56
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(46,12,82,0.65)',
            name: 1871
        },
        {
            year: 1872,
            data: [
                -0.305, -0.402, -0.471, -0.15, -0.039, -0.208, -0.115, -0.027,
                -0.128, -0.225, -0.243, -0.424
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(148,37,100,0.65)',
            name: 1872
        },
        {
            year: 1873,
            data: [
                -0.018, -0.345, -0.275, -0.521, -0.411, -0.258, -0.162, -0.161,
                -0.357, -0.402, -0.466, -0.277
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(82,14,107,0.65)',
            name: 1873
        },
        {
            year: 1874,
            data: [
                0.054, -0.44, -0.562, -0.507, -0.466, -0.458, -0.174, -0.368,
                -0.212, -0.436, -0.503, -0.407
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(20,9,51,0.65)',
            name: 1874
        },
        {
            year: 1875,
            data: [
                -0.577, -0.613, -0.598, -0.462, -0.176, -0.234, -0.302, -0.183,
                -0.274, -0.371, -0.5, -0.495
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(29,12,68,0.65)',
            name: 1875
        },
        {
            year: 1876,
            data: [
                -0.311, -0.265, -0.383, -0.3, -0.53, -0.284, -0.134, -0.241,
                -0.434, -0.385, -0.575, -0.71
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(65,12,99,0.65)',
            name: 1876
        },
        {
            year: 1877,
            data: [
                -0.325, 0.057, -0.293, -0.325, -0.449, -0.088, 0.01, 0.15,
                0.028, 0.055, 0.104, 0.172
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(243,128,21,0.65)',
            name: 1877
        },
        {
            year: 1878,
            data: [
                0.173, 0.404, 0.342, 0.324, -0.083, 0.015, -0.05, -0.024, 0.018,
                -0.12, -0.203, -0.36
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(237,105,36,0.65)',
            name: 1878
        },
        {
            year: 1879,
            data: [
                -0.197, -0.154, -0.097, -0.215, -0.211, -0.27, -0.233, -0.169,
                -0.213, -0.121, -0.386, -0.517
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(153,39,99,0.65)',
            name: 1879
        },
        {
            year: 1880,
            data: [
                -0.064, -0.176, -0.105, -0.147, -0.241, -0.308, -0.25, -0.115,
                -0.233, -0.387, -0.408, -0.295
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(140,35,103,0.65)',
            name: 1880
        },
        {
            year: 1881,
            data: [
                -0.362, -0.238, -0.187, -0.133, -0.03, -0.229, -0.151, -0.128,
                -0.244, -0.284, -0.341, -0.138
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(158,41,97,0.65)',
            name: 1881
        },
        {
            year: 1882,
            data: [
                0.114, -0.009, -0.053, -0.283, -0.373, -0.317, -0.185, -0.221,
                -0.155, -0.337, -0.313, -0.463
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(121,28,108,0.65)',
            name: 1882
        },
        {
            year: 1883,
            data: [
                -0.409, -0.322, -0.342, -0.394, -0.253, -0.119, -0.195, -0.209,
                -0.278, -0.381, -0.305, -0.324
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(79,13,107,0.65)',
            name: 1883
        },
        {
            year: 1884,
            data: [
                -0.418, -0.217, -0.459, -0.529, -0.392, -0.413, -0.424, -0.41,
                -0.342, -0.322, -0.558, -0.416
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(32,12,70,0.65)',
            name: 1884
        },
        {
            year: 1885,
            data: [
                -0.508, -0.411, -0.484, -0.472, -0.521, -0.488, -0.311, -0.51,
                -0.333, -0.249, -0.261, -0.156
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(17,7,43,0.65)',
            name: 1885
        },
        {
            year: 1886,
            data: [
                -0.401, -0.455, -0.415, -0.336, -0.191, -0.387, -0.285, -0.341,
                -0.433, -0.363, -0.422, -0.427
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(43,12,80,0.65)',
            name: 1886
        },
        {
            year: 1887,
            data: [
                -0.566, -0.556, -0.458, -0.436, -0.354, -0.406, -0.267, -0.367,
                -0.343, -0.506, -0.408, -0.397
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(37,12,75,0.65)',
            name: 1887
        },
        {
            year: 1888,
            data: [
                -0.603, -0.453, -0.543, -0.243, -0.349, -0.291, -0.308, -0.281,
                -0.216, -0.106, -0.197, -0.176
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(100,21,108,0.65)',
            name: 1888
        },
        {
            year: 1889,
            data: [
                -0.054, -0.095, -0.068, 0.013, -0.079, -0.149, -0.196, -0.227,
                -0.381, -0.299, -0.399, -0.175
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(190,58,79,0.65)',
            name: 1889
        },
        {
            year: 1890,
            data: [
                -0.324, -0.366, -0.46, -0.319, -0.425, -0.378, -0.414, -0.421,
                -0.477, -0.504, -0.57, -0.407
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(25,11,61,0.65)',
            name: 1890
        },
        {
            year: 1891,
            data: [
                -0.515, -0.467, -0.371, -0.36, -0.207, -0.3, -0.332, -0.318,
                -0.204, -0.332, -0.546, -0.124
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(71,12,104,0.65)',
            name: 1891
        },
        {
            year: 1892,
            data: [
                -0.407, -0.121, -0.459, -0.483, -0.401, -0.466, -0.535, -0.445,
                -0.325, -0.444, -0.627, -0.794
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(14,6,36,0.65)',
            name: 1892
        },
        {
            year: 1893,
            data: [
                -0.962, -0.723, -0.374, -0.562, -0.551, -0.463, -0.278, -0.288,
                -0.44, -0.271, -0.415, -0.352
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(22,9,54,0.65)',
            name: 1893
        },
        {
            year: 1894,
            data: [
                -0.454, -0.379, -0.38, -0.379, -0.426, -0.493, -0.316, -0.343,
                -0.465, -0.443, -0.424, -0.404
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(35,12,72,0.65)',
            name: 1894
        },
        {
            year: 1895,
            data: [
                -0.497, -0.678, -0.527, -0.408, -0.415, -0.332, -0.359, -0.267,
                -0.286, -0.343, -0.302, -0.318
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(63,12,96,0.65)',
            name: 1895
        },
        {
            year: 1896,
            data: [
                -0.224, -0.233, -0.384, -0.35, -0.207, -0.124, -0.112, -0.068,
                -0.111, -0.13, -0.293, -0.032
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(186,56,83,0.65)',
            name: 1896
        },
        {
            year: 1897,
            data: [
                -0.203, -0.124, -0.276, -0.07, -0.028, -0.162, -0.165, -0.16,
                -0.142, -0.262, -0.46, -0.484
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(188,57,81,0.65)',
            name: 1897
        },
        {
            year: 1898,
            data: [
                -0.084, -0.378, -0.752, -0.569, -0.471, -0.322, -0.383, -0.309,
                -0.335, -0.561, -0.454, -0.361
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(49,12,84,0.65)',
            name: 1898
        },
        {
            year: 1899,
            data: [
                -0.212, -0.501, -0.542, -0.347, -0.311, -0.392, -0.283, -0.15,
                -0.14, -0.189, 0.027, -0.457
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(92,18,107,0.65)',
            name: 1899
        },
        {
            year: 1900,
            data: [
                -0.246, -0.164, -0.276, -0.252, -0.276, -0.184, -0.193, -0.184,
                -0.223, -0.06, -0.262, -0.087
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(158,41,97,0.65)',
            name: 1900
        },
        {
            year: 1901,
            data: [
                -0.182, -0.27, -0.246, -0.193, -0.197, -0.159, -0.194, -0.199,
                -0.349, -0.298, -0.446, -0.442
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(145,37,101,0.65)',
            name: 1901
        },
        {
            year: 1902,
            data: [
                -0.239, -0.27, -0.393, -0.449, -0.405, -0.449, -0.392, -0.369,
                -0.37, -0.486, -0.534, -0.524
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(40,12,77,0.65)',
            name: 1902
        },
        {
            year: 1903,
            data: [
                -0.274, -0.204, -0.355, -0.472, -0.464, -0.551, -0.496, -0.593,
                -0.528, -0.658, -0.627, -0.604
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(6,2,18,0.65)',
            name: 1903
        },
        {
            year: 1904,
            data: [
                -0.641, -0.603, -0.659, -0.553, -0.538, -0.526, -0.53, -0.483,
                -0.485, -0.48, -0.386, -0.417
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(3,1,11,0.65)',
            name: 1904
        },
        {
            year: 1905,
            data: [
                -0.471, -0.697, -0.461, -0.555, -0.343, -0.329, -0.298, -0.309,
                -0.322, -0.37, -0.224, -0.205
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(68,12,101,0.65)',
            name: 1905
        },
        {
            year: 1906,
            data: [
                -0.073, -0.238, -0.293, -0.114, -0.336, -0.296, -0.321, -0.324,
                -0.388, -0.353, -0.43, -0.283
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(84,15,107,0.65)',
            name: 1906
        },
        {
            year: 1907,
            data: [
                -0.443, -0.519, -0.343, -0.508, -0.552, -0.528, -0.407, -0.461,
                -0.413, -0.359, -0.581, -0.535
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(11,4,29,0.65)',
            name: 1907
        },
        {
            year: 1908,
            data: [
                -0.423, -0.417, -0.636, -0.545, -0.474, -0.478, -0.478, -0.539,
                -0.458, -0.586, -0.595, -0.577
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(7,3,22,0.65)',
            name: 1908
        },
        {
            year: 1909,
            data: [
                -0.583, -0.543, -0.689, -0.609, -0.589, -0.52, -0.585, -0.325,
                -0.402, -0.48, -0.432, -0.6
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(0,0,4,0.65)',
            name: 1909
        },
        {
            year: 1910,
            data: [
                -0.359, -0.517, -0.485, -0.453, -0.473, -0.486, -0.469, -0.443,
                -0.443, -0.484, -0.653, -0.669
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(12,5,32,0.65)',
            name: 1910
        },
        {
            year: 1911,
            data: [
                -0.558, -0.767, -0.701, -0.719, -0.602, -0.574, -0.516, -0.501,
                -0.511, -0.465, -0.378, -0.291
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(1,0,7,0.65)',
            name: 1911
        },
        {
            year: 1912,
            data: [
                -0.362, -0.297, -0.385, -0.336, -0.377, -0.32, -0.458, -0.561,
                -0.563, -0.643, -0.515, -0.487
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(23,10,58,0.65)',
            name: 1912
        },
        {
            year: 1913,
            data: [
                -0.465, -0.515, -0.534, -0.433, -0.509, -0.51, -0.443, -0.395,
                -0.428, -0.429, -0.27, -0.238
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(20,9,51,0.65)',
            name: 1913
        },
        {
            year: 1914,
            data: [
                -0.092, -0.226, -0.335, -0.388, -0.28, -0.29, -0.337, -0.215,
                -0.261, -0.153, -0.176, -0.245
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(119,27,108,0.65)',
            name: 1914
        },
        {
            year: 1915,
            data: [
                -0.117, -0.057, -0.193, -0.056, -0.218, -0.221, -0.118, -0.076,
                -0.141, -0.259, -0.14, -0.256
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(198,63,75,0.65)',
            name: 1915
        },
        {
            year: 1916,
            data: [
                -0.245, -0.186, -0.405, -0.344, -0.363, -0.473, -0.38, -0.348,
                -0.343, -0.403, -0.573, -0.627
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(57,12,92,0.65)',
            name: 1916
        },
        {
            year: 1917,
            data: [
                -0.684, -0.762, -0.826, -0.476, -0.655, -0.351, -0.12, -0.223,
                -0.123, -0.39, -0.396, -0.624
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(22,9,54,0.65)',
            name: 1917
        },
        {
            year: 1918,
            data: [
                -0.505, -0.524, -0.446, -0.492, -0.424, -0.332, -0.342, -0.364,
                -0.238, -0.098, -0.033, -0.227
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(60,12,94,0.65)',
            name: 1918
        },
        {
            year: 1919,
            data: [
                -0.098, -0.079, -0.302, -0.074, -0.265, -0.252, -0.364, -0.33,
                -0.232, -0.305, -0.531, -0.456
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(105,23,108,0.65)',
            name: 1919
        },
        {
            year: 1920,
            data: [
                -0.244, -0.425, -0.123, -0.265, -0.191, -0.215, -0.291, -0.231,
                -0.137, -0.224, -0.284, -0.345
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(137,34,103,0.65)',
            name: 1920
        },
        {
            year: 1921,
            data: [
                -0.137, -0.179, -0.251, -0.228, -0.204, -0.117, -0.138, -0.279,
                -0.162, -0.139, -0.301, -0.153
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(183,54,84,0.65)',
            name: 1921
        },
        {
            year: 1922,
            data: [
                -0.398, -0.273, -0.269, -0.235, -0.382, -0.32, -0.229, -0.347,
                -0.283, -0.322, -0.288, -0.304
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(95,19,107,0.65)',
            name: 1922
        },
        {
            year: 1923,
            data: [
                -0.23, -0.414, -0.408, -0.361, -0.321, -0.244, -0.347, -0.378,
                -0.321, -0.264, -0.02, -0.004
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(77,12,107,0.65)',
            name: 1923
        },
        {
            year: 1924,
            data: [
                -0.315, -0.202, -0.27, -0.28, -0.239, -0.216, -0.264, -0.276,
                -0.279, -0.313, -0.362, -0.526
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(108,23,108,0.65)',
            name: 1924
        },
        {
            year: 1925,
            data: [
                -0.398, -0.305, -0.223, -0.276, -0.258, -0.254, -0.217, -0.13,
                -0.189, -0.305, -0.056, 0.007
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(132,32,105,0.65)',
            name: 1925
        },
        {
            year: 1926,
            data: [
                0.09, -0.042, -0.022, -0.169, -0.219, -0.092, -0.235, -0.087,
                -0.104, -0.085, -0.109, -0.234
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(209,71,67,0.65)',
            name: 1926
        },
        {
            year: 1927,
            data: [
                -0.254, -0.146, -0.326, -0.26, -0.259, -0.238, -0.146, -0.144,
                -0.132, -0.04, -0.173, -0.425
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(161,42,97,0.65)',
            name: 1927
        },
        {
            year: 1928,
            data: [
                -0.05, -0.138, -0.339, -0.255, -0.286, -0.344, -0.165, -0.176,
                -0.223, -0.169, -0.157, -0.235
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(171,47,92,0.65)',
            name: 1928
        },
        {
            year: 1929,
            data: [
                -0.479, -0.666, -0.406, -0.389, -0.389, -0.35, -0.362, -0.189,
                -0.267, -0.18, -0.074, -0.473
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(51,12,87,0.65)',
            name: 1929
        },
        {
            year: 1930,
            data: [
                -0.33, -0.293, -0.155, -0.193, -0.197, -0.162, -0.12, -0.057,
                -0.078, -0.093, 0.076, -0.072
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(200,64,73,0.65)',
            name: 1930
        },
        {
            year: 1931,
            data: [
                -0.002, -0.151, -0.12, -0.18, -0.165, -0.036, 0.007, -0.047,
                -0.047, -0.04, -0.148, -0.101
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(216,79,59,0.65)',
            name: 1931
        },
        {
            year: 1932,
            data: [
                0.162, -0.191, -0.237, -0.066, -0.168, -0.194, -0.128, -0.196,
                -0.037, -0.172, -0.231, -0.192
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(181,53,86,0.65)',
            name: 1932
        },
        {
            year: 1933,
            data: [
                -0.285, -0.315, -0.341, -0.218, -0.211, -0.26, -0.185, -0.176,
                -0.234, -0.198, -0.31, -0.525
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(127,30,106,0.65)',
            name: 1933
        },
        {
            year: 1934,
            data: [
                -0.218, -0.16, -0.388, -0.249, -0.079, -0.042, -0.064, -0.058,
                -0.094, -0.084, 0.024, -0.132
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(213,75,63,0.65)',
            name: 1934
        },
        {
            year: 1935,
            data: [
                -0.223, 0.105, -0.222, -0.267, -0.242, -0.185, -0.144, -0.153,
                -0.136, -0.076, -0.299, -0.264
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(163,43,96,0.65)',
            name: 1935
        },
        {
            year: 1936,
            data: [
                -0.298, -0.354, -0.293, -0.202, -0.15, -0.162, -0.022, -0.043,
                -0.105, -0.003, -0.07, -0.009
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(203,65,72,0.65)',
            name: 1936
        },
        {
            year: 1937,
            data: [
                -0.121, 0.039, -0.273, -0.128, -0.079, -0.008, 0.051, 0.082,
                0.112, 0.121, 0.002, -0.101
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(238,108,34,0.65)',
            name: 1937
        },
        {
            year: 1938,
            data: [
                0.019, 0.019, 0.064, 0.085, -0.087, -0.059, -0.045, 0.013,
                0.063, 0.147, 0.019, -0.293
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(243,128,21,0.65)',
            name: 1938
        },
        {
            year: 1939,
            data: [
                -0.066, -0.043, -0.26, -0.095, -0.027, 0.062, 0.052, 0.04,
                -0.072, -0.273, -0.121, 0.216
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(225,90,49,0.65)',
            name: 1939
        },
        {
            year: 1940,
            data: [
                -0.185, -0.033, -0.107, 0.065, 0.026, 0.037, 0.142, 0.05, 0.124,
                0.013, -0.06, 0.159
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,140,14,0.65)',
            name: 1940
        },
        {
            year: 1941,
            data: [
                -0.096, -0.019, -0.141, 0.023, -0.02, 0.123, 0.116, 0.019,
                -0.129, 0.219, 0.053, 0.101
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(245,134,18,0.65)',
            name: 1941
        },
        {
            year: 1942,
            data: [
                0.212, -0.078, -0.087, -0.061, -0.01, 0.034, -0.074, -0.061,
                0.005, -0.076, -0.072, 0.013
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(221,86,53,0.65)',
            name: 1942
        },
        {
            year: 1943,
            data: [
                -0.202, 0.068, -0.2, 0.006, -0.013, -0.094, 0, -0.001, -0.014,
                0.237, 0.027, 0.198
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(239,114,30,0.65)',
            name: 1943
        },
        {
            year: 1944,
            data: [
                0.29, 0.14, 0.148, 0.056, 0.068, 0.152, 0.221, 0.238, 0.303,
                0.212, 0.009, -0.02
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,183,35,0.65)',
            name: 1944
        },
        {
            year: 1945,
            data: [
                -0.003, -0.086, -0.039, 0.167, -0.099, 0.006, -0.08, 0.364,
                0.162, 0.185, -0.012, -0.206
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(235,103,38,0.65)',
            name: 1945
        },
        {
            year: 1946,
            data: [
                0.101, 0.046, -0.063, 0.135, -0.121, -0.266, -0.048, -0.146,
                -0.007, -0.048, -0.091, -0.357
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(223,88,51,0.65)',
            name: 1946
        },
        {
            year: 1947,
            data: [
                -0.116, -0.18, -0.066, 0.096, -0.06, 0.007, -0.006, -0.038,
                -0.075, 0.077, 0.043, -0.175
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(227,92,47,0.65)',
            name: 1947
        },
        {
            year: 1948,
            data: [
                0.089, -0.126, -0.175, -0.042, 0.109, 0.075, -0.109, -0.001,
                -0.057, 0.031, -0.051, -0.203
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(228,94,46,0.65)',
            name: 1948
        },
        {
            year: 1949,
            data: [
                0.15, -0.145, -0.178, 0.009, -0.043, -0.186, -0.089, -0.038,
                -0.072, -0.032, -0.077, -0.188
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(214,77,61,0.65)',
            name: 1949
        },
        {
            year: 1950,
            data: [
                -0.333, -0.245, -0.178, -0.165, -0.087, -0.074, -0.039, -0.112,
                -0.106, -0.125, -0.391, -0.254
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(193,60,78,0.65)',
            name: 1950
        },
        {
            year: 1951,
            data: [
                -0.355, -0.463, -0.298, -0.105, -0.013, 0.037, 0.049, 0.142,
                0.093, 0.129, -0.038, 0.174
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(241,120,27,0.65)',
            name: 1951
        },
        {
            year: 1952,
            data: [
                0.182, 0.135, -0.13, 0.055, 0.04, 0.04, 0.099, 0.094, 0.098,
                -0.009, -0.189, -0.06
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,151,7,0.65)',
            name: 1952
        },
        {
            year: 1953,
            data: [
                0.067, 0.146, 0.13, 0.195, 0.138, 0.164, 0.054, 0.095, 0.076,
                0.073, -0.073, 0.09
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,170,22,0.65)',
            name: 1953
        },
        {
            year: 1954,
            data: [
                -0.237, -0.088, -0.155, -0.151, -0.207, -0.13, -0.198, -0.094,
                -0.087, -0.036, 0.022, -0.235
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(198,63,75,0.65)',
            name: 1954
        },
        {
            year: 1955,
            data: [
                0.125, -0.166, -0.405, -0.244, -0.235, -0.168, -0.2, -0.063,
                -0.117, -0.164, -0.313, -0.336
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(178,51,87,0.65)',
            name: 1955
        },
        {
            year: 1956,
            data: [
                -0.248, -0.348, -0.311, -0.335, -0.28, -0.225, -0.211, -0.243,
                -0.281, -0.23, -0.259, -0.207
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(116,26,108,0.65)',
            name: 1956
        },
        {
            year: 1957,
            data: [
                -0.167, -0.129, -0.185, -0.064, 0.052, 0.084, 0.003, 0.094,
                0.038, -0.013, 0.056, 0.158
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(244,131,20,0.65)',
            name: 1957
        },
        {
            year: 1958,
            data: [
                0.269, 0.183, -0.004, 0.038, 0.035, -0.016, 0.041, 0.01, -0.052,
                0.015, 0.012, 0.027
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(245,134,18,0.65)',
            name: 1958
        },
        {
            year: 1959,
            data: [
                0.087, 0.03, 0.08, 0.046, -0.012, 0.063, 0.03, 0.048, 0.038,
                -0.035, -0.112, -0.07
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,143,12,0.65)',
            name: 1959
        },
        {
            year: 1960,
            data: [
                -0.029, 0.102, -0.316, -0.176, -0.154, -0.029, -0.027, 0.007,
                0.062, -0.027, -0.15, 0.141
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(232,99,42,0.65)',
            name: 1960
        },
        {
            year: 1961,
            data: [
                0.046, 0.185, 0.096, 0.097, 0.087, 0.108, 0.016, 0.03, -0.029,
                -0.031, -0.02, -0.112
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,146,11,0.65)',
            name: 1961
        },
        {
            year: 1962,
            data: [
                0.055, 0.139, 0.027, 0.025, -0.044, -0.054, 0.016, -0.003,
                -0.014, 0.045, 0.009, -0.01
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(242,123,25,0.65)',
            name: 1962
        },
        {
            year: 1963,
            data: [
                -0.05, 0.152, -0.142, -0.067, -0.021, -0.033, 0.11, 0.127,
                0.126, 0.224, 0.161, -0.007
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,154,6,0.65)',
            name: 1963
        },
        {
            year: 1964,
            data: [
                -0.045, -0.124, -0.276, -0.244, -0.175, -0.159, -0.171, -0.258,
                -0.284, -0.268, -0.297, -0.356
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(124,29,107,0.65)',
            name: 1964
        },
        {
            year: 1965,
            data: [
                -0.103, -0.244, -0.215, -0.255, -0.159, -0.11, -0.181, -0.112,
                -0.095, -0.03, -0.14, -0.066
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(203,65,72,0.65)',
            name: 1965
        },
        {
            year: 1966,
            data: [
                -0.096, -0.094, -0.063, -0.107, -0.141, 0.035, 0.031, -0.022,
                -0.04, -0.105, -0.096, -0.144
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(211,73,65,0.65)',
            name: 1966
        },
        {
            year: 1967,
            data: [
                -0.167, -0.235, -0.052, -0.068, 0.073, -0.086, -0.066, -0.065,
                -0.097, 0.06, -0.064, -0.151
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(218,81,57,0.65)',
            name: 1967
        },
        {
            year: 1968,
            data: [
                -0.242, -0.214, 0.036, -0.17, -0.221, -0.106, -0.103, -0.06,
                -0.086, -0.018, -0.07, -0.11
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(205,67,70,0.65)',
            name: 1968
        },
        {
            year: 1969,
            data: [
                -0.171, -0.17, -0.004, 0.108, 0.126, 0.023, 0.038, 0.051, 0.015,
                0.023, 0.132, 0.194
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(246,137,16,0.65)',
            name: 1969
        },
        {
            year: 1970,
            data: [
                0.072, 0.143, -0.069, 0.058, -0.036, -0.014, -0.049, -0.09,
                -0.039, -0.074, -0.049, -0.165
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(228,94,46,0.65)',
            name: 1970
        },
        {
            year: 1971,
            data: [
                -0.097, -0.291, -0.286, -0.237, -0.215, -0.233, -0.129, -0.168,
                -0.123, -0.16, -0.08, -0.204
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(176,50,89,0.65)',
            name: 1971
        },
        {
            year: 1972,
            data: [
                -0.376, -0.287, -0.134, -0.079, -0.065, 0.003, -0.025, 0.013,
                -0.059, 0.002, -0.005, 0.183
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(230,97,44,0.65)',
            name: 1972
        },
        {
            year: 1973,
            data: [
                0.146, 0.276, 0.226, 0.162, 0.086, 0.11, 0.025, 0.018, -0.038,
                -0.041, -0.095, -0.108
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,157,9,0.65)',
            name: 1973
        },
        {
            year: 1974,
            data: [
                -0.376, -0.406, -0.233, -0.179, -0.195, -0.151, -0.125, -0.082,
                -0.129, -0.215, -0.211, -0.237
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(166,44,95,0.65)',
            name: 1974
        },
        {
            year: 1975,
            data: [
                -0.071, -0.092, -0.075, -0.088, -0.083, -0.084, -0.109, -0.179,
                -0.126, -0.228, -0.313, -0.304
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(207,68,69,0.65)',
            name: 1975
        },
        {
            year: 1976,
            data: [
                -0.23, -0.323, -0.442, -0.196, -0.317, -0.25, -0.185, -0.201,
                -0.164, -0.313, -0.176, -0.081
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(150,38,100,0.65)',
            name: 1976
        },
        {
            year: 1977,
            data: [
                -0.081, 0.079, 0.104, 0.094, 0.069, 0.109, 0.06, -0.001, 0.032,
                -0.006, 0.137, -0.056
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,164,16,0.65)',
            name: 1977
        },
        {
            year: 1978,
            data: [
                0.014, -0.038, 0.027, -0.062, -0.089, -0.133, -0.063, -0.188,
                -0.054, -0.116, 0.045, -0.1
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(220,84,55,0.65)',
            name: 1978
        },
        {
            year: 1979,
            data: [
                -0.038, -0.14, 0.014, -0.048, -0.03, 0.058, 0.054, 0.08, 0.092,
                0.131, 0.147, 0.356
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,161,13,0.65)',
            name: 1979
        },
        {
            year: 1980,
            data: [
                0.133, 0.219, 0.072, 0.14, 0.139, 0.07, 0.06, 0.036, 0.037,
                0.007, 0.131, 0.058
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,167,19,0.65)',
            name: 1980
        },
        {
            year: 1981,
            data: [
                0.334, 0.196, 0.207, 0.128, 0.066, 0.123, 0.094, 0.122, 0.072,
                0.003, 0.071, 0.267
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,173,25,0.65)',
            name: 1981
        },
        {
            year: 1982,
            data: [
                -0.048, 0.005, -0.127, 0.026, 0.043, -0.049, -0.019, -0.009,
                0.074, 0.005, -0.01, 0.253
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(238,111,32,0.65)',
            name: 1982
        },
        {
            year: 1983,
            data: [
                0.431, 0.31, 0.209, 0.115, 0.135, 0.136, 0.151, 0.198, 0.188,
                0.099, 0.257, 0.083
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,186,38,0.65)',
            name: 1983
        },
        {
            year: 1984,
            data: [
                0.12, 0.017, 0.05, -0.041, 0.09, -0.014, -0.034, 0.04, 0.036,
                -0.023, -0.124, -0.277
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(240,117,29,0.65)',
            name: 1984
        },
        {
            year: 1985,
            data: [
                0.008, -0.138, -0.026, -0.035, -0.002, -0.059, -0.057, 0.03,
                -0.03, 0.021, -0.077, 0.013
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(234,101,40,0.65)',
            name: 1985
        },
        {
            year: 1986,
            data: [
                0.127, 0.089, 0.076, 0.082, 0.044, 0.051, 0, 0.005, 0.013,
                0.064, -0.004, 0.01
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,151,7,0.65)',
            name: 1986
        },
        {
            year: 1987,
            data: [
                0.112, 0.302, 0.024, 0.093, 0.143, 0.125, 0.266, 0.233, 0.272,
                0.2, 0.196, 0.322
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,192,44,0.65)',
            name: 1987
        },
        {
            year: 1988,
            data: [
                0.39, 0.229, 0.268, 0.228, 0.21, 0.224, 0.181, 0.179, 0.188,
                0.146, 0.03, 0.149
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,195,47,0.65)',
            name: 1988
        },
        {
            year: 1989,
            data: [
                0.015, 0.147, 0.135, 0.08, 0.079, 0.079, 0.162, 0.181, 0.145,
                0.154, 0.062, 0.21
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,179,31,0.65)',
            name: 1989
        },
        {
            year: 1990,
            data: [
                0.222, 0.307, 0.562, 0.367, 0.28, 0.279, 0.234, 0.252, 0.175,
                0.33, 0.316, 0.247
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,208,60,0.65)',
            name: 1990
        },
        {
            year: 1991,
            data: [
                0.288, 0.292, 0.19, 0.385, 0.302, 0.306, 0.312, 0.261, 0.243,
                0.187, 0.158, 0.125
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,202,54,0.65)',
            name: 1991
        },
        {
            year: 1992,
            data: [
                0.366, 0.321, 0.252, 0.144, 0.178, 0.127, -0.013, 0.006, -0.059,
                -0.05, -0.089, 0.078
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,173,25,0.65)',
            name: 1992
        },
        {
            year: 1993,
            data: [
                0.312, 0.252, 0.244, 0.131, 0.179, 0.177, 0.133, 0.096, 0.062,
                0.098, -0.046, 0.119
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,176,28,0.65)',
            name: 1993
        },
        {
            year: 1994,
            data: [
                0.178, -0.052, 0.22, 0.206, 0.271, 0.265, 0.173, 0.182, 0.187,
                0.307, 0.308, 0.245
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,198,50,0.65)',
            name: 1994
        },
        {
            year: 1995,
            data: [
                0.419, 0.595, 0.325, 0.284, 0.216, 0.308, 0.327, 0.354, 0.252,
                0.329, 0.322, 0.127
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,213,72,0.65)',
            name: 1995
        },
        {
            year: 1996,
            data: [
                0.115, 0.323, 0.186, 0.13, 0.216, 0.17, 0.221, 0.205, 0.099,
                0.135, 0.149, 0.234
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,189,41,0.65)',
            name: 1996
        },
        {
            year: 1997,
            data: [
                0.206, 0.318, 0.347, 0.273, 0.286, 0.402, 0.366, 0.438, 0.475,
                0.554, 0.498, 0.505
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,216,78,0.65)',
            name: 1997
        },
        {
            year: 1998,
            data: [
                0.483, 0.763, 0.558, 0.636, 0.573, 0.592, 0.672, 0.603, 0.392,
                0.404, 0.295, 0.473
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(251,249,151,0.65)',
            name: 1998
        },
        {
            year: 1999,
            data: [
                0.347, 0.589, 0.228, 0.327, 0.245, 0.273, 0.291, 0.223, 0.298,
                0.254, 0.237, 0.383
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,211,66,0.65)',
            name: 1999
        },
        {
            year: 2000,
            data: [
                0.227, 0.455, 0.382, 0.479, 0.28, 0.275, 0.262, 0.358, 0.307,
                0.222, 0.162, 0.151
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,205,57,0.65)',
            name: 2000
        },
        {
            year: 2001,
            data: [
                0.363, 0.325, 0.515, 0.453, 0.414, 0.43, 0.465, 0.5, 0.418,
                0.417, 0.611, 0.37
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,219,84,0.65)',
            name: 2001
        },
        {
            year: 2002,
            data: [
                0.661, 0.705, 0.699, 0.465, 0.425, 0.476, 0.487, 0.445, 0.42,
                0.407, 0.449, 0.327
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,230,109,0.65)',
            name: 2002
        },
        {
            year: 2003,
            data: [
                0.596, 0.453, 0.459, 0.437, 0.477, 0.46, 0.477, 0.55, 0.542,
                0.612, 0.459, 0.595
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,233,115,0.65)',
            name: 2003
        },
        {
            year: 2004,
            data: [
                0.502, 0.611, 0.525, 0.479, 0.315, 0.328, 0.358, 0.397, 0.442,
                0.472, 0.6, 0.359
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,227,103,0.65)',
            name: 2004
        },
        {
            year: 2005,
            data: [
                0.55, 0.395, 0.56, 0.603, 0.52, 0.552, 0.55, 0.54, 0.566, 0.608,
                0.629, 0.472
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(251,246,145,0.65)',
            name: 2005
        },
        {
            year: 2006,
            data: [
                0.385, 0.562, 0.463, 0.407, 0.401, 0.525, 0.488, 0.532, 0.499,
                0.562, 0.541, 0.698
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,238,127,0.65)',
            name: 2006
        },
        {
            year: 2007,
            data: [
                0.832, 0.56, 0.524, 0.581, 0.447, 0.419, 0.441, 0.443, 0.459,
                0.481, 0.387, 0.349
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,224,97,0.65)',
            name: 2007
        },
        {
            year: 2008,
            data: [
                0.171, 0.245, 0.55, 0.331, 0.34, 0.362, 0.451, 0.432, 0.406,
                0.547, 0.524, 0.391
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(247,216,78,0.65)',
            name: 2008
        },
        {
            year: 2009,
            data: [
                0.481, 0.441, 0.406, 0.515, 0.441, 0.554, 0.539, 0.589, 0.564,
                0.515, 0.545, 0.474
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,241,133,0.65)',
            name: 2009
        },
        {
            year: 2010,
            data: [
                0.561, 0.577, 0.678, 0.679, 0.591, 0.587, 0.619, 0.543, 0.442,
                0.496, 0.593, 0.343
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(251,252,157,0.65)',
            name: 2010
        },
        {
            year: 2011,
            data: [
                0.313, 0.327, 0.425, 0.48, 0.384, 0.489, 0.51, 0.488, 0.454,
                0.453, 0.347, 0.401
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(248,222,91,0.65)',
            name: 2011
        },
        {
            year: 2012,
            data: [
                0.306, 0.302, 0.358, 0.575, 0.574, 0.557, 0.51, 0.536, 0.553,
                0.556, 0.554, 0.275
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(250,244,139,0.65)',
            name: 2012
        },
        {
            year: 2013,
            data: [
                0.45, 0.486, 0.401, 0.439, 0.52, 0.487, 0.514, 0.533, 0.535,
                0.497, 0.639, 0.508
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(249,235,121,0.65)',
            name: 2013
        },
        {
            year: 2014,
            data: [
                0.523, 0.313, 0.561, 0.657, 0.599, 0.618, 0.541, 0.666, 0.589,
                0.626, 0.489, 0.634
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(252,255,164,0.65)',
            name: 2014
        },
        {
            year: 2015,
            data: [
                0.688, 0.66, 0.681, 0.656, 0.696, 0.73, 0.696, 0.732, 0.784,
                0.82, 0.81, 1.01
            ],
            color: 'transparent',
            enableMouseTracking: false,
            color2: 'rgba(252,255,164,0.65)',
            name: 2015
        }
    ]
});
