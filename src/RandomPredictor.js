export default class RandomPredictor {
	constructor() {}
	update() {}
	predictions() {
		return [{
			value: Math.floor(Math.random() * 3),
			rank: 0
		}];
	}
}