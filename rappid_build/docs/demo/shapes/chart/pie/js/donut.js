'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 500), width: 500, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 50, y: 20 },
        size: { width: 150, height: 150 },
        sliceDefaults: { innerLabelMargin: 0, legendLabel: '{label}: {value:,} km\u00B2' },
        pieHole: .6,
        series: [
                { label: 'Countries by irrigated land area', data: [
            { value: 558080, label: 'India', fill: '#F16745' },
            { value: 545960, label: 'China', fill: '#FFC65D' },
            { value: 223850, label: 'United States', fill: '#7BC8A4' },
            { value: 182300, label: 'Pakistan', fill: '#4CC3D9' },
            { value: 168050, label: 'EU', fill: '#93648D' }
                ]}
        ],
        attrs: {
            '.legend-slice text': { 'font-size': 13 },
            '.slice-inner-label': { fill: 'black' },
            '.slice-fill': { 
            stroke: 'white',
            'stroke-width': 2
            }
        }
    });
    graph.addCell(chart);

})();
