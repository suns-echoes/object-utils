import { getOwnPropertyIteratorDeep } from './get-own-property-iterator-deep';


describe('getOwnPropertyIteratorDeep', () => {
	it('returns iterator that gets objects and arrays own enumerable poperties with delimited string key path', () => {
		const data: any = {
			a: 1,
			b: [
				2,
				[2.2],
				{ x: -2 },
			],
			c: {
				aa: 11,
				bb: [
					22,
					[22.2],
					{ xx: -22 },
				],
				cc: {

				},
				dd: undefined,
			},
			d: null,
		};

		data.b.prop = true;

		const iterator = getOwnPropertyIteratorDeep(data, '.');

		expect(iterator).to.have.property('next');

		const props = [];
		let prop;

		while (!(prop = iterator!.next()).done) {
			props.push(prop.value);
		}

		expect(props).to.be.eql([
			['a', 1],
			['b.0', 2],
			['b.1.0', 2.2],
			['b.2.x', -2],
			['b.prop', true],
			['c.aa', 11],
			['c.bb.0', 22],
			['c.bb.1.0', 22.2],
			['c.bb.2.xx', -22],
			['c.dd', undefined],
			['d', null],
		]);
	});

	it('returns iterator that gets objects and arrays own enumerable poperties with strings array key path', () => {
		const data: any = [
			1,
			[
				2,
				[2.2],
				{ x: -2 },
			],
			{
				aa: 11,
				bb: [
					22,
					[22.2],
					{ xx: -22 },
				],
				cc: {

				},
				dd: undefined,
			},
			null,
		];

		data[1].prop = true;

		const iterator = getOwnPropertyIteratorDeep(data);

		expect(iterator).to.have.property('next');

		const props = [];
		let prop;

		while (!(prop = iterator!.next()).done) {
			props.push(prop.value);
		}

		expect(props).to.be.eql([
			[['0'], 1],
			[['1', '0'], 2],
			[['1', '1', '0'], 2.2],
			[['1', '2', 'x'], -2],
			[['1', 'prop'], true],
			[['2', 'aa'], 11],
			[['2', 'bb', '0'], 22],
			[['2', 'bb', '1', '0'], 22.2],
			[['2', 'bb', '2', 'xx'], -22],
			[['2', 'dd'], undefined],
			[['3'], null],
		]);
	});

	it('returns null if object is not type of object', () => {
		// @ts-ignore
		expect(getOwnPropertyIteratorDeep('')).to.be.null;
	});
});
