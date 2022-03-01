/**
 * Creates new object from list of:
 *   * arrays with key/value pairs (i.e.: ['key1', value1, 'key2', value2, ...])
 *   * objects
 *   * key/value pairs (i.e.: 'key1', value1, 'key2', value2, ...)
 * @param items The list of items form which new object will be created.
 * Example:
 * ('key1', value1, ['key2', value2, ...], { 'key3': value3, ... }, ...)
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
