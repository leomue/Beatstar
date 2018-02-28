process.env.HMR_PORT=50669;process.env.HMR_HOSTNAME="";// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
if (typeof KeyEvent == "undefined") {
    var KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}
exports.KeyEvent = KeyEvent;
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var useWebTTS = true;

class TTS {
	constructor(webTTS = false) {
		this.synth = window.speechSynthesis;
		this.webTTS = webTTS;
	}

	speak(text) {

		if (this.webTTS) {
			var utterThis = new SpeechSynthesisUtterance(text);
			this.synth.stop();
			this.synth.speak(utterThis);
		} else {
			document.getElementById("speech").innerHTML = "";
			var para = document.createElement("p");
			para.appendChild(document.createTextNode(text));
			document.getElementById("speech").appendChild(para);
			return;
		}
	} // end speak()

	setWebTTS(tts) {
		this.webTTS = tts;
	}

} // end class
if (typeof speech == "undefined") var speech = new TTS();
exports.TTS = TTS;
exports.speech = speech;
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.so = undefined;

var _howler = require('howler');

var _tts = require('./tts');

var isElectron = true;
var playOnceTimer;
class SoundObjectItem {
	constructor(file, callback = 0, tag = 0) {
		var that = this;
		this.onMemory = 0;
		this.fileName = file;
		this.sound = new _howler.Howl({
			src: file,
			onload: function () {
				that.doneLoading();
			}
		});
		this.timeout = setTimeout(function () {
			that.checkProgress();
		}, 2000);
		this.loaded = false;
		this.callback = callback;
		this.timeToLoad = performance.now();
		this.tag = tag;
	}
	checkProgress() {
		if (this.sound.state() == "loaded") {
			this.doneLoading();
		} else {
			var that = this;
			this.timeout = setTimeout(function () {
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
		_tts.speech.speak("yay");
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

		this.extension = ".ogg";
		if (isElectron == true) {
			this.directory = "./sounds/";
		} else {
			this.directory = "../soundsopus/";
			this.extension = ".opus";
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
		for (var i = 0; i < this.sounds.length; i++) {
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
		var returnObject = null;
		var that = this;
		returnObject = new SoundObjectItem(file, function () {
			that.doneLoading();
		});
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

			var that = this;
			if (typeof this.statusCallback != "undefined" && this.statusCallback != null) {
				this.statusCallback(1 - this.queue.length / this.queueLength);
			}
			if (this.findSound(this.queue[0]) != -1) {
				this.queue.splice(0, 1);
				this.handleQueue();
				return;
			}
			this.sounds.push(new SoundObjectItem(this.queue[0], function () {
				that.handleQueue();
			}, 1));
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
		this.loadingSounds = 0;
		var stillLoading = new Array();
		for (var i = 0; i < this.sounds.length; i++) {
			if (typeof this.sounds[i] != "undefined") {
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
		var toDestroy = new Array();
		var that = this;
		this.oneShotSound.on("ended", function () {
			for (var i = 0; i < that.oneShots.length; i++) {
				if (that.oneShots[i].playing == false) {
					that.oneShots[i].unload();
					toDestroy.push(i);
				}
			}
			for (var i = 0; i < toDestroy.length; i++) {
				if (that.oneShotSounds[i].playing == false) {
					that.oneShotSounds.splice(toDestroy[i], 1);
					_tts.speech.speak("destroyed." + toDestroy[i]);
				}
			}
		});
	}
	destroy(file, callback = 0) {
		var noMore = false;
		var filename = this.directory + file + this.extension;
		while (!noMore) {
			var found = this.findSoundIndex(filename);
			console.log("found " + found);
			if (found == -1) {
				noMore = true;
			} else {
				this.sounds[found].sound.unload();
				console.log("state after destroy" + this.sounds[found].sound.state());
				this.sounds.splice(found, 1);
				console.log("destroyed " + this.sounds.length);
			}
		}
		if (callback != 0) callback();
	}
	kill(callback = 0) {
		while (this.sounds.length > 0) {
			this.sounds.splice(0, 1);
		}
		_howler.Howler.unload();
		if (callback != 0) callback();
	}

}
let so = new SoundObject();
exports.so = so;
},{"./tts":6}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.speech = exports.ScrollingText = undefined;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _keycodes = require('./keycodes');

var _soundObject = require('./soundObject');

var _tts = require('./tts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof speech == "undefined") var speech = new _tts.TTS();
if (runningText == undefined) var runningText = 0;
class ScrollingText {
	constructor(text, delimiter = "\n", callback = 0) {
		this.text = text;
		this.delimiter = delimiter;
		this.splitText = this.text.split(delimiter);
		this.currentLine = 0;
		this.sndOpen = _soundObject.so.create("UI/textOpen");
		this.sndContinue = _soundObject.so.create("UI/textScroll");
		this.sndClose = _soundObject.so.create("UI/textClose");
		this.callback = callback;
		var id = document.getElementById("touchArea");
		//this.hammer = new Hammer(id);
		this.init();
	}
	init() {
		var that = this;
		runningText = this;
		document.addEventListener("keydown", this.handleKeys);
		//this.hammer.on("swipeleft swiperight", function() { that.handleTap(0); });
		//this.hammer.on("tap", function() { that.handleTap(1); });
		this.sndOpen.play();
		this.currentLine = 0;
		this.readCurrentLine();
	}
	handleKeys(event) {
		switch (event.which) {
			case _keycodes.KeyEvent.DOM_VK_UP:
			case _keycodes.KeyEvent.DOM_VK_DOWN:
			case _keycodes.KeyEvent.DOM_VK_LEFT:
			case _keycodes.KeyEvent.DOM_VK_RIGHT:
				runningText.readCurrentLine();
				break;
			case _keycodes.KeyEvent.DOM_VK_RETURN:
				runningText.advance();
				break;

		}
	}

	handleTap(action) {
		if (action == 0) {
			this.readCurrentLine();
		}

		if (action == 1) {
			this.advance();
		}
	}

	readCurrentLine() {
		speech.speak(this.splitText[this.currentLine]);
	}
	advance() {
		if (this.currentLine < this.splitText.length - 1) {
			this.currentLine++;
			this.sndContinue.play();
			this.readCurrentLine();
		} else {
			this.sndClose.play();
			this.sndClose.unload();
			this.sndOpen.unload();
			this.sndContinue.unload();
			document.removeEventListener("keydown", this.handleKeys);
			//			this.hammer.unload();
			if (this.callback != 0) this.callback();
		}
	}
}
exports.ScrollingText = ScrollingText;
exports.speech = speech;
},{"./keycodes":11,"./soundObject":9,"./tts":6}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Strings {
  constructor() {
    this.strings = {};
    this.strings[1] = {
      "mStart": "Start Game",
      "mLearn": "Learn the pack",
      "tamperWarning": "This pack has been tampered with and is no longer unlocked. Press enter to continue.",
      "mNew": "Get new packs",
      "mBrowse": "Browse downloaded packs",
      "mHashes": "Rebuild packs folder"
    };
  }
  get(lang, what) {
    return this.strings[lang][what];
  }
}
var strings = exports.strings = new Strings();
},{}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundSource = undefined;

var _soundObject = require('./soundObject.js');

class SoundSource {
	constructor(file, x = 0, y = 0, z = 0, loop = true) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.loop = loop;
		this.sound = _soundObject.so.create(file);
		//this.pan = this.sound.effects.add(sono.panner());
		this.sound.loop = loop;
		this.pan.setPosition(this.x, this.y, this.z);
		this.rate = 1;
		this.speed = 0;
		this.minRate = 0.8;
		this.maxRate = 1.2;
		this.toDestroy = false;
		this.rateShiftSpeed = 0.015;
		// this.sound.currentPosition = getRandomArbitrary(0, this.sound.duration);
		this.sound.currentPosition = 0;
	}

	play() {
		this.sound.seek(0);
		this.sound.play();
	}

	pos(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.pan.setPosition(this.x, this.y, this.z);
	}

	update() {}

	setDoppler(z1, speed, direction) {

		if (speed >= 0) {
			if (direction == -1) {
				speed = speed + this.speed;
				// this.rate = 1+Math.sin(((speed/10000)*(this.z-z1)));
				var freq = 44100 * (1 - speed / 240);
				this.rate = freq / 44100;
			} else {
				speed = speed + this.speed;
				// this.rate = 1-Math.sin(((speed/10000)*(z1-this.z)));
				var freq = 44100 / (1 - speed / 240);
				this.rate = freq / 44100;
			}
		} else {
			this.rate = 1;
		}

		// if (this.rate > this.maxRate) this.rate = this.maxRate;
		// if (this.rate < this.minRate) this.rate = this.minRate;
		// this.sound.playbackRate = this.rate;
		if (this.rate > this.sound.playbackRate + this.rateShiftSpeed) {
			this.sound.playbackRate += this.rateShiftSpeed;
		} else if (this.rate < this.sound.playbackRate - this.rateShiftSpeed) {
			this.sound.playbackRate -= this.rateShiftSpeed;
		}
	}

	setSpeed(speed) {
		this.speed = speed;
	}
	destroy() {
		this.sound.destroy();
		this.toDestroy = true;
	}
}

exports.SoundSource = SoundSource;
},{"./soundObject.js":9}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundHandler = undefined;

var _soundSource = require('./soundSource.js');

var _soundObject = require('./soundObject.js');

class SoundHandler {
	constructor(directional = false) {
		this.staticSounds = [];
		this.dynamicSounds = [];
		this.currentDynamicSound = 0;
		this.maxDynamicSounds = 512;
		this.currentStaticSound = 0;
		this.maxStaticSounds = 512;
		this.reuseSounds = true;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.directional = directional;
	}

	playStatic(file, loop = 1, slot = -1) {
		if (slot = -1) {
			slot = this.findFreeStaticSlot();
		}
		this.staticSounds[slot] = new SoundItem(file, this.directional);
		if (loop == 1) {
			this.staticSounds[slot].sound.loop = true;
		}
		this.staticSounds[slot].sound.play();
		console.log("slot " + slot);
		return slot;
	}
	findFreeStaticSlot() {
		for (let i = 0; i < this.maxStaticSounds; i++) {
			if (this.staticSounds[i] == -1 || typeof this.staticSounds[i] == "undefined") {
				return i;
			}
		}
		if (this.currentStaticSound < this.maxStaticSounds) {
			this.currentStaticSound++;
			return this.currentStaticSound;
		} else {
			this.currentStaticSound = 0;
			return this.currentStaticSound;
		}
	}

	findFreeDynamicSlot() {
		for (let i = 0; i < this.maxDynamicSounds; i++) {
			if (this.dynamicSounds[i] == -1 || typeof this.dynamicSounds[i] == "undefined") {
				return i;
			}
		}
		if (this.currentDynamicSound < this.maxDynamicSounds) {
			this.currentDynamicSound++;
			return this.currentDynamicSound;
		} else {
			this.currentDynamicSound = 0;
			return this.currentDynamicSound;
		}
	}

	findDynamicSound(file) {
		for (let i = 0; i < this.dynamicSounds.length; i++) {
			if (this.dynamicSounds[i].file == file) {
				return i;
			}
		}
		return -1;
	}

	play(file) {
		let slot = 0,
		    reuse = 0;
		if (this.reuseSounds) {
			slot = this.findDynamicSound(file);
			reuse = true;
		}
		if (slot == -1 || this.reuseSounds == false) {
			slot = this.findFreeDynamicSlot();
			reuse = false;
		}
		if (typeof this.dynamicSounds[slot] == "undefined") {
			if (reuse == false) {
				this.dynamicSounds[slot] = new SoundItem(file, this.directional);
				console.log("Created sound");
			}
		} else {
			if (reuse == false) {
				this.dynamicSounds[slot].sound.destroy();
				this.dynamicSounds[slot] = new SoundItem(file, directional);
				console.log("Destroyed and reloaded");
			}
		}
		console.log("playing sound");
		this.dynamicSounds[slot].sound.play();
	}

	update(position) {
		if (this.directional == true) {
			for (let i = 0; i < this.dynamicSounds.length; i++) {
				this.dynamicSounds[i].sound.pos(position.x, position.y, position.z);
			}
		}
	}
	destroy() {
		for (var i = 0; i < this.dynamicSounds.length; i++) {
			console.log("destroying" + i);
			this.dynamicSounds[i].destroy();
			this.dynamicSounds.splice(i, 1);
		}

		for (var i = 0; i < this.staticSounds.length; i++) {
			this.staticSounds[i].destroy();
			console.log("destroying" + i);
			this.staticSounds.splice(i, 1);
		}
	}
}
class SoundItem {
	constructor(file, threeD = false) {
		this.file = file;
		this.threeD = threeD;
		if (this.threeD == true) {
			this.sound = new _soundSource.SoundSource(file, 0, 0, 0);
		} else {

			this.sound = _soundObject.so.create(file);
		}
	}
	destroy() {
		this.sound.destroy();
	}
}

exports.SoundHandler = SoundHandler;
},{"./soundSource.js":21,"./soundObject.js":9}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
class GameUtils {
	distance3D(x1, y1, z1, x2, y2, z2) {
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
	}
	distance(jx, jy, kx, ky) {
		//return Math.hypot(jx-kx, jy-ky)
		return Math.sqrt((jx - kx) * (jx - kx) + (jy - ky) * (jy - ky));
	}

	calculateAngle(x1, y1, x2, y2) {
		var angle = Math.atan2(y2 - y1, x2 - x1);
		angle = angle >= 0 ? 0 : 2 * Math.PI + angle;
		return angle;
		// return Math.atan2((y2 - y1),(x2 - x1));
	}
	isCollide3D(a, b) {
		return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y && a.z <= b.z + b.depth && a.z + a.depth >= b.z;
	}
	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	percent(int1, int2) {
		return int1 * 100 / int2;
	}
}
var utils = exports.utils = new GameUtils();
},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KeyboardInput = undefined;

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';
class KeyboardInput {
	constructor() {
		this.keyDown = [];
		this.justPressed = [];
		this.justReleased = [];
		this.justPressedEventCallback = null;
	}

