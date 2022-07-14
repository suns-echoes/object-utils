export function __cloneDeepStrict_array(target: AnyArray, source: AnyArray): void {
	const length = source.length;

	for (let index = 0; index < length; index++) {
		const sourceItem = source[index];

		if (Array.isArray(sourceItem)) {
			__cloneDeepStrict_array(target[index] = new Array(sourceItem.length), sourceItem);
		}
		else if (sourceItem !== null && typeof sourceItem === 'object') {
			__cloneDeepStrict_object(target[index] = {}, sourceItem);
		}
		else {
			target[index] = sourceItem;
		}
	}
}

export function __cloneDeepStrict_object(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let keyIndex = 0; keyIndex < keyConut; keyIndex++) {
		const key = keys[keyIndex];
		const sourceProp = source[key];

		if (Array.isArray(sourceProp)) {
			__cloneDeepStrict_array(target[key] = new Array(sourceProp.length), sourceProp);
		}
		else if (sourceProp !== null && typeof sourceProp === 'object') {
			__cloneDeepStrict_object(target[key] = {}, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of the source object.
 * Only iterable items will be copied from arrays.
 * @param source The object to be cloned.
 * @returns Returns a new object containing the cloned source object or "null"
 * if the source is not an object.
 */
export function cloneDeepStrict<T extends AnyObject | AnyArray>(source: T): T | null {
	if (Array.isArray(source)) {
		const copy = <T & AnyArray>(new Array(source.length));

		__cloneDeepStrict_array(copy, source);

		return copy;
	}
	else if (source !== null && typeof source === 'object') {
		const copy = <T>{};

		__cloneDeepStrict_object(copy, source);

		return copy;
	}

	return null;
}
