import { diffDeepStrict, Missing, Same } from './diff-deep-strict';


describe('diffDeepStrict', () => {
	it('returns "Same" for two equal inputs', () => {
		expect(diffDeepStrict(false, false)).to.be.equal(Same);
		expect(diffDeepStrict(1, 1)).to.be.equal(Same);
		expect(diffDeepStrict('a', 'a')).to.be.equal(Same);
		expect(diffDeepStrict(Same, Same)).to.be.equal(Same);
		expect(diffDeepStrict(null, null)).to.be.equal(Same);
		expect(diffDeepStrict(undefined, undefined)).to.be.equal(Same);
	});

	it('returns "Same" for two deep equal objects', () => {
		expect(diffDeepStrict([], [])).to.be.equal(Same);
		expect(diffDeepStrict([1], [1])).to.be.equal(Same);
		expect(diffDeepStrict([[2]], [[2]])).to.be.equal(Same);
		expect(diffDeepStrict({}, {})).to.be.equal(Same);
		expect(diffDeepStrict({ a: 1 }, { a: 1 })).to.be.equal(Same);
		expect(diffDeepStrict({ a: { b: {} } }, { a: { b: {} } })).to.be.equal(Same);
	});

	it('returns "Missing" in place of empty item in sparse array', () => {
		const a = [1, 2];
		const b = [];
		const diff = [Missing, Same];

		b[1] = 2;

		expect(diffDeepStrict(a, b)).to.be.eql(diff);
	});

	it('returns "Missing" in place of ommited property', () => {
		const a = { prop: true };
		const b = {};
		const diff = { prop: Missing };

		expect(diffDeepStrict(a, b)).to.be.eql(diff);
	});

	it('returns custom value in place of ommited property', () => {
		const a = { prop: true };
		const b = {};
		const diff = { prop: 'MISS' };

		expect(diffDeepStrict(a, b, 'MISS')).to.be.eql(diff);
	});

	it('returns second value for two not equal inputs', () => {
		expect(diffDeepStrict(false, 0)).to.be.equal(0);
		expect(diffDeepStrict(1, true)).to.be.equal(true);
		expect(diffDeepStrict('2', 2)).to.be.equal(2);
		expect(diffDeepStrict(Same, Missing)).to.be.equal(Missing);
		expect(diffDeepStrict(null, undefined)).to.be.equal(undefined);
		expect(diffDeepStrict(undefined, null)).to.be.equal(null);
		expect(diffDeepStrict([], {})).to.be.eql({});
		expect(diffDeepStrict({}, [])).to.be.eql([]);
	});

	it('returns second entity for array and object inputs', () => {
		expect(diffDeepStrict([1], { a: null })).to.be.eql({ a: null });
		expect(diffDeepStrict({ a: null }, [1])).to.be.eql([1]);
	});

	it('returns diff tree for two different objects', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = { arr: [{ v: 1 }, sparse, 2, 3], sub: { prop: 'key', value: true } };
		const b = { arr: [{ v: 1 }, [1, 2, 3], 3], sub: { prop: 'key', value: false, meta: 0 } };
		const diff = { arr: [Same, [Same, 2, Same], 3, Missing], sub: { value: false, meta: 0 } };

		expect(diffDeepStrict(a, b)).to.be.eql(diff);
	});
});
