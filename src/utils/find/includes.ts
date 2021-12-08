export function includes(object: AnyObject, searchElement: any): boolean {
	const keys = Object.keys(object);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		if (object[keys[index]] === searchElement) {
			return true;
		}
	}

	return false;
}
