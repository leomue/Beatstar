import sono from 'sono';
import { KeyboardInput } from './input.js'
import { KeyEvent } from './keycodes.js'
import { SoundSource } from './soundSource.js'
var event = new KeyboardInput();
event.init();
function test() {
	if (event.isDown(KeyEvent.DOM_VK_SPACE)) {
	var sound = new SoundSource("click", -1500, 0, 0, false);
	sound.play();
}

}

setInterval(test, 0);