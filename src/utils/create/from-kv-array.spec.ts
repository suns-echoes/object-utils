import { fromKVArray } from './from-kv-array';


describe('fromKVArray', () => {
	it('returns new object with provided properties', () => {
		const a = [['a', 1], ['b', 2], ['c', 3]];

		expect(fromKVArray(a)).to.be.eql({ a: 1, b: 2, c: 3 });
	});
});
