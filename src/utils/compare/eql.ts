function _eqlArray(a: any[], b: any[]): boolean {
	const length = a.length;

	if (length !== b.length) {
		return false;
	}

	for (let index = 0; index < length; index++) {
		if (index in a && index in b) {
			if (a[index] !== b[index]) {
				return false;
			}
		}
		else if (!(index in a) && index in b || index in a && !(index in b)) {
			return false;
		}
	}

	return true;
}

function _eql(a: AnyObject, b: AnyObject): boolean {
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
 * Performs shallow equality check of two objects.
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns The "true" if objects are equal, "false" otherwise.
 */
export function eql(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (Array.isArray(a) && Array.isArray(b)) {
		return _eqlArray(a, b);
	}
	else if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
		return _eql(a, b);
	}

	return false;
}
