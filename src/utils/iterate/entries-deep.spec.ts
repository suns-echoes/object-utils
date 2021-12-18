import { entriesDeep } from './entries-deep';

describe('entriesDeep', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(entriesDeep(o, '.')).to.be.eql([
			['a.0', 1],
			['a.1', null],
			['a.2.b', true],
			['c.d', false],
			['c.e', 2],
		]);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };

		expect(entriesDeep(o)).to.be.eql([
			[['a', '0'], 1],
			[['a', '1'], null],
			[['a', '2', 'b'], true],
			[['c', 'd'], false],
			[['c', 'e'], 2],
		]);
	});

	it('returns null if source is not an object', () => {
		// @ts-ignore
		expect(entriesDeep('wot?!')).to.be.null;
	});
});
