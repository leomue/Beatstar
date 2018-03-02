import $ from "jquery";
import {speech} from './tts'
'use strict';
class KeyboardInput {
	constructor() {
		this.keyDown = [];
		this.justPressed = [];
		this.chars=[]
		this.justReleased = [];
		this.justPressedEventCallback = null;
	}
	
	init() {
		var that = this;
// 		$(document).keydown(function(event) { that.handleKeyDown(event); });
// 		$(document).keyup(function(event) { that.handleKeyUp(event); });
		document.addEventListener("keydown", function(event) { that.handleKeyDown(event); });
		document.addEventListener("keyup", function(event) { that.handleKeyUp(event); });
				document.addEventListener("keypress", function(event) { that.handleChar(event); });
			}
	
	handleKeyDown(event) {
		
		if (this.keyDown[event.which] !=true || typeof this.keyDown[event.which] == "undefined") {
			this.keyDown[event.which] = true;
			this.justPressed[event.which] = true;
			this.justReleased[event.which] = false;
			if (typeof this.justPressedEventCallback != "undefined" && this.justPressedEventCallback != null) this.justPressedEventCallback(event.which);
		}
	}
handleChar(char) {
if (String.fromCharCode(char.which)!="") {
this.chars+=String.fromCharCode(char.which);
}
	}
		
	
	handleKeyUp(event) {
		
		if (this.keyDown[event.which] == true) {
			this.keyDown[event.which] = false;
			this.justPressed[event.which] = false;
			this.justReleased[event.which] = true;
			
		}
		this.chars="";
	}
	
	isDown(event) {

		return this.keyDown[event];
		
		
	}
	isJustPressed(event) {
		
			if (this.justPressed[event] == true) {
				this.justPressed[event] = false;
				return true;
			} else {
				return false;
			}
		
	}
	isJustReleased(event) {
		if (this.justReleased[event]) {
			this.justReleased[event] = false;
			return true;
		}
		return false;
	}
	keysDown() {
	var kd=[];
	this.keyDown.forEach(function(v,i) {
	if (v) {
	kd.push(i);
		}
	});
	return kd;
	}
	getChars() {
	var kd=this.chars;
	this.chars="";
		return kd;
	}
	
	keysPressed() {
	var kd=[];
	this.justPressed.forEach(function(v,i) {
	if (v) {
	kd.push(i);
			}
	});
	this.justPressed.splice();
	return kd;
	}
	releaseAllKeys() {

	}
	
	keysReleased() {
	var kd=[];
	this.justReleased.forEach(function(v,i) {
	if (v) {
	kd.push(i);
	}
	});
	this.justReleased.splice();
	return kd;
	}

}

export { KeyboardInput };