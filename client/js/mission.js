import {lang,save,missionSound,data} from './main';
import {report} from './main';

import {utils} from './utilities';
import {SliderItem, MenuItem} from './menuItem';
import {Menu} from './menu';
import {ScrollingText} from './scrollingText';
import {strings} from './strings';
class Mission {
	constructor(id,scale,cost,includeName=false) {
		if (!data.missionCredits) data.missionCredits=0;
this.currentValue=0;
this.scale=scale;
this.id=id;
this.cost=cost;
this.level=0;
if (!data.missions) data.missions={};
if (!data.missions[this.id]) {
	data.missions[this.id]={
current:this.currentValue,
level:this.level,
cost:this.cost,
}
} else {
	this.level=data.missions[this.id].level;
	this.currentValue=data.missions[this.id].current;
}
save();
}
getNextValue() {
this.level=data.missions[this.id].level;
this.currentValue=data.missions[this.id].current;
return this.cost*(this.level+1)*this.scale;
}
reset() {
	this.currentValue=0;
this.level=0;
	data.missions[this.id]=null;
		data.missions[this.id]={
	current:this.currentValue,
	level:this.level,
	cost:this.cost,
	}

}
menuItem() {
if (this.id!="time") return new MenuItem(0, strings.get("missiont"+this.id)+": "+strings.get("mission"+this.id,[this.level,this.currentValue,Math.floor(this.cost*(this.level+1)*this.scale)]));
if (this.id=="time") {
	const humanize=require("humanize-duration");
	let lng="en";
	if (lang==2) lng="es";
	return new MenuItem(0, strings.get("mission"+this.id,[this.level,humanize(this.currentValue*1000,{language: lng}),humanize((Math.floor(this.cost*(this.level+1)*this.scale))*1000,{language:lng})]));
}
}
async check(v) {
	let final=v;
		this.level=data.missions[this.id].level;
	this.currentValue=data.missions[this.id].current;
let levelup=false;
while (v>=this.cost*(this.level+1)*this.scale) {
data.missions[this.id].current=v;
this.level++;
data.missions[this.id].level++;
this.currentValue=v;
data.missionCredits++;
levelup=true;
}
if (levelup) {
missionSound.play();
await utils.sleep(800);
await new ScrollingText(strings.get("missionNext",[this.level,strings.get("missiont"+this.id),data.missionCredits]));
	save();
	return true;
} else {
	this.currentValue=v;
	data.missions[this.id].current=v;
	save();
return false;
}
}
}
module.exports.Mission=Mission