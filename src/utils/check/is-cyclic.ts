type SymbolIndexableObject = Record<string | symbol, any>;

function _isCyclic(object: SymbolIndexableObject, beenThere: WeakSet<SymbolIndexableObject>): boolean {
	const keys = (<(string | symbol)[]>Object.keys(object)).concat(Object.getOwnPropertySymbols(object));
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const subo = object[keys[index]];

		if (subo instanceof Object) {
			if (beenThere.has(subo)) {
				return true;
			}

			return _isCyclic(subo, beenThere.add(subo));
		}
	}

	return false;
}

/**
 * Checks if object has cyclic references.
 * @param o The object to check for cyclic references.
 * @returns The "true" if has cyclic references, "false" otherwise.
 */
export function isCyclic(o: object): boolean {
	return _isCyclic(o, new WeakSet().add(o));
}
