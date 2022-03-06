interface PropertyDescriptor<T = any> {
	configurable?: boolean,
	enumerable?: boolean,
	writable?: boolean,
	value?: T,
	get?(): T,
	set?(v: T): void,
}


/**
 * Creates and assigns new hidden (non-enumerable) and unchangable object to the
 * given "context" at the "key" property.
 * @param context The object like entity to which add the new property.
 * @param key The string, number or symbol name of the property.
 * @param properties The object with properties descriptor map.
 * @returns The newly assigned object.
 */
export function defineInternalProperties<THidden extends object>(
	context: any,
	key: ObjectKey,
	properties: { [key in keyof THidden]: PropertyDescriptor<THidden[key]> } & ThisType<typeof context>,
): THidden {
	const hidden = Object.defineProperties({}, properties);

	Object.defineProperty(context, key, {
		configurable: false,
		enumerable:   false,
		writable:     false,
		value:        hidden,
	});

	return <THidden>hidden;
}
