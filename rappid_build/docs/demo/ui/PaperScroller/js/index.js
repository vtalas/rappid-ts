'use strict';


    var graph = new joint.dia.Graph;

    var $app = $('#paper');

    var paper = new joint.dia.Paper({
        width: 800,
        height: 800,
        gridSize: 1,
        model: graph
    });

    var paperScroller = new joint.ui.PaperScroller({
        autoResizePaper: true,
        padding: 50,
        paper: paper,
        cursor: 'grab'
    });

    // Initiate panning when the user grabs the blank area of the paper.
    paper.on('blank:pointerdown', paperScroller.startPanning);

    paperScroller.$el.css({
        width: 400,
        height: 300
    });

    $app.append(paperScroller.render().el);

    // Example of centering the paper.
    paperScroller.center();

    var r = new joint.shapes.basic.Rect({
        position: { x: 300, y: 300 }, size: { width: 90, height: 60 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 2 }, text: { text: 'rect', fill: 'white' } }
    });
    var c = new joint.shapes.basic.Circle({
        position: { x: 400, y: 400 }, size: { width: 90, height: 60 },
        attrs: { circle: { fill: '#FE854F', 'stroke-width': 2, stroke: '#4B4A67' }, text: { text: 'ellipse', fill: 'white' } }
    });

    graph.addCells([r, c]);

    // Toolbar buttons.

    $('#btn-center').on('click', _.bind(paperScroller.center, paperScroller));
    $('#btn-center-content').on('click', _.bind(paperScroller.centerContent, paperScroller));

    $('#btn-zoomin').on('click', function() {
        paperScroller.zoom(0.2, { max: 2 });
    });

    $('#btn-zoomout').on('click', function() {
        paperScroller.zoom(-0.2, { min: 0.2 });
    });

    $('#btn-zoomtofit').on('click', function() {
        paperScroller.zoomToFit({
            minScale: 0.2,
            maxScale: 2
        });
    });

