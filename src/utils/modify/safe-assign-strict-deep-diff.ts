import { Same, __ARRAY, __OBJECT, __PRIMITIVE } from '../constants';
import { __cloneStrictDeep_array, __cloneStrictDeep } from '../create/clone-strict-deep';


function __safeAssignStrictDeepDiff__array(
	target: AnyArray, source: AnyArray, diff: AnyArray, allowSparseDiffArrays: boolean,
): AnyArray | symbol {
	const length = source.length;
	let hasSomeDiff = false;
	let hasEveryDiff = true;

	for (let index = 0; index < length; index++) {
		if (!(index in source)) {
			if (!allowSparseDiffArrays) {
				diff[index] = Same;
			}

			hasEveryDiff = false;
			continue;
		}

		const targetItem = target[index];
		const sourceItem = source[index];

		if (targetItem !== sourceItem) {
			const targetPropType = targetItem !== null && typeof targetItem === 'object'
				? (Array.isArray(targetItem) ? __ARRAY : __OBJECT) : __PRIMITIVE;
			const sourcePropType = sourceItem !== null && typeof sourceItem === 'object'
				? (Array.isArray(sourceItem) ? __ARRAY : __OBJECT) : __PRIMITIVE;

			if (sourcePropType !== __PRIMITIVE) {
				if (sourcePropType === targetPropType) {
					const propDiff = targetPropType === __ARRAY
						? __safeAssignStrictDeepDiff__array(targetItem, sourceItem, [], allowSparseDiffArrays)
						: __safeAssignStrictDeepDiff(targetItem, sourceItem, {}, allowSparseDiffArrays);

					if (propDiff !== Same) {
						diff[index] = propDiff;
						hasSomeDiff = true;
					}
					if (propDiff !== target[index]) {
						hasEveryDiff = false;
					}
				}
				else {
					const diffCopy = sourcePropType === __ARRAY ? [] : {};

					sourcePropType === __ARRAY
						? __cloneStrictDeep_array(<AnyArray>diffCopy, sourceItem)
						: __cloneStrictDeep(diffCopy, sourceItem);

					diff[index] = target[index] = diffCopy;
					hasSomeDiff = true;
				}
			}
			else {
				diff[index] = target[index] = sourceItem;
				hasSomeDiff = true;
			}
		}
		else {
			hasEveryDiff = false;
		}
	}

	if (hasSomeDiff && hasEveryDiff) {
		hasEveryDiff = source.length >= target.length;
	}

	return hasSomeDiff ? (hasEveryDiff ? target : diff) : Same;
}

function __safeAssignStrictDeepDiff(
	target: AnyObject, source: AnyObject, diff: AnyObject, allowSparseDiffArrays: boolean,
): AnyObject | symbol {
	const keys = Object.keys(source);
	const keyCount = keys.length;
	let hasSomeDiff = false;
	let hasEveryDiff = true;

	for (let keyIndex = 0; keyIndex < keyCount; keyIndex++) {
		const key = keys[keyIndex];
		const targetProp = target[key];
		const sourceProp = source[key];

		if (targetProp !== sourceProp) {
			const targetPropType = targetProp !== null && typeof targetProp === 'object'
				? (Array.isArray(targetProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;
			const sourcePropType = sourceProp !== null && typeof sourceProp === 'object'
				? (Array.isArray(sourceProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;

			if (targetPropType !== __PRIMITIVE && targetPropType === sourcePropType) {
				const propDiff = targetPropType === __ARRAY
					? __safeAssignStrictDeepDiff__array(targetProp, sourceProp, [], allowSparseDiffArrays)
					: __safeAssignStrictDeepDiff(targetProp, sourceProp, {}, allowSparseDiffArrays);

				if (propDiff !== Same) {
					diff[key] = propDiff;
					hasSomeDiff = true;
				}
				if (propDiff !== target[key]) {
					hasEveryDiff = false;
				}
			}
			else if (sourcePropType !== __PRIMITIVE) {
				const copy = sourcePropType === __ARRAY ? [] : {};

				sourcePropType === __ARRAY
					? __cloneStrictDeep_array(<AnyArray>copy, sourceProp)
					: __cloneStrictDeep(copy, sourceProp);

				diff[key] = target[key] = copy;
				hasSomeDiff = true;
			}
			else {
				diff[key] = target[key] = sourceProp;
				hasSomeDiff = true;
			}
		}
		else {
			hasEveryDiff = false;
		}
	}

	if (hasSomeDiff && hasEveryDiff) {
		hasEveryDiff = keys.length >= Object.keys(target).length;
	}

	return hasSomeDiff ? (hasEveryDiff ? target : diff) : Same;
}


/**
 * Compares the "target" and the "source" object trees and assigns cloned
 * differences to the "target". The differences will be returned as diff tree.
 * If the "target" or the "source" is not an object a type error will be thrown.
 * Note: This is strict version which does not allow deep assignment between
 * arrays and object, instead those types will completely override one another.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @param allowSparseDiffArrays The boolean value specifying if arrays in diff
 * tree may by sparse. By defeult empty items will be assigned the "Same"
 * symbol.
 * @returns The object containing tree of changes made to "target". It may share
 * object instances with "target". If no changes were found the "Same" symbol
 * will be returned.
 */
export function safeAssignStrictDeepDiff(
	target: AnyArray | AnyObject,
	source: AnyArray | AnyObject,
	allowSparseDiffArrays = false,
): AnyArray | AnyObject | symbol {
	if (target !== null && typeof target === 'object' && source !== null && typeof source === 'object') {
		if (target === source) {
			return Same;
		}

		const isTargetArray = Array.isArray(target);
		const isSourceArray = Array.isArray(source);

		if (isTargetArray && isSourceArray) {
			return __safeAssignStrictDeepDiff__array(target, source, [], allowSparseDiffArrays);
		}
		else if (!(isTargetArray || isSourceArray)) {
			return __safeAssignStrictDeepDiff(target, source, {}, allowSparseDiffArrays);
		}
	}

	throw new TypeError('Trying to assign between incompatible types');
}
