export function filter<T extends AnyObject>(
	source: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => boolean,
): AnyObject {
	const copy: AnyObject = {};
	const keys = Object.keys(source);
	const keyCount = keys.length;
	let index = 0;

	for (; index < keyCount; index++) {
		const key = keys[index];

		if (callback(source[key], key, source)) {
			copy[key] = source[key];
		}
	}

	return copy;
}
