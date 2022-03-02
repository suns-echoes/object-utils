import { valuesDeep } from './values-deep';


describe('valuesDeep', () => {
	it('returns all values from object and sub-objects', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(valuesDeep(o)).to.be.eql([1, null, true, false, 2]);
	});

	it('returns null if source is not an object', () => {
		// @ts-ignore
		expect(valuesDeep('wot?!')).to.be.null;
	});
});
