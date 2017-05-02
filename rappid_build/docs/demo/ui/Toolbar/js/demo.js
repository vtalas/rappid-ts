var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    width: 800, height: 600, gridSize: 10, drawGrid: true, model: graph
});

var paperScroller = new joint.ui.PaperScroller({
    paper: paper,
    autoResizePaper: true
});

var commandManager = new joint.dia.CommandManager({
    graph: graph
});

var toolbar = new joint.ui.Toolbar({
    // initialize tools with default settings
    tools: ['zoomIn', 'zoomOut', 'zoomToFit', 'zoomSlider', 'undo', 'redo'],
    references: {
        paperScroller: paperScroller,
        commandManager: commandManager
    }
});

var body = $('body');
body.append(toolbar.render().el);
body.append($('<div/>').css({ width: 600, height: 300 }).append(paperScroller.el));

paperScroller.render().center();

// we don't need to include initialization into undo/redo stack
commandManager.stopListening();

new joint.shapes.basic.Rect({
    position: { x: 200, y: 200 }, size: { width: 200, height: 150 }, attrs: { rect: { fill: '#6a6b8c' } }
}).addTo(graph);

new joint.shapes.basic.Circle({
    position: { x: 250, y: 250 }, size: { width: 200, height: 150 }, attrs: { circle: { fill: '#222138' } }
}).addTo(graph);

commandManager.listen();
