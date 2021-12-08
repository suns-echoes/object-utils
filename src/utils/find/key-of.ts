export function keyOf(object: AnyObject, searchElement: any): string | undefined {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		if (object[keys[index]] === searchElement) {
			return keys[index];
		}
	}

	return undefined;
}
