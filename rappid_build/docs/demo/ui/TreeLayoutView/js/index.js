'use strict';

(function() {

    function makeLink(parentElementLabel, childElementLabel) {

        return new joint.dia.Link({
            source: { id: parentElementLabel },
            target: { id: childElementLabel },
            attrs: {
                '.marker-target': {
                    d: 'M 4 0 L 0 2 L 4 4 z',
                    fill: '#7c68fc',
                    stroke: '#7c68fc'
                },
                '.connection': {
                    stroke: '#7c68fc'
                }
            },
            connector: {
                name: 'rounded'
            }
        });
    }

    function makeElement(label) {

        var maxLineLength = _.max(label.split('\n'), function(l) {
            return l.length;
        }).length;

        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 10;
        var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
        var height = 2 * ((label.split('x').length + 1) * letterSize);

        return new joint.shapes.basic.Rect({
            id: label,
            size: { width: width, height: height },
            attrs: {
                text: {
                    text: label,
                    'font-size': letterSize,
                    'font-family': 'monospace',
                    fill: 'white'
                },
                rect: {
                    width: width, height: height,
                    rx: 5, ry: 5,
                    stroke: 'transparent',
                    fill: {
                        type: 'linearGradient',
                        stops: [
                            { offset: '0%', color: '#31d0c6' },
                            { offset: '80%', color: '#7c68fc' }
                        ],
                        attrs: {
                            x1: 0, x2: 0, y1: 0, y2: 1
                        }
                    }
                }
            },
            rankDir: 'R'
        });
    }

    function buildGraphFromAdjacencyList(adjacencyList) {

        var elements = [];
        var links = [];

        _.each(adjacencyList, function(edges, parentElementLabel) {
            elements.push(makeElement(parentElementLabel));

            _.each(edges, function(childElementLabel) {
                links.push(makeLink(parentElementLabel, childElementLabel));
            });
        });

        // Links must be added after all the elements. This is because when the links
        // are added to the graph, link source/target
        // elements must be in the graph already.
        return elements.concat(links);
    }

    var list = {
        'az': ['b', 'cy'],
        'b': ['fxf'],
        'cy': ['ey', 'dxdy'],
        'dxdy': ['iy'],
        'ey': ['hy'],
        'fxf': ['g'],
        'g': [],
        'hy': [],
        'iy': []
    };

    var cells = buildGraphFromAdjacencyList(list);

    // Create paper and populate the graph.
    // ------------------------------------

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css({'width': 800, overflow: 'hidden'}),
        width: 800,
        height: 600,
        gridSize: 1,
        model: graph,
        interactive: false,
        defaultLink: makeLink() // ui.
    });

    graph.resetCells(cells);

    var graphLayout = new joint.layout.TreeLayout({
        graph: graph,
        verticalGap: 20,
        horizontalGap: 40
    });

    // root position stays the same after the layout
    var root = cells[0].position(50, 200);

    var treeLayoutView = new joint.ui.TreeLayoutView({
        theme: 'material',
        paper: paper,
        model: graphLayout
    });

    graphLayout.layout();

})();
