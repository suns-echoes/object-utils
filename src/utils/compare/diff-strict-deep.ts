import { Missing, Same } from '../constants';

export { Missing, Same } from '../constants';

function _diffStrictDeep(a: AnyObject, b: AnyObject, missing: any): AnyObject | typeof Same {
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

				let diff: any = bProp;

				if (aProp === bProp) {
					diff = Same;
				}
				else if (typeof aProp === 'object' && aProp !== null && !Array.isArray(aProp)
					&& typeof bProp === 'object' && bProp !== null && !Array.isArray(bProp)
				) {
					diff = _diffStrictDeep(aProp, bProp, missing);
				}

				diffObject[key] = diff;

				if (diff !== Same) {
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
 * Objects will go through deep comparison but the arrays will be checked for
 * instance equality.
 * In case of no difference in property or value, "Same" symbol will be
 * returned.
 * Unless provided different value the "Missing" symbol will be returned when
 * property is present in the "a" entity but missing in the "b" entity.
 * @param a First entity.
 * @param b Second entity.
 * @returns Structure or value representing changes made between "a" and "b"
 * entities.
 */
export function diffStrictDeep(a: any, b: any, missing = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (typeof a === 'object' && a !== null && !Array.isArray(a)
		&& typeof b === 'object' && b !== null && !Array.isArray(b)
	) {
		return _diffStrictDeep(a, b, missing);
	}

	return b;
}
