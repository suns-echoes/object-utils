function _assignStrictOneDeep(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;
	let index = 0;

	for (; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (typeof targetProp === 'object' && targetProp !== null && !Array.isArray(targetProp) &&
				typeof sourceProp === 'object' && sourceProp !== null && !Array.isArray(sourceProp)
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

export function assignStrictDeep(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (typeof target === 'object' && target !== null && !Array.isArray(target)) {
		const sourceCount = sources.length;
		let index = 0;

		for (; index < sourceCount; index++) {
			const source = sources[index];

			if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
				_assignStrictOneDeep(target, source);
			}
		}
	}

	return target;
}
