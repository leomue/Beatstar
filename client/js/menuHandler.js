'use strict';
var main=require('./main');
const {dialog} = require('electron').remote;

const electron = require('electron');

const remote = electron.remote;
import {utils} from './utilities';
import {ScrollingText} from './scrollingText';
import {speech} from './tts';
import {so} from './soundObject';
import {checkPack,version, version2, save, data, browseAch, editPack, minituts, minigames, buySafeguards} from './main';
import {langs, lang} from './main';
import {st} from './stateMachine';
import {strings} from './strings';
import {MenuItem} from './menuItem';
import {pack, packdir, rebuildHashes, downloadPacks} from './main';
import {KeyboardInput} from './input.js';
import {KeyEvent} from './keycodes';
import {Menu} from './menu';

export async function mainMenu() {
console.log("menu thinks pack dir is "+main.packDirectory);
	const fs = require('fs');
	const items = new Array();
			items.push(new MenuItem(0, strings.get('mStart')));
			if (version2 != '' && version != version2) {
				items.push(new MenuItem(-1000, strings.get('newUpdate', [version, version2])));
			}
			if (speech.webTTS) {
items.push(new MenuItem(33, strings.get('mReader')));
			}
			if (!speech.webTTS) {
items.push(new MenuItem(34, strings.get('mSapi')));
			}
			if (speech.webTTS) {
items.push(new MenuItem(32, strings.get('mRate')));
			}
		items.push(new MenuItem(13, strings.get('mRev')));
	items.push(new MenuItem(8, strings.get('mSafeguards', [data.safeguards])));

items.push(new MenuItem(1, strings.get('mLearn')));
items.push(new MenuItem(12, strings.get('mAch')));
items.push(new MenuItem(11, strings.get('mEdit')));
	items.push(new MenuItem(9, strings.get('mGames',)));

items.push(new MenuItem(2, strings.get('mBrowse', [data.beatcoins])));
items.push(new MenuItem(5, strings.get('mBrowseUnlocked')));
items.push(new MenuItem(7, strings.get('mBrowseIncompleted')));
items.push(new MenuItem(4, strings.get('mDownload')));
items.push(new MenuItem(6, strings.get('mUnlocked', [data.unlocks[pack].level])));
items.push(new MenuItem(10, strings.get('mGameTuts',)));
items.push(new MenuItem(1234, strings.get('mLang',)));
items.push(new MenuItem(69, strings.get('mDir',[main.packDirectory])));
items.push(new MenuItem(3, strings.get('mHashes')));
so.directory = './sounds/';
const mainMenu = new Menu(strings.get('mainmenu'), items);
so.directory = '';
mainMenu.music = packdir + 'loop';
if (fs.existsSync(packdir + 'select.ogg')) {
	mainMenu.sndChoose.unload();
	mainMenu.sndChoose = so.create(packdir + 'select');
}
	mainMenu.run(async s => {
		speech.stop();
		so.directory = './sounds/';
		mainMenu.destroy();
		switch (s.selected) {
			case 1234:
			languageSelect();
			break;
			case 32:
			changeRate();
				break;
			case 33:
				if (process.platform == 'darwin') {
					await new ScrollingText(strings.get('macwarning'));
				}
				speech.webTTS = false;
			st.setState(2);
				break;
			case 34:
				speech.webTTS = true;
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
let dir=await changeDir();
console.log("dir"+dir);
			if (typeof dir !== 'undefined' && dir != '') {
				main.packDirectory=dir;
				main.packdir =main.packDirectory+"/" + pack + '/';
				window.localStorage.setItem("path",main.packDirectory);
			}
			else {
				console.log("fuck you error.");
			}
			checkPack();
				break;
			case 11:
				const stuff = dialog.showOpenDialog({
					title: strings.get('selectPack'),
					properties: ['openDirectory']
				}, path => {
  editPack(path);
				});
				break;
			case 12:
			browseAch();
				break;
			case 13:
			st.setState(21);
				break;
			case -1000:
				const {shell} = require('electron').remote;
			shell.openExternal('http://oriolgomez.com');
			st.setState(2);
				break;
		}
	});
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
			speech.rate = rate;
		strings.speak('newRate');
		}
		if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
			rate -= 0.25;
			speech.rate = rate;
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
			st.setState(2);
		lm.destroy();
		});	
}
export async function changeDir() {
return new Promise((resolve,reject)=> {
				const stuff = dialog.showOpenDialog({
					title: strings.get('selectNewPath'),
					properties: ['openDirectory']
				}, path=> {
					console.log("path"+path);
					resolve(String(path));
				});
	});
}