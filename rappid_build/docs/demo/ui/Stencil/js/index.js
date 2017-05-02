'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 800),
        width: 800,
        height: 600,
        gridSize: 1,
        model: graph
    });

    var stencil = new joint.ui.Stencil({ 
        graph: graph, 
        paper: paper,
        width: 200,
        height: 200
    });

    $('#stencil-container').append(stencil.render().el);

    var r = new joint.shapes.basic.Rect({ 
        position: { x: 10, y: 10 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 8 }, text: { text: 'rect', fill: 'white' } }
    });
    
    var c = new joint.shapes.basic.Circle({ 
        position: { x: 100, y: 10 }, size: { width: 70, height: 40 },
        attrs: { circle: { fill: '#FE854F', 'stroke-width': 8, stroke: '#4B4A67' }, text: { text: 'ellipse', fill: 'white' } }
    });

    var c2 = new joint.shapes.basic.Circle({ 
        position: { x: 10, y: 70 }, size: { width: 70, height: 40 },
        attrs: { circle: { fill: '#4B4A67', 'stroke-width': 8, stroke: '#FE854F' }, text: { text: 'ellipse', fill: 'white' } }
    });

    var r2 = new joint.shapes.basic.Rect({ 
        position: { x: 100, y: 70 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#4B4A67', stroke: '#31D0C6', 'stroke-width': 8 }, text: { text: 'rect', fill: 'white' } }
    });
    
    var r3 = new joint.shapes.basic.Rect({ 
        position: { x: 10, y: 130 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 8 }, text: { text: 'rect', fill: 'white' } }
    });
    
    var c3 = new joint.shapes.basic.Circle({ 
        position: { x: 100, y: 130 }, size: { width: 70, height: 40 },
        attrs: { circle: { fill: '#FE854F', 'stroke-width': 8, stroke: '#4B4A67' }, text: { text: 'ellipse', fill: 'white' } }
    });

    stencil.load([r, c, c2, r2, r3, c3]);
    
})();
