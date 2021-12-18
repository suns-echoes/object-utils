function _entriesStrictDeep(
	entries: AnyArray,
	source: AnyObject,
	delimiter: string | undefined,
	pathKey: string | string[],
): void {
	const rootKey = delimiter ? (pathKey !== '' ? `${pathKey}${delimiter}` : '') : pathKey;
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
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

export function entriesStrictDeep(source: AnyObject): [string[], any][] | null;
export function entriesStrictDeep(source: AnyObject, delimiter: string): [string, any][] | null;
export function entriesStrictDeep(source: AnyObject, delimiter = ''): AnyArray | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const entries: [string | string[], any][] = [];

		_entriesStrictDeep(entries, source, delimiter, '');

		return entries;
	}

	return null;
}
