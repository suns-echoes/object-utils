const invariableHandler = {
	get(target: AnyObject, key: string): any {
		return target[key] || undefined;
	},
	set(_: any, key: string): void {
		throw new Error(`Illegal operation, cannot set property: "${key}"`);
	},
	deleteProperty(_: any, key: string): void {
		throw new Error(`Illegal operation, cannot delete property: "${key}"`);
	},
	defineProperty(_: any, key: string): void {
		throw new Error(`Illegal operation, cannot define property: "${key}"`);
	},
	setPrototypeOf(): void {
		throw new Error('Illegal operation, cannot set prototype');
	},
};


/**
 * Creates target object proxy which will throw an error on any modification
 * attempt on top level.
 * @param target The object to be proxied.
 * @returns Returns the target object invariable proxy.
 */
export function invariableProxy<T extends AnyArray | AnyObject>(target: T): T {
	return new Proxy(target, invariableHandler as unknown as ProxyHandler<any>);
}
