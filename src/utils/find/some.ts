/**
 * Finds if object has property that pass the test implemented by the provided
 * function.
 * @param object The object on which to perform search.
 * @param callback The predicate function to test properties.
 * Return a value that coerces to "true" to for valid property or to "false"
 * otherwise.
 * It accepts three arguments:
 *   * prop - The current processed property.
 *   * key - The key of the current processed property.
 *   * object - The object on which some() was called.
 * @returns A "true" if property was found or "false" otherwise.
 */
export function some<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => boolean,
): boolean {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (callback(object[key], key, object)) {
			return true;
		}
	}

	return false;
}
