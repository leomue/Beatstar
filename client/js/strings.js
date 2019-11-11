'use strict';
import {lang} from './main';
import {utils} from './utilities';
import {speech} from './tts';
import {ScrollingText} from './scrollingText';

class Strings {
	constructor() {
		this.strings = {};
		this.strings[1] = {
			//New English
			mStats:"Statistics",
			mMissions:"Missions",
			missionruns:"Run the game like a pro: Current mission level %1. %2 runs out of %3 for next mission credit.",
			missiontruns:"Run the game like a pro",
			missiongames:"Play the game many times: Current mission level %1. Now %2 out of %3 for next mission credit.",
			missiontgames:"Play the game many times",
missiontlevels:"Complete some levels",
missionlevels:"Complete some levels: Now at level %1, with %2 out of %3 for next credit.",

			missionNext:"Great! %2 is now at level %1! You have %3 mission credits.",
			sMissionCredits: "You have %1 mission credits.",
			sRuns:"The game has been run %1 times",
			sTotalGames:"Number of games started: %1",
			sTotalLevels:"Levels completed (in total): %1",
			sTotalWins: "You have won %1 times in packs",
			missiontwins:"Behave like a winner",
			missionwins:"Behave like a winner. At level %1, with %2 packs won out of %3 for next credit.",
			sTotalSafeguards:"You have used %1 safeguards in total",
			sTotalFails:"You have failed %1 times.",
			missiontfails:"Failing can be good",
			missionfails:"Failing can be good: Mission level %1, with %2 fails out of %3 until next credit.",
			
			sTotalActions: "You have correctly executed %1 actions.",
			sTotalCash: "During your beat career you have obtained a grand total of %1 beatcoins.",
			missiontcash:"It's raining beatcoins",
			missioncash:"It's raining beatcoins: Mission level %1, collected %2 out of %3 for next credit.",
			missionttime:"Play for a long time",
			missionttime:"Play for a long time: Mission level %1, with %2 out of %3 until next credit.",
			sTotalDownloads:"You have downloaded a total of %1 packs.",
			sTotalTime: "And, to top it off, you have played beatstar, not including minigames, for %1.",
			missionNext:"Congratulations! You have achieved mission level %1 in %2. You have %3 mission credits.",
			statsMenuIntro:"Welcome to the stats menu! You can see your stats here, and press enter when you're done.",
			sMissionCredits:"Mission credits: %1",
mSettings:"Settings and help",
settingsMenu:"This is the settings menu. Feel free to change anything. You can cancel by choosing back.",
"mk1":"Space, tab, enter, backspace and arrows",
"mk2": "e, d, r, f, and I, K, J, and L as arrows.",
"MKeyLayout": "Keyboard Layout (left and right arrows to change)",
			k2:"Space bar",
			k3: "tab",
			k4: "enter",
			k5: "backspace",
			k6:"up arrow",
			k7:"Down arrow",
			k8:"Right arrow",
			k9:"Left arrow",
			kh:"To remap your keyboard, you will be asked to press the key which will replace the different default keys. Just press the key you want, and it will be saved until you change it again.",
			kn:"Invalid key. Please try another key",
			ki:"Now, press the key to be used instead of",
			adbulk:"Well, aren't you a vicious downloader? You just want all the packs, don't you? Fine, here you go. Have a little achievement.",
			adspoiledBrat:"You want to see the spoilers? Really? Such a spoiled brat you are. Humph!",
			achspoiledBrat:"Spoiled brat",
			adcatslots:"Well, that was a pretty bad game of slots. Think about a tsunami, a tornado and an earthquake hitting the same spot. Maybe your house. Wouldn't it be spectacular? You'd probably end up being killed by a soaking wet tree or something.",
			addl:"Let the fanfares play, friends, because a loser has just lost. Double loser, loser times 2. Get it? No? Good.",
			addw:"winner you are, you get a new car. Not really, but you still get some cool beatcoins. You can sing and dance now, and get some safeguards and packs.",
			adfingr:"Your fingers are good at keeping rhythm. Nice. You get a little prize now, keep doing this to get more beatcoins in the future.",
			adfl:"You lost the match. I feel so bad for you now. Have an achievement as a consolation prize. Not like it's of much help.",
			adfrust:"Well, you almost got it, but you didn't. That last one doesn't look like it belongs. Oh well.",
			adfw:"Yay! 5 goals, 5 points, you are an excellent manager, you can now move on to bigger teams like your college team. Great work!",
			adheadshot:"3, 2, 1, boom! Headshot! Dead!",
			adidle:"Ugh! Don't leave me idling for this long! It's not very nice, you know? Why don't you just play me? I feel so lonely.",
			adintro:"Great! Beatstar seems to be installed and working. My name is achievement. You'll be getting more of me as you play. Can you discover us all?",
			adlactions:"Did you really fail at level 1? Are you serious? Go learn the actions, this is pathetic. I will not stand for this, no no no no no!",
			adpongfail:"that was a pretty bad game. You can't say otherwise. You are horrible at this game. You know it.",
			adfaillast:"Did you really have to fail? It was the last level! You are either so unlucky, really careless or overly nervous. Either way, you at least get an achievement. Cool!",
			adpongfire:"Yay! That was pretty good. You managed to hit a lot of keys in there. I like your style.",
			adrobber:"that was quite a lot of codes. Cracking and cracking a code and another code and yet another and another. i'm sure you'd be a good bank robber. Have you considered a change of career?",
			adslotwin:"Yay! You got 3 of a kind! Are you ready to get a lot of beatcoins?",
			adusepinky:"And even you can do it, with your fingers tied and just using your pinky. Well, maybe not, but you did it without safeguards. which is pretty impressive!",
			adw1:"You just beat your first pack! congratulations! Shall we start a party?",
			adw5:"Congratulations on beating your 5th beatstar soundpack! It's time for a beer. Nice!",
			adw10:"Your 10th soundpack already.... and I am this drunk... I think it's time for me to have another beer. Will you hold me if I fall?",
			adw25:"Yay! 25 soundpacks! Here's your reward!",
			adw50:"Hey! You just completed your 50th soundpack. This is really something to be proud of, not because you beat 50 packs, not because you probably played every single minigame and have tons of beatcoins laying around. No. You gotta be proud of yourself because your addiction to beatstar is palpable. You probably go out on the street with your friends and say hey, have you played beatstar? No? What's that? Uh, go away. Just go away, please! and, that's why you're proud of yourself, because you're addicted to beatstar and I'm so thankful that you're getting this achievement. It's my game, and I like that people play. I'm gonna give you a reward so you can tell all your cool friends that you got this reward. And to anyone who hasn't played beatstar yet, you can recommend it. Even if they aren't blind, they can learn to play just like you. So thank you very much for playing!",
			
selectVoice:"%1 voices available, use the up and down arrows to select a voice, enter when you're done.",
	    mSelectVoice:"text to speech voice",
	    selectNewPath: 'Select the new path for the packs',
	    noFindFolder: 'I can\'t find your packs folder in %1, reverting to default folder at username/beatpacks. You can change it again in the main menu.',
	    mDir: 'Packs folder change (currently %1)',
	    selectPath: 'Please select the path where your packs are saved:',
	    directoryQuestion: 'Wait a second... are you ok with your beatpacks folder being in your user folder? If not, you will be prompted to select a different directory to store your soundpacks. If you already have packs in your user folder and wish to change it, you will need to do that yourself as the game will not do it for you',
	    mLang: 'Change language',
	    gq_end: 'Game over! I hope you had fun. You got %1 right and %2 wrong. Wanna try again?',
	    gq_welcome: 'Welcome to pack quizz!\nAre you ready to find out how much you know about your unlocked soundpacks?',
	    pq: 'Which pack do you think this level belongs to?',
	    need5: 'Sorry but you need to have unlocked at least 5 packs before you can play this game.',
	    combo: 'Combo x%1!  + %2 points!',
	    goLate: 'Too late! You have %1 turns left.',
	    goLater: 'Too late, you pressed enter at %1 seconds. You have %2 turns left.',
	    goEarly: 'Too early! you pressed enter at %1 seconds. You have %2 turns left.',
	    goExact: 'Very good! You pressed at exactly 3 seconds. 1 extra turn + 2000 points!',
	    goOk: 'ok, not bad. You pressed enter at %1 seconds. You get %2 points! You have %3 turns left.',
	    goOver: 'Game over! You scored %1 points, in %2 turns. Do you think you can do better next time?',
	    goIntro: 'Are you ready to play ready set go? When you hear the countdown, press space when you think 3 seconds have passed!',
	    newUpdate: 'There is a new version available! You have version %1, version %2 is available.',
	    macwarning: 'Warning: On a mac, please press vo left arrow followed by vo right arrow, or you will have no speech.',
	    pongend: 'You got %1 keys and missed %2.',
	    mSapi: 'Use text to speech for the game',
	    mReader: 'Use your screen reader for the game',

	    newRate: 'This is a text to speech rate test. Please press enter when done',
	    rating: 'Press right and left arrow keys to change the rate. Press enter when done',
	    mRate: 'Change speech rate',

	    tutslot: `Welcome!
		    Evil slots is very evil indeed.
		    This game uses the action sounds from your pack to play a 3 wheel slot machine.
		    If the pack you are currently playing has more than 5 actions, don't worry only the first 5 will be used.
		    The first thing you will need to do is place a bet. The minimum is 5000 beatcoins. When you place a bet, those beatcoins will be deducted from your current beatcoins.
		    Once you have done that, a wheel will spin, and 3 action sounds will play.
		    If you get 3 of different types, you lose beatcoins based on your bet and how much you still have. If you have 0, of course nothing will happen.
		    !slot_lose_2
		    If you get 2 of the same type and 1 of a different type, you will get your bet back, but nothing more.
		    !slot_lose_1
		    If the first 2 are of the same type, there is a small chance that the third one will be the quiet action (the action of the pack where you must not press any key). If this happens you will get around 25% of your bet back. Because I am evil.
		    !slot_lose_3
		    However, if you get 3 of the same type, you will win your bet + 80 to 100 percent of the original bet!
		    !slot_win_3
		    Have fun playing evil slots!`,

	    introQuestion: 'Do you want a quick tutorial?',
	    introTut: `Welcome to the beatstar tutorial!
		    I will explain to you how to play beatstar.
		    It is a very simple game, although very adictive and fun!
		    In this game, your rhythm skills will be tested as well as your ability to react quickly.
		    Each soundpack consists of levels divided in different music segments.
		    You will hear a sound, and you will have to press a different key depending on the sound you heard.
		    Each pack usually has 5 different sounds, with some other packs having more, which are actions for the arrow keys.
		    There is also a sound which indicates that you need to stay quiet and not press any key.
		    For example, on the default soundpack, when you hear this sound, it means that you should press tab.
		    !a3
		    You need to press the tab key when the time is right.
		    !o3
		    This is the sound for the tab key.
		    To find out when the right time would be, think of the game having different cycles.
		    A cycle is the time between one action sound and the other, and the right time is always 50% of a cycle.
		    You know the length of a cycle because at the beginning of each level there is always a silent cycle.
		    Let me show you with a sound.
		    !tutorial
		    As you could hear from this sound, I waited half a cycle to press the tab key. This will earn me the highest possible score for that action!
		    Did you hear the little horn sound and that I didn't press any key?
		    The horn sound, in this pack, is the quiet action, also called freeze or stop action.
		    It means that if you press any key, you will fail!
		    !cling
		    Did you hear this cling?
		    !cling
		    Keep this cling in your head because, the higher pitched this cling is, the better was your score for that action.
		    At the end of each level, you earn beatcoins based on your performance. Beatcoins are used to unlock more packs and minigames.
		    If you find that you cannot beat the higher levels, try buying some safeguards before playing. Safeguards are free fails, which means that failing will have no effect once for each safeguard.
		    The game can be paused by pressing p and you can quit the game at any time by pressing q.
		    You can exit most menus in the game by pressing either left arrow or q.
		    When you are bored of the default pack, you should go to the download packs option and... Maybe download everything?
		    Have fun!`,
	    tuthighlow: `Welcome to higher or lower!
		    This is the typical higher or lower game. You will get a card, and you will have to guess whether the next card will be higher or lower than the one you got.
		    The values are ace, numbers 2 to 10, jack, queen, king.
		    Each time you get a card right, you will get more beatcoins, but if you lose you will not get anything!
		    Good luck!`,
	    tutfootball: 'This game is self explanatory. Just follow the audio instructions!',
	    tutdouble: 'This game is 100% random and it is based purely on a 50/50 chance. Will you win or lose? Let\'s find out!',
	    tutcode: `Welcome to beat the code!
		    In this game, you will have to break a series of codes which use the sounds from your pack.
		    To play the game, you use the normal keys you would use during the game tab, space, enter and backspace.
		    You will first hear an announcement saying the number of keys in the code. Then, you can start figuring out the code by pressing keys.
		    For example, if you press space and hear this,
	    !code_wrong
		    it means that the key you pressed was the wrong one.
		    However, if you hear this,
	    !code_ok
		    it means that the key was ok. So the code begins with space.
		    If you then press the tab key and hear the code wrong sound, you need to begin the code again by pressing space.
		    You know that the first key is space and the second one is not tab, so try guessing other keys until the code is complete.
		    Each time you get a code right, the number of keys in the code will increase as well as the amount of time you have to discover it.
		    Keys can repeat, but all of them will always be present.
		    For example, it is not possible for a code to be tab enter space enter tab, but it could be tab tab space enter backspace.
		    A word of caution:
		    If your pack uses the arrow keys as actions, the game will be a lot harder because these will be included in the code as well, so keep it in mind if you want to play much harder games!
		    Have fun!`,
	    mAchTuts: 'Achievement spoilers',
	    mRev: 'Beat Reverse',
	    football: 'soccer kick',
	    react: 'Quick tap',
	    gogame: 'Ready set go!',
	    gq: 'Pack quizz, get to know your soundpacks',
	    achfw: 'Premier League Team',
	    achhfw: 'Obtained by winning a game of football kick',
	    achfl: 'Bad loser: You suck!',
	    achhfl: 'Obtained by losing at football kick',
	    achidle: 'Pay attention',
	    achhidle: 'Pause the game (press p while playing) for more than 60 seconds',
	    saveFeature: `Congratulations, you have unlocked the saved games feature!
		    Press the s key for save during a game to save its current state so that you can continue later.
		    Note that this is not like the old insurance. The state is only saved until you win or fail, and you will destroy your save if you play minigames, buy packs or safeguards.
		    Have fun!`,
	    saved: 'Game saved!',
	    killSave: 'This will destroy your save file for the pack %1 at level %2. Continue?',
	    achdl: 'Loser times 2',
	    achhdl: 'Lose at double or nothing',
	    achpongfire: 'Pong like fireworks!',
	achfaillast:"Last level failure",
	achhfaillast:"Fail (no safeguards) at the last level of a pack.",
	    achhpongfire: 'Play react and get 25 correct keys or more',
	    achpongfail: 'You are horrible at this game',
	    achhpongfail: 'Play react and get 0 correct keys and at least 1 missed',
	    achdw: 'winner times 2!',
	    achhdw: 'Win at double or nothing',
	    double: 'Double or nothing',
	    newach: 'You have obtained the achievement: %1',
	    achMenu: 'Achievements: Use arrows to browse your achievements and enter to play one. You can interrupt a playing achievement by pressing q.',
	    noach: 'You have no achievements yet. Go get some!',
	    mAch: 'Browse achievements',
	    // The following are achievements
	    achw1: 'beat newbie',
	    achhw1: 'Win a pack',
	    achw5: 'it\'s time for a beer',
	    achhw5: 'beat 5 different packs',
	    achw10: 'time for another beer',
	    achhw10: 'Beat 10 different soundpacks.',
	    achw25: '25 makes 7',
	    achhw25: 'Beat 25 different packs.',
	    achw50: 'addicted to beatstar',
	    achhw50: 'Beat 50 different packs',
	    achusepinky: 'Just using my pinky',
	    achhusepinky: 'Win a soundpack without using any safeguards',
	    achlactions: 'Go learn the actions',
	    achhlactions: 'Fail at level 1',
	    achfingr: 'Rhythmical fingers',
	    achhfingr: 'Stay on beat for more than 5 levels',
	    achbulk: 'Vicious downloader',
	    achhbulk: 'Click on download all uninstalled packs',
	    achintro: 'Get to work',
	    achslotwin: 'Slots winner',
	    achhslotwin: 'get 3 in a row at beat slots',
	    achfrust: 'Frustration unavoidable',
	    achhfrust: 'Get 2 in a row + a different sound in beat slots',
	    achcatslots: 'Slots catastrophe',
	    achhcatslots: 'get 3 different sounds in slots',
	    achrobber: 'Bank robber',
	    achhrobber: 'Crack more than 4 codes in beat the code',
	    collect: 'Collect beatcoins and leave',
	    highlow: 'Higher or lower',
	    hw: 'Welcome to high or low!',
	    yourCard: 'Your card is the %1',
	    nextCard: 'Will the next card be higher or lower than the %1? Current bet %2 beatcoins',
	    higher: 'Higher',
	    lower: 'Lower',

	    card: '%1 of %2',
	    K: 'king',
	    Q: 'queen',
	    A: 'ace',
	    J: 'jack',
	    cspades: 'spades',
	    cdiamonds: 'diamonds',
	    cclubs: 'clubs',
	    chearts: 'hearts',
	    dq: 'This is a game of risk. You will risk losing %1 beatcoins. Continue?',
	    contPack: 'Continue where you left off (level %1)',
	    mPackTut: 'Pack making tutorial',
	    packtut: `Welcome to the pack editor!
		    First, thank you very much for wanting to create a pack.
		    It is very simple. You will be instructed to select whether you want to create a pack from the beginning or, if you already have a times file, called bpm.txt in your pack, you can change one of the levels by using the menu.
		    Once you have selected what to do, you will hear the music for the selected levels.
		    You will have to press the space bar at the speed you wish the level to go. Each press of the space bar is one cycle of the game, meaning that you have this amount of time to press the correct key
		    Hit q at any time to exit the pack editor and write your changes.
		    After you do this 10 times, the music will restart and you will hear your result.
		    You will hear a sound which will play on every cycle. Think of this cycle as if you were playing the game. Is this enough time for you to press the key? Is it in sync with the music?
		    If you are not satisfied with the result, you can press the space bar again to reset the time and start again.
		    Once you are satisfied, press enter. The next music will play.
		    Once all the levels are done, the file bpm.txt will be created (or voerwritten).
		    Note that you will have to put the pack in your user folder/beatpacks if you want to play it, and unlock it as normal.
		    You can upload your pack via the website by making a zip file of the pack's folder and sending it via the upload form.`,
	    startOver: 'Start from the first level',
	    mSelectEdit: 'Please select which level to edit, or start over',
	    selectPack: 'Please select a pack to edit',
	    floop: 'Music for the main menu',
	    fa1: 'Sound for the freeze action, also known as quiet action or stop action. This has no o sound because no key is needed',
	    fa2: 'Sound for the space key action instruction',
	    fo2: 'Sound for the space key action',
	    fa3: 'Sound for the tab key action instruction',
	    fo3: 'Sound for the tab key action',
	    fselect: 'Sound played when an action of the main menu is pressed',
	    fa4: 'Sound for the enter key action instruction',
	    fo4: 'Sound for the enter key action',
	    fa5: 'Sound for the backspace key action instruction',
	    fo5: 'Sound for the backspace key action',
	    fa6: 'Sound for the up arrow key action instruction',
	    fo6: 'Sound for the up arrow key action',
	    fa7: 'Sound for the down arrow key action instruction',
	    fo7: 'Sound for the down arrow key action',
	    fa8: 'Sound for the right arrow key action instruction',
	    fo8: 'Sound for the right arrow key action',
	    fa9: 'Sound for the left arrow key action instruction',
	    fo9: 'Sound for the left arrow key action',

	    fwin: 'Sound played upon completing all levels',
	    fnlevel: 'Sound which is played at the beginning of each level for which there is no pre sound. If neither pre nor nlevel are provided no extra sounds will be played before a level',
	    fpre1: 'pre + a level\'s number (pre1,pre2) will be played before a level begins. Can be useful in certain situations. If neither pre nor nlevel.ogg is provided, the game will continue with the next level with no extra sounds.',
	    fcredits: 'The credits are played only once, after playing the pack one time.',
	    missingFiles: 'The following files are missing and must be added before your pack can be edited',
	    missingOptional: 'The following files are missing from your pack, but are not strictly required to play. You can skip the arrow key actions, as most packs only have the usual 4 actions.',
	    fname: 'File which contains the preview sound used in menus',
	    fboot: 'This fail is played when the pack is ran for the first time, before reaching the main menu.',
	    ffail: 'This file is played upon failing, when the game ends',
	    f1music: 'Levels for the game. They must be loops so that the game can synchronize properly. At least 3 levels are required. The format is levelnumber+music, like 1music, 2music, 3music, 4music...',
	    f2music: 'Levels for the game. They must be loops so that the game can synchronize properly. At least 3 levels are required. The format is levelnumber+music, like 1music, 2music, 3music, 4music...',
	    f3music: 'Levels for the game. They must be loops so that the game can synchronize properly. At least 3 levels are required. The format is levelnumber+music, like 1music, 2music, 3music, 4music...',
	    safeget: 'You get %1 safeguards... cool!',
	    lang: 'English',
	    langs: 'Select your language',
	    codescracked: 'You managed to crack %1 codes, with %2 different actions!',
	    mEdit: 'Pack Editor',
	    mFound: 'Found %1 new packs: what do you wish to do?',
	    mGames: 'minigames',
	    mGameTuts: 'Minigame tutorials',
	    sGames: 'Select a minigame to play',
	    sTuts: 'Select a minigame to view help',
	    cost: 'Price',
	    slot: 'Evil slots',
	    unlocked: 'Already bought',
	    buygame: 'Do  you want to buy %1 for %2 beatcoins?',
	    bet: 'Please place your bet with the left and right arrow keys and press enter when you have decided.',
	    nogame: 'You don\'t have the required %1 beatcoins for this game, you only have %2.',
	    mainmenu: 'main menu: arrow keys to select options, page up and page down raise and lower the music volume. You can also use the first letter of an option to move to it',
	    mSelect: 'Please select',
	    mSafeSelect: 'Please select, with the right and left arrow keys, how many safeguards you want to buy and press enter.',
	    level: 'Level %1',
	    codes: 'Number of keys in the code: %1',
	    packprice: 'This pack costs %1 beatcoins, please confirm',
	    mReady: 'Please wait...',
	    code: 'Beat the code',
	    mDownloadAll: 'Download all uninstalled packs (size: %1 %2)',
	    mUnlocked: 'Listen to unlocked music for this pack (%1 levels)',
	    mSafeguards: 'Buy safeguards (now %1)',
	    dfiles: 'Downloading %1 files. Press any key to obtain percentage',
	    packno: 'Not enough beatcoins to get this pack, it costs %1.',
	    retrieving: 'Retrieving data ',
	    nodown: 'No downloads are available. So sorry! Check back soon',
	    mDownloadList: 'List all new available packs (%1)',
	    buy: 'buy',
	    mBack: 'go back',
	    safequestion: 'How many safeguards would you like? They cost %1 each. You have %2 beatcoins. You can get a maximum of %3. Remember, you can get a maximum of 100. If you want more, run me again.',
	    mDownloadInstructions: 'Press arrow keys to browse packs, the space bar to select a pack, p to preview its sound, and enter to begin downloading selected packs. Press escape or the left arrow to cancel',
	    mListen: 'Ready: %1 levels unlocked. you can go back to the main menu with the left arrow key.',
	    mStart: 'Start Game',
	    mLearn: 'Learn the pack',
	    mActions: 'This pack has %1 actions. Use the action keys configured by your layout. By default, they are: space, tab, enter, backspace, and optionally arrows up, down, left, right. Press shift along with one of the action keys to hear the action completed sound. To hear the stop action, press the period key (to the right of comma). To exit press Q',
	    yes: 'Yes',
	    noGameCash: 'The minimum bet is %1 beatcoins, you don\'t have enough right now. Go play!',
	    doublecash: 'Double or nothing requires at least 5000 beatcoins. Sorry!',
	    no: 'no',
	    ok: 'ok',

	    dling: 'Downloading %2 packs please wait...',
	    dlprog: 'downloading pack %1 of %2...',
	    dlingdone: 'Done! Rebuilding database...',
	    packError: 'No packs were found on your computer. I will now proceed to download the default pack, please wait...',
	    intro: 'Welcome to beatstar!\nThis is a world of music, fun and games.\nPlease read the online instructions to learn how to play.\nYou will now be put into the main menu, where you will find different options.\nI recommend you get some beatcoins by playing the default pack!\nIf you want to change the language, there is an option in the main menu which will let you do so.',
	    keymapStart: 'We will now remap your keyboard. You will hear the sounds for the different actions, and you will be prompted to press the key you want to associate to the new actions.',
	    tamperWarning: 'This pack has been tampered with and is no longer unlocked. Press enter to continue.',
	    mNew: 'Get new packs',
	    nopacks: 'No packs are available. If you think this is a bug, please contact me.',
	    noGuardCash: 'You need %1 beatcoins to buy one safeguard. You have %2.',
	    mBrowse: 'buy new packs (You have %1 beatcoins )',
	    mBrowseIncompleted: 'incompleted packs',
	    mBrowseUnlocked: 'Change to different unlocked pack',
	    youwin: 'You win %1 coins!',
	    youlose: 'You lose %1 coins.',

	    mHashes: 'Rebuild packs folder',
	    mDownload: 'Download new packs'
		};
		this.strings[2] = {
			// New Spanish
mSettings:"Configuración y ayuda",
settingsMenu:"Este es el menú de configuración. Puedes cambiar opciones aquí, o pulsar volver para salir.",
"mk1":"Espacio, tabulador, enter y retroceso, y las flechas.",
"mk2": "e, d, r, f; e I, K, J, y L como flechas.",
"MKeyLayout": "Modo de teclado (flechas izquierda y derecha para cambiar)",

			k2:"espacio",
			k3: "tabulador",
			k4: "énter",
			k5: "retroceso o borrar",
			k6:"flecha arriba",
			k7:"flecha abajo",
			k8:"flecha derecha",
			k9:"flecha izquierda",
			
selectVoice:"%1 voces disponibles. Usa las flechas arriba y abajo para seleccionar una nueva voz y pulsa enter cuando hayas terminado.",
	    mSelectVoice:"Cambiar la voz del juego",
	    selectNewPath: 'Selecciona una nueva ruta para los packs',
	    noFindFolder: 'No puedo encontrar tu carpeta de packs en %1, voy a usar la carpeta por defecto. puedes cambiarla en el menú.',
	    mDir: 'Cambiar carpeta de packs (ahora %1)',
	    selectPath: 'Por favor dime la carpeta donde guardaremos los packs',
	    directoryQuestion: 'Espera! Está bien que guarde los packs de sonido en la carpeta beatpacks de tu carpeta de usuario? Si no, te pediré que busques otra carpeta para guardar los packs. Si ya tienes packs guardados en la carpeta de usuario y quieres cambiar, deberás moverlos tú ya que el juego no lo hace por sí solo',
	    mLang: 'Cambiar Idioma',
	    gq_end: 'Juego terminado! Espero que te hayas divertido. Has adivinado %1 y %2 estaban mal. ¿Quieres intentarlo de nuevo?',
	    gq_welcome: 'Bienvenido a preguntas de packs!\nEstás listo para averiguar cuánto sabes de tus packs desbloqueados?',
	    pq: 'A qué pack crees que pertenece este nivel?',
	    need5: 'Vaya, necesitarás desbloquear al menos 5 packs para poder jugar a este juego.',
	    combo: 'Combo x%1! +%2 puntos!',
	    goOver: 'Has terminado! Has conseguido %1 puntos, en %2 turnos. Lo harás mejor la próxima vez?',
	    goLate: 'Demasiado tarde! Te quedan %1 turnos.',
	    goLater: 'Demasiado tarde! Has pulsado enter a los %1 segundos... Te quedan %2 turnos.',
	    goEarly: 'Demasiado pronto! has pulsado enter a los %1 segundos... Te quedan %2 turnos.',
	    goOk: 'Bueno, ok. Has pulsado a los %1 segundos. Ganas %2 puntos! Te quedan %3 turnos.',
	    goExact: 'Bien! Has pulsado a los 3 segundos exactos! Turno extra y 2000 puntos!',
	    goIntro: 'Preparado para jugar a preparados listos ya? cuando oigas el contador, pulsa espacio a la de tres!',
	    newUpdate: 'Hay una nueva versión disponible! Tienes la %1 y la %2 está disponible.',
	    macwarning: 'Atención: En un mac, por favor pulsa control opción  flecha izquierda seguido de control opción derecha o no tendrás voz.',
	    mReader: 'Usar tu lector de pantalla para el juego',
	    mSapi: 'Usar tts para el juego',
	    newRate: 'Esta es una prueba de la velocidad de la voz. Por favor, pulsa enter cuando hayas terminado',
	    rating: 'Pulsa las flechas izquierda y derecha para cambiar la velocidad. Pulsa Enter cuando hayas terminado.',
	    mRate: 'Cambiar velocidad de la voz',

	    tutslot: `Bienvenidos!
		    El tragaperras de las tinieblas, es un juego muy maléfico.
		    Este juego usa los sonidos del pack com una máquina de 3 ruedas.
		    Si el pack que tienes tiene más de 5 sonidos de acción, solo se usan los primeros 5.
		    Lo primero que debes hacer es apostar. La apuesta mínima son 5000. Cuando hayas apostado, se descontarán de tus monedas.
		    Cuando hayas hecho esto, empezará a sonar una especie de rueda y se reproducirán 3 sonidos de acciones.
		    Si suenan 3 sonidos diferentes, perderás aún más monedas, basándote en las monedas que te quedan y en la apuesta que hiciste. No pasará nada si tienes 0.
		    !slot_lose_2
		    Si consigues 2 del mismo tipo y 1 de otro tipo, conseguirás tu apuesta de vuelta pero nada más.
		    !slot_lose_1
		    Si los 2 primeros son del mismo tipo, hay una pequeña oportunidad para que consigas el sonido de stop. Si esto pasa conseguirás alrededor del 25% de tu apuesta.
		    !slot_lose_3
		    Sin embargo, si consigues 3 iguales, ganarás tu apuesta, + casi el doble de lo que jugaste!
		    !slot_win_3
		    Disfruta!`,

	    introQuestion: 'Quieres un mini tutorial?',
	    introTut: `Bienvenido al tutorial de beatstar!
		    Voy a contarte cómo jugar a este gran juego.
		    Es un juego bastante simple, pero es muy adictivo y divertido!
		    En este juego, vamos a probar tus abilidades rítmicas así como tu velocidad de reacción.
		    Cada pack consiste en distintos niveles musicales.
		    Escucharás un sonido y deberás pulsar una tecla diferente dependiendo del sonido que escuchaste.
		    Cada pack tiene 5 sonidos, algunos tienen más de 5 que son acciones para las flechas.
		    También hay un sonido que indica que debes quedarte quieto, no pulsar ninguna tecla.
		    Por ejemplo, en el pack por defecto, este sonido indica que debes pulsar tabulador.
		    !a3
		    Deberás pulsar tabulador cuando llegue el tiempo adecuado.
		    !o3
		    Este es el sonido del tabulador.
		    Para saber cuándo hay que pulsar las teclas, piensa en que el juego tiene distintos ciclos.
		    Un ciclo es el tiempo entre un sonido de acción y el siguiente.
		    Sabes lo que tarda un ciclo porque al principo de cada nivel hay siempre un ciclo de silencio.
		    Déjame mostrártelo con un sonido.
		    !tutorial
		    Tal y como acabas de escuchar, he esperado medio ciclo a pulsar el tabulador en cada una de las acciones, porque eso me da la máxima puntuación!
		    Has oído el sonido del pitido y que no he pulsado ninguna tecla?
		    En este pack, este sonido es la acción de quieto, también se le llama congelar o stop.
		    Significa que si pulsas alguna tecla, fallarás.
		    !cling
		    Has oído esta campanita?
		    !cling
		    Estate atento a este sonido porque, cuanto más alto sea el tono de este sonido, más puntuación has conseguido!
		    Al final de cada nivel, conseguirás monedas dependiendo de tu rendimiento. Las monedas se utilizan para comprar packs, minijuegos y antifallos.
		    Si ves que no puedes ganar los niveles más altos, puedes comprar antifallos. Los antifallos son como vidas, es decir que por cada antifallo, podrás fallar una vez sin perder.
		    El juego se puede pausar con la p, y puedes salir del juego con la q.
		    Para salir de la mayoría de los menús, puedes pulsar la flecha izquierda o la q.
		    Cuando te aburras del pack por defecto, podrías utilizar la opción descargar packs... y bajarlos todos!
		    Disfruta!`,

	    tuthighlow: `Bienvenido a la carta más alta!
		    Este es el típico juego de cartas. Tienes una carta y tendrás que adivinar si la próxima será más alta o más baja que la anterior.
		    Los valores son: El as, números 2 a 10, la sota, la reina, y el rey.
		    Cada carta que aciertes, ganarás más monedas, pero si pierdes y te arriegas no ganarás nada!
		    Suerte!`,
	    tutdouble: 'Este juego es 100% aleatorio y hay una oportunidad del 50/50. Ganarás o perderás? A ver a ver...',
	    tutfootball: 'Este juego se explica por sí solo. Escucha las instrucciones durante el juego!',
	    tutcode: `Bienvenido a rompecódigos!
		    En este juego, tendrás que romper unos códigos que usan los sonidos de tu pack.
		    Para jugar, se utilizan las teclas que usas normalmente durante el juego (espacio, tab, enter y retroceso).
		    Primero escucharás el número de teclas que hay en el código. Entonces podrás comenzar a descubrir el código pulsando teclas.
		    Por ejemplo, si pulsas espacio y oyes esto:
		    !code_wrong
		    Significa que la tecla que pulsaste no era la correcta.
		    Sin embargo, si oyes esto:
		    !code_ok
		    Significa que es correcta. Así pues, el código comienza con espacio.
		    Si luego pulsas tabulador y oyes el sonido de incorrecto, sabes que la segunda tecla no es el tabulador. Tendrás que pulsar entonces la primera tecla del código, ya que cuando fallas tienes que volver a empezar con el principio del código.
		    Sabrás que la primera es el espacio y la segunda no es el tabulador, así que intenta con otras teclas hasta que completes el código.
		    Cada vez que consigas un código correcto, el número de teclas y el tiempo que tienes para descubrirlas se incrementa. Las teclas pueden repetirse en cualquier momento, pero todas estarán siempre presentes.
		    Es decir, no es posible que un código sea espacio tab enter espacio espacio, pero sí espacio tab retroceso espacio enter.
		    Cuidado!
		    Si tu pack utiliza las flechas como acciones, ten cuidado porque también se incluirán en el código así que tenlo en cuenta si quieres jugar con códigos mucho más difíciles!
		    Disfruta!!`,
	    mAchTuts: 'Spoilers para logros',
	    mRev: 'beatrevés',
	    football: 'Lanzamiento de penaltis',
	    react: 'Reacciona',
	    gogame: 'Preparados listos ya!',
	    gq: 'Adivina la música, conoce tus packs de sonido',
	    doublecash: 'El mínimo para jugar son 5000 monedas. Lo siento!',
	    achfw: 'Equipo de primera',
	    achhfw: 'Gana un partido de penaltis',
	    achfl: 'Equipo de segunda',
	    achhfl: 'Pierde un partido de penaltis',
	    achidle: 'Te has quedao empanao!',
	    achhidle: 'Pausa el juego (pulsa la p) y déjalo pausado 60 segundos',
	    saveFeature: `Felicidades, has desbloqueado la opción guardar juego!
		    Pulsa la s (de save, guardar en inglés) durante un juego para guardar el estado y el nivel actuales para que puedas continuar después.
		    Ten en cuenta que esto no es como el antiguo seguro, el estado se guarda solo hasta que ganes o falles. se perderá el juego si compras packs, antifallos o juegas algún minijuego.
		    A disfrutar!`,
	    saved: 'Guardado!',
	    killSave: 'Esto eliminará tu juego guardado para el pack %1. Estás en el nivel %2. Continuar?',
	    achdl: 'Doble perdedor',
	    achhdl: 'Pierde en doble o nada',
	    achdw: 'Doble ganador!',
	    achhdw: 'Gana en doble o nada',
	    double: 'Doble o nada',
	    newach: 'Has obtenido el logro: %1!',
	    noach: 'No tienes logros... qué raro!',
	    mAch: 'Ver tus logros',
	    achw1: 'Novatillo',
	    achhw1: 'Gana tu primer pack',
	    achw5: 'Una cervecita',
	    achhw5: 'Gana 5 packs',
	    achw10: 'Otra cervecita',
	    achhw10: 'Gana en 10 packs',
	    achw25: '25 son 7',
	    achhw25: 'Gana 25 packs diferentes',
	    achw50: 'Beatadicto',
	    achhw50: 'Gana 50 packs diferentes',
	    achusepinky: 'Sin fallos',
	    achhusepinky: 'Gana un pack sin usar antifallos',
	    achlactions: 'Vete a aprender las acciones',
	    achhlactions: 'Falla en el nivel 1',
	    achfingr: 'Al ritmo',
	    achhfingr: 'Mantén el ritmo durante 5 niveles o más.',
	    achbulk: 'Descargador Viciosillo',
	    achhbulk: 'Utiliza la opción descargar todos los packs no instalados',
	    achintro: 'A trabajar!',
	    achslotwin: 'Ganador afortunado',
	    achhslotwin: 'Gana en el juego de tragaperras',
	    achfrust: 'Frustración inevitable',
	    achhfrust: 'Pierde con 2 ruedas iguales en el tragaperras',
	    achcatslots: 'tragaperras catastrófico',
	    achhcatslots: 'Pierde con 3 ruedas distintas en el tragaperras',
	    achrobber: 'Ladrón de bancos',
	    achhrobber: 'Consigue 4 o más códigos en el rompecódigos',
	    highlow: 'La carta más alta',
	    hw: 'Bienvenido a la carta más alta!',
	    yourCard: 'Tu carta es el %1',
	    nextCard: 'Crees que la próxima carta será más alta o más baja que el %1?',
	    higher: 'Más alta',
	    lower: 'Más baja',
	    collect: 'Obtener monedas y salir',
	    achMenu: 'Logros: Pulsa las flechas para moverte por tus logros, enter para reproducir uno. Puedes detener la reproducción de un logro pulsando la q.',
	    card: '%1 de %2',
	    K: 'rey',
	    Q: 'reina',
	    A: 'as',
	    J: 'sota',
	    cspades: 'picas',
	    cdiamonds: 'diamantes',
	    cclubs: 'bastos',
	    chearts: 'corazones',
	    dq: 'Este es un juego de riesgo. Te arriesgas a perder %1 monedas. Continuar?',
	    contPack: 'Continuar donde lo dejaste (nivel %1)',
	    mPackTut: 'Tutorial de cómo hacer packs',
	    packtut: `Bienvenido al editor de packs!
		    Primero, darte las gracias por querer crear un pack.
		    Es muy fácil. Primero, deberás seleccionar si editar uno de los niveles (si ya existe un archivo de tiempos llamado bpm.txt) o empezar de 0.
		    Cuando hayas seleccionado qué hacer, escucharás la música de los niveles seleccionados.
		    Deberás pulsar la barra espaciadora a la velocidad que quieres que corra el nivel. Cada pulsación del espacio es un ciclo del juego, lo que significa que tienes esa cantidad de tiempo para pulsar la tecla correcta.
		    Cuando hayas hecho eso 10 veces, escucharás que la música se reinicia y tu resultado.
		    Escucharás un sonido que se reproducirá cada ciclo. Piensa en esos ciclos como si estuvieras jugando. ¿Está sincronizado con la música? ¿Tienes suficiente tiempo para pulsar la tecla correcta?
		    Si no estás satisfecho con el resultado, puedes pulsar de nuevo el espacio para reiniciar la música y comenzar de nuevo con el mismo nivel.
		    Cuando el resultado te parezca bien, pulsa enter. Si has seleccionado más de un nivel, este se reproducirá.
		    Cuando estén hechos todos los niveles, se creará automáticamente el archivo bpm.txt en el pack (o se reemplazará si ya existía).
		    Si quieres jugar, tendrás que ponerlo en tu carpeta de usuario/beatpacks, y desbloquearlo con beatcoins.
		    Puedes subirlo a la web haciendo un archivo zip de la carpeta del pack y enviándolo con el formulario de subida`,
	    startOver: 'Comenzar desde el primer nivel',
	    mSelectEdit: 'Por favor selecciona el nivel a editar, o empezar de 0',
	    selectPack: 'Selecciona un pack a editar',
	    floop: 'Música del menú',
	    fa1: 'Sonido para la acción freeze, también se le llama acción de quieto. No necesita sonido o ya que no hay tecla que pulsar',
	    fa2: 'Sonido de indicación de la acción para el espacio o barra espaciadora',
	    fo2: 'Sonido de la acción para el espacio o barra espaciadora',
	    fa3: 'Sonido de indicación de la acción para el tabulador',
	    fo3: 'Sonido para la acción del tabulador',
	    fselect: 'Sonido que se reproduce cuando se selecciona una opción del menú',
	    fa4: 'sonido para la acción de la tecla enter',
	    fo4: 'sonido para la acción de la tecla enter',
	    fa5: 'sonido para la acción de la indicación de la tecla borrar',
	    fo5: 'sonido para la acción de la tecla borrar',
	    fa6: 'sonido para la indicación de la acción de la flecha arriba',
	    fo6: 'sonido para la acción de la flecha arriba',
	    fa7: 'sonido para la indicación de la acción de la flecha abajo',
	    fo7: 'sonido para la acción de la flecha abajo',
	    fa8: 'Sonido para la indicación de la acción de la flecha derecha',
	    fo8: 'sonido para la acción de la flecha derecha',
	    fa9: 'sonido para la indicación de la acción de la flecha izquierda',
	    fo9: 'Sonido para la acción de la flecha izquierda',

	    fwin: 'Sonido que se reproduce al completar todos los niveles',
	    fnlevel: 'Sonido que se reproduce al cambiar de nivel, si no existe un sonido pre para ese nivel. Si no se proporciona ni nlevel ni pre, se pasa al siguiente nivel sin sonidos extra.',
	    fpre1: 'Pre y el número de un nivel (como pre1.ogg o pre2.ogg), se reproduce antes de que comience un nivel. Si no se proporciona ni nlevel.ogg ni pre, el juego saltará al siguiente nivel sin más sonidos extra.',
	    fcredits: 'Los créditos se reproducen cuando el juego termina, solo una vez.',
	    fname: 'Archivo utilizado como vista previa en los menús',
	    fboot: 'Archivo que se reproduce al abrir el pack por primera vez, antes de jugar',
	    ffail: 'Archivo que se reproduce cuando termina el juego, al fallar',
	    f1music: 'Los niveles del juego (se requieren al menos 3 para que un pack se considere válido y deben ser loops para que el juego se sincronice. Siguen el formato <númeroNivel>music, por ejemplo 1music, 2music, 3music.',
			    f2music: 'Los niveles del juego (se requieren al menos 3 para que un pack se considere válido y deben ser loops para que el juego se sincronice. Siguen el formato <númeroNivel>music, por ejemplo 1music, 2music, 3music.',
				    f3music: 'Los niveles del juego (se requieren al menos 3 para que un pack se considere válido y deben ser loops para que el juego se sincronice. Siguen el formato <númeroNivel>music, por ejemplo 1music, 2music, 3music.',
					    missingFiles: 'Los siguientes archivos no están presentes en el pack y son necesarios para poder editarlo:',
					    missingOptional: 'Los siguientes archivos son opcionales y no están presentes en el pack, pero no son estrictamente necesarios. Puedes saltarte las acciones de las flechas ya que la mayoría de packs solo tienen las 4 acciones básicas.',
					    lang: 'Español',

					    langs: 'Selecciona tu idioma',
					    mFound: 'Hemos encontrado %1 packs nuevos: ¿Qué quieres hacer?',
					    mReady: 'Espera, por favor...',
					    mDownloadAll: 'Descargar todos los packs no instalados (tamaño: %1 %2)',
					    level: 'Nivel %1',
					    nodown: 'No hay descargas disponibles por el momento. prueba pronto!',
					    mDownloadList: 'Lista todos los packs no instalados (%1 en total)',
					    buy: 'comprar',
					    mBack: 'volver',
					    mDownloadInstructions: 'Pulsa las flechas para moverte por los packs, barra espaciadora para seleccionar un pack, la p para previsualizarlo, y enter para empezar la descarga de los seleccionados. pulsa escape o la flecha izquierda para cancelar',
					    mStart: 'jugar',
					    mLearn: 'aprender el pack',
					    mActions: 'Este pack tiene %1 acciones. Usa las teclas que hayas configurado en ti diseño de teclado, por defecto: espacio, tabulador, enter, retroceso/borrar, y opcionalmente las flechas. Usa shift junto con una de estas teclas para escuchar el sonido de acción completada. Para escuchar la acción de quedarse quieto, pulsa la tecla del punto. Para salir pulsa la q.',
					    dling: 'Descargando %2 packs por favor espera...',
					    dlingdone: '¡Hecho! Reconstruyendo base de datos...',
					    packError: 'No hemos encontrado packs en tu pc, vamos a bajar el pack por defecto, espera por favor...',
					    intro: 'Bienvenido a beat star!\nEste es un mundo de música y diversión!\nPor favor, lee el manual en internet para aprender a jugar.\nAhora te llevaré al menú principal, donde encontrarás diferentes opciones.\nTe recomiendo que consigas unas monedas jugando el pack por defecto!\nSi quieres cambiar el idioma del juego, hay una opción en el menú principal que te permite hacerlo.',
					    keymapStart: 'Vamos a cambiar la distribución del teclado. Vas a escuchar los sonidos de las acciones y vas a tener que pulsar la tecla que quieres que corresponda para la acción.',
					    dlprog: 'descargando pack %1 de %2...',
					    tamperWarning: 'Este pack ha sido modificado y ya no está desbloqueado. Pulsa enter para continuar.',
					    mUnlocked: 'Escuchar la música desbloqueada de este pack (%1 niveles)',
					    mBrowseIncompleted: 'packs comprados no completados',
					    yes: 'sí',
					    youwin: 'Ganas %1 monedas!',
					    noGuardCash: 'No tienes suficientes monedas. Cada antifallo cuesta %1 y tienes %2.',
					    youlose: 'Pierdes %1 monedas!',
					    no: 'no',
					    mNew: 'Conseguir nuevos packs',
					    achpongfire: 'fuegos pongificiales',
					    achhpongfire: 'Juega a reacciona y consigue 25 teclas o más.',
					    achpongfail: 'Este juego te puede',
					    achhpongfail: 'Juega a reacciona y consigue 0 teclas correctas y al menos una incorrecta.',

					    safeget: 'Consigues %1 antifallos... Que guay!',
					    nopacks: 'No hay packs disponibles. Si crees que hay un error en el juego, ponte en contacto conmigo.',
					    codes: 'Número de teclas en el código: %1',
					    unlocked: 'Ya lo has comprado',
					    mBrowse: 'comprar un pack (tienes %1 monedas)',
					    mBrowseUnlocked: 'Cambiar a otro pack comprado',
					    mHashes: 'Reconstruir base de datos de packs',
					    codescracked: 'Has podido desbloquear %1 códigos, con %2 acciones diferentes!',
					    mainmenu: 'menú principal: flechas arriba y abajo para seleccionar opciones, avanzar y retroceder página para subir y bajar la música. también puedes usar la primera letra de una opción para moverte a ella.',
					    mSelect: 'Por favor selecciona',
					    mSafeSelect: 'Por favor selecciona, con las flechas izquierda y derecha, cuántos antifallos quieres y pulsa enter.',
					    mSafeguards: 'Comprar antifallos (ahora %1)',
					    noGameCash: 'Oooh, lo siento. La apuesta mínima es de %1 monedas, no tienes suficiente. Vete a jugar!',
					    bet: 'selecciona tu apuesta con las flechas izquierda y derecha. Cuando te hayas decidido, pulsa enter.',
					    packprice: 'Este pack cuesta %1 monedas, confirma que quieres comprarlo.',
					    packno: 'No tienes monedas suficientes para este pack, cuesta %1.',
					    safequestion: 'Cuántos antifallos quieres comprar? Cuestan %1 cada una y tienes %2 monedas. Puedes comprar %3. Recuerda que solo puedes comprar 100 de una tirada. Si quieres más, dale otra vez a la opción del menú.',
					    code: 'rompecódigos',
					    mListen: 'listo: %1 niveles desbloqueados, flecha izquierda vuelve al menú principal',
					    dfiles: 'Descargando %1 archivos. Pulsa cualquier tecla para obtener porcentaje',
					    retrieving: 'Recopilando datos ',
					    mDownload: 'Descargar packs',
					    ok: 'ok',
					    mEdit: 'Editor de packs',
					    mGames: 'minijuegos',
					    buygame: 'Quieres comprar %1 por %2 monedas?',
					    nogame: 'No tienes las %1 monedas que necesitas para este juego, solo tienes %2',
					    mGameTuts: 'tutoriales de minijuegos',

					    sGames: 'Selecciona un minijuego:',
					    sTuts: 'Selecciona un minijuego para ver la ayuda',
					    cost: 'Precio',
					    slot: 'tragamonedas de las tinieblas',
					    pongend: 'Has conseguido %1 teclas, con %2 fallos.'

		};
	}

	get(what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			return what;
		}
		rep.forEach((v, i) => {
				const i1 = Number(i) + 1;
				str = str.replace('%' + i1, v);
				});
		return str;
	}

	speak(what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			speech.speak(what);
		}
		rep.forEach((v, i) => {
				const i1 = Number(i) + 1;
				str = str.replace('%' + i1, v);
				});
		speech.speak(str);
	}

	async check(lng) {
		const len = utils.objSize(this.strings) - 2;
		for (const i in this.strings[1]) {
			if (!this.strings[lng].hasOwnProperty(i)) {
				await new ScrollingText(i + ': ' + this.strings[1][i]);
			}
		}
	}
}
export var strings = new Strings();
