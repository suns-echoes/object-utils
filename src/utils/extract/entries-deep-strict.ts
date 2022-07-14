function __entriesDeepStrict_array(
	entries: AnyArray,
	object: AnyArray,
	delimiter: string | undefined,
	pathKey: string | string[],
): void {
	const rootKey = delimiter
		? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	const itemCount = object.length;

	for (let index = 0; index < itemCount; index++) {
		const item = object[index];

		if (Array.isArray(item)) {
			__entriesDeepStrict_array(
				entries, item, delimiter,
				delimiter ? `${rootKey}${index.toString(10)}` : [...rootKey, index.toString(10)],
			);
		}
		else if (item !== null && typeof item === 'object') {
			__entriesDeepStrict_object(
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

function __entriesDeepStrict_object(
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

		if (Array.isArray(prop)) {
			__entriesDeepStrict_array(
				entries, prop, delimiter,
				delimiter ? `${rootKey}${key}` : [...rootKey, key],
			);
		}
		else if (prop !== null && typeof prop === 'object') {
			__entriesDeepStrict_object(
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
 * Arrays will be traversed only by iterable items.
 * @param object The object whose properties are to be returned.
 * @param delimiter Optional string value used as delimiter in the string key
 * path.
 * If not specified the key will be an array of strings representing property
 * path.
 * @returns Returns an array containing [key, value] pairs for each property or
 * "null" if input is not an object.
 */
export function entriesDeepStrict(object: AnyArray | AnyObject): [string[], any][] | null;
export function entriesDeepStrict(object: AnyArray | AnyObject, delimiter: string): [string, any][] | null;
export function entriesDeepStrict(object: AnyArray | AnyObject, delimiter = ''): AnyArray | null {
	if (Array.isArray(object)) {
		const entries: [string | string[], any][] = [];

		__entriesDeepStrict_array(entries, object, delimiter, '');

		return entries;
	}
	else if (object !== null && typeof object === 'object') {
		const entries: [string | string[], any][] = [];

		__entriesDeepStrict_object(entries, object, delimiter, '');

		return entries;
	}

	return null;
}
