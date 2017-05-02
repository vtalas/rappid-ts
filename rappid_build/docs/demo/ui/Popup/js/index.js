'use strict';

    $('#popup-demo .btn-open').on('click', function(evt) {
        evt.preventDefault();
        (new joint.ui.Popup({
            content: 'I am a ui.Popup!',
            target: this
        })).render();
    });

    $('#popup-demo .btn-open-image').on('click', function(evt) {
        evt.preventDefault();
        (new joint.ui.Popup({
            content: '<img width="100" style="float: left" src="images/amsterdam1.jpg" />',
            target: this
        })).render();
    });

    $('#popup-demo .btn-open-diagram').on('click', function(evt) {
        evt.preventDefault();
        (new joint.ui.Popup({
            content: function(el) {
                var graph = new joint.dia.Graph;
                var paper = new joint.dia.Paper({
                    width: 200,
                    height: 100,
                    gridSize: 1,
                    model: graph
                });
                $(el).append(paper.el);
                var r1 = new joint.shapes.basic.Rect({ position: { x: 10, y: 10 }, size: { width: 50, height: 30 }, attrs: { text: { text: 'r1' }, rect: { fill: '#FE854F' } } });
                var r2 = new joint.shapes.basic.Rect({ position: { x: 90, y: 40 }, size: { width: 50, height: 30 }, attrs: { text: { text: 'r2' }, rect: { fill: '#7C68FC' } } });
                var l = new joint.dia.Link({ source: { id: r1.id }, target: { id: r2.id } });
                graph.addCells([r1, r2, l]);
            },
            target: this
        })).render();
    });

    $('#popup-demo circle').on('click', function() {
        var popup = new joint.ui.Popup({
            events: {
                'click .btn-cancel': 'remove',
                'click .btn-change': function() {
                    var strokeWidth = parseInt(this.$('.inp-stroke-width').val(), 10);
                    var fill = this.$('.inp-fill').val();
                    V(this.options.target).attr({ fill: fill, 'stroke-width': strokeWidth });
                }
            },
            content: [
                '<div>',
                'Fill: <input class="inp-fill" type="color" value="#31D0C6" /> <br/><br/>',
                'Stroke width: <input class="inp-stroke-width" type="number" value="5" /> <br/><br/>',
                '<button class="btn-cancel">Cancel</button>',
                '<button class="btn-change">Change</button>',
                '</div>'
            ].join(''),
            target: this
        });
        popup.render();
    });

