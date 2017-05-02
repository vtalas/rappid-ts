'use strict';

(function() {
    
    $('.context-toolbar .btn-open').on('click', function(evt) {

        evt.preventDefault();
        evt.stopPropagation();

        var ct = new joint.ui.ContextToolbar({
        tools: [
            { action: 'yes', content: 'Yes' },
            { action: 'no', content: 'No' },
            { action: 'maybe', content: 'Maybe' },
            { action: 'sure', content: 'Sure' }
        ],
            target: this
        });

        ct.on('action:yes', function() { alert('Yes') });
        ct.on('action:no', function() { alert('No') });
        ct.on('action:maybe', function() { alert('Maybe') });
        ct.on('action:sure', function() { alert('Sure') });

        ct.render();
    });

    $('.context-toolbar circle').on('click', function() {

        var circle = this;

        var ct = new joint.ui.ContextToolbar({
        tools: [
            { action: 'hide', content: 'Hide' },
            { action: 'info', content: 'Info' },
            { action: 'remove', content: 'Remove' }
        ],
            target: circle
        });

        ct.on('action:hide', ct.remove, ct);
        ct.on('action:remove', function() {
            V(circle).remove();
            ct.remove();
        });
        ct.on('action:info', function() {
            alert('This is an SVG circle');
        });

        ct.render();
    });

})();
