'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 60 },
        size: { width: 700, height: 100 },
        series: [
            { name: 'one', label: 'One', interpolate: 'stepAfter', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] },
            { name: 'two', label: 'Two', interpolate: 'linear', data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] },
            { name: 'three', label: 'Three', interpolate: 'bezier', data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: '0d', tickSuffix: 'y' },
            'y-axis': { tickFormat: '.2f', tickSuffix: '$', ticks: 5 }
        },
        attrs: {
            '.one path': {
                stroke: 'orange', 'stroke-width': .5, 'stroke-dasharray': [8,5], 'fill-opacity': .3,
                fill: {
                    type: 'linearGradient',
                    stops: [ { offset: '0%', color: 'white' }, { offset: '80%', color: 'orange' } ]
                    //attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                }
            },
            '.one .point': {
                display: 'none'
            },
            '.three path': {
                stroke: '#3498DB', 'stroke-width': 3
            },
            '.three .point circle': { r: 5, 'opacity': 1, fill: 'white', stroke: 'gray' },
            '.two path': { stroke: 'gray', 'stroke-width': 1 },
            '.two .point circle': { fill: 'white', stroke: 'none' },
            '.axis text': {
                style: { 'text-shadow': '1px 1px 0px lightgray' }
            },
            '.axis path': {
                stroke: 'black',
                'stroke-width': 1
            },
            '.legend': {
                transform: 'translate(0, -50)' // Move the legend above the graph.
            }
        }
    });
    graph.addCell(chart);

})();
