'use strict'
import {so} from './soundObject';
import {langs,lang} from './main';
import {st} from './stateMachine';
import {strings} from './strings';
import {MenuItem} from './menuItem';
import {pack,packdir,rebuildHashes} from './main';
import {Menu} from './menu';
	export function mainMenu() {
	var items=new Array();
	items.push(new MenuItem(0,strings.get(lang,"mStart")));
items.push(new MenuItem(1,strings.get(lang,"mLearn")));
items.push(new MenuItem(2,strings.get(lang,"mBrowse")));
items.push(new MenuItem(3,strings.get(lang,"mHashes")));
	var mainMenu=new Menu("main menu",items);
	so.directory="";
	mainMenu.music=packdir+"loop";
	var fs=require('fs');
	if (fs.existsSync(packdir+"select.ogg")) {
	mainMenu.sndChoose.destroy();
	mainMenu.sndChoose=so.create(packdir+"select");
}
	mainMenu.run(function(s) {
			so.directory="./sounds/";
	switch(s.selected) {
	case 0: st.setState(3); break;
	case 1: st.setState(4); break;
	case 2: 
		st.setState(5); break;
		case 3: rebuildHashes(); break;
	}

	});
	}