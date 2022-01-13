import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

export function findFilesSync(path, filter, _files = []) {
	const stat = lstatSync(path);

	if (stat.isDirectory()) {
		readdirSync(path)
			.forEach((entity) => findFilesSync(join(path, entity), filter, _files));
	}
	else if (stat.isFile() && (!filter || filter.test(path))) {
		_files.push(path);
	}

	return _files;
}
