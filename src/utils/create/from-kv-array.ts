type KVArray = [key: string, value?: any][] | (string | number)[][];

export function fromKVArray(kv: KVArray): AnyObject {
	const object: AnyObject = {};
	const count = kv.length;

	for (let index = 0; index < count; index++) {
		const [key, value] = kv[index];

		object[key] = value;
	}

	return object;
}
