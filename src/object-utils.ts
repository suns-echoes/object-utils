import { Missing, Same } from './utils/constants';

import { isCyclic } from './utils/check/is-cyclic';
import { isObjectLike } from './utils/check/is-object-like';

import { diff } from './utils/compare/diff';
import { diffDeep } from './utils/compare/diff-deep';
import { diffDeepEx } from './utils/compare/diff-deep-ex';
import { diffDeepStrict } from './utils/compare/diff-deep-strict';
import { eql } from './utils/compare/eql';
import { eqlDeep } from './utils/compare/eql-deep';
import { eqlDeepEx } from './utils/compare/eql-deep-ex';
import { eqlDeepStrict } from './utils/compare/eql-deep-strict';

import { cloneDeep } from './utils/create/clone-deep';
import { cloneDeepEx } from './utils/create/clone-deep-ex';
import { cloneDeepStrict } from './utils/create/clone-deep-strict';
import { filter } from './utils/create/filter';
import { flat } from './utils/create/flat';
import { flatEx } from './utils/create/flat-ex';
import { fromKV } from './utils/create/from-kv';
import { fromKVArray } from './utils/create/from-kv-array';
import { fromPath } from './utils/create/from-path';
import { map } from './utils/create/map';
import { of } from './utils/create/of';
import { partial } from './utils/create/partial';
import { squash } from './utils/create/squash';
import { squashReverse } from './utils/create/squash-reverse';
import { template } from './utils/create/template';
import { templateEx } from './utils/create/template-ex';

import { freezeDeep } from './utils/debug/freeze-deep';
import { invariableProxy } from './utils/debug/invariable-proxy';
import { invariableProxyDeep } from './utils/debug/invariable-proxy-deep';

import { blackhole } from './utils/destroy/blackhole';

import { entriesDeep } from './utils/extract/entries-deep';
import { entriesDeepEx } from './utils/extract/entries-deep-ex';
import { entriesDeepStrict } from './utils/extract/entries-deep-strict';
import { valuesDeep } from './utils/extract/values-deep';
import { valuesDeepEx } from './utils/extract/values-deep-ex';
import { valuesDeepStrict } from './utils/extract/values-deep-strict';

import { any } from './utils/find/any';
import { every } from './utils/find/every';
import { find } from './utils/find/find';
import { findAll } from './utils/find/find-all';
import { findKey } from './utils/find/find-key';
import { findAllKeys } from './utils/find/find-all-keys';
import { getAllKeys } from './utils/find/get-all-keys';
import { goto } from './utils/find/goto';
import { includes } from './utils/find/includes';
import { keyOf } from './utils/find/key-of';
import { some } from './utils/find/some';

import { forEach } from './utils/iterate/for-each';
import { forEachDeep } from './utils/iterate/for-each-deep';
import { forEachDeepEx } from './utils/iterate/for-each-deep-ex';
import { forEachDeepStrict } from './utils/iterate/for-each-deep-strict';
import { getOwnPropertyIteratorDeep } from './utils/iterate/get-own-property-iterator-deep';
import { getOwnPropertyIteratorDeepEx } from './utils/iterate/get-own-property-iterator-deep-ex';
import { getOwnPropertyIteratorDeepStrict } from './utils/iterate/get-own-property-iterator-deep-strict';

import { assignDeep } from './utils/modify/assign-deep';
import { assignDeepEx } from './utils/modify/assign-deep-ex';
import { assignDeepStrict } from './utils/modify/assign-deep-strict';
import { assignDeepCloneDiff } from './utils/modify/assign-deep-clone-diff';
import { assignDeepCloneDiffEx } from './utils/modify/assign-deep-clone-diff-ex';
import { assignDeepCloneDiffStrict } from './utils/modify/assign-deep-clone-diff-strict';
import { defineInternalProperties } from './utils/modify/define-internal-properties';
import { mergeDeep } from './utils/modify/merge-deep';
import { mergeDeepEx } from './utils/modify/merge-deep-ex';
import { mergeDeepStrict } from './utils/modify/merge-deep-strict';


export const ObjectUtils = {
	// constants
	Missing,
	Same,
	// check
	isCyclic,
	isObjectLike,
	// compare
	diff,
	diffDeep,
	diffDeepEx,
	diffDeepStrict,
	eql,
	eqlDeep,
	eqlDeepEx,
	eqlDeepStrict,
	// create
	cloneDeep,
	cloneDeepEx,
	cloneDeepStrict,
	filter,
	flat,
	flatEx,
	fromKV,
	fromKVArray,
	fromPath,
	map,
	of,
	partial,
	squash,
	squashReverse,
	template,
	templateEx,
	// debug
	freezeDeep,
	invariableProxy,
	invariableProxyDeep,
	// destroy
	blackhole,
	// extract
	entriesDeep,
	entriesDeepEx,
	entriesDeepStrict,
	valuesDeep,
	valuesDeepEx,
	valuesDeepStrict,
	// find
	any,
	every,
	find,
	findAll,
	findKey,
	findAllKeys,
	getAllKeys,
	goto,
	includes,
	keyOf,
	some,
	// iterate
	forEach,
	forEachDeep,
	forEachDeepEx,
	forEachDeepStrict,
	getOwnPropertyIteratorDeep,
	getOwnPropertyIteratorDeepEx,
	getOwnPropertyIteratorDeepStrict,
	// modify
	assignDeep,
	assignDeepEx,
	assignDeepStrict,
	assignDeepCloneDiff,
	assignDeepCloneDiffEx,
	assignDeepCloneDiffStrict,
	defineInternalProperties,
	mergeDeep,
	mergeDeepEx,
	mergeDeepStrict,
};
