function _valuesDeep(values: AnyArray, source: AnyArray | AnyObject): void {
	let index = 0;

	if (Array.isArray(source)) {
		const itemCount = source.length;

		for (; index < itemCount; index++) {
			const item = source[index];

			if (typeof item === 'object' && item !== null) {
				_valuesDeep(values, item);
			}
			else {
				values.push(item);
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
				_valuesDeep(values, prop);
			}
			else {
				values.push(prop);
			}
		}
	}
}

export function valuesDeep(source: AnyArray | AnyObject): AnyArray | null {
	if (typeof source === 'object' && source !== null) {
		const values: AnyArray = [];

		_valuesDeep(values, source);

		return values;
	}

	return null;
}
