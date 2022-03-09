export function _cloneDeep(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let index = 0; index < keyConut; index++) {
		const key = keys[index];
		const sourceProp = source[key];

		if (typeof sourceProp === 'object' && sourceProp !== null) {
			const copyProp = Array.isArray(sourceProp) ? [] : {};

			_cloneDeep(target[key] = copyProp, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object.
 * @param source The object to be cloned.
 * @returns An object clone or "null" if the "source" was not type of "object".
 */
export function cloneDeep(source: AnyObject): AnyObject | null {
	if (typeof source === 'object' && source !== null) {
		const copy: AnyObject = Array.isArray(source) ? [] : {};

		if (typeof source === 'object') {
			_cloneDeep(copy, source);
		}

		return copy;
	}

	return null;
}
