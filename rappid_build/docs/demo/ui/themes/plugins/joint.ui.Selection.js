(function() {
    'use strict';

    var $paper = $('<div class="paper" />');

    var $instructions = ('<p>Click and drag to select elements.</p>');
    var $demo = addPluginDemo('joint.ui.Selection', $instructions, $paper);

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $paper,
        width: $paper.width(),
        height: $paper.height(),
        gridSize: 10,
        model: graph
    });

    paper.drawGrid();

    var selection = new joint.ui.Selection({
        paper: paper
    });

    // Initiate selecting when the user grabs the blank area of the paper.
    paper.on('blank:pointerdown', selection.startSelecting);

    paper.on('cell:pointerup', function(cellView, evt) {
        // Select an element if CTRL/Meta key is pressed while the element is clicked.
        if ((evt.ctrlKey || evt.metaKey) && !(cellView.model instanceof joint.dia.Link)) {
            selection.collection.add(cellView.model);
        }
    });

    selection.on('selection-box:pointerdown', function(cellView, evt) {
        // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
        if (evt.ctrlKey || evt.metaKey) {
            selection.collection.remove(cellView.model);
        }
    });

    // Add some elements to the graph.
    var r = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 },
        size: { width: 120, height: 80 },
        attrs: { text: { text: '' } }
    });
    graph.addCell(r);

    var c = new joint.shapes.basic.Circle({
        position: { x: 200, y: 80 },
        attrs: { text: { text: '' } }
    });
    graph.addCell(c);

    // Show the selection right away.
    selection.collection.reset([r, c]);
})();
