function _valuesStrictDeep(values: AnyArray, source: AnyObject): void {
	let index = 0;
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
			_valuesStrictDeep(values, prop);
		}
		else {
			values.push(prop);
		}
	}
}

export function valuesStrictDeep(source: AnyObject): AnyArray | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const values: AnyArray = [];

		_valuesStrictDeep(values, source);

		return values;
	}

	return null;
}
