import { find } from './find';

describe('find', () => {
	it('returns first property that passes the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const searcher: ObjectPropertyCallbackFn = (property, key, obj) => (property === null && property === obj[key]);

		expect(find(o, searcher)).to.be.equal(null);
	});

	it('returns undefined if all of the properties fail the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const searcher: ObjectPropertyCallbackFn = (property) => (property === 'alien');

		expect(find(o, searcher)).to.be.undefined;
	});
});
