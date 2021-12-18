import { eql } from './eql';

describe('eql', () => {
	it('returns "true" for two equal inputs', () => {
		expect(eql(1, 1)).to.be.true;
		expect(eql('a', 'a')).to.be.true;
		expect(eql(null, null)).to.be.true;
		expect(eql(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal object inputs', () => {
		const arr = [1];
		const o = { x: 'y' };
		const a = { arr, b: true, o };
		const b = { arr, b: true, o };

		expect(eql(a, b)).to.be.true;
		expect(eql(null, null)).to.be.true;
		expect(eql(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal array inputs', () => {
		const arr = [1];
		const o = { x: 'y' };
		const a = [arr, true, o];
		const b = [arr, true, o];

		expect(eql(a, b)).to.be.true;
	});

	it('returns "true" for two equal sparse array inputs', () => {
		const sparse = [1];

		sparse[2] = 3;

		expect(eql(sparse, sparse)).to.be.true;
	});

	it('returns "false" for two different inputs', () => {
		expect(eql(1, '1')).to.be.false;
		expect(eql('a', 'A')).to.be.false;
		expect(eql(null, undefined)).to.be.false;
		expect(eql(undefined, null)).to.be.false;
	});

	it('returns "false" when second input ommits object props', () => {
		const a = { a: true };
		const b = {};

		expect(eql(a, b)).to.be.false;
	});

	it('returns "false" when second input ommits array items', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = [1, 2, 3];
		const b = sparse;

		expect(eql(a, b)).to.be.false;
		expect(eql([1, true], [1])).to.be.false;
	});

	it('returns "false" for two different object inputs', () => {
		const a = { a: [{ b: 1 }] };
		const b = { a: [{ b: 1 }] };

		expect(eql(a, b)).to.be.false;
		expect(eql({ a: 1 }, { b: 2 })).to.be.false;
	});

	it('returns "false" for two different array inputs', () => {
		const sparse1 = [1];
		const sparse2 = [1];

		sparse1[2] = 3;
		sparse2[2] = 3;

		const a = [sparse1];
		const b = [sparse2];

		expect(eql(a, b)).to.be.false;
		expect(eql(sparse1, [1, 2, 3])).to.be.false;
	});
});
