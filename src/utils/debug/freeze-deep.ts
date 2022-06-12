/**
 * Deeply freezes the target object.
 * @param target The object to freeze.
 */
export function freezeDeep(target: AnyArray | AnyObject): void {
	if (Array.isArray(target)) {
		const itemCount = target.length;

		for (let index = 0; index < itemCount; index++) {
			const item = target[index];

			if (item !== null && typeof item === 'object') {
				freezeDeep(item);
			}
		}
	}
	else {
		const keys = Object.keys(target);
		const keyCount = keys.length;

		for (let index = 0; index < keyCount; index++) {
			const key = keys[index];
			const prop = target[key];

			if (prop !== null && typeof prop === 'object') {
				freezeDeep(prop);
			}
		}
	}

	Object.freeze(target);
}
