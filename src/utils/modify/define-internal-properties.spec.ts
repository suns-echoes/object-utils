import { defineInternalProperties } from './define-internal-properties';


describe('defineInternalProperties', () => {
	it('returns modified target object', () => {
		const o: AnyObject = {};
		const k = Symbol();
		const p = {
			gotIt: {
				enumerable: true,
				value:      true,
			},
			hideIt: {
				value: false,
			},
		};

		defineInternalProperties(o, k, p);

		expect(o[k]).to.be.eql({ gotIt: true });
		expect(o[k].hideIt).to.be.false;
		expect(o[k]).not.to.be.equal(p);
	});
});
