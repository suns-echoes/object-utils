import { findAllKeys } from './find-all-keys';


describe('findAllKeys', () => {
	it('returns keys of searched properties', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined, dd: null };

		expect(findAllKeys(o, (property, key, obj) => (property === null && property === obj[key]))).to.be.eql(['d', 'dd']);
	});

	it('returns undefined if no property is not found', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(findAllKeys(o, (property) => (property === 'alien'))).to.be.eql([]);
	});
});
