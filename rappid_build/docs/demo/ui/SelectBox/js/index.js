'use strict';

$(function() {

    var selectBox = new joint.ui.SelectBox({
        width: 200,
        options: [
            { content: 'Amsterdam' },
            { content: 'Prague', selected: true },
            { content: 'London' },
            { content: 'San Francisco' },
            { content: 'New York' }
        ]
    });

    $('#select-box-basic').append(selectBox.render().el);

});
