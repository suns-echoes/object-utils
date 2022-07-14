import { findAll } from './find-all';


describe('findAll', () => {
	it('returns all properties that passes the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined, dd: null };

		expect(findAll(o, (property, key, obj) => (property === null && property === obj[key]))).to.be.eql([null, null]);
	});

	it('returns undefined if none of the properties pass the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(findAll(o, (property) => (property === 'alien'))).to.be.eql([]);
	});
});
