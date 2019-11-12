import os from 'os';
import fs from 'fs';
import {shuffle, newDeck, newDecks} from '52-deck';
import {packDirectory, lang, questionSync, getAch, addCashSync, safeget, pack, packdir, actionKeys, save, question, addCash, data} from './main';
import Timer from './timer';
import {OldTimer} from './oldtimer';
import {SoundHandler} from './soundHandler';
import {AudioItem, SliderItem, MenuItem} from './menuItem';
import {Menu} from './menu';
import {ScrollingText} from './scrollingText';
import {strings} from './strings';
import {speech} from './tts';
import {utils} from './utilities';
import {so} from './soundObject';
import {KeyEvent} from './keycodes';
import {KeyboardInput} from './input';
import {st} from './stateMachine';
let gametimer;
let pongnotify;
let pongmusic;
const pongpool = new SoundHandler();
const pongtimer = new OldTimer();
let current = 1;
let ps;
const pin = new KeyboardInput();
pin.init();

export async function betSync(minBet = 5000, slideBy = 500) {
	return new Promise(resolve => {
			minibet(bet => {
					resolve(bet);
					return bet;
					}, minBet, slideBy);
			});
}
export function minibet(callbet = null, minBet = 5000, slideBy = 500) {
	if (data.beatcoins < minBet) {
		const error = new ScrollingText(strings.get('noGameCash', [minBet, data.beatcoins]), '\n', (() => {
					if (typeof callbet !== 'undefined') {
					callbet(-1);
					}
					}));// Scroll
	}// If not cash
	else {
		// Bet start
		const items = new Array();
		const slider = new SliderItem(0, strings.get('bet', []), minBet, data.beatcoins, minBet, slideBy);
		items.push(slider);
		items.push(new MenuItem(1, strings.get('ok',)));
		items.push(new MenuItem(2, strings.get('mBack',)));
		so.directory = './sounds/';
		const dm = new Menu(strings.get('bet'), items);
		let myBet = 0;
		dm.run(s => {
				so.directory = './sounds/';
				myBet = s.items[0].value;
				dm.destroy();
				if (s.selected == 2) {
				if (typeof callbet !== 'undefined') {
				callbet(0);
				}
				}// Option 2
				else {
				addCash(0, myBet, () => {
						if (typeof callbet !== 'undefined') {
						callbet(myBet);
						}
						});
				}// Not option 2
				});// Menu callback
		// bet end
	}// Enough cash
}// Function
export async function playSlots() {
	let myBet;
	minibet(bet => {
			if (bet <= 0) {
			st.setState(2);
			return;
			}
			myBet = bet;
			// Slots
			so.directory = './sounds/';
			const loop = so.create('slot_wheel', true);
			let wheel;
			let counter = 0;
			loop.play();
			const wheels = [];
			const myInt = setInterval(() => {
					if (counter < 3) {
					so.directory = '';
					wheels[counter] = utils.randomInt(2, 5);
					if (counter == 2 && (wheels[0] == wheels[1])) {
					let void_random;
					void_random = utils.randomInt(1, 10);
					if (void_random == 1) {
					wheels[2] = 1;
					}
					}
					wheel = so.create(packdir + 'a' + wheels[counter]);
					wheel.play();
					counter++;
					} else {
					clearInterval(myInt);
					loop.stop();
					so.directory = './sounds/';
					if (wheels[0] == wheels[1] && wheels[1] == wheels[2]) {
					const win = so.create('slot_win_' + utils.randomInt(1, 4));
					win.play();
					win.sound.once('ended', async () => {
							await getAch('slotwin');
							const capcash = myBet;
							console.log(capcash);
							const perc = Math.ceil(utils.percentOf(utils.randomInt(80, 100), capcash) + myBet);
							console.log('perc' + perc);
							addCash(perc, 0, () => {
									so.kill(() => {
											st.setState(2);
											});
									});
							});
					} else if (wheels[2] == 1) {
						const lose = so.create('slot_lose_3');
						lose.play();
						let capcash = myBet;
						if (capcash > data.beatcoins) {
							capcash = data.beatcoins;
						}
						const perc = Math.ceil(utils.percentOf(utils.randomInt(15, 25), capcash));
						console.log('perc' + perc);
						data.beatcoins -= perc;
						lose.sound.once('ended', async () => {
								addCash(0, perc, () => {
										so.kill(() => {
												st.setState(2);
												});
										}, true);
								});
					} else if (wheels[0] == wheels[1] || wheels[1] == wheels[2] || wheels[0] == wheels[2]) {
						const lose = so.create('slot_lose_1');
						lose.play();
						lose.sound.once('ended', async () => {
								await getAch('frust');
								const capcash = myBet;
								const perc = capcash;
								addCash(perc, 0, () => {
										so.kill(() => {
												st.setState(2);
												});
										});
								});
					} else {
						const lose = so.create('slot_lose_2');
						lose.play();
						lose.sound.once('ended', async () => {
								await getAch('catslots');
								let capcash = myBet;
								if (capcash > data.beatcoins) {
								capcash = data.beatcoins;
								}
								console.log(capcash);
								const perc = Math.ceil(utils.percentOf(utils.randomInt(20, 60), capcash));
								console.log('perc' + perc);
								addCash(0, perc, () => {
										so.kill(() => {
												st.setState(2);
												});
										});
								});
					}
					}// Counter
			}, utils.randomInt(2500, 3100));
	}, 2500, 500);
}
function sop() {
	so.directory = packdir + '/';
}
function sos() {
	so.directory = './sounds/';
}
export async function playCode() {
	const fs = require('fs');
	const pool = new SoundHandler();
	let actions = 0;
	for (let i = 1; i <= 10; i++) {
		if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
			actions = i;
		}
	}
	const time = new OldTimer();
	let allowed = 42000;
	let ticker;
	let music;
	sos();
	ticker = so.create('codetick');
	sop();
	let playing = true;
	let level = 0;
	let crackedcodes = 0;
	let acode = [];
	const actionsa = [];
	const curkeys = [];
	for (let i = 2; i <= actions; i++) {
		actionsa.push('a' + i);
	}
	let go;
	const input = new KeyboardInput();
	input.init();
	let fumbled = false;
	sos();
	go = so.create('codego');
	let tick = true;
	while (playing) {
		await utils.sleep(5);
		level++;
		allowed = 35000 + (actions * 500);
		acode.splice();
		acode = actionsa;
		if (level + actions - 1 > actions) {
			const more = level - 1;
			for (let i = 1; i <= more; i++) {
				acode.push('a' + utils.randomInt(2, actions));
			}
		}
		acode = utils.shuffle(acode);
		let counter = 0;
		sos();
		if (!fumbled) {
			speech.speak(strings.get('level', [level]));
			await utils.sleep(700);
			speech.speak(strings.get('codes', [acode.length]));
			await utils.sleep(utils.randomInt(800, 1250));
			go.play();
			sop();
			time.reset();
		}
		while (time.elapsed < allowed && playing) {
			await utils.sleep(5);
			if (time.elapsed % 1000 <= 10 && tick) {
				const formula = (allowed - time.elapsed) / 1000;
				ticker.pitch = (120 - formula) / 100;
				tick = false;
				ticker.play();
			}// Ticker sound
			else {
				tick = true;
			}
			input.justPressedEventCallback = function (evt) {
				if (evt == KeyEvent.DOM_VK_Q) {
					playing = false;
				}
				if (actionKeys.includes(evt)) {
					if (evt == actionKeys[data.actionLimit+acode[counter].substr(1)]) {
						sop();
						pool.playStatic(acode[counter], 0);
						sos();
						pool.playStatic('code_ok', 0);
						sop();
						counter++;
					} else {
						counter = 0;
						sos();
						pool.playStatic('code_wrong', 0);
						sop();
					}
				}// Is in array
			};
			if (counter == acode.length) {
				sos();
				input.justPressedEventCallback = null;
				pool.playStatic('code_complete', 0);
				sop();
				await utils.sleep(600);
				ticker.stop();
				crackedcodes++;
				time.restart();
				acode.splice();
				break;
			}// Code cracked
		}// While allowed
		if (time.elapsed >= allowed) {
			input.justPressedEventCallback = null;
			sos();
			let fumble;
			fumbled = true;
			playing = false;
			fumble = so.create('fumble');
			fumble.play();
			await utils.sleep(400);
		}// Allowed
	}// While playing
	const newsafe = utils.randomInt(0, level - 1);
	new ScrollingText(strings.get('codescracked', [crackedcodes, actions]), '\n', (async () => {
				if (crackedcodes >= 3) {
				await getAch('robber');
				}
				safeget(newsafe, () => {
						so.kill(() => {
								input.justPressedEventCallback = null;
								st.setState(2);
								});
						});
				}));
}// Function
export async function playDeck() {
	const deck = shuffle(newDecks(1));
	so.directory = './sounds/';
	const snd = so.create('hl_intro');
	let bet = await betSync(1500, 500);
	speech.speak(bet);
	if (bet <= 0) {
		so.kill(() => {
				st.setState(2);
				});
		return;
	}
	strings.speak('hw');
	await snd.playSync();
	let card;
	let value;
	const pool = new SoundHandler();
	let cardO;
	let first = true;
	const firstBet = bet;
	bet = 0;
	so.directory = './sounds/';
	const take = so.create('hl_card');
	while (bet != -1) {
		await utils.sleep(8);
		await new Promise(resolve => {
				cardO = takeCard(deck);
				take.playSync();
				deck.splice(0, 1);
				card = cardO[1];
				value = cardO[0].value;
				// Question
				let answer = false;
				const items = new Array();
				items.push(new MenuItem(0, strings.get('nextCard', [card, bet])));
				if (value < 13) {
				items.push(new MenuItem(0, strings.get('higher', )));
				}
				if (value > 1) {
				items.push(new MenuItem(1, strings.get('lower', )));
				}
				if (!first) {
				items.push(new MenuItem(2, strings.get('collect',)));
				} else {
				first = false;
				}
				so.directory = './sounds/';
				const dm = new Menu(strings.get('nextCard', [card, bet]), items);
				speech.speak('ok');
				dm.run(async s => {
						so.directory = './sounds/';
						switch (s.selected) {
						case 0:
						dm.destroy();
						answer = true;
						break;
						case 1:
						dm.destroy();
						answer = false;
						break;
						case 2:
						dm.destroy();
						await addCashSync(bet, 0);
						st.setState(2);
						resolve();
						bet = -1;
						return;
						}
						const nextCard = takeCard(deck);
						await utils.sleep(utils.randomInt(1000, 1900));
						speech.speak(nextCard[1] + '!');
						await utils.sleep(utils.randomInt(400, 800));
						if (nextCard[0].value < value && !answer) {
							bet += firstBet;
							pool.playStatic('hl_right', 0);
							await utils.sleep(utils.randomInt(100, 300));
							pool.playStatic('hl_crowdwin', 0);
							await utils.sleep(utils.randomInt(800, 1600));
							resolve();
						} else if (nextCard[0].value > value && answer) {
							bet += firstBet;
							pool.playStatic('hl_right', 0);
							await utils.sleep(utils.randomInt(100, 300));
							pool.playStatic('hl_crowdwin', 0);
							await utils.sleep(utils.randomInt(800, 1600));
							resolve();
						} else if (nextCard[0].value == value) {
							pool.playStatic('hl_equal', 0);
							await utils.sleep(utils.randomInt(100, 300));
							pool.playStatic('hl_crowdequal', 0);
							await utils.sleep(utils.randomInt(800, 1600));
							resolve();
						} else {
							pool.playStatic('hl_wrong', 0);
							await utils.sleep(utils.randomInt(100, 300));
							pool.playStatic('hl_crowdlose', 0);
							await utils.sleep(3400);
							st.setState(2);
							resolve();
							bet = -1;
						}
				});// Menu
		});// Promise
	}
}
export function takeCard(deck) {
	const card = deck[0];
	if (card.text == 'J') {
		card.value = 11;
	}
	if (card.text == 'Q') {
		card.value = 12;
	}
	if (card.text == 'K') {
		card.value = 13;
	}
	const str = strings.get('card', [strings.get(card.text), strings.get('c' + card.suite)]);
	console.log(str);
	return [card, str];
}
export async function playDouble() {
	if (data.beatcoins < 5000) {
		await new ScrollingText(strings.get('doublecash'));
		st.setState(2);
		return;
	}
	const answer = await questionSync('dq', [data.beatcoins]);
	if (!answer) {
		st.setState(2);
		return;
	}
	const old = data.beatcoins;
	so.directory = './sounds/';
	let snd = so.create('doub_intro');
	await snd.playSync();
	await addCashSync(0, data.beatcoins);
	const rand = utils.randomInt(1, 2);
	let win = false;
	if (rand == 1) {
		win = true;
	}
	sos();
	if (!win) {
		snd = so.create('doub_loser');
		await snd.playSync();
		await getAch('dl');
	} else if (win) {
		snd = so.create('doub_winner');
		await snd.playSync();
		await addCashSync(old * 2);
		await getAch('dw');
	}
	st.setState(2);
}

