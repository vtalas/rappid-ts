(function() {

    'use strict';

    var $paper = $('<div class="paper" />');

    var $instructions = $('<p>Drag an element near another element to reveal the snaplines.</p>');
    var $demo = addPluginDemo('joint.ui.Snaplines', $instructions, $paper);

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $paper,
        width: $paper.width(),
        height: $paper.height(),
        gridSize: 10,
        model: graph
    });

    paper.drawGrid();

    var snaplines = new joint.ui.Snaplines({
        paper: paper
    });

    snaplines.startListening();

    var rect = new joint.shapes.basic.Rect({
        position: { x: 60, y: 60 },
        size: { width: 80, height: 60 },
        attrs: {
            rect: {
                fill: '#fff'
            },
            text: {
                text: ''
            }
        }
    });
    graph.addCell(rect);

    var circle = new joint.shapes.basic.Circle({
        position: { x: 250, y: 150 },
        size: { width: 50, height: 50 },
        attrs: {
            circle: {
                fill: '#fff'
            },
            text: {
                text: ''
            }
        }
    });
    graph.addCell(circle);

    snaplines.show({
        horizontal: 120,
        vertical: 140
    });

})();
