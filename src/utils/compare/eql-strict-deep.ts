function _eqlStrictDeep(a: AnyObject, b: AnyObject): boolean {
	const keys = Object.keys(a);

	if (keys.length !== Object.keys(b).length) {
		return false;
	}

	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (key in b) {
			const aProp = a[key];
			const bProp = b[key];
			let isSame = false;

			if (aProp !== null && typeof aProp === 'object' && !Array.isArray(aProp)
				&& bProp !== null && typeof bProp === 'object' && !Array.isArray(bProp)) {
				isSame = _eqlStrictDeep(aProp, bProp);
			}

			if (!isSame && aProp !== bProp) {
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
 * Performs deep equality check of two objects. This is strict version which
 * compares arrays by references and not by item values.
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns The "true" if objects are equal, "false" otherwise.
 */
export function eqlStrictDeep(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (a !== null && typeof a === 'object' && !Array.isArray(a)
		&& b !== null && typeof b === 'object' && !Array.isArray(b)) {
		return _eqlStrictDeep(a, b);
	}

	return false;
}
