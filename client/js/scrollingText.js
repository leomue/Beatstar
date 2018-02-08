'use strict';
import $ from 'jquery'
import {KeyEvent} from 'keycodes'
import {soundObject} from 'soundObject'
import {TTS,useWebTTS} from 'tts'
if (typeof speech == "undefined") var speech = new TTS();
if (runningText == undefined) var runningText = 0;
class ScrollingText {
	constructor(text, delimiter="\n", callback=0) {
		this.text = text;
		this.delimiter = delimiter;
		this.splitText = this.text.split(delimiter);
		this.currentLine=0;
		this.sndOpen = soundObject.create("ui/textOpen");
		this.sndContinue = soundObject.create("ui/textScroll");
		this.sndClose = soundObject.create("ui/textClose");
		this.callback = callback;
		var id = document.getElementById("touchArea");
		//this.hammer = new Hammer(id);
		this.init();
	}
	init() {
		var that = this;
		runningText = this;
		$(document).on("keydown", this.handleKeys);
		//this.hammer.on("swipeleft swiperight", function() { that.handleTap(0); });
		//this.hammer.on("tap", function() { that.handleTap(1); });
		this.sndOpen.play();
		this.currentLine = 0;
		this.readCurrentLine();
	}
	handleKeys(event) {
		switch(event.which) {
			case KeyEvent.DOM_VK_UP:
			case KeyEvent.DOM_VK_DOWN:
			case KeyEvent.DOM_VK_LEFT:
			case KeyEvent.DOM_VK_RIGHT:
				runningText.readCurrentLine();
				break;
			case KeyEvent.DOM_VK_RETURN:
				runningText.advance();
				break;
				
		}
	}
	
	handleTap(action) {
		if (action == 0) {
			this.readCurrentLine();
		}
		
		if (action == 1) {
			this.advance();
		}
		
	}
	
	readCurrentLine() {
		speech.speak(this.splitText[this.currentLine]);
	}
	advance() {
		if (this.currentLine < this.splitText.length-1) {
			this.currentLine++;
			this.sndContinue.play();
			this.readCurrentLine();
		} else {
			this.sndClose.play();
			$(document).off("keydown");
//			this.hammer.destroy();
			if (this.callback!=0) this.callback();
		}
		
		
	}
}
export {ScrollingText,speech}