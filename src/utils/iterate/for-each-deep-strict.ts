function __forEachDeepStrict_array(
	object: AnyArray,
	callback: AnyFunction,
	delimiter: string | undefined,
	pathKey: KeyPath | PathKeys,
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;

	if (Array.isArray(object)) {
		const itemCount = object.length;

		for (let index = 0; index < itemCount; index++) {
			const item = object[index];

			if (Array.isArray(item)) {
				__forEachDeepStrict_array(
					item, callback, delimiter,
					delimiter ? `${rootKey}${index.toString(10)}` : [...rootKey, index.toString(10)],
				);
			}
			else if (item !== null && typeof item === 'object') {
				__forEachDeepStrict_object(
					item, callback, delimiter,
					delimiter ? `${rootKey}${index.toString(10)}` : [...rootKey, index.toString(10)],
				);
			}
			else {
				callback(
					item,
					(delimiter ? `${rootKey}${index.toString(10)}` : [...rootKey, index.toString(10)]),
					object,
				);
			}
		}
	}
}

function __forEachDeepStrict_object(
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

		if (Array.isArray(prop)) {
			__forEachDeepStrict_array(
				prop, callback, delimiter,
				delimiter ? `${rootKey}${key}` : [...rootKey, key],
			);
		}
		else if (prop !== null && typeof prop === 'object') {
			__forEachDeepStrict_object(
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
 * Arrays will be checked only for iterable items.
 * @param object The object on which to execute the "callback".
 * @param callback The function to execute on each property.
 * It accepts three arguments:
 *   * prop - The currently processed property.
 *   * key - The key of the currently processed property. If the "delimiter" is
 *   provided "key" will be a delimited string and array of strings otherwise.
 *   * object - The object on which forEachDeepStrict() was called.
 * @param delimiter Optional string value to use as delimiter in callback "key"
 * parameter. If not specified the "key" will be an array of strings
 * representing property path.
 */
export function forEachDeepStrict(
	object: AnyArray | AnyObject,
	callback: (prop: any, key: string[], object: AnyArray | AnyObject) => void,
): void;
export function forEachDeepStrict(
	object: AnyArray | AnyObject,
	callback: (prop: any, key: string, object: AnyArray | AnyObject) => void,
	delimiter: string,
): void;
export function forEachDeepStrict(
	object: AnyArray | AnyObject,
	callback: ((prop: any, key: string[], object: AnyArray | AnyObject) => void)
	| ((prop: any, key: string, object: AnyArray | AnyObject) => void),
	delimiter = '',
): void {
	if (Array.isArray(object)) {
		__forEachDeepStrict_array(object, callback, delimiter, delimiter ? '' : []);
	}
	else if (object !== null && typeof object === 'object') {
		__forEachDeepStrict_object(object, callback, delimiter, delimiter ? '' : []);
	}
}
