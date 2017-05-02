'use strict';

$(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper'),
        width: '100%',
        height: 200,
        gridSize: 1,
        model: graph
    });

    var colorPaletteOptions = [
        { content: '#ffffff' }, { content: '#7c68fc' }, { content: '#61549C' }, { content: '#feb663' }, { content: '#00ff00' },
        { content: '#222138' }, { content: '#31D0C6' }, { content: '#FE854F' }, { content: '#33334e' }, { content: '#4B4A67' },
        { content: '#4B4A67' }, { content: '#3c4260' }, { content: '#6a6c8a' }, { content: '#ff0000' }, { content: '#00a23a' }
    ];

    var data = {
        inputs: {
            attrs: {
                circle: {
                    fill: {
                        type: 'color-palette', options: colorPaletteOptions,
                        group: 'presentation', label: 'fill', index: 1
                    },
                    stroke: {
                        type: 'color-palette', options: colorPaletteOptions,
                        group: 'presentation', label: 'outline', index: 2
                    },
                    'stroke-width': {
                        type: 'range', min: 0, max: 50, unit: 'px',
                        group: 'presentation', label: 'outline width', index: 3
                    }
                },
                text: {
                    text: { type: 'textarea', group: 'text', label: 'Text', index: 1 },
                    'font-size': { type: 'range', min: 5, max: 30, group: 'text', label: 'Font size', index: 2 },
                    'font-family': {
                        type: 'select',
                        options: ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Garamond', 'Tahoma', 'Lucida Console', 'Comic Sans MS'],
                        label: 'Font family', group: 'text', index: 3
                    },
                    fill: {
                        type: 'color-palette', options: colorPaletteOptions,
                        group: 'text', label: 'color', index: 4
                    }
                }
            }
        },
        groups: {
            presentation: { label: 'Presentation', index: 1 },
            text: { label: 'Text', index: 2 }
        }
    };

    function createInspector(cell) {

        return joint.ui.Inspector.create('#inspector', _.extend({
            cell: cell
        }, data));
    }

    paper.on('cell:pointerdown', function(cellView) {
        createInspector(cellView.model);
    });

    var r = new joint.shapes.basic.Circle({
        position: { x: 50, y: 50 }, size: { width: 90, height: 90 },
        attrs: {
            circle: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 8 },
            text: { text: 'circle', fill: '#4B4A67', 'font-size': 20 }
        }
    });

    var c = new joint.shapes.basic.Circle({
        position: { x: 120, y: 100 }, size: { width: 90, height: 60 },
        attrs: {
            circle: { fill: '#FE854F', 'stroke-width': 3, stroke: '#4B4A67' },
            text: { text: 'ellipse', fill: '#ffffff' }
        }
    });

    graph.addCells([r, c]);

    // Show Inspector immediately for the rectangle so that it is visible to the reader straight away.
    createInspector(r);
});
