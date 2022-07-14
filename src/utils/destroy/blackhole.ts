function __blackhole(matter: any, gone: WeakSet<AnyObject>): void {
	if (Array.isArray(matter) && matter.length > 0) {
		const itemCount = matter.length;

		for (let index = 0; index < itemCount; index++) {
			const element = matter[index];

			if (element instanceof Object || element !== null && typeof element === 'object') {
				if (!gone.has(element)) {
					__blackhole(element, gone.add(element));
				}
			}
		}

		matter.length = 0;
	}

	const keys = (<(string | symbol)[]>Object.keys(matter)).concat(Object.getOwnPropertySymbols(matter));
	const keyCount = keys.length;

	for (let index = 0; index < keyCount; index++) {
		const key = keys[index];
		const element = matter[key];

		if (element instanceof Object || element !== null && typeof element === 'object') {
			if (!gone.has(element)) {
				__blackhole(element, gone.add(element));
			}
		}

		matter[key] = undefined;
	}
}


/**
 * Breaks all references and set all properties to undefined.
 * This method is circular reference safe.
 * @param matter Value to be deeply dereferenced.
 */
export function blackhole(matter: any): void {
	if (matter instanceof Object || matter !== null && typeof matter === 'object') {
		__blackhole(matter, new WeakSet().add(matter));
	}
}
