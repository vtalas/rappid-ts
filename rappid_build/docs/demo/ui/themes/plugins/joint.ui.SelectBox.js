(function() {

    'use strict';

    var $demo = addPluginDemo('joint.ui.SelectBox');
    var selectBox1 = new joint.ui.SelectBox({
        width: 150,
        options: [
            { content: 'Margin 28px' },
            { content: 'Margin 20px', selected: true },
            { content: 'Margin 16px' },
            { content: 'Margin 12px<br/><small>more lines</small>' },
            { content: 'Margin 8px' },
            { content: 'Margin 4px' },
            { content: 'Margin 2px' },
            { content: 'Margin 1px' }
        ]
    });

    $demo.append(selectBox1.render().el);

    // Icons.
    var selectBox2 = new joint.ui.SelectBox({
        width: 200,
        options: [
        { icon: 'joint.ui.SelectBox/images/dialog.png', content: 'ui.Dialog', selected: true },
        { icon: 'joint.ui.SelectBox/images/navigator.png', content: 'ui.Navigator' },
        { icon: 'joint.ui.SelectBox/images/halo.png', content: 'ui.Halo' },
        { icon: 'joint.ui.SelectBox/images/inspector.png', content: 'ui.Inspector' },
        { icon: 'joint.ui.SelectBox/images/gridLayout.png', content: 'layout.GridLayout' },
        { icon: 'joint.ui.SelectBox/images/forceDirected.png', content: 'layout.ForceDirected' }
        ]
    });

    $demo.append(addSubheader('Selectbox with icons', selectBox2.render().el));

    // Invalid option selected.
    var selectBox3 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'auto',
        selected: -1,
        placeholder: 'My City',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam' },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('Invalid option selected', selectBox3.render().el));

    // disabled = true
    var selectBox4 = new joint.ui.SelectBox({
        width: 150,
        disabled: true,
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam' },
        { content: 'London', selected: true },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('disabled = true', selectBox4.render().el));

    // openPolicy = 'coverAbove'
    var selectBox5 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'coverAbove',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam', selected: true },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('openPolicy = coverAbove', selectBox5.render().el));

    // openPolicy = 'above'
    var selectBox6 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'above',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam', selected: true },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('openPolicy = above', selectBox6.render().el));

    // openPolicy = 'below'
    var selectBox7 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'below',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam', selected: true },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('openPolicy = below', selectBox7.render().el));

    // openPolicy = 'coverBelow'
    var selectBox8 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'coverBelow',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam', selected: true },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('openPolicy = coverBelow', selectBox8.render().el));

    // openPolicy = 'selected'
    var selectBox9 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'selected',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam', selected: true },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('openPolicy = selected', selectBox9.render().el));

    // openPolicy = 'auto'
    var selectBox10 = new joint.ui.SelectBox({
        width: 150,
        openPolicy: 'auto',
        options: [
        { content: 'Prague' },
        { content: 'Amsterdam', selected: true },
        { content: 'London' },
        { content: 'Berlin' },
        { content: 'Bratislava' }
        ]
    });

    $demo.append(addSubheader('openPolicy = auto', selectBox10.render().el));

})();
