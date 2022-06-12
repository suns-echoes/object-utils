export function __cloneDeep(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let keyIndex = 0; keyIndex < keyConut; keyIndex++) {
		const key = keys[keyIndex];
		const sourceProp = source[key];

		if (sourceProp !== null && typeof sourceProp === 'object') {
			const isArray = Array.isArray(sourceProp);
			const copy = isArray ? new Array(sourceProp.length).fill(undefined) : {};

			__cloneDeep(target[key] = copy, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


/**
 * Creates deep clone of source object.
 * @param source The object to be cloned.
 * @returns Returns an object containing the "source" clone or "null" if
 * "source" is not an object.
 */
export function cloneDeep<T extends AnyArray | AnyObject>(source: T): T | null {
	if (source !== null && typeof source === 'object') {
		const isArray = Array.isArray(source);
		const copy = <T>(isArray ? new Array(source.length).fill(undefined) : {});

		__cloneDeep(copy, source);

		return copy;
	}

	return null;
}
