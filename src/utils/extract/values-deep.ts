function __valuesDeep(values: AnyArray, object: AnyObject): void {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = object[key];

		if (prop !== null && typeof prop === 'object') {
			__valuesDeep(values, prop);
		}
		else {
			values.push(prop);
		}
	}
}


/**
 * Returns an array of source object own enumerable properties including nested
 * ones.
 * @param object The object whose properties are to be returned.
 * @returns Returns an array containing values for each property or "null" when
 * input is not an object.
 */
export function valuesDeep(object: AnyArray | AnyObject): AnyArray | null {
	if (object !== null && typeof object === 'object') {
		const values: AnyArray = [];

		__valuesDeep(values, object);

		return values;
	}

	return null;
}
