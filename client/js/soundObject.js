import "babel-polyfill";
import sono from 'sono';
import {KeyboardInput} from './input';
import {KeyEvent} from './keycodes';
import {utils} from './utilities';

var isElectron = true;
var playOnceTimer;
class SoundObjectItem {
	constructor(file, callback=0, tag=0, stream=false) {
		this.duckingFirstTime=true;
this.stream=stream;
			this.fileName = file;
	if (typeof file=="string") {
		if (!stream) {
this.sound = sono.create({
src: file,
onComplete:() => { this.doneLoading(); } });
		this.timeout = setTimeout(() => { this.checkProgress();}, 2000);
		this.data = this.sound.data;
		this.loaded = false;
		this.callback = callback;
		this.tag = tag;

}
if (stream) {
console.log("streaming sound");
this.sound = sono.create("");
this.htmlSound = new Audio();
this.source=this.sound.context.createMediaElementSource(this.htmlSound);
this.htmlSound.src=file;
this.htmlSound.addEventListener("loadeddata",()=> {
		this.loaded = false;
		this.callback = callback;
		this.tag = tag;
this.doneLoading();

		this.timeout = setTimeout(() => { this.checkProgress();}, 2000);
		this.data = this.htmlSound.data;
console.log("vol"+this.sound.volume);
});
}
}
else if (typeof file=="object") {
this.sound = sono.create("");
this.sound.data=file;
		this.loaded = false;
		this.callback = callback;
		this.tag = tag;
this.doneLoading();
}
	}
	set loop(v) {
	this.sound.loop=v;
	}
	checkProgress() {
		
		if (this.sound.progress == 0) {
			this.sound.destroy();
			this.sound = sono.create({src:this.fileName,onComplete:() => { this.doneLoading(); } },this.stream);
		}
		
		if (this.sound.progress == 1) {
			this.doneLoading();
		} else {
			this.timeout = setTimeout(() => { this.checkProgress();}, 500);
		}
		
	}
	
	doneLoading() {
		clearTimeout(this.timeout);
		this.data = this.sound.data;
		this.loaded = true;
		
		if (this.callback!=0) {
			
			this.callback();
		}
	}
	play() {
		this.sound.play();
	}
stop() {
this.sound.stop();
}
pause() {
this.sound.pause();
}
resume() {
this.sound.resume();
}
	destroy() {
		this.sound.destroy();
		
	}
unload() { this.sound.destroy(); }
	duck(time) {
		if (this.duckingFirstTime) this.oldVolume=this.volume;
		this.duckingFirstTime=false;
		this.sound.fade(0.3,0.15);
					}
					unduck(time) {

						this.sound.fade(this.oldVolume,150);
									}
	async fade(time) {
		this.sound.fade(0,time);
		return new Promise(resolve => {
			this.sound.once('fade', () => {
				this.sound.stop();
				resolve('ok');
			});// End
					});// Promise

	}

	pos(x,y,z) {
		
	}

	forcePlay() {
		this.sound.stop();
		this.sound.play();
	}
	playSync() {
		const inp = new KeyboardInput();
		inp.init();
		this.sound.play();
		inp.justPressedEventCallback = (evt => {
			if (evt == KeyEvent.DOM_VK_Q || evt == KeyEvent.DOM_VK_X) {
				this.sound.stop();
				inp.justPressedEventCallback = null;
			}
		});
		return new Promise(resolve => {
			this.sound.once('ended', () => {
				resolve('ok');
				inp.justPressedEventCallback = null;
			});// End
			this.sound.once('stop', () => {
				resolve('ok');
				inp.justPressedEventCallback = null;
			});// Stop
		});// Promise
	}

	get active() {
if (!this.sound.loaded) {
return false;
}
		if (this.sound.progress<1 ) {
			return false;
		}

		if (this.sound.loaded) {
			return true;
		}

	}
	get playing() {
		return this.sound.playing;
	}


}
class SoundObject {
	constructor() {
		this.sounds = new Array();
		this.loadingQueue = false;
		this.queueCallback = 0;
		this.loadedSounds = 0;
		this.loadingSounds = 0;
		this.loadedCallback = 0;
		this.queue = new Array();
		this.queueLength = 0;
		this.statusCallback = null;
		this.directory = "./sounds/";
		this.extension = ".ogg";
		this.oneShots = new Array();
		this.debug = false;


		this.oneShotSound = null;
	}
	setStatusCallback(callback) {
		this.statusCallback = callback;
	}
	findSound(file) {
		for (let i=0;i<this.sounds.length;i++) {
			if (this.sounds[i].fileName == file) {
				return this.sounds[i];
			}
		}
		return -1;
	}
	findSoundIndex(file) {
		for (const i in this.sounds) {
			if (this.sounds[i].fileName == file) {
				return i;
			}
		}

		return -1;
	}


