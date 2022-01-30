const volatileDeepHandler = {
	get(target: AnyObject, key: string): any {
		const prop = target[key];

		if (typeof prop === 'object' && prop !== null) {
			return new Proxy(prop, this as unknown as ProxyHandler<any>);
		}

		return prop || undefined;
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
 * Creates object proxy which will throw an error on any modification attempt on
 * any level.
 * @param target The object to be proxied.
 * @returns An object proxy.
 */
export function volatileProxyDeep<T extends AnyArray | AnyObject>(target: T): T {
	return new Proxy(target, volatileDeepHandler as unknown as ProxyHandler<any>);
}
