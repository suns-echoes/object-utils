export function __eql(a: AnyObject, b: AnyObject): boolean {
	const keys = Object.keys(a);

	if (keys.length !== Object.keys(b).length) {
		return false;
	}

	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (key in b) {
			if (a[key] !== b[key]) {
				return false;
			}
		}
		else {
			return false;
		}
	}

	return true;
}

/**
 * Performs shallow equality check of two entities.
 * Arrays will be compared as if they were generic objects so type difference
 * (array vs object) will be ignored.
 * @param a The first entity.
 * @param b The second entity.
 * @returns Returns "true" if entities are equal or "false" otherwise.
 */
export function eql(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
		return __eql(a, b);
	}

	return false;
}
