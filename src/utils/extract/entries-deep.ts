function __entriesDeep(
	entries: AnyArray,
	object: AnyObject,
	delimiter: string | undefined,
	pathKey: string | string[],
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = object[key];

		if (prop !== null && typeof prop === 'object') {
			__entriesDeep(
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
 * Returns an array of [key, value] pairs of the object own enumerable
 * properties including nested ones.
 * Arrays will be traversed by own enumerable properties rather than iterable
 * items.
 * @param source The object whose properties are to be returned.
 * @param delimiter Optional string value used as delimiter in the string key
 * path.
 * If not specified the key will be an array of strings representing property
 * path.
 * @returns Returns an array containing [key, value] pairs for each property or
 * "null" if input is not an object.
 */
export function entriesDeep(source: AnyArray | AnyObject): [string[], any][] | null;
export function entriesDeep(source: AnyArray | AnyObject, delimiter: string): [string, any][] | null;
export function entriesDeep(source: AnyArray | AnyObject, delimiter = ''): AnyArray | null {
	if (source !== null && typeof source === 'object') {
		const entries: [string | string[], any][] = [];

		__entriesDeep(entries, source, delimiter, '');

		return entries;
	}

	return null;
}
