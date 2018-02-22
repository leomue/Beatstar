'use strict';
import {speech} from './tts';
import {actionKeys} from './main';
import {pack} from './main';
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
		this.packdir="packs/"+pack+"/";	
		this.packsdir="../packs/"+pack+"/";	
		if (fs.existsSync(this.packdir+"bpm.txt")) {
			this.fileData=fs.readFileSync(this.packdir+"bpm.txt","utf8");
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
		so.enqueue(this.packsdir+"fail");
				so.enqueue(this.packsdir+"nlevel");
								so.enqueue(this.packsdir+"win");
										so.enqueue(this.packsdir+"select");
										
		for (var i=1;i<=10;i++) {
				if (fs.existsSync(this.packdir+"a"+i+".ogg")) {
		so.enqueue(this.packsdir+"a"+i);
		this.actions=i;
		}
		if (fs.existsSync(this.packdir+"o"+i+".ogg")) {
		so.enqueue(this.packsdir+"o"+i);
		}
	}
this.keys=actionKeys;
var that=this;
    					this.timer = Timer({update: function(dt) { that.update(dt); }, render: function() { that.render(); }}, this.bpms[this.level]/1000.0);
    					so.setQueueCallback(function() {
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
this.music.destroy();
this.level++;
this.timer.stop();
this.queueLevels();
this.setupLevel();
return;
}
	this.action=utils.randomInt(1,this.actions);
	this.actionCompleted=false;
	this.toDestroy.push(this.pool.playStatic(this.packsdir+"a"+this.action,0));;
//		if (this.action==1) this.actionCompleted=true;//freeze
		this.scoreTimer.reset();
	}
async fail() {
	this.timer.stop();
			var snd=this.music;
			var failsound=this.pool.playStatic(this.packsdir+"fail",0);
			this.toDestroy.push(failsound);
		for (var i=snd.playbackRate;i>0;i-=0.05) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
		snd.stop();
		while(this.pool.staticSounds[failsound].sound.playing) {
		await utils.sleep(10);
		if (this.input.isDown(KeyEvent.DOM_VK_RETURN)) {
		this.pool.staticSounds[failsound].sound.stop();
		}
		}
	this.destroyPool();
	st.setState(2);
	}
	async quit() {
		this.timer.stop();
			var snd=this.music;
											for (var i=snd.playbackRate;i>0;i-=0.045) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
				snd.stop();
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
	this.toDestroy.push(this.pool.playStatic(this.packsdir+"o"+this.action,0));
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
	var playing=false;
				if (fs.existsSync(this.packdir+"pre"+this.level+".ogg")) {
this.preSound=so.create(this.packsdir+"pre"+this.level);
this.preSound.play();
playing=true;
}
if (fs.existsSync(this.packdir+"nlevel.ogg") && !playing && this.level>1) {
this.preSound=so.create(this.packsdir+"nlevel");
this.preSound.play();
playing=true;
}
while(playing && this.preSound.playing) {
await utils.sleep(5);
if (this.input.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
this.preSound.stop();
}
}
playing=false;
				this.music=so.create(this.packsdir+this.level+"music");
								this.music.loop=true;
								this.music.play();
																this.timer.change(this.bpms[this.level]/1000.0)
									this.action=0;
						this.actionCompleted=false;
	this.currentAction=0;
	this.numberOfActions=utils.randomInt(5+this.level,this.level*1.5+5);
	//if after level 1 we don't want an extra round of timer we need to set this to 1.
	//if (this.level>1) this.currentAction=1;
	}
destroy() {
so.resetQueue();
so.resetQueuedInstance();
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
speech.speak(this.scoreTimer.elapsed);
}
destroyPool() {
if (this.toDestroy.length>0) {
	for (var i=0;i<this.toDestroy.length;i++) {
	if (typeof this.pool.staticSounds[this.toDestroy[i]]!="undefined") {
	this.pool.staticSounds[this.toDestroy[i]].destroy();
	console.log("destroying!");
		
		}
		this.pool.staticSounds.splice(this.toDestroy[i]);
	}
	}
}
queueLevels() {
var levelLimit=this.level+3;
										if (this.levels<levelLimit) levelLimit=this.levels;
										speech.speak(this.level+", "+levelLimit);
										if (this.level>1) {
										for (var i=1;i<=this.level-1;i++) {
										var snd=so.findSound(this.packsdir+i+"music.ogg");
										console.log("gonna destroy "+snd.fileName);
										if (typeof snd=="object") snd.destroy();
										}
										}
														for (var i=this.level;i<=levelLimit;i++) {
																so.enqueue(this.packsdir+i+"music");
		if (fs.existsSync(this.packdir+"pre"+i+".ogg")) {
		so.enqueue(this.packsdir+"pre"+i);
		}
		}
		if (this.level>1) so.setQueueCallback(0);
		if (this.level>1) {
		console.log("loading");
		so.loadQueue();
				}
}
}
export { Game };