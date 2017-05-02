(function() {

    'use strict';

    var $demo = addPluginDemo('joint.ui.Inspector');
    
    var cell = new joint.shapes.basic.Rect({
        size: { width: 80, height: 60 },
        attrs: {
            rect: {
                fill: '#fe854f',
                stroke: '#33334e'
            }
        }
    });

    var cell2 = new joint.shapes.basic.Rect({
        size: { width: 80, height: 60 },
        attrs: {
            rect: {
                fill: '#fe854f',
                stroke: '#33334e'
            }
        },
        nestedList: [['foo', 'bar'], ['baz']]
    });

    var colorPaletteOptions = [
        { content: 'transparent' },
        { content: '#31d0c6' },
        { content: '#7c68fc' },
        { content: '#61549C' },
        { content: '#fe854f' },
        { content: '#feb663' },
        { content: '#f6f6f6' },
        { content: '#222138' },
        { content: '#33334e' },
        { content: '#4b4a67' },
        { content: '#3c4260' },
        { content: '#6a6c8a' },
        { content: '#c6c7e2' }
    ];

    var inspectorDefs = {
        inputs: {
            attrs: {
                rect: {
                    fill: {
                        label: 'Fill color',
                        type: 'color-palette',
                        options: colorPaletteOptions,
                        group: 'presentation',
                        index: 1
                    },
                    stroke: {
                        label: 'Stroke',
                        type: 'color-palette',
                        options: colorPaletteOptions,
                        group: 'presentation',
                        index: 2
                    },
                    'stroke-width': {
                        label: 'Stroke width',
                        type: 'range',
                        min: 0,
                        max: 30,
                        defaultValue: 1,
                        step: .5,
                        unit: 'px',
                        group: 'presentation',
                        index: 3
                    },
                    'toggle': {
                        label: 'Toggle example',
                        type: 'toggle',
                        defaultValue: 1,
                        group: 'presentation',
                        index: 4
                    },
                    'select-button-group': {
                        label: 'SelectButtonGroup',
                        type: 'select-button-group',
                        multi: true,
                        defaultValue: ['underline', 'bold'],
                        options: [
                            { value: 'line-through', content: '<span style="text-decoration: line-through">S</span>', attrs: { '.select-button-group-button': { 'data-tooltip': 'My tooltip' } } },
                            { value: 'underline', content: '<span style="text-decoration: underline">U</span>' },
                            { value: 'italic', content: '<span style="font-style: italic">I</span>' },
                            { value: 'bold', content: '<span style="font-weight: bold">B</span>' }
                        ],
                        group: 'presentation',
                        index: 5
                    },
                    'select-button-group-disabled': {
                        label: 'Disabled SelectButtonGroup',
                        type: 'select-button-group',
                        multi: true,
                        disabled: true,
                        defaultValue: ['underline', 'bold'],
                        options: [
                            { value: 'line-through', content: '<span style="text-decoration: line-through">S</span>', attrs: { '.select-button-group-button': { 'data-tooltip': 'My tooltip' } } },
                            { value: 'underline', content: '<span style="text-decoration: underline">U</span>' },
                            { value: 'italic', content: '<span style="font-style: italic">I</span>' },
                            { value: 'bold', content: '<span style="font-weight: bold">B</span>' }
                        ],
                        group: 'presentation',
                        index: 6
                    }
                },
                text: {
                    textarea: {
                        label: 'Textarea',
                        type: 'textarea',
                        group: 'text',
                        index: 1
                    },
                    'font-family': {
                        label: 'Font family',
                        type: 'select-box',
                        options: [
                            { content: 'Arial' },
                            { content: 'Helvetica' },
                            { content: 'Times New Roman' },
                            { content: 'Courier New' }
                        ],
                        defaultValue: 'Courier New',
                        group: 'text',
                        index: 3
                    },
                    'color': {
                        label: 'color popup',
                        type: 'color',
                        group: 'text',
                        index: 4
                    },
                    text: {
                        label: 'Text',
                        type: 'text',
                        group: 'text',
                        index: 5
                    },
                    number: {
                        label: 'Number',
                        type: 'number',
                        group: 'text',
                        defaultValue: 4,
                        index: 6
                    }
                }
            }
        },
        groups: {
            presentation: { label: 'Presentation', index: 1 },
            text: { label: 'Text', index: 2 }
        }
    };

    var inspectorDefs2 = {
        inputs: {

            nestedList: {
                type: 'list',
                group: 'data',
                item: {
                    type: 'list',
                    item: { type: 'text' }
                }
            },
            nestedObject: {
                type: 'object',
                group: 'data',
                properties: {
                    nested: {
                        type: 'object',
                        properties: {
                            one: { type: 'text' },
                            two: { type: 'text' }
                        }
                    },
                    shallow: { type: 'text' }
                }
            },

            labels: {
                type: 'list',
                addButtonLabel: 'Add New Label',
                removeButtonLabel: 'Remove Label',
                group: 'labels',
                item: {
                    type: 'object',
                    properties: {
                        position: { type: 'range', min: 0.1, max: .9, step: .1, defaultValue: .5, label: 'position', index: 2 },
                        attrs: {
                            text: {
                                text: {
                                    type: 'text', label: 'text', defaultValue: 'label', index: 1
                                }
                            }
                        }
                    }
                }
            }
        },
        groups: {
            labels: { label: 'Labels', index: 1 },
            'connection': { label: 'Connection', index: 2 },
            'nestedList': { label: 'Nested List', index: 3 },
            'nestedObject': { label: 'Nested Object', index: 4 }
        }
    };

    var inspector = new joint.ui.Inspector({
        inputs: inspectorDefs.inputs,
        groups: inspectorDefs.groups,
        cell: cell
    });

    var inspector2 = new joint.ui.Inspector({
        inputs: inspectorDefs2.inputs,
        groups: inspectorDefs2.groups,
        cell: cell2
    });

    inspector.render();
    inspector2.render();
    // Fill undefined cell's attributes with default values.
    inspector.updateCell();
    inspector2.updateCell();

    $demo.append(inspector.el, inspector2.el);

})();
