function* __getOwnPropertyIteratorDeepStrict_array(
	array: AnyArray, delimiter: string | undefined, path: string | string[], usePathArray: boolean,
): IterableIterator<[string | string[], any]> {
	const length = array.length;

	for (let index = 0; index < length; index++) {
		const item = array[index];
		const subPath = usePathArray
			? [...path, index.toString(10)]
			: `${path === ''
				? ''
				: `${path}.`}${index.toString(10)}`;

		if (item !== null && typeof item === 'object') {
			const sub = Array.isArray(item)
				? __getOwnPropertyIteratorDeepStrict_array(item, delimiter, subPath, usePathArray)
				: __getOwnPropertyIteratorDeepStrict_object(item, delimiter, subPath, usePathArray);
			let next;

			while (!(next = sub.next()).done) {
				yield next.value;
			}
		}
		else {
			yield [subPath, array[index]];
		}
	}
}

function* __getOwnPropertyIteratorDeepStrict_object(
	object: AnyObject, delimiter: string | undefined, path: string | string[], usePathArray: boolean,
): IterableIterator<[string | string[], any]> {
	const keys = Object.keys(object);
	const length = keys.length;

	for (let index = 0; index < length; index++) {
		const key = keys[index];
		const prop = object[key];
		const subPath = usePathArray
			? [...path, key]
			: `${path === '' ? '' : `${path}.`}${key}`;

		if (prop !== null && typeof prop === 'object') {
			const sub = Array.isArray(prop)
				? __getOwnPropertyIteratorDeepStrict_array(prop, delimiter, subPath, usePathArray)
				: __getOwnPropertyIteratorDeepStrict_object(prop, delimiter, subPath, usePathArray);
			let next;

			while (!(next = sub.next()).done) {
				yield next.value;
			}
		}
		else {
			yield [subPath, object[key]];
		}
	}
}


/**
 * Creates iterator that traverse all properties and sub-properties of an
 * object.
 * Arrays will be traversed only by iterable items.
 * @param object The object to create iterator for.
 * @param delimiter Optional string value used as delimiter in the string key
 * path.
 * If not specified the key will be an array of strings representing property
 * path.
 * @returns Returns properties iterator or "null" id input is not an object.
 */
export function getOwnPropertyIteratorDeepStrict(entity: AnyObject | AnyArray, delimiter?: string): IterableIterator<[string | string[], any]> | null {
	if (!entity || typeof entity !== 'object') {
		return null;
	}

	const usePathArray = !delimiter;
	const iterator = Array.isArray(entity)
		? __getOwnPropertyIteratorDeepStrict_array(entity, delimiter, usePathArray ? [] : '', usePathArray)
		: __getOwnPropertyIteratorDeepStrict_object(entity, delimiter, usePathArray ? [] : '', usePathArray);

	return {
		next: () => iterator.next(),
		[Symbol.iterator]: () => iterator,
	};
}