	init() {
		var that = this;
		// 		$(document).keydown(function(event) { that.handleKeyDown(event); });
		// 		$(document).keyup(function(event) { that.handleKeyUp(event); });
		document.addEventListener("keydown", function (event) {
			that.handleKeyDown(event);
		});
		document.addEventListener("keyup", function (event) {
			that.handleKeyUp(event);
		});
	}

	handleKeyDown(event) {

		if (this.keyDown[event.which] != true || typeof this.keyDown[event.which] == "undefined") {
			this.keyDown[event.which] = true;
			this.justPressed[event.which] = true;
			this.justReleased[event.which] = false;
			if (typeof this.justPressedEventCallback != "undefined" && this.justPressedEventCallback != null) this.justPressedEventCallback(event.which);
		}
	}

	handleKeyUp(event) {

		if (this.keyDown[event.which] == true) {
			this.keyDown[event.which] = false;
			this.justPressed[event.which] = false;
			this.justReleased[event.which] = true;
		}
	}

	isDown(event) {

		return this.keyDown[event];
	}
	isJustPressed(event) {

		if (this.justPressed[event] == true) {
			this.justPressed[event] = false;
			return true;
		} else {
			return false;
		}
	}
	isJustReleased(event) {
		if (this.justReleased[event]) {
			this.justReleased[event] = false;
			return true;
		}
		return false;
	}
	keysDown() {
		var kd = [];
		this.keyDown.forEach(function (v, i) {
			if (v) {
				kd.push(i);
			}
		});
		return kd;
	}
	keysPressed() {
		var kd = [];
		this.justPressed.forEach(function (v, i) {
			if (v) {
				kd.push(i);
			}
		});
		this.justPressed.splice();
		return kd;
	}

