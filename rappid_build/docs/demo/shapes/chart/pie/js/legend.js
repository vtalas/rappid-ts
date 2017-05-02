'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 700), width: 700, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 20, y: 80 },
        size: { width: 100, height: 100 },
        series: [ { data: [
                { value: 40, label: 'Organic', fill: '#8bce5d' },
                { value: 20, label: 'Email', fill: '#53abdd' },
                { value: 20, label: 'Social', fill: '#c377b1' },
                { value: 20, label: 'Referral', fill: '#ffe891' }
        ]}]
    });
    graph.addCell(chart);

    var chart2 = chart.clone();
    chart2.translate(320, -70);
    chart2.attr('.legend/ref-x', -100);
    graph.addCell(chart2);

    var chart3 = chart2.clone();
    chart3.translate(200, 80);
    chart3.prop('sliceDefaults/legendLabel', '{label} is {value}%');
    chart3.prop('sliceDefaults/legendLabelLineHeight', 8);
    chart3.prop('sliceDefaults/legendLabelMargin', 25);
    chart3.attr('.legend/ref-y', -80);
    chart3.attr('.legend/ref-x', .5);
    chart3.attr('.legend/x-alignment', -.5);
    chart3.attr('.legend-slice text/fill', '#336699');
    chart3.attr('.legend-slice text/font-weight', 'bold');
    chart3.attr('.legend-slice text/text-decoration', 'underline');
    chart3.attr('.legend-slice text/font-size', 13);
    chart3.attr('.legend-slice circle/r', 9);
    chart3.attr('.legend-slice circle/stroke', 'black');
    chart3.attr('.legend-slice circle/stroke-width', 1);
    graph.addCell(chart3);

})();
