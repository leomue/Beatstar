'use strict';
import {speech} from './tts';
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
	this.timer=null;
	this.music=null;
	this.test=so.create("inserror");
	this.eventsound=so.create("fumble");
				this.score=0;
		this.pool=new SoundHandler();
this.bpms=null;
this.level=0;
this.fileData=null;
this.pack="default";
		this.input = new KeyboardInput();
		this.input.init();
		this.levels=null;
		var that=this;
		this.setup();
	}
	setup() {
		this.packdir="packs/"+this.pack+"/";	
		this.packsdir="../packs/"+this.pack+"/";	
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
	this.eventsound.play();
		if (this.timer!=null) {
	this.timer.stop();
	var snd=this.pool.staticSounds[this.slot].sound;
	console.log(snd.playbackRate);
	//for (var i=snd.playbackRate;i<
	}
	}
	focus() {
	this.test.play();
	if (this.timer!=null) {
	}
	}
	
	preload(lev) {
		
	}
	update(dt) {
		if (this.currentAction!=0) {
			if (!this.actionCompleted) {
				this.fail();
				return;
			}
		}
this.currentAction++;
	this.action=utils.randomInt(1,this.actions);
	this.pool.playStatic(this.packsdir+"a"+this.action,0);
	speech.speak(this.action);
	if (this.action==1) this.actionCompleted=true;//freeze
	}
async 	fail() {
	this.timer.stop();
			var snd=this.pool.staticSounds[this.music].sound;
			this.pool.playStatic(this.packsdir+"fail",0);
		for (var i=snd.playbackRate;i>0;i-=0.05) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
		snd.stop();
	}
	async quit() {
		this.timer.stop();
			var snd=this.pool.staticSounds[this.music].sound;
											for (var i=snd.playbackRate;i>0;i-=0.045) {
			snd.playbackRate=i;
			await utils.sleep(30);
		}
				snd.stop();
		st.setState(1);
	}

	render() {
	if (this.input.isJustPressed(KeyEvent.DOM_VK_Q)) {
	this.quit();
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
	handleKeys(event) {
	var keys=this.input.keysDown();
		if (keys.length>1){
	console.log("length "+keys.length);
	keys.forEach(function(i) {
	console.log("key "+keys[i]);
	});
	this.fail();
	return;
	}
	if (keys.length==1 && keys[0]==this.keys[this.action]){
	this.pool.playStatic(packsdir+"o"+this.action);
	return;
		}
			if (keys.length==1 && keys[0]!=this.keys[this.action]){
			console.log("action "+this.action)
			this.fail();
			return;
			}
	}
	setupLevel() {
			this.music=this.pool.playStatic(this.packsdir+this.level+"music");
this.timer.change(this.bpms[this.level]/1000.0);
						this.action=0;
	this.currentAction=0;
	this.numberOfActions=utils.randomInt(4+this.level,this.level*1.5+4);
	}
destroy() {
this.pool.destroy();
}
stoptimer() {
	this.timer.stop();
}
}
export { Game };