'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart1 = new joint.shapes.chart.Plot({
        position: { x: 50, y: 50 },
        size: { width: 300, height: 100 },
        series: [
            { name: 'myserie', label: 'Rate', interpolate: 'bezier', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: '0d', tickSuffix: 'y' },
            'y-axis': { tickFormat: '.2f', tickSuffix: '$', ticks: 5 }
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
            '.myserie .point circle': {
                r: 3, 'opacity': .8, fill: '#b4f200'
            },
            '.axis text': {
                style: { 'text-shadow': '1px 1px 0px lightgray' }
            },
            '.axis path': {
                stroke: '#759d00',
                'stroke-width': 2
            },
            '.y-axis .tick line': {
                x2: 300,  // Set the x2 coordinate of the SVG line element to the width of the graph so that the ticks cross the whole chart.
                opacity: .1
            },
            '.x-axis .tick line': {
                y2: -100, // Set the y2 coordinate of the SVG line element to the -height of the graph so that the ticks cross the whole chart starting from bottom going to the top.
                opacity: .1
            },
            '.legend': {
                transform: 'translate(0, -20)' // Move the legend above the graph.
            }
        }
    });
    graph.addCell(chart1);

    var chart2 = new joint.shapes.chart.Plot({
        position: { x: 450, y: 50 },
        size: { width: 300, height: 100 },
        series: [
            { name: 'myserie', label: 'Rate', interpolate: 'bezier', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: '0d', tickSuffix: 'y' },
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
            '.y-axis .tick line': {
                x2: 300,  // Set the x2 coordinate of the SVG line element to the width of the graph so that the ticks cross the whole chart.
                opacity: .1
            },
            '.x-axis .tick line': {
                y2: -100, // Set the y2 coordinate of the SVG line element to the -height of the graph so that the ticks cross the whole chart starting from bottom going to the top.
                opacity: .1
            },
            '.legend text': {
                fill: 'white',
                'font-size': 10,
                style: { 'text-decoration': '1px 1px 0 gray' }
            },
            '.background rect': { fill: '#34495E' }
        }
    });

    graph.addCell(chart2);
    
})();
