type ObjectKey = number | string | symbol;
type AnyObject = Record<ObjectKey, any>;

interface ObjectPropertyCallbackFn {
	(property: any, key: ObjectKey, object: AnyObject): boolean,
}
