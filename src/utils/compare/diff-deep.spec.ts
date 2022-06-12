import { diffDeep, Missing, Same } from './diff-deep';


describe('diffDeep', () => {
	it('returns "Same" for two equal inputs', () => {
		expect(diffDeep(false, false)).to.be.equal(Same);
		expect(diffDeep(1, 1)).to.be.equal(Same);
		expect(diffDeep('a', 'a')).to.be.equal(Same);
		expect(diffDeep(Same, Same)).to.be.equal(Same);
		expect(diffDeep(null, null)).to.be.equal(Same);
		expect(diffDeep(undefined, undefined)).to.be.equal(Same);
	});

	it('returns "Same" for two deep equal objects', () => {
		expect(diffDeep([], [])).to.be.equal(Same);
		expect(diffDeep([], {})).to.be.equal(Same);
		expect(diffDeep({}, {})).to.be.equal(Same);
		expect(diffDeep({}, [])).to.be.equal(Same);
		expect(diffDeep([1], [1])).to.be.equal(Same);
		expect(diffDeep([1], { 0: 1 })).to.be.equal(Same);
		expect(diffDeep({ a: 1 }, { a: 1 })).to.be.equal(Same);
		expect(diffDeep({ 0: 1 }, [1])).to.be.equal(Same);
		expect(diffDeep({ 0: [{ 0: {}, 1: [] }] }, [{ 0: [[], {}] }])).to.be.equal(Same);
	});

	it('returns "Missing" in place of empty item in sparse array', () => {
		const a = [1, 2];
		const b = [];
		const diff = [Missing, Same];

		b[1] = 2;

		expect(diffDeep(a, b)).to.be.eql(diff);
	});

	it('returns "Missing" in place of ommited property', () => {
		const a = { prop: true };
		const b = {};
		const diff = { prop: Missing };

		expect(diffDeep(a, b)).to.be.eql(diff);
	});

	it('returns custom value in place of ommited property', () => {
		const a = { prop: true };
		const b = {};
		const diff = { prop: 'MISS' };

		expect(diffDeep(a, b, 'MISS')).to.be.eql(diff);
	});

	it('returns second value for two not equal inputs', () => {
		expect(diffDeep(false, 0)).to.be.equal(0);
		expect(diffDeep(1, true)).to.be.equal(true);
		expect(diffDeep('2', 2)).to.be.equal(2);
		expect(diffDeep(Same, Missing)).to.be.equal(Missing);
		expect(diffDeep(null, undefined)).to.be.equal(undefined);
		expect(diffDeep(undefined, null)).to.be.equal(null);
	});

	it('returns diff tree for two different objects', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = { arr: [{ v: 1 }, sparse, 2, 3], sub: { prop: 'key', value: true } };
		const b = { arr: [{ v: 1 }, [1, 2, 3], 3], sub: { prop: 'key', value: false, meta: 0 } };
		const diff = { arr: [Same, [Same, 2, Same], 3, Missing], sub: { value: false, meta: 0 } };

		expect(diffDeep(a, b)).to.be.eql(diff);
	});
});
