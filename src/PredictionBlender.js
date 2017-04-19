export default class PredictionBlender {

	constructor(predictors) {
		this.predictors = predictors;
	}

	update(his) {
		for ( let predictor of this.predictors) {
			predictor.update(his);
		}
	}
	
	predict(his) {
		let resoptions = [];
		for ( let predictor of this.predictors) {
			resoptions = resoptions.concat(predictor.predictions(his));
		}
		return resoptions.reduce((a,b) => a.rank < b.rank? b: a).value;
	}
	
}