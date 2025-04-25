import nodeCrypto, { createHash } from 'node:crypto';
import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import invariant from 'vinxi/lib/invariant';
import { virtualId, handlerModule, join } from 'vinxi/lib/path';
import { pathToFileURL } from 'node:url';
import o$3 from 'vite-plugin-node-polyfills/shims/process';
import g$2 from 'vite-plugin-node-polyfills/shims/global';
import { AsyncLocalStorage } from 'node:async_hooks';
import O$3 from 'jsonwebtoken';
import e$1 from 'pg';
import { sharedConfig, lazy, createComponent, useContext, createContext as createContext$1, createMemo, createSignal, createRenderEffect, on, runWithOwner, getOwner, startTransition, resetErrorBoundaries, batch, untrack, mergeProps as mergeProps$1, splitProps, Show, onMount, onCleanup, getListener, catchError, ErrorBoundary, createEffect, Suspense, createUniqueId, For, children, createRoot } from 'solid-js';
import { renderToString, getRequestEvent, isServer, ssrElement, escape, mergeProps, ssr, createComponent as createComponent$1, ssrHydrationKey, renderToStream, NoHydration, useAssets, Hydration, ssrAttribute, HydrationScript, delegateEvents, spread } from 'solid-js/web';
import { provideRequestEvent } from 'solid-js/web/storage';
import { createStore } from 'solid-js/store';
import d$2 from 'axios';
import { promises, existsSync } from 'node:fs';
import { resolve, dirname, join as join$1 } from 'node:path';

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$1(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

const subtle = nodeCrypto.webcrypto?.subtle || {};
const randomUUID = () => {
  return nodeCrypto.randomUUID();
};
const getRandomValues = (array) => {
  return nodeCrypto.webcrypto.getRandomValues(array);
};
const _crypto = {
  randomUUID,
  getRandomValues,
  subtle
};

// src/utils.ts
var alphabetByEncoding = {};
var alphabetByValue = Array.from({ length: 64 });
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  alphabetByEncoding[char] = i;
  alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  const index = i + 26;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
  alphabetByEncoding[i.toString(10)] = i + 52;
  const char = i.toString(10);
  const index = i + 52;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
alphabetByEncoding["-"] = 62;
alphabetByValue[62] = "-";
alphabetByEncoding["_"] = 63;
alphabetByValue[63] = "_";
var bitsPerLetter = 6;
var bitsPerByte = 8;
var maxLetterValue = 63;
var stringToBuffer = (value) => {
  return new TextEncoder().encode(value);
};
var bufferToString = (value) => {
  return new TextDecoder().decode(value);
};
var base64urlDecode = (_input) => {
  const input = _input + "=".repeat((4 - _input.length % 4) % 4);
  let totalByteLength = input.length / 4 * 3;
  if (input.endsWith("==")) {
    totalByteLength -= 2;
  } else if (input.endsWith("=")) {
    totalByteLength--;
  }
  const out = new ArrayBuffer(totalByteLength);
  const dataView = new DataView(out);
  for (let i = 0; i < input.length; i += 4) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = i + 3; j <= limit; j++) {
      if (input[j] === "=") {
        bits >>= bitsPerLetter;
      } else {
        if (!(input[j] in alphabetByEncoding)) {
          throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
        }
        bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
        bitLength += bitsPerLetter;
      }
    }
    const chunkOffset = i / 4 * 3;
    bits >>= bitLength % bitsPerByte;
    const byteLength = Math.floor(bitLength / bitsPerByte);
    for (let k = 0; k < byteLength; k++) {
      const offset = (byteLength - k - 1) * bitsPerByte;
      dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
    }
  }
  return new Uint8Array(out);
};
var base64urlEncode = (_input) => {
  const input = typeof _input === "string" ? stringToBuffer(_input) : _input;
  let str = "";
  for (let i = 0; i < input.length; i += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
      bits |= input[j] << (limit - j - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k = 1; k <= bitClusterCount; k++) {
      const offset = (bitClusterCount - k) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
  }
  return str;
};

// src/index.ts
var defaults = {
  encryption: { saltBits: 256, algorithm: "aes-256-cbc", iterations: 1, minPasswordlength: 32 },
  integrity: { saltBits: 256, algorithm: "sha256", iterations: 1, minPasswordlength: 32 },
  ttl: 0,
  timestampSkewSec: 60,
  localtimeOffsetMsec: 0
};
var clone = (options) => ({
  ...options,
  encryption: { ...options.encryption },
  integrity: { ...options.integrity }
});
var algorithms = {
  "aes-128-ctr": { keyBits: 128, ivBits: 128, name: "AES-CTR" },
  "aes-256-cbc": { keyBits: 256, ivBits: 128, name: "AES-CBC" },
  sha256: { keyBits: 256, name: "SHA-256" }
};
var macPrefix = "Fe26.2";
var randomBytes = (_crypto, size) => {
  const bytes = new Uint8Array(size);
  _crypto.getRandomValues(bytes);
  return bytes;
};
var randomBits = (_crypto, bits) => {
  if (bits < 1)
    throw new Error("Invalid random bits count");
  const bytes = Math.ceil(bits / 8);
  return randomBytes(_crypto, bytes);
};
var pbkdf2 = async (_crypto, password, salt, iterations, keyLength, hash) => {
  const passwordBuffer = stringToBuffer(password);
  const importedKey = await _crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const saltBuffer = stringToBuffer(salt);
  const params = { name: "PBKDF2", hash, salt: saltBuffer, iterations };
  const derivation = await _crypto.subtle.deriveBits(params, importedKey, keyLength * 8);
  return derivation;
};
var generateKey = async (_crypto, password, options) => {
  var _a;
  if (!(password == null ? void 0 : password.length))
    throw new Error("Empty password");
  if (options == null || typeof options !== "object")
    throw new Error("Bad options");
  if (!(options.algorithm in algorithms))
    throw new Error(`Unknown algorithm: ${options.algorithm}`);
  const algorithm = algorithms[options.algorithm];
  const result = {};
  const hmac = (_a = options.hmac) != null ? _a : false;
  const id = hmac ? { name: "HMAC", hash: algorithm.name } : { name: algorithm.name };
  const usage = hmac ? ["sign", "verify"] : ["encrypt", "decrypt"];
  if (typeof password === "string") {
    if (password.length < options.minPasswordlength)
      throw new Error(
        `Password string too short (min ${options.minPasswordlength} characters required)`
      );
    let { salt = "" } = options;
    if (!salt) {
      const { saltBits = 0 } = options;
      if (!saltBits)
        throw new Error("Missing salt and saltBits options");
      const randomSalt = randomBits(_crypto, saltBits);
      salt = [...new Uint8Array(randomSalt)].map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    const derivedKey = await pbkdf2(
      _crypto,
      password,
      salt,
      options.iterations,
      algorithm.keyBits / 8,
      "SHA-1"
    );
    const importedEncryptionKey = await _crypto.subtle.importKey(
      "raw",
      derivedKey,
      id,
      false,
      usage
    );
    result.key = importedEncryptionKey;
    result.salt = salt;
  } else {
    if (password.length < algorithm.keyBits / 8)
      throw new Error("Key buffer (password) too small");
    result.key = await _crypto.subtle.importKey("raw", password, id, false, usage);
    result.salt = "";
  }
  if (options.iv)
    result.iv = options.iv;
  else if ("ivBits" in algorithm)
    result.iv = randomBits(_crypto, algorithm.ivBits);
  return result;
};
var getEncryptParams = (algorithm, key, data) => {
  return [
    algorithm === "aes-128-ctr" ? { name: "AES-CTR", counter: key.iv, length: 128 } : { name: "AES-CBC", iv: key.iv },
    key.key,
    typeof data === "string" ? stringToBuffer(data) : data
  ];
};
var encrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const encrypted = await _crypto.subtle.encrypt(...getEncryptParams(options.algorithm, key, data));
  return { encrypted: new Uint8Array(encrypted), key };
};
var decrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const decrypted = await _crypto.subtle.decrypt(...getEncryptParams(options.algorithm, key, data));
  return bufferToString(new Uint8Array(decrypted));
};
var hmacWithPassword = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, { ...options, hmac: true });
  const textBuffer = stringToBuffer(data);
  const signed = await _crypto.subtle.sign({ name: "HMAC" }, key.key, textBuffer);
  const digest = base64urlEncode(new Uint8Array(signed));
  return { digest, salt: key.salt };
};
var normalizePassword = (password) => {
  if (typeof password === "string" || password instanceof Uint8Array)
    return { encryption: password, integrity: password };
  if ("secret" in password)
    return { id: password.id, encryption: password.secret, integrity: password.secret };
  return { id: password.id, encryption: password.encryption, integrity: password.integrity };
};
var seal = async (_crypto, object, password, options) => {
  if (!password)
    throw new Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const objectString = JSON.stringify(object);
  const pass = normalizePassword(password);
  const { id = "", encryption, integrity } = pass;
  if (id && !/^\w+$/.test(id))
    throw new Error("Invalid password id");
  const { encrypted, key } = await encrypt(_crypto, encryption, opts.encryption, objectString);
  const encryptedB64 = base64urlEncode(new Uint8Array(encrypted));
  const iv = base64urlEncode(key.iv);
  const expiration = opts.ttl ? now + opts.ttl : "";
  const macBaseString = `${macPrefix}*${id}*${key.salt}*${iv}*${encryptedB64}*${expiration}`;
  const mac = await hmacWithPassword(_crypto, integrity, opts.integrity, macBaseString);
  const sealed = `${macBaseString}*${mac.salt}*${mac.digest}`;
  return sealed;
};
var fixedTimeComparison = (a, b) => {
  let mismatch = a.length === b.length ? 0 : 1;
  if (mismatch)
    b = a;
  for (let i = 0; i < a.length; i += 1)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
};
var unseal = async (_crypto, sealed, password, options) => {
  if (!password)
    throw new Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const parts = sealed.split("*");
  if (parts.length !== 8)
    throw new Error("Incorrect number of sealed components");
  const prefix = parts[0];
  let passwordId = parts[1];
  const encryptionSalt = parts[2];
  const encryptionIv = parts[3];
  const encryptedB64 = parts[4];
  const expiration = parts[5];
  const hmacSalt = parts[6];
  const hmac = parts[7];
  const macBaseString = `${prefix}*${passwordId}*${encryptionSalt}*${encryptionIv}*${encryptedB64}*${expiration}`;
  if (macPrefix !== prefix)
    throw new Error("Wrong mac prefix");
  if (expiration) {
    if (!/^\d+$/.test(expiration))
      throw new Error("Invalid expiration");
    const exp = Number.parseInt(expiration, 10);
    if (exp <= now - opts.timestampSkewSec * 1e3)
      throw new Error("Expired seal");
  }
  let pass = "";
  passwordId = passwordId || "default";
  if (typeof password === "string" || password instanceof Uint8Array)
    pass = password;
  else if (passwordId in password) {
    pass = password[passwordId];
  } else {
    throw new Error(`Cannot find password: ${passwordId}`);
  }
  pass = normalizePassword(pass);
  const macOptions = opts.integrity;
  macOptions.salt = hmacSalt;
  const mac = await hmacWithPassword(_crypto, pass.integrity, macOptions, macBaseString);
  if (!fixedTimeComparison(mac.digest, hmac))
    throw new Error("Bad hmac value");
  const encrypted = base64urlDecode(encryptedB64);
  const decryptOptions = opts.encryption;
  decryptOptions.salt = encryptionSalt;
  decryptOptions.iv = base64urlDecode(encryptionIv);
  const decrypted = await decrypt(_crypto, pass.encryption, decryptOptions, encrypted);
  if (decrypted)
    return JSON.parse(decrypted);
  return null;
};

