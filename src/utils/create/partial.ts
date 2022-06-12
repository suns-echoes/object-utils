/**
 * Creates new object with selected keys from "source" object.
 * @param source The source object.
 * @param keys The list of keys to copy.
 * @returns Returns a new object with copy of selected keys from the "source" or
 * "null" if "source" is not an object.
 */
export function partial<T extends AnyObject>(
	source: T,
	keys: string[],
): AnyObject | null {
	if (source !== null && typeof source === 'object' && Array.isArray(keys)) {
		const copy: AnyObject = {};
		const sourceKeys = Object.keys(source);
		const sourceKeyCount = sourceKeys.length;

		for (let index = 0; index < sourceKeyCount; index++) {
			const sourceKey = sourceKeys[index];

			if (keys.includes(sourceKey)) {
				copy[sourceKey] = source[sourceKey];
			}
		}

		return copy;
	}

	return null;
}
