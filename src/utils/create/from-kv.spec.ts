import { fromKV } from './from-kv';


describe('fromKV', () => {
	it('returns new object with properties provided in array', () => {
		const a = [['a', 1], ['b', 2], ['c', 3]];

		expect(fromKV(a)).to.be.eql({ a: 1, b: 2, c: 3 });
	});

	it('returns new object with properties provided in set', () => {
		const s = new Set([['a', 1], ['b', 2], ['c', 3]]);

		expect(fromKV(s)).to.be.eql({ a: 1, b: 2, c: 3 });
	});

	it('returns new object with properties provided in object', () => {
		const o = { a: 1, b: 2, c: 3 };

		expect(fromKV(Object.entries(o))).to.be.eql({ a: 1, b: 2, c: 3 });
	});

	it('returns new object with properties provided by generator', () => {
		const g = function*(): Generator<(string | number)[]> {
			yield ['a', 1];
			yield ['b', 2];
			yield ['c', 3];
		};

		expect(fromKV(g())).to.be.eql({ a: 1, b: 2, c: 3 });
	});

	it('returns empty object for invalid input', () => {
		// @ts-ignore
		expect(fromKV(null)).to.be.eql({});
	});
});
