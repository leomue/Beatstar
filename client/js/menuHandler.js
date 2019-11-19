import {utils} from './utilities';
import {report} from './main';
import {addCashSync,missions,mangle} from './main';
import {ScrollingText} from './scrollingText';
import {speech} from './tts';
import {so} from './soundObject';
import {statsFunction,checkPack, version, version2, save, data, browseAch, editPack, minituts, minigames, buySafeguards} from './main';
import {langs, lang} from './main';
import {st} from './stateMachine';
import {strings} from './strings';
import {SelectorItem, MenuItem} from './menuItem';
import {pack, packdir, rebuildHashes, downloadPacks} from './main';
import {KeyboardInput} from './input.js';
import {KeyEvent} from './keycodes';
import {Menu} from './menu';

'use strict';
function sop() {
	so.directory = packdir + '/';
}
function sos() {
	so.directory = './sounds/';
}

const {dialog} = require('electron').remote;

const electron = require('electron');
const main = require('./main');

const remote = electron.remote;

export async function mainMenu() {
	console.log('menu thinks pack dir is ' + main.packDirectory);
	const fs=require('fs');
	const items = new Array();
	const settings = new Array();
	items.push(new MenuItem(0, strings.get('mStart'),"1"));
	if (version2 != '' && version != version2) {
		items.push(new MenuItem(-1000, strings.get('newUpdate', [version, version2])));
	}
	if (speech.webTTS) {
		settings.push(new MenuItem(33, strings.get('mReader')));
	}
	if (!speech.webTTS) {
		settings.push(new MenuItem(34, strings.get('mSapi')));
	}
	if (speech.webTTS) {
		settings.push(new MenuItem(32, strings.get('mRate'),"t"));
		settings.push(new MenuItem(293, strings.get('mSelectVoice'),"v"));
	}
let selectorAction=0;
if (data.actionLimit) {
if (data.actionLimit>0) selectorAction=1;
} else {
	data.actionLimit=0;
}
settings.push(new SelectorItem(-1,strings.get("MKeyLayout"),[strings.get("mk1"),strings.get("mk2")],selectorAction,((option)=>{
if (option==0) data.actionLimit=0;
if (option==1) data.actionLimit=10;
save();
})));


if (!data.interrupt) data.interrupt=false;
if (!data.interrupt) selectorAction=1;
if (data.interrupt) selectorAction=0;
settings.push(new SelectorItem(-1,strings.get("mInterrupt"),[strings.get("yes"),strings.get("no")],selectorAction,((option)=>{
if (option==0) data.interrupt=true;
if (option==1) data.interrupt=false;
speech.interrupt=data.interrupt;
save();
})));
if (typeof data.streamMusic==="undefined") data.streamMusic=true;
if (data.streamMusic==false) selectorAction=1;
if (data.streamMusic==true) selectorAction=0;
settings.push(new SelectorItem(-1,strings.get("mStream"),[strings.get("yes"),strings.get("no")],selectorAction,((option)=>{
if (option==0) data.streamMusic=true;
if (option==1) data.streamMusic=false;
console.log(option);
save();
})));

	items.push(new MenuItem(13, strings.get('mRev'),"v"));
	items.push(new MenuItem(8, strings.get('mSafeguards', [data.safeguards]),"7"));
	items.push(new MenuItem(1, strings.get('mLearn'),"2"));
	items.push(new MenuItem(12, strings.get('mAch')));
	items.push(new MenuItem(1337, strings.get('mStats'),"s"));	
	items.push(new MenuItem(1338, strings.get('mMissions'),"m"));		
	items.push(new MenuItem(11, strings.get('mEdit'),"4"));
	items.push(new MenuItem(9, strings.get('mGames',),"3"));
	settings.push(new MenuItem(10, strings.get('mGameTuts',)));
	items.push(new MenuItem(2, strings.get('mBrowse', [data.beatcoins]),"5"));
	items.push(new MenuItem(5, strings.get('mBrowseUnlocked')));
	items.push(new MenuItem(7, strings.get('mBrowseIncompleted'),"6"));
	items.push(new MenuItem(4, strings.get('mDownload'),"d"));
	items.push(new MenuItem(6, strings.get('mUnlocked', [data.unlocks[pack].level]),"9"));
	items.push(new MenuItem(9191, strings.get('mSettings'),"0"));
	items.push(new MenuItem(8000,strings.get("mChanges")));
	settings.push(new MenuItem(1234, strings.get('mLang',),"l"));
	settings.push(new MenuItem(69, strings.get('mDir', [main.packDirectory])));
	settings.push(new MenuItem(3, strings.get('mHashes'),"h"));
	settings.push(new MenuItem(-1, strings.get('mBack'),"0"));
	so.directory = './sounds/';
	const mainMenu = new Menu(strings.get('mainmenu'), items);
	so.directory = '';
	mainMenu.music = packdir + 'loop';
	if (fs.existsSync(packdir + 'select.ogg')) {
		mainMenu.sndChoose.unload();
		mainMenu.sndChoose = so.create(packdir + 'select');
	}
	await missions(true);
	if (fs.existsSync(main.packDirectory+"/save.beat") && !data.awarded) {
		sos();
		await new ScrollingText(strings.get("foundOldSave"));
		try {
		fs.unlinkSync(main.packDirectory+"/save.beat");
		} catch { }
		data.awarded=true;
		await addCashSync(100000);
	}
	mainMenu.run(async s => {
			mainMenu.destroy();
if (s.selected!=9191) {
await menusFunction(s);
} else {
	const settingsMenu = new Menu(strings.get('settingsMenu'), settings);
settingsMenu.run(async s => {
settingsMenu.destroy();
await menusFunction(s);
});
}
});
}
async function menusFunction(s) {
	const fs=require('fs');
			speech.stop();
			so.directory = './sounds/';

			switch (s.selected) {
				case 8000:
				let file=fs.readFileSync(__dirname+"/changes"+lang+".txt",{encoding: "utf-8"}).split("\n");
				let items=[];
				for (let i=0;i<file.length;i++) {
					if (file[i]!="") items.push(new MenuItem(0,file[i]));
				}
				let menu=new Menu(strings.get("changesMenu"),items);
				menu.silent=true;
							await menu.runSync();
				st.setState(2);
break;
			case 1234:
			languageSelect();
			break;
			case 293:
			speech.setVoice(v=> {
					data.voice=v;
					if (typeof data.rate==="undefined") data.rate=3;
					speech.setRate(data.rate);
					save();
					st.setState(2);
					});
			break;
case 1337: statsFunction(); break;
case 1338: await missions(); break;
			case 32:
			changeRate();
			break;
			case 33:
			if (process.platform == 'darwin') {
				await new ScrollingText(strings.get('macwarning'));
			}
			speech.webTTS = false;
data.webTTS=false;
save();
			st.setState(2);
			break;
			case 34:
			speech.webTTS = true;

data.webTTS=true;
save();
			st.setState(2);
			break;

			case 0: st.setState(3); break;
			case 1: st.setState(4); break;
			case 2:
				st.setState(5); break;
			case 3: rebuildHashes(); break;
			case 4: downloadPacks(); break;
			case 5:
				st.setState(6); break;
			case 6:
				st.setState(7); break;
			case 7:
				st.setState(8); break;
			case 8: buySafeguards(); break;
			case 9: minigames(); break;
			case 10: minituts(); break;
			case 69:
				 const dir = await changeDir();
				 console.log('dir' + dir);
				 if (typeof dir !== 'undefined' && dir != '') {
					 main.packDirectory = dir;
					 main.packdir = main.packDirectory + '/' + pack + '/';
					 window.localStorage.setItem('path', main.packDirectory);
				 } else {
					 console.log('fuck you error.');
				 }
				 checkPack();
				 break;
			case 11:
let path=dialog.showOpenDialogSync({properties: ['openDirectory'], title: strings.get("selectPack")});
	editPack(path[0]);
break;
case 12:
browseAch();
break;
case 13:
st.setState(21);
break;
case -1:
st.setState(2);
break;
case -1000:
const {shell} = require('electron').remote;
shell.openExternal('http://oriolgomez.com');
st.setState(2);
break;
}
}
export async function changeRate() {
	let rate = speech.rate;
	const inp = new KeyboardInput();
	inp.init();
	strings.speak('rating');
	while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
		await utils.sleep(5);
		if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
			rate += 0.25;
			if (rate>10) rate=10;

			speech.setRate(rate)
				strings.speak('newRate');
		}
		if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
			rate -= 0.25;
			if (rate<1) rate=1;
			speech.setRate(rate)
				strings.speak('newRate');
		}
	}
	data.rate = speech.rate;
	save();
	st.setState(2);
}
export function languageSelect() {
	let str = '';
	for (const i in strings.strings) {
		str += strings.strings[i].langs + '. ';
	}

	const items = [];
	let counter = 1;
	for (const i in strings.strings) {
		items.push(new MenuItem(counter, strings.strings[i].lang));
		counter++;
	}
	const lm = new Menu(str, items);
	lm.run(s => {
			main.lang = s.selected;
			data.lang = lang;
			save();
			speech.setLanguage(lang);
			lm.destroy();
			st.setState(2);
			});
}
export async function changeDir() {
	let path=dialog.showOpenDialogSync({properties: ['openDirectory'], title: strings.get("selectNewPath")});
	if (typeof path==="undefined") return "";
	return path[0];
}
