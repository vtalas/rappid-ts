(function() {
    'use strict';

    var keyboard = new joint.ui.Keyboard();

    function checkModifiers(event) {
        $('.demo_mod').each(function(index, element) {
            toggleHighLight(keyboard.isActive($(element).text(), event), $(element));
        });
    }

    function initShortcuts(items) {
        items.each(function(index, element) {
            if (!$(element).hasClass('disabled')) {
                keyboard.on($(element).text(), function(event) {
                    event.preventDefault();
                    highLight($(element));
                });
            }
        });
    }

    function toggleHighLight(toggle, element) {
        element.toggleClass('active', toggle);
    }

    function highLight(element) {
        element.addClass('active');
        setTimeout(function() {
            element.removeClass('active');
        }, 100);
    }

    $(function() {

        keyboard.on('all', function(normalizedEventName, event) {
            checkModifiers(event);
        });

        initShortcuts($('.demo_no_context .demo_item'));
    });

    function handleDocumentFocus() {
        if (document.hasFocus()) {
            $('.overlay').hide();
        } else {
            $('.overlay').show();
        }
    }

    handleDocumentFocus();
    setInterval(function() {
        handleDocumentFocus();
    }, 1000);

    $('.overlay').click(function() {
        $(this).hide();
    })

}());
