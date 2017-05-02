(function() {

    'use strict';

    var types = ['info', 'alert', 'warning', 'success', 'neutral'];
    var links = [
        {
            id: 'btn-open-yes-no',
            text: 'Open Yes/No Dialog'
        },
        {
            id: 'btn-open-video',
            text: 'Open Dialog with an embedded video'
        },
        {
            id: 'btn-open-draggable',
            text: 'Draggable Dialog'
        },
        {
            id: 'btn-open-paper',
            text: 'Dialog with a diagram'
        },
        {
            id: 'btn-open-position',
            text: 'Dialog with buttons left and right'
        },
        {
            id: 'btn-open-notitle-nobuttons',
            text: 'Dialog with no title and no buttons'
        },
        {
            id: 'btn-open-alert',
            text: 'Alert Dialog'
        },
        {
            id: 'btn-open-nomodal',
            text: 'No Modal Dialog'
        }
    ];
    var $demo = addPluginDemo('joint.ui.Dialog');

    _.each(links, function(link) {
        $demo.append($('<a/>').attr('id', link.id).text(link.text));
        $demo.append($('<br/>'));
    });

    var attr = [];
    _.each(types, function(type) {

        var dialog = new joint.ui.Dialog({
            type: type,
            width: 400,
            title: type,
            content: 'Dialog content goes here.',
            inlined: true
        });

        attr.push(dialog.render().el);
    });

    $demo.append(addSubheader('Inlined dialogs', attr));

    /* bind events */
    $('#btn-open-yes-no').on('click', function() {

        var dialog = new joint.ui.Dialog({
            width: 400,
            title: 'Confirm',
            content: '<b>Are you sure?</b>',
            buttons: [
                { action: 'yes', content: 'Yes' },
                { action: 'no', content: 'No' }
            ]
        });

        dialog.on('action:yes', dialog.close, dialog);
        dialog.on('action:no', dialog.close, dialog);
        dialog.open();
    });

    $('#btn-open-video').on('click', function() {

        (new joint.ui.Dialog({
            width: 440,
            title: 'Visual Programming Languages (1993)',
            content: '<iframe width="420" height="315" src="http://www.youtube.com/embed/AEkweKSdnHM" frameborder="0" allowfullscreen></iframe>'
        })).open();
    });

    $('#btn-open-draggable').on('click', function() {

        (new joint.ui.Dialog({
            width: 580,
            draggable: true,
            title: 'I\'m draggable',
            content: 'Drag me around by the titlebar.'
        })).open();
    });

    $('#btn-open-paper').on('click', function() {

        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({ width: 400, height: 200, model: graph, gridSize: 1 });

        (new joint.ui.Dialog({
            width: 420,
            draggable: true,
            title: 'A dialog box with a diagram',
            content: paper.$el
        })).open();

        (new joint.shapes.basic.Rect({
            id: 'a',
            position: { x: 20, y: 20 },
            size: { width: 80, height: 40 },
            attrs: { text: { text: 'A' } }
        })).addTo(graph);

        (new joint.shapes.basic.Rect({
            id: 'b',
            position: { x: 200, y: 20 },
            size: { width: 80, height: 40 },
            attrs: { text: { text: 'B' } }
        })).addTo(graph);

        (new joint.shapes.basic.Rect({
            id: 'c',
            position: { x: 200, y: 150 },
            size: { width: 80, height: 40 },
            attrs: { text: { text: 'C' } }
        })).addTo(graph);

        (new joint.dia.Link({
            source: { id: 'a' },
            target: { id: 'b' },
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        })).addTo(graph);

        (new joint.dia.Link({
            source: { id: 'c' },
            target: { id: 'b' },
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        })).addTo(graph);
    });

    $('#btn-open-position').on('click', function() {

        var dialog = new joint.ui.Dialog({
            width: 580,
            title: 'Buttons left and right',
            content: 'One button on the left, another on the right.',
            buttons: [
                { action: 'leave', content: '&lt; Leave', position: 'left' },
                { action: 'continue', content: 'Continue &gt;', position: 'right' }
            ]
        }).open();

        dialog.on('action:leave action:continue', dialog.close, dialog);
    });

    $('#btn-open-notitle-nobuttons').on('click', function() {

        var dialog = new joint.ui.Dialog({
            width: 580,
            content: 'I have no titlebar and no buttons',
            closeButton: false
        }).open();
    });

    $('#btn-open-alert').on('click', function() {

        new joint.ui.Dialog({
            type: 'alert',
            width: 400,
            title: 'Alert',
            content: 'Watch out!'
        }).open();
    });

    $('#btn-open-nomodal').on('click', function() {

        new joint.ui.Dialog({
            type: 'success',
            width: 400,
            title: 'Not a modal dialog',
            content: 'This dialog is not modal. You can still use the UI under.',
            modal: false,
            draggable: true
        }).open();
    });

})();
