/**
 * Checks if value is like object.
 * @param value The value to check.
 * @returns The "true" if value is type or instance of Object, "false" otherwise.
 */
export function isLikeObject(value: any): boolean {
	return value instanceof Object || typeof value === 'object' && value !== null;
}
