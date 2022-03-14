export function __cloneDeep_array(target: AnyArray, source: AnyArray, preserveSparseArrays: boolean): void {
	const length = source.length;

	for (let index = 0; index < length; index++) {
		const sourceItem = source[index];

		if (sourceItem !== null && typeof sourceItem === 'object') {
			Array.isArray(sourceItem)
				? __cloneDeep_array(target[index] = new Array(sourceItem.length), sourceItem, preserveSparseArrays)
				: __cloneDeep(target[index] = {}, sourceItem, preserveSparseArrays);
		}
		else if (index in source || !preserveSparseArrays) {
			target[index] = sourceItem;
		}
	}
}

export function __cloneDeep(target: AnyObject, source: AnyObject, preserveSparseArrays: boolean): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let keyIndex = 0; keyIndex < keyConut; keyIndex++) {
		const key = keys[keyIndex];
		const sourceProp = source[key];

		if (sourceProp !== null && typeof sourceProp === 'object') {
			Array.isArray(sourceProp)
				? __cloneDeep_array(target[key] = new Array(sourceProp.length), sourceProp, preserveSparseArrays)
				: __cloneDeep(target[key] = {}, sourceProp, preserveSparseArrays);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object.
 * @param source The object to be cloned.
 * @param preserveSparseArrays The boolean value specifying how to treat sparse
 * arrays. This value is set to "false" by default and will replace "empty"
 * items with the "undefined" value. Set to "true" to preserve "empty" items.
 * @returns An object clone or "null" if the "source" was not type of "object".
 */
export function cloneDeep<T extends ObjectLike>(source: T, preserveSparseArrays = false): T | null {
	if (source !== null && typeof source === 'object') {
		const isArray = Array.isArray(source);
		const copy = <T>(isArray ? new Array(source.length) : {});

		isArray
			? __cloneDeep_array(<AnyArray><unknown>copy, source, preserveSparseArrays)
			: __cloneDeep(copy, source, preserveSparseArrays);

		return copy;
	}

	return null;
}
