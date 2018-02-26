import sono from 'sono';
import {panner} from 'sono/effects';
import {speech} from './tts';

var isElectron = true;
var playOnceTimer;
class SoundObjectItem {
	constructor(file, callback=0, tag=0) {
		var that = this;
		if (typeof file=="string") {
		this.fileName = file;
this.sound=sono.create(file);
this.sound.id=file;
		this.sound.on("loaded",function() { that.doneLoading()
		});
		} else {
			this.fileName = so.memName;
			this.sound=sono.create(file.data);
this.sound.id=so.memName;
this.fromMemory=true;
		}
		this.timeout = setTimeout(function() { that.checkProgress();}, 2000);
//		this.data = this.sound.data;
		this.loaded = false;
		this.callback = callback;
		this.timeToLoad = performance.now();
		this.tag = tag;
if (this.fromMemory) {
	//it's from memory, check progress and doneLoading is useless and causes bugs.
clearTimeout(this.timeout);
//		this.data = this.sound.data;
				this.loaded = true;
}
	}
	checkProgress() {
		if (this.sound.progress == 0) {
			this.sound.unload();
			this.sound.destroy();
			var that=this;
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
//		this.data = this.sound.data;
		this.loaded = true;
		if (this.callback!=0) {
			this.callback();
		}
	}
	play() {
		this.sound.play();
	}
	destroy() {
	this.sound.unload();
		this.sound.destroy();
			}
	unload() {
		this.sound.unload();
		
	}
	
}
class SoundObject {
	constructor() {
		this.sounds = new Array();
		this.debug=false;
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
	findSoundIndex(file) {
		for (var i in this.sounds) {
			
			if (this.sounds[i].fileName == file) {
				return i;
			}
		}
		return -1;
	}

	resetQueuedInstance() {
		for (var i=0;i<this.sounds.length;i++) {
			if (typeof this.sounds[i] != "undefined") {
				if (this.sounds[i].tag == 1) {
				this.sounds[i].sound.unload();
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
		if (found == -1 || found.sound.data == null) {
			var that = this;
			returnObject = new SoundObjectItem(file, function() { that.doneLoading(); });
								this.sounds.push(returnObject);
			returnObject = returnObject.sound;
		} else {
			this.memName=found.fileName;
			returnObject = new SoundObjectItem(found.sound, function() { that.doneLoading(); });
								this.sounds.push(returnObject);
						returnObject = returnObject.sound;
			
}
		return returnObject;
	}
	
	enqueue(file) {
		
		file = this.directory + file + this.extension;
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
				console.log("finished with queue.");
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
			console.log("one shot destroy");
		if (that.oneShotSound.playing==false) that.oneShotSound.destroy();
		 });
		
	}
	destroy(file,callback=0) {
		var noMore=false;
				var filename = this.directory + file + this.extension;
				while (!noMore) {
							var found = this.findSoundIndex(filename);
											if (found == -1 || this.sounds[found].sound.data == null) {
												noMore=true;
}												
											else {
												this.sounds[found].sound.unload();
																								this.sounds[found].sound.destroy();
												this.sounds.splice(found,1);
											}
				}
				if (callback!=0) callback();
	}
	kill(callback=0) {
				while (this.sounds.length>0) {
					console.log("killing "+this.sounds.length);
										this.sounds[0].sound.unload();
					this.sounds[0].sound.destroy();
					this.sounds.splice(0,1);
				}
				if (callback!=0) callback();
	}

}
let so = new SoundObject();
export { so }
