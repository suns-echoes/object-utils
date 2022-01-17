import { forEach } from './for-each';


describe('forEach', () => {
	it('iterates through every property', () => {
		const o = { a: 1, b: false, c: 8, d: null, e: 'yy', f: undefined };
		const keys: string[] = [];

		forEach(o, (prop, key, object): void => {
			if (object[key] === prop) {
				keys.push(key);
			}
		});

		expect(keys).to.be.eql(['a', 'b', 'c', 'd', 'e', 'f']);
	});
});
