import $ from 'jquery';
import Cryptr from 'cryptr';
import 'hash-files';
import walk from 'fs-walk';
import fs from 'fs';
import os from 'os'
import {ScrollingText} from './scrollingText';
import {strings} from './strings';
import {SoundHandler} from './soundHandler';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {st} from './stateMachine';
//import test from './test.js'
export var actionKeys=[0,0,KeyEvent.DOM_VK_SPACE,KeyEvent.DOM_VK_TAB,KeyEvent.DOM_VK_RETURN,KeyEvent.DOM_VK_BACK_SPACE,KeyEvent.DOM_VK_UP,KeyEvent.DOM_VK_DOWN,KeyEvent.DOM_VK_RIGHT,KeyEvent.DOM_VK_LEFT];
export var mangle=new Cryptr("sdf jkl wer uio");
import {KeyboardInput} from './input.js'
export var lang=1;
export var langs=["","english","spanish"]
export var pack="default";
export var packdir=os.homedir()+"/beatpacks/"+pack+"/";
document.addEventListener("DOMContentLoaded",setup);
so.debug=true;
function setup() {
/*
	so.enqueue("memtest");
	so.setQueueCallback(function() { proceed(); });
	so.loadQueue();
	*/
	st.setState(1);
}
	function proceed() {
		var sound=so.create("memtest");
		sound.volume=0.3;
		sound.play();
		so.destroy("memtest");
	}
//st.setState(1);
//document.removeEventListener("DOMContentLoaded",setup);

