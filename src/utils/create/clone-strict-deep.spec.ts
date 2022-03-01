import { cloneStrictDeep } from './clone-strict-deep';


describe('cloneStrictDeep', () => {
	it('returns new cloned object', () => {
		const a = [1, 2, 3];
		const o = { o: { o: { x: 'y', xp: 'v' }, a }, a };
		const c = cloneStrictDeep(o)!;

		expect(c).not.to.be.equal(o);
		expect(c.a).to.be.equal(o.a);
		expect(c.o.a).to.be.equal(o.o.a);
		expect(c).to.be.eql(o);
	});

	it('returns "null" for array input', () => {
		const a = [1, 2, 3];
		const c = cloneStrictDeep(a);

		expect(c).not.to.be.equal(a);
		expect(c).to.be.null;
	});

	it('returns "null" for non-object input', () => {
		// @ts-ignore
		expect(cloneStrictDeep('wot?!')).to.be.null;
	});
});
