/**
 * The findKey() method returns the key of the first property in the object that
 * satisfies the provided testing function. Otherwise, it returns undefined,
 * indicating that no property passed the test.
 *
 * @param object Object to use as inside callbackFn.
 * @param callbackFn A function to execute on each property in the object until
 * the function returns true, indicating that the satisfying property was found.
 * It takes three arguments:
 * "property" - The current property being processed in the object.
 * "key" - Optional, the key of the current property being processed in the
 * object.
 * "object" - Optional, the object findKey() was called upon.
 * @returns The key of the first property in the object that passes the test.
 * Otherwise, undefined.
 */
export function findKey(object: AnyObject, callbackFn: ObjectPropertyCallbackFn): string | undefined {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (callbackFn(object[key], key, object)) {
			return key;
		}
	}

	return undefined;
}
