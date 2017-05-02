(function() {

    'use strict';

    var $demo = addPluginDemo('joint.ui.SelectButtonGroup');
    var selectButtonGroup = new joint.ui.SelectButtonGroup({
        multi: true,
        selected: [1, 3],
        options: [
            { value: 'line-through', content: '<span style="text-decoration: line-through">S</span>', attrs: { '.select-button-group-button': { 'data-tooltip': 'My tooltip' } } },
            { value: 'underline', content: '<span style="text-decoration: underline">U</span>' },
            { value: 'italic', content: '<span style="font-style: italic">I</span>' },
            { value: 'bold', content: '<span style="font-weight: bold">B</span>' }
        ]
    });

    $demo.append(selectButtonGroup.render().el);

    var disabledButtonGroup = new joint.ui.SelectButtonGroup({
        multi: true,
        selected: [1, 3],
        options: [
            { value: 'line-through', content: '<span style="text-decoration: line-through">S</span>', attrs: { '.select-button-group-button': { 'data-tooltip': 'My tooltip' } } },
            { value: 'underline', content: '<span style="text-decoration: underline">U</span>' },
            { value: 'italic', content: '<span style="font-style: italic">I</span>' },
            { value: 'bold', content: '<span style="font-weight: bold">B</span>' }
        ],
        disabled: true
    });

    $demo.append(addSubheader('disabled', disabledButtonGroup.render().el));

    var group2 = new joint.ui.SelectButtonGroup({
        selected: 1,
        iconWidth: '70%',
        options: [
            { value: 'left', icon: 'joint.ui.SelectButtonGroup/images/icon-align-left.png', iconSelected: 'joint.ui.SelectButtonGroup/images/icon-align-left-selected.png' },
            { value: 'center', icon: 'joint.ui.SelectButtonGroup/images/icon-align-center.png', iconSelected: 'joint.ui.SelectButtonGroup/images/icon-align-center-selected.png' },
            { value: 'right', icon: 'joint.ui.SelectButtonGroup/images/icon-align-right.png', iconSelected: 'joint.ui.SelectButtonGroup/images/icon-align-right-selected.png' }
        ]
    });

    $demo.append(addSubheader('iconSelected: <i id="group2-selection"></i>', group2.render().el));
    $('#group2-selection').text(group2.getSelection().value);
    group2.on('option:select', function(selection, index) {
        $('#group2-selection').text(selection.value);
    });

    var group3 = new joint.ui.SelectButtonGroup({
        selected: 1,
        width: 180,
        buttonWidth: 58,
        buttonHeight: 44,
        options: [
            { value: 'rounded-rectangle', icon: 'joint.ui.SelectButtonGroup/images/rounded-rectangle.png' },
            { value: 'line', icon: 'joint.ui.SelectButtonGroup/images/line.png' },
            { value: 'none', icon: 'joint.ui.SelectButtonGroup/images/none.png' },
            { value: 'ellipse', icon: 'joint.ui.SelectButtonGroup/images/ellipse.png' },
            { value: 'cloud', icon: 'joint.ui.SelectButtonGroup/images/cloud.png' },
            { value: 'oval', icon: 'joint.ui.SelectButtonGroup/images/oval.png' },
            { value: 'rectangle', icon: 'joint.ui.SelectButtonGroup/images/rectangle.png' },
            { value: 'diamond', icon: 'joint.ui.SelectButtonGroup/images/diamond.png' }
        ]
    });

    $demo.append(addSubheader('multiline: <i id="group3-selection"></i>', group3.render().$el));
    $('#group3-selection').text(group3.getSelection().value);

    group3.on('option:select', function(selection, index) {
        $('#group3-selection').text(selection.value);
    });

})();
