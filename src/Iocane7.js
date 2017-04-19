import MarkovPredictor from './MarkovPredictor';
import FrequencyPredictor from './FrequencyPredictor';
import MetaPredictor from './MetaPredictor';
import RandomPredictor from './RandomPredictor';
import PredictionBlender from './PredictionBlender';
import {INDEX, MOVES} from './Util';

export default class Iocane7 {

	constructor() {
		this.lastOutput;
		this.playHistory = [];
		this.model = new PredictionBlender([
			new MetaPredictor(new MarkovPredictor()),
			new MetaPredictor(new FrequencyPredictor(0.9)),
			new MetaPredictor(new FrequencyPredictor(0.8)),
			new MetaPredictor(new FrequencyPredictor(0.5)),
			new RandomPredictor()
		]);
	}

	predict(otherSideLastInput) {
		if(otherSideLastInput) {
			let us = INDEX[this.lastOutput]
			let them = INDEX[otherSideLastInput]
			this.playHistory.push(them);
			this.model.update(this.playHistory);
			this.playHistory.push(us);
		}
		this.lastOutput = MOVES[this.model.predict(this.playHistory)];
		return this.lastOutput;
	}
	
}