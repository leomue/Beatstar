'use strict'
	var event=new KeyboardInput();
	
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
event=new KeyboardInput();
	event.init();
	var intro=so.create("logo");
	intro.play();
	$(document).keydown(function(event) {
		if (event.which==KeyEvent.DOM_VK_SPACE || event.which==KeyEvent.DOM_VK_ESCAPE) {
		intro.destroy();
					$(document).off("keydown");
		}
		})
	}
				if (state == 2) {
					event=null;
			this.currentState = new Game();
			this.state = state;
		}
		
		
		
	}
	
}
var st=new StateMachine();
export {st};