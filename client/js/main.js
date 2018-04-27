export var lang = 0;
export var editing=false;
import {OldTimer} from './oldtimer';
import $ from 'jquery';
import {playCode,playSlots} from './minis.js';
//import {SoundPool} from './soundPool';
import Cryptr from 'cryptr';
let boot=false;
export let credits=false;
export let minis={
slot:8500,
code:10000,
}
import {Player} from './player';
import {SliderItem,MenuItem} from './menuItem';
import {Menu} from './menu';
import 'hash-files';
import walk from 'fs-walk';
import os from 'os';
import {mainMenu} from './menuHandler';
import {ScrollingText} from './scrollingText';
import {strings} from './strings';
import {SoundHandler} from './soundHandler';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {st} from './stateMachine';
// Import test from './test.js'
export var actionKeys = [0, 0, KeyEvent.DOM_VK_SPACE, KeyEvent.DOM_VK_TAB, KeyEvent.DOM_VK_RETURN, KeyEvent.DOM_VK_BACK_SPACE, KeyEvent.DOM_VK_UP, KeyEvent.DOM_VK_DOWN, KeyEvent.DOM_VK_RIGHT, KeyEvent.DOM_VK_LEFT];
export var mangle = new Cryptr('sdf jkl wer uio');
import {KeyboardInput} from './input.js';


