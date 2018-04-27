process.env.HMR_PORT=57638;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
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
})({12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
const useWebTTS = true;

class TTS {
	constructor(webTTS = false) {
		this.synth = window.speechSynthesis;
		this.webTTS = webTTS;
	}

	speak(text) {
		if (this.webTTS) {
			const utterThis = new SpeechSynthesisUtterance(text);
			this.synth.stop();
			this.synth.speak(utterThis);
		} else {
			document.getElementById('speech').innerHTML = '';
			const para = document.createElement('p');
			para.appendChild(document.createTextNode(text));
			document.getElementById('speech').appendChild(para);
		}
	} // End speak()

	setWebTTS(tts) {
		this.webTTS = tts;
	}
} // End class
if (typeof speech === 'undefined') {
	var speech = new TTS();
}
exports.TTS = TTS;
exports.speech = speech;
},{}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OldTimer = undefined;

var _tts = require('./tts');

class OldTimer {
	constructor() {
		this.elapsed;
		this.paused = false;
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
	restart() {
		//speech.speak("restarted");
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
},{"./tts":12}],19:[function(require,module,exports) {
/*!
 *  howler.js v2.0.9
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function () {
	'use strict';

	/** Global Methods **/
	/***************************************************************************/

	/**
   * Create the global controller. All contained methods and properties apply
   * to all sounds that are currently playing or will be in the future.
   */
	const HowlerGlobal = function () {
    this.init();
	};
	HowlerGlobal.prototype = {
		/**
     * Initialize the global Howler object.
     * @return {Howler}
     */
		init() {
			const self = this || Howler;

			// Create a global ID counter.
			self._counter = 1000;

			// Internal properties.
			self._codecs = {};
			self._howls = [];
			self._muted = false;
			self._volume = 1;
			self._canPlayEvent = 'canplaythrough';
			self._navigator = (typeof window !== 'undefined' && window.navigator) ? window.navigator : null;

			// Public properties.
			self.masterGain = null;
			self.noAudio = false;
			self.usingWebAudio = true;
			self.autoSuspend = true;
			self.ctx = null;

			// Set to false to disable the auto iOS enabler.
			self.mobileAutoEnable = true;

      // Setup the various state values for global tracking.
      self._setup();

      return self;
		},

		/**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
		volume(vol) {
			const self = this || Howler;
			vol = parseFloat(vol);

			// If we don't have an AudioContext created yet, run the setup.
			if (!self.ctx) {
        setupAudioContext();
			}

			if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
				self._volume = vol;

				// Don't update any of the nodes if we are muted.
				if (self._muted) {
					return self;
				}

				// When using Web Audio, we just need to adjust the master gain.
				if (self.usingWebAudio) {
          self.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
				}

				// Loop through and change volume for all HTML5 audio nodes.
				for (let i = 0; i < self._howls.length; i++) {
					if (!self._howls[i]._webAudio) {
						// Get all of the sounds in this Howl group.
						const ids = self._howls[i]._getSoundIds();

						// Loop through all sounds and change the volumes.
						for (let j = 0; j < ids.length; j++) {
							const sound = self._howls[i]._soundById(ids[j]);

							if (sound && sound._node) {
								sound._node.volume = sound._volume * vol;
							}
						}
					}
				}

				return self;
			}

			return self._volume;
		},

		/**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
		mute(muted) {
			const self = this || Howler;

			// If we don't have an AudioContext created yet, run the setup.
			if (!self.ctx) {
        setupAudioContext();
			}

			self._muted = muted;

			// With Web Audio, we just need to mute the master gain.
			if (self.usingWebAudio) {
        self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler.ctx.currentTime);
			}

			// Loop through and mute all HTML5 Audio nodes.
			for (let i = 0; i < self._howls.length; i++) {
				if (!self._howls[i]._webAudio) {
					// Get all of the sounds in this Howl group.
					const ids = self._howls[i]._getSoundIds();

					// Loop through all sounds and mark the audio node as muted.
					for (let j = 0; j < ids.length; j++) {
						const sound = self._howls[i]._soundById(ids[j]);

						if (sound && sound._node) {
							sound._node.muted = (muted) ? true : sound._muted;
						}
					}
				}
			}

			return self;
		},

		/**
     * Unload and destroy all currently loaded Howl objects.
     * @return {Howler}
     */
		unload() {
			const self = this || Howler;

			for (let i = self._howls.length - 1; i >= 0; i--) {
        self._howls[i].unload();
			}

			// Create a new AudioContext to make sure it is fully reset.
			if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== 'undefined') {
        self.ctx.close();
        self.ctx = null;
        setupAudioContext();
			}

			return self;
		},

		/**
     * Check for codec support of specific extension.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
		codecs(ext) {
			return (this || Howler)._codecs[ext.replace(/^x-/, '')];
		},

		/**
     * Setup various state values for global tracking.
     * @return {Howler}
     */
		_setup() {
			const self = this || Howler;

			// Keeps track of the suspend/resume state of the AudioContext.
			self.state = self.ctx ? self.ctx.state || 'running' : 'running';

      // Automatically begin the 30-second suspend process
      self._autoSuspend();

      // Check if audio is available.
      if (!self.usingWebAudio) {
      	// No audio is available on this system if noAudio is set to true.
      	if (typeof Audio !== 'undefined') {
      		try {
      			var test = new Audio();

      			// Check if the canplaythrough event is available.
      			if (typeof test.oncanplaythrough === 'undefined') {
      				self._canPlayEvent = 'canplay';
      			}
      		} catch (e) {
      			self.noAudio = true;
      		}
      	} else {
      		self.noAudio = true;
      	}
      }

      // Test to make sure audio isn't disabled in Internet Explorer.
      try {
      	var test = new Audio();
      	if (test.muted) {
      		self.noAudio = true;
      	}
      } catch (e) {}

      // Check for supported codecs.
      if (!self.noAudio) {
        self._setupCodecs();
      }

      return self;
		},

		/**
     * Check for browser support for various codecs and cache the results.
     * @return {Howler}
     */
		_setupCodecs() {
			const self = this || Howler;
			let audioTest = null;

			// Must wrap in a try/catch because IE11 in server mode throws an error.
			try {
				audioTest = (typeof Audio !== 'undefined') ? new Audio() : null;
			} catch (err) {
				return self;
			}

			if (!audioTest || typeof audioTest.canPlayType !== 'function') {
				return self;
			}

			const mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, '');

			// Opera version <33 has mixed MP3 support, so we need to check for and block it.
			const checkOpera = self._navigator && self._navigator.userAgent.match(/OPR\/([0-6].)/g);
			const isOldOpera = (checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33);

			self._codecs = {
				mp3: Boolean(!isOldOpera && (mpegTest || audioTest.canPlayType('audio/mp3;').replace(/^no$/, ''))),
				mpeg: Boolean(mpegTest),
				opus: Boolean(audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '')),
				ogg: Boolean(audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')),
				oga: Boolean(audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')),
				wav: Boolean(audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')),
				aac: Boolean(audioTest.canPlayType('audio/aac;').replace(/^no$/, '')),
				caf: Boolean(audioTest.canPlayType('audio/x-caf;').replace(/^no$/, '')),
				m4a: Boolean((audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, '')),
				mp4: Boolean((audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, '')),
				weba: Boolean(audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')),
				webm: Boolean(audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')),
				dolby: Boolean(audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, '')),
				flac: Boolean((audioTest.canPlayType('audio/x-flac;') || audioTest.canPlayType('audio/flac;')).replace(/^no$/, ''))
			};

			return self;
		},

		/**
     * Mobile browsers will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
		_enableMobileAudio() {
			const self = this || Howler;

			// Only run this on mobile devices if audio isn't already eanbled.
			const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(self._navigator && self._navigator.userAgent);
			const isTouch = Boolean(('ontouchend' in window) || (self._navigator && self._navigator.maxTouchPoints > 0) || (self._navigator && self._navigator.msMaxTouchPoints > 0));
			if (self._mobileEnabled || !self.ctx || (!isMobile && !isTouch)) {
				return;
			}

			self._mobileEnabled = false;

			// Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
			// Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
			// By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.
			if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
				self._mobileUnloaded = true;
        self.unload();
			}

			// Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
			// http://stackoverflow.com/questions/24119684
			self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);

			// Call this method on touch start to create and play a buffer,
			// then check if the audio actually played to determine if
			// audio has now been unlocked on iOS, Android, etc.
			var unlock = function () {
        // Fix Android can not play in suspend state.
        Howler._autoResume();

        // Create an empty buffer.
        const source = self.ctx.createBufferSource();
        source.buffer = self._scratchBuffer;
        source.connect(self.ctx.destination);

        // Play the empty buffer.
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.
        if (typeof self.ctx.resume === 'function') {
          self.ctx.resume();
        }

        // Setup a timeout to check that we are unlocked on the next event loop.
        source.addEventListener('ended', () => {
          source.disconnect(0);

          // Update the unlocked state and prevent this check from happening again.
          self._mobileEnabled = true;
          self.mobileAutoEnable = false;

          // Remove the touch start listener.
          document.removeEventListener('touchstart', unlock, true);
          document.removeEventListener('touchend', unlock, true);
        });
			};

      // Setup a touch start listener to attempt an unlock in.
      document.addEventListener('touchstart', unlock, true);
      document.addEventListener('touchend', unlock, true);

      return self;
		},

		/**
     * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
     * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
     * @return {Howler}
     */
		_autoSuspend() {
			const self = this;

			if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
				return;
			}

			// Check if any sounds are playing.
			for (let i = 0; i < self._howls.length; i++) {
				if (self._howls[i]._webAudio) {
					for (let j = 0; j < self._howls[i]._sounds.length; j++) {
						if (!self._howls[i]._sounds[j]._paused) {
							return self;
						}
					}
				}
			}

			if (self._suspendTimer) {
        clearTimeout(self._suspendTimer);
			}

			// If no sound has played after 30 seconds, suspend the context.
			self._suspendTimer = setTimeout(() => {
				if (!self.autoSuspend) {
					return;
				}

				self._suspendTimer = null;
				self.state = 'suspending';
        self.ctx.suspend().then(() => {
        	self.state = 'suspended';

        	if (self._resumeAfterSuspend) {
        		delete self._resumeAfterSuspend;
            self._autoResume();
        	}
        });
			}, 30000);

			return self;
		},

		/**
     * Automatically resume the Web Audio AudioContext when a new sound is played.
     * @return {Howler}
     */
		_autoResume() {
			const self = this;

			if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
				return;
			}

			if (self.state === 'running' && self._suspendTimer) {
        clearTimeout(self._suspendTimer);
        self._suspendTimer = null;
			} else if (self.state === 'suspended') {
        self.ctx.resume().then(() => {
        	self.state = 'running';

        	// Emit to all Howls that the audio has resumed.
        	for (let i = 0; i < self._howls.length; i++) {
            self._howls[i]._emit('resume');
        	}
        });

        if (self._suspendTimer) {
          clearTimeout(self._suspendTimer);
          self._suspendTimer = null;
        }
			} else if (self.state === 'suspending') {
				self._resumeAfterSuspend = true;
			}

			return self;
		}
	};

	// Setup the global audio controller.
	var Howler = new HowlerGlobal();

	/** Group Methods **/
	/***************************************************************************/

	/**
   * Create an audio group controller.
   * @param {Object} o Passed in properties for this group.
   */
	const Howl = function (o) {
		const self = this;

		// Throw an error if no source is provided.
		if (!o.src || o.src.length === 0) {
      console.error('An array of source files must be passed with any new Howl.');
      return;
		}

    self.init(o);
	};
	Howl.prototype = {
		/**
     * Initialize a new Howl group object.
     * @param  {Object} o Passed in properties for this group.
     * @return {Howl}
     */
		init(o) {
			const self = this;

			// If we don't have an AudioContext created yet, run the setup.
			if (!Howler.ctx) {
        setupAudioContext();
			}

			// Setup user-defined default properties.
			self._autoplay = o.autoplay || false;
			self._format = (typeof o.format !== 'string') ? o.format : [o.format];
			self._html5 = o.html5 || false;
			self._muted = o.mute || false;
			self._loop = o.loop || false;
			self._pool = o.pool || 5;
			self._preload = (typeof o.preload === 'boolean') ? o.preload : true;
			self._rate = o.rate || 1;
			self._sprite = o.sprite || {};
			self._src = (typeof o.src !== 'string') ? o.src : [o.src];
			self._volume = o.volume !== undefined ? o.volume : 1;
			self._xhrWithCredentials = o.xhrWithCredentials || false;

			// Setup all other default properties.
			self._duration = 0;
			self._state = 'unloaded';
			self._sounds = [];
			self._endTimers = {};
			self._queue = [];
			self._playLock = false;

			// Setup event listeners.
			self._onend = o.onend ? [{fn: o.onend}] : [];
			self._onfade = o.onfade ? [{fn: o.onfade}] : [];
			self._onload = o.onload ? [{fn: o.onload}] : [];
			self._onloaderror = o.onloaderror ? [{fn: o.onloaderror}] : [];
			self._onplayerror = o.onplayerror ? [{fn: o.onplayerror}] : [];
			self._onpause = o.onpause ? [{fn: o.onpause}] : [];
			self._onplay = o.onplay ? [{fn: o.onplay}] : [];
			self._onstop = o.onstop ? [{fn: o.onstop}] : [];
			self._onmute = o.onmute ? [{fn: o.onmute}] : [];
			self._onvolume = o.onvolume ? [{fn: o.onvolume}] : [];
			self._onrate = o.onrate ? [{fn: o.onrate}] : [];
			self._onseek = o.onseek ? [{fn: o.onseek}] : [];
			self._onresume = [];

			// Web Audio or HTML5 Audio?
			self._webAudio = Howler.usingWebAudio && !self._html5;

			// Automatically try to enable audio on iOS.
			if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.mobileAutoEnable) {
        Howler._enableMobileAudio();
			}

      // Keep track of this Howl group in the global controller.
      Howler._howls.push(self);

      // If they selected autoplay, add a play event to the load queue.
      if (self._autoplay) {
        self._queue.push({
        	event: 'play',
        	action() {
            self.play();
        	}
        });
      }

      // Load the source file unless otherwise specified.
      if (self._preload) {
        self.load();
      }

      return self;
		},

		/**
     * Load the audio file.
     * @return {Howler}
     */
		load() {
			const self = this;
			let url = null;

			// If no audio is available, quit immediately.
			if (Howler.noAudio) {
        self._emit('loaderror', null, 'No audio support.');
        return;
			}

			// Make sure our source is in an array.
			if (typeof self._src === 'string') {
				self._src = [self._src];
			}

			// Loop through the sources and pick the first one that is compatible.
			for (let i = 0; i < self._src.length; i++) {
				var ext, str;

				if (self._format && self._format[i]) {
					// If an extension was specified, use that instead.
					ext = self._format[i];
				} else {
					// Make sure the source is a string.
					str = self._src[i];
					if (typeof str !== 'string') {
            self._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.');
            continue;
					}

					// Extract the file extension from the URL or base64 data URI.
					ext = /^data:audio\/([^;,]+);/i.exec(str);
					if (!ext) {
						ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
					}

					if (ext) {
						ext = ext[1].toLowerCase();
					}
				}

				// Log a warning if no extension was found.
				if (!ext) {
          console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
				}

				// Check if this extension is available.
				if (ext && Howler.codecs(ext)) {
					url = self._src[i];
					break;
				}
			}

			if (!url) {
        self._emit('loaderror', null, 'No codec support for selected audio sources.');
        return;
			}

			self._src = url;
			self._state = 'loading';

			// If the hosting page is HTTPS and the source isn't,
			// drop down to HTML5 Audio to avoid Mixed Content errors.
			if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
				self._html5 = true;
				self._webAudio = false;
			}

			// Create a new sound object and add it to the pool.
			new Sound(self);

			// Load and decode the audio data for playback.
			if (self._webAudio) {
        loadBuffer(self);
			}

			return self;
		},

		/**
     * Play a sound or resume previous playback.
     * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Number}          Sound ID.
     */
		play(sprite, internal) {
			const self = this;
			let id = null;

			// Determine if a sprite, sound id or nothing was passed
			if (typeof sprite === 'number') {
				id = sprite;
				sprite = null;
			} else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
				// If the passed sprite doesn't exist, do nothing.
				return null;
			} else if (typeof sprite === 'undefined') {
				// Use the default sound sprite (plays the full audio length).
				sprite = '__default';

				// Check if there is a single paused sound that isn't ended.
				// If there is, play that sound. If not, continue as usual.
				let num = 0;
				for (let i = 0; i < self._sounds.length; i++) {
					if (self._sounds[i]._paused && !self._sounds[i]._ended) {
						num++;
						id = self._sounds[i]._id;
					}
				}

				if (num === 1) {
					sprite = null;
				} else {
					id = null;
				}
			}

			// Get the selected node, or get one from the pool.
			const sound = id ? self._soundById(id) : self._inactiveSound();

			// If the sound doesn't exist, do nothing.
			if (!sound) {
				return null;
			}

			// Select the sprite definition.
			if (id && !sprite) {
				sprite = sound._sprite || '__default';
			}

			// If the sound hasn't loaded, we must wait to get the audio's duration.
			// We also need to wait to make sure we don't run into race conditions with
			// the order of function calls.
			if (self._state !== 'loaded') {
				// Set the sprite value on this sound.
				sound._sprite = sprite;

				// Makr this sounded as not ended in case another sound is played before this one loads.
				sound._ended = false;

				// Add the sound to the queue to be played on load.
				const soundId = sound._id;
        self._queue.push({
        	event: 'play',
        	action() {
            self.play(soundId);
        	}
        });

        return soundId;
			}

			// Don't play the sound if an id was passed and it is already playing.
			if (id && !sound._paused) {
				// Trigger the play event, in order to keep iterating through queue.
				if (!internal) {
          self._loadQueue('play');
				}

				return sound._id;
			}

			// Make sure the AudioContext isn't suspended, and resume it if it is.
			if (self._webAudio) {
        Howler._autoResume();
			}

			// Determine how long to play for and where to start playing.
			const seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
			const duration = Math.max(0, ((self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000) - seek);
			const timeout = (duration * 1000) / Math.abs(sound._rate);

			// Update the parameters of the sound
			sound._paused = false;
			sound._ended = false;
			sound._sprite = sprite;
			sound._seek = seek;
			sound._start = self._sprite[sprite][0] / 1000;
			sound._stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
			sound._loop = Boolean(sound._loop || self._sprite[sprite][2]);

			// Begin the actual playback.
			const node = sound._node;
			if (self._webAudio) {
				// Fire this when the sound is ready to play to begin Web Audio playback.
				const playWebAudio = function () {
          self._refreshBuffer(sound);

          // Setup the playback params.
          const vol = (sound._muted || self._muted) ? 0 : sound._volume;
          node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
          sound._playStart = Howler.ctx.currentTime;

          // Play the sound using the supported method.
          if (typeof node.bufferSource.start === 'undefined') {
          	sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
          } else {
          	sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
          }

          // Start a new timer if none is present.
          if (timeout !== Infinity) {
          	self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          }

          if (!internal) {
            setTimeout(() => {
              self._emit('play', sound._id);
            }, 0);
          }
				};

				if (Howler.state === 'running') {
          playWebAudio();
				} else {
          self.once('resume', playWebAudio);

          // Cancel the end timer.
          self._clearTimer(sound._id);
				}
			} else {
				// Fire this when the sound is ready to play to begin HTML5 Audio playback.
				const playHtml5 = function () {
					node.currentTime = seek;
					node.muted = sound._muted || self._muted || Howler._muted || node.muted;
					node.volume = sound._volume * Howler.volume();
					node.playbackRate = sound._rate;

					// Mobile browsers will throw an error if this is called without user interaction.
					try {
						const play = node.play();

						// Support older browsers that don't support promises, and thus don't have this issue.
						if (typeof Promise !== 'undefined' && play instanceof Promise) {
							// Implements a lock to prevent DOMException: The play() request was interrupted by a call to pause().
							self._playLock = true;

							// Releases the lock and executes queued actions.
							const runLoadQueue = function () {
								self._playLock = false;
								if (!internal) {
                  self._emit('play', sound._id);
								}
							};
              play.then(runLoadQueue, runLoadQueue);
						} else if (!internal) {
              self._emit('play', sound._id);
						}

						// If the node is still paused, then we can assume there was a playback issue.
						if (node.paused) {
              self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
                'on mobile devices where playback was not within a user interaction.');
              return;
						}

						// Setup the end timer on sprites or listen for the ended event.
						if (sprite !== '__default') {
							self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
						} else {
							self._endTimers[sound._id] = function () {
                // Fire ended on this audio node.
                self._ended(sound);

                // Clear this listener.
                node.removeEventListener('ended', self._endTimers[sound._id], false);
							};
              node.addEventListener('ended', self._endTimers[sound._id], false);
						}
					} catch (err) {
            self._emit('playerror', sound._id, err);
					}
				};

				// Play immediately if ready, or wait for the 'canplaythrough'e vent.
				const loadedNoReadyState = (window && window.ejecta) || (!node.readyState && Howler._navigator.isCocoonJS);
				if (node.readyState >= 3 || loadedNoReadyState) {
          playHtml5();
				} else {
					var listener = function () {
            // Begin playback.
            playHtml5();

            // Clear this listener.
            node.removeEventListener(Howler._canPlayEvent, listener, false);
					};
          node.addEventListener(Howler._canPlayEvent, listener, false);

          // Cancel the end timer.
          self._clearTimer(sound._id);
				}
			}

			return sound._id;
		},

		/**
     * Pause playback and save current position.
     * @param  {Number} id The sound ID (empty to pause all in group).
     * @return {Howl}
     */
		pause(id) {
			const self = this;

			// If the sound hasn't loaded or a play() promise is pending, add it to the load queue to pause when capable.
			if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
        	event: 'pause',
        	action() {
            self.pause(id);
        	}
        });

        return self;
			}

			// If no id is passed, get all ID's to be paused.
			const ids = self._getSoundIds(id);

			for (let i = 0; i < ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        const sound = self._soundById(ids[i]);

        if (sound && !sound._paused) {
        	// Reset the seek position.
        	sound._seek = self.seek(ids[i]);
        	sound._rateSeek = 0;
        	sound._paused = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
          	if (self._webAudio) {
          		// Make sure the sound has been created.
          		if (!sound._node.bufferSource) {
          			continue;
          		}

          		if (typeof sound._node.bufferSource.stop === 'undefined') {
                sound._node.bufferSource.noteOff(0);
          		} else {
                sound._node.bufferSource.stop(0);
          		}

              // Clean up the buffer source.
              self._cleanBuffer(sound._node);
          	} else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.pause();
          	}
          }
        }

        // Fire the pause event, unless `true` is passed as the 2nd argument.
        if (!arguments[1]) {
          self._emit('pause', sound ? sound._id : null);
        }
			}

			return self;
		},

		/**
     * Stop playback and reset to start.
     * @param  {Number} id The sound ID (empty to stop all in group).
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Howl}
     */
		stop(id, internal) {
			const self = this;

			// If the sound hasn't loaded, add it to the load queue to stop when capable.
			if (self._state !== 'loaded') {
        self._queue.push({
        	event: 'stop',
        	action() {
            self.stop(id);
        	}
        });

        return self;
			}

			// If no id is passed, get all ID's to be stopped.
			const ids = self._getSoundIds(id);

			for (let i = 0; i < ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        const sound = self._soundById(ids[i]);

        if (sound) {
        	// Reset the seek position.
        	sound._seek = sound._start || 0;
        	sound._rateSeek = 0;
        	sound._paused = true;
        	sound._ended = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
          	if (self._webAudio) {
          		// Make sure the sound's AudioBufferSourceNode has been created.
          		if (sound._node.bufferSource) {
          			if (typeof sound._node.bufferSource.stop === 'undefined') {
                  sound._node.bufferSource.noteOff(0);
          			} else {
                  sound._node.bufferSource.stop(0);
          			}

                // Clean up the buffer source.
                self._cleanBuffer(sound._node);
          		}
          	} else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
          		sound._node.currentTime = sound._start || 0;
              sound._node.pause();
          	}
          }

          if (!internal) {
            self._emit('stop', sound._id);
          }
        }
			}

			return self;
		},

		/**
     * Mute/unmute a single sound or all sounds in this Howl group.
     * @param  {Boolean} muted Set to true to mute and false to unmute.
     * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
     * @return {Howl}
     */
		mute(muted, id) {
			const self = this;

			// If the sound hasn't loaded, add it to the load queue to mute when capable.
			if (self._state !== 'loaded') {
        self._queue.push({
        	event: 'mute',
        	action() {
            self.mute(muted, id);
        	}
        });

        return self;
			}

			// If applying mute/unmute to all sounds, update the group's value.
			if (typeof id === 'undefined') {
				if (typeof muted === 'boolean') {
					self._muted = muted;
				} else {
					return self._muted;
				}
			}

			// If no id is passed, get all ID's to be muted.
			const ids = self._getSoundIds(id);

			for (let i = 0; i < ids.length; i++) {
				// Get the sound.
				const sound = self._soundById(ids[i]);

				if (sound) {
					sound._muted = muted;

					// Cancel active fade and set the volume to the end value.
					if (sound._interval) {
            self._stopFade(sound._id);
					}

					if (self._webAudio && sound._node) {
            sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
					} else if (sound._node) {
						sound._node.muted = Howler._muted ? true : muted;
					}

          self._emit('mute', sound._id);
				}
			}

			return self;
		},

		/**
     * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
     *   volume() -> Returns the group's volume value.
     *   volume(id) -> Returns the sound id's current volume.
     *   volume(vol) -> Sets the volume of all sounds in this Howl group.
     *   volume(vol, id) -> Sets the volume of passed sound id.
     * @return {Howl/Number} Returns self or current volume.
     */
		volume() {
			const self = this;
			const args = arguments;
			let vol, id;

			// Determine the values based on arguments.
			if (args.length === 0) {
				// Return the value of the groups' volume.
				return self._volume;
			} if (args.length === 1 || args.length === 2 && typeof args[1] === 'undefined') {
				// First check if this is an ID, and if not, assume it is a new volume.
				const ids = self._getSoundIds();
				const index = ids.indexOf(args[0]);
				if (index >= 0) {
					id = parseInt(args[0], 10);
				} else {
					vol = parseFloat(args[0]);
				}
			} else if (args.length >= 2) {
				vol = parseFloat(args[0]);
				id = parseInt(args[1], 10);
			}

			// Update the volume or return the current volume.
			let sound;
			if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
				// If the sound hasn't loaded, add it to the load queue to change volume when capable.
				if (self._state !== 'loaded') {
          self._queue.push({
          	event: 'volume',
          	action() {
              self.volume.apply(self, args);
          	}
          });

          return self;
				}

				// Set the group volume.
				if (typeof id === 'undefined') {
					self._volume = vol;
				}

				// Update one or all volumes.
				id = self._getSoundIds(id);
				for (let i = 0; i < id.length; i++) {
					// Get the sound.
					sound = self._soundById(id[i]);

					if (sound) {
						sound._volume = vol;

						// Stop currently running fades.
						if (!args[2]) {
              self._stopFade(id[i]);
						}

						if (self._webAudio && sound._node && !sound._muted) {
              sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
						} else if (sound._node && !sound._muted) {
							sound._node.volume = vol * Howler.volume();
						}

            self._emit('volume', sound._id);
					}
				}
			} else {
				sound = id ? self._soundById(id) : self._sounds[0];
				return sound ? sound._volume : 0;
			}

			return self;
		},

		/**
     * Fade a currently playing sound between two volumes (if no id is passsed, all sounds will fade).
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id (omit to fade all sounds).
     * @return {Howl}
     */
		fade(from, to, len, id) {
			const self = this;

			// If the sound hasn't loaded, add it to the load queue to fade when capable.
			if (self._state !== 'loaded') {
        self._queue.push({
        	event: 'fade',
        	action() {
            self.fade(from, to, len, id);
        	}
        });

        return self;
			}

      // Set the volume to the start position.
      self.volume(from, id);

      // Fade the volume of one or all sounds.
      const ids = self._getSoundIds(id);
      for (let i = 0; i < ids.length; i++) {
      	// Get the sound.
      	const sound = self._soundById(ids[i]);

      	// Create a linear fade or fall back to timeouts with HTML5 Audio.
      	if (sound) {
      		// Stop the previous fade if no sprite is being used (otherwise, volume handles this).
      		if (!id) {
            self._stopFade(ids[i]);
      		}

      		// If we are using Web Audio, let the native methods do the actual fade.
      		if (self._webAudio && !sound._muted) {
      			const currentTime = Howler.ctx.currentTime;
      			const end = currentTime + (len / 1000);
      			sound._volume = from;
            sound._node.gain.setValueAtTime(from, currentTime);
            sound._node.gain.linearRampToValueAtTime(to, end);
      		}

          self._startFadeInterval(sound, from, to, len, ids[i], typeof id === 'undefined');
      	}
      }

      return self;
		},

		/**
     * Starts the internal interval to fade a sound.
     * @param  {Object} sound Reference to sound to fade.
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id to fade.
     * @param  {Boolean} isGroup   If true, set the volume on the group.
     */
		_startFadeInterval(sound, from, to, len, id, isGroup) {
			const self = this;
			let vol = from;
			const diff = to - from;
			const steps = Math.abs(diff / 0.01);
			const stepLen = Math.max(4, (steps > 0) ? len / steps : len);
			let lastTick = Date.now();

			// Store the value being faded to.
			sound._fadeTo = to;

			// Update the volume value on each interval tick.
			sound._interval = setInterval(() => {
				// Update the volume based on the time since the last tick.
				const tick = (Date.now() - lastTick) / len;
				lastTick = Date.now();
				vol += diff * tick;

				// Make sure the volume is in the right bounds.
				vol = Math.max(0, vol);
				vol = Math.min(1, vol);

				// Round to within 2 decimal points.
				vol = Math.round(vol * 100) / 100;

				// Change the volume.
				if (self._webAudio) {
					sound._volume = vol;
				} else {
          self.volume(vol, sound._id, true);
				}

				// Set the group's volume.
				if (isGroup) {
					self._volume = vol;
				}

				// When the fade is complete, stop it and fire event.
				if ((to < from && vol <= to) || (to > from && vol >= to)) {
          clearInterval(sound._interval);
          sound._interval = null;
          sound._fadeTo = null;
          self.volume(to, sound._id);
          self._emit('fade', sound._id);
				}
			}, stepLen);
		},

		/**
     * Internal method that stops the currently playing fade when
     * a new fade starts, volume is changed or the sound is stopped.
     * @param  {Number} id The sound id.
     * @return {Howl}
     */
		_stopFade(id) {
			const self = this;
			const sound = self._soundById(id);

			if (sound && sound._interval) {
				if (self._webAudio) {
          sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
				}

        clearInterval(sound._interval);
        sound._interval = null;
        self.volume(sound._fadeTo, id);
        sound._fadeTo = null;
        self._emit('fade', id);
			}

			return self;
		},

		/**
     * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
     *   loop() -> Returns the group's loop value.
     *   loop(id) -> Returns the sound id's loop value.
     *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
     *   loop(loop, id) -> Sets the loop value of passed sound id.
     * @return {Howl/Boolean} Returns self or current loop value.
     */
		loop() {
			const self = this;
			const args = arguments;
			let loop, id, sound;

			// Determine the values for loop and id.
			if (args.length === 0) {
				// Return the grou's loop value.
				return self._loop;
			} if (args.length === 1) {
				if (typeof args[0] === 'boolean') {
					loop = args[0];
					self._loop = loop;
				} else {
					// Return this sound's loop value.
					sound = self._soundById(parseInt(args[0], 10));
					return sound ? sound._loop : false;
				}
			} else if (args.length === 2) {
				loop = args[0];
				id = parseInt(args[1], 10);
			}

			// If no id is passed, get all ID's to be looped.
			const ids = self._getSoundIds(id);
			for (let i = 0; i < ids.length; i++) {
				sound = self._soundById(ids[i]);

				if (sound) {
					sound._loop = loop;
					if (self._webAudio && sound._node && sound._node.bufferSource) {
						sound._node.bufferSource.loop = loop;
						if (loop) {
							sound._node.bufferSource.loopStart = sound._start || 0;
							sound._node.bufferSource.loopEnd = sound._stop;
						}
					}
				}
			}

			return self;
		},

		/**
     * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   rate() -> Returns the first sound node's current playback rate.
     *   rate(id) -> Returns the sound id's current playback rate.
     *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
     *   rate(rate, id) -> Sets the playback rate of passed sound id.
     * @return {Howl/Number} Returns self or the current playback rate.
     */
		rate() {
			const self = this;
			const args = arguments;
			let rate, id;

			// Determine the values based on arguments.
			if (args.length === 0) {
				// We will simply return the current rate of the first node.
				id = self._sounds[0]._id;
			} else if (args.length === 1) {
				// First check if this is an ID, and if not, assume it is a new rate value.
				const ids = self._getSoundIds();
				const index = ids.indexOf(args[0]);
				if (index >= 0) {
					id = parseInt(args[0], 10);
				} else {
					rate = parseFloat(args[0]);
				}
			} else if (args.length === 2) {
				rate = parseFloat(args[0]);
				id = parseInt(args[1], 10);
			}

			// Update the playback rate or return the current value.
			let sound;
			if (typeof rate === 'number') {
				// If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
				if (self._state !== 'loaded') {
          self._queue.push({
          	event: 'rate',
          	action() {
              self.rate.apply(self, args);
          	}
          });

          return self;
				}

				// Set the group rate.
				if (typeof id === 'undefined') {
					self._rate = rate;
				}

				// Update one or all volumes.
				id = self._getSoundIds(id);
				for (let i = 0; i < id.length; i++) {
					// Get the sound.
					sound = self._soundById(id[i]);

					if (sound) {
						// Keep track of our position when the rate changed and update the playback
						// start position so we can properly adjust the seek position for time elapsed.
						sound._rateSeek = self.seek(id[i]);
						sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
						sound._rate = rate;

						// Change the playback rate.
						if (self._webAudio && sound._node && sound._node.bufferSource) {
              sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
						} else if (sound._node) {
							sound._node.playbackRate = rate;
						}

						// Reset the timers.
						const seek = self.seek(id[i]);
						const duration = ((self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000) - seek;
						const timeout = (duration * 1000) / Math.abs(sound._rate);

						// Start a new end timer if sound is already playing.
						if (self._endTimers[id[i]] || !sound._paused) {
              self._clearTimer(id[i]);
              self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound), timeout);
						}

            self._emit('rate', sound._id);
					}
				}
			} else {
				sound = self._soundById(id);
				return sound ? sound._rate : self._rate;
			}

			return self;
		},

		/**
     * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   seek() -> Returns the first sound node's current seek position.
     *   seek(id) -> Returns the sound id's current seek position.
     *   seek(seek) -> Sets the seek position of the first sound node.
     *   seek(seek, id) -> Sets the seek position of passed sound id.
     * @return {Howl/Number} Returns self or the current seek position.
     */
		seek() {
			const self = this;
			const args = arguments;
			let seek, id;

			// Determine the values based on arguments.
			if (args.length === 0) {
				// We will simply return the current position of the first node.
				id = self._sounds[0]._id;
			} else if (args.length === 1) {
				// First check if this is an ID, and if not, assume it is a new seek position.
				const ids = self._getSoundIds();
				const index = ids.indexOf(args[0]);
				if (index >= 0) {
					id = parseInt(args[0], 10);
				} else if (self._sounds.length) {
					id = self._sounds[0]._id;
					seek = parseFloat(args[0]);
				}
			} else if (args.length === 2) {
				seek = parseFloat(args[0]);
				id = parseInt(args[1], 10);
			}

			// If there is no ID, bail out.
			if (typeof id === 'undefined') {
				return self;
			}

			// If the sound hasn't loaded, add it to the load queue to seek when capable.
			if (self._state !== 'loaded') {
        self._queue.push({
        	event: 'seek',
        	action() {
            self.seek.apply(self, args);
        	}
        });

        return self;
			}

			// Get the sound.
			const sound = self._soundById(id);

			if (sound) {
				if (typeof seek === 'number' && seek >= 0) {
					// Pause the sound and update position for restarting playback.
					const playing = self.playing(id);
					if (playing) {
            self.pause(id, true);
					}

					// Move the position of the track and cancel timer.
					sound._seek = seek;
					sound._ended = false;
          self._clearTimer(id);

          // Restart the playback if the sound was playing.
          if (playing) {
            self.play(id, true);
          }

          // Update the seek position for HTML5 Audio.
          if (!self._webAudio && sound._node) {
          	sound._node.currentTime = seek;
          }

          // Wait for the play lock to be unset before emitting (HTML5 Audio).
          if (playing && !self._webAudio) {
          	var emitSeek = function () {
          		if (!self._playLock) {
                self._emit('seek', id);
          		} else {
                setTimeout(emitSeek, 0);
          		}
          	};
            setTimeout(emitSeek, 0);
          } else {
            self._emit('seek', id);
          }
				} else {
					if (self._webAudio) {
						const realTime = self.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
						const rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
						return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
					}
					return sound._node.currentTime;
				}
			}

			return self;
		},

		/**
     * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
     * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
     * @return {Boolean} True if playing and false if not.
     */
		playing(id) {
			const self = this;

			// Check the passed sound ID (if any).
			if (typeof id === 'number') {
				const sound = self._soundById(id);
				return sound ? !sound._paused : false;
			}

			// Otherwise, loop through all sounds and check if any are playing.
			for (let i = 0; i < self._sounds.length; i++) {
				if (!self._sounds[i]._paused) {
					return true;
				}
			}

			return false;
		},

		/**
     * Get the duration of this sound. Passing a sound id will return the sprite duration.
     * @param  {Number} id The sound id to check. If none is passed, return full source duration.
     * @return {Number} Audio duration in seconds.
     */
		duration(id) {
			const self = this;
			let duration = self._duration;

			// If we pass an ID, get the sound and return the sprite length.
			const sound = self._soundById(id);
			if (sound) {
				duration = self._sprite[sound._sprite][1] / 1000;
			}

			return duration;
		},

		/**
     * Returns the current loaded state of this Howl.
     * @return {String} 'unloaded', 'loading', 'loaded'
     */
		state() {
			return this._state;
		},

		/**
     * Unload and destroy the current Howl object.
     * This will immediately stop all sound instances attached to this group.
     */
		unload() {
			let self = this;

			// Stop playing any active sounds.
			const sounds = self._sounds;
			for (var i = 0; i < sounds.length; i++) {
				// Stop the sound if it is currently playing.
				if (!sounds[i]._paused) {
          self.stop(sounds[i]._id);
				}

				// Remove the source or disconnect.
				if (!self._webAudio) {
					// Set the source to 0-second silence to stop any downloading (except in IE).
					const checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);
					if (!checkIE) {
						sounds[i]._node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
					}

          // Remove any event listeners.
          sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);
          sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);
				}

				// Empty out all of the nodes.
				delete sounds[i]._node;

        // Make sure all timers are cleared out.
        self._clearTimer(sounds[i]._id);

        // Remove the references in the global Howler object.
        const index = Howler._howls.indexOf(self);
        if (index >= 0) {
          Howler._howls.splice(index, 1);
        }
			}

			// Delete this sound from the cache (if no other Howl is using it).
			let remCache = true;
			for (i = 0; i < Howler._howls.length; i++) {
				if (Howler._howls[i]._src === self._src) {
					remCache = false;
					break;
				}
			}

			if (cache && remCache) {
				delete cache[self._src];
			}

			// Clear global errors.
			Howler.noAudio = false;

			// Clear out `self`.
			self._state = 'unloaded';
			self._sounds = [];
			self = null;

			return null;
		},

		/**
     * Listen to a custom event.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
     * @return {Howl}
     */
		on(event, fn, id, once) {
			const self = this;
			const events = self['_on' + event];

			if (typeof fn === 'function') {
        events.push(once ? {id, fn, once} : {id, fn});
			}

			return self;
		},

		/**
     * Remove a custom event. Call without parameters to remove all events.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to remove. Leave empty to remove all.
     * @param  {Number}   id    (optional) Only remove events for this sound.
     * @return {Howl}
     */
		off(event, fn, id) {
			const self = this;
			const events = self['_on' + event];
			let i = 0;

			// Allow passing just an event and ID.
			if (typeof fn === 'number') {
				id = fn;
				fn = null;
			}

			if (fn || id) {
				// Loop through event store and remove the passed function.
				for (i = 0; i < events.length; i++) {
					const isId = (id === events[i].id);
					if (fn === events[i].fn && isId || !fn && isId) {
            events.splice(i, 1);
            break;
					}
				}
			} else if (event) {
				// Clear out all events of this type.
				self['_on' + event] = [];
			} else {
				// Clear out all events of every type.
				const keys = Object.keys(self);
				for (i = 0; i < keys.length; i++) {
					if ((keys[i].indexOf('_on') === 0) && Array.isArray(self[keys[i]])) {
						self[keys[i]] = [];
					}
				}
			}

			return self;
		},

		/**
     * Listen to a custom event and remove it once fired.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @return {Howl}
     */
		once(event, fn, id) {
			const self = this;

      // Setup the event listener.
      self.on(event, fn, id, 1);

      return self;
		},

		/**
     * Emit all events of a specific type and pass the sound id.
     * @param  {String} event Event name.
     * @param  {Number} id    Sound ID.
     * @param  {Number} msg   Message to go with event.
     * @return {Howl}
     */
		_emit(event, id, msg) {
			const self = this;
			const events = self['_on' + event];

			// Loop through event store and fire all functions.
			for (let i = events.length - 1; i >= 0; i--) {
				// Only fire the listener if the correct ID is used.
				if (!events[i].id || events[i].id === id || event === 'load') {
          setTimeout(function (fn) {
            fn.call(this, id, msg);
          }.bind(self, events[i].fn), 0);

          // If this event was setup with `once`, remove it.
          if (events[i].once) {
            self.off(event, events[i].fn, events[i].id);
          }
				}
			}

      // Pass the event type into load queue so that it can continue stepping.
      self._loadQueue(event);

      return self;
		},

		/**
     * Queue of actions initiated before the sound has loaded.
     * These will be called in sequence, with the next only firing
     * after the previous has finished executing (even if async like play).
     * @return {Howl}
     */
		_loadQueue(event) {
			const self = this;

			if (self._queue.length > 0) {
				const task = self._queue[0];

				// Remove this task if a matching event was passed.
				if (task.event === event) {
          self._queue.shift();
          self._loadQueue();
				}

				// Run the task if no event type is passed.
				if (!event) {
          task.action();
				}
			}

			return self;
		},

		/**
     * Fired when playback ends at the end of the duration.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
		_ended(sound) {
			const self = this;
			const sprite = sound._sprite;

			// If we are using IE and there was network latency we may be clipping
			// audio before it completes playing. Lets check the node to make sure it
			// believes it has completed, before ending the playback.
			if (!self._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
        setTimeout(self._ended.bind(self, sound), 100);
        return self;
			}

			// Should this sound loop?
			const loop = Boolean(sound._loop || self._sprite[sprite][2]);

      // Fire the ended event.
      self._emit('end', sound._id);

      // Restart the playback for HTML5 Audio loop.
      if (!self._webAudio && loop) {
        self.stop(sound._id, true).play(sound._id);
      }

      // Restart this timer if on a Web Audio loop.
      if (self._webAudio && loop) {
        self._emit('play', sound._id);
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        sound._playStart = Howler.ctx.currentTime;

        const timeout = ((sound._stop - sound._start) * 1000) / Math.abs(sound._rate);
        self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
      }

      // Mark the node as paused.
      if (self._webAudio && !loop) {
      	sound._paused = true;
      	sound._ended = true;
      	sound._seek = sound._start || 0;
      	sound._rateSeek = 0;
        self._clearTimer(sound._id);

        // Clean up the buffer source.
        self._cleanBuffer(sound._node);

        // Attempt to auto-suspend AudioContext if no sounds are still playing.
        Howler._autoSuspend();
      }

      // When using a sprite, end the track.
      if (!self._webAudio && !loop) {
        self.stop(sound._id);
      }

      return self;
		},

		/**
     * Clear the end timer for a sound playback.
     * @param  {Number} id The sound ID.
     * @return {Howl}
     */
		_clearTimer(id) {
			const self = this;

			if (self._endTimers[id]) {
				// Clear the timeout or remove the ended listener.
				if (typeof self._endTimers[id] !== 'function') {
          clearTimeout(self._endTimers[id]);
				} else {
					const sound = self._soundById(id);
					if (sound && sound._node) {
            sound._node.removeEventListener('ended', self._endTimers[id], false);
					}
				}

				delete self._endTimers[id];
			}

			return self;
		},

		/**
     * Return the sound identified by this ID, or return null.
     * @param  {Number} id Sound ID
     * @return {Object}    Sound object or null.
     */
		_soundById(id) {
			const self = this;

			// Loop through all sounds and find the one with this ID.
			for (let i = 0; i < self._sounds.length; i++) {
				if (id === self._sounds[i]._id) {
					return self._sounds[i];
				}
			}

			return null;
		},

		/**
     * Return an inactive sound from the pool or create a new one.
     * @return {Sound} Sound playback object.
     */
		_inactiveSound() {
			const self = this;

      self._drain();

      // Find the first inactive node to recycle.
      for (let i = 0; i < self._sounds.length; i++) {
      	if (self._sounds[i]._ended) {
      		return self._sounds[i].reset();
      	}
      }

      // If no inactive node was found, create a new one.
      return new Sound(self);
		},

		/**
     * Drain excess inactive sounds from the pool.
     */
		_drain() {
			const self = this;
			const limit = self._pool;
			let cnt = 0;
			let i = 0;

			// If there are less sounds than the max pool size, we are done.
			if (self._sounds.length < limit) {
				return;
			}

			// Count the number of inactive sounds.
			for (i = 0; i < self._sounds.length; i++) {
				if (self._sounds[i]._ended) {
					cnt++;
				}
			}

			// Remove excess inactive sounds, going in reverse order.
			for (i = self._sounds.length - 1; i >= 0; i--) {
				if (cnt <= limit) {
					return;
				}

				if (self._sounds[i]._ended) {
					// Disconnect the audio source when using Web Audio.
					if (self._webAudio && self._sounds[i]._node) {
            self._sounds[i]._node.disconnect(0);
					}

          // Remove sounds until we have the pool size.
          self._sounds.splice(i, 1);
          cnt--;
				}
			}
		},

		/**
     * Get all ID's from the sounds pool.
     * @param  {Number} id Only return one ID if one is passed.
     * @return {Array}    Array of IDs.
     */
		_getSoundIds(id) {
			const self = this;

			if (typeof id === 'undefined') {
				const ids = [];
				for (let i = 0; i < self._sounds.length; i++) {
          ids.push(self._sounds[i]._id);
				}

				return ids;
			}
			return [id];
		},

		/**
     * Load the sound back into the buffer source.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
		_refreshBuffer(sound) {
			const self = this;

			// Setup the buffer source for playback.
			sound._node.bufferSource = Howler.ctx.createBufferSource();
			sound._node.bufferSource.buffer = cache[self._src];

			// Connect to the correct node.
			if (sound._panner) {
        sound._node.bufferSource.connect(sound._panner);
			} else {
        sound._node.bufferSource.connect(sound._node);
			}

			// Setup looping and playback rate.
			sound._node.bufferSource.loop = sound._loop;
			if (sound._loop) {
				sound._node.bufferSource.loopStart = sound._start || 0;
				sound._node.bufferSource.loopEnd = sound._stop;
			}
      sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler.ctx.currentTime);

      return self;
		},

		/**
     * Prevent memory leaks by cleaning up the buffer source after playback.
     * @param  {Object} node Sound's audio node containing the buffer source.
     * @return {Howl}
     */
		_cleanBuffer(node) {
			const self = this;

			if (Howler._scratchBuffer) {
				node.bufferSource.addEventListener('ended', null);
        node.bufferSource.disconnect(0);
        try {
        	node.bufferSource.buffer = Howler._scratchBuffer;
        } catch (e) {}
			}
			node.bufferSource = null;

			return self;
		}
	};

	/** Single Sound Methods **/
	/***************************************************************************/

	/**
   * Setup the sound object, which each node attached to a Howl group is contained in.
   * @param {Object} howl The Howl parent group.
   */
	var Sound = function (howl) {
		this._parent = howl;
    this.init();
	};
	Sound.prototype = {
		/**
     * Initialize a new Sound object.
     * @return {Sound}
     */
		init() {
			const self = this;
			const parent = self._parent;

			// Setup the default parameters.
			self._muted = parent._muted;
			self._loop = parent._loop;
			self._volume = parent._volume;
			self._rate = parent._rate;
			self._seek = 0;
			self._paused = true;
			self._ended = true;
			self._sprite = '__default';

			// Generate a unique ID for this sound.
			self._id = ++Howler._counter;

      // Add itself to the parent's pool.
      parent._sounds.push(self);

      // Create the new node.
      self.create();

      return self;
		},

		/**
     * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
     * @return {Sound}
     */
		create() {
			const self = this;
			const parent = self._parent;
			const volume = (Howler._muted || self._muted || self._parent._muted) ? 0 : self._volume;

			if (parent._webAudio) {
				// Create the gain node for controlling volume (the source will connect to this).
				self._node = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
        self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);
        self._node.paused = true;
        self._node.connect(Howler.masterGain);
			} else {
				self._node = new Audio();

				// Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).
				self._errorFn = self._errorListener.bind(self);
        self._node.addEventListener('error', self._errorFn, false);

        // Listen for 'canplaythrough' event to let us know the sound is ready.
        self._loadFn = self._loadListener.bind(self);
        self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false);

        // Setup the new audio node.
        self._node.src = parent._src;
        self._node.preload = 'auto';
        self._node.volume = volume * Howler.volume();

        // Begin loading the source.
        self._node.load();
			}

			return self;
		},

		/**
     * Reset the parameters of this sound to the original state (for recycle).
     * @return {Sound}
     */
		reset() {
			const self = this;
			const parent = self._parent;

			// Reset all of the parameters of this sound.
			self._muted = parent._muted;
			self._loop = parent._loop;
			self._volume = parent._volume;
			self._rate = parent._rate;
			self._seek = 0;
			self._rateSeek = 0;
			self._paused = true;
			self._ended = true;
			self._sprite = '__default';

			// Generate a new ID so that it isn't confused with the previous sound.
			self._id = ++Howler._counter;

			return self;
		},

		/**
     * HTML5 Audio error listener callback.
     */
		_errorListener() {
			const self = this;

      // Fire an error event and pass back the code.
      self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0);

      // Clear the event listener.
      self._node.removeEventListener('error', self._errorFn, false);
		},

		/**
     * HTML5 Audio canplaythrough listener callback.
     */
		_loadListener() {
			const self = this;
			const parent = self._parent;

			// Round up the duration to account for the lower precision in HTML5 Audio.
			parent._duration = Math.ceil(self._node.duration * 10) / 10;

			// Setup a sprite if none is defined.
			if (Object.keys(parent._sprite).length === 0) {
				parent._sprite = {__default: [0, parent._duration * 1000]};
			}

			if (parent._state !== 'loaded') {
				parent._state = 'loaded';
        parent._emit('load');
        parent._loadQueue();
			}

      // Clear the event listener.
      self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
		}
	};

	/** Helper Methods **/
	/***************************************************************************/

	var cache = {};

	/**
   * Buffer a sound from URL, Data URI or cache and decode to audio source (Web Audio API).
   * @param  {Howl} self
   */
	var loadBuffer = function (self) {
		const url = self._src;

		// Check if the buffer has already been cached and use it instead.
		if (cache[url]) {
			// Set the duration from the cache.
			self._duration = cache[url].duration;

      // Load the sound into this Howl.
      loadSound(self);

      return;
		}

		if (/^data:[^;]+;base64,/.test(url)) {
			// Decode the base64 data URI without XHR, since some browsers don't support it.
			const data = atob(url.split(',')[1]);
			const dataView = new Uint8Array(data.length);
			for (let i = 0; i < data.length; ++i) {
				dataView[i] = data.charCodeAt(i);
			}

      decodeAudioData(dataView.buffer, self);
		} else {
			// Load the buffer from the URL.
			const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.withCredentials = self._xhrWithCredentials;
      xhr.responseType = 'arraybuffer';
      xhr.addEventListener('load', () => {
      	// Make sure we get a successful response back.
      	const code = (String(xhr.status))[0];
      	if (code !== '0' && code !== '2' && code !== '3') {
          self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');
          return;
      	}

        decodeAudioData(xhr.response, self);
      });
      xhr.addEventListener('error', () => {
      	// If there is an error, switch to HTML5 Audio.
      	if (self._webAudio) {
      		self._html5 = true;
      		self._webAudio = false;
      		self._sounds = [];
      		delete cache[url];
          self.load();
      	}
      });
      safeXhrSend(xhr);
		}
	};

	/**
   * Send the XHR request wrapped in a try/catch.
   * @param  {Object} xhr XHR to send.
   */
	var safeXhrSend = function (xhr) {
		try {
      xhr.send();
		} catch (e) {
      xhr.onerror();
		}
	};

	/**
   * Decode audio data from an array buffer.
   * @param  {ArrayBuffer} arraybuffer The audio data.
   * @param  {Howl}        self
   */
	var decodeAudioData = function (arraybuffer, self) {
    // Decode the buffer into an audio source.
    Howler.ctx.decodeAudioData(arraybuffer, buffer => {
    	if (buffer && self._sounds.length > 0) {
    		cache[self._src] = buffer;
        loadSound(self, buffer);
    	}
    }, () => {
      self._emit('loaderror', null, 'Decoding audio data failed.');
    });
	};

	/**
   * Sound is now loaded, so finish setting everything up and fire the loaded event.
   * @param  {Howl} self
   * @param  {Object} buffer The decoded buffer sound source.
   */
	var loadSound = function (self, buffer) {
		// Set the duration.
		if (buffer && !self._duration) {
			self._duration = buffer.duration;
		}

		// Setup a sprite if none is defined.
		if (Object.keys(self._sprite).length === 0) {
			self._sprite = {__default: [0, self._duration * 1000]};
		}

		// Fire the loaded event.
		if (self._state !== 'loaded') {
			self._state = 'loaded';
      self._emit('load');
      self._loadQueue();
		}
	};

	/**
   * Setup the audio context when available, or switch to HTML5 Audio mode.
   */
	var setupAudioContext = function () {
		// Check if we are using Web Audio and setup the AudioContext if we are.
		try {
			if (typeof AudioContext !== 'undefined') {
				Howler.ctx = new AudioContext();
			} else if (typeof webkitAudioContext !== 'undefined') {
				Howler.ctx = new webkitAudioContext();
			} else {
				Howler.usingWebAudio = false;
			}
		} catch (e) {
			Howler.usingWebAudio = false;
		}

		// Check if a webview is being used on iOS8 or earlier (rather than the browser).
		// If it is, disable Web Audio as it causes crashing.
		const iOS = (/iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform));
		const appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
		const version = appVersion ? parseInt(appVersion[1], 10) : null;
		if (iOS && version && version < 9) {
			const safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());
			if (Howler._navigator && Howler._navigator.standalone && !safari || Howler._navigator && !Howler._navigator.standalone && !safari) {
				Howler.usingWebAudio = false;
			}
		}

		// Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).
		if (Howler.usingWebAudio) {
			Howler.masterGain = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
      Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : 1, Howler.ctx.currentTime);
      Howler.masterGain.connect(Howler.ctx.destination);
		}

    // Re-run the setup on Howler.
    Howler._setup();
	};

	// Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	if (typeof define === 'function' && define.amd) {
    define([], () => {
    	return {
    		Howler,
    		Howl
    	};
    });
	}

	// Add support for CommonJS libraries such as browserify.

	// Define globally in case AMD is not available or unused.
	if (typeof window !== 'undefined') {
		window.HowlerGlobal = HowlerGlobal;
		window.Howler = Howler;
		window.Howl = Howl;
		window.Sound = Sound;
	} else if (typeof global !== 'undefined') { // Add to global in Node.js (for testing, etc).
		global.HowlerGlobal = HowlerGlobal;
		global.Howler = Howler;
		global.Howl = Howl;
		global.Sound = Sound;
	}
})();

