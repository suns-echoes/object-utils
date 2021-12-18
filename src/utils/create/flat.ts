function _flat(target: AnyObject, source: AnyArray | AnyObject, delimiter: string, pathKey: string): void {
	const rootKey = pathKey !== '' ? `${pathKey}${delimiter}` : '';
	let index = 0;

	if (Array.isArray(source)) {
		const itemCount = source.length;

		for (; index < itemCount; index++) {
			const prop = source[index];

			if (typeof prop === 'object' && prop !== null) {
				_flat(target, prop, delimiter, `${rootKey}${index}`);
			}
			else {
				target[`${rootKey}${index}`] = prop;
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
				_flat(target, prop, delimiter, `${rootKey}${key}`);
			}
			else {
				target[`${rootKey}${key}`] = prop;
			}
		}
	}
}

export function flat(source: AnyArray | AnyObject, delimiter = '.'): AnyObject | null {
	if (typeof source === 'object' && source !== null) {
		const target = {};

		_flat(target, source, delimiter, '');

		return target;
	}

	return null;
}
