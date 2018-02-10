'use strict';
import { SoundSource } from './soundSource.js'
import Timer from 'game-timer'
import {SoundHandler} from './soundHandler.js';
import { KeyboardInput } from './input.js'
import panner  from 'sono/effects/panner';
import { KeyEvent } from './keycodes.js'
class Game {
	constructor() {
		var that = this;
//		this.timer = Timer({update: function(dt) { that.update(dt); }, render: function() { that.render(); }}, 1/100)
//		this.timer.start();
		this.score=0;
this.bpms=[];
this.level=0;
this.pack="default";
		this.input = new KeyboardInput();
		this.input.init();
		this.handler=new SoundHandler();
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