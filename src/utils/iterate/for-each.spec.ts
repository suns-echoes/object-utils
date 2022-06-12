import { forEach } from './for-each';


describe('forEach', () => {
	it('iterates through every object property', () => {
		const o = {
			a: 1,
			b: false,
			c: 8,
			d: null,
			e: 'yy',
			f: undefined,
		};

		const keys: string[] = [];

		forEach(o, (prop, key, object) => {
			if (object[key] === prop) {
				keys.push(key);
			}
		});

		expect(keys).to.be.eql([
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
		]);
	});

	it('iterates through every array item', () => {
		const o = [
			1,
			false,
			8,
			null,
			'yy',
			undefined,
		];

		const keys: string[] = [];

		forEach(o, (prop, key, object) => {
			if (object[key] === prop) {
				keys.push(key);
			}
		});

		expect(keys).to.be.eql([
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
		]);
	});
});
