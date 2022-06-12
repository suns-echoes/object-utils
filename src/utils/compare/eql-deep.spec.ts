import { eqlDeep } from './eql-deep';


describe('eqlDeep', () => {
	it('returns "true" for two equal inputs', () => {
		expect(eqlDeep(1, 1)).to.be.true;
		expect(eqlDeep('a', 'a')).to.be.true;
		expect(eqlDeep(null, null)).to.be.true;
		expect(eqlDeep(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal object inputs', () => {
		const a = { a: [], o: {}, b: true };
		const b = { a: [], o: {}, b: true };

		expect(eqlDeep(a, b)).to.be.true;
	});

	it('returns "true" for two equal array inputs', () => {
		const a = [[], {}, true];
		const b = [[], {}, true];

		expect(eqlDeep(a, b)).to.be.true;
	});

	it('returns "true" for equal array and object inputs', () => {
		const a = [[[], {}, false], { 0: [], 1: {}, 2: false }, true];
		const b = [{ 0: [], 1: {}, 2: false }, [[], {}, false], true];

		expect(eqlDeep(a, b)).to.be.true;
		expect(eqlDeep(b, a)).to.be.true;
		expect(eqlDeep([], {})).to.be.true;
		expect(eqlDeep({}, [])).to.be.true;
	});

	it('returns "true" for two equal sparse array inputs', () => {
		const sparse = [1];

		sparse[2] = 3;

		expect(eqlDeep(sparse, sparse)).to.be.true;
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

		const a = [1, 2, 3];

		expect(eqlDeep(a, [sparse])).to.be.false;
		expect(eqlDeep([1, true], [1])).to.be.false;
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

		expect(eqlDeep([sparse], [1, 2, 3])).to.be.false;
	});
});
