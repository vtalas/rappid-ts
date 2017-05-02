'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 400), width: 400, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 50 },
        size: { width: 300, height: 100 },
        axis: { 'y-axis': { ticks: 5 } },
        series: [ { name: 'myserie', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 3 }] } ],
        attrs: {
            '.myserie path': { stroke: 'green', 'stroke-width': 3 }
        }
    });
    graph.addCell(chart);

})();
