import { Missing, Same } from '../constants';

export { Missing, Same } from '../constants';

function _diffArray(a: any[], b: any[], missing: any): any[] | typeof Same {
	const lengthA = a.length;
	const lengthB = b.length;
	const lengthDiff = lengthA - lengthB;
	const isALonger = lengthA > lengthB;
	const diffArray = isALonger ? b.concat(new Array(lengthDiff).fill(missing)) : b.slice(0);
	const commonLength = isALonger ? lengthB : lengthA;
	let isSame = lengthDiff === 0;

	for (let index = 0; index < commonLength; index++) {
		if (index in b) {
			const bItem = b[index];

			if (index in a) {
				const aItem = a[index];
				let diffValue: any = bItem;

				if (aItem === bItem) {
					diffValue = Same;
				}

				diffArray[index] = diffValue;

				if (diffValue !== Same) {
					isSame = false;
				}
			}
			else {
				diffArray[index] = bItem;
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

function _diff(a: AnyObject, b: AnyObject, missing: any): AnyObject | typeof Same {
	const diffObject: AnyObject = {};
	const allKeys = [...new Set(Object.keys(a).concat(Object.keys(b)))];
	const keyCount = allKeys.length;
	let isSame = true;

	for (let index = 0; index < keyCount; index++) {
		const key = allKeys[index];

		if (key in b) {
			const bProp = b[key];

			if (key in a) {
				const aProp = a[key];

				let diffValue: any = bProp;

				if (aProp === bProp) {
					diffValue = Same;
				}

				diffObject[key] = diffValue;

				if (diffValue !== Same) {
					isSame = false;
				}
			}
			else {
				diffObject[key] = bProp;
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
 * Objects and arrays will go through shallow comparison.
 * In case of no difference in property or value, "Same" symbol will be
 * returned.
 * Unless provided different value the "Missing" symbol will be returned when
 * property is present in the "a" entity but missing in the "b" entity.
 * @param a First entity.
 * @param b Second entity.
 * @returns Structure or value representing changes made between "a" and "b"
 * entities.
 */
export function diff(a: any, b: any, missing = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (Array.isArray(a) && Array.isArray(b)) {
		return _diffArray(a, b, missing);
	}
	else if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
		return _diff(a, b, missing);
	}

	return b;
}
