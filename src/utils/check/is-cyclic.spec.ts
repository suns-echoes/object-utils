import { isCyclic } from './is-cyclic';


describe('isCyclic', () => {
	it('returns false for non-cyclic object', () => {
		const o: any = { a: { b: {}, c: [] }, x: {} };
		const y: any = { u: { v: 1, w: 2 } };

		o.x = y;
		o.a.b = y;
		o.a.c[0] = y;

		expect(isCyclic(o)).to.be.false;
	});

	it('returns true for cyclic object', () => {
		const o = { a: { b: { c: {} }, d: 2 }, e: 3 };

		o.a.b.c = o;

		expect(isCyclic(o)).to.be.true;
	});
});
