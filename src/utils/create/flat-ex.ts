function __flatEx(
	target: AnyObject, source: AnyObject, depth: number,
	delimiter: string | false, pathKey: string,
): void {
	const rootKey = (delimiter && pathKey !== '') ? `${pathKey}${delimiter}` : '';
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (depth !== 0 && prop !== null && typeof prop === 'object' && !Array.isArray(prop)) {
			__flatEx(target, prop, depth - 1, delimiter, `${rootKey}${key}`);
		}
		else {
			target[delimiter ? `${rootKey}${key}` : key] = prop;
		}
	}
}


/**
 * Creates a new object with all "source" object properties (but not arrays) and
 * sub-properties merged into it recursively up to the specified depth.
 * If string  delimiter is specified the sub-keys will be concatenated using it,
 * otherwise properties will be overwritten by deeper level properties with the
 * same key.
 * @param source The source object.
 * @param depth The maximum number of levels of flattening, set to "-1" for no
 * limit.
 * @param delimiter The key path delimiter. If set to "false" or to empty string
 * deeper level properties will overwrite higher level properties that have the
 * same key.
 * @returns A new flattened object or "null" if the "source" is not an object.
 */
export function flatEx(source: AnyObject, depth = -1, delimiter: string | false = '.'): AnyObject | null {
	if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
		const target = {};

		__flatEx(target, source, depth, delimiter, '');

		return target;
	}

	return null;
}
