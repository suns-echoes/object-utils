function __mergeOneDeepEx(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;

	for (let index = 0; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (targetProp !== null && sourceProp !== null
				&& typeof targetProp === 'object' && typeof sourceProp === 'object'
				&& !Array.isArray(targetProp) && !Array.isArray(sourceProp)
			) {
				__mergeOneDeepEx(targetProp, sourceProp);

				continue;
			}
		}

		if (source[key] !== undefined) {
			target[key] = source[key];
		}
	}
}


/**
 * Performs deep copy of all enumerable own properties and sub-properties from
 * one or more source objects to the target object, but does not overwrite
 * existing values when property from the source has the "undefined" value
 * assigned to it.
 * Generic objects and arrays will overwrite each other. Arrays will not be
 * traversed but will be assigned by reference.
 * It returns the modified target object.
 * @param target The object to which merge the source objects.
 * @param sources The objects providing source for merge.
 * @returns The modified target object.
 */
export function mergeDeepEx(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (target !== null && typeof target === 'object' && !Array.isArray(target)) {
		const sourceCount = sources.length;

		for (let index = 0; index < sourceCount; index++) {
			const source = sources[index];

			if (source !== null && typeof source === 'object' && !Array.isArray(source)) {
				__mergeOneDeepEx(target, source);
			}
		}
	}

	return target;
}
