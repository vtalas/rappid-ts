$('.btn-display').on('click', function(evt) {
    evt.preventDefault();
    (new joint.ui.FlashMessage({
        title: 'Message',
        type: 'alert',
        content: '<em>Some error message.</em>'
    })).open();
});

$('.btn-display-width').on('click', function(evt) {
    evt.preventDefault();
    (new joint.ui.FlashMessage({
        width: 150,
        title: 'Message',
        content: '<em>A normal message of some kind.</em>'
    })).open();
});

$('.btn-display-modal').on('click', function(evt) {
    evt.preventDefault();
    (new joint.ui.FlashMessage({
        type: 'alert',
        closeAnimation: false,
        modal: true,
        title: 'Modal Message',
        content: '<em>This is a modal Flash message requiring the user to close the message manually.</em>'
    })).open();
});

$('.btn-close-all').on('click', function(evt) {
    evt.preventDefault();
    joint.ui.FlashMessage.close();
});

$('.btn-display-more').on('click', function(evt) {
    evt.preventDefault();
    joint.ui.FlashMessage.open('ui.FlashMessage 1');
    joint.ui.FlashMessage.open('ui.FlashMessage alert', '', { type: 'alert', closeAnimation: { delay: 1000 } });
    joint.ui.FlashMessage.open('ui.FlashMessage warning', '', { type: 'warning', closeAnimation: { delay: 2000 } });
    joint.ui.FlashMessage.open('ui.FlashMessage success', '', { type: 'success', closeAnimation: { delay: 3000 } });
    joint.ui.FlashMessage.open('ui.FlashMessage neutral', '', { type: 'neutral' });
    joint.ui.FlashMessage.open('ui.FlashMessage info', '', { type: 'info' });
    joint.ui.FlashMessage.open('ui.FlashMessage close delay 3s', '', {
        type: 'neutral',
        closeAnimation: { delay: 3000 }
    });
    joint.ui.FlashMessage.open('ui.FlashMessage with title', 'Title');
    joint.ui.FlashMessage.open('ui.FlashMessage without close animation', '', { closeAnimation: false });
});

