import { forEachDeep } from './for-each-deep';


describe('forEachDeep', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };
		const keys: string[] = [];

		forEachDeep(o, (prop, key, object): void => {
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

		expect(keys).to.be.eql(['a.0', 'a.1', 'a.2.b', 'c.d', 'c.e']);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = { a: [1, null, { b: true }], c: { d: false, e: 2 } };
		const keys: (string | number)[][] = [];

		forEachDeep(o, (prop, key, object): void => {
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

		expect(keys).to.be.eql([['a', '0'], ['a', '1'], ['a', '2', 'b'], ['c', 'd'], ['c', 'e']]);
	});
});
