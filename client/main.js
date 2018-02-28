process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="";require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({6:[function(require,module,exports) {
"use strict";if(Object.defineProperty(exports,"__esModule",{value:!0}),void 0===_)var _={DOM_VK_CANCEL:3,DOM_VK_HELP:6,DOM_VK_BACK_SPACE:8,DOM_VK_TAB:9,DOM_VK_CLEAR:12,DOM_VK_RETURN:13,DOM_VK_ENTER:14,DOM_VK_SHIFT:16,DOM_VK_CONTROL:17,DOM_VK_ALT:18,DOM_VK_PAUSE:19,DOM_VK_CAPS_LOCK:20,DOM_VK_ESCAPE:27,DOM_VK_SPACE:32,DOM_VK_PAGE_UP:33,DOM_VK_PAGE_DOWN:34,DOM_VK_END:35,DOM_VK_HOME:36,DOM_VK_LEFT:37,DOM_VK_UP:38,DOM_VK_RIGHT:39,DOM_VK_DOWN:40,DOM_VK_PRINTSCREEN:44,DOM_VK_INSERT:45,DOM_VK_DELETE:46,DOM_VK_0:48,DOM_VK_1:49,DOM_VK_2:50,DOM_VK_3:51,DOM_VK_4:52,DOM_VK_5:53,DOM_VK_6:54,DOM_VK_7:55,DOM_VK_8:56,DOM_VK_9:57,DOM_VK_SEMICOLON:59,DOM_VK_EQUALS:61,DOM_VK_A:65,DOM_VK_B:66,DOM_VK_C:67,DOM_VK_D:68,DOM_VK_E:69,DOM_VK_F:70,DOM_VK_G:71,DOM_VK_H:72,DOM_VK_I:73,DOM_VK_J:74,DOM_VK_K:75,DOM_VK_L:76,DOM_VK_M:77,DOM_VK_N:78,DOM_VK_O:79,DOM_VK_P:80,DOM_VK_Q:81,DOM_VK_R:82,DOM_VK_S:83,DOM_VK_T:84,DOM_VK_U:85,DOM_VK_V:86,DOM_VK_W:87,DOM_VK_X:88,DOM_VK_Y:89,DOM_VK_Z:90,DOM_VK_CONTEXT_MENU:93,DOM_VK_NUMPAD0:96,DOM_VK_NUMPAD1:97,DOM_VK_NUMPAD2:98,DOM_VK_NUMPAD3:99,DOM_VK_NUMPAD4:100,DOM_VK_NUMPAD5:101,DOM_VK_NUMPAD6:102,DOM_VK_NUMPAD7:103,DOM_VK_NUMPAD8:104,DOM_VK_NUMPAD9:105,DOM_VK_MULTIPLY:106,DOM_VK_ADD:107,DOM_VK_SEPARATOR:108,DOM_VK_SUBTRACT:109,DOM_VK_DECIMAL:110,DOM_VK_DIVIDE:111,DOM_VK_F1:112,DOM_VK_F2:113,DOM_VK_F3:114,DOM_VK_F4:115,DOM_VK_F5:116,DOM_VK_F6:117,DOM_VK_F7:118,DOM_VK_F8:119,DOM_VK_F9:120,DOM_VK_F10:121,DOM_VK_F11:122,DOM_VK_F12:123,DOM_VK_F13:124,DOM_VK_F14:125,DOM_VK_F15:126,DOM_VK_F16:127,DOM_VK_F17:128,DOM_VK_F18:129,DOM_VK_F19:130,DOM_VK_F20:131,DOM_VK_F21:132,DOM_VK_F22:133,DOM_VK_F23:134,DOM_VK_F24:135,DOM_VK_NUM_LOCK:144,DOM_VK_SCROLL_LOCK:145,DOM_VK_COMMA:188,DOM_VK_PERIOD:190,DOM_VK_SLASH:191,DOM_VK_BACK_QUOTE:192,DOM_VK_OPEN_BRACKET:219,DOM_VK_BACK_SLASH:220,DOM_VK_CLOSE_BRACKET:221,DOM_VK_QUOTE:222,DOM_VK_META:224};exports.KeyEvent=_;
},{}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=!0;class t{constructor(e=!1){this.synth=window.speechSynthesis,this.webTTS=e}speak(e){if(!this.webTTS){document.getElementById("speech").innerHTML="";var t=document.createElement("p");return t.appendChild(document.createTextNode(e)),void document.getElementById("speech").appendChild(t)}var s=new SpeechSynthesisUtterance(e);this.synth.stop(),this.synth.speak(s)}setWebTTS(e){this.webTTS=e}}if(void 0===s)var s=new t;exports.TTS=t,exports.speech=s;
},{}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.so=void 0;var s,e=require("howler"),t=require("./tts"),o=!0;class n{constructor(s,t=0,o=0){var n=this;this.onMemory=0,this.fileName=s,this.sound=new e.Howl({src:s,onload:function(){n.doneLoading()}}),this.timeout=setTimeout(function(){n.checkProgress()},2e3),this.loaded=!1,this.callback=t,this.timeToLoad=performance.now(),this.tag=o}checkProgress(){if("loaded"==this.sound.state())this.doneLoading();else{var s=this;this.timeout=setTimeout(function(){s.checkProgress()},500)}}doneLoading(){clearTimeout(this.timeout),this.loaded=!0,0!=this.callback&&this.callback()}play(){this.sound.play()}stop(){this.sound.stop()}pause(){this.sound.pause()}destroy(){t.speech.speak("yay"),this.sound.unload()}unload(){this.sound.unload()}get volume(){return this.sound.volume()}set volume(s){return this.sound.volume(s)}set loop(s){return this.sound.loop(s)}get loop(){return this.sound.loop()}get playing(){return this.sound.playing()}get playbackRate(){return this.sound.rate()}set playbackRate(s){return this.sound.rate(s)}get currentTime(){return this.sound.seek()}get duration(){return this.sound.duration}get position(){return this.sound.seek()}set currentTime(s){return this.sound.seek(s)}seek(s){return this.sound.seek(s)}}class i{constructor(){this.sounds=new Array,this.oneShots=new Array,this.debug=!1,this.loadingQueue=!1,this.queueCallback=0,this.loadedSounds=0,this.loadingSounds=0,this.loadedCallback=0,this.queue=new Array,this.queueLength=0,this.statusCallback=null,this.extension=".ogg",1==o?this.directory="./sounds/":(this.directory="../soundsopus/",this.extension=".opus"),this.oneShotSound=null}setStatusCallback(s){this.statusCallback=s}findSound(s){for(var e in this.sounds)if(this.sounds[e].fileName==s)return this.sounds[e];return-1}findSoundIndex(s){for(var e in this.sounds)if(this.sounds[e].fileName==s)return e;return-1}resetQueuedInstance(){for(var s=0;s<this.sounds.length;s++)void 0!==this.sounds[s]&&1==this.sounds[s].tag&&(this.sounds[s].sound.unload(),this.sounds.splice(s,1));this.loadingQueue=!1,this.queueCallback=0,this.loadedSounds=0,this.loadingSounds=0,this.loadedCallback=0,this.queue=new Array,this.queueLength=0,this.statusCallback=null}create(s){s=this.directory+s+this.extension;var e,t=this;return e=new n(s,function(){t.doneLoading()}),this.sounds.push(e),e}enqueue(s){s=this.directory+s+this.extension,this.queue.push(s),this.queueLength=this.queue.length}loadQueue(){this.handleQueue(),this.loadingQueue=!0}setQueueCallback(s){this.queueCallback=s}resetQueue(){this.queue=new Array,this.loadingQueue=!1}handleQueue(){if(this.queue.length>0){var s=this;if(void 0!==this.statusCallback&&null!=this.statusCallback&&this.statusCallback(1-this.queue.length/this.queueLength),-1!=this.findSound(this.queue[0]))return this.queue.splice(0,1),void this.handleQueue();this.sounds.push(new n(this.queue[0],function(){s.handleQueue()},1)),this.queue.splice(0,1)}else this.loadingQueue=!1,console.log("finished with queue."),void 0!==this.queueCallback&&0!=this.queueCallback&&this.queueCallback()}setCallback(s){this.loadedCallback=s}doneLoading(){1==this.isLoading()&&void 0!==this.loadedCallback&&0!=this.loadedCallback&&null!=this.loadedCallback&&this.loadedCallback()}isLoading(){this.loadedSounds=0,this.loadingSounds=0;new Array;for(var s=0;s<this.sounds.length;s++)void 0!==this.sounds[s]&&(0==this.sounds[s].loaded?this.loadingSounds++:this.loadedSounds++);return this.loadedSounds/this.sounds.length}playOnce(s){this.oneShotSound=u.create(s),this.oneShots.push(this.oneShotSound),this.oneShotSound.play();var e=new Array,o=this;this.oneShotSound.on("ended",function(){for(var s=0;s<o.oneShots.length;s++)0==o.oneShots[s].playing&&(o.oneShots[s].unload(),e.push(s));for(s=0;s<e.length;s++)0==o.oneShotSounds[s].playing&&(o.oneShotSounds.splice(e[s],1),t.speech.speak("destroyed."+e[s]))})}destroy(s,e=0){for(var t=!1,o=this.directory+s+this.extension;!t;){var n=this.findSoundIndex(o);console.log("found "+n),-1==n?t=!0:(this.sounds[n].sound.unload(),console.log("state after destroy"+this.sounds[n].sound.state()),this.sounds.splice(n,1),console.log("destroyed "+this.sounds.length))}0!=e&&e()}kill(s=0){for(;this.sounds.length>0;)this.sounds.splice(0,1);e.Howler.unload(),0!=s&&s()}}let u=new i;exports.so=u;
},{"./tts":5}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.speech=exports.ScrollingText=void 0;var e=require("jquery"),t=r(e),s=require("./keycodes"),n=require("./soundObject"),i=require("./tts");function r(e){return e&&e.__esModule?e:{default:e}}if(void 0===a)var a=new i.TTS;if(void 0==d)var d=0;class h{constructor(e,t="\n",s=0){this.text=e,this.delimiter=t,this.splitText=this.text.split(t),this.currentLine=0,this.sndOpen=n.so.create("UI/textOpen"),this.sndContinue=n.so.create("UI/textScroll"),this.sndClose=n.so.create("UI/textClose"),this.callback=s;document.getElementById("touchArea");this.init()}init(){d=this,document.addEventListener("keydown",this.handleKeys),this.sndOpen.play(),this.currentLine=0,this.readCurrentLine()}handleKeys(e){switch(e.which){case s.KeyEvent.DOM_VK_UP:case s.KeyEvent.DOM_VK_DOWN:case s.KeyEvent.DOM_VK_LEFT:case s.KeyEvent.DOM_VK_RIGHT:d.readCurrentLine();break;case s.KeyEvent.DOM_VK_RETURN:d.advance()}}handleTap(e){0==e&&this.readCurrentLine(),1==e&&this.advance()}readCurrentLine(){a.speak(this.splitText[this.currentLine])}advance(){this.currentLine<this.splitText.length-1?(this.currentLine++,this.sndContinue.play(),this.readCurrentLine()):(this.sndClose.play(),this.sndClose.unload(),this.sndOpen.unload(),this.sndContinue.unload(),document.removeEventListener("keydown",this.handleKeys),0!=this.callback&&this.callback())}}exports.ScrollingText=h,exports.speech=a;
},{"./keycodes":6,"./soundObject":10,"./tts":5}],2:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(){this.strings={},this.strings[1]={mStart:"Start Game",mLearn:"Learn the pack",tamperWarning:"This pack has been tampered with and is no longer unlocked. Press enter to continue.",mNew:"Get new packs",mBrowse:"Browse downloaded packs",mHashes:"Rebuild packs folder"}}get(e,s){return this.strings[e][s]}}var s=exports.strings=new e;
},{}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SoundSource=void 0;var t=require("./soundObject.js");class s{constructor(s,e=0,i=0,h=0,o=!0){this.x=e,this.y=i,this.z=h,this.loop=o,this.sound=t.so.create(s),this.sound.loop=o,this.pan.setPosition(this.x,this.y,this.z),this.rate=1,this.speed=0,this.minRate=.8,this.maxRate=1.2,this.toDestroy=!1,this.rateShiftSpeed=.015,this.sound.currentPosition=0}play(){this.sound.seek(0),this.sound.play()}pos(t,s,e){this.x=t,this.y=s,this.z=e,this.pan.setPosition(this.x,this.y,this.z)}update(){}setDoppler(t,s,e){if(s>=0)if(-1==e){var i=44100*(1-(s+=this.speed)/240);this.rate=i/44100}else{i=44100/(1-(s+=this.speed)/240);this.rate=i/44100}else this.rate=1;this.rate>this.sound.playbackRate+this.rateShiftSpeed?this.sound.playbackRate+=this.rateShiftSpeed:this.rate<this.sound.playbackRate-this.rateShiftSpeed&&(this.sound.playbackRate-=this.rateShiftSpeed)}setSpeed(t){this.speed=t}destroy(){this.sound.destroy(),this.toDestroy=!0}}exports.SoundSource=s;
},{"./soundObject.js":10}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SoundHandler=void 0;var t=require("./soundSource.js"),s=require("./soundObject.js");class i{constructor(t=!1){this.staticSounds=[],this.dynamicSounds=[],this.currentDynamicSound=0,this.maxDynamicSounds=512,this.currentStaticSound=0,this.maxStaticSounds=512,this.reuseSounds=!0,this.x=0,this.y=0,this.z=0,this.directional=t}playStatic(t,s=1,i=-1){return(i=-1)&&(i=this.findFreeStaticSlot()),this.staticSounds[i]=new n(t,this.directional),1==s&&(this.staticSounds[i].sound.loop=!0),this.staticSounds[i].sound.play(),console.log("slot "+i),i}findFreeStaticSlot(){for(let t=0;t<this.maxStaticSounds;t++)if(-1==this.staticSounds[t]||void 0===this.staticSounds[t])return t;return this.currentStaticSound<this.maxStaticSounds?(this.currentStaticSound++,this.currentStaticSound):(this.currentStaticSound=0,this.currentStaticSound)}findFreeDynamicSlot(){for(let t=0;t<this.maxDynamicSounds;t++)if(-1==this.dynamicSounds[t]||void 0===this.dynamicSounds[t])return t;return this.currentDynamicSound<this.maxDynamicSounds?(this.currentDynamicSound++,this.currentDynamicSound):(this.currentDynamicSound=0,this.currentDynamicSound)}findDynamicSound(t){for(let s=0;s<this.dynamicSounds.length;s++)if(this.dynamicSounds[s].file==t)return s;return-1}play(t){let s=0,i=0;this.reuseSounds&&(s=this.findDynamicSound(t),i=!0),-1!=s&&0!=this.reuseSounds||(s=this.findFreeDynamicSlot(),i=!1),void 0===this.dynamicSounds[s]?0==i&&(this.dynamicSounds[s]=new n(t,this.directional),console.log("Created sound")):0==i&&(this.dynamicSounds[s].sound.destroy(),this.dynamicSounds[s]=new n(t,directional),console.log("Destroyed and reloaded")),console.log("playing sound"),this.dynamicSounds[s].sound.play()}update(t){if(1==this.directional)for(let s=0;s<this.dynamicSounds.length;s++)this.dynamicSounds[s].sound.pos(t.x,t.y,t.z)}destroy(){for(var t=0;t<this.dynamicSounds.length;t++)console.log("destroying"+t),this.dynamicSounds[t].destroy(),this.dynamicSounds.splice(t,1);for(t=0;t<this.staticSounds.length;t++)this.staticSounds[t].destroy(),console.log("destroying"+t),this.staticSounds.splice(t,1)}}class n{constructor(i,n=!1){this.file=i,this.threeD=n,1==this.threeD?this.sound=new t.SoundSource(i,0,0,0):this.sound=s.so.create(i)}destroy(){this.sound.destroy()}}exports.SoundHandler=i;
},{"./soundSource.js":11,"./soundObject.js":10}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{distance3D(t,e,r,a,n,s){return Math.sqrt((a-t)*(a-t)+(n-e)*(n-e)+(s-r)*(s-r))}distance(t,e,r,a){return Math.sqrt((t-r)*(t-r)+(e-a)*(e-a))}calculateAngle(t,e,r,a){var n=Math.atan2(a-e,r-t);return n=n>=0?0:2*Math.PI+n}isCollide3D(t,e){return t.x<=e.x+e.width&&t.x+t.width>=e.x&&t.y<=e.y+e.height&&t.y+t.height>=e.y&&t.z<=e.z+e.depth&&t.z+t.depth>=e.z}randomInt(t,e){return Math.floor(Math.random()*(e-t+1))+t}getRandomArbitrary(t,e){return Math.random()*(e-t)+t}sleep(t){return new Promise(e=>setTimeout(e,t))}percent(t,e){return 100*t/e}}var e=exports.utils=new t;
},{}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.KeyboardInput=void 0;var e=require("jquery"),s=t(e);function t(e){return e&&e.__esModule?e:{default:e}}class i{constructor(){this.keyDown=[],this.justPressed=[],this.justReleased=[],this.justPressedEventCallback=null}init(){var e=this;document.addEventListener("keydown",function(s){e.handleKeyDown(s)}),document.addEventListener("keyup",function(s){e.handleKeyUp(s)})}handleKeyDown(e){1==this.keyDown[e.which]&&void 0!==this.keyDown[e.which]||(this.keyDown[e.which]=!0,this.justPressed[e.which]=!0,this.justReleased[e.which]=!1,void 0!==this.justPressedEventCallback&&null!=this.justPressedEventCallback&&this.justPressedEventCallback(e.which))}handleKeyUp(e){1==this.keyDown[e.which]&&(this.keyDown[e.which]=!1,this.justPressed[e.which]=!1,this.justReleased[e.which]=!0)}isDown(e){return this.keyDown[e]}isJustPressed(e){return 1==this.justPressed[e]&&(this.justPressed[e]=!1,!0)}isJustReleased(e){return!!this.justReleased[e]&&(this.justReleased[e]=!1,!0)}keysDown(){var e=[];return this.keyDown.forEach(function(s,t){s&&e.push(t)}),e}keysPressed(){var e=[];return this.justPressed.forEach(function(s,t){s&&e.push(t)}),this.justPressed.splice(),e}keysReleased(){var e=[];return this.justReleased.forEach(function(s,t){s&&e.push(t)}),this.justReleased.splice(),e}}exports.KeyboardInput=i;
},{}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MenuTypes=exports.MenuItem=void 0;var t=require("./tts");if(void 0===e)var e=new t.TTS;var s={NORMAL:0,SELECTOR:1,SLIDER:2,EDIT:3};class i{constructor(t,e){this.name=e,this.id=t,this.type=s.NORMAL}speak(){e.speak(this.name)}select(){return this.id}}class r extends i{constructor(t,e,i,r=0,n){super(),this.id=t,this.name=e,this.options=i,this.type=s.SELECTOR,this.currentOption=r,this.selectCallback=n}speak(){e.speak(this.name+". Selector. Set to "+this.options[this.currentOption])}increase(){this.currentOption<this.options.length-1&&this.currentOption++,e.speak(this.options[this.currentOption]),void 0!==this.selectCallback&&this.selectCallback(this.options[this.currentOption])}decrease(){this.currentOption>0&&this.currentOption--,e.speak(this.options[this.currentOption]),void 0!==this.selectCallback&&this.selectCallback(this.options[this.currentOption])}select(){return this.id}}class n extends i{constructor(t,e,i,r,n=0){super(),this.id=t,this.name=e,this.minValue=i,this.maxValue=r,this.currentValue=n,this.type=s.SLIDER}speak(){e.speak(this.name+". Slider. Set to "+this.currentValue)}increase(){this.currentValue<this.maxValue&&this.currentValue++,e.speak(this.currentValue)}decrease(){this.currentValue>this.minValue&&this.currentValue--,e.speak(this.currentValue)}select(){return this.id}}class h extends i{constructor(t,e,i=""){super(),this.id=t,this.name=e,this.text=i,this.type=s.EDIT}speak(){e.speak(this.name+". Editable. "+(""==this.text?"Nothing entered.":"Set to "+this.text))}addChar(t){this.text+=t,e.speak(t)}removeChar(){this.text=this.text.substring(0,this.text.length-1),e.speak(this.text)}select(){return this.text}}exports.MenuItem=i,exports.MenuTypes=s;
},{"./tts":5}],16:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Menu=void 0;var e=require("./utilities"),s=require("./strings"),t=require("./tts"),i=require("jquery"),a=o(i),u=require("./soundObject.js"),n=require("./menuItem"),r=require("./keycodes"),h=require("./input");function o(e){return e&&e.__esModule?e:{default:e}}class c{constructor(e,s,t){this.menuData=s,this.cursor=0,this.name=e,this.sndKeyChar=u.so.create("ui/keyChar"),this.sndKeyDelete=u.so.create("ui/keyDelete"),this.sndSliderLeft=u.so.create("ui/menuSliderLeft"),this.sndSliderRight=u.so.create("ui/menuSliderRight"),this.sndBoundary=u.so.create("ui/menuBoundary"),this.sndChoose=u.so.create("ui/menuChoose"),this.sndMove=u.so.create("ui/menuMove"),this.sndOpen=u.so.create("ui/menuOpen"),this.sndSelector=u.so.create("ui/menuSelector"),this.sndWrap=u.so.create("ui/menuWrap"),this.selectCallback=null,void 0!==t&&(this.music=t);document.getElementById("touchArea")}nextItem(){this.cursor<this.menuData.length-1&&this.cursor++,this.sndMove.play(),this.menuData[this.cursor].speak()}previousItem(){this.cursor>0&&this.cursor--,this.sndMove.play(),this.menuData[this.cursor].speak()}increase(){this.menuData[this.cursor].type!=n.MenuTypes.SLIDER&&this.menuData[this.cursor].type!=n.MenuTypes.SELECTOR||(this.menuData[this.cursor].increase(),this.menuData[this.cursor].type==n.MenuTypes.SLIDER?this.sndSliderRight.play():this.sndSelector.play())}decrease(){this.menuData[this.cursor].type!=n.MenuTypes.SLIDER&&this.menuData[this.cursor].type!=n.MenuTypes.SELECTOR||(this.menuData[this.cursor].decrease(),this.menuData[this.cursor].type==n.MenuTypes.SLIDER?this.sndSliderLeft.play():this.sndSelector.play())}insertCharacter(e){this.menuData[this.cursor].type==n.MenuTypes.EDIT&&(this.menuData[this.cursor].addChar(String.fromCharCode(e)),this.sndKeyChar.play())}removeCharacter(){this.menuData[this.cursor].type==n.MenuTypes.EDIT&&(this.menuData[this.cursor].removeChar(),this.sndKeyDelete.play())}handleInput(e){this.insertCharacter(e.which)}destroySounds(){this.sndKeyChar.unload(),this.sndKeyDelete.unload(),this.sndSliderLeft.unload(),this.sndSliderRight.unload(),this.sndBoundary.unload(),this.sndChoose.unload(),this.sndMove.unload(),this.sndOpen.unload(),this.sndSelector.unload(),this.sndWrap.unload(),void 0!==this.music&&this.music.unload()}async fade(){for(var s=this.music.volume;s>0;s-=.06)this.music.volume=s,await e.utils.sleep(50);this.music.unload(),this.unload()}unload(){(0,a.default)(document).off("keydown"),(0,a.default)(document).off("keypress");var e=this;setTimeout(function(){e.destroySounds()},500)}handleKeys(e){switch(e.which){case r.KeyEvent.DOM_VK_RETURN:this.select();break;case r.KeyEvent.DOM_VK_PAGE_UP:this.music.volume+=.03;break;case r.KeyEvent.DOM_VK_PAGE_DOWN:this.music.volume-=.03;break;case r.KeyEvent.DOM_VK_BACK_SPACE:this.removeCharacter();break;case r.KeyEvent.DOM_VK_DOWN:this.nextItem();break;case r.KeyEvent.DOM_VK_UP:this.previousItem();break;case r.KeyEvent.DOM_VK_RIGHT:this.increase();break;case r.KeyEvent.DOM_VK_LEFT:this.decrease()}}run(e){"object"==typeof this.music?(this.music.volume=.5,this.music.loop=!0,this.music.play()):"string"==typeof this.music&&(this.music=u.so.create(this.music),this.music.volume=.5,this.music.loop=!0,this.music.play()),this.selectCallback=e;var s=this;(0,a.default)(document).on("keypress",function(e){s.handleInput(e)}),(0,a.default)(document).on("keydown",function(e){s.handleKeys(e)}),t.speech.speak(this.name),this.sndOpen.play()}handleSwipe(e){3==e&&this.decrease(),4==e&&this.increase(),0==e&&this.previousItem(),1==e&&this.nextItem(),2==e&&this.select()}select(){for(var e=this.menuData[this.cursor].id,s=[],t=0;t<this.menuData.length;t++){var i=null;this.menuData[t].type==n.MenuTypes.SLIDER&&(i={id:this.menuData[t].id,value:this.menuData[t].currentValue,name:this.menuData[t].options[this.menuData[t].currentValue]}),this.menuData[t].type==n.MenuTypes.EDIT&&(i={id:this.menuData[t].id,value:this.menuData[t].text}),this.menuData[t].type==n.MenuTypes.SELECTOR&&(i={id:this.menuData[t].id,value:this.menuData[t].currentOption,name:this.menuData[t].options[this.menuData[t].currentOption]}),s.push(i)}var u={selected:e,cursor:this.cursor,items:s};this.sndChoose.play(),(0,a.default)(document).off("keydown"),(0,a.default)(document).off("keypress"),void 0!==this.music&&this.fade();var r=this;setTimeout(function(){r.selectCallback(u)},700)}}exports.Menu=c;
},{"./utilities":4,"./strings":2,"./tts":5,"./soundObject.js":10,"./menuItem":15,"./keycodes":6,"./input":9}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mainMenu=u;var e=require("./soundObject"),s=require("./main"),t=require("./stateMachine"),r=require("./strings"),n=require("./menuItem"),a=require("./menu");function u(){var u=new Array;u.push(new n.MenuItem(0,r.strings.get(s.lang,"mStart"))),u.push(new n.MenuItem(1,r.strings.get(s.lang,"mLearn"))),u.push(new n.MenuItem(2,r.strings.get(s.lang,"mBrowse"))),u.push(new n.MenuItem(3,r.strings.get(s.lang,"mHashes")));var i=new a.Menu("main menu",u);e.so.directory="",i.music=s.packdir+"loop",require("fs").existsSync(s.packdir+"select.ogg")&&(i.sndChoose.unload(),i.sndChoose=e.so.create(s.packdir+"select")),i.run(function(r){switch(e.so.directory="./sounds/",r.selected){case 0:t.st.setState(3);break;case 1:t.st.setState(4);break;case 2:t.st.setState(5);break;case 3:(0,s.rebuildHashes)()}})}
},{"./soundObject":10,"./main":1,"./stateMachine":7,"./strings":2,"./menuItem":15,"./menu":16}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(){this.elapsed,this.paused=!0,this.lastTime=0,this.pauseWhen=0,this.started=!0}isActive(){return!paused&started}get elapsed(){return this.paused?this.pauseWhen-this.lastTime:performance.now()-this.lastTime}pause(){this.paused=!0,this.pauseWhen=performance.now()}reset(){this.lastTime=performance.now(),this.pauseWhen=0,this.paused=!1,this.started=!0}resume(){this.paused=!1,this.started=!0,this.lastTime+=performance.now()-this.pauseWhen}}exports.OldTimer=e;
},{}],18:[function(require,module,exports) {
function n(n,e){var t,o=0,r=!1,i=0,u=0,a=e||1/120;function c(e){if(null!==o)for(i+=(e-o)/1e3;i>a;)n.update(a,u),u+=1,i-=a;o=e,n.render(),r&&(t=requestAnimationFrame(c))}function l(){o=null,r=!0,t=requestAnimationFrame(c)}function f(){r=!1,cancelAnimationFrame(t),console.log(t)}return{start:l,stop:f,change:function(n){i=a=n||1/120,u=0,f(),l()}}}module.exports=n;
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Game=void 0;var e=require("fs"),s=k(e),t=require("os"),i=k(t),r=require("./tts"),a=require("./main"),o=require("jquery"),l=k(o),u=require("./oldtimer"),n=require("./soundHandler"),c=require("./utilities"),h=require("./soundObject"),p=require("./stateMachine"),d=require("./timer"),y=k(d),v=require("./scrollingText"),m=require("./input.js"),f=require("./keycodes.js");function k(e){return e&&e.__esModule?e:{default:e}}class g{constructor(){this.canPause=!0,this.actionCompleted=!1,this.toDestroy=new Array,this.scoreTimer=new u.OldTimer;var e=this;(0,l.default)(document).on("blur",function(){e.pause()}),this.pauseTime=0,this.timer=null,this.music=null,this.score=0,this.pool=new n.SoundHandler,this.bpms=null,this.level=0,this.fileData=null,this.input=new m.KeyboardInput,this.input.init(),this.levels=null;e=this;this.setup()}setup(){if(s.default.existsSync(a.packdir+"bpm.txt"))this.fileData=s.default.readFileSync(a.packdir+"bpm.txt","utf8");else new v.ScrollingText("There was an error loading the pack "+this.pack+".","\n",function(){p.st.setState(2)});this.bpms=this.fileData.split(","),this.levels=this.bpms.length-1,""==this.bpms[this.levels]&&this.levels--,this.level++,h.so.directory="",s.default.existsSync(a.packdir+"nlevel.ogg")&&h.so.enqueue(a.packdir+"nlevel"),s.default.existsSync(a.packdir+"fail.ogg")&&h.so.enqueue(a.packdir+"fail");for(var e=1;e<=10;e++)s.default.existsSync(a.packdir+"a"+e+".ogg")&&(h.so.enqueue(a.packdir+"a"+e),this.actions=e),s.default.existsSync(a.packdir+"o"+e+".ogg")&&h.so.enqueue(a.packdir+"o"+e);this.keys=a.actionKeys;var t=this;this.timer=(0,y.default)({update:function(e){t.update(e)},render:function(){t.render()}},this.bpms[this.level]/1e3),h.so.setQueueCallback(function(){h.so.directory="./sounds/",t.setupLevel()}),this.queueLevels(),h.so.loadQueue()}update(e){if(0!=this.currentAction)if(!this.actionCompleted&&this.action>1)this.fail();else{if(this.currentAction++,this.currentAction>=this.numberOfActions)return h.so.directory="",h.so.destroy(a.packdir+this.level+"music"),h.so.destroy(a.packdir+"pre"+this.level),h.so.directory="./sounds/",this.level++,this.timer.stop(),void this.setupLevel();this.action=c.utils.randomInt(1,this.actions),this.actionCompleted=!1,h.so.directory="",this.pool.playStatic(a.packdir+"a"+this.action,0),h.so.directory="./sounds/",this.scoreTimer.reset()}else this.currentAction++}async fail(){this.timer.stop();var e=this.music;h.so.directory="";var s=this.pool.playStatic(a.packdir+"fail",0);h.so.directory="./sounds/";for(var t=e.playbackRate;t>0;t-=.05)e.playbackRate=t,await c.utils.sleep(30);for(e.unload();this.pool.staticSounds[s].sound.playing;)await c.utils.sleep(10),this.input.isDown(f.KeyEvent.DOM_VK_RETURN)&&(r.speech.speak("meow"),this.pool.staticSounds[s].sound.unload());h.so.resetQueue(),h.so.resetQueuedInstance(),h.so.kill(function(){p.st.setState(2)})}async quit(){this.timer.stop();for(var e=this.music,s=e.playbackRate;s>0;s-=.045)e.playbackRate=s,await c.utils.sleep(30);e.unload(),h.so.resetQueue(),h.so.resetQueuedInstance(),p.st.setState(2)}render(){this.input.isJustPressed(f.KeyEvent.DOM_VK_Q)?this.quit():this.input.isJustPressed(f.KeyEvent.DOM_VK_P)?this.pause():this.handleKeys()}handleKeys(){if(!this.actionCompleted){var e=this.input.keysPressed();if(e.length>0&&1==this.action)this.fail();else{if(!(e.length>1))return 1==e.length&&e[0]==this.keys[this.action]?(h.so.directory="",this.pool.playStatic(a.packdir+"o"+this.action,0),h.so.directory="./sounds/",this.actionCompleted=!0,void this.calculateScore()):void(1!=e.length||e[0]==this.keys[this.action]||this.fail());this.fail()}}}async setupLevel(){if(this.canPause=!0,this.playing=!1,s.default.existsSync(a.packdir+"pre"+this.level+".ogg")&&(h.so.directory="",this.preSound=h.so.create(a.packdir+"pre"+this.level),h.so.directory="./sounds/",this.preSound.play(),this.playing=!0),s.default.existsSync(a.packdir+"nlevel.ogg")&&!this.playing&&this.level>1&&(h.so.directory="",this.preSound=h.so.create(a.packdir+"nlevel"),h.so.directory="./sounds/",this.preSound.play(),this.playing=!0),this.playing)for(this.queueLevels();this.preSound.playing;)await c.utils.sleep(5),this.input.isJustPressed(f.KeyEvent.DOM_VK_RETURN)&&this.preSound.stop();h.so.directory="";this.music=h.so.create(a.packdir+this.level+"music"),this.music.loop=!0,h.so.directory="./sounds/",this.music.play(),this.timer.change(this.bpms[this.level]/1e3),!this.playing&&this.level>1&&this.queueLevels(),this.action=0,this.actionCompleted=!1,this.currentAction=0,this.numberOfActions=c.utils.randomInt(6+this.level,2*this.level+6)}unload(){}async pause(){if(this.canPause){this.canPause=!1;var e=this.music;this.timer.stop(),this.scoreTimer.pause(),this.pauseTime=e.currentTime;for(var s=e.playbackRate;s>0;s-=.05)e.playbackRate=s,await c.utils.sleep(30);for(e.pause();!this.input.isDown(f.KeyEvent.DOM_VK_P);)await c.utils.sleep(10);this.unpause()}}async unpause(){var e=this.music;e.play();for(var s=e.playbackRate;s<=1;s+=.05)e.playbackRate=s,await c.utils.sleep(8);e.seek(this.pauseTime),this.timer.start(),this.scoreTimer.resume()}calculateScore(){var e=this.bpms[this.level-1],s=c.utils.percent(this.scoreTimer.elapsed,e/2);this.scoreTimer.elapsed>e/2&&(s=100),this.scoreTimer.elapsed>e/2-20&&this.scoreTimer.elapsed<e/2+20&&(s=200);var t=e/2,i=(this.scoreTimer.elapsed-t)/e*100;this.score=Math.ceil(s-i),r.speech.speak(this.score)}queueLevels(){var e=this.level+1;this.levels<e&&(e=this.levels),h.so.directory="";for(var t=this.level;t<=e;t++)h.so.enqueue(a.packdir+t+"music"),s.default.existsSync(a.packdir+"pre"+t+".ogg")&&h.so.enqueue(a.packdir+"pre"+t);this.level>1&&(h.so.setQueueCallback(0),h.so.loadQueue(),h.so.directory="./sounds/")}}exports.Game=g;
},{"./tts":5,"./main":1,"./oldtimer":17,"./soundHandler":8,"./utilities":4,"./soundObject":10,"./stateMachine":7,"./timer":18,"./scrollingText":3,"./input.js":9,"./keycodes.js":6}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.st=void 0;var e=require("./input"),t=require("./tts"),r=require("./main"),n=require("./menuHandler"),u=require("jquery"),s=d(u),a=require("./soundObject"),o=require("./keycodes"),i=require("./game");function d(e){return e&&e.__esModule?e:{default:e}}var c=new e.KeyboardInput;class l{constructor(){this.state=0,this.currentState=0}setState(t){if(1==t){(c=new e.KeyboardInput).init();var u=a.so.create("logo"),d=this;u.volume=.5,u.play(),u.sound.once("end",function(){u.unload(),(0,s.default)(document).off("keydown"),d.setState(2)}),(0,s.default)(document).keydown(function(e){e.which!=o.KeyEvent.DOM_VK_SPACE&&e.which!=o.KeyEvent.DOM_VK_ESCAPE||(u.unload(),(0,s.default)(document).off("keydown"),d.setState(2))}),this.state=t}else 2==t?(c=null,(0,n.mainMenu)(),this.state=t):3==t?(this.currentState=new i.Game,this.state=t):4==t?(0,r.learnPack)():5==t&&((0,r.browsePacks)(),this.state=t)}}var f=new l;exports.st=f;
},{"./input":9,"./tts":5,"./main":1,"./menuHandler":13,"./soundObject":10,"./keycodes":6,"./game":12}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.packdir=exports.pack=exports.langs=exports.lang=exports.mangle=exports.actionKeys=void 0,exports.learnPack=T,exports.browsePacks=O,exports.rebuildHashes=q;var e=require("jquery"),t=m(e),s=require("cryptr"),a=m(s);require("hash-files");var r=require("fs-walk"),n=m(r),o=require("fs"),i=m(o),c=require("os"),l=m(c),u=require("./scrollingText"),p=require("./strings"),d=require("./soundHandler"),y=require("./tts"),f=require("./utilities"),h=require("./soundObject"),v=require("./keycodes"),g=require("./stateMachine"),k=require("./input.js");function m(e){return e&&e.__esModule?e:{default:e}}var S=exports.actionKeys=[0,0,v.KeyEvent.DOM_VK_SPACE,v.KeyEvent.DOM_VK_TAB,v.KeyEvent.DOM_VK_RETURN,v.KeyEvent.DOM_VK_BACK_SPACE,v.KeyEvent.DOM_VK_UP,v.KeyEvent.DOM_VK_DOWN,v.KeyEvent.DOM_VK_RIGHT,v.KeyEvent.DOM_VK_LEFT],b=exports.mangle=new a.default("sdf jkl wer uio"),K=exports.lang=1,_=exports.langs=["","english","spanish"],x=exports.pack="default",w=exports.packdir=l.default.homedir()+"/beatpacks/"+x+"/";function E(){g.st.setState(1)}function P(){var e=h.so.create("memtest");e.volume=.3,e.play(),h.so.destroy("memtest")}async function T(){for(var e=new d.SoundHandler,t=0,s=1;s<=10;s++)i.default.existsSync(w+"a"+s+".ogg")&&(t=s);1==K&&y.speech.speak("This pack has "+t+" actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma)."),2==K&&y.speech.speak("Este pack tiene "+t+" acciones. Las teclas t�picas son espacio, tabulador, enter, bretroceso, y opcionalmente las flechas. Si has reasignado las teclas, puedes usarlas. Para escuchar la acci�n de parar, pulsa la tecla del punto (a la derecha de la coma).");var a=new k.KeyboardInput;for(a.init(),h.so.directory="";!a.isJustPressed(v.KeyEvent.DOM_VK_Q);)await f.utils.sleep(10),a.isJustPressed(S[2])&&e.playStatic(w+"a2",0),a.isJustPressed(S[3])&&e.playStatic(w+"a3",0),a.isJustPressed(S[4])&&e.playStatic(w+"a4",0),a.isJustPressed(S[5])&&e.playStatic(w+"a5",0),a.isJustPressed(S[6])&&e.playStatic(w+"a6",0),a.isJustPressed(S[7])&&e.playStatic(w+"a7",0),a.isJustPressed(S[8])&&e.playStatic(w+"a8",0),a.isJustPressed(S[9])&&e.playStatic(w+"a9",0),a.isJustPressed(v.KeyEvent.DOM_VK_PERIOD)&&e.playStatic(w+"a1",0);e.destroy(),h.so.directory="./sounds/",g.st.setState(2)}async function O(e=1){if(!i.default.existsSync(l.default.homedir()+"/beatpacks/hashes.db")){return 1==K&&new u.ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a few seconds...","\n",function(){q()}),void(2==K&&new u.ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos segundos...","\n",function(){q()}))}try{var t=JSON.parse(b.decrypt(i.default.readFileSync(l.default.homedir()+"/beatpacks/hashes.db")))}catch(e){return 1==K&&new u.ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...","\n",function(){q()}),void(2==K&&new u.ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato as� que ves a por un caf� o algo...","\n",function(){q()}))}var s=-1,a=[],r=-1;1==e&&(a=t),h.so.directory="";var o=new Array;if(a.forEach(function(e,t){i.default.existsSync(l.default.homedir()+"/beatpacks/"+e.name+"/bpm.txt")||o.push(t)}),o.forEach(function(e){a.splice(e,1)}),a.length<1)new u.ScrollingText(p.strings.get(K,"nopacks"),"\n",g.st.setState(2));else{var c,d=new k.KeyboardInput;d.init(),1==K&&y.speech.speak("ready. Browsing "+a.length+" packs. Press arrows to move, q to exit, enter to choose a pack, or page up and page down to move by larger increments."),2==K&&y.speech.speak("listo. tienes "+a.length+" packs. Pulsa flechas para moverte, q para salir, enter para elegir uno, o pulsa retroceder p�gina y avanzar p�gina para moverte de 20 en 20.");for(;!d.isJustPressed(v.KeyEvent.DOM_VK_Q)&&e>0;){if(d.isJustPressed(v.KeyEvent.DOM_VK_RETURN)&&(void 0!==c&&c.destroy(),-1!=s&&clearTimeout(s),-1!=r)){var m=0;if(n.default.filesSync(l.default.homedir()+"/beatpacks/"+a[r].name,function(e,t,s){m+=s.size}),m!=a[r].hash)for(e=0,y.speech.speak(p.strings.get(K,"tamperWarning")),setTimeout(function(){y.speech.speak(p.strings.get(K,"tamperWarning"))},4500);!d.isJustPressed(v.KeyEvent.DOM_VK_RETURN);)await f.utils.sleep(10);if(e>0)return exports.pack=x=a[r].name,exports.packdir=w=l.default.homedir()+"/beatpacks/"+x+"/",h.so.directory="./sounds/",void h.so.kill(function(){g.st.setState(2)})}d.isJustPressed(v.KeyEvent.DOM_VK_DOWN)&&(void 0!==c&&c.destroy(),-1!=s&&clearTimeout(s),++r>a.length-1&&(r=0),1==K&&y.speech.speak(a[r].name+". "+a[r].levels+" levels."),2==K&&y.speech.speak(a[r].name+". "+a[r].levels+" niveles."),s=setTimeout(function(){(c=h.so.create(a[r].preview)).play()},1e3)),d.isJustPressed(v.KeyEvent.DOM_VK_UP)&&(void 0!==c&&c.destroy(),-1!=s&&clearTimeout(s),r--,y.speech.speak(r),r<0&&(r=a.length-1),1==K&&y.speech.speak(a[r].name+". "+a[r].levels+" levels."),2==K&&y.speech.speak(a[r].name+". "+a[r].levels+" niveles."),s=setTimeout(function(){(c=h.so.create(a[r].preview)).play()},1e3)),await f.utils.sleep(5)}-1!=s&&clearTimeout(-1),h.so.directory="./sounds/",h.so.kill(function(){g.st.setState(2)})}}function q(){var e="",t="abc",s=new Array;h.so.directory="",n.default.dirsSync(l.default.homedir()+"/beatpacks",function(a,r,o,c){if(i.default.existsSync(a+"/"+r+"/bpm.txt")){var l=0,u=a+"/"+r+"/";n.default.filesSync(u,function(e,t,s){l+=s.size}),t=l;var p=i.default.readFileSync(u+"bpm.txt","utf8").split(","),d=p.length-1;""==p[d]&&d--;var y={name:r,preview:u+"name",levels:d,hash:t};s.push(y)}else e+="\n"+r}),h.so.directory="./sounds/";var a=JSON.stringify(s);a=b.encrypt(a),i.default.writeFileSync(l.default.homedir()+"/beatpacks/hashes.db",a),""!=e?(1==K&&new u.ScrollingText("one thing before you go... the following packs are corrupt and should be looked at."+e,"\n",function(){g.st.setState(2)}),2==K&&new u.ScrollingText("Antes de que te vayas... los siguientes packs est�n corruptos y deber�as echar un vistazo a ver qu� pasa."+e,"\n",function(){g.st.setState(2)})):g.st.setState(2)}document.addEventListener("DOMContentLoaded",E),h.so.debug=!0;
},{"./scrollingText":3,"./strings":2,"./soundHandler":8,"./tts":5,"./utilities":4,"./soundObject":10,"./keycodes":6,"./stateMachine":7,"./input.js":9}]},{},[1])