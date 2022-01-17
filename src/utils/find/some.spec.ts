import { some } from './some';


describe('some', () => {
	it('returns true if any property passes the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(some(o, (property, key, obj) => property === null && obj[key] === property)).to.be.true;
	});

	it('returns false if all of the properties fail the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(some(o, (property) => property === 'alien')).to.be.false;
	});
});
