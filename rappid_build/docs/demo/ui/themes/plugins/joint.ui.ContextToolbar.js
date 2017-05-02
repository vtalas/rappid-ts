(function() {

    'use strict';

    var contextToolbar = new joint.ui.ContextToolbar({
        tools: [
            { action: 'hide', content: 'hide' },
            { action: 'info', content: 'info' },
            { action: 'no', icon: './joint.ui.ContextToolbar/images/icon-image-list.png' },
            { action: 'list', content: 'list' }
        ],
        target: $('body')[0]
    });

    var html = $('<div />').append(contextToolbar.render().$el.eq(0).clone().attr('style', '')).html();
    var $newEl = $(html);

    addPluginDemo('joint.ui.ContextToolbar', $newEl);

    contextToolbar.unbind();
    contextToolbar.$el.remove();
    contextToolbar.$el = $newEl;
    contextToolbar.el = $newEl[0];

})();
