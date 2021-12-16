import { volatileProxyDeep } from './volatile-proxy-deep';

describe('volatileProxyDeep', () => {
	it('throws on property reassign', () => {
		const a = { x: 'y' };
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			v.x = '';
		};

		expect(fail).to.throw(Error);
		expect(v.x).to.be.equal('y');
	});

	it('throws on array item reassign', () => {
		const a = ['y'];
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			v[0] = '';
		};

		expect(fail).to.throw(Error);
		expect(v[0]).to.be.equal('y');
	});

	it('throws on delete object property', () => {
		const a: AnyObject = { x: 'y' };
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			delete v.x;
		};

		expect(fail).to.throw(Error);
		expect(v.x).to.be.equal('y');
	});

	it('throws on delete array item', () => {
		const a = ['y'];
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			delete v[0];
		};

		expect(fail).to.throw(Error);
		expect(v[0]).to.be.equal('y');
	});

	it('throws on add object property', () => {
		const a: AnyObject = { x: 'y' };
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			v.y = 1;
		};

		expect(fail).to.throw(Error);
		expect(v.y).to.be.undefined;
	});

	it('throws on add array item', () => {
		const a: AnyArray = ['y'];
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			v[1] = 1;
		};

		expect(fail).to.throw(Error);
		expect(v[1]).to.be.undefined;
	});

	it('throws on object define property', () => {
		const a: AnyObject = { x: 'y' };
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			Object.defineProperty(v, 'y', {
				value: true,
			});
		};

		expect(fail).to.throw(Error);
		expect(v.y).to.be.undefined;
	});

	it('throws on array define property', () => {
		const a = ['y'];
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			Object.defineProperty(v, 'y', {
				value: true,
			});
		};

		expect(fail).to.throw(Error);
		// @ts-ignore
		expect(v.y).to.be.undefined;
	});

	it('throws on object prototype set', () => {
		const a = { x: 'y' };
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			Object.setPrototypeOf(v, {});
		};

		expect(fail).to.throw(Error);
	});

	it('throws on array prototype set', () => {
		const a = ['y'];
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			Object.setPrototypeOf(v, {});
		};

		expect(fail).to.throw(Error);
	});

	it('affect properties', () => {
		const a = { x: { y: 'z' } };
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			v.x.y = 't';
		};

		expect(fail).to.throw(Error);
		expect(v.x.y).to.be.equal('z');
	});

	it('affect items', () => {
		const a = [['z']];
		const v = volatileProxyDeep(a);

		const fail = (): void => {
			v[0][0] = 't';
		};

		expect(fail).to.throw(Error);
		expect(v[0][0]).to.be.equal('z');
	});
});
