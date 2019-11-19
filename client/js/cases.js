import {report} from './main';
class Chance {
  constructor() {
    this.cases=[];
this.oldavg=0;
this.newavg=0;
this.g_deal=false;
this.g_keep=false;
  }
sort_cases(shuffled,prize,prizet) {
this.sorting=true;
let bc;
let sg;
if (lang==1) sg="safeguards";
if (lang==2) sg="antifallos";
if (lang==1) bc="beatcoins";
if (lang==2) bc="monedas";
this.sorted?[];
for (leti=0;i<shuffled.length;i++) {
if (shuffled[i].includes("b")) {
sorted.push(gcn(shuffled[i]));
}//if
}//for
str+="bc. ";
if (prizet==1) sorted.push(prize);
sorted.sort();
for (leti=0;i<sorted.length();i++) {
str+=sorted[i]+", ";
}//for
//safeguards
sorted.resize(0);
for (let i=0;i<shuffled.length;i++) {
if (shuffled[i].includes("s")) {
sorted.push(this.gcn(shuffled[i]));
}//if
}//for
str+="sg: ";
if (prizet==2) sorted.push(prize);
sorted.sort();
for (let i=0;i<sorted.length;i++) {
str+=sorted[i]+", ";
}//for
speech.speak(str);
return 0;
}
gcn(test) {
return test.slice(test.length-1);
}
case_avg(cases,turn_number,prize,prizet) {
if (cases.length<1) {
  this.newavg=1;
  return;
}
double avg=0;
double avgt=0;
for (let i=0;i<cases.length;i++) {
if (cases[i]=="") continue;
avgt++;
if (cases[i].includes("s")) {
avg+=this.gcn(cases[i])*1000;
}
else {
avg+=this.gcn(cases[i]);
}
}
if (prizet==1) avg+=prize;
if (prizet==2) avg+=prize*1000;
avgt++;
let navg=avg;
let bank;
switch(turn_number) {
case 5: bank=navg/115; break;
case 8: bank=navg/75; break;
case 11: bank=navg/52; break;
case 14: bank=navg/29; break;
case 17: bank=navg/19; break;
case 20: bank=navg/11; break;
case 21: bank=navg/6; break;
case 22: bank=navg/3; break;
case 23: bank=navg/2; break;
default: bank=this.newavg; break;
}
this.newavg=Math.floor(bank);
}

async start() {
this.didbad=false;
this.max=100000;
this.oldavg=0;
this.newavg=0;
this.newstart=0;
this.av=0;
this.turnNumber=0;
sos();
this.sacc=0;
this.sacs=0;
this.cases=[];
this.cases.push("b1");
this.cases.push("b10");
this.cases.push("b15000");
this.cases.push("b40000");
this.cases.push("b100");
this.cases.push("b25");
this.cases.push("b1000");
this.cases.push("b500");
this.cases.push("s1");
this.cases.push("s5");
this.cases.push("s50");
this.cases.push("b100000");
this.cases.push("b25000");
this.cases.push("b75000");
this.cases.push("b50000");
this.cases.push("b50");
this.cases.push("b69");
this.cases.push("s3");
this.cases.push("s2");
this.cases.push("s10");
this.cases.push("b7");
this.cases.push("b9");
this.cases.push("s69");
this.cases.push("b7000");
this.cases.push("b13");
//shuffle
this.shuffled=this.cases.shuffle();
this.sp=so.create("case_intro"+lang);
await this.sp.playSync();
//here
let caseMenu=new Menu("case_choose"+lang);
let casesItems=[];
for (let i=0;i<shuffled.length;i++) {
if (shuffled[i]=="") {
}
else {
casesItems.push(new AudioItem(i,"case"+i);
}
}
let position=await casesMenu.runSync();
let prizet;
let prize;
let prizec;
int nn=string_to_number(position);
int prizen=string_to_number(position);
position=shuffled[nn];
prizec=position;
if (string_contains(position,"s",1)>-1) {
prizet=2;
prize=this.gcn(position);
}
else if (string_contains(position,"b",1)>-1) {
prizet=1;
prize=gcn(position);
}
shuffled[nn]="";
if (!testing) {
sp.load("case_give"+lang);
sp.play_wait();
vo.speak_wait(sacc);
sp.load("case_thank"+lang);
sp.play_wait();
sp.load("case_begin"+lang);
if (!testing) sp.play_wait();
}
sp.load("casec"+nn+"_"+lang);
sp.play();
wait(random(450,850));
crd.stream("case_cintro");
crd.play();
wait(2000);
cmus.stream("case_play"+lang);
if (!testing) cmus.play_wait();
cmus.stream("case_music");
cmus.play_looped();
while (turnNumber<23) {
cm.reset(false);
cm.add("case_check","check");
for (uint i=0;i<shuffled.length();i++) {
if (shuffled[i]=="") {
}
else {
cm.add("casec"+i+"_"+lang,i);
}
}
string position;
if (!sorting) position=cm.run_extended("case_open"+random(1,5),false,"check",true);
if (sorting) position=cm.run_extended("",false,"check",false);
sorting=false;
if (position=="check") {
sort_cases(shuffled,prize,prizet);
}
else {
cmus.volume=-10;
cmus.pitch=cmus.pitch+0.5;
sp.stream("open"+random(1,3));
sp.play();
wait(3000);
string ten;
if (turnNumber<=20) ten="case_tension1";
if (turnNumber>20) ten="case_tension2";
tens.stream(ten);
if (!testing) tens.play();
if (!testing && ten=="case_tension1") wait(8000);
if (!testing && ten=="case_tension2") wait(8300);
sp.stream("case"+position);
sp.play_wait();
int nn=string_to_number(position);
position=shuffled[nn];
shuffled[nn]="";
turnNumber++;
sp.stream("ca"+position);
sp.play();
wait(random(300,700));
double value;
case_avg(shuffled,turnNumber,prize,prizet);
if (!testing) {
if (string_contains(position,"s",1)>-1) {
value=gcn(position)*1000;
}
else {
value=gcn(position);
}
if (value<=25000) {
crd.stream("case_cr3");
crd.play_wait();
}
else if (value>25000 && value<=100000) {
crd.stream("case_cr1");
crd.play_wait();
}
else if (value>=100000 || didbad) {
crd.stream("case_cr2");
crd.play_wait();
}
}
if (testing) wait(1000);
//offering
if (string_contains(position,"b",1)>-1) {
if (gcn(position)>=max) {
maxsort.resize(0);
didbad=true;
for (uint i=0;i<shuffled.length();i++) {
if (string_contains(shuffled[i],"b",1)>-1) {
maxsort.insert_last(gcn(shuffled[i]));
}//if
}//for
if (prizet==1) maxsort.insert_last(prize);
maxsort.sort_ascending();
if (maxsort.length()>1) max=maxsort[maxsort.length()-1];
if (maxsort.length()<=1) max=maxsort[maxsort.length()];
if (max>=15000) {
sp.stream("case_still"+lang);
sp.play_wait();
vo.speak_wait(max);
}
}
else {
didbad=false;
}
}
if (turnNumber>4 && newavg!=oldavg) {
crd.stream("case_offer");
crd.play();
wait(900);
sp.stream("case_offer"+lang);
sp.play_wait();
vo.speak_wait(newavg);
enhanced_menu dem;
dem.allow_escape=true;
dem.add("case_yes","y");
dem.add("case_no","esc");
string dch=dem.run_extended("case_deal"+lang,false,"esc",true);
if (dch=="y") {
cash+=newavg;
cmus.stop();
cmus.stream("case_coward"+lang);
cmus.play();
wait(5000);
vo.speak_wait(newavg);
sp.load("beatcoins");
sp.play_wait();
mainmenu();
return;
}
oldavg=newavg;
}
cmus.volume=0;
}//checking
}//while
cmus.stop();
sp.stream("case_winning");
sp.play();
wait(6500);
tens.stream("case_tension3");
tens.play();
wait(5000);
sp.stream("case"+prizen);
sp.play_wait();
sp.stream("ca"+prizec);
sp.play();
wait(random(300,700));
double value;
value=prize;
if (prizet==2) prize*=1000;
if (value<=25000) {
cmus.stream("case_loser");
crd.stream("case_cr2");
crd.play();
cmus.play_wait();
}
else if (value>25000 && value<=100000) {
cmus.stream("case_winner");
crd.stream("case_cr3");
crd.play();
cmus.play_wait();
}
else if (value>=100000) {
cmus.stream("case_winner100");
crd.stream("bw_gol6");
crd.play();
cmus.play_wait();
}
if (prizet==1) cash+=prize;
if (prizet==2) safeguards+=prize/1000;
mainmenu();
return;
}
double bpm2ms(double bpm) {
return 1000*(60/bpm);
}
void upbeat() {
sound sp;
int sc=0;
int level=1;
nopack();
if (!g_keep) {
if (cash<=7000) {
sp.load("mini_nobeat");
sp.play_wait();
mainmenu();
return;
}
sp.load("mini_buybeat");
sp.play();
bool cont=false;
while (!cont) {
if (key_pressed(KEY_Y) || key_pressed(KEY_S)) {
cont=true;
g_keep=true;
lesscash(7000);
sp.load("gamecash");
sp.play_wait();
}//key s
if (key_pressed(KEY_N) || key_pressed(KEY_ESCAPE)) {
sp.stop();
cont=true;
mainmenu();
return;
} //key
wait(5);
}//loop
}//g_keep
sound next;
next.load("up_next");
sound die;
die.load("up_die");
sound ok;
ok.load("up_ok");
ok.volume=-4;
string stempo;
double tempo=180;
sound test;
string ch1="a0r5l8@2o5q3C<B->D+ECp8<G>Cp8<G>D+ECp8p8p16<q8B-32B32q3>C<B->D+ECp8<B-Gp2p2>[CDE-DC<AGFp1>]2";
string ch2="@1a0r2q2o2Cp4Gp4Cp4p8<B-4B-8>Cp4Gp4Cp4G8<q7G4.q2Fp4>Cp4<Fp4>Cp4<Fp4>Cp4<Fp4>C8<q8r0B4p8";
int times=1;
string ch3="a0@1q2r2o3[p4G&>E<]3p8B-&>F8.<B-&>F8.<q8r0G8&>E8<F48E48E-48D48D-48C48q2r2G&>E<p4G&>E<p4G8&>E8<q8r0G24A24B24r2q2>C8q8r0<B-4&>E4p8C8&F8<B-48A48A-48G48G-48F48q2r2A&>F<[p4A&>F<]5p4A&>FC8&F8<q8r0B4&>D+4<p8";
double value;
test.load("test");
string chp="@0o2l8[C&F+F+D&F+F+]16";
bool alive=true;
bool hitting=false;
tempo=60;
if (testing) tempo=100;
while (alive) {
tempo+=10;
soundtrack s;
stempo="t"+tempo;
s.add_channel(stempo+ch1);
s.add_channel(stempo+ch2);
s.add_channel(stempo+ch3);
s.add_channel(stempo+chp);
sound@ output=s.synth.write_wave_sound();
times=1;
value=floor(output.length/64);
if (tempo>30000) {
sound win;
win.load("up_win");
win.play_wait();
get_ach("up_win");
mainmenu();
return;
}
timer upbeat;
timer hit;
while (times<=69) {
if (hit.elapsed>=value*2+80) {
hit.restart();
}
if (key_pressed(KEY_RETURN)) {
if (times>4) {
if (hit.elapsed<value-80) {
output.stop();
die.play_wait();
updie(sc);
mainmenu();
return;
}//elapsed
else if (hit.elapsed>=value+80) {
output.stop();
die.play_wait();
updie(sc);
mainmenu();
return;
}//elapsed
else {
sc++;
ok.stop();
ok.play();
hitting=true;
}//elapsed
}//times key
}//keypress
if (hit.elapsed>=value+80 && times>6 && !hitting && !testing) {
output.stop();
die.play_wait();
updie(sc);
mainmenu();
return;
}
if (upbeat.elapsed>=value) {
test.stop();
test.volume=-8;
if (testing) test.play();
if (times%2==0) {
test.pitch=125;
}
else {
test.pitch=100;
hit.restart();
hitting=false;
}
if (times<5) test.play();
upbeat.restart();
if (times>4) {
output.play();
}
else {
}
times++;
}
}
next.play();
level++;
}
garbage_collect();
mainmenu();
}
void code() {
nopack();
if (!g_code) {
if (cash<=10000) {
sp.load("mini_notenough");
sp.play_wait();
vo.speak_wait(cash);
mainmenu();
return;
}
sp.load("mini_buygeneric");
sp.play();
bool cont=false;
while (!cont) {
if (key_pressed(KEY_Y) || key_pressed(KEY_S)) {
cont=true;
g_code=true;
lesscash(10000);
sp.load("gamecash");
sp.play_wait();
}//key s
if (key_pressed(KEY_N) || key_pressed(KEY_ESCAPE)) {
sp.stop();
cont=true;
mainmenu();
return;
} //key
wait(5);
}//loop
}//g_keep
int actions=4;
yespack();
timer time;
int allowed=42000;
sound ticker;
sound music;
nopack();
ticker.load("codetick");
music.load("codemusic");
yespack();
pak.open(path+"packs/"+pack+".pack");
if (pak.file_exists("a6")) actions=5;
if (pak.file_exists("a7")) actions=6;
if (pak.file_exists("a8")) actions=7;
if (pak.file_exists("a9")) actions=8;
actions++;
bool playing=true;
int level=0;
int crackedcodes=0;
string[] acode;
string[] actionsa;
int[] curkeys();
for (uint i=2;i<=actions;i++) {
actionsa.insert_at(0,"a"+i);
}
sound go;
nopack();
go.load("codego");
while(playing) {
level++;
allowed=30000+(level*500);
//rd.say(allowed);
acode.resize(0);
acode=actionsa;
if (level+actions-1>actions) {
int more=level-1;
for (uint i=1;i<=more;i++) {
acode.insert_at(0,"a"+random(2,actions-1));
}
}
acode=shuffle(acode);
int counter=0;
//for (uint i=0;i<acode.length();i++) {
//spool.play_stationary(acode[i],false);
//wait(500);
//}
nopack();
speak("level",true);
vo.speak_wait(level);
speak("codenumber",true);
vo.speak_wait(acode.length());
go.play();
yespack();
time.restart();
while (time.elapsed<allowed and playing) {
wait(5);
if (time.elapsed%1000<=100) {
double formula=(allowed-time.elapsed)/1000;
ticker.pitch=120-formula;
ticker.play();
}//ticker sound
curkeys=keys_pressed();
if(curkeys.length()==1) {
if (curkeys[0]==KEY_X) playing=false;
if (is_in_table(curkeys[0],keys)) {
if (curkeys[0]==keys[string_to_number(string_trim_left(acode[counter],1))-1]) {
spool.play_stationary(acode[counter],false);
nopack();
spool.play_stationary("code_ok",false);
yespack();
counter++;
}
else {
counter=0;
nopack();
spool.play_stationary("code_wrong",false);
yespack();
}
}//is in table
}//current keys length
if (counter==acode.length()) {
nopack();
spool.play_stationary("code_complete",false);
yespack();
wait(500);
ticker.stop();
crackedcodes++;
time.restart();
acode.resize(0);
break;
}//code cracked
}//while allowed
if (time.elapsed>=allowed) {
string msg;
if (lang==1) msg+="I played beat the code with ";
if (lang==2) msg+="Acabo de jugar a beat the code en el beatstar con ";
msg+=level-1+actions-1+" ";
if (lang==1) msg+=" actions, using the pack "+pack+" and I managed to beat "+crackedcodes+" codes!";
if (lang==2) msg+=" acciones, utilicé el pack "+pack+" y conseguí romper "+crackedcodes+" códigos!";
clipboard_copy_text(msg);
nopack();
sound fumble;
fumble.load("fumble");
fumble.play();
wait(400);
speak("codescracked",true);
vo.speak_wait(crackedcodes);
playing=false;
if(crackedcodes==0) get_ach("nocodes");
if(crackedcodes>=5) get_ach("robber");
}//allowed
}//while playing
mainmenu();
}//function
void doub() {
sound ok;
nopack();
if (cash<5000) {
ok.stream("mini_nodoub");
ok.play_wait();
mainmenu();
return;
}
ok.stream("doub_intro");
if (!testing) {
ok.play_wait();
vo.speak_wait(cash);
speak("beatcoins",true);
vo.speak_wait(safeguards);
speak("safeguards",true);
}
int what=random(1,2);
if (what==1) {
ok.stream("doub_loser");
ok.play_wait();
cash=0;
safeguards=0;
get_ach("dloser");
ser();
}
else {
ok.stream("doub_winner");
ok.play_wait();
get_ach("dwinner");
cash=cash*2;
safeguards=safeguards*2;
ser();
}
mainmenu();
}
void beatpong() {
sound sp;
nopack();
if (!g_pong) {
if (cash<=8000) {
sp.load("mini_notenough");
sp.play_wait();
vo.speak_wait(cash);
mainmenu();
return;
}
sp.load("mini_buygeneric");
sp.play();
bool cont=false;
while (!cont) {
if (key_pressed(KEY_Y) || key_pressed(KEY_S)) {
cont=true;
g_pong=true;
lesscash(8000);
sp.load("gamecash");
sp.play_wait();
}//key s
if (key_pressed(KEY_N) || key_pressed(KEY_ESCAPE)) {
sp.stop();
cont=true;
mainmenu();
return;
} //key
wait(5);
}//loop
}//g_keep
timer pong;
int pongtime=750;
int score=0;
nopack();
bool playing=true;
int position=1;
pong.restart();
while(playing){
if (pong.elapsed>=pongtime) {

if(position==1) {
pong.restart();
spool.play_stationary("pong"+position,false);
position++;
}
else if(position==2) {
pong.restart();
spool.play_stationary("pong"+position,false);
position++;
}
else if(position==4) {
pong.restart();
spool.play_stationary("pong2",false);
position=1;
}
}
if(position==3 and pong.elapsed>=pongtime+100) {
spool.play_stationary("pong4",false);
playing=false;
}
if (key_pressed(KEY_RETURN) and position==3) {
score++;
if (score<=9) pongtime-=40;
if (score>=10) pongtime-=15;
if (score>=30) pongtime-=5;
pong.restart();
spool.play_stationary("pong3",false);
position=4;
}
wait(5);
}
wait(690);
vo.speak_wait(score);
speak("points",true);
if(score>=30) {
get_ach("pongfire");
}
if(score<=10) {
get_ach("pongfail");
}

mainmenu();
return;
}
void highlow() {
sound dicer;
nopack();
if (!g_dice) {
if (cash<=15000) {
sp.load("mini_notenough");
sp.play_wait();
vo.speak_wait(cash);
mainmenu();
return;
}
sp.load("mini_buygeneric");
sp.play();
bool cont=false;
while (!cont) {
if (key_pressed(KEY_Y) || key_pressed(KEY_S)) {
cont=true;
g_dice=true;
lesscash(15000);
sp.load("gamecash");
sp.play_wait();
}//key s
if (key_pressed(KEY_N) || key_pressed(KEY_ESCAPE)) {
sp.stop();
cont=true;
mainmenu();
return;
} //key
wait(5);
}//loop
}//g_keep
dicer.load("d_roll");
bool tutorialed=false;
int dice;
int curcash=get_percentage(cash,40);
int startcash=curcash;
cash-=curcash;
playintro(sl+"d_intro");
int curdice=6;
bool playing=true;
bool high=true;
while(playing) {
speak("d_playwith",true);
vo.speak_wait(curcash);
speak("beatcoins",true);
speak("d_current",true);
vo.speak_wait(curdice);
speak("d_question",false);
timer tutorial;
while(true) {
if (!tutorialed and tutorial.elapsed>=5000) {
tutorialed=true;
speak("d_tut",true);
}
if(key_pressed(KEY_H) or key_pressed(KEY_A)) {
vos.stop();
high=true;
break;
}
if(key_pressed(KEY_L) or key_pressed(KEY_B)) {
vos.stop();
high=false;
break;
}
if (key_pressed(KEY_ESCAPE)) {
playing=false;
break;
}
}
wait(5);
if(playing) {
int newdice=random(2,12);
dicer.play_wait();
sound table;
table.load("d_dice"+random(1,3));
table.play_wait();
vo.speak(newdice);
wait(random(140,300));
if(newdice!=12 and newdice!=2) {
if(newdice>curdice and high) {
speak("d_win",true);
curcash*=2;
}
if(newdice>curdice and !high) {
speak("d_lose",true);
curcash=0;
playing=false;
}
if(newdice<curdice and !high) {
speak("d_win",true);
curcash*=2;
}
if(newdice<curdice and high) {
speak("d_lose",true);
curcash=0;
playing=false;
}
if(newdice==curdice) {
speak("d_same",true);
curcash=startcash;
}
}
if(newdice==12) {
speak("d_kill",true);
curcash=0;
playing=false;
}
if(newdice==2) {
speak("d_win",true);
curcash*=2;
playing=false;
}
curdice=newdice;
}
}
speak("d_over",true);
vo.speak_wait(curcash);
speak("beatcoins",true);
cash+=curcash;
mainmenu();
return;
}
void playintro(string file) {
sound intro;
intro.load(file);
intro.play();
while(intro.playing) {
if(key_pressed(KEY_SPACE)||key_pressed(KEY_RETURN)||key_pressed(KEY_ESCAPE)) {
intro.stop();
intro.load("skip_intro");
intro.play_wait();
}
wait(5);
}
}
}