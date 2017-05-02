'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 250), width: 250, height: 250, model: graph, gridSize: 1 });

    var matrix = new joint.shapes.chart.Matrix({
        position: { x: 50, y: 50 },
        size: { width: 170, height: 170 },
        cells: [
            [{ fill: 'red' }, { fill: 'black' }, { fill: 'black' }],
            [{ fill: 'black' }, { fill: 'red', rx: 50, ry: 50 }, { fill: 'black' }],
            [{ fill: 'black' }, { fill: 'black' }, { fill: 'red' }]
        ],
        labels: {
            rows: [{ text: '1' }, { text: '2' }, { text: '3' }],
            columns: [{ text: 'A' }, { text: 'B' }, { text: 'C' }],
        }
    });

    graph.addCell(matrix);

})();
