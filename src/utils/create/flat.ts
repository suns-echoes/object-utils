function _flat(
	target: AnyObject, source: AnyArray | AnyObject, depth: number,
	delimiter: string | false, pathKey: string,
): void {
	const rootKey = (delimiter && pathKey !== '') ? `${pathKey}${delimiter}` : '';
	let index = 0;

	if (Array.isArray(source)) {
		const itemCount = source.length;

		for (; index < itemCount; index++) {
			const prop = source[index];

			if (depth !== 0 && typeof prop === 'object' && prop !== null) {
				_flat(target, prop, depth - 1, delimiter, `${rootKey}${index}`);
			}
			else {
				target[delimiter ? `${rootKey}${index}` : index] = prop;
			}
		}
	}
	else {
		const keys = Object.keys(source);
		const keyCount = keys.length;

		for (; index < keyCount; index++) {
			const key = keys[index];
			const prop = source[key];

			if (depth !== 0 && typeof prop === 'object' && prop !== null) {
				_flat(target, prop, depth - 1, delimiter, `${rootKey}${key}`);
			}
			else {
				target[delimiter ? `${rootKey}${key}` : key] = prop;
			}
		}
	}
}


/**
 * Creates a new object with all sub-properties merged into it recursively up to
 * the specified depth. If delimiter is specified (not falsy) the sub-keys will
 * be concatenated using it. Otherwise deepest properties will overwrite higher
 * level properties that have the same key.
 * @param source The source object.
 * @param depth The maximum number of levels of flattening, set to "-1" for no
 * limit.
 * @param delimiter The key path delimiter. If set to "false" or to empty string
 * deepest level properties will overwrite higher level properties that have the
 * same key.
 * @returns A new flattened object or "null" if source is not an object.
 */
export function flat(source: AnyArray | AnyObject, depth = -1, delimiter: string | false = '.'): AnyObject | null {
	if (typeof source === 'object' && source !== null) {
		const target = {};

		_flat(target, source, depth, delimiter, '');

		return target;
	}

	return null;
}
