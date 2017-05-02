'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 800),
        width: 800,
        height: 360,
        gridSize: 1,
        model: graph
    });

    var r = new joint.shapes.basic.Rect({ 
        position: { x: 50, y: 50 }, size: { width: 90, height: 60 },
        attrs: { rect: { fill: '#31D0C6', stroke: 'none' }, text: { text: 'rect', fill: 'white' } }
    });
    var c = new joint.shapes.basic.Circle({ 
        position: { x: 220, y: 150 }, size: { width: 90, height: 60 },
        attrs: { circle: { fill: '#FE854F', stroke: 'none' }, text: { text: 'ellipse', fill: 'white' } }
    });

    graph.addCells([r, c]);

    $('.open-as-svg').on('click', function() { paper.openAsSVG(); });

})();
