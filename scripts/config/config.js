import { makePackage } from '../utils/make-package.js';

export const config = {
	dist: './dist/',
	src:  './src/',

	// Distributable version of package.json file.
	package_json: {
		whitelist: {
			'*': true,
		},
		blacklist: [
			'scripts',
			'devDependencies',
		],
		override: {
			main:  './cjs/index.js',
			types: './cjs/index.d.ts',
		},
	},

	// Include those files in dist.
	files: [
		{ from: './package.json', transform: makePackage },
		{ from: './tsconfig.dist.src.json', to: 'tsconfig.json' },
		'./README.md',
		'./LICENSE',
	],
};
