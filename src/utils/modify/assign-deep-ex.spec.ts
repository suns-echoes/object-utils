import { assignDeepEx } from './assign-deep-ex';

// TODO: Rewrite tests

describe('assignDeepEx', () => {
	it('returns target modified by source objects', () => {
		const target = {
			a: [
				1,
				[2],
				{ a: 3 },
			],
			b: {
				a: [4],
				o: { b: 5 },
				c: true,
			},
		};

		const source0 = {
			a: [
				1,
				[undefined, 4],
				{ b: 4 },
				4,
			],
			b: {
				a: undefined,
				o: { c: 4 },
				c: { n: 4 },
				d: [4],
			},
		};

		const source1 = {
			a: [
				undefined,
				[5],
				undefined,
				5,
			],
			b: {
				a: [undefined, 5],
				o: { b: undefined, d: 5 },
				c: [5],
				d: { n: 5 },
			},
		};

		const expectedResult: AnyObject = {
			a: [
				undefined,
				[5],
				undefined,
				5,
			],
			b: {
				a: [undefined, 5],
				o: { b: undefined, c: 4, d: 5 },
				c: [5],
				d: { n: 5 },
			},
		};

		expect(assignDeepEx(target, source0, source1)).to.be.eql(expectedResult);
	});
});