/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *
 *  howler.js v2.0.9
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function () {
	'use strict';

	// Setup default properties.
	HowlerGlobal.prototype._pos = [0, 0, 0];
	HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];

	/** Global Methods **/
	/***************************************************************************/

	/**
   * Helper method to update the stereo panning position of all current Howls.
   * Future Howls will not use this value unless explicitly set.
   * @param  {Number} pan A value of -1.0 is all the way left and 1.0 is all the way right.
   * @return {Howler/Number}     Self or current stereo panning value.
   */
	HowlerGlobal.prototype.stereo = function (pan) {
		const self = this;

		// Stop right here if not using Web Audio.
		if (!self.ctx || !self.ctx.listener) {
			return self;
		}

		// Loop through all Howls and update their stereo panning.
		for (let i = self._howls.length - 1; i >= 0; i--) {
      self._howls[i].stereo(pan);
		}

		return self;
	};

	/**
   * Get/set the position of the listener in 3D cartesian space. Sounds using
   * 3D position will be relative to the listener's position.
   * @param  {Number} x The x-position of the listener.
   * @param  {Number} y The y-position of the listener.
   * @param  {Number} z The z-position of the listener.
   * @return {Howler/Array}   Self or current listener position.
   */
	HowlerGlobal.prototype.pos = function (x, y, z) {
		const self = this;

		// Stop right here if not using Web Audio.
		if (!self.ctx || !self.ctx.listener) {
			return self;
		}

		// Set the defaults for optional 'y' & 'z'.
		y = (typeof y !== 'number') ? self._pos[1] : y;
		z = (typeof z !== 'number') ? self._pos[2] : z;

		if (typeof x === 'number') {
			self._pos = [x, y, z];
      self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
		} else {
			return self._pos;
		}

		return self;
	};

	/**
   * Get/set the direction the listener is pointing in the 3D cartesian space.
   * A front and up vector must be provided. The front is the direction the
   * face of the listener is pointing, and up is the direction the top of the
   * listener is pointing. Thus, these values are expected to be at right angles
   * from each other.
   * @param  {Number} x   The x-orientation of the listener.
   * @param  {Number} y   The y-orientation of the listener.
   * @param  {Number} z   The z-orientation of the listener.
   * @param  {Number} xUp The x-orientation of the top of the listener.
   * @param  {Number} yUp The y-orientation of the top of the listener.
   * @param  {Number} zUp The z-orientation of the top of the listener.
   * @return {Howler/Array}     Returns self or the current orientation vectors.
   */
	HowlerGlobal.prototype.orientation = function (x, y, z, xUp, yUp, zUp) {
		const self = this;

		// Stop right here if not using Web Audio.
		if (!self.ctx || !self.ctx.listener) {
			return self;
		}

		// Set the defaults for optional 'y' & 'z'.
		const or = self._orientation;
		y = (typeof y !== 'number') ? or[1] : y;
		z = (typeof z !== 'number') ? or[2] : z;
		xUp = (typeof xUp !== 'number') ? or[3] : xUp;
		yUp = (typeof yUp !== 'number') ? or[4] : yUp;
		zUp = (typeof zUp !== 'number') ? or[5] : zUp;

		if (typeof x === 'number') {
			self._orientation = [x, y, z, xUp, yUp, zUp];
      self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
		} else {
			return or;
		}

		return self;
	};

	/** Group Methods **/
	/***************************************************************************/

	/**
   * Add new properties to the core init.
   * @param  {Function} _super Core init method.
   * @return {Howl}
   */
	Howl.prototype.init = (function (_super) {
		return function (o) {
			const self = this;

			// Setup user-defined default properties.
			self._orientation = o.orientation || [1, 0, 0];
			self._stereo = o.stereo || null;
			self._pos = o.pos || null;
			self._pannerAttr = {
				coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : 360,
				coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : 360,
				coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : 0,
				distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : 'inverse',
				maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : 10000,
				panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : 'HRTF',
				refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : 1,
				rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : 1
			};

			// Setup event listeners.
			self._onstereo = o.onstereo ? [{fn: o.onstereo}] : [];
			self._onpos = o.onpos ? [{fn: o.onpos}] : [];
			self._onorientation = o.onorientation ? [{fn: o.onorientation}] : [];

			// Complete initilization with howler.js core's init function.
			return _super.call(this, o);
		};
	})(Howl.prototype.init);

	/**
   * Get/set the stereo panning of the audio source for this sound or all in the group.
   * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Number}    Returns self or the current stereo panning value.
   */
	Howl.prototype.stereo = function (pan, id) {
		const self = this;

		// Stop right here if not using Web Audio.
		if (!self._webAudio) {
			return self;
		}

		// If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.
		if (self._state !== 'loaded') {
      self._queue.push({
      	event: 'stereo',
      	action() {
          self.stereo(pan, id);
      	}
      });

      return self;
		}

		// Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.
		const pannerType = (typeof Howler.ctx.createStereoPanner === 'undefined') ? 'spatial' : 'stereo';

		// Setup the group's stereo panning if no ID is passed.
		if (typeof id === 'undefined') {
			// Return the group's stereo panning if no parameters are passed.
			if (typeof pan === 'number') {
				self._stereo = pan;
				self._pos = [pan, 0, 0];
			} else {
				return self._stereo;
			}
		}

		// Change the streo panning of one or all sounds in group.
		const ids = self._getSoundIds(id);
		for (let i = 0; i < ids.length; i++) {
			// Get the sound.
			const sound = self._soundById(ids[i]);

			if (sound) {
				if (typeof pan === 'number') {
					sound._stereo = pan;
					sound._pos = [pan, 0, 0];

					if (sound._node) {
						// If we are falling back, make sure the panningModel is equalpower.
						sound._pannerAttr.panningModel = 'equalpower';

						// Check if there is a panner setup and create a new one if not.
						if (!sound._panner || !sound._panner.pan) {
              setupPanner(sound, pannerType);
						}

						if (pannerType === 'spatial') {
              sound._panner.setPosition(pan, 0, 0);
						} else {
              sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
						}
					}

          self._emit('stereo', sound._id);
				} else {
					return sound._stereo;
				}
			}
		}

		return self;
	};

	/**
   * Get/set the 3D spatial position of the audio source for this sound or group relative to the global listener.
   * @param  {Number} x  The x-position of the audio source.
   * @param  {Number} y  The y-position of the audio source.
   * @param  {Number} z  The z-position of the audio source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial position: [x, y, z].
   */
	Howl.prototype.pos = function (x, y, z, id) {
		const self = this;

		// Stop right here if not using Web Audio.
		if (!self._webAudio) {
			return self;
		}

		// If the sound hasn't loaded, add it to the load queue to change position when capable.
		if (self._state !== 'loaded') {
      self._queue.push({
      	event: 'pos',
      	action() {
          self.pos(x, y, z, id);
      	}
      });

      return self;
		}

		// Set the defaults for optional 'y' & 'z'.
		y = (typeof y !== 'number') ? 0 : y;
		z = (typeof z !== 'number') ? -0.5 : z;

		// Setup the group's spatial position if no ID is passed.
		if (typeof id === 'undefined') {
			// Return the group's spatial position if no parameters are passed.
			if (typeof x === 'number') {
				self._pos = [x, y, z];
			} else {
				return self._pos;
			}
		}

		// Change the spatial position of one or all sounds in group.
		const ids = self._getSoundIds(id);
		for (let i = 0; i < ids.length; i++) {
			// Get the sound.
			const sound = self._soundById(ids[i]);

			if (sound) {
				if (typeof x === 'number') {
					sound._pos = [x, y, z];

					if (sound._node) {
						// Check if there is a panner setup and create a new one if not.
						if (!sound._panner || sound._panner.pan) {
              setupPanner(sound, 'spatial');
						}

            sound._panner.setPosition(x, y, z);
					}

          self._emit('pos', sound._id);
				} else {
					return sound._pos;
				}
			}
		}

		return self;
	};

	/**
   * Get/set the direction the audio source is pointing in the 3D cartesian coordinate
   * space. Depending on how direction the sound is, based on the `cone` attributes,
   * a sound pointing away from the listener can be quiet or silent.
   * @param  {Number} x  The x-orientation of the source.
   * @param  {Number} y  The y-orientation of the source.
   * @param  {Number} z  The z-orientation of the source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial orientation: [x, y, z].
   */
	Howl.prototype.orientation = function (x, y, z, id) {
		const self = this;

		// Stop right here if not using Web Audio.
		if (!self._webAudio) {
			return self;
		}

		// If the sound hasn't loaded, add it to the load queue to change orientation when capable.
		if (self._state !== 'loaded') {
      self._queue.push({
      	event: 'orientation',
      	action() {
          self.orientation(x, y, z, id);
      	}
      });

      return self;
		}

		// Set the defaults for optional 'y' & 'z'.
		y = (typeof y !== 'number') ? self._orientation[1] : y;
		z = (typeof z !== 'number') ? self._orientation[2] : z;

		// Setup the group's spatial orientation if no ID is passed.
		if (typeof id === 'undefined') {
			// Return the group's spatial orientation if no parameters are passed.
			if (typeof x === 'number') {
				self._orientation = [x, y, z];
			} else {
				return self._orientation;
			}
		}

		// Change the spatial orientation of one or all sounds in group.
		const ids = self._getSoundIds(id);
		for (let i = 0; i < ids.length; i++) {
			// Get the sound.
			const sound = self._soundById(ids[i]);

			if (sound) {
				if (typeof x === 'number') {
					sound._orientation = [x, y, z];

					if (sound._node) {
						// Check if there is a panner setup and create a new one if not.
						if (!sound._panner) {
							// Make sure we have a position to setup the node with.
							if (!sound._pos) {
								sound._pos = self._pos || [0, 0, -0.5];
							}

              setupPanner(sound, 'spatial');
						}

            sound._panner.setOrientation(x, y, z);
					}

          self._emit('orientation', sound._id);
				} else {
					return sound._orientation;
				}
			}
		}

		return self;
	};

	/**
   * Get/set the panner node's attributes for a sound or group of sounds.
   * This method can optionall take 0, 1 or 2 arguments.
   *   pannerAttr() -> Returns the group's values.
   *   pannerAttr(id) -> Returns the sound id's values.
   *   pannerAttr(o) -> Set's the values of all sounds in this Howl group.
   *   pannerAttr(o, id) -> Set's the values of passed sound id.
   *
   *   Attributes:
   *     coneInnerAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      inside of which there will be no volume reduction.
   *     coneOuterAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      outside of which the volume will be reduced to a constant value of `coneOuterGain`.
   *     coneOuterGain - (0 by default) A parameter for directional audio sources, this is the gain outside of the
   *                     `coneOuterAngle`. It is a linear value in the range `[0, 1]`.
   *     distanceModel - ('inverse' by default) Determines algorithm used to reduce volume as audio moves away from
   *                     listener. Can be `linear`, `inverse` or `exponential.
   *     maxDistance - (10000 by default) The maximum distance between source and listener, after which the volume
   *                   will not be reduced any further.
   *     refDistance - (1 by default) A reference distance for reducing volume as source moves further from the listener.
   *                   This is simply a variable of the distance model and has a different effect depending on which model
   *                   is used and the scale of your coordinates. Generally, volume will be equal to 1 at this distance.
   *     rolloffFactor - (1 by default) How quickly the volume reduces as source moves from listener. This is simply a
   *                     variable of the distance model and can be in the range of `[0, 1]` with `linear` and `[0, ∞]`
   *                     with `inverse` and `exponential`.
   *     panningModel - ('HRTF' by default) Determines which spatialization algorithm is used to position audio.
   *                     Can be `HRTF` or `equalpower`.
   *
   * @return {Howl/Object} Returns self or current panner attributes.
   */
	Howl.prototype.pannerAttr = function () {
		const self = this;
		const args = arguments;
		let o, id, sound;

		// Stop right here if not using Web Audio.
		if (!self._webAudio) {
			return self;
		}

		// Determine the values based on arguments.
		if (args.length === 0) {
			// Return the group's panner attribute values.
			return self._pannerAttr;
		} if (args.length === 1) {
			if (typeof args[0] === 'object') {
				o = args[0];

				// Set the grou's panner attribute values.
				if (typeof id === 'undefined') {
					if (!o.pannerAttr) {
						o.pannerAttr = {
							coneInnerAngle: o.coneInnerAngle,
							coneOuterAngle: o.coneOuterAngle,
							coneOuterGain: o.coneOuterGain,
							distanceModel: o.distanceModel,
							maxDistance: o.maxDistance,
							refDistance: o.refDistance,
							rolloffFactor: o.rolloffFactor,
							panningModel: o.panningModel
						};
					}

					self._pannerAttr = {
						coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== 'undefined' ? o.pannerAttr.coneInnerAngle : self._coneInnerAngle,
						coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== 'undefined' ? o.pannerAttr.coneOuterAngle : self._coneOuterAngle,
						coneOuterGain: typeof o.pannerAttr.coneOuterGain !== 'undefined' ? o.pannerAttr.coneOuterGain : self._coneOuterGain,
						distanceModel: typeof o.pannerAttr.distanceModel !== 'undefined' ? o.pannerAttr.distanceModel : self._distanceModel,
						maxDistance: typeof o.pannerAttr.maxDistance !== 'undefined' ? o.pannerAttr.maxDistance : self._maxDistance,
						refDistance: typeof o.pannerAttr.refDistance !== 'undefined' ? o.pannerAttr.refDistance : self._refDistance,
						rolloffFactor: typeof o.pannerAttr.rolloffFactor !== 'undefined' ? o.pannerAttr.rolloffFactor : self._rolloffFactor,
						panningModel: typeof o.pannerAttr.panningModel !== 'undefined' ? o.pannerAttr.panningModel : self._panningModel
					};
				}
			} else {
				// Return this sound's panner attribute values.
				sound = self._soundById(parseInt(args[0], 10));
				return sound ? sound._pannerAttr : self._pannerAttr;
			}
		} else if (args.length === 2) {
			o = args[0];
			id = parseInt(args[1], 10);
		}

		// Update the values of the specified sounds.
		const ids = self._getSoundIds(id);
		for (let i = 0; i < ids.length; i++) {
			sound = self._soundById(ids[i]);

			if (sound) {
				// Merge the new values into the sound.
				let pa = sound._pannerAttr;
				pa = {
					coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : pa.coneInnerAngle,
					coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : pa.coneOuterAngle,
					coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : pa.coneOuterGain,
					distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : pa.distanceModel,
					maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : pa.maxDistance,
					refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : pa.refDistance,
					rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : pa.rolloffFactor,
					panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : pa.panningModel
				};

				// Update the panner values or create a new panner if none exists.
				const panner = sound._panner;
				if (panner) {
					panner.coneInnerAngle = pa.coneInnerAngle;
					panner.coneOuterAngle = pa.coneOuterAngle;
					panner.coneOuterGain = pa.coneOuterGain;
					panner.distanceModel = pa.distanceModel;
					panner.maxDistance = pa.maxDistance;
					panner.refDistance = pa.refDistance;
					panner.rolloffFactor = pa.rolloffFactor;
					panner.panningModel = pa.panningModel;
				} else {
					// Make sure we have a position to setup the node with.
					if (!sound._pos) {
						sound._pos = self._pos || [0, 0, -0.5];
					}

          // Create a new panner node.
          setupPanner(sound, 'spatial');
				}
			}
		}

		return self;
	};

	/** Single Sound Methods **/
	/***************************************************************************/

	/**
   * Add new properties to the core Sound init.
   * @param  {Function} _super Core Sound init method.
   * @return {Sound}
   */
	Sound.prototype.init = (function (_super) {
		return function () {
			const self = this;
			const parent = self._parent;

			// Setup user-defined default properties.
			self._orientation = parent._orientation;
			self._stereo = parent._stereo;
			self._pos = parent._pos;
			self._pannerAttr = parent._pannerAttr;

      // Complete initilization with howler.js core Sound's init function.
      _super.call(this);

      // If a stereo or position was specified, set it up.
      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      }
		};
	})(Sound.prototype.init);

	/**
   * Override the Sound.reset method to clean up properties from the spatial plugin.
   * @param  {Function} _super Sound reset method.
   * @return {Sound}
   */
	Sound.prototype.reset = (function (_super) {
		return function () {
			const self = this;
			const parent = self._parent;

			// Reset all spatial plugin properties on this sound.
			self._orientation = parent._orientation;
			self._pos = parent._pos;
			self._pannerAttr = parent._pannerAttr;

			// Complete resetting of the sound.
			return _super.call(this);
		};
	})(Sound.prototype.reset);

	/** Helper Methods **/
	/***************************************************************************/

	/**
   * Create a new panner node and save it on the sound.
   * @param  {Sound} sound Specific sound to setup panning on.
   * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
   */
	var setupPanner = function (sound, type) {
		type = type || 'spatial';

		// Create the new panner node.
		if (type === 'spatial') {
			sound._panner = Howler.ctx.createPanner();
			sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
			sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
			sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
			sound._panner.distanceModel = sound._pannerAttr.distanceModel;
			sound._panner.maxDistance = sound._pannerAttr.maxDistance;
			sound._panner.refDistance = sound._pannerAttr.refDistance;
			sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
			sound._panner.panningModel = sound._pannerAttr.panningModel;
      sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
      sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
		} else {
			sound._panner = Howler.ctx.createStereoPanner();
      sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
		}

    sound._panner.connect(sound._node);

    // Update the connections.
    if (!sound._paused) {
      sound._parent.pause(sound._id, true).play(sound._id, true);
    }
	};
})();

