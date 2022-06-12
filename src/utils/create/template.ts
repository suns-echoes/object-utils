function __template_array(target: AnyArray, source: AnyArray): void {
	const itemCount = source.length;

	for (let index = 0; index < itemCount; index++) {
		const item = source[index];

		if (Array.isArray(item)) {
			__template_array(target[index] = new Array(item.length), item);
		}
		else if (item !== null && typeof item === 'object') {
			__template_object(target[index] = {}, item);
		}
	}
}

function __template_object(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const prop = source[key];

		if (Array.isArray(prop)) {
			__template_array(target[key] = new Array(prop.length), prop);
		}
		else if (prop !== null && typeof prop === 'object') {
			__template_object(target[key] = {}, prop);
		}
	}
}


/**
 * Creates new object without properties other than sub-objects based on the
 * "source" object structure.
 * @param source The object from which to create template.
 * @returns Returns a new object with structure based on the "source" or "null" if
 * "source" is not an object.
 */
export function template(source: AnyArray | AnyObject): AnyArray | AnyObject | null {
	if (Array.isArray(source)) {
		const templateArray = new Array(source.length);

		__template_array(templateArray, source);

		return templateArray;
	}
	else if (source !== null && typeof source === 'object') {
		const templateObject = {};

		__template_object(templateObject, source);

		return templateObject;
	}

	return null;
}
