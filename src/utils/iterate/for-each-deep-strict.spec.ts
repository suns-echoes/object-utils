import { forEachDeepStrict } from './for-each-deep-strict';


describe('forEachDeepStrict', () => {
	it('iterates through every property and sub-property (string path key)', () => {
		const o = {
			a: [
				[1],
				null,
				{
					b: true,
				},
			],
			c: {
				d: false,
				e: 2,
			},
		};

		const keys: string[] = [];

		forEachDeepStrict(o, (prop, key, object) => {
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

		expect(keys).to.be.eql([
			'a.0.0',
			'a.1',
			'a.2.b',
			'c.d',
			'c.e',
		]);
	});

	it('iterates through every property and sub-property (array path key)', () => {
		const o = {
			a: [
				[1],
				null,
				{
					b: true,
				},
			],
			c: {
				d: false,
				e: 2,
			},
		};

		const keys: (string | number)[][] = [];

		forEachDeepStrict(o, (prop, key, object) => {
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

		expect(keys).to.be.eql([
			['a', '0', '0'],
			['a', '1'],
			['a', '2', 'b'],
			['c', 'd'],
			['c', 'e'],
		]);
	});

	it('iterates only through array iterable items (not other properties)', () => {
		const o: AnyObject = [
			[1],
			2,
		];

		o.x = true;

		const keys: AnyArray = [];

		forEachDeepStrict(o, (prop, key, object) => {
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

		expect(keys).to.be.eql([
			['0', '0'],
			['1'],
		]);

		// With delimiter
		keys.length = 0;

		forEachDeepStrict(o, (prop, key, object) => {
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
		}, '.');

		expect(keys).to.be.eql([
			'0.0',
			'1',
		]);
	});
});
