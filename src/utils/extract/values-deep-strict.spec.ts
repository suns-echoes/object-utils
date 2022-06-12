import { valuesDeepStrict } from './values-deep-strict';


describe('valuesDeepStrict', () => {
	it('returns all properties and sub-properties', () => {
		const o = {
			a: [
				[1],
				null,
				{
					b: true,
				},
			],
			c: {
				d: false,
				e: 2,
			},
		};

		expect(valuesDeepStrict(o)).to.be.eql([
			1,
			null,
			true,
			false,
			2,
		]);
	});

	it('iterates only through array iterable items (not other properties)', () => {
		const o: AnyObject = [
			[1],
			2,
		];

		o.x = true;

		expect(valuesDeepStrict(o)).to.be.eql([
			1,
			2,
		]);
	});

	it('returns null if input is not an object', () => {
		// @ts-ignore
		expect(valuesDeepStrict('wot?!')).to.be.null;
	});
});
