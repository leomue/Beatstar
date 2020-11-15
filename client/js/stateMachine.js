import { dbg } from './main';
import { report } from './main';
const intro = so.create('logo');
import { KeyboardInput } from './input';
import { credits, listenPack, checkPack, learnPack, browsePacks } from './main';
import { Menu } from './menuHandler';
import { so } from './soundObject';
import { KeyEvent } from './keycodes';
import { Game } from './game';
import { mainMenu } from './menuHandler';

'use strict';
let event = new KeyboardInput();

class StateMachine {
	constructor() {
		this.state = 0;
		this.currentState = 0;
	}

	setState(state) {
		let kd=event => {
			if (event.which == KeyEvent.DOM_VK_D) dbg = true;
			if (event.which == KeyEvent.DOM_VK_SPACE || event.which == KeyEvent.DOM_VK_ESCAPE || event.which == KeyEvent.DOM_VK_RETURN) {
				intro.unload();
document.removeEventListener('keydown',kd);
				this.setState(20);
			}
		}
		try {
			if (state == 1) {
				event = new KeyboardInput();
				event.init();
				
				const that = this;
				intro.volume = 0.5;
				intro.play();
				intro.sound.once('ended', () => {
					intro.unload();
document.removeEventListener('keydown',kd);
					that.setState(2);
				});
				document.addEventListener('keydown',kd
);
				this.state = state;
			} else if (state == 2) {
				event = null;
				checkPack();
				this.state = state;
			} else if (state == 21) {
				this.currentState = new Game(credits, 2);
				this.state = state;
			} else if (state == 3) {
				this.currentState = new Game(credits);
				this.state = state;
			} else if (state == 20) {
				event = null;
				checkPack(false);
				this.state = state;
			} else if (state == 4) {
				learnPack();
			} else if (state == 7) {
				listenPack();
			}
			// New states
			else if (state == 5) {
				browsePacks();
				this.state = state;
			} else if (state == 6) {
				browsePacks(2);
				this.state = state;
			} else if (state == 8) {
				browsePacks(3);
				this.state = state;

			}//if
		} catch (err) {
			report(err);
		}

	}
}//function
const st = new StateMachine();
export { st };
