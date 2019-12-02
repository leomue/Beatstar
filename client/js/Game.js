'use strict';
import { report } from './main';

import { lang } from './main';
import fs from 'fs';
import os from 'os';
import $ from 'jquery';
import { strings } from './strings';
import { speech } from './tts';
import { increase, addCash, data, actionKeys } from './main';
import { getAch, pack, packdir, save } from './main';
import { OldTimer } from './oldtimer';
// Var os=require('os');
import { SoundHandler } from './soundHandler';
import { utils } from './utilities';
import { so } from './soundObject';
import { st } from './stateMachine';
import Timer from './timer';
import { ScrollingText } from './scrollingText';
// Var fs=require('fs');
import { KeyboardInput } from './input.js';
import { KeyEvent } from './keycodes.js';

class Game {
	constructor(creds, mode = 1) {
		this.totalTime = 0;
		this.humanize = require("humanize-duration");
		this.lng = "en";
		if (lang == 2) this.lng = "es";

		increase("totalGames");
		this.resync = setInterval(() => {
			if (this.newUpdateInterval != null) {
				clearInterval(this.updateInterval);
				this.updateInterval = this.newUpdateInterval;
				this.newUpdateInterval = null;
			}
		}, 5);
		this.newUpdateInterval = null;
		this.updateInterval = null;
		this.updates = 0;
		this.totalScore = [];
		this.maxUpdates = 0;
		this.justEnded = true;
		this.eventName = "";
		this.maxSafeguards = data.safeguards;
		this.volume = 1;
		this.totalAverage = [];
		this.cash = 0;
		so.directory = './sounds/',
			this.scoreAverage = [];
		this.levelAverage = [];
		this.timer = Timer({
			update: () => {

				if (!this.paused) {
					increase("totalTime", 1, false);
					this.totalTime++;
				}
			},
			render: () => { }
		}, 1);
		this.timer.start();
		this.scoreCounter = so.create('cling');
		this.locator = so.create("locator");
		so.directory = '';
		this.canPause = true;
		this.actionCompleted = false;
		this.toDestroy = new Array();
		this.scoreTimer = new OldTimer();
		var that = this;
		this.pauseTime = 0;
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
			so.enqueue(packdir + 'nlevel', true);
		}
		if (fs.existsSync(packdir + 'win.ogg')) {
			so.enqueue(packdir + 'win', true);
		}
		if (fs.existsSync(packdir + 'fail.ogg')) {
			so.enqueue(packdir + 'fail', true);
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
		if (data.actionLimit == 0) this.keys.splice(11, 20);
		const that = this;
		so.setQueueCallback(() => {
			so.directory = './sounds/';
			that.setupLevel();
		});
		this.queueLevels(this.level);
		so.loadQueue();
	}

