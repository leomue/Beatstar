'use strict'
	
import {KeyboardInput} from './input';
import $ from 'jquery';
import {so} from './soundObject';
import {KeyEvent} from './keycodes'
class StateMachine {
	constructor() {
		this.state = 0;
		this.currentState = 0;
	}
	
	setState(state) {
	if (state==1) {
	var event=new KeyboardInput();
	event.init();
	var intro=so.create("buyinsurance");
	intro.play();
	if (event.isDown(KeyEvent.DOM_VK_SPACE)) {
		intro.destroy();
		}

	}
				if (state == 2) {
			this.currentState = new Game();
			this.state = state;
		}
		
		
		
	}
	
}
var st=new StateMachine();
export {st};