export const INDEX = { R: 0, P: 1, S: 2 };
export const MOVES = ['R', 'P', 'S'];
export const GOOD_AGAINST = [INDEX.P, INDEX.S, INDEX.R];
export const BAD_AGAINST = [INDEX.S, INDEX.R, INDEX.P];
export const AGES = [1, 2, 4, 16, 64, 256, Infinity];

export function belief(counts) {
	counts = counts.map(ele => (ele + 0.2) * Math.random());
	const sum = counts.reduce((a, b) => a + b);
	return counts.map(n => n / sum);
}

