'use strict';
import {speech} from './tts';
import {actionKeys} from './main';
import {pack,packdir} from './main';
import {speech} from './tts';
import $ from 'jquery';
import {OldTimer} from './oldtimer';
var os=require('os');
import {SoundHandler} from './soundHandler';
import {utils} from './utilities';
import {so} from './soundObject';
import {st} from './stateMachine';
import Timer from './timer'
import {ScrollingText} from './scrollingText';
var fs=require('fs');
import { KeyboardInput } from './input.js'
import panner  from 'sono/effects/panner';
import { KeyEvent } from './keycodes.js'
class Game {
	constructor() {
		this.actionCompleted=false;
		this.toDestroy=new Array();
		this.scoreTimer=new OldTimer();
		var that=this;
		$(document).on("blur",function() {
		that.pause();
		});
				this.pauseTime=0;
	this.timer=null;
	this.music=null;
				this.score=0;
		this.pool=new SoundHandler();
this.bpms=null;
this.level=0;
this.fileData=null;
		this.input = new KeyboardInput();
		this.input.init();
		this.levels=null;
		var that=this;
		this.setup();
	}
	setup() {
		if (fs.existsSync(packdir+"bpm.txt")) {
			this.fileData=fs.readFileSync(packdir+"bpm.txt","utf8");
		}
		else {
			var error=new ScrollingText("There was an error loading the pack "+this.pack+".","\n",function() {
				st.setState(2);
				return;
			})
		}
		this.bpms=this.fileData.split(",");
		this.levels=this.bpms.length-1;
		if (this.bpms[this.levels]=="") this.levels--;
				this.level++;
				so.directory="";
		so.enqueue(packdir+"fail");
				so.enqueue(packdir+"nlevel");
								so.enqueue(packdir+"win");
										so.enqueue(packdir+"select");
										
		for (var i=1;i<=10;i++) {
				if (fs.existsSync(packdir+"a"+i+".ogg")) {
		so.enqueue(packdir+"a"+i);
		this.actions=i;
		}
		if (fs.existsSync(packdir+"o"+i+".ogg")) {
		so.enqueue(packdir+"o"+i);
		}
	}
this.keys=actionKeys;
var that=this;
    					this.timer = Timer({update: function(dt) { that.update(dt); }, render: function() { that.render(); }}, this.bpms[this.level]/1000.0);
    					so.setQueueCallback(function() {
    					so.directory="./sounds/";
    					that.setupLevel();
    					});
    					this.queueLevels();
so.loadQueue();
	}
	update(dt) {
	if (this.currentAction==0) {
	this.currentAction++;
	return;
	}
					if (!this.actionCompleted && this.action>1) {
				this.fail();
				return;
			}
this.currentAction++;
//action and level checks go here
if (this.currentAction>=this.numberOfActions) {
so.directory="";
	so.destroy(packdir+this.level+"music");
		so.destroy(packdir+"pre"+this.level);
	so.directory="./sounds/";
this.level++;
this.timer.stop();
this.setupLevel();
return;
}
	this.action=utils.randomInt(1,this.actions);
	this.actionCompleted=false;
	so.directory="";
	this.pool.playStatic(packdir+"a"+this.action,0);
	so.directory="./sounds/";
	//		if (this.action==1) this.actionCompleted=true;//freeze
		this.scoreTimer.reset();
	}
async fail() {
	this.timer.stop();
			var snd=this.music;
			so.directory="";
			var failsound=this.pool.playStatic(packdir+"fail",0);
			so.directory="./sounds/";
		for (var i=snd.playbackRate;i>0;i-=0.05) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
		snd.destroy();
		while(this.pool.staticSounds[failsound].sound.playing) {
		await utils.sleep(10);
		if (this.input.isDown(KeyEvent.DOM_VK_RETURN)) {
		this.pool.staticSounds[failsound].sound.stop();
		}
		}
		so.resetQueue();
so.resetQueuedInstance();
this.pool.destroy();
so.kill(function() {st.setState(2)});
	}
	async quit() {
		this.timer.stop();
			var snd=this.music;
											for (var i=snd.playbackRate;i>0;i-=0.045) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
				snd.destroy();
				so.resetQueue();
so.resetQueuedInstance();
		st.setState(2);
	}

	render() {
	if (this.input.isJustPressed(KeyEvent.DOM_VK_Q)) {
	this.quit();
	return;
	}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_P)) {
		this.pause();
		return;
		}
				this.handleKeys();
	}
	handleKeys() {
	if (this.actionCompleted) return;
	var keys=this.input.keysPressed();
	if (keys.length>0 && this.action==1) {
	this.fail();
	return;
	}
		if (keys.length>1){
		this.fail();
	return;
	}
	if (keys.length==1 && keys[0]==this.keys[this.action]){
	so.directory="";
	this.pool.playStatic(packdir+"o"+this.action,0);
	so.directory="./sounds/";
		this.actionCompleted  =true;
	this.calculateScore();
	return;
		}
			if (keys.length==1 && keys[0]!=this.keys[this.action]){
						this.fail();
			return;
			}
	}
async setupLevel() {
	this.playing=false;
				if (fs.existsSync(packdir+"pre"+this.level+".ogg")) {
					so.directory="";
this.preSound=so.create(packdir+"pre"+this.level);
so.directory="./sounds/";
this.preSound.play();
this.playing=true;
}
if (fs.existsSync(packdir+"nlevel.ogg") && !this.playing && this.level>1) {
	so.directory="";
this.preSound=so.create(packdir+"nlevel");
so.directory="./sounds/";
this.preSound.play();
this.playing=true;
}
if (this.playing) {
		this.queueLevels();
		while(this.preSound.playing) {
		await utils.sleep(5);
		if (this.input.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
		this.preSound.stop();
		}
		}
}
so.directory="";
var that=this;
				this.music=so.create(packdir+this.level+"music");
				this.music.loop=true;
				so.directory="./sounds/";
this.music.play();
	this.timer.change(that.bpms[that.level]/1000.0)
if (!this.playing && this.level>1) {
									this.queueLevels();
								}
									this.action=0;
						this.actionCompleted=false;
	this.currentAction=0;
	this.numberOfActions=utils.randomInt(6+this.level,this.level*2+6);
	}
destroy() {
}
async pause() {
var snd=this.music;
this.timer.stop();
this.scoreTimer.pause();
this.pauseTime=snd.currentTime;
for (var i=snd.playbackRate;i>0;i-=0.05) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
		snd.pause();
		while (!this.input.isDown(KeyEvent.DOM_VK_P)) {
		await utils.sleep(10);
		}
		this.unpause();
}
async unpause() {
var snd=this.music;
snd.play();
for (var i=snd.playbackRate;i<=1;i+=0.05) {
			snd.playbackRate=i;
			await utils.sleep(8);
		}
		snd.seek(this.pauseTime);
		this.timer.start();
		this.scoreTimer.resume();
}
calculateScore() {
//speech.speak(this.scoreTimer.elapsed);
}
queueLevels() {
var levelLimit=this.level+1;
			if (this.levels<levelLimit) levelLimit=this.levels;
										so.directory="";
														for (var i=this.level;i<=levelLimit;i++) {
																so.enqueue(packdir+i+"music");
		if (fs.existsSync(packdir+"pre"+i+".ogg")) {
		so.enqueue(packdir+"pre"+i);
		}
		}
		if (this.level>1) {
			so.setQueueCallback(0);
		so.loadQueue();
		so.directory="./sounds/";
				}
}
}
export { Game };