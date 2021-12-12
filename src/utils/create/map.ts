export function map<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => any,
): AnyObject {
	const copy: AnyObject = {};
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		copy[key] = callback(object[key], key, object);
	}

	return copy;
}
