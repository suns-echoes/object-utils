import { rmSync } from 'fs';

export function cleanDirSync(path) {
	try {
		rmSync(path, { recursive: true });
	}
	catch (error) {
		if (error.code !== 'ENOENT') {
			throw error;
		}
	}
}
