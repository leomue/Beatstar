"use strict";
import {speech} from 'scrollingText'
import {TTS,useWebTTS} from 'tts'
if (typeof speech == "undefined") var speech = new TTS();
import $ from 'jquery'
import {soundObject} from 'soundObject.js'
import {TTS} from 'tts'
import {MenuTypes,MenuItem} from 'menuItem'
import {KeyEvent} from 'keycodes'
import {KeyboardInput} from 'input'
class Menu {
	constructor(name, menuData) {
		this.menuData = menuData;
		this.cursor = 0;
		this.name = name;
		this.sndKeyChar = soundObject.create("ui/keyChar");
		this.sndKeyDelete = soundObject.create("ui/keyDelete");
		this.sndSliderLeft = soundObject.create("ui/menuSliderLeft");
		this.sndSliderRight = soundObject.create("ui/menuSliderRight");
		this.sndBoundary = soundObject.create("ui/menuBoundary");
		this.sndChoose = soundObject.create("ui/menuChoose");
		this.sndMove = soundObject.create("ui/menuMove");
		this.sndOpen = soundObject.create("ui/menuOpen");
		this.sndSelector = soundObject.create("ui/menuSelector");
		this.sndWrap = soundObject.create("ui/menuWrap");
		this.selectCallback = null;
		var id = document.getElementById("touchArea");
		//this.hammer = new Hammer(id);
		
		
		
		
	}
	
	
	
	
	nextItem() {
		
		if (this.cursor < this.menuData.length-1) this.cursor++;
		this.sndMove.play();
		
		this.menuData[this.cursor].speak();
	}
	previousItem() {
		if (this.cursor > 0) this.cursor--;
		this.sndMove.play();
		this.menuData[this.cursor].speak();
	}
	
	increase() {
		if (this.menuData[this.cursor].type == MenuTypes.SLIDER || this.menuData[this.cursor].type == MenuTypes.SELECTOR) {
			this.menuData[this.cursor].increase();
			if (this.menuData[this.cursor].type == MenuTypes.SLIDER) {
				this.sndSliderRight.play();
			} else {
				this.sndSelector.play();
			}
		}
		
	}
	
	decrease() {
		if (this.menuData[this.cursor].type == MenuTypes.SLIDER || this.menuData[this.cursor].type == MenuTypes.SELECTOR) {
			this.menuData[this.cursor].decrease();
			if (this.menuData[this.cursor].type == MenuTypes.SLIDER) {
				this.sndSliderLeft.play();
			} else {
				this.sndSelector.play();
			}
			
		}
	}
	
	insertCharacter(char) {
		if (this.menuData[this.cursor].type == MenuTypes.EDIT) {
			this.menuData[this.cursor].addChar(String.fromCharCode(char));
			this.sndKeyChar.play();
		}
	}
	
	removeCharacter() {
		if (this.menuData[this.cursor].type == MenuTypes.EDIT) {
			this.menuData[this.cursor].removeChar();
			this.sndKeyDelete.play();
		}
	}
	handleInput(event) {
		
		
			this.insertCharacter(event.which);
		
		
	}
	destroySounds() {
		this.sndKeyChar.destroy();
		this.sndKeyDelete.destroy();
		this.sndSliderLeft.destroy();
		this.sndSliderRight.destroy();
		this.sndBoundary.destroy();
		this.sndChoose.destroy();
		this.sndMove.destroy();
		this.sndOpen.destroy();
		this.sndSelector.destroy();
		this.sndWrap.destroy();
		
	}
	destroy() {
		
		
		$(document).off("keydown");
		$(document).off("keypress");
		//this.hammer.destroy();
		var that = this;
		setTimeout(function() { that.destroySounds(); }, 500);
	}
	
	handleKeys(event) {
		
		
			switch(event.which) {
				case KeyEvent.DOM_VK_RETURN:
					this.select();
					break;
					
				case KeyEvent.DOM_VK_BACK_SPACE:
					this.removeCharacter();
					break;
				
				case KeyEvent.DOM_VK_DOWN:
				
					this.nextItem();
					break;
				case KeyEvent.DOM_VK_UP:
					this.previousItem();
					break;
				case KeyEvent.DOM_VK_RIGHT:
					
						this.increase();
					
					
					break;
				case KeyEvent.DOM_VK_LEFT:
					
						this.decrease();
					
					break;
			}
		}
		
	run(callback) {
		this.selectCallback = callback;
		var that = this;
		$(document).on("keypress", function(event) { that.handleInput(event) });
		$(document).on("keydown", function(event) { that.handleKeys(event) });
		/*
		this.hammer.on("swipeleft", function(event) { that.handleSwipe(0); });
		this.hammer.on("swiperight", function(event) { that.handleSwipe(1); });
		this.hammer.on("panup", function(event) { that.handleSwipe(3); });
		this.hammer.on("pandown", function(event) { that.handleSwipe(4); });
		this.hammer.on("tap", function(event) { that.handleSwipe(2); });
		*/
		speech.speak(this.name);
		this.sndOpen.play();
		
	}
	
	handleSwipe(action) {
		if (action == 3) {
			this.decrease();
		}
		if (action == 4) {
			this.increase();
		}
		
		if (action == 0) {
			this.previousItem();
		}
		if (action == 1) {
			this.nextItem();
		}
		if (action == 2) {
			this.select();
		}
		
	}
	
	select() {
		
		var selected = this.menuData[this.cursor].id;
		
		var items=[];
		for (var i=0;i<this.menuData.length;i++) {
			var addItem = null;
			if (this.menuData[i].type == MenuTypes.SLIDER) {
				addItem = {
					id:this.menuData[i].id,
					value:this.menuData[i].currentValue,
					name:this.menuData[i].options[this.menuData[i].currentValue]
				}
			}
			if (this.menuData[i].type == MenuTypes.EDIT) {
				addItem = {
					id:this.menuData[i].id,
					value:this.menuData[i].text
					
				}
			}
			if (this.menuData[i].type == MenuTypes.SELECTOR) {
				addItem = {
					id:this.menuData[i].id,
					value:this.menuData[i].currentOption,
					name:this.menuData[i].options[this.menuData[i].currentOption]
				}
			}
			items.push(addItem);
		}
		
		var toReturn = {
			selected:selected,
			cursor:this.cursor,
			items:items
		}
		this.sndChoose.play();
		
		this.selectCallback(toReturn);
	}

}
export {Menu}