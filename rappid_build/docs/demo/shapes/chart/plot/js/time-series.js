'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 250, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({

        position: { x: 60, y: 30 },
        size: { width: 700, height: 190 },
        series: [
            { name: 'avg_pv', label: 'Measured temp', interpolate: 'bezier', data: _.map(temperatureLogs, function(log, i) { return { x: new Date(log._id.minute).getTime(), y: log.avg_pv/10 } }) },
            { name: 'min_sp', label: 'Set temp', interpolate: 'stepAfter', data: _.map(temperatureLogs, function(log, i) { return { x: new Date(log._id.minute).getTime(),  y: log.min_sp/10 } }) }
        ],
        axis: {
            'x-axis': {
                tickFormat: function(v) {
                    function pad(n) { return (n + '').length === 1 ? '0' + n : n + '' }
                    var d = new Date(v);
                    var date = d.getDate();
                    var month = (d.getMonth() + 1);
                    var hours = d.getHours();
                    var minutes = d.getMinutes();
                    return pad(date) + '/' + pad(month) + ' ' + pad(hours) + ':' + pad(minutes);
                },
                tickStep: 30
            },
            'y-axis': { tickFormat: function(v) { return joint.util.format.number('.1f', v) + ' dgC'} }
        },
        attrs: {
            '.data .avg_pv path': { stroke: '#3CA6FF', 'stroke-width': 2, 'fill-opacity': .2 },
            '.data .min_sp path': { stroke: '#FF7800', 'stroke-width': 2, 'fill-opacity': .2 },
            '.caption': { text: '', 'font-family': 'Arial', fill: 'white' },
            '.subcaption': { text: '', 'font-family': 'Arial', fill: 'lightgray', 'text-decoration': 'underline' },
            '.background rect': { fill: 'white' },
            '.point': { display: 'none' },
            '.point circle': { fill: 'black', stroke: 'white', opacity: 1 },
            '.point text': { display: 'inline', transform: 'translate(0, -12)' },
            '.x-axis .tick:nth-child(2n)': { display: 'none' },
            '.y-axis .tick:nth-child(2n)': { display: 'none' }
        }
    });

    chart.legendPosition('se');

    graph.addCell(chart);

})();
