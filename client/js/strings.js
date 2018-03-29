'use strict';
class Strings {
	constructor() {
		this.strings = {};
		this.strings[1] = {
			"mFound":"Found %1 new packs: what do you wish to do?",
			mReady: 'Please wait...',
			mDownloadAll: 'Download all uninstalled packs (size: %1 %2)',
			nodown:"No downloads are available. So sorry! Check back soon",
			mDownloadList: 'List all new available packs (%1)',
			"mBack":"go back",
			mDownloadInstructions: 'Press arrow keys to browse packs, the space bar to select a pack, p to preview its sound, and enter to begin downloading selected packs. Press escape or q to cancel',
			mStart: 'Start Game',
			mLearn: 'Learn the pack',
			mActions: 'This pack has %1 actions. Typical keys are space, tab, enter, backspace, and optionally arrows up, down, left, right. If you have mapped your keyboard differently, use your custom keys instead. To hear the stop action, press the period key (to the right of comma).',
			dling: 'Downloading %2 packs please wait...',
			dlingdone: 'Done!',
			keymapChoose: 'Press the key to replace this action: You can\'t use q, p, escape, enter or space.',
			packError: 'No packs were found on your computer. I will now proceed to download the default pack, please wait...',
			intro: 'Welcome to beatstar!\nThis is a world of music, fun and games.\nPlease read the online instructions to learn how to play.\n',
			keymapStart: 'We will now remap your keyboard. You will hear the sounds for the different actions, and you will be prompted to press the key you want to associate to the new actions.',
			tamperWarning: 'This pack has been tampered with and is no longer unlocked. Press enter to continue.',
			mNew: 'Get new packs',
			nopacks: 'No packs are available. If you are sure you installed packs please contact me.',
			mBrowse: 'Browse downloaded packs',
			mHashes: 'Rebuild packs folder',
			mDownload: 'Download new packs'
		};
	}

	get(lang, what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			return '-1';
		}
	rep.forEach((v, i) => {
		const i1 = Number(i) + 1;
		str = str.replace('%' + i1, v);
	});
	return str;
	}
}
export var strings = new Strings();
