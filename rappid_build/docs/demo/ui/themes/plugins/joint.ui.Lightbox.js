(function() {

    'use strict';

    var images = [
        'joint.ui.Lightbox/images/prague1.jpg'
    ];

    var $imageThumbnailsContainer = $('<div class="image-thumbnails"/>');

    _.each(images, function(image) {
        $imageThumbnailsContainer.append($('<img class="image-thumbnail"/>').attr('src', image));
    });

    $imageThumbnailsContainer.find('img').on('click', function() {

        var lightbox = new joint.ui.Lightbox({
            title: 'Image caption goes here.',
            image: $(this).attr('src')
        }).open();
    });

    var $instructions = $('<p>Click the image to reveal the lightbox.</p>');
    var $demo = addPluginDemo('joint.ui.Lightbox', $instructions, $imageThumbnailsContainer);


})();
