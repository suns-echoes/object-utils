type KVIterable = Iterable<[key: string, value: any] | (string | number)[]> | (string | number)[][];


/**
 * Creates a new object with properties matching the given key-value iterable.
 * @param kv The key-value array.
 * @returns A new object.
 */
export function fromKV(kv: KVIterable): AnyObject {
	if (kv && typeof kv[Symbol.iterator] === 'function') {
		const object: AnyObject = {};
		const iterator = kv[Symbol.iterator]();
		let { done, value } = iterator.next();

		while (!done) {
			object[value[0]] = value[1];
			({ done, value } = iterator.next());
		}

		return object;
	}

	return {};
}
