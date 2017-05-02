'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 400),
        width: 400,
        height: 300,
        gridSize: 1,
        model: graph
    });

    function customizeHalo(halo) {

        halo.addHandle({ name: 'myaction', position: 's', icon: 'images/myaction.png' });
        halo.changeHandle('clone', { position: 'se' });
        halo.removeHandle('resize');

        halo.on('action:myaction:pointerdown', function(evt) {
            evt.stopPropagation();
            alert('My custom action.');
        });
    }

    var r = new joint.shapes.basic.Rect({ 
        position: { x: 50, y: 50 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 2 }, text: { text: 'rect', fill: 'white' } }
    });

    graph.addCell(r);

    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        var halo = new joint.ui.Halo({ cellView: cellView });
        customizeHalo(halo);
        halo.render();
    });

    // Show Halo immediately for the rectangle so that it is visible to the reader straight away.

    var halo = new joint.ui.Halo({ cellView: paper.findViewByModel(r) }).render();
    customizeHalo(halo);

})();
