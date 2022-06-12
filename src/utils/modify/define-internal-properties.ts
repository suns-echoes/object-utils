interface PropertyDescriptor<T = any> {
	configurable?: boolean,
	enumerable?: boolean,
	writable?: boolean,
	value?: T,
	get?(): T,
	set?(v: T): void,
}

interface Attributes {
	configurable?: boolean,
	enumerable?: boolean,
	writable?: boolean,
}


/**
 * Creates and assigns new object (by default: hidden (non-enumerable) and
 * unchangable) to the given "context" at the given "key" property.
 * @param context The object like entity to which add the new property.
 * @param key The string, number or symbol name of the property.
 * @param properties The object with properties descriptor map.
 * @param attributes Optional, the object attributes.
 * @returns Returns teg newly assigned object.
 */
export function defineInternalProperties<THidden extends object>(
	context: any,
	key: ObjectKey,
	properties: { [key in keyof THidden]: PropertyDescriptor<THidden[key]> } & ThisType<typeof context>,
	attributes: Attributes = {
		configurable: false,
		enumerable: false,
		writable: false,
	},
): THidden {
	const hidden = Object.defineProperties({}, properties);
	const {
		configurable = false,
		enumerable = false,
		writable = false,
	} = attributes;

	Object.defineProperty(context, key, {
		configurable,
		enumerable,
		writable,
		value: hidden,
	});

	return <THidden>hidden;
}
