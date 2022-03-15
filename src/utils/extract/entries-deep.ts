function _entriesDeep(
	entries: AnyArray,
	source: AnyArray | AnyObject,
	delimiter: string | undefined,
	pathKey: string | string[],
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	let index = 0;

	if (Array.isArray(source)) {
		const itemCount = source.length;

		for (; index < itemCount; index++) {
			const item = source[index];

			if (item !== null && typeof item === 'object') {
				_entriesDeep(
					entries, item, delimiter,
					delimiter ? `${rootKey}${index.toString(10)}` : [...rootKey, index.toString(10)],
				);
			}
			else {
				entries.push([
					delimiter ? `${rootKey}${index.toString(10)}` : [...rootKey, index.toString(10)],
					item,
				]);
			}
		}
	}
	else {
		const keys = Object.keys(source);
		const keyCount = keys.length;

		for (; index < keyCount; index++) {
			const key = keys[index];
			const prop = source[key];

			if (prop !== null && typeof prop === 'object') {
				_entriesDeep(
					entries, prop, delimiter,
					delimiter ? `${rootKey}${key}` : [...rootKey, key],
				);
			}
			else {
				entries.push([delimiter ? `${rootKey}${key}` : [...rootKey, key], prop]);
			}
		}
	}
}


/**
 * Returns an array of [key, value] pairs of source object own enumerable
 * properties including nested ones.
 * @param source The object whose properties are to be returned.
 * @param delimiter Optional string value to use as delimiter in string "key"
 * path. If not specified the "key" will be an array of strings representing
 * property path.
 * @returns An array containing [key, value] pairs for each property or "null"
 * when input is invalid.
 */
export function entriesDeep(source: AnyArray | AnyObject): [string[], any][] | null;
export function entriesDeep(source: AnyArray | AnyObject, delimiter: string): [string, any][] | null;
export function entriesDeep(source: AnyArray | AnyObject, delimiter = ''): AnyArray | null {
	if (source !== null && typeof source === 'object') {
		const entries: [string | string[], any][] = [];

		_entriesDeep(entries, source, delimiter, '');

		return entries;
	}

	return null;
}
