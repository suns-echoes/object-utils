import { keyOf } from './key-of';


describe('keyOf', () => {
	it('returns key of searched element', () => {
		const e = {};
		const o = { a: 1, b: false, c: 8, d: null, e, f: undefined };

		expect(keyOf(o, e)).to.be.equal('e');
	});

	it('returns undefined if element is not found', () => {
		const e = {};
		const o = { a: 1, b: false, c: 8, d: null, e: '', f: undefined };

		expect(keyOf(o, e)).to.be.undefined;
	});
});
