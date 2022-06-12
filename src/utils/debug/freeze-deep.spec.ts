import { freezeDeep } from './freeze-deep';


describe('freezeDeep', () => {
	it('fails to add object property', () => {
		const a: AnyObject = {};

		freezeDeep(a);

		const fail = (): void => {
			a.x = '';
		};

		expect(fail).to.throw();
		expect(a.x).to.be.undefined;

		expect(a).to.be.frozen;
	});

	it('fails to add array item', () => {
		const a: AnyArray = [];

		freezeDeep(a);

		const fail = (): void => {
			a[0] = '';
		};

		expect(fail).to.throw();
		expect(a[0]).to.be.undefined;

		expect(a[0]).to.be.frozen;
	});

	it('fails to add nested object property', () => {
		const a: AnyObject = { x: {} };

		freezeDeep(a);

		const fail = (): void => {
			a.x.y = 0;
		};

		expect(fail).to.throw();
		expect(a.x.y).to.be.undefined;

		expect(a).to.be.frozen;
	});

	it('fails to add nested array item', () => {
		const a: AnyObject = [[]];

		freezeDeep(a);

		const fail = (): void => {
			a[0][0] = 0;
		};

		expect(fail).to.throw();
		expect(a[0][0]).to.be.undefined;

		expect(a[0]).to.be.frozen;
	});

	it('fails to set object property', () => {
		const a: AnyObject = { x: 'y' };

		freezeDeep(a);

		const fail = (): void => {
			a.x = '';
		};

		expect(fail).to.throw();
		expect(a.x).to.be.equal('y');

		expect(a).to.be.frozen;
	});

	it('fails to set array item', () => {
		const a: AnyArray = ['y'];

		freezeDeep(a);

		const fail = (): void => {
			a[0] = '';
		};

		expect(fail).to.throw();
		expect(a[0]).to.be.equal('y');

		expect(a[0]).to.be.frozen;
	});

	it('fails to set nested object property', () => {
		const a: AnyObject = { x: { y: 1 } };

		freezeDeep(a);

		const fail = (): void => {
			a.x.y = 0;
		};

		expect(fail).to.throw();
		expect(a.x.y).to.be.equal(1);

		expect(a).to.be.frozen;
	});

	it('fails to set nested array item', () => {
		const a: AnyObject = [[1]];

		freezeDeep(a);

		const fail = (): void => {
			a[0][0] = 0;
		};

		expect(fail).to.throw();
		expect(a[0][0]).to.be.equal(1);

		expect(a[0]).to.be.frozen;
	});

	it('fails to delete object property', () => {
		const a: AnyObject = { x: 'y' };

		freezeDeep(a);

		const fail = (): void => {
			delete a.x;
		};

		expect(fail).to.throw();
		expect(a.x).to.be.equal('y');

		expect(a).to.be.frozen;
	});

	it('fails to delete array item', () => {
		const a: AnyArray = ['y'];

		freezeDeep(a);

		const fail = (): void => {
			delete a[0];
		};

		expect(fail).to.throw();
		expect(a[0]).to.be.equal('y');

		expect(a[0]).to.be.frozen;
	});

	it('fails to delete nested object property', () => {
		const a: AnyObject = { x: { y: 1 } };

		freezeDeep(a);

		const fail = (): void => {
			delete a.x.y;
		};

		expect(fail).to.throw();
		expect(a.x.y).to.be.equal(1);

		expect(a).to.be.frozen;
	});

	it('fails to delete nested array item', () => {
		const a: AnyObject = [[1]];

		freezeDeep(a);

		const fail = (): void => {
			delete a[0][0];
		};

		expect(fail).to.throw();
		expect(a[0][0]).to.be.equal(1);

		expect(a[0]).to.be.frozen;
	});
});
