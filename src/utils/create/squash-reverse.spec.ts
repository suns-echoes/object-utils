import { squashReverse } from './squash-reverse';


describe('squashReverse', () => {
	it('returns new object with squashed aproperties', () => {
		const prototypeA = {
			a: 1,
			d: 4,
		};
		const prototypeB = {
			c: 33,
			d: 44,
		};
		const object = {
			a: 111,
			b: 222,
			c: 444,
		};

		Object.setPrototypeOf(prototypeB, prototypeA);
		Object.setPrototypeOf(object, prototypeB);

		expect(squashReverse(object)).to.be.eql({
			a: 1,
			b: 222,
			c: 33,
			d: 4,
		});
	});

	it('returns "null" for non-object input', () => {
		// @ts-ignore
		expect(squashReverse('wot?!')).to.be.null;
	});
});
