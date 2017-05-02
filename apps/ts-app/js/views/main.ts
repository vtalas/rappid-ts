import * as joint from '../../../../rappid_build/rappid'

const App = window['App'] || {};

export class MainView extends joint.mvc.View {

    graph: joint.dia.Graph;
    commandManager;
    paper;
    snaplines: joint.ui.Snaplines;
    paperScroller: joint.ui.PaperScroller;
    stencil: joint.ui.Stencil;
    keyboard: joint.ui.Keyboard;
    clipboard: joint.ui.Clipboard;
    selection: joint.ui.Selection;
    toolbar: joint.ui.Toolbar;
    navigator: joint.ui.Navigator;

    init() {

        window['app'] = this;

        this.initializePaper();
        this.initializeStencil();
        this.initializeSelection();
        this.initializeHaloAndInspector();
        this.initializeNavigator();
        this.initializeToolbar();
        this.initializeKeyboardShortcuts();
        this.initializeTooltips();
    }

    // Create a graph, paper and wrap the paper in a PaperScroller.
    initializePaper() {

        const graph = this.graph = new joint.dia.Graph;

        graph.on('add', function (cell, collection, opt) {
            if (opt.stencil) this.createInspector(cell);
        }, this);

        this.commandManager = new joint.dia.CommandManager({graph: graph});

        const paper = this.paper = new joint.dia.Paper({
            width: 1000,
            height: 1000,
            gridSize: 10,
            drawGrid: true,
            model: graph,
            // defaultLink: new joint.shapes.app.Link
            defaultLink: new joint.dia.Link
        });

        paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
        paper.on('cell:mousewheel', this.onMousewheel, this);

        this.snaplines = new joint.ui.Snaplines({paper: paper});

        const paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            cursor: 'grab'
        });

        this.$('.paper-container').append(paperScroller.el);

        paperScroller.render().center();
    }

    // Create and populate stencil.
    initializeStencil() {

        const stencil = this.stencil = new joint.ui.Stencil({
            paper: this.paperScroller,
            snaplines: this.snaplines,
            scaleClones: true,
            width: 240,
            groups: App.config.stencil.groups,
            dropAnimation: true,
            groupsToggleButtons: true,
            search: {
                '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
                'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
            },
            // Use default Grid Layout
            layout: true,
            // Remove tooltip definition from clone
            dragStartClone: function (cell) {
                return cell.clone().removeAttr('./data-tooltip');
            }
        });

        this.$('.stencil-container').append(stencil.el);
        stencil.render().load(App.config.stencil.shapes);
    }

    initializeKeyboardShortcuts() {

        this.keyboard = new joint.ui.Keyboard();
        this.keyboard.on({

            'ctrl+c': function () {
                // Copy all selected elements and their associated links.
                this.clipboard.copyElements(this.selection.collection, this.graph);
            },

            'ctrl+v': function () {

                const pastedCells = this.clipboard.pasteCells(this.graph, {
                    translate: {dx: 20, dy: 20},
                    useLocalStorage: true
                });

                const elements = _.filter(pastedCells, function (cell: any) {
                    return cell.isElement();
                });

                // Make sure pasted elements get selected immediately. This makes the UX better as
                // the user can immediately manipulate the pasted elements.
                this.selection.collection.reset(elements);
            },

            'ctrl+x shift+delete': function () {
                this.clipboard.cutElements(this.selection.collection, this.graph);
            },

            'delete backspace': function (evt) {
                evt.preventDefault();
                this.graph.removeCells(this.selection.collection.toArray());
            },

            'ctrl+z': function () {
                this.commandManager.undo();
                this.selection.cancelSelection();
            },

            'ctrl+y': function () {
                this.commandManager.redo();
                this.selection.cancelSelection();
            },

            'ctrl+a': function () {
                this.selection.collection.reset(this.graph.getElements());
            },

            'ctrl+plus': function (evt) {
                evt.preventDefault();
                this.paperScroller.zoom(0.2, {max: 5, grid: 0.2});
            },

            'ctrl+minus': function (evt) {
                evt.preventDefault();
                this.paperScroller.zoom(-0.2, {min: 0.2, grid: 0.2});
            },

            'keydown:shift': function (evt) {
                this.paperScroller.setCursor('crosshair');
            },

            'keyup:shift': function () {
                this.paperScroller.setCursor('grab');
            }

        }, this);
    }

    initializeSelection() {

        this.clipboard = new joint.ui.Clipboard();
        this.selection = new joint.ui.Selection({
            paper: this.paper,
            handles: App.config.selection.handles
        });

        // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
        // Otherwise, initiate paper pan.
        this.paper.on('blank:pointerdown', function (evt, x, y) {

            if (this.keyboard.isActive('shift', evt)) {
                this.selection.startSelecting(evt);
            } else {
                this.selection.cancelSelection();
                this.paperScroller.startPanning(evt, x, y);
            }

        }, this);

        this.paper.on('element:pointerdown', function (elementView, evt) {

            // Select an element if CTRL/Meta key is pressed while the element is clicked.
            if (this.keyboard.isActive('ctrl meta', evt)) {
                this.selection.collection.add(elementView.model);
            }

        }, this);

        this.selection.on('selection-box:pointerdown', function (elementView, evt) {

            // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
            if (this.keyboard.isActive('ctrl meta', evt)) {
                this.selection.collection.remove(elementView.model);
            }

        }, this);
    }

    createInspector(cell) {

        return joint.ui.Inspector.create('.inspector-container', _.extend({
            cell: cell
        }, App.config.inspector[cell.get('type')]));
    }

    initializeHaloAndInspector() {

        this.paper.on('element:pointerup link:options', function (cellView: joint.dia.CellView) {

            const cell = cellView.model;

            if (!this.selection.collection.contains(cell)) {

                if (cell.isElement()) {

                    new joint.ui.FreeTransform({
                        cellView: cellView,
                        allowRotation: false,
                        preserveAspectRatio: !!cell.get('preserveAspectRatio'),
                        allowOrthogonalResize: cell.get('allowOrthogonalResize') !== false
                    }).render();

                    new joint.ui.Halo({
                        cellView: cellView,
                        handles: App.config.halo.handles
                    }).render();

                    this.selection.collection.reset([]);
                    this.selection.collection.add(cell, {silent: true});
                }

                this.createInspector(cell);
            }
        }, this);
    }

    initializeNavigator() {

        const navigator = this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false
        });

        this.$('.navigator-container').append(navigator.el);
        navigator.render();
    }

    initializeToolbar() {

        const toolbar = this.toolbar = new joint.ui.Toolbar({
            groups: App.config.toolbar.groups,
            tools: App.config.toolbar.tools,
            references: {
                paperScroller: this.paperScroller,
                commandManager: this.commandManager
            }
        });

        toolbar.on({
            'svg:pointerclick': _.bind(this.openAsSVG, this),
            'png:pointerclick': _.bind(this.openAsPNG, this),
            'fullscreen:pointerclick': _.bind(joint.util.toggleFullScreen, joint.util, document.body),
            'to-front:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toFront'),
            'to-back:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toBack'),
            'layout:pointerclick': _.bind(this.layoutDirectedGraph, this),
            'snapline:change': _.bind(this.changeSnapLines, this),
            'clear:pointerclick': _.bind(this.graph.clear, this.graph),
            'print:pointerclick': _.bind(this.paper.print, this.paper),
            'grid-size:change': _.bind(this.paper.setGridSize, this.paper)
        });

        this.$('.toolbar-container').append(toolbar.el);
        toolbar.render();
    }

    changeSnapLines(checked) {

        if (checked) {
            this.snaplines.startListening();
            this.stencil.options.snaplines = this.snaplines;
        } else {
            this.snaplines.stopListening();
            this.stencil.options.snaplines = null;
        }
    }

    initializeTooltips() {

        new joint.ui.Tooltip({
            rootTarget: document.body,
            target: '[data-tooltip]',
            direction: 'auto',
            padding: 10
        });
    }

    openAsSVG() {

        this.paper.toSVG(function (svg) {
            new joint.ui.Lightbox({
                title: '(Right-click, and use "Save As" to save the diagram in SVG format)',
                image: 'data:image/svg+xml,' + encodeURIComponent(svg)
            }).open();
        }, {preserveDimensions: true, convertImagesToDataUris: true});
    }

    openAsPNG() {

        this.paper.toPNG(function (dataURL) {
            new joint.ui.Lightbox({
                title: '(Right-click, and use "Save As" to save the diagram in PNG format)',
                image: dataURL
            }).open();
        }, {padding: 10});
    }

    onMousewheel(cellView, evt, x, y, delta) {

        if (this.keyboard.isActive('alt', evt)) {
            evt.preventDefault();
            this.paperScroller.zoom(delta * 0.2, {min: 0.2, max: 5, grid: 0.2, ox: x, oy: y});
        }
    }

    layoutDirectedGraph() {

        joint.layout.DirectedGraph.layout(this.graph, {
            setLinkVertices: () => true,
            rankDir: 'TB',
            marginX: 100,
            marginY: 100
        });

        this.paperScroller.centerContent();
    }
}

