export function every(object: AnyObject, callbackFn: ObjectPropertyCallbackFn): boolean {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];

		if (!callbackFn(object[key], key, object)) {
			return false;
		}
	}

	return true;
}
