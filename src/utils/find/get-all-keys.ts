export function getAllKeys(...sources: any[]): string[] {
	const sourceCount = sources.length;
	let index = 1;
	let keys = Object.keys(sources[0]);

	for (; index < sourceCount; index++) {
		keys = keys.concat(Object.keys(sources[index]));
	}

	return [...new Set(keys)];
}
