'use strict';

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        width: 500,
        height: 300,
        gridSize: 1,
        perpendicularLinks: true,
        model: graph
    });

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper,
        autoResizePaper: true,
        padding: 50
    });

    paper.on('blank:pointerdown', paperScroller.startPanning);
    paperScroller.$el.css({ width: 500, height: 300 }).appendTo('#paper');
    paperScroller.center();

    $('#btn-zoomin').on('click', function() {
        paperScroller.zoom(0.2, { max: 2 });
    });
    $('#btn-zoomout').on('click', function() {
        paperScroller.zoom(-0.2, { min: 0.2 });
    });

    var r = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 },
        size: { width: 120, height: 80 },
        attrs: { text: { text: 'Rect', fill: 'white', 'font-size': 18 }, rect: { fill: '#FE854F', stroke: 'none', rx: 10, ry: 10 } }
    });
    graph.addCell(r);

    var c = new joint.shapes.basic.Circle({
        position: { x: 360, y: 80 },
        size: { width: 70, height: 70 },
        attrs: { text: { text: 'Circle', fill: 'white', 'font-size': 18 }, circle: { fill: '#FEB663', stroke: 'none' } }
    });
    graph.addCell(c);

    var m = new joint.shapes.devs.Model({
        position: { x: 600, y: 250 },
        size: { width: 90, height: 90 },
        inPorts: ['in1','in2'],
        outPorts: ['out'],
        attrs: {
            '.body': { fill: '#7C68FC', stroke: 'none', rx: 10, ry: 10 },
            '.port-body': { fill: '#31D0C6', stroke: 'none' },
            '.label': { fill: 'white' }
        }
    });
    graph.addCell(m);

    // Navigator plugin initalization
    var nav = new joint.ui.Navigator({
        paperScroller: paperScroller,
        width: 300,
        height: 200,
        padding: 10,
        zoomOptions: { max: 2, min: 0.2 }
    });
    nav.$el.appendTo('#navigator');
    nav.render();

