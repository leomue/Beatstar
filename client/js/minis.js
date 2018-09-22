import {lang,questionSync,getAch,addCashSync,safeget,pack,packdir,actionKeys,save,question,addCash,data} from './main';
let gametimer;
let pongnotify;
let pongmusic;
let pongpool = new SoundHandler();
let pongtimer=new OldTimer();
let current=1;
let ps;
let pin=new KeyboardInput();
pin.init();
import Timer from './timer';
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
let capcash=myBet;
if (capcash>data.beatcoins) capcash=data.beatcoins;
let perc=Math.ceil(utils.percentOf(utils.randomInt(15,25),capcash));
console.log("perc"+perc);
data.beatcoins-=perc;
lose.sound.once("end",async function() {
addCash(0,perc,function() {
so.kill(function() {
st.setState(2);
});
},true);
});
}
else if (wheels[0]==wheels[1] || wheels[1]==wheels[2] || wheels[0]==wheels[2]) {
let lose=so.create("slot_lose_1");
lose.play();
lose.sound.once("end",async function() {
await getAch("frust");
let capcash=myBet;
let perc=capcash;
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
bet=0;
so.directory="./sounds/";
let take=so.create("hl_card");
while (bet!=-1) {
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
bet=-1;
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
bet=-1;
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

export async function playFootball() {
so.directory="./sounds/"+lang+"/";
let dir=so.directory;
let loc;
let kick;
let st1=0;
let st2=0;
let sp;
let bg;
bg=so.create("bw_background",true);
bg.loop=true;
bg.play();
let team1=utils.randomInt(1,10);
let team2=utils.randomInt(1,10);
while (team2==team1) {
team2=utils.randomInt(1,10);
}
bg.volume=0.7;
sp=so.create("bw_intro"+utils.randomInt(1,3));
await sp.playSync();
sp=so.create("bw_team_"+team1+"_1");
await sp.playSync();
sp=so.create("bw_vs");
await sp.playSync();
sp=so.create("bw_team_"+team2+"_2");
await sp.playSync();
let turn=team1;
let inp=new KeyboardInput();
inp.init();
while (st1<5 && st2<5) {
let counter=2;
sp=so.create("bw_turn");
await sp.playSync();
sp=so.create("bw_team_"+turn+"_2");
await sp.playSync();
if (turn==team1) {
sp=so.create("bw_where");
await sp.playSync();
while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
counter-=1;
if (counter<1) counter=1;
if (counter==1) {
loc=so.create("bw_left");
loc.pan=-80/100;
loc.play();
}
if (counter==2) {
loc=so.create("bw_center");
loc.pan=0;
loc.play();
}
if (counter==3) {
loc=so.create("bw_right");
loc.pan=0.8;
loc.play();
}
}
if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
counter+=1;
if (counter>3) counter=3;
if (counter==1) {
loc=so.create("bw_left");
loc.pan=-80/100;
loc.play();
}
if (counter==2) {
loc=so.create("bw_center");
loc.pan=0;
loc.play();
}
if (counter==3) {
loc=so.create("bw_right");
loc.pan=80/100;
loc.play();
}
}
await utils.sleep(5);
}
let saving=utils.randomInt(1,3);
bg.volume=0.3;
kick=so.create("bw_chuta"+utils.randomInt(1,4));
if (counter==1) kick.pan=-80/100;
if (counter==2) kick.pan=0;
if (counter==3) kick.pan=80/100;
kick.play();
await utils.sleep(220);
let saved;
if (counter==saving) {
saved=so.create("bw_parar"+utils.randomInt(1,3));
if (saving==1) saved.pan=-80/100;
if (saving==2) saved.pan=0;
if (saving==3) saved.pan=80/100;
saved.play();
await utils.sleep(300);
}
else {
saved=so.create("bw_portero"+utils.randomInt(1,2));
if (saving==1) saved.pan=-80/100;
if (saving==2) saved.pan=0;
if (saving==3) saved.pan=80/100;
saved.play();
await utils.sleep(200);
}
if (counter==saving) {
sp=so.create("bw_paradon"+utils.randomInt(1,3));
sp.play();
let crowd;
crowd=so.create("bw_mal"+utils.randomInt(1,3));
await crowd.playSync();
while (sp.playing) { await utils.sleep(5); }
bg.volume=0.7;
await utils.sleep(700);
}//counter saving
else {
let falta=utils.randomInt(1,4);
if (falta==1) {
let falta;
falta=so.create("bw_falta"+utils.randomInt(1,7));
if (counter==1) falta.pan=-80/100;
if (counter==3) falta.pan=80/100;
if (counter==2) falta.pan=0;
falta.play();
await utils.sleep(400);
sp=so.create("bw_falton"+utils.randomInt(1,4));
sp.play();
let crowd;
crowd=so.create("bw_cfalta"+utils.randomInt(1,3));
await crowd.playSync();
while (sp.playing) { await utils.sleep(5); }
await utils.sleep(400);
}
else {
st1+=1;
sp=so.create("bw_sgol"+utils.randomInt(1,7));
sp.play();
let crowd;
crowd=so.create("bw_gol"+utils.randomInt(1,6));
await crowd.playSync();
while (sp.playing) { await utils.sleep(5); }
bg.volume=0.6;
sp=so.create("bw_marc"+utils.randomInt(1,3));
await sp.playSync();
sp=so.create("bw_team_"+team1+"_2");
await sp.playSync();
sp=so.create("bw_"+st1+"_1");
await sp.playSync();
sp=so.create("bw_team_"+team2+"_1");
await sp.playSync();
sp=so.create("bw_"+st2+"_2");
await sp.playSync();
}//falta
}//counter not saving
turn=team2;
}//my turn
else {
//second turn
sp=so.create("bw_dwhere");
await sp.playSync();
while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
counter-=1;
if (counter<1) counter=1;
if (counter==1) {
loc=so.create("bw_left");
loc.pan=-80/100;
loc.play();
}
if (counter==2) {
loc=so.create("bw_center");
loc.pan=0;
loc.play();
}
if (counter==3) {
loc=so.create("bw_right");
loc.pan=80/100;
loc.play();
}
}
if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
counter+=1;
if (counter>3) counter=3;
if (counter==1) {
loc=so.create("bw_left");
loc.pan=-80/100;
loc.play();
}
if (counter==2) {

loc=so.create("bw_center");
loc.pan=0;
loc.play();
}
if (counter==3) {
loc=so.create("bw_right");
loc.pan=80/100;
loc.play();
}
}
await utils.sleep(5);
}
sp=so.create("bw_prepara"+utils.randomInt(1,4));
await sp.playSync();
await utils.sleep(utils.randomInt(2000,3800));
let saving=utils.randomInt(1,3);
bg.volume=0.3;
kick=so.create("bw_chuta"+utils.randomInt(1,4));
if (saving==1) kick.pan=-80/100;
if (saving==2) kick.pan=0;
if (saving==3) kick.pan=80/100;
kick.play();
await utils.sleep(220);
let saved;
if (counter==saving) {
saved=so.create("bw_parar"+utils.randomInt(1,3));
if (saving==1) saved.pan=-80/100;
if (saving==2) saved.pan=0/100;
if (saving==3) saved.pan=80/100;
saved.play();
await utils.sleep(300);
}
else {
saved=so.create("bw_portero"+utils.randomInt(1,2));
if (counter==1) saved.pan=-80/100;
if (counter==2) saved.pan=0/100;
if (counter==3) saved.pan=80/100;
saved.play();
await utils.sleep(200);
}
if (counter==saving) {
if (typeof data.safeguards==="undefined") data.safeguards=0;
data.safeguards+=1;
save();
sp=so.create("bw_paradon"+utils.randomInt(1,3));
sp.play();
let crowd;
crowd=so.create("bw_mal"+utils.randomInt(1,3));
await crowd.playSync();
while (sp.playing) { await utils.sleep(5); }
bg.volume=0.7;
await utils.sleep(700);
}//counter saving
else {
let falta=utils.randomInt(1,4);
if (falta==1) {
let falta;
falta=so.create("bw_falta"+utils.randomInt(1,7));
if (counter==1) falta.pan=-80/100;
if (counter==3) falta.pan=80/100;
if (counter==2) falta.pan=0/100;
falta.play();
await utils.sleep(400);
sp=so.create("bw_falton"+utils.randomInt(1,4));
sp.play();
let crowd;
crowd=so.create("bw_cfalta"+utils.randomInt(1,3));
await crowd.playSync();
while (sp.playing) { await utils.sleep(5); }
await utils.sleep(400);
}
else {
st2+=1;
sp=so.create("bw_sgol"+utils.randomInt(1,7));
sp.play();
let crowd;
crowd=so.create("bw_gol"+utils.randomInt(1,6));
await crowd.playSync();
while (sp.playing) { await utils.sleep(5); }
bg.volume=0.7;
sp=so.create("bw_marc"+utils.randomInt(1,3));
await sp.playSync();
sp=so.create("bw_team_"+team1+"_2");
await sp.playSync();
sp=so.create("bw_"+st1+"_1");
await sp.playSync();
sp=so.create("bw_team_"+team2+"_1");
await sp.playSync();
sp=so.create("bw_"+st2+"_2");
await sp.playSync();
}//falta
}//counter not saving
turn=team1;

}//second turn
if (inp.isJustPressed(KeyEvent.DOM_VK_ESCAPE)) {
so.kill(function() {
st.setState(2);
});
return;
}
await utils.sleep(5);
}
//winning
bg.volume=0.3;
sp=so.create("bw_ganador");
await sp.playSync();
await utils.sleep(utils.randomInt(500,1200));
if (st1==5) sp=so.create("bw_team_"+team1+"_2");
if (st2==5) sp=so.create("bw_team_"+team2+"_2");
await sp.playSync();
let bg2=so.create("bw_ganar");
bg2.volume=0.4;
bg.stop();
bg2.loop=true;
bg2.play();
let himno;
if (st1==5) himno=so.create("bw_himno"+team1);
if (st2==5) himno=so.create("bw_himno"+team2);
await himno.playSync();
bg.stop();
bg2.stop();
sp.stop();
himno.stop();
if (st2==5) getAch("fl");
if (st1==5) getAch("fw");
so.kill(function() {
st.setState(2);
});
return;
}

