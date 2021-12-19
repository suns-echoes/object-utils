import { entriesStrictDeep } from './entries-strict-deep';

describe('entriesStrictDeep', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(entriesStrictDeep(o, '.')).to.be.eql([
			['a', [1, null, { b: true }]],
			['c.d', false],
			['c.e', 2],
		]);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(entriesStrictDeep(o)).to.be.eql([
			[['a'], [1, null, { b: true }]],
			[['c', 'd'], false],
			[['c', 'e'], 2],
		]);
	});

	it('returns null if source is not an object', () => {
		// @ts-ignore
		expect(entriesStrictDeep('wot?!')).to.be.null;
	});
});