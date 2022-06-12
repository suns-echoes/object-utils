function __templateEx(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (prop !== null && typeof prop === 'object' && !Array.isArray(prop)) {
			__templateEx(target[key] = {}, prop);
		}
	}
}


/**
 * Creates new object without properties other than sub-objects based on the
 * "source" object structure but exclude arrays.
 * @param source The object from which to create template.
 * @returns Returns a new object with structure based on the "source" or "null" if
 * "source" is not an object.
 */
export function templateEx(source: AnyObject): AnyObject | null {
	if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
		const templateObject = {};

		__templateEx(templateObject, source);

		return templateObject;
	}

	return null;
}
