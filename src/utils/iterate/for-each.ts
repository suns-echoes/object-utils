/**
 * Executes the provided function once for each property.
 * Arrays will be traversed by own enumerable properties rather than iterable
 * items.
 * @param object The object on which to execute the callback.
 * @param callback The function to execute on each property.
 * It accepts three arguments:
 *   * prop - The currently processed property.
 *   * key - The key of the currently processed property.
 *   * object - The object on which forEach() was called.
 */
export function forEach<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: string & keyof T, object: T) => void,
): void {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		callback(object[key], key, object);
	}
}
