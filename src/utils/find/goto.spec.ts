import { goto } from './goto';

describe('goto', () => {
	it('returns element targeted by given string path', () => {
		const o = { a: { b: { c: { d: 'ok' } } } };

		expect(goto(o, 'a.b.c.d')).to.be.equal('ok');
		expect(goto(o, 'a.b.c')).to.be.eql({ d: 'ok' });
	});

	it('returns element targeted by given array path', () => {
		const o = { a: { b: { c: { d: 'ok' } } } };

		expect(goto(o, 'a.b.c.d'.split('.'))).to.be.equal('ok');
		expect(goto(o, 'a.b.c'.split('.'))).to.be.eql({ d: 'ok' });
	});

	it('returns root element when empty or no path is given', () => {
		const o = { a: { b: { c: { d: 'ok' } } } };

		expect(goto(o, '')).to.be.equal(o);
		expect(goto(o, [])).to.be.equal(o);
		expect(goto(o, [''])).to.be.equal(o);
		expect(goto(o)).to.be.equal(o);
	});

	it('returns undefined if element is not found', () => {
		const o = { a: { b: { c: { d: 'ok' } } } };

		expect(goto(o, 'a.b.c.d.e')).to.be.undefined;
		expect(goto(o, 'a.b.d')).to.be.undefined;
		expect(goto(o, 'x')).to.be.undefined;
		expect(goto(o, 'a.b.c.d.e'.split('.'))).to.be.undefined;
		expect(goto(o, 'a.b.d'.split('.'))).to.be.undefined;
		expect(goto(o, 'x'.split('.'))).to.be.undefined;
	});
});
