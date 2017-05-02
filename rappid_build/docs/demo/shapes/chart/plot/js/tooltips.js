'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 800), width: 800, height: 200, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Plot({
        position: { x: 50, y: 60 },
        size: { width: 700, height: 100 },
        series: [
            { name: 'one', label: 'One', interpolate: 'stepAfter', data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2.5 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] },
            { name: 'two', label: 'Two', interpolate: 'linear', data: [{ x: 1, y: 3.5 }, { x: 2, y: 2.5 }, { x: 3, y: 1.5 }, { x: 4, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 1.5 } ] },
            { name: 'three', label: 'Three', interpolate: 'bezier', data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3.5 }, { x: 4, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 4 } ] }
        ],
        axis: {
            'x-axis': { tickFormat: '0d', tickSuffix: 'y' },
            'y-axis': { tickFormat: '.2f', tickSuffix: '$', ticks: 5 }
        },
        attrs: {
            '.one path': {
                stroke: 'orange', 'stroke-width': .5, 'stroke-dasharray': [8,5], 'fill-opacity': .3,
                fill: {
                    type: 'linearGradient',
                    stops: [ { offset: '0%', color: 'white' }, { offset: '80%', color: 'orange' } ]
                }
            },
            '.one .point': {
                display: 'none'
            },
            '.three path': {
                stroke: '#3498DB', 'stroke-width': 3
            },
            '.three .point circle': { r: 5, 'opacity': 1, fill: 'white', stroke: 'gray' },
            '.two path': { stroke: 'gray', 'stroke-width': 1 },
            '.two .point circle': { fill: 'white', stroke: 'none' },
            '.axis text': {
                style: { 'text-shadow': '1px 1px 0px lightgray' }
            },
            '.axis path': {
                stroke: 'black',
                'stroke-width': 1
            },
            '.legend': {
                transform: 'translate(0, -50)' // Move the legend above the graph.
            }
        }
    });
    graph.addCell(chart);

    // Get the chart view from the paper associated to the chart model.
    var chartView = paper.findViewByModel(chart);
    // Create tooltip.
    var tooltip = new joint.ui.Tooltip({ direction: 'left', padding: 20 });

    // Prettify our tooltip. Note that this is normally better to do in CSS.
    tooltip.$el.css({ opacity: .9, 'background-color': 'white', color: 'black', 'text-shadow': 'none' });

    // Store the marker point elements so that we can remove them once they're not used.
    var elPoints = [];
    function cleanupPoints() {
        _.invoke(elPoints, 'remove');
        elPoints = [];
    }
    
    chartView.on('mouseover', function(dataPoint, clientPoint, closestPoints, evt) {

        cleanupPoints();

        // Set the HTML content of the tooltip.
        tooltip.options.content = [
            '<em>Interpolated data point</em>:<br/>&nbsp;&nbsp;' + dataPoint.x.toFixed(1) + ' @ ' + dataPoint.y.toFixed(1),
            '<em>Closest points</em>: <br/>&nbsp;&nbsp;' + _.map(closestPoints, function(closestPoint) {
                return '<b>' + closestPoint.serie.label + '</b>: ' + closestPoint.x + 'y @ $' + closestPoint.y
            }).join('<br/>&nbsp;&nbsp;')
        ].join('<br/>');

        // Render the tooltip at the point of the mouse cursor.
        tooltip.render(clientPoint);

        // Render closest points in the chart.
        _.each(closestPoints, function(closestPoint) {
            
            var elPoint = V(chartView.renderPoint(closestPoint, closestPoint.serie));
            // Disable pointer events so that the points are not in the way when hovering over them with mouse cursor.
            elPoint.attr('pointer-events', 'none');
            // Make the point circle and text pretty.
            elPoint.findOne('circle').attr({ r: 3, fill: '#C0392B', stroke: 'black' });
            elPoint.findOne('text').attr({ transform: 'translate(-6, -13)', fill: 'black', 'font-size': 9 });

            elPoints.push(elPoint);
        });
    });

    chartView.on('mouseout', function() {

        cleanupPoints();
        tooltip.hide();
    });

})();
