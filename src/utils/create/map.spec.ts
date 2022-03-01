import { map } from './map';


describe('map', () => {
	it('returns new object with modified properties', () => {
		const o: AnyObject = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const n = map(o, (prop, key, object) => object[key] === prop);

		expect(n).to.be.eql({ a: true, b: true, c: true, d: true, e: true, f: true });
	});

	it('returns null for non-object source', () => {
		// @ts-ignore
		expect(map('wot?!', () => undefined)).to.be.null;
	});

	it('returns null for invalid callback', () => {
		// @ts-ignore
		expect(map({}, null)).to.be.null;
	});
});