	keysReleased() {
		var kd = [];
		this.justReleased.forEach(function (v, i) {
			if (v) {
				kd.push(i);
			}
		});
		this.justReleased.splice();
		return kd;
	}

}

exports.KeyboardInput = KeyboardInput;
},{}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MenuTypes = exports.MenuItem = undefined;

var _tts = require("./tts");

if (typeof speech == "undefined") var speech = new _tts.TTS();
var MenuTypes = {
	NORMAL: 0,
	SELECTOR: 1,
	SLIDER: 2,
	EDIT: 3
};
class MenuItem {
	constructor(id, name) {
		this.name = name;
		this.id = id;
		this.type = MenuTypes.NORMAL;
	}

	speak() {
		speech.speak(this.name);
	}

	select() {
		return this.id;
	}

}

class SelectorItem extends MenuItem {
	constructor(id, name, options, defaultOption = 0, selectCallback) {
		super();
		this.id = id;
		this.name = name;
		this.options = options;
		this.type = MenuTypes.SELECTOR;
		this.currentOption = defaultOption;
		this.selectCallback = selectCallback;
	}

	speak() {
		speech.speak(this.name + ". Selector. Set to " + this.options[this.currentOption]);
	}

	increase() {
		if (this.currentOption < this.options.length - 1) this.currentOption++;
		speech.speak(this.options[this.currentOption]);
		if (typeof this.selectCallback != "undefined") {
			this.selectCallback(this.options[this.currentOption]);
		}
	}

	decrease() {
		if (this.currentOption > 0) this.currentOption--;
		speech.speak(this.options[this.currentOption]);
		if (typeof this.selectCallback != "undefined") {
			this.selectCallback(this.options[this.currentOption]);
		}
	}

	select() {
		return this.id;
	}
}

class SliderItem extends MenuItem {
	constructor(id, name, from, to, currentValue = 0) {
		super();
		this.id = id;
		this.name = name;
		this.minValue = from;
		this.maxValue = to;
		this.currentValue = currentValue;
		this.type = MenuTypes.SLIDER;
	}

	speak() {
		speech.speak(this.name + ". Slider. Set to " + this.currentValue);
	}

	increase() {
		if (this.currentValue < this.maxValue) this.currentValue++;
		speech.speak(this.currentValue);
	}

	decrease() {
		if (this.currentValue > this.minValue) this.currentValue--;
		speech.speak(this.currentValue);
	}

	select() {
		return this.id;
	}

}

class EditItem extends MenuItem {
	constructor(id, name, defaultText = "") {
		super();
		this.id = id;
		this.name = name;
		this.text = defaultText;
		this.type = MenuTypes.EDIT;
	}

	speak() {
		speech.speak(this.name + ". Editable. " + (this.text == "" ? "Nothing entered." : "Set to " + this.text));
	}

	addChar(char) {
		this.text += char;
		speech.speak(char);
	}

	removeChar() {
		this.text = this.text.substring(0, this.text.length - 1);
		speech.speak(this.text);
	}

	select() {
		return this.text;
	}

}
exports.MenuItem = MenuItem;
exports.MenuTypes = MenuTypes;
},{"./tts":6}],28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Menu = undefined;

var _utilities = require('./utilities');

var _strings = require('./strings');

var _tts = require('./tts');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _soundObject = require('./soundObject.js');

var _menuItem = require('./menuItem');

var _keycodes = require('./keycodes');

