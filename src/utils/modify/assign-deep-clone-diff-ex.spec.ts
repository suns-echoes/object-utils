import { Same } from '../constants';
import { assignDeepCloneDiffEx } from './assign-deep-clone-diff-ex';


describe('assignDeepCloneDiffEx', () => {
	it('returns the "Same" symbol for equal object instances', () => {
		const o = {};

		expect(assignDeepCloneDiffEx(o, o)).to.be.equal(Same);
	});

	it('returns the "Same" symbol for two deeply equal objects', () => {
		const a: AnyArray = [[], {}, 1];
		const t = { a, o: { a, o: {}, n: 2 }, n: 3 };
		const s = { a, o: { a, o: {}, n: 2 }, n: 3 };

		expect(assignDeepCloneDiffEx(t, s)).to.be.equal(Same);
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

		expect(assignDeepCloneDiffEx(t, s)).to.be.eql({
			a: [[1], {}],
			o: { a: [], o: { y: 5 } },
			n: undefined,
			v: {},
			w: [],
		});

		expect(t).to.be.eql({
			a: [[1], {}],
			o: { a: [], o: { y: 5 }, n: 2 },
			n: undefined,
			v: {},
			w: [],
		});
	});

	it('throws for invalid inputs', () => {
		expect(() => {
			// @ts-ignore
			assignDeepCloneDiffEx(1, {});
		}).to.throw(TypeError);

		expect(() => {
			// @ts-ignore
			assignDeepCloneDiffEx({}, 1);
		}).to.throw(TypeError);
	});

	it('passes a simple CRUD test', () => {
		const target = {
			users: {
				1: { name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				2: { name: 'f', hash: 'R56H', posts: [10, 11, 12] },
			},
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
				sub: {
					users: {
						sub: {
							a: {
								empty: true,
							},
							f: {
								restricted: true,
								sub: {
									xx: {
										empty: true,
									},
								},
							},
						},
					},
				},
			},
		};

		// ---------------------------------------------------------------------
		const createUser = {
			users: {
				3: { name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			},
			posts: {
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				sub: {
					users: {
						sub: {
							h: {
								empty: true,
								restricted: true,
							},
						},
					},
				},
			},
		};

		// Check diff tree of create.
		expect(assignDeepCloneDiffEx(target, createUser)).to.be.eql({
			users: {
				3: { name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			},
			posts: {
				233: { content: 'h1' },
				344: { content: 'h2' },
				933: { content: 'h3' },
			},
			fs: {
				sub: {
					users: {
						sub: {
							h: {
								empty: true,
								restricted: true,
							},
						},
					},
				},
			},
		});

		// Check create result.
		expect(target).to.be.eql({
			users: {
				1: { name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				2: { name: 'f', hash: 'R56H', posts: [10, 11, 12] },
				3: { name: 'h', hash: 'AA34', posts: [233, 344, 933] },
			},
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
				sub: {
					users: {
						sub: {
							a: {
								empty: true,
							},
							f: {
								restricted: true,
								sub: {
									xx: {
										empty: true,
									},
								},
							},
							h: {
								empty: true,
								restricted: true,
							},
						},
					},
				},
			},
		});

		// ---------------------------------------------------------------------
		const updateUserData = {
			users: {
				3: { name: 'cc', posts: [233, 344, 933, 1000, 10001] },
			},
			fs: {
				sub: {
					users: {
						sub: {
							h: undefined,
							cc: {
								// @ts-ignore
								...target.fs.sub.users.sub.h,
								restricted: false,
							},
						},
					},
				},
			},
		};

		// Check diff tree of update.
		expect(assignDeepCloneDiffEx(target, updateUserData)).to.be.eql({
			users: {
				3: { name: 'cc', posts: [233, 344, 933, 1000, 10001] },
			},
			fs: {
				sub: {
					users: {
						sub: {
							h: undefined,
							cc: {
								empty: true,
								restricted: false,
							},
						},
					},
				},
			},
		});

		// Check update result.
		expect(target).to.be.eql({
			users: {
				1: { name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				2: { name: 'f', hash: 'R56H', posts: [10, 11, 12] },
				3: { name: 'cc', hash: 'AA34', posts: [233, 344, 933, 1000, 10001] },
			},
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
				sub: {
					users: {
						sub: {
							a: {
								empty: true,
							},
							f: {
								restricted: true,
								sub: {
									xx: {
										empty: true,
									},
								},
							},
							h: undefined,
							cc: {
								empty: true,
								restricted: false,
							},
						},
					},
				},
			},
		});

		// ---------------------------------------------------------------------
		const deleteUser = {
			users: {
				2: undefined,
			},
			posts: {
				10: undefined,
				11: undefined,
				12: undefined,
			},
			fs: {
				sub: {
					users: {
						sub: {
							f: undefined,
						},
					},
				},
			},
		};

		// Check diff tree of delete.
		expect(assignDeepCloneDiffEx(target, deleteUser)).to.be.eql({
			users: {
				2: undefined,
			},
			posts: {
				10: undefined,
				11: undefined,
				12: undefined,
			},
			fs: {
				sub: {
					users: {
						sub: {
							f: undefined,
						},
					},
				},
			},
		});

		// Check delete result.
		expect(target).to.be.eql({
			users: {
				1: { name: 'a', hash: 'FER4', posts: [1, 2, 3, 4] },
				2: undefined,
				3: { name: 'cc', hash: 'AA34', posts: [233, 344, 933, 1000, 10001] },
			},
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
				sub: {
					users: {
						sub: {
							a: {
								empty: true,
							},
							f: undefined,
							h: undefined,
							cc: {
								empty: true,
								restricted: false,
							},
						},
					},
				},
			},
		});
	});
});
