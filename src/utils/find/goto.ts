/**
 * Returns the property with given "path".
 * @param origin The object from which start the trip.
 * @param path The delimited string or array of strings representing the path of
 * the target property.
 * @param delimiter Optional, use to specify which character is used as
 * separator if the "path" is delimited string.
 * @returns Returns the target property or "undefined" if path does not exist.
 */
export function goto(origin: AnyObject, path?: KeyPath | PathKeys, delimiter = '.'): any {
	if (!path || path.length === 0 || path.length === 1 && path[0] === '') {
		return origin;
	}

	const keyPath = typeof path === 'string' ? path.split(delimiter) : path;
	const depth = keyPath.length;
	let target = origin;

	for (let level = 0; level < depth; level++) {
		const key = keyPath[level];

		if (target === null || typeof target !== 'object' || !(key in target)) {
			return undefined;
		}

		target = target[key];
	}

	return target;
}
