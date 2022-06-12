function __valuesDeepStrict_array(values: AnyArray, object: AnyArray): void {
	const itemCount = object.length;

	for (let index = 0; index < itemCount; index++) {
		const item = object[index];

		if (Array.isArray(item)) {
			__valuesDeepStrict_array(values, item);
		}
		else if (item !== null && typeof item === 'object') {
			__valuesDeepStrict_object(values, item);
		}
		else {
			values.push(item);
		}
	}
}

function __valuesDeepStrict_object(values: AnyArray, object: AnyObject): void {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = object[key];

		if (Array.isArray(prop)) {
			__valuesDeepStrict_array(values, prop);
		}
		else if (prop !== null && typeof prop === 'object') {
			__valuesDeepStrict_object(values, prop);
		}
		else {
			values.push(prop);
		}
	}
}


/**
 * Returns an array of source object own enumerable properties including nested
 * ones.
 * Arrays will be checked only for iterable items.
 * @param object The object whose properties are to be returned.
 * @returns Returns an array containing values of each property or "null" when
 * input is not an object.
 */
export function valuesDeepStrict(object: AnyObject): AnyArray | null {
	if (Array.isArray(object)) {
		const values: AnyArray = [];

		__valuesDeepStrict_array(values, object);

		return values;
	}
	else if (object !== null && typeof object === 'object') {
		const values: AnyArray = [];

		__valuesDeepStrict_object(values, object);

		return values;
	}

	return null;
}
