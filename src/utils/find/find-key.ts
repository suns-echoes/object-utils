/**
 * Returns the key of the first property in the object that satisfies the
 * provided testing function. Otherwise, it returns "undefined", indicating that
 * no property passed the test.
 * @param object The object on which to perform search.
 * @param callback A function to execute on each property in the object until
 * the function returns "true", indicating that the satisfying property was
 * found.
 * It takes three arguments:
 *   * prop - The current processed property.
 *   * key - The key of the current processed property.
 *   * object - The object on which findKey() was called.
 * @returns The key of the first property in the object that passes the test or
 * "undefined" otherwise.
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
