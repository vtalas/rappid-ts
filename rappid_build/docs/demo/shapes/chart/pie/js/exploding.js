'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 700), width: 700, height: 400, model: graph, gridSize: 1 });

    function fill() {

        return randomColor();
    }

    var colors = [
        '#90C3D4',
        '#D4A190',
        '#A1D490',
        '#C390D4',
        '#E3ED87',
        '#87EDEB',
        '#B887ED',
        '#ED8789',
        '#BCED87',
        'red',
        'green',
        'yellow',
        'purple',
        'orange',
        'blue'
    ];

    function randomColor() {

        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }

    var chart = new joint.shapes.chart.Pie({
        position: { x: 50, y: 70 },
        size: { width: 280, height: 280 },
        sliceDefaults: { 
            innerLabelMargin: 0,    // TODO: Setting this to 1 screws up the position of the labels completely.
            legendLabel: '{label}: {value:.01f}%',
            innerLabel: '{value:.01f}%',
        },
        series: [
                { label: 'Content languages for websites (March, 2014)', data: [
            { value: 55.7, label: 'English', fill: fill() },
            { value: 6.0, label: 'Russian', fill: fill(), offset: 20 },
            { value: 6.0, label: 'German', fill: fill() },
            { value: 5.0, label: 'Japanese', fill: fill(), offset: 20 },
            { value: 4.6, label: 'Spanish', fill: fill(), offset: 30 },
            { value: 4.0, label: 'French', fill: fill(), offset: 20 },
            { value: 3.3, label: 'Chinese', fill: fill(), offset: 20 },
            { value: 2.3, label: 'Portuguese', fill: fill(), offset: 40 },
            { value: 1.8, label: 'Italian', fill: fill(), offset: 30 },
            { value: 1.7, label: 'Polish', fill: fill(), offset: 20 },
            { value: 1.3, label: 'Turkish', fill: fill(), offset: 10 },
            { value: 1.3, label: 'Dutch', fill: fill(), offset: 50 },
            { value: 0.8, label: 'Arabic', fill: fill(), offset: 20 },
            { value: 0.8, label: 'Persian', fill: fill(), offset: 40 },
            { value: 0.7, label: 'Czech', fill: fill(), offset: 50 },
             { value: 0.6, label: 'Swedish', fill: fill(), offset: 30 }
                ]}
        ],
        attrs: {
            '.legend': { 'ref-dx': 80 },
            '.legend-slice text': { 'font-size': 11 },
            '.slice-inner-label': { fill: 'black', 'font-size': 10 },
            '.slice-fill': { 
            stroke: 'white',
            'stroke-width': 2
            }
        }
    });

    graph.addCell(chart);

})();
