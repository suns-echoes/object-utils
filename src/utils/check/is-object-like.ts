/**
 * Checks if entity is like object.
 * @param entity The entity to check.
 * @returns Returns "true" if "entity" is type or instance of object or "false"
 * otherwise.
 */
export function isObjectLike(entity: any): boolean {
	return entity !== null && typeof entity === 'object' || entity instanceof Object;
}
