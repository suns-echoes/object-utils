import { partial } from './partial';


describe('partial', () => {
	it('returns new object with selected properties', () => {
		const o: AnyObject = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const wantedKeys = ['a', 'c', 'e'];
		const c = partial(o, wantedKeys);

		expect(c).not.to.be.equal(o);
		expect(c).to.be.eql({ a: 1, c: 8, e: 'yy' });
	});
});
