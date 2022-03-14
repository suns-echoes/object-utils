import { cloneExDeep } from './clone-ex-deep';


describe('cloneExDeep', () => {
	it('returns new cloned object', () => {
		const a = [1, 2, 3];
		const o = { o: { o: { x: 'y', xp: 'v' }, a }, a };
		const c = cloneExDeep(o)!;

		expect(c).not.to.be.equal(o);
		expect(c.a).to.be.equal(o.a);
		expect(c.o.a).to.be.equal(o.o.a);
		expect(c).to.be.eql(o);
	});

	it('returns "null" for array', () => {
		const o = { o: { o: { x: 'y', xp: 'v' } } };
		const a = [1, o, 3];
		const c = cloneExDeep(a)!;

		expect(c).to.be.null;
	});

	it('returns "null" for non-object input', () => {
		// @ts-ignore
		expect(cloneExDeep('wot?!')).to.be.null;
	});
});
