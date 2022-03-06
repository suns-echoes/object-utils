function _mergeOneStrictDeep(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;

	for (let index = 0; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (typeof targetProp === 'object' && targetProp !== null && !Array.isArray(targetProp)
				&& typeof sourceProp === 'object' && sourceProp !== null && !Array.isArray(sourceProp)
			) {
				_mergeOneStrictDeep(targetProp, sourceProp);
			}
			else if (source[key] !== undefined) {
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
 * objects to the target object but does not overwrite existing values when
 * source property has the "undefined" value assigned to it. It returns the
 * modified target object. This is strict version which compares arrays by
 * references and not by item values.
 * @param target The object to which merge the properties.
 * @param sources The objects providing source properties.
 * @returns The modified target object.
 */
export function mergeStrictDeep(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (typeof target === 'object' && target !== null && !Array.isArray(target)) {
		const sourceCount = sources.length;

		for (let index = 0; index < sourceCount; index++) {
			const source = sources[index];

			if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
				_mergeOneStrictDeep(target, source);
			}
		}
	}

	return target;
}
