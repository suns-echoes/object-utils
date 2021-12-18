import { isLikeObject } from './is-like-object';

describe('isLikeObject', () => {
	it('returns true for objects', () => {
		expect(isLikeObject(new Boolean(''))).to.be.true;
		expect(isLikeObject(new Number(''))).to.be.true;
		expect(isLikeObject(new String(''))).to.be.true;
		expect(isLikeObject([])).to.be.true;
		expect(isLikeObject({})).to.be.true;
		expect(isLikeObject(Object.create(null))).to.be.true;
		expect(isLikeObject(() => undefined)).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isLikeObject(function () {})).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isLikeObject(function* () {})).to.be.true;
	});

	it('returns false for non-object values', () => {
		expect(isLikeObject(undefined)).to.be.false;
		expect(isLikeObject(false)).to.be.false;
		expect(isLikeObject(0)).to.be.false;
		expect(isLikeObject(null)).to.be.false;
		expect(isLikeObject(Symbol())).to.be.false;
		expect(isLikeObject('')).to.be.false;
	});
});
