/**
 * Creates squashed copy of "source" object and its prototypes. Squash will be
 * performed from "source" object to oldest prototype.
 * @param source The source object.
 * @returns Returns a copy of the "source" with squashed prototypes or "null" if
 * "source" is not an object.
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
