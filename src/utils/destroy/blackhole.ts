export function _blackhole(matter: any, gone: WeakSet<AnyObject>): void {
	if (Array.isArray(matter) && matter.length > 0) {
		const itemCount = matter.length;
		let index = 0;

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

	const keys = (<(ObjectKey | symbol)[]>Object.keys(matter)).concat(Object.getOwnPropertySymbols(matter));
	const keyCount = keys.length;
	let index = 0;

	for (; index < keyCount; index++) {
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
