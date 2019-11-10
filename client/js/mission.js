import {data} from './main';
class Mission {
	constructor(id,scale,current) {
this.currentValue=current;
this.scale=scale;
this.id=id;
if (!data.missions) data.missions={};
if (!data.missions[this.id]) data.missions[this.id]={
current:this.currentValue,
level:this.level,
} else {

}

}
getNextValue() {
this.level=data.missions[this.id].level;
this.currentValue=data.missions[this.id].current;
}

check(v) {
if (this.currentValue>v) {
data.missions[this.id].current=v;
this.level++;
data.missions[this.id].level++;
return true;
} else {
data.missions[this.id].current=v;
return false;
}