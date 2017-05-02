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

    var snaplines = new joint.ui.Snaplines({ paper: paper });
    snaplines.startListening();

    (new joint.shapes.basic.Rect({ 
        position: { x: 50, y: 50 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 2 }, text: { text: 'rect', fill: 'white' } }
    })).addTo(graph);
    
    (new joint.shapes.basic.Circle({ 
        position: { x: 220, y: 150 }, size: { width: 80, height: 40 },
        attrs: { circle: { fill: '#FE854F', 'stroke-width': 2, stroke: '#4B4A67' }, text: { text: 'ellipse', fill: 'white' } }
    })).addTo(graph);

})();
