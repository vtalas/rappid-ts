import * as joint from '../../rappid_build/rappid';
import {MainView} from './js/views/main';
import * as $ from 'jquery';

window['joint'] = joint;
window['jQuery'] = $;

let app = new MainView({el: '#app'});