export async function playFootball() {
	so.directory = './sounds/' + lang + '/';
	const dir = so.directory;
	let loc;
	let kick;
	let st1 = 0;
	let st2 = 0;
	let sp;
	let bg;
	bg = so.create('bw_background', true);
	bg.loop = true;
	bg.play();
	const team1 = utils.randomInt(1, 10);
	let team2 = utils.randomInt(1, 10);
	while (team2 == team1) {
		team2 = utils.randomInt(1, 10);
	}
	bg.volume = 0.7;
	sp = so.create('bw_intro' + utils.randomInt(1, 3));
	await sp.playSync();
	sp = so.create('bw_team_' + team1 + '_1');
	await sp.playSync();
	sp = so.create('bw_vs');
	await sp.playSync();
	sp = so.create('bw_team_' + team2 + '_2');
	await sp.playSync();
	let turn = team1;
	const inp = new KeyboardInput();
	inp.init();
	while (st1 < 5 && st2 < 5) {
		let counter = 2;
		sp = so.create('bw_turn');
		await sp.playSync();
		sp = so.create('bw_team_' + turn + '_2');
		await sp.playSync();
		if (turn == team1) {
			sp = so.create('bw_where');
			await sp.playSync();
			while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
				if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
					counter -= 1;
					if (counter < 1) {
						counter = 1;
					}
					if (counter == 1) {
						loc = so.create('bw_left');
						loc.pan = -80 / 100;
						loc.play();
					}
					if (counter == 2) {
						loc = so.create('bw_center');
						loc.pan = 0;
						loc.play();
					}
					if (counter == 3) {
						loc = so.create('bw_right');
						loc.pan = 0.8;
						loc.play();
					}
				}
				if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
					counter += 1;
					if (counter > 3) {
						counter = 3;
					}
					if (counter == 1) {
						loc = so.create('bw_left');
						loc.pan = -80 / 100;
						loc.play();
					}
					if (counter == 2) {
						loc = so.create('bw_center');
						loc.pan = 0;
						loc.play();
					}
					if (counter == 3) {
						loc = so.create('bw_right');
						loc.pan = 80 / 100;
						loc.play();
					}
				}
				await utils.sleep(5);
			}
			const saving = utils.randomInt(1, 3);
			bg.volume = 0.3;
			kick = so.create('bw_chuta' + utils.randomInt(1, 4));
			if (counter == 1) {
				kick.pan = -80 / 100;
			}
			if (counter == 2) {
				kick.pan = 0;
			}
			if (counter == 3) {
				kick.pan = 80 / 100;
			}
			kick.play();
			await utils.sleep(220);
			let saved;
			if (counter == saving) {
				saved = so.create('bw_parar' + utils.randomInt(1, 3));
				if (saving == 1) {
					saved.pan = -80 / 100;
				}
				if (saving == 2) {
					saved.pan = 0;
				}
				if (saving == 3) {
					saved.pan = 80 / 100;
				}
				saved.play();
				await utils.sleep(300);
			} else {
				saved = so.create('bw_portero' + utils.randomInt(1, 2));
				if (saving == 1) {
					saved.pan = -80 / 100;
				}
				if (saving == 2) {
					saved.pan = 0;
				}
				if (saving == 3) {
					saved.pan = 80 / 100;
				}
				saved.play();
				await utils.sleep(200);
			}
			if (counter == saving) {
				sp = so.create('bw_paradon' + utils.randomInt(1, 3));
				sp.play();
				let crowd;
				crowd = so.create('bw_mal' + utils.randomInt(1, 3));
				await crowd.playSync();
				while (sp.playing) {
					await utils.sleep(5);
				}
				bg.volume = 0.7;
				await utils.sleep(700);
			}// Counter saving
			else {
				const falta = utils.randomInt(1, 4);
				if (falta == 1) {
					let falta;
					falta = so.create('bw_falta' + utils.randomInt(1, 7));
					if (counter == 1) {
						falta.pan = -80 / 100;
					}
					if (counter == 3) {
						falta.pan = 80 / 100;
					}
					if (counter == 2) {
						falta.pan = 0;
					}
					falta.play();
					await utils.sleep(400);
					sp = so.create('bw_falton' + utils.randomInt(1, 4));
					sp.play();
					let crowd;
					crowd = so.create('bw_cfalta' + utils.randomInt(1, 3));
					await crowd.playSync();
					while (sp.playing) {
						await utils.sleep(5);
					}
					await utils.sleep(400);
				} else {
					st1 += 1;
					sp = so.create('bw_sgol' + utils.randomInt(1, 7));
					sp.play();
					let crowd;
					crowd = so.create('bw_gol' + utils.randomInt(1, 6));
					await crowd.playSync();
					while (sp.playing) {
						await utils.sleep(5);
					}
					bg.volume = 0.6;
					sp = so.create('bw_marc' + utils.randomInt(1, 3));
					await sp.playSync();
					sp = so.create('bw_team_' + team1 + '_2');
					await sp.playSync();
					sp = so.create('bw_' + st1 + '_1');
					await sp.playSync();
					sp = so.create('bw_team_' + team2 + '_1');
					await sp.playSync();
					sp = so.create('bw_' + st2 + '_2');
					await sp.playSync();
				}// Falta
			}// Counter not saving
			turn = team2;
		}// My turn
		else {
			// Second turn
			sp = so.create('bw_dwhere');
			await sp.playSync();
			while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
				if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
					counter -= 1;
					if (counter < 1) {
						counter = 1;
					}
					if (counter == 1) {
						loc = so.create('bw_left');
						loc.pan = -80 / 100;
						loc.play();
					}
					if (counter == 2) {
						loc = so.create('bw_center');
						loc.pan = 0;
						loc.play();
					}
					if (counter == 3) {
						loc = so.create('bw_right');
						loc.pan = 80 / 100;
						loc.play();
					}
				}
				if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
					counter += 1;
					if (counter > 3) {
						counter = 3;
					}
					if (counter == 1) {
						loc = so.create('bw_left');
						loc.pan = -80 / 100;
						loc.play();
					}
					if (counter == 2) {
						loc = so.create('bw_center');
						loc.pan = 0;
						loc.play();
					}
					if (counter == 3) {
						loc = so.create('bw_right');
						loc.pan = 80 / 100;
						loc.play();
					}
				}
				await utils.sleep(5);
			}
			sp = so.create('bw_prepara' + utils.randomInt(1, 4));
			await sp.playSync();
			await utils.sleep(utils.randomInt(2000, 3800));
			const saving = utils.randomInt(1, 3);
			bg.volume = 0.3;
			kick = so.create('bw_chuta' + utils.randomInt(1, 4));
			if (saving == 1) {
				kick.pan = -80 / 100;
			}
			if (saving == 2) {
				kick.pan = 0;
			}
			if (saving == 3) {
				kick.pan = 80 / 100;
			}
			kick.play();
			await utils.sleep(220);
			let saved;
			if (counter == saving) {
				saved = so.create('bw_parar' + utils.randomInt(1, 3));
				if (saving == 1) {
					saved.pan = -80 / 100;
				}
				if (saving == 2) {
					saved.pan = 0 / 100;
				}
				if (saving == 3) {
					saved.pan = 80 / 100;
				}
				saved.play();
				await utils.sleep(300);
			} else {
				saved = so.create('bw_portero' + utils.randomInt(1, 2));
				if (counter == 1) {
					saved.pan = -80 / 100;
				}
				if (counter == 2) {
					saved.pan = 0 / 100;
				}
				if (counter == 3) {
					saved.pan = 80 / 100;
				}
				saved.play();
				await utils.sleep(200);
			}
			if (counter == saving) {
				if (typeof data.safeguards === 'undefined') {
					data.safeguards = 0;
				}
				data.safeguards += 1;
				save();
				sp = so.create('bw_paradon' + utils.randomInt(1, 3));
				sp.play();
				let crowd;
				crowd = so.create('bw_mal' + utils.randomInt(1, 3));
				await crowd.playSync();
				while (sp.playing) {
					await utils.sleep(5);
				}
				bg.volume = 0.7;
				await utils.sleep(700);
			}// Counter saving
			else {
				const falta = utils.randomInt(1, 4);
				if (falta == 1) {
					let falta;
					falta = so.create('bw_falta' + utils.randomInt(1, 7));
					if (counter == 1) {
						falta.pan = -80 / 100;
					}
					if (counter == 3) {
						falta.pan = 80 / 100;
					}
					if (counter == 2) {
						falta.pan = 0 / 100;
					}
					falta.play();
					await utils.sleep(400);
					sp = so.create('bw_falton' + utils.randomInt(1, 4));
					sp.play();
					let crowd;
					crowd = so.create('bw_cfalta' + utils.randomInt(1, 3));
					await crowd.playSync();
					while (sp.playing) {
						await utils.sleep(5);
					}
					await utils.sleep(400);
				} else {
					st2 += 1;
					sp = so.create('bw_sgol' + utils.randomInt(1, 7));
					sp.play();
					let crowd;
					crowd = so.create('bw_gol' + utils.randomInt(1, 6));
					await crowd.playSync();
					while (sp.playing) {
						await utils.sleep(5);
					}
					bg.volume = 0.7;
					sp = so.create('bw_marc' + utils.randomInt(1, 3));
					await sp.playSync();
					sp = so.create('bw_team_' + team1 + '_2');
					await sp.playSync();
					sp = so.create('bw_' + st1 + '_1');
					await sp.playSync();
					sp = so.create('bw_team_' + team2 + '_1');
					await sp.playSync();
					sp = so.create('bw_' + st2 + '_2');
					await sp.playSync();
				}// Falta
			}// Counter not saving
			turn = team1;
		}// Second turn
		if (inp.isJustPressed(KeyEvent.DOM_VK_ESCAPE)) {
			so.kill(() => {
					st.setState(2);
					});
			return;
		}
		await utils.sleep(5);
	}
	// Winning
	bg.volume = 0.3;
	sp = so.create('bw_ganador');
	await sp.playSync();
	await utils.sleep(utils.randomInt(500, 1200));
	if (st1 == 5) {
		sp = so.create('bw_team_' + team1 + '_2');
	}
	if (st2 == 5) {
		sp = so.create('bw_team_' + team2 + '_2');
	}
	await sp.playSync();
	const bg2 = so.create('bw_ganar');
	bg2.volume = 0.4;
	bg.stop();
	bg2.loop = true;
	bg2.play();
	let himno;
	if (st1 == 5) {
		himno = so.create('bw_himno' + team1);
	}
	if (st2 == 5) {
		himno = so.create('bw_himno' + team2);
	}
	await himno.playSync();
	bg.stop();
	bg2.stop();
	sp.stop();
	himno.stop();
	if (st2 == 5) {
		await getAch('fl');
	}
	if (st1 == 5) {
		await getAch('fw');
	}
	so.kill(() => {
			st.setState(2);
			});
}

