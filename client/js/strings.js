'use strict';
class Strings {
constructor() {
this.strings={};
this.strings[1]={
"mStart":"Start Game",
"mLearn":"Learn the pack",
"tamperWarning":"This pack has been tampered with and is no longer unlocked. Press enter to continue.",
"mNew":"Get new packs",
"nopacks":"No packs were found, you will now be taken to the pack downloader screen.",
"mBrowse":"Browse downloaded packs",
"mHashes":"Rebuild packs folder",
}
}
get(lang,what) {
return this.strings[lang][what];
}
}
export var strings=new Strings();