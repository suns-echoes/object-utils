function _templateStrict(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (typeof prop === 'object' && prop !== null && !Array.isArray(prop)) {
			target[key] = {};
			_templateStrict(target[key], prop);
		}
	}
}


/**
 * Creates new object without properties other than sub-objects based on
 * "source" object structure. This is strict version which compares arrays by
 * references and not by item values.
 * @param source The object used as template.
 * @returns A new object with structure based on template.
 */
export function templateStrict(source: AnyObject): AnyObject | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const templateObject = {};

		_templateStrict(templateObject, source);

		return templateObject;
	}

	return null;
}
