import { mergeDeepStrict } from './merge-deep-strict';


describe('mergeDeepStrict', () => {
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
				undefined,
			],
			b: {
				a: [undefined, 5],
				o: { b: undefined, d: 5 },
				c: [5],
				d: { n: 5 },
			},
		};

		expect(mergeDeepStrict(target, source0, source1)).to.be.eql({
			a: [
				1,
				[5, 4],
				{ a: 3, b: 4 },
				5,
				undefined,
			],
			b: {
				a: [4, 5],
				o: { b: 5, c: 4, d: 5 },
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
			1,
			[2, 4],
			{ a: 3, b: 4 },
			4,
		];

		expect(mergeDeepStrict(target, source)).to.be.eql(expectedResult);
	});

	it('returns unchanged target if it is not an object', () => {
		// @ts-ignore
		expect(mergeDeepStrict(1, [])).to.be.equal(1);
	});

	it('returns unchanged target if source is not an object', () => {
		// @ts-ignore
		expect(mergeDeepStrict([1], 2)).to.be.eql([1]);
	});
});
