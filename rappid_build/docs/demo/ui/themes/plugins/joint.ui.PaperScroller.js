(function() {

    'use strict';

    var graph = new joint.dia.Graph;

    var $demo = addPluginDemo('joint.ui.PaperScroller');

    var paper = new joint.dia.Paper({

        width: 2000,
        height: 2000,
        gridSize: 20,
        model: graph
    });

    paper.drawGrid();

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper,
        padding: 50,
        autoResizePaper: true
    });

    // Initiate panning when the user grabs the blank area of the paper.
    paper.on('blank:pointerdown', paperScroller.startPanning);

    paperScroller.$el.css({ width: 600, height: 600, padding: 100 }).appendTo($demo);

    // Example of centering the paper.
    paperScroller.center();

    var r = new joint.shapes.basic.Rect({
        position: { x: 1020, y: 1020 },
        size: { width: 120, height: 80 },
        attrs: { text: { text: 'Rect' } }
    });
    graph.addCell(r);


    var c = new joint.shapes.basic.Circle({
        position: { x: 1220, y: 1020 },
        attrs: { text: { text: 'Circle' } }
    });
    graph.addCell(c);

})();
