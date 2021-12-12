import { assignStrictDeep } from './assign-strict-deep';

describe('assignStrictDeep', () => {
	it('returns modified target object', () => {
		const source0 = {
			a: [
				1,
				2,
			],
			o: {
				a: [
					11,
					22,
				],
			},
			v: true,
		};

		const dest = {};
		const ret = assignStrictDeep(dest, source0);

		expect(ret).to.be.eql(source0);
		expect(ret).to.be.equal(dest);
		expect(dest).not.to.be.equal(source0);

		// ---------------------------------------------------------------------
		const source1 = {
			o: {
				a: [
					111,
					222,
					333,
				],
				v: 'true:1',
			},
		};

		expect(assignStrictDeep({}, source0, source1)).to.be.eql({
			a: [
				1,
				2,
			],
			o: {
				a: [
					111,
					222,
					333,
				],
				v: 'true:1',
			},
			v: true,
		});

		// ---------------------------------------------------------------------
		const source2 = {
			o: {
				o: {
					v: 'true:2',
				},
			},
			aa: [[[], {}]],
		};

		expect(assignStrictDeep({}, source0, source1, source2)).to.be.eql({
			a: [
				1,
				2,
			],
			o: {
				a: [
					111,
					222,
					333,
				],
				o: {
					v: 'true:2',
				},
				v: 'true:1',
			},
			v:  true,
			aa: [[[], {}]],
		});

		// ---------------------------------------------------------------------
		const source3 = {
			o: {
				a: [
					{
						a: {
							v: 'true:3',
						},
					},
					2222,
				],
			},
			v:  false,
			aa: [[0, { x: 'y' }]],
		};

		expect(assignStrictDeep({}, source0, source1, source2, source3)).to.be.eql({
			a: [
				1,
				2,
			],
			o: {
				a: [
					{
						a: {
							v: 'true:3',
						},
					},
					2222,
				],
				o: {
					v: 'true:2',
				},
				v: 'true:1',
			},
			v:  false,
			aa: [[0, { x: 'y' }]],
		});
	});

	it('returns unmodified target array', () => {
		const source0 = [
			1,
			2,
		];

		const dest: any[] = [];
		const ret = assignStrictDeep(dest, source0);

		expect(ret).to.be.eql([]);
		expect(ret).to.be.equal(dest);
		expect(dest).not.to.be.equal(source0);
	});
});
