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
				else if (aProp !== null && typeof aProp === 'object' && !Array.isArray(aProp)
					&& bProp !== null && typeof bProp === 'object' && !Array.isArray(bProp)
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
 * Find deep difference between two entities. This is strict version which
 * compares arrays by references and not by item values.
 * In case of no difference in property or value, "Same" symbol will be
 * returned. The "Missing" symbol will be returned when property is present in
 * the "a" entity but missing in the "b" entity, unless provided different value
 * for missing properties.
 * @param a The first entity.
 * @param b The second entity.
 * @returns A structure or value representing changes made between "a" and "b"
 * entities.
 */
export function diffStrictDeep(a: any, b: any, missing: any = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (a !== null && typeof a === 'object' && !Array.isArray(a)
		&& b !== null && typeof b === 'object' && !Array.isArray(b)
	) {
		return _diffStrictDeep(a, b, missing);
	}

	return b;
}
