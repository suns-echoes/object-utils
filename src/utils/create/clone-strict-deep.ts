export function __cloneStrictDeep_array(target: AnyArray, source: AnyArray): void {
	const length = source.length;

	for (let index = 0; index < length; index++) {
		const sourceItem = source[index];

		if (typeof sourceItem === 'object' && sourceItem !== null) {
			Array.isArray(sourceItem)
				? __cloneStrictDeep_array(target[index] = new Array(sourceItem.length), sourceItem)
				: __cloneStrictDeep(target[index] = {}, sourceItem);
		}
		else {
			target[index] = sourceItem;
		}
	}
}

export function __cloneStrictDeep(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let keyIndex = 0; keyIndex < keyConut; keyIndex++) {
		const key = keys[keyIndex];
		const sourceProp = source[key];

		if (typeof sourceProp === 'object' && sourceProp !== null) {
			Array.isArray(sourceProp)
				? __cloneStrictDeep_array(target[key] = new Array(sourceProp.length), sourceProp)
				: __cloneStrictDeep(target[key] = {}, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object.
 * Note: This is strict version which will fill all empty items in arrays with
 * the "undefined" value.
 * @param source The object to be cloned.
 * @returns An object clone or "null" if the "source" was not an "object".
 */
export function cloneStrictDeep(source: AnyArray | AnyObject): AnyArray | AnyObject | null {
	if (source !== null && typeof source === 'object') {
		const isArray = Array.isArray(source);
		const copy = isArray ? new Array(source.length) : {};

		isArray
			? __cloneStrictDeep_array(<AnyArray>copy, source)
			: __cloneStrictDeep(copy, source);

		return copy;
	}

	return null;
}
