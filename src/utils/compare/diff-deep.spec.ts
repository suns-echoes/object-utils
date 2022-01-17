import { diffDeep, Missing, Same } from './diff-deep';


describe('diffDeep', () => {
	it('returns "Same" for two equal object inputs', () => {
		const arr = [1, 2, 3];
		const a = { a: arr, b: true, c: { aa: 1, bb: arr, cc: {} } };
		const b = { a: arr, b: true, c: { aa: 1, bb: arr, cc: {} } };

		const diff = diffDeep(a, b);

		expect(diff).to.be.equal(Same);
		expect(diffDeep(null, null)).to.be.equal(Same);
	});

	it('returns "Same" for two equal array inputs', () => {
		const a = [[1, 2, 3], true, { aa: 1, bb: [1, 2, 3], cc: {} }];
		const b = [[1, 2, 3], true, { aa: 1, bb: [1, 2, 3], cc: {} }];

		const diff = diffDeep(a, b);

		expect(diff).to.be.equal(Same);
		expect(diffDeep(null, null)).to.be.equal(Same);
	});

	it('returns "Missing" when second input ommits object props', () => {
		const a = { aa: true };
		const b = {};
		const d = { aa: Missing };

		const diff = diffDeep(a, b);

		expect(diff).to.be.eql(d);
	});

	it('returns "Missing" when second input ommits array items', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = [[1, 2, 3], true];
		const b = [sparse];
		const d = [[Same, Missing, Same], Missing];

		const diff = diffDeep(a, b);

		expect(diff).to.be.eql(d);
	});

	it('returns differences (new values) for two different object inputs', () => {
		const a = { a: [1, 2], c: { aa: 1, bb: [1, 2, 3], cc: {} } };
		const b = { a: [1, 2, 3], b: true, c: { aa: 1, bb: [1, 2, 3], cc: {} } };
		const d = { a: [Same, Same, 3], b: true, c: Same };

		const diff = diffDeep(a, b);

		expect(diff).to.be.eql(d);
		expect(diffDeep(null, undefined)).to.be.equal(undefined);
	});

	it('returns differences (new values) for two different array inputs', () => {
		const sparse = [1];

		sparse[2] = 3;

		const a = [[1, 2], true, { aa: 1, bb: sparse, cc: {} }];
		const b = [[1, 2, 3], true, { aa: 1, bb: [1, 2, 3], cc: {} }];
		const d = [[Same, Same, 3], Same, { aa: Same, bb: [Same, 2, Same], cc: Same }];

		const diff = diffDeep(a, b);

		expect(diff).to.be.eql(d);
		expect(diffDeep(null, undefined)).to.be.equal(undefined);
	});
});
