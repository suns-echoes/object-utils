function __assignOneDeep(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;

	for (let index = 0; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (targetProp !== null && sourceProp !== null
				&& typeof targetProp === 'object' && typeof sourceProp === 'object'
			) {
				__assignOneDeep(targetProp, sourceProp);

				continue;
			}
		}

		target[key] = source[key];
	}
}


/**
 * Performs deep copy of all enumerable own properties and sub-properties from
 * one or more "source" objects to the "target" object overwriting original
 * values.
 * It returns the modified target object.
 * @param target The object to which assign the "sources".
 * @param sources The objects providing source for assign.
 * @returns The modified "target" object.
 */
export function assignDeep(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (target !== null && typeof target === 'object') {
		const sourceCount = sources.length;

		for (let index = 0; index < sourceCount; index++) {
			const source = sources[index];

			if (source !== null && typeof source === 'object') {
				__assignOneDeep(target, source);
			}
		}
	}

	return target;
}
