'use strict';
import fs from 'fs';
import os from 'os';
import $ from 'jquery';
import {strings} from './strings';
import {speech} from './tts';
import {addCash, data, actionKeys} from './main';
import {getAch, pack, packdir, save} from './main';
import {OldTimer} from './oldtimer';
// Var os=require('os');
import {SoundHandler} from './soundHandler';
import {utils} from './utilities';
import {so} from './soundObject';
import {st} from './stateMachine';
import Timer from './timer';
import {ScrollingText} from './scrollingText';
// Var fs=require('fs');
import {KeyboardInput} from './input.js';
import {KeyEvent} from './keycodes.js';

class Game {
	constructor(creds, mode = 1) {
		this.totalScore = [];
		this.maxSafeguards = data.safeguards;
		this.volume = 1;
		this.totalAverage = [];
		this.cash = 0;
		so.directory = './sounds/',
			this.scoreAverage = [];
		this.levelAverage = [];
		this.scoreCounter = so.create('cling');
		so.directory = '';
		this.canPause = true;

		this.actionCompleted = false;
		this.toDestroy = new Array();
		this.scoreTimer = new OldTimer();
		var that = this;
		this.pauseTime = 0;
		this.timer = null;
		this.music = null;
		this.score = 0;
		this.pool = new SoundHandler();
		this.bpms = null;
		this.level = 0;
		this.fileData = null;
		this.input = new KeyboardInput();
		this.input.init();
		this.levels = null;
		var that = this;
		this.setup(creds, mode);
	}

