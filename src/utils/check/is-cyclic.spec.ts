import { isCyclic } from './is-cyclic';

describe('isCyclic', () => {
	it('returns false for non-cyclic object', () => {
		const o = { a: { b: { x: {}, xp: {} }, x: {} }, x: {} };
		const y = { u: { v: 1, w: 2 } };

		o.x = y;
		o.a.x = y;
		o.a.b.x = y;
		o.a.b.xp = y;

		expect(isCyclic(o)).to.be.false;
	});

	it('returns true for cyclic object', () => {
		const o = { a: { b: { c: {} }, d: 2 }, e: 3 };

		o.a.b.c = o;

		expect(isCyclic(o)).to.be.true;
	});
});
