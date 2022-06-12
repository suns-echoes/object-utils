import { eqlDeepStrict } from './eql-deep-strict';


describe('eqlDeepStrict', () => {
	it('returns "true" for two equal inputs', () => {
		expect(eqlDeepStrict(1, 1)).to.be.true;
		expect(eqlDeepStrict('a', 'a')).to.be.true;
		expect(eqlDeepStrict(null, null)).to.be.true;
		expect(eqlDeepStrict(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal object inputs', () => {
		const a = { a: [1], b: true, c: { d: 1 } };
		const b = { a: [1], b: true, c: { d: 1 } };

		expect(eqlDeepStrict(a, b)).to.be.true;
	});

	it('returns "true" for two equal array inputs', () => {
		const sparseA: AnyArray = [];
		const sparseB: AnyArray = [];
		const a = [[1], sparseA, true, { d: 1 }];
		const b = [[1], sparseB, true, { d: 1 }];

		sparseA[1] = 2;
		sparseB[1] = 2;

		expect(eqlDeepStrict(a, b)).to.be.true;
	});

	it('returns "false" for array vs object change', () => {
		const a = { a: [1], b: true };
		const b = { a: { 0: 1 }, b: true };

		expect(eqlDeepStrict(a, b)).to.be.false;
		expect(eqlDeepStrict(b, a)).to.be.false;
		expect(eqlDeepStrict([], {})).to.be.false;
		expect(eqlDeepStrict({}, [])).to.be.false;
	});

	it('returns "false" for two different inputs', () => {
		expect(eqlDeepStrict(1, '1')).to.be.false;
		expect(eqlDeepStrict('a', 'A')).to.be.false;
		expect(eqlDeepStrict(null, undefined)).to.be.false;
		expect(eqlDeepStrict(undefined, null)).to.be.false;
	});

	it('returns "false" when second input ommits array items', () => {
		const a = [1];
		const b: AnyArray = [];

		expect(eqlDeepStrict(a, b)).to.be.false;
	});

	it('returns "false" when second input ommits object props', () => {
		const a = { a: true };
		const b = {};

		expect(eqlDeepStrict(a, b)).to.be.false;
	});

	it('returns "false" for two different object inputs', () => {
		const a = { a: [{ b: 1 }] };
		const b = { a: [{ b: 2 }] };

		expect(eqlDeepStrict(a, b)).to.be.false;
		expect(eqlDeepStrict({ a: 1 }, { b: 2 })).to.be.false;
		expect(eqlDeepStrict([1], [2])).to.be.false;
	});
});
