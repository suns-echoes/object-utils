import { Same } from '../constants';
import { __cloneDeep } from '../create/clone-deep';


export function __assignDeepCloneDiff(target: AnyObject, source: AnyObject): AnyObject | typeof Same {
	const isArray = Array.isArray(target);
	const keys = Object.keys(source);
	const keyCount = keys.length;
	const diffTree: AnyObject = isArray ? [] : {};
	let isSame: typeof Same | null = Same;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const targetProp = target[key];
		const sourceProp = source[key];

		if (targetProp === sourceProp) {
			if (isArray) {
				diffTree[key] = Same;
			}

			continue;
		}

		if (targetProp !== null && sourceProp !== null
			&& typeof targetProp === 'object' && typeof sourceProp === 'object'
		) {
			const diff = __assignDeepCloneDiff(targetProp, sourceProp);

			if (diff !== Same) {
				diffTree[key] = diff;
				isSame = null;
			}
			else if (isArray) {
				diffTree[key] = Same;
			}
		}
		else {
			if (sourceProp !== null && typeof sourceProp === 'object') {
				const copy = Array.isArray(sourceProp) ? new Array(sourceProp.length).fill(undefined) : {};

				__cloneDeep(copy, sourceProp);

				diffTree[key] = target[key] = copy;
			}
			else {
				diffTree[key] = target[key] = sourceProp;
			}

			isSame = null;
		}
	}

	if (isArray) {
		const itemCount = diffTree.length;

		for (let index = 0; index < itemCount; index++) {
			if (!(index in diffTree)) {
				diffTree[index] = Same;
			}
		}
	}

	return isSame || diffTree;
}


/**
 * Compares the target and the source object trees and assigns cloned
 * differences to the target. Changes made to target will be returned as diff
 * tree.
 * Arrays will be traversed by own enumerable properties rather than iterable
 * items.
 * If the target or the source is not an object a type error will be thrown.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @returns Returns a new object containing tree of changes made to the target
 * It may share objects instances with the target. If no changes were found the
 * "Same" symbol will be returned.
 */
export function assignDeepCloneDiff(
	target: AnyArray | AnyObject,
	source: AnyArray | AnyObject,
): AnyArray | AnyObject | symbol {
	if (target !== null && source !== null && typeof target === 'object' && typeof source === 'object') {
		if (target === source) {
			return Same;
		}

		return __assignDeepCloneDiff(target, source);
	}

	throw new TypeError('Trying to assign between incompatible types');
}
