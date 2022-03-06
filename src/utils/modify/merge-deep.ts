function _mergeOneArrayDeep(target: any[], source: any[]): void {
	const commonLength = Math.min(target.length, source.length);
	const sourceLength = source.length;
	let index = 0;

	for (; index < commonLength; index++) {
		const targetItem = target[index];
		const sourceItem = source[index];

		if (Array.isArray(targetItem) && Array.isArray(sourceItem)) {
			_mergeOneArrayDeep(targetItem, sourceItem);
		}
		else if (typeof targetItem === 'object' && targetItem !== null && typeof sourceItem === 'object' && sourceItem !== null) {
			_mergeOneDeep(targetItem, sourceItem);
		}
		else if (source[index] !== undefined) {
			target[index] = source[index];
		}
	}

	for (; index < sourceLength; index++) {
		target[index] = source[index];
	}
}

function _mergeOneDeep(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;

	for (let index = 0; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (Array.isArray(targetProp) && Array.isArray(sourceProp)) {
				_mergeOneArrayDeep(targetProp, sourceProp);
			}
			else if (typeof targetProp === 'object' && targetProp !== null && typeof sourceProp === 'object' && sourceProp !== null) {
				_mergeOneDeep(targetProp, sourceProp);
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
 * modified target object.
 * @param target The object to which merge the properties.
 * @param sources The objects providing source properties.
 * @returns The modified target object.
 */
export function mergeDeep(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (typeof target === 'object' && target !== null) {
		const sourceCount = sources.length;

		for (let index = 0; index < sourceCount; index++) {
			const source = sources[index];

			if (Array.isArray(target) && Array.isArray(source)) {
				_mergeOneArrayDeep(target, source);
			}
			else if (typeof source === 'object' && source !== null) {
				_mergeOneDeep(target, source);
			}
		}
	}

	return target;
}
