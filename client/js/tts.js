import "babel-polyfill";
const { app } = require('electron').remote;
	const { exec } = require("child_process");
import { report } from './main';

'use strict';

import { strings } from './strings';
import { utils } from './utilities'
import { lang, ttsVoice, ttsRate } from './main';
import { KeyboardInput } from './input.js';
import { KeyEvent } from './keycodes';
const useWebTTS = true;
import Speech from 'speak-tts' // es6
class TTS {
	constructor(webTTS = true) {
		this.voices = []
		this.speechController = new KeyboardInput();
		this.speechController.init();
		this.ducking = false;
		if (lang == 1) this.lang = "en";
		if (lang == 2) this.lang = "es";
		this.webTTS = webTTS;
		this.synth = new Speech()
		this.rate = 3;
		this.speechController.justPressedEventCallback = (key) => {
			if (this.interrupt) this.speak("", false);
			if (key == KeyEvent.VK_SHIFT || key == KeyEvent.DOM_VK_ESCAPE) {
				this.speak("", false);
				if (this.childProcess) this.childProcess.kill()
				this.unduck()
			}
			if (key == KeyEvent.VK_UP && this.speechController.isDown(KeyEvent.DOM_VK_SHIFT)) {
//rate here
this.setRate(this.rate+1)
strings.speak('newRate');
			}
			if (key == KeyEvent.VK_DOWN && this.speechController.isDown(KeyEvent.DOM_VK_CONTROL)) {
//rate here
this.setRate(this.rate+1)
strings.speak('newRate');
			}
			
			
		};

		this.synth.init({
			lang: this.lang,
			rate: this.rate,
			splitSentences: false,
			'listeners': {
			}

		})
			.then((data) => {
				this.voices = data.voices;
			}).catch(e => {
				report(e);
			})
	}
	setLanguage(lang) {

		try {
			if (lang == 1) this.lang = "en";
			if (lang == 2) this.lang = "es";
			this.synth.setLanguage(this.lang)
			if (process.platform=='darwin') this.setVoice(null,true)
								console.log("default voice ",this.voice)

		} catch (err) {
			report(err);
		}
	}
	setRate(r) {
		let newRate = r;
		if (r < 1) newRate == 1;
		if (r > 10) newRate = 10;
		this.rate = newRate;
		this.synth.setRate(newRate);
	}
	speak(text, queue = false) {
		let sr = app.accessibilitySupportEnabled;

		if (sr) this.webTTS = false;
		if (!sr) this.webTTS = true;
		if (process.platform == 'darwin') this.webTTS=true
		if (this.webTTS) {
			try {
				let oldText=text;
				if (typeof text == "number") {
					text = " "+text + ".";
					//we need this because some voices fail to process numbers. Why? Don't ask me.
				}
				if (process.platform == 'darwin') {
					this.speakUnthreaded(text)
				} else {
				this.synth.speak({
					text: text,
					queue: queue,
					listeners: {
						onstart: () => {
							this.duck();
						},
						onend: () => {
							this.unduck();
						},
						onerror: (err) => {
							//this.setVoice(null,true);
							return false;
						},
					}
				})
				}
			} catch(e) {
				console.error(e)
			}

		}
		else {
			this.duck();
			document.getElementById('speech').innerHTML = '';
			const para = document.createElement('p');
			para.appendChild(document.createTextNode(text));
			document.getElementById('speech').appendChild(para);
		}
	} // End speak()

	setWebTTS(tts) {
		this.webTTS = tts;
	}

	stop() {
		if (this.webTTS) {
			this.synth.cancel();
		}
	}
	async changeRate() {
		let rate = speech.rate;
		const inp = new KeyboardInput();
		inp.init();
		strings.speak('rating');
		while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
			await utils.sleep(5);
			if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
				rate += 0.25;
				if (rate > 10) rate = 10;

				speech.setRate(rate)
				strings.speak('newRate');
			}
			if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
				rate -= 0.25;
				if (rate < 1) rate = 1;
				speech.setRate(rate)
				strings.speak('newRate');
			}
		}
	}
	changeVoice(name) {
		let voiceArray = []
		for (var k in this.voices) {
			voiceArray.push(this.voices[k].name)
		}
		if (voiceArray.includes(name)) {
			speech.synth.setVoice(name);
			this.voice=name
		}

	}
	setVoice(cb, silent = false) {
		//what language do we want?
		let wl = "en";
		if (lang == 1) wl = "en";
		if (lang == 2) wl = "es";
		let voiceArray = []
		for (var k in this.voices) {
			//get the first part of the voice languages
			let vl = this.voices[k].lang.split("-")[0]
			//do we want this language?
			if (vl == wl) {
				voiceArray.push(this.voices[k].name)
			}
		}
		if (!silent) speech.speak(strings.get("selectVoice", [voiceArray.length]));
		let input = new KeyboardInput()
		let selection = -1;
		input.init();
		if (!silent) {
			input.justPressedEventCallback = ((key) => {
				if (key == KeyEvent.DOM_VK_DOWN) {
					selection++;
					if (selection >= voiceArray.length) selection = 0;
				}
				if (key == KeyEvent.DOM_VK_UP) {
					selection--;
					if (selection <= -1) selection = voiceArray.length - 1;
				}

				if (key != KeyEvent.DOM_VK_RETURN && (key == KeyEvent.DOM_VK_UP || key == KeyEvent.DOM_VK_DOWN)) { //dirty hack
					this.synth.setVoice(voiceArray[selection]);
					speech.speak(voiceArray[selection])
				}
				else {
					//it is enter
					if (selection != -1) { //don't crash if it's -1.
						input.destroy();
						if (typeof cb !== "undefined") {
							cb(voiceArray[selection])
						}
						return voiceArray[selection]
					}
				}//enter action
			});//callback
		} //not silent
		else {
			try {
				this.synth.setVoice(voiceArray[0]);
				this.voice=voiceArray[0]
				return voiceArray[0];
			} catch (err) {
				report(err);
				this.synth.setVoice(voiceArray[1]);
				this.voice=voiceArray[1]
				return voiceArray[1];
			} // catch block
		}//else
	}//function
	duck() {
		if (this.ducking) return;
		this.ducking = true;
		if (typeof this.ducker !== "undefined") this.ducker.duck();
	}
	unduck() {
		this.ducking = false;
		if (typeof this.ducker !== "undefined") this.ducker.unduck();
	}
speakUnthreaded(text) {
	let rate=this.rate*100
if (this.childProcess) this.childProcess.kill()
this.duck()
	this.childProcess=exec('say "'+text+'" -r '+rate+ ' -v '+this.voice, (error, stdout, stderr) => {
		if (error) {
			throw(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		this.unduck();
	});
}
} // End class
const speech = new TTS(false);
export { TTS, speech };
