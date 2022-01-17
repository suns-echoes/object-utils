import { freezeDeep } from './freeze-deep';


describe('freezeDeep', () => {
	it('fails to set object property', () => {
		const a: AnyObject = { x: 'y' };

		freezeDeep(a);

		const fail = (): void => {
			a.x = '';
			a.y = '';
		};

		expect(fail).to.throw(TypeError);
		expect(a.x).to.be.equal('y');
		expect(a.y).to.be.undefined;

		expect(a).to.be.frozen;
	});

	it('fails to set array item', () => {
		const a: AnyArray = ['y'];

		freezeDeep(a);

		const fail = (): void => {
			a[0] = '';
			a[1] = '';
		};

		expect(fail).to.throw(TypeError);
		expect(a[0]).to.be.equal('y');
		expect(a[1]).to.be.undefined;

		expect(a[0]).to.be.frozen;
	});

	it('fails to set nested object property', () => {
		const a: AnyObject = { x: { y: 1 } };

		freezeDeep(a);

		const fail = (): void => {
			a.x.y = 0;
			a.x.z = 0;
		};

		expect(fail).to.throw(TypeError);
		expect(a.x.y).to.be.equal(1);
		expect(a.x.z).to.be.undefined;

		expect(a).to.be.frozen;
		expect(a.x).to.be.frozen;
	});

	it('fails to set nested array item', () => {
		const a: AnyObject = [[1]];

		freezeDeep(a);

		const fail = (): void => {
			a[0][0] = 0;
			a[0][1] = 0;
		};

		expect(fail).to.throw(TypeError);
		expect(a[0][0]).to.be.equal(1);
		expect(a[0][1]).to.be.undefined;

		expect(a[0]).to.be.frozen;
		expect(a[0][1]).to.be.frozen;
	});
});
