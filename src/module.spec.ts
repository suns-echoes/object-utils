import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

import Lib from './index';
import { ObjectUtils as NamedLib } from './object-utils';


const sourceFilesFilter = /^.+?(?<!\.spec)\.(?:js|ts)$/;

async function findMethods(path: string, url: string, _members: string[] = []): Promise<string[]> {
	const entities = readdirSync(path);

	for (const entity of entities) {
		const entityPath = join(path, entity);
		const stat = lstatSync(entityPath);

		if (stat.isFile() && sourceFilesFilter.test(entity)) {
			Object.keys(
				await import(`${url}${entity}`),
			).forEach((key) => {
				if (key.charAt(0) !== '_') {
					_members.push(key);
				}
			});
		}
		else if (stat.isDirectory()) {
			await findMethods(entityPath, `${url}${entity}/`, _members);
		}
	}

	return [...new Set(_members)];
}


describe('Module', () => {
	it('exports all existing methods', async () => {
		const exportedMethods = Object.keys(NamedLib);
		const foundMethods = await findMethods('./src/utils/', './utils/');

		expect(exportedMethods).to.have.members(foundMethods);
	});

	it('exports as default', () => {
		expect(Lib).to.be.eql(NamedLib);
	});
});