if (typeof exports !== 'undefined') {
	exports.Howler = Howler;
	exports.Howl = Howl;
}

},{}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KeyboardInput = undefined;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _tts = require('./tts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';
class KeyboardInput {
	constructor() {
		this.keyDown = [];
		this.justPressed = [];
		this.chars = [];
		this.justReleased = [];
		this.justPressedEventCallback = null;
		this.charEventCallback = null;
	}

	init() {
		const that = this;
		// 		$(document).keydown(function(event) { that.handleKeyDown(event); });
		// 		$(document).keyup(function(event) { that.handleKeyUp(event); });
		document.addEventListener('keydown', event => {
			that.handleKeyDown(event);
		});
		document.addEventListener('keyup', event => {
			that.handleKeyUp(event);
		});
		document.addEventListener('keypress', event => {
			that.handleChar(event);
		});
	}

	handleKeyDown(event) {
		if (this.keyDown[event.which] != true || typeof this.keyDown[event.which] === 'undefined') {
			this.keyDown[event.which] = true;
			this.justPressed[event.which] = true;
			this.justReleased[event.which] = false;
			if (typeof this.justPressedEventCallback !== 'undefined' && this.justPressedEventCallback != null) {
				this.justPressedEventCallback(event.which);
			}
		}
	}

	handleChar(char) {
		if (char.which < 48 || char.which > 122) {
			return;
		}
		if (String.fromCharCode(char.which) != '') {
			this.chars += String.fromCharCode(char.which);
			if (typeof this.charEventCallback !== 'undefined' && this.charEventCallback != null) {
				this.charEventCallback(String.fromCharCode(char.which));
			}
		}
	}

	handleKeyUp(event) {
		if (this.keyDown[event.which] == true) {
			this.keyDown[event.which] = false;
			this.justPressed[event.which] = false;
			this.justReleased[event.which] = true;
		}
		this.chars = '';
	}

	isDown(event) {
		return this.keyDown[event];
	}

	isJustPressed(event) {
		if (this.justPressed[event] == true) {
			this.justPressed[event] = false;
			return true;
		}
		return false;
	}

	isJustReleased(event) {
		if (this.justReleased[event]) {
			this.justReleased[event] = false;
			return true;
		}
		return false;
	}

	keysDown() {
		const kd = [];
		this.keyDown.forEach((v, i) => {
			if (v) {
				kd.push(i);
			}
		});
		return kd;
	}

	getChars() {
		const kd = this.chars;
		this.chars = '';
		return kd;
	}

	keysPressed() {
		const kd = [];
		this.justPressed.forEach((v, i) => {
			if (v) {
				kd.push(i);
			}
		});
		this.justPressed.splice();
		return kd;
	}

	releaseAllKeys() {}

	keysReleased() {
		const kd = [];
		this.justReleased.forEach((v, i) => {
			if (v) {
				kd.push(i);
			}
		});
		this.justReleased.splice();
		return kd;
	}
}

exports.KeyboardInput = KeyboardInput;
},{"./tts":12}],16:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
if (typeof KeyEvent === 'undefined') {
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
},{}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
class GameUtils {
	progressPan(current, max) {
		return (current * 200 / max - 100) / 100;
	}
	progressPitch(current, max) {
		return current * 200 / max / 100;
	}
	distance3D(x1, y1, z1, x2, y2, z2) {
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
	}

