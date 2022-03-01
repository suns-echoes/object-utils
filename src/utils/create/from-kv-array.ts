type KVArray = [key: string, value?: any][] | (string | number)[][];


/**
 * Creates a new object with properties matching the given key-value array.
 * @param kv The key-value array.
 * @returns A new object.
 */
export function fromKVArray(kv: KVArray): AnyObject {
	if (Array.isArray(kv)) {
		const object: AnyObject = {};
		const count = kv.length;

		for (let index = 0; index < count; index++) {
			const [key, value] = kv[index];

			object[key] = value;
		}

		return object;
	}

	return {};
}
