import { Missing, Same, __ARRAY, __OBJECT, __PRIMITIVE } from '../constants';


export { Missing, Same } from '../constants';


export function __diffDeepStrict_array(a: any[], b: any[], missing: any): any[] | typeof Same {
	const lengthA = a.length;
	const lengthB = b.length;
	const lengthDiff = lengthA - lengthB;
	const isALonger = lengthA > lengthB;
	// OPT: Create diff array on demand?
	const diffArray = isALonger ? b.concat(new Array(lengthDiff).fill(missing)) : b.slice(0);
	const commonLength = isALonger ? lengthB : lengthA;
	let isSame = lengthDiff === 0 ? Same : null;

	for (let index = 0; index < commonLength; index++) {
		if (index in b) {
			if (index in a) {
				const aItem = a[index];
				const bItem = b[index];

				if (aItem === bItem) {
					diffArray[index] = Same;
				}
				else if (aItem !== null && bItem !== null) {
					const aType = Array.isArray(aItem) ? __ARRAY : typeof aItem === 'object' ? __OBJECT : __PRIMITIVE;
					const bType = Array.isArray(bItem) ? __ARRAY : typeof bItem === 'object' ? __OBJECT : __PRIMITIVE;
					let diff: any = bItem;

					if ((aType & bType) === __ARRAY) {
						diff = __diffDeepStrict_array(aItem, bItem, missing);
					}
					else if ((aType & bType) === __OBJECT) {
						diff = __diffDeepStrict_object(aItem, bItem, missing);
					}

					diffArray[index] = diff;

					if (diff !== Same) {
						isSame = null;
					}
				}
			}
			else {
				diffArray[index] = b[index];
				isSame = null;
			}
		}
		else {
			diffArray[index] = missing;
			isSame = null;
		}
	}

	return isSame || diffArray;
}

export function __diffDeepStrict_object(a: AnyObject, b: AnyObject, missing: any): AnyObject | typeof Same {
	const diffObject: AnyObject = {};
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
					continue;
				}

				if (aProp !== null && bProp !== null) {
					const aType = Array.isArray(aProp) ? __ARRAY : typeof aProp === 'object' ? __OBJECT : __PRIMITIVE;
					const bType = Array.isArray(bProp) ? __ARRAY : typeof bProp === 'object' ? __OBJECT : __PRIMITIVE;
					let diff: any = bProp;

					if ((aType & bType) === __ARRAY) {
						diff = __diffDeepStrict_array(aProp, bProp, missing);
					}
					else if ((aType & bType) === __OBJECT) {
						diff = __diffDeepStrict_object(aProp, bProp, missing);
					}

					if (diff !== Same) {
						diffObject[key] = diff;
						isSame = null;
					}
				}
			}
			else {
				diffObject[key] = b[key];
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
 * Generic object and arrays will be treated as different types and arrays will
 * be traversed only by iterable items.
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
export function diffDeepStrict(a: any, b: any, missing: any = Missing): any {
	if (a === b) {
		return Same;
	}
	else if (a !== null && b !== null) {
		const aType = Array.isArray(a) ? __ARRAY : typeof a === 'object' ? __OBJECT : __PRIMITIVE;
		const bType = Array.isArray(b) ? __ARRAY : typeof b === 'object' ? __OBJECT : __PRIMITIVE;

		if ((aType & bType) === __ARRAY) {
			return __diffDeepStrict_array(a, b, missing);
		}
		else if ((aType & bType) === __OBJECT) {
			return __diffDeepStrict_object(a, b, missing);
		}
	}

	return b;
}
