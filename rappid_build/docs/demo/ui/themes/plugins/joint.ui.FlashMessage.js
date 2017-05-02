(function() {

    'use strict';

    var types = ['info', 'alert', 'warning', 'success', 'neutral'];
    var $demo = addPluginDemo('joint.ui.FlashMessage');

    _.each(types, function(type) {

        var flashMessage = new joint.ui.FlashMessage({
            type: type,
            width: 600,
            title: 'Title for ' + type + ' flash message',
            content: 'A sample flash message with important information.',
            model: false,
            closeAnimation: false
        });

        flashMessage.open();
        flashMessage.unbind();

        $demo.append(flashMessage.render().el);
    });
})();
