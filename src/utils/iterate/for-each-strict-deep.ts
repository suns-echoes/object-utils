function _forEachStrictDeep(
	object: AnyObject,
	callback: AnyFunction,
	delimiter: string | undefined,
	pathKey: string | string[],
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
