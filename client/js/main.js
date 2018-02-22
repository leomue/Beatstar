import $ from 'jquery';
import {strings} from './strings';
import {SoundHandler} from './soundHandler';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {st} from './stateMachine';
import sono from 'sono';
//import test from './test.js'
export var actionKeys=[0,0,KeyEvent.DOM_VK_SPACE,KeyEvent.DOM_VK_TAB,KeyEvent.DOM_VK_RETURN,KeyEvent.DOM_VK_BACK_SPACE,KeyEvent.DOM_VK_UP,KeyEvent.DOM_VK_DOWN,KeyEvent.DOM_VK_RIGHT,KeyEvent.DOM_VK_LEFT];
import { effects } from 'sono/effects';
import {KeyboardInput} from './input.js'
export var lang=1;
export var langs=["","english","spanish"]
export var pack="defaulter";
document.addEventListener("DOMContentLoaded",setup);
var dummyPan=sono.panner();
so.debug=true;
function setup() {
st.setState(1);
document.removeEventListener("DOMContentLoaded",setup);
}
export async function learnPack() {
const fs=require('fs');
var pool=new SoundHandler();
var packdir="packs/"+pack+"/";	
var actions=0;
var packsdir="../packs/"+pack+"/";	
				for (var i=1;i<=10;i++) {
				if (fs.existsSync(packdir+"a"+i+".ogg")) {
				actions=i;
								}
				}
				if (lang==1) speech.speak("This pack has "+actions+" actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma).");
				if (lang==2) speech.speak("Este pack tiene "+actions+" acciones. Las teclas típicas son espacio, tabulador, enter, bretroceso, y opcionalmente las flechas. Si has reasignado las teclas, puedes usarlas. Para escuchar la acción de parar, pulsa la tecla del punto (a la derecha de la coma).");
				var event=new KeyboardInput();
				event.init();
				while (!event.isDown(KeyEvent.DOM_VK_Q)) {
				await utils.sleep(10);
				if (event.isJustPressed(actionKeys[2]))
				pool.playStatic(packsdir+"a"+2,0);
								if (event.isJustPressed(actionKeys[3]))
				pool.playStatic(packsdir+"a"+3,0);
				if (event.isJustPressed(actionKeys[4]))
				pool.playStatic(packsdir+"a"+4,0);
				if (event.isJustPressed(actionKeys[5]))
				pool.playStatic(packsdir+"a"+5,0);
				if (event.isJustPressed(actionKeys[6]))
				pool.playStatic(packsdir+"a"+6,0);
				if (event.isJustPressed(actionKeys[7]))
				pool.playStatic(packsdir+"a"+7,0);
				if (event.isJustPressed(actionKeys[8]))
				pool.playStatic(packsdir+"a"+8,0);
				if (event.isJustPressed(actionKeys[9]))
				pool.playStatic(packsdir+"a"+9,0);
				if (event.isJustPressed(KeyEvent.DOM_VK_PERIOD))
				pool.playStatic(packsdir+"a"+1,0);
				}
				pool.destroy();
				st.setState(2);
}