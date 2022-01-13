import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { config } from './config/config.js';
import { addFileExtensionsToImports } from './utils/add-file-extensions-to-imports.js';
import { copyFilesSync } from './utils/copy-files-sync.js';
import { findFilesSync } from './utils/find-files-sync.js';

// Add file extensions to import paths in CJS and ESM build.
['cjs', 'esm'].forEach((subpath) => {
	findFilesSync(join(config.dist, subpath), /\.js$/).forEach((filePath) => {
		addFileExtensionsToImports(filePath);
	});
});

// Copy source files to dist.
copyFilesSync(config.src, join(config.dist, 'src'), /^.+?(?<!\.spec)\.(?:js|ts)$/);

// Copy static files to dist.
config.files.forEach((file) => {
	const isSimpleCopy = typeof file === 'string';
	const from = isSimpleCopy ? file : file.from;
	const to = join(config.dist, isSimpleCopy ? file : file.to || file.from);
	const transformation = file.transform || null;

	if (transformation) {
		mkdirSync(dirname(to), { recursive: true });
		writeFileSync(to, transformation(readFileSync(from, { encoding: 'utf8' })), { encoding: 'utf8' });
	}
	else {
		copyFilesSync(from, to);
	}
});
