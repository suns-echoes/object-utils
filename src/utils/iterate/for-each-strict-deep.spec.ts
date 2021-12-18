import { forEachStrictDeep } from './for-each-strict-deep';

describe('forEachStrictDeep', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };
		const keys: string[] = [];

		forEachStrictDeep(o, (prop, key, object): void => {
			if (Array.isArray(object)) {
				if (object[parseInt(key.split('.').pop()!)] === prop) {
					keys.push(key);
				}
			}
			else {
				if (object[key.split('.').pop()!] === prop) {
					keys.push(key);
				}
			}
		}, '.');

		expect(keys).to.be.eql(['a', 'c.d', 'c.e']);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };
		const keys: (string | number)[][] = [];

		forEachStrictDeep(o, (prop, key, object): void => {
			if (Array.isArray(object)) {
				const index = parseInt([...key].pop()!);

				if (object[index] === prop) {
					keys.push(key);
				}
			}
			else {
				if (object[[...key].pop()!] === prop) {
					keys.push(key);
				}
			}
		});

		expect(keys).to.be.eql([['a'], ['c', 'd'], ['c', 'e']]);
	});
});
