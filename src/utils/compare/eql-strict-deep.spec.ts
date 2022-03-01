import { eqlStrictDeep } from './eql-strict-deep';


describe('eqlStrictDeep', () => {
	it('returns "true" for two equal inputs', () => {
		expect(eqlStrictDeep(1, 1)).to.be.true;
		expect(eqlStrictDeep('a', 'a')).to.be.true;
		expect(eqlStrictDeep(null, null)).to.be.true;
		expect(eqlStrictDeep(undefined, undefined)).to.be.true;
	});

	it('returns "true" for two equal object inputs', () => {
		const arr = [1];
		const a = { a: arr, b: true, c: { d: 1 } };
		const b = { a: arr, b: true, c: { d: 1 } };

		expect(eqlStrictDeep(a, b)).to.be.true;
	});

	it('returns "false" for two equal object inputs with array items with different instances', () => {
		const a = { a: [1], b: true, c: { d: 1 } };
		const b = { a: [1], b: true, c: { d: 1 } };

		expect(eqlStrictDeep(a, b)).to.be.false;
	});

	it('returns "false" for two array inputs with different instances', () => {
		const a = [[1], true, { d: 1 }];
		const b = [[1], true, { d: 1 }];

		expect(eqlStrictDeep(a, b)).to.be.false;
	});

	it('returns "false" for two different inputs', () => {
		expect(eqlStrictDeep(1, '1')).to.be.false;
		expect(eqlStrictDeep('a', 'A')).to.be.false;
		expect(eqlStrictDeep(null, undefined)).to.be.false;
		expect(eqlStrictDeep(undefined, null)).to.be.false;
	});

	it('returns "false" when second input ommits object props', () => {
		const a = { a: true };
		const b = {};

		expect(eqlStrictDeep(a, b)).to.be.false;
	});

	it('returns "false" for two different object inputs', () => {
		const a = { a: [{ b: 1 }] };
		const b = { a: [{ b: 2 }] };

		expect(eqlStrictDeep(a, b)).to.be.false;
		expect(eqlStrictDeep({ a: 1 }, { b: 2 })).to.be.false;
	});
});
