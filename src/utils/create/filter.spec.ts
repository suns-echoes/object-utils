import { filter } from './filter';

type t = keyof AnyObject;

const d: { [key: string]: t } = {
	'a': 2,
	'b': 'c',
};

d.x = 2;
d.y = 'a';
d.z = Symbol('x');

describe('filter', () => {
	it('returns new object with filtered properties', () => {
		const o: AnyObject = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const wantedKeys = ['a', 'c', 'e'];
		const c = filter(o, (prop, key, object) => object[key] === prop && wantedKeys.includes(key));

		expect(c).not.to.be.equal(o);
		expect(c).to.be.eql({ a: 1, c: 8, e: 'yy' });
	});

	it('returns null for non-object source', () => {
		// @ts-ignore
		expect(filter('wot?!', () => undefined)).to.be.null;
	});

	it('returns null for invalid callback', () => {
		// @ts-ignore
		expect(filter({}, null)).to.be.null;
	});
});
