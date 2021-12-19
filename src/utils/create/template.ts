function _templateArray(target: AnyArray, source: AnyArray): void {
	const itemCount = source.length;

	for (let index = 0; index < itemCount; index++) {
		const item = source[index];

		if (Array.isArray(item)) {
			target[index] = new Array(item.length);
			_templateArray(target[index], item);
		}
		else if (typeof item === 'object' && item !== null) {
			target[index] = {};
			_templateObject(target[index], item);
		}
	}
}

function _templateObject(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (Array.isArray(prop)) {
			target[key] = new Array(prop.length);
			_templateArray(target[key], prop);
		}
		else if (typeof prop === 'object' && prop !== null) {
			target[key] = {};
			_templateObject(target[key], prop);
		}
	}
}

export function template(source: AnyArray | AnyObject): AnyArray | AnyObject | null {
	if (Array.isArray(source)) {
		const templateArray = new Array(source.length);

		_templateArray(templateArray, source);

		return templateArray;
	}
	else if (typeof source === 'object' && source !== null) {
		const templateObject = {};

		_templateObject(templateObject, source);

		return templateObject;
	}

	return null;
}
