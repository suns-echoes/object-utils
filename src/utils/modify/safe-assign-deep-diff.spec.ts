import { Same } from '../constants';
import { safeAssignDeepDiff } from './safe-assign-deep-diff';


function getTestData(numericKeys = false, asArray = false, valuesPrefix = ''): ObjectLike {
	const testData: AnyObject = {
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

	if (asArray) {
		return Object.keys(testData).map((key) => testData[key]);
	}

	if (numericKeys) {
		const data: AnyObject = {};

		Object.keys(testData).forEach((key, index) => {
			data[index] = testData[key];
		});

		return data;
	}

	return testData;
}


describe('safeAssignDeepDiff', () => {
	it('returns the "Same" symbol for equal object instances', () => {
		const arr: AnyArray = [];
		const obj = {};

		expect(safeAssignDeepDiff(arr, arr)).to.be.equal(Same);
		expect(safeAssignDeepDiff(obj, obj)).to.be.equal(Same);
		expect(safeAssignDeepDiff(arr, obj)).to.be.equal(Same);
		expect(safeAssignDeepDiff(obj, arr)).to.be.equal(Same);
	});

	it('reassigns whole object tree without change and returns the "Same" symbol', () => {
		const target = getTestData();
		const source = getTestData();

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target.arr).not.to.be.equal(source.arr);
		expect(target.arr[3]).not.to.be.equal(source.arr[3]);
		expect(target.arr[4]).not.to.be.equal(source.arr[4]);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).not.to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.equal(Same);
	});

	it('reassigns whole array tree without change and returns the "Same" symbol', () => {
		const target = getTestData(false, true);
		const source = getTestData(false, true);

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target[3]).not.to.be.equal(source[3]);
		expect(target[3][3]).not.to.be.equal(source[3][3]);
		expect(target[3][4]).not.to.be.equal(source[3][4]);
		expect(target[4]).not.to.be.equal(source[4]);
		expect(target[4].obj_arr).not.to.be.equal(source[4].obj_arr);
		expect(target[4].obj_obj).not.to.be.equal(source[4].obj_obj);

		expect(diff).to.be.equal(Same);
	});

	it('reassigns whole object tree with array tree without change and returns the "Same" symbol', () => {
		const target = getTestData(true);
		const source = getTestData(false, true);
		const result = getTestData(true);

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(result);
		expect(target[3]).not.to.be.equal(source[3]);
		expect(target[3][3]).not.to.be.equal(source[3][3]);
		expect(target[3][4]).not.to.be.equal(source[3][4]);
		expect(target[4]).not.to.be.equal(source[4]);
		expect(target[4].obj_arr).not.to.be.equal(source[4].obj_arr);
		expect(target[4].obj_obj).not.to.be.equal(source[4].obj_obj);

		expect(diff).to.be.equal(Same);
	});

	it('reassigns whole array tree with object tree without change and returns the "Same" symbol', () => {
		const target = getTestData(false, true);
		const source = getTestData(true);
		const result = getTestData(false, true);

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(result);
		expect(target[3]).not.to.be.equal(source[3]);
		expect(target[3][3]).not.to.be.equal(source[3][3]);
		expect(target[3][4]).not.to.be.equal(source[3][4]);
		expect(target[4]).not.to.be.equal(source[4]);
		expect(target[4].obj_arr).not.to.be.equal(source[4].obj_arr);
		expect(target[4].obj_obj).not.to.be.equal(source[4].obj_obj);

		expect(diff).to.be.equal(Same);
	});

	it('reassigns whole object tree and returns target as diff tree', () => {
		const target = getTestData();
		const source = getTestData(false, false, 'new_');

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(source);
		expect(target.arr).not.to.be.equal(source.arr);
		expect(target.arr[3]).not.to.be.equal(source.arr[3]);
		expect(target.arr[4]).not.to.be.equal(source.arr[4]);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.obj.obj_arr).not.to.be.equal(source.obj.obj_arr);
		expect(target.obj.obj_obj).not.to.be.equal(source.obj.obj_obj);

		expect(diff).to.be.equal(target);
	});

	it('reassigns whole array tree and returns target as diff tree', () => {
		const target = getTestData(false, true);
		const source = getTestData(false, true, 'new_');

		const diff = safeAssignDeepDiff(target, source, true);

		expect(target).to.be.eql(source);
		expect(target[3]).not.to.be.equal(source[3]);
		expect(target[3][3]).not.to.be.equal(source[3][3]);
		expect(target[3][4]).not.to.be.equal(source[3][4]);
		expect(target[4]).not.to.be.equal(source[4]);
		expect(target[4].obj_arr).not.to.be.equal(source[4].obj_arr);
		expect(target[4].obj_obj).not.to.be.equal(source[4].obj_obj);

		expect(diff).to.be.equal(target);
	});

	it('reassigns whole object tree with array tree and returns target as diff tree', () => {
		const target = getTestData(true);
		const source = getTestData(false, true, 'new_');
		const result = getTestData(true, false, 'new_');

		const diff = safeAssignDeepDiff(target, source, true);

		expect(target).to.be.eql(result);
		expect(target[3]).not.to.be.equal(source[3]);
		expect(target[3][3]).not.to.be.equal(source[3][3]);
		expect(target[3][4]).not.to.be.equal(source[3][4]);
		expect(target[4]).not.to.be.equal(source[4]);
		expect(target[4].obj_arr).not.to.be.equal(source[4].obj_arr);
		expect(target[4].obj_obj).not.to.be.equal(source[4].obj_obj);

		expect(diff).to.be.equal(target);
	});

	it('reassigns whole array tree with object tree and returns target as diff tree', () => {
		const target = getTestData(false, true);
		const source = getTestData(true, false, 'new_');
		const result = getTestData(false, true, 'new_');

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql(result);
		expect(target[3]).not.to.be.equal(source[3]);
		expect(target[3][3]).not.to.be.equal(source[3][3]);
		expect(target[3][4]).not.to.be.equal(source[3][4]);
		expect(target[4]).not.to.be.equal(source[4]);
		expect(target[4].obj_arr).not.to.be.equal(source[4].obj_arr);
		expect(target[4].obj_obj).not.to.be.equal(source[4].obj_obj);

		expect(diff).to.be.equal(target);
	});

	it('reassigns parts of array using sparse array and returns diff tree', () => {
		const target = [];

		target[0] = 1;
		target[2] = 2;

		const source = [];

		source[1] = 3;
		source[2] = 5;

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql([1, 3, 5]);
		expect(diff).to.be.eql([Same, 3, 5]);
	});

	it('reassigns parts of array using sparse array and returns sparse diff tree', () => {
		const target = [];

		target[0] = 1;
		target[2] = 2;

		const source = [];

		source[1] = 3;
		source[2] = 5;

		const diff = <AnyArray>safeAssignDeepDiff(target, source, true);

		expect(target).to.be.eql([1, 3, 5]);
		expect(diff).to.be.eql([undefined, 3, 5]);
		expect(0 in diff).to.be.false;
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

		const diff = safeAssignDeepDiff(target, source);

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

		const diff = safeAssignDeepDiff(target, source);

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

		const diff = safeAssignDeepDiff(target, source);

		expect(target).to.be.eql({ arr: [[], {}], obj: { a: [], o: {} } });
		expect(diff).to.be.equal(Same);
	});

	it('reassigns part of object object and array trees and returns diff tree', () => {
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

		const diff = safeAssignDeepDiff(target, source);

		expect(target).not.to.be.eql({
			prop_1: 'prop_val_1',
			prop_2: 'new_prop_val_2',
			prop_3: undefined,
			arr: [
				'arr_arr_item_val_1',
				{ new: 'new' },
				['new'],
			],
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
		expect(target.arr).not.to.be.equal(source.arr);
		expect(target.obj).not.to.be.equal(source.obj);
		expect(target.new_arr).not.to.be.equal(source.new_arr);
		expect(target.new_obj).not.to.be.equal(source.new_obj);

		expect(diff).to.be.eql({
			prop_2: 'new_prop_val_2',
			prop_3: undefined,
			arr: [
				Same,
				{ new: 'new' },
				['new'],
			],
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
