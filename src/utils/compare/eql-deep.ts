export function __eqlDeep(a: AnyObject, b: AnyObject): boolean {
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
				&& __eqlDeep(aProp, bProp)
			) {
				continue;
			}
		}

		return false;
	}

	return true;
}

/**
 * Performs deep equality check of two entities.
 * Arrays will be traversed by own enumerable properties rather than iterable
 * items.
 * @param a The first entity.
 * @param b The second entity.
 * @returns Returns "true" if entities are equal or "false" otherwise.
 */
export function eqlDeep(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (
		a !== null && b !== null
		&& typeof a === 'object' && typeof b === 'object'
	) {
		return __eqlDeep(a, b);
	}

	return false;
}
