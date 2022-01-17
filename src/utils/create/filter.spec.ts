import { filter } from './filter';


describe('filter', () => {
	it('returns new object with filtered properties', () => {
		const o: AnyObject = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const wantedKeys = ['a', 'c', 'e'];
		const c = filter(o, (prop, key, object) => object[key] === prop && wantedKeys.includes(key));

		expect(c).not.to.be.equal(o);
		expect(c).to.be.eql({ a: 1, c: 8, e: 'yy' });
	});
});
