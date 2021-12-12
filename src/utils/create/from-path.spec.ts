import { fromPath } from './from-path';

describe('fromPath', () => {
	it('returns object that reflects given string path', () => {
		expect(fromPath('')).to.be.eql({});
		expect(fromPath('', true)).to.be.eql({});
		expect(fromPath('a:b:c:d', undefined, ':')).to.be.eql({ a: { b: { c: { d: undefined } } } });
		expect(fromPath('a:b:c:d', true, ':')).to.be.eql({ a: { b: { c: { d: true } } } });
	});

	it('returns object that reflects given array path', () => {
		expect(fromPath([])).to.be.eql({});
		expect(fromPath([''], true)).to.be.eql({});
		expect(fromPath('a:b:c:d'.split(':'))).to.be.eql({ a: { b: { c: { d: undefined } } } });
		expect(fromPath('a:b:c:d'.split(':'), true)).to.be.eql({ a: { b: { c: { d: true } } } });
	});
});
