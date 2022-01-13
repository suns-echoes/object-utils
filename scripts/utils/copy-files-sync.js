import { lstatSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

export function copyFilesSync(src, dest, filter) {
	if (lstatSync(src).isDirectory()) {
		mkdirSync(dest, { recursive: true });
		readdirSync(src)
			.forEach((entity) => copyFilesSync(join(src, entity), join(dest, entity), filter));
	}
	else if (!filter || filter.test(src)) {
		copyFileSync(src, dest);
	}
}
