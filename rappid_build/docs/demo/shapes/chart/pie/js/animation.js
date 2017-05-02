'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 400), width: 400, height: 300, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 40, y: 20 },
        size: { width: 200, height: 200 },
        series: [ { data: [
                { value: 40, label: 'Organic', fill: '#8bce5d', offset: 0 },
                { value: 20, label: 'Email', fill: '#53abdd' },
                { value: 20, label: 'Social', fill: '#c377b1' },
                { value: 20, label: 'Referral', fill: '#ffe891' }
        ]}],
        attrs: {
            '.slice-inner-label': { 'font-size': 12, fill: '#ffffff', 'font-weight': 'bold' }
        }
    });
    graph.addCell(chart);

    $('.btn-animation-piehole').on('click', function() {
        var pieHole = chart.get('pieHole');
        chart.transition('pieHole', pieHole ? 0 : .6, { duration: 700 });
    });
    
    $('.btn-animation-offset').on('click', function() {
        var offset = chart.prop('series/0/data/0/offset');
        chart.transition('series/0/data/0/offset', offset ? 0 : 50, { duration: 700 });
    });

    $('.btn-animation-font').on('click', function() {
        chart.transition('attrs/.slice-inner-label/font-size', 30, { duration: 700 });
        chart.transition('attrs/.slice-inner-label/fill', '#000000', {
            duration: 700,
            valueFunction: joint.util.interpolate.hexColor
        });
    });

    $('.btn-animation-degree').on('click', function() {
        var degree = chart.prop('serieDefaults/degree');
        chart.transition('serieDefaults/degree', degree === 360 ? 200 : 360, {
            duration: 700
        });
    });

    $('.btn-animation-fill').on('click', function() {
        var original = '#8bce5d';
        var fill = chart.prop('series/0/data/0/fill');
        chart.transition('series/0/data/0/fill', fill === original ? '#ff0000' : original, {
            duration: 700,
            valueFunction: joint.util.interpolate.hexColor
        });
    });

})();
