import $ from 'jquery';
import {utils} from './utilities';
import {so} from './soundObject';
import {st} from './stateMachine';
import sono from 'sono';
//import test from './test.js'
import { effects } from 'sono/effects';
import KeyEvent from './keycodes.js'
import KeyboardInput from './input.js'
var lang=1;
var langs=["","english","spanish"]
document.addEventListener("DOMContentLoaded",setup);
var dummyPan=sono.panner();
so.debug=true;
function setup() {
st.setState(1);
document.removeEventListener("DOMContentLoaded",setup);
}