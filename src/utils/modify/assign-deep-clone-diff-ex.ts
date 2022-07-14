import { Same, __OBJECT, __PRIMITIVE } from '../constants';
import { __cloneDeep } from '../create/clone-deep';


export function __assignDeepCloneDiffEx(target: AnyObject, source: AnyObject): AnyObject | typeof Same {
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

		const targetPropType = targetProp !== null && typeof targetProp === 'object' && !Array.isArray(targetProp)
			? __OBJECT : __PRIMITIVE;
		const sourcePropType = sourceProp !== null && typeof sourceProp === 'object' && !Array.isArray(sourceProp)
			? __OBJECT : __PRIMITIVE;

		if (sourcePropType === __OBJECT) {
			if (targetPropType === __OBJECT) {
				const diff = __assignDeepCloneDiffEx(targetProp, sourceProp);

				if (diff !== Same) {
					diffTree[key] = diff;
					isSame = null;
				}
			}
			else {
				const copy = {};

				__cloneDeep(copy, sourceProp);

				diffTree[key] = target[key] = copy;
				isSame = null;
			}
		}
		else {
			diffTree[key] = target[key] = sourceProp;
			isSame = null;
		}
	}

	return isSame || diffTree;
}


/**
 * Compares the target and the source object trees and assigns cloned
 * differences to the target. Changes made to target will be returned as diff
 * tree.
 * Generic objects and arrays will overwrite each other. Arrays will not be
 * traversed but will be assigned by reference.
 * If the target or the source is not an object a type error will be thrown.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @returns Returns a new object containing tree of changes made to the target
 * It may share objects instances with the target. If no changes were found the
 * "Same" symbol will be returned.
 */
export function assignDeepCloneDiffEx(
	target: AnyArray | AnyObject,
	source: AnyArray | AnyObject,
): AnyArray | AnyObject | symbol {
	if (target !== null && source !== null
		&& typeof target === 'object' && typeof source === 'object'
		&& !Array.isArray(target) && !Array.isArray(source)
	) {
		if (target === source) {
			return Same;
		}

		return __assignDeepCloneDiffEx(target, source);
	}

	throw new TypeError('Trying to assign between incompatible types');
}
