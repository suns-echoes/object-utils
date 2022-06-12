/**
 * Checks if object has cyclic references.
 * @param entity The object like entity to test (i.e.: array, object, function).
 * @returns Returns "true" if "entity" has a cyclic reference or "false"
 * otherwise.
 */
export function isCyclic(entity: ObjectLike, __beenThere: WeakSet<ObjectLike> = new WeakSet().add(entity)): boolean {
	const keys = (<(string | symbol)[]>Object.keys(entity)).concat(Object.getOwnPropertySymbols(entity));
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const property = entity[keys[index]];

		if (property instanceof Object) {
			return __beenThere.has(property)
				? true
				: isCyclic(property, __beenThere.add(property));
		}
	}

	return false;
}
