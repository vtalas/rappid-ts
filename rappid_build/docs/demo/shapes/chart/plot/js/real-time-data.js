'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 50 },
        size: { width: 700, height: 100 },
        series: [
            { name: 'myserie', label: 'Rate', interpolate: 'bezier', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: '0d' },
            'y-axis': { tickFormat: '.2f', tickSuffix: '$', ticks: 3 }
        },
        attrs: {
            '.data .myserie path': {
                stroke: 'white', 'stroke-width': 1, 'stroke-dasharray': [1,1], 'fill-opacity': .2,
                fill: {
                    type: 'linearGradient',
                    stops: [ { offset: '0%', color: 'white' }, { offset: '80%', color: 'lightgray' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                }
            },
            '.myserie .point circle': {
                fill: 'black', stroke: 'white', opacity: 1
            },
            '.myserie .point text': {
                fill: 'white',
                display: 'inline',
                transform: 'translate(0, -12)'
            },
            '.axis text': {
                style: { 'text-shadow': '1px 1px 0px lightgray' }
            },
            '.legend text': {
                fill: 'white',
                'font-size': 10,
                style: { 'text-decoration': '1px 1px 0 gray' }
            },
            '.background rect': { fill: '#34495E' }
        }
    });
    graph.addCell(chart);

    setInterval(function() {
        chart.addPoint({ x: chart.lastPoint('myserie').x + 1, y: Math.random() * 2 + 2 }, 'myserie', { maxLen: 6 });
    }, 600);

})();
