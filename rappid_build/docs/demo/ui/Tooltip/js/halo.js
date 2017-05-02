'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css({'width': 800, overflow: 'hidden'}),
        width: 800,
        height: 300,
        gridSize: 1,
        model: graph
    });

    var createHalo = function(model) {
        var halo = new joint.ui.Halo({
            graph: graph,
            paper: paper,
            cellView: paper.findViewByModel(model)
        }).render();


        halo.changeHandle('remove', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click to remove the object',
                    'data-tooltip-position': 'right'
                }
            }
        });
        halo.changeHandle('fork', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to clone and connect the object in one go',
                    'data-tooltip-position': 'left'
                }
            }
        });
        halo.changeHandle('clone', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to clone the object',
                    'data-tooltip-position': 'left'
                }
            }
        });
        halo.changeHandle('unlink', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click to break all connections to other objects',
                    'data-tooltip-position': 'right'
                }
            }
        });
        halo.changeHandle('link', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to connect the object',
                    'data-tooltip-position': 'left'
                }
            }
        });
        halo.changeHandle('rotate', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to rotate the object',
                    'data-tooltip-position': 'right'
                }
            }
        });

        halo.changeHandle('resize', {
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to resize the object',
                    'data-tooltip-position': 'left'
                }
            }
        });
        halo.toggleUnlink();
    };

    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        createHalo(cellView.model);
    });

    var r = new joint.shapes.basic.Rect({
        position: { x: 130, y: 110 }, size: { width: 160, height: 60 },
        attrs: {
            rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 2 },
            text: { text: 'Hover over my tools.', fill: 'white', style: { 'text-shadow': '1px 1px 2px black' } }
        }
    });

    graph.addCell(r);

    // Show Halo immediately for the rectangle so that it is visible to the reader straight away.
    createHalo(r);

    new joint.ui.Tooltip({
        rootTarget: document.body,
        target: '[data-tooltip]',
        padding: 15
    });

})();
