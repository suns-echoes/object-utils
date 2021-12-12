import { assignDeep } from './assign-deep';

describe('assignDeep', () => {
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
		const ret = assignDeep(dest, source0);

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

		expect(assignDeep({}, source0, source1)).to.be.eql({
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

		expect(assignDeep({}, source0, source1, source2)).to.be.eql({
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

		expect(assignDeep({}, source0, source1, source2, source3)).to.be.eql({
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
					333,
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

	it('returns modified target array', () => {
		const source0 = [
			[
				1,
				2,
			],
			{
				a: [
					11,
					22,
				],
			},
			true,
		];

		const dest: any[] = [];
		const ret = assignDeep(dest, source0);

		expect(ret).to.be.eql(source0);
		expect(ret).to.be.equal(dest);
		expect(dest).not.to.be.equal(source0);
	});
});
