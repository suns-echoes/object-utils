import { entriesDeepStrict } from './entries-deep-strict';


describe('entriesDeepStrict', () => {
	it('iterates through every property and sub-property (string path key)', () => {
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

		expect(entriesDeepStrict(o, '.')).to.be.eql([
			['a.0.0', 1],
			['a.1', null],
			['a.2.b', true],
			['c.d', false],
			['c.e', 2],
		]);

		expect(entriesDeepStrict([[1]], '.')).to.be.eql([['0.0', 1]]);
	});

	it('iterates through every property and sub-property (array path key)', () => {
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

		expect(entriesDeepStrict(o)).to.be.eql([
			[['a', '0', '0'], 1],
			[['a', '1'], null],
			[['a', '2', 'b'], true],
			[['c', 'd'], false],
			[['c', 'e'], 2],
		]);

		expect(entriesDeepStrict([[1]])).to.be.eql([[['0', '0'], 1]]);
	});

	it('iterates only through array iterable items (not other properties)', () => {
		const o: AnyObject = [
			[1],
			2,
		];

		o.x = true;

		expect(entriesDeepStrict(o)).to.be.eql([
			[['0', '0'], 1],
			[['1'], 2],
		]);
	});

	it('returns null if input is not an object', () => {
		// @ts-ignore
		expect(entriesDeepStrict('wot?!')).to.be.null;
	});
});
