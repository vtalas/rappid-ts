'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 400),
        width: 400,
        height: 300,
        model: graph
    });

    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model.isLink()) return;

        var halo = new joint.ui.Halo({ cellView: cellView, type: 'toolbar' });
        halo.render();
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

    // Show Halo immediately for the rectangle so that it is visible to the reader straight away.

    new joint.ui.Halo({ cellView: paper.findViewByModel(r), type: 'toolbar' }).render();

})();
