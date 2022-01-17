function _forEachDeep(
	object: AnyArray | AnyObject,
	callback: AnyFunction,
	delimiter: string | undefined,
	pathKey: KeyPath | PathKeys,
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	let index = 0;

	if (Array.isArray(object)) {
		const itemCount = object.length;

		for (; index < itemCount; index++) {
			const item = object[index];

			if (typeof item === 'object' && item !== null) {
				_forEachDeep(
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
	else {
		const keys = Object.keys(object);
		const keyCount = keys.length;

		for (; index < keyCount; index++) {
			const key = keys[index];
			const prop = object[key];

			if (typeof prop === 'object' && prop !== null) {
				_forEachDeep(
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
}

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
	if (typeof object === 'object' && object !== null) {
		_forEachDeep(object, callback, delimiter, delimiter ? '' : []);
	}
}
