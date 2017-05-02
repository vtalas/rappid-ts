'use strict';

(function() {

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 800),
        width: 800,
        height: 300,
        gridSize: 1,
        perpendicularLinks: true,
        model: graph,
        interactive: { vertexAdd: false }
    });

    var r = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 },
        size: { width: 120, height: 80 },
        attrs: { 
            text: { text: 'Edit me.', fill: 'white', 'font-size': 20, 'font-family': 'Montserrat', 'font-weight': 'normal' },
            rect: {
                fill: '#7c68fc', stroke: 'none', rx: 5, ry: 5
            }
        }
    });
    graph.addCell(r);

    var c = new joint.shapes.basic.Circle({
        position: { x: 350, y: 200 },
        size: { width: 80, height: 80 },
        attrs: {
            text: { text: 'Me too.', fill: '#4b4a67', 'font-size': 18, 'font-family': 'Montserrat' },
            circle: {
                fill: '#fe854f', stroke: 'none'
            }
        }
    });
    graph.addCell(c);

    var l = new joint.dia.Link({
        source: { id: r.id },
        target: { id: c.id },
        labels: [
            { position: .5, attrs: { text: { text: 'label' } } }
        ]
    });
    graph.addCell(l);

    paper.on('cell:pointerdblclick', function(cellView, evt) {

        joint.ui.TextEditor.edit(evt.target, {
            cellView: cellView,
            textProperty: cellView.model.isLink() ? 'labels/0/attrs/text/text' : 'attrs/text/text'
        });
    });

    paper.on('blank:pointerdown', function(cellView, evt) {
        joint.ui.TextEditor.close();
    });

    function autosize(element) {

        var view = paper.findViewByModel(element);
        var text = view.$('text')[0];
        // Use bounding box without transformations so that our autosizing works
        // even on e.g. rotated element.
        var bbox = V(text).bbox(true);
        // Give the element some padding on the right/bottom.
        element.resize(bbox.width + 50, bbox.height + 50);
    }

    autosize(r);
    autosize(c);
    graph.on('change:attrs', function(cell) { 
        if (!cell.isLink()) {
            autosize(cell)
        }
    });
    
})();
