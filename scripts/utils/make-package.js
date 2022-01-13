import { config } from '../config/config.js';

export function makePackage(fileContent) {
	const packageData = JSON.parse(fileContent);
	const distPackageData = {};

	const {
		whitelist,
		blacklist,
		override,
	} = config.package_json;

	let copyKeys = Object.keys(packageData);

	if (whitelist && whitelist.length) {
		copyKeys = copyKeys.filter((key) => whitelist.includes(key));
	}

	if (blacklist && blacklist.length) {
		copyKeys = copyKeys.filter((key) => !blacklist.includes(key));
	}

	copyKeys.forEach((key) => distPackageData[key] = packageData[key]);

	if (override) {
		Object.keys(override).forEach((key) => {
			distPackageData[key] = override[key];
		});
	}

	return JSON.stringify(distPackageData, null, '  ');
}
