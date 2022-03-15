function _valuesDeep(values: AnyArray, object: AnyArray | AnyObject): void {
	let index = 0;

	if (Array.isArray(object)) {
		const itemCount = object.length;

		for (; index < itemCount; index++) {
			const item = object[index];

			if (item !== null && typeof item === 'object') {
				_valuesDeep(values, item);
			}
			else {
				values.push(item);
			}
		}
	}
	else {
		const keys = Object.keys(object);
		const keyCount = keys.length;

		for (; index < keyCount; index++) {
			const key = keys[index];
			const prop = object[key];

			if (prop !== null && typeof prop === 'object') {
				_valuesDeep(values, prop);
			}
			else {
				values.push(prop);
			}
		}
	}
}


/**
 * Returns an array of source object own enumerable properties including nested
 * ones.
 * @param object The object whose properties are to be returned.
 * @returns An array containing values for each property or "null" when input is
 * invalid.
 */
export function valuesDeep(object: AnyArray | AnyObject): AnyArray | null {
	if (object !== null && typeof object === 'object') {
		const values: AnyArray = [];

		_valuesDeep(values, object);

		return values;
	}

	return null;
}
