(function() {

    'use strict';

    var $demo = addPluginDemo('joint.ui.Toolbar');

    /**
     * Toolbar demo 1
     */
    var tools_1 = [
        {
            type: 'zoom-out',
            name: 'zoom-out'
        },
        {
            type: 'zoom-in',
            name: 'zoom-in'
        },
        {
            type: 'zoom-to-fit',
            name: 'zoom-to-fit'
        },
        { type: 'undo' },
        { type: 'redo' },
        {
            type: 'zoom-slider',
            name: 'zoom-slider'
        },
        {
            type: 'separator'
        },
        {
            type: 'select-button-group', name: 'aaaaa',
            multi: true,
            selected: [1, 3],
            options: [
                {
                    value: 'line-through',
                    content: '<span style="text-decoration: line-through">S</span>',
                    attrs: { '.select-button-group-button': { 'data-tooltip': 'My tooltip' } }
                },
                { value: 'underline', content: '<span style="text-decoration: underline">U</span>' },
                { value: 'italic', content: '<span style="font-style: italic">I</span>' },
                { value: 'bold', content: '<span style="font-weight: bold">B</span>' }
            ]
        },
        {
            type: 'select-box', name: 'selectfont',
            width: 200,
            options: [
                { content: 'Arial' },
                { content: 'Helvetica' },
                { content: 'Times New Roman' },
                { content: 'Courier New' }
            ],
            defaultValue: 'Courier New'
        }
    ];

    var toolbar_1 = new joint.ui.Toolbar({
        references: {
            paperScroller: {
                options: {
                    paper: { on: function() {} }
                },
                zoom: function() {},
                zoomToFit: function() {}
            },
            commandManager: { undo: function() {}, redo: function() {}}
        },
        tools: tools_1
    }).render();

    $demo.append(addSubheader('toolbar demo 1', toolbar_1.el));

    /**
     * Toolbar demo 2
     */
    var tools_2 = [
        { type: 'checkbox', label: ' checkbox: ' },
        { type: 'toggle', label: ' toggle: ', value: true },
        { type: 'separator' },
        { type: 'inputText', label: 'text:' },
        { type: 'inputNumber', label: 'number:', max: 100, min:10, value: 88 },
        { type: 'textarea', label: 'textarea:', value: 'default value' }
    ];

    var toolbar_2 = new joint.ui.Toolbar({
        tools: tools_2
    }).render();

    $demo.append(addSubheader('toolbar demo 2', toolbar_2.el));

    /**
     * Toolbar with group
     */
    var toolbar_3 = new joint.ui.Toolbar({
            className: 'toolbar toolbar3',
            groups: {
                'group-a': { index: 1 },
                'group-b': { index: 3, align: 'right' },
                'group-c': { index: 2, align: 'right' }
            },
            tools: [
                { group: 'group-a', type: 'label', text: 'group a: ' },
                { group: 'group-a', type: 'button', name: '1', text: '1' },
                { group: 'group-a', type: 'button', name: '2', text: '2' },
                { group: 'group-a', type: 'separator' },

                { group: 'group-b', type: 'separator' },
                { group: 'group-b', type: 'label', text: 'group b: ' },
                { group: 'group-b', type: 'button', name: 'a', text: 'a' },
                { group: 'group-b', type: 'checkbox', label: ' checkbox:' },

                { group: 'group-c', type: 'label', text: 'group c: ' },
                { group: 'group-c', type: 'button', name: 'Cc', text: 'Cc' }
            ]
        }
    );

    $demo.append(addSubheader('toolbar demo with groups', toolbar_3.render().el));

})();
