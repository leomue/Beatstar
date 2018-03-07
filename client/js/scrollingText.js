'use strict';
import $ from 'jquery';
import {KeyEvent} from './keycodes';
import {so} from './soundObject';
import {TTS, useWebTTS} from './tts';

if (typeof speech === 'undefined') {
	var speech = new TTS();
}
if (runningText == undefined) {
	var runningText = 0;
}
class ScrollingText {
	constructor(text, delimiter = '\n', callback = 0) {
		this.text = text;
		this.delimiter = delimiter;
		this.splitText = this.text.split(delimiter);
		this.currentLine = 0;
		this.sndOpen = so.create('UI/textOpen');
		this.sndContinue = so.create('UI/textScroll');
		this.sndClose = so.create('UI/textClose');
		this.callback = callback;
		const id = document.getElementById('touchArea');
		// This.hammer = new Hammer(id);
		this.init();
	}

	init() {
		const that = this;
		runningText = this;
		document.addEventListener('keydown', this.handleKeys);
		// This.hammer.on("swipeleft swiperight", function() { that.handleTap(0); });
		// this.hammer.on("tap", function() { that.handleTap(1); });
		this.sndOpen.play();
		this.currentLine = 0;
		this.readCurrentLine();
	}

	handleKeys(event) {
		switch (event.which) {
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
		if (this.currentLine < this.splitText.length - 1) {
			this.currentLine++;
			this.sndContinue.play();
			this.readCurrentLine();
		} else {
			this.sndClose.play();
			this.sndClose.unload();
			this.sndOpen.unload();
			this.sndContinue.unload();
document.removeEventListener('keydown', this.handleKeys);
//			This.hammer.unload();
if (this.callback != 0) {
this.callback();
}
		}
	}
}
export {ScrollingText, speech};