var _input = require('./input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Menu {
	constructor(name, menuData, music) {
		this.menuData = menuData;
		this.cursor = 0;
		this.name = name;
		this.sndKeyChar = _soundObject.so.create("ui/keyChar");
		this.sndKeyDelete = _soundObject.so.create("ui/keyDelete");
		this.sndSliderLeft = _soundObject.so.create("ui/menuSliderLeft");
		this.sndSliderRight = _soundObject.so.create("ui/menuSliderRight");
		this.sndBoundary = _soundObject.so.create("ui/menuBoundary");
		this.sndChoose = _soundObject.so.create("ui/menuChoose");
		this.sndMove = _soundObject.so.create("ui/menuMove");
		this.sndOpen = _soundObject.so.create("ui/menuOpen");
		this.sndSelector = _soundObject.so.create("ui/menuSelector");
		this.sndWrap = _soundObject.so.create("ui/menuWrap");
		this.selectCallback = null;
		if (typeof music != "undefined") this.music = music;
		var id = document.getElementById("touchArea");
		//this.hammer = new Hammer(id);

	}

	nextItem() {

		if (this.cursor < this.menuData.length - 1) this.cursor++;
		this.sndMove.play();

		this.menuData[this.cursor].speak();
	}
	previousItem() {
		if (this.cursor > 0) this.cursor--;
		this.sndMove.play();
		this.menuData[this.cursor].speak();
	}

	increase() {
		if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER || this.menuData[this.cursor].type == _menuItem.MenuTypes.SELECTOR) {
			this.menuData[this.cursor].increase();
			if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER) {
				this.sndSliderRight.play();
			} else {
				this.sndSelector.play();
			}
		}
	}

	decrease() {
		if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER || this.menuData[this.cursor].type == _menuItem.MenuTypes.SELECTOR) {
			this.menuData[this.cursor].decrease();
			if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER) {
				this.sndSliderLeft.play();
			} else {
				this.sndSelector.play();
			}
		}
	}

	insertCharacter(char) {
		if (this.menuData[this.cursor].type == _menuItem.MenuTypes.EDIT) {
			this.menuData[this.cursor].addChar(String.fromCharCode(char));
			this.sndKeyChar.play();
		}
	}

	removeCharacter() {
		if (this.menuData[this.cursor].type == _menuItem.MenuTypes.EDIT) {
			this.menuData[this.cursor].removeChar();
			this.sndKeyDelete.play();
		}
	}
	handleInput(event) {

		this.insertCharacter(event.which);
	}
	destroySounds() {
		this.sndKeyChar.unload();
		this.sndKeyDelete.unload();
		this.sndSliderLeft.unload();
		this.sndSliderRight.unload();
		this.sndBoundary.unload();
		this.sndChoose.unload();
		this.sndMove.unload();
		this.sndOpen.unload();
		this.sndSelector.unload();
		this.sndWrap.unload();
		if (typeof this.music != "undefined") this.music.unload();
	}
	async fade() {
		for (var i = this.music.volume; i > 0; i -= 0.06) {
			this.music.volume = i;
			await _utilities.utils.sleep(50);
		}
		this.music.unload();
		this.unload();
	}
	unload() {
		(0, _jquery2.default)(document).off("keydown");
		(0, _jquery2.default)(document).off("keypress");
		//this.hammer.unload();
		var that = this;
		setTimeout(function () {
			that.destroySounds();
		}, 500);
	}
	handleKeys(event) {

		switch (event.which) {
			case _keycodes.KeyEvent.DOM_VK_RETURN:
				this.select();
				break;
			case _keycodes.KeyEvent.DOM_VK_PAGE_UP:
				this.music.volume += 0.03;
				break;
			case _keycodes.KeyEvent.DOM_VK_PAGE_DOWN:
				this.music.volume -= 0.03;
				break;
			case _keycodes.KeyEvent.DOM_VK_BACK_SPACE:
				this.removeCharacter();
				break;

			case _keycodes.KeyEvent.DOM_VK_DOWN:

				this.nextItem();
				break;
			case _keycodes.KeyEvent.DOM_VK_UP:
				this.previousItem();
				break;
			case _keycodes.KeyEvent.DOM_VK_RIGHT:

				this.increase();

				break;
			case _keycodes.KeyEvent.DOM_VK_LEFT:

				this.decrease();

				break;
		}
	}

	run(callback) {
		if (typeof this.music == "object") {
			this.music.volume = 0.5;
			this.music.loop = true;
			this.music.play();
		} else if (typeof this.music == "string") {
			this.music = _soundObject.so.create(this.music);
			this.music.volume = 0.5;
			this.music.loop = true;
			this.music.play();
		} else {}
		this.selectCallback = callback;
		var that = this;
		(0, _jquery2.default)(document).on("keypress", function (event) {
			that.handleInput(event);
		});
		(0, _jquery2.default)(document).on("keydown", function (event) {
			that.handleKeys(event);
		});
		/*
  this.hammer.on("swipeleft", function(event) { that.handleSwipe(0); });
  this.hammer.on("swiperight", function(event) { that.handleSwipe(1); });
  this.hammer.on("panup", function(event) { that.handleSwipe(3); });
  this.hammer.on("pandown", function(event) { that.handleSwipe(4); });
  this.hammer.on("tap", function(event) { that.handleSwipe(2); });
  */
		_tts.speech.speak(this.name);
		this.sndOpen.play();
	}

	handleSwipe(action) {
		if (action == 3) {
			this.decrease();
		}
		if (action == 4) {
			this.increase();
		}

		if (action == 0) {
			this.previousItem();
		}
		if (action == 1) {
			this.nextItem();
		}
		if (action == 2) {
			this.select();
		}
	}

	select() {

		var selected = this.menuData[this.cursor].id;

		var items = [];
		for (var i = 0; i < this.menuData.length; i++) {
			var addItem = null;
			if (this.menuData[i].type == _menuItem.MenuTypes.SLIDER) {
				addItem = {
					id: this.menuData[i].id,
					value: this.menuData[i].currentValue,
					name: this.menuData[i].options[this.menuData[i].currentValue]
				};
			}
			if (this.menuData[i].type == _menuItem.MenuTypes.EDIT) {
				addItem = {
					id: this.menuData[i].id,
					value: this.menuData[i].text

				};
			}
			if (this.menuData[i].type == _menuItem.MenuTypes.SELECTOR) {
				addItem = {
					id: this.menuData[i].id,
					value: this.menuData[i].currentOption,
					name: this.menuData[i].options[this.menuData[i].currentOption]
				};
			}
			items.push(addItem);
		}

		var toReturn = {
			selected: selected,
			cursor: this.cursor,
			items: items
		};
		this.sndChoose.play();
		(0, _jquery2.default)(document).off("keydown");
		(0, _jquery2.default)(document).off("keypress");
		if (typeof this.music != "undefined") this.fade();
		var that = this;
		setTimeout(function () {
			that.selectCallback(toReturn);
		}, 700);
	}
}
exports.Menu = Menu;
},{"./utilities":7,"./strings":4,"./tts":6,"./soundObject.js":9,"./menuItem":27,"./keycodes":11,"./input":3}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mainMenu = mainMenu;

