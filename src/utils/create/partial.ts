export function partial<T extends AnyObject>(
	source: T,
	keys: string[],
): AnyObject {
	const copy: AnyObject = {};
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;
	let index = 0;

	for (; index < sourceKeyCount; index++) {
		const sourceKey = sourceKeys[index];

		if (keys.includes(sourceKey)) {
			copy[sourceKey] = source[sourceKey];
		}
	}

	return copy;
}
