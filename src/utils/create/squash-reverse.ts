/**
 * Creates squashed copy of the source object and its prototypes. Squash will be
 * performed from the source object to the oldest prototype.
 * @param source The source object.
 * @returns Returns a copy of the source object with squashed prototypes or
 * "null" if the source is not an object.
 */
export function squashReverse(source: AnyObject): AnyObject | null {
	if (source !== null && typeof source === 'object') {
		const prototypes = [];
		let prototype = source;

		while (prototype = Object.getPrototypeOf(prototype), prototype) {
			prototypes.push(prototype);
		}

		return Object.assign({}, source, ...prototypes);
	}

	return null;
}
