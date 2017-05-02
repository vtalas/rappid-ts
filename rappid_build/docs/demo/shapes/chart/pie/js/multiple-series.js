'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 500), width: 500, height: 400, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 50, y: 40 },
        size: { width: 300, height: 300 },
        sliceDefaults: { 
            innerLabelMargin: 0,
            legendLabel: '{label}: {value:.01f}%',
            innerLabel: '{value:.01f}%',
        },
        series: [
                { label: '2014', data: [
            { value: 20.3, label: 'IE', fill: '#4CC3D9' },
            { value: 18.3, label: 'Firefox', fill: '#F16745' },
            { value: 34.2, label: 'Chrome', fill: '#7BC8A4' },
            { value: 17.8, label: 'Safari', fill: '#FFC65D' },
            { value: 2.7, label: 'Opera', fill: '#93648D' }
                ]},
                { label: '2013', data: [
            { value: 27.5, label: 'IE', fill: '#4CC3D9' },
            { value: 20, label: 'Firefox', fill: '#F16745' },
            { value: 30, label: 'Chrome', fill: '#7BC8A4' },
            { value: 14.8, label: 'Safari', fill: '#FFC65D' },
            { value: 2.3, label: 'Opera', fill: '#93648D' }
                ]},
                { label: '2012', data: [
            { value: 30.9, label: 'IE', fill: '#4CC3D9' },
            { value: 24.8, label: 'Firefox', fill: '#F16745' },
            { value: 24.6, label: 'Chrome', fill: '#7BC8A4' },
            { value: 6.5, label: 'Safari', fill: '#FFC65D' },
            { value: 2.5, label: 'Opera', fill: '#93648D' }
                ]}
        ],
        attrs: {
            '.legend-slice text': { 'font-size': 11 },
            '.slice-inner-label': { fill: 'black', 'font-size': 10 },
            '.slice-fill': { 
            stroke: 'white',
            'stroke-width': 2
            }
        }
    });

    graph.addCell(chart);

})();
