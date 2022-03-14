import { Same, __OBJECT, __PRIMITIVE } from '../constants';
import { __cloneExDeep } from '../create/clone-ex-deep';


function __safeAssignExDeepDiff(target: AnyObject, source: AnyObject, diff: AnyObject): AnyObject | symbol {
	const keys = Object.keys(source);
	const keyCount = keys.length;
	let hasSomeDiff = false;
	let hasEveryDiff = true;

	for (let keyIndex = 0; keyIndex < keyCount; keyIndex++) {
		const key = keys[keyIndex];
		const targetProp = target[key];
		const sourceProp = source[key];

		if (targetProp !== sourceProp) {
			const targetPropType = targetProp !== null && typeof targetProp === 'object' && !Array.isArray(targetProp)
				? __OBJECT : __PRIMITIVE;
			const sourcePropType = sourceProp !== null && typeof sourceProp === 'object' && !Array.isArray(sourceProp)
				? __OBJECT : __PRIMITIVE;

			if (sourcePropType !== __PRIMITIVE) {
				if (targetPropType !== __PRIMITIVE) {
					const propDiff = __safeAssignExDeepDiff(targetProp, sourceProp, {});

					if (propDiff !== Same) {
						diff[key] = propDiff;
						hasSomeDiff = true;
					}
					if (propDiff !== target[key]) {
						hasEveryDiff = false;
					}
				}
				else {
					const diffCopy = {};

					__cloneExDeep(diffCopy, sourceProp);

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
		hasEveryDiff = keys.length >= Object.keys(target).length;
	}

	return hasSomeDiff ? (hasEveryDiff ? target : diff) : Same;
}


/**
 * Compares the "target" and the "source" object trees and assigns cloned
 * differences to the "target". The differences will be returned as diff tree.
 * If the "target" or the "source" is not an object a type error will be thrown.
 * Note: This is exclusive version for objects so arrays will be treated like
 * primitive values and compared or assigned by reference.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @returns The object containing tree of changes made to "target". It may share
 * object instances with "target". If no changes were found the "Same" symbol
 * will be returned.
 */
export function safeAssignExDeepDiff(
	target: AnyObject,
	source: AnyObject,
): AnyObject | symbol {
	if (target !== null && typeof target === 'object' && !Array.isArray(target)
		&& source !== null && typeof source === 'object' && !Array.isArray(source)
	) {
		if (target !== source) {
			return __safeAssignExDeepDiff(target, source, {});
		}

		return Same;
	}

	throw new TypeError('Trying to assign between incompatible types');
}
