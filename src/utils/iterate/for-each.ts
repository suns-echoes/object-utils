export function forEach<T extends AnyObject>(
	object: T,
	callback: (prop: T[keyof T], key: keyof T, object: T) => void,
): void {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		callback(object[key], key, object);
	}
}