var _soundObject = require('./soundObject');

var _main = require('./main');

var _stateMachine = require('./stateMachine');

var _strings = require('./strings');

var _menuItem = require('./menuItem');

var _menu = require('./menu');

function mainMenu() {
	var items = new Array();
	items.push(new _menuItem.MenuItem(0, _strings.strings.get(_main.lang, "mStart")));
	items.push(new _menuItem.MenuItem(1, _strings.strings.get(_main.lang, "mLearn")));
	items.push(new _menuItem.MenuItem(2, _strings.strings.get(_main.lang, "mBrowse")));
	items.push(new _menuItem.MenuItem(3, _strings.strings.get(_main.lang, "mHashes")));
	var mainMenu = new _menu.Menu("main menu", items);
	_soundObject.so.directory = "";
	mainMenu.music = _main.packdir + "loop";
	var fs = require('fs');
	if (fs.existsSync(_main.packdir + "select.ogg")) {
		mainMenu.sndChoose.unload();
		mainMenu.sndChoose = _soundObject.so.create(_main.packdir + "select");
	}
	mainMenu.run(function (s) {
		_soundObject.so.directory = "./sounds/";
		switch (s.selected) {
			case 0:
				_stateMachine.st.setState(3);break;
			case 1:
				_stateMachine.st.setState(4);break;
			case 2:
				_stateMachine.st.setState(5);break;
			case 3:
				(0, _main.rebuildHashes)();break;
		}
	});
}
},{"./soundObject":9,"./main":1,"./stateMachine":10,"./strings":4,"./menuItem":27,"./menu":28}],29:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class OldTimer {
  constructor() {
    this.elapsed;
    this.paused = true;
    this.lastTime = 0;
    this.pauseWhen = 0;
    this.started = true;
  }
  isActive() {
    return !paused & started;
  }
  get elapsed() {
    if (this.paused) {
      return this.pauseWhen - this.lastTime;
    }
    return performance.now() - this.lastTime;
  }
  pause() {
    this.paused = true;
    this.pauseWhen = performance.now();
  }
  reset() {
    this.lastTime = performance.now();
    this.pauseWhen = 0;
    this.paused = false;
    this.started = true;
  }
  resume() {
    this.paused = false;
    this.started = true;
    this.lastTime += performance.now() - this.pauseWhen;
  }
}
exports.OldTimer = OldTimer;
},{}],30:[function(require,module,exports) {
function Timer(callbacks, step) {
  var last = 0;
  var active=false;
      var acc = 0;
      var tick = 0;
      var inc = step || 1/120;
      var frameId;

  function onFrame(time) {
    if (last !== null) {
      acc = acc + (time - last) / 1000;
      while (acc > inc) {
        callbacks.update(inc, tick);
        tick = tick + 1;
        acc = acc - inc;
      }
    }
    last = time;
    callbacks.render();
if (active)     frameId = requestAnimationFrame(onFrame);
  }

  function start() {
    last = null;
    active=true;
    frameId = requestAnimationFrame(onFrame);
  }

  function stop() {
    active=false;
    cancelAnimationFrame(frameId);
    console.log(frameId);
  }
function change(value) {
  inc =value|| 1/120;
  acc=inc;
  tick=0;
  stop();
  start();
}
  return {
    start: start,
    stop: stop,
    change: change,
  };
}

module.exports = Timer;

},{}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Game = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _tts = require('./tts');

var _tts2 = _interopRequireDefault(_tts);

var _main = require('./main');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _oldtimer = require('./oldtimer');

var _soundHandler = require('./soundHandler');

var _utilities = require('./utilities');

var _soundObject = require('./soundObject');

var _stateMachine = require('./stateMachine');

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _scrollingText = require('./scrollingText');

var _input = require('./input.js');

var _keycodes = require('./keycodes.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var fs=require('fs');

//var os=require('os');
class Game {
	constructor() {
		this.canPause = true;
		this.actionCompleted = false;
		this.toDestroy = new Array();
		this.scoreTimer = new _oldtimer.OldTimer();
		var that = this;
		(0, _jquery2.default)(document).on("blur", function () {
			that.pause();
		});
		this.pauseTime = 0;
		this.timer = null;
		this.music = null;
		this.score = 0;
		this.pool = new _soundHandler.SoundHandler();
		this.bpms = null;
		this.level = 0;
		this.fileData = null;
		this.input = new _input.KeyboardInput();
		this.input.init();
		this.levels = null;
		var that = this;
		this.setup();
	}
	setup() {
		if (_fs2.default.existsSync(_main.packdir + "bpm.txt")) {
			this.fileData = _fs2.default.readFileSync(_main.packdir + "bpm.txt", "utf8");
		} else {
			var error = new _scrollingText.ScrollingText("There was an error loading the pack " + this.pack + ".", "\n", function () {
				_stateMachine.st.setState(2);
				return;
			});
		}
		this.bpms = this.fileData.split(",");
		this.levels = this.bpms.length - 1;
		if (this.bpms[this.levels] == "") this.levels--;
		this.level++;
		_soundObject.so.directory = "";
		if (_fs2.default.existsSync(_main.packdir + "nlevel.ogg")) _soundObject.so.enqueue(_main.packdir + "nlevel");
		if (_fs2.default.existsSync(_main.packdir + "fail.ogg")) _soundObject.so.enqueue(_main.packdir + "fail");
		for (var i = 1; i <= 10; i++) {
			if (_fs2.default.existsSync(_main.packdir + "a" + i + ".ogg")) {
				_soundObject.so.enqueue(_main.packdir + "a" + i);
				this.actions = i;
			}
			if (_fs2.default.existsSync(_main.packdir + "o" + i + ".ogg")) {
				_soundObject.so.enqueue(_main.packdir + "o" + i);
			}
		}
		this.keys = _main.actionKeys;
		var that = this;
		this.timer = (0, _timer2.default)({ update: function (dt) {
				that.update(dt);
			}, render: function () {
				that.render();
			} }, this.bpms[this.level] / 1000.0);
		_soundObject.so.setQueueCallback(function () {
			_soundObject.so.directory = "./sounds/";
			that.setupLevel();
		});
		this.queueLevels();
		_soundObject.so.loadQueue();
	}
	update(dt) {
		if (this.currentAction == 0) {
			this.currentAction++;
			return;
		}
		if (!this.actionCompleted && this.action > 1) {
			this.fail();
			return;
		}
		this.currentAction++;
		//action and level checks go here
		if (this.currentAction >= this.numberOfActions) {
			_soundObject.so.directory = "";
			_soundObject.so.destroy(_main.packdir + this.level + "music");
			_soundObject.so.destroy(_main.packdir + "pre" + this.level);
			_soundObject.so.directory = "./sounds/";
			this.level++;
			this.timer.stop();
			this.setupLevel();
			return;
		}
		this.action = _utilities.utils.randomInt(1, this.actions);
		this.actionCompleted = false;
		_soundObject.so.directory = "";
		this.pool.playStatic(_main.packdir + "a" + this.action, 0);
		_soundObject.so.directory = "./sounds/";
		//		if (this.action==1) this.actionCompleted=true;//freeze
		this.scoreTimer.reset();
	}
	async fail() {
		this.timer.stop();
		var snd = this.music;
		_soundObject.so.directory = "";
		var failsound = this.pool.playStatic(_main.packdir + "fail", 0);
		_soundObject.so.directory = "./sounds/";
		for (var i = snd.playbackRate; i > 0; i -= 0.05) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(30);
		}
		snd.unload();
		while (this.pool.staticSounds[failsound].sound.playing) {
			await _utilities.utils.sleep(10);
			if (this.input.isDown(_keycodes.KeyEvent.DOM_VK_RETURN)) {
				_tts2.default.speak("meow");
				this.pool.staticSounds[failsound].sound.unload();
			}
		}
		_soundObject.so.resetQueue();
		_soundObject.so.resetQueuedInstance();
		_soundObject.so.kill(function () {
			_stateMachine.st.setState(2);
		});
	}
	async quit() {
		this.timer.stop();
		var snd = this.music;
		for (var i = snd.playbackRate; i > 0; i -= 0.045) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(30);
		}
		snd.unload();
		_soundObject.so.resetQueue();
		_soundObject.so.resetQueuedInstance();
		_stateMachine.st.setState(2);
	}

	render() {
		if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_Q)) {
			this.quit();
			return;
		}
		if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_P)) {
			this.pause();
			return;
		}
		this.handleKeys();
	}
	handleKeys() {
		if (this.actionCompleted) return;
		var keys = this.input.keysPressed();
		if (keys.length > 0 && this.action == 1) {
			this.fail();
			return;
		}
		if (keys.length > 1) {
			this.fail();
			return;
		}
		if (keys.length == 1 && keys[0] == this.keys[this.action]) {
			_soundObject.so.directory = "";
			this.pool.playStatic(_main.packdir + "o" + this.action, 0);
			_soundObject.so.directory = "./sounds/";
			this.actionCompleted = true;
			this.calculateScore();
			return;
		}
		if (keys.length == 1 && keys[0] != this.keys[this.action]) {
			this.fail();
			return;
		}
	}
	async setupLevel() {
		this.canPause = true;
		this.playing = false;
		if (_fs2.default.existsSync(_main.packdir + "pre" + this.level + ".ogg")) {
			_soundObject.so.directory = "";
			this.preSound = _soundObject.so.create(_main.packdir + "pre" + this.level);
			_soundObject.so.directory = "./sounds/";
			this.preSound.play();
			this.playing = true;
		}
		if (_fs2.default.existsSync(_main.packdir + "nlevel.ogg") && !this.playing && this.level > 1) {
			_soundObject.so.directory = "";
			this.preSound = _soundObject.so.create(_main.packdir + "nlevel");
			_soundObject.so.directory = "./sounds/";
			this.preSound.play();
			this.playing = true;
		}
		if (this.playing) {
			this.queueLevels();
			while (this.preSound.playing) {
				await _utilities.utils.sleep(5);
				if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
					this.preSound.stop();
				}
			}
		}
		_soundObject.so.directory = "";
		var that = this;
		this.music = _soundObject.so.create(_main.packdir + this.level + "music");
		this.music.loop = true;
		_soundObject.so.directory = "./sounds/";
		this.music.play();
		this.timer.change(that.bpms[that.level] / 1000.0);
		if (!this.playing && this.level > 1) {
			this.queueLevels();
		}
		this.action = 0;
		this.actionCompleted = false;
		this.currentAction = 0;
		this.numberOfActions = _utilities.utils.randomInt(6 + this.level, this.level * 2 + 6);
	}
	unload() {}
	async pause() {
		if (!this.canPause) return;
		this.canPause = false;
		var snd = this.music;
		this.timer.stop();
		this.scoreTimer.pause();
		this.pauseTime = snd.currentTime;
		for (var i = snd.playbackRate; i > 0; i -= 0.05) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(30);
		}
		snd.pause();
		while (!this.input.isDown(_keycodes.KeyEvent.DOM_VK_P)) {
			await _utilities.utils.sleep(10);
		}
		this.unpause();
	}
	async unpause() {
		var snd = this.music;
		snd.play();
		for (var i = snd.playbackRate; i <= 1; i += 0.05) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(8);
		}
		snd.seek(this.pauseTime);
		this.timer.start();
		this.scoreTimer.resume();
	}
	calculateScore() {
		var bpm = this.bpms[this.level - 1];
		var score = _utilities.utils.percent(this.scoreTimer.elapsed, bpm / 2);
		if (this.scoreTimer.elapsed > bpm / 2) score = 100;
		if (this.scoreTimer.elapsed > bpm / 2 - 20 && this.scoreTimer.elapsed < bpm / 2 + 20) score = 200;
		var good = bpm / 2;
		var timev = this.scoreTimer.elapsed - good;
		var remscore = timev / bpm * 100;
		this.score = Math.ceil(score - remscore);
		_tts2.default.speak(this.score);
	}
	queueLevels() {
		var levelLimit = this.level + 1;
		if (this.levels < levelLimit) levelLimit = this.levels;
		_soundObject.so.directory = "";
		for (var i = this.level; i <= levelLimit; i++) {
			_soundObject.so.enqueue(_main.packdir + i + "music");
			if (_fs2.default.existsSync(_main.packdir + "pre" + i + ".ogg")) {
				_soundObject.so.enqueue(_main.packdir + "pre" + i);
			}
		}
		if (this.level > 1) {
			_soundObject.so.setQueueCallback(0);
			_soundObject.so.loadQueue();
			_soundObject.so.directory = "./sounds/";
		}
	}
}
exports.Game = Game;
},{"./tts":6,"./main":1,"./oldtimer":29,"./soundHandler":8,"./utilities":7,"./soundObject":9,"./stateMachine":10,"./timer":30,"./scrollingText":5,"./input.js":3,"./keycodes.js":11}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.st = undefined;

