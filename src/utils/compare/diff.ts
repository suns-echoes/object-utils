import { Missing, Same } from '../constants';


export { Missing, Same } from '../constants';


export function __diff<T extends AnyObject>(a: T, b: AnyObject, missing: any): T | typeof Same {
	const isArray = Array.isArray(a);
	const diffEntity: AnyObject = isArray ? [] : {};
	const allKeys = [...new Set(Object.keys(a).concat(Object.keys(b)))];
	const keyCount = allKeys.length;
	let isSame: typeof Same | null = Same;

	for (let index = 0; index < keyCount; index++) {
		const key = allKeys[index];

		if (key in b) {
			if (key in a) {
				const aProp = a[key];
				const bProp = b[key];

				if (aProp === bProp) {
					if (isArray) {
						diffEntity[key] = Same;
					}

					continue;
				}

				diffEntity[key] = bProp;
				isSame = null;
			}
			else {
				diffEntity[key] = b[key];
				isSame = null;
			}
		}
		else {
			diffEntity[key] = missing;
			isSame = null;
		}
	}

	return isSame || <T>diffEntity;
}

/**
 * Finds the shallow difference between two entities.
 * Arrays will be compared as if they were generic objects so type difference
 * (array vs object) will be ignored.
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
export function diff<T>(a: T, b: any, missing: any = Missing): T | typeof Same {
	if (a === b) {
		return Same;
	}
	else if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
		return __diff(a, b, missing);
	}

	return b;
}
