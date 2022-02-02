type PathKeys = string[];
type KeyPath = string;

declare type AnyKey = number | string | symbol;

declare type ObjectKey = string | symbol;

declare interface AnyArray extends Array<any> {}

declare interface AnyClass extends AnyObject {
	new (...args: any[]): any,
}

declare interface AnyFunction extends AnyObject {
	(...args: any[]): any,
}

declare interface AnyObject extends Record<ObjectKey, any> {}

declare interface ObjectLike extends Record<AnyKey, any> {}
