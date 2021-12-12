import { find } from './find';

describe('find', () => {
	it('returns first property that passes the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(find(o, (property, key, obj) => (property === null && property === obj[key]))).to.be.null;
	});

	it('returns undefined if all of the properties fail the test', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };

		expect(find(o, (property) => (property === 'alien'))).to.be.undefined;
	});
});
