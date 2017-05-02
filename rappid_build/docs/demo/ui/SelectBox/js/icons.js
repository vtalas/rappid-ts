'use strict';

$(function() {

    var selectBox = new joint.ui.SelectBox({
        width: 250,
        options: [
            { icon: 'images/dialog.png', content: 'ui.Dialog', selected: true },
            { icon: 'images/navigator.png', content: 'ui.Navigator' },
            { icon: 'images/halo.png', content: 'ui.Halo' },
            { icon: 'images/inspector.png', content: 'ui.Inspector' }
        ]
    });

    $('#select-box-icons').append(selectBox.render().el);

});
