import { flat } from './flat';

describe('flat', () => {
	it('returns flatten object', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(flat(o)).to.be.eql({
			'a.0':   1,
			'a.1':   null,
			'a.2.b': true,
			'c.d':   false,
			'c.e':   2,
		});
	});

	it('returns null if source is not an object', () => {
		// @ts-ignore
		expect(flat('wot?!')).to.be.null;
	});
});
