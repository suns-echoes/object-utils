export function isLikeObject(value: any): boolean {
	return value instanceof Object || typeof value === 'object' && value !== null;
}
