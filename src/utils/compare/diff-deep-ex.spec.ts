import { diffDeepEx, Missing, Same } from './diff-deep-ex';


describe('diffDeepEx', () => {
	it('returns "Same" for two equal inputs', () => {
		expect(diffDeepEx(false, false)).to.be.equal(Same);
		expect(diffDeepEx(1, 1)).to.be.equal(Same);
		expect(diffDeepEx('a', 'a')).to.be.equal(Same);
		expect(diffDeepEx(Same, Same)).to.be.equal(Same);
		expect(diffDeepEx(null, null)).to.be.equal(Same);
		expect(diffDeepEx(undefined, undefined)).to.be.equal(Same);
	});

	it('returns "Same" for two deep equal objects', () => {
		expect(diffDeepEx({}, {})).to.be.equal(Same);
		expect(diffDeepEx({ a: 1 }, { a: 1 })).to.be.equal(Same);
		expect(diffDeepEx({ a: { b: {} } }, { a: { b: {} } })).to.be.equal(Same);
	});

	it('returns "Missing" in place of ommited property', () => {
		const a = { prop: true };
		const b = {};
		const diff = { prop: Missing };

		expect(diffDeepEx(a, b)).to.be.eql(diff);
	});

	it('returns custom value in place of ommited property', () => {
		const a = { prop: true };
		const b = {};
		const diff = { prop: 'MISS' };

		expect(diffDeepEx(a, b, 'MISS')).to.be.eql(diff);
	});

	it('returns second value for two not equal inputs', () => {
		expect(diffDeepEx(false, 0)).to.be.equal(0);
		expect(diffDeepEx(1, true)).to.be.equal(true);
		expect(diffDeepEx('2', 2)).to.be.equal(2);
		expect(diffDeepEx(Same, Missing)).to.be.equal(Missing);
		expect(diffDeepEx(null, undefined)).to.be.equal(undefined);
		expect(diffDeepEx(undefined, null)).to.be.equal(null);
		expect(diffDeepEx([], {})).to.be.eql({});
		expect(diffDeepEx({}, [])).to.be.eql([]);
	});

	it('returns second value for two equal content arrays with different instances', () => {
		const a: AnyArray = [true];
		const b: AnyArray = [true];

		expect(diffDeepEx(a, b)).to.be.eql(b);
	});

	it('returns diff tree for two different objects', () => {
		const g_arr = [0];
		const a = { g_arr, l_arr: [1], sub: { prop: 'key', value: true } };
		const b = { g_arr, l_arr: [1], sub: { prop: 'key', value: false, meta: 0 } };
		const diff = { l_arr: b.l_arr, sub: { value: false, meta: 0 } };

		expect(diffDeepEx(a, b)).to.be.eql(diff);
		expect(diff.l_arr).to.be.equal(b.l_arr);
	});
});
