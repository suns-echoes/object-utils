import { __ARRAY, __OBJECT, __PRIMITIVE } from '../constants';


function __mergeOneDeepStrict_array(target: AnyArray, source: AnyArray): void {
	const commonLength = Math.min(target.length, source.length);
	const sourceLength = source.length;
	let index = 0;

	for (; index < commonLength; index++) {
		const targetItem = target[index];
		const sourceItem = source[index];

		if (targetItem !== null && sourceItem !== null) {
			const targetItemType = typeof targetItem === 'object'
				? (Array.isArray(targetItem) ? __ARRAY : __OBJECT) : __PRIMITIVE;
			const sourceItemType = typeof sourceItem === 'object'
				? (Array.isArray(sourceItem) ? __ARRAY : __OBJECT) : __PRIMITIVE;

			if ((targetItemType & sourceItemType) === __ARRAY) {
				__mergeOneDeepStrict_array(targetItem, sourceItem);

				continue;
			}

			if ((targetItemType & sourceItemType) === __OBJECT) {
				__mergeOneDeepStrict_object(targetItem, sourceItem);

				continue;
			}
		}

		if (source[index] !== undefined) {
			target[index] = source[index];
		}
	}

	for (; index < sourceLength; index++) {
		target[index] = source[index];
	}
}

function __mergeOneDeepStrict_object(target: AnyObject, source: AnyObject): void {
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;

	for (let index = 0; index < sourceKeyCount; index++) {
		const key = sourceKeys[index];

		if (key in target) {
			const targetProp = target[key];
			const sourceProp = source[key];

			if (targetProp !== null && sourceProp !== null) {
				const targetPropType = typeof targetProp === 'object'
					? (Array.isArray(targetProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;
				const sourcePropType = typeof sourceProp === 'object'
					? (Array.isArray(sourceProp) ? __ARRAY : __OBJECT) : __PRIMITIVE;

				if ((targetPropType & sourcePropType) === __ARRAY) {
					__mergeOneDeepStrict_array(targetProp, sourceProp);

					continue;
				}

				if ((targetPropType & sourcePropType) === __OBJECT) {
					__mergeOneDeepStrict_object(targetProp, sourceProp);

					continue;
				}
			}
		}

		if (source[key] !== undefined) {
			target[key] = source[key];
		}
	}
}


/**
 * Performs deep copy of all enumerable own properties and sub-properties from
 * one or more source objects to the target object, but does not overwrite
 * existing values when property from the source has the "undefined" value
 * assigned to it.
 * Generic objects and arrays will overwrite each other. Only iterable items
 * will be assigned from arrays.
 * It returns the modified target object.
 * @param target The object to which merge the source objects.
 * @param sources The objects providing source for merge.
 * @returns The modified target object.
 */
export function mergeDeepStrict(target: AnyObject, ...sources: AnyObject[]): AnyObject {
	if (target !== null) {
		const targetType = Array.isArray(target) ? __ARRAY : typeof target === 'object' ? __OBJECT : __PRIMITIVE;

		if (targetType === __PRIMITIVE) {
			return target;
		}

		const sourceCount = sources.length;

		for (let index = 0; index < sourceCount; index++) {
			const source = sources[index];

			if (source !== null) {
				const sourceType = Array.isArray(source) ? __ARRAY : typeof source === 'object' ? __OBJECT : __PRIMITIVE;

				if (sourceType === __PRIMITIVE) {
					continue;
				}

				if ((targetType & sourceType) === __ARRAY) {
					__mergeOneDeepStrict_array(<AnyArray>target, <AnyArray>source);
				}
				else if ((targetType & sourceType) === __OBJECT) {
					__mergeOneDeepStrict_object(target, source);
				}
			}
		}
	}

	return target;
}