export async function playPong() {
	sos();
	pongnotify = false;
	const sp = so.create('pong_beep');
	sp.play();
	await utils.sleep(500);
	sp.play();
	await utils.sleep(500);
	sp.play();
	await utils.sleep(500);
	const fs = require('fs');
	let actions = 0;
	pongmusic = so.create('pong_music');
	pongmusic.loop = true;
	pongmusic.volume = 0.8;
	pongmusic.pitch = 1;
	pongmusic.play();
	for (let i = 1; i <= 10; i++) {
		if (fs.existsSync(packdir + 'a' + i + '.ogg')) {
			actions = i;
		}
	}
	gametimer = Timer({update(dt) {
			pongloop(dt, actions);
			}, render() {
			pongrender();
			}}, 1 / 60);
	pongtimer.restart();
	current = 1;
	gametimer.start();
	pongright = 0;
	time = 2100;
	pongmiss = 0;
}
var time = 1000;
let pongright = 0;
let pongmiss = 0;
function pongrender() {
}
function pongloop(dt, actions) {
	if (current < 2) {
		current = utils.randomInt(2, actions);
		sop();
		ps = so.create('a' + current);
		sos();
		ps.play();
	} else {
		if (pongtimer.elapsed >= time / 2 && !pongnotify) {
			pongnotify = true;
			ps.pitch += 0.07;
			ps.play();
		} else if (pongtimer.elapsed >= time) {
			pin.justPressedEventCallback = null;
			pin.justPressedEventCallback = null;
			ps.stop();
			pongmusic.sound.fade(0, 0.3);
			pongpool.playStatic('pong_end', 0);
			pongtimer.restart();
			gametimer.stop();
			const end = so.create('pong_endbgm');
			end.play();
			end.sound.once('ended', async () => {
					pin.justPressedEventCallback = null;
					await new ScrollingText(strings.get('pongend', [pongright, pongmiss]));
					if (pongright == 0 && pongmiss > 0) {
					await getAch('pongfail');
					}
					if (pongright > 25) {
					await getAch('pongfire');
					}
					let cashToAdd = 0;
					cashToAdd += pongright * 60;
					cashToAdd -= pongmiss * 70;
					if (cashToAdd < 0) {
					cashToAdd = 0;
					}
					await addCashSync(cashToAdd);
					so.kill(() => {
							st.setState(2);
							});
					});
		}
		pin.justPressedEventCallback = evt => {
			if (event.which != actionKeys[data.actionLimit+current]) {
				pongpool.playStatic('pong_fail', 0);
				pongmiss++;
				time -= 25;
			}
			if (event.which == actionKeys[data.actionLimit+current]) {
				pongpool.playStatic('pong_bell', 0);
				time -= 30;
				current = 1;
				pongnotify = false;
				ps.stop();
				pongmusic.pitch += 0.01;
				pongright += 1;
				pongtimer.restart();
			}
		};
	}
}
export async function playGo() {
	sos();
	const going = new GoGame();
	await going.init();
}
class GoGame {
	constructor() {
		this.th1 = 1980;
		this.th2 = 2015;
		this.th3 = 2025;
		this.inp = new KeyboardInput();
		this.inp.init();
		this.combo = 0;
		this.score = 0;
		this.turns = 5;
		this.maxTurns = 5;
		const that = this;
		this.timer = Timer({update(dt) {
				// This.update();
				}, render() {
				that.loop();
				}});
		this.pool = new SoundHandler();
		this.time = new OldTimer();
		this.notify = 0;
		this.curscore = 0;
		this.beep = so.create('go_count');
		this.beep2 = so.create('go_count');
		this.beep2.playbackRate = 1.4;
	}

