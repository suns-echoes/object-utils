import { diff, Missing, Same } from './diff';


describe('diff', () => {
	it('returns "Same" for two equal object inputs', () => {
		const arr = [1, 2, 3];
		const o = { aa: 1, bb: arr, cc: {} };
		const a = { a: arr, b: true, o };
		const b = { a: arr, b: true, o };

		expect(diff(a, b)).to.be.equal(Same);
		expect(diff(null, null)).to.be.equal(Same);
		expect(diff(undefined, undefined)).to.be.equal(Same);
	});

	it('returns "Same" for two equal array inputs', () => {
		const o = { aa: 1, bb: false, cc: {} };
		const a = [1, null, o];
		const b = [1, null, o];

		expect(diff(a, b)).to.be.equal(Same);
	});

	it('returns "Missing" when second input ommits object props', () => {
		const a = { aa: true };
		const b = {};
		const d = { aa: Missing };

		expect(diff(a, b)).to.be.eql(d);
	});

	it('returns custom missing when second input ommits array items', () => {
		const MISSING = 'MISSING';
		const sparse = [1];

		sparse[2] = 3;

		const a = [1, 2, 3];
		const b = sparse;
		const d = [Same, MISSING, Same];

		expect(diff(a, b, MISSING)).to.be.eql(d);
	});

	it('returns differences (new values) for two different object inputs', () => {
		const o = { aa: 1, bb: [1, 2, 3], cc: {} };
		const a = { a: [1, 2], o, x: { y: 'z' } };
		const b = { a: [1, 2, 3], b: true, o, x: { y: 'z' }  };
		const d = { a: [1, 2, 3], b: true, o: Same, x: { y: 'z' }  };

		expect(diff(a, b)).to.be.eql(d);
		expect(diff(null, undefined)).to.be.equal(undefined);
	});

	it('returns differences (new values) for two different array inputs', () => {
		const sparse = [1];

		sparse[2] = 3;
		sparse[3] = 4;

		const a = sparse;
		const b = [1, 2, 4];
		const d = [Same, 2, 4, Missing];

		expect(diff(a, b)).to.be.eql(d);
	});
});
