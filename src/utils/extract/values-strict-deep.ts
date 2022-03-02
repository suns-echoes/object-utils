function _valuesStrictDeep(values: AnyArray, object: AnyObject): void {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = object[key];

		if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
			_valuesStrictDeep(values, prop);
		}
		else {
			values.push(prop);
		}
	}
}


/**
 * Returns an array of source object own enumerable properties including nested
 * ones. This is strict version which treats arrays as non-object values.
 * @param object The object whose properties are to be returned.
 * @returns An array containing values for each property or "null" when input is
 * invalid.
 */
export function valuesStrictDeep(object: AnyObject): AnyArray | null {
	if (typeof object === 'object' && object !== null && !Array.isArray(object)) {
		const values: AnyArray = [];

		_valuesStrictDeep(values, object);

		return values;
	}

	return null;
}
