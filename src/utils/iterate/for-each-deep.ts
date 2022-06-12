function __forEachDeep(
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

		if (prop !== null && typeof prop === 'object') {
			__forEachDeep(
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
 * @param object The object on which to execute the "callback".
 * @param callback The function to execute on each property.
 * It accepts three arguments:
 *   * prop - The currently processed property.
 *   * key - The key of the currently processed property. If the "delimiter" is
 *   provided "key" will be a delimited string and array of strings otherwise.
 *   * object - The object on which forEachDeep() was called.
 * @param delimiter Optional string value to use as delimiter in callback "key"
 * parameter. If not specified the "key" will be an array of strings
 * representing property path.
 */
export function forEachDeep(
	object: AnyArray | AnyObject,
	callback: (prop: any, key: string[], object: AnyArray | AnyObject) => void,
): void;
export function forEachDeep(
	object: AnyArray | AnyObject,
	callback: (prop: any, key: string, object: AnyArray | AnyObject) => void,
	delimiter: string,
): void;
export function forEachDeep(
	object: AnyArray | AnyObject,
	callback: ((prop: any, key: string[], object: AnyArray | AnyObject) => void)
	| ((prop: any, key: string, object: AnyArray | AnyObject) => void),
	delimiter = '',
): void {
	if (object !== null && typeof object === 'object') {
		__forEachDeep(object, callback, delimiter, delimiter ? '' : []);
	}
}
