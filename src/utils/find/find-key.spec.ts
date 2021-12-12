import { findKey } from './find-key';

describe('findKey', () => {
	it('returns key of searched property', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(findKey(o, (property, key, obj) => (property === null && property === obj[key]))).to.be.equal('d');
	});

	it('returns undefined if property is not found', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(findKey(o, (property) => (property === 'alien'))).to.be.undefined;
	});
});
