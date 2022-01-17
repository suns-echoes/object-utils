import { templateStrict } from './template-strict';


describe('templateStrict', () => {
	it('returns templateStrict from object', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(templateStrict(o)).to.be.eql({ c: {} });
	});

	it('returns null for array input', () => {
		expect(templateStrict([[[1]]])).to.be.eql(null);
	});

	it('returns null for non-object input', () => {
		// @ts-ignore
		expect(templateStrict('wot?!')).to.be.null;
	});
});
