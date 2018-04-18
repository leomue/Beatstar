import $ from 'jquery';
import Cryptr from 'cryptr';
import {Player} from './player';
import {MenuItem} from './menuItem';
import {Menu} from './menu';
import 'hash-files';
import walk from 'fs-walk';
import fs from 'fs';
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

export var lang = 2;
export var langs = ['', 'english', 'spanish'];
export var pack = 'default';
export var data = '';
export var packdir = os.homedir() + '/beatpacks/' + pack + '/';
document.addEventListener('DOMContentLoaded', setup);
so.debug = true;
function setup() {
/*
	So.enqueue("memtest");
	so.setQueueCallback(function() { proceed(); });
	so.loadQueue();
	*/
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
browseArray.push(i);
	}
});
	}
	so.directory = '';
	if (browseArray.length === 0) {
		new ScrollingText(strings.get( 'nopacks'), '\n', st.setState(2));
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
speech.speak('ready. Browsing ' + browseArray.length + ' packs. Press arrows to move, q to exit, enter to choose a pack, or page up and page down to move by larger increments.');
}
if (lang == 2) {
speech.speak('listo. tienes ' + browseArray.length + ' packs. Pulsa flechas para moverte, q para salir, enter para elegir uno, o pulsa retroceder página y avanzar página para moverte de 20 en 20.');
}
const exitNow = 0;
while (!event.isJustPressed(KeyEvent.DOM_VK_Q) && browsing > 0) {
// Enter
	if (event.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
		if (typeof snd !== 'undefined') {
snd.destroy();
		}
		if (timeout != -1) {
clearTimeout(timeout);
		}
		if (browsePosition != -1) {
			var size = 0;
walk.filesSync(os.homedir() + '/beatpacks/' + browseArray[browsePosition].name, (pb, pf, stat) => {
	size += stat.size;
});
if (size != browseArray[browsePosition].hash) {
	browsing = 0;
// Todo: remove from unlocked
speech.speak(strings.get( 'tamperWarning'));
setTimeout(() => {
speech.speak(strings.get( 'tamperWarning'));
}, 4500);
while (!event.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
	await utils.sleep(10);
}
}
if (browsing > 0) {
	pack = browseArray[browsePosition].name;
	data.pack = pack;
	packdir = os.homedir() + '/beatpacks/' + pack + '/';
	so.directory = './sounds/';
save();
so.kill(() => {
st.setState(2);
});
return;
}
		}
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
// Var hash=require('hash-files');
	let corrupts = '';
	// Var walk=require('fs-walk');
	// var fs=require('fs');
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
export function checkPack() {
	try {
		data = JSON.parse(fs.readFileSync(os.homedir() + '/beatpacks/save.dat'));
	} catch (err) {
		data = new Player();
	}
	pack = data.pack;
	packdir = os.homedir() + '/beatpacks/' + pack + '/';
	actionKeys = data.actionKeys;
save();
if (!fs.existsSync(packdir + 'bpm.txt')) {
	pack = 'default';
	packdir = os.homedir() + '/beatpacks/' + pack + '/';
}
if (!fs.existsSync(packdir + 'bpm.txt')) {
	const text = new ScrollingText(strings.get( 'packError'), '\n', (() => {
downloadPacks(['default']);
	}));
	return;
}
mainMenu();
}
var download = function(url, dest, cb) {
const http=require('http');
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
		if (arr.length == 0) {
		const dlList = new Array();
		let remoteHashes;
		let localHashes;
		localHashes = await rebuildHashes(true);
		await fetch('http://oriolgomez.com/beatpacks/hashes.db')
						 .then(event => event.text())
			.then(data => {
				remoteHashes = JSON.parse(mangle.decrypt(data));
console.log(remoteHashes.length);
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
mainMenu();
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
toDownload.push(name+"/"+i);
		
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
	if (!fs.existsSync(os.homedir() + '/beatpacks')) {
fs.mkdirSync(os.homedir() + '/beatpacks');
	}
	const write = JSON.stringify(data);
// Write=mangle.encrypt(write);
fs.writeFileSync(os.homedir() + '/beatpacks/save.dat', write);
}
