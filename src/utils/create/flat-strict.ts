function _flatStrict(target: AnyObject, source: AnyObject, depth: number, delimiter: string | false, pathKey: string): void {
	const pathRoot = (delimiter && pathKey !== '') ? `${pathKey}${delimiter}` : '';
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (depth !== 0 && typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
			_flatStrict(target, prop, depth - 1, delimiter, `${pathRoot}${key}`);
		}
		else {
			target[`${pathRoot}${key}`] = prop;
		}
	}
}


/**
 * Creates a new object with all sub-properties merged into it recursively up to
 * the specified depth. If delimiter is specified (not falsy) the sub-keys will
 * be concatenated using it. Otherwise deepest level properties will overwrite
 * higher level properties that have the same key. This is strict version which
 * compares arrays by references and not by item values.
 * @param source The source object.
 * @param depth The maximum number of levels of flattening, set to "-1" for no
 * limit.
 * @param delimiter The key path delimiter. If set to "false" or to empty string
 * deepest level properties will overwrite higher level properties that have the
 * same key.
 * @returns A new flattened object or "null" if source is not an object.
 */
export function flatStrict(source: AnyObject, depth = -1, delimiter: string | false = '.'): AnyObject | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const target = {};

		_flatStrict(target, source, depth, delimiter, '');

		return target;
	}

	return null;
}
