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