function o$2(n){throw new Error(`${n} is not implemented yet!`)}let i$3 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o$2("Readable.asyncIterator")}iterator(e){throw o$2("Readable.iterator")}map(e,t){throw o$2("Readable.map")}filter(e,t){throw o$2("Readable.filter")}forEach(e,t){throw o$2("Readable.forEach")}reduce(e,t,r){throw o$2("Readable.reduce")}find(e,t){throw o$2("Readable.find")}findIndex(e,t){throw o$2("Readable.findIndex")}some(e,t){throw o$2("Readable.some")}toArray(e){throw o$2("Readable.toArray")}every(e,t){throw o$2("Readable.every")}flatMap(e,t){throw o$2("Readable.flatMap")}drop(e,t){throw o$2("Readable.drop")}take(e,t){throw o$2("Readable.take")}asIndexedPairs(e){throw o$2("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}};const c$2=class c{allowHalfOpen=true;_destroy;constructor(e=new i$3,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=g$1(e._destroy,t._destroy);}};function _$3(){return Object.assign(c$2.prototype,i$3.prototype),Object.assign(c$2.prototype,l$1.prototype),c$2}function g$1(...n){return function(...e){for(const t of n)t(...e);}}const m$2=_$3();let A$3 = class A extends m$2{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}};let y$3 = class y extends i$3{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A$3;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}};function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}let w$3 = class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}};const E$1=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R$5(n={}){const e=new E$1,t=Array.isArray(n)||H$5(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H$5(n){return typeof n?.entries=="function"}function S$4(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const C$3=new Set([101,204,205,304]);async function b$4(n,e){const t=new y$3,r=new w$3(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R$5(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(C$3.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function O$2(n,e,t={}){try{const r=await b$4(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:S$4(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [
    name,
    opts.domain || "",
    opts.path || "/",
    Boolean(opts.secure),
    Boolean(opts.httpOnly),
    Boolean(opts.sameSite)
  ].join(";");
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$1(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeaders(event) {
  return event.node.res.getHeaders();
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    appendResponseHeader(event, name, value);
  }
}
const appendHeaders = appendResponseHeaders;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

function resolveCorsOptions(options = {}) {
  const defaultOptions = {
    origin: "*",
    methods: "*",
    allowHeaders: "*",
    exposeHeaders: "*",
    credentials: false,
    maxAge: false,
    preflight: {
      statusCode: 204
    }
  };
  return defu(options, defaultOptions);
}
function isPreflightRequest(event) {
  const origin = getRequestHeader(event, "origin");
  const accessControlRequestMethod = getRequestHeader(
    event,
    "access-control-request-method"
  );
  return event.method === "OPTIONS" && !!origin && !!accessControlRequestMethod;
}
function isCorsOriginAllowed(origin, options) {
  const { origin: originOption } = options;
  if (!origin || !originOption || originOption === "*" || originOption === "null") {
    return true;
  }
  if (Array.isArray(originOption)) {
    return originOption.some((_origin) => {
      if (_origin instanceof RegExp) {
        return _origin.test(origin);
      }
      return origin === _origin;
    });
  }
  return originOption(origin);
}
function createOriginHeaders(event, options) {
  const { origin: originOption } = options;
  const origin = getRequestHeader(event, "origin");
  if (!origin || !originOption || originOption === "*") {
    return { "access-control-allow-origin": "*" };
  }
  if (typeof originOption === "string") {
    return { "access-control-allow-origin": originOption, vary: "origin" };
  }
  return isCorsOriginAllowed(origin, options) ? { "access-control-allow-origin": origin, vary: "origin" } : {};
}
function createMethodsHeaders(options) {
  const { methods } = options;
  if (!methods) {
    return {};
  }
  if (methods === "*") {
    return { "access-control-allow-methods": "*" };
  }
  return methods.length > 0 ? { "access-control-allow-methods": methods.join(",") } : {};
}
function createCredentialsHeaders(options) {
  const { credentials } = options;
  if (credentials) {
    return { "access-control-allow-credentials": "true" };
  }
  return {};
}
function createAllowHeaderHeaders(event, options) {
  const { allowHeaders } = options;
  if (!allowHeaders || allowHeaders === "*" || allowHeaders.length === 0) {
    const header = getRequestHeader(event, "access-control-request-headers");
    return header ? {
      "access-control-allow-headers": header,
      vary: "access-control-request-headers"
    } : {};
  }
  return {
    "access-control-allow-headers": allowHeaders.join(","),
    vary: "access-control-request-headers"
  };
}
function createExposeHeaders(options) {
  const { exposeHeaders } = options;
  if (!exposeHeaders) {
    return {};
  }
  if (exposeHeaders === "*") {
    return { "access-control-expose-headers": exposeHeaders };
  }
  return { "access-control-expose-headers": exposeHeaders.join(",") };
}
function appendCorsPreflightHeaders(event, options) {
  appendHeaders(event, createOriginHeaders(event, options));
  appendHeaders(event, createCredentialsHeaders(options));
  appendHeaders(event, createExposeHeaders(options));
  appendHeaders(event, createMethodsHeaders(options));
  appendHeaders(event, createAllowHeaderHeaders(event, options));
}
function appendCorsHeaders(event, options) {
  appendHeaders(event, createOriginHeaders(event, options));
  appendHeaders(event, createCredentialsHeaders(options));
  appendHeaders(event, createExposeHeaders(options));
}

function handleCors(event, options) {
  const _options = resolveCorsOptions(options);
  if (isPreflightRequest(event)) {
    appendCorsPreflightHeaders(event, options);
    sendNoContent(event, _options.preflight.statusCode);
    return true;
  }
  appendCorsHeaders(event, options);
  return false;
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

const getSessionPromise = Symbol("getSession");
const DEFAULT_NAME = "h3";
const DEFAULT_COOKIE = {
  path: "/",
  secure: true,
  httpOnly: true
};
async function useSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  await getSession(event, config);
  const sessionManager = {
    get id() {
      return event.context.sessions?.[sessionName]?.id;
    },
    get data() {
      return event.context.sessions?.[sessionName]?.data || {};
    },
    update: async (update) => {
      if (!isEvent(event)) {
        throw new Error("[h3] Cannot update read-only session.");
      }
      await updateSession(event, config, update);
      return sessionManager;
    },
    clear: () => {
      if (!isEvent(event)) {
        throw new Error("[h3] Cannot clear read-only session.");
      }
      clearSession(event, config);
      return Promise.resolve(sessionManager);
    }
  };
  return sessionManager;
}
async function getSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (!event.context.sessions) {
    event.context.sessions = /* @__PURE__ */ Object.create(null);
  }
  const existingSession = event.context.sessions[sessionName];
  if (existingSession) {
    return existingSession[getSessionPromise] || existingSession;
  }
  const session = {
    id: "",
    createdAt: 0,
    data: /* @__PURE__ */ Object.create(null)
  };
  event.context.sessions[sessionName] = session;
  let sealedSession;
  if (config.sessionHeader !== false) {
    const headerName = typeof config.sessionHeader === "string" ? config.sessionHeader.toLowerCase() : `x-${sessionName.toLowerCase()}-session`;
    const headerValue = _getReqHeader(event, headerName);
    if (typeof headerValue === "string") {
      sealedSession = headerValue;
    }
  }
  if (!sealedSession) {
    const cookieHeader = _getReqHeader(event, "cookie");
    if (cookieHeader) {
      sealedSession = parse(cookieHeader + "")[sessionName];
    }
  }
  if (sealedSession) {
    const promise = unsealSession(event, config, sealedSession).catch(() => {
    }).then((unsealed) => {
      Object.assign(session, unsealed);
      delete event.context.sessions[sessionName][getSessionPromise];
      return session;
    });
    event.context.sessions[sessionName][getSessionPromise] = promise;
    await promise;
  }
  if (!session.id) {
    if (!isEvent(event)) {
      throw new Error(
        "Cannot initialize a new session. Make sure using `useSession(event)` in main handler."
      );
    }
    session.id = config.generateId?.() ?? (config.crypto || _crypto).randomUUID();
    session.createdAt = Date.now();
    await updateSession(event, config);
  }
  return session;
}
function _getReqHeader(event, name) {
  if (event.node) {
    return event.node?.req.headers[name];
  }
  if (event.request) {
    return event.request.headers?.get(name);
  }
  if (event.headers) {
    return event.headers.get(name);
  }
}
async function updateSession(event, config, update) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession(event, config);
  if (typeof update === "function") {
    update = update(session.data);
  }
  if (update) {
    Object.assign(session.data, update);
  }
  if (config.cookie !== false) {
    const sealed = await sealSession(event, config);
    setCookie(event, sessionName, sealed, {
      ...DEFAULT_COOKIE,
      expires: config.maxAge ? new Date(session.createdAt + config.maxAge * 1e3) : undefined,
      ...config.cookie
    });
  }
  return session;
}
async function sealSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  const session = event.context.sessions?.[sessionName] || await getSession(event, config);
  const sealed = await seal(config.crypto || _crypto, session, config.password, {
    ...defaults,
    ttl: config.maxAge ? config.maxAge * 1e3 : 0,
    ...config.seal
  });
  return sealed;
}
async function unsealSession(_event, config, sealed) {
  const unsealed = await unseal(
    config.crypto || _crypto,
    sealed,
    config.password,
    {
      ...defaults,
      ttl: config.maxAge ? config.maxAge * 1e3 : 0,
      ...config.seal
    }
  );
  if (config.maxAge) {
    const age = Date.now() - (unsealed.createdAt || Number.NEGATIVE_INFINITY);
    if (age > config.maxAge * 1e3) {
      throw new Error("Session expired!");
    }
  }
  return unsealed;
}
function clearSession(event, config) {
  const sessionName = config.name || DEFAULT_NAME;
  if (event.context.sessions?.[sessionName]) {
    delete event.context.sessions[sessionName];
  }
  setCookie(event, sessionName, "", {
    ...DEFAULT_COOKIE,
    ...config.cookie
  });
  return Promise.resolve();
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$4=globalThis.Headers,i$2=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$4;
const AbortController$1 = globalThis.AbortController || i$2;
createFetch({ fetch, Headers: Headers$1, AbortController: AbortController$1 });

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const appConfig$1 = {"name":"vinxi","routers":[{"name":"public","type":"static","base":"/","dir":"./public","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","order":0,"outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/public"},{"name":"ssr","type":"http","link":{"client":"client"},"handler":"src/entry-server.tsx","middleware":"src/server/middleware/auth.ts","extensions":["js","jsx","ts","tsx"],"target":"server","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","base":"/","outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/ssr","order":1},{"name":"client","type":"client","base":"/_build","handler":"src/entry-client.tsx","extensions":["js","jsx","ts","tsx"],"target":"browser","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/client","order":2},{"name":"server-fns","type":"http","base":"/_server","handler":"node_modules/.pnpm/@solidjs+start@1.1.3_@types_c357166e5d63bf088ab6dbdd23b49415/node_modules/@solidjs/start/dist/runtime/server-handler.js","middleware":"src/server/middleware/auth.ts","target":"server","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/server-fns","order":3}],"server":{"compressPublicAssets":{"brotli":true},"routeRules":{"/_build/assets/**":{"headers":{"cache-control":"public, immutable, max-age=31536000"}}},"experimental":{"asyncContext":true},"preset":"node","prerender":{"crawlLinks":true}},"root":"C:\\Users\\Matteo\\Desktop\\Pulsix"};
				const buildManifest = {"ssr":{"_ButtonSparkle-BxHzGCPC.js":{"file":"assets/ButtonSparkle-BxHzGCPC.js","name":"ButtonSparkle","css":["assets/ButtonSparkle-DtI3gbzT.css"]},"_ButtonSparkle-DtI3gbzT.css":{"file":"assets/ButtonSparkle-DtI3gbzT.css","src":"_ButtonSparkle-DtI3gbzT.css"},"_Card-BcrU3z9h.css":{"file":"assets/Card-BcrU3z9h.css","src":"_Card-BcrU3z9h.css"},"_Card.module-nMwE8ysR.js":{"file":"assets/Card.module-nMwE8ysR.js","name":"Card.module","css":["assets/Card-BcrU3z9h.css"]},"_Cursor-6qc4Ma5i.js":{"file":"assets/Cursor-6qc4Ma5i.js","name":"Cursor","css":["assets/Cursor-DUhhJVLJ.css"]},"_Cursor-DUhhJVLJ.css":{"file":"assets/Cursor-DUhhJVLJ.css","src":"_Cursor-DUhhJVLJ.css"},"_Inputs-CUihbr1a.css":{"file":"assets/Inputs-CUihbr1a.css","src":"_Inputs-CUihbr1a.css"},"_Inputs-D1T1pLkj.js":{"file":"assets/Inputs-D1T1pLkj.js","name":"Inputs","imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js"],"css":["assets/Inputs-CUihbr1a.css"]},"_Menu-CWXr7U88.js":{"file":"assets/Menu-CWXr7U88.js","name":"Menu","imports":["_components-DHKGOKg1.js"],"css":["assets/Menu-DSzeyodt.css"]},"_Menu-DSzeyodt.css":{"file":"assets/Menu-DSzeyodt.css","src":"_Menu-DSzeyodt.css"},"_Title-C8lsFfVd.js":{"file":"assets/Title-C8lsFfVd.js","name":"Title"},"_action-BR9kmesq.js":{"file":"assets/action-BR9kmesq.js","name":"action","imports":["_routing-BRXp7sqN.js"]},"_auth-BeHg-fWi.js":{"file":"assets/auth-BeHg-fWi.js","name":"auth"},"_auth.server-ChqlnWrh.js":{"file":"assets/auth.server-ChqlnWrh.js","name":"auth.server","imports":["_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js"]},"_components-DHKGOKg1.js":{"file":"assets/components-DHKGOKg1.js","name":"components","imports":["_routing-BRXp7sqN.js"]},"_context-5bbmmXgY.js":{"file":"assets/context-5bbmmXgY.js","name":"context"},"_context-XUFMQc9R.js":{"file":"assets/context-XUFMQc9R.js","name":"context"},"_db.server-CDeyn5Z_.js":{"file":"assets/db.server-CDeyn5Z_.js","name":"db.server"},"_deleteWallet-Bheg3455.css":{"file":"assets/deleteWallet-Bheg3455.css","src":"_deleteWallet-Bheg3455.css"},"_deleteWallet-Cgff9KFR.js":{"file":"assets/deleteWallet-Cgff9KFR.js","name":"deleteWallet","imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js"],"css":["assets/deleteWallet-Bheg3455.css"]},"_exchangeRates-BGrzYQig.js":{"file":"assets/exchangeRates-BGrzYQig.js","name":"exchangeRates","imports":["_Card.module-nMwE8ysR.js","_components-DHKGOKg1.js","_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js"],"css":["assets/exchangeRates-BMINihpv.css"]},"_exchangeRates-BMINihpv.css":{"file":"assets/exchangeRates-BMINihpv.css","src":"_exchangeRates-BMINihpv.css"},"_fetchEvent-9EzSf9d7.js":{"file":"assets/fetchEvent-9EzSf9d7.js","name":"fetchEvent"},"_getWallets.server-C5R6kBVO.js":{"file":"assets/getWallets.server-C5R6kBVO.js","name":"getWallets.server","imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js"]},"_icons-Bh8061KW.css":{"file":"assets/icons-Bh8061KW.css","src":"_icons-Bh8061KW.css"},"_icons-N8M97GAt.js":{"file":"assets/icons-N8M97GAt.js","name":"icons","css":["assets/icons-Bh8061KW.css"]},"_index-0U8vmGbf.js":{"file":"assets/index-0U8vmGbf.js","name":"index","imports":["_prova-B1NEQR2_.js","_index-D0aODT57.js","_components-DHKGOKg1.js","_Inputs-D1T1pLkj.js","_deleteWallet-Cgff9KFR.js","_ButtonSparkle-BxHzGCPC.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"_index-B8s1itkY.js":{"file":"assets/index-B8s1itkY.js","name":"index","css":["assets/index-CXQF54bi.css"]},"_index-BQH3GIDW.js":{"file":"assets/index-BQH3GIDW.js","name":"index","imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js"],"css":["assets/index-Ky9zR5dV.css"]},"_index-BUMPztWr.css":{"file":"assets/index-BUMPztWr.css","src":"_index-BUMPztWr.css"},"_index-C1h2BJ6l.css":{"file":"assets/index-C1h2BJ6l.css","src":"_index-C1h2BJ6l.css"},"_index-CI1g57kZ.js":{"file":"assets/index-CI1g57kZ.js","name":"index","imports":["_icons-N8M97GAt.js"]},"_index-CXQF54bi.css":{"file":"assets/index-CXQF54bi.css","src":"_index-CXQF54bi.css"},"_index-ClXKiMUD.js":{"file":"assets/index-ClXKiMUD.js","name":"index"},"_index-D0aODT57.js":{"file":"assets/index-D0aODT57.js","name":"index","imports":["_exchangeRates-BGrzYQig.js","_auth.server-ChqlnWrh.js","_components-DHKGOKg1.js"]},"_index-DoUIxqk_.css":{"file":"assets/index-DoUIxqk_.css","src":"_index-DoUIxqk_.css"},"_index-Ky9zR5dV.css":{"file":"assets/index-Ky9zR5dV.css","src":"_index-Ky9zR5dV.css"},"_index.module-0iUivGU7.js":{"file":"assets/index.module-0iUivGU7.js","name":"index.module","css":["assets/index-BUMPztWr.css","assets/riv-VPAlW_cg.css"]},"_index.module-B9JvMj-k.js":{"file":"assets/index.module-B9JvMj-k.js","name":"index.module","css":["assets/index-C1h2BJ6l.css"]},"_otpInput-DH-dkh0p.js":{"file":"assets/otpInput-DH-dkh0p.js","name":"otpInput","imports":["_index-CI1g57kZ.js","_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_Inputs-D1T1pLkj.js","_ButtonSparkle-BxHzGCPC.js"],"css":["assets/otpInput-tBTztLmB.css"]},"_otpInput-tBTztLmB.css":{"file":"assets/otpInput-tBTztLmB.css","src":"_otpInput-tBTztLmB.css"},"_pathWallets-Cb2AeUiP.js":{"file":"assets/pathWallets-Cb2AeUiP.js","name":"pathWallets","imports":["_Inputs-D1T1pLkj.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js"]},"_prova-B1NEQR2_.js":{"file":"assets/prova-B1NEQR2_.js","name":"prova","imports":["_components-DHKGOKg1.js"]},"_response-CbUr9JDj.js":{"file":"assets/response-CbUr9JDj.js","name":"response"},"_riv-VPAlW_cg.css":{"file":"assets/riv-VPAlW_cg.css","src":"_riv-VPAlW_cg.css"},"_routing-BRXp7sqN.js":{"file":"assets/routing-BRXp7sqN.js","name":"routing"},"_server-fns-runtime-C3tiYEg6.js":{"file":"assets/server-fns-runtime-C3tiYEg6.js","name":"server-fns-runtime","imports":["_fetchEvent-9EzSf9d7.js"]},"_utils-CmG_3rtr.js":{"file":"assets/utils-CmG_3rtr.js","name":"utils","imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js"]},"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx":{"file":"assets/index-WwoiZKEg.js","name":"index","src":"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx","isDynamicEntry":true},"src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css":{"file":"index4.js","name":"index","src":"src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_Menu-CWXr7U88.js","_auth-BeHg-fWi.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_components-DHKGOKg1.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css":{"file":"index24.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-5bbmmXgY.js","_ButtonSparkle-BxHzGCPC.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css":{"file":"index26.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css":{"file":"index25.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_auth-BeHg-fWi.js","_ButtonSparkle-BxHzGCPC.js","_context-5bbmmXgY.js","_index-B8s1itkY.js","_Inputs-D1T1pLkj.js","_pathWallets-Cb2AeUiP.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css":{"file":"index18.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-5bbmmXgY.js","_auth-BeHg-fWi.js","_ButtonSparkle-BxHzGCPC.js","_index-B8s1itkY.js","_Inputs-D1T1pLkj.js","_pathWallets-Cb2AeUiP.js","_Menu-CWXr7U88.js","_index-ClXKiMUD.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js","_components-DHKGOKg1.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css":{"file":"index23.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_auth-BeHg-fWi.js","_context-5bbmmXgY.js","_ButtonSparkle-BxHzGCPC.js","_index-ClXKiMUD.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css":{"file":"index19.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-XUFMQc9R.js","_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_Menu-CWXr7U88.js","_pathWallets-Cb2AeUiP.js","_components-DHKGOKg1.js","_routing-BRXp7sqN.js","_Inputs-D1T1pLkj.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css":{"file":"mapper.js","name":"mapper","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css":{"file":"preview.js","name":"preview","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-XUFMQc9R.js","_ButtonSparkle-BxHzGCPC.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css":{"file":"uploadFile2.js","name":"uploadFile","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_context-XUFMQc9R.js"]},"src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css":{"file":"index5.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_Menu-CWXr7U88.js","_auth-BeHg-fWi.js","_pathWallets-Cb2AeUiP.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_components-DHKGOKg1.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js"]},"src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css":{"file":"pathWallets.js","name":"pathWallets","src":"src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-D1T1pLkj.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js"]},"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css":{"file":"index6.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_Menu-CWXr7U88.js","_auth-BeHg-fWi.js","_routing-BRXp7sqN.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_components-DHKGOKg1.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css":{"file":"index10.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_Title-C8lsFfVd.js","_index-CI1g57kZ.js","_index.module-B9JvMj-k.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css":{"file":"index11.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_otpInput-DH-dkh0p.js","_index-CI1g57kZ.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css":{"file":"index12.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-DH-dkh0p.js","_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_index-CI1g57kZ.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css":{"file":"sendOtp.js","name":"sendOtp","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-DH-dkh0p.js","_Inputs-D1T1pLkj.js","_index-CI1g57kZ.js","_icons-N8M97GAt.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_ButtonSparkle-BxHzGCPC.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css":{"file":"index20.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css":{"file":"otpInput.js","name":"otpInput","src":"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-DH-dkh0p.js","_index-CI1g57kZ.js","_Inputs-D1T1pLkj.js","_action-BR9kmesq.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_ButtonSparkle-BxHzGCPC.js","_icons-N8M97GAt.js","_routing-BRXp7sqN.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css":{"file":"index21.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css":{"file":"index7.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-CWXr7U88.js","_index-CI1g57kZ.js","_ButtonSparkle-BxHzGCPC.js","_Inputs-D1T1pLkj.js","_Title-C8lsFfVd.js","_index.module-B9JvMj-k.js","_otpInput-DH-dkh0p.js","_Cursor-6qc4Ma5i.js","_components-DHKGOKg1.js","_routing-BRXp7sqN.js","_icons-N8M97GAt.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js"],"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css":{"file":"Toggle.js","name":"Toggle","src":"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index.module-0iUivGU7.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css":{"file":"index2.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-CWXr7U88.js","_index.module-0iUivGU7.js","_ButtonSparkle-BxHzGCPC.js","_routing-BRXp7sqN.js","_components-DHKGOKg1.js"],"css":["assets/index-DgiZenf7.css","assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css":{"file":"riv.js","name":"riv","src":"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css":{"file":"index22.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css":{"file":"index8.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-BQH3GIDW.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css":{"file":"_...slug_.js","name":"_...slug_","src":"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js","_prova-B1NEQR2_.js","_index-D0aODT57.js","_exchangeRates-BGrzYQig.js","_index-0U8vmGbf.js","_index-BQH3GIDW.js","_deleteWallet-Cgff9KFR.js","_routing-BRXp7sqN.js","_Inputs-D1T1pLkj.js","_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_components-DHKGOKg1.js","_Card.module-nMwE8ysR.js","_action-BR9kmesq.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css","assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css":{"file":"index14.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_prova-B1NEQR2_.js","_index-D0aODT57.js","_components-DHKGOKg1.js","_exchangeRates-BGrzYQig.js","_Card.module-nMwE8ysR.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_auth.server-ChqlnWrh.js","_routing-BRXp7sqN.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css":{"file":"index15.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_routing-BRXp7sqN.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css":{"file":"preLoader.js","name":"preLoader","src":"src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css":{"file":"index17.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-D1T1pLkj.js","_deleteWallet-Cgff9KFR.js","_index-D0aODT57.js","_ButtonSparkle-BxHzGCPC.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_exchangeRates-BGrzYQig.js","_Card.module-nMwE8ysR.js","_components-DHKGOKg1.js","_auth.server-ChqlnWrh.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css":{"file":"index13.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-D1T1pLkj.js","_index-D0aODT57.js","_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_action-BR9kmesq.js","_routing-BRXp7sqN.js","_exchangeRates-BGrzYQig.js","_Card.module-nMwE8ysR.js","_components-DHKGOKg1.js","_auth.server-ChqlnWrh.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css":{"file":"Card.js","name":"Card","src":"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Card.module-nMwE8ysR.js","_components-DHKGOKg1.js","_routing-BRXp7sqN.js"]},"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css":{"file":"index16.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_exchangeRates-BGrzYQig.js","_auth.server-ChqlnWrh.js","_components-DHKGOKg1.js","_Card.module-nMwE8ysR.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_routing-BRXp7sqN.js"]},"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css":{"file":"index3.js","name":"index","src":"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_getWallets.server-C5R6kBVO.js","_auth.server-ChqlnWrh.js","_index-0U8vmGbf.js","_index-D0aODT57.js","_exchangeRates-BGrzYQig.js","_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_prova-B1NEQR2_.js","_components-DHKGOKg1.js","_routing-BRXp7sqN.js","_Inputs-D1T1pLkj.js","_action-BR9kmesq.js","_deleteWallet-Cgff9KFR.js","_ButtonSparkle-BxHzGCPC.js","_Card.module-nMwE8ysR.js"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/API/Auth/login/index.ts?pick=POST":{"file":"index9.js","name":"index","src":"src/routes/API/Auth/login/index.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_utils-CmG_3rtr.js","_response-CbUr9JDj.js","_server-fns-runtime-C3tiYEg6.js"]},"src/routes/API/Auth/logout.ts?pick=POST":{"file":"logout.js","name":"logout","src":"src/routes/API/Auth/logout.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_auth.server-ChqlnWrh.js","_response-CbUr9JDj.js","_server-fns-runtime-C3tiYEg6.js"]},"src/routes/API/Auth/refresh.ts?pick=POST":{"file":"refresh.js","name":"refresh","src":"src/routes/API/Auth/refresh.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_utils-CmG_3rtr.js","_response-CbUr9JDj.js","_server-fns-runtime-C3tiYEg6.js"]},"src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST":{"file":"addTransaction2.js","name":"addTransaction","src":"src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_auth.server-ChqlnWrh.js","_response-CbUr9JDj.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST":{"file":"addTransactions.js","name":"addTransactions","src":"src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST":{"file":"uploadFile.js","name":"uploadFile","src":"src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css":{"file":"getTransactions.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/Wallets/addWallet.ts?pick=POST":{"file":"addWallet.js","name":"addWallet","src":"src/routes/API/Wallets/addWallet.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css":{"file":"deleteWallet.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/lib/addTransaction.ts?pick=POST":{"file":"addTransaction.js","name":"addTransaction","src":"src/routes/API/lib/addTransaction.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/API/lib/getWalletsPaths.ts?pick=POST":{"file":"getWalletsPaths.js","name":"getWalletsPaths","src":"src/routes/API/lib/getWalletsPaths.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_auth.server-ChqlnWrh.js","_getWallets.server-C5R6kBVO.js","_response-CbUr9JDj.js","_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js"]},"src/routes/API/prova.ts?pick=POST":{"file":"prova.js","name":"prova","src":"src/routes/API/prova.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-C3tiYEg6.js","_response-CbUr9JDj.js","_fetchEvent-9EzSf9d7.js"]},"src/routes/UI/Cursor.tsx?pick=default&pick=$css":{"file":"Cursor.js","name":"Cursor","src":"src/routes/UI/Cursor.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/UI/Loading.tsx?pick=default&pick=$css":{"file":"Loading.js","name":"Loading","src":"src/routes/UI/Loading.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/UI/Waves.tsx?pick=default&pick=$css":{"file":"Waves.js","name":"Waves","src":"src/routes/UI/Waves.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/[...404].tsx?pick=default&pick=$css":{"file":"_...404_.js","name":"_...404_","src":"src/routes/[...404].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Menu-CWXr7U88.js","_components-DHKGOKg1.js","_routing-BRXp7sqN.js"],"css":["assets/_..-D39vbXZ9.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-CWXr7U88.js","_components-DHKGOKg1.js","_routing-BRXp7sqN.js"]},"virtual:$vinxi/handler/ssr":{"file":"ssr.js","name":"ssr","src":"virtual:$vinxi/handler/ssr","isEntry":true,"imports":["_fetchEvent-9EzSf9d7.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_Menu-CWXr7U88.js","_Cursor-6qc4Ma5i.js","_auth-BeHg-fWi.js","_routing-BRXp7sqN.js","_action-BR9kmesq.js","_components-DHKGOKg1.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/API/prova.ts?pick=POST","src/routes/API/prova.ts?pick=POST","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Loading.tsx?pick=default&pick=$css","src/routes/UI/Loading.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/API/Auth/logout.ts?pick=POST","src/routes/API/Auth/logout.ts?pick=POST","src/routes/API/Auth/refresh.ts?pick=POST","src/routes/API/Auth/refresh.ts?pick=POST","src/routes/API/lib/addTransaction.ts?pick=POST","src/routes/API/lib/addTransaction.ts?pick=POST","src/routes/API/lib/getWalletsPaths.ts?pick=POST","src/routes/API/lib/getWalletsPaths.ts?pick=POST","src/routes/API/Wallets/addWallet.ts?pick=POST","src/routes/API/Wallets/addWallet.ts?pick=POST","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/API/Auth/login/index.ts?pick=POST","src/routes/API/Auth/login/index.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST","src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css"],"css":["assets/ssr-DNeOnZgp.css","assets/Cursor-DUhhJVLJ.css"]}},"client":{"_ButtonSparkle-B8MvXRxa.js":{"file":"assets/ButtonSparkle-B8MvXRxa.js","name":"ButtonSparkle","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_store-EkIb7068.js"],"css":["assets/ButtonSparkle-DtI3gbzT.css"]},"_ButtonSparkle-DtI3gbzT.css":{"file":"assets/ButtonSparkle-DtI3gbzT.css","src":"_ButtonSparkle-DtI3gbzT.css"},"_Card-BcrU3z9h.css":{"file":"assets/Card-BcrU3z9h.css","src":"_Card-BcrU3z9h.css"},"_Card.module-nMwE8ysR.js":{"file":"assets/Card.module-nMwE8ysR.js","name":"Card.module","css":["assets/Card-BcrU3z9h.css"]},"_Cursor-DO_Peo8w.js":{"file":"assets/Cursor-DO_Peo8w.js","name":"Cursor","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/Cursor-DUhhJVLJ.css"]},"_Cursor-DUhhJVLJ.css":{"file":"assets/Cursor-DUhhJVLJ.css","src":"_Cursor-DUhhJVLJ.css"},"_Inputs-CUihbr1a.css":{"file":"assets/Inputs-CUihbr1a.css","src":"_Inputs-CUihbr1a.css"},"_Inputs-DcqJwVVk.js":{"file":"assets/Inputs-DcqJwVVk.js","name":"Inputs","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js"],"css":["assets/Inputs-CUihbr1a.css"]},"_Menu-CJHi8x7g.js":{"file":"assets/Menu-CJHi8x7g.js","name":"Menu","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_components-BSHtZ-Zq.js"],"css":["assets/Menu-DSzeyodt.css"]},"_Menu-DSzeyodt.css":{"file":"assets/Menu-DSzeyodt.css","src":"_Menu-DSzeyodt.css"},"_Title-CrVuX5YX.js":{"file":"assets/Title-CrVuX5YX.js","name":"Title","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"]},"_action-Dtdjs7R9.js":{"file":"assets/action-Dtdjs7R9.js","name":"action","imports":["_solid-DuWri35y.js","_routing-CrKy3yVb.js"]},"_auth-B7ef8sb9.js":{"file":"assets/auth-B7ef8sb9.js","name":"auth","imports":["_solid-DuWri35y.js","_store-EkIb7068.js","_index-Ckjqp3wL.js"]},"_auth.server-BY2lFEoQ.js":{"file":"assets/auth.server-BY2lFEoQ.js","name":"auth.server","imports":["_server-runtime-G1njbCYf.js"]},"_components-BSHtZ-Zq.js":{"file":"assets/components-BSHtZ-Zq.js","name":"components","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_routing-CrKy3yVb.js"]},"_context-DGrJV8BX.js":{"file":"assets/context-DGrJV8BX.js","name":"context","imports":["_store-EkIb7068.js"]},"_context-DTlNXViu.js":{"file":"assets/context-DTlNXViu.js","name":"context","imports":["_store-EkIb7068.js"]},"_deleteWallet-Bheg3455.css":{"file":"assets/deleteWallet-Bheg3455.css","src":"_deleteWallet-Bheg3455.css"},"_deleteWallet-DZXYhnFv.js":{"file":"assets/deleteWallet-DZXYhnFv.js","name":"deleteWallet","imports":["_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js"],"css":["assets/deleteWallet-Bheg3455.css"]},"_exchangeRates-BMINihpv.css":{"file":"assets/exchangeRates-BMINihpv.css","src":"_exchangeRates-BMINihpv.css"},"_exchangeRates-BrUJ_eQB.js":{"file":"assets/exchangeRates-BrUJ_eQB.js","name":"exchangeRates","imports":["_web-DpIebe6J.js","_Card.module-nMwE8ysR.js","_solid-DuWri35y.js","_components-BSHtZ-Zq.js","_server-runtime-G1njbCYf.js"],"css":["assets/exchangeRates-BMINihpv.css"]},"_getWallets.server-rCnpGkki.js":{"file":"assets/getWallets.server-rCnpGkki.js","name":"getWallets.server","imports":["_server-runtime-G1njbCYf.js"]},"_howler-DGkKYxeN.js":{"file":"assets/howler-DGkKYxeN.js","name":"howler","isDynamicEntry":true},"_icons-Bh8061KW.css":{"file":"assets/icons-Bh8061KW.css","src":"_icons-Bh8061KW.css"},"_icons-DnmAahPX.js":{"file":"assets/icons-DnmAahPX.js","name":"icons","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/icons-Bh8061KW.css"]},"_index-2EPzZQ-a.js":{"file":"assets/index-2EPzZQ-a.js","name":"index","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_exchangeRates-BrUJ_eQB.js","_auth.server-BY2lFEoQ.js","_components-BSHtZ-Zq.js"]},"_index-BAMY2Nnw.js":{"file":"assets/index-BAMY2Nnw.js","name":"index"},"_index-BRALuBVh.js":{"file":"assets/index-BRALuBVh.js","name":"index","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/index-CXQF54bi.css"]},"_index-BUMPztWr.css":{"file":"assets/index-BUMPztWr.css","src":"_index-BUMPztWr.css"},"_index-BbP3371Q.js":{"file":"assets/index-BbP3371Q.js","name":"index"},"_index-BfCmSeNt.js":{"file":"assets/index-BfCmSeNt.js","name":"index","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_icons-DnmAahPX.js"]},"_index-C1h2BJ6l.css":{"file":"assets/index-C1h2BJ6l.css","src":"_index-C1h2BJ6l.css"},"_index-CXQF54bi.css":{"file":"assets/index-CXQF54bi.css","src":"_index-CXQF54bi.css"},"_index-CgqXENQe.js":{"file":"assets/index-CgqXENQe.js","name":"index"},"_index-Ckjqp3wL.js":{"file":"assets/index-Ckjqp3wL.js","name":"index","imports":["_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"]},"_index-ClXKiMUD.js":{"file":"assets/index-ClXKiMUD.js","name":"index"},"_index-DMu-c7m6.js":{"file":"assets/index-DMu-c7m6.js","name":"index","imports":["_server-runtime-G1njbCYf.js","_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/index-Ky9zR5dV.css"]},"_index-DlIjekMf.js":{"file":"assets/index-DlIjekMf.js","name":"index","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_prova-m-C6m0c_.js","_index-2EPzZQ-a.js","_components-BSHtZ-Zq.js","_preload-helper-CM3UJVvY.js","_Inputs-DcqJwVVk.js","_deleteWallet-DZXYhnFv.js","_ButtonSparkle-B8MvXRxa.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"_index-DoUIxqk_.css":{"file":"assets/index-DoUIxqk_.css","src":"_index-DoUIxqk_.css"},"_index-Ky9zR5dV.css":{"file":"assets/index-Ky9zR5dV.css","src":"_index-Ky9zR5dV.css"},"_index.module-B9JvMj-k.js":{"file":"assets/index.module-B9JvMj-k.js","name":"index.module","css":["assets/index-C1h2BJ6l.css"]},"_index.module-CDuGKsjp.js":{"file":"assets/index.module-CDuGKsjp.js","name":"index.module","imports":["_preload-helper-CM3UJVvY.js","_web-DpIebe6J.js","_solid-DuWri35y.js"],"dynamicImports":["_rive-D3j5nBow.js"],"css":["assets/index-BUMPztWr.css","assets/riv-VPAlW_cg.css"]},"_otpInput-BXc_Jx1f.js":{"file":"assets/otpInput-BXc_Jx1f.js","name":"otpInput","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_index-BfCmSeNt.js","_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_Inputs-DcqJwVVk.js","_ButtonSparkle-B8MvXRxa.js"],"css":["assets/otpInput-tBTztLmB.css"]},"_otpInput-tBTztLmB.css":{"file":"assets/otpInput-tBTztLmB.css","src":"_otpInput-tBTztLmB.css"},"_pathWallets-V9UfGynM.js":{"file":"assets/pathWallets-V9UfGynM.js","name":"pathWallets","imports":["_solid-DuWri35y.js","_Inputs-DcqJwVVk.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js"]},"_preload-helper-CM3UJVvY.js":{"file":"assets/preload-helper-CM3UJVvY.js","name":"preload-helper"},"_prova-m-C6m0c_.js":{"file":"assets/prova-m-C6m0c_.js","name":"prova","imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_components-BSHtZ-Zq.js"]},"_riv-VPAlW_cg.css":{"file":"assets/riv-VPAlW_cg.css","src":"_riv-VPAlW_cg.css"},"_rive-D3j5nBow.js":{"file":"assets/rive-D3j5nBow.js","name":"rive","isDynamicEntry":true},"_routing-CrKy3yVb.js":{"file":"assets/routing-CrKy3yVb.js","name":"routing","imports":["_solid-DuWri35y.js","_web-DpIebe6J.js"]},"_server-runtime-G1njbCYf.js":{"file":"assets/server-runtime-G1njbCYf.js","name":"server-runtime","imports":["_index-BbP3371Q.js"]},"_solid-DuWri35y.js":{"file":"assets/solid-DuWri35y.js","name":"solid"},"_store-EkIb7068.js":{"file":"assets/store-EkIb7068.js","name":"store","imports":["_solid-DuWri35y.js"]},"_web-DpIebe6J.js":{"file":"assets/web-DpIebe6J.js","name":"web","imports":["_solid-DuWri35y.js"]},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/boolean.js":{"file":"assets/boolean-CynEgfvK.js","name":"boolean","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/boolean.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/gaussian-splat-compression.js":{"file":"assets/gaussian-splat-compression-CYQZ50o2.js","name":"gaussian-splat-compression","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/gaussian-splat-compression.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/navmesh.js":{"file":"assets/navmesh-BFd9Mv4x.js","name":"navmesh","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/navmesh.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/opentype.js":{"file":"assets/opentype-Cqw9bO2A.js","name":"opentype","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/opentype.js","isDynamicEntry":true,"imports":["_index-CgqXENQe.js"]},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/physics.js":{"file":"assets/physics-BM4kW-A5.js","name":"physics","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/physics.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/process.js":{"file":"assets/process-DLQUZ-E7.js","name":"process","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/process.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/runtime.js":{"file":"assets/runtime-DddzEQ-t.js","name":"runtime","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/runtime.js","isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"],"dynamicImports":["node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/navmesh.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/physics.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/process.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/boolean.js","_howler-DGkKYxeN.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/opentype.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/ui.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/gaussian-splat-compression.js"]},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/ui.js":{"file":"assets/ui-BkqLVz6I.js","name":"ui","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/ui.js","isDynamicEntry":true,"imports":["_index-BAMY2Nnw.js","_index-BbP3371Q.js"]},"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx":{"file":"assets/index-CUsCLhUq.js","name":"index","src":"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx","isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"]},"node_modules/.pnpm/pulsix@1.0.5/node_modules/pulsix/dist/index.mjs":{"file":"assets/index-Bgm9oum8.js","name":"index","src":"node_modules/.pnpm/pulsix@1.0.5/node_modules/pulsix/dist/index.mjs","isDynamicEntry":true},"src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css":{"file":"assets/index-zMTDNupI.js","name":"index","src":"src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_Menu-CJHi8x7g.js","_auth-B7ef8sb9.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_components-BSHtZ-Zq.js","_index-Ckjqp3wL.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css":{"file":"assets/index-D-O5xXRO.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_context-DTlNXViu.js","_ButtonSparkle-B8MvXRxa.js","_store-EkIb7068.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css":{"file":"assets/index-BW8DZTAt.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css":{"file":"assets/index-BpAElWHd.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_auth-B7ef8sb9.js","_ButtonSparkle-B8MvXRxa.js","_context-DTlNXViu.js","_index-BRALuBVh.js","_Inputs-DcqJwVVk.js","_pathWallets-V9UfGynM.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css":{"file":"assets/index-D2XrvAPe.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_context-DTlNXViu.js","_auth-B7ef8sb9.js","_ButtonSparkle-B8MvXRxa.js","_index-BRALuBVh.js","_Inputs-DcqJwVVk.js","_pathWallets-V9UfGynM.js","_Menu-CJHi8x7g.js","_index-ClXKiMUD.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js","_components-BSHtZ-Zq.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css":{"file":"assets/index-CqIoCKR7.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_auth-B7ef8sb9.js","_context-DTlNXViu.js","_ButtonSparkle-B8MvXRxa.js","_index-ClXKiMUD.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css":{"file":"assets/index-DRPEoOjA.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_context-DGrJV8BX.js","_ButtonSparkle-B8MvXRxa.js","_auth-B7ef8sb9.js","_Menu-CJHi8x7g.js","_pathWallets-V9UfGynM.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_components-BSHtZ-Zq.js","_routing-CrKy3yVb.js","_Inputs-DcqJwVVk.js","_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css":{"file":"assets/mapper-kaoi3FZI.js","name":"mapper","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_auth-B7ef8sb9.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css":{"file":"assets/preview-BRVtXxkA.js","name":"preview","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_context-DGrJV8BX.js","_ButtonSparkle-B8MvXRxa.js","_store-EkIb7068.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css":{"file":"assets/uploadFile-e91vKR2f.js","name":"uploadFile","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_auth-B7ef8sb9.js","_context-DGrJV8BX.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"]},"src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css":{"file":"assets/index-Cpvdl1_Z.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_Menu-CJHi8x7g.js","_auth-B7ef8sb9.js","_pathWallets-V9UfGynM.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_components-BSHtZ-Zq.js","_index-Ckjqp3wL.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js"]},"src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css":{"file":"assets/pathWallets-D-WeUJvi.js","name":"pathWallets","src":"src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_solid-DuWri35y.js","_Inputs-DcqJwVVk.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js","_web-DpIebe6J.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js"]},"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css":{"file":"assets/index-mWsjIETT.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_Menu-CJHi8x7g.js","_auth-B7ef8sb9.js","_routing-CrKy3yVb.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_components-BSHtZ-Zq.js","_index-Ckjqp3wL.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css":{"file":"assets/index-up4Kgwa4.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_Title-CrVuX5YX.js","_index-BfCmSeNt.js","_index.module-B9JvMj-k.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_icons-DnmAahPX.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css":{"file":"assets/index-ByKdYTe1.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_index-Ckjqp3wL.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_otpInput-BXc_Jx1f.js","_index-BfCmSeNt.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_icons-DnmAahPX.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css":{"file":"assets/index-CU71wIRV.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_otpInput-BXc_Jx1f.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_index-BfCmSeNt.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_index-BAMY2Nnw.js","_store-EkIb7068.js","_icons-DnmAahPX.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css":{"file":"assets/sendOtp-B16Bte8J.js","name":"sendOtp","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-BXc_Jx1f.js","_solid-DuWri35y.js","_Inputs-DcqJwVVk.js","_web-DpIebe6J.js","_index-BfCmSeNt.js","_icons-DnmAahPX.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_index-BAMY2Nnw.js","_ButtonSparkle-B8MvXRxa.js","_store-EkIb7068.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css":{"file":"assets/index-Bw6v0jkr.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_icons-DnmAahPX.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css":{"file":"assets/otpInput-DgJmMvXt.js","name":"otpInput","src":"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_otpInput-BXc_Jx1f.js","_index-BfCmSeNt.js","_Inputs-DcqJwVVk.js","_action-Dtdjs7R9.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_ButtonSparkle-B8MvXRxa.js","_store-EkIb7068.js","_icons-DnmAahPX.js","_routing-CrKy3yVb.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css":{"file":"assets/index-P9OTGdMZ.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"]},"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css":{"file":"assets/index-DfP9MmXu.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_Menu-CJHi8x7g.js","_index-BfCmSeNt.js","_ButtonSparkle-B8MvXRxa.js","_Inputs-DcqJwVVk.js","_Title-CrVuX5YX.js","_index.module-B9JvMj-k.js","_index-Ckjqp3wL.js","_otpInput-BXc_Jx1f.js","_Cursor-DO_Peo8w.js","_components-BSHtZ-Zq.js","_routing-CrKy3yVb.js","_icons-DnmAahPX.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"],"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css":{"file":"assets/Toggle-BGJW_lEq.js","name":"Toggle","src":"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_index.module-CDuGKsjp.js","_solid-DuWri35y.js","_preload-helper-CM3UJVvY.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css":{"file":"assets/index-A-Vt54g-.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_Menu-CJHi8x7g.js","_index.module-CDuGKsjp.js","_ButtonSparkle-B8MvXRxa.js","_routing-CrKy3yVb.js","_components-BSHtZ-Zq.js","_preload-helper-CM3UJVvY.js","_store-EkIb7068.js"],"css":["assets/index-DgiZenf7.css","assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css":{"file":"assets/riv-DDjZvLrC.js","name":"riv","src":"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_web-DpIebe6J.js","_solid-DuWri35y.js"],"dynamicImports":["_rive-D3j5nBow.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css":{"file":"assets/index-BjjMb_tW.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css":{"file":"assets/index-CT-ACOGi.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_index-DMu-c7m6.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css":{"file":"assets/_...slug_-91RaIqCy.js","name":"_...slug_","src":"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_Title-CrVuX5YX.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js","_index-DlIjekMf.js","_index-2EPzZQ-a.js","_exchangeRates-BrUJ_eQB.js","_index-DMu-c7m6.js","_deleteWallet-DZXYhnFv.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/runtime.js","_routing-CrKy3yVb.js","_preload-helper-CM3UJVvY.js","_Inputs-DcqJwVVk.js","_ButtonSparkle-B8MvXRxa.js","_auth-B7ef8sb9.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_prova-m-C6m0c_.js","_components-BSHtZ-Zq.js","_Card.module-nMwE8ysR.js","_action-Dtdjs7R9.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_store-EkIb7068.js","_index-Ckjqp3wL.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css","assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css":{"file":"assets/index-DzzmI9Kt.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_prova-m-C6m0c_.js","_index-2EPzZQ-a.js","_components-BSHtZ-Zq.js","_exchangeRates-BrUJ_eQB.js","_Card.module-nMwE8ysR.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_auth.server-BY2lFEoQ.js","_routing-CrKy3yVb.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css":{"file":"assets/index-C94uOdMp.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/runtime.js","_index-2EPzZQ-a.js","_routing-CrKy3yVb.js","_preload-helper-CM3UJVvY.js","_index-BbP3371Q.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js","_exchangeRates-BrUJ_eQB.js","_Card.module-nMwE8ysR.js","_components-BSHtZ-Zq.js","_server-runtime-G1njbCYf.js","_auth.server-BY2lFEoQ.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css":{"file":"assets/preLoader-Bq1ReClI.js","name":"preLoader","src":"src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_solid-DuWri35y.js"],"dynamicImports":["node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/runtime.js"]},"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css":{"file":"assets/index-msd---qR.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_web-DpIebe6J.js","_solid-DuWri35y.js","_Inputs-DcqJwVVk.js","_deleteWallet-DZXYhnFv.js","_index-2EPzZQ-a.js","_ButtonSparkle-B8MvXRxa.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_exchangeRates-BrUJ_eQB.js","_Card.module-nMwE8ysR.js","_components-BSHtZ-Zq.js","_auth.server-BY2lFEoQ.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css":{"file":"assets/index-vlmjMqrb.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_web-DpIebe6J.js","_solid-DuWri35y.js","_Inputs-DcqJwVVk.js","_index-2EPzZQ-a.js","_ButtonSparkle-B8MvXRxa.js","_auth-B7ef8sb9.js","_store-EkIb7068.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_action-Dtdjs7R9.js","_routing-CrKy3yVb.js","_exchangeRates-BrUJ_eQB.js","_Card.module-nMwE8ysR.js","_components-BSHtZ-Zq.js","_auth.server-BY2lFEoQ.js","_index-Ckjqp3wL.js","_index-BAMY2Nnw.js","_index-CgqXENQe.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css":{"file":"assets/Card-hkPR8m6t.js","name":"Card","src":"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_Card.module-nMwE8ysR.js","_solid-DuWri35y.js","_components-BSHtZ-Zq.js","_routing-CrKy3yVb.js"]},"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css":{"file":"assets/index-DcotjcWv.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_exchangeRates-BrUJ_eQB.js","_auth.server-BY2lFEoQ.js","_components-BSHtZ-Zq.js","_Card.module-nMwE8ysR.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_routing-CrKy3yVb.js"]},"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css":{"file":"assets/index-FfPpJL1_.js","name":"index","src":"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_Title-CrVuX5YX.js","_getWallets.server-rCnpGkki.js","_auth.server-BY2lFEoQ.js","_index-DlIjekMf.js","_index-2EPzZQ-a.js","_exchangeRates-BrUJ_eQB.js","_server-runtime-G1njbCYf.js","_index-BbP3371Q.js","_prova-m-C6m0c_.js","_components-BSHtZ-Zq.js","_routing-CrKy3yVb.js","_preload-helper-CM3UJVvY.js","_Inputs-DcqJwVVk.js","_store-EkIb7068.js","_action-Dtdjs7R9.js","_deleteWallet-DZXYhnFv.js","_ButtonSparkle-B8MvXRxa.js","_Card.module-nMwE8ysR.js"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css":{"file":"assets/getTransactions-DceW4eCM.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-runtime-G1njbCYf.js","_index-BbP3371Q.js"]},"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css":{"file":"assets/deleteWallet-D4hbtBo7.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-runtime-G1njbCYf.js","_index-BbP3371Q.js"]},"src/routes/UI/Cursor.tsx?pick=default&pick=$css":{"file":"assets/Cursor-hw9lxiE9.js","name":"Cursor","src":"src/routes/UI/Cursor.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"],"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/UI/Loading.tsx?pick=default&pick=$css":{"file":"assets/Loading-BigulQgg.js","name":"Loading","src":"src/routes/UI/Loading.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"]},"src/routes/UI/Waves.tsx?pick=default&pick=$css":{"file":"assets/Waves-Be4yV-lU.js","name":"Waves","src":"src/routes/UI/Waves.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js"]},"src/routes/[...404].tsx?pick=default&pick=$css":{"file":"assets/_...404_-C9nr4AF5.js","name":"_...404_","src":"src/routes/[...404].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_ButtonSparkle-B8MvXRxa.js","_Menu-CJHi8x7g.js","_store-EkIb7068.js","_components-BSHtZ-Zq.js","_routing-CrKy3yVb.js"],"css":["assets/_..-D39vbXZ9.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"assets/index-CiNBbJAO.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DpIebe6J.js","_solid-DuWri35y.js","_preload-helper-CM3UJVvY.js","_Menu-CJHi8x7g.js","_components-BSHtZ-Zq.js","_routing-CrKy3yVb.js"],"dynamicImports":["node_modules/.pnpm/pulsix@1.0.5/node_modules/pulsix/dist/index.mjs"]},"virtual:$vinxi/handler/client":{"file":"assets/client-BvgNNfPt.js","name":"client","src":"virtual:$vinxi/handler/client","isEntry":true,"imports":["_index-BAMY2Nnw.js","_web-DpIebe6J.js","_solid-DuWri35y.js","_preload-helper-CM3UJVvY.js","_Menu-CJHi8x7g.js","_Cursor-DO_Peo8w.js","_auth-B7ef8sb9.js","_routing-CrKy3yVb.js","_action-Dtdjs7R9.js","node_modules/.pnpm/pulsix@1.0.5/node_modules/pulsix/dist/index.mjs","_components-BSHtZ-Zq.js","_store-EkIb7068.js","_index-Ckjqp3wL.js","_index-BbP3371Q.js","_index-CgqXENQe.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Loading.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css"],"css":["assets/client-DNeOnZgp.css","assets/Cursor-DUhhJVLJ.css"]}},"server-fns":{"_ButtonSparkle-BxHzGCPC.js":{"file":"assets/ButtonSparkle-BxHzGCPC.js","name":"ButtonSparkle","css":["assets/ButtonSparkle-DtI3gbzT.css"]},"_ButtonSparkle-DtI3gbzT.css":{"file":"assets/ButtonSparkle-DtI3gbzT.css","src":"_ButtonSparkle-DtI3gbzT.css"},"_Card-BcrU3z9h.css":{"file":"assets/Card-BcrU3z9h.css","src":"_Card-BcrU3z9h.css"},"_Card.module-nMwE8ysR.js":{"file":"assets/Card.module-nMwE8ysR.js","name":"Card.module","css":["assets/Card-BcrU3z9h.css"]},"_Cursor-6qc4Ma5i.js":{"file":"assets/Cursor-6qc4Ma5i.js","name":"Cursor","css":["assets/Cursor-DUhhJVLJ.css"]},"_Cursor-DUhhJVLJ.css":{"file":"assets/Cursor-DUhhJVLJ.css","src":"_Cursor-DUhhJVLJ.css"},"_Inputs-CUihbr1a.css":{"file":"assets/Inputs-CUihbr1a.css","src":"_Inputs-CUihbr1a.css"},"_Inputs-Cq_fgt2H.js":{"file":"assets/Inputs-Cq_fgt2H.js","name":"Inputs","imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js"],"css":["assets/Inputs-CUihbr1a.css"]},"_Menu-B3jw0GIl.js":{"file":"assets/Menu-B3jw0GIl.js","name":"Menu","imports":["_components-Bjb1kgqQ.js"],"css":["assets/Menu-DSzeyodt.css"]},"_Menu-DSzeyodt.css":{"file":"assets/Menu-DSzeyodt.css","src":"_Menu-DSzeyodt.css"},"_Title-C8lsFfVd.js":{"file":"assets/Title-C8lsFfVd.js","name":"Title"},"_action-CiKOD-Zz.js":{"file":"assets/action-CiKOD-Zz.js","name":"action","imports":["_routing-Th2JWmJV.js"]},"_auth-BeHg-fWi.js":{"file":"assets/auth-BeHg-fWi.js","name":"auth"},"_auth.server-QlO-zn0G.js":{"file":"assets/auth.server-QlO-zn0G.js","name":"auth.server","imports":["_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js"]},"_components-Bjb1kgqQ.js":{"file":"assets/components-Bjb1kgqQ.js","name":"components","imports":["_routing-Th2JWmJV.js"]},"_context-5bbmmXgY.js":{"file":"assets/context-5bbmmXgY.js","name":"context"},"_context-XUFMQc9R.js":{"file":"assets/context-XUFMQc9R.js","name":"context"},"_db.server-CDeyn5Z_.js":{"file":"assets/db.server-CDeyn5Z_.js","name":"db.server"},"_deleteWallet-Bheg3455.css":{"file":"assets/deleteWallet-Bheg3455.css","src":"_deleteWallet-Bheg3455.css"},"_deleteWallet-DdSpVRBs.js":{"file":"assets/deleteWallet-DdSpVRBs.js","name":"deleteWallet","imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js"],"css":["assets/deleteWallet-Bheg3455.css"]},"_exchangeRates-BMINihpv.css":{"file":"assets/exchangeRates-BMINihpv.css","src":"_exchangeRates-BMINihpv.css"},"_exchangeRates-Ds1olZ18.js":{"file":"assets/exchangeRates-Ds1olZ18.js","name":"exchangeRates","imports":["_Card.module-nMwE8ysR.js","_components-Bjb1kgqQ.js","_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js"],"css":["assets/exchangeRates-BMINihpv.css"]},"_fetchEvent-BW7O4Ysp.js":{"file":"assets/fetchEvent-BW7O4Ysp.js","name":"fetchEvent"},"_getWallets.server-DFLq-knu.js":{"file":"assets/getWallets.server-DFLq-knu.js","name":"getWallets.server","imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js"]},"_icons-Bh8061KW.css":{"file":"assets/icons-Bh8061KW.css","src":"_icons-Bh8061KW.css"},"_icons-N8M97GAt.js":{"file":"assets/icons-N8M97GAt.js","name":"icons","css":["assets/icons-Bh8061KW.css"]},"_index-B8s1itkY.js":{"file":"assets/index-B8s1itkY.js","name":"index","css":["assets/index-CXQF54bi.css"]},"_index-BUMPztWr.css":{"file":"assets/index-BUMPztWr.css","src":"_index-BUMPztWr.css"},"_index-C1h2BJ6l.css":{"file":"assets/index-C1h2BJ6l.css","src":"_index-C1h2BJ6l.css"},"_index-CI1g57kZ.js":{"file":"assets/index-CI1g57kZ.js","name":"index","imports":["_icons-N8M97GAt.js"]},"_index-CXQF54bi.css":{"file":"assets/index-CXQF54bi.css","src":"_index-CXQF54bi.css"},"_index-C_IFjkFj.js":{"file":"assets/index-C_IFjkFj.js","name":"index","imports":["_prova-BDuT1_bg.js","_index-D_2WSMiS.js","_components-Bjb1kgqQ.js","_Inputs-Cq_fgt2H.js","_deleteWallet-DdSpVRBs.js","_ButtonSparkle-BxHzGCPC.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"_index-ClXKiMUD.js":{"file":"assets/index-ClXKiMUD.js","name":"index"},"_index-D_2WSMiS.js":{"file":"assets/index-D_2WSMiS.js","name":"index","imports":["_exchangeRates-Ds1olZ18.js","_auth.server-QlO-zn0G.js","_components-Bjb1kgqQ.js"]},"_index-DoUIxqk_.css":{"file":"assets/index-DoUIxqk_.css","src":"_index-DoUIxqk_.css"},"_index-F84g_HFF.js":{"file":"assets/index-F84g_HFF.js","name":"index","imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js"],"css":["assets/index-Ky9zR5dV.css"]},"_index-Ky9zR5dV.css":{"file":"assets/index-Ky9zR5dV.css","src":"_index-Ky9zR5dV.css"},"_index.module-0iUivGU7.js":{"file":"assets/index.module-0iUivGU7.js","name":"index.module","css":["assets/index-BUMPztWr.css","assets/riv-VPAlW_cg.css"]},"_index.module-B9JvMj-k.js":{"file":"assets/index.module-B9JvMj-k.js","name":"index.module","css":["assets/index-C1h2BJ6l.css"]},"_otpInput-gt68IOgQ.js":{"file":"assets/otpInput-gt68IOgQ.js","name":"otpInput","imports":["_index-CI1g57kZ.js","_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_Inputs-Cq_fgt2H.js","_ButtonSparkle-BxHzGCPC.js"],"css":["assets/otpInput-tBTztLmB.css"]},"_otpInput-tBTztLmB.css":{"file":"assets/otpInput-tBTztLmB.css","src":"_otpInput-tBTztLmB.css"},"_pathWallets-DBFK87xo.js":{"file":"assets/pathWallets-DBFK87xo.js","name":"pathWallets","imports":["_Inputs-Cq_fgt2H.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js"]},"_prova-BDuT1_bg.js":{"file":"assets/prova-BDuT1_bg.js","name":"prova","imports":["_components-Bjb1kgqQ.js"]},"_response-CbUr9JDj.js":{"file":"assets/response-CbUr9JDj.js","name":"response"},"_riv-VPAlW_cg.css":{"file":"assets/riv-VPAlW_cg.css","src":"_riv-VPAlW_cg.css"},"_routing-Th2JWmJV.js":{"file":"assets/routing-Th2JWmJV.js","name":"routing"},"_server-fns-BehjaVV7.js":{"file":"assets/server-fns-BehjaVV7.js","name":"server-fns","imports":["_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/API/prova.ts?pick=POST","src/routes/API/prova.ts?pick=POST","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Loading.tsx?pick=default&pick=$css","src/routes/UI/Loading.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/API/Auth/logout.ts?pick=POST","src/routes/API/Auth/logout.ts?pick=POST","src/routes/API/Auth/refresh.ts?pick=POST","src/routes/API/Auth/refresh.ts?pick=POST","src/routes/API/lib/addTransaction.ts?pick=POST","src/routes/API/lib/addTransaction.ts?pick=POST","src/routes/API/lib/getWalletsPaths.ts?pick=POST","src/routes/API/lib/getWalletsPaths.ts?pick=POST","src/routes/API/Wallets/addWallet.ts?pick=POST","src/routes/API/Wallets/addWallet.ts?pick=POST","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/API/Auth/login/index.ts?pick=POST","src/routes/API/Auth/login/index.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST","src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST","src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=","src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/server/auth.server.ts?tsr-directive-use-server=","src/server/auth.server.ts?tsr-directive-use-server=","src/server/auth.server.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=","src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=","src/app.tsx"]},"_server-fns-runtime-DEO2-sKc.js":{"file":"assets/server-fns-runtime-DEO2-sKc.js","name":"server-fns-runtime","imports":["_fetchEvent-BW7O4Ysp.js"]},"_utils-Be6c5Kfn.js":{"file":"assets/utils-Be6c5Kfn.js","name":"utils","imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js"]},"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx":{"file":"assets/index-WwoiZKEg.js","name":"index","src":"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx","isDynamicEntry":true},"src/app.tsx":{"file":"assets/app-DedkBFsa.js","name":"app","src":"src/app.tsx","isDynamicEntry":true,"imports":["_server-fns-BehjaVV7.js","_Menu-B3jw0GIl.js","_Cursor-6qc4Ma5i.js","_auth-BeHg-fWi.js","_routing-Th2JWmJV.js","_action-CiKOD-Zz.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_components-Bjb1kgqQ.js"],"css":["assets/app-DNeOnZgp.css","assets/Cursor-DUhhJVLJ.css"]},"src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css":{"file":"index4.js","name":"index","src":"src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_Menu-B3jw0GIl.js","_auth-BeHg-fWi.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_components-Bjb1kgqQ.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css":{"file":"index24.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-5bbmmXgY.js","_ButtonSparkle-BxHzGCPC.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css":{"file":"index26.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css":{"file":"index25.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_auth-BeHg-fWi.js","_ButtonSparkle-BxHzGCPC.js","_context-5bbmmXgY.js","_index-B8s1itkY.js","_Inputs-Cq_fgt2H.js","_pathWallets-DBFK87xo.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css":{"file":"index18.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-5bbmmXgY.js","_auth-BeHg-fWi.js","_ButtonSparkle-BxHzGCPC.js","_index-B8s1itkY.js","_Inputs-Cq_fgt2H.js","_pathWallets-DBFK87xo.js","_Menu-B3jw0GIl.js","_index-ClXKiMUD.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js","_components-Bjb1kgqQ.js"],"css":["assets/index-CXQF54bi.css"]},"src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css":{"file":"index23.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_auth-BeHg-fWi.js","_context-5bbmmXgY.js","_ButtonSparkle-BxHzGCPC.js","_index-ClXKiMUD.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css":{"file":"index19.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-XUFMQc9R.js","_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_Menu-B3jw0GIl.js","_pathWallets-DBFK87xo.js","_components-Bjb1kgqQ.js","_routing-Th2JWmJV.js","_Inputs-Cq_fgt2H.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css":{"file":"mapper.js","name":"mapper","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css":{"file":"preview.js","name":"preview","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_context-XUFMQc9R.js","_ButtonSparkle-BxHzGCPC.js"]},"src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css":{"file":"uploadFile2.js","name":"uploadFile","src":"src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_context-XUFMQc9R.js"]},"src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css":{"file":"index5.js","name":"index","src":"src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_Menu-B3jw0GIl.js","_auth-BeHg-fWi.js","_pathWallets-DBFK87xo.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_components-Bjb1kgqQ.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js"]},"src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css":{"file":"pathWallets.js","name":"pathWallets","src":"src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-Cq_fgt2H.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js"]},"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css":{"file":"index6.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_Menu-B3jw0GIl.js","_auth-BeHg-fWi.js","_routing-Th2JWmJV.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_components-Bjb1kgqQ.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css":{"file":"index10.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_Title-C8lsFfVd.js","_index-CI1g57kZ.js","_index.module-B9JvMj-k.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css":{"file":"index11.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_otpInput-gt68IOgQ.js","_index-CI1g57kZ.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css":{"file":"index12.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-gt68IOgQ.js","_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_index-CI1g57kZ.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css":{"file":"sendOtp.js","name":"sendOtp","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-gt68IOgQ.js","_Inputs-Cq_fgt2H.js","_index-CI1g57kZ.js","_icons-N8M97GAt.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_ButtonSparkle-BxHzGCPC.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css":{"file":"index20.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css":{"file":"otpInput.js","name":"otpInput","src":"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-gt68IOgQ.js","_index-CI1g57kZ.js","_Inputs-Cq_fgt2H.js","_action-CiKOD-Zz.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_ButtonSparkle-BxHzGCPC.js","_icons-N8M97GAt.js","_routing-Th2JWmJV.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css":{"file":"index21.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css":{"file":"index7.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-B3jw0GIl.js","_index-CI1g57kZ.js","_ButtonSparkle-BxHzGCPC.js","_Inputs-Cq_fgt2H.js","_Title-C8lsFfVd.js","_index.module-B9JvMj-k.js","_otpInput-gt68IOgQ.js","_Cursor-6qc4Ma5i.js","_components-Bjb1kgqQ.js","_routing-Th2JWmJV.js","_icons-N8M97GAt.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js"],"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css":{"file":"Toggle.js","name":"Toggle","src":"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index.module-0iUivGU7.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css":{"file":"index2.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-B3jw0GIl.js","_index.module-0iUivGU7.js","_ButtonSparkle-BxHzGCPC.js","_routing-Th2JWmJV.js","_components-Bjb1kgqQ.js"],"css":["assets/index-DgiZenf7.css","assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css":{"file":"riv.js","name":"riv","src":"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css":{"file":"index22.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css":{"file":"index8.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-F84g_HFF.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css":{"file":"_...slug_.js","name":"_...slug_","src":"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js","_prova-BDuT1_bg.js","_index-D_2WSMiS.js","_exchangeRates-Ds1olZ18.js","_index-C_IFjkFj.js","_index-F84g_HFF.js","_deleteWallet-DdSpVRBs.js","_routing-Th2JWmJV.js","_Inputs-Cq_fgt2H.js","_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_components-Bjb1kgqQ.js","_Card.module-nMwE8ysR.js","_action-CiKOD-Zz.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css","assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css":{"file":"index14.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_prova-BDuT1_bg.js","_index-D_2WSMiS.js","_components-Bjb1kgqQ.js","_exchangeRates-Ds1olZ18.js","_Card.module-nMwE8ysR.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_auth.server-QlO-zn0G.js","_routing-Th2JWmJV.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css":{"file":"index15.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_routing-Th2JWmJV.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css":{"file":"preLoader.js","name":"preLoader","src":"src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css":{"file":"index17.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-Cq_fgt2H.js","_deleteWallet-DdSpVRBs.js","_index-D_2WSMiS.js","_ButtonSparkle-BxHzGCPC.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_exchangeRates-Ds1olZ18.js","_Card.module-nMwE8ysR.js","_components-Bjb1kgqQ.js","_auth.server-QlO-zn0G.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css":{"file":"index13.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-Cq_fgt2H.js","_index-D_2WSMiS.js","_ButtonSparkle-BxHzGCPC.js","_auth-BeHg-fWi.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_action-CiKOD-Zz.js","_routing-Th2JWmJV.js","_exchangeRates-Ds1olZ18.js","_Card.module-nMwE8ysR.js","_components-Bjb1kgqQ.js","_auth.server-QlO-zn0G.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css":{"file":"Card.js","name":"Card","src":"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Card.module-nMwE8ysR.js","_components-Bjb1kgqQ.js","_routing-Th2JWmJV.js"]},"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css":{"file":"index16.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_exchangeRates-Ds1olZ18.js","_auth.server-QlO-zn0G.js","_components-Bjb1kgqQ.js","_Card.module-nMwE8ysR.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_routing-Th2JWmJV.js"]},"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css":{"file":"index3.js","name":"index","src":"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_getWallets.server-DFLq-knu.js","_auth.server-QlO-zn0G.js","_index-C_IFjkFj.js","_index-D_2WSMiS.js","_exchangeRates-Ds1olZ18.js","_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_prova-BDuT1_bg.js","_components-Bjb1kgqQ.js","_routing-Th2JWmJV.js","_Inputs-Cq_fgt2H.js","_action-CiKOD-Zz.js","_deleteWallet-DdSpVRBs.js","_ButtonSparkle-BxHzGCPC.js","_Card.module-nMwE8ysR.js"],"css":["assets/index-DoUIxqk_.css"]},"src/routes/API/Auth/login/index.ts?pick=POST":{"file":"index9.js","name":"index","src":"src/routes/API/Auth/login/index.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_utils-Be6c5Kfn.js","_response-CbUr9JDj.js","_server-fns-runtime-DEO2-sKc.js"]},"src/routes/API/Auth/logout.ts?pick=POST":{"file":"logout.js","name":"logout","src":"src/routes/API/Auth/logout.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_auth.server-QlO-zn0G.js","_response-CbUr9JDj.js","_server-fns-runtime-DEO2-sKc.js"]},"src/routes/API/Auth/refresh.ts?pick=POST":{"file":"refresh.js","name":"refresh","src":"src/routes/API/Auth/refresh.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_utils-Be6c5Kfn.js","_response-CbUr9JDj.js","_server-fns-runtime-DEO2-sKc.js"]},"src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=":{"file":"assets/createUser-CqiEsOu_.js","name":"createUser","src":"src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=":{"file":"assets/usernameAlreadyexist-CUMQy92F.js","name":"usernameAlreadyexist","src":"src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=":{"file":"assets/emailAlreadyexist-BoJ37vKf.js","name":"emailAlreadyexist","src":"src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=":{"file":"assets/phoneAlreadyexist-BFvINIFk.js","name":"phoneAlreadyexist","src":"src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST":{"file":"addTransaction2.js","name":"addTransaction","src":"src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_auth.server-QlO-zn0G.js","_response-CbUr9JDj.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST":{"file":"addTransactions.js","name":"addTransactions","src":"src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST":{"file":"uploadFile.js","name":"uploadFile","src":"src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css":{"file":"getTransactions.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=":{"file":"assets/getTransactions-Cr4f694O.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/addWallet.ts?pick=POST":{"file":"addWallet.js","name":"addWallet","src":"src/routes/API/Wallets/addWallet.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css":{"file":"deleteWallet.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=":{"file":"assets/deleteWallet-jK3sXpn2.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=":{"file":"assets/getWallet-CFmvrtny.js","name":"getWallet","src":"src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=":{"file":"assets/getWallets.server-Ddr8BrzP.js","name":"getWallets.server","src":"src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=":{"file":"assets/setWallet-LYtwpUnS.js","name":"setWallet","src":"src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=":{"file":"assets/exchangeRates-BoUYCRuj.js","name":"exchangeRates","src":"src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/lib/addTransaction.ts?pick=POST":{"file":"addTransaction.js","name":"addTransaction","src":"src/routes/API/lib/addTransaction.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/API/lib/getWalletsPaths.ts?pick=POST":{"file":"getWalletsPaths.js","name":"getWalletsPaths","src":"src/routes/API/lib/getWalletsPaths.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_auth.server-QlO-zn0G.js","_getWallets.server-DFLq-knu.js","_response-CbUr9JDj.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js"]},"src/routes/API/prova.ts?pick=POST":{"file":"prova.js","name":"prova","src":"src/routes/API/prova.ts?pick=POST","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_response-CbUr9JDj.js","_fetchEvent-BW7O4Ysp.js"]},"src/routes/UI/Cursor.tsx?pick=default&pick=$css":{"file":"Cursor.js","name":"Cursor","src":"src/routes/UI/Cursor.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/UI/Loading.tsx?pick=default&pick=$css":{"file":"Loading.js","name":"Loading","src":"src/routes/UI/Loading.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/UI/Waves.tsx?pick=default&pick=$css":{"file":"Waves.js","name":"Waves","src":"src/routes/UI/Waves.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/[...404].tsx?pick=default&pick=$css":{"file":"_...404_.js","name":"_...404_","src":"src/routes/[...404].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-BxHzGCPC.js","_Menu-B3jw0GIl.js","_components-Bjb1kgqQ.js","_routing-Th2JWmJV.js"],"css":["assets/_..-D39vbXZ9.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-B3jw0GIl.js","_components-Bjb1kgqQ.js","_routing-Th2JWmJV.js"]},"src/server/auth.server.ts?tsr-directive-use-server=":{"file":"assets/auth.server-F_zbwjhE.js","name":"auth.server","src":"src/server/auth.server.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-DEO2-sKc.js","_fetchEvent-BW7O4Ysp.js"]},"virtual:$vinxi/handler/server-fns":{"file":"server-fns.js","name":"server-fns","src":"virtual:$vinxi/handler/server-fns","isEntry":true,"imports":["_server-fns-BehjaVV7.js","_fetchEvent-BW7O4Ysp.js","_db.server-CDeyn5Z_.js","_response-CbUr9JDj.js"]}}};

				const routeManifest = {"ssr":{},"client":{},"server-fns":{}};

        function createProdApp(appConfig) {
          return {
            config: { ...appConfig, buildManifest, routeManifest },
            getRouter(name) {
              return appConfig.routers.find(router => router.name === name)
            }
          }
        }

        function plugin$2(app) {
          const prodApp = createProdApp(appConfig$1);
          globalThis.app = prodApp;
        }

function plugin$1(app) {
	globalThis.$handle = (event) => app.h3App.handler(event);
}

/**
 * Traverses the module graph and collects assets for a given chunk
 *
 * @param {any} manifest Client manifest
 * @param {string} id Chunk id
 * @param {Map<string, string[]>} assetMap Cache of assets
 * @param {string[]} stack Stack of chunk ids to prevent circular dependencies
 * @returns Array of asset URLs
 */
function findAssetsInViteManifest(manifest, id, assetMap = new Map(), stack = []) {
	if (stack.includes(id)) {
		return [];
	}

	const cached = assetMap.get(id);
	if (cached) {
		return cached;
	}
	const chunk = manifest[id];
	if (!chunk) {
		return [];
	}

	const assets = [
		...(chunk.assets?.filter(Boolean) || []),
		...(chunk.css?.filter(Boolean) || [])
	];
	if (chunk.imports) {
		stack.push(id);
		for (let i = 0, l = chunk.imports.length; i < l; i++) {
			assets.push(...findAssetsInViteManifest(manifest, chunk.imports[i], assetMap, stack));
		}
		stack.pop();
	}
	assets.push(chunk.file);
	const all = Array.from(new Set(assets));
	assetMap.set(id, all);

	return all;
}

/** @typedef {import("../app.js").App & { config: { buildManifest: { [key:string]: any } }}} ProdApp */

function createHtmlTagsForAssets(router, app, assets) {
	return assets
		.filter(
			(asset) =>
				asset.endsWith(".css") ||
				asset.endsWith(".js") ||
				asset.endsWith(".mjs"),
		)
		.map((asset) => ({
			tag: "link",
			attrs: {
				href: joinURL(app.config.server.baseURL ?? "/", router.base, asset),
				key: join(app.config.server.baseURL ?? "", router.base, asset),
				...(asset.endsWith(".css")
					? { rel: "stylesheet", fetchPriority: "high" }
					: { rel: "modulepreload" }),
			},
		}));
}

/**
 *
 * @param {ProdApp} app
 * @returns
 */
function createProdManifest(app) {
	const manifest = new Proxy(
		{},
		{
			get(target, routerName) {
				invariant(typeof routerName === "string", "Bundler name expected");
				const router = app.getRouter(routerName);
				const bundlerManifest = app.config.buildManifest[routerName];

				invariant(
					router.type !== "static",
					"manifest not available for static router",
				);
				return {
					handler: router.handler,
					async assets() {
						/** @type {{ [key: string]: string[] }} */
						let assets = {};
						assets[router.handler] = await this.inputs[router.handler].assets();
						for (const route of (await router.internals.routes?.getRoutes()) ??
							[]) {
							assets[route.filePath] = await this.inputs[
								route.filePath
							].assets();
						}
						return assets;
					},
					async routes() {
						return (await router.internals.routes?.getRoutes()) ?? [];
					},
					async json() {
						/** @type {{ [key: string]: { output: string; assets: string[]} }} */
						let json = {};
						for (const input of Object.keys(this.inputs)) {
							json[input] = {
								output: this.inputs[input].output.path,
								assets: await this.inputs[input].assets(),
							};
						}
						return json;
					},
					chunks: new Proxy(
						{},
						{
							get(target, chunk) {
								invariant(typeof chunk === "string", "Chunk expected");
								const chunkPath = join(
									router.outDir,
									router.base,
									chunk + ".mjs",
								);
								return {
									import() {
										if (globalThis.$$chunks[chunk + ".mjs"]) {
											return globalThis.$$chunks[chunk + ".mjs"];
										}
										return import(
											/* @vite-ignore */ pathToFileURL(chunkPath).href
										);
									},
									output: {
										path: chunkPath,
									},
								};
							},
						},
					),
					inputs: new Proxy(
						{},
						{
							ownKeys(target) {
								const keys = Object.keys(bundlerManifest)
									.filter((id) => bundlerManifest[id].isEntry)
									.map((id) => id);
								return keys;
							},
							getOwnPropertyDescriptor(k) {
								return {
									enumerable: true,
									configurable: true,
								};
							},
							get(target, input) {
								invariant(typeof input === "string", "Input expected");
								if (router.target === "server") {
									const id =
										input === router.handler
											? virtualId(handlerModule(router))
											: input;
									return {
										assets() {
											return createHtmlTagsForAssets(
												router,
												app,
												findAssetsInViteManifest(bundlerManifest, id),
											);
										},
										output: {
											path: join(
												router.outDir,
												router.base,
												bundlerManifest[id].file,
											),
										},
									};
								} else if (router.target === "browser") {
									const id =
										input === router.handler && !input.endsWith(".html")
											? virtualId(handlerModule(router))
											: input;
									return {
										import() {
											return import(
												/* @vite-ignore */ joinURL(
													app.config.server.baseURL ?? "",
													router.base,
													bundlerManifest[id].file,
												)
											);
										},
										assets() {
											return createHtmlTagsForAssets(
												router,
												app,
												findAssetsInViteManifest(bundlerManifest, id),
											);
										},
										output: {
											path: joinURL(
												app.config.server.baseURL ?? "",
												router.base,
												bundlerManifest[id].file,
											),
										},
									};
								}
							},
						},
					),
				};
			},
		},
	);

	return manifest;
}

function plugin() {
	globalThis.MANIFEST =
		createProdManifest(globalThis.app)
			;
}

const chunks = {};
			 



			 function app() {
				 globalThis.$$chunks = chunks;
			 }

const plugins = [
  plugin$2,
plugin$1,
plugin,
app
];

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, key + "" , value);
function z$2(t = {}) {
  let e, s = false;
  const r = (n) => {
    if (e && e !== n) throw new Error("Context conflict");
  };
  let a;
  if (t.asyncContext) {
    const n = t.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    n ? a = new n() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const l = () => {
    if (a) {
      const n = a.getStore();
      if (n !== void 0) return n;
    }
    return e;
  };
  return { use: () => {
    const n = l();
    if (n === void 0) throw new Error("Context is not available");
    return n;
  }, tryUse: () => l(), set: (n, i) => {
    i || r(n), e = n, s = true;
  }, unset: () => {
    e = void 0, s = false;
  }, call: (n, i) => {
    r(n), e = n;
    try {
      return a ? a.run(n, i) : i();
    } finally {
      s || (e = void 0);
    }
  }, async callAsync(n, i) {
    e = n;
    const v = () => {
      e = n;
    }, p = () => e === n ? v : void 0;
    R$4.add(p);
    try {
      const w = a ? a.run(n, i) : i();
      return s || (e = void 0), await w;
    } finally {
      R$4.delete(p);
    }
  } };
}
function D$5(t = {}) {
  const e = {};
  return { get(s, r = {}) {
    return e[s] || (e[s] = z$2({ ...t, ...r })), e[s];
  } };
}
const u$2 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof g$2 < "u" ? g$2 : {}, y$2 = "__unctx__", G$4 = u$2[y$2] || (u$2[y$2] = D$5()), J$3 = (t, e = {}) => G$4.get(t, e), h$2 = "__unctx_async_handlers__", R$4 = u$2[h$2] || (u$2[h$2] = /* @__PURE__ */ new Set());
function pe$2(t) {
  return t;
}
function Q$4(t) {
  let e;
  const s = C$2(t), r = { duplex: "half", method: t.method, headers: t.headers };
  return t.node.req.body instanceof ArrayBuffer ? new Request(s, { ...r, body: t.node.req.body }) : new Request(s, { ...r, get body() {
    return e || (e = se$2(t), e);
  } });
}
function V$3(t) {
  var _a;
  return (_a = t.web) != null ? _a : t.web = { request: Q$4(t), url: C$2(t) }, t.web.request;
}
function X$3() {
  return ae$2();
}
const x$3 = Symbol("$HTTPEvent");
function Y$5(t) {
  return typeof t == "object" && (t instanceof H3Event || (t == null ? void 0 : t[x$3]) instanceof H3Event || (t == null ? void 0 : t.__is_event__) === true);
}
function o$1(t) {
  return function(...e) {
    var _a;
    let s = e[0];
    if (Y$5(s)) e[0] = s instanceof H3Event || s.__is_event__ ? s : s[x$3];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (s = X$3(), !s) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      e.unshift(s);
    }
    return t(...e);
  };
}
const C$2 = o$1(getRequestURL), Z$4 = o$1(getRequestIP), b$3 = o$1(setResponseStatus), S$3 = o$1(getResponseStatus), ee$4 = o$1(getResponseStatusText), c$1 = o$1(getResponseHeaders), m$1 = o$1(getResponseHeader), te$4 = o$1(setResponseHeader), H$4 = o$1(appendResponseHeader), ge$3 = o$1(parseCookies), ye$3 = o$1(getCookie), he$2 = o$1(setCookie), Re$3 = o$1(deleteCookie), be$4 = o$1(useSession), Se$3 = o$1(sendWebResponse), me$3 = o$1(setHeader), se$2 = o$1(getRequestWebStream), ne$4 = o$1(removeResponseHeader), oe$3 = o$1(V$3);
function re$3() {
  var _a;
  return J$3("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function ae$2() {
  return re$3().use().event;
}
const d$1 = "solidFetchEvent";
function ie$3(t) {
  return { request: oe$3(t), response: ue$1(t), clientAddress: Z$4(t), locals: {}, nativeEvent: t };
}
function xe$4(t) {
  return { ...t };
}
function Ce$1(t) {
  if (!t.context[d$1]) {
    const e = ie$3(t);
    t.context[d$1] = e;
  }
  return t.context[d$1];
}
function He$3(t, e) {
  for (const [s, r] of e.entries()) H$4(t, s, r);
}
let ce$1 = class ce {
  constructor(e) {
    __publicField$2(this, "event");
    this.event = e;
  }
  get(e) {
    const s = m$1(this.event, e);
    return Array.isArray(s) ? s.join(", ") : s || null;
  }
  has(e) {
    return this.get(e) !== void 0;
  }
  set(e, s) {
    return te$4(this.event, e, s);
  }
  delete(e) {
    return ne$4(this.event, e);
  }
  append(e, s) {
    H$4(this.event, e, s);
  }
  getSetCookie() {
    const e = m$1(this.event, "Set-Cookie");
    return Array.isArray(e) ? e : [e];
  }
  forEach(e) {
    return Object.entries(c$1(this.event)).forEach(([s, r]) => e(Array.isArray(r) ? r.join(", ") : r, s, this));
  }
  entries() {
    return Object.entries(c$1(this.event)).map(([e, s]) => [e, Array.isArray(s) ? s.join(", ") : s])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(c$1(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(c$1(this.event)).map((e) => Array.isArray(e) ? e.join(", ") : e)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
};
function ue$1(t) {
  return { get status() {
    return S$3(t);
  }, set status(e) {
    b$3(t, e);
  }, get statusText() {
    return ee$4(t);
  }, set statusText(e) {
    b$3(t, S$3(t), e);
  }, headers: new ce$1(t) };
}

const { Pool: s$3 } = e$1, t$1 = new s$3({ host: o$3.env.DB_HOST, user: o$3.env.DB_USER, password: o$3.env.DB_PASSWORD, port: o$3.env.DB_PORT ? parseInt(o$3.env.DB_PORT, 10) : void 0, database: o$3.env.DB_NAME });

function i$1(n, r = {}) {
  const { revalidate: s, ...t } = r, e = new Headers(t.headers);
  s !== void 0 && e.set("X-Revalidate", s.toString()), e.set("Content-Type", "application/json");
  const o = new Response(JSON.stringify(n), { ...t, headers: e });
  return o.customBody = () => n, o;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
function fe$1(t) {
  return async (e) => {
    const r = Ce$1(e), i = await t(r);
    i && await Se$3(e, i);
  };
}
function ge$2(t) {
  return async (e, r) => {
    const i = Ce$1(e), a = await t(i, r);
    a && await Se$3(e, a);
  };
}
function yt$1({ onRequest: t, onBeforeResponse: e }) {
  return pe$2({ onRequest: typeof t == "function" ? fe$1(t) : Array.isArray(t) ? t.map(fe$1) : void 0, onBeforeResponse: typeof e == "function" ? ge$2(e) : Array.isArray(e) ? e.map(ge$2) : void 0 });
}
const De$1 = ["http://localhost:3000", "https://tuo-dominio-produzione.com", "https://dominio-sito-esterno-1.com"];
async function bt$1(t) {
  const e = t.request.headers.get("authorization");
  if (!e || !e.startsWith("Bearer ")) return i$1({ error: "Authentication required", code: "NO_AUTH_HEADER" }, { status: 401 });
  const r = e.substring(7);
  let i = null;
  const a = o$3.env.JWT_SECRET || "", n = o$3.env.JWT_ISSUER || "pulsix";
  if (!a) return console.error("[Auth Logic] Errore critico: JWT_SECRET non configurato!"), i$1({ error: "Server configuration error", code: "JWT_SECRET_MISSING" }, { status: 500 });
  try {
    i = O$3.verify(r, a, { issuer: n });
  } catch (c) {
    let u = "Invalid or expired token", d = "INVALID_TOKEN";
    return c instanceof O$3.TokenExpiredError ? (u = "Token expired", d = "TOKEN_EXPIRED", console.log(`[Auth Logic] Token scaduto per ${t.request.url}.`)) : c instanceof O$3.JsonWebTokenError ? (u = `Invalid token (${c.message})`, d = "TOKEN_INVALID_SIGNATURE_OR_PAYLOAD", console.warn(`[Auth Logic] Errore verifica token per ${t.request.url}: ${c.message}`)) : console.error(`[Auth Logic] Errore verifica token (sconosciuto) per ${t.request.url}:`, c), i$1({ error: u, code: d }, { status: 401 });
  }
  if (typeof i != "object" || i === null || typeof i.sub != "number" || typeof i.jti != "string") return console.log("[Auth Logic] Payload token decodificato non valido. Payload:", i), i$1({ error: "Invalid token payload structure or types", code: "INVALID_TOKEN_PAYLOAD" }, { status: 401 });
  const o = i.sub, l = i.jti;
  try {
    const u = (await t$1.query("SELECT id, state FROM auth.users WHERE id = $1", [o])).rows[0];
    return u ? u.state === "blocked" || u.state === "sospended" ? (console.warn(`[Auth Logic] Accesso negato per utente ${o} (Stato: ${u.state})`), i$1({ error: `User account is ${u.state}`, code: `USER_${u.state.toUpperCase()}` }, { status: 403 })) : (console.log(`[Auth Logic] Utente ${o} autenticato per ${t.request.url}.`), { user: { id: o, tokenId: l, state: u.state } }) : (console.warn(`[Auth Logic] Utente ${o} non trovato.`), i$1({ error: "User associated with token not found", code: "USER_NOT_FOUND" }, { status: 401 }));
  } catch (c) {
    return console.error(`[Auth Logic] Errore DB check utente ${o}:`, c), i$1({ error: "Internal server error during user check" }, { status: 500 });
  }
}
async function xt$1(t) {
  const e = t.nativeEvent;
  if (isPreflightRequest(e)) {
    const r = t.request.headers.get("origin");
    return handleCors(e, { origin: (a) => !a || De$1.includes(a), methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], allowHeaders: ["Authorization", "Content-Type", "Accept", "X-Requested-With"], credentials: true, maxAge: "86400" }) ? new Response(null, { status: 204 }) : (console.error(`[CORS Middleware] Preflight check failed for origin: ${r}`), i$1({ error: "CORS Preflight Check Failed" }, { status: 403 }));
  }
}
async function At$1(t) {
}
const vt$1 = ["/API/Auth/login", "/API/Auth/registration", "/API/Auth/refresh", "/API/Auth/logout"], St$1 = "/API/";
async function wt$1(t) {
  var _a;
  const r = new URL(t.request.url).pathname;
  if (!r.startsWith(St$1)) return;
  let i = null;
  if (vt$1.some((o) => {
    let l = false;
    return typeof o == "string" ? l = o.endsWith("/") ? r.startsWith(o) : r === o : l = o.test(r), l && (i = o), l;
  })) {
    console.log(`[ApiAuth Middleware] SKIPPING AUTH for public API path "${r}" (matched: ${i})`);
    return;
  }
  console.log(`[ApiAuth Middleware] Path "${r}" is a PROTECTED API endpoint. Running auth check...`);
  const n = await bt$1(t);
  if (n instanceof Response) return console.warn(`[ApiAuth Middleware] Auth check failed for API "${r}". Status: ${n.status}`), n;
  t.locals.user = n.user, console.log(`[ApiAuth Middleware] Auth successful for user ${(_a = n.user) == null ? void 0 : _a.id} on API path "${r}"`);
}
const me$2 = yt$1({ onRequest: [(t) => {
  t.locals.startTime = Date.now();
}, xt$1, At$1, wt$1], onBeforeResponse: [(t) => {
  appendCorsHeaders(t.nativeEvent, { origin: (e) => !e || De$1.includes(e), credentials: true });
}, (t) => {
  const e = t.locals;
  e.startTime && (Date.now() - e.startTime, new URL(t.request.url).pathname);
}] });
var zt$1 = ((t) => (t[t.AggregateError = 1] = "AggregateError", t[t.ArrowFunction = 2] = "ArrowFunction", t[t.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", t[t.ObjectAssign = 8] = "ObjectAssign", t[t.BigIntTypedArray = 16] = "BigIntTypedArray", t[t.AbortSignal = 32] = "AbortSignal", t))(zt$1 || {});
function Rt$1(t) {
  switch (t) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return;
  }
}
function g(t) {
  let e = "", r = 0, i;
  for (let a = 0, n = t.length; a < n; a++) i = Rt$1(t[a]), i && (e += t.slice(r, a) + i, r = a + 1);
  return r === 0 ? e = t : e += t.slice(r), e;
}
function kt$1(t) {
  switch (t) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return t;
  }
}
function A$2(t) {
  return t.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, kt$1);
}
var z$1 = "__SEROVAL_REFS__", F$2 = "$R", D$4 = `self.${F$2}`;
function It$1(t) {
  return t == null ? `${D$4}=${D$4}||[]` : `(${D$4}=${D$4}||{})["${g(t)}"]=[]`;
}
function P$1(t, e) {
  if (!t) throw e;
}
var Fe$1 = /* @__PURE__ */ new Map(), S$2 = /* @__PURE__ */ new Map();
function Ue$1(t) {
  return Fe$1.has(t);
}
function Et$1(t) {
  return S$2.has(t);
}
function _t$1(t) {
  return P$1(Ue$1(t), new dr(t)), Fe$1.get(t);
}
function Ct$1(t) {
  return P$1(Et$1(t), new fr(t)), S$2.get(t);
}
typeof globalThis < "u" ? Object.defineProperty(globalThis, z$1, { value: S$2, configurable: true, writable: false, enumerable: false }) : typeof self < "u" ? Object.defineProperty(self, z$1, { value: S$2, configurable: true, writable: false, enumerable: false }) : typeof g$2 < "u" && Object.defineProperty(g$2, z$1, { value: S$2, configurable: true, writable: false, enumerable: false });
function Oe$1(t, e) {
  for (let r = 0, i = e.length; r < i; r++) {
    let a = e[r];
    t.has(a) || (t.add(a), a.extends && Oe$1(t, a.extends));
  }
}
function Me$1(t) {
  if (t) {
    let e = /* @__PURE__ */ new Set();
    return Oe$1(e, t), [...e];
  }
}
var $t$1 = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" }, Le$1 = { [Symbol.asyncIterator]: 0, [Symbol.hasInstance]: 1, [Symbol.isConcatSpreadable]: 2, [Symbol.iterator]: 3, [Symbol.match]: 4, [Symbol.matchAll]: 5, [Symbol.replace]: 6, [Symbol.search]: 7, [Symbol.species]: 8, [Symbol.split]: 9, [Symbol.toPrimitive]: 10, [Symbol.toStringTag]: 11, [Symbol.unscopables]: 12 }, Tt$1 = { 0: Symbol.asyncIterator, 1: Symbol.hasInstance, 2: Symbol.isConcatSpreadable, 3: Symbol.iterator, 4: Symbol.match, 5: Symbol.matchAll, 6: Symbol.replace, 7: Symbol.search, 8: Symbol.species, 9: Symbol.split, 10: Symbol.toPrimitive, 11: Symbol.toStringTag, 12: Symbol.unscopables }, Wt$1 = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" }, Dt$1 = { 2: true, 3: false, 1: void 0, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN }, Ne$1 = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" }, Ft$1 = { 0: Error, 1: EvalError, 2: RangeError, 3: ReferenceError, 4: SyntaxError, 5: TypeError, 6: URIError }, s$2 = void 0;
function h$1(t, e, r, i, a, n, o, l, c, u, d, m) {
  return { t, i: e, s: r, l: i, c: a, m: n, p: o, e: l, a: c, f: u, b: d, o: m };
}
function x$2(t) {
  return h$1(2, s$2, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
var q$2 = x$2(2), H$3 = x$2(3), Ut$1 = x$2(1), Ot$1 = x$2(0), Mt$1 = x$2(4), Lt$1 = x$2(5), Nt$1 = x$2(6), Vt$1 = x$2(7);
function ie$2(t) {
  return t instanceof EvalError ? 1 : t instanceof RangeError ? 2 : t instanceof ReferenceError ? 3 : t instanceof SyntaxError ? 4 : t instanceof TypeError ? 5 : t instanceof URIError ? 6 : 0;
}
function jt$1(t) {
  let e = Ne$1[ie$2(t)];
  return t.name !== e ? { name: t.name } : t.constructor.name !== e ? { name: t.constructor.name } : {};
}
function Pe$2(t, e) {
  let r = jt$1(t), i = Object.getOwnPropertyNames(t);
  for (let a = 0, n = i.length, o; a < n; a++) o = i[a], o !== "name" && o !== "message" && (o === "stack" ? e & 4 && (r = r || {}, r[o] = t[o]) : (r = r || {}, r[o] = t[o]));
  return r;
}
function Ve(t) {
  return Object.isFrozen(t) ? 3 : Object.isSealed(t) ? 2 : Object.isExtensible(t) ? 0 : 1;
}
function Bt(t) {
  switch (t) {
    case Number.POSITIVE_INFINITY:
      return Lt$1;
    case Number.NEGATIVE_INFINITY:
      return Nt$1;
  }
  return t !== t ? Vt$1 : Object.is(t, -0) ? Mt$1 : h$1(0, s$2, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function K$1(t) {
  return h$1(1, s$2, g(t), s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function qt$1(t) {
  return h$1(3, s$2, "" + t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Ht$1(t) {
  return h$1(4, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Kt$1(t, e) {
  return h$1(5, t, e.toISOString(), s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Xt$1(t, e) {
  return h$1(6, t, s$2, s$2, g(e.source), e.flags, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Gt$1(t, e) {
  let r = new Uint8Array(e), i = r.length, a = new Array(i);
  for (let n = 0; n < i; n++) a[n] = r[n];
  return h$1(19, t, a, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Jt$1(t, e) {
  return h$1(17, t, Le$1[e], s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Yt$1(t, e) {
  return h$1(18, t, g(_t$1(e)), s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function je$1(t, e, r) {
  return h$1(25, t, r, s$2, g(e), s$2, s$2, s$2, s$2, s$2, s$2, s$2);
}
function Zt$1(t, e, r) {
  return h$1(9, t, s$2, e.length, s$2, s$2, s$2, s$2, r, s$2, s$2, Ve(e));
}
function Qt$1(t, e) {
  return h$1(21, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, e, s$2, s$2);
}
function er(t, e, r) {
  return h$1(15, t, s$2, e.length, e.constructor.name, s$2, s$2, s$2, s$2, r, e.byteOffset, s$2);
}
function tr(t, e, r) {
  return h$1(16, t, s$2, e.length, e.constructor.name, s$2, s$2, s$2, s$2, r, e.byteOffset, s$2);
}
function rr(t, e, r) {
  return h$1(20, t, s$2, e.byteLength, s$2, s$2, s$2, s$2, s$2, r, e.byteOffset, s$2);
}
function sr(t, e, r) {
  return h$1(13, t, ie$2(e), s$2, s$2, g(e.message), r, s$2, s$2, s$2, s$2, s$2);
}
function ir(t, e, r) {
  return h$1(14, t, ie$2(e), s$2, s$2, g(e.message), r, s$2, s$2, s$2, s$2, s$2);
}
function ar(t, e, r) {
  return h$1(7, t, s$2, e, s$2, s$2, s$2, s$2, r, s$2, s$2, s$2);
}
function Be(t, e) {
  return h$1(28, s$2, s$2, s$2, s$2, s$2, s$2, s$2, [t, e], s$2, s$2, s$2);
}
function qe$1(t, e) {
  return h$1(30, s$2, s$2, s$2, s$2, s$2, s$2, s$2, [t, e], s$2, s$2, s$2);
}
function He$2(t, e, r) {
  return h$1(31, t, s$2, s$2, s$2, s$2, s$2, s$2, r, e, s$2, s$2);
}
function nr(t, e) {
  return h$1(32, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, e, s$2, s$2);
}
function or(t, e) {
  return h$1(33, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, e, s$2, s$2);
}
function lr(t, e) {
  return h$1(34, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, e, s$2, s$2);
}
var { toString: ae$1 } = Object.prototype;
function cr(t, e) {
  return e instanceof Error ? `Seroval caught an error during the ${t} process.
  
${e.name}
${e.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new` : `Seroval caught an error during the ${t} process.

"${ae$1.call(e)}"

For more information, please check the "cause" property of this error.`;
}
var ne$3 = class ne extends Error {
  constructor(e, r) {
    super(cr(e, r)), this.cause = r;
  }
}, ur = class extends ne$3 {
  constructor(e) {
    super("parsing", e);
  }
}, pr = class extends ne$3 {
  constructor(t) {
    super("serialization", t);
  }
}, hr = class extends ne$3 {
  constructor(t) {
    super("deserialization", t);
  }
}, U$1 = class U extends Error {
  constructor(e) {
    super(`The value ${ae$1.call(e)} of type "${typeof e}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`), this.value = e;
  }
}, Ke$1 = class Ke extends Error {
  constructor(e) {
    super('Unsupported node type "' + e.t + '".');
  }
}, Xe = class extends Error {
  constructor(t) {
    super('Missing plugin for tag "' + t + '".');
  }
}, v = class extends Error {
  constructor(t) {
    super('Missing "' + t + '" instance.');
  }
}, dr = class extends Error {
  constructor(t) {
    super('Missing reference for the value "' + ae$1.call(t) + '" of type "' + typeof t + '"'), this.value = t;
  }
}, fr = class extends Error {
  constructor(e) {
    super('Missing reference for id "' + g(e) + '"');
  }
}, gr = class extends Error {
  constructor(t) {
    super('Unknown TypedArray "' + t + '"');
  }
}, mr = class {
  constructor(t, e) {
    this.value = t, this.replacement = e;
  }
}, Pr = {}, yr = {}, br = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
function X$2() {
  let t, e;
  return { promise: new Promise((r, i) => {
    t = r, e = i;
  }), resolve(r) {
    t(r);
  }, reject(r) {
    e(r);
  } };
}
function xr(t) {
  return "__SEROVAL_STREAM__" in t;
}
function C$1() {
  let t = /* @__PURE__ */ new Set(), e = [], r = true, i = true;
  function a(l) {
    for (let c of t.keys()) c.next(l);
  }
  function n(l) {
    for (let c of t.keys()) c.throw(l);
  }
  function o(l) {
    for (let c of t.keys()) c.return(l);
  }
  return { __SEROVAL_STREAM__: true, on(l) {
    r && t.add(l);
    for (let c = 0, u = e.length; c < u; c++) {
      let d = e[c];
      c === u - 1 && !r ? i ? l.return(d) : l.throw(d) : l.next(d);
    }
    return () => {
      r && t.delete(l);
    };
  }, next(l) {
    r && (e.push(l), a(l));
  }, throw(l) {
    r && (e.push(l), n(l), r = false, i = false, t.clear());
  }, return(l) {
    r && (e.push(l), o(l), r = false, i = true, t.clear());
  } };
}
function Ar(t) {
  let e = C$1(), r = t[Symbol.asyncIterator]();
  async function i() {
    try {
      let a = await r.next();
      a.done ? e.return(a.value) : (e.next(a.value), await i());
    } catch (a) {
      e.throw(a);
    }
  }
  return i().catch(() => {
  }), e;
}
function vr(t) {
  return () => {
    let e = [], r = [], i = 0, a = -1, n = false;
    function o() {
      for (let c = 0, u = r.length; c < u; c++) r[c].resolve({ done: true, value: void 0 });
    }
    t.on({ next(c) {
      let u = r.shift();
      u && u.resolve({ done: false, value: c }), e.push(c);
    }, throw(c) {
      let u = r.shift();
      u && u.reject(c), o(), a = e.length, e.push(c), n = true;
    }, return(c) {
      let u = r.shift();
      u && u.resolve({ done: true, value: c }), o(), a = e.length, e.push(c);
    } });
    function l() {
      let c = i++, u = e[c];
      if (c !== a) return { done: false, value: u };
      if (n) throw u;
      return { done: true, value: u };
    }
    return { [Symbol.asyncIterator]() {
      return this;
    }, async next() {
      if (a === -1) {
        let c = i++;
        if (c >= e.length) {
          let u = X$2();
          return r.push(u), await u.promise;
        }
        return { done: false, value: e[c] };
      }
      return i > a ? { done: true, value: void 0 } : l();
    } };
  };
}
function Ge(t) {
  let e = [], r = -1, i = -1, a = t[Symbol.iterator]();
  for (; ; ) try {
    let n = a.next();
    if (e.push(n.value), n.done) {
      i = e.length - 1;
      break;
    }
  } catch (n) {
    r = e.length, e.push(n);
  }
  return { v: e, t: r, d: i };
}
function Sr(t) {
  return () => {
    let e = 0;
    return { [Symbol.iterator]() {
      return this;
    }, next() {
      if (e > t.d) return { done: true, value: s$2 };
      let r = e++, i = t.v[r];
      if (r === t.t) throw i;
      return { done: r === t.d, value: i };
    } };
  };
}
var wr = class {
  constructor(e) {
    this.marked = /* @__PURE__ */ new Set(), this.plugins = e.plugins, this.features = 47 ^ (e.disabledFeatures || 0), this.refs = e.refs || /* @__PURE__ */ new Map();
  }
  markRef(e) {
    this.marked.add(e);
  }
  isMarked(e) {
    return this.marked.has(e);
  }
  getIndexedValue(e) {
    let r = this.refs.get(e);
    if (r != null) return this.markRef(r), { type: 1, value: Ht$1(r) };
    let i = this.refs.size;
    return this.refs.set(e, i), { type: 0, value: i };
  }
  getReference(e) {
    let r = this.getIndexedValue(e);
    return r.type === 1 ? r : Ue$1(e) ? { type: 2, value: Yt$1(r.value, e) } : r;
  }
  parseWellKnownSymbol(e) {
    let r = this.getReference(e);
    return r.type !== 0 ? r.value : (P$1(e in Le$1, new U$1(e)), Jt$1(r.value, e));
  }
  parseSpecialReference(e) {
    let r = this.getIndexedValue(br[e]);
    return r.type === 1 ? r.value : h$1(26, r.value, e, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2, s$2);
  }
  parseIteratorFactory() {
    let e = this.getIndexedValue(Pr);
    return e.type === 1 ? e.value : h$1(27, e.value, s$2, s$2, s$2, s$2, s$2, s$2, s$2, this.parseWellKnownSymbol(Symbol.iterator), s$2, s$2);
  }
  parseAsyncIteratorFactory() {
    let e = this.getIndexedValue(yr);
    return e.type === 1 ? e.value : h$1(29, e.value, s$2, s$2, s$2, s$2, s$2, s$2, [this.parseSpecialReference(1), this.parseWellKnownSymbol(Symbol.asyncIterator)], s$2, s$2, s$2);
  }
  createObjectNode(e, r, i, a) {
    return h$1(i ? 11 : 10, e, s$2, s$2, s$2, s$2, a, s$2, s$2, s$2, s$2, Ve(r));
  }
  createMapNode(e, r, i, a) {
    return h$1(8, e, s$2, s$2, s$2, s$2, s$2, { k: r, v: i, s: a }, s$2, this.parseSpecialReference(0), s$2, s$2);
  }
  createPromiseConstructorNode(e) {
    return h$1(22, e, s$2, s$2, s$2, s$2, s$2, s$2, s$2, this.parseSpecialReference(1), s$2, s$2);
  }
  createAbortSignalConstructorNode(e) {
    return h$1(35, e, s$2, s$2, s$2, s$2, s$2, s$2, s$2, this.parseSpecialReference(5), s$2, s$2);
  }
};
function zr(t) {
  switch (t) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new gr(t);
  }
}
function ye$2(t, e) {
  switch (e) {
    case 3:
      return Object.freeze(t);
    case 1:
      return Object.preventExtensions(t);
    case 2:
      return Object.seal(t);
    default:
      return t;
  }
}
var Rr = class {
  constructor(e) {
    this.plugins = e.plugins, this.refs = e.refs || /* @__PURE__ */ new Map();
  }
  deserializeReference(e) {
    return this.assignIndexedValue(e.i, Ct$1(A$2(e.s)));
  }
  deserializeArray(e) {
    let r = e.l, i = this.assignIndexedValue(e.i, new Array(r)), a;
    for (let n = 0; n < r; n++) a = e.a[n], a && (i[n] = this.deserialize(a));
    return ye$2(i, e.o), i;
  }
  deserializeProperties(e, r) {
    let i = e.s;
    if (i) {
      let a = e.k, n = e.v;
      for (let o = 0, l; o < i; o++) l = a[o], typeof l == "string" ? r[A$2(l)] = this.deserialize(n[o]) : r[this.deserialize(l)] = this.deserialize(n[o]);
    }
    return r;
  }
  deserializeObject(e) {
    let r = this.assignIndexedValue(e.i, e.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
    return this.deserializeProperties(e.p, r), ye$2(r, e.o), r;
  }
  deserializeDate(e) {
    return this.assignIndexedValue(e.i, new Date(e.s));
  }
  deserializeRegExp(e) {
    return this.assignIndexedValue(e.i, new RegExp(A$2(e.c), e.m));
  }
  deserializeSet(e) {
    let r = this.assignIndexedValue(e.i, /* @__PURE__ */ new Set()), i = e.a;
    for (let a = 0, n = e.l; a < n; a++) r.add(this.deserialize(i[a]));
    return r;
  }
  deserializeMap(e) {
    let r = this.assignIndexedValue(e.i, /* @__PURE__ */ new Map()), i = e.e.k, a = e.e.v;
    for (let n = 0, o = e.e.s; n < o; n++) r.set(this.deserialize(i[n]), this.deserialize(a[n]));
    return r;
  }
  deserializeArrayBuffer(e) {
    let r = new Uint8Array(e.s);
    return this.assignIndexedValue(e.i, r.buffer);
  }
  deserializeTypedArray(e) {
    let r = zr(e.c), i = this.deserialize(e.f);
    return this.assignIndexedValue(e.i, new r(i, e.b, e.l));
  }
  deserializeDataView(e) {
    let r = this.deserialize(e.f);
    return this.assignIndexedValue(e.i, new DataView(r, e.b, e.l));
  }
  deserializeDictionary(e, r) {
    if (e.p) {
      let i = this.deserializeProperties(e.p, {});
      Object.assign(r, i);
    }
    return r;
  }
  deserializeAggregateError(e) {
    let r = this.assignIndexedValue(e.i, new AggregateError([], A$2(e.m)));
    return this.deserializeDictionary(e, r);
  }
  deserializeError(e) {
    let r = Ft$1[e.s], i = this.assignIndexedValue(e.i, new r(A$2(e.m)));
    return this.deserializeDictionary(e, i);
  }
  deserializePromise(e) {
    let r = X$2(), i = this.assignIndexedValue(e.i, r), a = this.deserialize(e.f);
    return e.s ? r.resolve(a) : r.reject(a), i.promise;
  }
  deserializeBoxed(e) {
    return this.assignIndexedValue(e.i, Object(this.deserialize(e.f)));
  }
  deserializePlugin(e) {
    let r = this.plugins;
    if (r) {
      let i = A$2(e.c);
      for (let a = 0, n = r.length; a < n; a++) {
        let o = r[a];
        if (o.tag === i) return this.assignIndexedValue(e.i, o.deserialize(e.s, this, { id: e.i }));
      }
    }
    throw new Xe(e.c);
  }
  deserializePromiseConstructor(e) {
    return this.assignIndexedValue(e.i, X$2()).promise;
  }
  deserializePromiseResolve(e) {
    let r = this.refs.get(e.i);
    P$1(r, new v("Promise")), r.resolve(this.deserialize(e.a[1]));
  }
  deserializePromiseReject(e) {
    let r = this.refs.get(e.i);
    P$1(r, new v("Promise")), r.reject(this.deserialize(e.a[1]));
  }
  deserializeIteratorFactoryInstance(e) {
    this.deserialize(e.a[0]);
    let r = this.deserialize(e.a[1]);
    return Sr(r);
  }
  deserializeAsyncIteratorFactoryInstance(e) {
    this.deserialize(e.a[0]);
    let r = this.deserialize(e.a[1]);
    return vr(r);
  }
  deserializeStreamConstructor(e) {
    let r = this.assignIndexedValue(e.i, C$1()), i = e.a.length;
    if (i) for (let a = 0; a < i; a++) this.deserialize(e.a[a]);
    return r;
  }
  deserializeStreamNext(e) {
    let r = this.refs.get(e.i);
    P$1(r, new v("Stream")), r.next(this.deserialize(e.f));
  }
  deserializeStreamThrow(e) {
    let r = this.refs.get(e.i);
    P$1(r, new v("Stream")), r.throw(this.deserialize(e.f));
  }
  deserializeStreamReturn(e) {
    let r = this.refs.get(e.i);
    P$1(r, new v("Stream")), r.return(this.deserialize(e.f));
  }
  deserializeIteratorFactory(e) {
    this.deserialize(e.f);
  }
  deserializeAsyncIteratorFactory(e) {
    this.deserialize(e.a[1]);
  }
  deserializeAbortSignalConstructor(e) {
    return this.assignIndexedValue(e.i, new AbortController()).signal;
  }
  deserializeAbortSignalAbort(e) {
    let r = this.refs.get(e.i);
    P$1(r, new v("AbortSignal")), r.abort(this.deserialize(e.a[1]));
  }
  deserializeAbortSignalSync(e) {
    return this.assignIndexedValue(e.i, AbortSignal.abort(this.deserialize(e.f)));
  }
  deserialize(e) {
    try {
      switch (e.t) {
        case 2:
          return Dt$1[e.s];
        case 0:
          return e.s;
        case 1:
          return A$2(e.s);
        case 3:
          return BigInt(e.s);
        case 4:
          return this.refs.get(e.i);
        case 18:
          return this.deserializeReference(e);
        case 9:
          return this.deserializeArray(e);
        case 10:
        case 11:
          return this.deserializeObject(e);
        case 5:
          return this.deserializeDate(e);
        case 6:
          return this.deserializeRegExp(e);
        case 7:
          return this.deserializeSet(e);
        case 8:
          return this.deserializeMap(e);
        case 19:
          return this.deserializeArrayBuffer(e);
        case 16:
        case 15:
          return this.deserializeTypedArray(e);
        case 20:
          return this.deserializeDataView(e);
        case 14:
          return this.deserializeAggregateError(e);
        case 13:
          return this.deserializeError(e);
        case 12:
          return this.deserializePromise(e);
        case 17:
          return Tt$1[e.s];
        case 21:
          return this.deserializeBoxed(e);
        case 25:
          return this.deserializePlugin(e);
        case 22:
          return this.deserializePromiseConstructor(e);
        case 23:
          return this.deserializePromiseResolve(e);
        case 24:
          return this.deserializePromiseReject(e);
        case 28:
          return this.deserializeIteratorFactoryInstance(e);
        case 30:
          return this.deserializeAsyncIteratorFactoryInstance(e);
        case 31:
          return this.deserializeStreamConstructor(e);
        case 32:
          return this.deserializeStreamNext(e);
        case 33:
          return this.deserializeStreamThrow(e);
        case 34:
          return this.deserializeStreamReturn(e);
        case 27:
          return this.deserializeIteratorFactory(e);
        case 29:
          return this.deserializeAsyncIteratorFactory(e);
        case 36:
          return this.deserializeAbortSignalAbort(e);
        case 35:
          return this.deserializeAbortSignalConstructor(e);
        case 37:
          return this.deserializeAbortSignalSync(e);
        default:
          throw new Ke$1(e);
      }
    } catch (r) {
      throw new hr(r);
    }
  }
}, kr = /^[$A-Z_][0-9A-Z_$]*$/i;
function be$3(t) {
  let e = t[0];
  return (e === "$" || e === "_" || e >= "A" && e <= "Z" || e >= "a" && e <= "z") && kr.test(t);
}
function R$3(t) {
  switch (t.t) {
    case 0:
      return t.s + "=" + t.v;
    case 2:
      return t.s + ".set(" + t.k + "," + t.v + ")";
    case 1:
      return t.s + ".add(" + t.v + ")";
    case 3:
      return t.s + ".delete(" + t.k + ")";
  }
}
function Ir(t) {
  let e = [], r = t[0];
  for (let i = 1, a = t.length, n, o = r; i < a; i++) n = t[i], n.t === 0 && n.v === o.v ? r = { t: 0, s: n.s, k: s$2, v: R$3(r) } : n.t === 2 && n.s === o.s ? r = { t: 2, s: R$3(r), k: n.k, v: n.v } : n.t === 1 && n.s === o.s ? r = { t: 1, s: R$3(r), k: s$2, v: n.v } : n.t === 3 && n.s === o.s ? r = { t: 3, s: R$3(r), k: n.k, v: s$2 } : (e.push(r), r = n), o = n;
  return e.push(r), e;
}
function xe$3(t) {
  if (t.length) {
    let e = "", r = Ir(t);
    for (let i = 0, a = r.length; i < a; i++) e += R$3(r[i]) + ",";
    return e;
  }
  return s$2;
}
var Er = "Object.create(null)", _r = "new Set", Cr = "new Map", $r = "Promise.resolve", Tr = "Promise.reject", Wr = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: s$2 }, Dr = class {
  constructor(e) {
    this.stack = [], this.flags = [], this.assignments = [], this.plugins = e.plugins, this.features = e.features, this.marked = new Set(e.markedRefs);
  }
  createFunction(e, r) {
    return this.features & 2 ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
  }
  createEffectfulFunction(e, r) {
    return this.features & 2 ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
  }
  markRef(e) {
    this.marked.add(e);
  }
  isMarked(e) {
    return this.marked.has(e);
  }
  pushObjectFlag(e, r) {
    e !== 0 && (this.markRef(r), this.flags.push({ type: e, value: this.getRefParam(r) }));
  }
  resolveFlags() {
    let e = "";
    for (let r = 0, i = this.flags, a = i.length; r < a; r++) {
      let n = i[r];
      e += Wr[n.type] + "(" + n.value + "),";
    }
    return e;
  }
  resolvePatches() {
    let e = xe$3(this.assignments), r = this.resolveFlags();
    return e ? r ? e + r : e : r;
  }
  createAssignment(e, r) {
    this.assignments.push({ t: 0, s: e, k: s$2, v: r });
  }
  createAddAssignment(e, r) {
    this.assignments.push({ t: 1, s: this.getRefParam(e), k: s$2, v: r });
  }
  createSetAssignment(e, r, i) {
    this.assignments.push({ t: 2, s: this.getRefParam(e), k: r, v: i });
  }
  createDeleteAssignment(e, r) {
    this.assignments.push({ t: 3, s: this.getRefParam(e), k: r, v: s$2 });
  }
  createArrayAssign(e, r, i) {
    this.createAssignment(this.getRefParam(e) + "[" + r + "]", i);
  }
  createObjectAssign(e, r, i) {
    this.createAssignment(this.getRefParam(e) + "." + r, i);
  }
  isIndexedValueInStack(e) {
    return e.t === 4 && this.stack.includes(e.i);
  }
  serializeReference(e) {
    return this.assignIndexedValue(e.i, z$1 + '.get("' + e.s + '")');
  }
  serializeArrayItem(e, r, i) {
    return r ? this.isIndexedValueInStack(r) ? (this.markRef(e), this.createArrayAssign(e, i, this.getRefParam(r.i)), "") : this.serialize(r) : "";
  }
  serializeArray(e) {
    let r = e.i;
    if (e.l) {
      this.stack.push(r);
      let i = e.a, a = this.serializeArrayItem(r, i[0], 0), n = a === "";
      for (let o = 1, l = e.l, c; o < l; o++) c = this.serializeArrayItem(r, i[o], o), a += "," + c, n = c === "";
      return this.stack.pop(), this.pushObjectFlag(e.o, e.i), this.assignIndexedValue(r, "[" + a + (n ? ",]" : "]"));
    }
    return this.assignIndexedValue(r, "[]");
  }
  serializeProperty(e, r, i) {
    if (typeof r == "string") {
      let a = Number(r), n = a >= 0 && a.toString() === r || be$3(r);
      if (this.isIndexedValueInStack(i)) {
        let o = this.getRefParam(i.i);
        return this.markRef(e.i), n && a !== a ? this.createObjectAssign(e.i, r, o) : this.createArrayAssign(e.i, n ? r : '"' + r + '"', o), "";
      }
      return (n ? r : '"' + r + '"') + ":" + this.serialize(i);
    }
    return "[" + this.serialize(r) + "]:" + this.serialize(i);
  }
  serializeProperties(e, r) {
    let i = r.s;
    if (i) {
      let a = r.k, n = r.v;
      this.stack.push(e.i);
      let o = this.serializeProperty(e, a[0], n[0]);
      for (let l = 1, c = o; l < i; l++) c = this.serializeProperty(e, a[l], n[l]), o += (c && o && ",") + c;
      return this.stack.pop(), "{" + o + "}";
    }
    return "{}";
  }
  serializeObject(e) {
    return this.pushObjectFlag(e.o, e.i), this.assignIndexedValue(e.i, this.serializeProperties(e, e.p));
  }
  serializeWithObjectAssign(e, r, i) {
    let a = this.serializeProperties(e, r);
    return a !== "{}" ? "Object.assign(" + i + "," + a + ")" : i;
  }
  serializeStringKeyAssignment(e, r, i, a) {
    let n = this.serialize(a), o = Number(i), l = o >= 0 && o.toString() === i || be$3(i);
    if (this.isIndexedValueInStack(a)) l && o !== o ? this.createObjectAssign(e.i, i, n) : this.createArrayAssign(e.i, l ? i : '"' + i + '"', n);
    else {
      let c = this.assignments;
      this.assignments = r, l && o !== o ? this.createObjectAssign(e.i, i, n) : this.createArrayAssign(e.i, l ? i : '"' + i + '"', n), this.assignments = c;
    }
  }
  serializeAssignment(e, r, i, a) {
    if (typeof i == "string") this.serializeStringKeyAssignment(e, r, i, a);
    else {
      let n = this.stack;
      this.stack = [];
      let o = this.serialize(a);
      this.stack = n;
      let l = this.assignments;
      this.assignments = r, this.createArrayAssign(e.i, this.serialize(i), o), this.assignments = l;
    }
  }
  serializeAssignments(e, r) {
    let i = r.s;
    if (i) {
      let a = [], n = r.k, o = r.v;
      this.stack.push(e.i);
      for (let l = 0; l < i; l++) this.serializeAssignment(e, a, n[l], o[l]);
      return this.stack.pop(), xe$3(a);
    }
    return s$2;
  }
  serializeDictionary(e, r) {
    if (e.p) if (this.features & 8) r = this.serializeWithObjectAssign(e, e.p, r);
    else {
      this.markRef(e.i);
      let i = this.serializeAssignments(e, e.p);
      if (i) return "(" + this.assignIndexedValue(e.i, r) + "," + i + this.getRefParam(e.i) + ")";
    }
    return this.assignIndexedValue(e.i, r);
  }
  serializeNullConstructor(e) {
    return this.pushObjectFlag(e.o, e.i), this.serializeDictionary(e, Er);
  }
  serializeDate(e) {
    return this.assignIndexedValue(e.i, 'new Date("' + e.s + '")');
  }
  serializeRegExp(e) {
    return this.assignIndexedValue(e.i, "/" + e.c + "/" + e.m);
  }
  serializeSetItem(e, r) {
    return this.isIndexedValueInStack(r) ? (this.markRef(e), this.createAddAssignment(e, this.getRefParam(r.i)), "") : this.serialize(r);
  }
  serializeSet(e) {
    let r = _r, i = e.l, a = e.i;
    if (i) {
      let n = e.a;
      this.stack.push(a);
      let o = this.serializeSetItem(a, n[0]);
      for (let l = 1, c = o; l < i; l++) c = this.serializeSetItem(a, n[l]), o += (c && o && ",") + c;
      this.stack.pop(), o && (r += "([" + o + "])");
    }
    return this.assignIndexedValue(a, r);
  }
  serializeMapEntry(e, r, i, a) {
    if (this.isIndexedValueInStack(r)) {
      let n = this.getRefParam(r.i);
      if (this.markRef(e), this.isIndexedValueInStack(i)) {
        let l = this.getRefParam(i.i);
        return this.createSetAssignment(e, n, l), "";
      }
      if (i.t !== 4 && i.i != null && this.isMarked(i.i)) {
        let l = "(" + this.serialize(i) + ",[" + a + "," + a + "])";
        return this.createSetAssignment(e, n, this.getRefParam(i.i)), this.createDeleteAssignment(e, a), l;
      }
      let o = this.stack;
      return this.stack = [], this.createSetAssignment(e, n, this.serialize(i)), this.stack = o, "";
    }
    if (this.isIndexedValueInStack(i)) {
      let n = this.getRefParam(i.i);
      if (this.markRef(e), r.t !== 4 && r.i != null && this.isMarked(r.i)) {
        let l = "(" + this.serialize(r) + ",[" + a + "," + a + "])";
        return this.createSetAssignment(e, this.getRefParam(r.i), n), this.createDeleteAssignment(e, a), l;
      }
      let o = this.stack;
      return this.stack = [], this.createSetAssignment(e, this.serialize(r), n), this.stack = o, "";
    }
    return "[" + this.serialize(r) + "," + this.serialize(i) + "]";
  }
  serializeMap(e) {
    let r = Cr, i = e.e.s, a = e.i, n = e.f, o = this.getRefParam(n.i);
    if (i) {
      let l = e.e.k, c = e.e.v;
      this.stack.push(a);
      let u = this.serializeMapEntry(a, l[0], c[0], o);
      for (let d = 1, m = u; d < i; d++) m = this.serializeMapEntry(a, l[d], c[d], o), u += (m && u && ",") + m;
      this.stack.pop(), u && (r += "([" + u + "])");
    }
    return n.t === 26 && (this.markRef(n.i), r = "(" + this.serialize(n) + "," + r + ")"), this.assignIndexedValue(a, r);
  }
  serializeArrayBuffer(e) {
    let r = "new Uint8Array(", i = e.s, a = i.length;
    if (a) {
      r += "[" + i[0];
      for (let n = 1; n < a; n++) r += "," + i[n];
      r += "]";
    }
    return this.assignIndexedValue(e.i, r + ").buffer");
  }
  serializeTypedArray(e) {
    return this.assignIndexedValue(e.i, "new " + e.c + "(" + this.serialize(e.f) + "," + e.b + "," + e.l + ")");
  }
  serializeDataView(e) {
    return this.assignIndexedValue(e.i, "new DataView(" + this.serialize(e.f) + "," + e.b + "," + e.l + ")");
  }
  serializeAggregateError(e) {
    let r = e.i;
    this.stack.push(r);
    let i = this.serializeDictionary(e, 'new AggregateError([],"' + e.m + '")');
    return this.stack.pop(), i;
  }
  serializeError(e) {
    return this.serializeDictionary(e, "new " + Ne$1[e.s] + '("' + e.m + '")');
  }
  serializePromise(e) {
    let r, i = e.f, a = e.i, n = e.s ? $r : Tr;
    if (this.isIndexedValueInStack(i)) {
      let o = this.getRefParam(i.i);
      r = n + (e.s ? "().then(" + this.createFunction([], o) + ")" : "().catch(" + this.createEffectfulFunction([], "throw " + o) + ")");
    } else {
      this.stack.push(a);
      let o = this.serialize(i);
      this.stack.pop(), r = n + "(" + o + ")";
    }
    return this.assignIndexedValue(a, r);
  }
  serializeWellKnownSymbol(e) {
    return this.assignIndexedValue(e.i, $t$1[e.s]);
  }
  serializeBoxed(e) {
    return this.assignIndexedValue(e.i, "Object(" + this.serialize(e.f) + ")");
  }
  serializePlugin(e) {
    let r = this.plugins;
    if (r) for (let i = 0, a = r.length; i < a; i++) {
      let n = r[i];
      if (n.tag === e.c) return this.assignIndexedValue(e.i, n.serialize(e.s, this, { id: e.i }));
    }
    throw new Xe(e.c);
  }
  getConstructor(e) {
    let r = this.serialize(e);
    return r === this.getRefParam(e.i) ? r : "(" + r + ")";
  }
  serializePromiseConstructor(e) {
    return this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()");
  }
  serializePromiseResolve(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serializePromiseReject(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serializeSpecialReferenceValue(e) {
    switch (e) {
      case 0:
        return "[]";
      case 1:
        return this.createFunction(["s", "f", "p"], "((p=new Promise(" + this.createEffectfulFunction(["a", "b"], "s=a,f=b") + ")).s=s,p.f=f,p)");
      case 2:
        return this.createEffectfulFunction(["p", "d"], 'p.s(d),p.status="success",p.value=d;delete p.s;delete p.f');
      case 3:
        return this.createEffectfulFunction(["p", "d"], 'p.f(d),p.status="failure",p.value=d;delete p.s;delete p.f');
      case 4:
        return this.createFunction(["b", "a", "s", "l", "p", "f", "e", "n"], "(b=[],a=!0,s=!1,l=[],p=0,f=" + this.createEffectfulFunction(["v", "m", "x"], "for(x=0;x<p;x++)l[x]&&l[x][m](v)") + ",n=" + this.createEffectfulFunction(["o", "x", "z", "c"], 'for(x=0,z=b.length;x<z;x++)(c=b[x],(!a&&x===z-1)?o[s?"return":"throw"](c):o.next(c))') + ",e=" + this.createFunction(["o", "t"], "(a&&(l[t=p++]=o),n(o)," + this.createEffectfulFunction([], "a&&(l[t]=void 0)") + ")") + ",{__SEROVAL_STREAM__:!0,on:" + this.createFunction(["o"], "e(o)") + ",next:" + this.createEffectfulFunction(["v"], 'a&&(b.push(v),f(v,"next"))') + ",throw:" + this.createEffectfulFunction(["v"], 'a&&(b.push(v),f(v,"throw"),a=s=!1,l.length=0)') + ",return:" + this.createEffectfulFunction(["v"], 'a&&(b.push(v),f(v,"return"),a=!1,s=!0,l.length=0)') + "})");
      case 5:
        return this.createFunction(["a", "s"], "((s=(a=new AbortController).signal).a=a,s)");
      case 6:
        return this.createEffectfulFunction(["s", "r"], "s.a.abort(r);delete s.a");
      default:
        return "";
    }
  }
  serializeSpecialReference(e) {
    return this.assignIndexedValue(e.i, this.serializeSpecialReferenceValue(e.s));
  }
  serializeIteratorFactory(e) {
    let r = "", i = false;
    return e.f.t !== 4 && (this.markRef(e.f.i), r = "(" + this.serialize(e.f) + ",", i = true), r += this.assignIndexedValue(e.i, this.createFunction(["s"], this.createFunction(["i", "c", "d", "t"], "(i=0,t={[" + this.getRefParam(e.f.i) + "]:" + this.createFunction([], "t") + ",next:" + this.createEffectfulFunction([], "if(i>s.d)return{done:!0,value:void 0};if(d=s.v[c=i++],c===s.t)throw d;return{done:c===s.d,value:d}") + "})"))), i && (r += ")"), r;
  }
  serializeIteratorFactoryInstance(e) {
    return this.getConstructor(e.a[0]) + "(" + this.serialize(e.a[1]) + ")";
  }
  serializeAsyncIteratorFactory(e) {
    let r = e.a[0], i = e.a[1], a = "";
    r.t !== 4 && (this.markRef(r.i), a += "(" + this.serialize(r)), i.t !== 4 && (this.markRef(i.i), a += (a ? "," : "(") + this.serialize(i)), a && (a += ",");
    let n = this.assignIndexedValue(e.i, this.createFunction(["s"], this.createFunction(["b", "c", "p", "d", "e", "t", "f"], "(b=[],c=0,p=[],d=-1,e=!1,f=" + this.createEffectfulFunction(["i", "l"], "for(i=0,l=p.length;i<l;i++)p[i].s({done:!0,value:void 0})") + ",s.on({next:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.s({done:!1,value:v});b.push(v)") + ",throw:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.f(v);f(),d=b.length,e=!0,b.push(v)") + ",return:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.s({done:!0,value:v});f(),d=b.length,b.push(v)") + "}),t={[" + this.getRefParam(i.i) + "]:" + this.createFunction([], "t") + ",next:" + this.createEffectfulFunction(["i", "t", "v"], "if(d===-1){return((i=c++)>=b.length)?(p.push(t=" + this.getRefParam(r.i) + "()),t):{done:!1,value:b[i]}}if(c>d)return{done:!0,value:void 0};if(v=b[i=c++],i!==d)return{done:!1,value:v};if(e)throw v;return{done:!0,value:v}") + "})")));
    return a ? a + n + ")" : n;
  }
  serializeAsyncIteratorFactoryInstance(e) {
    return this.getConstructor(e.a[0]) + "(" + this.serialize(e.a[1]) + ")";
  }
  serializeStreamConstructor(e) {
    let r = this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()"), i = e.a.length;
    if (i) {
      let a = this.serialize(e.a[0]);
      for (let n = 1; n < i; n++) a += "," + this.serialize(e.a[n]);
      return "(" + r + "," + a + "," + this.getRefParam(e.i) + ")";
    }
    return r;
  }
  serializeStreamNext(e) {
    return this.getRefParam(e.i) + ".next(" + this.serialize(e.f) + ")";
  }
  serializeStreamThrow(e) {
    return this.getRefParam(e.i) + ".throw(" + this.serialize(e.f) + ")";
  }
  serializeStreamReturn(e) {
    return this.getRefParam(e.i) + ".return(" + this.serialize(e.f) + ")";
  }
  serializeAbortSignalSync(e) {
    return this.assignIndexedValue(e.i, "AbortSignal.abort(" + this.serialize(e.f) + ")");
  }
  serializeAbortSignalConstructor(e) {
    return this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()");
  }
  serializeAbortSignalAbort(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serialize(e) {
    try {
      switch (e.t) {
        case 2:
          return Wt$1[e.s];
        case 0:
          return "" + e.s;
        case 1:
          return '"' + e.s + '"';
        case 3:
          return e.s + "n";
        case 4:
          return this.getRefParam(e.i);
        case 18:
          return this.serializeReference(e);
        case 9:
          return this.serializeArray(e);
        case 10:
          return this.serializeObject(e);
        case 11:
          return this.serializeNullConstructor(e);
        case 5:
          return this.serializeDate(e);
        case 6:
          return this.serializeRegExp(e);
        case 7:
          return this.serializeSet(e);
        case 8:
          return this.serializeMap(e);
        case 19:
          return this.serializeArrayBuffer(e);
        case 16:
        case 15:
          return this.serializeTypedArray(e);
        case 20:
          return this.serializeDataView(e);
        case 14:
          return this.serializeAggregateError(e);
        case 13:
          return this.serializeError(e);
        case 12:
          return this.serializePromise(e);
        case 17:
          return this.serializeWellKnownSymbol(e);
        case 21:
          return this.serializeBoxed(e);
        case 22:
          return this.serializePromiseConstructor(e);
        case 23:
          return this.serializePromiseResolve(e);
        case 24:
          return this.serializePromiseReject(e);
        case 25:
          return this.serializePlugin(e);
        case 26:
          return this.serializeSpecialReference(e);
        case 27:
          return this.serializeIteratorFactory(e);
        case 28:
          return this.serializeIteratorFactoryInstance(e);
        case 29:
          return this.serializeAsyncIteratorFactory(e);
        case 30:
          return this.serializeAsyncIteratorFactoryInstance(e);
        case 31:
          return this.serializeStreamConstructor(e);
        case 32:
          return this.serializeStreamNext(e);
        case 33:
          return this.serializeStreamThrow(e);
        case 34:
          return this.serializeStreamReturn(e);
        case 36:
          return this.serializeAbortSignalAbort(e);
        case 35:
          return this.serializeAbortSignalConstructor(e);
        case 37:
          return this.serializeAbortSignalSync(e);
        default:
          throw new Ke$1(e);
      }
    } catch (r) {
      throw new pr(r);
    }
  }
}, Fr = class extends Dr {
  constructor(t) {
    super(t), this.mode = "cross", this.scopeId = t.scopeId;
  }
  getRefParam(t) {
    return F$2 + "[" + t + "]";
  }
  assignIndexedValue(t, e) {
    return this.getRefParam(t) + "=" + e;
  }
  serializeTop(t) {
    let e = this.serialize(t), r = t.i;
    if (r == null) return e;
    let i = this.resolvePatches(), a = this.getRefParam(r), n = this.scopeId == null ? "" : F$2, o = i ? "(" + e + "," + i + a + ")" : e;
    if (n === "") return t.t === 10 && !i ? "(" + o + ")" : o;
    let l = this.scopeId == null ? "()" : "(" + F$2 + '["' + g(this.scopeId) + '"])';
    return "(" + this.createFunction([n], o) + ")" + l;
  }
}, Ur = class extends wr {
  parseItems(t) {
    let e = [];
    for (let r = 0, i = t.length; r < i; r++) r in t && (e[r] = this.parse(t[r]));
    return e;
  }
  parseArray(t, e) {
    return Zt$1(t, e, this.parseItems(e));
  }
  parseProperties(t) {
    let e = Object.entries(t), r = [], i = [];
    for (let n = 0, o = e.length; n < o; n++) r.push(g(e[n][0])), i.push(this.parse(e[n][1]));
    let a = Symbol.iterator;
    return a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(Be(this.parseIteratorFactory(), this.parse(Ge(t))))), a = Symbol.asyncIterator, a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(qe$1(this.parseAsyncIteratorFactory(), this.parse(C$1())))), a = Symbol.toStringTag, a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(K$1(t[a]))), a = Symbol.isConcatSpreadable, a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(t[a] ? q$2 : H$3)), { k: r, v: i, s: r.length };
  }
  parsePlainObject(t, e, r) {
    return this.createObjectNode(t, e, r, this.parseProperties(e));
  }
  parseBoxed(t, e) {
    return Qt$1(t, this.parse(e.valueOf()));
  }
  parseTypedArray(t, e) {
    return er(t, e, this.parse(e.buffer));
  }
  parseBigIntTypedArray(t, e) {
    return tr(t, e, this.parse(e.buffer));
  }
  parseDataView(t, e) {
    return rr(t, e, this.parse(e.buffer));
  }
  parseError(t, e) {
    let r = Pe$2(e, this.features);
    return sr(t, e, r ? this.parseProperties(r) : s$2);
  }
  parseAggregateError(t, e) {
    let r = Pe$2(e, this.features);
    return ir(t, e, r ? this.parseProperties(r) : s$2);
  }
  parseMap(t, e) {
    let r = [], i = [];
    for (let [a, n] of e.entries()) r.push(this.parse(a)), i.push(this.parse(n));
    return this.createMapNode(t, r, i, e.size);
  }
  parseSet(t, e) {
    let r = [];
    for (let i of e.keys()) r.push(this.parse(i));
    return ar(t, e.size, r);
  }
  parsePlugin(t, e) {
    let r = this.plugins;
    if (r) for (let i = 0, a = r.length; i < a; i++) {
      let n = r[i];
      if (n.parse.sync && n.test(e)) return je$1(t, n.tag, n.parse.sync(e, this, { id: t }));
    }
  }
  parseStream(t, e) {
    return He$2(t, this.parseSpecialReference(4), []);
  }
  parsePromise(t, e) {
    return this.createPromiseConstructorNode(t);
  }
  parseAbortSignalSync(t, e) {
    return h$1(37, t, s$2, s$2, s$2, s$2, s$2, s$2, s$2, this.parse(e.reason), s$2, s$2);
  }
  parseAbortSignal(t, e) {
    return e.aborted ? this.parseAbortSignalSync(t, e) : this.createAbortSignalConstructorNode(t);
  }
  parseObject(t, e) {
    if (Array.isArray(e)) return this.parseArray(t, e);
    if (xr(e)) return this.parseStream(t, e);
    let r = e.constructor;
    if (r === mr) return this.parse(e.replacement);
    let i = this.parsePlugin(t, e);
    if (i) return i;
    switch (r) {
      case Object:
        return this.parsePlainObject(t, e, false);
      case void 0:
        return this.parsePlainObject(t, e, true);
      case Date:
        return Kt$1(t, e);
      case RegExp:
        return Xt$1(t, e);
      case Error:
      case EvalError:
      case RangeError:
      case ReferenceError:
      case SyntaxError:
      case TypeError:
      case URIError:
        return this.parseError(t, e);
      case Number:
      case Boolean:
      case String:
      case BigInt:
        return this.parseBoxed(t, e);
      case ArrayBuffer:
        return Gt$1(t, e);
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case Uint8Array:
      case Uint16Array:
      case Uint32Array:
      case Uint8ClampedArray:
      case Float32Array:
      case Float64Array:
        return this.parseTypedArray(t, e);
      case DataView:
        return this.parseDataView(t, e);
      case Map:
        return this.parseMap(t, e);
      case Set:
        return this.parseSet(t, e);
    }
    if (r === Promise || e instanceof Promise) return this.parsePromise(t, e);
    let a = this.features;
    if (a & 32 && typeof AbortSignal < "u" && r === AbortSignal) return this.parseAbortSignal(t, e);
    if (a & 16) switch (r) {
      case BigInt64Array:
      case BigUint64Array:
        return this.parseBigIntTypedArray(t, e);
    }
    if (a & 1 && typeof AggregateError < "u" && (r === AggregateError || e instanceof AggregateError)) return this.parseAggregateError(t, e);
    if (e instanceof Error) return this.parseError(t, e);
    if (Symbol.iterator in e || Symbol.asyncIterator in e) return this.parsePlainObject(t, e, !!r);
    throw new U$1(e);
  }
  parseFunction(t) {
    let e = this.getReference(t);
    if (e.type !== 0) return e.value;
    let r = this.parsePlugin(e.value, t);
    if (r) return r;
    throw new U$1(t);
  }
  parse(t) {
    try {
      switch (typeof t) {
        case "boolean":
          return t ? q$2 : H$3;
        case "undefined":
          return Ut$1;
        case "string":
          return K$1(t);
        case "number":
          return Bt(t);
        case "bigint":
          return qt$1(t);
        case "object": {
          if (t) {
            let e = this.getReference(t);
            return e.type === 0 ? this.parseObject(e.value, t) : e.value;
          }
          return Ot$1;
        }
        case "symbol":
          return this.parseWellKnownSymbol(t);
        case "function":
          return this.parseFunction(t);
        default:
          throw new U$1(t);
      }
    } catch (e) {
      throw new ur(e);
    }
  }
}, Or = class extends Ur {
  constructor(e) {
    super(e), this.alive = true, this.pending = 0, this.initial = true, this.buffer = [], this.onParseCallback = e.onParse, this.onErrorCallback = e.onError, this.onDoneCallback = e.onDone;
  }
  onParseInternal(e, r) {
    try {
      this.onParseCallback(e, r);
    } catch (i) {
      this.onError(i);
    }
  }
  flush() {
    for (let e = 0, r = this.buffer.length; e < r; e++) this.onParseInternal(this.buffer[e], false);
  }
  onParse(e) {
    this.initial ? this.buffer.push(e) : this.onParseInternal(e, false);
  }
  onError(e) {
    if (this.onErrorCallback) this.onErrorCallback(e);
    else throw e;
  }
  onDone() {
    this.onDoneCallback && this.onDoneCallback();
  }
  pushPendingState() {
    this.pending++;
  }
  popPendingState() {
    --this.pending <= 0 && this.onDone();
  }
  parseProperties(e) {
    let r = Object.entries(e), i = [], a = [];
    for (let o = 0, l = r.length; o < l; o++) i.push(g(r[o][0])), a.push(this.parse(r[o][1]));
    let n = Symbol.iterator;
    return n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(Be(this.parseIteratorFactory(), this.parse(Ge(e))))), n = Symbol.asyncIterator, n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(qe$1(this.parseAsyncIteratorFactory(), this.parse(Ar(e))))), n = Symbol.toStringTag, n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(K$1(e[n]))), n = Symbol.isConcatSpreadable, n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(e[n] ? q$2 : H$3)), { k: i, v: a, s: i.length };
  }
  parsePromise(e, r) {
    return r.then((i) => {
      let a = this.parseWithError(i);
      a && this.onParse(h$1(23, e, s$2, s$2, s$2, s$2, s$2, s$2, [this.parseSpecialReference(2), a], s$2, s$2, s$2)), this.popPendingState();
    }, (i) => {
      if (this.alive) {
        let a = this.parseWithError(i);
        a && this.onParse(h$1(24, e, s$2, s$2, s$2, s$2, s$2, s$2, [this.parseSpecialReference(3), a], s$2, s$2, s$2));
      }
      this.popPendingState();
    }), this.pushPendingState(), this.createPromiseConstructorNode(e);
  }
  parsePlugin(e, r) {
    let i = this.plugins;
    if (i) for (let a = 0, n = i.length; a < n; a++) {
      let o = i[a];
      if (o.parse.stream && o.test(r)) return je$1(e, o.tag, o.parse.stream(r, this, { id: e }));
    }
    return s$2;
  }
  parseStream(e, r) {
    let i = He$2(e, this.parseSpecialReference(4), []);
    return this.pushPendingState(), r.on({ next: (a) => {
      if (this.alive) {
        let n = this.parseWithError(a);
        n && this.onParse(nr(e, n));
      }
    }, throw: (a) => {
      if (this.alive) {
        let n = this.parseWithError(a);
        n && this.onParse(or(e, n));
      }
      this.popPendingState();
    }, return: (a) => {
      if (this.alive) {
        let n = this.parseWithError(a);
        n && this.onParse(lr(e, n));
      }
      this.popPendingState();
    } }), i;
  }
  handleAbortSignal(e, r) {
    if (this.alive) {
      let i = this.parseWithError(r.reason);
      i && this.onParse(h$1(36, e, s$2, s$2, s$2, s$2, s$2, s$2, [this.parseSpecialReference(6), i], s$2, s$2, s$2));
    }
    this.popPendingState();
  }
  parseAbortSignal(e, r) {
    return r.aborted ? this.parseAbortSignalSync(e, r) : (this.pushPendingState(), r.addEventListener("abort", this.handleAbortSignal.bind(this, e, r), { once: true }), this.createAbortSignalConstructorNode(e));
  }
  parseWithError(e) {
    try {
      return this.parse(e);
    } catch (r) {
      return this.onError(r), s$2;
    }
  }
  start(e) {
    let r = this.parseWithError(e);
    r && (this.onParseInternal(r, true), this.initial = false, this.flush(), this.pending <= 0 && this.destroy());
  }
  destroy() {
    this.alive && (this.onDone(), this.alive = false);
  }
  isAlive() {
    return this.alive;
  }
}, Mr = class extends Or {
  constructor() {
    super(...arguments), this.mode = "cross";
  }
};
function Lr(t, e) {
  let r = Me$1(e.plugins), i = new Mr({ plugins: r, refs: e.refs, disabledFeatures: e.disabledFeatures, onParse(a, n) {
    let o = new Fr({ plugins: r, features: i.features, scopeId: e.scopeId, markedRefs: i.marked }), l;
    try {
      l = o.serializeTop(a);
    } catch (c) {
      e.onError && e.onError(c);
      return;
    }
    e.onSerialize(l, n);
  }, onError: e.onError, onDone: e.onDone });
  return i.start(t), i.destroy.bind(i);
}
var Nr = class extends Rr {
  constructor(t) {
    super(t), this.mode = "vanilla", this.marked = new Set(t.markedRefs);
  }
  assignIndexedValue(t, e) {
    return this.marked.has(t) && this.refs.set(t, e), e;
  }
};
function Ae$1(t, e = {}) {
  let r = Me$1(e.plugins);
  return new Nr({ plugins: r, markedRefs: t.m }).deserialize(t.t);
}
function M$4(t) {
  return { detail: t.detail, bubbles: t.bubbles, cancelable: t.cancelable, composed: t.composed };
}
var Vr = { tag: "seroval-plugins/web/CustomEvent", test(t) {
  return typeof CustomEvent > "u" ? false : t instanceof CustomEvent;
}, parse: { sync(t, e) {
  return { type: e.parse(t.type), options: e.parse(M$4(t)) };
}, async async(t, e) {
  return { type: await e.parse(t.type), options: await e.parse(M$4(t)) };
}, stream(t, e) {
  return { type: e.parse(t.type), options: e.parse(M$4(t)) };
} }, serialize(t, e) {
  return "new CustomEvent(" + e.serialize(t.type) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new CustomEvent(e.deserialize(t.type), e.deserialize(t.options));
} }, G$3 = Vr, jr = { tag: "seroval-plugins/web/DOMException", test(t) {
  return typeof DOMException > "u" ? false : t instanceof DOMException;
}, parse: { sync(t, e) {
  return { name: e.parse(t.name), message: e.parse(t.message) };
}, async async(t, e) {
  return { name: await e.parse(t.name), message: await e.parse(t.message) };
}, stream(t, e) {
  return { name: e.parse(t.name), message: e.parse(t.message) };
} }, serialize(t, e) {
  return "new DOMException(" + e.serialize(t.message) + "," + e.serialize(t.name) + ")";
}, deserialize(t, e) {
  return new DOMException(e.deserialize(t.message), e.deserialize(t.name));
} }, J$2 = jr;
function L$1(t) {
  return { bubbles: t.bubbles, cancelable: t.cancelable, composed: t.composed };
}
var Br = { tag: "seroval-plugins/web/Event", test(t) {
  return typeof Event > "u" ? false : t instanceof Event;
}, parse: { sync(t, e) {
  return { type: e.parse(t.type), options: e.parse(L$1(t)) };
}, async async(t, e) {
  return { type: await e.parse(t.type), options: await e.parse(L$1(t)) };
}, stream(t, e) {
  return { type: e.parse(t.type), options: e.parse(L$1(t)) };
} }, serialize(t, e) {
  return "new Event(" + e.serialize(t.type) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new Event(e.deserialize(t.type), e.deserialize(t.options));
} }, Y$4 = Br, qr = { tag: "seroval-plugins/web/File", test(t) {
  return typeof File > "u" ? false : t instanceof File;
}, parse: { async async(t, e) {
  return { name: await e.parse(t.name), options: await e.parse({ type: t.type, lastModified: t.lastModified }), buffer: await e.parse(await t.arrayBuffer()) };
} }, serialize(t, e) {
  return "new File([" + e.serialize(t.buffer) + "]," + e.serialize(t.name) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new File([e.deserialize(t.buffer)], e.deserialize(t.name), e.deserialize(t.options));
} }, Hr = qr;
function N$1(t) {
  let e = [];
  return t.forEach((r, i) => {
    e.push([i, r]);
  }), e;
}
var k$1 = {}, Kr = { tag: "seroval-plugins/web/FormDataFactory", test(t) {
  return t === k$1;
}, parse: { sync() {
}, async async() {
  return await Promise.resolve(void 0);
}, stream() {
} }, serialize(t, e) {
  return e.createEffectfulFunction(["e", "f", "i", "s", "t"], "f=new FormData;for(i=0,s=e.length;i<s;i++)f.append((t=e[i])[0],t[1]);return f");
}, deserialize() {
  return k$1;
} }, Xr = { tag: "seroval-plugins/web/FormData", extends: [Hr, Kr], test(t) {
  return typeof FormData > "u" ? false : t instanceof FormData;
}, parse: { sync(t, e) {
  return { factory: e.parse(k$1), entries: e.parse(N$1(t)) };
}, async async(t, e) {
  return { factory: await e.parse(k$1), entries: await e.parse(N$1(t)) };
}, stream(t, e) {
  return { factory: e.parse(k$1), entries: e.parse(N$1(t)) };
} }, serialize(t, e) {
  return "(" + e.serialize(t.factory) + ")(" + e.serialize(t.entries) + ")";
}, deserialize(t, e) {
  let r = new FormData(), i = e.deserialize(t.entries);
  for (let a = 0, n = i.length; a < n; a++) {
    let o = i[a];
    r.append(o[0], o[1]);
  }
  return r;
} }, Z$3 = Xr;
function V$2(t) {
  let e = [];
  return t.forEach((r, i) => {
    e.push([i, r]);
  }), e;
}
var Gr = { tag: "seroval-plugins/web/Headers", test(t) {
  return typeof Headers > "u" ? false : t instanceof Headers;
}, parse: { sync(t, e) {
  return e.parse(V$2(t));
}, async async(t, e) {
  return await e.parse(V$2(t));
}, stream(t, e) {
  return e.parse(V$2(t));
} }, serialize(t, e) {
  return "new Headers(" + e.serialize(t) + ")";
}, deserialize(t, e) {
  return new Headers(e.deserialize(t));
} }, E = Gr, I$1 = {}, Jr = { tag: "seroval-plugins/web/ReadableStreamFactory", test(t) {
  return t === I$1;
}, parse: { sync() {
}, async async() {
  return await Promise.resolve(void 0);
}, stream() {
} }, serialize(t, e) {
  return e.createFunction(["d"], "new ReadableStream({start:" + e.createEffectfulFunction(["c"], "d.on({next:" + e.createEffectfulFunction(["v"], "c.enqueue(v)") + ",throw:" + e.createEffectfulFunction(["v"], "c.error(v)") + ",return:" + e.createEffectfulFunction([], "c.close()") + "})") + "})");
}, deserialize() {
  return I$1;
} };
function ve$1(t) {
  let e = C$1(), r = t.getReader();
  async function i() {
    try {
      let a = await r.read();
      a.done ? e.return(a.value) : (e.next(a.value), await i());
    } catch (a) {
      e.throw(a);
    }
  }
  return i().catch(() => {
  }), e;
}
var Yr = { tag: "seroval/plugins/web/ReadableStream", extends: [Jr], test(t) {
  return typeof ReadableStream > "u" ? false : t instanceof ReadableStream;
}, parse: { sync(t, e) {
  return { factory: e.parse(I$1), stream: e.parse(C$1()) };
}, async async(t, e) {
  return { factory: await e.parse(I$1), stream: await e.parse(ve$1(t)) };
}, stream(t, e) {
  return { factory: e.parse(I$1), stream: e.parse(ve$1(t)) };
} }, serialize(t, e) {
  return "(" + e.serialize(t.factory) + ")(" + e.serialize(t.stream) + ")";
}, deserialize(t, e) {
  let r = e.deserialize(t.stream);
  return new ReadableStream({ start(i) {
    r.on({ next(a) {
      i.enqueue(a);
    }, throw(a) {
      i.error(a);
    }, return() {
      i.close();
    } });
  } });
} }, _$2 = Yr;
function Se$2(t, e) {
  return { body: e, cache: t.cache, credentials: t.credentials, headers: t.headers, integrity: t.integrity, keepalive: t.keepalive, method: t.method, mode: t.mode, redirect: t.redirect, referrer: t.referrer, referrerPolicy: t.referrerPolicy };
}
var Zr = { tag: "seroval-plugins/web/Request", extends: [_$2, E], test(t) {
  return typeof Request > "u" ? false : t instanceof Request;
}, parse: { async async(t, e) {
  return { url: await e.parse(t.url), options: await e.parse(Se$2(t, t.body ? await t.clone().arrayBuffer() : null)) };
}, stream(t, e) {
  return { url: e.parse(t.url), options: e.parse(Se$2(t, t.clone().body)) };
} }, serialize(t, e) {
  return "new Request(" + e.serialize(t.url) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new Request(e.deserialize(t.url), e.deserialize(t.options));
} }, Q$3 = Zr;
function we$1(t) {
  return { headers: t.headers, status: t.status, statusText: t.statusText };
}
var Qr = { tag: "seroval-plugins/web/Response", extends: [_$2, E], test(t) {
  return typeof Response > "u" ? false : t instanceof Response;
}, parse: { async async(t, e) {
  return { body: await e.parse(t.body ? await t.clone().arrayBuffer() : null), options: await e.parse(we$1(t)) };
}, stream(t, e) {
  return { body: e.parse(t.clone().body), options: e.parse(we$1(t)) };
} }, serialize(t, e) {
  return "new Response(" + e.serialize(t.body) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new Response(e.deserialize(t.body), e.deserialize(t.options));
} }, ee$3 = Qr, es$1 = { tag: "seroval-plugins/web/URLSearchParams", test(t) {
  return typeof URLSearchParams > "u" ? false : t instanceof URLSearchParams;
}, parse: { sync(t, e) {
  return e.parse(t.toString());
}, async async(t, e) {
  return await e.parse(t.toString());
}, stream(t, e) {
  return e.parse(t.toString());
} }, serialize(t, e) {
  return "new URLSearchParams(" + e.serialize(t) + ")";
}, deserialize(t, e) {
  return new URLSearchParams(e.deserialize(t));
} }, te$3 = es$1, ts$1 = { tag: "seroval-plugins/web/URL", test(t) {
  return typeof URL > "u" ? false : t instanceof URL;
}, parse: { sync(t, e) {
  return e.parse(t.href);
}, async async(t, e) {
  return await e.parse(t.href);
}, stream(t, e) {
  return e.parse(t.href);
} }, serialize(t, e) {
  return "new URL(" + e.serialize(t) + ")";
}, deserialize(t, e) {
  return new URL(e.deserialize(t));
} }, re$2 = ts$1;
const j$1 = "Invariant Violation", { setPrototypeOf: rs$1 = function(t, e) {
  return t.__proto__ = e, t;
} } = Object;
let oe$2 = class oe extends Error {
  constructor(e = j$1) {
    super(typeof e == "number" ? `${j$1}: ${e} (see https://github.com/apollographql/invariant-packages)` : e);
    __publicField$1(this, "framesToPop", 1);
    __publicField$1(this, "name", j$1);
    rs$1(this, oe.prototype);
  }
};
function ss$1(t, e) {
  if (!t) throw new oe$2(e);
}
const w$2 = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function is$1(t = {}) {
  const e = { options: t, rootNode: Je(), staticRoutesMap: {} }, r = (i) => t.strictTrailingSlash ? i : i.replace(/\/$/, "") || "/";
  if (t.routes) for (const i in t.routes) ze$1(e, r(i), t.routes[i]);
  return { ctx: e, lookup: (i) => as$1(e, r(i)), insert: (i, a) => ze$1(e, r(i), a), remove: (i) => ns$1(e, r(i)) };
}
function as$1(t, e) {
  const r = t.staticRoutesMap[e];
  if (r) return r.data;
  const i = e.split("/"), a = {};
  let n = false, o = null, l = t.rootNode, c = null;
  for (let u = 0; u < i.length; u++) {
    const d = i[u];
    l.wildcardChildNode !== null && (o = l.wildcardChildNode, c = i.slice(u).join("/"));
    const m = l.children.get(d);
    if (m === void 0) {
      if (l && l.placeholderChildren.length > 1) {
        const y = i.length - u;
        l = l.placeholderChildren.find((p) => p.maxDepth === y) || null;
      } else l = l.placeholderChildren[0] || null;
      if (!l) break;
      l.paramName && (a[l.paramName] = d), n = true;
    } else l = m;
  }
  return (l === null || l.data === null) && o !== null && (l = o, a[l.paramName || "_"] = c, n = true), l ? n ? { ...l.data, params: n ? a : void 0 } : l.data : null;
}
function ze$1(t, e, r) {
  let i = true;
  const a = e.split("/");
  let n = t.rootNode, o = 0;
  const l = [n];
  for (const c of a) {
    let u;
    if (u = n.children.get(c)) n = u;
    else {
      const d = os$1(c);
      u = Je({ type: d, parent: n }), n.children.set(c, u), d === w$2.PLACEHOLDER ? (u.paramName = c === "*" ? `_${o++}` : c.slice(1), n.placeholderChildren.push(u), i = false) : d === w$2.WILDCARD && (n.wildcardChildNode = u, u.paramName = c.slice(3) || "_", i = false), l.push(u), n = u;
    }
  }
  for (const [c, u] of l.entries()) u.maxDepth = Math.max(l.length - c, u.maxDepth || 0);
  return n.data = r, i === true && (t.staticRoutesMap[e] = n), n;
}
function ns$1(t, e) {
  let r = false;
  const i = e.split("/");
  let a = t.rootNode;
  for (const n of i) if (a = a.children.get(n), !a) return r;
  if (a.data) {
    const n = i.at(-1) || "";
    a.data = null, Object.keys(a.children).length === 0 && a.parent && (a.parent.children.delete(n), a.parent.wildcardChildNode = null, a.parent.placeholderChildren = []), r = true;
  }
  return r;
}
function Je(t = {}) {
  return { type: t.type || w$2.NORMAL, maxDepth: 0, parent: t.parent || null, children: /* @__PURE__ */ new Map(), data: t.data || null, paramName: t.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function os$1(t) {
  return t.startsWith("**") ? w$2.WILDCARD : t[0] === ":" || t === "*" ? w$2.PLACEHOLDER : w$2.NORMAL;
}
const Ye = [{ page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index.mjs'), import: () => import('../build/index.mjs') }, path: "/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/index.tsx" }, { page: true, $component: { src: "src/routes/[...404].tsx?pick=default&pick=$css", build: () => import('../build/_...404_.mjs'), import: () => import('../build/_...404_.mjs') }, path: "/*404", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/[...404].tsx" }, { page: false, $POST: { src: "src/routes/API/prova.ts?pick=POST", build: () => import('../build/prova.mjs'), import: () => import('../build/prova.mjs') }, path: "/API/prova", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/prova.ts" }, { page: true, $component: { src: "src/routes/UI/Cursor.tsx?pick=default&pick=$css", build: () => import('../build/Cursor.mjs'), import: () => import('../build/Cursor.mjs') }, path: "/UI/Cursor", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Cursor.tsx" }, { page: true, $component: { src: "src/routes/UI/Loading.tsx?pick=default&pick=$css", build: () => import('../build/Loading.mjs'), import: () => import('../build/Loading.mjs') }, path: "/UI/Loading", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Loading.tsx" }, { page: true, $component: { src: "src/routes/UI/Waves.tsx?pick=default&pick=$css", build: () => import('../build/Waves.mjs'), import: () => import('../build/Waves.mjs') }, path: "/UI/Waves", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Waves.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css", build: () => import('../build/index2.mjs'), import: () => import('../build/index2.mjs') }, path: "/(Pages)/LoginRegistration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css", build: () => import('../build/riv.mjs'), import: () => import('../build/riv.mjs') }, path: "/(Pages)/LoginRegistration/riv", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/riv.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css", build: () => import('../build/index3.mjs'), import: () => import('../build/index3.mjs') }, path: "/(Pages)/Wallets/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css", build: () => import('../build/_...slug_.mjs'), import: () => import('../build/_...slug_.mjs') }, path: "/(Pages)/Wallets/*slug", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/[...slug].tsx" }, { page: false, $POST: { src: "src/routes/API/Auth/logout.ts?pick=POST", build: () => import('../build/logout.mjs'), import: () => import('../build/logout.mjs') }, path: "/API/Auth/logout", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/logout.ts" }, { page: false, $POST: { src: "src/routes/API/Auth/refresh.ts?pick=POST", build: () => import('../build/refresh.mjs'), import: () => import('../build/refresh.mjs') }, path: "/API/Auth/refresh", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/refresh.ts" }, { page: false, $POST: { src: "src/routes/API/lib/addTransaction.ts?pick=POST", build: () => import('../build/addTransaction.mjs'), import: () => import('../build/addTransaction.mjs') }, path: "/API/lib/addTransaction", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/lib/addTransaction.ts" }, { page: false, $POST: { src: "src/routes/API/lib/getWalletsPaths.ts?pick=POST", build: () => import('../build/getWalletsPaths.mjs'), import: () => import('../build/getWalletsPaths.mjs') }, path: "/API/lib/getWalletsPaths", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/lib/getWalletsPaths.ts" }, { page: false, $POST: { src: "src/routes/API/Wallets/addWallet.ts?pick=POST", build: () => import('../build/addWallet.mjs'), import: () => import('../build/addWallet.mjs') }, path: "/API/Wallets/addWallet", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/addWallet.ts" }, { page: true, $component: { src: "src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css", build: () => import('../build/deleteWallet.mjs'), import: () => import('../build/deleteWallet.mjs') }, path: "/API/Wallets/deleteWallet", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css", build: () => import('../build/index4.mjs'), import: () => import('../build/index4.mjs') }, path: "/(Pages)/(lib)/Login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Login/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css", build: () => import('../build/index5.mjs'), import: () => import('../build/index5.mjs') }, path: "/(Pages)/(lib)/Transactions/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css", build: () => import('../build/Toggle.mjs'), import: () => import('../build/Toggle.mjs') }, path: "/(Pages)/LoginRegistration/components/Toggle", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/components/Toggle.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css", build: () => import('../build/index6.mjs'), import: () => import('../build/index6.mjs') }, path: "/(Pages)/LoginRegistration/Login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Login/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css", build: () => import('../build/index7.mjs'), import: () => import('../build/index7.mjs') }, path: "/(Pages)/LoginRegistration/Registration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index8.mjs'), import: () => import('../build/index8.mjs') }, path: "/(Pages)/Wallets/Wallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/index.tsx" }, { page: false, $POST: { src: "src/routes/API/Auth/login/index.ts?pick=POST", build: () => import('../build/index9.mjs'), import: () => import('../build/index9.mjs') }, path: "/API/Auth/login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/index.ts" }, { page: false, $POST: { src: "src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST", build: () => import('../build/addTransaction2.mjs'), import: () => import('../build/addTransaction2.mjs') }, path: "/API/Wallets/Wallet/addTransaction", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransaction.ts" }, { page: true, $component: { src: "src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css", build: () => import('../build/getTransactions.mjs'), import: () => import('../build/getTransactions.mjs') }, path: "/API/Wallets/Wallet/getTransactions", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css", build: () => import('../build/pathWallets.mjs'), import: () => import('../build/pathWallets.mjs') }, path: "/(Pages)/(lib)/Transactions/utils/pathWallets", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css", build: () => import('../build/index10.mjs'), import: () => import('../build/index10.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Credentials/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css", build: () => import('../build/index11.mjs'), import: () => import('../build/index11.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Email/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css", build: () => import('../build/index12.mjs'), import: () => import('../build/index12.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css", build: () => import('../build/sendOtp.mjs'), import: () => import('../build/sendOtp.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/sendOtp", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index13.mjs'), import: () => import('../build/index13.mjs') }, path: "/(Pages)/Wallets/_components/addWallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/addWallet/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css", build: () => import('../build/index14.mjs'), import: () => import('../build/index14.mjs') }, path: "/(Pages)/Wallets/_components/Card/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css", build: () => import('../build/index15.mjs'), import: () => import('../build/index15.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css", build: () => import('../build/preLoader.mjs'), import: () => import('../build/preLoader.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/preLoader", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css", build: () => import('../build/index16.mjs'), import: () => import('../build/index16.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index17.mjs'), import: () => import('../build/index17.mjs') }, path: "/(Pages)/Wallets/_components/SetWallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx" }, { page: false, $POST: { src: "src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST", build: () => import('../build/addTransactions.mjs'), import: () => import('../build/addTransactions.mjs') }, path: "/API/Wallets/Wallet/addTransactionByFile/addTransactions", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts" }, { page: false, $POST: { src: "src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST", build: () => import('../build/uploadFile.mjs'), import: () => import('../build/uploadFile.mjs') }, path: "/API/Wallets/Wallet/addTransactionByFile/uploadFile", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css", build: () => import('../build/index18.mjs'), import: () => import('../build/index18.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css", build: () => import('../build/index19.mjs'), import: () => import('../build/index19.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css", build: () => import('../build/mapper.mjs'), import: () => import('../build/mapper.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/mapper", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css", build: () => import('../build/preview.mjs'), import: () => import('../build/preview.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/preview", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css", build: () => import('../build/uploadFile2.mjs'), import: () => import('../build/uploadFile2.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/uploadFile", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css", build: () => import('../build/otpInput.mjs'), import: () => import('../build/otpInput.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css", build: () => import('../build/index20.mjs'), import: () => import('../build/index20.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/ProgressBar/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css", build: () => import('../build/index21.mjs'), import: () => import('../build/index21.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/spline/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css", build: () => import('../build/index22.mjs'), import: () => import('../build/index22.mjs') }, path: "/(Pages)/Wallets/Wallet/components/table.tsx/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css", build: () => import('../build/Card.mjs'), import: () => import('../build/Card.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/Card/Card", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css", build: () => import('../build/index23.mjs'), import: () => import('../build/index23.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/mapper/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css", build: () => import('../build/index24.mjs'), import: () => import('../build/index24.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/Preview/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css", build: () => import('../build/index25.mjs'), import: () => import('../build/index25.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/Upload/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css", build: () => import('../build/index26.mjs'), import: () => import('../build/index26.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx" }], ls$1 = cs$1(Ye.filter((t) => t.page));
function cs$1(t) {
  function e(r, i, a, n) {
    const o = Object.values(r).find((l) => a.startsWith(l.id + "/"));
    return o ? (e(o.children || (o.children = []), i, a.slice(o.id.length)), r) : (r.push({ ...i, id: a, path: a.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), r);
  }
  return t.sort((r, i) => r.path.length - i.path.length).reduce((r, i) => e(r, i, i.path, i.path), []);
}
function us$1(t) {
  return t.$HEAD || t.$GET || t.$POST || t.$PUT || t.$PATCH || t.$DELETE;
}
is$1({ routes: Ye.reduce((t, e) => {
  if (!us$1(e)) return t;
  let r = e.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (i, a) => `**:${a}`).split("/").map((i) => i.startsWith(":") || i.startsWith("*") ? i : encodeURIComponent(i)).join("/");
  if (/:[^/]*\?/g.test(r)) throw new Error(`Optional parameters are not supported in API routes: ${r}`);
  if (t[r]) throw new Error(`Duplicate API routes for "${r}" found at "${t[r].route.path}" and "${e.path}"`);
  return t[r] = { route: e }, t;
}, {}) });
var hs$1 = " ";
const ds$1 = { style: (t) => ssrElement("style", t.attrs, () => t.children, true), link: (t) => ssrElement("link", t.attrs, void 0, true), script: (t) => t.attrs.src ? ssrElement("script", mergeProps(() => t.attrs, { get id() {
  return t.key;
} }), () => ssr(hs$1), true) : null, noscript: (t) => ssrElement("noscript", t.attrs, () => escape(t.children), true) };
function fs$1(t, e) {
  let { tag: r, attrs: { key: i, ...a } = { key: void 0 }, children: n } = t;
  return ds$1[r]({ attrs: { ...a, nonce: e }, key: i, children: n });
}
function gs$1(t, e, r, i = "default") {
  return lazy(async () => {
    var _a;
    {
      const n = (await t.import())[i], l = (await ((_a = e.inputs) == null ? void 0 : _a[t.src].assets())).filter((u) => u.tag === "style" || u.attrs.rel === "stylesheet");
      return { default: (u) => [...l.map((d) => fs$1(d)), createComponent(n, u)] };
    }
  });
}
function Ze() {
  function t(r) {
    return { ...r, ...r.$$route ? r.$$route.require().route : void 0, info: { ...r.$$route ? r.$$route.require().route.info : {}, filesystem: true }, component: r.$component && gs$1(r.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: r.children ? r.children.map(t) : void 0 };
  }
  return ls$1.map(t);
}
let Re$2;
const Bs = isServer ? () => getRequestEvent().routes : () => Re$2 || (Re$2 = Ze());
function ms$1(t) {
  const e = ye$3(t.nativeEvent, "flash");
  if (e) try {
    let r = JSON.parse(e);
    if (!r || !r.result) return;
    const i = [...r.input.slice(0, -1), new Map(r.input[r.input.length - 1])], a = r.error ? new Error(r.result) : r.result;
    return { input: i, url: r.url, pending: false, result: r.thrown ? void 0 : a, error: r.thrown ? a : void 0 };
  } catch (r) {
    console.error(r);
  } finally {
    he$2(t.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function Ps$1(t) {
  const e = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, t.response.headers.set("Content-Type", "text/html"), Object.assign(t, { manifest: await e.json(), assets: [...await e.inputs[e.handler].assets()], router: { submission: ms$1(t) }, routes: Ze(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const ys$1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function bs$1(t) {
  return t.status && ys$1.has(t.status) ? t.status : 302;
}
const xs$1 = { "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1": { functionName: "deleteWallet_1", importer: () => import('../build/deleteWallet-jK3sXpn2.mjs') }, "src_routes_API_Wallets_Wallet_getTransactions_ts--getTransactions_1": { functionName: "getTransactions_1", importer: () => import('../build/getTransactions-Cr4f694O.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getWallets_1": { functionName: "getWallets_1", importer: () => import('../build/getWallets.server-Ddr8BrzP.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getWalletsContainer_1": { functionName: "getWalletsContainer_1", importer: () => import('../build/getWallets.server-Ddr8BrzP.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getRecursiveWalletBalance_1": { functionName: "getRecursiveWalletBalance_1", importer: () => import('../build/getWallets.server-Ddr8BrzP.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getWalletName_1": { functionName: "getWalletName_1", importer: () => import('../build/getWallets.server-Ddr8BrzP.mjs') }, "src_server_auth_server_ts--getUserId_1": { functionName: "getUserId_1", importer: () => import('../build/auth.server-F_zbwjhE.mjs') }, "src_server_auth_server_ts--getUsername_1": { functionName: "getUsername_1", importer: () => import('../build/auth.server-F_zbwjhE.mjs') }, "src_server_auth_server_ts--getUser_1": { functionName: "getUser_1", importer: () => import('../build/auth.server-F_zbwjhE.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--getExchangeRate_1": { functionName: "getExchangeRate_1", importer: () => import('../build/exchangeRates-BoUYCRuj.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--getConversionRate_1": { functionName: "getConversionRate_1", importer: () => import('../build/exchangeRates-BoUYCRuj.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--calculateConvertedTotal_1": { functionName: "calculateConvertedTotal_1", importer: () => import('../build/exchangeRates-BoUYCRuj.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--convertBalance_1": { functionName: "convertBalance_1", importer: () => import('../build/exchangeRates-BoUYCRuj.mjs') }, "src_routes_API_Wallets_getWallet_ts--getWallet_1": { functionName: "getWallet_1", importer: () => import('../build/getWallet-CFmvrtny.mjs') }, "src_routes_API_Auth_registration_createUser_ts--createUser_action": { functionName: "createUser_action", importer: () => import('../build/createUser-CqiEsOu_.mjs') }, "src_routes_API_Wallets_setWallet_ts--setWallet_action": { functionName: "setWallet_action", importer: () => import('../build/setWallet-LYtwpUnS.mjs') }, "src_routes_API_Auth_registration_credentials_usernameAlreadyexist_ts--usernameAlreadyexist_action": { functionName: "usernameAlreadyexist_action", importer: () => import('../build/usernameAlreadyexist-CUMQy92F.mjs') }, "src_routes_API_Auth_registration_phone_phoneAlreadyexist_ts--phoneAlreadyexist_action": { functionName: "phoneAlreadyexist_action", importer: () => import('../build/phoneAlreadyexist-BFvINIFk.mjs') }, "src_routes_API_Auth_registration_email_emailAlreadyexist_ts--emailAlreadyexist_action": { functionName: "emailAlreadyexist_action", importer: () => import('../build/emailAlreadyexist-BoJ37vKf.mjs') } };
function As$1(t) {
  const e = new TextEncoder().encode(t), r = e.length, i = r.toString(16), a = "00000000".substring(0, 8 - i.length) + i, n = new TextEncoder().encode(`;0x${a};`), o = new Uint8Array(12 + r);
  return o.set(n), o.set(e, 12), o;
}
function ke$1(t, e) {
  return new ReadableStream({ start(r) {
    Lr(e, { scopeId: t, plugins: [G$3, J$2, Y$4, Z$3, E, _$2, Q$3, ee$3, te$3, re$2], onSerialize(i, a) {
      r.enqueue(As$1(a ? `(${It$1(t)},${i})` : i));
    }, onDone() {
      r.close();
    }, onError(i) {
      r.error(i);
    } });
  } });
}
async function vs$1(t) {
  const e = Ce$1(t), r = e.request, i = r.headers.get("X-Server-Id"), a = r.headers.get("X-Server-Instance"), n = r.headers.has("X-Single-Flight"), o = new URL(r.url);
  let l, c;
  if (i) ss$1(typeof i == "string", "Invalid server function"), [l, c] = i.split("#");
  else if (l = o.searchParams.get("id"), c = o.searchParams.get("name"), !l || !c) return new Response(null, { status: 404 });
  const u = xs$1[l];
  let d;
  if (!u) return new Response(null, { status: 404 });
  d = await u.importer();
  const m = d[u.functionName];
  let y = [];
  if (!a || t.method === "GET") {
    const p = o.searchParams.get("args");
    if (p) {
      const f = JSON.parse(p);
      (f.t ? Ae$1(f, { plugins: [G$3, J$2, Y$4, Z$3, E, _$2, Q$3, ee$3, te$3, re$2] }) : f).forEach(($) => y.push($));
    }
  }
  if (t.method === "POST") {
    const p = r.headers.get("content-type"), f = t.node.req, $ = f instanceof ReadableStream, Qe = f.body instanceof ReadableStream, le = $ && f.locked || Qe && f.body.locked, ce = $ ? f : f.body;
    if ((p == null ? void 0 : p.startsWith("multipart/form-data")) || (p == null ? void 0 : p.startsWith("application/x-www-form-urlencoded"))) y.push(await (le ? r : new Request(r, { ...r, body: ce })).formData());
    else if (p == null ? void 0 : p.startsWith("application/json")) {
      const et = le ? r : new Request(r, { ...r, body: ce });
      y = Ae$1(await et.json(), { plugins: [G$3, J$2, Y$4, Z$3, E, _$2, Q$3, ee$3, te$3, re$2] });
    }
  }
  try {
    let p = await provideRequestEvent(e, async () => (sharedConfig.context = { event: e }, e.locals.serverFunctionMeta = { id: l + "#" + c }, m(...y)));
    if (n && a && (p = await Ee$1(e, p)), p instanceof Response) {
      if (p.headers && p.headers.has("X-Content-Raw")) return p;
      a && (p.headers && He$3(t, p.headers), p.status && (p.status < 300 || p.status >= 400) && b$3(t, p.status), p.customBody ? p = await p.customBody() : p.body == null && (p = null));
    }
    return a ? (me$3(t, "content-type", "text/javascript"), ke$1(a, p)) : Ie$1(p, r, y);
  } catch (p) {
    if (p instanceof Response) n && a && (p = await Ee$1(e, p)), p.headers && He$3(t, p.headers), p.status && (!a || p.status < 300 || p.status >= 400) && b$3(t, p.status), p.customBody ? p = p.customBody() : p.body == null && (p = null), me$3(t, "X-Error", "true");
    else if (a) {
      const f = p instanceof Error ? p.message : typeof p == "string" ? p : "true";
      me$3(t, "X-Error", f.replace(/[\r\n]+/g, ""));
    } else p = Ie$1(p, r, y, true);
    return a ? (me$3(t, "content-type", "text/javascript"), ke$1(a, p)) : p;
  }
}
function Ie$1(t, e, r, i) {
  const a = new URL(e.url), n = t instanceof Error;
  let o = 302, l;
  return t instanceof Response ? (l = new Headers(t.headers), t.headers.has("Location") && (l.set("Location", new URL(t.headers.get("Location"), a.origin + "").toString()), o = bs$1(t))) : l = new Headers({ Location: new URL(e.headers.get("referer")).toString() }), t && l.append("Set-Cookie", `flash=${encodeURIComponent(JSON.stringify({ url: a.pathname + a.search, result: n ? t.message : t, thrown: i, error: n, input: [...r.slice(0, -1), [...r[r.length - 1].entries()]] }))}; Secure; HttpOnly;`), new Response(null, { status: o, headers: l });
}
let B$1;
function Ss(t) {
  var _a;
  const e = new Headers(t.request.headers), r = ge$3(t.nativeEvent), i = t.response.headers.getSetCookie();
  e.delete("cookie");
  let a = false;
  return ((_a = t.nativeEvent.node) == null ? void 0 : _a.req) && (a = true, t.nativeEvent.node.req.headers.cookie = ""), i.forEach((n) => {
    if (!n) return;
    const o = n.split(";")[0], [l, c] = o.split("=");
    l && c && (r[l] = c);
  }), Object.entries(r).forEach(([n, o]) => {
    e.append("cookie", `${n}=${o}`), a && (t.nativeEvent.node.req.headers.cookie += `${n}=${o};`);
  }), e;
}
async function Ee$1(t, e) {
  let r, i = new URL(t.request.headers.get("referer")).toString();
  e instanceof Response && (e.headers.has("X-Revalidate") && (r = e.headers.get("X-Revalidate").split(",")), e.headers.has("Location") && (i = new URL(e.headers.get("Location"), new URL(t.request.url).origin + "").toString()));
  const a = xe$4(t);
  return a.request = new Request(i, { headers: Ss(t) }), await provideRequestEvent(a, async () => {
    await Ps$1(a), B$1 || (B$1 = (await import('../build/app-DedkBFsa.mjs')).default), a.router.dataOnly = r || true, a.router.previousUrl = t.request.headers.get("referer");
    try {
      renderToString(() => {
        sharedConfig.context.event = a, B$1();
      });
    } catch (l) {
      console.log(l);
    }
    const n = a.router.data;
    if (!n) return e;
    let o = false;
    for (const l in n) n[l] === void 0 ? delete n[l] : o = true;
    return o && (e instanceof Response ? e.customBody && (n._$value = e.customBody()) : (n._$value = e, e = new Response(null, { status: 200 })), e.customBody = () => n, e.headers.set("X-Single-Flight", "true")), e;
  });
}
const _e = eventHandler(vs$1), qs = eventHandler({ onRequest: me$2.onRequest, onBeforeResponse: me$2.onBeforeResponse, handler: _e, websocket: _e.__websocket__ });

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
function B(t = {}) {
  let e, s = false;
  const r = (n) => {
    if (e && e !== n) throw new Error("Context conflict");
  };
  let a;
  if (t.asyncContext) {
    const n = t.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    n ? a = new n() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const f = () => {
    if (a) {
      const n = a.getStore();
      if (n !== void 0) return n;
    }
    return e;
  };
  return { use: () => {
    const n = f();
    if (n === void 0) throw new Error("Context is not available");
    return n;
  }, tryUse: () => f(), set: (n, i) => {
    i || r(n), e = n, s = true;
  }, unset: () => {
    e = void 0, s = false;
  }, call: (n, i) => {
    r(n), e = n;
    try {
      return a ? a.run(n, i) : i();
    } finally {
      s || (e = void 0);
    }
  }, async callAsync(n, i) {
    e = n;
    const C = () => {
      e = n;
    }, p = () => e === n ? C : void 0;
    h.add(p);
    try {
      const v = a ? a.run(n, i) : i();
      return s || (e = void 0), await v;
    } finally {
      h.delete(p);
    }
  } };
}
function z(t = {}) {
  const e = {};
  return { get(s, r = {}) {
    return e[s] || (e[s] = B({ ...t, ...r })), e[s];
  } };
}
const u$1 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof g$2 < "u" ? g$2 : {}, y$1 = "__unctx__", D$3 = u$1[y$1] || (u$1[y$1] = z()), G$2 = (t, e = {}) => D$3.get(t, e), R$2 = "__unctx_async_handlers__", h = u$1[R$2] || (u$1[R$2] = /* @__PURE__ */ new Set());
function pe$1(t) {
  return t;
}
function J$1(t) {
  let e;
  const s = H$2(t), r = { duplex: "half", method: t.method, headers: t.headers };
  return t.node.req.body instanceof ArrayBuffer ? new Request(s, { ...r, body: t.node.req.body }) : new Request(s, { ...r, get body() {
    return e || (e = se$1(t), e);
  } });
}
function Q$2(t) {
  var _a;
  return (_a = t.web) != null ? _a : t.web = { request: J$1(t), url: H$2(t) }, t.web.request;
}
function V$1() {
  return ae();
}
const x$1 = Symbol("$HTTPEvent");
function X$1(t) {
  return typeof t == "object" && (t instanceof H3Event || (t == null ? void 0 : t[x$1]) instanceof H3Event || (t == null ? void 0 : t.__is_event__) === true);
}
function o(t) {
  return function(...e) {
    var _a;
    let s = e[0];
    if (X$1(s)) e[0] = s instanceof H3Event || s.__is_event__ ? s : s[x$1];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (s = V$1(), !s) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      e.unshift(s);
    }
    return t(...e);
  };
}
const H$2 = o(getRequestURL), Y$3 = o(getRequestIP), b$2 = o(setResponseStatus), S$1 = o(getResponseStatus), Z$2 = o(getResponseStatusText), c = o(getResponseHeaders), m = o(getResponseHeader), ee$2 = o(setResponseHeader), te$2 = o(appendResponseHeader), ge$1 = o(sendRedirect), ye$1 = o(getCookie), Re$1 = o(setCookie), he$1 = o(deleteCookie), be$2 = o(useSession), Se$1 = o(sendWebResponse), me$1 = o(setHeader), se$1 = o(getRequestWebStream), ne$2 = o(removeResponseHeader), oe$1 = o(Q$2);
function re$1() {
  var _a;
  return G$2("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function ae() {
  return re$1().use().event;
}
const d = "solidFetchEvent";
function ie$1(t) {
  return { request: oe$1(t), response: ue(t), clientAddress: Y$3(t), locals: {}, nativeEvent: t };
}
function xe$2(t) {
  return { ...t };
}
function He$1(t) {
  if (!t.context[d]) {
    const e = ie$1(t);
    t.context[d] = e;
  }
  return t.context[d];
}
class ce {
  constructor(e) {
    __publicField(this, "event");
    this.event = e;
  }
  get(e) {
    const s = m(this.event, e);
    return Array.isArray(s) ? s.join(", ") : s || null;
  }
  has(e) {
    return this.get(e) !== void 0;
  }
  set(e, s) {
    return ee$2(this.event, e, s);
  }
  delete(e) {
    return ne$2(this.event, e);
  }
  append(e, s) {
    te$2(this.event, e, s);
  }
  getSetCookie() {
    const e = m(this.event, "Set-Cookie");
    return Array.isArray(e) ? e : [e];
  }
  forEach(e) {
    return Object.entries(c(this.event)).forEach(([s, r]) => e(Array.isArray(r) ? r.join(", ") : r, s, this));
  }
  entries() {
    return Object.entries(c(this.event)).map(([e, s]) => [e, Array.isArray(s) ? s.join(", ") : s])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(c(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(c(this.event)).map((e) => Array.isArray(e) ? e.join(", ") : e)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}
function ue(t) {
  return { get status() {
    return S$1(t);
  }, set status(e) {
    b$2(t, e);
  }, get statusText() {
    return Z$2(t);
  }, set statusText(e) {
    b$2(t, S$1(t), e);
  }, headers: new ce(t) };
}

const { Pool: s$1 } = e$1, t = new s$1({ host: o$3.env.DB_HOST, user: o$3.env.DB_USER, password: o$3.env.DB_PASSWORD, port: o$3.env.DB_PORT ? parseInt(o$3.env.DB_PORT, 10) : void 0, database: o$3.env.DB_NAME });

function i(n, r = {}) {
  const { revalidate: s, ...t } = r, e = new Headers(t.headers);
  s !== void 0 && e.set("X-Revalidate", s.toString()), e.set("Content-Type", "application/json");
  const o = new Response(JSON.stringify(n), { ...t, headers: e });
  return o.customBody = () => n, o;
}

function ye() {
  let t = /* @__PURE__ */ new Set();
  function e(s) {
    return t.add(s), () => t.delete(s);
  }
  let n = false;
  function r(s, o) {
    if (n) return !(n = false);
    const a = { to: s, options: o, defaultPrevented: false, preventDefault: () => a.defaultPrevented = true };
    for (const c of t) c.listener({ ...a, from: c.location, retry: (f) => {
      f && (n = true), c.navigate(s, { ...o, resolve: false });
    } });
    return !a.defaultPrevented;
  }
  return { subscribe: e, confirm: r };
}
let D$2;
function V() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), D$2 = window.history.state._depth;
}
isServer || V();
function qe(t) {
  return { ...t, _depth: window.history.state && window.history.state._depth };
}
function Ie(t, e) {
  let n = false;
  return () => {
    const r = D$2;
    V();
    const s = r == null ? null : D$2 - r;
    if (n) {
      n = false;
      return;
    }
    s && e(s) ? (n = true, window.history.go(-s)) : t();
  };
}
const we = /^(?:[a-z0-9]+:)?\/\//i, ve = /^\/+|(\/)\/+$/g, Pe$1 = "http://sr";
function F$1(t, e = false) {
  const n = t.replace(ve, "$1");
  return n ? e || /^[?#]/.test(n) ? n : "/" + n : "";
}
function W$1(t, e, n) {
  if (we.test(e)) return;
  const r = F$1(t), s = n && F$1(n);
  let o = "";
  return !s || e.startsWith("/") ? o = r : s.toLowerCase().indexOf(r.toLowerCase()) !== 0 ? o = r + s : o = s, (o || "/") + F$1(e, !o);
}
function Re(t, e) {
  if (t == null) throw new Error(e);
  return t;
}
function xe$1(t, e) {
  return F$1(t).replace(/\/*(\*.*)?$/g, "") + F$1(e);
}
function Y$2(t) {
  const e = {};
  return t.searchParams.forEach((n, r) => {
    r in e ? Array.isArray(e[r]) ? e[r].push(n) : e[r] = [e[r], n] : e[r] = n;
  }), e;
}
function be$1(t, e, n) {
  const [r, s] = t.split("/*", 2), o = r.split("/").filter(Boolean), a = o.length;
  return (c) => {
    const f = c.split("/").filter(Boolean), h = f.length - a;
    if (h < 0 || h > 0 && s === void 0 && !e) return null;
    const l = { path: a ? "" : "/", params: {} }, m = (d) => n === void 0 ? void 0 : n[d];
    for (let d = 0; d < a; d++) {
      const p = o[d], y = p[0] === ":", v = y ? f[d] : f[d].toLowerCase(), E = y ? p.slice(1) : p.toLowerCase();
      if (y && $$1(v, m(E))) l.params[E] = v;
      else if (y || !$$1(v, E)) return null;
      l.path += `/${v}`;
    }
    if (s) {
      const d = h ? f.slice(-h).join("/") : "";
      if ($$1(d, m(s))) l.params[s] = d;
      else return null;
    }
    return l;
  };
}
function $$1(t, e) {
  const n = (r) => r === t;
  return e === void 0 ? true : typeof e == "string" ? n(e) : typeof e == "function" ? e(t) : Array.isArray(e) ? e.some(n) : e instanceof RegExp ? e.test(t) : false;
}
function Ae(t) {
  const [e, n] = t.pattern.split("/*", 2), r = e.split("/").filter(Boolean);
  return r.reduce((s, o) => s + (o.startsWith(":") ? 2 : 3), r.length - (n === void 0 ? 0 : 1));
}
function Z$1(t) {
  const e = /* @__PURE__ */ new Map(), n = getOwner();
  return new Proxy({}, { get(r, s) {
    return e.has(s) || runWithOwner(n, () => e.set(s, createMemo(() => t()[s]))), e.get(s)();
  }, getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true };
  }, ownKeys() {
    return Reflect.ownKeys(t());
  } });
}
function ee$1(t) {
  let e = /(\/?\:[^\/]+)\?/.exec(t);
  if (!e) return [t];
  let n = t.slice(0, e.index), r = t.slice(e.index + e[0].length);
  const s = [n, n += e[1]];
  for (; e = /^(\/\:[^\/]+)\?/.exec(r); ) s.push(n += e[1]), r = r.slice(e[0].length);
  return ee$1(r).reduce((o, a) => [...o, ...s.map((c) => c + a)], []);
}
const Ce = 100, Ee = createContext$1(), te$1 = createContext$1(), L = () => Re(useContext(Ee), "<A> and 'use' router primitives can be only used inside a Route."), Fe = () => useContext(te$1) || L().base, We = (t) => {
  const e = Fe();
  return createMemo(() => e.resolvePath(t()));
}, $e = (t) => {
  const e = L();
  return createMemo(() => {
    const n = t();
    return n !== void 0 ? e.renderPath(n) : n;
  });
}, Me = () => L().navigatorFactory(), De = () => L().location, Ue = () => L().params;
function Le(t, e = "") {
  const { component: n, preload: r, load: s, children: o, info: a } = t, c = !o || Array.isArray(o) && !o.length, f = { key: t, component: n, preload: r || s, info: a };
  return ne$1(t.path).reduce((h, l) => {
    for (const m of ee$1(l)) {
      const d = xe$1(e, m);
      let p = c ? d : d.split("/*", 1)[0];
      p = p.split("/").map((y) => y.startsWith(":") || y.startsWith("*") ? y : encodeURIComponent(y)).join("/"), h.push({ ...f, originalPath: l, pattern: p, matcher: be$1(p, !c, t.matchFilters) });
    }
    return h;
  }, []);
}
function Se(t, e = 0) {
  return { routes: t, score: Ae(t[t.length - 1]) * 1e4 - e, matcher(n) {
    const r = [];
    for (let s = t.length - 1; s >= 0; s--) {
      const o = t[s], a = o.matcher(n);
      if (!a) return null;
      r.unshift({ ...a, route: o });
    }
    return r;
  } };
}
function ne$1(t) {
  return Array.isArray(t) ? t : [t];
}
function Oe(t, e = "", n = [], r = []) {
  const s = ne$1(t);
  for (let o = 0, a = s.length; o < a; o++) {
    const c = s[o];
    if (c && typeof c == "object") {
      c.hasOwnProperty("path") || (c.path = "");
      const f = Le(c, e);
      for (const h of f) {
        n.push(h);
        const l = Array.isArray(c.children) && c.children.length === 0;
        if (c.children && !l) Oe(c.children, h.pattern, n, r);
        else {
          const m = Se([...n], r.length);
          r.push(m);
        }
        n.pop();
      }
    }
  }
  return n.length ? r : r.sort((o, a) => a.score - o.score);
}
function M$3(t, e) {
  for (let n = 0, r = t.length; n < r; n++) {
    const s = t[n].matcher(e);
    if (s) return s;
  }
  return [];
}
function je(t, e, n) {
  const r = new URL(Pe$1), s = createMemo((l) => {
    const m = t();
    try {
      return new URL(m, r);
    } catch {
      return console.error(`Invalid path ${m}`), l;
    }
  }, r, { equals: (l, m) => l.href === m.href }), o = createMemo(() => s().pathname), a = createMemo(() => s().search, true), c = createMemo(() => s().hash), f = () => "", h = on(a, () => Y$2(s()));
  return { get pathname() {
    return o();
  }, get search() {
    return a();
  }, get hash() {
    return c();
  }, get state() {
    return e();
  }, get key() {
    return f();
  }, query: n ? n(h) : Z$1(h) };
}
let P;
function ze() {
  return P;
}
let C = false;
function He() {
  return C;
}
function Ke(t) {
  C = t;
}
function Ne(t, e, n, r = {}) {
  const { signal: [s, o], utils: a = {} } = t, c = a.parsePath || ((i) => i), f = a.renderPath || ((i) => i), h = a.beforeLeave || ye(), l = W$1("", r.base || "");
  if (l === void 0) throw new Error(`${l} is not a valid base path`);
  l && !s().value && o({ value: l, replace: true, scroll: false });
  const [m, d] = createSignal(false);
  let p;
  const y = (i, u) => {
    u.value === v() && u.state === S() || (p === void 0 && d(true), P = i, p = u, startTransition(() => {
      p === u && (E(p.value), re(p.state), resetErrorBoundaries(), isServer || z[1]((g) => g.filter((R) => R.pending)));
    }).finally(() => {
      p === u && batch(() => {
        P = void 0, i === "navigate" && ie(p), d(false), p = void 0;
      });
    }));
  }, [v, E] = createSignal(s().value), [S, re] = createSignal(s().state), O = je(v, S, a.queryWrapper), j = [], z = createSignal(isServer ? ue() : []), H = createMemo(() => typeof r.transformUrl == "function" ? M$3(e(), r.transformUrl(O.pathname)) : M$3(e(), O.pathname)), K = () => {
    const i = H(), u = {};
    for (let g = 0; g < i.length; g++) Object.assign(u, i[g].params);
    return u;
  }, se = a.paramsWrapper ? a.paramsWrapper(K, e) : Z$1(K), N = { pattern: l, path: () => l, outlet: () => null, resolvePath(i) {
    return W$1(l, i);
  } };
  return createRenderEffect(on(s, (i) => y("native", i), { defer: true })), { base: N, location: O, params: se, isRouting: m, renderPath: f, parsePath: c, navigatorFactory: ae, matches: H, beforeLeave: h, preloadRoute: ce, singleFlight: r.singleFlight === void 0 ? true : r.singleFlight, submissions: z };
  function oe(i, u, g) {
    untrack(() => {
      if (typeof u == "number") {
        u && (a.go ? a.go(u) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const R = !u || u[0] === "?", { replace: B, resolve: x, scroll: _, state: b } = { replace: false, resolve: !R, scroll: true, ...g }, A = x ? i.resolvePath(u) : W$1(R && O.pathname || "", u);
      if (A === void 0) throw new Error(`Path '${u}' is not a routable path`);
      if (j.length >= Ce) throw new Error("Too many redirects");
      const T = v();
      if (A !== T || b !== S()) if (isServer) {
        const k = getRequestEvent();
        k && (k.response = { status: 302, headers: new Headers({ Location: A }) }), o({ value: A, replace: B, scroll: _, state: b });
      } else h.confirm(A, g) && (j.push({ value: T, replace: B, scroll: _, state: S() }), y("navigate", { value: A, state: b }));
    });
  }
  function ae(i) {
    return i = i || useContext(te$1) || N, (u, g) => oe(i, u, g);
  }
  function ie(i) {
    const u = j[0];
    u && (o({ ...i, replace: u.replace, scroll: u.scroll }), j.length = 0);
  }
  function ce(i, u) {
    const g = M$3(e(), i.pathname), R = P;
    P = "preload";
    for (let B in g) {
      const { route: x, params: _ } = g[B];
      x.component && x.component.preload && x.component.preload();
      const { preload: b } = x;
      C = true, u && b && runWithOwner(n(), () => b({ params: _, location: { pathname: i.pathname, search: i.search, hash: i.hash, query: Y$2(i), state: null, key: "" }, intent: "preload" })), C = false;
    }
    P = R;
  }
  function ue() {
    const i = getRequestEvent();
    return i && i.router && i.router.submission ? [i.router.submission] : [];
  }
}
function Te(t, e, n, r) {
  const { base: s, location: o, params: a } = t, { pattern: c, component: f, preload: h } = r().route, l = createMemo(() => r().path);
  f && f.preload && f.preload(), C = true;
  const m = h ? h({ params: a, location: o, intent: P || "initial" }) : void 0;
  return C = false, { parent: e, pattern: c, path: l, outlet: () => f ? createComponent(f, { params: a, location: o, data: m, get children() {
    return n();
  } }) : n(), resolvePath(p) {
    return W$1(s.path(), p, l());
  } };
}

function A$1(e) {
  e = mergeProps$1({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, r] = splitProps(e, ["href", "state", "class", "activeClass", "inactiveClass", "end"]), i = We(() => e.href), o = $e(i), l = De(), a = createMemo(() => {
    const n = i();
    if (n === void 0) return [false, false];
    const t = F$1(n.split(/[?#]/, 1)[0]).toLowerCase(), s = decodeURI(F$1(l.pathname).toLowerCase());
    return [e.end ? t === s : s.startsWith(t + "/") || s === t, t === s];
  });
  return ssrElement("a", mergeProps(r, { get href() {
    return o() || e.href;
  }, get state() {
    return JSON.stringify(e.state);
  }, get classList() {
    return { ...e.class && { [e.class]: true }, [e.inactiveClass]: !a()[0], [e.activeClass]: a()[0], ...r.classList };
  }, link: true, get "aria-current"() {
    return a()[1] ? "page" : void 0;
  } }), void 0, true);
}

var u = ["<svg", ' class="Icon" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="', '"><path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.489a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79v10.51Zm-2-1V9.978l-7-5.445-7 5.445V19h14Z"></path></svg>'], w$1 = ["<svg", ' class="Icon" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="', '"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 12v-4"></path><path d="M15 12v-2"></path><path d="M12 12v-1"></path><path d="M3 4h18"></path><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10"></path><path d="M12 16v4"></path><path d="M9 20h6"></path></svg>'], f = ["<svg", ' class="Icon" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" style="', '"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"></path></svg>'], x = ["<div", ' class="flex flex-col gap-27 mt-60">', "</div>"], M$2 = ["<div", ' class="', '"><div class="flex flex-col ml-15 gap-31 mt-60">', "</div><!--$-->", "<!--/--></div>"];
function H$1() {
  const [n, v] = createSignal(false), [s, c] = createSignal(null), l = [{ name: "Home", svg: ssr(u, ssrHydrationKey(), "overflow:visible;color:currentcolor;width:24px;height:24px") }, { name: "Dashboard", svg: ssr(w$1, ssrHydrationKey(), "overflow:visible;color:currentcolor;width:24px;height:24px") }, { name: "Wallets", svg: ssr(f, ssrHydrationKey(), "overflow:none;color:currentcolor;width:24px;height:24px") }], p = [{ name: "Home", icon: "Home", href: "/", svg: l[0].svg }, { name: "Dashboard", icon: "Dashboard", href: "/", svg: l[1].svg }, { name: "Wallets", icon: "Wallet", href: "/Wallets", svg: l[2].svg }], i = (e) => ({ onMouseEnter: () => c(e), onMouseLeave: () => c(null) });
  return ssr(M$2, ssrHydrationKey(), `Menu flex flex-row z-10 ${n() ? "Extend" : ""}`, escape(p.map((e) => createComponent$1(A$1, mergeProps({ get href() {
    return e.href;
  }, get class() {
    return `Icon ${s() === e.name ? "Hover" : ""}`;
  } }, () => i(e.name), { get children() {
    return e.svg;
  } })))), escape(createComponent$1(Show, { get when() {
    return n();
  }, get children() {
    return ssr(x, ssrHydrationKey(), escape(p.map((e) => createComponent$1(A$1, mergeProps({ get href() {
      return e.href;
    }, get class() {
      return `Text ${s() === e.name ? "Hover" : ""} ${s() !== e.name && s() ? "Blur" : ""}`;
    } }, () => i(e.name), { get children() {
      return e.name;
    } })))));
  } })));
}
const [$, b$1] = createSignal(true);
function y() {
  const [n, v] = createSignal(false);
  return setTimeout(() => {
    v(true);
  }, 300), createComponent$1(Show, { get when() {
    return $() && n();
  }, get children() {
    return createComponent$1(H$1, {});
  } });
}

var w = ["<div", ' class="', '" style="', '"></div>'], D$1 = ["<div", ' class="cursor-magnetic-ring" style="', '"></div>'], O$1 = ["<div", ' class="cursor-trail-particle" style="', '"></div>'];
const [q$1, G$1] = createSignal(true), J = () => {
  const [s, L] = createSignal({ x: 0, y: 0 }), [C, P] = createSignal([]), [l, X] = createSignal(false), [v, g] = createSignal(false), [B, A] = createSignal({ x: 0, y: 0 }), [K, M] = createSignal({ x: 0, y: 0 }), [y, p] = createSignal(false), T = 8, b = 15;
  return onMount(() => {
    let c = 0, a = 0, x = performance.now();
    const E = document.createElement("style");
    E.textContent = "* { cursor: none !important; }", document.head.appendChild(E);
    const $ = (t) => {
      const e = performance.now(), o = e - x;
      if (o > 0) {
        const i = Math.abs((t.clientX - c) / o) * 20, d = Math.abs((t.clientY - a) / o) * 20, Y = Math.min(Math.sqrt(i * i + d * d), 10);
        A({ x: i, y: d }), document.documentElement.style.setProperty("--cursor-speed", Y);
      }
      M(s()), L({ x: t.clientX, y: t.clientY }), c = t.clientX, a = t.clientY, x = e;
    }, h = (t) => {
      const e = t.target, o = e.tagName === "INPUT" || e.tagName === "TEXTAREA", i = e.tagName === "A" || e.tagName === "BUTTON" || e.classList.contains("clickable") || e.closest("button") || e.closest("a") || o;
      p(o), X(i);
    }, f = (t) => {
      g(true), k(t.clientX, t.clientY);
      const e = t.target, o = e.tagName === "INPUT" || e.tagName === "TEXTAREA";
      p(o);
    }, N = () => {
      g(false);
    }, k = (t, e) => {
    }, U = setInterval(() => {
      P((t) => [...t, { ...s(), timestamp: Date.now() }].slice(-8));
    }, b), I = (t) => {
      const e = t.target, o = t.relatedTarget;
      (e.tagName === "INPUT" || e.tagName === "TEXTAREA") && (!o || o.tagName !== "INPUT" && o.tagName !== "TEXTAREA") && p(false);
    };
    document.addEventListener("mousemove", $), document.addEventListener("mouseover", h), document.addEventListener("mouseout", I), document.addEventListener("mousedown", f), document.addEventListener("mouseup", N), document.body.style.cursor = "none", onCleanup(() => {
      document.removeEventListener("mousemove", $), document.removeEventListener("mouseover", h), document.removeEventListener("mouseout", I), document.removeEventListener("mousedown", f), document.removeEventListener("mouseup", N), clearInterval(U);
    });
  }), createComponent$1(Show, { get when() {
    return q$1();
  }, get children() {
    return [C().map((c, a) => ssr(O$1, ssrHydrationKey(), `left:${escape(c.x, true)}px;top:${escape(c.y, true)}px` + (";opacity:" + escape(a, true) / escape(T, true)) + `;transform:scale(${0.5 + escape(a, true) / escape(T, true) / 2});animation-delay:${escape(a, true) * 50}ms`)), ssr(w, ssrHydrationKey(), `cursor-outer ${l() ? "hovering" : ""} ${v() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px`), ssr(w, ssrHydrationKey(), `cursor-inner ${l() ? "hovering" : ""} ${v() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px`), ssr(D$1, ssrHydrationKey(), `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px` + (";opacity:" + (l() ? 1 : 0)) + `;transform:translate(-50%, -50%) scale(${l() ? 1 : 0}) rotate(${escape(s().x, true) / 5}deg)`)];
  } });
};

const n = d$2.create({ baseURL: "http://localhost:3000/", withCredentials: true, headers: { "Content-Type": "application/json" } });
function T() {
  const [u, a] = createSignal(null), [i, o] = createStore({ user: null, isAuthenticated: false, isLoading: true, error: null });
  async function g() {
    o({ isLoading: true, error: null });
    try {
      const e = await n.post("API/Auth/refresh");
      console.log(e.data.accessToken), a(e.data.accessToken), o({ isAuthenticated: true, error: null, isLoading: false });
    } catch {
      console.log("Initialization: No valid refresh token found or refresh failed."), a(null), o({ isAuthenticated: false, error: null });
    } finally {
      o({ isLoading: false });
    }
  }
  function A(e, t) {
    var _a, _b, _c, _d, _e, _f;
    let r = t;
    if (d$2.isAxiosError(e)) {
      const s = e;
      r = ((_b = (_a = s.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || ((_d = (_c = s.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) || s.message || t, ((_f = (_e = s.response) == null ? void 0 : _e.data) == null ? void 0 : _f.details) && (r = Object.values(s.response.data.details).map((P) => P._errors.join(", ")).join("; "));
    } else e instanceof Error && (r = e.message);
    console.error(`${t} Error:`, e), o({ error: r });
  }
  async function p(e, t) {
    o({ isLoading: true, error: null }), console.log("Login");
    try {
      const r = await n.post("API/Auth/login", { username: e, password: t });
      return a(r.data.accessToken), true;
    } catch (r) {
      return A(r, "Login failed"), false;
    } finally {
      o({ isLoading: false });
    }
  }
  async function h() {
    i.isLoading || o({ isLoading: true }), u(), a(null), o({ user: null, isAuthenticated: false, error: null });
    try {
      await n.post("API/Auth/logout");
    } catch (e) {
      console.error("Logout API call error:", e);
    } finally {
      o({ isLoading: false });
    }
  }
  n.interceptors.request.use((e) => {
    const t = u();
    return console.log("INTERCEPTOR: Token value:", t), console.log("INTERCEPTOR: Config headers object:", e.headers), t && e.headers && (console.log("token yess"), e.url !== "API/Auth/login" && e.url !== "API/Auth/registration" && (e.headers.Authorization = `Bearer ${t}`, console.log("header", e.headers.Authorization))), e;
  }, (e) => Promise.reject(e));
  let l = false, c = [];
  const f = (e, t = null) => {
    c.forEach((r) => {
      e ? r.reject(e) : (r.config.headers.Authorization = `Bearer ${t}`, n(r.config).then(r.resolve).catch(r.reject));
    }), c = [];
  };
  return n.interceptors.response.use((e) => e, async (e) => {
    var _a;
    const t = e.config;
    if (((_a = e.response) == null ? void 0 : _a.status) === 401 && t && t.url !== "API/Auth/refresh" && t.url !== "API/Auth/login" && t.url !== "API/Auth/registration") {
      if (l) return new Promise((r, s) => {
        c.push({ resolve: r, reject: s, config: t });
      }).catch((r) => Promise.reject(r));
      t._retry = true, l = true, console.log("Axios interceptor: 401 detected, attempting refresh...");
      try {
        const s = (await n.post("API/Auth/refresh")).data.accessToken;
        return a(s), console.log("Axios interceptor: Token refreshed successfully."), t.headers && (t.headers.Authorization = `Bearer ${s}`), f(null, s), n(t);
      } catch (r) {
        return console.error("Axios interceptor: Refresh token failed.", r), f(r, null), await h(), Promise.reject(r);
      } finally {
        l = false;
      }
    }
    return Promise.reject(e);
  }), { get user() {
    return i.user;
  }, get isAuthenticated() {
    return i.isAuthenticated;
  }, get isLoading() {
    return i.isLoading;
  }, get error() {
    return i.error;
  }, initialize: g, login: p, logout: h, api: n };
}
const j = T();

const k = "Location", q = 5e3, K = 18e4;
let R$1 = /* @__PURE__ */ new Map();
isServer || setInterval(() => {
  const e = Date.now();
  for (let [t, r] of R$1.entries()) !r[4].count && e - r[0] > K && R$1.delete(t);
}, 3e5);
function b() {
  if (!isServer) return R$1;
  const e = getRequestEvent();
  if (!e) throw new Error("Cannot find cache context");
  return (e.router || (e.router = {})).cache || (e.router.cache = /* @__PURE__ */ new Map());
}
function U(e, t = true) {
  return startTransition(() => {
    const r = Date.now();
    D(e, (a) => {
      t && (a[0] = 0), a[4][1](r);
    });
  });
}
function D(e, t) {
  e && !Array.isArray(e) && (e = [e]);
  for (let r of R$1.keys()) (e === void 0 || M$1(r, e)) && t(R$1.get(r));
}
function A(e, t) {
  e.GET && (e = e.GET);
  const r = (...a) => {
    const i = b(), s = ze(), d = He(), E = getOwner() ? Me() : void 0, w = Date.now(), l = t + F(a);
    let n = i.get(l), y;
    if (isServer) {
      const o = getRequestEvent();
      if (o) {
        const u = (o.router || (o.router = {})).dataOnly;
        if (u) {
          const p = o && (o.router.data || (o.router.data = {}));
          if (p && l in p) return p[l];
          if (Array.isArray(u) && !M$1(l, u)) return p[l] = void 0, Promise.resolve();
        }
      }
    }
    if (getListener() && !isServer && (y = true, onCleanup(() => n[4].count--)), n && n[0] && (isServer || s === "native" || n[4].count || Date.now() - n[0] < q)) {
      y && (n[4].count++, n[4][0]()), n[3] === "preload" && s !== "preload" && (n[0] = w);
      let o = n[1];
      return s !== "preload" && (o = "then" in n[1] ? n[1].then(g(false), g(true)) : g(false)(n[1]), !isServer && s === "navigate" && startTransition(() => n[4][1](n[0]))), d && "then" in o && o.catch(() => {
      }), o;
    }
    let c;
    if (!isServer && sharedConfig.has && sharedConfig.has(l) ? (c = sharedConfig.load(l), delete globalThis._$HY.r[l]) : c = e(...a), n ? (n[0] = w, n[1] = c, n[3] = s, !isServer && s === "navigate" && startTransition(() => n[4][1](n[0]))) : (i.set(l, n = [w, c, , s, createSignal(w)]), n[4].count = 0), y && (n[4].count++, n[4][0]()), isServer) {
      const o = getRequestEvent();
      if (o && o.router.dataOnly) return o.router.data[l] = c;
    }
    if (s !== "preload" && (c = "then" in c ? c.then(g(false), g(true)) : g(false)(c)), d && "then" in c && c.catch(() => {
    }), isServer && sharedConfig.context && sharedConfig.context.async && !sharedConfig.context.noHydrate) {
      const o = getRequestEvent();
      (!o || !o.serverOnly) && sharedConfig.context.serialize(l, c);
    }
    return c;
    function g(o) {
      return async (u) => {
        if (u instanceof Response) {
          const p = u.headers.get(k);
          if (p !== null) {
            if (E && p.startsWith("/")) startTransition(() => {
              E(p, { replace: true });
            });
            else if (!isServer) window.location.href = p;
            else if (isServer) {
              const L = getRequestEvent();
              L && (L.response = { status: 302, headers: new Headers({ Location: p }) });
            }
            return;
          }
          u.customBody && (u = await u.customBody());
        }
        if (o) throw u;
        return n[2] = u, u;
      };
    }
  };
  return r.keyFor = (...a) => t + F(a), r.key = t, r;
}
A.get = (e) => b().get(e)[2];
A.set = (e, t) => {
  const r = b(), a = Date.now();
  let i = r.get(e);
  i ? (i[0] = a, i[1] = Promise.resolve(t), i[2] = t, i[3] = "preload") : (r.set(e, i = [a, Promise.resolve(t), t, "preload", createSignal(a)]), i[4].count = 0);
};
A.delete = (e) => b().delete(e);
A.clear = () => b().clear();
function M$1(e, t) {
  for (let r of t) if (r && e.startsWith(r)) return true;
  return false;
}
function F(e) {
  return JSON.stringify(e, (t, r) => X(r) ? Object.keys(r).sort().reduce((a, i) => (a[i] = r[i], a), {}) : r);
}
function X(e) {
  let t;
  return e != null && typeof e == "object" && (!(t = Object.getPrototypeOf(e)) || t === Object.prototype);
}
const S = /* @__PURE__ */ new Map();
function Y$1(e) {
  const t = L();
  return (...r) => e.apply({ r: t }, r);
}
function Q$1(e, t = {}) {
  function r(...s) {
    const d = this.r, h = this.f, E = (d.singleFlight && e.withOptions ? e.withOptions({ headers: { "X-Single-Flight": "true" } }) : e)(...s), [w, l] = createSignal();
    let n;
    function y(c) {
      return async (g) => {
        var _a;
        const o = await G(g, c, d.navigatorFactory());
        let u = null;
        if ((_a = a.onComplete) == null ? void 0 : _a.call(a, { ...n, result: o == null ? void 0 : o.data, error: o == null ? void 0 : o.error, pending: false, retry() {
          return u = n.retry();
        } }), u) return u;
        if (!o) return n.clear();
        if (l(o), o.error && !h) throw o.error;
        return o.data;
      };
    }
    return d.submissions[1]((c) => [...c, n = { input: s, url: i, get result() {
      var _a;
      return (_a = w()) == null ? void 0 : _a.data;
    }, get error() {
      var _a;
      return (_a = w()) == null ? void 0 : _a.error;
    }, get pending() {
      return !w();
    }, clear() {
      d.submissions[1]((g) => g.filter((o) => o !== n));
    }, retry() {
      return l(void 0), e(...s).then(y(), y(true));
    } }]), E.then(y(), y(true));
  }
  const a = typeof t == "string" ? { name: t } : t, i = e.url || a.name && `https://action/${a.name}` || (isServer ? "" : `https://action/${W(e.toString())}`);
  return r.base = i, _$1(r, i);
}
function _$1(e, t) {
  return e.toString = () => {
    if (!t) throw new Error("Client Actions need explicit names if server rendered");
    return t;
  }, e.with = function(...r) {
    const a = function(...s) {
      return e.call(this, ...r, ...s);
    };
    a.base = e.base;
    const i = new URL(t, Pe$1);
    return i.searchParams.set("args", F(r)), _$1(a, (i.origin === "https://action" ? i.origin : "") + i.pathname + i.search);
  }, e.url = t, isServer || (S.set(t, e), getOwner() && onCleanup(() => S.delete(t))), e;
}
const W = (e) => e.split("").reduce((t, r) => (t << 5) - t + r.charCodeAt(0) | 0, 0);
async function G(e, t, r) {
  let a, i, s, d;
  if (e instanceof Response) {
    if (e.headers.has("X-Revalidate") && (s = e.headers.get("X-Revalidate").split(",")), e.customBody && (a = i = await e.customBody(), e.headers.has("X-Single-Flight") && (a = a._$value, delete i._$value, d = Object.keys(i))), e.headers.has("Location")) {
      const h = e.headers.get("Location") || "/";
      h.startsWith("http") ? window.location.href = h : r(h);
    }
  } else {
    if (t) return { error: e };
    a = e;
  }
  return D(s, (h) => h[0] = 0), d && d.forEach((h) => A.set(h, i[h])), await U(s, false), a != null ? { data: a } : void 0;
}

function Y(e) {
  return async (s) => {
    const t = He$1(s), r = await e(t);
    r && await Se$1(s, r);
  };
}
function Z(e) {
  return async (s, t) => {
    const r = He$1(s), o = await e(r, t);
    o && await Se$1(s, o);
  };
}
function Pt({ onRequest: e, onBeforeResponse: s }) {
  return pe$1({ onRequest: typeof e == "function" ? Y(e) : Array.isArray(e) ? e.map(Y) : void 0, onBeforeResponse: typeof s == "function" ? Z(s) : Array.isArray(s) ? s.map(Z) : void 0 });
}
const pe = (e) => (s) => {
  const { base: t } = s, r = children(() => s.children), o = createMemo(() => Oe(r(), s.base || ""));
  let n;
  const a = Ne(e, o, () => n, { base: t, singleFlight: s.singleFlight, transformUrl: s.transformUrl });
  return e.create && e.create(a), createComponent$1(Ee.Provider, { value: a, get children() {
    return createComponent$1(xt, { routerState: a, get root() {
      return s.root;
    }, get preload() {
      return s.rootPreload || s.rootLoad;
    }, get children() {
      return [(n = getOwner()) && null, createComponent$1(bt, { routerState: a, get branches() {
        return o();
      } })];
    } });
  } });
};
function xt(e) {
  const s = e.routerState.location, t = e.routerState.params, r = createMemo(() => e.preload && untrack(() => {
    Ke(true), e.preload({ params: t, location: s, intent: ze() || "initial" }), Ke(false);
  }));
  return createComponent$1(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (o) => createComponent$1(o, { params: t, location: s, get data() {
    return r();
  }, get children() {
    return e.children;
  } }) });
}
function bt(e) {
  if (isServer) {
    const o = getRequestEvent();
    if (o && o.router && o.router.dataOnly) {
      kt(o, e.routerState, e.branches);
      return;
    }
    o && ((o.router || (o.router = {})).matches || (o.router.matches = e.routerState.matches().map(({ route: n, path: a, params: i }) => ({ path: n.originalPath, pattern: n.pattern, match: a, params: i, info: n.info }))));
  }
  const s = [];
  let t;
  const r = createMemo(on(e.routerState.matches, (o, n, a) => {
    let i = n && o.length === n.length;
    const c = [];
    for (let l = 0, d = o.length; l < d; l++) {
      const $ = n && n[l], T = o[l];
      a && $ && T.route.key === $.route.key ? c[l] = a[l] : (i = false, s[l] && s[l](), createRoot((f) => {
        s[l] = f, c[l] = Te(e.routerState, c[l - 1] || e.routerState.base, Q(() => r()[l + 1]), () => e.routerState.matches()[l]);
      }));
    }
    return s.splice(o.length).forEach((l) => l()), a && i ? a : (t = c[0], c);
  }));
  return Q(() => r() && t)();
}
const Q = (e) => () => createComponent$1(Show, { get when() {
  return e();
}, keyed: true, children: (s) => createComponent$1(te$1.Provider, { value: s, get children() {
  return s.outlet();
} }) });
function kt(e, s, t) {
  const r = new URL(e.request.url), o = M$3(t, new URL(e.router.previousUrl || e.request.url).pathname), n = M$3(t, r.pathname);
  for (let a = 0; a < n.length; a++) {
    (!o[a] || n[a].route !== o[a].route) && (e.router.dataOnly = true);
    const { route: i, params: c } = n[a];
    i.preload && i.preload({ params: c, location: s.location, intent: "preload" });
  }
}
function $t([e, s], t, r) {
  return [e, r ? (o) => s(r(o)) : s];
}
function Tt(e) {
  let s = false;
  const t = (o) => typeof o == "string" ? { value: o } : o, r = $t(createSignal(t(e.get()), { equals: (o, n) => o.value === n.value && o.state === n.state }), void 0, (o) => (!s && e.set(o), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), o));
  return e.init && onCleanup(e.init((o = e.get()) => {
    s = true, r[1](t(o)), s = false;
  })), pe({ signal: r, create: e.create, utils: e.utils });
}
function At(e, s, t) {
  return e.addEventListener(s, t), () => e.removeEventListener(s, t);
}
function Ct(e, s) {
  const t = e && document.getElementById(e);
  t ? t.scrollIntoView() : s && window.scrollTo(0, 0);
}
function Rt(e) {
  const s = new URL(e);
  return s.pathname + s.search;
}
function vt(e) {
  let s;
  const t = { value: e.url || (s = getRequestEvent()) && Rt(s.request.url) || "" };
  return pe({ signal: [() => t, (r) => Object.assign(t, r)] })(e);
}
function yt(e = true, s = false, t = "/_server", r) {
  return (o) => {
    const n = o.base.path(), a = o.navigatorFactory(o.base);
    let i, c;
    function l(u) {
      return u.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function d(u) {
      if (u.defaultPrevented || u.button !== 0 || u.metaKey || u.altKey || u.ctrlKey || u.shiftKey) return;
      const m = u.composedPath().find((K) => K instanceof Node && K.nodeName.toUpperCase() === "A");
      if (!m || s && !m.hasAttribute("link")) return;
      const g = l(m), h = g ? m.href.baseVal : m.href;
      if ((g ? m.target.baseVal : m.target) || !h && !m.hasAttribute("state")) return;
      const y = (m.getAttribute("rel") || "").split(/\s+/);
      if (m.hasAttribute("download") || y && y.includes("external")) return;
      const L = g ? new URL(h, document.baseURI) : new URL(h);
      if (!(L.origin !== window.location.origin || n && L.pathname && !L.pathname.toLowerCase().startsWith(n.toLowerCase()))) return [m, L];
    }
    function $(u) {
      const m = d(u);
      if (!m) return;
      const [g, h] = m, B = o.parsePath(h.pathname + h.search + h.hash), y = g.getAttribute("state");
      u.preventDefault(), a(B, { resolve: false, replace: g.hasAttribute("replace"), scroll: !g.hasAttribute("noscroll"), state: y ? JSON.parse(y) : void 0 });
    }
    function T(u) {
      const m = d(u);
      if (!m) return;
      const [g, h] = m;
      r && (h.pathname = r(h.pathname)), o.preloadRoute(h, g.getAttribute("preload") !== "false");
    }
    function f(u) {
      clearTimeout(i);
      const m = d(u);
      if (!m) return c = null;
      const [g, h] = m;
      c !== g && (r && (h.pathname = r(h.pathname)), i = setTimeout(() => {
        o.preloadRoute(h, g.getAttribute("preload") !== "false"), c = g;
      }, 20));
    }
    function b(u) {
      if (u.defaultPrevented) return;
      let m = u.submitter && u.submitter.hasAttribute("formaction") ? u.submitter.getAttribute("formaction") : u.target.getAttribute("action");
      if (!m) return;
      if (!m.startsWith("https://action/")) {
        const h = new URL(m, Pe$1);
        if (m = o.parsePath(h.pathname + h.search), !m.startsWith(t)) return;
      }
      if (u.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const g = S.get(m);
      if (g) {
        u.preventDefault();
        const h = new FormData(u.target, u.submitter);
        g.call({ r: o, f: u.target }, u.target.enctype === "multipart/form-data" ? h : new URLSearchParams(h));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", $), e && (document.addEventListener("mousemove", f, { passive: true }), document.addEventListener("focusin", T, { passive: true }), document.addEventListener("touchstart", T, { passive: true })), document.addEventListener("submit", b), onCleanup(() => {
      document.removeEventListener("click", $), e && (document.removeEventListener("mousemove", f), document.removeEventListener("focusin", T), document.removeEventListener("touchstart", T)), document.removeEventListener("submit", b);
    });
  };
}
function wt(e) {
  if (isServer) return vt(e);
  const s = () => {
    const r = window.location.pathname.replace(/^\/+/, "/") + window.location.search, o = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: r + window.location.hash, state: o };
  }, t = ye();
  return Tt({ get: s, set({ value: r, replace: o, scroll: n, state: a }) {
    o ? window.history.replaceState(qe(a), "", r) : window.history.pushState(a, "", r), Ct(decodeURIComponent(window.location.hash.slice(1)), n), V();
  }, init: (r) => At(window, "popstate", Ie(r, (o) => {
    if (o && o < 0) return !t.confirm(o);
    {
      const n = s();
      return !t.confirm(n.value, { state: n.state });
    }
  })), create: yt(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (r) => window.history.go(r), beforeLeave: t } })(e);
}
const de = ["http://localhost:3000", "https://tuo-dominio-produzione.com", "https://dominio-sito-esterno-1.com"];
async function Et(e) {
  const s = e.request.headers.get("authorization");
  if (!s || !s.startsWith("Bearer ")) return i({ error: "Authentication required", code: "NO_AUTH_HEADER" }, { status: 401 });
  const t$1 = s.substring(7);
  let r = null;
  const o = o$3.env.JWT_SECRET || "", n = o$3.env.JWT_ISSUER || "pulsix";
  if (!o) return console.error("[Auth Logic] Errore critico: JWT_SECRET non configurato!"), i({ error: "Server configuration error", code: "JWT_SECRET_MISSING" }, { status: 500 });
  try {
    r = O$3.verify(t$1, o, { issuer: n });
  } catch (c) {
    let l = "Invalid or expired token", d = "INVALID_TOKEN";
    return c instanceof O$3.TokenExpiredError ? (l = "Token expired", d = "TOKEN_EXPIRED", console.log(`[Auth Logic] Token scaduto per ${e.request.url}.`)) : c instanceof O$3.JsonWebTokenError ? (l = `Invalid token (${c.message})`, d = "TOKEN_INVALID_SIGNATURE_OR_PAYLOAD", console.warn(`[Auth Logic] Errore verifica token per ${e.request.url}: ${c.message}`)) : console.error(`[Auth Logic] Errore verifica token (sconosciuto) per ${e.request.url}:`, c), i({ error: l, code: d }, { status: 401 });
  }
  if (typeof r != "object" || r === null || typeof r.sub != "number" || typeof r.jti != "string") return console.log("[Auth Logic] Payload token decodificato non valido. Payload:", r), i({ error: "Invalid token payload structure or types", code: "INVALID_TOKEN_PAYLOAD" }, { status: 401 });
  const a = r.sub, i$1 = r.jti;
  try {
    const l = (await t.query("SELECT id, state FROM auth.users WHERE id = $1", [a])).rows[0];
    return l ? l.state === "blocked" || l.state === "sospended" ? (console.warn(`[Auth Logic] Accesso negato per utente ${a} (Stato: ${l.state})`), i({ error: `User account is ${l.state}`, code: `USER_${l.state.toUpperCase()}` }, { status: 403 })) : (console.log(`[Auth Logic] Utente ${a} autenticato per ${e.request.url}.`), { user: { id: a, tokenId: i$1, state: l.state } }) : (console.warn(`[Auth Logic] Utente ${a} non trovato.`), i({ error: "User associated with token not found", code: "USER_NOT_FOUND" }, { status: 401 }));
  } catch (c) {
    return console.error(`[Auth Logic] Errore DB check utente ${a}:`, c), i({ error: "Internal server error during user check" }, { status: 500 });
  }
}
async function Lt(e) {
  const s = e.nativeEvent;
  if (isPreflightRequest(s)) {
    const t = e.request.headers.get("origin");
    return handleCors(s, { origin: (o) => !o || de.includes(o), methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], allowHeaders: ["Authorization", "Content-Type", "Accept", "X-Requested-With"], credentials: true, maxAge: "86400" }) ? new Response(null, { status: 204 }) : (console.error(`[CORS Middleware] Preflight check failed for origin: ${t}`), i({ error: "CORS Preflight Check Failed" }, { status: 403 }));
  }
}
async function St(e) {
}
const Wt = ["/API/Auth/login", "/API/Auth/registration", "/API/Auth/refresh", "/API/Auth/logout"], It = "/API/";
async function Ut(e) {
  var _a;
  const t = new URL(e.request.url).pathname;
  if (!t.startsWith(It)) return;
  let r = null;
  if (Wt.some((a) => {
    let i = false;
    return typeof a == "string" ? i = a.endsWith("/") ? t.startsWith(a) : t === a : i = a.test(t), i && (r = a), i;
  })) {
    console.log(`[ApiAuth Middleware] SKIPPING AUTH for public API path "${t}" (matched: ${r})`);
    return;
  }
  console.log(`[ApiAuth Middleware] Path "${t}" is a PROTECTED API endpoint. Running auth check...`);
  const n = await Et(e);
  if (n instanceof Response) return console.warn(`[ApiAuth Middleware] Auth check failed for API "${t}". Status: ${n.status}`), n;
  e.locals.user = n.user, console.log(`[ApiAuth Middleware] Auth successful for user ${(_a = n.user) == null ? void 0 : _a.id} on API path "${t}"`);
}
const ee = Pt({ onRequest: [(e) => {
  e.locals.startTime = Date.now();
}, Lt, St, Ut], onBeforeResponse: [(e) => {
  appendCorsHeaders(e.nativeEvent, { origin: (s) => !s || de.includes(s), credentials: true });
}, (e) => {
  const s = e.locals;
  s.startTime && (Date.now() - s.startTime, new URL(e.request.url).pathname);
}] }), R = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function Dt(e = {}) {
  const s = { options: e, rootNode: me(), staticRoutesMap: {} }, t = (r) => e.strictTrailingSlash ? r : r.replace(/\/$/, "") || "/";
  if (e.routes) for (const r in e.routes) te(s, t(r), e.routes[r]);
  return { ctx: s, lookup: (r) => Mt(s, t(r)), insert: (r, o) => te(s, t(r), o), remove: (r) => Ot(s, t(r)) };
}
function Mt(e, s) {
  const t = e.staticRoutesMap[s];
  if (t) return t.data;
  const r = s.split("/"), o = {};
  let n = false, a = null, i = e.rootNode, c = null;
  for (let l = 0; l < r.length; l++) {
    const d = r[l];
    i.wildcardChildNode !== null && (a = i.wildcardChildNode, c = r.slice(l).join("/"));
    const $ = i.children.get(d);
    if ($ === void 0) {
      if (i && i.placeholderChildren.length > 1) {
        const T = r.length - l;
        i = i.placeholderChildren.find((f) => f.maxDepth === T) || null;
      } else i = i.placeholderChildren[0] || null;
      if (!i) break;
      i.paramName && (o[i.paramName] = d), n = true;
    } else i = $;
  }
  return (i === null || i.data === null) && a !== null && (i = a, o[i.paramName || "_"] = c, n = true), i ? n ? { ...i.data, params: n ? o : void 0 } : i.data : null;
}
function te(e, s, t) {
  let r = true;
  const o = s.split("/");
  let n = e.rootNode, a = 0;
  const i = [n];
  for (const c of o) {
    let l;
    if (l = n.children.get(c)) n = l;
    else {
      const d = Nt(c);
      l = me({ type: d, parent: n }), n.children.set(c, l), d === R.PLACEHOLDER ? (l.paramName = c === "*" ? `_${a++}` : c.slice(1), n.placeholderChildren.push(l), r = false) : d === R.WILDCARD && (n.wildcardChildNode = l, l.paramName = c.slice(3) || "_", r = false), i.push(l), n = l;
    }
  }
  for (const [c, l] of i.entries()) l.maxDepth = Math.max(i.length - c, l.maxDepth || 0);
  return n.data = t, r === true && (e.staticRoutesMap[s] = n), n;
}
function Ot(e, s) {
  let t = false;
  const r = s.split("/");
  let o = e.rootNode;
  for (const n of r) if (o = o.children.get(n), !o) return t;
  if (o.data) {
    const n = r.at(-1) || "";
    o.data = null, Object.keys(o.children).length === 0 && o.parent && (o.parent.children.delete(n), o.parent.wildcardChildNode = null, o.parent.placeholderChildren = []), t = true;
  }
  return t;
}
function me(e = {}) {
  return { type: e.type || R.NORMAL, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function Nt(e) {
  return e.startsWith("**") ? R.WILDCARD : e[0] === ":" || e === "*" ? R.PLACEHOLDER : R.NORMAL;
}
const he = [{ page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index27.mjs'), import: () => import('../build/index27.mjs') }, path: "/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/index.tsx" }, { page: true, $component: { src: "src/routes/[...404].tsx?pick=default&pick=$css", build: () => import('../build/_...404_2.mjs'), import: () => import('../build/_...404_2.mjs') }, path: "/*404", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/[...404].tsx" }, { page: false, $POST: { src: "src/routes/API/prova.ts?pick=POST", build: () => import('../build/prova2.mjs'), import: () => import('../build/prova2.mjs') }, path: "/API/prova", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/prova.ts" }, { page: true, $component: { src: "src/routes/UI/Cursor.tsx?pick=default&pick=$css", build: () => import('../build/Cursor2.mjs'), import: () => import('../build/Cursor2.mjs') }, path: "/UI/Cursor", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Cursor.tsx" }, { page: true, $component: { src: "src/routes/UI/Loading.tsx?pick=default&pick=$css", build: () => import('../build/Loading2.mjs'), import: () => import('../build/Loading2.mjs') }, path: "/UI/Loading", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Loading.tsx" }, { page: true, $component: { src: "src/routes/UI/Waves.tsx?pick=default&pick=$css", build: () => import('../build/Waves2.mjs'), import: () => import('../build/Waves2.mjs') }, path: "/UI/Waves", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Waves.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css", build: () => import('../build/index28.mjs'), import: () => import('../build/index28.mjs') }, path: "/(Pages)/LoginRegistration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css", build: () => import('../build/riv2.mjs'), import: () => import('../build/riv2.mjs') }, path: "/(Pages)/LoginRegistration/riv", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/riv.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css", build: () => import('../build/index32.mjs'), import: () => import('../build/index32.mjs') }, path: "/(Pages)/Wallets/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css", build: () => import('../build/_...slug_2.mjs'), import: () => import('../build/_...slug_2.mjs') }, path: "/(Pages)/Wallets/*slug", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/[...slug].tsx" }, { page: false, $POST: { src: "src/routes/API/Auth/logout.ts?pick=POST", build: () => import('../build/logout2.mjs'), import: () => import('../build/logout2.mjs') }, path: "/API/Auth/logout", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/logout.ts" }, { page: false, $POST: { src: "src/routes/API/Auth/refresh.ts?pick=POST", build: () => import('../build/refresh2.mjs'), import: () => import('../build/refresh2.mjs') }, path: "/API/Auth/refresh", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/refresh.ts" }, { page: false, $POST: { src: "src/routes/API/lib/addTransaction.ts?pick=POST", build: () => import('../build/addTransaction3.mjs'), import: () => import('../build/addTransaction3.mjs') }, path: "/API/lib/addTransaction", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/lib/addTransaction.ts" }, { page: false, $POST: { src: "src/routes/API/lib/getWalletsPaths.ts?pick=POST", build: () => import('../build/getWalletsPaths2.mjs'), import: () => import('../build/getWalletsPaths2.mjs') }, path: "/API/lib/getWalletsPaths", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/lib/getWalletsPaths.ts" }, { page: false, $POST: { src: "src/routes/API/Wallets/addWallet.ts?pick=POST", build: () => import('../build/addWallet2.mjs'), import: () => import('../build/addWallet2.mjs') }, path: "/API/Wallets/addWallet", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/addWallet.ts" }, { page: true, $component: { src: "src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css", build: () => import('../build/deleteWallet2.mjs'), import: () => import('../build/deleteWallet2.mjs') }, path: "/API/Wallets/deleteWallet", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Login/index.tsx?pick=default&pick=$css", build: () => import('../build/index42.mjs'), import: () => import('../build/index42.mjs') }, path: "/(Pages)/(lib)/Login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Login/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/index.tsx?pick=default&pick=$css", build: () => import('../build/index52.mjs'), import: () => import('../build/index52.mjs') }, path: "/(Pages)/(lib)/Transactions/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css", build: () => import('../build/Toggle2.mjs'), import: () => import('../build/Toggle2.mjs') }, path: "/(Pages)/LoginRegistration/components/Toggle", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/components/Toggle.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css", build: () => import('../build/index62.mjs'), import: () => import('../build/index62.mjs') }, path: "/(Pages)/LoginRegistration/Login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Login/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css", build: () => import('../build/index72.mjs'), import: () => import('../build/index72.mjs') }, path: "/(Pages)/LoginRegistration/Registration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index82.mjs'), import: () => import('../build/index82.mjs') }, path: "/(Pages)/Wallets/Wallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/index.tsx" }, { page: false, $POST: { src: "src/routes/API/Auth/login/index.ts?pick=POST", build: () => import('../build/index92.mjs'), import: () => import('../build/index92.mjs') }, path: "/API/Auth/login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/index.ts" }, { page: false, $POST: { src: "src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST", build: () => import('../build/addTransaction22.mjs'), import: () => import('../build/addTransaction22.mjs') }, path: "/API/Wallets/Wallet/addTransaction", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransaction.ts" }, { page: true, $component: { src: "src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css", build: () => import('../build/getTransactions2.mjs'), import: () => import('../build/getTransactions2.mjs') }, path: "/API/Wallets/Wallet/getTransactions", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx?pick=default&pick=$css", build: () => import('../build/pathWallets2.mjs'), import: () => import('../build/pathWallets2.mjs') }, path: "/(Pages)/(lib)/Transactions/utils/pathWallets", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/utils/pathWallets.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css", build: () => import('../build/index102.mjs'), import: () => import('../build/index102.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Credentials/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css", build: () => import('../build/index112.mjs'), import: () => import('../build/index112.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Email/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css", build: () => import('../build/index122.mjs'), import: () => import('../build/index122.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css", build: () => import('../build/sendOtp2.mjs'), import: () => import('../build/sendOtp2.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/sendOtp", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/addWallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index132.mjs'), import: () => import('../build/index132.mjs') }, path: "/(Pages)/Wallets/_components/addWallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/addWallet/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css", build: () => import('../build/index142.mjs'), import: () => import('../build/index142.mjs') }, path: "/(Pages)/Wallets/_components/Card/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css", build: () => import('../build/index152.mjs'), import: () => import('../build/index152.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts?pick=default&pick=$css", build: () => import('../build/preLoader2.mjs'), import: () => import('../build/preLoader2.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/preLoader", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/preLoader.ts" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css", build: () => import('../build/index162.mjs'), import: () => import('../build/index162.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index172.mjs'), import: () => import('../build/index172.mjs') }, path: "/(Pages)/Wallets/_components/SetWallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx" }, { page: false, $POST: { src: "src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST", build: () => import('../build/addTransactions2.mjs'), import: () => import('../build/addTransactions2.mjs') }, path: "/API/Wallets/Wallet/addTransactionByFile/addTransactions", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts" }, { page: false, $POST: { src: "src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST", build: () => import('../build/uploadFile3.mjs'), import: () => import('../build/uploadFile3.mjs') }, path: "/API/Wallets/Wallet/addTransactionByFile/uploadFile", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx?pick=default&pick=$css", build: () => import('../build/index182.mjs'), import: () => import('../build/index182.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx?pick=default&pick=$css", build: () => import('../build/index192.mjs'), import: () => import('../build/index192.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx?pick=default&pick=$css", build: () => import('../build/mapper2.mjs'), import: () => import('../build/mapper2.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/mapper", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/mapper.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx?pick=default&pick=$css", build: () => import('../build/preview2.mjs'), import: () => import('../build/preview2.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/preview", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/preview.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx?pick=default&pick=$css", build: () => import('../build/uploadFile22.mjs'), import: () => import('../build/uploadFile22.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csvChat/uploadFile", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csvChat/uploadFile.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css", build: () => import('../build/otpInput2.mjs'), import: () => import('../build/otpInput2.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css", build: () => import('../build/index202.mjs'), import: () => import('../build/index202.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/ProgressBar/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx?pick=default&pick=$css", build: () => import('../build/index212.mjs'), import: () => import('../build/index212.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/spline/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/spline/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css", build: () => import('../build/index222.mjs'), import: () => import('../build/index222.mjs') }, path: "/(Pages)/Wallets/Wallet/components/table.tsx/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css", build: () => import('../build/Card2.mjs'), import: () => import('../build/Card2.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/Card/Card", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx?pick=default&pick=$css", build: () => import('../build/index232.mjs'), import: () => import('../build/index232.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/mapper/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/mapper/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx?pick=default&pick=$css", build: () => import('../build/index242.mjs'), import: () => import('../build/index242.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/Preview/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/Preview/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx?pick=default&pick=$css", build: () => import('../build/index252.mjs'), import: () => import('../build/index252.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/Upload/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx?pick=default&pick=$css", build: () => import('../build/index262.mjs'), import: () => import('../build/index262.mjs') }, path: "/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/(lib)/Transactions/files/csv/Upload/DropZone/index.tsx" }], _t = Ht(he.filter((e) => e.page));
function Ht(e) {
  function s(t, r, o, n) {
    const a = Object.values(t).find((i) => o.startsWith(i.id + "/"));
    return a ? (s(a.children || (a.children = []), r, o.slice(a.id.length)), t) : (t.push({ ...r, id: o, path: o.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), t);
  }
  return e.sort((t, r) => t.path.length - r.path.length).reduce((t, r) => s(t, r, r.path, r.path), []);
}
function Ft(e, s) {
  const t = jt.lookup(e);
  if (t && t.route) {
    const r = s === "HEAD" ? t.route.$HEAD || t.route.$GET : t.route[`$${s}`];
    return r === void 0 ? void 0 : { handler: r, params: t.params };
  }
}
function qt(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
const jt = Dt({ routes: he.reduce((e, s) => {
  if (!qt(s)) return e;
  let t = s.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (r, o) => `**:${o}`).split("/").map((r) => r.startsWith(":") || r.startsWith("*") ? r : encodeURIComponent(r)).join("/");
  if (/:[^/]*\?/g.test(t)) throw new Error(`Optional parameters are not supported in API routes: ${t}`);
  if (e[t]) throw new Error(`Duplicate API routes for "${t}" found at "${e[t].route.path}" and "${s.path}"`);
  return e[t] = { route: s }, e;
}, {}) });
var Kt = " ";
const zt = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr(Kt), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function O(e, s) {
  let { tag: t, attrs: { key: r, ...o } = { key: void 0 }, children: n } = e;
  return zt[t]({ attrs: { ...o, nonce: s }, key: r, children: n });
}
function Jt(e, s, t, r = "default") {
  return lazy(async () => {
    var _a;
    {
      const n = (await e.import())[r], i = (await ((_a = s.inputs) == null ? void 0 : _a[e.src].assets())).filter((l) => l.tag === "style" || l.attrs.rel === "stylesheet");
      return { default: (l) => [...i.map((d) => O(d)), createComponent(n, l)] };
    }
  });
}
function fe() {
  function e(t) {
    return { ...t, ...t.$$route ? t.$$route.require().route : void 0, info: { ...t.$$route ? t.$$route.require().route.info : {}, filesystem: true }, component: t.$component && Jt(t.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: t.children ? t.children.map(e) : void 0 };
  }
  return _t.map(e);
}
let se;
const Gt = isServer ? () => getRequestEvent().routes : () => se || (se = fe());
function Vt(e) {
  const s = ye$1(e.nativeEvent, "flash");
  if (s) try {
    let t = JSON.parse(s);
    if (!t || !t.result) return;
    const r = [...t.input.slice(0, -1), new Map(t.input[t.input.length - 1])], o = t.error ? new Error(t.result) : t.result;
    return { input: r, url: t.url, pending: false, result: t.thrown ? void 0 : o, error: t.thrown ? o : void 0 };
  } catch (t) {
    console.error(t);
  } finally {
    Re$1(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function Xt(e) {
  const s = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await s.json(), assets: [...await s.inputs[s.handler].assets()], router: { submission: Vt(e) }, routes: fe(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const Yt = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function N(e) {
  return e.status && Yt.has(e.status) ? e.status : 302;
}
function Zt(e, s, t = {}, r) {
  return eventHandler({ handler: (o) => {
    const n = He$1(o);
    return provideRequestEvent(n, async () => {
      const a = Ft(new URL(n.request.url).pathname, n.request.method);
      if (a) {
        const f = await a.handler.import(), b = n.request.method === "HEAD" ? f.HEAD || f.GET : f[n.request.method];
        n.params = a.params || {}, sharedConfig.context = { event: n };
        const u = await b(n);
        if (u !== void 0) return u;
        if (n.request.method !== "GET") throw new Error(`API handler for ${n.request.method} "${n.request.url}" did not return a response.`);
      }
      const i = await s(n), c = typeof t == "function" ? await t(i) : { ...t }, l = c.mode || "stream";
      if (c.nonce && (i.nonce = c.nonce), l === "sync") {
        const f = renderToString(() => (sharedConfig.context.event = i, e(i)), c);
        if (i.complete = true, i.response && i.response.headers.get("Location")) {
          const b = N(i.response);
          return ge$1(o, i.response.headers.get("Location"), b);
        }
        return f;
      }
      if (c.onCompleteAll) {
        const f = c.onCompleteAll;
        c.onCompleteAll = (b) => {
          oe(i)(b), f(b);
        };
      } else c.onCompleteAll = oe(i);
      if (c.onCompleteShell) {
        const f = c.onCompleteShell;
        c.onCompleteShell = (b) => {
          re(i, o)(), f(b);
        };
      } else c.onCompleteShell = re(i, o);
      const d = renderToStream(() => (sharedConfig.context.event = i, e(i)), c);
      if (i.response && i.response.headers.get("Location")) {
        const f = N(i.response);
        return ge$1(o, i.response.headers.get("Location"), f);
      }
      if (l === "async") return d;
      const { writable: $, readable: T } = new TransformStream();
      return d.pipeTo($), T;
    });
  } });
}
function re(e, s) {
  return () => {
    if (e.response && e.response.headers.get("Location")) {
      const t = N(e.response);
      b$2(s, t), me$1(s, "Location", e.response.headers.get("Location"));
    }
  };
}
function oe(e) {
  return ({ write: s }) => {
    e.complete = true;
    const t = e.response && e.response.headers.get("Location");
    t && s(`<script>window.location="${t}"<\/script>`);
  };
}
function Qt(e, s, t) {
  return Zt(e, Xt, s);
}
const ge = createContext$1(), Pe = ["title", "meta"], _ = [], H = ["name", "http-equiv", "content", "charset", "media"].concat(["property"]), I = (e, s) => {
  const t = Object.fromEntries(Object.entries(e.props).filter(([r]) => s.includes(r)).sort());
  return (Object.hasOwn(t, "name") || Object.hasOwn(t, "property")) && (t.name = t.name || t.property, delete t.property), e.tag + JSON.stringify(t);
};
function es() {
  if (!sharedConfig.context) {
    const t = document.head.querySelectorAll("[data-sm]");
    Array.prototype.forEach.call(t, (r) => r.parentNode.removeChild(r));
  }
  const e = /* @__PURE__ */ new Map();
  function s(t) {
    if (t.ref) return t.ref;
    let r = document.querySelector(`[data-sm="${t.id}"]`);
    return r ? (r.tagName.toLowerCase() !== t.tag && (r.parentNode && r.parentNode.removeChild(r), r = document.createElement(t.tag)), r.removeAttribute("data-sm")) : r = document.createElement(t.tag), r;
  }
  return { addTag(t) {
    if (Pe.indexOf(t.tag) !== -1) {
      const n = t.tag === "title" ? _ : H, a = I(t, n);
      e.has(a) || e.set(a, []);
      let i = e.get(a), c = i.length;
      i = [...i, t], e.set(a, i);
      let l = s(t);
      t.ref = l, spread(l, t.props);
      let d = null;
      for (var r = c - 1; r >= 0; r--) if (i[r] != null) {
        d = i[r];
        break;
      }
      return l.parentNode != document.head && document.head.appendChild(l), d && d.ref && d.ref.parentNode && document.head.removeChild(d.ref), c;
    }
    let o = s(t);
    return t.ref = o, spread(o, t.props), o.parentNode != document.head && document.head.appendChild(o), -1;
  }, removeTag(t, r) {
    const o = t.tag === "title" ? _ : H, n = I(t, o);
    if (t.ref) {
      const a = e.get(n);
      if (a) {
        if (t.ref.parentNode) {
          t.ref.parentNode.removeChild(t.ref);
          for (let i = r - 1; i >= 0; i--) a[i] != null && document.head.appendChild(a[i].ref);
        }
        a[r] = null, e.set(n, a);
      } else t.ref.parentNode && t.ref.parentNode.removeChild(t.ref);
    }
  } };
}
function ts() {
  const e = [];
  return useAssets(() => ssr(os(e))), { addTag(s) {
    if (Pe.indexOf(s.tag) !== -1) {
      const t = s.tag === "title" ? _ : H, r = I(s, t), o = e.findIndex((n) => n.tag === s.tag && I(n, t) === r);
      o !== -1 && e.splice(o, 1);
    }
    return e.push(s), e.length;
  }, removeTag(s, t) {
  } };
}
const ss = (e) => {
  const s = isServer ? ts() : es();
  return createComponent$1(ge.Provider, { value: s, get children() {
    return e.children;
  } });
}, xe = (e, s, t) => (rs({ tag: e, props: s, setting: t, id: createUniqueId(), get name() {
  return s.name || s.property;
} }), null);
function rs(e) {
  const s = useContext(ge);
  if (!s) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const t = s.addTag(e);
    onCleanup(() => s.removeTag(e, t));
  });
}
function os(e) {
  return e.map((s) => {
    var _a, _b;
    const r = Object.keys(s.props).map((n) => n === "children" ? "" : ` ${n}="${escape(s.props[n], true)}"`).join("");
    let o = s.props.children;
    return Array.isArray(o) && (o = o.join("")), ((_a = s.setting) == null ? void 0 : _a.close) ? `<${s.tag} data-sm="${s.id}"${r}>${((_b = s.setting) == null ? void 0 : _b.escape) ? escape(o) : o || ""}</${s.tag}>` : `<${s.tag} data-sm="${s.id}"${r}/>`;
  }).join("");
}
const ns = (e) => xe("title", e, { escape: true, close: true }), is = (e) => xe("link", e);
var as = ["<div", ` class="fancy-spinner-container"><style>
          .fancy-spinner-container {
            /* Positioning and perspective for the container */
            position: relative; /* Changed from absolute for easier embedding */
            width: 265px; /* Approximate width */
            height: 265px; /* Approximate height */
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 200px; /* For 3D effect */
          }

          .fancy-spinner-particle-i {
            /* Absolute positioning for each particle's container */
            display: block;
            position: absolute;
            /* Center the particle based on its own size */
            left: 50%;
            top: 50%;
            margin-left: -32.5px;
            margin-top: -32.5px;
            width: 65px; /* Set width/height for transform origin */
            height: 65px;
          }

          .fancy-spinner-particle-b {
            /* Styles for the visible part of the particle */
            display: block;
            width: 65px;
            height: 65px;
            border: 2px solid white; /* White border, adjust color as needed */
            opacity: 0; /* Start invisible */
            transform: scale(0.7); /* Start slightly scaled down */

            /* Apply the animation */
            animation-name: spin;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            /* Custom cubic-bezier timing function from original SCSS */
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275);
          }

          /* Keyframes for the spin animation */
          @keyframes spin {
            0% {
              transform: rotate(0deg);
              opacity: 0; /* Ensure starts invisible */
            }
            40% {
              /* Rotate, move slightly, become visible */
              transform: rotate(-180deg) translateX(-32.5px);
              opacity: 1;
            }
            100% {
              /* Keep rotation, scale down, fade out (back to initial opacity 0) */
              transform: rotate(-180deg) scale(0.7);
              opacity: 0;
            }
          }
        </style><div class="fancy-spinner">`, "</div></div>"], ls = ["<i", ' class="fancy-spinner-particle-i" style="', '"><b class="fancy-spinner-particle-b" style="', '"></b></i>'];
const M = 50, cs = 100, us = 3, ps = () => {
  const e = Array.from({ length: M });
  return ssr(as, ssrHydrationKey(), escape(createComponent$1(For, { each: e, children: (s, t) => {
    const r = t() + 1, o = r / M * 360, n = r * (us / M);
    return ssr(ls, ssrHydrationKey(), `transform:rotate(${escape(o, true)}deg) translate3d(${escape(cs, true)}px, 0, 0)`, `animation-delay:${escape(n, true)}s`);
  } })));
};
var ds = ["<div", ' class="', '">', "</div>"], ms = ["<div", ">Caricamento route...</div>"];
const hs = ["/LoginRegistration"], fs = ["/", "/LoginRegistration", "/LoginRegistration/registration", "/LoginRegistration/Login", "/login"], gs = (e) => {
  const s = Me(), t = De();
  let r;
  createEffect(() => {
    const n = j.isLoading, a = j.isAuthenticated, i = t.pathname;
    if (n) {
      console.log("Effect Exit: Still loading.");
      return;
    }
    console.log(i), r = hs.includes(i);
    const c = fs.includes(i);
    a || c || (console.log(`NOT AUTHENTICATED on PROTECTED path (${i}). Redirecting to /LoginRegistration.`), s("/LoginRegistration", { replace: true }));
  });
  const o = "/_build/manifest.webmanifest";
  return createComponent$1(ss, { get children() {
    return [createComponent$1(ns, { children: "Pulsix" }), createComponent$1(is, { rel: "manifest", href: o }), createComponent$1(J, {}), createComponent$1(Show, { get when() {
      return !j.isLoading;
    }, get fallback() {
      return ssr(ds, ssrHydrationKey(), `${r ? "bg-black" : ""} fixed inset-0 flex items-center justify-center z-50`, escape(createComponent$1(ps, {})));
    }, get children() {
      return [createComponent$1(y, {}), createComponent$1(Suspense, { get fallback() {
        return ssr(ms, ssrHydrationKey());
      }, get children() {
        return e.children;
      } })];
    } })];
  } });
};
function Ps() {
  return onMount(() => {
    j.isAuthenticated || j.initialize();
  }), createComponent$1(wt, { root: gs, get children() {
    return createComponent$1(Gt, {});
  } });
}
const be = isServer ? (e) => {
  const s = getRequestEvent();
  return s.response.status = e.code, s.response.statusText = e.text, onCleanup(() => !s.nativeEvent.handled && !s.complete && (s.response.status = 200)), null;
} : (e) => null;
var xs = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">', "</span>"], bs = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>'];
const ks = (e) => {
  const s = isServer ? "500 | Internal Server Error" : "Error | Uncaught Client Exception";
  return createComponent$1(ErrorBoundary, { fallback: (t) => (console.error(t), [ssr(xs, ssrHydrationKey(), escape(s)), createComponent$1(be, { code: 500 })]), get children() {
    return e.children;
  } });
}, $s = (e) => {
  let s = false;
  const t = catchError(() => e.children, (r) => {
    console.error(r), s = !!r;
  });
  return s ? [ssr(bs, ssrHydrationKey()), createComponent$1(be, { code: 500 })] : t;
};
var ne = ["<script", ">", "<\/script>"], Ts = ["<script", ' type="module"', " async", "><\/script>"], As = ["<script", ' type="module" async', "><\/script>"];
const Cs = ssr("<!DOCTYPE html>");
function ke(e, s, t = []) {
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (o.path !== e[0].path) continue;
    let n = [...t, o];
    if (o.children) {
      const a = e.slice(1);
      if (a.length === 0 || (n = ke(a, o.children, n), !n)) continue;
    }
    return n;
  }
}
function Rs(e) {
  const s = getRequestEvent(), t = s.nonce;
  let r = [];
  return Promise.resolve().then(async () => {
    let o = [];
    if (s.router && s.router.matches) {
      const n = [...s.router.matches];
      for (; n.length && (!n[0].info || !n[0].info.filesystem); ) n.shift();
      const a = n.length && ke(n, s.routes);
      if (a) {
        const i = globalThis.MANIFEST.client.inputs;
        for (let c = 0; c < a.length; c++) {
          const l = a[c], d = i[l.$component.src];
          o.push(d.assets());
        }
      }
    }
    r = await Promise.all(o).then((n) => [...new Map(n.flat().map((a) => [a.attrs.key, a])).values()].filter((a) => a.attrs.rel === "modulepreload" && !s.assets.find((i) => i.attrs.key === a.attrs.key)));
  }), useAssets(() => r.length ? r.map((o) => O(o)) : void 0), createComponent$1(NoHydration, { get children() {
    return [Cs, createComponent$1($s, { get children() {
      return createComponent$1(e.document, { get assets() {
        return [createComponent$1(HydrationScript, {}), s.assets.map((o) => O(o, t))];
      }, get scripts() {
        return t ? [ssr(ne, ssrHydrationKey() + ssrAttribute("nonce", escape(t, true), false), `window.manifest = ${JSON.stringify(s.manifest)}`), ssr(Ts, ssrHydrationKey(), ssrAttribute("nonce", escape(t, true), false), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))] : [ssr(ne, ssrHydrationKey(), `window.manifest = ${JSON.stringify(s.manifest)}`), ssr(As, ssrHydrationKey(), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))];
      }, get children() {
        return createComponent$1(Hydration, { get children() {
          return createComponent$1(ks, { get children() {
            return createComponent$1(Ps, {});
          } });
        } });
      } });
    } })];
  } });
}
var vs = ['<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/public/logo.png">', "</head>"], ys = ["<html", ' lang="en">', '<body><div id="app">', "</div><!--$-->", "<!--/--></body></html>"];
const ie = Qt(() => createComponent$1(Rs, { document: ({ assets: e, children: s, scripts: t }) => ssr(ys, ssrHydrationKey(), createComponent$1(NoHydration, { get children() {
  return ssr(vs, escape(e));
} }), escape(s), escape(t)) })), Vs = eventHandler({ onRequest: ee.onRequest, onBeforeResponse: ee.onBeforeResponse, handler: ie, websocket: ie.__websocket__ });

const handlers = [
  { route: '/_server', handler: qs, lazy: false, middleware: true, method: undefined },
  { route: '/', handler: Vs, lazy: false, middleware: true, method: undefined }
];

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join$1(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
class Hasher {
  buff = "";
  #context = /* @__PURE__ */ new Map();
  write(str) {
    this.buff += str;
  }
  dispatch(value) {
    const type = value === null ? "null" : typeof value;
    return this[type](value);
  }
  object(object) {
    if (object && typeof object.toJSON === "function") {
      return this.object(object.toJSON());
    }
    const objString = Object.prototype.toString.call(object);
    let objType = "";
    const objectLength = objString.length;
    objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
    objType = objType.toLowerCase();
    let objectNumber = null;
    if ((objectNumber = this.#context.get(object)) === void 0) {
      this.#context.set(object, this.#context.size);
    } else {
      return this.dispatch("[CIRCULAR:" + objectNumber + "]");
    }
    if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
      this.write("buffer:");
      return this.write(object.toString("utf8"));
    }
    if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
      if (this[objType]) {
        this[objType](object);
      } else {
        this.unknown(object, objType);
      }
    } else {
      const keys = Object.keys(object).sort();
      const extraKeys = [];
      this.write("object:" + (keys.length + extraKeys.length) + ":");
      const dispatchForKey = (key) => {
        this.dispatch(key);
        this.write(":");
        this.dispatch(object[key]);
        this.write(",");
      };
      for (const key of keys) {
        dispatchForKey(key);
      }
      for (const key of extraKeys) {
        dispatchForKey(key);
      }
    }
  }
  array(arr, unordered) {
    unordered = unordered === void 0 ? false : unordered;
    this.write("array:" + arr.length + ":");
    if (!unordered || arr.length <= 1) {
      for (const entry of arr) {
        this.dispatch(entry);
      }
      return;
    }
    const contextAdditions = /* @__PURE__ */ new Map();
    const entries = arr.map((entry) => {
      const hasher = new Hasher();
      hasher.dispatch(entry);
      for (const [key, value] of hasher.#context) {
        contextAdditions.set(key, value);
      }
      return hasher.toString();
    });
    this.#context = contextAdditions;
    entries.sort();
    return this.array(entries, false);
  }
  date(date) {
    return this.write("date:" + date.toJSON());
  }
  symbol(sym) {
    return this.write("symbol:" + sym.toString());
  }
  unknown(value, type) {
    this.write(type);
    if (!value) {
      return;
    }
    this.write(":");
    if (value && typeof value.entries === "function") {
      return this.array(
        [...value.entries()],
        true
        /* ordered */
      );
    }
  }
  error(err) {
    return this.write("error:" + err.toString());
  }
  boolean(bool) {
    return this.write("bool:" + bool);
  }
  string(string) {
    this.write("string:" + string.length + ":");
    this.write(string);
  }
  function(fn) {
    this.write("fn:");
    if (isNativeFunction(fn)) {
      this.dispatch("[native]");
    } else {
      this.dispatch(fn.toString());
    }
  }
  number(number) {
    return this.write("number:" + number);
  }
  null() {
    return this.write("Null");
  }
  undefined() {
    return this.write("Undefined");
  }
  regexp(regex) {
    return this.write("regex:" + regex.toString());
  }
  arraybuffer(arr) {
    this.write("arraybuffer:");
    return this.dispatch(new Uint8Array(arr));
  }
  url(url) {
    return this.write("url:" + url.toString());
  }
  map(map) {
    this.write("map:");
    const arr = [...map];
    return this.array(arr, false);
  }
  set(set) {
    this.write("set:");
    const arr = [...set];
    return this.array(arr, false);
  }
  bigint(number) {
    return this.write("bigint:" + number.toString());
  }
}
for (const type of [
  "uint8array",
  "uint8clampedarray",
  "unt8array",
  "uint16array",
  "unt16array",
  "uint32array",
  "unt32array",
  "float32array",
  "float64array"
]) {
  Hasher.prototype[type] = function(arr) {
    this.write(type + ":");
    return this.array([...arr], false);
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {
      "/_build/assets/**": {
        "headers": {
          "cache-control": "public, immutable, max-age=31536000"
        }
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b$4(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return O$2(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

export { A$1 as A, Bs as B, De as D, G$1 as G, Me as M, Q$1 as Q, Re$3 as R, Ue as U, Y$1 as Y, toNodeListener as a, be$4 as b, t$1 as c, b$1 as d, i as e, xe$2 as f, t as g, he$2 as h, i$1 as i, be$2 as j, he$1 as k, ye$1 as l, j as m, Re$1 as n, trapUnhandledNodeErrors as t, useNitroApp as u, xe$4 as x, ye$3 as y };
//# sourceMappingURL=nitro.mjs.map
