'use strict';
class Strings {
constructor() {
this.strings={};
this.strings[1]={
"mStart":"Start Game",
"mLearn":"Learn the pack",
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