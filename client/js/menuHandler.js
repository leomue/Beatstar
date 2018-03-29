'use strict';
import {so} from './soundObject';
import {langs, lang} from './main';
import {st} from './stateMachine';
import {strings} from './strings';
import {MenuItem} from './menuItem';
import {pack, packdir, rebuildHashes, downloadPacks} from './main';
import {Menu} from './menu';

export function mainMenu() {
	speech.webTTS=true;
	const items = new Array();
	items.push(new MenuItem(0, strings.get(lang, 'mStart')));
items.push(new MenuItem(1, strings.get(lang, 'mLearn')));
items.push(new MenuItem(2, strings.get(lang, 'mBrowse')));
items.push(new MenuItem(3, strings.get(lang, 'mHashes')));
items.push(new MenuItem(4, strings.get(lang, 'mDownload')));
so.directory = './sounds/';
const mainMenu = new Menu('main menu', items);
so.directory = '';
mainMenu.music = packdir + 'loop';
const fs = require('fs');
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
		}
	});
}
