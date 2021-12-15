const volatileHandler = {
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

export function volatileProxy<T extends AnyArray | AnyObject>(target: T): T {
	return new Proxy(target, volatileHandler as unknown as ProxyHandler<any>);
}
