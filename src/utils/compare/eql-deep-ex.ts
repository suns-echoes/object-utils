function __eqlDeepEx(a: AnyObject, b: AnyObject): boolean {
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

			if (aProp === bProp) {
				continue;
			}

			if (aProp !== null && bProp !== null
				&& typeof aProp === 'object' && typeof bProp === 'object'
				&& !Array.isArray(aProp) && !Array.isArray(bProp)
				&& __eqlDeepEx(aProp, bProp)
			) {
				continue;
			}
		}

		return false;
	}

	return true;
}


/**
 * Performs deep equality check of two objects.
 * Arrays will be compared by reference (not by item values).
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns Returns "true" if entities are equal or "false" otherwise.
 */
export function eqlDeepEx(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (a !== null && b !== null
		&& typeof a === 'object' && typeof b === 'object'
		&& !Array.isArray(a) && !Array.isArray(b)
	) {
		return __eqlDeepEx(a, b);
	}

	return false;
}
