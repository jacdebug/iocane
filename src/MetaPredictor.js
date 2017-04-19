import {GOOD_AGAINST, BAD_AGAINST, belief} from './Util';

export default class MetaPredictor {

	constructor(predictor) {
		this.predictor = predictor;
		this.last_predictions = [];
		this.counts = [];
	}

	update(his) {
		while (this.counts.length < this.last_predictions.length) {
			const temp = [];
			for (let i of [0, 0, 0]) temp.push([i, i, i]);
			this.counts.push(temp);
		}

		let s = his[his.length - 1];
		let jj = 0;
		for (let counts of this.counts) {
			for (let [i, count] of counts.entries()) {
				const m = (this.last_predictions[jj] + i) % 3;
				if (m === GOOD_AGAINST[s])
					{count[2] += 1;}
				else if (m === BAD_AGAINST[s])
					{count[0] += 1;}
				else
					{count[1] += 1;}
			}
			jj++;
		}

		this.predictor.update(his);
	}

	predictions(his) {
		let ret = [];
		this.last_predictions = this.predictor.predictions(his);
		let jj = 0;
		for (let counts of this.counts) {
			for (let [i, count] of counts.entries()) {
				const ml22 = (this.last_predictions[jj] + i) % 3;
				const p = belief(count);
				ret.push({
					value: ml22,
					rank: p[2] - p[0]
				});
			}
			jj++;
		}
		return ret;
	}

}