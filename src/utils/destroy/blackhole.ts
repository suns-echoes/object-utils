function _blackhole(matter: any, gone: WeakSet<AnyObject>): void {
	let index = 0;

	if (Array.isArray(matter) && matter.length > 0) {
		const itemCount = matter.length;

		for (; index < itemCount; index++) {
			const element = matter[index];

			if (element instanceof Object || typeof element === 'object' && element !== null) {
				if (!gone.has(element)) {
					_blackhole(element, gone.add(element));
				}
			}
		}

		matter.length = 0;
	}

	const keys = (<(string | symbol)[]>Object.keys(matter)).concat(Object.getOwnPropertySymbols(matter));
	const keyCount = keys.length;

	for (index = 0; index < keyCount; index++) {
		const key = keys[index];
		const element = matter[key];

		if (element instanceof Object || typeof element === 'object' && element !== null) {
			if (!gone.has(element)) {
				_blackhole(element, gone.add(element));
			}
		}

		matter[key] = undefined;
	}
}

export function blackhole(matter: any): void {
	if (matter instanceof Object || typeof matter === 'object' && matter !== null) {
		_blackhole(matter, new WeakSet().add(matter));
	}
}
