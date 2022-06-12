import { Same } from '../constants';
import { assignDeepCloneDiffStrict } from './assign-deep-clone-diff-strict';


describe('assignDeepCloneDiffStrict', () => {
	it('returns the "Same" symbol for equal object instances', () => {
		const o = {};

		expect(assignDeepCloneDiffStrict(o, o)).to.be.equal(Same);
	});

	it('returns the "Same" symbol for two deeply equal objects', () => {
		const t = { a: [[], {}, 1], o: { a: [], o: {}, n: 2 }, n: 3 };
		const s = { a: [[], {}, 1], o: { a: [], o: {}, n: 2 }, n: 3 };

		expect(assignDeepCloneDiffStrict(t, s)).to.be.equal(Same);
	});

	it('assigns source clones', () => {
		const ta: AnyArray = [];
		const to = {};

		const sa: AnyArray = [];
		const so = {};

		let target: any = { x: ta, y: to };

		expect(assignDeepCloneDiffStrict(target, { x: so, y: sa })).to.be.eql({ x: so, y: sa });
		expect(target).to.be.eql({ x: so, y: sa });
		expect(target.x).not.to.be.equal(so);
		expect(target.y).not.to.be.equal(sa);

		target = [ta, to];

		expect(assignDeepCloneDiffStrict(target, [so, sa])).to.be.eql([so, sa]);
		expect(target).to.be.eql([so, sa]);
		expect(target[0]).not.to.be.equal(so);
		expect(target[1]).not.to.be.equal(sa);
	});

	it('assigns new values from object and returns diff tree', () => {
		const t = {
			a: [[], {}, 1],
			o: { a: [1], o: {}, n: 2 },
			n: 3,
			v: null,
			w: null,
		};

		const s = {
			a: [[1], {}],
			o: { a: [], o: { y: 5 } },
			n: undefined,
			v: {},
			w: [],
		};

		expect(assignDeepCloneDiffStrict(t, s)).to.be.eql({
			a: [[1], Same],
			o: { o: { y: 5 } },
			n: undefined,
			v: {},
			w: [],
		});

		expect(t).to.be.eql({
			a: [[1], {}, 1],
			o: { a: [1], o: { y: 5 }, n: 2 },
			n: undefined,
			v: {},
			w: [],
		});
	});

	it('throws for invalid inputs', () => {
		expect(() => {
			// @ts-ignore
			assignDeepCloneDiffStrict(1, {});
		}).to.throw(TypeError);

		expect(() => {
			// @ts-ignore
			assignDeepCloneDiffStrict({}, 1);
		}).to.throw(TypeError);
	});

	it('passes a simple CRUD test', () => {
		const target = {
			users: [
				{ id: 1, name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				{ id: 2, name: 'f', hash: 'R56H', posts: [10, 11, 12] },
			],
			posts: {
				1: { content: 'a1' },
				2: { content: 'a2' },
				3: { content: 'a3' },
				4: { content: 'a4' },
				10: { content: 'f1' },
				11: { content: 'f2' },
				12: { content: 'f3' },
			},
			fs: {
				name: '.',
				sub: [
					{
						name: 'users',
						sub: [
							{
								name: 'a',
								empty: true,
							},
							{
								name: 'f',
								restricted: true,
								sub: [
									{
										name: 'xx',
										empty: true,
									},
								],
							},
						],
					},
				],
			},
		};

		// ---------------------------------------------------------------------
		const createUser = {
			users: [
				{},
				{},
				{ id: 3, name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			],
			posts: {
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				sub: [
					{
						sub: [
							{},
							{},
							{
								name: 'h',
								empty: true,
								restricted: true,
							},
						],
					},
				],
			},
		};

		// Check diff tree of create.
		expect(assignDeepCloneDiffStrict(target, createUser)).to.be.eql({
			users: [
				Same,
				Same,
				{ id: 3, name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			],
			posts: {
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				sub: [
					{
						sub: [
							Same,
							Same,
							{
								name: 'h',
								empty: true,
								restricted: true,
							},
						],
					},
				],
			},
		});

		// Check create result.
		expect(target).to.be.eql({
			users: [
				{ id: 1, name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				{ id: 2, name: 'f', hash: 'R56H', posts: [10, 11, 12] },
				{ id: 3, name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			],
			posts: {
				1: { content: 'a1' },
				2: { content: 'a2' },
				3: { content: 'a3' },
				4: { content: 'a4' },
				10: { content: 'f1' },
				11: { content: 'f2' },
				12: { content: 'f3' },
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				name: '.',
				sub: [
					{
						name: 'users',
						sub: [
							{
								name: 'a',
								empty: true,
							},
							{
								name: 'f',
								restricted: true,
								sub: [
									{
										name: 'xx',
										empty: true,
									},
								],
							},
							{
								name: 'h',
								empty: true,
								restricted: true,
							},
						],
					},
				],
			},
		});

		// ---------------------------------------------------------------------
		const updateUserData = {
			users: [
				{},
				{},
				{ name: 'cc', posts: [233, 344, 933, 1000, 10001] },
			],
			fs: {
				sub: [
					{
						sub: [
							{},
							{},
							{ restricted: false },
						],
					},
				],
			},
		};

		// Check diff tree of update.
		expect(assignDeepCloneDiffStrict(target, updateUserData)).to.be.eql({
			users: [
				Same,
				Same,
				{ name: 'cc', posts: [Same, Same, Same, 1000, 10001] },
			],
			fs: {
				sub: [
					{
						sub: [
							Same,
							Same,
							{ restricted: false },
						],
					},
				],
			},
		});

		// Check update result.
		expect(target).to.be.eql({
			users: [
				{ id: 1, name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				{ id: 2, name: 'f', hash: 'R56H', posts: [10, 11, 12] },
				{ id: 3, name: 'cc', hash: 'AA34', posts: [233, 344, 933, 1000, 10001] },
			],
			posts: {
				1: { content: 'a1' },
				2: { content: 'a2' },
				3: { content: 'a3' },
				4: { content: 'a4' },
				10: { content: 'f1' },
				11: { content: 'f2' },
				12: { content: 'f3' },
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				name: '.',
				sub: [
					{
						name: 'users',
						sub: [
							{
								name: 'a',
								empty: true,
							},
							{
								name: 'f',
								restricted: true,
								sub: [
									{
										name: 'xx',
										empty: true,
									},
								],
							},
							{
								name: 'h',
								empty: true,
								restricted: false,
							},
						],
					},
				],
			},
		});

		// ---------------------------------------------------------------------
		const deleteUser = {
			users: [
				{},
				undefined,
				{},
			],
			posts: {
				10: undefined,
				11: undefined,
				12: undefined,
			},
			fs: {
				sub: [
					{
						sub: [
							{},
							undefined,
						],
					},
				],
			},
		};

		// Check diff tree of delete.
		expect(assignDeepCloneDiffStrict(target, deleteUser)).to.be.eql({
			users: [
				Same,
				undefined,
				Same,
			],
			posts: {
				10: undefined,
				11: undefined,
				12: undefined,
			},
			fs: {
				sub: [
					{
						sub: [
							Same,
							undefined,
						],
					},
				],
			},
		});

		// Check delete result.
		expect(target).to.be.eql({
			users: [
				{ id: 1, name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				undefined,
				{ id: 3, name: 'cc', hash: 'AA34', posts: [233, 344, 933, 1000, 10001] },
			],
			posts: {
				1: { content: 'a1' },
				2: { content: 'a2' },
				3: { content: 'a3' },
				4: { content: 'a4' },
				10: undefined,
				11: undefined,
				12: undefined,
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				name: '.',
				sub: [
					{
						name: 'users',
						sub: [
							{
								name: 'a',
								empty: true,
							},
							undefined,
							{
								name: 'h',
								empty: true,
								restricted: false,
							},
						],
					},
				],
			},
		});
	});
});
