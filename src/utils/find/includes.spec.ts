import { includes } from './includes';

describe('includes', () => {
	it('returns key of searched element', () => {
		const e = {};
		const o = { a: 1, b: false, c: 8, d: null, e, f: undefined };

		expect(includes(o, e)).to.be.true;
	});

	it('returns undefined if element is not found', () => {
		const e = {};
		const o = { a: 1, b: false, c: 8, d: null, e: '', f: undefined };

		expect(includes(o, e)).to.be.false;
	});
});