export async function learnPack() {

var pool=new SoundHandler();
var actions=0;
				for (var i=1;i<=10;i++) {
				if (fs.existsSync(packdir+"a"+i+".ogg")) {
				actions=i;
								}
				}
				if (lang==1) speech.speak("This pack has "+actions+" actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma).");
				if (lang==2) speech.speak("Este pack tiene "+actions+" acciones. Las teclas típicas son espacio, tabulador, enter, bretroceso, y opcionalmente las flechas. Si has reasignado las teclas, puedes usarlas. Para escuchar la acción de parar, pulsa la tecla del punto (a la derecha de la coma).");
				var event=new KeyboardInput();
				event.init();
				so.directory="";
				while (!event.isJustPressed(KeyEvent.DOM_VK_Q)) {
				await utils.sleep(10);
				if (event.isJustPressed(actionKeys[2]))
				pool.playStatic(packdir+"a"+2,0);
								if (event.isJustPressed(actionKeys[3]))
				pool.playStatic(packdir+"a"+3,0);
				if (event.isJustPressed(actionKeys[4]))
				pool.playStatic(packdir+"a"+4,0);
				if (event.isJustPressed(actionKeys[5]))
				pool.playStatic(packdir+"a"+5,0);
				if (event.isJustPressed(actionKeys[6]))
				pool.playStatic(packdir+"a"+6,0);
				if (event.isJustPressed(actionKeys[7]))
				pool.playStatic(packdir+"a"+7,0);
				if (event.isJustPressed(actionKeys[8]))
				pool.playStatic(packdir+"a"+8,0);
				if (event.isJustPressed(actionKeys[9]))
				pool.playStatic(packdir+"a"+9,0);
				if (event.isJustPressed(KeyEvent.DOM_VK_PERIOD))
				pool.playStatic(packdir+"a"+1,0);
				}
				pool.destroy();
				so.directory="./sounds/";
				st.setState(2);
}
export async function browsePacks(browsing=1) {
if (!fs.existsSync(os.homedir()+"/beatpacks/hashes.db")) {
var error=0;
if (lang==1) error=new ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a few seconds...","\n",function() { rebuildHashes() });
if (lang==2) error=new ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos segundos...","\n",function() { rebuildHashes() });
return;
}
try {
var packs=JSON.parse(mangle.decrypt(fs.readFileSync(os.homedir()+"/beatpacks/hashes.db")));
}
catch(err) {
var error=0;
if (lang==1) error=new ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...","\n",function() { rebuildHashes() });
if (lang==2) error=new ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato así que ves a por un café o algo...","\n",function() { rebuildHashes() });
return;
}
var escape=false;
if (packs.length==0) {
var error=new ScrollingText(strings.get(lang,"nopacks"),"\n",function() {
//todo
escape=true;
});
}
if (escape) {
error.destroy();
console.log("die!");
st.setState(2);
return;
}
var timeout=-1;
var browseArray=[];
var browsePosition=-1;
if (browsing>0) {
packs.forEach(function(i,v) {
		if (fs.existsSync(os.homedir()+"/beatpacks/"+i.name+"/bpm.txt")) {
browseArray.push(i);
}
		});
}
so.directory="";
if (browseArray.length<1) {
	new ScrollingText(strings.get(lang,"nopacks"),"\n",st.setState(2));
	return;
}
browseArray.sort(function(a,b) {
var nameA=a.name.toLowerCase();
var nameB=b.name.toLowerCase();
if (nameA<nameB) return -1;
if (nameA>nameB) return 1;
return 0;
});
var event=new KeyboardInput();
event.init();
var snd;
if (lang==1) speech.speak("ready. Browsing "+browseArray.length+" packs. Press arrows to move, q to exit, enter to choose a pack, or page up and page down to move by larger increments.");
if (lang==2) speech.speak("listo. tienes "+browseArray.length+" packs. Pulsa flechas para moverte, q para salir, enter para elegir uno, o pulsa retroceder página y avanzar página para moverte de 20 en 20.");
var exitNow=0;
while (!event.isJustPressed(KeyEvent.DOM_VK_Q) && browsing>0) {
//enter
if (event.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
if (typeof snd!="undefined") snd.destroy();
if (timeout!=-1) clearTimeout(timeout);
if (browsePosition!=-1) {
var size=0;
walk.filesSync(os.homedir()+"/beatpacks/"+browseArray[browsePosition].name,function(pb,pf,stat) {
size+=stat.size;
});
if (size!=browseArray[browsePosition].hash){
browsing=0;
//todo: remove from unlocked
speech.speak(strings.get(lang,"tamperWarning"));
setTimeout(function() {
speech.speak(strings.get(lang,"tamperWarning"));
},4500);
while(!event.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
await utils.sleep(10);
}
}
if (browsing>0) {
pack=browseArray[browsePosition].name;
packdir=os.homedir()+"/beatpacks/"+pack+"/";
so.directory="./sounds/";
so.kill(function() {
st.setState(2);
});
return;
}
}
}
//down arrow
if (event.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
if (typeof snd!="undefined") snd.destroy();
if (timeout!=-1) clearTimeout(timeout);
browsePosition++;
if (browsePosition>browseArray.length-1) browsePosition=0;
speech.speak(browsePosition);
if (lang==1) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" levels.");
if (lang==2) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" niveles.");
timeout=setTimeout(function() {
snd=so.create(browseArray[browsePosition].preview);
snd.play();
},1000);
}
var chars=event.getChars();
if (chars!="") {
//first letter
var stop=false;
browseArray.forEach(function(v,i) {
var str=v.name.toLowerCase()
if (str.slice(0,1)==chars[0]) {
if (!stop) browsePosition=i;
stop=true;
}
});
if (typeof snd!="undefined") snd.destroy();
if (timeout!=-1) clearTimeout(timeout);
if (lang==1) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" levels.");
if (lang==2) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" niveles.");
timeout=setTimeout(function() {
snd=so.create(browseArray[browsePosition].preview);
snd.play();
},1000);

}
//up arrow
if (event.isJustPressed(KeyEvent.DOM_VK_UP)) {
if (typeof snd!="undefined") snd.destroy();
if (timeout!=-1) clearTimeout(timeout);
browsePosition--;

if (browsePosition<0) browsePosition=browseArray.length-1;
//speech.speak(browsePosition);
if (lang==1) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" levels.");
if (lang==2) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" niveles.");
timeout=setTimeout(function() {
snd=so.create(browseArray[browsePosition].preview);
snd.play();
},1000);
}
await utils.sleep(5);
}
if (timeout!=-1) clearTimeout(-1);
so.directory="./sounds/";
so.kill(function() {
st.setState(2);
});
}
export function rebuildHashes() {
//var hash=require('hash-files');
var corrupts="";
//var walk=require('fs-walk');
//var fs=require('fs');
var newHash="abc";
var packs=new Array();
so.directory="";
walk.dirsSync(os.homedir()+"/beatpacks",function(pb,pf,stat,next) {
if (!fs.existsSync(pb+"/"+pf+"/bpm.txt")) {
corrupts+="\n"+pf;
return; //discard non packs
}
var theFiles=0;
var path=pb+"/"+pf+"/";
walk.filesSync(path,function(pb,pf,stat) {
theFiles+=stat.size;
});
newHash=theFiles;
var fileData=fs.readFileSync(path+"bpm.txt","utf8");
var levelsa=fileData.split(",");
var levels=levelsa.length-1;
if (levelsa[levels]=="") levels--;
var temp={
"name":pf,
"preview":path+"name",
"levels":levels,
"hash":newHash,
}
packs.push(temp);
});
so.directory="./sounds/";
var write=JSON.stringify(packs);
write=mangle.encrypt(write);
fs.writeFileSync(os.homedir()+"/beatpacks/hashes.db",write);
if (corrupts!="") {
if (lang==1) new ScrollingText("one thing before you go... the following packs are corrupt and should be looked at."+corrupts,"\n",function() {st.setState(2)});
if (lang==2) new ScrollingText("Antes de que te vayas... los siguientes packs est‡n corruptos y deber’as echar un vistazo a ver quŽ pasa."+corrupts,"\n",function() {
	st.setState(2)});
}
else {
st.setState(2);
}
}
