function __entriesDeepEx(
	entries: AnyArray,
	object: AnyObject,
	delimiter: string | undefined,
	pathKey: KeyPath | PathKeys,
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = object[key];

		if (prop !== null && typeof prop === 'object' && !Array.isArray(prop)) {
			__entriesDeepEx(
				entries, prop, delimiter,
				delimiter ? `${rootKey}${key}` : [...rootKey, key],
			);
		}
		else {
			entries.push([delimiter ? `${rootKey}${key}` : [...rootKey, key], prop]);
		}
	}
}


/**
 * Returns an array of [key, value] pairs of the source object own enumerable
 * properties including nested ones.
 * Arrays will not be traversed.
 * @param object The object whose properties are to be returned.
 * @param delimiter Optional string value used as delimiter in the string key
 * path.
 * If not specified the key will be an array of strings representing property
 * path.
 * @returns Returns an array containing [key, value] pairs for each property or
 * "null" if input is not an object.
 */
export function entriesDeepEx(object: AnyObject): [string[], any][] | null;
export function entriesDeepEx(object: AnyObject, delimiter: string): [string, any][] | null;
export function entriesDeepEx(object: AnyObject, delimiter = ''): AnyArray | null {
	if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
		const entries: [string | string[], any][] = [];

		__entriesDeepEx(entries, object, delimiter, '');

		return entries;
	}

	return null;
}
