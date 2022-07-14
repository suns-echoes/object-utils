/**
 * Creates a new nested object with sub-keys matching the given path with
 * optional value at the deepest level.
 * @param path The string with sub-keys separated by delimiter or the array with
 * consecutive sub-keys.
 * @param delimiter Optional, used to specify which character is used as
 * separator if the path is delimited string.
 * @returns Returns a new object.
 */
export function fromPath(path: KeyPath | PathKeys, value?: any, delimiter = '.'): AnyObject {
	if (!path || path.length === 0 || path.length === 1 && path[0] === '') {
		return {};
	}

	const keyPath = typeof path === 'string' ? path.split(delimiter) : path;
	const depth = keyPath.length;
	const root: AnyObject = {};
	let head = root;
	let level = 0;

	for (; level < depth - 1; level++) {
		head = head[keyPath[level]] = {};
	}

	head[keyPath[level]] = value;

	return root;
}