	async init() {
		await new ScrollingText(strings.get('goIntro'));
		this.time.restart();
		this.timer.start();
	}

	update() {
	}

	loop() {
		if (this.inp.isJustPressed(KeyEvent.DOM_VK_SPACE)) {
			this.pool.playStatic('go_shoot', 0);
			this.elapsedTime = this.time.elapsed;
			if (this.elapsedTime >= 2000 && this.elapsedTime < 2006) {
				this.elapsedTime = 2000;
			}
			console.log('time ' + this.elapsedTime);
			if (this.elapsedTime == 2000) {
				this.curscore = 2000;
				this.pool.playStatic('go_exact', 0);
				this.turns++;
				this.maxTurns++;
				this.combo++;
				this.timer.stop();
				new ScrollingText(strings.get('goExact', [this.turns - 1]), '\n', async () => {
						if (this.combo > 1) {
						this.pool.playStatic('go_combo', 0);
						await new ScrollingText(strings.get('combo', [this.combo, this.curscore * this.combo]));
						this.curscore = this.curscore + (this.curscore * this.combo);
						}
						this.score += this.curscore;
						this.newTurn();
						});
			} else if (this.elapsedTime <= this.th1) {
				let timeDisplay = (this.elapsedTime+1000) / 1000;
				timeDisplay = timeDisplay.toFixed(3);
				this.pool.playStatic('go_early', 0);
				this.combo = 0;
				this.timer.stop();
				this.score += this.curscore;
				new ScrollingText(strings.get('goEarly', [timeDisplay, this.turns - 1]), '\n', () => {
						this.newTurn();
						});
			} else if (this.elapsedTime > this.th1 && this.elapsedTime < this.th2) {
				let timeDisplay = (this.elapsedTime+1000) / 1000;
				timeDisplay = timeDisplay.toFixed(3);
				const scoreFormula = Math.round(100 - (2000 - this.elapsedTime)) * 8;
				this.curscore = scoreFormula;
				this.pool.playStatic('go_ok', 0);
				this.combo++;
				this.timer.stop();
				new ScrollingText(strings.get('goOk', [timeDisplay, this.curscore, this.turns - 1]), '\n', async () => {
						if (this.combo > 1) {
						this.pool.playStatic('go_combo', 0);
						await new ScrollingText(strings.get('combo', [this.combo, this.curscore * this.combo]));
						this.curscore = this.curscore + (this.curscore * this.combo);
						}
						this.score += this.curscore;
						this.newTurn();
						});
			} else if (this.elapsedTime > this.th2 && this.elapsedTime < this.th3) {
				let timeDisplay = (this.elapsedTime+1000) / 1000;
				timeDisplay = timeDisplay.toFixed(3);
				const scoreFormula = Math.round(100 - (this.elapsedTime - 2000)) * 8;
				this.combo++;
				this.curscore = scoreFormula;
				this.pool.playStatic('go_ok', 0);
				this.timer.stop();
				new ScrollingText(strings.get('goOk', [timeDisplay, this.curscore, this.turns - 1]), '\n', async () => {
						if (this.combo > 1) {
						this.pool.playStatic('go_combo', 0);
						await new ScrollingText(strings.get('combo', [this.combo, this.curscore * this.combo]));
						this.curscore = this.curscore + (this.curscore * this.combo);
						}
						this.score += this.curscore;
						this.newTurn();
						});
			}
		}// Enter pressed
		if (this.time.elapsed >= 0 && this.notify == 0) {
			this.notify++;
			this.beep.play();
		} else if (this.time.elapsed >= 1000 && this.notify == 1) {
			this.beep2.play();
			this.notify++;
		} else if (this.time.elapsed >= this.th3 && this.notify == 2) {
			this.pool.playStatic('go_late', 0);
			this.combo = 0;
			this.timer.stop();
			new ScrollingText(strings.get('goLate', [this.turns - 1]), '\n', () => {
					this.newTurn();
					});
		}
	}

