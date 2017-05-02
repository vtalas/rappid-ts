'use strict';

    var group2 = new joint.ui.SelectButtonGroup({
        selected: 1,
        iconWidth: '70%',
        options: [
            { value: 'left', icon: 'images/icon-align-left.png', iconSelected: 'images/icon-align-left-selected.png' },
            { value: 'center', icon: 'images/icon-align-center.png', iconSelected: 'images/icon-align-center-selected.png' },
            { value: 'right', icon: 'images/icon-align-right.png', iconSelected: 'images/icon-align-right-selected.png' }
        ]
    });

    $('#select-button-group-icons').append(group2.render().el);

