import { of } from './of';


describe('of', () => {
	it('returns new object from strings', () => {
		expect(of(
			'a', 1,
			'b', true,
			'c', null,
		)).to.be.eql({
			a: 1,
			b: true,
			c: null,
		});
	});

	it('returns new object from arrays', () => {
		expect(of(
			['a', 1],
			[
				'b', true,
				'c', null,
			],
		)).to.be.eql({
			a: 1,
			b: true,
			c: null,
		});
	});

	it('returns new object from objects', () => {
		expect(of(
			{ a: 1 },
			{
				b: true,
				c: null,
			},
		)).to.be.eql({
			a: 1,
			b: true,
			c: null,
		});
	});

	it('returns new object from mixed input', () => {
		expect(of(
			'a1', 1, 'b1', true, 'c1', null,
			['a2', 1], ['b2', true, 'c2', null],
			{ a3: 1 }, { b3: true, c3: null },
		)).to.be.eql({
			a1: 1, b1: true, c1: null,
			a2: 1, b2: true, c2: null,
			a3: 1, b3: true, c3: null,
		});
	});
});