export async function playPong() {
sos();
pongnotify=false;
let sp=so.create("pong_beep");
	sp.play();
	await utils.sleep(500);
	sp.play();
	await utils.sleep(500);
	sp.play();
	await utils.sleep(500);
							const fs=require('fs');
let actions = 0;
pongmusic=so.create("pong_music");
pongmusic.loop=true;
pongmusic.volume=0.8;
pongmusic.pitch=1;
pongmusic.play();
for (let i = 1; i <= 10; i++) {
	if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
		actions = i;
	}
}
gametimer = Timer({update(dt) {
 pongloop(dt,actions);
}, render() {pongrender();}}, 1/60);
pongtimer.restart();
current=1;
gametimer.start();
pongright=0;
time=2100;
pongmiss=0;
}
var time=1000;
let pongright=0;
let pongmiss=0;
function pongrender() {
}
function pongloop(dt,actions) {
if (current<2) {
current=utils.randomInt(2,actions);
sop();
ps=so.create("a"+current);
sos();
ps.play();
}
else {
if (pongtimer.elapsed>=time/2 && !pongnotify) {
pongnotify=true;
ps.pitch+=0.07;
ps.play();
}
else if (pongtimer.elapsed>=time) {
pin.justPressedEventCallback=null;
pin.justPressedEventCallback=null;
ps.stop();
pongmusic.sound.fade(1,0,300);
pongpool.playStatic("pong_end",0);
pongtimer.restart();
gametimer.stop();
let end=so.create("pong_endbgm");
end.play();
end.sound.once("end",async ()=> {
pin.justPressedEventCallback=null;
await new ScrollingText(strings.get("pongend",[pongright,pongmiss]));
let cashToAdd=0;
cashToAdd+=pongright*60;
cashToAdd-=pongmiss*70;
if (cashToAdd<0) cashToAdd=0;
await addCashSync(cashToAdd);
so.kill(()=> {
st.setState(2);
});
});
}
pin.justPressedEventCallback=(evt)=> {
if (event.which!=actionKeys[current]) {
pongpool.playStatic("pong_fail",0);
pongmiss++;
time-=25;
}
if (event.which==actionKeys[current]) {
pongpool.playStatic("pong_bell",0);
time-=30;
current=1;
pongnotify=false;
ps.stop();
pongmusic.pitch+=0.01;
pongright+=1;
pongtimer.restart();
}
};
}
}