'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 250), width: 250, height: 250, model: graph, gridSize: 1 });

    var labelFont = 'Indie Flower';

    var matrix = new joint.shapes.chart.Matrix({
        position: { x: 50, y: 50 },
        size: { width: 170, height: 170 },
        cells: [
            [{ fill: '#3498DB' }, { fill: '#3498DB' }, { fill: '#3498DB' }, { fill: '#3498DB' }],
            [{ fill: '#34495E' }, { fill: '#F1C40F' }, { fill: '#34495E' }, { fill: '#3498DB' }],
            [{ fill: '#2ECC71' }, { fill: '#2ECC71' }, { fill: '#2ECC71' }, { fill: '#3498DB' }],
            [{ fill: '#2ECC71' }, { fill: '#2ECC71' }, { fill: '#2ECC71' }, { fill: '#3498DB' }]
        ],
        labels: {
            rows: [{ text: '1', 'font-family': labelFont }, { text: '2', 'font-family': labelFont, 'font-weight': 'bold', 'text-decoration': 'underline', 'font-size': 48 }, { text: '3', 'font-family': labelFont }, { text: '4', 'font-family': labelFont }],
            columns: [{ text: 'A', 'font-family': labelFont }, { text: 'B', 'font-family': labelFont }, { text: 'C', 'font-family': labelFont }, { text: 'D', 'font-family': labelFont }],
        },
        attrs: {
            '.cell': { rx: 10, ry: 10 },
            '.background rect': { fill: 'white' }
        }
    });

    graph.addCell(matrix);

})();
