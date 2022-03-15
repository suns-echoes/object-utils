function _entriesStrictDeep(
	entries: AnyArray,
	source: AnyObject,
	delimiter: string | undefined,
	pathKey: KeyPath | PathKeys,
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (prop !== null && typeof prop === 'object' && !Array.isArray(prop)) {
			_entriesStrictDeep(
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
 * Returns an array of [key, value] pairs of source object own enumerable
 * properties including nested ones. This is strict version which treats arrays
 * as non-object values.
 * @param source The object whose properties are to be returned.
 * @param delimiter Optional string value to use as delimiter in string "key"
 * path. If not specified the "key" will be an array of strings representing
 * property path.
 * @returns An array containing [key, value] pairs for each property or "null"
 * when input is invalid.
 */
export function entriesStrictDeep(source: AnyObject): [string[], any][] | null;
export function entriesStrictDeep(source: AnyObject, delimiter: string): [string, any][] | null;
export function entriesStrictDeep(source: AnyObject, delimiter = ''): AnyArray | null {
	if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
		const entries: [string | string[], any][] = [];

		_entriesStrictDeep(entries, source, delimiter, '');

		return entries;
	}

	return null;
}
