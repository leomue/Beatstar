import {Howl, Howler} from 'howler';
import {speech} from './tts';

var isElectron = true;
var playOnceTimer;
class SoundObjectItem {
	constructor(file, callback=0, tag=0) {
		var that = this;
		this.onMemory=0;
		if (typeof file=="string") {
		this.fileName = file;
this.sound=newHowl({
src: file;
});
this.sound.once("load",function() { that.doneLoading()
});
				this.timeout = setTimeout(function() { that.checkProgress();}, 2000);
		this.loaded = false;
		this.callback = callback;
		this.timeToLoad = performance.now();
		this.tag = tag;
	}
	checkProgress() {
		if (this.sound.state() == "loaded) {
			this.doneLoading();
		} else {
			var that = this;
			this.timeout = setTimeout(function() { that.checkProgress();}, 500);
		}
		
	}
	doneLoading() {
		clearTimeout(this.timeout);
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
			}
	unload() {
		this.sound.unload();
		
	}
	
}
class SoundObject {
	constructor() {
		this.sounds = new Array();
		this.oneShots=new Array();
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
			this.directory = "../soundsopus/";
				this.extension=".opus";
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
		found=-1;
		if (found == -1 || found.sound.data == null) {
			var that = this;
			returnObject = new SoundObjectItem(file, function() { that.doneLoading(); });
								this.sounds.push(returnObject);
			returnObject = returnObject.sound;
		} else {
			this.memName=found.fileName;
			returnObject = new SoundObjectItem(found.sound, function() { that.doneLoading(); });
											this.sounds.push(returnObject);
	//found.onMemory++;
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
		this.oneShots.push(this.oneShotSound);
		this.oneShotSound.play();
		var toDestroy=new Array();
		var that = this;
		this.oneShotSound.on("ended", function() {
			for (var i=0;i<that.oneShots.length;i++) {
				if (that.oneShots[i].playing==false) {
that.oneShots[i].destroy();
toDestroy.push(i);
				}
			}
			for (var i=0;i<toDestroy.length;i++) {
if (that.oneShotSounds[i].playing==false) {
				that.oneShotSounds.splice(toDestroy[i],1);
									speech.speak("destroyed."+toDestroy[i]);
}
			}
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
																																				this.sounds[found].sound.destroy();
												this.sounds.splice(found,1);
											}
				}
				if (callback!=0) callback();
	}
	kill(callback=0) {
				while (this.sounds.length>0) {
															this.sounds[0].sound.destroy();
					this.sounds.splice(0,1);
				}
				if (callback!=0) callback();
	}

}
let so = new SoundObject();
export { so }
