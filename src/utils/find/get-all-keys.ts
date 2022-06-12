/**
 * Returns the list of all keys in provided source objects.
 * @param sources The objects to get keys from.
 * @returns Returns the array containing all keys but discards repeated ones.
 */
export function getAllKeys(...sources: any[]): string[] {
	const sourceCount = sources.length;
	let keys = Object.keys(sources[0]);

	for (let index = 1; index < sourceCount; index++) {
		keys = keys.concat(Object.keys(sources[index]));
	}

	return [...new Set(keys)];
}
