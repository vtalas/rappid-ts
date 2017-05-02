'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 200), width: 200, height: 170, model: graph, gridSize: 1 });

    var knob = new joint.shapes.chart.Knob({
        position: { x: 50, y: 30 },
        size: { width: 100, height: 100 },
        min: 0, max: 100, value: 80,
        fill: '#2c97de'
    });

    graph.addCell(knob);

})();
