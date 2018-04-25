import {pack,packdir,actionKeys,save,question,addCash,data} from './main';
import {SoundPool} from './soundPool';
import {SliderItem,MenuItem} from './menuItem';
import {Menu} from './menu';
import os from 'os';
import {ScrollingText} from './scrollingText';
import {strings} from './strings';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {st} from './stateMachine';
import fs from 'fs';
export function minibet(callbet=null,minBet=5000,slideBy=500) {
				if (data.beatcoins<minBet) {
let error=new ScrollingText(strings.get("noGameCash",[minBet,data.beatcoins]),"\n",function() {
				if (typeof callbet!=="undefined") callbet(-1);
				return;
				});//scroll
				}//if not cash
				else {
				//bet start
								const items=new Array();
								let slider=new SliderItem(0,strings.get("bet",[]),minBet,data.beatcoins,minBet,slideBy);
								items.push(slider);
								items.push(new MenuItem(1,strings.get("ok",)));
								items.push(new MenuItem(2,strings.get("mBack",)));
								so.directory = './sounds/';
			let dm=new Menu(strings.get("bet"),items);
			let myBet=0;
				dm.run(s=>{
				so.directory = './sounds/';
															myBet=s.items[0].value;
								dm.destroy();
								if (s.selected==2) {
							if (typeof callbet!=="undefined") callbet(myBet);
               }//option 2
else {
addCash(0,myBet,function() {
if (typeof callbet!=="undefined") callbet(myBet);
});
}//not option 2
});//menu callback
								//bet end
								}//enough cash
				}//function
				export function playSlots() {
				let myBet;
				minibet(function(bet) {
				if (bet<=0) {
				st.setState(2);
				return;
				}
				myBet=bet;
				//slots
				so.directory="./sounds/";
				let loop=so.create("slot_wheel",true);
				let wheel;
								let counter=0;
loop.play();
				let wheels=[];
				let myInt=setInterval(()=> {
				if (counter<3) {
				so.directory="";
				wheels[counter]=utils.randomInt(2,5);
				if (counter==2 && (wheels[0]==wheels[1])) {
				let void_random;
void_random=utils.randomInt(1,10);
if (void_random==1) wheels[2]=1;
}
wheel=so.create(packdir+"a"+wheels[counter]);
wheel.play();
counter++;
}
else {
clearInterval(myInt);
loop.stop();
so.directory="./sounds/";
if (wheels[0]==wheels[1] && wheels[1]==wheels[2]) {
let win=so.create("slot_win_"+utils.randomInt(1,4));
win.play();
win.sound.once("end",()=> {
let capcash=myBet;
console.log(capcash);
let perc=Math.ceil(utils.percentOf(utils.randomInt(80,100),capcash)+myBet);
console.log("perc"+perc);
addCash(perc,0,function() {
so.kill(function() {
st.setState(2);
});
});
});
}
else if (wheels[2]==1) {
let lose=so.create("slot_lose_3");
lose.play();
lose.sound.once("end",function() {
let capcash=myBet;
console.log(capcash);
if (capcash>data.beatcoins) capcash=data.beatcoins;
let perc=Math.ceil(utils.percentOf(utils.randomInt(25,30),capcash));
console.log("perc"+perc);
addCash(0,perc,function() {
so.kill(function() {
st.setState(2);
});
});
});
}
else if (wheels[0]==wheels[1] || wheels[1]==wheels[2] || wheels[0]==wheels[2]) {
let lose=so.create("slot_lose_1");
lose.play();
lose.sound.once("end",function() {
let capcash=myBet;
console.log(capcash);
let perc=Math.ceil(utils.percentOf(utils.randomInt(40,69),capcash));
console.log("perc"+perc);
addCash(perc,0,function() {
so.kill(function() {
st.setState(2);
});
});
});
}
else {
let lose=so.create("slot_lose_2");
lose.play();
lose.sound.once("end",function() {
let capcash=myBet;
if (capcash>data.beatcoins) capcash=data.beatcoins;
console.log(capcash);
let perc=Math.ceil(utils.percentOf(utils.randomInt(20,60),capcash));
console.log("perc"+perc);
addCash(0,perc,function() {
so.kill(function() {
st.setState(2);
});
});
});
}
}//counter
				},utils.randomInt(2500,3100));
			
								},2500,500);
				}