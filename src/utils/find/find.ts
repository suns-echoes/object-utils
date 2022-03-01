/**
 * Returns the first property in the provided object that satisfies the provided
 * testing function. If no values satisfy the testing function, "undefined" is
 * returned.
 * @param object The object on which to perform search.
 * @param callback A function to execute on each property in the object until
 * the function returns "true", indicating that the satisfying property was
 * found.
 * It takes three arguments:
 *   * property - The current property being processed in the object.
 *   * key - The key of the current property being processed in the object.
 *   * object - The object on which findKey() was called.
 * @returns The the first property in the object that satisfies the provided
 * testing function, "undefined" otherwise.
 */
export function find<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => boolean,
): any | undefined {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (callback(object[key], key, object)) {
			return object[key];
		}
	}

	return undefined;
}
