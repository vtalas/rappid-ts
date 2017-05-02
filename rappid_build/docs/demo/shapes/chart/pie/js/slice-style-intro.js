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
        ]}],
        attrs: {
                '.slice-0 .slice-inner-label': { fill: 'black', 'font-size': 20 }
        }
    });

    graph.addCell(chart);

})();
