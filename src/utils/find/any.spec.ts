import { any } from './any';

describe('any', () => {
	it('returns true if any property passes the test', () => {
		const o: AnyObject = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(any(o, (property, key, obj) => property === null && obj[key] === property)).to.be.true;
	});

	it('returns false if all of the properties fail the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(any(o, (property) => property === 'alien')).to.be.false;
	});
});
