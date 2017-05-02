'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 20 },
        size: { width: 650, height: 150 },
        series: [
            { name: 'mybars', bars: { barWidth: 20 }, data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3.6 }, { x: 4, y: -3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] },
            { name: 'myanotherbars', bars: { barWidth: 20 }, data: [{ x: 1, y: 5 }, { x: 2, y: -2 }, { x: 3, y: 4 }, { x: 4, y: 1 }, { x: 5, y: 3 }, { x: 6, y: 5 } ] },
            { name: 'myline', interpolate: 'bezier', data: [{ x: 1, y: 5 }, { x: 2, y: -2 }, { x: 3, y: 4 }, { x: 4, y: 1 }, { x: 5, y: 3 }, { x: 6, y: 5 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: 'd', tickSuffix: ' cat' },
            'y-axis': { min: -4, max: 5, ticks: 5 }
        },
        markings: [
            { name: 'y-marking', start: { y: 0 } }
        ],
        padding: {
            top: 20, bottom: 40, left: 50, right: 100
        },
        attrs: {
            '.data .mybars .bar': {
                'stroke-width': 0, 'stroke-dasharray': [8,1], 'fill-opacity': .8,
                fill: '#D71947'
            },
            '.data .myanotherbars path': {
                transform: 'translate(25)',
                'stroke-width': 0, 'fill-opacity': .8,
                fill: '#0B8EAC'
            },
            '.axis text': {
                style: { 'text-shadow': '1px 1px 0px lightgray' }
            },
            '.axis path': {
                stroke: 'black',
                'stroke-width': 1
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
    
    chart.legendPosition('sw');
    graph.addCell(chart);


    var t = new joint.ui.Tooltip({
        className: 'tooltip small',
        rootTarget: '[model-id="' + chart.id + '"]',
        target: '.bar',
        content: function(elBar) { return V(elBar).attr('data-x') + ' cat: <b>' + V(elBar).attr('data-y') + '</b>'; },
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
