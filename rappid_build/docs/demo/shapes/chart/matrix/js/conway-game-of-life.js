'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 700), width: 700, height: 700, gridSize: 1, model: graph });

    var liveCell = { fill: '#6a6c8a' };
    var size = 50;

    // Universe.
    var universe = new joint.shapes.chart.Matrix({
        position: { x: 10, y: 10 },
        size: { width: 600, height: 600 },
        cells: randomConfiguration(size),
        labels: {
            rows: [],
            columns: []
        }
    });
    graph.addCell(universe);

    paper.on('cell:pointerup', function(cellView) {

        var halo = new joint.ui.Halo({ cellView: cellView, useModelGeometry: true });
        halo.render();
    });

    function step() {

        var cells = universe.get('cells');
        var newCells = JSON.parse(JSON.stringify(cells));

        for (var i = 0; i < cells.length; i++) {

            var prevRow = cells[i - 1] || [];
            var nextRow = cells[i + 1] || [];
            var row = cells[i];

            for (var j = 0; j < row.length; j++) {

                var cell = row[j];
                var liveNeighbours = 0;

                if (row[j + 1]) liveNeighbours += 1;
                if (row[j - 1]) liveNeighbours += 1;
                if (prevRow[j]) liveNeighbours += 1;
                if (prevRow[j + 1]) liveNeighbours += 1;
                if (prevRow[j - 1]) liveNeighbours += 1;
                if (nextRow[j]) liveNeighbours += 1;
                if (nextRow[j + 1]) liveNeighbours += 1;
                if (nextRow[j - 1]) liveNeighbours += 1;

                var isUnderPopulated = liveNeighbours < 2;
                if (cell && isUnderPopulated) {
                    // cell dies.
                    newCells[i][j] = null;
                }
                var isOvercrowded = liveNeighbours > 3;
                if (cell && isOvercrowded) {
                    // cell dies.
                    newCells[i][j] = null;
                }
                var isReproduced = liveNeighbours === 3;
                if (!cell && isReproduced) {
                    // cell becomes live.
                    newCells[i][j] = liveCell;
                }
            }
        }

        universe.set('cells', newCells);

        if (!window.stopGame) {
            joint.util.nextFrame(step);
        }
    }

    step();


    // UI.
    // ---

    $('#btn-random').on('click', function() {

        universe.set('cells', randomConfiguration(size));
    });

    $('#btn-gosper-glider-gun').on('click', function() {

        universe.set('cells', gosperGliderGunConfiguration(size));
    });


    // Configurations.
    // ---------------

    function randomConfiguration(size) {
        
        var cells = [];
        _.each(_.range(0, size), function() {

            var row = [];
            row.length = size;
            cells.push(row);
            _.each(row, function(cell, i) {

                if (Math.random() < .3) {
                    row[i] = liveCell;
                }
            });
        });
        return cells;
    }

    function gosperGliderGunConfiguration(size) {

        var cells = [];
        _.each(_.range(0, size), function() {

            var row = [];
            row.length = size;
            cells.push(row);
        });

        cells[5][1] = liveCell;
        cells[5][2] = liveCell;
        cells[6][1] = liveCell;
        cells[6][2] = liveCell;

        cells[5][11] = liveCell;
        cells[6][11] = liveCell;
        cells[7][11] = liveCell;
        cells[4][12] = liveCell;
        cells[3][13] = liveCell;
        cells[3][14] = liveCell;
        cells[6][15] = liveCell;
        cells[4][16] = liveCell;
        cells[5][17] = liveCell;
        cells[6][17] = liveCell;
        cells[7][17] = liveCell;
        cells[6][18] = liveCell;
        cells[8][16] = liveCell;
        cells[9][14] = liveCell;
        cells[9][13] = liveCell;
        cells[8][12] = liveCell;

        cells[3][21] = liveCell;
        cells[4][21] = liveCell;
        cells[5][21] = liveCell;
        cells[3][22] = liveCell;
        cells[4][22] = liveCell;
        cells[5][22] = liveCell;
        cells[2][23] = liveCell;
        cells[6][23] = liveCell;
        cells[6][25] = liveCell;
        cells[7][25] = liveCell;
        cells[1][25] = liveCell;
        cells[2][25] = liveCell;

        cells[3][35] = liveCell;
        cells[4][35] = liveCell;
        cells[3][36] = liveCell;
        cells[4][36] = liveCell;

        return cells;
    }

})();
