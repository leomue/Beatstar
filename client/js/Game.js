'use strict';
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
	this.test=so.create("inserror");
	this.eventsound=so.create("fumble");
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
				st.setState(1);
				return;
			})
		}
		this.bpms=this.fileData.split(",");
		this.levels=this.bpms.length-1;
		this.level++;
		so.resetQueue();
		so.resetQueuedInstance();
		so.enqueue(this.packsdir+"fail");
				so.enqueue(this.packsdir+"nlevel");
						so.enqueue(this.packsdir+"loop");
		so.enqueue(this.packsdir+"win");
										so.enqueue(this.packsdir+"select");
										if (fs.existsSync(this.packdir+"credits.ogg")) so.enqueue(this.packsdir+"credits");
				for (var i=1;i<=this.levels;i++) {
		so.enqueue(this.packsdir+i+"music");
		if (fs.existsSync(this.packdir+"pre"+i+".ogg")) {
		so.enqueue(this.packsdir+"pre"+i);
		}
		}
		for (var i=1;i<=10;i++) {
				if (fs.existsSync(this.packdir+"a"+i+".ogg")) {
		so.enqueue(this.packsdir+"a"+i);
		so.enqueue(this.packsdir+"o"+i);
		this.actions=i;
}
	}
this.keys=[0,0,KeyEvent.DOM_VK_SPACE,KeyEvent.DOM_VK_TAB,KeyEvent.DOM_VK_RETURN,KeyEvent.DOM_VK_BACK_SPACE,KeyEvent.DOM_VK_UP,KeyEvent.DOM_VK_DOWN,KeyEvent.DOM_VK_RIGHT,KeyEvent.DOM_VK_LEFT]
var that=this;
    					this.timer = Timer({update: function(dt) { that.update(dt); }, render: function() { that.render(); }}, this.bpms[this.level]/1000.0);
this.setupLevel();
	}
	defocus() {
			if (this.timer!=null) {
			this.pause();
	}
	}
	preload(lev) {
		
	}
	update(dt) {
	if (this.currentAction==0) {
	this.currentAction++;
	return;
	}
					if (!this.actionCompleted && this.currentAction>1) {
				this.fail();
				return;
			}
this.currentAction++;
//action and level checks go here
if (this.currentAction>=this.numberOfActions) {
this.pool.staticSounds[this.music].destroy();
this.level++;
var snd;
var playing=false;
this.timer.stop();
if (fs.existsSync(this.packdir+"pre"+this.level+".ogg")) {
snd=so.create(this.packsdir+"pre"+this.level);
snd.play();
playing=true;
}
if (fs.existsSync(this.packdir+"nlevel.ogg") && !playing) {
snd=so.create(this.packsdir+"nlevel");
snd.play();
playing=true;
}
if (playing) {
var that=this;
snd.on("ended",function() {
that.setupLevel();
});
}
if (!playing) this.setupLevel();
return;
}
	this.action=utils.randomInt(1,this.actions);
	this.actionCompleted=false;
	this.toDestroy.push(this.pool.playStatic(this.packsdir+"a"+this.action,0));;
		if (this.action==1) this.actionCompleted=true;//freeze
		this.scoreTimer.reset();
	}
async 	fail() {
	this.timer.stop();
			var snd=this.pool.staticSounds[this.music].sound;
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
			var snd=this.pool.staticSounds[this.music].sound;
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
		if (this.currentAction==0) {
			if (this.input.isJustPressed(KeyEvent.DOM_VK_S)) {
				console.log(os.homedir());
				this.test.play();
			}
			return;
		}
		this.handleKeys();
	}
	handleKeys() {
	if (this.actionCompleted) return;
	var keys=this.input.keysPressed();
		if (keys.length>1){
	console.log("length "+keys.length);
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
	setupLevel() {
	this.destroyPool();
			

			this.music=this.pool.playStatic(this.packsdir+this.level+"music");
			console.log("slot "+this.music);
this.timer.change(this.bpms[this.level]/1000.0);
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
var snd=this.pool.staticSounds[this.music].sound
this.timer.stop();
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
var snd=this.pool.staticSounds[this.music].sound
snd.play();
for (var i=snd.playbackRate;i<=1;i+=0.05) {
			snd.playbackRate=i;
			console.log(snd.playbackRate);
			await utils.sleep(8);
		}
		snd.seek(this.pauseTime);
		this.timer.start();
}
calculateScore() {
speech.speak(this.scoreTimer.elapsed);
}
destroyPool() {
if (this.toDestroy.length>0) {
	for (var i=0;i<this.toDestroy.length;i++) {
	this.pool.staticSounds[this.toDestroy[i]].destroy();
	}
	}
}
}
export { Game };