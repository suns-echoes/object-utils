import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';

function findImports(source) {
	const matchIdentifierPart = '[a-zA-Z_$][\\w$]*';
	const matchModuleAliasPart = `\\*\\s+as\\s+${matchIdentifierPart}`;
	const matchAliasPart = `(?:\\s+as\\s+${matchIdentifierPart})?`;
	const matchAliasedPart = `\\s*${matchIdentifierPart}${matchAliasPart}`;
	const matchFilePathPart = '[\'"][^\'"\\n]+[\'"]';
	const matchImport = new RegExp(
		'^[ \t]*import\\s*'
		+ `(?:${matchFilePathPart}(\\s*;)?|`
		+ `(?:${matchIdentifierPart}|`
		+ `(?:${matchIdentifierPart}\\s*,\\s*)?${matchModuleAliasPart}|`
		+ `(?:${matchIdentifierPart}\\s*,\\s*)?(?:${matchIdentifierPart}\\s*,\\s*)?`
		+ '\\{'
		+ `${matchAliasedPart}(?:\\s*,${matchAliasedPart})*(\\s*,\\s*${matchAliasedPart}(?:\\s*,${matchAliasedPart})*\\s*,?)*`
		+ `\\s*\\})\\s*from\\s*${matchFilePathPart}(\\s*;)?)`, 'gm',
	);

	const matchDefaultImport = /import\s*([a-zA-Z_$][\w$]*)/;
	const matchModuleAlias = new RegExp(`\\*\\s+as\\s+(${matchIdentifierPart})`);
	const matchNamedEntities = /[a-zA-Z_$][\w$]*(\s+as\s+[a-zA-Z_$][\w$]*)?/g;
	const matchFilePath = '[\'"]([^\'"\\n]+)[\'"]';

	const matches = [];
	let match;

	while ((match = matchImport.exec(source)) !== null) {
		const { 0: statement, index } = match;
		const defName = statement.match(matchDefaultImport);
		const filepath = statement.match(matchFilePath)[1];
		const namedEntities = statement.substring(statement.indexOf('{'), statement.indexOf('}')).match(matchNamedEntities);
		let moduleAlias = statement.match(matchModuleAlias);
		let named = null;

		if (moduleAlias) {
			moduleAlias = moduleAlias[1];
		}

		if (namedEntities) {
			named = namedEntities.map((entity) => {
				const [name, alias = null] = entity.split(/\s+as\s+/);

				return {
					name,
					alias,
				};
			});
		}

		matches.push({
			statement,
			members: {
				default: defName ? defName[1] : null,
				moduleAlias,
				named,
			},
			filepath,
			index,
		});
	}

	return matches;
}

function findRequires(source) {
	const matchRequire = /\brequire\s*\(\s*(?:"[^"]+"|'[^']+')\s*\)(\\s*;)?/g;
	const matchFilePath = '[\'"]([^\'"\\n]+)[\'"]';

	const matches = [];
	let match;

	while ((match = matchRequire.exec(source)) !== null) {
		const { 0: statement, index } = match;
		const filepath = statement.match(matchFilePath)[1];

		matches.push({
			statement,
			filepath,
			index,
		});
	}

	return matches;
}

function hasMatchingFile(path) {
	try {
		const filename = basename(path);

		return readdirSync(dirname(path)).includes(`${filename}.js`);
	}
	catch {}

	return false;
}

function shouldAddFileExtension(rootpath, filepath) {
	const path = join(rootpath, filepath);

	if (!existsSync(path)) {
		return hasMatchingFile(path);
	}

	return false;
}

export function addFileExtensionsToImports(sourceFilePath) {
	const code = readFileSync(sourceFilePath, { encoding: 'utf8' });
	const importsInfo = [...findImports(code), ...findRequires(code)]
		.map(({ filepath, index, statement }) => {
			return {
				filepath,
				index: index + statement.lastIndexOf(filepath) + filepath.length,
			};
		});

	let recoded = '';
	let lastIndex = 0;

	importsInfo.forEach(({ filepath, index }) => {
		const extension = shouldAddFileExtension(dirname(sourceFilePath), filepath) ? '.js' : '';

		recoded += code.substring(lastIndex, index) + extension;
		lastIndex = index;
	});

	if (importsInfo.length) {
		recoded += code.substring(lastIndex);

		writeFileSync(sourceFilePath, recoded, { encoding: 'utf8' });
	}
}