	async setup(creds, mode) {
		this.forceLevel = 1;
		if (mode == 1) {
			this.rev = false;
		}
		if (mode == 2) {
			this.rev = true;
		}
		if (typeof data.save.pack !== 'undefined') {
			if (data.save.pack != pack) {
				const answer = await questionSync('killSave', [data.save.pack, data.save.level]);
				if (!answer) {
					st.setState(2);
					return;
				}// Answer
				data.save = {}; save();
			}// Pack not equal
			else {
				this.forceLevel = data.save.level;
			}// It's the same pack
		}// If save exists
		this.credits = creds;
		this.getscore = 0;
		this.safeuse = false;
		if (fs.existsSync(packdir + 'bpm.txt')) {
			this.fileData = fs.readFileSync(packdir + 'bpm.txt', 'utf8');
		} else {
			const error = new ScrollingText('There was an error loading the pack ' + this.pack + '.', '\n', (() => {
						st.setState(2);
						}));
		}
		this.bpms = this.fileData.split(',');
		so.directory = './sounds/';
		this.safe = so.create('safe');
		so.directory = '';
		this.levels = this.bpms.length - 1;
		if (this.bpms[this.levels] == '') {
			this.levels--;
		}
		this.level = this.forceLevel - 1;
		this.level++;
		data.save = {}; save();
		so.directory = './sounds/';
		so.enqueue('safe');
		so.directory = '';
		if (fs.existsSync(packdir + 'nlevel.ogg')) {
			so.enqueue(packdir + 'nlevel');
		}
		if (fs.existsSync(packdir + 'win.ogg')) {
			so.enqueue(packdir + 'win');
		}
		if (fs.existsSync(packdir + 'fail.ogg')) {
			so.enqueue(packdir + 'fail');
		}
		for (let i = 1; i <= 10; i++) {
			if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
				so.enqueue(packdir + 'a' + i);
				this.actions = i;
			}
			if (fs.existsSync(packdir + 'o' + i + '.ogg') && i != 1) {
				so.enqueue(packdir + 'o' + i);
			}
		}
		this.keys = actionKeys;
		const that = this;
		this.timer = Timer({update(dt) {
				that.update(dt);
				}, render() {
				}}, this.bpms[this.level] / 1000.0);
		so.setQueueCallback(() => {
				so.directory = './sounds/';
				that.setupLevel();
				});
		this.queueLevels(this.level);
		so.loadQueue();
	}

	update(dt) {
		if (this.currentAction == 0) {
			this.currentAction++;
			return;
		}
		if (!this.actionCompleted && this.action > 1) {
			if (data.safeguards <= 0) {
				this.fail(true);
				return;
			}

			data.safeguards--;
			this.safeuse = true;
			this.currentAction--;
			save();
			this.actionCompleted = true;
			this.safe.pitch = utils.progressPitch(data.safeguards, 1, this.maxSafeguards, 1.6, 0.9);
			this.safe.splay();
		}
		this.currentAction++;
		// Action and level checks go here
		if (this.currentAction >= this.numberOfActions) {
			this.input.justPressedEventCallback = null;
			so.directory = '';
			so.destroy(packdir + this.level + 'music');
			so.destroy(packdir + 'pre' + this.level);
			so.directory = './sounds/';
			this.level++;
			this.timer.stop();
			this.setupLevel();
			return;
		}
		if (!this.rev) {
			this.action = utils.randomInt(1, this.actions);
		}
		if (this.rev) {
			this.action = utils.randomInt(2, this.actions);
		}
		this.actionCompleted = false;
		so.directory = '';
		if (!this.rev) {
			this.pool.playStatic(packdir + 'a' + this.action, 0);
		}
		if (this.rev) {
			this.pool.playStatic(packdir + 'o' + this.action, 0);
		}
		so.directory = './sounds/';
		//		If (this.action==1) this.actionCompleted=true;//freeze
		this.scoreTimer.reset();
	}

	async doScore() {
		if (this.getscore >= 6) {
			await getAch('fingr');
		}
		addCash(this.cash, 0, () => {
				st.setState(2);
				});
	}

	async fail(skipGuards = false) {
		if (data.safeguards >= 1 && !skipGuards) {
			data.safeguards--;
			this.safeuse = true;
			save();
			this.actionCompleted = true;
			this.currentAction--;
			this.safe.pitch = utils.progressPitch(data.safeguards, 1, this.maxSafeguards, 1.6, 0.9);
			this.safe.splay();
			return;
		}
		this.timer.stop();
		const snd = this.music;
		so.directory = '';
		this.input.justPressedEventCallback = null;
		const failsound = this.pool.playStatic(packdir + 'fail', 0);
		so.directory = './sounds/';
		for (let i = snd.playbackRate; i > 0; i -= 0.05) {
			snd.playbackRate = i;
			await utils.sleep(30);
		}
		snd.unload();
		while (this.pool.staticSounds[failsound].sound.playing) {
			await utils.sleep(10);
			if (this.input.isDown(KeyEvent.DOM_VK_RETURN)) {
				this.pool.staticSounds[failsound].sound.unload();
			}
		}
		so.resetQueue();
		so.resetQueuedInstance();
		const that = this;
		if (this.level == 1) {
			await getAch('lactions');
		}
		so.kill(() => {
				if (fs.existsSync(packdir + 'credits.ogg') && this.credits) {
				const input = new KeyboardInput();
				input.init();
				so.directory = '';
				const bootSound = so.create(packdir + 'credits');
				bootSound.play();
				bootSound.sound.once('end', () => {
						input.justPressedEventCallback = null;
						that.doScore();
						});
				so.directory = './sounds/';

				input.justPressedEventCallback = function (evt) {
				bootSound.sound.off('end');
				bootSound.stop();
				bootSound.destroy();
				input.justPressedEventCallback = null;
				that.doScore();
				};
				}// If file exists
				else {
					that.doScore();
				}
		});
	}

	async quit() {
		this.input.justPressedEventCallback = null;
		this.timer.stop();
		const snd = this.music;
		for (let i = snd.playbackRate; i > 0; i -= 0.045) {
			snd.playbackRate = i;
			await utils.sleep(30);
		}
		snd.unload();
		so.resetQueue();
		so.resetQueuedInstance();
		const that = this;
		so.kill(() => {
				if (fs.existsSync(packdir + 'credits.ogg') && this.credits) {
				console.log('found credits');
				const input = new KeyboardInput();
				input.init();
				so.directory = '';
				const bootSound = so.create(packdir + 'credits');
				bootSound.play();
				bootSound.sound.once('end', () => {
						input.justPressedEventCallback = null;
						that.doScore();
						});
				so.directory = './sounds/';

				input.justPressedEventCallback = function (evt) {
				bootSound.sound.off('end');
				bootSound.stop();
				bootSound.destroy();
				input.justPressedEventCallback = null;
				that.doScore();
				};
				}// If file exists
				else {
					that.doScore();
				}
		});
	}

	async save() {
		if (!data.allowSave) {
			return;
		}
		this.timer.stop();
		const snd = this.music;
		for (let i = snd.playbackRate; i > 0; i -= 0.045) {
			snd.playbackRate = i;
			await utils.sleep(30);
		}
		snd.unload();
		so.resetQueue();
		so.resetQueuedInstance();
		const that = this;
		so.kill(async () => {
				data.save = {
				pack,
				level: this.level
				};
				save();
				await new ScrollingText('saved');
				this.doScore();
				});
	}

	render(key) {
		if (key == KeyEvent.DOM_VK_Q) {
			this.quit();
			return;
		}
		if (key == KeyEvent.DOM_VK_C) {
			speech.speak(this.cash);
			return;
		}
		if (key == KeyEvent.DOM_VK_G) {
			speech.speak(data.safeguards);
			return;
		}
		if (key == KeyEvent.DOM_VK_L) {
			speech.speak(this.level);
			return;
		}
		if (key == KeyEvent.DOM_VK_S) {
			this.save();
			return;
		}
		if (key == KeyEvent.DOM_VK_P) {
			this.pause();
			return;
		}
		if (key == KeyEvent.DOM_VK_PAGE_UP) {
			this.volume += 0.08;
			this.music.volume = this.volume;
			return;
		}
		if (key == KeyEvent.DOM_VK_PAGE_DOWN) {
			this.volume -= 0.08;
			this.music.volume = this.volume;
			return;
		}
		this.handleKeys(key);
	}

	handleKeys(key) {
		if (this.actionCompleted) {
			return;
		}
		if (this.action == 1) {
			this.fail();
			return;
		}
		if (key == this.keys[this.action]) {
			so.directory = '';
			if (!this.rev) {
				this.pool.playStatic(packdir + 'o' + this.action, 0);
			}
			if (this.rev) {
				this.pool.playStatic(packdir + 'a' + this.action, 0);
			}
			so.directory = './sounds/';
			this.actionCompleted = true;
			this.calculateScore();
			return;
		}
		if (key != this.keys[this.action]) {
			this.fail();
		}
	}

	async setupLevel() {
		if (this.level > 1 && this.level != this.forceLevel) {
			// Avg
			this.actionPercentage = Math.ceil(utils.percentOf(this.numberOfActions * this.level, utils.averageInt(this.levelAverage)));
			if (utils.averageInt(this.scoreAverage) > 90) {
				this.getscore++;
				this.cash += utils.averageInt(this.levelAverage);
			}
			if (utils.averageInt(this.scoreAverage) < 90) {
				this.getscore--;
			}
			this.cash += (utils.averageInt(this.levelAverage) + utils.averageInt(this.levelAverage) + this.actionPercentage);
		}
		this.scoreAverage = [];
		this.levelAverage = [];
		if (this.level > this.levels) {
			if (fs.existsSync(packdir + 'win.ogg')) {
				so.directory = '';
				this.input.justPressedEventCallback = null;
				this.winSound = so.create(packdir + 'win');
				this.winSound.play();
				while (this.winSound.playing == true) {
					await utils.sleep(5);
					if (this.input.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
						this.winSound.stop();
					}// Key
				}// While
			}// If file exists
			if (!this.safeuse) {
				await getAch('usepinky');
			}
			data.unlocks[pack].win = true;
			let wins = 0;
			for (const i in data.unlocks) {
				if (data.unlocks[i].win) {
					wins++;
				}
			}
			console.log('wins' + wins);
			if (wins == 1) {
				await getAch('w1');
				so.directory = './sounds/';
				const snd = so.create('saveUnlock');
				await snd.playSync();
				data.allowSave = true;
				save();
				await new ScrollingText(strings.get('saveFeature'));
			}
			if (wins == 5) {
				await getAch('w5');
			}
			if (wins == 10) {
				await getAch('w10');
			}
			if (wins == 25) {
				await getAch('w25');
			}
			if (wins == 50) {
				await getAch('w50');
			}
			const that2 = this;
			so.resetQueue();
			so.resetQueuedInstance();
			// Get some kind of reward if you win, but only if the pack has enough levels
			if (this.levels > 9) {
				this.cash += (this.cash * 2);
			}
			so.kill(() => {
					that2.doScore();
					});
			return;
		}// Winning
		this.canPause = true;
		if (data.unlocks[pack].level < this.level) {
			data.unlocks[pack].level = this.level;
			save();
		}
		this.playing = false;
		if (fs.existsSync(packdir + 'pre' + this.level + '.ogg')) {
			so.directory = '';
			this.preSound = so.create(packdir + 'pre' + this.level);
			so.directory = './sounds/';
			this.preSound.play();
			this.playing = true;
		}
		if (fs.existsSync(packdir + 'nlevel.ogg') && !this.playing && this.level > 1 && this.level != this.forceLevel) {
			so.directory = '';
			this.preSound = so.create(packdir + 'nlevel');
			so.directory = './sounds/';
			this.preSound.play();
			this.playing = true;
		}
		if (!this.playing) {
			this.queueLevels(this.level);
			this.postprocess();
		}
		else {
			if (this.level>1) this.queueLevels(this.level);
			this.input.justPressedEventCallback=(evt)=> {
				if (evt==KeyEvent.DOM_VK_RETURN && this.preSound.playing) {
					this.preSound.stop();
					this.postprocess();
				}
			};
			this.preSound.sound.once("end",()=> {
					this.postprocess();
					});
		}
	}
	postprocess() {
		so.directory = '';
		const that = this;
		this.music = so.create(packdir + this.level + 'music', false);
		this.music.loop = true;
		this.music.volume = this.volume;
		so.directory = './sounds/';
		this.music.play();
		this.timer.change(that.bpms[that.level]  /1000.0);
		this.music.sound.once('play', () => {
				this.input.justPressedEventCallback = key => {
				this.render(key);
				};
				});
		if (this.level > 1 && this.level != this.forceLevel) {
			//this.queueLevels();
		}
		this.action = 0;
		this.actionCompleted = false;
		this.currentAction = 0;
		if (!this.playing && this.level>1) this.currentAction=1;
		this.numberOfActions = utils.randomInt(6 + this.level, this.level * 2 + 5);
		this.forceLevel = 0;
	}

	unload() {
	}

	async pause() {
		if (!this.canPause) {
			return;
		}
		this.input.justPressedEventCallback = null;
		const idle = new OldTimer();
		this.canPause = false;
		const snd = this.music;
		this.timer.stop();
		this.scoreTimer.pause();
		this.pauseTime = snd.currentTime;
		for (let i = snd.playbackRate; i > 0; i -= 0.05) {
			snd.playbackRate = i;
			await utils.sleep(30);
		}
		snd.pause();
		idle.reset();
		while (!this.input.isDown(KeyEvent.DOM_VK_P)) {
			await utils.sleep(10);

			if (idle.elapsed >= 60000) {
				await getAch('idle');
			}
		}
		this.unpause();
	}

	async unpause() {
		this.input.justPressedEventCallback = key => {
			this.render(key);
		};
		const snd = this.music;
		snd.play();
		for (let i = snd.playbackRate; i <= 1; i += 0.05) {
			snd.playbackRate = i;
			await utils.sleep(8);
		}
		snd.seek(this.pauseTime);
		this.timer.start();
		this.scoreTimer.resume();
		this.input.keysPressed(); // We need this so that it doesn't fail immediately after unpause if you switch windows.
	}

	calculateScore() {
		const bpm = this.bpms[this.level];
		const time = this.scoreTimer.elapsed;
		const score = Math.ceil(((bpm / 2) - Math.abs((bpm / 2) - time)) / (bpm / 2) * 100);
		this.scoreCounter.pitch = utils.progressPitch(score, 1, 100, 1.0, 2.0);
		this.scoreCounter.stop();
		this.scoreCounter.play();
		this.scoreAverage.push(score);
		const mod = Math.ceil((3500 * score) / bpm);
		this.score += mod;
		this.levelAverage.push(mod);
	}

	queueLevels(lev) {
		let levelLimit = lev+1;
		if (this.levels < levelLimit) {
			levelLimit = this.levels;
		}
		so.directory = '';
		let debugstr="";
		let queueLevel=lev;
		if (queueLevel>1) queueLevel++;
		for (let i = queueLevel; i <= levelLimit; i++) {
			so.enqueue(packdir + i + 'music');
			debugstr+="queuing "+i;
			if (fs.existsSync(packdir + 'pre' + i + '.ogg')) {
				so.enqueue(packdir + 'pre' + i);
			}
		}
		//speech.speak(debugstr)
		if (this.level > 1 && this.level != this.forceLevel) {
			so.setQueueCallback(0);
			so.loadQueue();
			so.directory = './sounds/';
		}
	}
}
export {Game};
