import { cloneDeep } from './clone-deep';

describe('cloneDeep', () => {
	it('returns new cloned object', () => {
		const a = [1, 2, 3];
		const o = { o: { o: { x: 'y', xp: 'v' }, a }, a };
		const c = cloneDeep(o);

		expect(c).not.to.be.equal(o);
		expect(c.a).not.to.be.equal(o.a);
		expect(c.o.a).not.to.be.equal(o.o.a);
		expect(c).to.be.eql(o);
	});

	it('returns new cloned array', () => {
		const o = { o: { o: { x: 'y', xp: 'v' } } };
		const a = [1, o, 3];
		const c = cloneDeep(a);

		expect(c).not.to.be.equal(a);
		expect(c[1]).not.to.be.equal(a[1]);
		expect(c).to.be.eql(a);
	});
});
