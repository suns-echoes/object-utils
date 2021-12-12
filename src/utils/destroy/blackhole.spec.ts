import { blackhole } from './blackhole';

describe('blackhole', () => {
	it('disintegrates all objects references', () => {
		function f():void {
			return undefined;
		}
		const faf: any = (): void => undefined;
		const s = Symbol('self');
		const a: any = [0, 1, 2, null];
		const o: any = { a: 'a', b: 'b', c: 'c', n: null };
		const m: any = { a, o, lvl: { a, o }, n: null };

		f[s] = f;
		f.f = f;
		f.faf = faf;
		f.m = m;
		f.o = o;
		f.a = a;

		faf[s] = faf;
		faf.f = f;
		faf.faf = faf;
		faf.m = m;
		faf.o = o;
		faf.a = a;

		a[s] = a;
		a.push(f);
		a.push(faf);
		a.push(m);
		a.push(o);
		a.push(a);

		o[s] = o;
		o.d = m;
		o.e = o;
		o.f = o;

		m[s] = m;
		m.m = m;

		blackhole(m);

		expect({ ...f }).to.be.eql({ [s]: undefined, f: undefined, faf: undefined, m: undefined, o: undefined, a: undefined });
		expect({ ...faf }).to.be.eql({ [s]: undefined, f: undefined, faf: undefined, m: undefined, o: undefined, a: undefined });
		expect({ ...a }).to.be.eql({ [s]: undefined });
		expect(o).to.be.eql({ [s]: undefined, a: undefined, b: undefined, c: undefined, d: undefined, e: undefined, f: undefined, n: undefined });
		expect(m).to.be.eql({ [s]: undefined, m: undefined, a: undefined, o: undefined, lvl: undefined, n: undefined });

		const no = Object.create(null);

		no.a = no;

		blackhole(no);

		expect(no).to.be.eql({ a: undefined });
	});
});
