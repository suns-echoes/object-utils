export function __cloneExDeep(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let index = 0; index < keyConut; index++) {
		const key = keys[index];
		const sourceProp = source[key];

		if (sourceProp !== null && typeof sourceProp === 'object' && !Array.isArray(sourceProp)) {
			__cloneExDeep(target[key] = {}, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object.
 * Note: This function is exclusive for objects so arrays will be treated like
 * primitive values and compared or assigned by reference.
 * @param source The object to be cloned.
 * @returns An object clone or "null" if the "source" was not type of "object".
 */
export function cloneExDeep(source: AnyObject): AnyObject | null {
	if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
		const copy = {};

		__cloneExDeep(copy, source);

		return copy;
	}

	return null;
}
