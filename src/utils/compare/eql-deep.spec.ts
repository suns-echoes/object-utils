import { eqlDeep } from './eql-deep';

describe('eqlDeep', () => {
	it('returns "true" for two equal inputs', () => {
		expect(eqlDeep(1, 1)).to.be.true;
		expect(eqlDeep('a', 'a')).to.be.true;
		expect(eqlDeep(null, null)).to.be.true;
		expect(eqlDeep(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal object inputs', () => {
		const a = { a: [1], b: true, c: { d: 1 } };
		const b = { a: [1], b: true, c: { d: 1 } };

		expect(eqlDeep(a, b)).to.be.true;
		expect(eqlDeep(null, null)).to.be.true;
		expect(eqlDeep(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal array inputs', () => {
		const a = [[1], true, { d: 1 }];
		const b = [[1], true, { d: 1 }];

		expect(eqlDeep(a, b)).to.be.true;
	});

	it('returns "true" for two equal sparse array inputs', () => {
		const sparse1 = [1];
		const sparse2 = [1];

		sparse1[2] = 3;
		sparse2[2] = 3;

		expect(eqlDeep(sparse1, sparse2)).to.be.true;
	});

	it('returns "false" for two different inputs', () => {
		expect(eqlDeep(1, '1')).to.be.false;
		expect(eqlDeep('a', 'A')).to.be.false;
		expect(eqlDeep(null, undefined)).to.be.false;
		expect(eqlDeep(undefined, null)).to.be.false;
	});

	it('returns "false" when second input ommits object props', () => {
		const a = { a: true };
		const b = {};

		expect(eqlDeep(a, b)).to.be.false;
	});

	it('returns "false" when second input ommits array items', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = [[1, 2, 3], true];
		const b = [[1, 2, 3]];

		expect(eqlDeep(a, b)).to.be.false;
		expect(eqlDeep([1, 2, 3], sparse)).to.be.false;
	});

	it('returns "false" for two different object inputs', () => {
		const a = { a: [{ b: 1 }] };
		const b = { a: [{ b: 2 }] };

		expect(eqlDeep(a, b)).to.be.false;
		expect(eqlDeep({ a: 1 }, { b: 2 })).to.be.false;
	});

	it('returns "false" for two different array inputs', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = [[1, [2, [3]]]];
		const b = [[1, [2, [4]]]];

		expect(eqlDeep(a, b)).to.be.false;
		expect(eqlDeep(sparse, [1, 2, 3])).to.be.false;
	});
});
