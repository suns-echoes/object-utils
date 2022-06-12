import { templateEx } from './template-ex';


describe('templateEx', () => {
	it('returns templateEx from object', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(templateEx(o)).to.be.eql({ c: {} });
	});

	it('returns null for array input', () => {
		expect(templateEx([[[1]]])).to.be.eql(null);
	});

	it('returns null for non-object input', () => {
		// @ts-ignore
		expect(templateEx('wot?!')).to.be.null;
	});
});
