import { Missing, Same } from './utils/constants';

import { isCyclic } from './utils/check/is-cyclic';
import { isLikeObject } from './utils/check/is-like-object';

import { diff } from './utils/compare/diff';
import { diffDeep } from './utils/compare/diff-deep';
import { diffStrictDeep } from './utils/compare/diff-strict-deep';
import { eql } from './utils/compare/eql';
import { eqlDeep } from './utils/compare/eql-deep';
import { eqlStrictDeep } from './utils/compare/eql-strict-deep';

import { cloneDeep } from './utils/create/clone-deep';
import { cloneStrictDeep } from './utils/create/clone-strict-deep';
import { filter } from './utils/create/filter';
import { flat } from './utils/create/flat';
import { flatStrict } from './utils/create/flat-strict';
import { fromKV } from './utils/create/from-kv';
import { fromKVArray } from './utils/create/from-kv-array';
import { fromPath } from './utils/create/from-path';
import { map } from './utils/create/map';
import { of } from './utils/create/of';
import { partial } from './utils/create/partial';
import { squash } from './utils/create/squash';
import { squashReverse } from './utils/create/squash-reverse';
import { template } from './utils/create/template';
import { templateStrict } from './utils/create/template-strict';

import { freezeDeep } from './utils/debug/freeze-deep';
import { invariableProxy } from './utils/debug/invariable-proxy';
import { invariableProxyDeep } from './utils/debug/invariable-proxy-deep';

import { blackhole } from './utils/destroy/blackhole';

import { any } from './utils/find/any';
import { every } from './utils/find/every';
import { find } from './utils/find/find';
import { findKey } from './utils/find/find-key';
import { getAllKeys } from './utils/find/get-all-keys';
import { goto } from './utils/find/goto';
import { includes } from './utils/find/includes';
import { keyOf } from './utils/find/key-of';
import { some } from './utils/find/some';

import { entriesDeep } from './utils/iterate/entries-deep';
import { entriesStrictDeep } from './utils/iterate/entries-strict-deep';
import { forEach } from './utils/iterate/for-each';
import { forEachDeep } from './utils/iterate/for-each-deep';
import { forEachStrictDeep } from './utils/iterate/for-each-strict-deep';
import { valuesDeep } from './utils/iterate/values-deep';
import { valuesStrictDeep } from './utils/iterate/values-strict-deep';

import { assignDeep } from './utils/modify/assign-deep';
import { assignStrictDeep } from './utils/modify/assign-strict-deep';
import { mergeDeep } from './utils/modify/merge-deep';
import { mergeStrictDeep } from './utils/modify/merge-strict-deep';


export const ObjectUtils = {
	// constants
	Missing,
	Same,
	// check
	isCyclic,
	isLikeObject,
	// compare
	diff,
	diffDeep,
	diffStrictDeep,
	eql,
	eqlDeep,
	eqlStrictDeep,
	// create
	cloneDeep,
	cloneStrictDeep,
	filter,
	flat,
	flatStrict,
	fromKV,
	fromKVArray,
	fromPath,
	map,
	of,
	partial,
	squash,
	squashReverse,
	template,
	templateStrict,
	// debug
	freezeDeep,
	invariableProxy,
	invariableProxyDeep,
	// destroy
	blackhole,
	// find
	any,
	every,
	find,
	findKey,
	getAllKeys,
	goto,
	includes,
	keyOf,
	some,
	// iterate
	entriesDeep,
	entriesStrictDeep,
	forEach,
	forEachDeep,
	forEachStrictDeep,
	valuesDeep,
	valuesStrictDeep,
	// modify
	assignDeep,
	assignStrictDeep,
	mergeDeep,
	mergeStrictDeep,
};
