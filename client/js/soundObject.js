import sono from 'sono';
import {panner} from 'sono/effects';

var isElectron = true;
var playOnceTimer;
class SoundObjectItem {
	constructor(file, callback=0, tag=0) {
		console.log(file);
		var that = this;
		this.fileName = file;
		
		this.sound = sono.create({src:file,onComplete:function() { that.doneLoading(); } });
		this.timeout = setTimeout(function() { that.checkProgress();}, 2000);
		this.data = this.sound.data;
		this.loaded = false;
		this.callback = callback;
		this.timeToLoad = performance.now();
		this.tag = tag;
	}
	checkProgress() {
		
		if (this.sound.progress == 0) {
			this.sound.destroy();
			this.sound = sono.create({src:this.fileName,onComplete:function() { that.doneLoading(); } });
		}
		
		if (this.sound.progress == 1) {
			this.doneLoading();
		} else {
			var that = this;
			this.timeout = setTimeout(function() { that.checkProgress();}, 500);
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
	destroy() {
		this.sound.destroy();
		
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
		
		this.extension = ".ogg";
		if (isElectron == true) {
			this.directory = "./sounds/";
		} else {
			if (sono.canPlay.opus) {
				this.directory = "../soundsopus/";
				this.extension=".opus";
			} else {
				this.directory = "../soundsm4a/";
				this.extension = ".m4a";
			}
			
		}
		
		this.oneShotSound = null;
	}
	setStatusCallback(callback) {
		this.statusCallback = callback;
	}
	findSound(file) {
		for (var i in this.sounds) {
			if (this.sounds[i].fileName == file) {
				return this.sounds[i];
			}
		}
		return -1;
	}
	resetQueuedInstance() {
		for (var i=0;i<this.sounds.length;i++) {
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
	
	
	
	create(file) {
		file = this.directory + file + this.extension;
		var found = this.findSound(file);
		var returnObject = null;
		if (found == -1 || found.data == null) {
			var that = this;
			returnObject = new SoundObjectItem(file, function() { that.doneLoading(); });
			
			this.sounds.push(returnObject);
			returnObject = returnObject.sound;
			
		} else {
			
			returnObject = sono.create("");
			returnObject.data = sono.utils.cloneBuffer(found.data);
			
		}
		return returnObject;
	}
	
	enqueue(file) {
		
		file = this.directory + file + this.extension;
		console.log("queuing "+file);
		this.queue.push(file);
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
			
			
			var that = this;
			if (typeof this.statusCallback != "undefined" && this.statusCallback!=null) {
				this.statusCallback(1-this.queue.length/this.queueLength);
			}
			if (this.findSound(this.queue[0])!=-1) {
				
				
				this.queue.splice(0, 1);
				
				this.handleQueue();
				return;
			}
			this.sounds.push(new SoundObjectItem(this.queue[0], function() { that.handleQueue(); }, 1));
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
		var result = this.isLoading();
		
		if (result == 1) {
			
			if (typeof this.loadedCallback != "undefined" && this.loadedCallback != 0 && this.loadedCallback != null) {
				console.log(this.loadedCallback);
				this.loadedCallback();
			}
		}
	}
	
	isLoading() {
		var loading = 0;
		this.loadedSounds = 0;
		this.loadingSounds= 0;
		var stillLoading = new Array();
		for (var i=0;i<this.sounds.length;i++) {
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
		this.oneShotSound = so.create(file);
		this.oneShotSound.stop();
		this.oneShotSound.play();
		var that = this;
		this.oneShotSound.on("ended", function() {
		if (that.oneShotSound.playing==false) that.oneShotSound.destroy();
		 });
		
	}
	
}
let so = new SoundObject();
export { so }