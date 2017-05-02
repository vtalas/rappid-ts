(function() {

    'use strict';

    var $demo = addPluginDemo('joint.ui.Popup');

    var popup = new joint.ui.Popup({
        content: '<div>Popup content goes here.</div>',
        target: $demo.append($('<div/>'))[0]
    });

    popup.render();
    popup.remove = _.noop;
    $demo.append(popup.el);

})();
