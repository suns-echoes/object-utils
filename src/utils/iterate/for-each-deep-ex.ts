function __forEachDeepEx(
	object: AnyObject,
	callback: AnyFunction,
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
			__forEachDeepEx(
				prop, callback, delimiter,
				delimiter ? `${rootKey}${key}` : [...rootKey, key],
			);
		}
		else {
			callback(
				prop,
				(delimiter ? `${rootKey}${key}` : [...rootKey, key]),
				object,
			);
		}
	}
}


/**
 * Executes the provided function once for each property including nested ones.
 * Arrays will not be traversed.
 * @param object The object on which to execute the "callback".
 * @param callback The function to execute on each property.
 * It accepts three arguments:
 *   * prop - The currently processed property.
 *   * key - The key of the currently processed property. If the "delimiter" is
 *   provided "key" will be a delimited string, otherwise array of strings.
 *   * object - The object on which forEachDeepEx() was called.
 * @param delimiter Optional string value to use as delimiter in callback "key"
 * parameter. If not specified the "key" will be an array of strings
 * representing property path.
 */
export function forEachDeepEx(
	object: AnyObject,
	callback: (prop: any, key: string[], object: AnyObject) => void,
): void;
export function forEachDeepEx(
	object: AnyObject,
	callback: (prop: any, key: string, object: AnyObject) => void,
	delimiter: string,
): void;
export function forEachDeepEx(
	object: AnyObject,
	callback: ((prop: any, key: string[], object: AnyObject) => void)
	| ((prop: any, key: string, object: AnyObject) => void),
	delimiter = '',
): void {
	if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
		__forEachDeepEx(object, callback, delimiter, delimiter ? '' : []);
	}
}
