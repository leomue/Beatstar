import {questionSync,getAch,addCashSync,safeget,pack,packdir,actionKeys,save,question,addCash,data} from './main';
import {shuffle,newDeck,newDecks} from '52-deck';
import {OldTimer} from './oldtimer';
import {SoundHandler} from './soundHandler';
import {SliderItem,MenuItem} from './menuItem';
import {Menu} from './menu';
import os from 'os';
import {ScrollingText} from './scrollingText';
import {strings} from './strings';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {KeyboardInput} from './input';
import {st} from './stateMachine';
import fs from 'fs';
export async function betSync(minBet=5000,slideBy=500) {
return new Promise((resolve,reject)=> {
minibet(function(bet) {
resolve(bet);
return bet;
},minBet,slideBy);
});
}
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
				export async function playSlots() {
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
win.sound.once("end",async ()=> {
await getAch("slotwin");
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
lose.sound.once("end",async function() {
await getAch("frust");
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
lose.sound.once("end",async function() {
await getAch("evils");
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
lose.sound.once("end",async function() {
await getAch("catslots");
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
				function sop() {
				so.directory=packdir+"/";
				}
								function sos() {
				so.directory="./sounds/";
				}
				export async function playCode() {
								const fs=require('fs');
	let pool = new SoundHandler();
	let actions = 0;
	for (let i = 1; i <= 10; i++) {
		if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
			actions = i;
		}
	}
let time=new OldTimer();
let allowed=42000;
let ticker;
let music;
sos();
ticker=so.create("codetick");
sop();
let playing=true;
let level=0;
let crackedcodes=0;
let acode=[];
let actionsa=[];
let curkeys=[];
for (let i=2;i<=actions;i++) {
actionsa.push("a"+i);
}
let go;
let input=new KeyboardInput();
input.init();
let fumbled=false;
sos();
go=so.create("codego");
let tick=true;
while(playing) {
await utils.sleep(5);
level++;
allowed=35000+(actions*500);
acode.splice();
acode=actionsa;
if (level+actions-1>actions) {
let more=level-1;
for (let i=1;i<=more;i++) {
acode.push("a"+utils.randomInt(2,actions));
}
}
acode=utils.shuffle(acode);
let counter=0;
sos();
if (!fumbled) {
speech.speak(strings.get("level",[level]));
await utils.sleep(700);
speech.speak(strings.get("codes",[acode.length]));
await utils.sleep(utils.randomInt(800,1250));
go.play();
sop();
time.reset();
}
while (time.elapsed<allowed && playing) {
await utils.sleep(5);
if (time.elapsed%1000<=10 && tick) {
let formula=(allowed-time.elapsed)/1000;
ticker.pitch=(120-formula)/100;
tick=false;
ticker.play();
}//ticker sound
else {
 tick=true;
}
input.justPressedEventCallback=function(evt) {
if (evt==KeyEvent.DOM_VK_Q) 
playing=false;
if (actionKeys.includes(evt)) {
if (evt==actionKeys[acode[counter].substr(1)]) {
sop();
pool.playStatic(acode[counter],0);
sos();
pool.playStatic("code_ok",0);
sop();
counter++;
}
else {
counter=0;
sos();
pool.playStatic("code_wrong",0);
sop();
}
}//is in array
}
if (counter==acode.length) {
sos();
input.justPressedEventCallback=null;
pool.playStatic("code_complete",0);
sop();
await utils.sleep(600);
ticker.stop();
crackedcodes++;
time.restart();
acode.splice();
break;
}//code cracked
}//while allowed
if (time.elapsed>=allowed) {
input.justPressedEventCallback=null;
sos();
let fumble;
fumbled=true;
playing=false;
fumble=so.create("fumble");
fumble.play();
await utils.sleep(400);
}//allowed
}//while playing
let newsafe=utils.randomInt(0,level-1);
new ScrollingText(strings.get("codescracked",[crackedcodes,actions]),"\n",async function() {
if (crackedcodes>=3) await getAch("robber");
safeget(newsafe,function() {
so.kill(()=> {
input.justPressedEventCallback=null;
st.setState(2);
});

});
});
}//function
export async function playDeck() {
let deck=shuffle(newDecks(1));
so.directory="./sounds/";
let snd=so.create("hl_intro");
let bet=await betSync(1500,500);
speech.speak(bet);
				if (bet<=0) {
				so.kill(()=> {
				st.setState(2);
				});
				return;
				}
				strings.speak("hw");
await snd.playSync();
let card;
let value;
let pool=new SoundHandler();
let cardO;
let first=true;
let firstBet=bet;
bet+=firstBet;
so.directory="./sounds/";
let take=so.create("hl_card");
while (bet!=0) {
await utils.sleep(8);
await new Promise((resolve,reject)=> {
cardO=takeCard(deck);
take.playSync();
deck.splice(0,1);
card=cardO[1];
value=cardO[0].value;
//question
let answer=false;
let items=new Array();
			items.push(new MenuItem(0,strings.get("nextCard",[card,bet])));
	if (value<13) items.push(new MenuItem(0,strings.get("higher",)));
	if (value>1) items.push(new MenuItem(1,strings.get("lower",)));
	if (!first) {
		items.push(new MenuItem(2,strings.get("collect",)));
		}
		else {
		first=false;
		}
		so.directory = './sounds/';
			let dm=new Menu(strings.get("nextCard",[card,bet]),items);
									speech.speak("ok");
								dm.run(async s=>{
								so.directory = './sounds/';
												switch(s.selected) {
							case 0:
							dm.destroy();
answer=true;
			break;
			case 1:
			dm.destroy();
answer=false;
break;
case 2:
dm.destroy();
await addCashSync(bet,0);
st.setState(2);
resolve();
bet=0;
return;
}
let nextCard=takeCard(deck);
await utils.sleep(utils.randomInt(1000,1900));
speech.speak(nextCard[1]+"!");
await utils.sleep(utils.randomInt(400,800));
if (nextCard[0].value<value && !answer) {
bet=bet+firstBet;
pool.playStatic("hl_right",0);
await utils.sleep(utils.randomInt(100,300));
pool.playStatic("hl_crowdwin",0);
await utils.sleep(utils.randomInt(800,1600));
resolve();
return;
}
else if (nextCard[0].value>value && answer) {
bet=bet+firstBet;
pool.playStatic("hl_right",0);
await utils.sleep(utils.randomInt(100,300));
pool.playStatic("hl_crowdwin",0);
await utils.sleep(utils.randomInt(800,1600));
resolve();
return;
}
else if (nextCard[0].value==value) {
pool.playStatic("hl_equal",0);
await utils.sleep(utils.randomInt(100,300));
pool.playStatic("hl_crowdequal",0);
await utils.sleep(utils.randomInt(800,1600));
resolve();
return;
}
else {
pool.playStatic("hl_wrong",0);
await utils.sleep(utils.randomInt(100,300));
pool.playStatic("hl_crowdlose",0);
await utils.sleep(3400);
st.setState(2);
resolve();
bet=0;
return;
}
});//menu
});//promise
}
}
export function takeCard(deck) {
let card=deck[0];
if (card.text=="J") card.value=11;
if (card.text=="Q") card.value=12;
if (card.text=="K") card.value=13;
let str=strings.get("card",[strings.get(card.text),strings.get("c"+card.suite)]);
console.log(str);
return [card,str];
}
export async function playDouble() {
if (data.beatcoins<5000) {
await new ScrollingText(strings.get("doublecash"));
st.setState(2);
return;
}
let answer=await questionSync("dq",[data.beatcoins]);
if (!answer) {
st.setState(2);
return;
}
let old=data.beatcoins;
so.directory="./sounds/";
let snd=so.create("doub_intro");;
await snd.playSync();
await addCashSync(0,data.beatcoins);
let rand=utils.randomInt(1,2);
let win=false;
if (rand==1) win=true;
sos();
if (!win) {
snd=so.create("doub_loser");
await snd.playSync();
await getAch("dl");
}
else if (win) {
snd=so.create("doub_winner");
await snd.playSync();
await addCashSync(old*2);
await getAch("dw");
}
st.setState(2);
}