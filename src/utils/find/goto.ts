export function goto(origin: AnyObject, path?: KeyPath | PathKeys, delimiter = '.'): any {
	if (!path || path.length === 0 || path.length === 1 && path[0] === '') {
		return origin;
	}

	const keyPath = typeof path === 'string' ? path.split(delimiter) : path;
	const depth = keyPath.length;
	let level = 0;
	let target = origin;

	for (; level < depth; level++) {
		const key = keyPath[level];

		if (typeof target !== 'object' || target === null || !(key in target)) {
			return undefined;
		}

		target = target[key];
	}

	return target;
}
