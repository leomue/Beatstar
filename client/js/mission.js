import {data} from './main';
class Mission {
	constructor(id,scale,current,cost) {
		if (!data.missionCredits) data.missionCredits=0;
this.currentValue=current;
this.scale=scale;
this.id=id;
this.cost=cost;
this.level=0;
if (!data.missions) data.missions={};
if (!data.missions[this.id]) data.missions[this.id]={
current:this.currentValue,
level:this.level,
cost:this.cost,
}
} else {
}
save();
}
getNextValue() {
this.level=data.missions[this.id].level;
this.currentValue=data.missions[this.id].current;
return this.cost*(this.level+1)*this.scale;
}

check(v) {
	this.level=data.missions[this.id].level;
	this.currentValue=data.missions[this.id].current;

if (v>this.cost*(this.level+1)*this.scale) {
data.missions[this.id].current=v;
this.level++;
data.missions[this.id].level++;
data.missionCredits++;
save();
return true;
} else {
return false;
}
}