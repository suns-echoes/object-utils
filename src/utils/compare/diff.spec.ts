import { diff, Missing, Same } from './diff';


describe('diff', () => {
	it('returns "Same" for two equal inputs', () => {
		expect(diff(false, false)).to.be.equal(Same);
		expect(diff(1, 1)).to.be.equal(Same);
		expect(diff('a', 'a')).to.be.equal(Same);
		expect(diff(Same, Same)).to.be.equal(Same);
		expect(diff(null, null)).to.be.equal(Same);
		expect(diff(undefined, undefined)).to.be.equal(Same);
	});

	it('returns "Same" for two shallow equal objects', () => {
		const x = {};

		expect(diff([], [])).to.be.equal(Same);
		expect(diff([], {})).to.be.equal(Same);
		expect(diff({}, {})).to.be.equal(Same);
		expect(diff({}, [])).to.be.equal(Same);
		expect(diff([1], [1])).to.be.equal(Same);
		expect(diff([1], { 0: 1 })).to.be.equal(Same);
		expect(diff({ a: 1 }, { a: 1 })).to.be.equal(Same);
		expect(diff({ 0: 1 }, [1])).to.be.equal(Same);
		expect(diff({ 0: x }, [x])).to.be.equal(Same);
	});

	it('returns "Missing" in place of empty item in sparse array', () => {
		const a = [1, 2];
		const b = [];

		b[1] = 2;

		expect(diff(a, b)).to.be.eql([Missing, Same]);
	});

	it('returns "Missing" in place of ommited property', () => {
		const a = { prop: true };
		const b = {};

		expect(diff(a, b)).to.be.eql({ prop: Missing });
	});

	it('returns custom value in place of ommited property', () => {
		const a = { prop: true };
		const b = {};

		expect(diff(a, b, 'MISS')).to.be.eql({ prop: 'MISS' });
	});

	it('returns second value for two not equal inputs', () => {
		expect(diff(false, 0)).to.be.equal(0);
		expect(diff(1, true)).to.be.equal(true);
		expect(diff('2', 2)).to.be.equal(2);
		expect(diff(Same, Missing)).to.be.equal(Missing);
		expect(diff(null, undefined)).to.be.equal(undefined);
		expect(diff(undefined, null)).to.be.equal(null);
	});

	it('returns diff for two different objects', () => {
		const a: AnyArray = [];
		const o = {};

		expect(diff([1, [], {}], [1, a, o, 'new'])).to.be.eql([Same, a, o, 'new']);
		expect(diff([1, [], {}], { 0: 1, 1: a, 2: o, 3: 'new' })).to.be.eql([Same, a, o, 'new']);
		expect(diff({ x: 1, a: [], o: {} }, { x: 1, a, o, t: 'new' })).to.be.eql({ a, o, t: 'new' });
		expect(diff({ 0: 1, 1: [], 2: {} }, [1, a, o, 'new'])).to.be.eql({ 1: a, 2: o, 3: 'new' });
	});
});
