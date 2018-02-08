'use strict'
class StateMachine {
	constructor() {
		this.state = 0;
		this.currentState = 0;
	}
	
	setState(state) {
		if (this.state == 1) {
			this.currentState = new Game();
			this.state = state;
		}
		
		
		
	}
	
}

exports StateMachine;