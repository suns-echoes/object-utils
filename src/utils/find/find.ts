/**
 * The find() method returns the first property in the provided object that
 * satisfies the provided testing function. If no values satisfy the testing
 * function, undefined is returned.
 *
 * @param object Object to use as inside callbackFn.
 * @param callbackFn A function to execute on each property in the object until
 * the function returns true, indicating that the satisfying property was found.
 * It takes three arguments:
 * "property" - The current property being processed in the object.
 * "key" - Optional, the key of the current property being processed in the
 * object.
 * "object" - Optional, the object findKey() was called upon.
 * @returns The the first property in the object that satisfies the provided
 * testing function. Otherwise, undefined is returned.
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