	newTurn() {
		this.curscore = 0;
		this.turns--;
		this.notify = 0;
		if (this.turns < 1) {
			new ScrollingText(strings.get('goOver', [this.score, this.maxTurns]), '\n', () => {
					addCash(Math.ceil(this.score / 2), 0, () => {
							so.kill(() => {
									st.setState(2);
									});
							});
					});
		} else {
			this.time.restart();
			this.timer.start();
		}
	}
}
export async function playQuestions() {
	const q = new QuestionsGame();
	if (!q.stop) await q.init();
}
class QuestionsGame {
	constructor() {
this.stop=false;
		this.packs = 0;
		this.packnames = [];
		for (const i in data.unlocks) {
			if (data.unlocks[i].level > 1) {
				this.packs++;
				this.packnames.push(i);
			}
		}
		if (this.packs < 5) {
this.stop=true;
new ScrollingText(strings.get('need5'), '\n', () => {

					st.setState(2);
return;
					});
		}
if (this.stop) return;
		this.songs = {};
		this.correct = 0;
		sos();
		this.wrong = 0;
		this.good = so.create('gq_ok');
		this.goodc = so.create('gq_oc');
		this.bad = so.create('gq_wrong');
		this.badc = so.create('gq_wc');
		for (let i = 0; i < 10; i++) {
			this.songs[i] = {};
			const rand = this.packnames[utils.randomInt(0, this.packs - 1)];
			this.songs[i].pack = rand;
			const rand2 = utils.randomInt(1, data.unlocks[rand].level);
			this.songs[i].level = rand2;
			console.log('rand' + rand2);
		}
	}

