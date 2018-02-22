'use strict';
class Strings {
constructor() {
this.strings={};
this.strings[1]={
"mStart":"Start Game",
"mLearn":"Learn the pack",
"mNew":"Get new packs",
}
}
get(lang,what) {
return this.strings[lang][what];
}
}
export var strings=new Strings();