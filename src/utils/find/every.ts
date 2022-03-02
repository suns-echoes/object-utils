/**
 * Finds if all object properties pass the test implemented by the provided
 * function.
 * @param object The object on which to perform tests.
 * @param callback The predicate function to test properties.
 * Return a value that coerces to "true" to for valid property or to "false"
 * otherwise.
 * It accepts three arguments:
 *   * prop - The current processed property.
 *   * key - The key of the current processed property.
 *   * object - The object on which every() was called.
 * @returns A "true" if all properties pass the test or "false" otherwise.
 */
export function every<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => boolean,
): boolean {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (!callback(object[key], key, object)) {
			return false;
		}
	}

	return true;
}
