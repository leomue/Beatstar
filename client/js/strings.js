'use strict';
class Strings {
constructor() {
this.strings={};
this.strings[1]={
"mStart":"Start Game",
"mLearn":"Learn the pack",
"keymapChoose":"Press the key to replace this action: You can't use q, p, escape, enter or space.",
"packError":"No packs were found on your computer. I will now proceed to download the default pack, please wait...",
"intro":"Welcome to beatstar!\nThis is a world of music, fun and games.\nPlease read the online instructions to learn how to play.\n",
"keymapStart":"We will now remap your keyboard. You will hear the sounds for the different actions, and you will be prompted to press the key you want to associate to the new actions.",
"tamperWarning":"This pack has been tampered with and is no longer unlocked. Press enter to continue.",
"mNew":"Get new packs",
"nopacks":"No packs are available here.",
"mBrowse":"Browse downloaded packs",
"mHashes":"Rebuild packs folder",
}
}
get(lang,what) {
if (typeof this.strings[lang][what]!="undefined") {
return this.strings[lang][what];
}
if (typeof this.strings[1][what]!="undefined") {
return this.strings[1][what];
}
return "-1";
}
}
export var strings=new Strings();