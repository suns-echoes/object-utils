import { diffStrictDeep, Missing, Same } from './diff-strict-deep';

describe('diffStrictDeep', () => {
	it('returns "Same" for two equal inputs', () => {
		const arr = [1, 2, 3];
		const a = { a: arr, b: true, c: { aa: 1, bb: arr, cc: {} } };
		const b = { a: arr, b: true, c: { aa: 1, bb: arr, cc: {} } };

		const diff = diffStrictDeep(a, b);

		expect(diff).to.be.equal(Same);
		expect(diffStrictDeep(null, null)).to.be.equal(Same);
	});

	it('returns "Missing" when second input ommits props', () => {
		const a = { aa: true };
		const b = {};
		const d = { aa: Missing };

		const diff = diffStrictDeep(a, b);

		expect(diff).to.be.eql(d);
	});

	it('returns differences (new values) for two different inputs', () => {
		const a = { a: [1, 2], c: { aa: 1, bb: [1, 2, 3], cc: {} } };
		const b = { a: [1, 2, 3], b: true, c: { aa: 1, bb: [1, 2, 3], cc: {} } };
		const d = { a: b.a, b: true, c: { aa: Same, bb: b.c.bb, cc: Same } };

		const diff = diffStrictDeep(a, b);

		expect(diff).to.be.eql(d);
		expect(diffStrictDeep(null, undefined)).to.be.equal(undefined);
	});
});
