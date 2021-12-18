import { Missing, Same } from '../constants';

export { Missing, Same } from '../constants';

function _diffArrayDeep(a: any[], b: any[], missing: any): any[] | typeof Same {
	const lengthA = a.length;
	const lengthB = b.length;
	const lengthDiff = lengthA - lengthB;
	const isALonger = lengthA > lengthB;
	const diffArray = isALonger ? b.concat(new Array(lengthDiff).fill(missing)) : b.slice(0);
	const commonLength = isALonger ? lengthB : lengthA;
	let isSame = lengthDiff === 0;

	for (let index = 0; index < commonLength; index++) {
		if (index in b) {
			if (index in a) {
				const aItem = a[index];
				const bItem = b[index];
				let diff: any = bItem;

				if (aItem === bItem) {
					diff = Same;
				}
				else if (Array.isArray(aItem) && Array.isArray(bItem)) {
					diff = _diffArrayDeep(aItem, bItem, missing);
				}
				else if (typeof aItem === 'object' && aItem !== null && typeof bItem === 'object' && bItem !== null) {
					diff = _diffDeep(aItem, bItem, missing);
				}

				diffArray[index] = diff;

				if (diff !== Same) {
					isSame = false;
				}
			}
			else {
				diffArray[index] = b[index];
				isSame = false;
			}
		}
		else {
			diffArray[index] = missing;
			isSame = false;
		}
	}

	return isSame ? Same : diffArray;
}

function _diffDeep(a: AnyObject, b: AnyObject, missing: any): AnyObject | typeof Same {
	const diffObject: AnyObject = {};
	const allKeys = [...new Set(Object.keys(a).concat(Object.keys(b)))];
	const keyCount = allKeys.length;
	let isSame = true;

	for (let index = 0; index < keyCount; index++) {
		const key = allKeys[index];

		if (key in b) {
			if (key in a) {
				const aProp = a[key];
				const bProp = b[key];

				let diff: any = bProp;

				if (aProp === bProp) {
					diff = Same;
				}
				else if (Array.isArray(aProp) && Array.isArray(bProp)) {
					diff = _diffArrayDeep(aProp, bProp, missing);
				}
				else if (typeof aProp === 'object' && aProp !== null && typeof bProp === 'object' && bProp !== null) {
					diff = _diffDeep(aProp, bProp, missing);
				}

				diffObject[key] = diff;

				if (diff !== Same) {
					isSame = false;
				}
			}
			else {
				diffObject[key] = b[key];
				isSame = false;
			}
		}
		else {
			diffObject[key] = missing;
			isSame = false;
		}
	}

	return isSame ? Same : diffObject;
}

/**
 * Find difference between two entities.
 * Objects and arrays will go through deep comparison.
 * In case of no difference in property or value, "Same" symbol will be
 * returned.
 * Unless provided different value the "Missing" symbol will be returned when
 * property is present in the "a" entity but missing in the "b" entity.
 * @param a First entity.
 * @param b Second entity.
 * @returns Structure or value representing changes made between "a" and "b"
 * entities.
 */
export function diffDeep(a: any, b: any, missing = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (Array.isArray(a) && Array.isArray(b)) {
		return _diffArrayDeep(a, b, missing);
	}
	else if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
		return _diffDeep(a, b, missing);
	}

	return b;
}
