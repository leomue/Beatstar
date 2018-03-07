import {Howl, Howler} from 'howler';
import {speech} from './tts';

const isElectron = true;
let playOnceTimer;
class SoundObjectItem {
	constructor(file, callback = 0, tag = 0) {
		const that = this;
		this.fileName = file;
		this.sound = new Howl({
			src: file,
			onload() {
 that.doneLoading();
			}
		});
		this.timeout = setTimeout(() => {
 that.checkProgress();
		}, 2000);
		this.loaded = false;
		this.callback = callback;
		this.timeToLoad = performance.now();
		this.tag = tag;
	}

	checkProgress() {
		if (this.sound.state() == 'loaded') {
			this.doneLoading();
		} else {
			const that = this;
			this.timeout = setTimeout(() => {
 that.checkProgress();
			}, 500);
		}
	}

	doneLoading() {
			clearTimeout(this.timeout);
			this.loaded = true;
			if (this.callback != 0) {
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

	destroy() {
		speech.speak('yay');
			this.sound.unload();
	}

	unload() {
		this.sound.unload();
	}

	get volume() {
		return this.sound.volume();
	}

	set volume(v) {
		return this.sound.volume(v);
	}

	set loop(v) {
		return this.sound.loop(v);
	}

	get loop() {
		return this.sound.loop();
	}

	get playing() {
		return this.sound.playing();
	}

	get playbackRate() {
		return this.sound.rate();
	}

	set playbackRate(v) {
		return this.sound.rate(v);
	}

	get currentTime() {
		return this.sound.seek();
	}

	get duration() {
		return this.sound.duration;
	}

	get position() {
		return this.sound.seek();
	}

	set currentTime(v) {
		return this.sound.seek(v);
	}

	seek(time) {
		return this.sound.seek(time);
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
		} else {
			this.directory = '../soundsopus/';
			this.extension = '.opus';
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
		let returnObject = null;
		const that = this;
		returnObject = new SoundObjectItem(file, (() => {
 that.doneLoading();
		}));
								this.sounds.push(returnObject);
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
that.oneShots[i].unload();
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
							console.log('found ' + found);
							if (found == -1) {
								noMore = true;
							} else {
											this.sounds[found].sound.unload();
											console.log('state after destroy' + this.sounds[found].sound.state());
												this.sounds.splice(found, 1);
												console.log('destroyed ' + this.sounds.length);
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
				Howler.unload();
				if (callback != 0) {
callback();
				}
	}
}
const so = new SoundObject();
export {so};
