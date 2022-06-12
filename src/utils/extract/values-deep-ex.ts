function __valuesDeepEx(values: AnyArray, object: AnyObject): void {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = object[key];

		if (prop !== null && typeof prop === 'object' && !Array.isArray(prop)) {
			__valuesDeepEx(values, prop);
		}
		else {
			values.push(prop);
		}
	}
}


/**
 * Returns an array of source object own enumerable properties including nested
 * ones (excluding arrays).
 * Arrays will not be traversed.
 * @param object The object whose properties are to be returned.
 * @returns Returns an array containing values of each property or "null" if
 * input is not an object.
 */
export function valuesDeepEx(object: AnyObject): AnyArray | null {
	if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
		const values: AnyArray = [];

		__valuesDeepEx(values, object);

		return values;
	}

	return null;
}
