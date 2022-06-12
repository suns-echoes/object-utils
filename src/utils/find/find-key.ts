/**
 * Finds the key of the property in the object that pass the test implemented
 * by the provided function.
 * @param object The object on which to perform search.
 * @param callback The predicate function to test properties.
 * Return a value that coerces to "true" to for valid property or to "false"
 * otherwise.
 * It takes three arguments:
 *   * prop - The currently processed property.
 *   * key - The key of the currently processed property.
 *   * object - The object on which findKey() was called.
 * @returns Returns the key of the first property found in the object that
 * passes the test or "undefined" otherwise.
 */
export function findKey<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => boolean,
): string | undefined {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (callback(object[key], key, object)) {
			return key;
		}
	}

	return undefined;
}
