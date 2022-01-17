function _eqlArrayDeep(a: any[], b: any[]): boolean {
	const length = a.length;

	if (length !== b.length) {
		return false;
	}

	for (let index = 0; index < length; index++) {
		if (index in a && index in b) {
			const aItem = a[index];
			const bItem = b[index];
			let isSame = false;

			if (Array.isArray(aItem) && Array.isArray(bItem)) {
				isSame = _eqlArrayDeep(aItem, bItem);
			}
			else if (typeof aItem === 'object' && aItem !== null && typeof bItem === 'object' && bItem !== null) {
				isSame = _eqlDeep(aItem, bItem);
			}

			if (!isSame && aItem !== bItem) {
				return false;
			}
		}
		else if (!(index in a) && index in b || index in a && !(index in b)) {
			return false;
		}
	}

	return true;
}

function _eqlDeep(a: AnyObject, b: AnyObject): boolean {
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

			if (Array.isArray(aProp) && Array.isArray(bProp)) {
				isSame = _eqlArrayDeep(aProp, bProp);
			}
			else if (typeof aProp === 'object' && aProp !== null && typeof bProp === 'object' && bProp !== null) {
				isSame = _eqlDeep(aProp, bProp);
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
 * Performs deep equality check of two objects.
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns The "true" if objects are equal, "false" otherwise.
 */
export function eqlDeep(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}
	else if (Array.isArray(a) && Array.isArray(b)) {
		return _eqlArrayDeep(a, b);
	}
	else if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
		return _eqlDeep(a, b);
	}

	return false;
}
