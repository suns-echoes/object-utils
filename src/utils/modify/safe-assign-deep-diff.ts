import { Same, __ARRAY, __OBJECT, __PRIMITIVE } from '../constants';
import { __cloneDeep, __cloneDeep_array } from '../create/clone-deep';


function __safeAssignDeepDiff__array(
	target: ObjectLike, source: AnyArray, diff: ObjectLike, allowSparseDiffArrays: boolean,
): AnyArray | AnyObject | symbol {
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
				if (targetPropType !== __PRIMITIVE) {
					const propDiff = sourcePropType === __ARRAY
						? __safeAssignDeepDiff__array(
							targetItem, sourceItem, targetPropType === __ARRAY ? [] : {}, allowSparseDiffArrays,
						)
						: __safeAssignDeepDiff(
							targetItem, sourceItem, targetPropType === __ARRAY ? [] : {}, allowSparseDiffArrays,
						);

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
						? __cloneDeep_array(<AnyArray>diffCopy, sourceItem, allowSparseDiffArrays)
						: __cloneDeep(diffCopy, sourceItem, allowSparseDiffArrays);

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
		hasEveryDiff = source.length >= (Array.isArray(target) ? target : Object.keys(target)).length;
	}

	return hasSomeDiff ? (hasEveryDiff ? target : diff) : Same;
}

function __safeAssignDeepDiff(
	target: ObjectLike, source: AnyObject, diff: ObjectLike, allowSparseDiffArrays: boolean,
): AnyArray | AnyObject | symbol {
	const keys = Object.keys(source);
	const keyCount = keys.length;
	let hasSomeDiff = false;
	let hasEveryDiff = true;

	for (let keyIndex = 0; keyIndex < keyCount; keyIndex++) {
		const key = keys[keyIndex];
		const sourceProp = source[key];
		const targetProp = target[key];

		if (targetProp !== sourceProp) {
			const targetPropType = targetProp !== null && typeof targetProp === 'object'
				? (Array.isArray(targetProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;
			const sourcePropType = sourceProp !== null && typeof sourceProp === 'object'
				? (Array.isArray(sourceProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;

			if (sourcePropType !== __PRIMITIVE) {
				if (targetPropType !== __PRIMITIVE) {
					const propDiff = sourcePropType === __ARRAY
						? __safeAssignDeepDiff__array(
							targetProp, sourceProp, targetPropType === __ARRAY ? [] : {}, allowSparseDiffArrays,
						)
						: __safeAssignDeepDiff(
							targetProp, sourceProp, targetPropType === __ARRAY ? [] : {}, allowSparseDiffArrays,
						);

					if (propDiff !== Same) {
						diff[key] = propDiff;
						hasSomeDiff = true;
					}
					if (propDiff !== target[key]) {
						hasEveryDiff = false;
					}
				}
				else {
					const diffCopy = sourcePropType === __ARRAY ? [] : {};

					sourcePropType === __ARRAY
						? __cloneDeep_array(<AnyArray>diffCopy, sourceProp, allowSparseDiffArrays)
						: __cloneDeep(diffCopy, sourceProp, allowSparseDiffArrays);

					diff[key] = target[key] = diffCopy;
					hasSomeDiff = true;
				}
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
		hasEveryDiff = keys.length >= (Array.isArray(target) ? target : Object.keys(target)).length;
	}

	return hasSomeDiff ? (hasEveryDiff ? target : diff) : Same;
}


/**
 * Compares the "target" and the "source" object trees and assigns cloned
 * differences to the "target". The differences will be returned as diff tree.
 * If the "target" or the "source" is not an object a type error will be thrown.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @param allowSparseDiffArrays The boolean value specifying if arrays in diff
 * tree may by sparse. By defeult empty items will be assigned the "Same"
 * symbol.
 * @returns The object containing tree of changes made to "target". It may share
 * object instances with "target". If no changes were found the "Same" symbol
 * will be returned.
 */
export function safeAssignDeepDiff(
	target: AnyArray | AnyObject,
	source: AnyArray | AnyObject,
	allowSparseDiffArrays = false,
): AnyArray | AnyObject | symbol {
	if (target !== null && typeof target === 'object' && source !== null && typeof source === 'object') {
		if (target === source) {
			return Same;
		}

		return Array.isArray(source)
			? __safeAssignDeepDiff__array(target, source, Array.isArray(target) ? [] : {}, allowSparseDiffArrays)
			: __safeAssignDeepDiff(
				target, <AnyArray>source, Array.isArray(target) ? [] : {}, allowSparseDiffArrays,
			);
	}

	throw new TypeError('Trying to assign between incompatible types');
}
