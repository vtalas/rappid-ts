(function() {

    'use strict';

    var $papers = $('<div class="papers"/>');

    addPluginDemo('joint.ui.Halo', $papers);

    var haloTypes = ['pie', 'surrounding', 'toolbar'];

    _.each(haloTypes, function(haloType) {

        var $paper = $('<div class="paper" />');

        $papers.append($paper);

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
            size: { width: 40 + (haloType.length * 8), height: 60 },
            attrs: {
                text: {
                    text: haloType
                }
            }
        });

        cell.set('position', {
            x: ($paper.width() - cell.get('size').width) / 2,
            y: ($paper.height() - cell.get('size').height) / 2
        });

        graph.addCell(cell);

        function renderPlugin(cellView) {

            var cell = cellView.model;
            if (cell.isLink()) return;

            var options = {
                graph: graph,
                paper: paper,
                cellView: cellView,
                rotateAngleGrid: 2,
                type: haloType,
                clone: function(cell, opt) {
                    var clone = cell.clone().unset('z');
                    if (opt.fork) clone.translate(cell.get('size').width + 20, 0);
                    if (opt.clone) clone.translate(20, 20);
                    return clone;
                }
            };

            if (cell.get('multiplePieToggleButtons')) {
                options.pieToggles = [
                    { name: 'left', position: 'w' },
                    { name: 'right', position: 'e' },
                    { name: 'top', position: 'n' },
                    { name: 'bottom', position: 's' }
                ];
            }

            var halo = new joint.ui.Halo(options);
            halo.render();
            $paper.append(halo.el);
        }

        renderPlugin(paper.findViewByModel(cell));
        paper.on('cell:pointerup', renderPlugin);
    });

})();
