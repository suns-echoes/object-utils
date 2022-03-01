import { squash } from './squash';


describe('squash', () => {
	it('returns new object with squashed aproperties', () => {
		const prototypeA = {
			a: 1,
			b: 2,
			c: 3,
		};
		const prototypeB = {
			c: 33,
			d: 44,
		};
		const object = {
			a: 111,
			d: 444,
		};

		Object.setPrototypeOf(prototypeB, prototypeA);
		Object.setPrototypeOf(object, prototypeB);

		expect(squash(object)).to.be.eql({
			a: 111,
			b: 2,
			c: 33,
			d: 444,
		});
	});

	it('returns "null" for non-object input', () => {
		// @ts-ignore
		expect(squash('wot?!')).to.be.null;
	});
});
