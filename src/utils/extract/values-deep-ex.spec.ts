import { valuesDeepEx } from './values-deep-ex';


describe('valuesDeepEx', () => {
	it('returns all values from object and sub-objects', () => {
		const o = {
			a: [[1], null, { b: true }],
			c: {
				d: false,
				e: 2,
			},
		};

		expect(valuesDeepEx(o)).to.be.eql([
			[[1], null, { b: true }],
			false,
			2,
		]);
	});

	it('returns null if input is not an object', () => {
		// @ts-ignore
		expect(valuesDeepEx('wot?!')).to.be.null;
	});
});
