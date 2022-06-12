import { isObjectLike } from './is-object-like';


describe('isObjectLike', () => {
	it('returns true for objects', () => {
		expect(isObjectLike(new Boolean(''))).to.be.true;
		expect(isObjectLike(new Number(''))).to.be.true;
		expect(isObjectLike(new String(''))).to.be.true;
		expect(isObjectLike(new Map())).to.be.true;
		expect(isObjectLike(new Set())).to.be.true;
		expect(isObjectLike([])).to.be.true;
		expect(isObjectLike({})).to.be.true;
		expect(isObjectLike(Object.create(null))).to.be.true;
		expect(isObjectLike(() => undefined)).to.be.true;
		expect(isObjectLike(async () => undefined)).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isObjectLike(function () {})).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isObjectLike(async function () {})).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isObjectLike(function* () {})).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isObjectLike(async function* () {})).to.be.true;
	});

	it('returns false for non-object values', () => {
		expect(isObjectLike(undefined)).to.be.false;
		expect(isObjectLike(false)).to.be.false;
		expect(isObjectLike(0)).to.be.false;
		expect(isObjectLike(null)).to.be.false;
		expect(isObjectLike(Symbol())).to.be.false;
		expect(isObjectLike('')).to.be.false;
	});
});
