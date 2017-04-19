import {INDEX, AGES} from './Util';

export default class MarkovPredictor {

	constructor() {
		this.length = 0;
		this.seen = null;
		this.children = null;
	}

	update(his) {
		let s = his[his.length - 1];
		let l = his.length;
		let i = l - 2;
		let d = 0;
		let stop = false;
		let self = this;

		while (d < 15) {
			self.seen = s;
			self.length = l;
			if (i < 0 || stop) { return; }
			if (self.children === null) {
				self.children = Array(3);
			}
			let m = his[i];
			let child = self.children[m];
			if (!child) {
				stop = true;
				self.children[m] = new MarkovPredictor();
			}
			self = self.children[m];
			i -= 1;
			d += 1;
		}
	}

	predictions(his) {
		let l = his.length;
		let i = l - 1;
		let j = 0;
		let results = [];
		let seen = INDEX.R;
		let self = this;

		while (self && self.seen !== null) {
			if ((l - self.length) > AGES[j]) {
				j += 1;
				results.push(seen);
			}
			seen = self.seen;
			if (self.children === null) {
				break;
			}
			self = self.children[his[i]];
			i -= 1;
		}

		while (results.length < AGES.length) {
			results.push(seen);
		}

		return results;
	}

}