	resetQueuedInstance() {
		for (let i=0;i<this.sounds.length;i++) {
			if (typeof this.sounds[i] != "undefined") {
				if (this.sounds[i].tag == 1) {
					this.sounds[i].sound.destroy();
					this.sounds.splice(i, 1);
				}
			}
		}
		
		this.loadingQueue = false;
		this.queueCallback = 0;
		this.loadedSounds = 0;
		this.loadingSounds = 0;
		this.loadedCallback = 0;
		this.queue = new Array();
		this.queueLength = 0;
		this.statusCallback = null;
	}
	
	
	
	create(file,stream=false) {
		file = this.directory + file + this.extension;
let found=-1;
		if (!stream) found = this.findSound(file);
		let returnObject = null;
		if (found == -1 || found.data == null) {
					returnObject = new SoundObjectItem(file, () => { this.doneLoading(); },-1,stream);
			
			if (!stream) this.sounds.push(returnObject);
			
		} else {
			//returnObject = new SoundObjectItem(sono.utils.cloneBuffer(found.sound.data), () => { this.doneLoading(); });
			returnObject = new SoundObjectItem(found.sound.data, () => { this.doneLoading(); },-1,false);
					}
		return returnObject;
	}
	
	enqueue(file,stream) {
		
		file = this.directory + file + this.extension;
		console.log("queuing "+file);
		this.queue.push({file,stream});
		this.queueLength = this.queue.length;
		
	}
	
	loadQueue() {
		
			this.handleQueue();
			this.loadingQueue = true;
		
	}
	setQueueCallback(callback) {
		this.queueCallback = callback;
	}
	resetQueue() {
		this.queue = new Array();
		this.loadingQueue = false;
	}
	handleQueue() {
		
		
		if (this.queue.length > 0) {
			
			
			if (typeof this.statusCallback != "undefined" && this.statusCallback!=null) {
				this.statusCallback(1-this.queue.length/this.queueLength);
			}
			if (this.findSound(this.queue[0].file)!=-1) {
				
				
				this.queue.splice(0, 1);
				
				this.handleQueue();
				return;
			}
			this.sounds.push(new SoundObjectItem(this.queue[0].file, () => { this.handleQueue(); }, 1,this.queue[0].stream));
			this.queue.splice(0, 1);
		} else {
			
			
				
				this.loadingQueue = false;
				if (typeof this.queueCallback != "undefined" && this.queueCallback != 0) {
					this.queueCallback();
				}
			}
		
	}
	setCallback(callback) {
		this.loadedCallback = callback;
	}
	doneLoading() {
		let result = this.isLoading();
		
		if (result == 1) {
			
			if (typeof this.loadedCallback != "undefined" && this.loadedCallback != 0 && this.loadedCallback != null) {
				console.log(this.loadedCallback);
				this.loadedCallback();
			}
		}
	}
	
	isLoading() {
		let loading = 0;
		this.loadedSounds = 0;
		this.loadingSounds= 0;
		let stillLoading = new Array();
		for (let i=0;i<this.sounds.length;i++) {
			if (typeof this.sounds[i] != "undefined") {
				if (this.sounds[i].loaded == false) {
					this.loadingSounds++;
					
				} else {
					this.loadedSounds++;
				}
			}
		}
		
		return this.loadedSounds/this.sounds.length;
	}
	
	playOnce(file) {
		this.oneShotSound = this.create(file).sound;
		this.oneShotSound.stop();
		this.oneShotSound.play();
		this.oneShotSound.on("ended", () => {
		if (this.oneShotSound.playing==false) this.oneShotSound.destroy();
		 });
		
	}
	destroy(file, callback = 0) {
		let noMore = false;
		const filename = this.directory + file + this.extension;
		while (!noMore) {
			const found = this.findSoundIndex(filename);
			if (found == -1) {
				noMore = true;
			} else {
				this.sounds[found].sound.unload();
				this.sounds.splice(found, 1);
			}
		}

		if (callback != 0) {
			callback();
		}
	}

	kill(callback = 0) {
		while (this.sounds.length > 0) {
			this.sounds.splice(0, 1);
		}

		sono.destroyAll();
		if (callback != 0) {
			callback();
		}
	}
	
}
export let so = new SoundObject();