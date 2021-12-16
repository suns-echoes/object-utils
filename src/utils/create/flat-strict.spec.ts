import { flatStrict } from './flat-strict';

describe('flatStrict', () => {
	it('returns flatten object', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(flatStrict(o)).to.be.eql({
			'a':   [1, null, { b: true }],
			'c.d': false,
			'c.e': 2,
		});
	});

	it('returns null if source is not an object or is an array', () => {
		// @ts-ignore
		expect(flatStrict('wot?!')).to.be.null;
		expect(flatStrict(['wot?!'])).to.be.null;
	});
});
