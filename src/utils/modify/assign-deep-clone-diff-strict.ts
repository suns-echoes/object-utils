import { Same, __ARRAY, __EMPTY, __OBJECT, __PRIMITIVE } from '../constants';
import { __cloneDeepStrict_array } from '../create/clone-deep-strict';
import { __cloneDeepStrict_object } from '../create/clone-deep-strict';


export function __assignDeepCloneDiffStrict_array(target: AnyObject, source: AnyObject): AnyObject | typeof Same {
	const itemCount = source.length;
	const diffTree: AnyArray = [];
	let isSame: typeof Same | null = Same;

	for (let index = 0; index < itemCount; index++) {
		const targetItem = target[index];
		const sourceItem = source[index];

		if (targetItem === sourceItem) {
			diffTree[index] = Same;

			continue;
		}

		const targetItemType = targetItem !== null && typeof targetItem === 'object'
			? (Array.isArray(targetItem) ? __ARRAY : __OBJECT) : __PRIMITIVE;
		const sourceItemType = sourceItem !== null && typeof sourceItem === 'object'
			? (Array.isArray(sourceItem) ? __ARRAY : __OBJECT) : __PRIMITIVE;

		let currentValue: any = __EMPTY;
		let currentDiff: any = Same;

		if (targetItemType === sourceItemType && sourceItemType !== __PRIMITIVE) {
			if (sourceItemType === __OBJECT) {
				currentDiff = __assignDeepCloneDiffStrict_object(targetItem, sourceItem);
			}
			else {
				currentDiff = __assignDeepCloneDiffStrict_array(targetItem, sourceItem);
			}
		}
		else {
			if (sourceItemType === __OBJECT) {
				__cloneDeepStrict_object(currentValue = {}, sourceItem);
			}
			else if (sourceItemType === __ARRAY) {
				__cloneDeepStrict_array(currentValue = [], sourceItem);
			}
			else {
				currentValue = sourceItem;
			}
		}

		if (currentValue !== __EMPTY) {
			target[index] = currentDiff = currentValue;
		}

		diffTree[index] = currentDiff;

		if (currentDiff !== Same) {
			isSame = null;
		}
	}

	return isSame || diffTree;
}

export function __assignDeepCloneDiffStrict_object(target: AnyObject, source: AnyObject): AnyObject | typeof Same {
	const keys = Object.keys(source);
	const keyCount = keys.length;
	const diffTree: AnyObject = {};
	let isSame: typeof Same | null = Same;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const targetProp = target[key];
		const sourceProp = source[key];

		if (targetProp === sourceProp) {
			continue;
		}

		const targetPropType = targetProp !== null && typeof targetProp === 'object'
			? (Array.isArray(targetProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;
		const sourcePropType = sourceProp !== null && typeof sourceProp === 'object'
			? (Array.isArray(sourceProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;

		let currentValue: any = __EMPTY;
		let currentDiff: any = Same;

		if (targetPropType === sourcePropType && sourcePropType !== __PRIMITIVE) {
			if (sourcePropType === __OBJECT) {
				currentDiff = __assignDeepCloneDiffStrict_object(targetProp, sourceProp);
			}
			else {
				currentDiff = __assignDeepCloneDiffStrict_array(targetProp, sourceProp);
			}
		}
		else {
			if (sourcePropType === __OBJECT) {
				__cloneDeepStrict_object(currentValue = {}, sourceProp);
			}
			else if (sourcePropType === __ARRAY) {
				__cloneDeepStrict_array(currentValue = [], sourceProp);
			}
			else {
				currentValue = sourceProp;
			}
		}

		if (currentValue !== __EMPTY) {
			target[key] = currentDiff = currentValue;
		}

		if (currentDiff !== Same) {
			diffTree[key] = currentDiff;
			isSame = null;
		}
	}

	return isSame || diffTree;
}


/**
 * Compares the target and the source object trees and assigns cloned
 * differences to the target. Changes made to target will be returned as diff
 * tree.
 * Generic objects and arrays will overwrite each other. Only iterable items
 * will be assigned from arrays.
 * If the target or the source is not an object a type error will be thrown.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @returns Returns a new object containing tree of changes made to the target
 * It may share objects instances with the target. If no changes were found the
 * "Same" symbol will be returned.
 */
export function assignDeepCloneDiffStrict(
	target: AnyArray | AnyObject,
	source: AnyArray | AnyObject,
): AnyArray | AnyObject | symbol {
	if (target !== null && source !== null) {
		if (target === source) {
			return Same;
		}

		const targetType = typeof target === 'object'
			? (Array.isArray(source) ? __ARRAY : __OBJECT) : __PRIMITIVE;
		const sourceType = typeof source === 'object'
			? (Array.isArray(source) ? __ARRAY : __OBJECT) : __PRIMITIVE;

		if ((targetType & sourceType) === __OBJECT) {
			return __assignDeepCloneDiffStrict_object(target, source);
		}
		else if ((targetType & sourceType) === __ARRAY) {
			return __assignDeepCloneDiffStrict_array(target, source);
		}
	}

	throw new TypeError('Trying to assign between incompatible types');
}
