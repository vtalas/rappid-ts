(function() {

    'use strict';

    var $body = $('body');
    var $demo = addPluginDemo('joint.ui.Navigator');
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('<div/>').css({ width: 400, height: 300 }).appendTo($body),
        width: 1600,
        height: 1200,
        gridSize: 10,
        model: graph
    });

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper
    });
    paperScroller.$el.css({ width: 500, height: 400 });

    $body.append(paperScroller.render().el);
    paperScroller.center();

    var cell = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 },
        size: { width: 120, height: 80 },
        attrs: {
            rect: {
                fill: '#fff'
            },
            text: {
                text: ''
            }
        }
    });

    cell.set('position', {
        x: (paper.$el.width() - cell.get('size').width) / 2,
        y: (paper.$el.height() - cell.get('size').height) / 2
    });

    graph.addCell(cell);

    paperScroller.$el.css({
        position: 'absolute',
        left: '-99999em',
        top: 0
    });

    var nav = new joint.ui.Navigator({
        paperScroller: paperScroller,
        width: 400,
        height: 300,
        padding: 0,
        zoomOptions: { max: 2, min: 0.2 }
    });

    nav.$el.appendTo($demo);
    nav.render();

})();
