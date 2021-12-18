function _cloneStrictDeep(target: AnyObject, source: AnyObject): void {
	const keys = Object.keys(source);
	const keyConut = keys.length;

	for (let index = 0; index < keyConut; index++) {
		const key = keys[index];
		const sourceProp = source[key];

		if (typeof sourceProp === 'object' && sourceProp !== null && !Array.isArray(sourceProp)) {
			_cloneStrictDeep(target[key] = {}, sourceProp);
		}
		else {
			target[key] = sourceProp;
		}
	}
}


export function cloneStrictDeep(source: AnyObject): AnyObject {
	const copy: AnyObject = {};

	if (typeof source === 'object' && source !== null && !Array.isArray(source)) {
		_cloneStrictDeep(copy, source);
	}

	return copy;
}
