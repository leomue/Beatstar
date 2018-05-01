import sono from 'sono';
import {panner} from 'sono/effects';
import {speech} from './tts';

const isElectron = true;
let playOnceTimer;
class SoundObjectItem {
	constructor(file, callback = 0, tag = 0) {
		const that = this;
		this.onMemory = 0;
		if (typeof file === 'string') {
			this.fileName = file;
			this.sound = sono.create(file);
			this.onMemory++;
			this.sound.id = file;
			this.fromMemory = false;
		this.sound.on('loaded', () => {
 that.doneLoading();
		});
		this.sound.on('destroy', () => {
			that.destroySound();
		});
		} else {
			this.fileName = so.memName;
			const found = so.findSound(this.fileName);
			if (found == -1) {
			console.log('fuck! -1 when creating from memory!');
			} else {
				found.onMemory++;
			}
			this.sound = sono.create(file.data);
			this.sound.on('destroy', () => {
	that.destroySound();
			});
			this.sound.id = so.memName;
			this.fromMemory = true;
		}
		this.timeout = setTimeout(() => {
 that.checkProgress();
		}, 2000);
		this.loaded = false;
		this.callback = callback;
		this.timeToLoad = performance.now();
		this.tag = tag;
		if (this.fromMemory) {
	clearTimeout(this.timeout);
	this.loaded = true;
		}
	}

	destroySound() {
		const found = so.findSound(this.fileName);
		if (found == -1) {
		console.log('fuck. -1!' + this.fileName);
		return;
		}
		found.onMemory--;
// Console.log("got the sound on memory "+found.onMemory+" times. "+found.fileName);
console.log('destroy ' + found.onMemory);
if (found.onMemory <= 0 && found.sound.data != null) {
found.sound.unload();
console.log('unloaded.' + this.fileName);
}
	}

	checkProgress() {
		if (this.sound.progress == 0) {
						this.sound.destroy();
						var that = this;
						this.sound = sono.create({src: this.fileName, onComplete() {
 that.doneLoading();
						}});
this.sound.on('destroy', () => {
			that.destroySound();
});
		}
		if (this.sound.progress == 1) {
			this.doneLoading();
		} else {
			var that = this;
			this.timeout = setTimeout(() => {
 that.checkProgress();
			}, 500);
		}
	}

	doneLoading() {
		clearTimeout(this.timeout);
		//		This.data = this.sound.data;
		this.loaded = true;
		if (this.callback != 0) {
			this.callback();
		}
	}

	play() {
		this.sound.play();
	}

	destroy() {
			this.sound.destroy();
	}

	unload() {
		this.sound.unload();
	}
}
class SoundObject {
	constructor() {
		this.sounds = new Array();
		this.oneShots = new Array();
		this.debug = false;
		this.loadingQueue = false;
		this.queueCallback = 0;
		this.loadedSounds = 0;
		this.loadingSounds = 0;
		this.loadedCallback = 0;
		this.queue = new Array();
		this.queueLength = 0;
		this.statusCallback = null;

		this.extension = '.ogg';
		if (isElectron == true) {
			this.directory = './sounds/';
		} else if (sono.canPlay.opus) {
			this.directory = '../soundsopus/';
			this.extension = '.opus';
		} else {
			this.directory = '../soundsm4a/';
			this.extension = '.m4a';
		}

		this.oneShotSound = null;
	}

	setStatusCallback(callback) {
		this.statusCallback = callback;
	}

	findSound(file) {
		for (const i in this.sounds) {
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
		for (let i = 0; i < this.sounds.length; i++) {
			if (typeof this.sounds[i] !== 'undefined') {
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
		const found = this.findSound(file);
		let returnObject = null;
		if (found == -1 || found.sound.data == null) {
			var that = this;
			returnObject = new SoundObjectItem(file, (() => {
 that.doneLoading();
			}));
								this.sounds.push(returnObject);
								returnObject = returnObject.sound;
		} else {
			this.memName = found.fileName;
			returnObject = new SoundObjectItem(found.sound, (() => {
 that.doneLoading();
			}));
			// I want to try this, we don't need to push this to the array if it's from memory.
								this.sounds.push(returnObject);
			// Found.onMemory++;
								returnObject = returnObject.sound;
		}
		return returnObject;
	}
load(file) {
const fs=require('fs');
		file = this.directory + file + this.extension;
		if (fs.exists(file)) {
		this.queue.push(file);
		this.queueLength = this.queue.length;
		}
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
			const that = this;
			if (typeof this.statusCallback !== 'undefined' && this.statusCallback != null) {
				this.statusCallback(1 - this.queue.length / this.queueLength);
			}
			if (this.findSound(this.queue[0]) != -1) {
				this.queue.splice(0, 1);
				this.handleQueue();
				return;
			}
			this.sounds.push(new SoundObjectItem(this.queue[0], (() => {
 that.handleQueue();
			}), 1));
			this.queue.splice(0, 1);
		} else {
			this.loadingQueue = false;
				console.log('finished with queue.');
				if (typeof this.queueCallback !== 'undefined' && this.queueCallback != 0) {
					this.queueCallback();
				}
		}
	}

	setCallback(callback) {
		this.loadedCallback = callback;
	}

	doneLoading() {
		const result = this.isLoading();

		if (result == 1) {
			if (typeof this.loadedCallback !== 'undefined' && this.loadedCallback != 0 && this.loadedCallback != null) {
				this.loadedCallback();
			}
		}
	}

	isLoading() {
		const loading = 0;
		this.loadedSounds = 0;
		this.loadingSounds = 0;
		const stillLoading = new Array();
		for (let i = 0; i < this.sounds.length; i++) {
			if (typeof this.sounds[i] !== 'undefined') {
				if (this.sounds[i].loaded == false) {
					this.loadingSounds++;
				} else {
					this.loadedSounds++;
				}
			}
		}

		return this.loadedSounds / this.sounds.length;
	}

	playOnce(file) {
		this.oneShotSound = so.create(file);
		this.oneShots.push(this.oneShotSound);
		this.oneShotSound.play();
		const toDestroy = new Array();
		const that = this;
		this.oneShotSound.on('ended', () => {
			for (var i = 0; i < that.oneShots.length; i++) {
				if (that.oneShots[i].playing == false) {
that.oneShots[i].destroy();
toDestroy.push(i);
				}
			}
			for (var i = 0; i < toDestroy.length; i++) {
				if (that.oneShotSounds[i].playing == false) {
				that.oneShotSounds.splice(toDestroy[i], 1);
									speech.speak('destroyed.' + toDestroy[i]);
				}
			}
		 });
	}

	destroy(file, callback = 0) {
		let noMore = false;
		const filename = this.directory + file + this.extension;
		while (!noMore) {
			const found = this.findSoundIndex(filename);
			if (found == -1 || this.sounds[found].sound.data == null) {
				noMore = true;
			} else {
																																				this.sounds[found].sound.destroy();
												this.sounds.splice(found, 1);
			}
		}
		if (callback != 0) {
callback();
		}
	}

	kill(callback = 0) {
		while (this.sounds.length > 0) {
															this.sounds[0].sound.destroy();
					this.sounds.splice(0, 1);
		}
		if (callback != 0) {
callback();
		}
	}
}
const so = new SoundObject();
export {so};
