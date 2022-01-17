import { getAllKeys } from './get-all-keys';


describe('getAllKeys', () => {
	it('returns all keys present in source objects', () => {
		const o1 = { a: 1, b: 2 };
		const o2 = { c: 3, d: 4 };
		const o3 = { e: 5, f: 6 };

		expect(getAllKeys(o1, o2, o3)).to.be.eql(['a', 'b', 'c', 'd', 'e', 'f']);
	});
});
