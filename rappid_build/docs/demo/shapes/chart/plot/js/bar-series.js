'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 50 },
        size: { width: 650, height: 100 },
        series: [
            { name: 'myserie', label: 'Rate', bars: true, data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: 'd', tickSuffix: ' cat' },
            'y-axis': { min: 0, max: 5, ticks: 5 }
        },
        padding: {
            left: 50, right: 100
        },
        attrs: {
            '.data .myserie path': {
                stroke: '#759d00', 'stroke-width': .5, 'fill-opacity': .8,
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
                'stroke-width': 2
            },
            '.y-axis .tick line': {
                opacity: .1
            },
            '.x-axis .tick line': {
                opacity: .1
            },
            '.legend': {
                transform: 'translate(0, -20)' // Move the legend above the graph.
            },
            '.point': { display: 'none' }
        }
    });
    graph.addCell(chart);

    var t = new joint.ui.Tooltip({
        className: 'tooltip small',
        rootTarget: '[model-id="' + chart.id + '"]',
        target: '.bar',
        content: function(elBar) { return V(elBar).attr('data-y'); },
        bottom: function(target) { return target; },
        direction: 'bottom',
        padding: 10
    });

    // Just prettify the tooltip a little bit and make it transit smoothly from one place to another.
    // Note that this would normally be done best in CSS.
    t.$el.css({
        transition: 'left 100ms linear, top 100ms linear',
        'background-color': 'white',
        'text-shadow': 'none',
        color: 'black'
    });

    $('#btn-bar-series-toggle-points').on('click', function() {
        chart.attr('.point/display', chart.attr('.point/display') === 'none' ? null : 'none');
    });

})();
