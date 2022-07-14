import { getOwnPropertyIteratorDeepEx } from './get-own-property-iterator-deep-ex';


describe('getOwnPropertyIteratorDeepEx', () => {
	it('returns iterator that gets objects own enumerable poperties with delimited string key path', () => {
		const iterator = getOwnPropertyIteratorDeepEx({
			a: 1,
			b: [2, [2.2], { x: -2 }],
			c: {
				aa: 11,
				bb: [22, [22.2], { xx: -22 }],
				cc: {

				},
				dd: undefined,
			},
			d: null,
		}, '.');

		expect(iterator).to.have.property('next');

		const props = [];
		let prop;

		while (!(prop = iterator!.next()).done) {
			props.push(prop.value);
		}

		expect(props).to.be.eql([
			['a', 1],
			['b', [2, [2.2], { x: -2 }]],
			['c.aa', 11],
			['c.bb', [22, [22.2], { xx: -22 }]],
			['c.dd', undefined],
			['d', null],
		]);
	});

	it('returns iterator that gets objects own enumerable poperties with strings array key path', () => {
		const iterator = getOwnPropertyIteratorDeepEx({
			a: 1,
			b: [2, [2.2], { x: -2 }],
			c: {
				aa: 11,
				bb: [22, [22.2], { xx: -22 }],
				cc: {

				},
				dd: undefined,
			},
			d: null,
		});

		expect(iterator).to.have.property('next');

		const props = [];
		let prop;

		while (!(prop = iterator!.next()).done) {
			props.push(prop.value);
		}

		expect(props).to.be.eql([
			[['a'], 1],
			[['b'], [2, [2.2], { x: -2 }]],
			[['c', 'aa'], 11],
			[['c', 'bb'], [22, [22.2], { xx: -22 }]],
			[['c', 'dd'], undefined],
			[['d'], null],
		]);
	});

	it('returns null if object is not type of object', () => {
		// @ts-ignore
		expect(getOwnPropertyIteratorDeepEx('')).to.be.null;
	});
});
