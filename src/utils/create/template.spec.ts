import { template } from './template';


describe('template', () => {
	it('returns template from object', () => {
		const o = {
			a: [1, null, { b: true }],
			c: { d: false, e: 2 },
		};

		expect(template(o)).to.be.eql({
			a: [undefined, undefined, {}],
			c: {},
		});
	});

	it('returns template from array', () => {
		const o = [
			[{ a: 1,  b: true }, null],
			{ c: { d: false, e: 2 } },
		];

		expect(template(o)).to.be.eql([
			[{}, undefined],
			{ c: {} },
		]);
	});

	it('returns null for non-object input', () => {
		// @ts-ignore
		expect(template('wot?!')).to.be.null;
	});
});
