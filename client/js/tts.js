'use strict';
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
export {TTS, speech};
