function _assignStrictOneDeep(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;

	for (let index = 0; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (targetProp !== null && typeof targetProp === 'object' && !Array.isArray(targetProp)
				&& sourceProp !== null && typeof sourceProp === 'object' && !Array.isArray(sourceProp)
			) {
				_assignStrictOneDeep(targetProp, sourceProp);
			}
			else {
				target[key] = source[key];
			}
		}
		else {
			target[key] = source[key];
		}
	}
}

/**
 * Performs deep copy of all enumerable own properties from one or more source
 * objects to the target object. It returns the modified target object. This is
 * strict version which compares arrays by references and not by item values.
 * @param target The object to which assing the properties.
 * @param sources The objects providing source properties.
 * @returns The modified target object.
 */
export function assignStrictDeep(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (target !== null && typeof target === 'object' && !Array.isArray(target)) {
		const sourceCount = sources.length;

		for (let index = 0; index < sourceCount; index++) {
			const source = sources[index];

			if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
				_assignStrictOneDeep(target, source);
			}
		}
	}

	return target;
}
