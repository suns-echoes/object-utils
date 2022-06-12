export function __cloneDeepEx(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let index = 0; index < keyConut; index++) {
		const key = keys[index];
		const sourceProp = source[key];

		if (sourceProp !== null && typeof sourceProp === 'object' && !Array.isArray(sourceProp)) {
			__cloneDeepEx(target[key] = {}, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object (excluding arrays).
 * Arrays will not be cloned but rather assigned by reference.
 * @param source The object to be cloned.
 * @returns Returns an object containing the "source" clone or "null" if
 * "source" is not an object.
 */
export function cloneDeepEx(source: AnyObject): AnyObject | null {
	if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
		const copy = {};

		__cloneDeepEx(copy, source);

		return copy;
	}

	return null;
}
