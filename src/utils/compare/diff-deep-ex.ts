import { Missing, Same } from '../constants';


export { Missing, Same } from '../constants';


function __diffDeepEx(a: AnyObject, b: AnyObject, missing: any): AnyObject | typeof Same {
	const diffObject: AnyObject = {};
	const allKeys = [...new Set(Object.keys(a).concat(Object.keys(b)))];
	const keyCount = allKeys.length;
	let isSame: typeof Same | null = Same;

	for (let index = 0; index < keyCount; index++) {
		const key = allKeys[index];

		if (key in b) {
			const bProp = b[key];

			if (key in a) {
				const aProp = a[key];

				if (aProp === bProp) {
					continue;
				}

				if (aProp !== null && bProp !== null
					&& typeof aProp === 'object' && typeof bProp === 'object'
					&& !Array.isArray(aProp) && !Array.isArray(bProp)
				) {
					const diff = __diffDeepEx(aProp, bProp, missing);

					if (diff !== Same) {
						diffObject[key] = diff;
						isSame = null;
					}
				}
				else {
					diffObject[key] = bProp;
					isSame = null;
				}
			}
			else {
				diffObject[key] = bProp;
				isSame = null;
			}
		}
		else {
			diffObject[key] = missing;
			isSame = null;
		}
	}

	return isSame || diffObject;
}

/**
 * Finds the deep difference between two entities.
 * Arrays will be compared by reference (not by item values).
 * In case of no difference in properties with the same key, the "Same" symbol
 * will be returned. When property is present in the first entity but missing in
 * the second entity the "Missing" symbol will be returned (or custom value if
 * provided).
 * @param a The first entity.
 * @param b The second entity.
 * @param missing The value to use in place of missing properties, the "Missing"
 * symbol is used by default.
 * @returns Returns changes found between first and second entity.
 */
export function diffDeepEx(a: any, b: any, missing: any = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (a !== null && b !== null
		&& typeof a === 'object' && typeof b === 'object'
		&& !Array.isArray(a) && !Array.isArray(b)
	) {
		return __diffDeepEx(a, b, missing);
	}

	return b;
}
