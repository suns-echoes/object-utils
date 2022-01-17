import { flat } from './flat';


describe('flat', () => {
	it('returns fully flatten object', () => {
		const a = [
			1,
			[
				2,
				{
					b: 3,
					c: {
						d: 4,
					},
				},
			],
		];

		const i = [
			7,
			8,
		];

		const o = {
			a,
			e: {
				f: 5,
				g: {
					h: 6,
					i,
				},
			},
		};

		expect(flat(o, -1)).to.be.eql({
			'a.0':       1,
			'a.1.0':     2,
			'a.1.1.b':   3,
			'a.1.1.c.d': 4,
			'e.f':       5,
			'e.g.h':     6,
			'e.g.i.0':   7,
			'e.g.i.1':   8,
		});
	});

	it('returns one-level flatten object', () => {
		const a = [
			1,
			[
				2,
				{
					b: 3,
					c: {
						d: 4,
					},
				},
			],
		];

		const g = [
			6,
			7,
		];

		const o = {
			a,
			e: {
				f: 5,
				g,
			},
		};

		expect(flat(o)).to.be.eql({
			'a.0': 1,
			'a.1': a[1],
			'e.f': 5,
			'e.g': g,
		});
	});

	it('returns deppest flatten object properties', () => {
		const a = [
			1,
			[
				2,
				{
					b: 3,
					c: {
						d: 4,
					},
				},
			],
		];

		const i = [
			7,
			8,
		];

		const o = {
			a,
			e: {
				f: 5,
				g: {
					a: 6,
					i,
				},
			},
		};

		expect(flat(o, -1, false)).to.be.eql({
			'0': 7,
			'1': 8,
			'a': 6,
			'b': 3,
			'd': 4,
			'f': 5,
		});
	});

	it('returns null if source is not an object', () => {
		// @ts-ignore
		expect(flat('wot?!')).to.be.null;
	});
});
