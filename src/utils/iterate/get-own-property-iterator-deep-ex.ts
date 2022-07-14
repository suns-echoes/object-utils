function* __getOwnPropertyIteratorDeepEx(
	object: AnyObject, delimiter: string | undefined, path: string | string[], usePathArray: boolean,
): IterableIterator<[string | string[], any]> {
	const keys = Object.keys(object);
	const length = keys.length;

	for (let index = 0; index < length; index++) {
		const key = keys[index];
		const prop = (<AnyObject>object)[key];
		const subPath = usePathArray ? [...path, key] : `${path === '' ? '' : `${path}.`}${key}`;

		if (prop !== null && typeof prop === 'object' && !Array.isArray(prop)) {
			const sub = __getOwnPropertyIteratorDeepEx(prop, delimiter, subPath, usePathArray);
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
 * Arrays will not be traversed.
 * @param object The object to create iterator for.
 * @param delimiter Optional string value used as delimiter in the string key
 * path.
 * If not specified the key will be an array of strings representing property
 * path.
 * @returns Returns properties iterator or "null" if input is not an object.
 */
export function getOwnPropertyIteratorDeepEx(object: AnyObject, delimiter?: string): IterableIterator<[string | string[], any]> | null {
	if (!object || typeof object !== 'object' || Array.isArray(object)) {
		return null;
	}

	const usePathArray = !delimiter;
	const iterator = __getOwnPropertyIteratorDeepEx(object, delimiter, usePathArray ? [] : '', usePathArray);

	return {
		next: () => iterator.next(),
		[Symbol.iterator]: () => iterator,
	};
}
