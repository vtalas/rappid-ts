'use strict';


    var group1 = new joint.ui.SelectButtonGroup({
        multi: true,
        selected: [1, 3],
        options: [
            { value: 'line-through', content: '<span style="text-decoration: line-through">S</span>', attrs: { '.select-button-group-button': { 'data-tooltip': 'My tooltip' } } },
            { value: 'underline', content: '<span style="text-decoration: underline">U</span>' },
            { value: 'italic', content: '<span style="font-style: italic">I</span>' },
            { value: 'bold', content: '<span style="font-weight: bold">B</span>' }
        ]
    });

    $('#select-button-group-basic').append(group1.render().el);

    group1.on('option:select', function(selection, index) {
        console.log('option:select', selection, index);
    });

    group1.on('option:hover', function(option, index) {
        console.log('option:hover', option, index);
    });

