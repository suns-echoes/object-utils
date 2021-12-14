/**
 *
 * @param items
 *     1. ('key1', value1, ...)
 *     2. (['key1', value1, ...], ...)
 *     4. ({ 'key1': value1, ... }, ...)
 */
export function of(...items: (AnyArray | AnyObject | string | any)[]): AnyObject {
	const itemCount = items.length;
	let itemIndex = 0;
	let object: AnyObject = {};

	for (; itemIndex < itemCount; itemIndex++) {
		const item = items[itemIndex];

		if (typeof item === 'string') {
			object[item] = items[++itemIndex];
		}
		else if (Array.isArray(item)) {
			const subitemCount = item.length;
			let subitemIndex = 0;

			for (; subitemIndex < subitemCount; subitemIndex++) {
				object[item[subitemIndex]] = item[++subitemIndex];
			}
		}
		else if (typeof item === 'object') {
			object = { ...object, ...item };
		}
	}

	return object;
}
