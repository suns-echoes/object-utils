/**
 * Finds the key of the first property in the object that matches the
 * searchElement value.
 * @param object The object on which to perform search.
 * @param searchElement The value to search for.
 * @returns The key of the first property in the object that matches provided
 * value or "undefined" otherwise.
 */
export function keyOf(object: AnyObject, searchElement: any): string | undefined {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		if (object[keys[index]] === searchElement) {
			return keys[index];
		}
	}

	return undefined;
}
