import { Same } from '../constants';
import { safeAssignExDeepDiff } from './safe-assign-ex-deep-diff';


function getTestData(valuesPrefix = ''): AnyObject {
	return {
		prop_1: `${valuesPrefix}prop_val_1`,
		prop_2: `${valuesPrefix}prop_val_2`,
		prop_3: `${valuesPrefix}prop_val_3`,
		arr: [
			`${valuesPrefix}arr_item_value_1`,
			`${valuesPrefix}arr_item_value_2`,
			`${valuesPrefix}arr_item_value_3`,
			[
				`${valuesPrefix}arr_arr_item_val_1`,
				`${valuesPrefix}arr_arr_item_val_2`,
				`${valuesPrefix}arr_arr_item_val_3`,
			],
			{
				arr_obj_prop_1: `${valuesPrefix}arr_obj_prop_val_1`,
				arr_obj_prop_2: `${valuesPrefix}arr_obj_prop_val_2`,
				arr_obj_prop_3: `${valuesPrefix}arr_obj_prop_val_3`,
			},
		],
		obj: {
			obj_prop_1: `${valuesPrefix}obj_prop_val_1`,
			obj_prop_2: `${valuesPrefix}obj_prop_val_2`,
			obj_prop_3: `${valuesPrefix}obj_prop_val_3`,
			obj_obj: {
				obj_obj_prop_1: `${valuesPrefix}obj_obj_prop_val_1`,
				obj_obj_prop_2: `${valuesPrefix}obj_obj_prop_val_2`,
				obj_obj_prop_3: `${valuesPrefix}obj_obj_prop_val_3`,
			},
			obj_arr: [
				`${valuesPrefix}arr_arr_item_val_1`,
				`${valuesPrefix}arr_arr_item_val_2`,
				`${valuesPrefix}arr_arr_item_val_3`,
			],
		},
	};
}


describe('safeAssignExDeepDiff', () => {
	it('returns the "Same" symbol for equal object instances', () => {
		const obj = {};

		expect(safeAssignExDeepDiff(obj, obj)).to.be.equal(Same);
	});

	it('reassigns whole object tree changing only arrays and return diff tree', () => {
		const target = getTestData();
		const source = getTestData();

		const diff = <AnyObject>safeAssignExDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target.arr).to.be.equal(source.arr);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.eql({
			arr: source.arr,
			obj: {
				obj_arr: source.obj.obj_arr,
			},
		});
		expect(diff.arr).to.be.eql(source.arr);
		expect(diff.obj.obj_arr).to.be.eql(source.obj.obj_arr);
	});

	it('reassigns whole object tree and returns target as diff tree', () => {
		const target = getTestData();
		const source = getTestData('new_');

		const diff = safeAssignExDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target.arr).to.be.equal(source.arr);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.equal(target);
	});

	it('overwrites object and array with primitives and returns diff tree', () => {
		const target = {
			arr: [[], {}],
			obj: { a: [], o: {} },
		};

		const source = {
			arr: [0, 0],
			obj: { a: 0, o: 0 },
		};

		const diff = safeAssignExDeepDiff(target, source);

		expect(target).to.be.eql({ arr: [0, 0], obj: { a: 0, o: 0 } });
		expect(diff).to.be.equal(target);
	});

	it('overwrites primitive with object and array and returns diff tree', () => {
		const target = {
			arr: [0, 0],
			obj: { a: 0, o: 0 },
		};

		const source = {
			arr: [[], {}],
			obj: { a: [], o: {} },
		};

		const diff = safeAssignExDeepDiff(target, source);

		expect(target).to.be.eql({ arr: [[], {}], obj: { a: [], o: {} } });
		expect(diff).to.be.equal(target);
	});

	it('overwrites object with array and returns diff tree', () => {
		const target = {
			arr: [[], {}],
			obj: { a: [], o: {} },
		};

		const source = {
			arr: [{}, []],
			obj: { a: {}, o: [] },
		};

		const diff = safeAssignExDeepDiff(target, source);

		expect(target).to.be.eql({ arr: [{}, []], obj: { a: {}, o: [] } });
		expect(diff).to.be.eql(target);
	});

	it('reassigns part of object and array trees and returns diff tree', () => {
		const target = getTestData();

		const arr = [];

		arr[1] = { new: 'new' };
		arr[2] = ['new'];

		const source = {
			prop_2: 'new_prop_val_2',
			prop_3: undefined,
			arr,
			obj: {
				obj_prop_2: 'new_obj_prop_val_2',
				obj_prop_3: undefined,
				obj_obj: {
					obj_obj_prop_2: null,
					obj_obj_prop_3: {},
				},
				obj_arr: undefined,
			},
			new_arr: [],
			new_obj: {},
			new_prop: null,
		};

		const diff = safeAssignExDeepDiff(target, source);

		expect(target).not.to.be.eql({
			prop_1: 'prop_val_1',
			prop_2: 'new_prop_val_2',
			prop_3: undefined,
			arr,
			obj: {
				obj_prop_1: 'obj_prop_val_1',
				obj_prop_2: 'new_obj_prop_val_2',
				obj_prop_3: undefined,
				obj_obj: {
					arr_obj_prop_1: 'obj_obj_prop_val_1',
					obj_obj_prop_2: null,
					obj_obj_prop_3: {},
				},
				obj_arr: undefined,
			},
			new_arr: [],
			new_obj: {},
			new_prop: null,
		});
		expect(target).not.to.be.equal(source);
		expect(target.arr).to.be.equal(source.arr);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.new_arr).to.be.equal(source.new_arr);
		expect(target.new_obj).not.to.be.equal(source.new_obj);

		expect(diff).to.be.eql({
			prop_2: 'new_prop_val_2',
			prop_3: undefined,
			arr,
			obj: {
				obj_prop_2: 'new_obj_prop_val_2',
				obj_prop_3: undefined,
				obj_obj: {
					obj_obj_prop_2: null,
					obj_obj_prop_3: {},
				},
				obj_arr: undefined,
			},
			new_arr: [],
			new_obj: {},
			new_prop: null,
		});
	});

	it('throws error for non-object inputs', () => {
		expect((): void => {
			// @ts-ignore
			safeAssignExDeepDiff();
		}).to.throw(TypeError);

		expect((): void => {
			// @ts-ignore
			safeAssignExDeepDiff(null, {});
		}).to.throw(TypeError);

		expect((): void => {
			// @ts-ignore
			safeAssignExDeepDiff({}, null);
		}).to.throw(TypeError);

		expect((): void => {
			// @ts-ignore
			safeAssignExDeepDiff([], {});
		}).to.throw(TypeError);

		expect((): void => {
			// @ts-ignore
			safeAssignExDeepDiff({}, []);
		}).to.throw(TypeError);
	});
});
