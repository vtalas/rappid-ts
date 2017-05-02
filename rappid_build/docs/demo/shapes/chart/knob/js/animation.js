'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 200), width: 200, height: 160, model: graph, gridSize: 1 });

    var knob = new joint.shapes.chart.Knob({
        position: { x: 50, y: 30 },
        size: { width: 100, height: 100 },
        min: 0, max: 100, value: 80,
        pieHole: .9,
        fill: '#2c97de'
    });
    graph.addCell(knob);

    $('.btn-animation-piehole').on('click', function() {
    var pieHole = knob.get('pieHole');
    knob.transition('pieHole', pieHole === .9 ? .4 : .9, { duration: 700 });
    });
    
    $('.btn-animation-value').on('click', function() {
        var value = knob.prop('value');
        knob.transition('value', value ? 0 : 80, { duration: 700 });
    });

    $('.btn-animation-fill').on('click', function() {
        var original = '#2c97de';
        var fill = knob.prop('fill');
        knob.transition('fill', fill === original ? '#ff0000' : original, {
            duration: 700,
            valueFunction: joint.util.interpolate.hexColor
        });
    });

})();
