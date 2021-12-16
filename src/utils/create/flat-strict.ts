function _flatStrict(target: AnyObject, source: AnyObject, delimiter = '.', pathKey = ''): void {
	const pathRoot = pathKey !== '' ? `${pathKey}${delimiter}` : '';
	const keys = Object.keys(source);
	const keyCount = keys.length;
	let index = 0;

	for (; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
			_flatStrict(target, prop, delimiter, `${pathRoot}${key}`);
		}
		else {
			target[`${pathRoot}${key}`] = prop;
		}
	}
}

export function flatStrict(source: AnyObject, delimiter = '.'): AnyObject | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const target = {};

		_flatStrict(target, source, delimiter);

		return target;
	}

	return null;
}