	distance(jx, jy, kx, ky) {
		// Return Math.hypot(jx-kx, jy-ky)
		return Math.sqrt((jx - kx) * (jx - kx) + (jy - ky) * (jy - ky));
	}

	calculateAngle(x1, y1, x2, y2) {
		let angle = Math.atan2(y2 - y1, x2 - x1);
		angle = angle >= 0 ? 0 : 2 * Math.PI + angle;
		return angle;
		// Return Math.atan2((y2 - y1),(x2 - x1));
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
	percentOf(int1, int2) {
		return int2 * int1 / 100;
	}

	average(arr, startIndex = 0) {
		let len = arr.length;
		let val = 0;
		let average = 0;
		if (arr.length < startIndex) return -1;
		for (let i = startIndex; i < arr.length; i++) {
			val += arr[i];
		}
		average = val / (len - startIndex);
		return average;
	}
	averageInt(arr, startIndex = 0) {
		let len = arr.length;
		let val = 0;
		let average = 0;
		if (arr.length < startIndex) return -1;
		for (let i = startIndex; i < arr.length; i++) {
			val += arr[i];
		}
		average = val / (len - startIndex);
		return Math.floor(average);
	}

	neg(num) {
		return num >= 0 ? num == 0 ? 0 : 1 : -1;
	}

	numericSort(a, b) {
		return a < b ? -1 : a == b ? 0 : 1;
	}
	shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}
}
var utils = exports.utils = new GameUtils();
},{}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.so = undefined;

var _howler = require('./howler');

var _input = require('./input');

var _keycodes = require('./keycodes');

var _utilities = require('./utilities');

var _tts = require('./tts');

const isElectron = true;
let playOnceTimer;
class SoundObjectItem {
	constructor(file, callback = 0, tag = 0, stream = false) {
		const that = this;
		this.fileName = file;
		this.sound = new _howler.Howl({
			src: file,
			html5: stream,
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

	playWait() {
		let inp = new _input.KeyboardInput();
		inp.init();
		this.sound.play();
		inp.justPressedEventCallback = evt => {
			this.sound.stop();
			inp.justPressedEventCallback = null;
		};
		return new Promise((resolve, reject) => {
			this.sound.once("end", () => {
				this.sound.unload();
				resolve("ok");
				inp.justPressedEventCallback = null;
			}); //end
			this.sound.once("stop", () => {
				this.sound.unload();
				resolve("ok");
				inp.justPressedEventCallback = null;
			}); //stop
		}); //promise
	}
	stop() {
		this.sound.stop();
	}

	pause() {
		this.sound.pause();
	}

	destroy() {
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
	get pan() {
		return this.sound.stereo();
	}

	set pan(v) {
		return this.sound.stereo(v);
	}

	set loop(v) {
		return this.sound.loop(v);
	}
	get active() {
		if (this.sound.state() == "unloaded") return false;
		if (this.sound.state() == "loaded") return true;
		if (this.sound.state() == "loading") return true;
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
	get pitch() {
		return this.sound.rate();
	}

	set pitch(v) {
		return this.sound.rate(v);
	}

	get currentTime() {
		return this.sound.seek();
	}

	get duration() {
		return this.sound.duration() * 1000;
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

	create(file, stream = false) {
		file = this.directory + file + this.extension;
		let returnObject = null;
		const that = this;
		returnObject = new SoundObjectItem(file, () => {
			that.doneLoading();
		}, 0, stream);
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
			this.sounds.push(new SoundObjectItem(this.queue[0], () => {
				that.handleQueue();
			}, 1));
			this.queue.splice(0, 1);
		} else {
			this.loadingQueue = false;
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
					_tts.speech.speak('destroyed.' + toDestroy[i]);
				}
			}
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
		_howler.Howler.unload();
		if (callback != 0) {
			callback();
		}
	}
}
const so = new SoundObject();
exports.so = so;
},{"./howler":19,"./input":4,"./keycodes":16,"./utilities":13,"./tts":12}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundSource = undefined;

var _howler = require('./howler');

var _soundObject = require('./soundObject.js');

// Meow.panner.defaults= {
//     panningModel:'HRTF',
// 	maxDistance:2000
//
//
// };

class SoundSource {
	constructor(file, x = 0, y = 0, z = 0, loop = true) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.loop = loop;
		this.sound = _soundObject.so.create(file);

		this.sound.loop = loop;
		this.sound.pos(this.x, this.y, this.z);
		this.rate = 1;
		this.speed = 0;
		this.minRate = 0.8;
		this.maxRate = 1.2;
		this.toDestroy = false;
		this.rateShiftSpeed = 0.015;
		// This.sound.currentPosition = getRandomArbitrary(0, this.sound.duration);
		this.sound.currentPosition = 0;
	}

	play() {
		// This.sound.seek(0);
		this.sound.play();
	}

	pos(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.sound.pos(this.x, this.y, this.z);
	}

	update() {}

	setDoppler(z1, speed, direction) {
		if (speed >= 0) {
			if (direction == -1) {
				speed += this.speed;
				// This.rate = 1+Math.sin(((speed/10000)*(this.z-z1)));
				var freq = 44100 * (1 - speed / 240);
				this.rate = freq / 44100;
			} else {
				speed += this.speed;
				// This.rate = 1-Math.sin(((speed/10000)*(z1-this.z)));
				var freq = 44100 / (1 - speed / 240);
				this.rate = freq / 44100;
			}
		} else {
			this.rate = 1;
		}

		// If (this.rate > this.maxRate) this.rate = this.maxRate;
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
		this.sound.unload();
		this.toDestroy = true;
	}
}

exports.SoundSource = SoundSource;
},{"./howler":19,"./soundObject.js":14}],11:[function(require,module,exports) {
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

	playStatic(file, loop = 1, slot = -1, stream = false) {
		if (slot = -1) {
			slot = this.findFreeStaticSlot();
		}
		this.staticSounds[slot] = new SoundItem(file, this.directional, stream);
		if (loop == 1) {
			this.staticSounds[slot].sound.loop = true;
		}
		this.staticSounds[slot].sound.play();
		return slot;
	}

	findFreeStaticSlot() {
		for (let i = 0; i < this.maxStaticSounds; i++) {
			if (this.staticSounds[i] == -1 || typeof this.staticSounds[i] === 'undefined') {
				return i;
			}
		}
		if (this.currentStaticSound < this.maxStaticSounds) {
			this.currentStaticSound++;
			return this.currentStaticSound;
		}
		this.currentStaticSound = 0;
		return this.currentStaticSound;
	}

	findFreeDynamicSlot() {
		for (let i = 0; i < this.maxDynamicSounds; i++) {
			if (this.dynamicSounds[i] == -1 || typeof this.dynamicSounds[i] === 'undefined') {
				return i;
			}
		}
		if (this.currentDynamicSound < this.maxDynamicSounds) {
			this.currentDynamicSound++;
			return this.currentDynamicSound;
		}
		this.currentDynamicSound = 0;
		return this.currentDynamicSound;
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
		if (typeof this.dynamicSounds[slot] === 'undefined') {
			if (reuse == false) {
				this.dynamicSounds[slot] = new SoundItem(file, this.directional);
			}
		} else if (reuse == false) {
			this.dynamicSounds[slot].sound.destroy();
			this.dynamicSounds[slot] = new SoundItem(file, directional);
		}
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
			this.dynamicSounds[i].destroy();
			this.dynamicSounds.splice(i, 1);
		}

		for (var i = 0; i < this.staticSounds.length; i++) {
			this.staticSounds[i].destroy();
			this.staticSounds.splice(i, 1);
		}
	}
}
class SoundItem {
	constructor(file, threeD = false, stream = false) {
		this.file = file;
		this.threeD = threeD;
		if (this.threeD == true) {
			this.sound = new _soundSource.SoundSource(file, 0, 0, 0);
		} else {
			this.sound = _soundObject.so.create(file, stream);
		}
	}

	destroy() {
		this.sound.destroy();
	}
}

exports.SoundHandler = SoundHandler;
},{"./soundSource.js":17,"./soundObject.js":14}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MenuTypes = exports.SelectorItem = exports.SliderItem = exports.MenuItem = undefined;

var _tts = require('./tts');

if (typeof speech === 'undefined') {
	var speech = new _tts.TTS();
}
const MenuTypes = {
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
		speech.speak(this.name + '. Selector. Set to ' + this.options[this.currentOption]);
	}

	increase() {
		if (this.currentOption < this.options.length - 1) {
			this.currentOption++;
		}
		speech.speak(this.options[this.currentOption]);
		if (typeof this.selectCallback !== 'undefined') {
			this.selectCallback(this.options[this.currentOption]);
		}
	}

	decrease() {
		if (this.currentOption > 0) {
			this.currentOption--;
		}
		speech.speak(this.options[this.currentOption]);
		if (typeof this.selectCallback !== 'undefined') {
			this.selectCallback(this.options[this.currentOption]);
		}
	}

	select() {
		return this.id;
	}
}

class SliderItem extends MenuItem {
	constructor(id, name, from, to, currentValue = 0, increaseBy = 1) {
		super();
		this.id = id;
		this.name = name;
		this.minValue = from;
		this.maxValue = to;
		this.currentValue = currentValue;
		this.increaseBy = increaseBy;
		this.type = MenuTypes.SLIDER;
	}

	speak() {
		speech.speak(this.name + '. Slider. Set to ' + this.currentValue);
	}

	increase() {
		if (this.currentValue < this.maxValue) {
			this.currentValue += this.increaseBy;
		}
		if (this.currentValue > this.maxValue) this.currentValue = this.maxValue;
		speech.speak(this.currentValue);
	}

	decrease() {
		if (this.currentValue > this.minValue) {
			this.currentValue -= this.increaseBy;
		}
		if (this.currentValue < this.minValue) this.currentValue = this.minValue;
		speech.speak(this.currentValue);
	}

	select() {
		return this.id;
	}
}

class EditItem extends MenuItem {
	constructor(id, name, defaultText = '') {
		super();
		this.id = id;
		this.name = name;
		this.text = defaultText;
		this.type = MenuTypes.EDIT;
	}

