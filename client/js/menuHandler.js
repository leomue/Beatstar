'use strict'
import {so} from './soundObject';
import {langs,lang} from './main';
import {st} from './stateMachine';
import {strings} from './strings';
import {MenuItem} from './menuItem';
import {pack} from './main';
import {Menu} from './menu';
	export function mainMenu() {
	var items=new Array();
	items.push(new MenuItem(0,strings[langs[lang]].mStart));
	items.push(new MenuItem(1,strings[langs[lang]].mLearn));
	var mainMenu=new Menu("main menu",items,"../packs/"+pack+"/loop");
	mainMenu.sndChoose.destroy();
	mainMenu.sndChoose=so.create("../packs/"+pack+"/select");
	mainMenu.run(function(s) {
			console.log(s.selected);
	switch(s.selected) {
	case 0: st.setState(3);
	}
	mainMenu.destroy();
	});
	}