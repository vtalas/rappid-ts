'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper'), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 50 },
        size: { width: 700, height: 100 },
        series: [
            { name: 'myserie', label: 'Rate', interpolate: 'bezier', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': {
                tickFormat: '0d',
                tickSuffix: function(value) {
                    var lastDigit = _.last(value + '');
                    if (lastDigit === '1') return 'st day';
                    if (lastDigit === '2') return 'nd day';
                    if (lastDigit === '3') return 'rd day';
                    return 'th day';
                }
            },
            'y-axis': { tickFormat: '.2f', ticks: 5 }
        },
        attrs: {
            '.data .myserie path': {
                stroke: '#759d00', 'stroke-width': 1, 'stroke-dasharray': [8,1], 'fill-opacity': .2,
                fill: {
                    type: 'linearGradient',
                    stops: [ { offset: '0%', color: '#b4f200' }, { offset: '80%', color: '#759d00' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                }
            },
            '.myserie .point circle': {
                r: 3, 'opacity': .8, fill: '#b4f200'
            },
            '.axis text': {
                style: { 'text-shadow': '1px 1px 0px lightgray' }
            },
            '.axis path': {
                stroke: '#759d00',
                'stroke-width': 1
            }
        }
    });
    graph.addCell(chart);
    chart.legendPosition('nw');

    $('.btn-legend-position').on('click', function(evt) {
        chart.legendPosition($(evt.target).data('position'));
    });

})();
