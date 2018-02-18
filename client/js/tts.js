'use strict';
var useWebTTS = true;

class TTS {
	constructor(webTTS=false) {
		this.synth = window.speechSynthesis;
		this.webTTS = webTTS;
		
	}
	
	speak(text) {
		
		if (this.webTTS) {
			var utterThis = new SpeechSynthesisUtterance(text);
			this.synth.stop();
			this.synth.speak(utterThis);
		} else {
			document.getElementById("speech").innerHTML = ""
			var para = document.createElement("p")
			para.appendChild(document.createTextNode(text))
			document.getElementById("speech").appendChild(para)
			return;
		}
		
	} // end speak()
	
	setWebTTS(tts) {
		this.webTTS = tts;
	}
	
} // end class
if (typeof speech == "undefined") var speech = new TTS();
export {TTS,speech}