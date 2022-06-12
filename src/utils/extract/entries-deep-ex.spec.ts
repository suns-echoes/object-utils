import { entriesDeepEx } from './entries-deep-ex';


describe('entriesDeepEx', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = {
			a: [1, null, { b: true }],
			c: {
				d: false,
				e: 2,
			},
		};

		expect(entriesDeepEx(o, '.')).to.be.eql([
			['a', [1, null, { b: true }]],
			['c.d', false],
			['c.e', 2],
		]);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = {
			a: [1, null, { b: true }],
			c: {
				d: false,
				e: 2,
			},
		};

		expect(entriesDeepEx(o)).to.be.eql([
			[['a'], [1, null, { b: true }]],
			[['c', 'd'], false],
			[['c', 'e'], 2],
		]);
	});

	it('returns null if input is not an object', () => {
		// @ts-ignore
		expect(entriesDeepEx('wot?!')).to.be.null;
	});
});