	update(dt) {
		if (this.paused) {
			return;
		}
		//update
		if (this.currentAction == 0) {
			this.currentAction++;
		}
		if (!this.actionCompleted && this.action > 1) {
			if (data.safeguards <= 0) {
				this.fail(true);
				return;
			}
			data.safeguards--;
			this.safeuse = true;
			increase("totalSafeguards", 1, false);
			this.currentAction--;
			save();
			this.actionCompleted = true;
			this.safe.pitch = utils.progressPitch(data.safeguards, 1, this.maxSafeguards, 1.6, 0.9);
			this.safe.play();
		}
		this.currentAction++;
		// Action and level checks go here
		if (this.currentAction >= this.numberOfActions) {
			this.input.justPressedEventCallback = null;
			so.directory = '';
			if (typeof this.music !== "undefined") {
				//change
								if (!data.streamMusic) this.music.sound.removeAllListeners();
				this.music.stop();
				this.music.destroy();
				this.music = null;
			}
			if (typeof this.preSound !== "undefined") {
				this.preSound.stop();
			}
			so.directory = './sounds/';
			this.level++;

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
		this.timer.stop();
		if (data.safeguards >= 1 && !skipGuards) {
			data.safeguards--;
			increase("totalSafeguards", 1, false);
			this.safeuse = true;
			save();
			this.actionCompleted = true;
			this.currentAction--;
			this.safe.pitch = utils.progressPitch(data.safeguards, 1, this.maxSafeguards, 1.6, 0.9);
			this.safe.play();
			return;
		}
		increase("totalFails");
		clearInterval(this.updateInterval);
		clearInterval(this.resync);
		so.directory = '';
		this.input.justPressedEventCallback = null;
		const failsound = so.create(packdir + 'fail', true);
		failsound.play();
		so.directory = './sounds/';
		if (!data.streamMusic) this.music.sound.removeAllListeners();
		this.music.stop();
		this.music.destroy();
		while (failsound.playing) {
			await utils.sleep(16);
			if (this.input.isDown(KeyEvent.DOM_VK_ESCAPE) || this.input.isDown(KeyEvent.DOM_VK_Q)) {
				failsound.destroy();
			}
		}
		if (this.level == this.levels) {
			await getAch("faillast");
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
				bootSound.sound.on('ended', () => {
					input.justPressedEventCallback = null;
					that.doScore();
				});
				so.directory = './sounds/';

				input.justPressedEventCallback = function (evt) {
					bootSound.sound.off('ended');
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
		save();
	}

	async quit() {
		this.timer.stop();
		this.input.justPressedEventCallback = null;
		clearInterval(this.updateInterval);
		clearInterval(this.resync);
		const snd = this.music;
		snd.unload();
		so.resetQueue();
		so.resetQueuedInstance();
		const that = this;
		so.kill(() => {
			if (fs.existsSync(packdir + 'credits.ogg') && this.credits) {
				const input = new KeyboardInput();
				input.init();
				so.directory = '';
				const bootSound = so.create(packdir + 'credits');
				bootSound.play();
				bootSound.sound.on('ended', () => {
					input.justPressedEventCallback = null;
					that.doScore();
				});
				so.directory = './sounds/';

				input.justPressedEventCallback = function (evt) {
					bootSound.sound.off('ended');
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
		save();
	}

	async save() {
		if (!data.allowSave) {
			this.timer.stop();
			this.input.justPressedEventCallback = null;
			return;
		}
		clearInterval(this.updateInterval);
		clearInterval(this.resync);
		const snd = this.music;
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
			speech.speak(this.cash + " ");
			return;
		}
		if (key == KeyEvent.DOM_VK_T) {
			speech.speak(this.humanize(this.totalTime * 1000, { language: this.lng }));
			return;
		}

		if (key == KeyEvent.DOM_VK_G) {
			speech.speak(data.safeguards + " ");
			return;
		}
		if (key == KeyEvent.DOM_VK_V) {
			speech.speak(this.level + ", " + this.levels);
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
		if (this.action == 1 && this.keys.includes(key, data.actionLimit + 2)) {
			this.fail();
			return;
		}
		if (key == this.keys[data.actionLimit + this.action]) {
			so.directory = '';
			if (!this.rev) {
				this.pool.playStatic(packdir + 'o' + this.action, 0);
			}
			if (this.rev) {
				this.pool.playStatic(packdir + 'a' + this.action, 0);
			}
			so.directory = './sounds/';
			increase("totalActions", 1, false);
			this.actionCompleted = true;
			this.calculateScore();
			return;
		}
		if (key != this.keys[data.actionLimit + this.action] && this.keys.includes(key, data.actionLimit + 2)) {
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
			increase("totalLevels", 1, false);
		}
		this.scoreAverage = [];
		this.levelAverage = [];
		if (this.level > this.levels) {
			increase("totalWins");
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
			if (this.level > 1) this.queueLevels(this.level);
			this.input.justPressedEventCallback = (evt) => {
				if (evt == KeyEvent.DOM_VK_RETURN && this.preSound.playing) {
					this.preSound.stop();
					this.postprocess();
				}
			};
			this.preSound.sound.on("ended", () => {
				this.postprocess();
			});
		}
	}
	postprocess() {
		so.directory = '';
		const that = this;
		if (this.music !== null) {
			
			if (!data.streamMusic) this.music.sound.removeAllListeners();
			this.music.stop();
			this.music.destroy();
			this.music = null;
		}
		this.music = so.create(packdir + this.level + 'music', data.streamMusic);
		if (!data.streamMusic) this.music.loop = true;
		this.music.volume = this.volume;
		so.directory = './sounds/';
		if (!data.streamMusic) {
			
			this.music.sound.once("play", () => {
				
				if (this.updateInterval != null) clearInterval(this.updateInterval);
				this.newUpdateInterval = setInterval(() => {
					this.update();
				}, this.bpms[this.level]);
				this.locator.pitch = 1;
				this.locator.play();
				setTimeout(() => {
					this.locator.stop();
					this.locator.pitch = 1.3;
					this.locator.play();
				}, this.bpms[this.level] / 2);

			});

		}
		this.music.play();
		this.updates = 0;
		if (data.streamMusic) {
			this.locator.pitch = 1;
			this.locator.play();
			setTimeout(() => {
				this.locator.stop();
				this.locator.pitch = 1.3;
				this.locator.play();
			}, this.bpms[this.level] / 2);
			if (this.updateInterval != null) clearInterval(this.updateInterval);
			this.newUpdateInterval = setInterval(() => {
				this.update();
			}, this.bpms[this.level]);
		}
		this.input.justPressedEventCallback = key => {
			this.render(key);
		}
		if (data.streamMusic) {
			this.music.sound.on("ended", () => {
				if (this.paused) return;
				this.music.play();
				this.newUpdateInterval = setInterval(() => {
					this.update();
				}, this.bpms[this.level]);
			});
		}
		this.action = 0;
		this.actionCompleted = false;
		this.currentAction = 0;
		if (!this.playing && this.level > 1) this.currentAction = 1;
		this.numberOfActions = utils.randomInt(6 + this.level, this.level * 2 + 5);
		this.forceLevel = 0;
	}
	unload() {
	}
	async pause() {
		if (!this.canPause || (!this.actionCompleted && this.currentAction > 0 && this.action != 1)) {
			return;
		}
		this.paused = true;
		this.input.justPressedEventCallback = null;
		clearInterval(this.updateInterval);
		const idle = new OldTimer();
		this.canPause = false;
		this.scoreTimer.pause();
		idle.reset();
		this.music.pause();
		this.input.justPressed[KeyEvent.DOM_VK_P] = false;
		let pauseInt = setInterval(() => {
			if (idle.elapsed >= 60000) {
				getAch('idle');
			}
			if (this.input.isJustPressed(KeyEvent.DOM_VK_P)) {
				clearInterval(pauseInt);
				this.unpause();
			}
		}, 50);
	}
	async unpause() {
		this.input.justPressedEventCallback = key => {
			this.render(key);
		};
		this.paused = false;
		clearInterval(this.updateInterval);
		this.updateInterval = null;
		this.music.sound.seek(0);
		this.music.play();
		this.newUpdateInterval = setInterval(() => {
			this.update();
		}, this.bpms[this.level]);
		this.scoreTimer.resume();
		this.input.keysPressed(); // We need this so that it doesn't fail immediately after unpause if you switch windows.
	}
	calculateScore() {
		const bpm = this.bpms[this.level];
		const time = this.scoreTimer.elapsed;
		const score = Math.ceil(((bpm / 2) - Math.abs((bpm / 2) - time)) / (bpm / 2) * 100);
		if (data.sayScore) speech.speak(score);
		this.scoreCounter.pitch = utils.progressPitch(score, 1, 100, 1.0, 2.0);
		this.scoreCounter.stop();
		this.scoreCounter.play();
		this.scoreAverage.push(score);
		const mod = Math.ceil((3500 * score) / bpm);
		this.score += mod;
		this.levelAverage.push(mod);
	}

	queueLevels(lev) {
		let levelLimit = lev + 1;
		if (this.levels < levelLimit) {
			levelLimit = this.levels;
		}
		so.directory = '';
		let debugstr = "";
		let queueLevel = lev;
		if (queueLevel > 1) queueLevel++;
		for (let i = queueLevel; i <= levelLimit; i++) {
			so.enqueue(packdir + i + 'music', true);
			debugstr += "queuing " + i;
			if (fs.existsSync(packdir + 'pre' + i + '.ogg')) {
				so.enqueue(packdir + 'pre' + i, true);
			}
		}
				if (this.level > 1 && this.level != this.forceLevel) {
			so.setQueueCallback(0);
			so.loadQueue();
			so.directory = './sounds/';
		}
	}
}
export { Game };
