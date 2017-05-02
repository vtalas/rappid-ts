(function() {

    'use strict';

    var $demo = addPluginDemo('joint.ui.Tooltip');
    var $tooltip = $('#joint-ui-Tooltip');
    $tooltip.addClass('open');
    var target = $('<div/>').appendTo($demo)[0];

    var tooltip = new joint.ui.Tooltip({
        target: target,
        content: 'Manual top directed tooltip.',
        top: target,
        direction: 'top',
        trigger: 'manual'
    });

    tooltip.show();
    $demo.append(tooltip.el);

    var tooltip2 = new joint.ui.Tooltip({
        target: target,
        content: 'Manual left directed tooltip.',
        left: target,
        direction: 'left',
        trigger: 'manual'
    });

    tooltip2.show();
    $demo.append(tooltip2.el);

    var tooltip3 = new joint.ui.Tooltip({
        target: target,
        content: 'Manual right directed tooltip.',
        right: target,
        direction: 'right',
        trigger: 'manual'
    });

    tooltip3.show();
    $demo.append(tooltip3.el);

    var tooltip4 = new joint.ui.Tooltip({
        target: target,
        content: 'Manual bottom directed tooltip.',
        bottom: target,
        direction: 'bottom',
        trigger: 'manual'
    });

    tooltip4.show();
    $demo.append(tooltip4.el);

    $demo.append($('<div/>').addClass('html-tooltip').text('html tooltip'));
    new joint.ui.Tooltip({
        target: '.html-tooltip',
        content: '<h4>HTML Tooltip</h4> <img src="http://jointjs.client.io/images/logos/jointjs_1.png" width="80" style="position: absolute; top: 10px; right: 10px;"/><hr/><b>JointJS</b> tooltips can contain arbitrary HTML.',
        direction: 'left',
        left: '.html-tooltip'
    });
    $tooltip.removeClass('open');
})();
