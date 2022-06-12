import { __ARRAY, __OBJECT, __PRIMITIVE } from '../constants';


export function __eqlDeepStrict_array(a: any[], b: any[]): boolean {
	const length = a.length;

	if (length !== b.length) {
		return false;
	}

	for (let index = 0; index < length; index++) {
		if (index in a && index in b) {
			const aItem = a[index];
			const bItem = b[index];

			if (aItem === bItem) {
				continue;
			}

			if (aItem !== null && bItem !== null) {
				const aType = Array.isArray(aItem) ? __ARRAY : typeof aItem === 'object' ? __OBJECT : __PRIMITIVE;
				const bType = Array.isArray(bItem) ? __ARRAY : typeof bItem === 'object' ? __OBJECT : __PRIMITIVE;

				if ((aType & bType) === __ARRAY) {
					if (__eqlDeepStrict_array(aItem, bItem)) {
						continue;
					}
				}
				else if ((aType & bType) === __OBJECT && __eqlDeepStrict_object(aItem, bItem)) {
					continue;
				}
			}
		}
		else if (!((index in a) || (index in b))) {
			continue;
		}

		return false;
	}

	return true;
}

export function __eqlDeepStrict_object(a: AnyObject, b: AnyObject): boolean {
	const keys = Object.keys(a);

	if (keys.length !== Object.keys(b).length) {
		return false;
	}

	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (key in b) {
			const aProp = a[key];
			const bProp = b[key];

			if (aProp === bProp) {
				continue;
			}

			const aType = Array.isArray(aProp) ? __ARRAY : typeof aProp === 'object' ? __OBJECT : __PRIMITIVE;
			const bType = Array.isArray(bProp) ? __ARRAY : typeof bProp === 'object' ? __OBJECT : __PRIMITIVE;

			if ((aType & bType) === __ARRAY) {
				if (__eqlDeepStrict_array(aProp, bProp)) {
					continue;
				}
			}
			else if ((aType & bType) === __OBJECT && __eqlDeepStrict_object(aProp, bProp)) {
				continue;
			}
		}

		return false;
	}

	return true;
}

/**
 * Performs deep equality check of two objects.
 * Arrays will be treated as different type than the generic objects.
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns Returns "true" if objects are equal or "false" otherwise.
 */
export function eqlDeepStrict(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (a !== null && b !== null) {
		const aType = Array.isArray(a) ? __ARRAY : typeof a === 'object' ? __OBJECT : __PRIMITIVE;
		const bType = Array.isArray(b) ? __ARRAY : typeof b === 'object' ? __OBJECT : __PRIMITIVE;

		if ((aType & bType) === __ARRAY) {
			return __eqlDeepStrict_array(a, b);
		}
		else if ((aType & bType) === __OBJECT) {
			return __eqlDeepStrict_object(a, b);
		}
	}

	return false;
}
