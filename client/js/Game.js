'use strict';
import { SoundSource } from './soundSource.js'
import timer from 'game-timer'

import { KeyboardInput } from './input.js'
import panner  from 'sono/effects/panner';
import { KeyEvent } from './keycodes.js'
class Game {
	constructor() {
		var that = this;
		this.timer = timer({update: function(dt) { that.update(dt); }, render: function() { that.render(); }}, 1/100)
		this.timer.start();
		

		this.input = new KeyboardInput();
		this.input.init();
		this.testx = 0;
	}
	
	
	update(dt) {
		if (this.input.isDown(KeyEvent.DOM_VK_RIGHT)) {
			this.testx  += 1
			
		}
		
		
	
	}
	
	render() {
		panner.setListenerPosition(this.testx, 0, 0);
		
	}
}

export { Game };