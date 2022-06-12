import { assignDeepStrict } from './assign-deep-strict';


describe('assignDeepStrict', () => {
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
			],
			b: {
				a: [undefined, 5],
				o: { b: undefined, d: 5 },
				c: [5],
				d: { n: 5 },
			},
		};

		expect(assignDeepStrict(target, source0, source1)).to.be.eql({
			a: [
				undefined,
				[5, 4],
				{ a: 3, b: 4 },
				4,
			],
			b: {
				a: [undefined, 5],
				o: { b: undefined, c: 4, d: 5 },
				c: [5],
				d: { n: 5 },
			},
		});
	});

	it('returns target modified by source array', () => {
		const target = [
			1,
			[2],
			{ a: 3 },
		];

		const source = [
			undefined,
			[undefined, 4],
			{ b: 4 },
			4,
		];

		const expectedResult = [
			undefined,
			[undefined, 4],
			{ a: 3, b: 4 },
			4,
		];

		expect(assignDeepStrict(target, source)).to.be.eql(expectedResult);
	});

	it('returns unchanged target if it is not an object', () => {
		// @ts-ignore
		expect(assignDeepStrict(1, [])).to.be.equal(1);
	});

	it('returns unchanged target if source is not an object', () => {
		// @ts-ignore
		expect(assignDeepStrict([1], 2)).to.be.eql([1]);
	});
});
