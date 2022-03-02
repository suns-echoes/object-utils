/**
 * Creates a new object with all properties that pass the test implemented by
 * the provided function.
 * @param source The object on which to perform filtering.
 * @param callback The predicate function to test each property of the object.
 * Return a value that coerces to "true" to keep the property or to "false"
 * otherwise.
 * It accepts three arguments:
 *   * prop - The current processed property.
 *   * key - The key of the current processed property.
 *   * object - The object on which filter() was called.
 * @returns A new object with the properties that pass the test. If no
 * properties pass the test, an empty object will be returned or "null" if
 * "source" is not an object.
 */
export function filter<T extends AnyObject>(
	source: T,
	callback: (prop: T[keyof T], key: string & keyof T, object: T) => boolean,
): AnyObject | null {
	if (typeof source === 'object' && source !== null && typeof callback === 'function') {
		const copy: AnyObject = {};
		const keys = Object.keys(source);
		const keyCount = keys.length;

		for (let index = 0; index < keyCount; index++) {
			const key = keys[index];

			if (callback(source[key], key, source)) {
				copy[key] = source[key];
			}
		}

		return copy;
	}

	return null;
}
