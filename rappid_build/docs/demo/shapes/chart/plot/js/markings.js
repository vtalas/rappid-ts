'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart1 = new joint.shapes.chart.Plot({
        position: { x: 70, y: 50 },
        size: { width: 700, height: 100 },
        series: [
            { name: 'myserie', label: 'Hotdogs', interpolate: 'bezier', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        markings: [
            { name: 'target', start: { y: 3.2 }, label: 'My Target' },
            { name: 'current', start: { x: 4 } },
            { name: 'previous', start: { x: 2.8 }, end: { x: 3.2 } },
            { name: 'next', start: { x: 4.8, y: 3.5 }, end: { x: 5.2, y: 2.5 } }
        ],
        axis: {
            'x-axis': { tickFormat: '0d', tickSuffix: 'm' },
            'y-axis': { tickFormat: '.1f', tickSuffix: ' hotdogs', ticks: 5 }
        },
        attrs: {
            '.data .myserie path': {
                stroke: '#759d00', 'stroke-width': 1, 'stroke-dasharray': [8,1], 'fill-opacity': .2,
                fill: {
                    type: 'linearGradient',
                    stops: [ { offset: '0%', color: '#b4f200' }, { offset: '80%', color: '#759d00' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                }
            },
            
            '.marking.target rect': { fill: 'red' },
            '.marking.next rect': { fill: '#3498DB', rx: 1000, ry: 1000, 'fill-opacity': .6, stroke: 'black' },
            '.marking.previous rect': { fill: '#27AE60', 'fill-opacity': .8 },
            
            '.myserie .point circle': { r: 3, 'opacity': .8, fill: '#b4f200' },
            '.axis text': { style: { 'text-shadow': '1px 1px 0px lightgray' } },
            '.axis path': { stroke: '#759d00', 'stroke-width': 2 },
            '.legend': { transform: 'translate(0, -20)' } // Move the legend above the graph.
        }
    });
    graph.addCell(chart1);

})();
