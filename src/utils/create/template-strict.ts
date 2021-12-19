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

export function templateStrict(source: AnyArray | AnyObject): AnyArray | AnyObject | null {
	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		const templateObject = {};

		_templateStrict(templateObject, source);

		return templateObject;
	}

	return null;
}
