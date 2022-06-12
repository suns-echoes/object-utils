import { Same } from '../constants';
import { assignDeepCloneDiff } from './assign-deep-clone-diff';


describe('assignDeepCloneDiff', () => {
	it('returns the "Same" symbol for equal object instances', () => {
		const o = {};

		expect(assignDeepCloneDiff(o, o)).to.be.equal(Same);
	});

	it('returns the "Same" symbol for two deeply equal objects', () => {
		const t = { a: [[], {}, 1], o: { a: [], o: {}, n: 2 }, n: 3 };
		const s = { a: [[], {}, 1], o: { a: [], o: {}, n: 2 }, n: 3 };

		expect(assignDeepCloneDiff(t, s)).to.be.equal(Same);
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

		expect(assignDeepCloneDiff(t, s)).to.be.eql({
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
			assignDeepCloneDiff(1, {});
		}).to.throw(TypeError);

		expect(() => {
			// @ts-ignore
			assignDeepCloneDiff({}, 1);
		}).to.throw(TypeError);
	});

	it('passes a simple CRUD test', () => {
		const target = {
			users: [
				{ id: 1, name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				{ id: 2, name: 'f', hash: 'R56H', posts: [10, 11, 12] },
			],
			posts: [
				{ id: 1, content: 'a1' },
				{ id: 2, content: 'a2' },
				{ id: 3, content: 'a3' },
				{ id: 4, content: 'a4' },
				{ id: 10, content: 'f1' },
				{ id: 11, content: 'f2' },
				{ id: 12, content: 'f3' },
			],
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
				7: { id: 233, content: 'h1' },
				8: { id: 344, content: 'h2' },
				9: { id: 933, content: 'h3' },
			},
			fs: {
				sub: [
					{
						sub: [
							[],
							[],
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
		expect(assignDeepCloneDiff(target, createUser)).to.be.eql({
			users: [
				Same,
				Same,
				{ id: 3, name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			],
			posts: [
				Same,
				Same,
				Same,
				Same,
				Same,
				Same,
				Same,
				{ id: 233, content: 'h1' },
				{ id: 344, content: 'h2' },
				{ id: 933, content: 'h3' },
			],
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
			posts: [
				{ id: 1, content: 'a1' },
				{ id: 2, content: 'a2' },
				{ id: 3, content: 'a3' },
				{ id: 4, content: 'a4' },
				{ id: 10, content: 'f1' },
				{ id: 11, content: 'f2' },
				{ id: 12, content: 'f3' },
				{ id: 233, content: 'h1' },
				{ id: 344, content: 'h2' },
				{ id: 933, content: 'h3' },
			],
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
			users: {
				2: { name: 'cc', posts: [233, 344, 933, 1000, 10001] },
			},
			fs: {
				sub: {
					0: {
						sub: {
							2: { restricted: false },
						},
					},
				},
			},
		};

		// Check diff tree of update.
		expect(assignDeepCloneDiff(target, updateUserData)).to.be.eql({
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
			posts: [
				{ id: 1, content: 'a1' },
				{ id: 2, content: 'a2' },
				{ id: 3, content: 'a3' },
				{ id: 4, content: 'a4' },
				{ id: 10, content: 'f1' },
				{ id: 11, content: 'f2' },
				{ id: 12, content: 'f3' },
				{ id: 233, content: 'h1' },
				{ id: 344, content: 'h2' },
				{ id: 933, content: 'h3' },
			],
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
				{ id: 3, name: 'cc', hash: 'AA34', posts: [233, 344, 933, 1000, 10001] },
			],
			posts: {
				4: undefined,
				5: undefined,
				6: undefined,
			},
			fs: {
				sub: {
					0: {
						sub: [
							[],
							undefined,
						],
					},
				},
			},
		};

		// Check diff tree of delete.
		expect(assignDeepCloneDiff(target, deleteUser)).to.be.eql({
			users: [
				Same,
				undefined,
				Same,
			],
			posts: [
				Same,
				Same,
				Same,
				Same,
				undefined,
				undefined,
				undefined,
			],
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
			posts: [
				{ id: 1, content: 'a1' },
				{ id: 2, content: 'a2' },
				{ id: 3, content: 'a3' },
				{ id: 4, content: 'a4' },
				undefined,
				undefined,
				undefined,
				{ id: 233, content: 'h1' },
				{ id: 344, content: 'h2' },
				{ id: 933, content: 'h3' },
			],
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
