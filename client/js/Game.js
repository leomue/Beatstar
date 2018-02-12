'use strict';
import {st} from './stateMachine';
import Timer from 'game-timer'
import {ScrollingText} from './scrollingText';
var fs=require('fs');
import { KeyboardInput } from './input.js'

import panner  from 'sono/effects/panner';
import { KeyEvent } from './keycodes.js'
class Game {
	constructor() {
		var that = this;
/*		this.timer = Timer({update: function(dt) { that.update(dt); }, render: function() { that.render(); }}, 1/100)
		this.timer.start();
		*/
		this.score=0;
this.bpms=null;
this.level=0;
this.fileData=null;
this.pack="default";
		this.input = new KeyboardInput();
		this.input.init();
		var that=this;
		this.input.justPressedEventCallback=function(event) {
		that.handleKeys(event);	
		}
		this.setup();
	}
	setup() {
		this.packdir="packs/"+this.pack+"/";	
		if (fs.existsSync(this.packdir+"bpm.txt")) {
			this.fileData=fs.readFileSync(this.packdir+"bpm.txt","utf8");
		}
		else {
			var error=new ScrollingText("There was an error loading the pack "+this.pack+".","\n",function() {
				st.setState(1);
				return;
			})
		}
		this.bpms=this.fileData.split(",");
		this.level++;
		this.input
		
		this.preload(this.level);
	}
	preload(lev) {
		
	}
	update(dt) {
	}
	
	render() {
	}
}

export { Game };