'use strict';

import {so} from './soundObject';
import {data} from './main';
import {langs, lang} from './main';
import {st} from './stateMachine';
import {strings} from './strings';
import {MenuItem} from './menuItem';
import {pack, packdir, rebuildHashes, downloadPacks} from './main';
let boot=false;
import {Menu} from './menu';
export async function mainMenu() {
const fs=require('fs');
if (fs.existsSync(packdir + 'boot.ogg') && !boot) {
boot=true;
			so.directory = '';
let bootSound = so.create(packdir + 'boot');
			so.directory = './sounds/';
bootSound.play();
let input=new KeyboardInput();
				while (bootSound.playing) {
			await utils.sleep(5);
			if (input.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
		bootSound.stop();
			}//key
		}//while
		}//if file exists
		
	speech.webTTS=true;
	const items = new Array();
	items.push(new MenuItem(0, strings.get( 'mStart')));
items.push(new MenuItem(1, strings.get( 'mLearn')));
items.push(new MenuItem(2, strings.get( 'mBrowse',[data.beatcoins])));
items.push(new MenuItem(5, strings.get( 'mBrowseUnlocked')));
items.push(new MenuItem(7, strings.get( 'mBrowseIncompleted')));
items.push(new MenuItem(4, strings.get( 'mDownload')));
items.push(new MenuItem(6, strings.get( 'mUnlocked',[data.unlocks[pack]["level"]])));
items.push(new MenuItem(3, strings.get( 'mHashes')));
so.directory = './sounds/';
const mainMenu = new Menu(strings.get("mainmenu"), items);
so.directory = '';
mainMenu.music = packdir + 'loop';
if (fs.existsSync(packdir + 'select.ogg')) {
	mainMenu.sndChoose.unload();
	mainMenu.sndChoose = so.create(packdir + 'select');
}
	mainMenu.run(s => {
		so.directory = './sounds/';
		switch (s.selected) {
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
		
			
		}
	});
}
