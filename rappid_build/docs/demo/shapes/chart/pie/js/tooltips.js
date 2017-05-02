'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 400), width: 400, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 50, y: 20 },
        size: { width: 150, height: 150 },
        series: [ { data: [
                { value: 40, label: 'Organic', fill: '#8bce5d' },
                { value: 20, label: 'Email', fill: '#53abdd' },
                { value: 20, label: 'Social', fill: '#c377b1' },
                { value: 20, label: 'Referral', fill: '#ffe891' }
        ]}]
    });

    graph.addCell(chart);

    // Enable tooltips.
    var t = new joint.ui.Tooltip({
        rootTarget: '[model-id="' + chart.id + '"]',
        target: '.slice',
        direction: 'left',
        padding: 30
    });

    var chartView = paper.findViewByModel(chart);
    // TIP: try to change mousemove to mouseover, you should see
    // the tooltips appear at fixed position next to the slice.
    chartView.on('mousemove', function(slice, evt) {

        t.options.content = [
            'value: <strong>' + slice.value + '</strong>',
            'label: ' + joint.util.format.string('{percentage:.0f}%', slice)
        ].join('<br/>');
        t.render({ x: evt.clientX, y: evt.clientY });
    });

    chartView.on('mouseout', function() { t.hide(); });

})();
