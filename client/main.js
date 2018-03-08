process.env.HMR_PORT = 0; process.env.HMR_HOSTNAME = ''; require = (function (r, e, n) {
	function t(n, o) {
		function i(r) {
			return t(i.resolve(r));
		} function f(e) {
			return r[n][1][e] || e;
		} if (!e[n]) {
			if (!r[n]) {
				const c = typeof require === 'function' && require; if (!o && c) {
					return c(n, !0);
				} if (u) {
					return u(n, !0);
				} const l = new Error('Cannot find module \'' + n + '\''); throw l.code = 'MODULE_NOT_FOUND', l;
			}i.resolve = f; const s = e[n] = new t.Module(n); r[n][0].call(s.exports, i, s, s.exports);
		} return e[n].exports;
	} function o(r) {
		this.id = r, this.bundle = t, this.exports = {};
	} var u = typeof require === 'function' && require; t.isParcelRequire = !0, t.Module = o, t.modules = r, t.cache = e, t.parent = u; for (let i = 0; i < n.length; i++) {
t(n[i]);
	} return t;
})({12: [function (require, module, exports) {
	'use strict'; if (Object.defineProperty(exports, '__esModule', {value: !0}), void 0 === _) {
		var _ = {DOM_VK_CANCEL: 3, DOM_VK_HELP: 6, DOM_VK_BACK_SPACE: 8, DOM_VK_TAB: 9, DOM_VK_CLEAR: 12, DOM_VK_RETURN: 13, DOM_VK_ENTER: 14, DOM_VK_SHIFT: 16, DOM_VK_CONTROL: 17, DOM_VK_ALT: 18, DOM_VK_PAUSE: 19, DOM_VK_CAPS_LOCK: 20, DOM_VK_ESCAPE: 27, DOM_VK_SPACE: 32, DOM_VK_PAGE_UP: 33, DOM_VK_PAGE_DOWN: 34, DOM_VK_END: 35, DOM_VK_HOME: 36, DOM_VK_LEFT: 37, DOM_VK_UP: 38, DOM_VK_RIGHT: 39, DOM_VK_DOWN: 40, DOM_VK_PRINTSCREEN: 44, DOM_VK_INSERT: 45, DOM_VK_DELETE: 46, DOM_VK_0: 48, DOM_VK_1: 49, DOM_VK_2: 50, DOM_VK_3: 51, DOM_VK_4: 52, DOM_VK_5: 53, DOM_VK_6: 54, DOM_VK_7: 55, DOM_VK_8: 56, DOM_VK_9: 57, DOM_VK_SEMICOLON: 59, DOM_VK_EQUALS: 61, DOM_VK_A: 65, DOM_VK_B: 66, DOM_VK_C: 67, DOM_VK_D: 68, DOM_VK_E: 69, DOM_VK_F: 70, DOM_VK_G: 71, DOM_VK_H: 72, DOM_VK_I: 73, DOM_VK_J: 74, DOM_VK_K: 75, DOM_VK_L: 76, DOM_VK_M: 77, DOM_VK_N: 78, DOM_VK_O: 79, DOM_VK_P: 80, DOM_VK_Q: 81, DOM_VK_R: 82, DOM_VK_S: 83, DOM_VK_T: 84, DOM_VK_U: 85, DOM_VK_V: 86, DOM_VK_W: 87, DOM_VK_X: 88, DOM_VK_Y: 89, DOM_VK_Z: 90, DOM_VK_CONTEXT_MENU: 93, DOM_VK_NUMPAD0: 96, DOM_VK_NUMPAD1: 97, DOM_VK_NUMPAD2: 98, DOM_VK_NUMPAD3: 99, DOM_VK_NUMPAD4: 100, DOM_VK_NUMPAD5: 101, DOM_VK_NUMPAD6: 102, DOM_VK_NUMPAD7: 103, DOM_VK_NUMPAD8: 104, DOM_VK_NUMPAD9: 105, DOM_VK_MULTIPLY: 106, DOM_VK_ADD: 107, DOM_VK_SEPARATOR: 108, DOM_VK_SUBTRACT: 109, DOM_VK_DECIMAL: 110, DOM_VK_DIVIDE: 111, DOM_VK_F1: 112, DOM_VK_F2: 113, DOM_VK_F3: 114, DOM_VK_F4: 115, DOM_VK_F5: 116, DOM_VK_F6: 117, DOM_VK_F7: 118, DOM_VK_F8: 119, DOM_VK_F9: 120, DOM_VK_F10: 121, DOM_VK_F11: 122, DOM_VK_F12: 123, DOM_VK_F13: 124, DOM_VK_F14: 125, DOM_VK_F15: 126, DOM_VK_F16: 127, DOM_VK_F17: 128, DOM_VK_F18: 129, DOM_VK_F19: 130, DOM_VK_F20: 131, DOM_VK_F21: 132, DOM_VK_F22: 133, DOM_VK_F23: 134, DOM_VK_F24: 135, DOM_VK_NUM_LOCK: 144, DOM_VK_SCROLL_LOCK: 145, DOM_VK_COMMA: 188, DOM_VK_PERIOD: 190, DOM_VK_SLASH: 191, DOM_VK_BACK_QUOTE: 192, DOM_VK_OPEN_BRACKET: 219, DOM_VK_BACK_SLASH: 220, DOM_VK_CLOSE_BRACKET: 221, DOM_VK_QUOTE: 222, DOM_VK_META: 224};
	} exports.KeyEvent = _;
}, {}], 9: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}); const e = !0; class t {
		constructor(e = !1) {
			this.synth = window.speechSynthesis, this.webTTS = e;
		}

		speak(e) {
			if (this.webTTS) {
				const t = new SpeechSynthesisUtterance(e); this.synth.stop(), this.synth.speak(t);
			} else {
document.getElementById('speech').innerHTML = ''; const t = document.createElement('p'); t.appendChild(document.createTextNode(e)), document.getElementById('speech').appendChild(t);
			}
		}

		setWebTTS(e) {
			this.webTTS = e;
		}
	} if (void 0 === s) {
		var s = new t();
	} exports.TTS = t, exports.speech = s;
}, {}], 11: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.so = void 0; let s = require('howler'),
		e = require('./tts'); const t = !0; let o; class n {
		constructor(e, t = 0, o = 0) {
			const n = this; this.fileName = e, this.sound = new s.Howl({src: e, onload() {
n.doneLoading();
			}}), this.timeout = setTimeout(() => {
n.checkProgress();
			}, 2e3), this.loaded = !1, this.callback = t, this.timeToLoad = performance.now(), this.tag = o;
		}

		checkProgress() {
			if (this.sound.state() == 'loaded') {
this.doneLoading();
			} else {
				const s = this; this.timeout = setTimeout(() => {
s.checkProgress();
				}, 500);
			}
		}

		doneLoading() {
clearTimeout(this.timeout), this.loaded = !0, this.callback != 0 && this.callback();
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
e.speech.speak('yay'), this.sound.unload();
		}

		unload() {
this.sound.unload();
		}

		get volume() {
			return this.sound.volume();
		}

		set volume(s) {
			return this.sound.volume(s);
		}

		set loop(s) {
			return this.sound.loop(s);
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

		set playbackRate(s) {
			return this.sound.rate(s);
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

		set currentTime(s) {
			return this.sound.seek(s);
		}

		seek(s) {
			return this.sound.seek(s);
		}
	} class i {
		constructor() {
			this.sounds = new Array(), this.oneShots = new Array(), this.debug = !1, this.loadingQueue = !1, this.queueCallback = 0, this.loadedSounds = 0, this.loadingSounds = 0, this.loadedCallback = 0, this.queue = new Array(), this.queueLength = 0, this.statusCallback = null, this.extension = '.ogg', t == 1 ? this.directory = './sounds/' : (this.directory = '../soundsopus/', this.extension = '.opus'), this.oneShotSound = null;
		}

		setStatusCallback(s) {
			this.statusCallback = s;
		}

		findSound(s) {
			for (const e in this.sounds) {
				if (this.sounds[e].fileName == s) {
					return this.sounds[e];
				}
			} return -1;
		}

		findSoundIndex(s) {
			for (const e in this.sounds) {
				if (this.sounds[e].fileName == s) {
					return e;
				}
			} return -1;
		}

		resetQueuedInstance() {
			for (let s = 0; s < this.sounds.length; s++) {
				void 0 !== this.sounds[s] && this.sounds[s].tag == 1 && (this.sounds[s].sound.unload(), this.sounds.splice(s, 1));
			} this.loadingQueue = !1, this.queueCallback = 0, this.loadedSounds = 0, this.loadingSounds = 0, this.loadedCallback = 0, this.queue = new Array(), this.queueLength = 0, this.statusCallback = null;
		}

		create(s) {
			s = this.directory + s + this.extension; let e = null; const t = this; return e = new n(s, () => {
t.doneLoading();
			}), this.sounds.push(e), e;
		}

		enqueue(s) {
			s = this.directory + s + this.extension, this.queue.push(s), this.queueLength = this.queue.length;
		}

		loadQueue() {
this.handleQueue(), this.loadingQueue = !0;
		}

		setQueueCallback(s) {
			this.queueCallback = s;
		}

		resetQueue() {
			this.queue = new Array(), this.loadingQueue = !1;
		}

		handleQueue() {
			if (this.queue.length > 0) {
				const s = this; if (void 0 !== this.statusCallback && this.statusCallback != null && this.statusCallback(1 - this.queue.length / this.queueLength), this.findSound(this.queue[0]) != -1) {
					return this.queue.splice(0, 1), void this.handleQueue();
				} this.sounds.push(new n(this.queue[0], () => {
s.handleQueue();
				}, 1)), this.queue.splice(0, 1);
			} else {
				this.loadingQueue = !1, console.log('finished with queue.'), void 0 !== this.queueCallback && this.queueCallback != 0 && this.queueCallback();
			}
		}

		setCallback(s) {
			this.loadedCallback = s;
		}

		doneLoading() {
				this.isLoading() == 1 && void 0 !== this.loadedCallback && this.loadedCallback != 0 && this.loadedCallback != null && this.loadedCallback();
		}

		isLoading() {
			this.loadedSounds = 0, this.loadingSounds = 0; new Array(); for (let s = 0; s < this.sounds.length; s++) {
				void 0 !== this.sounds[s] && (this.sounds[s].loaded == 0 ? this.loadingSounds++ : this.loadedSounds++);
			} return this.loadedSounds / this.sounds.length;
		}

		playOnce(s) {
			this.oneShotSound = u.create(s), this.oneShots.push(this.oneShotSound), this.oneShotSound.play(); const t = new Array(),
				o = this; this.oneShotSound.on('ended', () => {
					for (var s = 0; s < o.oneShots.length; s++) {
						o.oneShots[s].playing == 0 && (o.oneShots[s].unload(), t.push(s));
					} for (s = 0; s < t.length; s++) {
						o.oneShotSounds[s].playing == 0 && (o.oneShotSounds.splice(t[s], 1), e.speech.speak('destroyed.' + t[s]));
					}
				});
		}

		destroy(s, e = 0) {
			let t = !1; const o = this.directory + s + this.extension; for (;!t;) {
				const s = this.findSoundIndex(o); console.log('found ' + s), s == -1 ? t = !0 : (this.sounds[s].sound.unload(), console.log('state after destroy' + this.sounds[s].sound.state()), this.sounds.splice(s, 1), console.log('destroyed ' + this.sounds.length));
			}e != 0 && e();
		}

		kill(e = 0) {
			for (;this.sounds.length > 0;) {
this.sounds.splice(0, 1);
			} s.Howler.unload(), e != 0 && e();
		}
	} const u = new i(); exports.so = u;
}, {'./tts': 9}], 6: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.speech = exports.ScrollingText = void 0; let e = require('jquery'),
		t = r(e),
		s = require('./keycodes'),
		n = require('./soundObject'),
		i = require('./tts'); function r(e) {
		return e && e.__esModule ? e : {default: e};
	} if (void 0 === a) {
		var a = new i.TTS();
	} if (void 0 == d) {
		var d = 0;
	} class h {
		constructor(e, t = '\n', s = 0) {
			this.text = e, this.delimiter = t, this.splitText = this.text.split(t), this.currentLine = 0, this.sndOpen = n.so.create('UI/textOpen'), this.sndContinue = n.so.create('UI/textScroll'), this.sndClose = n.so.create('UI/textClose'), this.callback = s; document.getElementById('touchArea'); this.init();
		}

		init() {
			d = this, document.addEventListener('keydown', this.handleKeys), this.sndOpen.play(), this.currentLine = 0, this.readCurrentLine();
		}

		handleKeys(e) {
			switch (e.which) {
				case s.KeyEvent.DOM_VK_UP: case s.KeyEvent.DOM_VK_DOWN: case s.KeyEvent.DOM_VK_LEFT: case s.KeyEvent.DOM_VK_RIGHT: d.readCurrentLine(); break; case s.KeyEvent.DOM_VK_RETURN: d.advance();
			}
		}

		handleTap(e) {
			e == 0 && this.readCurrentLine(), e == 1 && this.advance();
		}

		readCurrentLine() {
a.speak(this.splitText[this.currentLine]);
		}

		advance() {
			this.currentLine < this.splitText.length - 1 ? (this.currentLine++, this.sndContinue.play(), this.readCurrentLine()) : (this.sndClose.play(), this.sndClose.unload(), this.sndOpen.unload(), this.sndContinue.unload(), document.removeEventListener('keydown', this.handleKeys), this.callback != 0 && this.callback());
		}
	}exports.ScrollingText = h, exports.speech = a;
}, {'./keycodes': 12, './soundObject': 11, './tts': 9}], 4: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.Player = void 0; let e = require('fs'),
		t = i(e),
		r = require('os'),
		s = i(r),
		_ = require('./keycodes'),
		n = require('./main'),
		K = require('./scrollingText'); function i(e) {
		return e && e.__esModule ? e : {default: e};
	} class o {
		constructor() {
			this.beatcoins = 0, this.pack = 'default', this.actionKeys = [0, 0, _.KeyEvent.DOM_VK_SPACE, _.KeyEvent.DOM_VK_TAB, _.KeyEvent.DOM_VK_RETURN, _.KeyEvent.DOM_VK_BACK_SPACE, _.KeyEvent.DOM_VK_UP, _.KeyEvent.DOM_VK_DOWN, _.KeyEvent.DOM_VK_RIGHT, _.KeyEvent.DOM_VK_LEFT], this.unlocks = {default: 0};
		}
	}exports.Player = o;
}, {'./keycodes': 12, './main': 1, './scrollingText': 6}], 3: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.KeyboardInput = void 0; let e = require('jquery'),
		s = h(e),
		t = require('./tts'); function h(e) {
		return e && e.__esModule ? e : {default: e};
	} class r {
		constructor() {
			this.keyDown = [], this.justPressed = [], this.chars = [], this.justReleased = [], this.justPressedEventCallback = null;
		}

		init() {
			const e = this; document.addEventListener('keydown', s => {
e.handleKeyDown(s);
			}), document.addEventListener('keyup', s => {
e.handleKeyUp(s);
			}), document.addEventListener('keypress', s => {
e.handleChar(s);
			});
		}

		handleKeyDown(e) {
			this.keyDown[e.which] == 1 && void 0 !== this.keyDown[e.which] || (this.keyDown[e.which] = !0, this.justPressed[e.which] = !0, this.justReleased[e.which] = !1, void 0 !== this.justPressedEventCallback && this.justPressedEventCallback != null && this.justPressedEventCallback(e.which));
		}

		handleChar(e) {
			String.fromCharCode(e.which) != '' && (this.chars += String.fromCharCode(e.which));
		}

		handleKeyUp(e) {
			this.keyDown[e.which] == 1 && (this.keyDown[e.which] = !1, this.justPressed[e.which] = !1, this.justReleased[e.which] = !0), this.chars = '';
		}

		isDown(e) {
			return this.keyDown[e];
		}

		isJustPressed(e) {
			return this.justPressed[e] == 1 && (this.justPressed[e] = !1, !0);
		}

		isJustReleased(e) {
			return Boolean(this.justReleased[e]) && (this.justReleased[e] = !1, !0);
		}

		keysDown() {
			const e = []; return this.keyDown.forEach((s, t) => {
				s && e.push(t);
			}), e;
		}

		getChars() {
			const e = this.chars; return this.chars = '', e;
		}

		keysPressed() {
			const e = []; return this.justPressed.forEach((s, t) => {
				s && e.push(t);
			}), this.justPressed.splice(), e;
		}

		releaseAllKeys() {}

		keysReleased() {
			const e = []; return this.justReleased.forEach((s, t) => {
				s && e.push(t);
			}), this.justReleased.splice(), e;
		}
	}exports.KeyboardInput = r;
}, {'./tts': 9}], 20: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}); class e {
		constructor() {
			this.elapsed, this.paused = !0, this.lastTime = 0, this.pauseWhen = 0, this.started = !0;
		}

		isActive() {
			return !paused & started;
		}

		get elapsed() {
			return this.paused ? this.pauseWhen - this.lastTime : performance.now() - this.lastTime;
		}

		pause() {
			this.paused = !0, this.pauseWhen = performance.now();
		}

		reset() {
			this.lastTime = performance.now(), this.pauseWhen = 0, this.paused = !1, this.started = !0;
		}

		resume() {
			this.paused = !1, this.started = !0, this.lastTime += performance.now() - this.pauseWhen;
		}
	}exports.OldTimer = e;
}, {}], 19: [function (require, module, exports) {
	!(function () {
		'use strict'; const e = function () {
this.init();
		}; e.prototype = {init() {
			const e = this || n; return e._counter = 1e3, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = 'canplaythrough', e._navigator = typeof window !== 'undefined' && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.mobileAutoEnable = !0, e._setup(), e;
		}, volume(e) {
			const t = this || n; if (e = parseFloat(e), t.ctx || u(), void 0 !== e && e >= 0 && e <= 1) {
				if (t._volume = e, t._muted) {
					return t;
				} t.usingWebAudio && t.masterGain.gain.setValueAtTime(e, n.ctx.currentTime); for (let n = 0; n < t._howls.length; n++) {
					if (!t._howls[n]._webAudio) {
						const o = t._howls[n]._getSoundIds(); for (let r = 0; r < o.length; r++) {
							const i = t._howls[n]._soundById(o[r]); i && i._node && (i._node.volume = i._volume * e);
						}
					}
				} return t;
			} return t._volume;
		}, mute(e) {
			const t = this || n; t.ctx || u(), t._muted = e, t.usingWebAudio && t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, n.ctx.currentTime); for (let n = 0; n < t._howls.length; n++) {
				if (!t._howls[n]._webAudio) {
					const o = t._howls[n]._getSoundIds(); for (let r = 0; r < o.length; r++) {
						const i = t._howls[n]._soundById(o[r]); i && i._node && (i._node.muted = Boolean(e) || i._muted);
					}
				}
			} return t;
		}, unload() {
			const e = this || n; for (let n = e._howls.length - 1; n >= 0; n--) {
e._howls[n].unload();
			} return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), e.ctx = null, u()), e;
		}, codecs(e) {
			return (this || n)._codecs[e.replace(/^x-/, '')];
		}, _setup() {
			const e = this || n; if (e.state = e.ctx && e.ctx.state || 'running', e._autoSuspend(), !e.usingWebAudio) {
				if (typeof Audio !== 'undefined') {
					try {
						void 0 === (new Audio()).oncanplaythrough && (e._canPlayEvent = 'canplay');
					} catch (n) {
						e.noAudio = !0;
					}
				} else {
					e.noAudio = !0;
				}
			} try {
				(new Audio()).muted && (e.noAudio = !0);
			} catch (e) {} return e.noAudio || e._setupCodecs(), e;
		}, _setupCodecs() {
			const e = this || n; let t = null; try {
				t = typeof Audio !== 'undefined' ? new Audio() : null;
			} catch (n) {
				return e;
			} if (!t || typeof t.canPlayType !== 'function') {
				return e;
			} const o = t.canPlayType('audio/mpeg;').replace(/^no$/, ''),
				r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g),
				i = r && parseInt(r[0].split('/')[1], 10) < 33; return e._codecs = {mp3: Boolean(!i && (o || t.canPlayType('audio/mp3;').replace(/^no$/, ''))), mpeg: Boolean(o), opus: Boolean(t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '')), ogg: Boolean(t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')), oga: Boolean(t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')), wav: Boolean(t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')), aac: Boolean(t.canPlayType('audio/aac;').replace(/^no$/, '')), caf: Boolean(t.canPlayType('audio/x-caf;').replace(/^no$/, '')), m4a: Boolean((t.canPlayType('audio/x-m4a;') || t.canPlayType('audio/m4a;') || t.canPlayType('audio/aac;')).replace(/^no$/, '')), mp4: Boolean((t.canPlayType('audio/x-mp4;') || t.canPlayType('audio/mp4;') || t.canPlayType('audio/aac;')).replace(/^no$/, '')), weba: Boolean(t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')), webm: Boolean(t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')), dolby: Boolean(t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, '')), flac: Boolean((t.canPlayType('audio/x-flac;') || t.canPlayType('audio/flac;')).replace(/^no$/, ''))}, e;
		}, _enableMobileAudio() {
			const e = this || n,
				t = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent),
				o = Boolean('ontouchend' in window || e._navigator && e._navigator.maxTouchPoints > 0 || e._navigator && e._navigator.msMaxTouchPoints > 0); if (!e._mobileEnabled && e.ctx && (t || o)) {
				e._mobileEnabled = !1, e._mobileUnloaded || e.ctx.sampleRate === 44100 || (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050); var r = function () {
n._autoResume(); const t = e.ctx.createBufferSource(); t.buffer = e._scratchBuffer, t.connect(e.ctx.destination), void 0 === t.start ? t.noteOn(0) : t.start(0), typeof e.ctx.resume === 'function' && e.ctx.resume(), t.addEventListener('ended', () => {
t.disconnect(0), e._mobileEnabled = !0, e.mobileAutoEnable = !1, document.removeEventListener('touchstart', r, !0), document.removeEventListener('touchend', r, !0);
});
				}; return document.addEventListener('touchstart', r, !0), document.addEventListener('touchend', r, !0), e;
			}
		}, _autoSuspend() {
			const e = this; if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && n.usingWebAudio) {
				for (let n = 0; n < e._howls.length; n++) {
					if (e._howls[n]._webAudio) {
						for (let t = 0; t < e._howls[n]._sounds.length; t++) {
							if (!e._howls[n]._sounds[t]._paused) {
								return e;
							}
						}
					}
				} return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(() => {
					e.autoSuspend && (e._suspendTimer = null, e.state = 'suspending', e.ctx.suspend().then(() => {
						e.state = 'suspended', e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
					}));
				}, 3e4), e;
			}
		}, _autoResume() {
			const e = this; if (e.ctx && void 0 !== e.ctx.resume && n.usingWebAudio) {
				return e.state === 'running' && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : e.state === 'suspended' ? (e.ctx.resume().then(() => {
					e.state = 'running'; for (let n = 0; n < e._howls.length; n++) {
e._howls[n]._emit('resume');
					}
				}), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : e.state === 'suspending' && (e._resumeAfterSuspend = !0), e;
			}
		}}; var n = new e(); const t = function (e) {
			e.src && e.src.length !== 0 ? this.init(e) : console.error('An array of source files must be passed with any new Howl.');
		}; t.prototype = {init(e) {
			const t = this; return n.ctx || u(), t._autoplay = e.autoplay || !1, t._format = typeof e.format !== 'string' ? e.format : [e.format], t._html5 = e.html5 || !1, t._muted = e.mute || !1, t._loop = e.loop || !1, t._pool = e.pool || 5, t._preload = typeof e.preload !== 'boolean' || e.preload, t._rate = e.rate || 1, t._sprite = e.sprite || {}, t._src = typeof e.src !== 'string' ? e.src : [e.src], t._volume = void 0 !== e.volume ? e.volume : 1, t._xhrWithCredentials = e.xhrWithCredentials || !1, t._duration = 0, t._state = 'unloaded', t._sounds = [], t._endTimers = {}, t._queue = [], t._playLock = !1, t._onend = e.onend ? [{fn: e.onend}] : [], t._onfade = e.onfade ? [{fn: e.onfade}] : [], t._onload = e.onload ? [{fn: e.onload}] : [], t._onloaderror = e.onloaderror ? [{fn: e.onloaderror}] : [], t._onplayerror = e.onplayerror ? [{fn: e.onplayerror}] : [], t._onpause = e.onpause ? [{fn: e.onpause}] : [], t._onplay = e.onplay ? [{fn: e.onplay}] : [], t._onstop = e.onstop ? [{fn: e.onstop}] : [], t._onmute = e.onmute ? [{fn: e.onmute}] : [], t._onvolume = e.onvolume ? [{fn: e.onvolume}] : [], t._onrate = e.onrate ? [{fn: e.onrate}] : [], t._onseek = e.onseek ? [{fn: e.onseek}] : [], t._onresume = [], t._webAudio = n.usingWebAudio && !t._html5, void 0 !== n.ctx && n.ctx && n.mobileAutoEnable && n._enableMobileAudio(), n._howls.push(t), t._autoplay && t._queue.push({event: 'play', action() {
t.play();
			}}), t._preload && t.load(), t;
		}, load() {
			const e = this; let t = null; if (n.noAudio) {
e._emit('loaderror', null, 'No audio support.');
			} else {
				typeof e._src === 'string' && (e._src = [e._src]); for (let o = 0; o < e._src.length; o++) {
					var r, a; if (e._format && e._format[o]) {
						r = e._format[o];
					} else {
						if (typeof (a = e._src[o]) !== 'string') {
e._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.'); continue;
						}(r = /^data:audio\/([^;,]+);/i.exec(a)) || (r = /\.([^.]+)$/.exec(a.split('?', 1)[0])), r && (r = r[1].toLowerCase());
					} if (r || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), r && n.codecs(r)) {
						t = e._src[o]; break;
					}
				} if (t) {
					return e._src = t, e._state = 'loading', window.location.protocol === 'https:' && t.slice(0, 5) === 'http:' && (e._html5 = !0, e._webAudio = !1), new o(e), e._webAudio && i(e), e;
				} e._emit('loaderror', null, 'No codec support for selected audio sources.');
			}
		}, play(e, t) {
			const o = this; let r = null; if (typeof e === 'number') {
				r = e, e = null;
			} else {
				if (typeof e === 'string' && o._state === 'loaded' && !o._sprite[e]) {
					return null;
				} if (void 0 === e) {
					e = '__default'; let n = 0; for (let e = 0; e < o._sounds.length; e++) {
						o._sounds[e]._paused && !o._sounds[e]._ended && (n++, r = o._sounds[e]._id);
					}n === 1 ? e = null : r = null;
				}
			} const i = r ? o._soundById(r) : o._inactiveSound(); if (!i) {
				return null;
			} if (r && !e && (e = i._sprite || '__default'), o._state !== 'loaded') {
				i._sprite = e, i._ended = !1; const n = i._id; return o._queue.push({event: 'play', action() {
o.play(n);
				}}), n;
			} if (r && !i._paused) {
				return t || o._loadQueue('play'), i._id;
			} o._webAudio && n._autoResume(); const a = Math.max(0, i._seek > 0 ? i._seek : o._sprite[e][0] / 1e3),
				s = Math.max(0, (o._sprite[e][0] + o._sprite[e][1]) / 1e3 - a),
				d = 1e3 * s / Math.abs(i._rate); i._paused = !1, i._ended = !1, i._sprite = e, i._seek = a, i._start = o._sprite[e][0] / 1e3, i._stop = (o._sprite[e][0] + o._sprite[e][1]) / 1e3, i._loop = Boolean(i._loop || o._sprite[e][2]); const u = i._node; if (o._webAudio) {
				const e = function () {
o._refreshBuffer(i); const e = i._muted || o._muted ? 0 : i._volume; u.gain.setValueAtTime(e, n.ctx.currentTime), i._playStart = n.ctx.currentTime, void 0 === u.bufferSource.start ? i._loop ? u.bufferSource.noteGrainOn(0, a, 86400) : u.bufferSource.noteGrainOn(0, a, s) : i._loop ? u.bufferSource.start(0, a, 86400) : u.bufferSource.start(0, a, s), d !== 1 / 0 && (o._endTimers[i._id] = setTimeout(o._ended.bind(o, i), d)), t || setTimeout(() => {
o._emit('play', i._id);
}, 0);
				}; n.state === 'running' ? e() : (o.once('resume', e), o._clearTimer(i._id));
			} else {
				const r = function () {
						u.currentTime = a, u.muted = i._muted || o._muted || n._muted || u.muted, u.volume = i._volume * n.volume(), u.playbackRate = i._rate; try {
							const n = u.play(); if (typeof Promise !== 'undefined' && n instanceof Promise) {
								o._playLock = !0; const e = function () {
									o._playLock = !1, t || o._emit('play', i._id);
								}; n.then(e, e);
							} else {
								t || o._emit('play', i._id);
							} if (u.paused) {
								return void o._emit('playerror', i._id, 'Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.');
							} e !== '__default' ? o._endTimers[i._id] = setTimeout(o._ended.bind(o, i), d) : (o._endTimers[i._id] = function () {
o._ended(i), u.removeEventListener('ended', o._endTimers[i._id], !1);
							}, u.addEventListener('ended', o._endTimers[i._id], !1));
						} catch (e) {
o._emit('playerror', i._id, e);
						}
					},
					s = window && window.ejecta || !u.readyState && n._navigator.isCocoonJS; if (u.readyState >= 3 || s) {
r();
				} else {
					var _ = function () {
r(), u.removeEventListener(n._canPlayEvent, _, !1);
					}; u.addEventListener(n._canPlayEvent, _, !1), o._clearTimer(i._id);
				}
			} return i._id;
		}, pause(e) {
			const n = this; if (n._state !== 'loaded' || n._playLock) {
				return n._queue.push({event: 'pause', action() {
n.pause(e);
				}}), n;
			} const t = n._getSoundIds(e); for (let e = 0; e < t.length; e++) {
n._clearTimer(t[e]); const o = n._soundById(t[e]); if (o && !o._paused && (o._seek = n.seek(t[e]), o._rateSeek = 0, o._paused = !0, n._stopFade(t[e]), o._node)) {
	if (n._webAudio) {
		if (!o._node.bufferSource) {
			continue;
		} void 0 === o._node.bufferSource.stop ? o._node.bufferSource.noteOff(0) : o._node.bufferSource.stop(0), n._cleanBuffer(o._node);
	} else {
isNaN(o._node.duration) && o._node.duration !== 1 / 0 || o._node.pause();
	}
} arguments[1] || n._emit('pause', o ? o._id : null);
			} return n;
		}, stop(e, n) {
			const t = this; if (t._state !== 'loaded') {
				return t._queue.push({event: 'stop', action() {
t.stop(e);
				}}), t;
			} const o = t._getSoundIds(e); for (let e = 0; e < o.length; e++) {
t._clearTimer(o[e]); const r = t._soundById(o[e]); r && (r._seek = r._start || 0, r._rateSeek = 0, r._paused = !0, r._ended = !0, t._stopFade(o[e]), r._node && (t._webAudio ? r._node.bufferSource && (void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0), t._cleanBuffer(r._node)) : isNaN(r._node.duration) && r._node.duration !== 1 / 0 || (r._node.currentTime = r._start || 0, r._node.pause())), n || t._emit('stop', r._id));
			} return t;
		}, mute(e, t) {
			const o = this; if (o._state !== 'loaded') {
				return o._queue.push({event: 'mute', action() {
o.mute(e, t);
				}}), o;
			} if (void 0 === t) {
				if (typeof e !== 'boolean') {
					return o._muted;
				} o._muted = e;
			} const r = o._getSoundIds(t); for (let t = 0; t < r.length; t++) {
				const i = o._soundById(r[t]); i && (i._muted = e, i._interval && o._stopFade(i._id), o._webAudio && i._node ? i._node.gain.setValueAtTime(e ? 0 : i._volume, n.ctx.currentTime) : i._node && (i._node.muted = Boolean(n._muted) || e), o._emit('mute', i._id));
			} return o;
		}, volume() {
			const e = this,
				t = arguments; let o, r, i; if (t.length === 0) {
				return e._volume;
			} if (t.length === 1 || t.length === 2 && void 0 === t[1]) {
e._getSoundIds().indexOf(t[0]) >= 0 ? r = parseInt(t[0], 10) : o = parseFloat(t[0]);
			} else {
				t.length >= 2 && (o = parseFloat(t[0]), r = parseInt(t[1], 10));
			} if (!(void 0 !== o && o >= 0 && o <= 1)) {
				return (i = r ? e._soundById(r) : e._sounds[0]) ? i._volume : 0;
			} if (e._state !== 'loaded') {
				return e._queue.push({event: 'volume', action() {
e.volume.apply(e, t);
				}}), e;
			} void 0 === r && (e._volume = o), r = e._getSoundIds(r); for (let a = 0; a < r.length; a++) {
				(i = e._soundById(r[a])) && (i._volume = o, t[2] || e._stopFade(r[a]), e._webAudio && i._node && !i._muted ? i._node.gain.setValueAtTime(o, n.ctx.currentTime) : i._node && !i._muted && (i._node.volume = o * n.volume()), e._emit('volume', i._id));
			} return e;
		}, fade(e, t, o, r) {
			const i = this; if (i._state !== 'loaded') {
				return i._queue.push({event: 'fade', action() {
i.fade(e, t, o, r);
				}}), i;
			} i.volume(e, r); const a = i._getSoundIds(r); for (let s = 0; s < a.length; s++) {
				const d = i._soundById(a[s]); if (d) {
					if (r || i._stopFade(a[s]), i._webAudio && !d._muted) {
						const r = n.ctx.currentTime,
							i = r + o / 1e3; d._volume = e, d._node.gain.setValueAtTime(e, r), d._node.gain.linearRampToValueAtTime(t, i);
					}i._startFadeInterval(d, e, t, o, a[s], void 0 === r);
				}
			} return i;
		}, _startFadeInterval(e, n, t, o, r, i) {
			const a = this; let s = n; const d = t - n,
				u = Math.abs(d / 0.01),
				_ = Math.max(4, u > 0 ? o / u : o); let l = Date.now(); e._fadeTo = t, e._interval = setInterval(() => {
					const r = (Date.now() - l) / o; l = Date.now(), s += d * r, s = Math.max(0, s), s = Math.min(1, s), s = Math.round(100 * s) / 100, a._webAudio ? e._volume = s : a.volume(s, e._id, !0), i && (a._volume = s), (t < n && s <= t || t > n && s >= t) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, a.volume(t, e._id), a._emit('fade', e._id));
				}, _);
		}, _stopFade(e) {
			const t = this,
				o = t._soundById(e); return o && o._interval && (t._webAudio && o._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(o._interval), o._interval = null, t.volume(o._fadeTo, e), o._fadeTo = null, t._emit('fade', e)), t;
		}, loop() {
			const e = this,
				n = arguments; let t, o, r; if (n.length === 0) {
				return e._loop;
			} if (n.length === 1) {
				if (typeof n[0] !== 'boolean') {
					return Boolean(r = e._soundById(parseInt(n[0], 10))) && r._loop;
				} t = n[0], e._loop = t;
			} else {
				n.length === 2 && (t = n[0], o = parseInt(n[1], 10));
			} const i = e._getSoundIds(o); for (let n = 0; n < i.length; n++) {
				(r = e._soundById(i[n])) && (r._loop = t, e._webAudio && r._node && r._node.bufferSource && (r._node.bufferSource.loop = t, t && (r._node.bufferSource.loopStart = r._start || 0, r._node.bufferSource.loopEnd = r._stop)));
			} return e;
		}, rate() {
			const e = this,
				t = arguments; let o, r, i; if (t.length === 0) {
				r = e._sounds[0]._id;
			} else if (t.length === 1) {
e._getSoundIds().indexOf(t[0]) >= 0 ? r = parseInt(t[0], 10) : o = parseFloat(t[0]);
			} else {
				t.length === 2 && (o = parseFloat(t[0]), r = parseInt(t[1], 10));
			} if (typeof o !== 'number') {
				return (i = e._soundById(r)) ? i._rate : e._rate;
			} if (e._state !== 'loaded') {
				return e._queue.push({event: 'rate', action() {
e.rate.apply(e, t);
				}}), e;
			} void 0 === r && (e._rate = o), r = e._getSoundIds(r); for (let t = 0; t < r.length; t++) {
				if (i = e._soundById(r[t])) {
					i._rateSeek = e.seek(r[t]), i._playStart = e._webAudio ? n.ctx.currentTime : i._playStart, i._rate = o, e._webAudio && i._node && i._node.bufferSource ? i._node.bufferSource.playbackRate.setValueAtTime(o, n.ctx.currentTime) : i._node && (i._node.playbackRate = o); const a = e.seek(r[t]),
						s = 1e3 * ((e._sprite[i._sprite][0] + e._sprite[i._sprite][1]) / 1e3 - a) / Math.abs(i._rate); !e._endTimers[r[t]] && i._paused || (e._clearTimer(r[t]), e._endTimers[r[t]] = setTimeout(e._ended.bind(e, i), s)), e._emit('rate', i._id);
				}
			} return e;
		}, seek() {
			const e = this,
				t = arguments; let o, r; if (t.length === 0) {
				r = e._sounds[0]._id;
			} else if (t.length === 1) {
e._getSoundIds().indexOf(t[0]) >= 0 ? r = parseInt(t[0], 10) : e._sounds.length && (r = e._sounds[0]._id, o = parseFloat(t[0]));
			} else {
				t.length === 2 && (o = parseFloat(t[0]), r = parseInt(t[1], 10));
			} if (void 0 === r) {
				return e;
			} if (e._state !== 'loaded') {
				return e._queue.push({event: 'seek', action() {
e.seek.apply(e, t);
				}}), e;
			} const i = e._soundById(r); if (i) {
				if (!(typeof o === 'number' && o >= 0)) {
					if (e._webAudio) {
						const t = e.playing(r) ? n.ctx.currentTime - i._playStart : 0,
							o = i._rateSeek ? i._rateSeek - i._seek : 0; return i._seek + (o + t * Math.abs(i._rate));
					} return i._node.currentTime;
				} {const n = e.playing(r); if (n && e.pause(r, !0), i._seek = o, i._ended = !1, e._clearTimer(r), n && e.play(r, !0), !e._webAudio && i._node && (i._node.currentTime = o), n && !e._webAudio) {
					var a = function () {
						e._playLock ? setTimeout(a, 0) : e._emit('seek', r);
					}; setTimeout(a, 0);
				} else {
e._emit('seek', r);
				}}
			} return e;
		}, playing(e) {
			const n = this; if (typeof e === 'number') {
				const t = n._soundById(e); return Boolean(t) && !t._paused;
			} for (let e = 0; e < n._sounds.length; e++) {
				if (!n._sounds[e]._paused) {
					return !0;
				}
			} return !1;
		}, duration(e) {
			const n = this; let t = n._duration; const o = n._soundById(e); return o && (t = n._sprite[o._sprite][1] / 1e3), t;
		}, state() {
			return this._state;
		}, unload() {
			let e = this; const t = e._sounds; for (var o = 0; o < t.length; o++) {
				if (t[o]._paused || e.stop(t[o]._id), !e._webAudio) {
/MSIE |Trident\//.test(n._navigator && n._navigator.userAgent) || (t[o]._node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'), t[o]._node.removeEventListener('error', t[o]._errorFn, !1), t[o]._node.removeEventListener(n._canPlayEvent, t[o]._loadFn, !1);
				} delete t[o]._node, e._clearTimer(t[o]._id); const r = n._howls.indexOf(e); r >= 0 && n._howls.splice(r, 1);
			} let i = !0; for (o = 0; o < n._howls.length; o++) {
				if (n._howls[o]._src === e._src) {
					i = !1; break;
				}
			} return r && i && delete r[e._src], n.noAudio = !1, e._state = 'unloaded', e._sounds = [], e = null, null;
		}, on(e, n, t, o) {
			const r = this['_on' + e]; return typeof n === 'function' && r.push(o ? {id: t, fn: n, once: o} : {id: t, fn: n}), this;
		}, off(e, n, t) {
			const o = this,
				r = o['_on' + e]; let i = 0; if (typeof n === 'number' && (t = n, n = null), n || t) {
				for (i = 0; i < r.length; i++) {
					const e = t === r[i].id; if (n === r[i].fn && e || !n && e) {
r.splice(i, 1); break;
					}
				}
			} else if (e) {
				o['_on' + e] = [];
			} else {
				const e = Object.keys(o); for (i = 0; i < e.length; i++) {
e[i].indexOf('_on') === 0 && Array.isArray(o[e[i]]) && (o[e[i]] = []);
				}
			} return o;
		}, once(e, n, t) {
			return this.on(e, n, t, 1), this;
		}, _emit(e, n, t) {
			const o = this,
				r = o['_on' + e]; for (let i = r.length - 1; i >= 0; i--) {
				r[i].id && r[i].id !== n && e !== 'load' || (setTimeout(function (e) {
e.call(this, n, t);
				}.bind(o, r[i].fn), 0), r[i].once && o.off(e, r[i].fn, r[i].id));
			} return o._loadQueue(e), o;
		}, _loadQueue(e) {
			const n = this; if (n._queue.length > 0) {
				const t = n._queue[0]; t.event === e && (n._queue.shift(), n._loadQueue()), e || t.action();
			} return n;
		}, _ended(e) {
			const t = this,
				o = e._sprite; if (!t._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) {
				return setTimeout(t._ended.bind(t, e), 100), t;
			} const r = Boolean(e._loop || t._sprite[o][2]); if (t._emit('end', e._id), !t._webAudio && r && t.stop(e._id, !0).play(e._id), t._webAudio && r) {
t._emit('play', e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = n.ctx.currentTime; const o = 1e3 * (e._stop - e._start) / Math.abs(e._rate); t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), o);
			} return t._webAudio && !r && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, t._clearTimer(e._id), t._cleanBuffer(e._node), n._autoSuspend()), t._webAudio || r || t.stop(e._id), t;
		}, _clearTimer(e) {
			const n = this; if (n._endTimers[e]) {
				if (typeof n._endTimers[e] !== 'function') {
clearTimeout(n._endTimers[e]);
				} else {
					const t = n._soundById(e); t && t._node && t._node.removeEventListener('ended', n._endTimers[e], !1);
				} delete n._endTimers[e];
			} return n;
		}, _soundById(e) {
			const n = this; for (let t = 0; t < n._sounds.length; t++) {
				if (e === n._sounds[t]._id) {
					return n._sounds[t];
				}
			} return null;
		}, _inactiveSound() {
			const e = this; e._drain(); for (let n = 0; n < e._sounds.length; n++) {
				if (e._sounds[n]._ended) {
					return e._sounds[n].reset();
				}
			} return new o(e);
		}, _drain() {
			const e = this,
				n = e._pool; let t = 0,
				o = 0; if (!(e._sounds.length < n)) {
				for (o = 0; o < e._sounds.length; o++) {
					e._sounds[o]._ended && t++;
				} for (o = e._sounds.length - 1; o >= 0; o--) {
					if (t <= n) {
						return;
					} e._sounds[o]._ended && (e._webAudio && e._sounds[o]._node && e._sounds[o]._node.disconnect(0), e._sounds.splice(o, 1), t--);
				}
			}
		}, _getSoundIds(e) {
			const n = this; if (void 0 === e) {
				const e = []; for (let t = 0; t < n._sounds.length; t++) {
e.push(n._sounds[t]._id);
				} return e;
			} return [e];
		}, _refreshBuffer(e) {
			return e._node.bufferSource = n.ctx.createBufferSource(), e._node.bufferSource.buffer = r[this._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, n.ctx.currentTime), this;
		}, _cleanBuffer(e) {
			if (n._scratchBuffer) {
e.bufferSource.addEventListener('ended', null), e.bufferSource.disconnect(0); try {
	e.bufferSource.buffer = n._scratchBuffer;
} catch (e) {}
			} return e.bufferSource = null, this;
		}}; var o = function (e) {
			this._parent = e, this.init();
		}; o.prototype = {init() {
			const e = this._parent; return this._muted = e._muted, this._loop = e._loop, this._volume = e._volume, this._rate = e._rate, this._seek = 0, this._paused = !0, this._ended = !0, this._sprite = '__default', this._id = ++n._counter, e._sounds.push(this), this.create(), this;
		}, create() {
			const e = this,
				t = e._parent,
				o = n._muted || e._muted || e._parent._muted ? 0 : e._volume; return t._webAudio ? (e._node = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), e._node.gain.setValueAtTime(o, n.ctx.currentTime), e._node.paused = !0, e._node.connect(n.masterGain)) : (e._node = new Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener('error', e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(n._canPlayEvent, e._loadFn, !1), e._node.src = t._src, e._node.preload = 'auto', e._node.volume = o * n.volume(), e._node.load()), e;
		}, reset() {
			const e = this._parent; return this._muted = e._muted, this._loop = e._loop, this._volume = e._volume, this._rate = e._rate, this._seek = 0, this._rateSeek = 0, this._paused = !0, this._ended = !0, this._sprite = '__default', this._id = ++n._counter, this;
		}, _errorListener() {
this._parent._emit('loaderror', this._id, this._node.error ? this._node.error.code : 0), this._node.removeEventListener('error', this._errorFn, !1);
		}, _loadListener() {
			const e = this._parent; e._duration = Math.ceil(10 * this._node.duration) / 10, Object.keys(e._sprite).length === 0 && (e._sprite = {__default: [0, 1e3 * e._duration]}), e._state !== 'loaded' && (e._state = 'loaded', e._emit('load'), e._loadQueue()), this._node.removeEventListener(n._canPlayEvent, this._loadFn, !1);
		}}; var r = {},
			i = function (e) {
				const n = e._src; if (r[n]) {
					return e._duration = r[n].duration, void d(e);
				} if (/^data:[^;]+;base64,/.test(n)) {
					const t = atob(n.split(',')[1]),
						o = new Uint8Array(t.length); for (let e = 0; e < t.length; ++e) {
						o[e] = t.charCodeAt(e);
					}s(o.buffer, e);
				} else {
					const t = new XMLHttpRequest(); t.open('GET', n, !0), t.withCredentials = e._xhrWithCredentials, t.responseType = 'arraybuffer', t.addEventListener('load', () => {
						const n = String(t.status)[0]; n === '0' || n === '2' || n === '3' ? s(t.response, e) : e._emit('loaderror', null, 'Failed loading audio file with status: ' + t.status + '.');
					}), t.addEventListener('error', () => {
						e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete r[n], e.load());
					}), a(t);
				}
			},
			a = function (e) {
				try {
e.send();
				} catch (n) {
e.onerror();
				}
			},
			s = function (e, t) {
n.ctx.decodeAudioData(e, e => {
	e && t._sounds.length > 0 && (r[t._src] = e, d(t, e));
}, () => {
t._emit('loaderror', null, 'Decoding audio data failed.');
});
			},
			d = function (e, n) {
				n && !e._duration && (e._duration = n.duration), Object.keys(e._sprite).length === 0 && (e._sprite = {__default: [0, 1e3 * e._duration]}), e._state !== 'loaded' && (e._state = 'loaded', e._emit('load'), e._loadQueue());
			},
			u = function () {
				try {
					typeof AudioContext !== 'undefined' ? n.ctx = new AudioContext() : typeof webkitAudioContext !== 'undefined' ? n.ctx = new webkitAudioContext() : n.usingWebAudio = !1;
				} catch (e) {
					n.usingWebAudio = !1;
				} const e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
					t = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
					o = t ? parseInt(t[1], 10) : null; if (e && o && o < 9) {
					const e = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase()); (n._navigator && n._navigator.standalone && !e || n._navigator && !n._navigator.standalone && !e) && (n.usingWebAudio = !1);
				}n.usingWebAudio && (n.masterGain = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.setValueAtTime(n._muted ? 0 : 1, n.ctx.currentTime), n.masterGain.connect(n.ctx.destination)), n._setup();
			}; typeof define === 'function' && define.amd && define([], () => ({Howler: n, Howl: t})), typeof window !== 'undefined' ? (window.HowlerGlobal = e, window.Howler = n, window.Howl = t, window.Sound = o) : typeof global !== 'undefined' && (global.HowlerGlobal = e, global.Howler = n, global.Howl = t, global.Sound = o);
	})(), (function () {
		'use strict'; let e; HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function (e) {
			const n = this; if (!n.ctx || !n.ctx.listener) {
				return n;
			} for (let t = n._howls.length - 1; t >= 0; t--) {
n._howls[t].stereo(e);
			} return n;
		}, HowlerGlobal.prototype.pos = function (e, n, t) {
			const o = this; return o.ctx && o.ctx.listener ? (n = typeof n !== 'number' ? o._pos[1] : n, t = typeof t !== 'number' ? o._pos[2] : t, typeof e !== 'number' ? o._pos : (o._pos = [e, n, t], o.ctx.listener.setPosition(o._pos[0], o._pos[1], o._pos[2]), o)) : o;
		}, HowlerGlobal.prototype.orientation = function (e, n, t, o, r, i) {
			const a = this; if (!a.ctx || !a.ctx.listener) {
				return a;
			} const s = a._orientation; return n = typeof n !== 'number' ? s[1] : n, t = typeof t !== 'number' ? s[2] : t, o = typeof o !== 'number' ? s[3] : o, r = typeof r !== 'number' ? s[4] : r, i = typeof i !== 'number' ? s[5] : i, typeof e !== 'number' ? s : (a._orientation = [e, n, t, o, r, i], a.ctx.listener.setOrientation(e, n, t, o, r, i), a);
		}, Howl.prototype.init = (e = Howl.prototype.init, function (n) {
			return this._orientation = n.orientation || [1, 0, 0], this._stereo = n.stereo || null, this._pos = n.pos || null, this._pannerAttr = {coneInnerAngle: void 0 !== n.coneInnerAngle ? n.coneInnerAngle : 360, coneOuterAngle: void 0 !== n.coneOuterAngle ? n.coneOuterAngle : 360, coneOuterGain: void 0 !== n.coneOuterGain ? n.coneOuterGain : 0, distanceModel: void 0 !== n.distanceModel ? n.distanceModel : 'inverse', maxDistance: void 0 !== n.maxDistance ? n.maxDistance : 1e4, panningModel: void 0 !== n.panningModel ? n.panningModel : 'HRTF', refDistance: void 0 !== n.refDistance ? n.refDistance : 1, rolloffFactor: void 0 !== n.rolloffFactor ? n.rolloffFactor : 1}, this._onstereo = n.onstereo ? [{fn: n.onstereo}] : [], this._onpos = n.onpos ? [{fn: n.onpos}] : [], this._onorientation = n.onorientation ? [{fn: n.onorientation}] : [], e.call(this, n);
		}), Howl.prototype.stereo = function (e, t) {
			const o = this; if (!o._webAudio) {
				return o;
			} if (o._state !== 'loaded') {
				return o._queue.push({event: 'stereo', action() {
o.stereo(e, t);
				}}), o;
			} const r = void 0 === Howler.ctx.createStereoPanner ? 'spatial' : 'stereo'; if (void 0 === t) {
				if (typeof e !== 'number') {
					return o._stereo;
				} o._stereo = e, o._pos = [e, 0, 0];
			} const i = o._getSoundIds(t); for (let t = 0; t < i.length; t++) {
				const a = o._soundById(i[t]); if (a) {
					if (typeof e !== 'number') {
						return a._stereo;
					} a._stereo = e, a._pos = [e, 0, 0], a._node && (a._pannerAttr.panningModel = 'equalpower', a._panner && a._panner.pan || n(a, r), r === 'spatial' ? a._panner.setPosition(e, 0, 0) : a._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)), o._emit('stereo', a._id);
				}
			} return o;
		}, Howl.prototype.pos = function (e, t, o, r) {
			const i = this; if (!i._webAudio) {
				return i;
			} if (i._state !== 'loaded') {
				return i._queue.push({event: 'pos', action() {
i.pos(e, t, o, r);
				}}), i;
			} if (t = typeof t !== 'number' ? 0 : t, o = typeof o !== 'number' ? -0.5 : o, void 0 === r) {
				if (typeof e !== 'number') {
					return i._pos;
				} i._pos = [e, t, o];
			} const a = i._getSoundIds(r); for (let r = 0; r < a.length; r++) {
				const s = i._soundById(a[r]); if (s) {
					if (typeof e !== 'number') {
						return s._pos;
					} s._pos = [e, t, o], s._node && (s._panner && !s._panner.pan || n(s, 'spatial'), s._panner.setPosition(e, t, o)), i._emit('pos', s._id);
				}
			} return i;
		}, Howl.prototype.orientation = function (e, t, o, r) {
			const i = this; if (!i._webAudio) {
				return i;
			} if (i._state !== 'loaded') {
				return i._queue.push({event: 'orientation', action() {
i.orientation(e, t, o, r);
				}}), i;
			} if (t = typeof t !== 'number' ? i._orientation[1] : t, o = typeof o !== 'number' ? i._orientation[2] : o, void 0 === r) {
				if (typeof e !== 'number') {
					return i._orientation;
				} i._orientation = [e, t, o];
			} const a = i._getSoundIds(r); for (let r = 0; r < a.length; r++) {
				const s = i._soundById(a[r]); if (s) {
					if (typeof e !== 'number') {
						return s._orientation;
					} s._orientation = [e, t, o], s._node && (s._panner || (s._pos || (s._pos = i._pos || [0, 0, -0.5]), n(s, 'spatial')), s._panner.setOrientation(e, t, o)), i._emit('orientation', s._id);
				}
			} return i;
		}, Howl.prototype.pannerAttr = function () {
			const e = this,
				t = arguments; let o, r, i; if (!e._webAudio) {
				return e;
			} if (t.length === 0) {
				return e._pannerAttr;
			} if (t.length === 1) {
				if (typeof t[0] !== 'object') {
					return (i = e._soundById(parseInt(t[0], 10))) ? i._pannerAttr : e._pannerAttr;
				} o = t[0], void 0 === r && (o.pannerAttr || (o.pannerAttr = {coneInnerAngle: o.coneInnerAngle, coneOuterAngle: o.coneOuterAngle, coneOuterGain: o.coneOuterGain, distanceModel: o.distanceModel, maxDistance: o.maxDistance, refDistance: o.refDistance, rolloffFactor: o.rolloffFactor, panningModel: o.panningModel}), e._pannerAttr = {coneInnerAngle: void 0 !== o.pannerAttr.coneInnerAngle ? o.pannerAttr.coneInnerAngle : e._coneInnerAngle, coneOuterAngle: void 0 !== o.pannerAttr.coneOuterAngle ? o.pannerAttr.coneOuterAngle : e._coneOuterAngle, coneOuterGain: void 0 !== o.pannerAttr.coneOuterGain ? o.pannerAttr.coneOuterGain : e._coneOuterGain, distanceModel: void 0 !== o.pannerAttr.distanceModel ? o.pannerAttr.distanceModel : e._distanceModel, maxDistance: void 0 !== o.pannerAttr.maxDistance ? o.pannerAttr.maxDistance : e._maxDistance, refDistance: void 0 !== o.pannerAttr.refDistance ? o.pannerAttr.refDistance : e._refDistance, rolloffFactor: void 0 !== o.pannerAttr.rolloffFactor ? o.pannerAttr.rolloffFactor : e._rolloffFactor, panningModel: void 0 !== o.pannerAttr.panningModel ? o.pannerAttr.panningModel : e._panningModel});
			} else {
				t.length === 2 && (o = t[0], r = parseInt(t[1], 10));
			} const a = e._getSoundIds(r); for (let t = 0; t < a.length; t++) {
				if (i = e._soundById(a[t])) {
					let t = i._pannerAttr; t = {coneInnerAngle: void 0 !== o.coneInnerAngle ? o.coneInnerAngle : t.coneInnerAngle, coneOuterAngle: void 0 !== o.coneOuterAngle ? o.coneOuterAngle : t.coneOuterAngle, coneOuterGain: void 0 !== o.coneOuterGain ? o.coneOuterGain : t.coneOuterGain, distanceModel: void 0 !== o.distanceModel ? o.distanceModel : t.distanceModel, maxDistance: void 0 !== o.maxDistance ? o.maxDistance : t.maxDistance, refDistance: void 0 !== o.refDistance ? o.refDistance : t.refDistance, rolloffFactor: void 0 !== o.rolloffFactor ? o.rolloffFactor : t.rolloffFactor, panningModel: void 0 !== o.panningModel ? o.panningModel : t.panningModel}; const r = i._panner; r ? (r.coneInnerAngle = t.coneInnerAngle, r.coneOuterAngle = t.coneOuterAngle, r.coneOuterGain = t.coneOuterGain, r.distanceModel = t.distanceModel, r.maxDistance = t.maxDistance, r.refDistance = t.refDistance, r.rolloffFactor = t.rolloffFactor, r.panningModel = t.panningModel) : (i._pos || (i._pos = e._pos || [0, 0, -0.5]), n(i, 'spatial'));
				}
			} return e;
		}, Sound.prototype.init = (function (e) {
			return function () {
				const n = this,
					t = n._parent; n._orientation = t._orientation, n._stereo = t._stereo, n._pos = t._pos, n._pannerAttr = t._pannerAttr, e.call(this), n._stereo ? t.stereo(n._stereo) : n._pos && t.pos(n._pos[0], n._pos[1], n._pos[2], n._id);
			};
		})(Sound.prototype.init), Sound.prototype.reset = (function (e) {
			return function () {
				const n = this._parent; return this._orientation = n._orientation, this._pos = n._pos, this._pannerAttr = n._pannerAttr, e.call(this);
			};
		})(Sound.prototype.reset); var n = function (e, n) {
			(n = n || 'spatial') === 'spatial' ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]), e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, !0).play(e._id, !0);
		};
	})(), typeof exports !== 'undefined' && (exports.Howler = Howler, exports.Howl = Howl);
}, {}], 15: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.SoundSource = void 0; let t = require('./howler'),
		s = require('./soundObject.js'); class e {
		constructor(t, e = 0, i = 0, h = 0, o = !0) {
			this.x = e, this.y = i, this.z = h, this.loop = o, this.sound = s.so.create(t), this.sound.loop = o, this.sound.pos(this.x, this.y, this.z), this.rate = 1, this.speed = 0, this.minRate = 0.8, this.maxRate = 1.2, this.toDestroy = !1, this.rateShiftSpeed = 0.015, this.sound.currentPosition = 0;
		}

		play() {
this.sound.play();
		}

		pos(t, s, e) {
			this.x = t, this.y = s, this.z = e, this.sound.pos(this.x, this.y, this.z);
		}

		update() {}

		setDoppler(t, s, e) {
			if (s >= 0) {
				if (e == -1) {
					var i = 44100 * (1 - (s += this.speed) / 240); this.rate = i / 44100;
				} else {
					i = 44100 / (1 - (s += this.speed) / 240); this.rate = i / 44100;
				}
			} else {
				this.rate = 1;
			} this.rate > this.sound.playbackRate + this.rateShiftSpeed ? this.sound.playbackRate += this.rateShiftSpeed : this.rate < this.sound.playbackRate - this.rateShiftSpeed && (this.sound.playbackRate -= this.rateShiftSpeed);
		}

		setSpeed(t) {
			this.speed = t;
		}

		destroy() {
this.sound.unload(), this.toDestroy = !0;
		}
	}exports.SoundSource = e;
}, {'./howler': 19, './soundObject.js': 11}], 8: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.SoundHandler = void 0; let t = require('./soundSource.js'),
		s = require('./soundObject.js'); class i {
		constructor(t = !1) {
			this.staticSounds = [], this.dynamicSounds = [], this.currentDynamicSound = 0, this.maxDynamicSounds = 512, this.currentStaticSound = 0, this.maxStaticSounds = 512, this.reuseSounds = !0, this.x = 0, this.y = 0, this.z = 0, this.directional = t;
		}

		playStatic(t, s = 1, i = -1) {
			return (i = -1) && (i = this.findFreeStaticSlot()), this.staticSounds[i] = new n(t, this.directional), s == 1 && (this.staticSounds[i].sound.loop = !0), this.staticSounds[i].sound.play(), console.log('slot ' + i), i;
		}

		findFreeStaticSlot() {
			for (let t = 0; t < this.maxStaticSounds; t++) {
				if (this.staticSounds[t] == -1 || void 0 === this.staticSounds[t]) {
					return t;
				}
			} return this.currentStaticSound < this.maxStaticSounds ? (this.currentStaticSound++, this.currentStaticSound) : (this.currentStaticSound = 0, this.currentStaticSound);
		}

		findFreeDynamicSlot() {
			for (let t = 0; t < this.maxDynamicSounds; t++) {
				if (this.dynamicSounds[t] == -1 || void 0 === this.dynamicSounds[t]) {
					return t;
				}
			} return this.currentDynamicSound < this.maxDynamicSounds ? (this.currentDynamicSound++, this.currentDynamicSound) : (this.currentDynamicSound = 0, this.currentDynamicSound);
		}

		findDynamicSound(t) {
			for (let s = 0; s < this.dynamicSounds.length; s++) {
				if (this.dynamicSounds[s].file == t) {
					return s;
				}
			} return -1;
		}

		play(t) {
			let s = 0,
				i = 0; this.reuseSounds && (s = this.findDynamicSound(t), i = !0), s != -1 && this.reuseSounds != 0 || (s = this.findFreeDynamicSlot(), i = !1), void 0 === this.dynamicSounds[s] ? i == 0 && (this.dynamicSounds[s] = new n(t, this.directional), console.log('Created sound')) : i == 0 && (this.dynamicSounds[s].sound.destroy(), this.dynamicSounds[s] = new n(t, directional), console.log('Destroyed and reloaded')), console.log('playing sound'), this.dynamicSounds[s].sound.play();
		}

		update(t) {
			if (this.directional == 1) {
				for (let s = 0; s < this.dynamicSounds.length; s++) {
this.dynamicSounds[s].sound.pos(t.x, t.y, t.z);
				}
			}
		}

		destroy() {
			for (var t = 0; t < this.dynamicSounds.length; t++) {
console.log('destroying' + t), this.dynamicSounds[t].destroy(), this.dynamicSounds.splice(t, 1);
			} for (t = 0; t < this.staticSounds.length; t++) {
this.staticSounds[t].destroy(), console.log('destroying' + t), this.staticSounds.splice(t, 1);
			}
		}
	} class n {
		constructor(i, n = !1) {
			this.file = i, this.threeD = n, this.threeD == 1 ? this.sound = new t.SoundSource(i, 0, 0, 0) : this.sound = s.so.create(i);
		}

		destroy() {
this.sound.destroy();
		}
	}exports.SoundHandler = i;
}, {'./soundSource.js': 15, './soundObject.js': 11}], 10: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}); class t {
		distance3D(t, e, r, a, n, s) {
			return Math.sqrt((a - t) * (a - t) + (n - e) * (n - e) + (s - r) * (s - r));
		}

		distance(t, e, r, a) {
			return Math.sqrt((t - r) * (t - r) + (e - a) * (e - a));
		}

		calculateAngle(t, e, r, a) {
			let n = Math.atan2(a - e, r - t); return n = n >= 0 ? 0 : 2 * Math.PI + n;
		}

		isCollide3D(t, e) {
			return t.x <= e.x + e.width && t.x + t.width >= e.x && t.y <= e.y + e.height && t.y + t.height >= e.y && t.z <= e.z + e.depth && t.z + t.depth >= e.z;
		}

		randomInt(t, e) {
			return Math.floor(Math.random() * (e - t + 1)) + t;
		}

		getRandomArbitrary(t, e) {
			return Math.random() * (e - t) + t;
		}

		sleep(t) {
			return new Promise(resolve => setTimeout(e, t));
		}

		percent(t, e) {
			return 100 * t / e;
		}
	} var e = exports.utils = new t();
}, {}], 21: [function (require, module, exports) {
	function n(n, e) {
		let t,
			o = 0,
			i = !1,
			r = 0,
			u = 0,
			a = e || 1 / 120; function c(e) {
			if (o !== null) {
				for (r += (e - o) / 1e3; r > a;) {
n.update(a, u), u += 1, r -= a;
				}
			}o = e, n.render(), i && (t = requestAnimationFrame(c));
		} function l() {
			o = null, i = !0, t = requestAnimationFrame(c);
		} function f() {
			i = !1, cancelAnimationFrame(t), console.log(t);
		} return {start: l, stop: f, change(n) {
			r = a = n || 1 / 120, u = 0, f(), l();
		}};
	}module.exports = n;
}, {}], 18: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.Game = void 0; let e = require('fs'),
		s = k(e),
		t = require('os'),
		i = k(t),
		r = require('./tts'),
		o = require('./main'),
		a = require('jquery'),
		l = k(a),
		u = require('./oldtimer'),
		n = require('./soundHandler'),
		c = require('./utilities'),
		h = require('./soundObject'),
		p = require('./stateMachine'),
		d = require('./timer'),
		y = k(d),
		m = require('./scrollingText'),
		v = require('./input.js'),
		f = require('./keycodes.js'); function k(e) {
		return e && e.__esModule ? e : {default: e};
	} class g {
		constructor() {
			this.canPause = !0, this.actionCompleted = !1, this.toDestroy = new Array(), this.scoreTimer = new u.OldTimer(); let e = this; (0, l.default)(document).on('blur', () => {
e.pause();
			}), this.pauseTime = 0, this.timer = null, this.music = null, this.score = 0, this.pool = new n.SoundHandler(), this.bpms = null, this.level = 0, this.fileData = null, this.input = new v.KeyboardInput(), this.input.init(), this.levels = null; e = this; this.setup();
		}

		setup() {
			if (s.default.existsSync(o.packdir + 'bpm.txt')) {
				this.fileData = s.default.readFileSync(o.packdir + 'bpm.txt', 'utf8');
			} else {
				new m.ScrollingText('There was an error loading the pack ' + this.pack + '.', '\n', () => {
p.st.setState(2);
				});
			} this.bpms = this.fileData.split(','), this.levels = this.bpms.length - 1, this.bpms[this.levels] == '' && this.levels--, this.level++, h.so.directory = '', s.default.existsSync(o.packdir + 'nlevel.ogg') && h.so.enqueue(o.packdir + 'nlevel'), s.default.existsSync(o.packdir + 'fail.ogg') && h.so.enqueue(o.packdir + 'fail'); for (let e = 1; e <= 10; e++) {
s.default.existsSync(o.packdir + 'a' + e + '.ogg') && (h.so.enqueue(o.packdir + 'a' + e), this.actions = e), s.default.existsSync(o.packdir + 'o' + e + '.ogg') && h.so.enqueue(o.packdir + 'o' + e);
			} this.keys = o.actionKeys; const e = this; this.timer = (0, y.default)({update(s) {
e.update(s);
			}, render() {
e.render();
			}}, this.bpms[this.level] / 1e3), h.so.setQueueCallback(() => {
				h.so.directory = './sounds/', e.setupLevel();
			}), this.queueLevels(), h.so.loadQueue();
		}

		update(e) {
			if (this.currentAction != 0) {
				if (!this.actionCompleted && this.action > 1) {
this.fail();
				} else {
					if (this.currentAction++, this.currentAction >= this.numberOfActions) {
						return h.so.directory = '', h.so.destroy(o.packdir + this.level + 'music'), h.so.destroy(o.packdir + 'pre' + this.level), h.so.directory = './sounds/', this.level++, this.timer.stop(), void this.setupLevel();
					} this.action = c.utils.randomInt(1, this.actions), this.actionCompleted = !1, h.so.directory = '', this.pool.playStatic(o.packdir + 'a' + this.action, 0), h.so.directory = './sounds/', this.scoreTimer.reset();
				}
			} else {
				this.currentAction++;
			}
		}

		doScore() {
console.log('score ' + this.score);
		}

		async fail() {
this.doScore(), this.timer.stop(); const e = this.music; h.so.directory = ''; const s = this.pool.playStatic(o.packdir + 'fail', 0); h.so.directory = './sounds/'; for (let s = e.playbackRate; s > 0; s -= 0.05) {
	e.playbackRate = s, await c.utils.sleep(30);
} for (e.unload(); this.pool.staticSounds[s].sound.playing;) {
	await c.utils.sleep(10), this.input.isDown(f.KeyEvent.DOM_VK_RETURN) && this.pool.staticSounds[s].sound.unload();
} h.so.resetQueue(), h.so.resetQueuedInstance(), h.so.kill(() => {
p.st.setState(2);
});
		}

		async quit() {
this.doScore(), this.timer.stop(); const e = this.music; for (let s = e.playbackRate; s > 0; s -= 0.045) {
	e.playbackRate = s, await c.utils.sleep(30);
}e.unload(), h.so.resetQueue(), h.so.resetQueuedInstance(), p.st.setState(2);
		}

		render() {
this.input.isJustPressed(f.KeyEvent.DOM_VK_Q) ? this.quit() : this.input.isJustPressed(f.KeyEvent.DOM_VK_P) ? this.pause() : this.handleKeys();
		}

		handleKeys() {
			if (this.actionCompleted) {
				return;
			} const e = this.input.keysPressed(); if (e.length > 0 && this.action == 1) {
this.fail();
			} else {
				if (!(e.length > 1)) {
					return e.length == 1 && e[0] == this.keys[this.action] ? (h.so.directory = '', this.pool.playStatic(o.packdir + 'o' + this.action, 0), h.so.directory = './sounds/', this.actionCompleted = !0, void this.calculateScore()) : void (e.length == 1 && e[0] != this.keys[this.action] && this.fail());
				} this.fail();
			}
		}

		async setupLevel() {
			if (this.canPause = !0, this.playing = !1, s.default.existsSync(o.packdir + 'pre' + this.level + '.ogg') && (h.so.directory = '', this.preSound = h.so.create(o.packdir + 'pre' + this.level), h.so.directory = './sounds/', this.preSound.play(), this.playing = !0), s.default.existsSync(o.packdir + 'nlevel.ogg') && !this.playing && this.level > 1 && (h.so.directory = '', this.preSound = h.so.create(o.packdir + 'nlevel'), h.so.directory = './sounds/', this.preSound.play(), this.playing = !0), this.playing) {
				for (this.queueLevels(); this.preSound.playing;) {
					await c.utils.sleep(5), this.input.isJustPressed(f.KeyEvent.DOM_VK_RETURN) && this.preSound.stop();
				}
			} h.so.directory = ''; this.music = h.so.create(o.packdir + this.level + 'music'), this.music.loop = !0, h.so.directory = './sounds/', this.music.play(), this.timer.change(this.bpms[this.level] / 1e3), !this.playing && this.level > 1 && this.queueLevels(), this.action = 0, this.actionCompleted = !1, this.currentAction = 0, !this.playing && this.level > 1 && this.currentAction++, this.numberOfActions = c.utils.randomInt(6 + this.level, 2 * this.level + 6);
		}

		unload() {}

		async pause() {
			if (!this.canPause) {
				return;
			} this.canPause = !1; const e = this.music; this.timer.stop(), this.scoreTimer.pause(), this.pauseTime = e.currentTime; for (let s = e.playbackRate; s > 0; s -= 0.05) {
				e.playbackRate = s, await c.utils.sleep(30);
			} for (e.pause(); !this.input.isDown(f.KeyEvent.DOM_VK_P);) {
				await c.utils.sleep(10);
			} this.unpause();
		}

		async unpause() {
			const e = this.music; e.play(); for (let s = e.playbackRate; s <= 1; s += 0.05) {
				e.playbackRate = s, await c.utils.sleep(8);
			}e.seek(this.pauseTime), this.timer.start(), this.scoreTimer.resume(), this.input.keysPressed();
		}

		calculateScore() {
			const e = this.bpms[this.level],
				s = this.scoreTimer.elapsed,
				t = Math.ceil((e / 2 - Math.abs(e / 2 - s)) / (e / 2) * 100),
				i = Math.ceil(2200 * t / e); r.speech.speak(i), this.score += i;
		}

		queueLevels() {
			let e = this.level + 1; this.levels < e && (e = this.levels), h.so.directory = ''; for (let t = this.level; t <= e; t++) {
h.so.enqueue(o.packdir + t + 'music'), s.default.existsSync(o.packdir + 'pre' + t + '.ogg') && h.so.enqueue(o.packdir + 'pre' + t);
			} this.level > 1 && (h.so.setQueueCallback(0), h.so.loadQueue(), h.so.directory = './sounds/');
		}
	}exports.Game = g;
}, {'./tts': 9, './main': 1, './oldtimer': 20, './soundHandler': 8, './utilities': 10, './soundObject': 11, './stateMachine': 13, './timer': 21, './scrollingText': 6, './input.js': 3, './keycodes.js': 12}], 13: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.st = void 0; let e = require('./input'),
		t = require('./tts'),
		r = require('./main'),
		s = require('./menuHandler'),
		n = require('jquery'),
		u = c(n),
		o = require('./soundObject'),
		a = require('./keycodes'),
		i = require('./game'); function c(e) {
		return e && e.__esModule ? e : {default: e};
	} let d = new e.KeyboardInput(); class l {
		constructor() {
			this.state = 0, this.currentState = 0;
		}

		setState(t) {
			if (t == 1) {
(d = new e.KeyboardInput()).init(); const r = o.so.create('logo'),
	s = this; r.volume = 0.5, r.play(), r.sound.once('end', () => {
r.unload(), (0, u.default)(document).off('keydown'), s.setState(2);
	}), (0, u.default)(document).keydown(e => {
		e.which != a.KeyEvent.DOM_VK_SPACE && e.which != a.KeyEvent.DOM_VK_ESCAPE || (r.unload(), (0, u.default)(document).off('keydown'), s.setState(2));
	}), this.state = t;
			} else {
				t == 2 ? (d = null, (0, r.checkPack)(), this.state = t) : t == 3 ? (this.currentState = new i.Game(), this.state = t) : t == 4 ? (0, r.learnPack)() : t == 5 && ((0, r.browsePacks)(), this.state = t);
			}
		}
	} const h = new l(); exports.st = h;
}, {'./input': 3, './tts': 9, './main': 1, './menuHandler': 5, './soundObject': 11, './keycodes': 12, './game': 18}], 7: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}); class e {
		constructor() {
			this.strings = {}, this.strings[1] = {mReady: 'Please wait...', mSelectDownload: 'Please select what you want to do', mDownloadAll: 'Download all uninstalled packs (size: %1 gb)', mDownloadList: 'List all new available packs', mDownloadInstructions: 'Press the space bar to select a pack, p to preview its sound, and enter to begin downloading.', mStart: 'Start Game', mLearn: 'Learn the pack', mActions: 'This pack has %1 actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma).', dling: 'Downloading %2 packs please wait...', dlingdone: 'Done!', keymapChoose: 'Press the key to replace this action: You can\'t use q, p, escape, enter or space.', packError: 'No packs were found on your computer. I will now proceed to download the default pack, please wait...', intro: 'Welcome to beatstar!\nThis is a world of music, fun and games.\nPlease read the online instructions to learn how to play.\n', keymapStart: 'We will now remap your keyboard. You will hear the sounds for the different actions, and you will be prompted to press the key you want to associate to the new actions.', tamperWarning: 'This pack has been tampered with and is no longer unlocked. Press enter to continue.', mNew: 'Get new packs', nopacks: 'No packs are available here.', mBrowse: 'Browse downloaded packs', mHashes: 'Rebuild packs folder', mDownload: 'Download new packs'};
		}

		get(e, o, a = []) {
			let t; if (void 0 !== this.strings[e][o]) {
				t = this.strings[e][o];
			} else {
				if (void 0 === this.strings[1][o]) {
					return '-1';
				} t = this.strings[1][o];
			} return a.forEach((e, o) => {
				const a = Number(o) + 1; t = t.replace('%' + a, e), console.log('%' + a);
			}), t;
		}
	} const o = exports.strings = new e();
}, {}], 16: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.MenuTypes = exports.MenuItem = void 0; const t = require('./tts'); if (void 0 === e) {
		var e = new t.TTS();
	} const s = {NORMAL: 0, SELECTOR: 1, SLIDER: 2, EDIT: 3}; class i {
		constructor(t, e) {
			this.name = e, this.id = t, this.type = s.NORMAL;
		}

		speak() {
e.speak(this.name);
		}

		select() {
			return this.id;
		}
	} class r extends i {
		constructor(t, e, i, r = 0, n) {
super(), this.id = t, this.name = e, this.options = i, this.type = s.SELECTOR, this.currentOption = r, this.selectCallback = n;
		}

		speak() {
e.speak(this.name + '. Selector. Set to ' + this.options[this.currentOption]);
		}

		increase() {
			this.currentOption < this.options.length - 1 && this.currentOption++, e.speak(this.options[this.currentOption]), void 0 !== this.selectCallback && this.selectCallback(this.options[this.currentOption]);
		}

		decrease() {
			this.currentOption > 0 && this.currentOption--, e.speak(this.options[this.currentOption]), void 0 !== this.selectCallback && this.selectCallback(this.options[this.currentOption]);
		}

		select() {
			return this.id;
		}
	} class n extends i {
		constructor(t, e, i, r, n = 0) {
super(), this.id = t, this.name = e, this.minValue = i, this.maxValue = r, this.currentValue = n, this.type = s.SLIDER;
		}

		speak() {
e.speak(this.name + '. Slider. Set to ' + this.currentValue);
		}

		increase() {
			this.currentValue < this.maxValue && this.currentValue++, e.speak(this.currentValue);
		}

		decrease() {
			this.currentValue > this.minValue && this.currentValue--, e.speak(this.currentValue);
		}

		select() {
			return this.id;
		}
	} class h extends i {
		constructor(t, e, i = '') {
super(), this.id = t, this.name = e, this.text = i, this.type = s.EDIT;
		}

		speak() {
e.speak(this.name + '. Editable. ' + (this.text == '' ? 'Nothing entered.' : 'Set to ' + this.text));
		}

		addChar(t) {
			this.text += t, e.speak(t);
		}

		removeChar() {
			this.text = this.text.substring(0, this.text.length - 1), e.speak(this.text);
		}

		select() {
			return this.text;
		}
	}exports.MenuItem = i, exports.MenuTypes = s;
}, {'./tts': 9}], 17: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.Menu = void 0; let e = require('./utilities'),
		s = require('./strings'),
		t = require('./tts'),
		i = require('jquery'),
		u = o(i),
		a = require('./soundObject.js'),
		n = require('./menuItem'),
		r = require('./keycodes'),
		h = require('./input'); function o(e) {
		return e && e.__esModule ? e : {default: e};
	} class c {
		constructor(e, s, t) {
			this.menuData = s, this.cursor = 0, this.name = e, this.sndKeyChar = a.so.create('ui/keyChar'), this.sndKeyDelete = a.so.create('ui/keyDelete'), this.sndSliderLeft = a.so.create('ui/menuSliderLeft'), this.sndSliderRight = a.so.create('ui/menuSliderRight'), this.sndBoundary = a.so.create('ui/menuBoundary'), this.sndChoose = a.so.create('ui/menuChoose'), this.sndMove = a.so.create('ui/menuMove'), this.sndOpen = a.so.create('ui/menuOpen'), this.sndSelector = a.so.create('ui/menuSelector'), this.sndWrap = a.so.create('ui/menuWrap'), this.selectCallback = null, void 0 !== t && (this.music = t); document.getElementById('touchArea');
		}

		nextItem() {
			this.cursor < this.menuData.length - 1 && this.cursor++, this.sndMove.play(), this.menuData[this.cursor].speak();
		}

		previousItem() {
			this.cursor > 0 && this.cursor--, this.sndMove.play(), this.menuData[this.cursor].speak();
		}

		increase() {
			this.menuData[this.cursor].type != n.MenuTypes.SLIDER && this.menuData[this.cursor].type != n.MenuTypes.SELECTOR || (this.menuData[this.cursor].increase(), this.menuData[this.cursor].type == n.MenuTypes.SLIDER ? this.sndSliderRight.play() : this.sndSelector.play());
		}

		decrease() {
			this.menuData[this.cursor].type != n.MenuTypes.SLIDER && this.menuData[this.cursor].type != n.MenuTypes.SELECTOR || (this.menuData[this.cursor].decrease(), this.menuData[this.cursor].type == n.MenuTypes.SLIDER ? this.sndSliderLeft.play() : this.sndSelector.play());
		}

		insertCharacter(e) {
			this.menuData[this.cursor].type == n.MenuTypes.EDIT && (this.menuData[this.cursor].addChar(String.fromCharCode(e)), this.sndKeyChar.play());
		}

		removeCharacter() {
			this.menuData[this.cursor].type == n.MenuTypes.EDIT && (this.menuData[this.cursor].removeChar(), this.sndKeyDelete.play());
		}

		handleInput(e) {
this.insertCharacter(e.which);
		}

		destroySounds() {
this.sndKeyChar.unload(), this.sndKeyDelete.unload(), this.sndSliderLeft.unload(), this.sndSliderRight.unload(), this.sndBoundary.unload(), this.sndChoose.unload(), this.sndMove.unload(), this.sndOpen.unload(), this.sndSelector.unload(), this.sndWrap.unload(), void 0 !== this.music && this.music.unload();
		}

		async fade() {
			for (let s = this.music.volume; s > 0; s -= 0.06) {
				this.music.volume = s, await e.utils.sleep(50);
			} this.music.unload(), this.unload();
		}

		unload() {
(0, u.default)(document).off('keydown'), (0, u.default)(document).off('keypress'); const e = this; setTimeout(() => {
e.destroySounds();
}, 500);
		}

		handleKeys(e) {
			switch (e.which) {
				case r.KeyEvent.DOM_VK_RETURN: this.select(); break; case r.KeyEvent.DOM_VK_PAGE_UP: this.music.volume += 0.03; break; case r.KeyEvent.DOM_VK_PAGE_DOWN: this.music.volume -= 0.03; break; case r.KeyEvent.DOM_VK_BACK_SPACE: this.removeCharacter(); break; case r.KeyEvent.DOM_VK_DOWN: this.nextItem(); break; case r.KeyEvent.DOM_VK_UP: this.previousItem(); break; case r.KeyEvent.DOM_VK_RIGHT: this.increase(); break; case r.KeyEvent.DOM_VK_LEFT: this.decrease();
			}
		}

		run(e) {
			typeof this.music === 'object' ? (this.music.volume = 0.5, this.music.loop = !0, this.music.play()) : typeof this.music === 'string' && (this.music = a.so.create(this.music), this.music.volume = 0.5, this.music.loop = !0, this.music.play()), this.selectCallback = e; const s = this; (0, u.default)(document).on('keypress', e => {
s.handleInput(e);
			}), (0, u.default)(document).on('keydown', e => {
s.handleKeys(e);
			}), t.speech.speak(this.name), this.sndOpen.play();
		}

		handleSwipe(e) {
			e == 3 && this.decrease(), e == 4 && this.increase(), e == 0 && this.previousItem(), e == 1 && this.nextItem(), e == 2 && this.select();
		}

		select() {
			const e = this.menuData[this.cursor].id,
				s = []; for (let e = 0; e < this.menuData.length; e++) {
				let t = null; this.menuData[e].type == n.MenuTypes.SLIDER && (t = {id: this.menuData[e].id, value: this.menuData[e].currentValue, name: this.menuData[e].options[this.menuData[e].currentValue]}), this.menuData[e].type == n.MenuTypes.EDIT && (t = {id: this.menuData[e].id, value: this.menuData[e].text}), this.menuData[e].type == n.MenuTypes.SELECTOR && (t = {id: this.menuData[e].id, value: this.menuData[e].currentOption, name: this.menuData[e].options[this.menuData[e].currentOption]}), s.push(t);
			} const t = {selected: e, cursor: this.cursor, items: s}; this.sndChoose.play(), (0, u.default)(document).off('keydown'), (0, u.default)(document).off('keypress'), void 0 !== this.music && this.fade(); const i = this; setTimeout(() => {
i.selectCallback(t);
			}, 700);
		}
	}exports.Menu = c;
}, {'./utilities': 10, './strings': 7, './tts': 9, './soundObject.js': 11, './menuItem': 16, './keycodes': 12, './input': 3}], 5: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.mainMenu = u; let e = require('./soundObject'),
		s = require('./main'),
		t = require('./stateMachine'),
		n = require('./strings'),
		r = require('./menuItem'),
		a = require('./menu'); function u() {
		const u = new Array(); u.push(new r.MenuItem(0, n.strings.get(s.lang, 'mStart'))), u.push(new r.MenuItem(1, n.strings.get(s.lang, 'mLearn'))), u.push(new r.MenuItem(2, n.strings.get(s.lang, 'mBrowse'))), u.push(new r.MenuItem(3, n.strings.get(s.lang, 'mHashes'))), u.push(new r.MenuItem(4, n.strings.get(s.lang, 'mDownload'))), e.so.directory = './sounds/'; const i = new a.Menu('main menu', u); e.so.directory = '', i.music = s.packdir + 'loop', require('fs').existsSync(s.packdir + 'select.ogg') && (i.sndChoose.unload(), i.sndChoose = e.so.create(s.packdir + 'select')), i.run(n => {
			switch (e.so.directory = './sounds/', n.selected) {
				case 0: t.st.setState(3); break; case 1: t.st.setState(4); break; case 2: t.st.setState(5); break; case 3: (0, s.rebuildHashes)(); break; case 4: (0, s.downloadPacks)();
			}
		});
	}
}, {'./soundObject': 11, './main': 1, './stateMachine': 13, './strings': 7, './menuItem': 16, './menu': 17}], 14: [function (require, module, exports) {
	module.exports = function (e) {
		return require('child_process').execFileSync('curl', ['--silent', '-L', e], {});
	};
}, {}], 1: [function (require, module, exports) {
	'use strict'; Object.defineProperty(exports, '__esModule', {value: !0}), exports.packdir = exports.data = exports.pack = exports.langs = exports.lang = exports.mangle = exports.actionKeys = void 0, exports.learnPack = J, exports.browsePacks = M, exports.rebuildHashes = D, exports.checkPack = V, exports.downloadPacks = N, exports.save = A; let e = require('jquery'),
		t = S(e),
		s = require('cryptr'),
		a = S(s),
		r = require('./player'); require('hash-files'); let o = require('fs-walk'),
			n = S(o),
			i = require('fs'),
			l = S(i),
			c = require('os'),
			p = S(c),
			d = require('./menuHandler'),
			u = require('./scrollingText'),
			h = require('./strings'),
			y = require('./soundHandler'),
			f = require('./tts'),
			g = require('./utilities'),
			m = require('./soundObject'),
			k = require('./keycodes'),
			v = require('./stateMachine'),
			x = require('./input.js'); function S(e) {
			return e && e.__esModule ? e : {default: e};
		} let b = exports.actionKeys = [0, 0, k.KeyEvent.DOM_VK_SPACE, k.KeyEvent.DOM_VK_TAB, k.KeyEvent.DOM_VK_RETURN, k.KeyEvent.DOM_VK_BACK_SPACE, k.KeyEvent.DOM_VK_UP, k.KeyEvent.DOM_VK_DOWN, k.KeyEvent.DOM_VK_RIGHT, k.KeyEvent.DOM_VK_LEFT],
			w = exports.mangle = new a.default('sdf jkl wer uio'),
			K = exports.lang = 1,
			_ = exports.langs = ['', 'english', 'spanish'],
			E = exports.pack = 'default',
			P = exports.data = '',
			T = exports.packdir = p.default.homedir() + '/beatpacks/' + E + '/'; function O() {
v.st.setState(1);
		} function q() {
			const e = m.so.create('memtest'); e.volume = 0.3, e.play(), m.so.destroy('memtest');
		} async function J() {
			const e = new y.SoundHandler(); let t = 0; for (let e = 1; e <= 10; e++) {
l.default.existsSync(T + 'a' + e + '.ogg') && (t = e);
			}f.speech.speak(h.strings.get(K, 'mActions', [t])); const s = new x.KeyboardInput(); for (s.init(), m.so.directory = ''; !s.isJustPressed(k.KeyEvent.DOM_VK_Q);) {
				await g.utils.sleep(10), s.isJustPressed(b[2]) && e.playStatic(T + 'a2', 0), s.isJustPressed(b[3]) && e.playStatic(T + 'a3', 0), s.isJustPressed(b[4]) && e.playStatic(T + 'a4', 0), s.isJustPressed(b[5]) && e.playStatic(T + 'a5', 0), s.isJustPressed(b[6]) && e.playStatic(T + 'a6', 0), s.isJustPressed(b[7]) && e.playStatic(T + 'a7', 0), s.isJustPressed(b[8]) && e.playStatic(T + 'a8', 0), s.isJustPressed(b[9]) && e.playStatic(T + 'a9', 0), s.isJustPressed(k.KeyEvent.DOM_VK_PERIOD) && e.playStatic(T + 'a1', 0);
			} e.destroy(), m.so.directory = './sounds/', v.st.setState(2);
		} async function M(e = 1) {
			if (!l.default.existsSync(p.default.homedir() + '/beatpacks/hashes.db')) {
				return K == 1 && new u.ScrollingText('The packs folder hashes need to be rebuilt to continue. This can take a few seconds...', '\n', () => {
D();
				}), void (K == 2 && new u.ScrollingText('Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos segundos...', '\n', () => {
D();
				}));
			} try {
				var t = JSON.parse(w.decrypt(l.default.readFileSync(p.default.homedir() + '/beatpacks/hashes.db')));
			} catch (e) {
				return K == 1 && new u.ScrollingText('The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...', '\n', () => {
D();
				}), void (K == 2 && new u.ScrollingText('Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato así que ves a por un café o algo...', '\n', () => {
D();
				}));
			} let s = -1; const a = []; let r = -1; if (e > 0 && t.forEach((e, t) => {
l.default.existsSync(p.default.homedir() + '/beatpacks/' + e.name + '/bpm.txt') && a.push(e);
			}), m.so.directory = '', a.length === 0) {
				return void new u.ScrollingText(h.strings.get(K, 'nopacks'), '\n', v.st.setState(2));
			} a.sort((e, t) => {
				const s = e.name.toLowerCase(),
					a = t.name.toLowerCase(); return s < a ? -1 : s > a ? 1 : 0;
			}); const o = new x.KeyboardInput(); let i; o.init(), K == 1 && f.speech.speak('ready. Browsing ' + a.length + ' packs. Press arrows to move, q to exit, enter to choose a pack, or page up and page down to move by larger increments.'), K == 2 && f.speech.speak('listo. tienes ' + a.length + ' packs. Pulsa flechas para moverte, q para salir, enter para elegir uno, o pulsa retroceder página y avanzar página para moverte de 20 en 20.'); for (;!o.isJustPressed(k.KeyEvent.DOM_VK_Q) && e > 0;) {
				if (o.isJustPressed(k.KeyEvent.DOM_VK_RETURN) && (void 0 !== i && i.destroy(), s != -1 && clearTimeout(s), r != -1)) {
					var c = 0; if (n.default.filesSync(p.default.homedir() + '/beatpacks/' + a[r].name, (e, t, s) => {
						c += s.size;
					}), c != a[r].hash) {
						for (e = 0, f.speech.speak(h.strings.get(K, 'tamperWarning')), setTimeout(() => {
f.speech.speak(h.strings.get(K, 'tamperWarning'));
						}, 4500); !o.isJustPressed(k.KeyEvent.DOM_VK_RETURN);) {
							await g.utils.sleep(10);
						}
					} if (e > 0) {
						return exports.pack = E = a[r].name, P.pack = E, exports.packdir = T = p.default.homedir() + '/beatpacks/' + E + '/', m.so.directory = './sounds/', A(), void m.so.kill(() => {
v.st.setState(2);
						});
					}
				}o.isJustPressed(k.KeyEvent.DOM_VK_DOWN) && (void 0 !== i && i.destroy(), s != -1 && clearTimeout(s), ++r > a.length - 1 && (r = 0), f.speech.speak(r), K == 1 && f.speech.speak(a[r].name + '. ' + a[r].levels + ' levels.'), K == 2 && f.speech.speak(a[r].name + '. ' + a[r].levels + ' niveles.'), s = setTimeout(() => {
(i = m.so.create(a[r].preview)).play();
				}, 1e3)); var d = o.getChars(); if (d != '') {
					var y = !1; a.forEach((e, t) => {
e.name.toLowerCase().slice(0, 1) == d[0] && (y || (r = t), y = !0);
					}), void 0 !== i && i.destroy(), s != -1 && clearTimeout(s), K == 1 && f.speech.speak(a[r].name + '. ' + a[r].levels + ' levels.'), K == 2 && f.speech.speak(a[r].name + '. ' + a[r].levels + ' niveles.'), s = setTimeout(() => {
(i = m.so.create(a[r].preview)).play();
					}, 1e3);
				}o.isJustPressed(k.KeyEvent.DOM_VK_UP) && (void 0 !== i && i.destroy(), s != -1 && clearTimeout(s), --r < 0 && (r = a.length - 1), K == 1 && f.speech.speak(a[r].name + '. ' + a[r].levels + ' levels.'), K == 2 && f.speech.speak(a[r].name + '. ' + a[r].levels + ' niveles.'), s = setTimeout(() => {
(i = m.so.create(a[r].preview)).play();
				}, 1e3)), await g.utils.sleep(5);
			}s != -1 && clearTimeout(-1), m.so.directory = './sounds/', m.so.kill(() => {
v.st.setState(2);
			});
		} async function D(e = !1) {
			let t = '',
				s = 0; const a = new Array(); if (m.so.directory = '', n.default.dirsSync(p.default.homedir() + '/beatpacks', (e, r, o, i) => {
				if (!l.default.existsSync(e + '/' + r + '/bpm.txt')) {
					return void (t += '\n' + r);
				} let c = 0; const p = e + '/' + r + '/'; n.default.filesSync(p, (e, t, s) => {
					c += s.size;
				}), s = c; const d = l.default.readFileSync(p + 'bpm.txt', 'utf8').split(','); let u = d.length - 1; d[u] == '' && u--; const h = {name: r, preview: p + 'name', levels: u, hash: s}; a.push(h);
			}), m.so.directory = './sounds/', e) {
				return console.log('stopping here'), a;
			} let r = JSON.stringify(a); r = w.encrypt(r), l.default.writeFileSync(p.default.homedir() + '/beatpacks/hashes.db', r), t != '' ? (K == 1 && (e || new u.ScrollingText('one thing before you go... the following packs are corrupt and should be looked at.' + t, '\n', () => {
				e || v.st.setState(2);
			})), K == 2 && (e || new u.ScrollingText('Antes de que te vayas... los siguientes packs están corruptos y deberías echar un vistazo a ver qué pasa.' + t, '\n', () => {
					e || v.st.setState(2);
				}))) : e || v.st.setState(2);
		} function V() {
			try {
				exports.data = P = JSON.parse(l.default.readFileSync(p.default.homedir() + '/beatpacks/save.dat'));
			} catch (e) {
				exports.data = P = new r.Player();
			} if (exports.pack = E = P.pack, exports.packdir = T = p.default.homedir() + '/beatpacks/' + E + '/', exports.actionKeys = b = P.actionKeys, A(), l.default.existsSync(T + 'bpm.txt') || (exports.pack = E = 'default', exports.packdir = T = p.default.homedir() + '/beatpacks/' + E + '/'), l.default.existsSync(T + 'bpm.txt')) {
(0, d.mainMenu)();
			} else {
				new u.ScrollingText(h.strings.get(K, 'packError'), '\n', () => {
N(['default']);
				});
			}
		} async function N(e = []) {
			const t = require('./download'); if (e.length == 0) {
				new Array(); let e, t; t = await D(!0), await fetch('http://oriolgomez.com/beatpacks/hashes.db').then(e => e.text()).then(t => {
					e = JSON.parse(w.decrypt(t)), console.log(e.length);
				}); const s = []; let a = 0; e.forEach((e, r) => {
					let o = !1; for (let n = 0; n < t.length; n++) {
						e.name != t[n].name && e.hash != t[n].hash && (o = !0);
					}o && (s.push(e), console.log(e.name), a += e.hash);
				}); new Array(); a = (a = a / 1024 / 1024 / 1024).toFixed(2), console.log(a);
			} if (e.length > 0) {
				m.so.directory = './sounds/'; const o = m.so.create('progress'),
					n = {}; f.speech.speak(h.strings.get(K, 'dling', [a + 1, e.length])); for (let t = 0; t < e.length; t++) {
						var s = e[t]; n[s] = [], await fetch(' http://oriolgomez.com/beatpacks/index.php?p=' + e[t]).then(e => e.text()).then(e => {
f.speech.speak('data' + e), e.split('\n').forEach(e => {
	e != '' && n[s].push(e);
});
						});
					} let i = p.default.homedir() + '/beatpacks/',
						c = 'http://oriolgomez.com/beatpacks/'; for (var a in n) {
						if (n.hasOwnProperty(a)) {
							c = 'http://oriolgomez.com/beatpacks/', i = p.default.homedir() + '/beatpacks/', c = c + a + '/', l.default.existsSync(i + a) || l.default.mkdirSync(i + a), i = i + a + '/'; var r = n[a].length; if (r == 0) {
								continue;
							} n[a].forEach((e, s) => {
l.default.existsSync(i + e) && l.default.unlinkSync(i + e); const a = t(c + e); o.playbackRate = g.utils.percent(s + 1, r) / 100, o.play(); try {
l.default.writeFileSync(i + e, a);
} catch (e) {
console.log('error!' + e), v.st.setState(2);
}
							});
						}
					}f.speech.speak(h.strings.get(K, 'dlingdone')), m.so.directory = '', v.st.setState(2);
			}
		} function A() {
l.default.existsSync(p.default.homedir() + '/beatpacks') || l.default.mkdirSync(p.default.homedir() + '/beatpacks'); const e = JSON.stringify(P); l.default.writeFileSync(p.default.homedir() + '/beatpacks/save.dat', e);
		}document.addEventListener('DOMContentLoaded', O), m.so.debug = !0;
}, {'./player': 4, './menuHandler': 5, './scrollingText': 6, './strings': 7, './soundHandler': 8, './tts': 9, './utilities': 10, './soundObject': 11, './keycodes': 12, './stateMachine': 13, './input.js': 3, './download': 14}]}, {}, [1]);