var _input = require('./input');

var _tts = require('./tts');

var _main = require('./main');

var _menuHandler = require('./menuHandler');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _soundObject = require('./soundObject');

var _keycodes = require('./keycodes');

var _game = require('./game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var event = new _input.KeyboardInput();

class StateMachine {
	constructor() {
		this.state = 0;
		this.currentState = 0;
	}

	setState(state) {
		if (state == 1) {
			event = new _input.KeyboardInput();
			event.init();
			var intro = _soundObject.so.create("logo");
			var that = this;
			intro.volume = 0.5;
			intro.play();
			intro.sound.once("end", function () {
				intro.unload();
				(0, _jquery2.default)(document).off("keydown");
				that.setState(2);
			});
			(0, _jquery2.default)(document).keydown(function (event) {
				if (event.which == _keycodes.KeyEvent.DOM_VK_SPACE || event.which == _keycodes.KeyEvent.DOM_VK_ESCAPE) {
					intro.unload();
					(0, _jquery2.default)(document).off("keydown");
					that.setState(2);
				}
			});
			this.state = state;
		} else if (state == 2) {
			event = null;
			(0, _menuHandler.mainMenu)();
			this.state = state;
		} else if (state == 3) {

			this.currentState = new _game.Game();
			this.state = state;
		} else if (state == 4) {
			(0, _main.learnPack)();
		}
		//new states
		else if (state == 5) {
				(0, _main.browsePacks)();
				this.state = state;
			}
	}

}
var st = new StateMachine();
exports.st = st;
},{"./input":3,"./tts":6,"./main":1,"./menuHandler":22,"./soundObject":9,"./keycodes":11,"./game":23}],1:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.packdir = exports.pack = exports.langs = exports.lang = exports.mangle = exports.actionKeys = undefined;
exports.learnPack = learnPack;
exports.browsePacks = browsePacks;
exports.rebuildHashes = rebuildHashes;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _cryptr = require('cryptr');

