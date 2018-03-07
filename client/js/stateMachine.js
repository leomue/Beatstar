'use strict'
	var event=new KeyboardInput();
	
import {KeyboardInput} from './input';
import {speech} from './tts';
import {checkPack,learnPack,browsePacks} from './main';
import {Menu} from './menuHandler';
import $ from 'jquery';
import {so} from './soundObject';
import {KeyEvent} from './keycodes'
import {Game} from './game';
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
	var that=this;
	intro.volume=0.5;
	intro.play();
	intro.sound.once("end",function() {
		intro.unload();
	$(document).off("keydown");
			that.setState(2);
	});
	$(document).keydown(function(event) {
		if (event.which==KeyEvent.DOM_VK_SPACE || event.which==KeyEvent.DOM_VK_ESCAPE) {
						intro.unload();
					$(document).off("keydown");
			that.setState(2);
		}
		})
		this.state = state;

	}
	else if (state==2) {
	event=null;
checkPack();
	this.state = state;
	}
				else if (state == 3) {
					
			this.currentState = new Game();
			this.state = state;
		}

else if (state==4) { learnPack();
}
//new states
else if (state==5) {
browsePacks();
this.state = state;
}
	}
	
}
var st=new StateMachine();
export {st};
import {mainMenu} from './menuHandler';