	async init() {
if (this.stop) return;
		const os = require('os');
		sos();
		const suspense = so.create('gq_intro');
		suspense.play();
		await utils.sleep(1500);
		await new ScrollingText(strings.get('gq_welcome'));
		for (let i = 0; i < 10; i++) {
			this.options = [];
			this.options.push(new MenuItem(this.songs[i].pack, this.songs[i].pack));
			this.packnames = utils.shuffle(this.packnames);
			let otherOptions = 0;
			const str = this.songs[i].pack;
			let num = 0;
			while (otherOptions < 4) {
				if (str == this.packnames[num]) {
					num++;
				} else {
					this.options.push(new MenuItem(this.packnames[num], this.packnames[num]));
					num++;
					otherOptions++;
				}
			}
			so.directory = packDirectory + '/' + this.songs[i].pack + '/';
			const sndd = so.create(this.songs[i].level + 'music');
			sndd.volume = 0.4;
			sndd.loop = true;
			sndd.play();
			this.options = utils.shuffle(this.options);
			sos();
			const choice = new Menu(strings.get('pq'), this.options);
			const result = await choice.runSync();
			sndd.stop();
			if (result == this.songs[i].pack) {
				this.good.play();
				await this.goodc.playSync();
				this.correct++;
			} else {
				this.bad.play();
				await this.badc.playSync();
				this.wrong++;
			}
		}
		await new ScrollingText(strings.get('gq_end', [this.correct, this.wrong]));
		so.kill(() => {
				st.setState(2);
				});
	}
}
class Case {
constructor(amount,type,theID) {
this.random=theID;
this.amount=amount;
this.type=type;
if (type==1) this.letter="b";
if (type==2) this.letter="s";
return;
}
menuItem() {
return new AudioItem(this.random,"case"+this.random);
}
getValue() {
if (this.type==1) return this.amount;
if (this.type==2) return this.amount*750;
}
async award() {
if (this.type==2) {
data.safeguards+=this.amount;
await new ScrollingText(strings.get("safeget",[this.amount]));
save();
}
if (this.type==1) await addCashSync(this.amount);
save();
}
}
export class Cases {
constructor() {
this.cases=[];
this.cases.push(new Case(1,1,0));
this.cases.push(new Case(7,1,1));
this.cases.push(new Case(9,1,2));
this.cases.push(new Case(10,1,3));
this.cases.push(new Case(13,1,4));
this.cases.push(new Case(25,1,5));
this.cases.push(new Case(50,1,6));
this.cases.push(new Case(69,1,7));
this.cases.push(new Case(100,1,8));
this.cases.push(new Case(500,1,9));
this.cases.push(new Case(1000,1,10));
this.cases.push(new Case(7000,1,11));
this.cases.push(new Case(15000,1,12));
this.cases.push(new Case(25000,1,13));
this.cases.push(new Case(40000,1,14));
this.cases.push(new Case(50000,1,15));
this.cases.push(new Case(75000,1,16));
this.cases.push(new Case(100000,1,17));
this.cases.push(new Case(1,2,18));
this.cases.push(new Case(2,2,19));
this.cases.push(new Case(3,2,20));
this.cases.push(new Case(5,2,21));
this.cases.push(new Case(10,2,22));
this.cases.push(new Case(50,2,23));
this.cases.push(new Case(69,2,24));
this.turn=23;
this.offer1=so.create("case_offer1");
this.offer2=so.create("case_offer2");
this.offer3=so.create("case_offer3");
}
async start() {
sos();
let debug=true;
if (debug) speech.webTTS=false;
	if (!debug) {
this.introCroud=so.create("case_cintro");
this.intro=so.create("case_intro"+lang);
this.intro.play();
await utils.sleep(300);
await this.introCroud.playSync(true);
this.intro.destroy();
}

//shuffle ids
let ids=[];
ids.splice(0,ids.length);
for (let i=0;i<this.cases.length;i++) {
ids.push(i);
}
ids=utils.shuffle(ids);
for (let i=0;i<this.cases.length;i++) {
this.cases[i].random=ids[i];
this.cases[i].sound=so.create(lang+"ca"+this.cases[i].letter+this.cases[i].amount);
this.cases[i].vocal=so.create("casec"+this.cases[i].random+"_"+lang);
this.cases[i].intro=so.create("case"+this.cases[i].random);
}
this.cases=utils.shuffle(this.cases);
this.caseSounds=[];
this.caseSounds.splice(0,this.caseSounds.length);
for (let i=0;i<this.cases.length;i++) {
this.caseSounds.push(this.cases[i].menuItem());
}
let mycase=new Menu("case_choose"+lang,this.caseSounds);
mycase.silent=true;
this.caseID=await mycase.runSync();
this.myCase=this.findCase(this.caseID);
this.removeCase(this.myCase,"first");
await utils.sleep(800);
this.intro=so.create("case_begin"+lang);
await this.intro.playSync(true);
this.intro=so.create("casec"+this.caseID+"_"+lang)
 this.intro.play();
this.introCroud=so.create("case_cintro");
await utils.sleep(400);
 this.introCroud.play();
 await utils.sleep(2500);
 this.playSound=so.create("case_play"+lang);
 await this.playSound.playSync(true);
 this.introCroud.destroy();
 this.intro.destroy();
this.music=so.create("case_music");
this.music.loop=true;
this.music.play();
this.miscSounds=[];
this.stinger=so.create("case_stinger");
this.bankSound=so.create("case_offer");
for (let i=0;i<3;i++) {
this.miscSounds.push(so.create("case_tension"+(i+1)));
}
for (let i=3;i<8;i++) {
	this.miscSounds.push(so.create("case_open"+(i-2)+lang));
}
for (let i=1;i<4;i++) {
	this.miscSounds.push(so.create("case_cr"+i));
}
this.max=100000;
this.maxType="b";
for (this.turn=1;this.turn<=23;this.turn++) {
	this.music.pitch+=0.01;
this.miscSounds[utils.randomInt(3,7)].play();
this.caseSounds=[];
this.caseSounds.splice(0,this.caseSounds.length);
this.sortRemaining();
let str=strings.get("remaining");
if (this.sortedBeatcoins.length>1) {
str+=strings.get("b");
for (let i=0;i<this.sortedBeatcoins.length;i++) {
str+=this.sortedBeatcoins[i]+", ";
}
}
if (this.sortedSafeguards.length>1) {
str+=strings.get("s");
for (let i=0;i<this.sortedSafeguards.length;i++) {
str+=this.sortedSafeguards[i]+", ";
}
}
this.caseSounds.push(new MenuItem(-1,str));
for (let i=0;i<this.cases.length;i++) {
if (this.cases[i].random!="") this.caseSounds.push(this.cases[i].menuItem());
}
let choices=new Menu(" ",this.caseSounds)
choices.silent=true;
let mycase=-1;
while (mycase==-1) {
mycase=await choices.runSync();
if (mycase==-1) {
continue;
}
this.music.volume=0.5;
if (this.turn>0 && this.turn<15) await this.miscSounds[0].playSync();
if (this.turn>=15 && this.turn<20) await this.miscSounds[1].playSync();
if (this.turn>=20 && this.turn<24) await this.miscSounds[2].playSync();
let theCase=this.findCase(mycase);
theCase.sound.play();
await utils.sleep(800);
if (theCase.getValue()>0 && theCase.getValue()<15000) {
	this.miscSounds[10].play();
await utils.sleep(600);
}
else if (theCase.getValue()>=15000 && theCase.getValue()<50000) {
this.miscSounds[9].play();
await utils.sleep(600);
}
else if (theCase.getValue()>=50000) {
	this.stinger.play();
this.miscSounds[8].play();
await utils.sleep(600);
}
this.removeCase(theCase,"second");
if (theCase.getValue()>=this.max) {
//get new max
this.max=0;
for (let i=0;i<this.cases.length;i++) {
if (this.cases[i].random=="") continue;
if (this.cases[i].getValue()>this.max) {
this.max=this.cases[i].getValue();
this.maxType=this.cases[i].letter;
}//value greater than max
}//for
if (this.myCase.getValue()>this.max) {
this.max=this.myCase.getValue();
this.maxType=this.myCase.letter;
}//value greater than max
if ((this.max>5000) || (this.maxType=="s" && this.max>25)) {
await utils.sleep(2500);
this.spokenMax=this.max;
if (this.maxType=="s") this.spokenMax=this.max/750;
speech.speak(strings.get("stillGet",[this.spokenMax,strings.get(this.maxType)]));
}
}//if max
this.sortRemaining();

await utils.sleep(utils.randomInt(3000,3500));
if (this.bankCall()>0) {
	await this.bankSound.playSync();
	await utils.sleep(utils.randomInt(500,800));
let offer=this.bankCall();
if (offer>0 && offer<10000) {
this.offer1.play();
}
else if (offer>=10000 && offer<40000) {
this.offer2.play();
await utils.sleep(300);
}
else if (offer>=40000) {
this.offer3.play();
await utils.sleep(700);
}
let prize=utils.randomInt(1,10);
	let answer=await questionSync("bankOffer",[this.bankCall(),strings.get("prize"+prize)]);
	this.music.volume=1;
this.banked=answer;
if (answer) {
this.music.stop();
	this.coward=so.create("case_coward"+lang);
	await this.coward.playSync();
		await addCashSync(this.bankCall(),0);
sos();
if (prize==7) {
await new ScrollingText(strings.get("creditPrize"));
data.missionCredits++;
save();
}
	this.turn=30;
}//answer
}//bank
else {
	this.music.volume=1;
}
}//while
}//for
this.music.stop();
if (!this.banked) {
this.snd=so.create("case_winning"+lang);
await this.snd.playSync();
let theCase=this.myCase;
theCase.sound.play();
await utils.sleep(500);
if (theCase.getValue()>0 && theCase.getValue()<40000) {
	this.miscSounds[8].play();
this.jingle=so.create("case_loser");
}
else if (theCase.getValue()>=40000 && theCase.getValue()<100000) {
this.miscSounds[9].play();
this.jingle=so.create("case_winner");
}
else if (theCase.getValue()>=100000) {
this.miscSounds[10].play();
this.jingle=so.create("case_winner100");
}
await this.jingle.playSync();
await this.myCase.award();
} //if banking
st.setState(2);
}//function
average() {
let avg=0;
for (let i=0;i<this.cases.length;i++) {
avg+=this.cases[i].getValue();
}
return avg;
}
bankCall() {
let bankTurns=[4,7,10,13,15,17,19,21,22,23];
if (bankTurns.includes(this.turn)) {
let avg=0;
for (let i=0;i<this.cases.length;i++) {
avg+=this.cases[i].getValue();
}
avg+=this.myCase.getValue();
avg=avg/this.cases.length+1;
let calc=Math.floor(utils.percentOf((this.turn+1)*4,avg));
return calc;
}
return 0;
}
removeCase(whichCase,wtf) {
let index=this.cases.indexOf(whichCase);
this.cases[index].random="";
console.log("removed",index,wtf);
}
sortRemaining() {
this.sortedBeatcoins=[];
this.sortedSafeguards=[];
if (this.myCase.type==1) this.sortedBeatcoins.push(this.myCase.amount);
if (this.myCase.type==2) this.sortedSafeguards.push(this.myCase.amount);
for (let i=0;i<this.cases.length;i++) {
if (this.cases[i].random=="") continue;
if (this.cases[i].letter=="b") this.sortedBeatcoins.push(this.cases[i].amount);
if (this.cases[i].letter=="s") this.sortedSafeguards.push(this.cases[i].amount);
}
this.sortedBeatcoins.sort(utils.numericSort);
this.sortedSafeguards.sort(utils.numericSort);
}
findCase(whichCase,wtf) {
for (let i=0;i<this.cases.length;i++) {
if (this.cases[i].random==whichCase) {
console.log("Found");
return this.cases[i];
}
}
}
}