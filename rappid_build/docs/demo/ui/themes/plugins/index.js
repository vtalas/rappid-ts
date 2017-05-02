$(function() {

    'use strict';

    var currentTheme;
    var selectThemeButtonGroup = new joint.ui.SelectButtonGroup({
        multi: false,
        theme: 'material',
        selected: [1],
        options: [
            { value: 'default', content: 'default'},
            { value: 'modern', content: 'modern' },
            { value: 'dark', content: 'dark' },
            { value: 'material', content: 'material' }
        ]
    });
    $('#theme-select').append(selectThemeButtonGroup.render().el);

    selectThemeButtonGroup.on('option:select', function(selection, index) {
        setTheme(selection.value, currentTheme);
    });

    setTheme(selectThemeButtonGroup.getSelection().value, currentTheme);

    function setTheme(newTheme, oldTheme) {

        joint.setTheme(newTheme);

        var $html = $('html');

        if (oldTheme) {
            $html.removeClass('app-theme-' + oldTheme);
        }

        $html.addClass('app-theme-' + newTheme);

        currentTheme = newTheme;
    }
    $('#plugins .nav-item').on('click', function(event) {
        event.preventDefault();
        var id = $( this ).find('a').attr('href');
        var scrollTop = $(window).scrollTop(); // save current scroll position
        window.location.hash=id;
        $(window).scrollTop(scrollTop); // keep scroll at current position
        $('.plugin.open').removeClass('open');
        $(id).addClass('open');
        $('.nav-item.open').removeClass('open');
        $( this ).addClass('open');
    });
    var hash = window.location.hash;
    if (hash) {
        $(hash).addClass('open');
        $('.ui-tabs-nav a[href="'+hash+'"]').parent().addClass('open');

    } else {
        $('#plugins .nav-item a').first().click();
    }
});
