'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 500), width: 500, height: 160, model: graph, gridSize: 1 });

    var knob1 = new joint.shapes.chart.Knob({
        position: { x: 40, y: 30 },
        size: { width: 100, height: 100 },
        min: 0, max: 100, value: 80,
        fill: '#1ece6d',
        attrs: { 
            '.slice .slice-fill': { stroke: 'gray', 'stroke-width': 2 },
            '.legend-slice text': { fill: '#1ece6d', style: { 'text-shadow': '0 0 1px black' } }
        }
    });
    graph.addCell(knob1);

    var knob2 = new joint.shapes.chart.Knob({
        position: { x: 195, y: 30 },
        size: { width: 100, height: 100 },
        min: 0, max: 100, value: 85,
        pieHole: .9,
        sliceDefaults: { legendLabel: 'CPU\n{value:.0f}\%' },
        serieDefaults: { startAngle: 90 },
        fill: {
                type: 'linearGradient', stops: [ { offset: '0%', color: '#ff3019' }, { offset: '80%', color: '#cf0404' } ],
                attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' } 
        },
        attrs: { 
            '.slice .slice-fill': {  },
            '.legend-slice text': { fill: 'white', 'font-size': 18, style: { 'text-shadow': '1px 1px 2px black' } },
            '.data': {
            filter: { name: 'dropShadow', args: { dx: 0, dy: 0, blur: 3, color: 'black' } }
            }
        }
    });
    graph.addCell(knob2);

    var knob3 = new joint.shapes.chart.Knob({
        position: { x: 350, y: 30 },
        size: { width: 100, height: 100 },
        serieDefaults: { startAngle: 150 },
        sliceDefaults: { legendLabel: '{value:.0f}\%' },
        pieHole: .4,
        min: 0, max: 100, value: 67,
        fill: '#D35400',
        attrs: { 
            '.slice .slice-fill': { stroke: 'black', 'stroke-width': 2, 'stroke-dasharray': '2,1' },
            '.legend-slice text': { fill: 'gray', 'font-size': 16 }
        }
    });
    graph.addCell(knob3);

})();
