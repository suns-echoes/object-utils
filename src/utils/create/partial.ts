export function partial<T extends AnyObject>(
	source: T,
	keys: string[],
): AnyObject {
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
