import {GOOD_AGAINST, BAD_AGAINST, belief} from './Util';

export default class FrequencyPredictor {

	constructor(k=1) {
		this.k = k;
		this.counts = [0, 0, 0];
	}

	update(moveHistory) {
		this.counts[moveHistory[moveHistory.length - 1]]++;
		for (let ele of this.counts) {
			ele = ele*this.k;
		}
	}

	predictions() {
		let p = belief(this.counts);
		let scores = [0, 1, 2].map(m => p[BAD_AGAINST[m]] - p[GOOD_AGAINST[m]] );
		let max = Math.max(...scores);
		return [scores.indexOf(max)];
	}
	
}