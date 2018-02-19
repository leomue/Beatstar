import $ from "jquery";
'use strict';
class KeyboardInput {
	constructor() {
		this.keyDown = [];
		this.justPressed = [];
		this.justReleased = [];
		this.justPressedEventCallback = null;
	}
	
	init() {
		var that = this;
// 		$(document).keydown(function(event) { that.handleKeyDown(event); });
// 		$(document).keyup(function(event) { that.handleKeyUp(event); });
		document.addEventListener("keydown", function(event) { that.handleKeyDown(event); });
		document.addEventListener("keyup", function(event) { that.handleKeyUp(event); });
			}
	
	handleKeyDown(event) {
		
		if (this.keyDown[event.which] !=true || typeof this.keyDown[event.which] == "undefined") {
			this.keyDown[event.which] = true;
			this.justPressed[event.which] = true;
			this.justReleased[event.which] = false;
			if (typeof this.justPressedEventCallback != "undefined" && this.justPressedEventCallback != null) this.justPressedEventCallback(event.which);
		}
	}
	
	
	handleKeyUp(event) {
		
		if (this.keyDown[event.which] == true) {
			this.keyDown[event.which] = false;
			this.justPressed[event.which] = false;
			this.justReleased[event.which] = true;
		}
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
	keysPressed() {
	var kd=[];
	this.justPressed.forEach(function(v,i) {
	if (v) {
	kd.push(i);
	}
	});
	return kd;
	}
	keysReleased() {
	var kd=[];
	this.justReleased.forEach(function(v,i) {
	if (v) {
	kd.push(i);
	}
	});
	return kd;
	}

}

export { KeyboardInput };