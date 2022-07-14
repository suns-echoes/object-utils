/**
 * Creates a new object with all property values rewritten by the return from
 * provided callback function.
 * @param source The object on which to perform mapping.
 * @param callback The function to map each property of the object.
 * Return a value to pass it to the final object.
 * It accepts three arguments:
 *   * prop - The currently processed property.
 *   * key - The key of the currently processed property.
 *   * object - The object on which map() was called.
 * @returns Returns a new object with rewritten properties or "null" if the
 * source is not an object.
 */
export function map<T extends AnyObject>(
	source: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => any,
): AnyObject | null {
	if (source !== null && typeof source === 'object' && typeof callback === 'function') {
		const copy: AnyObject = {};
		const keys = Object.keys(source);
		const keyCount = keys.length;

		for (let index = 0; index < keyCount; index++) {
			const key = keys[index];

			copy[key] = callback(source[key], key, source);
		}

		return copy;
	}

	return null;
}
