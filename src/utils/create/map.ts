/**
 * Creates a new object with all property values rewritten by the provided
 * function.
 * @param source The object on which to perform mapping.
 * @param callback The predicate function to map each property of the object.
 * Return a value that coerces to "true" to keep the property or to "false"
 * otherwise.
 * It accepts three arguments:
 *   * prop - The current processed property.
 *   * key - The key of the current processed property.
 *   * object - The object on which map() was called.
 * @returns A new object with the rewritten properties or "null" if "source" is
 * not an object.
 */
export function map<T extends AnyObject>(
	source: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => any,
): AnyObject | null {
	if (typeof source === 'object' && source !== null && typeof callback === 'function') {
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
