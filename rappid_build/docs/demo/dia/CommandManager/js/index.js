var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: $('#paper').css('width', 800),
    width: 800,
    height: 360,
    gridSize: 1,
    model: graph
});

var commandManager = new joint.dia.CommandManager({ graph: graph });

var r = new joint.shapes.basic.Rect({
    position: { x: 50, y: 50 }, size: { width: 90, height: 60 },
    attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 8 }, text: { text: 'rect', fill: 'white' } }
});

var c = new joint.shapes.basic.Circle({
    position: { x: 220, y: 150 }, size: { width: 100, height: 60 },
    attrs: {
        circle: { fill: '#FE854F', 'stroke-width': 8, stroke: '#4B4A67' },
        text: { text: 'ellipse', fill: 'white' }
    }
});

graph.addCells([r, c]);

$('#btn-undo').on('click', _.bind(commandManager.undo, commandManager));
$('#btn-redo').on('click', _.bind(commandManager.redo, commandManager));
