function _forEachStrictDeep(
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

		if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
			_forEachStrictDeep(
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
 * Executes the provided function once for each property (including nested
 * properties). This is strict version which treats arrays as non-object values.
 * @param object The object on which to execute the "callback".
 * @param callback The function to execute on each property.
 * It accepts three arguments:
 *   * prop - The current processed property.
 *   * key - The key of the current processed property. If the "delimiter" is
 *   provided "key" will be a delimited string and array of strings otherwise.
 *   * object - The object on which forEachStrictDeep() was called.
 * @param delimiter Optional string value to use as delimiter in callback "key"
 * parameter. If not specified the "key" will be an array of strings
 * representing property path.
 */
export function forEachStrictDeep(
	object: AnyObject,
	callback: (prop: any, key: string[], object: AnyObject) => void,
): void;
export function forEachStrictDeep(
	object: AnyObject,
	callback: (prop: any, key: string, object: AnyObject) => void,
	delimiter: string,
): void;
export function forEachStrictDeep(
	object: AnyObject,
	callback: ((prop: any, key: string[], object: AnyObject) => void)
	| ((prop: any, key: string, object: AnyObject) => void),
	delimiter = '',
): void {
	if (typeof object === 'object' && object !== null && !Array.isArray(object)) {
		_forEachStrictDeep(object, callback, delimiter, delimiter ? '' : []);
	}
}
