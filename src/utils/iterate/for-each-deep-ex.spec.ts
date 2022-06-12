import { forEachDeepEx } from './for-each-deep-ex';


describe('forEachDeepEx', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = {
			a: [[1], null, { b: true }],
			c: {
				d: false,
				e: 2,
			},
		};

		const keys: string[] = [];

		forEachDeepEx(o, (prop, key, object) => {
			if (object[key.split('.').pop()!] === prop) {
				keys.push(key);
			}
		}, '.');

		expect(keys).to.be.eql(['a', 'c.d', 'c.e']);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = {
			a: [[1], null, { b: true }],
			c: {
				d: false,
				e: 2,
			},
		};

		const keys: (string | number)[][] = [];

		forEachDeepEx(o, (prop, key, object) => {
			if (object[[...key].pop()!] === prop) {
				keys.push(key);
			}
		});

		expect(keys).to.be.eql([['a'], ['c', 'd'], ['c', 'e']]);
	});
});
