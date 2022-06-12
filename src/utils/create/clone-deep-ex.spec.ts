import { cloneDeepEx } from './clone-deep-ex';


describe('cloneDeepEx', () => {
	it('returns new cloned object', () => {
		const o = { o: { o: { x: 'y', xp: 'v' } } };
		const c = cloneDeepEx(o)!;

		expect(c).not.to.be.equal(o);
		expect(c.o).not.to.be.equal(o.o);
		expect(c.o.o).not.to.be.equal(o.o.o);
		expect(c).to.be.eql(o);
	});

	it('returns new cloned object with original arrays', () => {
		const a = [1, 2, 3];
		const o = { o: { a }, a };
		const c = cloneDeepEx(o)!;

		expect(c).not.to.be.equal(o);
		expect(c.a).to.be.equal(o.a);
		expect(c.o.a).to.be.equal(o.o.a);
		expect(c).to.be.eql(o);
	});

	it('returns "null" for array', () => {
		const a = [1, { x: 'y', xp: 'v' }, 3];
		const c = cloneDeepEx(a)!;

		expect(c).to.be.null;
	});

	it('returns "null" for non-object input', () => {
		// @ts-ignore
		expect(cloneDeepEx('wot?!')).to.be.null;
	});
});
