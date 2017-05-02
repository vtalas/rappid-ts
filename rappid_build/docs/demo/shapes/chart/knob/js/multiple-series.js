'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 200), width: 200, height: 170, model: graph, gridSize: 1 });

    var knob = new joint.shapes.chart.Knob({
        position: { x: 10, y: 10 },
        size: { width: 150, height: 150 },
        value: [30, 60, 90], 
        min: 0,
        max: 100,
        fill: ['#F2C500', '#4CC3D9', '#E94B35'], 
        pieHole: .4,
        sliceDefaults: {
            legendLabel: '{value:.0f}\%'
        },
        attrs: { 
            '.legend-slice text': { 'font-size': 18, fill: 'black' } 
        }
    });
    graph.addCell(knob);

})();
