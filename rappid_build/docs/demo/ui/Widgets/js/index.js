var widgetsDemos = {
    button: { type: 'button', text: 'OK ' },
    label: { type: 'label', text: 'text' },
    inputText: { type: 'inputText', label: 'label', value: 'text' },
    inputNumber: { type: 'inputNumber', label: 'label', value: 123 },
    textarea: { type: 'textarea', label: 'label', value: 'text' },
    checkbox: { type: 'checkbox', label: 'label', value: true },
    range: { type: 'range' },
    separator: [
        { type: 'label', text: 'separtor:' },
        { type: 'separator' },
        { type: 'label', text: 'separtor (width: 20px):' },
        { type: 'separator', width: 20 }
    ],
    selectBox: {
        type: 'select-box', width: 200, options: [
            { content: 'Arial' },
            { content: 'Helvetica' },
            { content: 'Times New Roman' },
            { content: 'Courier New' }
        ]
    },
    selectButtonGroup: {
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
    toggle: { type: 'toggle', label: 'label ', value: true },
    zoomSlider: { type: 'zoomSlider' },
    zoom: [
        { type: 'zoomIn' },
        { type: 'zoomOut' },
        { type: 'zoomToFit' }
    ],
    undo: [
        { type: 'undo' },
        { type: 'redo' }
    ]
};


var queryString = function(param) {

    var url = window.location.search.substring(1);

    var value;
    _.each(url.split('&'), function(variable) {
        var paramPart = variable.split('=');
        if (paramPart[0] == param) {
            value = paramPart[1];
        }
    });

    return value;
};

var key = queryString('widget');
var widgetDef = widgetsDemos[key];

if (key === 'selectBox') {
    $('body').css('height', 140);
}

widgetDef = _.isArray(widgetDef) ? widgetDef : [widgetDef];

var toolbar = new joint.ui.Toolbar({
    tools: widgetDef,
    references: {
        // mocking instances for the purpose of this demo
        paperScroller: {
            options: {
                paper: {
                    on: function() {}
                }
            },
            zoom: function() {},
            zoomToFit: function() {}
        },
        commandManager: {
            undo: function() {},
            redo: function() {}
        }
    }
});

$('body').append(toolbar.render().el);


