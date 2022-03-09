import { Same } from '../constants';
import { safeAssignDeepDiff } from './safe-assign-deep-diff';


describe('safeAssignDeepDiff', () => {
	it('returns the "Same" symbol for equal object instances', () => {
		const arr: AnyArray = [];
		const obj = {};

		expect(safeAssignDeepDiff(arr, arr)).to.be.equal(Same);
		expect(safeAssignDeepDiff(obj, obj)).to.be.equal(Same);
	});

	it('reassigns all values without change and returns diff tree', () => {
		const target = {
			prop: 'x',
			arr:  [
				'arr_item',
				['arr_arr_item'],
				{ arr_prop: 'y' },
			],
			obj: {
				obj_prop: 'z',
				obj_arr:  ['obj_arr_item'],
				obj_obj:  { obj_obj_prop: 'y' },
			},
		};

		const source = {
			prop: 'x',
			arr:  [
				'arr_item',
				['arr_arr_item'],
				{ arr_prop: 'y' },
			],
			obj: {
				obj_prop: 'z',
				obj_arr:  ['obj_arr_item'],
				obj_obj:  { obj_obj_prop: 'y' },
			},
		};

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target).not.to.be.equal(source);
		expect(target.arr).not.to.be.equal(source.arr);
		expect(target.arr[1]).not.to.be.equal(source.arr[1]);
		expect(target.arr[2]).not.to.be.equal(source.arr[2]);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).not.to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.equal(Same);
	});

	it('reassigns all values and returns diff tree', () => {
		const target = {
			prop: 'x',
			arr:  [
				'arr_item',
				['arr_arr_item'],
				{ arr_prop: 'y' },
			],
			obj: {
				obj_prop: 'z',
				obj_arr:  ['obj_arr_item'],
				obj_obj:  { obj_obj_prop: 'y' },
			},
		};

		const source = {
			prop: '@x',
			arr:  [
				'@arr_item',
				['@arr_arr_item'],
				{ arr_prop: '@y' },
			],
			obj: {
				obj_prop: '@z',
				obj_arr:  ['@obj_arr_item'],
				obj_obj:  { obj_obj_prop: '@y' },
			},
		};

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target).not.to.be.equal(source);
		expect(target.arr).not.to.be.equal(source.arr);
		expect(target.arr[1]).not.to.be.equal(source.arr[1]);
		expect(target.arr[2]).not.to.be.equal(source.arr[2]);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).not.to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.eql(source);
		expect(diff).to.be.equal(target);
	});

	it('assigns some values and returns diff tree', () => {
		const target = {
			prop: 'x',
			arr:  [
				'arr_item',
				['arr_arr_item'],
				{ arr_prop: 'y' },
			],
			obj: {
				obj_prop: 'z',
				obj_arr:  ['obj_arr_item'],
				obj_obj:  { obj_obj_prop: 'y' },
			},
		};

		const source: AnyObject = {
			prop: '@x',
			arr:  [],
			obj:  {
				obj_arr: ['@obj_arr_item'],
			},
		};

		source.arr[2] = { arr_prop: '@y' };

		const diff = safeAssignDeepDiff(target, source);

		const expectedTarget: AnyObject = {
			prop: '@x',
			arr:  [
				'arr_item',
				['arr_arr_item'],
				{ arr_prop: '@y' },
			],
			obj: {
				obj_prop: 'z',
				obj_arr:  ['@obj_arr_item'],
				obj_obj:  { obj_obj_prop: 'y' },
			},
		};

		const expectedDiff: AnyObject = {
			prop: '@x',
			arr:  [],
			obj:  {
				obj_arr: ['@obj_arr_item'],
			},
		};

		expectedDiff.arr[2] = { arr_prop: '@y' };

		expect(target).to.be.eql(expectedTarget);
		expect(target).not.to.be.equal(source);
		expect(target.arr).not.to.be.equal(source.arr);
		expect(target.arr[1]).not.to.be.equal(source.arr[1]);
		expect(target.arr[2]).not.to.be.equal(source.arr[2]);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).not.to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.eql(expectedDiff);
		expect(diff).not.to.be.equal(target);
	});

	it('assigns all new values and returns diff tree', () => {
		const target: AnyObject = [{
			prop: {},
			arr:  null,
		}];
		const source: AnyObject = [{
			prop: '@x',
			arr:  [{ arr_prop: '@y' }],
			obj:  {
				obj_arr: ['@obj_arr_item'],
			},
		}];

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target).not.to.be.equal(source);
		expect(target[0]).not.to.be.equal(source[0]);
		expect(target[0].arr).not.to.be.equal(source[0].arr);
		expect(target[0].arr[0]).not.to.be.equal(source[0].arr[0]);
		expect(target[0].obj).not.to.be.equal(source[0].obj);
		expect(target[0].obj.obj_arr).not.to.be.equal(source[0].obj.obj_arr);

		expect(diff).to.be.eql(source);
		expect(diff).to.be.equal(target);
	});

	it('throws error for non-object inputs', () => {
		expect((): void => {
			// @ts-ignore
			safeAssignDeepDiff();
		}).to.throw(TypeError);

		expect((): void => {
			// @ts-ignore
			safeAssignDeepDiff(null, {});
		}).to.throw(TypeError);

		expect((): void => {
			// @ts-ignore
			safeAssignDeepDiff({}, null);
		}).to.throw(TypeError);
	});
});
