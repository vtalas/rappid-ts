(function() {

    'use strict';

    var $paper = $('<div class="paper" />');

    addPluginDemo('joint.ui.FreeTransform', $paper);

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $paper,
        width: $paper.width(),
        height: $paper.height(),
        gridSize: 10,
        model: graph
    });

    paper.drawGrid();

    var cell = new joint.shapes.basic.Rect({
        size: { width: 80, height: 60 },
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
        x: ($paper.width() - cell.get('size').width) / 2,
        y: ($paper.height() - cell.get('size').height) / 2
    });

    graph.addCell(cell);

    function renderPlugin(cellView) {

        var freetransform = new joint.ui.FreeTransform({ cellView: cellView });
        freetransform.render();
        $paper.append(freetransform.el);
    }

    renderPlugin(paper.findViewByModel(cell));
    paper.on('cell:pointerup', renderPlugin);

})();
