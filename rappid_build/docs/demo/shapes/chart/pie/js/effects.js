'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#paper').css('width', 400), width: 400, height: 300, model: graph, gridSize: 1 });

    var chart = new joint.shapes.chart.Pie({
        position: { x: 90, y: 80 },
        size: { width: 150, height: 150 },
        sliceDefaults: {
            onClickEffect: { type: 'offset', offset: 20 },
            onHoverEffect: { type: 'enlarge', scale: 1.5 }
        },
        series: [ { data: [
                { value: 40, label: 'Organic', fill: {
                    type: 'linearGradient', stops: [ { offset: '0%', color: '#b4f200' }, { offset: '80%', color: '#759d00' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' } 
            } },
                { value: 20, label: 'Email', fill: {
                    type: 'linearGradient', stops: [ { offset: '0%', color: '#E67E22' }, { offset: '80%', color: '#D35400' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' } 
            } },
                { value: 20, label: 'Social', fill: {
                    type: 'linearGradient', stops: [ { offset: '0%', color: '#ff3019' }, { offset: '80%', color: '#cf0404' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' } 
            } },
                { value: 20, label: 'Referral', fill: {
                    type: 'linearGradient', stops: [ { offset: '0%', color: '#b2e1ff' }, { offset: '80%', color: '#66b6fc' } ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' } 

            } }
        ]}],
        attrs: {
            '.data': {
            filter: { name: 'dropShadow', args: { dx: 0, dy: 0, blur: 3, color: 'black' } }
            },
            '.slice-inner-label': { style: { 'text-shadow': '0 0 1px black' }, 'font-weight': 'bold' }
        }
    });

    graph.addCell(chart);

})();
