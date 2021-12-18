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

			if (typeof item === 'object' && item !== null) {
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

			if (typeof prop === 'object' && prop !== null) {
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

export function entriesDeep(source: AnyArray | AnyObject): [string[], any][] | null;
export function entriesDeep(source: AnyArray | AnyObject, delimiter: string): [string, any][] | null;
export function entriesDeep(source: AnyArray | AnyObject, delimiter = ''): AnyArray | null {
	if (typeof source === 'object' && source !== null) {
		const entries: [string | string[], any][] = [];

		_entriesDeep(entries, source, delimiter, '');

		return entries;
	}

	return null;
}
