function _isCyclic(entity: ObjectLike, beenThere: WeakSet<ObjectLike>): boolean {
	const keys = (<(string | symbol)[]>Object.keys(entity)).concat(Object.getOwnPropertySymbols(entity));
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const property = entity[keys[index]];

		if (property instanceof Object) {
			if (beenThere.has(property)) {
				return true;
			}

			return _isCyclic(property, beenThere.add(property));
		}
	}

	return false;
}


/**
 * Checks if object has cyclic references.
 * @param entity The object to check for cyclic references.
 * @returns The "true" if has cyclic references, "false" otherwise.
 */
export function isCyclic(entity: ObjectLike): boolean {
	return _isCyclic(entity, new WeakSet().add(entity));
}
