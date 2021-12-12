type KVIterable = Iterable<[key: string, value: any] | (string | number)[]> | (string | number)[][];

/**
 * Create new object with properties from iterable values (key / value).
 */
export function fromKV(kv: KVIterable): AnyObject {
	const object: AnyObject = {};
	const iterator = kv[Symbol.iterator]();
	let { done, value } = iterator.next();

	while (!done) {
		object[value[0]] = value[1];
		({ done, value } = iterator.next());
	}

	return object;
}
