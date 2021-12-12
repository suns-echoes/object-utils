import { every } from './every';

describe('every', () => {
	it('returns true if every property passes the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(every(o, (property, key, obj) => property !== true && obj[key] === property)).to.be.true;
	});

	it('returns false if any of the properties fail the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(every(o, (property) => property === 'alien')).to.be.false;
	});
});
