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
				else if (aItem !== null && typeof aItem === 'object' && bItem !== null && typeof bItem === 'object') {
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
				else if (aProp !== null && typeof aProp === 'object' && bProp !== null && typeof bProp === 'object') {
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
 * Find deep difference between two entities.
 * In case of no difference in property or value, "Same" symbol will be
 * returned. The "Missing" symbol will be returned when property is present in
 * the "a" entity but missing in the "b" entity, unless provided different value
 * for missing properties.
 * @param a The first entity.
 * @param b The second entity.
 * @returns A structure or value representing changes made between "a" and "b"
 * entities.
 */
export function diffDeep(a: any, b: any, missing: any = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (Array.isArray(a) && Array.isArray(b)) {
		return _diffArrayDeep(a, b, missing);
	}
	else if (a !== null && typeof a === 'object' && b !== null && typeof b === 'object') {
		return _diffDeep(a, b, missing);
	}

	return b;
}
