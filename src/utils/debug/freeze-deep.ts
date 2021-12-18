export function freezeDeep(target: AnyArray | AnyObject): void {
	let index = 0;

	if (Array.isArray(target)) {
		const itemCount = target.length;

		for (; index < itemCount; index++) {
			const item = target[index];

			if (typeof item === 'object' && item !== null) {
				freezeDeep(item);
			}
		}
	}
	else {
		const keys = Object.keys(target);
		const keyCount = keys.length;

		for (; index < keyCount; index++) {
			const key = keys[index];
			const prop = target[key];

			if (typeof prop === 'object' && prop !== null) {
				freezeDeep(prop);
			}
		}
	}

	Object.freeze(target);
}
