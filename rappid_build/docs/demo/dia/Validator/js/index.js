'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 400),
        width: 400,
        height: 300,
        gridSize: 1,
        model: graph
    });

    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        var halo = new joint.ui.Halo({ graph: graph, paper: paper, cellView: cellView });
        halo.render();
    });

    var r = new joint.shapes.basic.Rect({ 
        position: { x: 50, y: 50 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 2 }, text: { text: 'rect', fill: 'white' } }
    });
    var c = new joint.shapes.basic.Circle({ 
        position: { x: 220, y: 170 }, size: { width: 70, height: 40 },
        attrs: { circle: { fill: '#FE854F', 'stroke-width': 2, stroke: '#4B4A67' }, text: { text: 'ellipse', fill: 'white' } }
    });

    var t = new joint.shapes.basic.Text({
        position: { x: 200, y: 70 },
        size: { width: 120, height: 60 },
        attrs: { text: { text: 'Text', fill: 'black' } }
    });

    graph.addCells([r, c, t]);

    // Show Halo immediately for the rectangle so that it is visible to the reader straight away.

    new joint.ui.Halo({ graph: graph, paper: paper, cellView: paper.findViewByModel(r) }).render();


    // Below is an example showing how to use Validator and also some common validation functions.
    // -------------------------------------------------------------------------------------------

    var commandManager = new joint.dia.CommandManager({ graph: graph });

    var validator = new joint.dia.Validator({ commandManager: commandManager });

    // register validation functions
    validator.validate('change:position', clear, display);
    validator.validate('change:source change:target add', isLink, connectivity, multiplicity);
    validator.validate('remove', isNotLink, function(err, command, next) {
        return next('Removing elements is not permitted!');
    })

    // validator triggers an invalid event everytime the validations ends with an error
    validator.on('invalid', function(err) {
        // show the reason why was a command invalid
        $('#message').text(err).fadeIn(0).delay(3000).fadeOut(0);
    });

    // VALIDATION FUNCTIONS
    //-------------------
    // These are only examples of validation functions.

    // Check if cell in command is a link. Continue validating if yes, otherwise stop.
    function isLink(err, command, next) {
        if (command.data.type === 'link') return next(err);
        // otherwise stop validating (don't call next validation function)
    }

    // Check if cell in command is not a link. Continue validating if yes, otherwise stop.
    function isNotLink(err, command, next) {
        if (command.data.type !== 'link') return next(err);
        // otherwise stop validating (don't call next validation function)
    }

    // alert an error
    function display(err, command, next) {
        if (err) alert(err);
        return next(err);
    }

    // check whether an element being placed on empty paper
    function clear(err, command, next) {

        // Parameter "command" contains all cells attributes (command.data.attributes) in case
        // it was added or removed to/from graph.
        // Otherwise (in case an attribute was changed) it keeps only changed attribute
        // (command.data.previous, command.data.next) - in order to know rest of the attributes
        // you have to get them from the graph.
        var t = command.data.attributes || graph.getCell(command.data.id).toJSON()

        var area = g.rect(t.position.x, t.position.y, t.size.width, t.size.height);

        if (_.find(graph.getElements(), function (e) {

            var position = e.get('position');
        var size = e.get('size');

        return (e.id !== t.id && area.intersect(g.rect(position.x, position.y, size.width, size.height)));

        })) return next("Another cell in the way!"); else return next(err);
    };

    // check whether the link can be connected to the ceratin cell or pinned to the paper
    function connectivity(err, command, next) {

        // settings example
        var loops = false; //link loops allowed / denied
        var paperPin = true; //allow link to pin to paper
        var type = 'type'; // attribute name in the cell the rules working with
        var rules = { // allowed cells (value) for certain cell type (key)
        'basic.Rect': { deny: ['basic.Circle'] },
        'basic.Circle': { allow: ['basic.Circle','basic.Rect','basic.Text'] },
        'basic.Text': { allow: [] }
        };

        // The cell in Parameter "command" is meant to be a link.
        // see clear function
        var link = command.data.attributes || graph.getCell(command.data.id).toJSON();

        var sourceId = link.source.id;
        var targetId = link.target.id;

        // source and target are both cells
        if (sourceId && targetId) {

        // deny loops if settings don't allow them
        if (!loops && sourceId === targetId) {
            return next('Loop are not allowed');
        }

        //find source and target type attribute (parameter "type" in settings)
        var sourceType =  graph.getCell(sourceId).get(type), targetType =  graph.getCell(targetId).get(type);

        var cellRules = rules[sourceType];
        if (cellRules && (cellRules.allow || cellRules.deny)) {

            var isInRuleArray = _.contains(cellRules[cellRules.allow ? 'allow' : 'deny'], targetType);

            if ((cellRules.allow && !isInRuleArray) || (cellRules.deny && isInRuleArray)) {
            return next('Wrong type of element');
            } else {
            return next(err);
            }

        } else {

            // no rules exists, anything is valid
            return next(err);
        }
        }

        if (paperPin) return next(err);

        return next('Linking elements only');
    };

    // more complex function than the previous one. It provides same functionality as connectivity,
    // plus it can limit number of outbounding links going from the certain cell based on their
    // target's type
    function multiplicity(err, command, next) {

        // settings example
        var loops = true; // link loops allowed / denied
        var paperPin = false;  //allow link to pin to paper
        var multiLinks = false; // allow existence of 2 or more links with some target and source
        var type = 'type'; // attribute name in the cell the rules working with
        var rules = { // allowed cells (value) for certain cell type (key)
        'basic.Circle': {
            'basic.Circle': '*', //"*" any number of links + ignore multiLinks
            'basic.Rect': 1,
            'basic.Text': 2
        },
        'basic.Rect': {
            'basic.Circle': 100,
            'basic.Rect': 1,
            'basic.Text': 2
        }
        };

        // see clear function
        var link = command.data.attributes || graph.getCell(command.data.id).toJSON();

        var sourceId = link.source.id;
        var targetId = link.target.id;

        // if source nor target isn't a cell, check settings whether it allows loops
        if (!sourceId || !targetId) {
        return paperPin ? next(err) : next("Links can't be pinned to the paper");
        }

        // deny loops if settings don't allow them
        if (!loops && sourceId === targetId) {
        return next('Loop are not allowed');
        }

        var sourceCell = graph.getCell(sourceId);
        var sourceType = sourceCell.get(type);
        var targetType = graph.getCell(targetId).get(type);

        var rulesBySource = rules[sourceType];
        if (!rulesBySource) return next(err);

        var arity = rulesBySource[targetType];
        if (!arity || arity === '*') return next(err); // arity * means no limits for number of links
        if (arity === 0) return next(sourceType + " can't have any links.");

        // get all outboundlinks except the one kept in parameter command
        var outboundLinks = _.reject(graph.getConnectedLinks(sourceCell, { outbound : true  }), function(lnk) {
        return lnk.id === link.id;
        });

        // how many links with certain target type the source cell already have
        // return error if any other link has same soure and target and multiLinks are not allowed in settings
        var numberLinks = 0;
        if (_.find(outboundLinks, function(lnk) {
        numberLinks += (graph.getCell(lnk.get('target').id).get(type) === targetType) ? 1 : 0;
        return (!multiLinks && lnk.get('target').id === targetId);
        }, this)) return next("Link from " + sourceType + " to " + targetType + " already exists.");

        if (numberLinks >= arity) return next(sourceType + " can't have more than " + arity + " links");

        return next(err);
    };
    
})();
