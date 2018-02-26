import $ from 'jquery';
import {ScrollingText} from './scrollingText';
var os=require('os');
import {strings} from './strings';
import {SoundHandler} from './soundHandler';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {st} from './stateMachine';
import sono from 'sono';
//import test from './test.js'
export var actionKeys=[0,0,KeyEvent.DOM_VK_SPACE,KeyEvent.DOM_VK_TAB,KeyEvent.DOM_VK_RETURN,KeyEvent.DOM_VK_BACK_SPACE,KeyEvent.DOM_VK_UP,KeyEvent.DOM_VK_DOWN,KeyEvent.DOM_VK_RIGHT,KeyEvent.DOM_VK_LEFT];
import { effects } from 'sono/effects';
import {KeyboardInput} from './input.js'
export var lang=1;
export var langs=["","english","spanish"]
export var pack="default";
export var packdir=os.homedir()+"/beatpacks/"+pack+"/";
document.addEventListener("DOMContentLoaded",setup);
var dummyPan=sono.panner();
so.debug=true;
function setup() {
	st.setState(1);
}
	function proceed() {
	}
//st.setState(1);
//document.removeEventListener("DOMContentLoaded",setup);

export async function learnPack() {
const fs=require('fs');
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
var fs=require('fs');
var os=require('os');
if (!fs.existsSync(os.homedir()+"/beatpacks/hashes.db")) {
var error=0;
if (lang==1) error=new ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take 5 minutes or more, so go get a coffee or something...","\n",function() { rebuildHashes() });
if (lang==2) error=new ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos 5 o 10 minutos, así que ves a por un café o algo...","\n",function() { rebuildHashes() });
return;
}
try {
var packs=JSON.parse(fs.readFileSync(os.homedir()+"/beatpacks/hashes.db"));
}
catch(err) {
var error=0;
if (lang==1) error=new ScrollingText("The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...","\n",function() { rebuildHashes() });
if (lang==2) error=new ScrollingText("Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato así que ves a por un café o algo...","\n",function() { rebuildHashes() });
return;
}
var timeout=-1;
var browseArray=[];
var browsePosition=-1;

if (browsing==1) browseArray=packs;
so.directory="";
var toRemove=new Array();
browseArray.forEach(function(i,v) {
		if (!fs.existsSync(os.homedir()+"beatpacks/"+i.name+"/bpm.txt")) {
	console.log("discard "+i.name+" at index "+v);
	toRemove.push(v);
	}
});
toRemove.forEach(function(i) {
	browseArray.splice(i,1);
});
if (browseArray.length<1) {
	new ScrollingText(strings.get(lang,nopacks),"\n",st.setState(2));
	return;
}
var event=new KeyboardInput();
event.init();
var snd;
if (lang==1) speech.speak("ready. Browsing "+browseArray.length+" packs. Press arrows to move, q to exit, enter to choose a pack, or page up and page down to move by larger increments.");
if (lang==2) speech.speak("listo. tienes "+browseArray.length+" packs. Pulsa flechas para moverte, q para salir, enter para elegir uno, o pulsa retroceder página y avanzar página para moverte de 20 en 20.");
while (!event.isJustPressed(KeyEvent.DOM_VK_Q) && browsing>0) {
//enter
if (event.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
if (typeof snd!="undefined") snd.stop();
if (timeout!=-1) clearTimeout(timeout);
if (browsePosition!=-1) {
pack=browseArray[browsePosition].name;
packdir=os.homedir()+"/beatpacks/"+pack+"/";
so.directory="./sounds/";
so.kill(function() {
st.setState(2);
});
return;
}
}
//down arrow
if (event.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
if (typeof snd!="undefined") snd.stop();
if (timeout!=-1) clearTimeout(timeout);
browsePosition++;
if (browsePosition>browseArray.length-1) browsePosition=0;
if (lang==1) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" levels.");
if (lang==2) speech.speak(browseArray[browsePosition].name+". "+browseArray[browsePosition].levels+" niveles.");
timeout=setTimeout(function() {
snd=so.create(browseArray[browsePosition].preview);
snd.play();
},1000);
snd.on("ended",function() {
	speech.speak("kuak");
	snd.destroy();
	});
}
//up arrow
if (event.isJustPressed(KeyEvent.DOM_VK_UP)) {
if (typeof snd!="undefined") snd.stop();
if (timeout!=-1) clearTimeout(timeout);
browsePosition--;
speech.speak(browsePosition);
if (browsePosition<0) browsePosition=browseArray.length-1;
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
st.setState(2);
}
export function rebuildHashes() {
var hash=require('hash-files');
var corrupts="";
var walk=require('fs-walk');
var fs=require('fs');
var newHash="abc";
var packs=new Array();
so.directory="";
walk.dirsSync(os.homedir()+"/beatpacks",function(pb,pf,stat,next) {
if (!fs.existsSync(pb+"/"+pf+"/bpm.txt")) {
corrupts+="\n"+pf;
return; //discard non packs
}
var theFiles=new Array();
var path=pb+"/"+pf+"/";
walk.filesSync(path,function(pb,pf,stat) {
theFiles.push(path+pf);
});
newHash=hash.sync({files: theFiles,noGlob:true});
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