export var langs = ['', 'english', 'spanish'];
export var pack = 'default';
export var data = '';
export var packdir = os.homedir() + '/beatpacks/' + pack + '/';
document.addEventListener('DOMContentLoaded', setup);
so.debug = true;
async function setup() {
checkPack(false,true);
return;
             	st.setState(1);
}
function proceed() {
	const sound = so.create('memtest');
	sound.volume = 0.3;
		sound.play();
		so.destroy('memtest');
}
// St.setState(1);
// document.removeEventListener("DOMContentLoaded",setup);
export async function learnPack() {
so.directory="";
const fs=require('fs');
	const pool = new SoundHandler();
	let actions = 0;
	for (let i = 1; i <= 10; i++) {
		if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
			actions = i;
		}
	}
	speech.speak(strings.get( 'mActions', [actions]));
	const event = new KeyboardInput();
				event.init();
				so.directory = '';
				while (!event.isJustPressed(KeyEvent.DOM_VK_Q)) {
					await utils.sleep(10);
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
					if (event.isJustPressed(KeyEvent.DOM_VK_PERIOD)) {
pool.playStatic(packdir + 'a' + 1, 0);
					}
				}
				pool.destroy();
				so.directory = './sounds/';
				st.setState(2);
}
export async function browsePacks(browsing = 1) {
const fs=require('fs');
	if (!fs.existsSync(os.homedir() + '/beatpacks/hashes.db')) {
		var error = 0;
		if (lang == 1) {
			error = new ScrollingText('The packs folder hashes need to be rebuilt to continue. This can take a few seconds...', '\n', (() => {
 rebuildHashes();
			}));
		}
		if (lang == 2) {
			error = new ScrollingText('Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar unos segundos...', '\n', (() => {
 rebuildHashes();
			}));
		}
		return;
	}
	try {
		var packs = JSON.parse(mangle.decrypt(fs.readFileSync(os.homedir() + '/beatpacks/hashes.db')));
	} catch (err) {
		var error = 0;
		if (lang == 1) {
			error = new ScrollingText('The packs folder hashes need to be rebuilt to continue. This can take a long while, so go get a coffee or something...', '\n', (() => {
 rebuildHashes();
			}));
		}
		if (lang == 2) {
			error = new ScrollingText('Para continuar, debo reconstruir la carpeta de packs. Esto puede tardar un buen rato así que ves a por un café o algo...', '\n', (() => {
 rebuildHashes();
			}));
		}
		return;
	}
	let timeout = -1;
	const browseArray = [];
	let browsePosition = -1;
	if (browsing > 0) {
packs.forEach((i, v) => {
	if (fs.existsSync(os.homedir() + '/beatpacks/' + i.name + '/bpm.txt')) {
if (browsing==1) {
if (typeof data.unlocks[i.name]==="undefined") {
browseArray.push(i);
}

}
else if (browsing==2) {
if (typeof data.unlocks[i.name]!=="undefined") {
browseArray.push(i);
}
}
else if (browsing==3) {
if (typeof data.unlocks[i.name]!=="undefined" && !data.unlocks[i.name]["win"]) {
browseArray.push(i);
}
}

	}
});
	}
	so.directory = '';
	if (browseArray.length === 0) {
	so.directory="./sounds/";
		new ScrollingText(strings.get( 'nopacks'), '\n', function(){
		st.setState(2);
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
const event = new KeyboardInput();
event.init();
let snd;
if (lang == 1) {
speech.speak('ready. showing ' + browseArray.length + ' packs. Press arrows to move, left arrow to exit, enter to choose a pack, or the first letter of a packs name.');
}
if (lang == 2) {
speech.speak('listo. Mostrando ' + browseArray.length + ' packs. Pulsa flechas para moverte, flecha izquierda para salir, enter para elegir uno, o la primera letra del nombre de un pack.');
}
const exitNow = 0;
while (!event.isJustPressed(KeyEvent.DOM_VK_LEFT) && browsing > 0) {
// Enter
	if (event.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
	if (browsePosition==-1) {
	st.setState(2);
	return;
	}
		if (typeof snd !== 'undefined') {
snd.destroy();
		}
		if (timeout != -1) {
clearTimeout(timeout);
		}
if (browsing > 0) {
if (browsing==1) {
let price=browseArray[browsePosition].levels*500;
if (data.beatcoins<price) {
new ScrollingText(strings.get("packno",[price]),"\n",function() { st.setState(2); });
}
else {
question("packprice",[price],function(answer) {
if (!answer) {
st.setState(2);
return;
}
else if (answer) {
so.directory="./sounds/";
let snd=so.create("buypack");
snd.play();
snd.sound.once("end",function() {
addCash(0,price,function() {
pack = browseArray[browsePosition].name;
		boot=false;
	data.pack = pack;
	if (typeof data.unlocks[pack]==="undefined") {
	data.unlocks[pack]={ 
			"level":0,
			"insurance":0,
			"fails":0,
			"win":false,
			"average":0,
					};//object
					}//unlocks undefined
						packdir = os.homedir() + '/beatpacks/' + pack + '/';
	boot=false;
	so.directory = './sounds/';
save();
so.kill(() => {
st.setState(20);
});//kill
});//cash
});//sound callback
}//answer

});//question callback);
}//we have enough
return;
}
else {
	pack = browseArray[browsePosition].name;
		boot=false;
	data.pack = pack;
	if (typeof data.unlocks[pack]==="undefined") {
	data.unlocks[pack]={ 
			"level":0,
			"insurance":0,
			"fails":0,
			"win":false,
			"average":0,
					};//object
					}//unlocks undefined
						packdir = os.homedir() + '/beatpacks/' + pack + '/';
	boot=false;
	so.directory = './sounds/';
save();
so.kill(() => {
st.setState(20);
});//kill
}//if browsing more than 1
}//if browsing more than 0
return;
			//}
	}
	// Down arrow
	if (event.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
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
speech.speak(browsePosition);
if (lang == 1) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
}
if (lang == 2) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
}
timeout = setTimeout(() => {
	snd = so.create(browseArray[browsePosition].preview);
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
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
}
if (lang == 2) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
}
timeout = setTimeout(() => {
	snd = so.create(browseArray[browsePosition].preview);
snd.play();
}, 1000);
	}
	// Up arrow
	if (event.isJustPressed(KeyEvent.DOM_VK_UP)) {
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
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
		}
		if (lang == 2) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
		}
		timeout = setTimeout(() => {
			snd = so.create(browseArray[browsePosition].preview);
snd.play();
		}, 1000);
	}
	await utils.sleep(5);
}
if (timeout != -1) {
clearTimeout(-1);
}
so.directory = './sounds/';
so.kill(() => {
st.setState(2);
});
}
export async function rebuildHashes(silent = false) {
const fs=require('fs');
// Var hash=require('hash-files');
	let corrupts = '';
	// Var walk=require('fs-walk');
		let newHash = 0;
	const packs = new Array();
	so.directory = '';
walk.dirsSync(os.homedir() + '/beatpacks', (pb, pf, stat, next) => {
	if (!fs.existsSync(pb + '/' + pf + '/bpm.txt')) {
		corrupts += '\n' + pf;
		return; // Discard non packs
	}
	let theFiles = 0;
	const path = pb + '/' + pf + '/';
walk.filesSync(path, (pb, pf, stat) => {
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
so.directory = './sounds/';
let write = JSON.stringify(packs);
write = mangle.encrypt(write);
fs.writeFileSync(os.homedir() + '/beatpacks/hashes.db', write);
if (silent) {
return packs;
}
if (corrupts != '') {
	if (lang == 1) {
		if (!silent) {
			new ScrollingText('one thing before you go... the following packs are corrupt and should be looked at.' + corrupts, '\n', (() => {
				if (!silent) {
st.setState(2);
				}
			}));
		}
	}
	if (lang == 2) {
		if (!silent) {
			new ScrollingText('Antes de que te vayas... los siguientes packs están corruptos y deberías echar un vistazo a ver qué pasa.' + corrupts, '\n', (() => {
				if (!silent) {
st.setState(2);
				}
			}));
		}
	}
} else if (!silent) {
st.setState(2);
}
}
export function question(text,localizedValues=[],callback=null) {
let answer=false;
let items=new Array();
			items.push(new MenuItem(0,strings.get(text,localizedValues)));
	items.push(new MenuItem(0,strings.get("yes",)));
	items.push(new MenuItem(1,strings.get("no",)));
		so.directory = './sounds/';
			let dm=new Menu(strings.get(text,localizedValues),items);
			so.directory = '';
					dm.run(s=>{
		console.log("ok");
						so.directory = './sounds/';
												switch(s.selected) {
							case 0:
							dm.destroy();
answer=true;
			break;
			case 1:
			dm.destroy();
answer=false;
break;
}
if (typeof callback!=="undefined") {
callback(answer);
}
});
}
export async function checkPack(changeBoot=true,debug=false) {
editing=false;
const fs=require('fs');
	try {
		data = JSON.parse(fs.readFileSync(os.homedir() + '/beatpacks/save.dat'));
	} catch (err) {
		data = new Player();
				let introing=true;
		let str="";
		for (let i in strings.strings) {
		str+=strings.strings[i].langs+". ";
		}
		
		let items=[];
		let counter=1;
				for (let i in strings.strings) {
items.push(new MenuItem(counter,strings.strings[i].lang));
counter++;
		}
		let lm=new Menu(str,items);
		lm.run((s)=> {
		lang=s.selected;
		data.lang=lang;
		lm.destroy();
						new ScrollingText(strings.get("intro"),"\n",function() {
		introing=false;
		});
		});
		while (introing) {
		await utils.sleep(10);
		}
	}
	pack = data.pack;
	lang=data.lang;
	if (!changeBoot) boot=false;
		if (changeBoot) boot=true;
	packdir = os.homedir() + '/beatpacks/' + pack + '/';
	actionKeys = data.actionKeys;
save();
if (!fs.existsSync(packdir + 'bpm.txt')) {
	pack = 'default';
	boot=false;
	packdir = os.homedir() + '/beatpacks/' + pack + '/';
}
if (!fs.existsSync(packdir + 'bpm.txt')) {
	const text = new ScrollingText(strings.get( 'packError'), '\n', (() => {
downloadPacks(['default']);
	}));
	return;
	}
			if (debug) {
		editPackDefinite("e:\\r/");
		return;
		}
	booter();
}
var download = function(url, dest, cb) {
const http=require('http');
const fs=require('fs');
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      cb();
    });
  });
}
export async function downloadPacks(arr = []) {
const fs=require('fs');
		if (arr.length == 0) {
		const dlList = new Array();
		let remoteHashes;
		let localHashes;
		localHashes = await rebuildHashes(true);
		await fetch('http://oriolgomez.com/beatpacks/hashes.db')
						 .then(event => event.text())
			.then(data => {
				remoteHashes = JSON.parse(mangle.decrypt(data));
console.log("remote"+remoteHashes.length);
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
				}
				else {
				}
			});
		// Create downloader menu here
		if (browseArray.length<1) {
			new ScrollingText(strings.get("nodown"),"\n",function() {st.setState(2)});
			return;
		}
			const downloadSelections = new Array();
let sizeS;
			size = size / 1024 / 1024;
			sizeS="mb"
		if (size>1024) {
			size=size/1024
			sizeS="gb";
		}
			size=size.toFixed(2);
//			console.log("size: "+size+sizeS+" "+browseArray.length+" packs");
			const items=new Array();
			items.push(new MenuItem(-1,strings.get("mFound",[browseArray.length])));
	items.push(new MenuItem(0,strings.get("mDownloadAll",[size,sizeS])));
		items.push(new MenuItem(1,strings.get("mDownloadList",[browseArray.length])));
		items.push(new MenuItem(2,strings.get("mBack")));
		so.directory = './sounds/';
			let dm=new Menu(strings.get("mSelect"),items);
			so.directory = '';
			let anotherSelected=false;
		dm.run(s=>{
						so.directory = './sounds/';
						switch(s.selected) {
							case 0:
							dm.destroy();
							//anotherSelected=true;
							let dls=new Array();
							browseArray.forEach(function(i) {
								dls.push(i.name);
			});
										downloadPacks(dls);
			break;
			case 2:
			dm.destroy();
			anotherSelected=true;
st.setState(2);
break;
case 1:
dm.destroy();
//browse menu start
let timeout = -1;
		let browsePosition = -1;
		browseArray.forEach((i)=> {
		i.selected=false;
		});//forEach
var selected=[];
so.directory="./sounds/";
let snds=so.create("ui/selected");
so.directory = '';
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
let event = new KeyboardInput();
event.init();

let snd;
if (lang == 1) {
speech.speak('ready. Browsing ' + browseArray.length + ' downloadable packs. Press arrows to move, space to select, p to preview, q to exit, enter to start download, or the first letter of a packs name to move to it.');
}
if (lang == 2) {
speech.speak('listo. tienes ' + browseArray.length + ' packs disponibles. Pulsa flechas para moverte, p para previsualizar, espacio para seleccionar, q para salir, enter para empezar descarga, o pulsa la primera letra del nombre de un pack para moverte a él.');
}
let browsing=1;
let size=0;
event.justPressedEventCallback=function(evt){
//space
if (evt==KeyEvent.DOM_VK_SPACE) {
if (browsePosition!=-1) {
if (browseArray[browsePosition].selected) {
browseArray[browsePosition].selected=false;
size-=browseArray[browsePosition].hash;
}
else if (browseArray[browsePosition].selected==false) {
browseArray[browsePosition].selected=true;
snds.play();
size+=browseArray[browsePosition].hash;
}
let sizeS;
let dSize;
if (size<=0) sizeS="bytes";
			dSize = size / 1024 / 1024;
			console.log(dSize);
			sizeS="mb"
		if (dSize>1024) {
			dSize=size/1024
			sizeS="gb";
		}
		if (size<=0) sizeS="bytes";
		dSize=Math.ceil(dSize);
			speech.speak(dSize+" "+sizeS+" total");
}
}
//Enter
	if (evt==KeyEvent.DOM_VK_RETURN) {
	if (browsing==0) return
		selected.splice();
	browseArray.forEach((i)=> {
	if (i.selected) {
	selected.push(i.name);
		}
	});
	if (selected.length>0) {
		if (typeof snd !== 'undefined') {
snd.destroy();
		}
						browsing=0;
						event.justPressedEventCallback=null;
						event.charEventCallback=null;
						downloadPacks(selected);
						
												return;
		}
	}
	// Down arrow
	if (evt==KeyEvent.DOM_VK_DOWN) {
		if (typeof snd !== 'undefined') {
snd.destroy();
		}
		browsePosition++;
		if (browsePosition > browseArray.length - 1) {
			browsePosition = 0;
		}
		if (browseArray[browsePosition].selected) { snds.stop(); snds.play(); }
if (lang == 1) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
}
if (lang == 2) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
}
	}
	// Up arrow
	if (evt==KeyEvent.DOM_VK_UP) {
		if (typeof snd !== 'undefined') {
snd.destroy();
		}
		browsePosition--;
		if (browsePosition < 0) {
			browsePosition = browseArray.length - 1;
		}
		if (browseArray[browsePosition].selected) { snds.stop(); snds.play(); }
				if (lang == 1) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
		}
		if (lang == 2) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
		}
			}
};
		// First letter
				event.charEventCallback=function(char) {
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
if (browseArray[browsePosition].selected) { snds.stop(); snds.play(); }
if (lang == 1) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' levels.');
}
if (lang == 2) {
speech.speak(browseArray[browsePosition].name + '. ' + browseArray[browsePosition].levels + ' niveles.');
}
	}
	//browse menu end
		return;
	}
			});
	if (anotherSelected) return;
	}
	else if (arr.length > 0) {
		so.directory = './sounds/';
		const prog = so.create('progress');
var toDownload = [];
	speech.speak(strings.get( 'dling', [i + 1, arr.length]));
	let percent=0;
let prevPercent=0;
	for (let i = 0; i < arr.length; i++) {
		var name = arr[i];
		//toDownload[name] = [];
		percent=Math.floor(utils.percent(i, arr.length));
				if (percent>prevPercent+20) {
		prevPercent=percent;
		if (arr.length>5) speech.speak(strings.get("retrieving")+percent+"%"); //speak only if getting a few packs, getting 1 or 2 is fast.
}
		
								 await fetch(' http://oriolgomez.com/beatpacks/index.php?p=' + arr[i])
						 .then(event => event.text())
			.then(data => {
const datas = data.split('\n');
datas.forEach(i => {
	if (i != '') {
toDownload.push(i);
		
	}
});
			});
						 		}// End for loop
	let dir = os.homedir() + '/beatpacks/';
	let url = 'http://oriolgomez.com/beatpacks/';
	var dlCounter=0;
	var dests=[];
	for (var i in toDownload) {
	var ii=i;
			i=toDownload[i];
			if (i=="") continue;
						dir = os.homedir() + '/beatpacks/';
	var dirsplit=i.split("/");
						if (fs.existsSync(dir + i)) {
																		console.log("unlink"+dir+i);
		fs.unlinkSync(dir + i);
		}
		if (!fs.existsSync(dir+dirsplit[0])) {
fs.mkdirSync(dir+dirsplit[0]);
			}
											dir = os.homedir() + '/beatpacks/'+i;
			url = 'http://oriolgomez.com/beatpacks/'+i;
toDownload[ii]=url;
dests.push(dir);
			}
						console.log("going to start download");
						speech.speak(strings.get("dfiles",[toDownload.length]));
						percent=0;
prevPercent=0;
						let currentIndex=0;
												let event=new KeyboardInput();
						event.init();
						event.justPressedEventCallback=function() {
																		percent=utils.percent(currentIndex, toDownload.length).toFixed(1);
										speech.speak(percent+"%");
																				console.log(percent+"%");
										};
																																																												var threads = 3;
require('async').eachOfLimit(toDownload, threads, function(fileUrl, index,next){
		  download(fileUrl, dests[index],next);
		  
		  currentIndex=index;
		  		    
		  		  }, function() {
		     		     	speech.speak(strings.get( 'dlingdone'));
	console.log("exiting function");
	rebuildHashes(true);
	event.justPressedEventCallback=null;
	so.directory = './sounds/';
	st.setState(2);
			     })
			     
				}// If length > 1
}
export function save() {
if (editing) return;
const fs=require('fs');
	if (!fs.existsSync(os.homedir() + '/beatpacks')) {
fs.mkdirSync(os.homedir() + '/beatpacks');
	}
	const write = JSON.stringify(data);
// Write=mangle.encrypt(write);
fs.writeFileSync(os.homedir() + '/beatpacks/save.dat', write);
}
export function listenPack() {
const fs=require('fs');
let inp=new KeyboardInput();
inp.init();
let pos=0;
let fileData;
let bpms;
let mus;
let levels;
so.directory="./sounds/";
let lock=so.create("locked");
so.directory="";
let unlocked=data.unlocks[pack]["level"]
if (unlocked==0) unlocked=1; //first level is always unlocked even if you haven't played it
	if (fs.existsSync(packdir + 'bpm.txt')) {
			fileData = fs.readFileSync(packdir + 'bpm.txt', 'utf8');
		} else {
			const error = new ScrollingText('There was an error loading the pack ' + pack + '.', '\n', (() => {
				st.setState(2);
							}));
							return;
		}
		bpms = fileData.split(',');
		levels = bpms.length - 1;
				if (bpms[levels] == '') {
			levels--;
		}
		speech.speak(strings.get("mListen",[unlocked]));
		inp.justPressedEventCallback=function(evt) {
				lock.stop();
if (typeof mus!=="undefined") mus.destroy();

		if (evt==KeyEvent.DOM_VK_LEFT) {
		inp.justPressedEventCallback=null;
		st.setState(2);
		return;
		}
		//down
		else if (evt==KeyEvent.DOM_VK_DOWN) {
pos++;
		if (pos > levels) {
		pos = 1;
		}
		if (pos>unlocked) {
		lock.play();
		}
		else {
		mus=so.create(packdir + pos + 'music',true);
		mus.loop=true;
		mus.play();
		}
		}
				//up
		else if (evt==KeyEvent.DOM_VK_UP) {
pos--;
		if (pos <= 0) {
		pos=levels;
		}
		if (pos>unlocked) {
		lock.play();
		}
		else {
		mus=so.create(packdir + pos + 'music',true);
		mus.loop=true;
		mus.play();
		}
		}
		}//callback
		}
		export function booter() {
		if (!data.safeguards) data.safeguards=0;
		save();
		const fs=require('fs');
				if (fs.existsSync(packdir + 'boot.ogg') && !boot) {
boot=true;
credits=true;
let input=new KeyboardInput();
input.init();
			so.directory = '';
let bootSound = so.create(packdir + 'boot');
bootSound.play();
bootSound.sound.once("end",function() {
input.justPressedEventCallback=null;
mainMenu();
});
			so.directory = './sounds/';
			
input.justPressedEventCallback=function(evt) {
bootSound.sound.off("end");
bootSound.stop();
bootSound.destroy();
input.justPressedEventCallback=null;
mainMenu();
}
		}//if file exists
		else {
		credits=false;
		mainMenu();
		}
		}
		export async function addCash(c1,c2=0,callback) {
		let coinCap=-1;
		let cash=Math.ceil(c1-c2);
					data.beatcoins+=cash;
					save();
let positive=true;
let time=370;
if (cash<0) positive=false;
cash=Math.abs(cash);
so.directory="./sounds/";
let snd;
if (cash>500000) { coinCap=100000; }
else if (cash<=500000 && cash>100001) { coinCap=1000; }
else if (cash<=100000 && cash>10001) { coinCap=500; }
else if (cash<=10000 && cash>501) { coinCap=500; }
else if (cash<=500 && cash>101) { coinCap=100; }
else if (cash<=100 && cash>11) { coinCap=10; }
else if (cash<=10 && cash>0) { 
coinCap=1;
}
if (coinCap!=-1) {
if (!positive && cash>=1000) coinCap=1000; //yeah, you hear lose sound every 1k.
if (positive) {
snd=so.create("morecash"+coinCap);
speech.speak(strings.get("youwin",[cash]));
}//positive
else if (!positive) {
snd=so.create("lesscash");
speech.speak(strings.get("youlose",[cash]));
}//negative
await utils.sleep(400);
if (cash>=coinCap) {
snd.play();
cash-=coinCap;
let count=0;
for (let i=cash;i>=coinCap; i-=coinCap) {
time-=15;
if (time<80) time=80;
}//for
for (let i=cash;i>=coinCap; i-=coinCap) {
count++;
setTimeout(function() {
snd.play();
},time*count);
}//for
so.directory="";
if (typeof callback!=="undefined") {
setTimeout(function() {
callback();
},time*(count+4));
}//if callback undefined
}//if greater than coin cap
		}//coinCap -1
		else {
if (typeof callback!=="undefined") {
callback();
}//callback undefined
		}//else
				}//function
				export function buySafeguards() {
				if (typeof data.safeguards==="undefined") data.safeguards=0;
				let cash=data.beatcoins;
				if (cash>100000) cash=100000;
				let price=700;
				let max=0;
				let buying=0;
				if (cash<price) {
let error=new ScrollingText(strings.get("noGuardCash",[price,data.beatcoins]),"\n",function() {
				st.setState(2);
				});
				}
				else {
				for (let i=cash;i>=price;i-=price) {
				max++;
				}
				if (max>0) {
				//menu
				const items=new Array();
let slider=new SliderItem(0,strings.get("safequestion",[price,data.beatcoins,max]),1,max,Math.floor(max/2));
items.push(slider);
			items.push(new MenuItem(1,strings.get("buy",)));
		items.push(new MenuItem(2,strings.get("mBack",)));
				
		so.directory = './sounds/';
			let dm=new Menu(strings.get("mSafeSelect"),items);
						so.directory = '';
		dm.run(s=>{
		//console.log(s.items);
								so.directory = './sounds/';
															buying=s.items[0].value;
																																													dm.destroy();
if (s.selected==2) {
							st.setState(2);
               }
																					else {
																					data.safeguards+=buying;
							save();
let snd=so.create("safebuy")
snd.sound.once("end",function() {
st.setState(2);
});
							addCash(0,buying*price,function(){
							snd.play();
							});
}							
});
}
else {
st.setState(2);
}
				}
				}
				export function minigames() {
								if (typeof data.minis==="undefined") {
				data.minis={}
				save();
				}
				let items=[];
				let str="";
				let counter=-1;
				let name="";
				for (var i in minis) {
				if (minis.hasOwnProperty(i)) {
								str="";
				counter++;
				str+=strings.get(i)+", ";
				if (typeof data.minis[i]==="undefined") {
				str+=strings.get("cost")+": "+minis[i];
				}//type undefined
				else {
				str+=strings.get("unlocked");
				}
				items.push(new MenuItem(i,str));
				console.log(str);
				}//own property
				}//for
				items.push(new MenuItem("-1",strings.get("mBack")));
				so.directory="./sounds/";
				let mm=new Menu(strings.get("sGames"),items,so.create("minimusic"));
				mm.run(function(s) {
				mm.destroy();
				if (s.selected=="-1") {
				st.setState(2);
				return;
								}
								else {
								name=s.selected;
								if (typeof data.minis[name]==="undefined") {
								if (data.beatcoins>=minis[name]) {
								question("buygame",[strings.get(name),minis[name]],function(answer) {
								if (!answer) {
								st.setState(2);
								return;
								}
								else {
								addCash(0,minis[name],function() {
								data.minis[name]=true;
								save();
								runGame(name);
																});
								}
								});
								}
								else {
								new ScrollingText(strings.get("nogame",[minis[name],data.beatcoins]),"\n",function() {
								st.setState(2);
								});
								}
								}
								else {
								runGame(name);
								}//it is unlocked
								}//else
				});
				}//function
				export function runGame(name) {
				if (name=="slot") {
				playSlots();
				}
				else if (name=="code") {
				playCode();
				}
				else {
				st.setState(2);
				}
																				}
																				
																				//tutorials
																				export function minituts() {
				if (typeof data.minis==="undefined") {
				data.minis={}
				save();
				}
				let items=[];
				let str="";
				let counter=-1;
				let name="";
				for (var i in minis) {
				if (minis.hasOwnProperty(i)) {
								str="";
				counter++;
				str+=strings.get(i)+", ";
				items.push(new MenuItem(i,str));
				console.log(str);
				}//own property
				}//for
				items.push(new MenuItem("-1",strings.get("mBack")));
				so.directory="./sounds/";
				let mm=new Menu(strings.get("sTuts"),items,so.create("minitut",true));
				mm.run(function(s) {
				mm.destroy();
				if (s.selected=="-1") {
				st.setState(2);
				return;
								}
								else {
								runTut(s.selected);
								}
				});
				
				}
				function runTut(name) {
new ScrollingText(strings.get("tut"+name),"\n",function() {
st.setState(2);
});
			}
			export function safeget(amount,callback) {
			if (amount>0) {
			data.safeguards+=amount;
			save();
			new ScrollingText(strings.get("safeget",[amount]),"\n",function() {
			callback();
			});
			}
			else {
			callback();
			}
			}
			export async function editPack(path) {
			if (typeof path==="undefined" || path=="") {
			st.setState(2);
			return;
			}
			await utils.sleep(1000);
			console.log(path);
						path+="/"
						const fs=require('fs');
						const checkFiles=["a1","a2","a3","a4","a5","o2","o3","o4","o5","1music","2music","3music","fail","name","loop","select","win"];
			const optionalFiles=["boot","credits","nlevel","pre1","a6","o6","a7","o7","o8","a8","a9","o9"]
			editing=true;
						let str="";
						
			checkFiles.forEach(function(i,index) {
			if (!fs.existsSync(path+i+".ogg")) {
if (str=="") str=strings.get("missingFiles");
			str+="\n"+i+".ogg: "+strings.get("f"+i);
			}
			});
			if (str!="") {
			new ScrollingText(str,"\n",function() {
			st.setState(2);
			});
			return;
			}
												str="";
			optionalFiles.forEach(function(i,index) {
			if (!fs.existsSync(path+i+".ogg")) {
			if (str=="") str=strings.get("missingOptional");
			str+="\n"+i+".ogg: "+strings.get("f"+i);
			}
			});
			if (str!="") {
			new ScrollingText(str,"\n",function() {
			editPackDefinite(path);
			});
			}
			else {
			editPackDefinite(path);
			}
			}
			async function editPackDefinite(path) {
			const fs=require('fs');
			so.directory=path;
						let levels=3;
			let stop=false;
			while (!stop) {
			if (fs.existsSync(path+levels+"music.ogg")) {
			levels++;
			}
			else {
			levels--;
			stop=true;
			}
			}
			console.log("music levels"+levels);
			let fileLevels=[];
			if (fs.existsSync(path+'bpm.txt')) {
let fileData = fs.readFileSync(path + 'bpm.txt', 'utf8');
		fileLevels=fileData.split(',');
						if (fileLevels[fileLevels.length-1]=="") {
			fileLevels.splice(fileLevels.length-1,1);
					}
		} else {
				fileLevels.push("0");
					}
			let str="";
			for (let i=0;i<fileLevels.length;i++) {
			str+=fileLevels[i]+",";
			}
			console.log(str);
						so.directory="./sounds/"
			console.log("levels"+fileLevels.length);
			let items=[];
items.push(new MenuItem(-2,strings.get("mPackTut")));
items.push(new MenuItem(0,strings.get("startOver")));
for (let i=1;i<fileLevels.length;i++) {
items.push(new MenuItem(i,strings.get("level",[i])));
}
items.push(new MenuItem(-1,strings.get("mBack")));
let start=-1;
let limit=levels;
let mm=new Menu(strings.get("mSelectEdit"),items);
mm.run(async s=> {
start=s.selected;
mm.destroy();
if (start==-1) {
st.setState(2);
return;
}
if (start==-2) {
new ScrollingText(strings.get("packtut"),"\n",()=>{
editPackDefinite(path);
});//tutorial
return;
}
if (start>0) limit=start;
if (start==0) start++;
let timer=new OldTimer();
let pos=so.create("positive");
let pool=new SoundHandler();
let arr=[];
let inp=new KeyboardInput();
inp.init();
let space=so.create("pbeep",true);
so.directory=path;
let music;
let mCounter=0;
for (let i=start;i<=limit;i++) {
mCounter=i;
arr=[];
timer.restart();
if (typeof music!=="undefined") music.stop();
music=so.create(i+"music");
music.loop=true;
music.volume=0.5;
music.play();
while (arr.length<10) {
await utils.sleep(5);
if (inp.isJustPressed(KeyEvent.DOM_VK_SPACE)) {
arr.push(timer.elapsed);
timer.restart();
space.play();
}//if
}//while
console.log("avg"+utils.averageInt(arr,1));
fileLevels[i]=utils.averageInt(arr,1);
let cont=false;
music.seek(0);
timer.restart();
while (!cont) {
await utils.sleep(5);
if (timer.elapsed>=fileLevels[i]) {
timer.restart();
space.play();
}//timer elapsed
if (inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
arr=[];
break;
}
if (inp.isJustPressed(KeyEvent.DOM_VK_SPACE)) {
arr=[];
i--;
break;
}
}//second while
}//limit for
so.directory="./sounds/";
pos.play();
music.stop();
//write shit
if (fs.existsSync(path+"bpm.txt")) fs.unlinkSync(path+"bpm.txt");
let str="";
for (let i=0;i<fileLevels.length;i++) {
if (fileLevels[i]!="") {
str+=fileLevels[i]+",";
}
}
fs.writeFileSync(path+"bpm.txt",str);
pos.sound.once("end",()=> {
so.kill(()=> {
st.setState(2);
});//kill call
});
});//menu callback
			}//function
