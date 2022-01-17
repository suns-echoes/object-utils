import { flatStrict } from './flat-strict';


describe('flatStrict', () => {
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

		expect(flatStrict(o, -1)).to.be.eql({
			'a':     a,
			'e.f':   5,
			'e.g.h': 6,
			'e.g.i': i,
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

		expect(flatStrict(o)).to.be.eql({
			'a':   a,
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

		expect(flatStrict(o, -1, false)).to.be.eql({
			'a': 6,
			'f': 5,
			'i': i,
		});
	});

	it('returns null if source is not an object or is an array', () => {
		// @ts-ignore
		expect(flatStrict('wot?!')).to.be.null;
		expect(flatStrict(['wot?!'])).to.be.null;
	});
});
