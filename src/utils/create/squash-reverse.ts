/**
 * Creates squashed copy of "source" object and its prototypes. Squash will be
 * performed from "source" object to oldest prototype.
 * @param source The source object.
 * @returns A copy of "source" with squashed prototypes or null for non-object
 * input.
 */
export function squashReverse(source: AnyObject): AnyObject | null {
	if (typeof source === 'object' && source !== null) {
		const prototypes = [];
		let prototype = source;

		while (prototype = Object.getPrototypeOf(prototype), prototype) {
			prototypes.push(prototype);
		}

		return Object.assign({}, source, ...prototypes);
	}

	return null;
}
