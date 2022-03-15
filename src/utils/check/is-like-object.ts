/**
 * Checks if entity is like object.
 * @param entity The entity to check.
 * @returns The "true" if entity is type or instance of Object, "false" otherwise.
 */
export function isLikeObject(entity: any): boolean {
	return entity instanceof Object || entity !== null && typeof entity === 'object';
}