var _cryptr2 = _interopRequireDefault(_cryptr);

require('hash-files');

var _fsWalk = require('fs-walk');

var _fsWalk2 = _interopRequireDefault(_fsWalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _scrollingText = require('./scrollingText');

var _strings = require('./strings');

var _soundHandler = require('./soundHandler');

var _tts = require('./tts');

var _utilities = require('./utilities');

var _soundObject = require('./soundObject');

var _keycodes = require('./keycodes');

var _stateMachine = require('./stateMachine');

var _input = require('./input.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import test from './test.js'
var actionKeys = exports.actionKeys = [0, 0, _keycodes.KeyEvent.DOM_VK_SPACE, _keycodes.KeyEvent.DOM_VK_TAB, _keycodes.KeyEvent.DOM_VK_RETURN, _keycodes.KeyEvent.DOM_VK_BACK_SPACE, _keycodes.KeyEvent.DOM_VK_UP, _keycodes.KeyEvent.DOM_VK_DOWN, _keycodes.KeyEvent.DOM_VK_RIGHT, _keycodes.KeyEvent.DOM_VK_LEFT];
var mangle = exports.mangle = new _cryptr2.default("sdf jkl wer uio");
var lang = exports.lang = 1;
var langs = exports.langs = ["", "english", "spanish"];
var pack = exports.pack = "default";
var packdir = exports.packdir = _os2.default.homedir() + "/beatpacks/" + pack + "/";
document.addEventListener("DOMContentLoaded", setup);
_soundObject.so.debug = true;
function setup() {
	/*
 	so.enqueue("memtest");
 	so.setQueueCallback(function() { proceed(); });
 	so.loadQueue();
 	*/
	_stateMachine.st.setState(1);
}
function proceed() {
	var sound = _soundObject.so.create("memtest");
	sound.volume = 0.3;
	sound.play();
	_soundObject.so.destroy("memtest");
}
//st.setState(1);
//document.removeEventListener("DOMContentLoaded",setup);

async function learnPack() {

	var pool = new _soundHandler.SoundHandler();
	var actions = 0;
	for (var i = 1; i <= 10; i++) {
		if (_fs2.default.existsSync(packdir + "a" + i + ".ogg")) {
			actions = i;
		}
	}
	if (lang == 1) _tts.speech.speak("This pack has " + actions + " actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma).");
	if (lang == 2) _tts.speech.speak("Este pack tiene " + actions + " acciones. Las teclas t�picas son espacio, tabulador, enter, bretroceso, y opcionalmente las flechas. Si has reasignado las teclas, puedes usarlas. Para escuchar la acci�n de parar, pulsa la tecla del punto (a la derecha de la coma).");
	var event = new _input.KeyboardInput();
	event.init();
	_soundObject.so.directory = "";
	while (!event.isJustPressed(_keycodes.KeyEvent.DOM_VK_Q)) {
		await _utilities.utils.sleep(10);
		if (event.isJustPressed(actionKeys[2])) pool.playStatic(packdir + "a" + 2, 0);
		if (event.isJustPressed(actionKeys[3])) pool.playStatic(packdir + "a" + 3, 0);
		if (event.isJustPressed(actionKeys[4])) pool.playStatic(packdir + "a" + 4, 0);
		if (event.isJustPressed(actionKeys[5])) pool.playStatic(packdir + "a" + 5, 0);
		if (event.isJustPressed(actionKeys[6])) pool.playStatic(packdir + "a" + 6, 0);
		if (event.isJustPressed(actionKeys[7])) pool.playStatic(packdir + "a" + 7, 0);
		if (event.isJustPressed(actionKeys[8])) pool.playStatic(packdir + "a" + 8, 0);
		if (event.isJustPressed(actionKeys[9])) pool.playStatic(packdir + "a" + 9, 0);
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_PERIOD)) pool.playStatic(packdir + "a" + 1, 0);
	}
	pool.destroy();
	_soundObject.so.directory = "./sounds/";
	_stateMachine.st.setState(2);
}
async function browsePacks(browsing = 1) {
	if (!_fs2.default.existsSync(_os2.default.homedir() + "/beatpacks/hashes.db")) {
		var error = 0;
		if (lang == 1) error = new _scrollingText.ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a few seconds...", "\n", function () {
			rebuildHashes();
		});
		if (lang == 2) error = new _scrollingText.ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos segundos...", "\n", function () {
			rebuildHashes();
		});
		return;
	}
	try {
		var packs = JSON.parse(mangle.decrypt(_fs2.default.readFileSync(_os2.default.homedir() + "/beatpacks/hashes.db")));
	} catch (err) {
		var error = 0;
		if (lang == 1) error = new _scrollingText.ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...", "\n", function () {
			rebuildHashes();
		});
		if (lang == 2) error = new _scrollingText.ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato as� que ves a por un caf� o algo...", "\n", function () {
			rebuildHashes();
		});
		return;
	}
	var timeout = -1;
	var browseArray = [];
	var browsePosition = -1;

	if (browsing == 1) browseArray = packs;
	_soundObject.so.directory = "";
	var toRemove = new Array();
	browseArray.forEach(function (i, v) {
		if (!_fs2.default.existsSync(_os2.default.homedir() + "/beatpacks/" + i.name + "/bpm.txt")) {
			toRemove.push(v);
			return;
		}
	});
	toRemove.forEach(function (i) {
		browseArray.splice(i, 1);
	});
	if (browseArray.length < 1) {
		new _scrollingText.ScrollingText(_strings.strings.get(lang, "nopacks"), "\n", _stateMachine.st.setState(2));
		return;
	}
	var event = new _input.KeyboardInput();
	event.init();
	var snd;
	if (lang == 1) _tts.speech.speak("ready. Browsing " + browseArray.length + " packs. Press arrows to move, q to exit, enter to choose a pack, or page up and page down to move by larger increments.");
	if (lang == 2) _tts.speech.speak("listo. tienes " + browseArray.length + " packs. Pulsa flechas para moverte, q para salir, enter para elegir uno, o pulsa retroceder p�gina y avanzar p�gina para moverte de 20 en 20.");
	var exitNow = 0;
	while (!event.isJustPressed(_keycodes.KeyEvent.DOM_VK_Q) && browsing > 0) {
		//enter
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
			if (typeof snd != "undefined") snd.destroy();
			if (timeout != -1) clearTimeout(timeout);
			if (browsePosition != -1) {
				var size = 0;
				_fsWalk2.default.filesSync(_os2.default.homedir() + "/beatpacks/" + browseArray[browsePosition].name, function (pb, pf, stat) {
					size += stat.size;
				});
				if (size != browseArray[browsePosition].hash) {
					browsing = 0;
					//todo: remove from unlocked
					_tts.speech.speak(_strings.strings.get(lang, "tamperWarning"));
					setTimeout(function () {
						_tts.speech.speak(_strings.strings.get(lang, "tamperWarning"));
					}, 4500);
					while (!event.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
						await _utilities.utils.sleep(10);
					}
				}
				if (browsing > 0) {
					exports.pack = pack = browseArray[browsePosition].name;
					exports.packdir = packdir = _os2.default.homedir() + "/beatpacks/" + pack + "/";
					_soundObject.so.directory = "./sounds/";
					_soundObject.so.kill(function () {
						_stateMachine.st.setState(2);
					});
					return;
				}
			}
		}
		//down arrow
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_DOWN)) {
			if (typeof snd != "undefined") snd.destroy();
			if (timeout != -1) clearTimeout(timeout);
			browsePosition++;
			if (browsePosition > browseArray.length - 1) browsePosition = 0;
			if (lang == 1) _tts.speech.speak(browseArray[browsePosition].name + ". " + browseArray[browsePosition].levels + " levels.");
			if (lang == 2) _tts.speech.speak(browseArray[browsePosition].name + ". " + browseArray[browsePosition].levels + " niveles.");
			timeout = setTimeout(function () {
				snd = _soundObject.so.create(browseArray[browsePosition].preview);
				snd.play();
			}, 1000);
		}
		//up arrow
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_UP)) {
			if (typeof snd != "undefined") snd.destroy();
			if (timeout != -1) clearTimeout(timeout);
			browsePosition--;
			_tts.speech.speak(browsePosition);
			if (browsePosition < 0) browsePosition = browseArray.length - 1;
			if (lang == 1) _tts.speech.speak(browseArray[browsePosition].name + ". " + browseArray[browsePosition].levels + " levels.");
			if (lang == 2) _tts.speech.speak(browseArray[browsePosition].name + ". " + browseArray[browsePosition].levels + " niveles.");
			timeout = setTimeout(function () {
				snd = _soundObject.so.create(browseArray[browsePosition].preview);
				snd.play();
			}, 1000);
		}
		await _utilities.utils.sleep(5);
	}
	if (timeout != -1) clearTimeout(-1);
	_soundObject.so.directory = "./sounds/";
	_soundObject.so.kill(function () {
		_stateMachine.st.setState(2);
	});
}
function rebuildHashes() {
	//var hash=require('hash-files');
	var corrupts = "";
	//var walk=require('fs-walk');
	//var fs=require('fs');
	var newHash = "abc";
	var packs = new Array();
	_soundObject.so.directory = "";
	_fsWalk2.default.dirsSync(_os2.default.homedir() + "/beatpacks", function (pb, pf, stat, next) {
		if (!_fs2.default.existsSync(pb + "/" + pf + "/bpm.txt")) {
			corrupts += "\n" + pf;
			return; //discard non packs
		}
		var theFiles = 0;
		var path = pb + "/" + pf + "/";
		_fsWalk2.default.filesSync(path, function (pb, pf, stat) {
			theFiles += stat.size;
		});
		newHash = theFiles;
		var fileData = _fs2.default.readFileSync(path + "bpm.txt", "utf8");
		var levelsa = fileData.split(",");
		var levels = levelsa.length - 1;
		if (levelsa[levels] == "") levels--;
		var temp = {
			"name": pf,
			"preview": path + "name",
			"levels": levels,
			"hash": newHash
		};
		packs.push(temp);
	});
	_soundObject.so.directory = "./sounds/";
	var write = JSON.stringify(packs);
	write = mangle.encrypt(write);
	_fs2.default.writeFileSync(_os2.default.homedir() + "/beatpacks/hashes.db", write);
	if (corrupts != "") {
		if (lang == 1) new _scrollingText.ScrollingText("one thing before you go... the following packs are corrupt and should be looked at." + corrupts, "\n", function () {
			_stateMachine.st.setState(2);
		});
		if (lang == 2) new _scrollingText.ScrollingText("Antes de que te vayas... los siguientes packs est�n corruptos y deber�as echar un vistazo a ver qu� pasa." + corrupts, "\n", function () {
			_stateMachine.st.setState(2);
		});
	} else {
		_stateMachine.st.setState(2);
	}
}
},{"./scrollingText":5,"./strings":4,"./soundHandler":8,"./tts":6,"./utilities":7,"./soundObject":9,"./keycodes":11,"./stateMachine":10,"./input.js":3}],31:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}

},{}]},{},[31,1])
//# sourceMappingURL=/client/main.map