	speak() {
		speech.speak(this.name + '. Editable. ' + (this.text == '' ? 'Nothing entered.' : 'Set to ' + this.text));
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
exports.SliderItem = SliderItem;
exports.SelectorItem = SelectorItem;
exports.MenuTypes = MenuTypes;
},{"./tts":12}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.strings = undefined;

var _main = require('./main');

class Strings {
	constructor() {
		this.strings = {};
		this.strings[1] = {
			mPackTut: "Pack making tutorial",
			packtut: `Welcome to the pack editor!
First, thank you very much for wanting to create a pack.
It is very simple. You will be instructed to select whether you want to create a pack from the beginning or, if you already have a times file, called bpm.txt in your pack, you can change one of the levels by using the menu.
Once you have selected what to do, you will hear the music for the selected levels.
You will have to press the space bar at the speed you wish the level to go. Each press of the space bar is one cycle of the game, meaning that you have this amount of time to press the correct key
After you do this 10 times, the music will restart and you will hear your result.
You will hear a sound which will play on every cycle. Think of this cycle as if you were playing the game. Is this enough time for you to press the key? Is it in sync with the music?
If you are not satisfied with the result, you can press the space bar again to reset the time and start again.
Once you are satisfied, press enter. The next music will play.
Once all the levels are done, the file bpm.txt will be created (or voerwritten).
Note that you will have to put the pack in your user folder/beatpacks if you want to play it, and unlock it as normal.
You can upload your pack via the website by making a zip file of the pack's folder and sending it via the upload form.`,
			startOver: "Start over from the first level",
			mSelectEdit: "Please select which level to edit, or start over",
			selectPack: "Please select a pack to edit",
			floop: "Music for the main menu",
			fa1: "Sound for the freeze action, also known as quiet action or stop action. This has no o sound because no key is needed",
			fa2: "Sound for the space key action instruction",
			fo2: "Sound for the space key action",
			fa3: "Sound for the tab key action instruction",
			fo3: "Sound for the tab key action",
			fselect: "Sound played when an action of the main menu is pressed",
			fa4: "Sound for the enter key action instruction",
			fo4: "Sound for the enter key action",
			fa5: "Sound for the backspace key action instruction",
			fo5: "Sound for the backspace key action",
			fa6: "Sound for the up arrow key action instruction",
			fo6: "Sound for the up arrow key action",
			fa7: "Sound for the down arrow key action instruction",
			fo7: "Sound for the down arrow key action",
			fa8: "Sound for the right arrow key action instruction",
			fo8: "Sound for the right arrow key action",
			fa9: "Sound for the left arrow key action instruction",
			fo9: "Sound for the left arrow key action",

			fwin: "Sound played upon completing all levels",
			fnlevel: "Sound which is played at the beginning of each level for which there is no pre sound. If neither pre nor nlevel are provided no extra sounds will be played before a level",
			fpre1: "pre + a level's number (pre1,pre2) will be played before a level begins. Can be useful in certain situations. If neither pre nor nlevel.ogg is provided, the game will continue with the next level with no extra sounds.",
			fcredits: "The credits are played only once, after playing the pack one time.",
			missingFiles: "The following files are missing and must be added before your pack can be edited",
			missingOptional: "The following files are missing from your pack, but are not strictly required to play. You can skip the arrow key actions, as most packs only have the usual 4 actions.",
			fname: "File which contains the preview sound used in menus",
			fboot: "This fail is played when the pack is ran for the first time, before reaching the main menu.",
			ffail: "This file is played upon failing, when the game ends",
			f1music: "Levels for the game. They must be loops so that the game can synchronize properly. At least 3 levels are required. The format is levelnumber+music, like 1music, 2music, 3music, 4music...",
			f2music: "Levels for the game. They must be loops so that the game can synchronize properly. At least 3 levels are required. The format is levelnumber+music, like 1music, 2music, 3music, 4music...",
			f3music: "Levels for the game. They must be loops so that the game can synchronize properly. At least 3 levels are required. The format is levelnumber+music, like 1music, 2music, 3music, 4music...",
			safeget: "You get %1 safeguards... cool!",
			lang: "English",
			langs: "Select your language",
			codescracked: "You managed to crack %1 codes, with %2 different actions!",
			mEdit: "Pack Editor",
			tutslot: `Welcome!
Evil slots is very evil indeed.
This game uses the action sounds from your pack to play a 3 wheel slot machine.
If the pack you are currently playing has more than 5 actions, don't worry only the first 5 will be used.
The first thing you will need to do is place a bet. The minimum is 5000 beatcoins. When you place a bet, those beatcoins will be deducted from your current beatcoins.
Once you have done that, a wheel will spin, and 3 action sounds will play.
But this is not a normal slots! This game is evil and, if you lose, the rest of your beatcoins will not be left alone.
If you get 3 of different types, you lose beatcoins based on your bet and how much you still have. If you have 0, of course nothing will happen.
!slot_lose_2
If you get 2 of the same type and 1 of a different type, you will get... half your bet back, perhaps a bit more.
!slot_lose_1
If the first 2 are of the same type, there is a small chance that the third one will be the quiet action (the action of the pack where you must not press any key). If this happens you will get around 25% of your bet back. Because I am evil.
!slot_lose_3
However, if you get 3 of the same type, you will win your bet + 80 to 100 percent of the original bet!
!slot_win_3
Have fun playing evil slots!`,
			"mFound": "Found %1 new packs: what do you wish to do?",
			mGames: "minigames",
			mGameTuts: "Minigame tutorials",
			sGames: "Select a minigame to play",
			sTuts: "Select a minigame to view help",
			cost: "Price",
			slot: "Evil slots",
			unlocked: "Already bought",
			buygame: "Do  you want to buy %1 for %2 beatcoins?",
			bet: "Please place your bet with the left and right arrow keys and press enter when you have decided.",
			nogame: "You don't have the required %1 beatcoins for this game, you only have %2.",
			mainmenu: "main menu",
			mSelect: "Please select",
			mSafeSelect: "Please select, with the right and left arrow keys, how many safeguards you want to buy and press enter.",
			level: "Level %1",
			codes: "Number of keys in the code: %1",
			packprice: "This pack costs %1 beatcoins, please confirm",
			mReady: 'Please wait...',
			code: "Beat the code",
			mDownloadAll: 'Download all uninstalled packs (size: %1 %2)',
			mUnlocked: "Listen to unlocked music for this pack (%1 levels)",
			mSafeguards: "Buy safeguards (now %1)",
			dfiles: "Downloading %1 files. Press any key to obtain percentage",
			packno: "Not enough beatcoins to get this pack, it costs %1.",
			retrieving: "Retrieving data ",
			nodown: "No downloads are available. So sorry! Check back soon",
			mDownloadList: 'List all new available packs (%1)',
			buy: "buy",
			"mBack": "go back",
			safequestion: "How many safeguards would you like? They cost %1 each. You have %2 beatcoins. You can get a maximum of %3. Remember, you can get a maximum of 100. If you want more, run me again.",
			mDownloadInstructions: 'Press arrow keys to browse packs, the space bar to select a pack, p to preview its sound, and enter to begin downloading selected packs. Press escape or the left arrow to cancel',
			mListen: "Ready: %1 levels unlocked. you can go back to the main menu with the left arrow key.",
			mStart: 'Start Game',
			mLearn: 'Learn the pack',
			mActions: 'This pack has %1 actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma). To exit press Q',
			"yes": "Yes",
			noGameCash: "The minimum bet is %1 beatcoins, you don't have enough right now. Go play!",
			"no": "no",
			ok: "ok",

			dling: 'Downloading %2 packs please wait...',
			dlprog: "downloading pack %1 of %2...",
			dlingdone: 'Done! Rebuilding database...',
			keymapChoose: 'Press the key to replace this action: You can\'t use q, p, escape, enter or space.',
			packError: 'No packs were found on your computer. I will now proceed to download the default pack, please wait...',
			intro: 'Welcome to beatstar!\nThis is a world of music, fun and games.\nPlease read the online instructions to learn how to play.\nYou will now be put into the main menu, where you will find different options.\nI recommend you get some beatcoins by playing the default pack!\nIf you want to change the language, you will need to delete your save file found in your username folder/beatpacks/save.dat',
			keymapStart: 'We will now remap your keyboard. You will hear the sounds for the different actions, and you will be prompted to press the key you want to associate to the new actions.',
			tamperWarning: 'This pack has been tampered with and is no longer unlocked. Press enter to continue.',
			mNew: 'Get new packs',
			nopacks: 'No packs are available. If you think this is a bug, please contact me.',
			noGuardCash: "You need %1 beatcoins to buy one safeguard. You have %2.",
			mBrowse: 'buy new packs (You have %1 beatcoins )',
			mBrowseIncompleted: 'Browse uncompleted packs',
			mBrowseUnlocked: "Change to different unlocked pack",
			"youwin": "You win %1 coins!",
			"youlose": "You lose %1 coins.",

			mHashes: 'Rebuild packs folder',
			mDownload: 'Download new packs'
		};
		this.strings[2] = {
			mPackTut: "Tutorial de cómo hacer packs",
			packtut: `Bienvenido al editor de packs!
Primero, darte las gracias por querer crear un pack.
Es muy fácil. Primero, deberás seleccionar si editar uno de los niveles (si ya existe un archivo de tiempos llamado bpm.txt) o empezar de 0.
Cuando hayas seleccionado qué hacer, escucharás la música de los niveles seleccionados.
Deberás pulsar la barra espaciadora a la velocidad que quieres que corra el nivel. Cada pulsación del espacio es un ciclo del juego, lo que significa que tienes esa cantidad de tiempo para pulsar la tecla correcta.
Cuando hayas hecho eso 10 veces, escucharás que la música se reinicia y tu resultado.
Escucharás un sonido que se reproducirá cada ciclo. Piensa en esos ciclos como si estuvieras jugando. ¿Está sincronizado con la música? ¿Tienes suficiente tiempo para pulsar la tecla correcta?
Si no estás satisfecho con el resultado, puedes pulsar de nuevo el espacio para reiniciar la música y comenzar de nuevo con el mismo nivel.
Cuando el resultado te parezca bien, pulsa enter. Si has seleccionado más de un nivel, este se reproducirá.
Cuando estén hechos todos los niveles, se creará automáticamente el archivo bpm.txt en el pack (o se reemplazará si ya existía).
Si quieres jugar, tendrás que ponerlo en tu carpeta de usuario/beatpacks, y desbloquearlo con beatcoins.
Puedes subirlo a la web haciendo un archivo zip de la carpeta del pack y enviándolo con el formulario de subida`,
			startOver: "Comenzar desde el primer nivel",
			mSelectEdit: "Por favor selecciona el nivel a editar, o empezar de 0",
			selectPack: "Selecciona un pack a editar",
			floop: "Música del menú",
			fa1: "Sonido para la acción freeze, también se le llama acción de quieto. No necesita sonido o ya que no hay tecla que pulsar",
			fa2: "Sonido de indicación de la acción para el espacio o barra espaciadora",
			fo2: "Sonido de la acción para el espacio o barra espaciadora",
			fa3: "Sonido de indicación de la acción para el tabulador",
			fo3: "Sonido para la acción del tabulador",
			fselect: "Sonido que se reproduce cuando se selecciona una opción del menú",
			fa4: "sonido para la acción de la tecla enter",
			fo4: "sonido para la acción de la tecla enter",
			fa5: "sonido para la acción de la indicación de la tecla borrar",
			fo5: "sonido para la acción de la tecla borrar",
			fa6: "sonido para la indicación de la acción de la flecha arriba",
			fo6: "sonido para la acción de la flecha arriba",
			fa7: "sonido para la indicación de la acción de la flecha abajo",
			fo7: "sonido para la acción de la flecha abajo",
			fa8: "Sonido para la indicación de la acción de la flecha derecha",
			fo8: "sonido para la acción de la flecha derecha",
			fa9: "sonido para la indicación de la acción de la flecha izquierda",
			fo9: "Sonido para la acción de la flecha izquierda",

			fwin: "Sonido que se reproduce al completar todos los niveles",
			fnlevel: "Sonido que se reproduce al cambiar de nivel, si no existe un sonido pre para ese nivel. Si no se proporciona ni nlevel ni pre, se pasa al siguiente nivel sin sonidos extra.",
			fpre1: "Pre y el número de un nivel (como pre1.ogg o pre2.ogg), se reproduce antes de que comience un nivel. Si no se proporciona ni nlevel.ogg ni pre, el juego saltará al siguiente nivel sin más sonidos extra.",
			fcredits: "Los créditos se reproducen cuando el juego termina, solo una vez.",
			fname: "Archivo utilizado como vista previa en los menús",
			fboot: "Archivo que se reproduce al abrir el pack por primera vez, antes de jugar",
			ffail: "Archivo que se reproduce cuando termina el juego, al fallar",
			f1music: "Los niveles del juego (se requieren al menos 3 para que un pack se considere válido y deben ser loops para que el juego se sincronice. Siguen el formato <númeroNivel>music, por ejemplo 1music, 2music, 3music.",
			f2music: "Los niveles del juego (se requieren al menos 3 para que un pack se considere válido y deben ser loops para que el juego se sincronice. Siguen el formato <númeroNivel>music, por ejemplo 1music, 2music, 3music.",
			f3music: "Los niveles del juego (se requieren al menos 3 para que un pack se considere válido y deben ser loops para que el juego se sincronice. Siguen el formato <númeroNivel>music, por ejemplo 1music, 2music, 3music.",
			missingFiles: "Los siguientes archivos no están presentes en el pack y son necesarios para poder editarlo:",
			missingAdditional: "Los siguientes archivos son opcionales y no están presentes en el pack, pero no son estrictamente necesarios. Puedes saltarte las acciones de las flechas ya que la mayoría de packs solo tienen las 4 acciones básicas.",
			lang: "Español",

			langs: "Selecciona tu idioma",
			"mFound": "Hemos encontrado %1 packs nuevos: ¿Qué quieres hacer?",
			mReady: 'Espera, por favor...',
			mDownloadAll: 'Descargar todos los packs no instalados (tamaño: %1 %2)',
			level: "Nivel %1",
			nodown: "No hay descargas disponibles por el momento. prueba pronto!",
			mDownloadList: 'Lista todos los packs no instalados (%1 en total)',
			buy: "comprar",
			"mBack": "volver",
			mDownloadInstructions: 'Pulsa las flechas para moverte por los packs, barra espaciadora para seleccionar un pack, la p para previsualizarlo, y enter para empezar la descarga de los seleccionados. pulsa escape o la flecha izquierda para cancelar',
			mStart: 'jugar',
			mLearn: 'aprender el pack',
			mActions: 'Este pack tiene %1 acciones. Las teclas normales son espacio, tabulador, enter, retroceso/borrar, y opcionalmente las flechas. Si has cambiado la distribución del teclado puedes usarla. Para escuchar la acción de quedarse quieto, pulsa la tecla del punto. Para salir pulsa la q.',
			dling: 'Descargando %2 packs por favor espera...',
			dlingdone: '¡Hecho! Reconstruyendo base de datos...',
			keymapChoose: 'Pulsa la tecla que quieras que reemplace a No puedes usar la q, escape, enter o espacio.',
			packError: 'No hemos encontrado packs en tu pc, vamos a bajar el pack por defecto, espera por favor...',
			intro: 'Bienvenido a beat star!\nEste es un mundo de música y diversión!\nPor favor, lee el manual en internet para aprender a jugar.\nAhora te llevaré al menú principal, donde encontrarás diferentes opciones.\nTe recomiendo que consigas unas monedas jugando el pack por defecto!\nSi quieres cambiar el idioma del juego, deberás borrar tu archivo de datos que encontrarás en tu carpeta de usuario/beatpacks/save.dat',
			keymapStart: 'Vamos a cambiar la distribución del teclado. Vas a escuchar los sonidos de las acciones y vas a tener que pulsar la tecla que quieres que corresponda para la acción.',
			dlprog: "descargando pack %1 de %2...",
			tamperWarning: 'Este pack ha sido modificado y ya no está desbloqueado. Pulsa enter para continuar.',
			mUnlocked: "Escuchar la música desbloqueada de este pack (%1 niveles)",
			mBrowseIncompleted: 'Ver packs comprados no completados',
			"yes": "sí",
			"youwin": "Ganas %1 monedas!",
			noGuardCash: "No tienes suficientes monedas. Cada antifallo cuesta %1 y tienes %2.",
			"youlose": "Pierdes %1 monedas!",
			"no": "no",
			mNew: 'Conseguir nuevos packs',
			safeget: "Consigues %1 antifallos... Que guay!",
			nopacks: 'No hay packs disponibles. Si crees que hay un error en el juego, ponte en contacto conmigo.',
			codes: "Número de teclas en el código: %1",
			unlocked: "Ya lo has comprado",
			mBrowse: 'comprar un pack (tienes %1 monedas)',
			mBrowseUnlocked: 'Cambiar a otro pack comprado',
			mHashes: 'Reconstruir base de datos de packs',
			codescracked: "Has podido desbloquear %1 códigos, con %2 acciones diferentes!",
			mainmenu: "menú principal",
			mSelect: "Por favor selecciona",
			mSafeSelect: "Por favor selecciona, con las flechas izquierda y derecha, cuántos antifallos quieres y pulsa enter.",
			mSafeguards: "Comprar antifallos (ahora %1)",
			noGameCash: "Oooh, lo siento. La apuesta mínima es de %1 monedas, no tienes suficiente. Vete a jugar!",
			bet: "selecciona tu apuesta con las flechas izquierda y derecha. Cuando te hayas decidido, pulsa enter.",
			packprice: "Este pack cuesta %1 monedas, confirma que quieres comprarlo.",
			packno: "No tienes monedas suficientes para este pack, cuesta %1.",
			safequestion: "Cuántos antifallos quieres comprar? Cuestan %1 cada una y tienes %2 monedas. Puedes comprar %3. Recuerda que solo puedes comprar 100 de una tirada. Si quieres más, dale otra vez a la opción del menú.",
			code: "rompecódigos",
			mListen: "listo: %1 niveles desbloqueados, flecha izquierda vuelve al menú principal",
			dfiles: "Descargando %1 archivos. Pulsa cualquier tecla para obtener porcentaje",
			retrieving: "Recopilando datos ",
			mDownload: 'Descargar packs',
			ok: "ok",
			mEdit: "Editor de packs",
			mGames: "minijuegos",
			buygame: "Quieres comprar %1 por %2 monedas?",
			nogame: "No tienes las %1 monedas que necesitas para este juego, solo tienes %2",
			mGameTuts: "tutoriales de minijuegos",

			sGames: "Selecciona un minijuego:",
			sTuts: "Selecciona un minijuego para ver la ayuda",
			cost: "Precio",
			slot: "tragamonedas de las tinieblas"

		};
	}

