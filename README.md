# @suns-echoes/`object-utils`

## About project

The library of useful utilities for objects manipulations.

[⮝](#about-project)



## Installation using npm:

Using npm:

```js
npm i @suns-echoes/object-utils

npm i --save-dev @suns-echoes/object-utils
```

[⮝](#about-project)



## Usage

As Node.js module (CJS):

```js
// Default import of the entire library:
const ArrayUtils = require('@suns-echoes/object-utils/cjs');
// Named import of the entire library:
const { ArrayUtils } = require('@suns-echoes/object-utils/cjs/object-utils');

// Import single util:
const { diff } = require('@suns-echoes/object-utils/cjs/utils/compare/diff');
```

As ES6 module (ESM):

```js
// Default import of the entire library:
import ArrayUtils from '@suns-echoes/object-utils/esm/index.js';
// Named import of the entire library:
import { ArrayUtils } from '@suns-echoes/object-utils/esm/object-utils.js';

// Import single util:
import { diff } from '@suns-echoes/object-utils/esm/utils/compare/diff.js';
```

[⮝](#about-project)



## Module content

For a more comprehensive description of the methods please check the
corresponding source files.

### Method variants

* The generic methods (ones that does not end with `*-ex` nor `*-strict`) treats arrays as generic object and checks for own enumerable properties rather than iterable items.
* The `*-ex` functions are exclusive for objects. Arrays will be treated like primitive values and will not be traversed. Generic objects and arrays will overwrite each other on assignment or merge.
* The `*-strict` functions distinguish between arrays and objects and treat them as different types. Arrays will be checked only for iterable items. Generic objects and arrays will overwrite each other on assignment or merge.

### The constants

* `Missing` - symbol used by `diff` method to indicate that element is missing;
* `Same` - symbol used by `diff` method to indicate that element did not change.

### The `check/` methods

* `isCyclic` - checks if object has cyclic references;
* `isObjectLike` - checks if entity is like object.

### The `compare/` methods

* `diff` - finds the shallow difference between two entities;
* `diffDeep` - finds the deep difference between two entities;
* `diffDeepEx` - similar to `diff`, see: [*-ex method variant](#method-variants);
* `diffDeepStrict` - similar to `diffDeep`, see: [*-strict method variant](#method-variants);
* `eql` - performs shallow equality check of two entities;
* `eqlDeep` - performs deep equality check of two entities;
* `eqlDeepEx` - similar to `eqlDeep`, see: [*-ex method variant](#method-variants);
* `eqlDeepStrict` - similar to `eqlDeep`, see: [*-strict method variant](#method-variants).

### The `create/` methods

* `cloneDeep` - creates deep clone of the object;
* `cloneDeepEx` - similar to `cloneDeep`, see: [*-ex method variant](#method-variants);
* `cloneDeepStrict` - similar to `cloneDeep`, see: [*-strict method variant](#method-variants);
* `filter` - creates a new object with filtered properties from source object;
* `flat` - creates a new object with flattened properties and sub-properties from the source object;
* `flatEx` - similar to `flat`, see: [*-ex method variant](#method-variants);
* `fromKV` - creates a new object with properties matching the given key-value iterable;
* `fromKVArray` - creates a new object with properties matching the given key-value array;
* `fromPath` - creates a new nested object with sub-keys matching the given path;
* `map` - creates a new object with all property values rewritten by provided function;
* `of` - creates a new object using list of different sources;
* `partial` - creates new object with selected keys from the source object;
* `squash` - creates squashed copy of the object and its prototypes (from the oldest prototype to root);
* `squashReverse` - creates squashed copy of the object and its prototypes (from root to the oldest prototype);
* `template` - creates new object without properties other than sub-objects based on the template object structure;
* `templateEx` - similar to `template`, see: [*-ex method variant](#method-variants).

### The `debug/` methods

* `freezeDeep` - deeply freezes the target object;
* `invariableProxy` - creates object proxy which will throw an error on any modification attempt on top level;
* `invariableProxyDeep` - creates object proxy which will throw an error on any modification attempt on any level.

### The `destroy/` methods

* `blackhole` - breaks all references and set all properties to undefined (this method is circular reference safe).

### The `extract/` methods

* `entriesDeep` - returns an array of [key, value] pairs of the object own enumerable properties including nested ones;
* `entriesDeepEx` - similar to `entriesDeep`, see: [*-ex method variant](#method-variants);
* `entriesDeepStrict` - similar to `entriesDeep`, see: [*-strict method variant](#method-variants);
* `valuesDeep` - returns an array of the object own enumerable properties including nested ones;
* `valuesDeepEx` - similar to `valuesDeep`, see: [*-ex method variant](#method-variants);
* `valuesDeepStrict` - similar to `valuesDeep`, see: [*-strict method variant](#method-variants).

### The `find/` methods

* `any` - finds if object has property that pass the test implemented by the provided function;
* `every` - finds if all object properties pass the test implemented by the provided function;
* `find` - finds the property in the object that pass the test implemented by the provided function;
* `findAll` - finds all properties in the object that pass the test implemented by the provided function;
* `findKey` - finds the key of the property in the object that pass the test implemented by the provided function;
* `findAllKeys` - finds all keys of the properties in the object that pass the test implemented by the provided function;
* `getAllKeys` - returns the list of all keys in the objects;
* `goto` - returns the property at the given "path";
* `includes` - finds if object has property that matches the search value;
* `keyOf` - finds the key of the first property in the object that matches the search value;
* `some` - finds if object has property that pass the test implemented by the provided function.

### The `iterate/` methods

* `forEach` - executes the provided function once for each property;
* `forEachDeep` - executes the provided function once for each property including nested ones;
* `forEachDeepEx` - similar to `forEachDeep`, see: [*-ex method variant](#method-variants);
* `forEachDeepStrict` - similar to `forEachDeep`, see: [*-strict method variant](#method-variants);
* `getOwnPropertyIteratorDeep` - creates iterator that traverse all properties and sub-properties;
* `getOwnPropertyIteratorDeepEx` - similar to `getOwnPropertyIteratorDeep`, see: [*-ex method variant](#method-variants);
* `getOwnPropertyIteratorDeepStrict` - similar to `getOwnPropertyIteratorDeep`, see: [*-strict method variant](#method-variants).

### The `modify/` methods

* `assignDeep`¹ - performs deep copy of all enumerable own properties and sub-properties from one or more source objects to the target object;
* `assignDeepEx`¹ - similar to `assignDeep`, see: [*-ex method variant](#method-variants);
* `assignDeepStrict`¹ - similar to `assignDeep`, see: [*-strict method variant](#method-variants);
* `assignDeepCloneDiff`¹ - assigns cloned differences between target and source to the target and return assigned changes as diff tree;
* `assignDeepCloneDiffEx`¹ - similar to `assignDeepCloneDiff`, see: [*-ex method variant](#method-variants);
* `assignDeepCloneDiffStrict`¹ - similar to `assignDeepCloneDiff`, see: [*-strict method variant](#method-variants);
* `defineInternalProperties` - creates and assigns new object to the given context object;
* `mergeDeep`² - performs deep copy of all enumerable own properties and sub-properties from one or more source objects to the target object;
* `mergeDeepEx`² - similar to `mergeDeep`, see: [*-ex method variant](#method-variants);
* `mergeDeepStrict`² - similar to `mergeDeep`, see: [*-strict method variant](#method-variants);

¹ The `assign-*` methods allows the target property to be overwritten by "undefined" value from source property.

² The `merge-*` methods prevents target property from being overwritten by "undefined" value from source property.

[⮝](#about-project)



## Version history

### 1.1.0 [Current release]

Update README with list of exported methods and short description.
Clarify many methods comments.

#### New methods:

* findAll
* findAllKeys
* getOwnPropertyIteratorDeep
* getOwnPropertyIteratorDeepEx
* getOwnPropertyIteratorDeepStrict

#### Other:

* VSCode debugger configuration for entire project.

### 1.0.0

The first stable release of this library.

[⮝](#about-project)



## License

Licensed under MIT

Copyright (c) 2021-2022 Aneta Suns
