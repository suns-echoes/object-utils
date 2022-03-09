import { Same } from '../constants';
import { _cloneDeep } from '../create/clone-deep';


function _safeAssignDeepDiff(target: AnyObject, source: AnyObject, diff: AnyObject): AnyObject | symbol {
	const keys = Object.keys(source);
	const keyCount = keys.length;
	let hasSomeDiff = false;
	let hasEveryDiff = true;

	for (let keyIndex = 0; keyIndex < keyCount; keyIndex++) {
		const key = keys[keyIndex];
		const sourceProp = source[key];
		const targetProp = target[key];

		if (targetProp !== sourceProp) {
			if (typeof targetProp === 'object' && targetProp !== null) {
				if (typeof sourceProp === 'object' && sourceProp !== null) {
					let propDiff = Array.isArray(targetProp) ? [] : {};

					propDiff = _safeAssignDeepDiff(targetProp, sourceProp, propDiff);

					if (propDiff !== Same)  {
						diff[key] = propDiff;
						hasSomeDiff = true;
					}
					if (propDiff !== target[key]) {
						hasEveryDiff = false;
					}
				}
				else {
					diff[key] = target[key] = sourceProp;
					hasSomeDiff = true;
				}
			}
			else if (typeof sourceProp === 'object' && sourceProp !== null) {
				const copy = Array.isArray(sourceProp) ? [] : {};

				_cloneDeep(copy, sourceProp);
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
 * differences to the "target". Function returns object containing diff tree.
 * Function will throw type error if "target" or "source" are not an object
 * type.
 * @param target The object to which assign differences.
 * @param source The object used as source of changes.
 * @returns The object containing tree of changes made to "target". It may share
 * object instances with "target". If no changes were found the "Same" symbol
 * will be returned.
 */
export function safeAssignDeepDiff(
	target: AnyArray | AnyObject,
	source: AnyArray | AnyObject,
): AnyArray | AnyObject | symbol {
	if (typeof target === 'object' && target !== null
		&& typeof source === 'object' && source !== null
	) {
		if (target !== source) {
			return _safeAssignDeepDiff(target, source, Array.isArray(target) ? [] : {});
		}

		return Same;
	}

	throw new TypeError('Trying to assign between incompatible types');
}
