import { isObject } from './is-object';

describe('isObject', () => {
	it('returns true for objects', () => {
		expect(isObject(new Boolean(''))).to.be.true;
		expect(isObject(new Number(''))).to.be.true;
		expect(isObject(new String(''))).to.be.true;
		expect(isObject([])).to.be.true;
		expect(isObject({})).to.be.true;
		expect(isObject(Object.create(null))).to.be.true;
		expect(isObject(() => undefined)).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isObject(function () {})).to.be.true;
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isObject(function* () {})).to.be.true;
	});

	it('returns false for non-object values', () => {
		expect(isObject(undefined)).to.be.false;
		expect(isObject(false)).to.be.false;
		expect(isObject(0)).to.be.false;
		expect(isObject(null)).to.be.false;
		expect(isObject(Symbol())).to.be.false;
		expect(isObject('')).to.be.false;
	});
});
