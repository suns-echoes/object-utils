function _cloneStrictDeep(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let index = 0; index < keyConut; index++) {
		const key = keys[index];
		const sourceProp = source[key];

		if (typeof sourceProp === 'object' && sourceProp !== null && !Array.isArray(sourceProp)) {
			_cloneStrictDeep(target[key] = {}, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object. This is strict version which
 * compares arrays by references and not by item values.
 * @param source The object to be cloned.
 * @returns An object clone or "null" for non-object input.
 */
export function cloneStrictDeep(source: AnyObject): AnyObject | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const copy: AnyObject = {};

		_cloneStrictDeep(copy, source);

		return copy;
	}

	return null;
}
