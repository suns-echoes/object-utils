import { map } from './map';


describe('map', () => {
	it('returns new object with modified properties', () => {
		const o: AnyObject = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const n = map(o, (prop, key, object) => object[key] === prop);

		expect(n).to.be.eql({ a: true, b: true, c: true, d: true, e: true, f: true });
	});
});