	get(what, rep = []) {
		let str;
		if (typeof this.strings[_main.lang][what] !== 'undefined') {
			str = this.strings[_main.lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			return 'String error: ' + what;
		}
		rep.forEach((v, i) => {
			const i1 = Number(i) + 1;
			str = str.replace('%' + i1, v);
		});
		return str;
	}
}
var strings = exports.strings = new Strings();
},{"./main":1}],7:[function(require,module,exports) {
'use strict';

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
		this.first = true;
		this.cursor = 0;
		this.name = name;
		this.sndKeyChar = _soundObject.so.create('ui/keyChar');
		this.sndKeyDelete = _soundObject.so.create('ui/keyDelete');
		this.sndSliderLeft = _soundObject.so.create('ui/menuSliderLeft');
		this.sndSliderRight = _soundObject.so.create('ui/menuSliderRight');
		this.sndBoundary = _soundObject.so.create('ui/menuBoundary');
		this.sndChoose = _soundObject.so.create('ui/menuChoose');
		this.sndMove = _soundObject.so.create('ui/menuMove');
		this.sndOpen = _soundObject.so.create('ui/menuOpen');
		this.sndSelector = _soundObject.so.create('ui/menuSelector');
		this.sndWrap = _soundObject.so.create('ui/menuWrap');
		this.selectCallback = null;
		if (typeof music !== 'undefined') {
			this.music = music;
		}
		const id = document.getElementById('touchArea');
		// This.hammer = new Hammer(id);
	}

	nextItem() {
		if (!this.first) {
			if (this.cursor < this.menuData.length - 1) {
				this.sndMove.play();
				this.cursor++;
			} else {
				this.sndWrap.play();
				this.cursor = 0;
			}
		} else {
			this.sndMove.play();
			this.first = false;
		}

		this.menuData[this.cursor].speak();
	}

	previousItem() {
		if (this.first) {
			this.first = false;
			this.sndMove.play();
		}
		if (this.cursor > 0) {
			this.sndMove.play();
			this.cursor--;
		} else {
			this.cursor = this.menuData.length - 1;
			this.sndWrap.play();
		}
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
		if (typeof this.music !== 'undefined') {
			this.music.unload();
		}
	}

	async fade() {
		for (let i = this.music.volume; i > 0; i -= 0.06) {
			this.music.volume = i;
			await _utilities.utils.sleep(50);
		}
		this.music.unload();
		//this.destroy();
	}

	destroy() {
		(0, _jquery2.default)(document).off('keydown');
		(0, _jquery2.default)(document).off('keypress');
		// This.hammer.destroy();
		const that = this;
		setTimeout(() => {
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
		if (typeof this.music === 'object') {
			this.music.volume = 0.5;
			this.music.loop = true;
			this.music.play();
		} else if (typeof this.music === 'string') {
			this.music = _soundObject.so.create(this.music, true);
			this.music.volume = 0.5;
			this.music.loop = true;
			this.music.play();
		} else {}
		this.selectCallback = callback;
		const that = this;
		(0, _jquery2.default)(document).on('keypress', event => {
			that.handleInput(event);
		});
		(0, _jquery2.default)(document).on('keydown', event => {
			that.handleKeys(event);
		});
		/*
  This.hammer.on("swipeleft", function(event) { that.handleSwipe(0); });
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
		const selected = this.menuData[this.cursor].id;

		const items = [];
		for (let i = 0; i < this.menuData.length; i++) {
			let addItem = null;
			if (this.menuData[i].type == _menuItem.MenuTypes.SLIDER) {
				addItem = {
					id: this.menuData[i].id,
					value: this.menuData[i].currentValue
					//name: this.menuData[i].options[this.menuData[i].currentValue]
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

		const toReturn = {
			selected,
			cursor: this.cursor,
			items
		};
		this.sndChoose.play();
		(0, _jquery2.default)(document).off('keydown');
		(0, _jquery2.default)(document).off('keypress');
		this.musicDuration = 0;
		this.musicDuration = this.sndChoose.duration;

		if (this.musicDuration > 3000) this.musicDuration = 3000;
		if (typeof this.music !== 'undefined') {
			this.fade();
		}
		const that = this;
		setTimeout(() => {
			that.selectCallback(toReturn);
		}, this.musicDuration);
	}
}
exports.Menu = Menu;
},{"./utilities":13,"./strings":10,"./tts":12,"./soundObject.js":14,"./menuItem":6,"./keycodes":16,"./input":4}],9:[function(require,module,exports) {
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

if (typeof speech === 'undefined') {
	var speech = new _tts.TTS();
}
if (runningText == undefined) {
	var runningText = 0;
}
class ScrollingText {
	constructor(text, delimiter = '\n', callback = 0) {
		this.text = text;
		this.delimiter = delimiter;
		this.splitText = this.text.split(delimiter);
		this.currentLine = 0;
		this.sndOpen = _soundObject.so.create('UI/textOpen');
		this.sndContinue = _soundObject.so.create('UI/textScroll');
		this.sndClose = _soundObject.so.create('UI/textClose');
		this.callback = callback;
		const id = document.getElementById('touchArea');
		// This.hammer = new Hammer(id);
		this.init();
	}

	init() {
		const that = this;
		runningText = this;
		document.addEventListener('keydown', this.handleKeys);
		// This.hammer.on("swipeleft swiperight", function() { that.handleTap(0); });
		// this.hammer.on("tap", function() { that.handleTap(1); });
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
		if (this.splitText[this.currentLine][0] == "!") {
			let str = this.splitText[this.currentLine].substr(1);
			let snd = _soundObject.so.create(str, true);
			snd.play();
			snd.sound.once("end", () => {
				this.advance();
			});
		} else {
			speech.speak(this.splitText[this.currentLine]);
		}
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
			document.removeEventListener('keydown', this.handleKeys);
			//			This.hammer.unload();
			if (this.callback != 0) {
				this.callback();
			}
		}
	}
}
exports.ScrollingText = ScrollingText;
exports.speech = speech;
},{"./keycodes":16,"./soundObject":14,"./tts":12}],8:[function(require,module,exports) {
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

async function mainMenu() {
	const fs = require('fs');
	speech.webTTS = true;
	const items = new Array();
	items.push(new _menuItem.MenuItem(0, _strings.strings.get('mStart')));
	items.push(new _menuItem.MenuItem(8, _strings.strings.get('mSafeguards', [_main.data.safeguards])));

	items.push(new _menuItem.MenuItem(1, _strings.strings.get('mLearn')));
	items.push(new _menuItem.MenuItem(11, _strings.strings.get('mEdit')));
	items.push(new _menuItem.MenuItem(9, _strings.strings.get('mGames')));

	items.push(new _menuItem.MenuItem(2, _strings.strings.get('mBrowse', [_main.data.beatcoins])));
	items.push(new _menuItem.MenuItem(5, _strings.strings.get('mBrowseUnlocked')));
	items.push(new _menuItem.MenuItem(7, _strings.strings.get('mBrowseIncompleted')));
	items.push(new _menuItem.MenuItem(4, _strings.strings.get('mDownload')));
	items.push(new _menuItem.MenuItem(6, _strings.strings.get('mUnlocked', [_main.data.unlocks[_main.pack]["level"]])));
	items.push(new _menuItem.MenuItem(10, _strings.strings.get('mGameTuts')));
	items.push(new _menuItem.MenuItem(3, _strings.strings.get('mHashes')));
	_soundObject.so.directory = './sounds/';
	const mainMenu = new _menu.Menu(_strings.strings.get("mainmenu"), items);
	_soundObject.so.directory = '';
	mainMenu.music = _main.packdir + 'loop';
	if (fs.existsSync(_main.packdir + 'select.ogg')) {
		mainMenu.sndChoose.unload();
		mainMenu.sndChoose = _soundObject.so.create(_main.packdir + 'select');
	}
	mainMenu.run(s => {
		_soundObject.so.directory = './sounds/';
		mainMenu.destroy();
		switch (s.selected) {
			case 0:
				_stateMachine.st.setState(3);break;
			case 1:
				_stateMachine.st.setState(4);break;
			case 2:
				_stateMachine.st.setState(5);break;
			case 3:
				(0, _main.rebuildHashes)();break;
			case 4:
				(0, _main.downloadPacks)();break;
			case 5:
				_stateMachine.st.setState(6);break;
			case 6:
				_stateMachine.st.setState(7);break;
			case 7:
				_stateMachine.st.setState(8);break;
			case 8:
				(0, _main.buySafeguards)();break;
			case 9:
				(0, _main.minigames)();break;
			case 10:
				(0, _main.minituts)();break;
			case 11:
				const electron = require('electron');
				const remote = electron.remote;
				const { dialog } = require('electron').remote;
				let stuff = dialog.showOpenDialog({
					title: _strings.strings.get("selectPack"),
					properties: ['openDirectory']
				}, function (path) {
					(0, _main.editPack)(path);
				});
				break;
		}
	});
}
},{"./soundObject":14,"./main":1,"./stateMachine":15,"./strings":10,"./menuItem":6,"./menu":7}],21:[function(require,module,exports) {
function Timer(callbacks, step) {
	let last = 0;
	let active = false;
	let acc = 0;
	let tick = 0;
	let inc = step || 1 / 120;
	let frameId;

	function onFrame(time) {
		if (last !== null) {
			acc += (time - last) / 1000;
			while (acc > inc) {
        callbacks.update(inc, tick);
        tick += 1;
        acc -= inc;
			}
		}
		last = time;
    callbacks.render();
    if (active) {
    	frameId = requestAnimationFrame(onFrame);
    }
	}

	function start() {
		last = null;
		active = true;
		frameId = requestAnimationFrame(onFrame);
	}

	function stop() {
		active = false;
    cancelAnimationFrame(frameId);
    console.log(frameId);
	}
	function change(value) {
		inc = value || 1 / 120;
		acc = inc;
		tick = 0;
  stop();
  start();
	}
	return {
		start,
		stop,
		change
	};
}

module.exports = Timer;

},{}],20:[function(require,module,exports) {
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

// Var fs=require('fs');

// Var os=require('os');
class Game {
	constructor() {
		this.totalScore = [];
		this.totalAverage = [];
		this.cash = 0;
		_soundObject.so.directory = "./sounds/", this.scoreAverage = [];
		this.levelAverage = [];
		this.scoreCounter = _soundObject.so.create("cling");
		_soundObject.so.directory = "";
		this.canPause = true;

		this.actionCompleted = false;
		this.toDestroy = new Array();
		this.scoreTimer = new _oldtimer.OldTimer();
		var that = this;
		(0, _jquery2.default)(document).on('blur', () => {
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
		if (_fs2.default.existsSync(_main.packdir + 'bpm.txt')) {
			this.fileData = _fs2.default.readFileSync(_main.packdir + 'bpm.txt', 'utf8');
		} else {
			const error = new _scrollingText.ScrollingText('There was an error loading the pack ' + this.pack + '.', '\n', () => {
				_stateMachine.st.setState(2);
			});
		}
		this.bpms = this.fileData.split(',');
		_soundObject.so.directory = "./sounds/";
		this.safe = _soundObject.so.create("safe");
		_soundObject.so.directory = "";
		this.levels = this.bpms.length - 1;
		if (this.bpms[this.levels] == '') {
			this.levels--;
		}
		this.level++;
		_soundObject.so.directory = "./sounds/";
		_soundObject.so.enqueue("safe");
		_soundObject.so.directory = '';
		if (_fs2.default.existsSync(_main.packdir + 'nlevel.ogg')) {
			_soundObject.so.enqueue(_main.packdir + 'nlevel');
		}
		if (_fs2.default.existsSync(_main.packdir + 'win.ogg')) {
			_soundObject.so.enqueue(_main.packdir + 'win');
		}
		if (_fs2.default.existsSync(_main.packdir + 'fail.ogg')) {
			_soundObject.so.enqueue(_main.packdir + 'fail');
		}
		for (let i = 1; i <= 10; i++) {
			if (_fs2.default.existsSync(_main.packdir + 'a' + i + '.ogg')) {
				_soundObject.so.enqueue(_main.packdir + 'a' + i);
				this.actions = i;
			}
			if (_fs2.default.existsSync(_main.packdir + 'o' + i + '.ogg')) {
				_soundObject.so.enqueue(_main.packdir + 'o' + i);
			}
		}
		this.keys = _main.actionKeys;
		const that = this;
		this.timer = (0, _timer2.default)({ update(dt) {
				that.update(dt);
			}, render() {
				that.render();
			} }, this.bpms[this.level] / 1000.0);
		_soundObject.so.setQueueCallback(() => {
			_soundObject.so.directory = './sounds/';
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
			if (_main.data.safeguards <= 0) {
				this.fail(true);
				return;
			} else {
				_main.data.safeguards--;
				this.currentAction--;
				(0, _main.save)();
				this.actionCompleted = true;
				if (_main.data.safeguards > 3) this.safe.pitch = 1;
				if (_main.data.safeguards <= 3) this.safe.pitch = 1.5;
				this.safe.play();
			}
		}
		this.currentAction++;
		// Action and level checks go here
		if (this.currentAction >= this.numberOfActions) {
			_soundObject.so.directory = '';
			_soundObject.so.destroy(_main.packdir + this.level + 'music');
			_soundObject.so.destroy(_main.packdir + 'pre' + this.level);
			_soundObject.so.directory = './sounds/';

			this.level++;
			this.timer.stop();
			this.setupLevel();
			return;
		}
		this.action = _utilities.utils.randomInt(1, this.actions);
		this.actionCompleted = false;
		_soundObject.so.directory = '';
		this.pool.playStatic(_main.packdir + 'a' + this.action, 0);
		_soundObject.so.directory = './sounds/';
		//		If (this.action==1) this.actionCompleted=true;//freeze
		this.scoreTimer.reset();
	}
	doScore() {
		(0, _main.addCash)(this.cash, 0, function () {
			_stateMachine.st.setState(2);
		});
	}

	async fail(skipGuards = false) {
		if (_main.data.safeguards >= 1 && !skipGuards) {
			_main.data.safeguards--;
			(0, _main.save)();
			this.actionCompleted = true;
			this.currentAction--;
			if (_main.data.safeguards > 3) this.safe.pitch = 1;
			if (_main.data.safeguards <= 3) this.safe.pitch = 1.4;
			this.safe.play();
			return;
		}
		this.timer.stop();
		const snd = this.music;
		_soundObject.so.directory = '';
		const failsound = this.pool.playStatic(_main.packdir + 'fail', 0);
		_soundObject.so.directory = './sounds/';
		for (let i = snd.playbackRate; i > 0; i -= 0.05) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(30);
		}
		snd.unload();
		while (this.pool.staticSounds[failsound].sound.playing) {
			await _utilities.utils.sleep(10);
			if (this.input.isDown(_keycodes.KeyEvent.DOM_VK_RETURN)) {
				this.pool.staticSounds[failsound].sound.unload();
			}
		}
		_soundObject.so.resetQueue();
		_soundObject.so.resetQueuedInstance();
		var that = this;
		_soundObject.so.kill(() => {
			if (_fs2.default.existsSync(_main.packdir + 'credits.ogg') && _main.credits) {
				//credits=false;
				let input = new _input.KeyboardInput();
				input.init();
				_soundObject.so.directory = '';
				let bootSound = _soundObject.so.create(_main.packdir + 'credits');
				bootSound.play();
				bootSound.sound.once("end", function () {
					input.justPressedEventCallback = null;
					that.doScore();
				});
				_soundObject.so.directory = './sounds/';

				input.justPressedEventCallback = function (evt) {
					bootSound.sound.off("end");
					bootSound.stop();
					bootSound.destroy();
					input.justPressedEventCallback = null;
					that.doScore();
				};
			} //if file exists
			else {
					that.doScore();
				}
		});
	}

	async quit() {
		this.timer.stop();
		const snd = this.music;
		for (let i = snd.playbackRate; i > 0; i -= 0.045) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(30);
		}
		snd.unload();
		_soundObject.so.resetQueue();
		_soundObject.so.resetQueuedInstance();
		var that = this;
		_soundObject.so.kill(() => {
			that.doScore();
		});
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
		if (this.actionCompleted) {
			return;
		}
		const keys = this.input.keysPressed();
		if (keys.length > 0 && this.action == 1) {
			this.fail();
			return;
		}
		if (keys.length > 1) {
			this.fail();
			return;
		}
		if (keys.length == 1 && keys[0] == this.keys[this.action]) {
			_soundObject.so.directory = '';
			this.pool.playStatic(_main.packdir + 'o' + this.action, 0);
			_soundObject.so.directory = './sounds/';
			this.actionCompleted = true;
			this.calculateScore();
			return;
		}
		if (keys.length == 1 && keys[0] != this.keys[this.action]) {
			this.fail();
		}
	}

	async setupLevel() {
		if (this.level > 1) {
			//avg
			this.actionPercentage = Math.ceil(_utilities.utils.percentOf(this.numberOfActions * this.level, _utilities.utils.averageInt(this.levelAverage)));
			this.cash += _utilities.utils.averageInt(this.scoreAverage) + _utilities.utils.averageInt(this.levelAverage) + this.actionPercentage;
		}
		this.scoreAverage = [];
		this.levelAverage = [];
		if (this.level > this.levels) {
			if (_fs2.default.existsSync(_main.packdir + 'win.ogg')) {
				_soundObject.so.directory = '';

				this.winSound = _soundObject.so.create(_main.packdir + 'win');
				this.winSound.play();
				while (this.winSound.playing == true) {
					await _utilities.utils.sleep(5);
					if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
						this.winSound.stop();
					} //key
				} //while
			} //if file exists
			_main.data.unlocks[_main.pack]["win"] = true;
			let that2 = this;
			_soundObject.so.resetQueue();
			_soundObject.so.resetQueuedInstance();
			//get some kind of reward if you win, but only if the pack has enough levels
			if (this.levels > 9) this.cash += this.cash * 3;
			_soundObject.so.kill(() => {
				that2.doScore();
			});
			return;
		} //winning
		this.canPause = true;
		if (_main.data.unlocks[_main.pack]["level"] < this.level) {
			_main.data.unlocks[_main.pack]["level"] = this.level;
			(0, _main.save)();
		}
		this.playing = false;
		if (_fs2.default.existsSync(_main.packdir + 'pre' + this.level + '.ogg')) {
			_soundObject.so.directory = '';
			this.preSound = _soundObject.so.create(_main.packdir + 'pre' + this.level);
			_soundObject.so.directory = './sounds/';
			this.preSound.play();
			this.playing = true;
		}
		if (_fs2.default.existsSync(_main.packdir + 'nlevel.ogg') && !this.playing && this.level > 1) {
			_soundObject.so.directory = '';
			this.preSound = _soundObject.so.create(_main.packdir + 'nlevel');
			_soundObject.so.directory = './sounds/';
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
		_soundObject.so.directory = '';
		const that = this;
		this.music = _soundObject.so.create(_main.packdir + this.level + 'music', false);
		this.music.loop = true;
		_soundObject.so.directory = './sounds/';
		this.music.play();
		this.music.sound.once("play", () => {
			this.timer.change(that.bpms[that.level] / 1000.0);
		});
		if (!this.playing && this.level > 1) {
			this.queueLevels();
		}
		this.action = 0;
		this.actionCompleted = false;
		this.currentAction = 0;
		if (!this.playing && this.level > 1) {
			this.currentAction++;
		}
		this.numberOfActions = _utilities.utils.randomInt(6 + this.level, this.level * 2 + 6);
	}

	unload() {}

	async pause() {
		if (!this.canPause) {
			return;
		}
		this.canPause = false;
		const snd = this.music;
		this.timer.stop();
		this.scoreTimer.pause();
		this.pauseTime = snd.currentTime;
		for (let i = snd.playbackRate; i > 0; i -= 0.05) {
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
		const snd = this.music;
		snd.play();
		for (let i = snd.playbackRate; i <= 1; i += 0.05) {
			snd.playbackRate = i;
			await _utilities.utils.sleep(8);
		}
		snd.seek(this.pauseTime);
		this.timer.start();
		this.scoreTimer.resume();
		this.input.keysPressed(); // We need this so that it doesn't fail immediately after unpause if you switch windows.
	}

	calculateScore() {
		const bpm = this.bpms[this.level];
		const time = this.scoreTimer.elapsed;
		const score = Math.ceil((bpm / 2 - Math.abs(bpm / 2 - time)) / (bpm / 2) * 100);
		this.scoreCounter.pitch = _utilities.utils.progressPitch(score, 100);
		this.scoreCounter.stop();
		this.scoreCounter.play();
		this.scoreAverage.push(score);
		const mod = Math.ceil(3500 * score / bpm);
		this.score += mod;
		this.levelAverage.push(mod);
	}

	queueLevels() {
		let levelLimit = this.level + 1;
		if (this.levels < levelLimit) {
			levelLimit = this.levels;
		}
		_soundObject.so.directory = '';
		for (let i = this.level; i <= levelLimit; i++) {
			_soundObject.so.enqueue(_main.packdir + i + 'music');
			if (_fs2.default.existsSync(_main.packdir + 'pre' + i + '.ogg')) {
				_soundObject.so.enqueue(_main.packdir + 'pre' + i);
			}
		}
		if (this.level > 1) {
			_soundObject.so.setQueueCallback(0);
			_soundObject.so.loadQueue();
			_soundObject.so.directory = './sounds/';
		}
	}
}
exports.Game = Game;
},{"./tts":12,"./main":1,"./oldtimer":18,"./soundHandler":11,"./utilities":13,"./soundObject":14,"./stateMachine":15,"./timer":21,"./scrollingText":9,"./input.js":4,"./keycodes.js":16}],15:[function(require,module,exports) {
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

let event = new _input.KeyboardInput();

class StateMachine {
	constructor() {
		this.state = 0;
		this.currentState = 0;
	}

	setState(state) {
		if (state == 1) {
			event = new _input.KeyboardInput();
			event.init();
			const intro = _soundObject.so.create('logo');
			const that = this;
			intro.volume = 0.5;
			intro.play();
			intro.sound.once('end', () => {
				intro.unload();
				(0, _jquery2.default)(document).off('keydown');
				that.setState(2);
			});
			(0, _jquery2.default)(document).keydown(event => {
				if (event.which == _keycodes.KeyEvent.DOM_VK_SPACE || event.which == _keycodes.KeyEvent.DOM_VK_ESCAPE || event.which == _keycodes.KeyEvent.DOM_VK_RETURN) {
					intro.unload();
					(0, _jquery2.default)(document).off('keydown');
					that.setState(20);
				}
			});
			this.state = state;
		} else if (state == 2) {
			event = null;
			(0, _main.checkPack)();
			this.state = state;
		} else if (state == 3) {
			this.currentState = new _game.Game();
			this.state = state;
		} else if (state == 20) {
			event = null;
			(0, _main.checkPack)(false);
			this.state = state;
		} else if (state == 4) {
			(0, _main.learnPack)();
		} else if (state == 7) {
			(0, _main.listenPack)();
		}
		// New states
		else if (state == 5) {
				(0, _main.browsePacks)();
				this.state = state;
			} else if (state == 6) {
				(0, _main.browsePacks)(2);
				this.state = state;
			} else if (state == 8) {
				(0, _main.browsePacks)(3);
				this.state = state;
			}
	}
}
const st = new StateMachine();
exports.st = st;
},{"./input":4,"./tts":12,"./main":1,"./menuHandler":8,"./soundObject":14,"./keycodes":16,"./game":20}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.minibet = minibet;
exports.playSlots = playSlots;
exports.playCode = playCode;

var _main = require('./main');

var _oldtimer = require('./oldtimer');

var _soundHandler = require('./soundHandler');

var _menuItem = require('./menuItem');

var _menu = require('./menu');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _scrollingText = require('./scrollingText');

var _strings = require('./strings');

var _tts = require('./tts');

var _utilities = require('./utilities');

var _soundObject = require('./soundObject');

var _keycodes = require('./keycodes');

var _input = require('./input');

var _stateMachine = require('./stateMachine');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function minibet(callbet = null, minBet = 5000, slideBy = 500) {
				if (_main.data.beatcoins < minBet) {
								let error = new _scrollingText.ScrollingText(_strings.strings.get("noGameCash", [minBet, _main.data.beatcoins]), "\n", function () {
												if (typeof callbet !== "undefined") callbet(-1);
												return;
								}); //scroll
				} //if not cash
				else {
												//bet start
												const items = new Array();
												let slider = new _menuItem.SliderItem(0, _strings.strings.get("bet", []), minBet, _main.data.beatcoins, minBet, slideBy);
												items.push(slider);
												items.push(new _menuItem.MenuItem(1, _strings.strings.get("ok")));
												items.push(new _menuItem.MenuItem(2, _strings.strings.get("mBack")));
												_soundObject.so.directory = './sounds/';
												let dm = new _menu.Menu(_strings.strings.get("bet"), items);
												let myBet = 0;
												dm.run(s => {
																_soundObject.so.directory = './sounds/';
																myBet = s.items[0].value;
																dm.destroy();
																if (s.selected == 2) {
																				if (typeof callbet !== "undefined") callbet(myBet);
																} //option 2
																else {
																								(0, _main.addCash)(0, myBet, function () {
																												if (typeof callbet !== "undefined") callbet(myBet);
																								});
																				} //not option 2
												}); //menu callback
												//bet end
								} //enough cash
} //function
function playSlots() {
				let myBet;
				minibet(function (bet) {
								if (bet <= 0) {
												_stateMachine.st.setState(2);
												return;
								}
								myBet = bet;
								//slots
								_soundObject.so.directory = "./sounds/";
								let loop = _soundObject.so.create("slot_wheel", true);
								let wheel;
								let counter = 0;
								loop.play();
								let wheels = [];
								let myInt = setInterval(() => {
												if (counter < 3) {
																_soundObject.so.directory = "";
																wheels[counter] = _utilities.utils.randomInt(2, 5);
																if (counter == 2 && wheels[0] == wheels[1]) {
																				let void_random;
																				void_random = _utilities.utils.randomInt(1, 10);
																				if (void_random == 1) wheels[2] = 1;
																}
																wheel = _soundObject.so.create(_main.packdir + "a" + wheels[counter]);
																wheel.play();
																counter++;
												} else {
																clearInterval(myInt);
																loop.stop();
																_soundObject.so.directory = "./sounds/";
																if (wheels[0] == wheels[1] && wheels[1] == wheels[2]) {
																				let win = _soundObject.so.create("slot_win_" + _utilities.utils.randomInt(1, 4));
																				win.play();
																				win.sound.once("end", () => {
																								let capcash = myBet;
																								console.log(capcash);
																								let perc = Math.ceil(_utilities.utils.percentOf(_utilities.utils.randomInt(80, 100), capcash) + myBet);
																								console.log("perc" + perc);
																								(0, _main.addCash)(perc, 0, function () {
																												_soundObject.so.kill(function () {
																																_stateMachine.st.setState(2);
																												});
																								});
																				});
																} else if (wheels[2] == 1) {
																				let lose = _soundObject.so.create("slot_lose_3");
																				lose.play();
																				lose.sound.once("end", function () {
																								let capcash = myBet;
																								console.log(capcash);
																								if (capcash > _main.data.beatcoins) capcash = _main.data.beatcoins;
																								let perc = Math.ceil(_utilities.utils.percentOf(_utilities.utils.randomInt(25, 30), capcash));
																								console.log("perc" + perc);
																								(0, _main.addCash)(0, perc, function () {
																												_soundObject.so.kill(function () {
																																_stateMachine.st.setState(2);
																												});
																								});
																				});
																} else if (wheels[0] == wheels[1] || wheels[1] == wheels[2] || wheels[0] == wheels[2]) {
																				let lose = _soundObject.so.create("slot_lose_1");
																				lose.play();
																				lose.sound.once("end", function () {
																								let capcash = myBet;
																								console.log(capcash);
																								let perc = Math.ceil(_utilities.utils.percentOf(_utilities.utils.randomInt(40, 69), capcash));
																								console.log("perc" + perc);
																								(0, _main.addCash)(perc, 0, function () {
																												_soundObject.so.kill(function () {
																																_stateMachine.st.setState(2);
																												});
																								});
																				});
																} else {
																				let lose = _soundObject.so.create("slot_lose_2");
																				lose.play();
																				lose.sound.once("end", function () {
																								let capcash = myBet;
																								if (capcash > _main.data.beatcoins) capcash = _main.data.beatcoins;
																								console.log(capcash);
																								let perc = Math.ceil(_utilities.utils.percentOf(_utilities.utils.randomInt(20, 60), capcash));
																								console.log("perc" + perc);
																								(0, _main.addCash)(0, perc, function () {
																												_soundObject.so.kill(function () {
																																_stateMachine.st.setState(2);
																												});
																								});
																				});
																}
												} //counter
								}, _utilities.utils.randomInt(2500, 3100));
				}, 2500, 500);
}
function sop() {
				_soundObject.so.directory = _main.packdir + "/";
}
function sos() {
				_soundObject.so.directory = "./sounds/";
}
async function playCode() {
				const fs = require('fs');
				let pool = new _soundHandler.SoundHandler();
				let actions = 0;
				for (let i = 1; i <= 10; i++) {
								if (fs.existsSync(_main.packdir + 'a' + i + '.ogg')) {
												actions = i;
								}
				}
				let time = new _oldtimer.OldTimer();
				let allowed = 42000;
				let ticker;
				let music;
				sos();
				ticker = _soundObject.so.create("codetick");
				sop();
				let playing = true;
				let level = 0;
				let crackedcodes = 0;
				let acode = [];
				let actionsa = [];
				let curkeys = [];
				for (let i = 2; i <= actions; i++) {
								actionsa.push("a" + i);
				}
				let go;
				let input = new _input.KeyboardInput();
				input.init();
				let fumbled = false;
				sos();
				go = _soundObject.so.create("codego");
				let tick = true;
				while (playing) {
								await _utilities.utils.sleep(5);
								level++;
								allowed = 35000 + actions * 500;
								acode.splice();
								acode = actionsa;
								if (level + actions - 1 > actions) {
												let more = level - 1;
												for (let i = 1; i <= more; i++) {
																acode.push("a" + _utilities.utils.randomInt(2, actions));
												}
								}
								acode = _utilities.utils.shuffle(acode);
								let counter = 0;
								sos();
								if (!fumbled) {
												_tts.speech.speak(_strings.strings.get("level", [level]));
												await _utilities.utils.sleep(700);
												_tts.speech.speak(_strings.strings.get("codes", [acode.length]));
												await _utilities.utils.sleep(_utilities.utils.randomInt(800, 1250));
												go.play();
												sop();
												time.reset();
								}
								while (time.elapsed < allowed && playing) {
												await _utilities.utils.sleep(5);
												if (time.elapsed % 1000 <= 10 && tick) {
																let formula = (allowed - time.elapsed) / 1000;
																ticker.pitch = (120 - formula) / 100;
																tick = false;
																ticker.play();
												} //ticker sound
												else {
																				tick = true;
																}
												input.justPressedEventCallback = function (evt) {
																if (evt == _keycodes.KeyEvent.DOM_VK_Q) playing = false;
																if (_main.actionKeys.includes(evt)) {
																				if (evt == _main.actionKeys[acode[counter].substr(1)]) {
																								sop();
																								pool.playStatic(acode[counter], 0);
																								sos();
																								pool.playStatic("code_ok", 0);
																								sop();
																								counter++;
																				} else {
																								counter = 0;
																								sos();
																								pool.playStatic("code_wrong", 0);
																								sop();
																				}
																} //is in array
												};
												if (counter == acode.length) {
																sos();
																input.justPressedEventCallback = null;
																pool.playStatic("code_complete", 0);
																sop();
																await _utilities.utils.sleep(600);
																ticker.stop();
																crackedcodes++;
																time.restart();
																acode.splice();
																break;
												} //code cracked
								} //while allowed
								if (time.elapsed >= allowed) {
												input.justPressedEventCallback = null;
												sos();
												let fumble;
												fumbled = true;
												playing = false;
												fumble = _soundObject.so.create("fumble");
												fumble.play();
												await _utilities.utils.sleep(400);
								} //allowed
				} //while playing
				let newsafe = _utilities.utils.randomInt(0, level - 1);
				new _scrollingText.ScrollingText(_strings.strings.get("codescracked", [crackedcodes]), "\n", function () {
								(0, _main.safeget)(newsafe, function () {
												_soundObject.so.kill(() => {
																input.justPressedEventCallback = null;
																_stateMachine.st.setState(2);
												});
								});
				});
} //function
},{"./main":1,"./oldtimer":18,"./soundHandler":11,"./menuItem":6,"./menu":7,"./scrollingText":9,"./strings":10,"./tts":12,"./utilities":13,"./soundObject":14,"./keycodes":16,"./input":4,"./stateMachine":15}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Player = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _keycodes = require('./keycodes');

var _main = require('./main');

var _scrollingText = require('./scrollingText');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Player {
	constructor() {
		this.beatcoins = 0, this.pack = 'default', this.actionKeys = [0, 0, _keycodes.KeyEvent.DOM_VK_SPACE, _keycodes.KeyEvent.DOM_VK_TAB, _keycodes.KeyEvent.DOM_VK_RETURN, _keycodes.KeyEvent.DOM_VK_BACK_SPACE, _keycodes.KeyEvent.DOM_VK_UP, _keycodes.KeyEvent.DOM_VK_DOWN, _keycodes.KeyEvent.DOM_VK_RIGHT, _keycodes.KeyEvent.DOM_VK_LEFT];
		this.unlocks = {};
		this.unlocks["default"] = {
			"level": 0,
			"insurance": 0,
			"fails": 0,
			"win": false,
			"average": 0
		};
	}
}
exports.Player = Player;
},{"./keycodes":16,"./main":1,"./scrollingText":9}],1:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.packdir = exports.data = exports.pack = exports.langs = exports.mangle = exports.actionKeys = exports.minis = exports.credits = exports.editing = exports.lang = undefined;
exports.learnPack = learnPack;
exports.browsePacks = browsePacks;
exports.rebuildHashes = rebuildHashes;
exports.question = question;
exports.checkPack = checkPack;
exports.downloadPacks = downloadPacks;
exports.save = save;
exports.listenPack = listenPack;
exports.booter = booter;
exports.addCash = addCash;
exports.buySafeguards = buySafeguards;
exports.minigames = minigames;
exports.runGame = runGame;
exports.minituts = minituts;
exports.safeget = safeget;
exports.editPack = editPack;

var _oldtimer = require('./oldtimer');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _minis = require('./minis.js');

var _cryptr = require('cryptr');

var _cryptr2 = _interopRequireDefault(_cryptr);

var _player = require('./player');

var _menuItem = require('./menuItem');

var _menu = require('./menu');

require('hash-files');

var _fsWalk = require('fs-walk');

var _fsWalk2 = _interopRequireDefault(_fsWalk);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _menuHandler = require('./menuHandler');

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

var lang = exports.lang = 0;
var editing = exports.editing = false;
//import {SoundPool} from './soundPool';

let boot = false;
let credits = exports.credits = false;
let minis = exports.minis = {
	slot: 8500,
	code: 10000
};

// Import test from './test.js'
var actionKeys = exports.actionKeys = [0, 0, _keycodes.KeyEvent.DOM_VK_SPACE, _keycodes.KeyEvent.DOM_VK_TAB, _keycodes.KeyEvent.DOM_VK_RETURN, _keycodes.KeyEvent.DOM_VK_BACK_SPACE, _keycodes.KeyEvent.DOM_VK_UP, _keycodes.KeyEvent.DOM_VK_DOWN, _keycodes.KeyEvent.DOM_VK_RIGHT, _keycodes.KeyEvent.DOM_VK_LEFT];
var mangle = exports.mangle = new _cryptr2.default('sdf jkl wer uio');
var langs = exports.langs = ['', 'english', 'spanish'];
var pack = exports.pack = 'default';
var data = exports.data = '';
var packdir = exports.packdir = _os2.default.homedir() + '/beatpacks/' + pack + '/';
document.addEventListener('DOMContentLoaded', setup);
_soundObject.so.debug = true;
async function setup() {
	checkPack(false, true);
	return;
	_stateMachine.st.setState(1);
}
function proceed() {
	const sound = _soundObject.so.create('memtest');
	sound.volume = 0.3;
	sound.play();
	_soundObject.so.destroy('memtest');
}
// St.setState(1);
// document.removeEventListener("DOMContentLoaded",setup);
async function learnPack() {
	_soundObject.so.directory = "";
	const fs = require('fs');
	const pool = new _soundHandler.SoundHandler();
	let actions = 0;
	for (let i = 1; i <= 10; i++) {
		if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
			actions = i;
		}
	}
	_tts.speech.speak(_strings.strings.get('mActions', [actions]));
	const event = new _input.KeyboardInput();
	event.init();
	_soundObject.so.directory = '';
	while (!event.isJustPressed(_keycodes.KeyEvent.DOM_VK_Q)) {
		await _utilities.utils.sleep(10);
		if (event.isJustPressed(actionKeys[2])) {
			pool.playStatic(packdir + 'a' + 2, 0);
		}
		if (event.isJustPressed(actionKeys[3])) {
			pool.playStatic(packdir + 'a' + 3, 0);
		}
		if (event.isJustPressed(actionKeys[4])) {
			pool.playStatic(packdir + 'a' + 4, 0);
		}
		if (event.isJustPressed(actionKeys[5])) {
			pool.playStatic(packdir + 'a' + 5, 0);
		}
		if (event.isJustPressed(actionKeys[6])) {
			pool.playStatic(packdir + 'a' + 6, 0);
		}
		if (event.isJustPressed(actionKeys[7])) {
			pool.playStatic(packdir + 'a' + 7, 0);
		}
		if (event.isJustPressed(actionKeys[8])) {
			pool.playStatic(packdir + 'a' + 8, 0);
		}
		if (event.isJustPressed(actionKeys[9])) {
			pool.playStatic(packdir + 'a' + 9, 0);
		}
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_PERIOD)) {
			pool.playStatic(packdir + 'a' + 1, 0);
		}
	}
	pool.destroy();
	_soundObject.so.directory = './sounds/';
	_stateMachine.st.setState(2);
}
async function browsePacks(browsing = 1) {
	const fs = require('fs');
	if (!fs.existsSync(_os2.default.homedir() + '/beatpacks/hashes.db')) {
		var error = 0;
		if (lang == 1) {
			error = new _scrollingText.ScrollingText('The packs folder hashes need to be rebuilt to continue. This can take a few seconds...', '\n', () => {
				rebuildHashes();
			});
		}
		if (lang == 2) {
			error = new _scrollingText.ScrollingText('Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos segundos...', '\n', () => {
				rebuildHashes();
			});
		}
		return;
	}
	try {
		var packs = JSON.parse(mangle.decrypt(fs.readFileSync(_os2.default.homedir() + '/beatpacks/hashes.db')));
	} catch (err) {
		var error = 0;
		if (lang == 1) {
			error = new _scrollingText.ScrollingText('The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...', '\n', () => {
				rebuildHashes();
			});
		}
		if (lang == 2) {
			error = new _scrollingText.ScrollingText('Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato así que ves a por un café o algo...', '\n', () => {
				rebuildHashes();
			});
		}
		return;
	}
	let timeout = -1;
	const browseArray = [];
	let browsePosition = -1;
	if (browsing > 0) {
		packs.forEach((i, v) => {
			if (fs.existsSync(_os2.default.homedir() + '/beatpacks/' + i.name + '/bpm.txt')) {
				if (browsing == 1) {
					if (typeof data.unlocks[i.name] === "undefined") {
						browseArray.push(i);
					}
				} else if (browsing == 2) {
					if (typeof data.unlocks[i.name] !== "undefined") {
						browseArray.push(i);
					}
				} else if (browsing == 3) {
					if (typeof data.unlocks[i.name] !== "undefined" && !data.unlocks[i.name]["win"]) {
						browseArray.push(i);
					}
				}
			}
		});
	}
	_soundObject.so.directory = '';
	if (browseArray.length === 0) {
		_soundObject.so.directory = "./sounds/";
		new _scrollingText.ScrollingText(_strings.strings.get('nopacks'), '\n', function () {
			_stateMachine.st.setState(2);
		});
		return;
	}
	browseArray.sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
	const event = new _input.KeyboardInput();
	event.init();
	let snd;
	if (lang == 1) {
		_tts.speech.speak('ready. showing ' + browseArray.length + ' packs. Press arrows to move, left arrow to exit, enter to choose a pack, or the first letter of a packs name.');
	}
	if (lang == 2) {
		_tts.speech.speak('listo. Mostrando ' + browseArray.length + ' packs. Pulsa flechas para moverte, flecha izquierda para salir, enter para elegir uno, o la primera letra del nombre de un pack.');
	}
	const exitNow = 0;
	while (!event.isJustPressed(_keycodes.KeyEvent.DOM_VK_LEFT) && browsing > 0) {
		// Enter
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
			if (browsePosition == -1) {
				_stateMachine.st.setState(2);
				return;
			}
			if (typeof snd !== 'undefined') {
				snd.destroy();
			}
			if (timeout != -1) {
				clearTimeout(timeout);
			}
			if (browsing > 0) {
				if (browsing == 1) {
					let price = browseArray[browsePosition].levels * 500;
					if (data.beatcoins < price) {
						new _scrollingText.ScrollingText(_strings.strings.get("packno", [price]), "\n", function () {
							_stateMachine.st.setState(2);
						});
					} else {
						question("packprice", [price], function (answer) {
							if (!answer) {
								_stateMachine.st.setState(2);
								return;
							} else if (answer) {
								_soundObject.so.directory = "./sounds/";
								let snd = _soundObject.so.create("buypack");
								snd.play();
								snd.sound.once("end", function () {
									addCash(0, price, function () {
										exports.pack = pack = browseArray[browsePosition].name;
										boot = false;
										data.pack = pack;
										if (typeof data.unlocks[pack] === "undefined") {
											data.unlocks[pack] = {
												"level": 0,
												"insurance": 0,
												"fails": 0,
												"win": false,
												"average": 0
											}; //object
										} //unlocks undefined
										exports.packdir = packdir = _os2.default.homedir() + '/beatpacks/' + pack + '/';
										boot = false;
										_soundObject.so.directory = './sounds/';
										save();
										_soundObject.so.kill(() => {
											_stateMachine.st.setState(20);
										}); //kill
									}); //cash
								}); //sound callback
							} //answer
						}); //question callback);
					} //we have enough
					return;
				} else {
					exports.pack = pack = browseArray[browsePosition].name;
					boot = false;
					data.pack = pack;
					if (typeof data.unlocks[pack] === "undefined") {
						data.unlocks[pack] = {
							"level": 0,
							"insurance": 0,
							"fails": 0,
							"win": false,
							"average": 0
						}; //object
					} //unlocks undefined
					exports.packdir = packdir = _os2.default.homedir() + '/beatpacks/' + pack + '/';
					boot = false;
					_soundObject.so.directory = './sounds/';
					save();
					_soundObject.so.kill(() => {
						_stateMachine.st.setState(20);
					}); //kill
				} //if browsing more than 1
			} //if browsing more than 0
			return;
			//}
		}
		// Down arrow
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_DOWN)) {
			if (typeof snd !== 'undefined') {
				snd.destroy();
			}
			if (timeout != -1) {
				clearTimeout(timeout);
			}
			browsePosition++;
			if (browsePosition > browseArray.length - 1) {
				browsePosition = 0;
			}
			_tts.speech.speak(browsePosition);
			if (lang == 1) {
				_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
			}
			if (lang == 2) {
				_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
			}
			timeout = setTimeout(() => {
				snd = _soundObject.so.create(browseArray[browsePosition].preview);
				snd.play();
			}, 1000);
		}
		var chars = event.getChars();
		if (chars != '') {
			// First letter
			var stop = false;
			browseArray.forEach((v, i) => {
				const str = v.name.toLowerCase();
				if (str.slice(0, 1) == chars[0]) {
					if (!stop) {
						browsePosition = i;
					}
					stop = true;
				}
			});
			if (typeof snd !== 'undefined') {
				snd.destroy();
			}
			if (timeout != -1) {
				clearTimeout(timeout);
			}
			if (lang == 1) {
				_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
			}
			if (lang == 2) {
				_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
			}
			timeout = setTimeout(() => {
				snd = _soundObject.so.create(browseArray[browsePosition].preview);
				snd.play();
			}, 1000);
		}
		// Up arrow
		if (event.isJustPressed(_keycodes.KeyEvent.DOM_VK_UP)) {
			if (typeof snd !== 'undefined') {
				snd.destroy();
			}
			if (timeout != -1) {
				clearTimeout(timeout);
			}
			browsePosition--;

			if (browsePosition < 0) {
				browsePosition = browseArray.length - 1;
			}
			// Speech.speak(browsePosition);
			if (lang == 1) {
				_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
			}
			if (lang == 2) {
				_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
			}
			timeout = setTimeout(() => {
				snd = _soundObject.so.create(browseArray[browsePosition].preview);
				snd.play();
			}, 1000);
		}
		await _utilities.utils.sleep(5);
	}
	if (timeout != -1) {
		clearTimeout(-1);
	}
	_soundObject.so.directory = './sounds/';
	_soundObject.so.kill(() => {
		_stateMachine.st.setState(2);
	});
}
async function rebuildHashes(silent = false) {
	const fs = require('fs');
	// Var hash=require('hash-files');
	let corrupts = '';
	// Var walk=require('fs-walk');
	let newHash = 0;
	const packs = new Array();
	_soundObject.so.directory = '';
	_fsWalk2.default.dirsSync(_os2.default.homedir() + '/beatpacks', (pb, pf, stat, next) => {
		if (!fs.existsSync(pb + '/' + pf + '/bpm.txt')) {
			corrupts += '\n' + pf;
			return; // Discard non packs
		}
		let theFiles = 0;
		const path = pb + '/' + pf + '/';
		_fsWalk2.default.filesSync(path, (pb, pf, stat) => {
			theFiles += stat.size;
		});
		newHash = theFiles;
		const fileData = fs.readFileSync(path + 'bpm.txt', 'utf8');
		const levelsa = fileData.split(',');
		let levels = levelsa.length - 1;
		if (levelsa[levels] == '') {
			levels--;
		}
		const temp = {
			name: pf,
			preview: path + 'name',
			levels,
			hash: newHash
		};
		packs.push(temp);
	});
	_soundObject.so.directory = './sounds/';
	let write = JSON.stringify(packs);
	write = mangle.encrypt(write);
	fs.writeFileSync(_os2.default.homedir() + '/beatpacks/hashes.db', write);
	if (silent) {
		return packs;
	}
	if (corrupts != '') {
		if (lang == 1) {
			if (!silent) {
				new _scrollingText.ScrollingText('one thing before you go... the following packs are corrupt and should be looked at.' + corrupts, '\n', () => {
					if (!silent) {
						_stateMachine.st.setState(2);
					}
				});
			}
		}
		if (lang == 2) {
			if (!silent) {
				new _scrollingText.ScrollingText('Antes de que te vayas... los siguientes packs están corruptos y deberías echar un vistazo a ver qué pasa.' + corrupts, '\n', () => {
					if (!silent) {
						_stateMachine.st.setState(2);
					}
				});
			}
		}
	} else if (!silent) {
		_stateMachine.st.setState(2);
	}
}
function question(text, localizedValues = [], callback = null) {
	let answer = false;
	let items = new Array();
	items.push(new _menuItem.MenuItem(0, _strings.strings.get(text, localizedValues)));
	items.push(new _menuItem.MenuItem(0, _strings.strings.get("yes")));
	items.push(new _menuItem.MenuItem(1, _strings.strings.get("no")));
	_soundObject.so.directory = './sounds/';
	let dm = new _menu.Menu(_strings.strings.get(text, localizedValues), items);
	_soundObject.so.directory = '';
	dm.run(s => {
		console.log("ok");
		_soundObject.so.directory = './sounds/';
		switch (s.selected) {
			case 0:
				dm.destroy();
				answer = true;
				break;
			case 1:
				dm.destroy();
				answer = false;
				break;
		}
		if (typeof callback !== "undefined") {
			callback(answer);
		}
	});
}
async function checkPack(changeBoot = true, debug = false) {
	exports.editing = editing = false;
	const fs = require('fs');
	try {
		exports.data = data = JSON.parse(fs.readFileSync(_os2.default.homedir() + '/beatpacks/save.dat'));
	} catch (err) {
		exports.data = data = new _player.Player();
		let introing = true;
		let str = "";
		for (let i in _strings.strings.strings) {
			str += _strings.strings.strings[i].langs + ". ";
		}

		let items = [];
		let counter = 1;
		for (let i in _strings.strings.strings) {
			items.push(new _menuItem.MenuItem(counter, _strings.strings.strings[i].lang));
			counter++;
		}
		let lm = new _menu.Menu(str, items);
		lm.run(s => {
			exports.lang = lang = s.selected;
			data.lang = lang;
			lm.destroy();
			new _scrollingText.ScrollingText(_strings.strings.get("intro"), "\n", function () {
				introing = false;
			});
		});
		while (introing) {
			await _utilities.utils.sleep(10);
		}
	}
	exports.pack = pack = data.pack;
	exports.lang = lang = data.lang;
	if (!changeBoot) boot = false;
	if (changeBoot) boot = true;
	exports.packdir = packdir = _os2.default.homedir() + '/beatpacks/' + pack + '/';
	exports.actionKeys = actionKeys = data.actionKeys;
	save();
	if (!fs.existsSync(packdir + 'bpm.txt')) {
		exports.pack = pack = 'default';
		boot = false;
		exports.packdir = packdir = _os2.default.homedir() + '/beatpacks/' + pack + '/';
	}
	if (!fs.existsSync(packdir + 'bpm.txt')) {
		const text = new _scrollingText.ScrollingText(_strings.strings.get('packError'), '\n', () => {
			downloadPacks(['default']);
		});
		return;
	}
	if (debug) {
		editPackDefinite("e:\\r/");
		return;
	}
	booter();
}
var download = function (url, dest, cb) {
	const http = require('http');
	const fs = require('fs');
	var file = fs.createWriteStream(dest);
	var request = http.get(url, function (response) {
		response.pipe(file);
		file.on('finish', function () {
			file.close();
			cb();
		});
	});
};
async function downloadPacks(arr = []) {
	const fs = require('fs');
	if (arr.length == 0) {
		const dlList = new Array();
		let remoteHashes;
		let localHashes;
		localHashes = await rebuildHashes(true);
		await fetch('http://oriolgomez.com/beatpacks/hashes.db').then(event => event.text()).then(data => {
			remoteHashes = JSON.parse(mangle.decrypt(data));
			console.log("remote" + remoteHashes.length);
		});
		// Ok
		const browseArray = [];
		const browsePosition = -1;
		let size = 0;
		remoteHashes.forEach((i, v) => {
			let shouldPush = false;
			for (let l = 0; l < localHashes.length; l++) {
				if (i.name == localHashes[l].name && i.hash == localHashes[l].hash) {
					shouldPush = false;
					break;
				} else {
					shouldPush = true;
				}
			}
			if (shouldPush) {
				browseArray.push(i);
				size += i.hash;
			} else {}
		});
		// Create downloader menu here
		if (browseArray.length < 1) {
			new _scrollingText.ScrollingText(_strings.strings.get("nodown"), "\n", function () {
				_stateMachine.st.setState(2);
			});
			return;
		}
		const downloadSelections = new Array();
		let sizeS;
		size = size / 1024 / 1024;
		sizeS = "mb";
		if (size > 1024) {
			size = size / 1024;
			sizeS = "gb";
		}
		size = size.toFixed(2);
		//			console.log("size: "+size+sizeS+" "+browseArray.length+" packs");
		const items = new Array();
		items.push(new _menuItem.MenuItem(-1, _strings.strings.get("mFound", [browseArray.length])));
		items.push(new _menuItem.MenuItem(0, _strings.strings.get("mDownloadAll", [size, sizeS])));
		items.push(new _menuItem.MenuItem(1, _strings.strings.get("mDownloadList", [browseArray.length])));
		items.push(new _menuItem.MenuItem(2, _strings.strings.get("mBack")));
		_soundObject.so.directory = './sounds/';
		let dm = new _menu.Menu(_strings.strings.get("mSelect"), items);
		_soundObject.so.directory = '';
		let anotherSelected = false;
		dm.run(s => {
			_soundObject.so.directory = './sounds/';
			switch (s.selected) {
				case 0:
					dm.destroy();
					//anotherSelected=true;
					let dls = new Array();
					browseArray.forEach(function (i) {
						dls.push(i.name);
					});
					downloadPacks(dls);
					break;
				case 2:
					dm.destroy();
					anotherSelected = true;
					_stateMachine.st.setState(2);
					break;
				case 1:
					dm.destroy();
					//browse menu start
					let timeout = -1;
					let browsePosition = -1;
					browseArray.forEach(i => {
						i.selected = false;
					}); //forEach
					var selected = [];
					_soundObject.so.directory = "./sounds/";
					let snds = _soundObject.so.create("ui/selected");
					_soundObject.so.directory = '';
					browseArray.sort((a, b) => {
						const nameA = a.name.toLowerCase();
						const nameB = b.name.toLowerCase();
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					});
					let event = new _input.KeyboardInput();
					event.init();

					let snd;
					if (lang == 1) {
						_tts.speech.speak('ready. Browsing ' + browseArray.length + ' downloadable packs. Press arrows to move, space to select, p to preview, q to exit, enter to start download, or the first letter of a packs name to move to it.');
					}
					if (lang == 2) {
						_tts.speech.speak('listo. tienes ' + browseArray.length + ' packs disponibles. Pulsa flechas para moverte, p para previsualizar, espacio para seleccionar, q para salir, enter para empezar descarga, o pulsa la primera letra del nombre de un pack para moverte a él.');
					}
					let browsing = 1;
					let size = 0;
					event.justPressedEventCallback = function (evt) {
						//space
						if (evt == _keycodes.KeyEvent.DOM_VK_SPACE) {
							if (browsePosition != -1) {
								if (browseArray[browsePosition].selected) {
									browseArray[browsePosition].selected = false;
									size -= browseArray[browsePosition].hash;
								} else if (browseArray[browsePosition].selected == false) {
									browseArray[browsePosition].selected = true;
									snds.play();
									size += browseArray[browsePosition].hash;
								}
								let sizeS;
								let dSize;
								if (size <= 0) sizeS = "bytes";
								dSize = size / 1024 / 1024;
								console.log(dSize);
								sizeS = "mb";
								if (dSize > 1024) {
									dSize = size / 1024;
									sizeS = "gb";
								}
								if (size <= 0) sizeS = "bytes";
								dSize = Math.ceil(dSize);
								_tts.speech.speak(dSize + " " + sizeS + " total");
							}
						}
						//Enter
						if (evt == _keycodes.KeyEvent.DOM_VK_RETURN) {
							if (browsing == 0) return;
							selected.splice();
							browseArray.forEach(i => {
								if (i.selected) {
									selected.push(i.name);
								}
							});
							if (selected.length > 0) {
								if (typeof snd !== 'undefined') {
									snd.destroy();
								}
								browsing = 0;
								event.justPressedEventCallback = null;
								event.charEventCallback = null;
								downloadPacks(selected);

								return;
							}
						}
						// Down arrow
						if (evt == _keycodes.KeyEvent.DOM_VK_DOWN) {
							if (typeof snd !== 'undefined') {
								snd.destroy();
							}
							browsePosition++;
							if (browsePosition > browseArray.length - 1) {
								browsePosition = 0;
							}
							if (browseArray[browsePosition].selected) {
								snds.stop();snds.play();
							}
							if (lang == 1) {
								_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
							}
							if (lang == 2) {
								_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
							}
						}
						// Up arrow
						if (evt == _keycodes.KeyEvent.DOM_VK_UP) {
							if (typeof snd !== 'undefined') {
								snd.destroy();
							}
							browsePosition--;
							if (browsePosition < 0) {
								browsePosition = browseArray.length - 1;
							}
							if (browseArray[browsePosition].selected) {
								snds.stop();snds.play();
							}
							if (lang == 1) {
								_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
							}
							if (lang == 2) {
								_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
							}
						}
					};
					// First letter
					event.charEventCallback = function (char) {
						var stop = false;
						browseArray.forEach((v, i) => {
							let str = v.name.toLowerCase();
							if (str.slice(0, 1) == char) {
								if (!stop) {
									browsePosition = i;
								}
								stop = true;
							}
						});
						if (typeof snd !== 'undefined') {
							snd.destroy();
						}
						if (browseArray[browsePosition].selected) {
							snds.stop();snds.play();
						}
						if (lang == 1) {
							_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
						}
						if (lang == 2) {
							_tts.speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
						}
					};
					//browse menu end
					return;
			}
		});
		if (anotherSelected) return;
	} else if (arr.length > 0) {
		_soundObject.so.directory = './sounds/';
		const prog = _soundObject.so.create('progress');
		var toDownload = [];
		_tts.speech.speak(_strings.strings.get('dling', [i + 1, arr.length]));
		let percent = 0;
		let prevPercent = 0;
		for (let i = 0; i < arr.length; i++) {
			var name = arr[i];
			//toDownload[name] = [];
			percent = Math.floor(_utilities.utils.percent(i, arr.length));
			if (percent > prevPercent + 20) {
				prevPercent = percent;
				if (arr.length > 5) _tts.speech.speak(_strings.strings.get("retrieving") + percent + "%"); //speak only if getting a few packs, getting 1 or 2 is fast.
			}

			await fetch(' http://oriolgomez.com/beatpacks/index.php?p=' + arr[i]).then(event => event.text()).then(data => {
				const datas = data.split('\n');
				datas.forEach(i => {
					if (i != '') {
						toDownload.push(i);
					}
				});
			});
		} // End for loop
		let dir = _os2.default.homedir() + '/beatpacks/';
		let url = 'http://oriolgomez.com/beatpacks/';
		var dlCounter = 0;
		var dests = [];
		for (var i in toDownload) {
			var ii = i;
			i = toDownload[i];
			if (i == "") continue;
			dir = _os2.default.homedir() + '/beatpacks/';
			var dirsplit = i.split("/");
			if (fs.existsSync(dir + i)) {
				console.log("unlink" + dir + i);
				fs.unlinkSync(dir + i);
			}
			if (!fs.existsSync(dir + dirsplit[0])) {
				fs.mkdirSync(dir + dirsplit[0]);
			}
			dir = _os2.default.homedir() + '/beatpacks/' + i;
			url = 'http://oriolgomez.com/beatpacks/' + i;
			toDownload[ii] = url;
			dests.push(dir);
		}
		console.log("going to start download");
		_tts.speech.speak(_strings.strings.get("dfiles", [toDownload.length]));
		percent = 0;
		prevPercent = 0;
		let currentIndex = 0;
		let event = new _input.KeyboardInput();
		event.init();
		event.justPressedEventCallback = function () {
			percent = _utilities.utils.percent(currentIndex, toDownload.length).toFixed(1);
			_tts.speech.speak(percent + "%");
			console.log(percent + "%");
		};
		var threads = 3;
		require('async').eachOfLimit(toDownload, threads, function (fileUrl, index, next) {
			download(fileUrl, dests[index], next);

			currentIndex = index;
		}, function () {
			_tts.speech.speak(_strings.strings.get('dlingdone'));
			console.log("exiting function");
			rebuildHashes(true);
			event.justPressedEventCallback = null;
			_soundObject.so.directory = './sounds/';
			_stateMachine.st.setState(2);
		});
	} // If length > 1
}
function save() {
	if (editing) return;
	const fs = require('fs');
	if (!fs.existsSync(_os2.default.homedir() + '/beatpacks')) {
		fs.mkdirSync(_os2.default.homedir() + '/beatpacks');
	}
	const write = JSON.stringify(data);
	// Write=mangle.encrypt(write);
	fs.writeFileSync(_os2.default.homedir() + '/beatpacks/save.dat', write);
}
function listenPack() {
	const fs = require('fs');
	let inp = new _input.KeyboardInput();
	inp.init();
	let pos = 0;
	let fileData;
	let bpms;
	let mus;
	let levels;
	_soundObject.so.directory = "./sounds/";
	let lock = _soundObject.so.create("locked");
	_soundObject.so.directory = "";
	let unlocked = data.unlocks[pack]["level"];
	if (unlocked == 0) unlocked = 1; //first level is always unlocked even if you haven't played it
	if (fs.existsSync(packdir + 'bpm.txt')) {
		fileData = fs.readFileSync(packdir + 'bpm.txt', 'utf8');
	} else {
		const error = new _scrollingText.ScrollingText('There was an error loading the pack ' + pack + '.', '\n', () => {
			_stateMachine.st.setState(2);
		});
		return;
	}
	bpms = fileData.split(',');
	levels = bpms.length - 1;
	if (bpms[levels] == '') {
		levels--;
	}
	_tts.speech.speak(_strings.strings.get("mListen", [unlocked]));
	inp.justPressedEventCallback = function (evt) {
		lock.stop();
		if (typeof mus !== "undefined") mus.destroy();

		if (evt == _keycodes.KeyEvent.DOM_VK_LEFT) {
			inp.justPressedEventCallback = null;
			_stateMachine.st.setState(2);
			return;
		}
		//down
		else if (evt == _keycodes.KeyEvent.DOM_VK_DOWN) {
				pos++;
				if (pos > levels) {
					pos = 1;
				}
				if (pos > unlocked) {
					lock.play();
				} else {
					mus = _soundObject.so.create(packdir + pos + 'music', true);
					mus.loop = true;
					mus.play();
				}
			}
			//up
			else if (evt == _keycodes.KeyEvent.DOM_VK_UP) {
					pos--;
					if (pos <= 0) {
						pos = levels;
					}
					if (pos > unlocked) {
						lock.play();
					} else {
						mus = _soundObject.so.create(packdir + pos + 'music', true);
						mus.loop = true;
						mus.play();
					}
				}
	}; //callback
}
function booter() {
	if (!data.safeguards) data.safeguards = 0;
	save();
	const fs = require('fs');
	if (fs.existsSync(packdir + 'boot.ogg') && !boot) {
		boot = true;
		exports.credits = credits = true;
		let input = new _input.KeyboardInput();
		input.init();
		_soundObject.so.directory = '';
		let bootSound = _soundObject.so.create(packdir + 'boot');
		bootSound.play();
		bootSound.sound.once("end", function () {
			input.justPressedEventCallback = null;
			(0, _menuHandler.mainMenu)();
		});
		_soundObject.so.directory = './sounds/';

		input.justPressedEventCallback = function (evt) {
			bootSound.sound.off("end");
			bootSound.stop();
			bootSound.destroy();
			input.justPressedEventCallback = null;
			(0, _menuHandler.mainMenu)();
		};
	} //if file exists
	else {
			exports.credits = credits = false;
			(0, _menuHandler.mainMenu)();
		}
}
async function addCash(c1, c2 = 0, callback) {
	let coinCap = -1;
	let cash = Math.ceil(c1 - c2);
	data.beatcoins += cash;
	save();
	let positive = true;
	let time = 370;
	if (cash < 0) positive = false;
	cash = Math.abs(cash);
	_soundObject.so.directory = "./sounds/";
	let snd;
	if (cash > 500000) {
		coinCap = 100000;
	} else if (cash <= 500000 && cash > 100001) {
		coinCap = 1000;
	} else if (cash <= 100000 && cash > 10001) {
		coinCap = 500;
	} else if (cash <= 10000 && cash > 501) {
		coinCap = 500;
	} else if (cash <= 500 && cash > 101) {
		coinCap = 100;
	} else if (cash <= 100 && cash > 11) {
		coinCap = 10;
	} else if (cash <= 10 && cash > 0) {
		coinCap = 1;
	}
	if (coinCap != -1) {
		if (!positive && cash >= 1000) coinCap = 1000; //yeah, you hear lose sound every 1k.
		if (positive) {
			snd = _soundObject.so.create("morecash" + coinCap);
			_tts.speech.speak(_strings.strings.get("youwin", [cash]));
		} //positive
		else if (!positive) {
				snd = _soundObject.so.create("lesscash");
				_tts.speech.speak(_strings.strings.get("youlose", [cash]));
			} //negative
		await _utilities.utils.sleep(400);
		if (cash >= coinCap) {
			snd.play();
			cash -= coinCap;
			let count = 0;
			for (let i = cash; i >= coinCap; i -= coinCap) {
				time -= 15;
				if (time < 80) time = 80;
			} //for
			for (let i = cash; i >= coinCap; i -= coinCap) {
				count++;
				setTimeout(function () {
					snd.play();
				}, time * count);
			} //for
			_soundObject.so.directory = "";
			if (typeof callback !== "undefined") {
				setTimeout(function () {
					callback();
				}, time * (count + 4));
			} //if callback undefined
		} //if greater than coin cap
	} //coinCap -1
	else {
			if (typeof callback !== "undefined") {
				callback();
			} //callback undefined
		} //else
} //function
function buySafeguards() {
	if (typeof data.safeguards === "undefined") data.safeguards = 0;
	let cash = data.beatcoins;
	if (cash > 100000) cash = 100000;
	let price = 700;
	let max = 0;
	let buying = 0;
	if (cash < price) {
		let error = new _scrollingText.ScrollingText(_strings.strings.get("noGuardCash", [price, data.beatcoins]), "\n", function () {
			_stateMachine.st.setState(2);
		});
	} else {
		for (let i = cash; i >= price; i -= price) {
			max++;
		}
		if (max > 0) {
			//menu
			const items = new Array();
			let slider = new _menuItem.SliderItem(0, _strings.strings.get("safequestion", [price, data.beatcoins, max]), 1, max, Math.floor(max / 2));
			items.push(slider);
			items.push(new _menuItem.MenuItem(1, _strings.strings.get("buy")));
			items.push(new _menuItem.MenuItem(2, _strings.strings.get("mBack")));

			_soundObject.so.directory = './sounds/';
			let dm = new _menu.Menu(_strings.strings.get("mSafeSelect"), items);
			_soundObject.so.directory = '';
			dm.run(s => {
				//console.log(s.items);
				_soundObject.so.directory = './sounds/';
				buying = s.items[0].value;
				dm.destroy();
				if (s.selected == 2) {
					_stateMachine.st.setState(2);
				} else {
					data.safeguards += buying;
					save();
					let snd = _soundObject.so.create("safebuy");
					snd.sound.once("end", function () {
						_stateMachine.st.setState(2);
					});
					addCash(0, buying * price, function () {
						snd.play();
					});
				}
			});
		} else {
			_stateMachine.st.setState(2);
		}
	}
}
function minigames() {
	if (typeof data.minis === "undefined") {
		data.minis = {};
		save();
	}
	let items = [];
	let str = "";
	let counter = -1;
	let name = "";
	for (var i in minis) {
		if (minis.hasOwnProperty(i)) {
			str = "";
			counter++;
			str += _strings.strings.get(i) + ", ";
			if (typeof data.minis[i] === "undefined") {
				str += _strings.strings.get("cost") + ": " + minis[i];
			} //type undefined
			else {
					str += _strings.strings.get("unlocked");
				}
			items.push(new _menuItem.MenuItem(i, str));
			console.log(str);
		} //own property
	} //for
	items.push(new _menuItem.MenuItem("-1", _strings.strings.get("mBack")));
	_soundObject.so.directory = "./sounds/";
	let mm = new _menu.Menu(_strings.strings.get("sGames"), items, _soundObject.so.create("minimusic"));
	mm.run(function (s) {
		mm.destroy();
		if (s.selected == "-1") {
			_stateMachine.st.setState(2);
			return;
		} else {
			name = s.selected;
			if (typeof data.minis[name] === "undefined") {
				if (data.beatcoins >= minis[name]) {
					question("buygame", [_strings.strings.get(name), minis[name]], function (answer) {
						if (!answer) {
							_stateMachine.st.setState(2);
							return;
						} else {
							addCash(0, minis[name], function () {
								data.minis[name] = true;
								save();
								runGame(name);
							});
						}
					});
				} else {
					new _scrollingText.ScrollingText(_strings.strings.get("nogame", [minis[name], data.beatcoins]), "\n", function () {
						_stateMachine.st.setState(2);
					});
				}
			} else {
				runGame(name);
			} //it is unlocked
		} //else
	});
} //function
function runGame(name) {
	if (name == "slot") {
		(0, _minis.playSlots)();
	} else if (name == "code") {
		(0, _minis.playCode)();
	} else {
		_stateMachine.st.setState(2);
	}
}

//tutorials
function minituts() {
	if (typeof data.minis === "undefined") {
		data.minis = {};
		save();
	}
	let items = [];
	let str = "";
	let counter = -1;
	let name = "";
	for (var i in minis) {
		if (minis.hasOwnProperty(i)) {
			str = "";
			counter++;
			str += _strings.strings.get(i) + ", ";
			items.push(new _menuItem.MenuItem(i, str));
			console.log(str);
		} //own property
	} //for
	items.push(new _menuItem.MenuItem("-1", _strings.strings.get("mBack")));
	_soundObject.so.directory = "./sounds/";
	let mm = new _menu.Menu(_strings.strings.get("sTuts"), items, _soundObject.so.create("minitut", true));
	mm.run(function (s) {
		mm.destroy();
		if (s.selected == "-1") {
			_stateMachine.st.setState(2);
			return;
		} else {
			runTut(s.selected);
		}
	});
}
function runTut(name) {
	new _scrollingText.ScrollingText(_strings.strings.get("tut" + name), "\n", function () {
		_stateMachine.st.setState(2);
	});
}
function safeget(amount, callback) {
	if (amount > 0) {
		data.safeguards += amount;
		save();
		new _scrollingText.ScrollingText(_strings.strings.get("safeget", [amount]), "\n", function () {
			callback();
		});
	} else {
		callback();
	}
}
async function editPack(path) {
	if (typeof path === "undefined" || path == "") {
		_stateMachine.st.setState(2);
		return;
	}
	await _utilities.utils.sleep(1000);
	console.log(path);
	path += "/";
	const fs = require('fs');
	const checkFiles = ["a1", "a2", "a3", "a4", "a5", "o2", "o3", "o4", "o5", "1music", "2music", "3music", "fail", "name", "loop", "select", "win"];
	const optionalFiles = ["boot", "credits", "nlevel", "pre1", "a6", "o6", "a7", "o7", "o8", "a8", "a9", "o9"];
	exports.editing = editing = true;
	let str = "";

	checkFiles.forEach(function (i, index) {
		if (!fs.existsSync(path + i + ".ogg")) {
			if (str == "") str = _strings.strings.get("missingFiles");
			str += "\n" + i + ".ogg: " + _strings.strings.get("f" + i);
		}
	});
	if (str != "") {
		new _scrollingText.ScrollingText(str, "\n", function () {
			_stateMachine.st.setState(2);
		});
		return;
	}
	str = "";
	optionalFiles.forEach(function (i, index) {
		if (!fs.existsSync(path + i + ".ogg")) {
			if (str == "") str = _strings.strings.get("missingOptional");
			str += "\n" + i + ".ogg: " + _strings.strings.get("f" + i);
		}
	});
	if (str != "") {
		new _scrollingText.ScrollingText(str, "\n", function () {
			editPackDefinite(path);
		});
	} else {
		editPackDefinite(path);
	}
}
async function editPackDefinite(path) {
	const fs = require('fs');
	_soundObject.so.directory = path;
	let levels = 3;
	let stop = false;
	while (!stop) {
		if (fs.existsSync(path + levels + "music.ogg")) {
			levels++;
		} else {
			levels--;
			stop = true;
		}
	}
	console.log("music levels" + levels);
	let fileLevels = [];
	if (fs.existsSync(path + 'bpm.txt')) {
		let fileData = fs.readFileSync(path + 'bpm.txt', 'utf8');
		fileLevels = fileData.split(',');
		if (fileLevels[fileLevels.length - 1] == "") {
			fileLevels.splice(fileLevels.length - 1, 1);
		}
	} else {}
	let str = "";
	for (let i = 0; i < fileLevels.length; i++) {
		str += fileLevels[i] + ",";
	}
	console.log(str);
	_soundObject.so.directory = "./sounds/";
	console.log("levels" + fileLevels.length);
	let items = [];
	items.push(new _menuItem.MenuItem(-2, _strings.strings.get("mPackTut")));
	items.push(new _menuItem.MenuItem(0, _strings.strings.get("startOver")));
	for (let i = 1; i < fileLevels.length; i++) {
		items.push(new _menuItem.MenuItem(i, _strings.strings.get("level", [i])));
	}
	items.push(new _menuItem.MenuItem(-1, _strings.strings.get("mBack")));
	let start = -1;
	let limit = levels;
	let mm = new _menu.Menu(_strings.strings.get("mSelectEdit"), items);
	mm.run(async s => {
		start = s.selected;
		mm.destroy();
		if (start == -1) {
			_stateMachine.st.setState(2);
			return;
		}
		if (start == -2) {
			new _scrollingText.ScrollingText(_strings.strings.get("packtut"), "\n", () => {
				editPackDefinite(path);
			}); //tutorial
			return;
		}
		if (start > 0) limit = start;
		if (start == 0) start++;
		let timer = new _oldtimer.OldTimer();
		let pos = _soundObject.so.create("positive");
		let pool = new _soundHandler.SoundHandler();
		let arr = [];
		let inp = new _input.KeyboardInput();
		inp.init();
		let space = _soundObject.so.create("pbeep", true);
		_soundObject.so.directory = path;
		let music;
		let mCounter = 0;
		fileLevels[0] = "0,";
		for (let i = start; i <= limit; i++) {
			mCounter = i;
			arr = [];
			timer.restart();
			if (typeof music !== "undefined") music.stop();
			music = _soundObject.so.create(i + "music");
			music.loop = true;
			music.volume = 0.5;
			music.play();
			while (arr.length < 10) {
				await _utilities.utils.sleep(5);
				if (inp.isJustPressed(_keycodes.KeyEvent.DOM_VK_SPACE)) {
					arr.push(timer.elapsed);
					timer.restart();
					space.play();
				} //if
			} //while
			console.log("avg" + _utilities.utils.averageInt(arr, 1));
			fileLevels[i] = _utilities.utils.averageInt(arr, 1);
			let cont = false;
			music.seek(0);
			timer.restart();
			while (!cont) {
				await _utilities.utils.sleep(5);
				if (timer.elapsed >= fileLevels[i]) {
					timer.restart();
					space.play();
				} //timer elapsed
				if (inp.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
					arr = [];
					break;
				}
				if (inp.isJustPressed(_keycodes.KeyEvent.DOM_VK_SPACE)) {
					arr = [];
					i--;
					break;
				}
			} //second while
		} //limit for
		_soundObject.so.directory = "./sounds/";
		pos.play();
		music.stop();
		//write shit
		if (fs.existsSync(path + "bpm.txt")) fs.unlinkSync(path + "bpm.txt");
		let str = "";
		for (let i = 0; i < fileLevels.length; i++) {
			if (fileLevels[i] != "") {
				str += fileLevels[i] + ",";
			}
		}
		fs.writeFileSync(path + "bpm.txt", str);
		pos.sound.once("end", () => {
			_soundObject.so.kill(() => {
				_stateMachine.st.setState(2);
			}); //kill call
		});
	}); //menu callback
} //function
},{"./oldtimer":18,"./minis.js":3,"./player":5,"./menuItem":6,"./menu":7,"./menuHandler":8,"./scrollingText":9,"./strings":10,"./soundHandler":11,"./tts":12,"./utilities":13,"./soundObject":14,"./keycodes":16,"./stateMachine":15,"./input.js":4}],26:[function(require,module,exports) {
var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
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
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
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

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = (
    '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
      '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
      '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
      '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' +
      '<pre>' + stackTrace.innerHTML + '</pre>' +
    '</div>'
  );

  return overlay;

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
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id)
  });
}

},{}]},{},[26,1])
//# sourceMappingURL=/main.map