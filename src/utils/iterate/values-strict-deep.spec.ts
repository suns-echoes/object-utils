import { valuesStrictDeep } from './values-strict-deep';

describe('valuesStrictDeep', () => {
	it('returns all values from object and sub-objects', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(valuesStrictDeep(o)).to.be.eql([[1, null, { b: true }], false, 2]);
	});

	it('returns null if source is not an object', () => {
		// @ts-ignore
		expect(valuesStrictDeep('wot?!')).to.be.null;
	});
});
