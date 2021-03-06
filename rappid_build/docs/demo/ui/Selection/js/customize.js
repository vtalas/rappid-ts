'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 800),
        width: 800,
        height: 300,
        gridSize: 1,
        model: graph
    });

    var selection = new joint.ui.Selection({ paper: paper });

    paper.on('blank:pointerdown', selection.startSelecting);

    paper.on('element:pointerup', function(elementView, evt) {
        if (evt.ctrlKey || evt.metaKey) {
            selection.collection.add(elementView.model);
        }
    });

    selection.on('selection-box:pointerdown', function(elementView, evt) {
        if (evt.ctrlKey || evt.metaKey) {
            selection.collection.remove(elementView.model);
        }
    });

    var r = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 2 }, text: { text: 'rect', fill: 'white' } }
    });
    var c = new joint.shapes.basic.Circle({
        position: { x: 220, y: 150 }, size: { width: 70, height: 40 },
        attrs: { circle: { fill: '#FE854F', 'stroke-width': 2, stroke: '#4B4A67' }, text: { text: 'ellipse', fill: 'white' } }
    });

    graph.addCells([r, c]);

    // Select elements right away to show the effect of custom styling immediately.
    selection.collection.add([r, c]);

    // Add our own action to the selection tools:
    selection.addHandle({ name: 'myaction', position: 's', icon: 'images/myaction.png' });
    selection.on('action:myaction:pointerdown', function(evt) {
        evt.stopPropagation();
        alert('My custom action.');
    });

})();
