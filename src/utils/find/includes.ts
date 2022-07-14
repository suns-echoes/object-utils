/**
 * Finds if object has property that matches the searchElement value.
 * @param object The object on which to perform search.
 * @param searchElement The value to search for.
 * @returns Returns "true" if property was found or "false" otherwise.
 */
export function includes(object: AnyObject, searchElement: any): boolean {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		if (object[keys[index]] === searchElement) {
			return true;
		}
	}

	return false;
}
