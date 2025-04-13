import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import nodeCrypto, { createHash } from 'node:crypto';
import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import invariant from 'vinxi/lib/invariant';
import { virtualId, handlerModule, join } from 'vinxi/lib/path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { promises, existsSync } from 'node:fs';
import { sharedConfig, lazy, createComponent, useContext, createContext as createContext$1, createMemo, createSignal, createRenderEffect, on, runWithOwner, getOwner, startTransition, resetErrorBoundaries, batch, untrack, mergeProps as mergeProps$1, splitProps, Show, onCleanup, getListener, catchError, ErrorBoundary, Suspense, createUniqueId, onMount, children, createRoot } from 'solid-js';
import { renderToString, getRequestEvent, isServer, ssrElement, escape, mergeProps, ssr, createComponent as createComponent$1, ssrHydrationKey, renderToStream, NoHydration, useAssets, Hydration, ssrAttribute, HydrationScript, delegateEvents, spread } from 'solid-js/web';
import { provideRequestEvent } from 'solid-js/web/storage';
import { AsyncLocalStorage } from 'node:async_hooks';
import { resolve as resolve$1, dirname as dirname$1, join as join$1 } from 'node:path';

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

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
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
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
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

function o$2(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o$2("Readable.asyncIterator")}iterator(e){throw o$2("Readable.iterator")}map(e,t){throw o$2("Readable.map")}filter(e,t){throw o$2("Readable.filter")}forEach(e,t){throw o$2("Readable.forEach")}reduce(e,t,r){throw o$2("Readable.reduce")}find(e,t){throw o$2("Readable.find")}findIndex(e,t){throw o$2("Readable.findIndex")}some(e,t){throw o$2("Readable.some")}toArray(e){throw o$2("Readable.toArray")}every(e,t){throw o$2("Readable.every")}flatMap(e,t){throw o$2("Readable.flatMap")}drop(e,t){throw o$2("Readable.drop")}take(e,t){throw o$2("Readable.take")}asIndexedPairs(e){throw o$2("Readable.asIndexedPairs")}};let l$2 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}};const c$2=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$2){Object.assign(this,e),Object.assign(this,t),this._destroy=g$3(e._destroy,t._destroy);}};function _$3(){return Object.assign(c$2.prototype,i$1.prototype),Object.assign(c$2.prototype,l$2.prototype),c$2}function g$3(...n){return function(...e){for(const t of n)t(...e);}}const m$2=_$3();let A$4 = class A extends m$2{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}};let y$4 = class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A$4;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}};function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}let w$2 = class w extends l$2{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}};const E$1=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R$4(n={}){const e=new E$1,t=Array.isArray(n)||H$3(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H$3(n){return typeof n?.entries=="function"}function S$4(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const C$1=new Set([101,204,205,304]);async function b$4(n,e){const t=new y$4,r=new w$2(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R$4(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(C$1.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function O$1(n,e,t={}){try{const r=await b$4(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:S$4(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

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

const s$2=globalThis.Headers,i=globalThis.AbortController,l$1=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

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
    return l$1;
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
    return l$1(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$2;
const AbortController$1 = globalThis.AbortController || i;
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

const appConfig$1 = {"name":"vinxi","routers":[{"name":"public","type":"static","base":"/","dir":"./public","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","order":0,"outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/public"},{"name":"ssr","type":"http","link":{"client":"client"},"handler":"src/entry-server.tsx","extensions":["js","jsx","ts","tsx"],"target":"server","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","base":"/","outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/ssr","order":1},{"name":"client","type":"client","base":"/_build","handler":"src/entry-client.tsx","extensions":["js","jsx","ts","tsx"],"target":"browser","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/client","order":2},{"name":"server-fns","type":"http","base":"/_server","handler":"node_modules/.pnpm/@solidjs+start@1.1.3_@types_bf811de942ff2eef584d0e0e445f3ca9/node_modules/@solidjs/start/dist/runtime/server-handler.js","target":"server","root":"C:\\Users\\Matteo\\Desktop\\Pulsix","outDir":"C:/Users/Matteo/Desktop/Pulsix/.vinxi/build/server-fns","order":3}],"server":{"compressPublicAssets":{"brotli":true},"routeRules":{"/_build/assets/**":{"headers":{"cache-control":"public, immutable, max-age=31536000"}}},"experimental":{"asyncContext":true},"prerender":{}},"root":"C:\\Users\\Matteo\\Desktop\\Pulsix"};
				const buildManifest = {"ssr":{"_ButtonSparkle-C8CRtCd0.css":{"file":"assets/ButtonSparkle-C8CRtCd0.css","src":"_ButtonSparkle-C8CRtCd0.css"},"_ButtonSparkle-DNpTyev3.js":{"file":"assets/ButtonSparkle-DNpTyev3.js","name":"ButtonSparkle","css":["assets/ButtonSparkle-C8CRtCd0.css"]},"_Card-BcrU3z9h.css":{"file":"assets/Card-BcrU3z9h.css","src":"_Card-BcrU3z9h.css"},"_Card.module-nMwE8ysR.js":{"file":"assets/Card.module-nMwE8ysR.js","name":"Card.module","css":["assets/Card-BcrU3z9h.css"]},"_Cursor-DUhhJVLJ.css":{"file":"assets/Cursor-DUhhJVLJ.css","src":"_Cursor-DUhhJVLJ.css"},"_Inputs-Bqq548qA.css":{"file":"assets/Inputs-Bqq548qA.css","src":"_Inputs-Bqq548qA.css"},"_Inputs-BxVpbjg0.js":{"file":"assets/Inputs-BxVpbjg0.js","name":"Inputs","imports":["_db.server-Cxzv6220.js","_action-DzH6FtPs.js"],"css":["assets/Inputs-Bqq548qA.css"]},"_Menu-CNxWw250.js":{"file":"assets/Menu-CNxWw250.js","name":"Menu","imports":["_components-eKl611cl.js"],"css":["assets/Menu-DSzeyodt.css"]},"_Menu-DSzeyodt.css":{"file":"assets/Menu-DSzeyodt.css","src":"_Menu-DSzeyodt.css"},"_Title-C8lsFfVd.js":{"file":"assets/Title-C8lsFfVd.js","name":"Title"},"_action-DzH6FtPs.js":{"file":"assets/action-DzH6FtPs.js","name":"action","imports":["_routing-DxIlI4R1.js"]},"_components-eKl611cl.js":{"file":"assets/components-eKl611cl.js","name":"components","imports":["_routing-DxIlI4R1.js"]},"_db.server-Cxzv6220.js":{"file":"assets/db.server-Cxzv6220.js","name":"db.server","imports":["_fetchEvent-Ce2Ui3zq.js"]},"_deleteWallet-CDUDB5HW.js":{"file":"assets/deleteWallet-CDUDB5HW.js","name":"deleteWallet","imports":["_db.server-Cxzv6220.js","_action-DzH6FtPs.js"],"css":["assets/deleteWallet-CHR-5aIQ.css"]},"_deleteWallet-CHR-5aIQ.css":{"file":"assets/deleteWallet-CHR-5aIQ.css","src":"_deleteWallet-CHR-5aIQ.css"},"_exchangeRates-B5IJmiQP.js":{"file":"assets/exchangeRates-B5IJmiQP.js","name":"exchangeRates","imports":["_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_Card.module-nMwE8ysR.js","_components-eKl611cl.js"],"css":["assets/exchangeRates-BMINihpv.css"]},"_exchangeRates-BMINihpv.css":{"file":"assets/exchangeRates-BMINihpv.css","src":"_exchangeRates-BMINihpv.css"},"_fetchEvent-Ce2Ui3zq.js":{"file":"assets/fetchEvent-Ce2Ui3zq.js","name":"fetchEvent"},"_icons-Bh8061KW.css":{"file":"assets/icons-Bh8061KW.css","src":"_icons-Bh8061KW.css"},"_icons-N8M97GAt.js":{"file":"assets/icons-N8M97GAt.js","name":"icons","css":["assets/icons-Bh8061KW.css"]},"_index-BUMPztWr.css":{"file":"assets/index-BUMPztWr.css","src":"_index-BUMPztWr.css"},"_index-Bep36fvr.js":{"file":"assets/index-Bep36fvr.js","name":"index"},"_index-C1h2BJ6l.css":{"file":"assets/index-C1h2BJ6l.css","src":"_index-C1h2BJ6l.css"},"_index-CI1g57kZ.js":{"file":"assets/index-CI1g57kZ.js","name":"index","imports":["_icons-N8M97GAt.js"]},"_index-DFJEjzPR.js":{"file":"assets/index-DFJEjzPR.js","name":"index","imports":["_db.server-Cxzv6220.js","_prova-BQfA7nlw.js","_index-DYZ-zTTq.js","_components-eKl611cl.js","_Inputs-BxVpbjg0.js","_deleteWallet-CDUDB5HW.js","_ButtonSparkle-DNpTyev3.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"]},"_index-DYZ-zTTq.js":{"file":"assets/index-DYZ-zTTq.js","name":"index","imports":["_exchangeRates-B5IJmiQP.js","_components-eKl611cl.js"]},"_index-Ky9zR5dV.css":{"file":"assets/index-Ky9zR5dV.css","src":"_index-Ky9zR5dV.css"},"_index-XVT8Ct04.js":{"file":"assets/index-XVT8Ct04.js","name":"index","imports":["_db.server-Cxzv6220.js"],"css":["assets/index-Ky9zR5dV.css"]},"_index.module-0iUivGU7.js":{"file":"assets/index.module-0iUivGU7.js","name":"index.module","css":["assets/index-BUMPztWr.css","assets/riv-VPAlW_cg.css"]},"_index.module-B9JvMj-k.js":{"file":"assets/index.module-B9JvMj-k.js","name":"index.module","css":["assets/index-C1h2BJ6l.css"]},"_otpInput-Jfxp9i2z.js":{"file":"assets/otpInput-Jfxp9i2z.js","name":"otpInput","imports":["_index-CI1g57kZ.js","_db.server-Cxzv6220.js","_action-DzH6FtPs.js","_Inputs-BxVpbjg0.js","_ButtonSparkle-DNpTyev3.js"],"css":["assets/otpInput-tBTztLmB.css"]},"_otpInput-tBTztLmB.css":{"file":"assets/otpInput-tBTztLmB.css","src":"_otpInput-tBTztLmB.css"},"_prova-BQfA7nlw.js":{"file":"assets/prova-BQfA7nlw.js","name":"prova","imports":["_components-eKl611cl.js"]},"_riv-VPAlW_cg.css":{"file":"assets/riv-VPAlW_cg.css","src":"_riv-VPAlW_cg.css"},"_routing-DxIlI4R1.js":{"file":"assets/routing-DxIlI4R1.js","name":"routing"},"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx":{"file":"assets/index-WwoiZKEg.js","name":"index","src":"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx","isDynamicEntry":true},"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css":{"file":"index4.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Inputs-BxVpbjg0.js","_Menu-CNxWw250.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js","_routing-DxIlI4R1.js","_components-eKl611cl.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css":{"file":"index7.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Inputs-BxVpbjg0.js","_Title-C8lsFfVd.js","_index-CI1g57kZ.js","_index.module-B9JvMj-k.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js","_routing-DxIlI4R1.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css":{"file":"index8.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Inputs-BxVpbjg0.js","_otpInput-Jfxp9i2z.js","_index-CI1g57kZ.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js","_routing-DxIlI4R1.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css":{"file":"index9.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-Jfxp9i2z.js","_ButtonSparkle-DNpTyev3.js","_Inputs-BxVpbjg0.js","_index-CI1g57kZ.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js","_routing-DxIlI4R1.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css":{"file":"sendOtp.js","name":"sendOtp","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-Jfxp9i2z.js","_Inputs-BxVpbjg0.js","_index-CI1g57kZ.js","_icons-N8M97GAt.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js","_routing-DxIlI4R1.js","_ButtonSparkle-DNpTyev3.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css":{"file":"index14.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css":{"file":"otpInput.js","name":"otpInput","src":"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-Jfxp9i2z.js","_index-CI1g57kZ.js","_Inputs-BxVpbjg0.js","_action-DzH6FtPs.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_ButtonSparkle-DNpTyev3.js","_icons-N8M97GAt.js","_routing-DxIlI4R1.js"]},"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css":{"file":"index5.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-CNxWw250.js","_index-CI1g57kZ.js","_ButtonSparkle-DNpTyev3.js","_Inputs-BxVpbjg0.js","_Title-C8lsFfVd.js","_index.module-B9JvMj-k.js","_otpInput-Jfxp9i2z.js","_components-eKl611cl.js","_routing-DxIlI4R1.js","_icons-N8M97GAt.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js"]},"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css":{"file":"Toggle.js","name":"Toggle","src":"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index.module-0iUivGU7.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css":{"file":"index2.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-CNxWw250.js","_index.module-0iUivGU7.js","_ButtonSparkle-DNpTyev3.js","_routing-DxIlI4R1.js","_components-eKl611cl.js"],"css":["assets/index-Bn1gRDsI.css","assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css":{"file":"riv.js","name":"riv","src":"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css":{"file":"index15.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css":{"file":"index6.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-XVT8Ct04.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css":{"file":"_...slug_.js","name":"_...slug_","src":"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_index-DFJEjzPR.js","_exchangeRates-B5IJmiQP.js","_prova-BQfA7nlw.js","_index-DYZ-zTTq.js","_index-XVT8Ct04.js","_deleteWallet-CDUDB5HW.js","_index-Bep36fvr.js","_routing-DxIlI4R1.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_components-eKl611cl.js","_Inputs-BxVpbjg0.js","_action-DzH6FtPs.js","_ButtonSparkle-DNpTyev3.js","_Card.module-nMwE8ysR.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css":{"file":"index10.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_prova-BQfA7nlw.js","_index-DYZ-zTTq.js","_components-eKl611cl.js","_exchangeRates-B5IJmiQP.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_Card.module-nMwE8ysR.js","_routing-DxIlI4R1.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css":{"file":"LazyLoadSpline.js","name":"LazyLoadSpline","src":"src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css":{"file":"index11.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css":{"file":"index13.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-BxVpbjg0.js","_deleteWallet-CDUDB5HW.js","_index-DYZ-zTTq.js","_ButtonSparkle-DNpTyev3.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_action-DzH6FtPs.js","_routing-DxIlI4R1.js","_exchangeRates-B5IJmiQP.js","_Card.module-nMwE8ysR.js","_components-eKl611cl.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"]},"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css":{"file":"Card.js","name":"Card","src":"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Card.module-nMwE8ysR.js","_components-eKl611cl.js","_routing-DxIlI4R1.js"]},"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css":{"file":"index12.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_exchangeRates-B5IJmiQP.js","_components-eKl611cl.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_Card.module-nMwE8ysR.js","_routing-DxIlI4R1.js"]},"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css":{"file":"index3.js","name":"index","src":"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_index-DFJEjzPR.js","_exchangeRates-B5IJmiQP.js","_index-DYZ-zTTq.js","_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js","_prova-BQfA7nlw.js","_components-eKl611cl.js","_routing-DxIlI4R1.js","_Inputs-BxVpbjg0.js","_action-DzH6FtPs.js","_deleteWallet-CDUDB5HW.js","_ButtonSparkle-DNpTyev3.js","_Card.module-nMwE8ysR.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css":{"file":"getTransactions.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js"]},"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css":{"file":"deleteWallet.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_db.server-Cxzv6220.js","_fetchEvent-Ce2Ui3zq.js"]},"src/routes/UI/Cursor.tsx?pick=default&pick=$css":{"file":"Cursor.js","name":"Cursor","src":"src/routes/UI/Cursor.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/UI/Waves.tsx?pick=default&pick=$css":{"file":"Waves.js","name":"Waves","src":"src/routes/UI/Waves.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/[...404].tsx?pick=default&pick=$css":{"file":"_...404_.js","name":"_...404_","src":"src/routes/[...404].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Menu-CNxWw250.js","_components-eKl611cl.js","_routing-DxIlI4R1.js"],"css":["assets/_..-D39vbXZ9.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Bep36fvr.js"]},"virtual:$vinxi/handler/ssr":{"file":"ssr.js","name":"ssr","src":"virtual:$vinxi/handler/ssr","isEntry":true,"imports":["_fetchEvent-Ce2Ui3zq.js","_Menu-CNxWw250.js","_routing-DxIlI4R1.js","_action-DzH6FtPs.js","_components-eKl611cl.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css"],"css":["assets/ssr-CZcrTF1W.css","assets/Cursor-DUhhJVLJ.css"]}},"client":{"_ButtonSparkle-C8CRtCd0.css":{"file":"assets/ButtonSparkle-C8CRtCd0.css","src":"_ButtonSparkle-C8CRtCd0.css"},"_ButtonSparkle-CX-W2frl.js":{"file":"assets/ButtonSparkle-CX-W2frl.js","name":"ButtonSparkle","imports":["_web-DcXN-p99.js"],"css":["assets/ButtonSparkle-C8CRtCd0.css"]},"_Card-BcrU3z9h.css":{"file":"assets/Card-BcrU3z9h.css","src":"_Card-BcrU3z9h.css"},"_Card.module-nMwE8ysR.js":{"file":"assets/Card.module-nMwE8ysR.js","name":"Card.module","css":["assets/Card-BcrU3z9h.css"]},"_Cursor-DUhhJVLJ.css":{"file":"assets/Cursor-DUhhJVLJ.css","src":"_Cursor-DUhhJVLJ.css"},"_Inputs-Bqq548qA.css":{"file":"assets/Inputs-Bqq548qA.css","src":"_Inputs-Bqq548qA.css"},"_Inputs-hvbb28Ka.js":{"file":"assets/Inputs-hvbb28Ka.js","name":"Inputs","imports":["_web-DcXN-p99.js","_ButtonSparkle-CX-W2frl.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js"],"css":["assets/Inputs-Bqq548qA.css"]},"_Menu-DSzeyodt.css":{"file":"assets/Menu-DSzeyodt.css","src":"_Menu-DSzeyodt.css"},"_Menu-kyhemyOT.js":{"file":"assets/Menu-kyhemyOT.js","name":"Menu","imports":["_web-DcXN-p99.js","_components-BQhjVazl.js"],"css":["assets/Menu-DSzeyodt.css"]},"_Title-BAWdhi0q.js":{"file":"assets/Title-BAWdhi0q.js","name":"Title","imports":["_web-DcXN-p99.js"]},"_action-CDr_hENZ.js":{"file":"assets/action-CDr_hENZ.js","name":"action","imports":["_web-DcXN-p99.js","_routing-BUmn5GEU.js"]},"_components-BQhjVazl.js":{"file":"assets/components-BQhjVazl.js","name":"components","imports":["_web-DcXN-p99.js","_routing-BUmn5GEU.js"]},"_deleteWallet-CHR-5aIQ.css":{"file":"assets/deleteWallet-CHR-5aIQ.css","src":"_deleteWallet-CHR-5aIQ.css"},"_deleteWallet-Djn27Ww0.js":{"file":"assets/deleteWallet-Djn27Ww0.js","name":"deleteWallet","imports":["_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js"],"css":["assets/deleteWallet-CHR-5aIQ.css"]},"_exchangeRates-BMINihpv.css":{"file":"assets/exchangeRates-BMINihpv.css","src":"_exchangeRates-BMINihpv.css"},"_exchangeRates-DIwxOQun.js":{"file":"assets/exchangeRates-DIwxOQun.js","name":"exchangeRates","imports":["_server-runtime-6wq6LtAi.js","_web-DcXN-p99.js","_Card.module-nMwE8ysR.js","_components-BQhjVazl.js"],"css":["assets/exchangeRates-BMINihpv.css"]},"_howler-DGkKYxeN.js":{"file":"assets/howler-DGkKYxeN.js","name":"howler","isDynamicEntry":true},"_icons-Bh8061KW.css":{"file":"assets/icons-Bh8061KW.css","src":"_icons-Bh8061KW.css"},"_icons-ChlcGNuY.js":{"file":"assets/icons-ChlcGNuY.js","name":"icons","imports":["_web-DcXN-p99.js"],"css":["assets/icons-Bh8061KW.css"]},"_index-BUMPztWr.css":{"file":"assets/index-BUMPztWr.css","src":"_index-BUMPztWr.css"},"_index-C1h2BJ6l.css":{"file":"assets/index-C1h2BJ6l.css","src":"_index-C1h2BJ6l.css"},"_index-CH-czpgK.js":{"file":"assets/index-CH-czpgK.js","name":"index","imports":["_server-runtime-6wq6LtAi.js","_web-DcXN-p99.js","_prova-Dx2gmhDX.js","_index-DMf-fkG-.js","_components-BQhjVazl.js","_preload-helper-CM3UJVvY.js","_Inputs-hvbb28Ka.js","_deleteWallet-Djn27Ww0.js","_ButtonSparkle-CX-W2frl.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"]},"_index-D8rVyQy1.js":{"file":"assets/index-D8rVyQy1.js","name":"index"},"_index-DB7IFhIG.js":{"file":"assets/index-DB7IFhIG.js","name":"index","imports":["_web-DcXN-p99.js","_runtime-BmWp8cEw.js"]},"_index-DMf-fkG-.js":{"file":"assets/index-DMf-fkG-.js","name":"index","imports":["_web-DcXN-p99.js","_exchangeRates-DIwxOQun.js","_components-BQhjVazl.js"]},"_index-DcaoqgVt.js":{"file":"assets/index-DcaoqgVt.js","name":"index","imports":["_web-DcXN-p99.js","_icons-ChlcGNuY.js"]},"_index-DlIApr22.js":{"file":"assets/index-DlIApr22.js","name":"index","imports":["_server-runtime-6wq6LtAi.js","_web-DcXN-p99.js"],"css":["assets/index-Ky9zR5dV.css"]},"_index-Ky9zR5dV.css":{"file":"assets/index-Ky9zR5dV.css","src":"_index-Ky9zR5dV.css"},"_index.module-B9JvMj-k.js":{"file":"assets/index.module-B9JvMj-k.js","name":"index.module","css":["assets/index-C1h2BJ6l.css"]},"_index.module-DJUCNMRy.js":{"file":"assets/index.module-DJUCNMRy.js","name":"index.module","imports":["_preload-helper-CM3UJVvY.js","_web-DcXN-p99.js"],"dynamicImports":["_rive-D3j5nBow.js"],"css":["assets/index-BUMPztWr.css","assets/riv-VPAlW_cg.css"]},"_otpInput-DeXMA6XN.js":{"file":"assets/otpInput-DeXMA6XN.js","name":"otpInput","imports":["_web-DcXN-p99.js","_index-DcaoqgVt.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_Inputs-hvbb28Ka.js","_ButtonSparkle-CX-W2frl.js"],"css":["assets/otpInput-tBTztLmB.css"]},"_otpInput-tBTztLmB.css":{"file":"assets/otpInput-tBTztLmB.css","src":"_otpInput-tBTztLmB.css"},"_preload-helper-CM3UJVvY.js":{"file":"assets/preload-helper-CM3UJVvY.js","name":"preload-helper"},"_prova-Dx2gmhDX.js":{"file":"assets/prova-Dx2gmhDX.js","name":"prova","imports":["_web-DcXN-p99.js","_components-BQhjVazl.js"]},"_riv-VPAlW_cg.css":{"file":"assets/riv-VPAlW_cg.css","src":"_riv-VPAlW_cg.css"},"_rive-D3j5nBow.js":{"file":"assets/rive-D3j5nBow.js","name":"rive","isDynamicEntry":true},"_routing-BUmn5GEU.js":{"file":"assets/routing-BUmn5GEU.js","name":"routing","imports":["_web-DcXN-p99.js"]},"_runtime-BmWp8cEw.js":{"file":"assets/runtime-BmWp8cEw.js","name":"runtime","imports":["_preload-helper-CM3UJVvY.js"],"dynamicImports":["node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/navmesh.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/physics.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/process.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/boolean.js","_howler-DGkKYxeN.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/opentype.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/ui.js","node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/gaussian-splat-compression.js"]},"_server-runtime-6wq6LtAi.js":{"file":"assets/server-runtime-6wq6LtAi.js","name":"server-runtime"},"_web-DcXN-p99.js":{"file":"assets/web-DcXN-p99.js","name":"web"},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/boolean.js":{"file":"assets/boolean-CynEgfvK.js","name":"boolean","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/boolean.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/gaussian-splat-compression.js":{"file":"assets/gaussian-splat-compression-CYQZ50o2.js","name":"gaussian-splat-compression","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/gaussian-splat-compression.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/navmesh.js":{"file":"assets/navmesh-BFd9Mv4x.js","name":"navmesh","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/navmesh.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/opentype.js":{"file":"assets/opentype-LDE648lb.js","name":"opentype","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/opentype.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/physics.js":{"file":"assets/physics-BM4kW-A5.js","name":"physics","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/physics.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/process.js":{"file":"assets/process-DLQUZ-E7.js","name":"process","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/process.js","isDynamicEntry":true},"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/ui.js":{"file":"assets/ui-BRPadsgT.js","name":"ui","src":"node_modules/.pnpm/@splinetool+runtime@1.9.82/node_modules/@splinetool/runtime/build/ui.js","isDynamicEntry":true},"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx":{"file":"assets/index-BI0YgTAM.js","name":"index","src":"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx","isDynamicEntry":true,"imports":["_web-DcXN-p99.js"]},"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css":{"file":"assets/index-88vfUY6A.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_ButtonSparkle-CX-W2frl.js","_Inputs-hvbb28Ka.js","_Menu-kyhemyOT.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_routing-BUmn5GEU.js","_components-BQhjVazl.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css":{"file":"assets/index-CIjphGrZ.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_ButtonSparkle-CX-W2frl.js","_Inputs-hvbb28Ka.js","_Title-BAWdhi0q.js","_index-DcaoqgVt.js","_index.module-B9JvMj-k.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_routing-BUmn5GEU.js","_icons-ChlcGNuY.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css":{"file":"assets/index-C8JvlN6N.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_index-D8rVyQy1.js","_ButtonSparkle-CX-W2frl.js","_Inputs-hvbb28Ka.js","_otpInput-DeXMA6XN.js","_index-DcaoqgVt.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_routing-BUmn5GEU.js","_icons-ChlcGNuY.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css":{"file":"assets/index-hJ-BwGgJ.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_otpInput-DeXMA6XN.js","_ButtonSparkle-CX-W2frl.js","_Inputs-hvbb28Ka.js","_index-DcaoqgVt.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_routing-BUmn5GEU.js","_icons-ChlcGNuY.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css":{"file":"assets/sendOtp-CjQewLXM.js","name":"sendOtp","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-DeXMA6XN.js","_web-DcXN-p99.js","_Inputs-hvbb28Ka.js","_index-DcaoqgVt.js","_icons-ChlcGNuY.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_routing-BUmn5GEU.js","_ButtonSparkle-CX-W2frl.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css":{"file":"assets/index-COvTVlLR.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_icons-ChlcGNuY.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css":{"file":"assets/otpInput-BLB8o3Md.js","name":"otpInput","src":"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_otpInput-DeXMA6XN.js","_index-DcaoqgVt.js","_Inputs-hvbb28Ka.js","_action-CDr_hENZ.js","_server-runtime-6wq6LtAi.js","_ButtonSparkle-CX-W2frl.js","_icons-ChlcGNuY.js","_routing-BUmn5GEU.js"]},"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css":{"file":"assets/index-De9y16RJ.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_Menu-kyhemyOT.js","_index-DcaoqgVt.js","_ButtonSparkle-CX-W2frl.js","_Inputs-hvbb28Ka.js","_Title-BAWdhi0q.js","_index.module-B9JvMj-k.js","_index-D8rVyQy1.js","_otpInput-DeXMA6XN.js","_components-BQhjVazl.js","_routing-BUmn5GEU.js","_icons-ChlcGNuY.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js"]},"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css":{"file":"assets/Toggle-BgaoKUuk.js","name":"Toggle","src":"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_index.module-DJUCNMRy.js","_preload-helper-CM3UJVvY.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css":{"file":"assets/index-K3Oktdx6.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_Menu-kyhemyOT.js","_index.module-DJUCNMRy.js","_ButtonSparkle-CX-W2frl.js","_routing-BUmn5GEU.js","_components-BQhjVazl.js","_preload-helper-CM3UJVvY.js"],"css":["assets/index-Bn1gRDsI.css","assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css":{"file":"assets/riv-CrzKM9lR.js","name":"riv","src":"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_web-DcXN-p99.js"],"dynamicImports":["_rive-D3j5nBow.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css":{"file":"assets/index-CeyMEmpq.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css":{"file":"assets/index-B9evPoF0.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_index-DlIApr22.js","_server-runtime-6wq6LtAi.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css":{"file":"assets/_...slug_-D_Uu6UUA.js","name":"_...slug_","src":"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_Title-BAWdhi0q.js","_index-CH-czpgK.js","_exchangeRates-DIwxOQun.js","_index-DMf-fkG-.js","_index-DlIApr22.js","_deleteWallet-Djn27Ww0.js","_index-DB7IFhIG.js","_routing-BUmn5GEU.js","_server-runtime-6wq6LtAi.js","_prova-Dx2gmhDX.js","_components-BQhjVazl.js","_preload-helper-CM3UJVvY.js","_Inputs-hvbb28Ka.js","_ButtonSparkle-CX-W2frl.js","_action-CDr_hENZ.js","_Card.module-nMwE8ysR.js","_runtime-BmWp8cEw.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css":{"file":"assets/index-Bb-RPvJO.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_prova-Dx2gmhDX.js","_index-DMf-fkG-.js","_components-BQhjVazl.js","_exchangeRates-DIwxOQun.js","_server-runtime-6wq6LtAi.js","_Card.module-nMwE8ysR.js","_routing-BUmn5GEU.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css":{"file":"assets/LazyLoadSpline-CHHaaTq7.js","name":"LazyLoadSpline","src":"src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css":{"file":"assets/index-CORO8PuB.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_runtime-BmWp8cEw.js","_preload-helper-CM3UJVvY.js"]},"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css":{"file":"assets/index-B4yOeCQX.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-CM3UJVvY.js","_web-DcXN-p99.js","_Inputs-hvbb28Ka.js","_deleteWallet-Djn27Ww0.js","_index-DMf-fkG-.js","_ButtonSparkle-CX-W2frl.js","_server-runtime-6wq6LtAi.js","_action-CDr_hENZ.js","_routing-BUmn5GEU.js","_exchangeRates-DIwxOQun.js","_Card.module-nMwE8ysR.js","_components-BQhjVazl.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"]},"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css":{"file":"assets/Card-DUNVX3H7.js","name":"Card","src":"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_Card.module-nMwE8ysR.js","_components-BQhjVazl.js","_routing-BUmn5GEU.js"]},"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css":{"file":"assets/index-CWSqypye.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_exchangeRates-DIwxOQun.js","_components-BQhjVazl.js","_server-runtime-6wq6LtAi.js","_Card.module-nMwE8ysR.js","_routing-BUmn5GEU.js"]},"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css":{"file":"assets/index-BQI8r8OJ.js","name":"index","src":"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_Title-BAWdhi0q.js","_index-CH-czpgK.js","_exchangeRates-DIwxOQun.js","_index-DMf-fkG-.js","_server-runtime-6wq6LtAi.js","_prova-Dx2gmhDX.js","_components-BQhjVazl.js","_routing-BUmn5GEU.js","_preload-helper-CM3UJVvY.js","_Inputs-hvbb28Ka.js","_ButtonSparkle-CX-W2frl.js","_action-CDr_hENZ.js","_deleteWallet-Djn27Ww0.js","_Card.module-nMwE8ysR.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css":{"file":"assets/getTransactions-0ox0yA0f.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-runtime-6wq6LtAi.js"]},"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css":{"file":"assets/deleteWallet-DfLb0_b2.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-runtime-6wq6LtAi.js"]},"src/routes/UI/Cursor.tsx?pick=default&pick=$css":{"file":"assets/Cursor-DPOt0gbm.js","name":"Cursor","src":"src/routes/UI/Cursor.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js"],"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/UI/Waves.tsx?pick=default&pick=$css":{"file":"assets/Waves-CQ3GUdkf.js","name":"Waves","src":"src/routes/UI/Waves.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js"]},"src/routes/[...404].tsx?pick=default&pick=$css":{"file":"assets/_...404_-BOKr2Rfp.js","name":"_...404_","src":"src/routes/[...404].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_ButtonSparkle-CX-W2frl.js","_Menu-kyhemyOT.js","_components-BQhjVazl.js","_routing-BUmn5GEU.js"],"css":["assets/_..-D39vbXZ9.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"assets/index-D5Hanbsc.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-DcXN-p99.js","_index-DB7IFhIG.js","_runtime-BmWp8cEw.js","_preload-helper-CM3UJVvY.js"]},"virtual:$vinxi/handler/client":{"file":"assets/client-yC3zgFCw.js","name":"client","src":"virtual:$vinxi/handler/client","isEntry":true,"imports":["_web-DcXN-p99.js","_preload-helper-CM3UJVvY.js","_Menu-kyhemyOT.js","_routing-BUmn5GEU.js","_action-CDr_hENZ.js","_components-BQhjVazl.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css"],"css":["assets/client-CZcrTF1W.css","assets/Cursor-DUhhJVLJ.css"]}},"server-fns":{"_ButtonSparkle-C8CRtCd0.css":{"file":"assets/ButtonSparkle-C8CRtCd0.css","src":"_ButtonSparkle-C8CRtCd0.css"},"_ButtonSparkle-DNpTyev3.js":{"file":"assets/ButtonSparkle-DNpTyev3.js","name":"ButtonSparkle","css":["assets/ButtonSparkle-C8CRtCd0.css"]},"_Card-BcrU3z9h.css":{"file":"assets/Card-BcrU3z9h.css","src":"_Card-BcrU3z9h.css"},"_Card.module-nMwE8ysR.js":{"file":"assets/Card.module-nMwE8ysR.js","name":"Card.module","css":["assets/Card-BcrU3z9h.css"]},"_Cursor-DUhhJVLJ.css":{"file":"assets/Cursor-DUhhJVLJ.css","src":"_Cursor-DUhhJVLJ.css"},"_Inputs-Bqq548qA.css":{"file":"assets/Inputs-Bqq548qA.css","src":"_Inputs-Bqq548qA.css"},"_Inputs-CEYxPBfP.js":{"file":"assets/Inputs-CEYxPBfP.js","name":"Inputs","imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js"],"css":["assets/Inputs-Bqq548qA.css"]},"_Menu-DSzeyodt.css":{"file":"assets/Menu-DSzeyodt.css","src":"_Menu-DSzeyodt.css"},"_Menu-OQmUNT5t.js":{"file":"assets/Menu-OQmUNT5t.js","name":"Menu","imports":["_components-CJF4pMQg.js"],"css":["assets/Menu-DSzeyodt.css"]},"_Title-C8lsFfVd.js":{"file":"assets/Title-C8lsFfVd.js","name":"Title"},"_action-BVKOmiKt.js":{"file":"assets/action-BVKOmiKt.js","name":"action","imports":["_routing-BSDkuvr3.js"]},"_components-CJF4pMQg.js":{"file":"assets/components-CJF4pMQg.js","name":"components","imports":["_routing-BSDkuvr3.js"]},"_db.server-BYnrqg0d.js":{"file":"assets/db.server-BYnrqg0d.js","name":"db.server"},"_deleteWallet-CHR-5aIQ.css":{"file":"assets/deleteWallet-CHR-5aIQ.css","src":"_deleteWallet-CHR-5aIQ.css"},"_deleteWallet-D6_HIjzQ.js":{"file":"assets/deleteWallet-D6_HIjzQ.js","name":"deleteWallet","imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js"],"css":["assets/deleteWallet-CHR-5aIQ.css"]},"_exchangeRates-BMINihpv.css":{"file":"assets/exchangeRates-BMINihpv.css","src":"_exchangeRates-BMINihpv.css"},"_exchangeRates-ChMJm5Xh.js":{"file":"assets/exchangeRates-ChMJm5Xh.js","name":"exchangeRates","imports":["_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_Card.module-nMwE8ysR.js","_components-CJF4pMQg.js","_db.server-BYnrqg0d.js"],"css":["assets/exchangeRates-BMINihpv.css"]},"_fetchEvent-1KlzQMFw.js":{"file":"assets/fetchEvent-1KlzQMFw.js","name":"fetchEvent"},"_icons-Bh8061KW.css":{"file":"assets/icons-Bh8061KW.css","src":"_icons-Bh8061KW.css"},"_icons-N8M97GAt.js":{"file":"assets/icons-N8M97GAt.js","name":"icons","css":["assets/icons-Bh8061KW.css"]},"_index-2Np-G_nR.js":{"file":"assets/index-2Np-G_nR.js","name":"index","imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js"],"css":["assets/index-Ky9zR5dV.css"]},"_index-B54VJo2T.js":{"file":"assets/index-B54VJo2T.js","name":"index","imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_prova-UkNyxD49.js","_index-CM2EfUOf.js","_components-CJF4pMQg.js","_Inputs-CEYxPBfP.js","_deleteWallet-D6_HIjzQ.js","_ButtonSparkle-DNpTyev3.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"]},"_index-BUMPztWr.css":{"file":"assets/index-BUMPztWr.css","src":"_index-BUMPztWr.css"},"_index-Bep36fvr.js":{"file":"assets/index-Bep36fvr.js","name":"index"},"_index-C1h2BJ6l.css":{"file":"assets/index-C1h2BJ6l.css","src":"_index-C1h2BJ6l.css"},"_index-CI1g57kZ.js":{"file":"assets/index-CI1g57kZ.js","name":"index","imports":["_icons-N8M97GAt.js"]},"_index-CM2EfUOf.js":{"file":"assets/index-CM2EfUOf.js","name":"index","imports":["_exchangeRates-ChMJm5Xh.js","_components-CJF4pMQg.js"]},"_index-Ky9zR5dV.css":{"file":"assets/index-Ky9zR5dV.css","src":"_index-Ky9zR5dV.css"},"_index.module-0iUivGU7.js":{"file":"assets/index.module-0iUivGU7.js","name":"index.module","css":["assets/index-BUMPztWr.css","assets/riv-VPAlW_cg.css"]},"_index.module-B9JvMj-k.js":{"file":"assets/index.module-B9JvMj-k.js","name":"index.module","css":["assets/index-C1h2BJ6l.css"]},"_otpInput-Dlb7jUEo.js":{"file":"assets/otpInput-Dlb7jUEo.js","name":"otpInput","imports":["_index-CI1g57kZ.js","_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_Inputs-CEYxPBfP.js","_ButtonSparkle-DNpTyev3.js"],"css":["assets/otpInput-tBTztLmB.css"]},"_otpInput-tBTztLmB.css":{"file":"assets/otpInput-tBTztLmB.css","src":"_otpInput-tBTztLmB.css"},"_prova-UkNyxD49.js":{"file":"assets/prova-UkNyxD49.js","name":"prova","imports":["_components-CJF4pMQg.js"]},"_riv-VPAlW_cg.css":{"file":"assets/riv-VPAlW_cg.css","src":"_riv-VPAlW_cg.css"},"_routing-BSDkuvr3.js":{"file":"assets/routing-BSDkuvr3.js","name":"routing"},"_server-fns-ptihYXL4.js":{"file":"assets/server-fns-ptihYXL4.js","name":"server-fns","imports":["_fetchEvent-1KlzQMFw.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/[...404].tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Cursor.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/UI/Waves.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=","src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=","src/routes/API/Auth/login/loginUser.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","src/Server/auth.server.ts?tsr-directive-use-server=","src/Server/auth.server.ts?tsr-directive-use-server=","src/Server/auth.server.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=","src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=","src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=","src/app.tsx"]},"_server-fns-runtime-4T1EILgx.js":{"file":"assets/server-fns-runtime-4T1EILgx.js","name":"server-fns-runtime","imports":["_fetchEvent-1KlzQMFw.js"]},"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx":{"file":"assets/index-WwoiZKEg.js","name":"index","src":"node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx","isDynamicEntry":true},"src/Server/auth.server.ts?tsr-directive-use-server=":{"file":"assets/auth.server-DMy-hh56.js","name":"auth.server","src":"src/Server/auth.server.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js"]},"src/app.tsx":{"file":"assets/app-DLO7lzbB.js","name":"app","src":"src/app.tsx","isDynamicEntry":true,"imports":["_server-fns-ptihYXL4.js","_Menu-OQmUNT5t.js","_routing-BSDkuvr3.js","_action-BVKOmiKt.js","_fetchEvent-1KlzQMFw.js","_components-CJF4pMQg.js"],"css":["assets/app-CZcrTF1W.css","assets/Cursor-DUhhJVLJ.css"]},"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css":{"file":"index4.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Inputs-CEYxPBfP.js","_Menu-OQmUNT5t.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_routing-BSDkuvr3.js","_components-CJF4pMQg.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css":{"file":"index7.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Inputs-CEYxPBfP.js","_Title-C8lsFfVd.js","_index-CI1g57kZ.js","_index.module-B9JvMj-k.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_routing-BSDkuvr3.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css":{"file":"index8.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Inputs-CEYxPBfP.js","_otpInput-Dlb7jUEo.js","_index-CI1g57kZ.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_routing-BSDkuvr3.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css":{"file":"index9.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-Dlb7jUEo.js","_ButtonSparkle-DNpTyev3.js","_Inputs-CEYxPBfP.js","_index-CI1g57kZ.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_routing-BSDkuvr3.js","_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css":{"file":"sendOtp.js","name":"sendOtp","src":"src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-Dlb7jUEo.js","_Inputs-CEYxPBfP.js","_index-CI1g57kZ.js","_icons-N8M97GAt.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_routing-BSDkuvr3.js","_ButtonSparkle-DNpTyev3.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css":{"file":"index14.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_icons-N8M97GAt.js"]},"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css":{"file":"otpInput.js","name":"otpInput","src":"src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_otpInput-Dlb7jUEo.js","_index-CI1g57kZ.js","_Inputs-CEYxPBfP.js","_action-BVKOmiKt.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_ButtonSparkle-DNpTyev3.js","_icons-N8M97GAt.js","_routing-BSDkuvr3.js"]},"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css":{"file":"index5.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-OQmUNT5t.js","_index-CI1g57kZ.js","_ButtonSparkle-DNpTyev3.js","_Inputs-CEYxPBfP.js","_Title-C8lsFfVd.js","_index.module-B9JvMj-k.js","_otpInput-Dlb7jUEo.js","_components-CJF4pMQg.js","_routing-BSDkuvr3.js","_icons-N8M97GAt.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js"]},"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css":{"file":"Toggle.js","name":"Toggle","src":"src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index.module-0iUivGU7.js"],"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css":{"file":"index2.js","name":"index","src":"src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Menu-OQmUNT5t.js","_index.module-0iUivGU7.js","_ButtonSparkle-DNpTyev3.js","_routing-BSDkuvr3.js","_components-CJF4pMQg.js"],"css":["assets/index-Bn1gRDsI.css","assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css":{"file":"riv.js","name":"riv","src":"src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/riv-VPAlW_cg.css"]},"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css":{"file":"index15.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css":{"file":"index6.js","name":"index","src":"src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-2Np-G_nR.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css":{"file":"_...slug_.js","name":"_...slug_","src":"src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_index-B54VJo2T.js","_exchangeRates-ChMJm5Xh.js","_prova-UkNyxD49.js","_index-CM2EfUOf.js","_index-2Np-G_nR.js","_deleteWallet-D6_HIjzQ.js","_index-Bep36fvr.js","_routing-BSDkuvr3.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_components-CJF4pMQg.js","_Inputs-CEYxPBfP.js","_action-BVKOmiKt.js","_ButtonSparkle-DNpTyev3.js","_Card.module-nMwE8ysR.js"],"css":["assets/index-Ky9zR5dV.css"]},"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css":{"file":"index10.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_prova-UkNyxD49.js","_index-CM2EfUOf.js","_components-CJF4pMQg.js","_exchangeRates-ChMJm5Xh.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_Card.module-nMwE8ysR.js","_db.server-BYnrqg0d.js","_routing-BSDkuvr3.js"]},"src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css":{"file":"LazyLoadSpline.js","name":"LazyLoadSpline","src":"src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css":{"file":"index11.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css":{"file":"index13.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Inputs-CEYxPBfP.js","_deleteWallet-D6_HIjzQ.js","_index-CM2EfUOf.js","_ButtonSparkle-DNpTyev3.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_action-BVKOmiKt.js","_routing-BSDkuvr3.js","_exchangeRates-ChMJm5Xh.js","_Card.module-nMwE8ysR.js","_components-CJF4pMQg.js"],"dynamicImports":["node_modules/.pnpm/@thednp+solid-color-picker@0.0.13_solid-js@1.9.5/node_modules/@thednp/solid-color-picker/dist/index.jsx"]},"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css":{"file":"Card.js","name":"Card","src":"src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Card.module-nMwE8ysR.js","_components-CJF4pMQg.js","_routing-BSDkuvr3.js"]},"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css":{"file":"index12.js","name":"index","src":"src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_exchangeRates-ChMJm5Xh.js","_components-CJF4pMQg.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_Card.module-nMwE8ysR.js","_db.server-BYnrqg0d.js","_routing-BSDkuvr3.js"]},"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css":{"file":"index3.js","name":"index","src":"src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_Title-C8lsFfVd.js","_index-B54VJo2T.js","_exchangeRates-ChMJm5Xh.js","_index-CM2EfUOf.js","_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js","_prova-UkNyxD49.js","_components-CJF4pMQg.js","_routing-BSDkuvr3.js","_Inputs-CEYxPBfP.js","_action-BVKOmiKt.js","_deleteWallet-D6_HIjzQ.js","_ButtonSparkle-DNpTyev3.js","_Card.module-nMwE8ysR.js"]},"src/routes/API/Auth/login/loginUser.ts?tsr-directive-use-server=":{"file":"assets/loginUser-lOKuXLaT.js","name":"loginUser","src":"src/routes/API/Auth/login/loginUser.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_fetchEvent-1KlzQMFw.js","_db.server-BYnrqg0d.js"]},"src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=":{"file":"assets/createUser-B8OMM0Mu.js","name":"createUser","src":"src/routes/API/Auth/registration/createUser.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=":{"file":"assets/usernameAlreadyexist-DlESc_vE.js","name":"usernameAlreadyexist","src":"src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=":{"file":"assets/emailAlreadyexist-BASsf-Xu.js","name":"emailAlreadyexist","src":"src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=":{"file":"assets/phoneAlreadyexist-bH2ki4sU.js","name":"phoneAlreadyexist","src":"src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css":{"file":"getTransactions.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=":{"file":"assets/getTransactions-B7wMQXy1.js","name":"getTransactions","src":"src/routes/API/Wallets/Wallet/getTransactions.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css":{"file":"deleteWallet.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=":{"file":"assets/deleteWallet-DfS0S0n9.js","name":"deleteWallet","src":"src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=":{"file":"assets/getWallet-VD3qZcEm.js","name":"getWallet","src":"src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=":{"file":"assets/getWallets.server-CbIIGRZN.js","name":"getWallets.server","src":"src/routes/API/Wallets/getWallets.server.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=":{"file":"assets/setWallet-BkA1dzP6.js","name":"setWallet","src":"src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=":{"file":"assets/exchangeRates-Dp8OcCeR.js","name":"exchangeRates","src":"src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=","isDynamicEntry":true,"imports":["_server-fns-runtime-4T1EILgx.js","_db.server-BYnrqg0d.js","_fetchEvent-1KlzQMFw.js"]},"src/routes/UI/Cursor.tsx?pick=default&pick=$css":{"file":"Cursor.js","name":"Cursor","src":"src/routes/UI/Cursor.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"css":["assets/Cursor-DUhhJVLJ.css"]},"src/routes/UI/Waves.tsx?pick=default&pick=$css":{"file":"Waves.js","name":"Waves","src":"src/routes/UI/Waves.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"src/routes/[...404].tsx?pick=default&pick=$css":{"file":"_...404_.js","name":"_...404_","src":"src/routes/[...404].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_ButtonSparkle-DNpTyev3.js","_Menu-OQmUNT5t.js","_components-CJF4pMQg.js","_routing-BSDkuvr3.js"],"css":["assets/_..-D39vbXZ9.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Bep36fvr.js"]},"virtual:$vinxi/handler/server-fns":{"file":"server-fns.js","name":"server-fns","src":"virtual:$vinxi/handler/server-fns","isEntry":true,"imports":["_server-fns-ptihYXL4.js","_fetchEvent-1KlzQMFw.js"]}}};

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

const assets$1 = {
  "/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"af28-Rg1sGZM1QsjpeqrHyR2MsTw6Ogo\"",
    "mtime": "2025-04-12T15:15:13.350Z",
    "size": 44840,
    "path": "../public/index.html"
  },
  "/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"a16-0jCEkPa/gekfCxLo+TD0tJzkv3Q\"",
    "mtime": "2025-04-12T15:15:13.450Z",
    "size": 2582,
    "path": "../public/index.html.br"
  },
  "/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c6c-SdufXjnXSsoGpVKfZo/sM+Kf07Y\"",
    "mtime": "2025-04-12T15:15:13.408Z",
    "size": 3180,
    "path": "../public/index.html.gz"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"42799-FEHDFk5YBHIlck5tEzZIyNjlQeE\"",
    "mtime": "2025-03-26T19:44:32.344Z",
    "size": 272281,
    "path": "../public/logo.png"
  },
  "/Icons/Dashboard.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b5-o984ujsA5YS9gLdCt2inpgdEbMw\"",
    "mtime": "2025-03-07T21:50:23.428Z",
    "size": 949,
    "path": "../public/Icons/Dashboard.svg"
  },
  "/Icons/delete.png": {
    "type": "image/png",
    "etag": "\"216-zLmMxdCNy0KmgI3lO9dcE4Gl8Pg\"",
    "mtime": "2025-04-07T12:47:01.897Z",
    "size": 534,
    "path": "../public/Icons/delete.png"
  },
  "/Icons/edit.png": {
    "type": "image/png",
    "etag": "\"226-2IfurRUurrp4wntfwbuj53vMqL4\"",
    "mtime": "2025-04-07T12:47:01.898Z",
    "size": 550,
    "path": "../public/Icons/edit.png"
  },
  "/LoginRegistration/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"aece-Mw6Ze3QU5jL7BsTu3O+dGYzNq2Y\"",
    "mtime": "2025-04-12T15:15:13.378Z",
    "size": 44750,
    "path": "../public/LoginRegistration/index.html"
  },
  "/LoginRegistration/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"a02-8L7BlomD1ljO6pp8JwKTkFdHaPA\"",
    "mtime": "2025-04-12T15:15:13.448Z",
    "size": 2562,
    "path": "../public/LoginRegistration/index.html.br"
  },
  "/LoginRegistration/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c19-MiZU8cfT43UmYkxiDBwgANC4D7c\"",
    "mtime": "2025-04-12T15:15:13.408Z",
    "size": 3097,
    "path": "../public/LoginRegistration/index.html.gz"
  },
  "/assets/action-DzH6FtPs.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"815-g+UuACj04SOSd95ADdq7P0BgUKk\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2069,
    "path": "../public/assets/action-DzH6FtPs.js.br"
  },
  "/assets/action-DzH6FtPs.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"8ea-v5SFO6GfC1O7Ize9FSEbNTpJVXk\"",
    "mtime": "2025-04-12T15:14:55.557Z",
    "size": 2282,
    "path": "../public/assets/action-DzH6FtPs.js.gz"
  },
  "/assets/ButtonSparkle-C8CRtCd0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10fa-0BUBUY2KaBooDDfxflmxDZXj8xE\"",
    "mtime": "2025-04-12T15:14:23.085Z",
    "size": 4346,
    "path": "../public/assets/ButtonSparkle-C8CRtCd0.css"
  },
  "/assets/ButtonSparkle-C8CRtCd0.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"4f0-eo0y9i2/+nc2UH0pq1pwHoLFTVk\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1264,
    "path": "../public/assets/ButtonSparkle-C8CRtCd0.css.br"
  },
  "/assets/ButtonSparkle-C8CRtCd0.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b1-4I9y4effx5fawJJfKqw0pN8QUcU\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1457,
    "path": "../public/assets/ButtonSparkle-C8CRtCd0.css.gz"
  },
  "/assets/ButtonSparkle-DNpTyev3.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"323-syEyUo/C+tELCd0CZThFlJRE3nE\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 803,
    "path": "../public/assets/ButtonSparkle-DNpTyev3.js.br"
  },
  "/assets/ButtonSparkle-DNpTyev3.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3a7-poOR9/emhHLdSESz/QvdIpLKgmE\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 935,
    "path": "../public/assets/ButtonSparkle-DNpTyev3.js.gz"
  },
  "/assets/Card-BcrU3z9h.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f0-L8S4eH4QuXus4A26i2WE0HVv6iU\"",
    "mtime": "2025-04-12T15:14:23.088Z",
    "size": 240,
    "path": "../public/assets/Card-BcrU3z9h.css"
  },
  "/assets/Cursor-DUhhJVLJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"71f-z5m+w2kQQQxzF/2oVUabE0Nw4qg\"",
    "mtime": "2025-04-12T15:14:23.084Z",
    "size": 1823,
    "path": "../public/assets/Cursor-DUhhJVLJ.css"
  },
  "/assets/Cursor-DUhhJVLJ.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1f5-z3MUflhbmOHXrDl7L9quvhScDb0\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 501,
    "path": "../public/assets/Cursor-DUhhJVLJ.css.br"
  },
  "/assets/Cursor-DUhhJVLJ.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"24c-qrXtHdYiWUmIWRwPTjKABl9R2og\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 588,
    "path": "../public/assets/Cursor-DUhhJVLJ.css.gz"
  },
  "/assets/deleteWallet-CDUDB5HW.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2c8-/xRyF2qN3Obj1LCY3KomSZiKUnc\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 712,
    "path": "../public/assets/deleteWallet-CDUDB5HW.js.br"
  },
  "/assets/deleteWallet-CDUDB5HW.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"329-Cifqrd7DYbGkAj8NHhi6evpUCB8\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 809,
    "path": "../public/assets/deleteWallet-CDUDB5HW.js.gz"
  },
  "/assets/deleteWallet-CHR-5aIQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24ec-pB0gU0RlZF/Qbzhi4KapFQp6D+U\"",
    "mtime": "2025-04-12T15:14:23.084Z",
    "size": 9452,
    "path": "../public/assets/deleteWallet-CHR-5aIQ.css"
  },
  "/assets/deleteWallet-CHR-5aIQ.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"7fa-qPKh2HQsMESo0L1iKYI/ICxRcd4\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2042,
    "path": "../public/assets/deleteWallet-CHR-5aIQ.css.br"
  },
  "/assets/deleteWallet-CHR-5aIQ.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"929-pXaMaE5UVYJzdF8yhV00copbbwQ\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2345,
    "path": "../public/assets/deleteWallet-CHR-5aIQ.css.gz"
  },
  "/assets/exchangeRates-B5IJmiQP.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"b61-2eTBgWKw3PukgeMUmR911yPMAzY\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2913,
    "path": "../public/assets/exchangeRates-B5IJmiQP.js.br"
  },
  "/assets/exchangeRates-B5IJmiQP.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c9d-sZweCPT7qvaITENwqs4FnLow4xI\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 3229,
    "path": "../public/assets/exchangeRates-B5IJmiQP.js.gz"
  },
  "/assets/exchangeRates-BMINihpv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"83-KzxKptaFVo7ktiNGDy58ufA10u8\"",
    "mtime": "2025-04-12T15:14:23.085Z",
    "size": 131,
    "path": "../public/assets/exchangeRates-BMINihpv.css"
  },
  "/assets/fetchEvent-Ce2Ui3zq.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5f5-bfgR5WfQmpniuPHuj8TE4gREH9Y\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1525,
    "path": "../public/assets/fetchEvent-Ce2Ui3zq.js.br"
  },
  "/assets/fetchEvent-Ce2Ui3zq.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6a4-HNYeOaBCIFaUqE8h4vPBjA6U1Jw\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1700,
    "path": "../public/assets/fetchEvent-Ce2Ui3zq.js.gz"
  },
  "/assets/icons-Bh8061KW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2121-o/aZ5SHM/A7BCoclYc5YhiEjCoo\"",
    "mtime": "2025-04-12T15:14:23.086Z",
    "size": 8481,
    "path": "../public/assets/icons-Bh8061KW.css"
  },
  "/assets/icons-Bh8061KW.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"71c-jm/DTUo4zCvWcPTYD0yiN5bCuAg\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1820,
    "path": "../public/assets/icons-Bh8061KW.css.br"
  },
  "/assets/icons-Bh8061KW.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"818-/0kwbJh3cYfA8GcWIbMNmcAZnVQ\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2072,
    "path": "../public/assets/icons-Bh8061KW.css.gz"
  },
  "/assets/icons-N8M97GAt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2dd-kKI/4nhY/aUHpxMLLD0d1CgtF8k\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 733,
    "path": "../public/assets/icons-N8M97GAt.js.br"
  },
  "/assets/icons-N8M97GAt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"33b-hpvS+fDTmsO2pWTtmKZ6HLI5F9s\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 827,
    "path": "../public/assets/icons-N8M97GAt.js.gz"
  },
  "/assets/index-Bep36fvr.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"54a-/ZVZ+KPdNwoYsQLTIaXA52Qqy20\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1354,
    "path": "../public/assets/index-Bep36fvr.js.br"
  },
  "/assets/index-Bep36fvr.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"629-qBVBMfL4KNb+gbOVSzCrjMPvJXw\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1577,
    "path": "../public/assets/index-Bep36fvr.js.gz"
  },
  "/assets/index-Bn1gRDsI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ce-Zk1OExjcn8O4Mn8k5LFv4/S789M\"",
    "mtime": "2025-04-12T15:14:23.084Z",
    "size": 462,
    "path": "../public/assets/index-Bn1gRDsI.css"
  },
  "/assets/index-BUMPztWr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e3-U6YW/anMhgfaWI37M2oAC3zT0U8\"",
    "mtime": "2025-04-12T15:14:23.084Z",
    "size": 483,
    "path": "../public/assets/index-BUMPztWr.css"
  },
  "/assets/index-C1h2BJ6l.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fc-IdF95Ew7kpLK8x8UIamF/bkH/F8\"",
    "mtime": "2025-04-12T15:14:23.084Z",
    "size": 252,
    "path": "../public/assets/index-C1h2BJ6l.css"
  },
  "/assets/index-CI1g57kZ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2b6-YieB8XhoH2I1wmytIqnFRNF0rLk\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 694,
    "path": "../public/assets/index-CI1g57kZ.js.br"
  },
  "/assets/index-CI1g57kZ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"32f-i9A6pyqfTOfcU90zagJxJsd2zio\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 815,
    "path": "../public/assets/index-CI1g57kZ.js.gz"
  },
  "/assets/index-DFJEjzPR.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"e89-69vO5ckkTxtwHaXt2qbYBy93V3w\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 3721,
    "path": "../public/assets/index-DFJEjzPR.js.br"
  },
  "/assets/index-DFJEjzPR.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1031-D4t6JGhw0y2ilC9ThwIdodQUNQg\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 4145,
    "path": "../public/assets/index-DFJEjzPR.js.gz"
  },
  "/assets/index-DYZ-zTTq.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"4e3-KgU3hnzYfeIw+0rwOuBKDudjKc4\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1251,
    "path": "../public/assets/index-DYZ-zTTq.js.br"
  },
  "/assets/index-DYZ-zTTq.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b9-SjMH5vKUr2b0V5G/ltprelSVRS0\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1465,
    "path": "../public/assets/index-DYZ-zTTq.js.gz"
  },
  "/assets/index-Ky9zR5dV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"275-YocJd4VF6I9gUSSBMIiuWFc6Yaw\"",
    "mtime": "2025-04-12T15:14:23.089Z",
    "size": 629,
    "path": "../public/assets/index-Ky9zR5dV.css"
  },
  "/assets/index-WwoiZKEg.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"4d06-hvthFnYPoMAmSBN/IgrOQYhpSAc\"",
    "mtime": "2025-04-12T15:14:55.576Z",
    "size": 19718,
    "path": "../public/assets/index-WwoiZKEg.js.br"
  },
  "/assets/index-WwoiZKEg.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b59-ZFTpbgtZAgW/hYmVqBec0BAiSm0\"",
    "mtime": "2025-04-12T15:14:55.576Z",
    "size": 23385,
    "path": "../public/assets/index-WwoiZKEg.js.gz"
  },
  "/assets/index-XVT8Ct04.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"35e-sKa9pZi84ZiJu2TjPY7LmMSzG/o\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 862,
    "path": "../public/assets/index-XVT8Ct04.js.br"
  },
  "/assets/index-XVT8Ct04.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3fe-XT2B9UKHWgpt2IectEaGMNrEdDk\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1022,
    "path": "../public/assets/index-XVT8Ct04.js.gz"
  },
  "/assets/Inputs-Bqq548qA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cac-5xUbqIysRq8KE3AOoV/cNoIabV0\"",
    "mtime": "2025-04-12T15:14:23.085Z",
    "size": 3244,
    "path": "../public/assets/Inputs-Bqq548qA.css"
  },
  "/assets/Inputs-Bqq548qA.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"3c1-Ray3nts1Bwyo6sYthtbayyZbpCg\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 961,
    "path": "../public/assets/Inputs-Bqq548qA.css.br"
  },
  "/assets/Inputs-Bqq548qA.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"459-DoNxJCc+CJjJIOlW5HKj9K9vBR0\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1113,
    "path": "../public/assets/Inputs-Bqq548qA.css.gz"
  },
  "/assets/Inputs-BxVpbjg0.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"a90-mTfLepSctctZu9qSfm8x7DEaOdY\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2704,
    "path": "../public/assets/Inputs-BxVpbjg0.js.br"
  },
  "/assets/Inputs-BxVpbjg0.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c2e-48HaAfK8Fz3DBqVG+hb8mkuu+UI\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 3118,
    "path": "../public/assets/Inputs-BxVpbjg0.js.gz"
  },
  "/assets/Menu-CNxWw250.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"3cc-uCNbRVKq5xqCdiG6H8d7U/c1OBQ\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 972,
    "path": "../public/assets/Menu-CNxWw250.js.br"
  },
  "/assets/Menu-CNxWw250.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"441-4HWzLuEcqzazg6xoG1E4yi5XEkY\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 1089,
    "path": "../public/assets/Menu-CNxWw250.js.gz"
  },
  "/assets/Menu-DSzeyodt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"406-yXxJ7F5KIwI5YF6g5rdOrJ9UDNw\"",
    "mtime": "2025-04-12T15:14:23.084Z",
    "size": 1030,
    "path": "../public/assets/Menu-DSzeyodt.css"
  },
  "/assets/Menu-DSzeyodt.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"169-hS7escrmswjNhFq5i/vIm4s7Y+c\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 361,
    "path": "../public/assets/Menu-DSzeyodt.css.br"
  },
  "/assets/Menu-DSzeyodt.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1c7-rIHpHvCKxxnv/ble8qHPJ+Qp4lc\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 455,
    "path": "../public/assets/Menu-DSzeyodt.css.gz"
  },
  "/assets/otpInput-Jfxp9i2z.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"8a1-rwWoeJ7q/eGpYSDcDDMUlVjuTcQ\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 2209,
    "path": "../public/assets/otpInput-Jfxp9i2z.js.br"
  },
  "/assets/otpInput-Jfxp9i2z.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9f8-O/4qTQmswxOdwYxoz2JwB3ycrS0\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 2552,
    "path": "../public/assets/otpInput-Jfxp9i2z.js.gz"
  },
  "/assets/otpInput-tBTztLmB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"30e-BRU62CsVY4iiAFz59isIZdKOAGI\"",
    "mtime": "2025-04-12T15:14:23.085Z",
    "size": 782,
    "path": "../public/assets/otpInput-tBTztLmB.css"
  },
  "/assets/prova-BQfA7nlw.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"24d-pjhsDyH2WJVNqSyEIwsmzb1xpu0\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 589,
    "path": "../public/assets/prova-BQfA7nlw.js.br"
  },
  "/assets/prova-BQfA7nlw.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2a2-WRun/3l2QaNOBTnSFxgWQhvDuxM\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 674,
    "path": "../public/assets/prova-BQfA7nlw.js.gz"
  },
  "/assets/riv-VPAlW_cg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55-HKRxB0OLEvqM0460qByGA52sIg0\"",
    "mtime": "2025-04-12T15:14:23.086Z",
    "size": 85,
    "path": "../public/assets/riv-VPAlW_cg.css"
  },
  "/assets/routing-DxIlI4R1.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d24-o7QMWB0ZmLaJE5bHDFk3Ccfh0gs\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 3364,
    "path": "../public/assets/routing-DxIlI4R1.js.br"
  },
  "/assets/routing-DxIlI4R1.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"e79-OdhHKQP3lSVSdxwMM3Hs4nOo+BU\"",
    "mtime": "2025-04-12T15:14:55.558Z",
    "size": 3705,
    "path": "../public/assets/routing-DxIlI4R1.js.gz"
  },
  "/assets/ssr-CZcrTF1W.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c81-zvqDEmGg5mdKWb68ekPIr/RsNkQ\"",
    "mtime": "2025-04-12T15:14:23.083Z",
    "size": 15489,
    "path": "../public/assets/ssr-CZcrTF1W.css"
  },
  "/assets/ssr-CZcrTF1W.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"d98-8M3lvkko9YSgTm2k9dkY5EYf0ZA\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 3480,
    "path": "../public/assets/ssr-CZcrTF1W.css.br"
  },
  "/assets/ssr-CZcrTF1W.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"fc2-K7yNTbs+ZfhWiWHZO/F4NZ8tZkQ\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 4034,
    "path": "../public/assets/ssr-CZcrTF1W.css.gz"
  },
  "/assets/Title-C8lsFfVd.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"643-3HyVvbzpRltAqieGqnicjGpgHuc\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 1603,
    "path": "../public/assets/Title-C8lsFfVd.js.br"
  },
  "/assets/Title-C8lsFfVd.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"744-iNA492Miha74EKdRHlKcK07xQCw\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 1860,
    "path": "../public/assets/Title-C8lsFfVd.js.gz"
  },
  "/assets/_..-D39vbXZ9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44ea-Hv6m+tmEfbb+wzixrawKm67P9YE\"",
    "mtime": "2025-04-12T15:14:23.085Z",
    "size": 17642,
    "path": "../public/assets/_..-D39vbXZ9.css"
  },
  "/assets/_..-D39vbXZ9.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"861-0donVGTyqHLQzOZdP6KKEZ6C4QU\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 2145,
    "path": "../public/assets/_..-D39vbXZ9.css.br"
  },
  "/assets/_..-D39vbXZ9.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"ace-e+MM8TTmRp6yvUSfIgjDFSAg/v8\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 2766,
    "path": "../public/assets/_..-D39vbXZ9.css.gz"
  },
  "/rivs/Bell.riv": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"c9d-UFgKDsRQezSk1ksOyLUpL1VcIyQ\"",
    "mtime": "2025-03-14T17:25:54.365Z",
    "size": 3229,
    "path": "../public/rivs/Bell.riv"
  },
  "/rivs/Bell.riv.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"421-6PXLC/hJmNwTHhHv4jahutvFd4E\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 1057,
    "path": "../public/rivs/Bell.riv.br"
  },
  "/rivs/Bell.riv.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4bf-aI/uTQdeag1ohL+EaJyuWm32sW4\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 1215,
    "path": "../public/rivs/Bell.riv.gz"
  },
  "/rivs/LoginRegistration.riv": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"388a81-hjzPy3r11UJ4XIVtVi6SAG2stb8\"",
    "mtime": "2025-03-16T11:04:46.313Z",
    "size": 3705473,
    "path": "../public/rivs/LoginRegistration.riv"
  },
  "/rivs/LoginRegistration.riv.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"2a02dd-7eg4Sp5APJl7nhgdYLkBP4/3P00\"",
    "mtime": "2025-04-12T15:15:04.640Z",
    "size": 2753245,
    "path": "../public/rivs/LoginRegistration.riv.br"
  },
  "/rivs/LoginRegistration.riv.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2cd749-jEyBkYllxtdZXFT60c9IN8VLHNI\"",
    "mtime": "2025-04-12T15:14:55.915Z",
    "size": 2938697,
    "path": "../public/rivs/LoginRegistration.riv.gz"
  },
  "/_build/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"184-k7h7JvwbvTsxCalXdIuA34cdVjk\"",
    "mtime": "2025-04-12T15:14:43.406Z",
    "size": 388,
    "path": "../public/_build/manifest.webmanifest"
  },
  "/_build/registerSW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"94-cci5Bilset1FDW+Y3OFpEe4JMyM\"",
    "mtime": "2025-04-12T15:14:43.406Z",
    "size": 148,
    "path": "../public/_build/registerSW.js"
  },
  "/_build/sw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e5-xguJSULGJK0iuh6buui8+lHLpTQ\"",
    "mtime": "2025-04-12T15:14:46.881Z",
    "size": 5605,
    "path": "../public/_build/sw.js"
  },
  "/_build/sw.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"649-MYI1uDD3p+UAq2EfuQxwL4wPBxk\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 1609,
    "path": "../public/_build/sw.js.br"
  },
  "/_build/sw.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"70c-sf1gvguwJyJCIw9ZmovoGZkIYkc\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 1804,
    "path": "../public/_build/sw.js.gz"
  },
  "/_build/workbox-4dbe5713.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5561-L2Mj6Eevtm5xcg9gk3jmmeFJizg\"",
    "mtime": "2025-04-12T15:14:46.886Z",
    "size": 21857,
    "path": "../public/_build/workbox-4dbe5713.js"
  },
  "/_build/workbox-4dbe5713.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1a42-Vs2ql9j8jFRekJ+ztLj8V8zRGYc\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 6722,
    "path": "../public/_build/workbox-4dbe5713.js.br"
  },
  "/_build/workbox-4dbe5713.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1cf9-uRckBon8zH45Pg6iZYE5jGbRbeU\"",
    "mtime": "2025-04-12T15:14:55.559Z",
    "size": 7417,
    "path": "../public/_build/workbox-4dbe5713.js.gz"
  },
  "/Fonts/PPPierSans/PPPierSans-Bold.otf": {
    "type": "font/otf",
    "etag": "\"6e80-VR2vVogOcoDkMkj/5nYjXJY9Mw8\"",
    "mtime": "2025-03-07T09:06:56.000Z",
    "size": 28288,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Bold.otf"
  },
  "/Fonts/PPPierSans/PPPierSans-Bold.otf.br": {
    "type": "font/otf",
    "encoding": "br",
    "etag": "\"45fb-d3Gf20qGPcds9t94bplr5an1eX4\"",
    "mtime": "2025-04-12T15:14:55.579Z",
    "size": 17915,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Bold.otf.br"
  },
  "/Fonts/PPPierSans/PPPierSans-Bold.otf.gz": {
    "type": "font/otf",
    "encoding": "gzip",
    "etag": "\"4f23-03l4Wvg7vHaQMAo694zFeaFme2c\"",
    "mtime": "2025-04-12T15:14:55.576Z",
    "size": 20259,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Bold.otf.gz"
  },
  "/Fonts/PPPierSans/PPPierSans-BoldItalic.otf": {
    "type": "font/otf",
    "etag": "\"6dd0-qGt8wq0u/B8jKOvd95U3mO9Vf8c\"",
    "mtime": "2025-03-07T09:06:55.000Z",
    "size": 28112,
    "path": "../public/Fonts/PPPierSans/PPPierSans-BoldItalic.otf"
  },
  "/Fonts/PPPierSans/PPPierSans-BoldItalic.otf.br": {
    "type": "font/otf",
    "encoding": "br",
    "etag": "\"466f-1pyG0wJkw3j8mCnEpFkcV6VLjL4\"",
    "mtime": "2025-04-12T15:14:55.577Z",
    "size": 18031,
    "path": "../public/Fonts/PPPierSans/PPPierSans-BoldItalic.otf.br"
  },
  "/Fonts/PPPierSans/PPPierSans-BoldItalic.otf.gz": {
    "type": "font/otf",
    "encoding": "gzip",
    "etag": "\"4f54-bvWyPFh2LPiq5tq84cYm6F9NKEw\"",
    "mtime": "2025-04-12T15:14:55.576Z",
    "size": 20308,
    "path": "../public/Fonts/PPPierSans/PPPierSans-BoldItalic.otf.gz"
  },
  "/Fonts/PPPierSans/PPPierSans-Italic.otf": {
    "type": "font/otf",
    "etag": "\"6b24-OpnzkjulTux8wrnlg2Lqoo8YLGs\"",
    "mtime": "2025-03-07T09:06:55.000Z",
    "size": 27428,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Italic.otf"
  },
  "/Fonts/PPPierSans/PPPierSans-Italic.otf.br": {
    "type": "font/otf",
    "encoding": "br",
    "etag": "\"4554-1PGpiCaXCStoB5g14wDy+hl/Oqk\"",
    "mtime": "2025-04-12T15:14:55.576Z",
    "size": 17748,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Italic.otf.br"
  },
  "/Fonts/PPPierSans/PPPierSans-Italic.otf.gz": {
    "type": "font/otf",
    "encoding": "gzip",
    "etag": "\"4df2-5YoLSipgbHI2dJ+1/wdrCtW2SRM\"",
    "mtime": "2025-04-12T15:14:55.577Z",
    "size": 19954,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Italic.otf.gz"
  },
  "/Fonts/PPPierSans/PPPierSans-Regular.otf": {
    "type": "font/otf",
    "etag": "\"6da4-NmfVvofF990KDm4zZYYBhLZ5roI\"",
    "mtime": "2025-03-07T09:06:55.000Z",
    "size": 28068,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Regular.otf"
  },
  "/Fonts/PPPierSans/PPPierSans-Regular.otf.br": {
    "type": "font/otf",
    "encoding": "br",
    "etag": "\"44f4-StqcWCwnVjgHUCs2fyQPDnkKSNk\"",
    "mtime": "2025-04-12T15:14:55.579Z",
    "size": 17652,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Regular.otf.br"
  },
  "/Fonts/PPPierSans/PPPierSans-Regular.otf.gz": {
    "type": "font/otf",
    "encoding": "gzip",
    "etag": "\"4dbb-XLF+QoFR9VJT6a1XteM0mpSITDY\"",
    "mtime": "2025-04-12T15:14:55.579Z",
    "size": 19899,
    "path": "../public/Fonts/PPPierSans/PPPierSans-Regular.otf.gz"
  },
  "/img/wallets/backCardHolder.png": {
    "type": "image/png",
    "etag": "\"1e4ad-Tm5by5HCvoRAC9GpAKSbDx9ZSd0\"",
    "mtime": "2025-04-04T20:34:42.787Z",
    "size": 124077,
    "path": "../public/img/wallets/backCardHolder.png"
  },
  "/img/wallets/frontCardHolder.png": {
    "type": "image/png",
    "etag": "\"150cc-I19lrrRd6rgQHVi9QVuLLZAQHPw\"",
    "mtime": "2025-04-04T20:33:35.644Z",
    "size": 86220,
    "path": "../public/img/wallets/frontCardHolder.png"
  },
  "/_build/.vite/manifest.json": {
    "type": "application/json",
    "etag": "\"6b7b-RTgXOsrMIZotHFWXurNbrE5aiSo\"",
    "mtime": "2025-04-12T15:14:43.406Z",
    "size": 27515,
    "path": "../public/_build/.vite/manifest.json"
  },
  "/_build/.vite/manifest.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"9ef-Ymss349QbTR8seOs1egXjuHFTa4\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 2543,
    "path": "../public/_build/.vite/manifest.json.br"
  },
  "/_build/.vite/manifest.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"b0d-o5UT+Rdph2qgdwYGnxGLfRDY+a4\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 2829,
    "path": "../public/_build/.vite/manifest.json.gz"
  },
  "/_server/assets/action-BVKOmiKt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"815-1cRUc+JhIYMSZMz2AKTHigv4esI\"",
    "mtime": "2025-04-12T15:14:55.560Z",
    "size": 2069,
    "path": "../public/_server/assets/action-BVKOmiKt.js.br"
  },
  "/_server/assets/action-BVKOmiKt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"8e9-whFrSBwmwyyzJUjn2KddIVWgeyI\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 2281,
    "path": "../public/_server/assets/action-BVKOmiKt.js.gz"
  },
  "/_server/assets/app-CZcrTF1W.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c81-zvqDEmGg5mdKWb68ekPIr/RsNkQ\"",
    "mtime": "2025-04-12T15:14:53.715Z",
    "size": 15489,
    "path": "../public/_server/assets/app-CZcrTF1W.css"
  },
  "/_server/assets/app-CZcrTF1W.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"d98-8M3lvkko9YSgTm2k9dkY5EYf0ZA\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 3480,
    "path": "../public/_server/assets/app-CZcrTF1W.css.br"
  },
  "/_server/assets/app-CZcrTF1W.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"fc2-K7yNTbs+ZfhWiWHZO/F4NZ8tZkQ\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 4034,
    "path": "../public/_server/assets/app-CZcrTF1W.css.gz"
  },
  "/_server/assets/app-DLO7lzbB.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"10dc-4a97q5Y7HCxHPT8xuzWOLtcyFgE\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 4316,
    "path": "../public/_server/assets/app-DLO7lzbB.js.br"
  },
  "/_server/assets/app-DLO7lzbB.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"12c4-xybQr8jTqtNS/OIXEX4YebMwrtw\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 4804,
    "path": "../public/_server/assets/app-DLO7lzbB.js.gz"
  },
  "/_server/assets/auth.server-DMy-hh56.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"205-uCv7fgver5UYOoHOWKYXqeSoo6A\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 517,
    "path": "../public/_server/assets/auth.server-DMy-hh56.js.br"
  },
  "/_server/assets/auth.server-DMy-hh56.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"246-iNUdzmdQslfdJH6Mbs59/evkfcA\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 582,
    "path": "../public/_server/assets/auth.server-DMy-hh56.js.gz"
  },
  "/_server/assets/ButtonSparkle-C8CRtCd0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10fa-0BUBUY2KaBooDDfxflmxDZXj8xE\"",
    "mtime": "2025-04-12T15:14:53.709Z",
    "size": 4346,
    "path": "../public/_server/assets/ButtonSparkle-C8CRtCd0.css"
  },
  "/_server/assets/ButtonSparkle-C8CRtCd0.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"4f0-eo0y9i2/+nc2UH0pq1pwHoLFTVk\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 1264,
    "path": "../public/_server/assets/ButtonSparkle-C8CRtCd0.css.br"
  },
  "/_server/assets/ButtonSparkle-C8CRtCd0.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b1-4I9y4effx5fawJJfKqw0pN8QUcU\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 1457,
    "path": "../public/_server/assets/ButtonSparkle-C8CRtCd0.css.gz"
  },
  "/_server/assets/ButtonSparkle-DNpTyev3.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"323-syEyUo/C+tELCd0CZThFlJRE3nE\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 803,
    "path": "../public/_server/assets/ButtonSparkle-DNpTyev3.js.br"
  },
  "/_server/assets/ButtonSparkle-DNpTyev3.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3a7-poOR9/emhHLdSESz/QvdIpLKgmE\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 935,
    "path": "../public/_server/assets/ButtonSparkle-DNpTyev3.js.gz"
  },
  "/_server/assets/Card-BcrU3z9h.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f0-L8S4eH4QuXus4A26i2WE0HVv6iU\"",
    "mtime": "2025-04-12T15:14:53.710Z",
    "size": 240,
    "path": "../public/_server/assets/Card-BcrU3z9h.css"
  },
  "/_server/assets/createUser-B8OMM0Mu.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"26d-PKJlv7gcjvOT7BUpKuI6Sw1YeJE\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 621,
    "path": "../public/_server/assets/createUser-B8OMM0Mu.js.br"
  },
  "/_server/assets/createUser-B8OMM0Mu.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2ea-mFHKHr1lCN0oyQEMay3yBJ8PdFI\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 746,
    "path": "../public/_server/assets/createUser-B8OMM0Mu.js.gz"
  },
  "/_server/assets/Cursor-DUhhJVLJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"71f-z5m+w2kQQQxzF/2oVUabE0Nw4qg\"",
    "mtime": "2025-04-12T15:14:53.715Z",
    "size": 1823,
    "path": "../public/_server/assets/Cursor-DUhhJVLJ.css"
  },
  "/_server/assets/Cursor-DUhhJVLJ.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1f5-z3MUflhbmOHXrDl7L9quvhScDb0\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 501,
    "path": "../public/_server/assets/Cursor-DUhhJVLJ.css.br"
  },
  "/_server/assets/Cursor-DUhhJVLJ.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"24c-qrXtHdYiWUmIWRwPTjKABl9R2og\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 588,
    "path": "../public/_server/assets/Cursor-DUhhJVLJ.css.gz"
  },
  "/_server/assets/deleteWallet-CHR-5aIQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24ec-pB0gU0RlZF/Qbzhi4KapFQp6D+U\"",
    "mtime": "2025-04-12T15:14:53.708Z",
    "size": 9452,
    "path": "../public/_server/assets/deleteWallet-CHR-5aIQ.css"
  },
  "/_server/assets/deleteWallet-CHR-5aIQ.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"7fa-qPKh2HQsMESo0L1iKYI/ICxRcd4\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 2042,
    "path": "../public/_server/assets/deleteWallet-CHR-5aIQ.css.br"
  },
  "/_server/assets/deleteWallet-CHR-5aIQ.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"929-pXaMaE5UVYJzdF8yhV00copbbwQ\"",
    "mtime": "2025-04-12T15:14:55.561Z",
    "size": 2345,
    "path": "../public/_server/assets/deleteWallet-CHR-5aIQ.css.gz"
  },
  "/_server/assets/deleteWallet-D6_HIjzQ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2ca-n/S0LaztIMwM5HIbqCDo29/enpo\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 714,
    "path": "../public/_server/assets/deleteWallet-D6_HIjzQ.js.br"
  },
  "/_server/assets/deleteWallet-D6_HIjzQ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"33e-rxMlRHw9gr56+YrgosdbwoVdKPs\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 830,
    "path": "../public/_server/assets/deleteWallet-D6_HIjzQ.js.gz"
  },
  "/_server/assets/exchangeRates-BMINihpv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"83-KzxKptaFVo7ktiNGDy58ufA10u8\"",
    "mtime": "2025-04-12T15:14:53.708Z",
    "size": 131,
    "path": "../public/_server/assets/exchangeRates-BMINihpv.css"
  },
  "/_server/assets/exchangeRates-ChMJm5Xh.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"b72-UirXuj2gWw35ZkpaMq5JH8cgp84\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 2930,
    "path": "../public/_server/assets/exchangeRates-ChMJm5Xh.js.br"
  },
  "/_server/assets/exchangeRates-ChMJm5Xh.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"cb4-Kd3R1Q5t5v5JR/o7REhm1G3q/7k\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 3252,
    "path": "../public/_server/assets/exchangeRates-ChMJm5Xh.js.gz"
  },
  "/_server/assets/exchangeRates-Dp8OcCeR.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"8e6-uob2Zm784goAYjcWEmUkzwZelAE\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 2278,
    "path": "../public/_server/assets/exchangeRates-Dp8OcCeR.js.br"
  },
  "/_server/assets/exchangeRates-Dp8OcCeR.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9ce-mSt2X3Lp52PiqJl7D4qP5kxqEPk\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 2510,
    "path": "../public/_server/assets/exchangeRates-Dp8OcCeR.js.gz"
  },
  "/_server/assets/fetchEvent-1KlzQMFw.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"60f-E2NMg3oiYZtcpx+OvfLfIPQy4so\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 1551,
    "path": "../public/_server/assets/fetchEvent-1KlzQMFw.js.br"
  },
  "/_server/assets/fetchEvent-1KlzQMFw.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6c0-ncPoKTszgomaEXQuZmljrwoPQVI\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 1728,
    "path": "../public/_server/assets/fetchEvent-1KlzQMFw.js.gz"
  },
  "/_server/assets/getWallets.server-CbIIGRZN.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"7cc-hqTNNx0GQkAjaoezs5hrK6YAuUo\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 1996,
    "path": "../public/_server/assets/getWallets.server-CbIIGRZN.js.br"
  },
  "/_server/assets/getWallets.server-CbIIGRZN.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"864-bXJvY6Tn05dCYCTAuDJrOK5uP1Q\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 2148,
    "path": "../public/_server/assets/getWallets.server-CbIIGRZN.js.gz"
  },
  "/_server/assets/icons-Bh8061KW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2121-o/aZ5SHM/A7BCoclYc5YhiEjCoo\"",
    "mtime": "2025-04-12T15:14:53.709Z",
    "size": 8481,
    "path": "../public/_server/assets/icons-Bh8061KW.css"
  },
  "/_server/assets/icons-Bh8061KW.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"71c-jm/DTUo4zCvWcPTYD0yiN5bCuAg\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1820,
    "path": "../public/_server/assets/icons-Bh8061KW.css.br"
  },
  "/_server/assets/icons-Bh8061KW.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"818-/0kwbJh3cYfA8GcWIbMNmcAZnVQ\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 2072,
    "path": "../public/_server/assets/icons-Bh8061KW.css.gz"
  },
  "/_server/assets/icons-N8M97GAt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2dd-kKI/4nhY/aUHpxMLLD0d1CgtF8k\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 733,
    "path": "../public/_server/assets/icons-N8M97GAt.js.br"
  },
  "/_server/assets/icons-N8M97GAt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"33b-hpvS+fDTmsO2pWTtmKZ6HLI5F9s\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 827,
    "path": "../public/_server/assets/icons-N8M97GAt.js.gz"
  },
  "/_server/assets/index-2Np-G_nR.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"36b-pA+wI8rRLgD42kmUtmGHYeK1mqk\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 875,
    "path": "../public/_server/assets/index-2Np-G_nR.js.br"
  },
  "/_server/assets/index-2Np-G_nR.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"411-GkdxZyVIov5jes1ba5wqR4ZoqlA\"",
    "mtime": "2025-04-12T15:14:55.562Z",
    "size": 1041,
    "path": "../public/_server/assets/index-2Np-G_nR.js.gz"
  },
  "/_server/assets/index-B54VJo2T.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"e9b-IYM6wdjZUkIC3OzEK8u8hFSzQgI\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 3739,
    "path": "../public/_server/assets/index-B54VJo2T.js.br"
  },
  "/_server/assets/index-B54VJo2T.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1045-QD6KK/hwOS7pKzB4GjWdZoeId7k\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 4165,
    "path": "../public/_server/assets/index-B54VJo2T.js.gz"
  },
  "/_server/assets/index-Bep36fvr.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"54a-/ZVZ+KPdNwoYsQLTIaXA52Qqy20\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1354,
    "path": "../public/_server/assets/index-Bep36fvr.js.br"
  },
  "/_server/assets/index-Bep36fvr.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"629-qBVBMfL4KNb+gbOVSzCrjMPvJXw\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1577,
    "path": "../public/_server/assets/index-Bep36fvr.js.gz"
  },
  "/_server/assets/index-Bn1gRDsI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ce-Zk1OExjcn8O4Mn8k5LFv4/S789M\"",
    "mtime": "2025-04-12T15:14:53.708Z",
    "size": 462,
    "path": "../public/_server/assets/index-Bn1gRDsI.css"
  },
  "/_server/assets/index-BUMPztWr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e3-U6YW/anMhgfaWI37M2oAC3zT0U8\"",
    "mtime": "2025-04-12T15:14:53.708Z",
    "size": 483,
    "path": "../public/_server/assets/index-BUMPztWr.css"
  },
  "/_server/assets/index-C1h2BJ6l.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fc-IdF95Ew7kpLK8x8UIamF/bkH/F8\"",
    "mtime": "2025-04-12T15:14:53.708Z",
    "size": 252,
    "path": "../public/_server/assets/index-C1h2BJ6l.css"
  },
  "/_server/assets/index-CI1g57kZ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2b6-YieB8XhoH2I1wmytIqnFRNF0rLk\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 694,
    "path": "../public/_server/assets/index-CI1g57kZ.js.br"
  },
  "/_server/assets/index-CI1g57kZ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"32f-i9A6pyqfTOfcU90zagJxJsd2zio\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 815,
    "path": "../public/_server/assets/index-CI1g57kZ.js.gz"
  },
  "/_server/assets/index-CM2EfUOf.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"4e2-BBrKdno1l3LoB5GLKPIjA0XZbK4\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1250,
    "path": "../public/_server/assets/index-CM2EfUOf.js.br"
  },
  "/_server/assets/index-CM2EfUOf.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5bd-CPBYLWegX+ZrmjA/Y/ZKZGGfOLk\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1469,
    "path": "../public/_server/assets/index-CM2EfUOf.js.gz"
  },
  "/_server/assets/index-Ky9zR5dV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"275-YocJd4VF6I9gUSSBMIiuWFc6Yaw\"",
    "mtime": "2025-04-12T15:14:53.709Z",
    "size": 629,
    "path": "../public/_server/assets/index-Ky9zR5dV.css"
  },
  "/_server/assets/index-WwoiZKEg.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"4d06-hvthFnYPoMAmSBN/IgrOQYhpSAc\"",
    "mtime": "2025-04-12T15:14:55.580Z",
    "size": 19718,
    "path": "../public/_server/assets/index-WwoiZKEg.js.br"
  },
  "/_server/assets/index-WwoiZKEg.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b59-ZFTpbgtZAgW/hYmVqBec0BAiSm0\"",
    "mtime": "2025-04-12T15:14:55.579Z",
    "size": 23385,
    "path": "../public/_server/assets/index-WwoiZKEg.js.gz"
  },
  "/_server/assets/Inputs-Bqq548qA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cac-5xUbqIysRq8KE3AOoV/cNoIabV0\"",
    "mtime": "2025-04-12T15:14:53.709Z",
    "size": 3244,
    "path": "../public/_server/assets/Inputs-Bqq548qA.css"
  },
  "/_server/assets/Inputs-Bqq548qA.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"3c1-Ray3nts1Bwyo6sYthtbayyZbpCg\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 961,
    "path": "../public/_server/assets/Inputs-Bqq548qA.css.br"
  },
  "/_server/assets/Inputs-Bqq548qA.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"459-DoNxJCc+CJjJIOlW5HKj9K9vBR0\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1113,
    "path": "../public/_server/assets/Inputs-Bqq548qA.css.gz"
  },
  "/_server/assets/Inputs-CEYxPBfP.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"aa8-Yns4Ec8waiEFvyz/JT0qdjdsdxc\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 2728,
    "path": "../public/_server/assets/Inputs-CEYxPBfP.js.br"
  },
  "/_server/assets/Inputs-CEYxPBfP.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c43-3Q0LXNNlM/4Knuqfa/xoyKLFb+M\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 3139,
    "path": "../public/_server/assets/Inputs-CEYxPBfP.js.gz"
  },
  "/_server/assets/loginUser-lOKuXLaT.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"261-dSGPctCvtXloLTtmu6Dhsvb95q4\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 609,
    "path": "../public/_server/assets/loginUser-lOKuXLaT.js.br"
  },
  "/_server/assets/loginUser-lOKuXLaT.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2a0-FKFsQ0M4DUQFHvmiUr1seQWFx0k\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 672,
    "path": "../public/_server/assets/loginUser-lOKuXLaT.js.gz"
  },
  "/_server/assets/Menu-DSzeyodt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"406-yXxJ7F5KIwI5YF6g5rdOrJ9UDNw\"",
    "mtime": "2025-04-12T15:14:53.715Z",
    "size": 1030,
    "path": "../public/_server/assets/Menu-DSzeyodt.css"
  },
  "/_server/assets/Menu-DSzeyodt.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"169-hS7escrmswjNhFq5i/vIm4s7Y+c\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 361,
    "path": "../public/_server/assets/Menu-DSzeyodt.css.br"
  },
  "/_server/assets/Menu-DSzeyodt.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1c7-rIHpHvCKxxnv/ble8qHPJ+Qp4lc\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 455,
    "path": "../public/_server/assets/Menu-DSzeyodt.css.gz"
  },
  "/_server/assets/Menu-OQmUNT5t.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"3cd-n/zCZR4DVRlOUUIf0cUs3gex2qE\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 973,
    "path": "../public/_server/assets/Menu-OQmUNT5t.js.br"
  },
  "/_server/assets/Menu-OQmUNT5t.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"445-byfsDdmQWDFQ+Kp7vbVR7J1BMq0\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 1093,
    "path": "../public/_server/assets/Menu-OQmUNT5t.js.gz"
  },
  "/_server/assets/otpInput-Dlb7jUEo.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"8b3-LYiHtnxqgRX4pfIkOO55BR//8b0\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 2227,
    "path": "../public/_server/assets/otpInput-Dlb7jUEo.js.br"
  },
  "/_server/assets/otpInput-Dlb7jUEo.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"a09-XdogO92Jdq96vNbusK0RcL+rOkg\"",
    "mtime": "2025-04-12T15:14:55.563Z",
    "size": 2569,
    "path": "../public/_server/assets/otpInput-Dlb7jUEo.js.gz"
  },
  "/_server/assets/otpInput-tBTztLmB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"30e-BRU62CsVY4iiAFz59isIZdKOAGI\"",
    "mtime": "2025-04-12T15:14:53.709Z",
    "size": 782,
    "path": "../public/_server/assets/otpInput-tBTztLmB.css"
  },
  "/_server/assets/prova-UkNyxD49.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"24b-fTkJi1zQl8ohnGhVx1EObU2ARz8\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 587,
    "path": "../public/_server/assets/prova-UkNyxD49.js.br"
  },
  "/_server/assets/prova-UkNyxD49.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2a4-/zVBvSmKcr6ut49nixf87bb0/+E\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 676,
    "path": "../public/_server/assets/prova-UkNyxD49.js.gz"
  },
  "/_server/assets/riv-VPAlW_cg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55-HKRxB0OLEvqM0460qByGA52sIg0\"",
    "mtime": "2025-04-12T15:14:53.709Z",
    "size": 85,
    "path": "../public/_server/assets/riv-VPAlW_cg.css"
  },
  "/_server/assets/routing-BSDkuvr3.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d24-eYzteBjKpZi5ye2/QnbUzuJzbiE\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 3364,
    "path": "../public/_server/assets/routing-BSDkuvr3.js.br"
  },
  "/_server/assets/routing-BSDkuvr3.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"e78-dW6zbXnsure69Ppo2o02N/FAQuA\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 3704,
    "path": "../public/_server/assets/routing-BSDkuvr3.js.gz"
  },
  "/_server/assets/server-fns-ptihYXL4.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"3af9-8BvFvRR7VxHxDmXxWLKcCpKUKrA\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 15097,
    "path": "../public/_server/assets/server-fns-ptihYXL4.js.br"
  },
  "/_server/assets/server-fns-ptihYXL4.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"42b9-nog70+UsYXsWUWkg2Dtqahafd/4\"",
    "mtime": "2025-04-12T15:14:55.579Z",
    "size": 17081,
    "path": "../public/_server/assets/server-fns-ptihYXL4.js.gz"
  },
  "/_server/assets/Title-C8lsFfVd.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"643-3HyVvbzpRltAqieGqnicjGpgHuc\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1603,
    "path": "../public/_server/assets/Title-C8lsFfVd.js.br"
  },
  "/_server/assets/Title-C8lsFfVd.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"744-iNA492Miha74EKdRHlKcK07xQCw\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1860,
    "path": "../public/_server/assets/Title-C8lsFfVd.js.gz"
  },
  "/_server/assets/_..-D39vbXZ9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44ea-Hv6m+tmEfbb+wzixrawKm67P9YE\"",
    "mtime": "2025-04-12T15:14:53.706Z",
    "size": 17642,
    "path": "../public/_server/assets/_..-D39vbXZ9.css"
  },
  "/_server/assets/_..-D39vbXZ9.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"861-0donVGTyqHLQzOZdP6KKEZ6C4QU\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 2145,
    "path": "../public/_server/assets/_..-D39vbXZ9.css.br"
  },
  "/_server/assets/_..-D39vbXZ9.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"ace-e+MM8TTmRp6yvUSfIgjDFSAg/v8\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 2766,
    "path": "../public/_server/assets/_..-D39vbXZ9.css.gz"
  },
  "/_build/assets/action-CDr_hENZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f84-DsKT/8R+1K5scPamO0pK5GVhFeQ\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 3972,
    "path": "../public/_build/assets/action-CDr_hENZ.js"
  },
  "/_build/assets/action-CDr_hENZ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"700-y6ocX3WChG4Nl2Xqa9h3cjR4pro\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1792,
    "path": "../public/_build/assets/action-CDr_hENZ.js.br"
  },
  "/_build/assets/action-CDr_hENZ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"7a6-+u9FRiNkyAkLvUfDdmvUUlpjnDk\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1958,
    "path": "../public/_build/assets/action-CDr_hENZ.js.gz"
  },
  "/_build/assets/boolean-CynEgfvK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dcca-YWL+9YapyvAGjMFv9+SJhOryD9U\"",
    "mtime": "2025-04-12T15:14:43.405Z",
    "size": 56522,
    "path": "../public/_build/assets/boolean-CynEgfvK.js"
  },
  "/_build/assets/boolean-CynEgfvK.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"452e-jWI4DJlmlFrXFokUNu92BR83Ubc\"",
    "mtime": "2025-04-12T15:14:55.582Z",
    "size": 17710,
    "path": "../public/_build/assets/boolean-CynEgfvK.js.br"
  },
  "/_build/assets/boolean-CynEgfvK.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4cd0-bOX7m4BdRR1RKbncH7/w3ciwazE\"",
    "mtime": "2025-04-12T15:14:55.579Z",
    "size": 19664,
    "path": "../public/_build/assets/boolean-CynEgfvK.js.gz"
  },
  "/_build/assets/ButtonSparkle-C8CRtCd0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10fa-0BUBUY2KaBooDDfxflmxDZXj8xE\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 4346,
    "path": "../public/_build/assets/ButtonSparkle-C8CRtCd0.css"
  },
  "/_build/assets/ButtonSparkle-C8CRtCd0.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"4f0-eo0y9i2/+nc2UH0pq1pwHoLFTVk\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1264,
    "path": "../public/_build/assets/ButtonSparkle-C8CRtCd0.css.br"
  },
  "/_build/assets/ButtonSparkle-C8CRtCd0.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b1-4I9y4effx5fawJJfKqw0pN8QUcU\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1457,
    "path": "../public/_build/assets/ButtonSparkle-C8CRtCd0.css.gz"
  },
  "/_build/assets/ButtonSparkle-CX-W2frl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1917-C6LC0OG8GPhdH2Gx8HXaKr2BLvM\"",
    "mtime": "2025-04-12T15:14:43.398Z",
    "size": 6423,
    "path": "../public/_build/assets/ButtonSparkle-CX-W2frl.js"
  },
  "/_build/assets/ButtonSparkle-CX-W2frl.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"97c-SLiyNWJg6L9WUrRkzKzHCBjagmo\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 2428,
    "path": "../public/_build/assets/ButtonSparkle-CX-W2frl.js.br"
  },
  "/_build/assets/ButtonSparkle-CX-W2frl.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"a95-OafTbBwtJ8srjkZYf0J6eF+U6Eo\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 2709,
    "path": "../public/_build/assets/ButtonSparkle-CX-W2frl.js.gz"
  },
  "/_build/assets/Card-BcrU3z9h.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f0-L8S4eH4QuXus4A26i2WE0HVv6iU\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 240,
    "path": "../public/_build/assets/Card-BcrU3z9h.css"
  },
  "/_build/assets/Card-DUNVX3H7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ea-lfCnKdrIUe9/3dOciwUSdc6wZus\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 1002,
    "path": "../public/_build/assets/Card-DUNVX3H7.js"
  },
  "/_build/assets/Card.module-nMwE8ysR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d-z9PKzfV9vfxtIWK8DP9kGZqIg2U\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 109,
    "path": "../public/_build/assets/Card.module-nMwE8ysR.js"
  },
  "/_build/assets/client-CZcrTF1W.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c81-zvqDEmGg5mdKWb68ekPIr/RsNkQ\"",
    "mtime": "2025-04-12T15:14:43.371Z",
    "size": 15489,
    "path": "../public/_build/assets/client-CZcrTF1W.css"
  },
  "/_build/assets/client-CZcrTF1W.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"d98-8M3lvkko9YSgTm2k9dkY5EYf0ZA\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 3480,
    "path": "../public/_build/assets/client-CZcrTF1W.css.br"
  },
  "/_build/assets/client-CZcrTF1W.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"fc2-K7yNTbs+ZfhWiWHZO/F4NZ8tZkQ\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 4034,
    "path": "../public/_build/assets/client-CZcrTF1W.css.gz"
  },
  "/_build/assets/client-yC3zgFCw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83d2-mhxxjvKPCbeQaVJp5SMoBGEV12w\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 33746,
    "path": "../public/_build/assets/client-yC3zgFCw.js"
  },
  "/_build/assets/client-yC3zgFCw.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"206f-+fPCvThuGnEakEsPvDeOkiWgRM0\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 8303,
    "path": "../public/_build/assets/client-yC3zgFCw.js.br"
  },
  "/_build/assets/client-yC3zgFCw.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"24c2-DMXn725Yg81qNIUM/yvj2ACXdQw\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 9410,
    "path": "../public/_build/assets/client-yC3zgFCw.js.gz"
  },
  "/_build/assets/components-BQhjVazl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34d-IrSc9qSoDD9fHdFp7DPPFv6G4Ng\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 845,
    "path": "../public/_build/assets/components-BQhjVazl.js"
  },
  "/_build/assets/Cursor-DPOt0gbm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f86-4ER8AZETX/zQFigmb4UsGhgGi5Q\"",
    "mtime": "2025-04-12T15:14:43.378Z",
    "size": 3974,
    "path": "../public/_build/assets/Cursor-DPOt0gbm.js"
  },
  "/_build/assets/Cursor-DPOt0gbm.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"444-9C//j73YLGimS6jpCeQoGg6tJG8\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1092,
    "path": "../public/_build/assets/Cursor-DPOt0gbm.js.br"
  },
  "/_build/assets/Cursor-DPOt0gbm.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"504-qDE0RxA5e5zM/tbBNWC7MErymJ8\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 1284,
    "path": "../public/_build/assets/Cursor-DPOt0gbm.js.gz"
  },
  "/_build/assets/Cursor-DUhhJVLJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"71f-z5m+w2kQQQxzF/2oVUabE0Nw4qg\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 1823,
    "path": "../public/_build/assets/Cursor-DUhhJVLJ.css"
  },
  "/_build/assets/Cursor-DUhhJVLJ.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1f5-z3MUflhbmOHXrDl7L9quvhScDb0\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 501,
    "path": "../public/_build/assets/Cursor-DUhhJVLJ.css.br"
  },
  "/_build/assets/Cursor-DUhhJVLJ.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"24c-qrXtHdYiWUmIWRwPTjKABl9R2og\"",
    "mtime": "2025-04-12T15:14:55.564Z",
    "size": 588,
    "path": "../public/_build/assets/Cursor-DUhhJVLJ.css.gz"
  },
  "/_build/assets/deleteWallet-CHR-5aIQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24ec-pB0gU0RlZF/Qbzhi4KapFQp6D+U\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 9452,
    "path": "../public/_build/assets/deleteWallet-CHR-5aIQ.css"
  },
  "/_build/assets/deleteWallet-CHR-5aIQ.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"7fa-qPKh2HQsMESo0L1iKYI/ICxRcd4\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 2042,
    "path": "../public/_build/assets/deleteWallet-CHR-5aIQ.css.br"
  },
  "/_build/assets/deleteWallet-CHR-5aIQ.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"929-pXaMaE5UVYJzdF8yhV00copbbwQ\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 2345,
    "path": "../public/_build/assets/deleteWallet-CHR-5aIQ.css.gz"
  },
  "/_build/assets/deleteWallet-DfLb0_b2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10d-qa6+SpsdGIF8rySciQslKmyTMxI\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 269,
    "path": "../public/_build/assets/deleteWallet-DfLb0_b2.js"
  },
  "/_build/assets/deleteWallet-Djn27Ww0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32d-xzxM2zaf4nWm7zgeSpKJpsxn4LE\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 813,
    "path": "../public/_build/assets/deleteWallet-Djn27Ww0.js"
  },
  "/_build/assets/exchangeRates-BMINihpv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"83-KzxKptaFVo7ktiNGDy58ufA10u8\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 131,
    "path": "../public/_build/assets/exchangeRates-BMINihpv.css"
  },
  "/_build/assets/exchangeRates-DIwxOQun.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8d4-6719jfLTD5Xa+Wc5bHM6XqtoBYo\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 2260,
    "path": "../public/_build/assets/exchangeRates-DIwxOQun.js"
  },
  "/_build/assets/exchangeRates-DIwxOQun.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2f8-h6sW/YdSeqoOzQHKqorJFft1kHI\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 760,
    "path": "../public/_build/assets/exchangeRates-DIwxOQun.js.br"
  },
  "/_build/assets/exchangeRates-DIwxOQun.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"36e-/6b971hpMF02aZHF+m/2ZRDjqxQ\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 878,
    "path": "../public/_build/assets/exchangeRates-DIwxOQun.js.gz"
  },
  "/_build/assets/gaussian-splat-compression-CYQZ50o2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1425c-qYuAkDSW2kHkwiTKmTDq05fvPw4\"",
    "mtime": "2025-04-12T15:14:43.405Z",
    "size": 82524,
    "path": "../public/_build/assets/gaussian-splat-compression-CYQZ50o2.js"
  },
  "/_build/assets/gaussian-splat-compression-CYQZ50o2.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"4d04-2vXaMRPC4rEEJN3wfH2yALIGaas\"",
    "mtime": "2025-04-12T15:14:55.583Z",
    "size": 19716,
    "path": "../public/_build/assets/gaussian-splat-compression-CYQZ50o2.js.br"
  },
  "/_build/assets/gaussian-splat-compression-CYQZ50o2.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5b08-Bxjd1SZIerFzL18W/0SuVdHJpW4\"",
    "mtime": "2025-04-12T15:14:55.582Z",
    "size": 23304,
    "path": "../public/_build/assets/gaussian-splat-compression-CYQZ50o2.js.gz"
  },
  "/_build/assets/getTransactions-0ox0yA0f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"124-CeVKFFTwO20TG7LR+m7kDdV97eU\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 292,
    "path": "../public/_build/assets/getTransactions-0ox0yA0f.js"
  },
  "/_build/assets/howler-DGkKYxeN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6aa0-9/7yABrGvqxncH6DbwiPSyYMyzo\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 27296,
    "path": "../public/_build/assets/howler-DGkKYxeN.js"
  },
  "/_build/assets/howler-DGkKYxeN.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1ca2-Qt/jwe25LzkgPGv13qShv6Mt/5k\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 7330,
    "path": "../public/_build/assets/howler-DGkKYxeN.js.br"
  },
  "/_build/assets/howler-DGkKYxeN.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2006-Q+KFV+oRxBM0JRAUUcp7Sb1pLRE\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 8198,
    "path": "../public/_build/assets/howler-DGkKYxeN.js.gz"
  },
  "/_build/assets/icons-Bh8061KW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2121-o/aZ5SHM/A7BCoclYc5YhiEjCoo\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 8481,
    "path": "../public/_build/assets/icons-Bh8061KW.css"
  },
  "/_build/assets/icons-Bh8061KW.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"71c-jm/DTUo4zCvWcPTYD0yiN5bCuAg\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1820,
    "path": "../public/_build/assets/icons-Bh8061KW.css.br"
  },
  "/_build/assets/icons-Bh8061KW.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"818-/0kwbJh3cYfA8GcWIbMNmcAZnVQ\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 2072,
    "path": "../public/_build/assets/icons-Bh8061KW.css.gz"
  },
  "/_build/assets/icons-ChlcGNuY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7fb-W9PhUvk1cfL91vHjWKOGasDzmXc\"",
    "mtime": "2025-04-12T15:14:43.403Z",
    "size": 2043,
    "path": "../public/_build/assets/icons-ChlcGNuY.js"
  },
  "/_build/assets/icons-ChlcGNuY.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2e0-xL+u+SQ1ZcCkqXGztSKGZbaQoDY\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 736,
    "path": "../public/_build/assets/icons-ChlcGNuY.js.br"
  },
  "/_build/assets/icons-ChlcGNuY.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"335-LK4I0tPtdjCxDWSA+kkHOvEgBpU\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 821,
    "path": "../public/_build/assets/icons-ChlcGNuY.js.gz"
  },
  "/_build/assets/index-88vfUY6A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5cf-JM/PTLPx4K1/QYkT9X+aVxYWf14\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 1487,
    "path": "../public/_build/assets/index-88vfUY6A.js"
  },
  "/_build/assets/index-88vfUY6A.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2dd-TjgDS39eMPpV5p3nFsvNbdr6b1k\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 733,
    "path": "../public/_build/assets/index-88vfUY6A.js.br"
  },
  "/_build/assets/index-88vfUY6A.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"346-uWZZOESila8EdWtW5vvenNlOews\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 838,
    "path": "../public/_build/assets/index-88vfUY6A.js.gz"
  },
  "/_build/assets/index-B4yOeCQX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1968-qUTyK1DwzN102TbAhD1LmqZuszA\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 6504,
    "path": "../public/_build/assets/index-B4yOeCQX.js"
  },
  "/_build/assets/index-B4yOeCQX.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"7a2-d8TmjijWW2JWTYIY3X6lJfvi3Mc\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1954,
    "path": "../public/_build/assets/index-B4yOeCQX.js.br"
  },
  "/_build/assets/index-B4yOeCQX.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"8bf-f2/6HxgEJlbUyluofMeAUp3mCHU\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 2239,
    "path": "../public/_build/assets/index-B4yOeCQX.js.gz"
  },
  "/_build/assets/index-B9evPoF0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bb-2v5wghM6MTiIF/Ov2TT4khxfgtk\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 443,
    "path": "../public/_build/assets/index-B9evPoF0.js"
  },
  "/_build/assets/index-Bb-RPvJO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67d-Q4LjTBM8ZTDqsqQEx18HWiZ44P8\"",
    "mtime": "2025-04-12T15:14:43.396Z",
    "size": 1661,
    "path": "../public/_build/assets/index-Bb-RPvJO.js"
  },
  "/_build/assets/index-Bb-RPvJO.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2cb-G9d6va4oHrz9QZrpAabimPswRyM\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 715,
    "path": "../public/_build/assets/index-Bb-RPvJO.js.br"
  },
  "/_build/assets/index-Bb-RPvJO.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"355-tKKPL6DrWlF0Wf5ZjO/OAVSEvSg\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 853,
    "path": "../public/_build/assets/index-Bb-RPvJO.js.gz"
  },
  "/_build/assets/index-BI0YgTAM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14692-Buz5AjOopO9oPROI85Y1lVtp3d0\"",
    "mtime": "2025-04-12T15:14:43.405Z",
    "size": 83602,
    "path": "../public/_build/assets/index-BI0YgTAM.js"
  },
  "/_build/assets/index-BI0YgTAM.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5266-SZ8zkzALMhzmc4/VLQKu2a0OaiM\"",
    "mtime": "2025-04-12T15:14:55.583Z",
    "size": 21094,
    "path": "../public/_build/assets/index-BI0YgTAM.js.br"
  },
  "/_build/assets/index-BI0YgTAM.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"62a6-eDz54TqD5WE512+dUOGaCErnWgE\"",
    "mtime": "2025-04-12T15:14:55.582Z",
    "size": 25254,
    "path": "../public/_build/assets/index-BI0YgTAM.js.gz"
  },
  "/_build/assets/index-Bn1gRDsI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ce-Zk1OExjcn8O4Mn8k5LFv4/S789M\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 462,
    "path": "../public/_build/assets/index-Bn1gRDsI.css"
  },
  "/_build/assets/index-BQI8r8OJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b45-AjB2YNNJ9rKhbz8cYor1cckxsEs\"",
    "mtime": "2025-04-12T15:14:43.385Z",
    "size": 2885,
    "path": "../public/_build/assets/index-BQI8r8OJ.js"
  },
  "/_build/assets/index-BQI8r8OJ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"496-O1PIJ66V+eC4UhHipH6rtxYHDFU\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1174,
    "path": "../public/_build/assets/index-BQI8r8OJ.js.br"
  },
  "/_build/assets/index-BQI8r8OJ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"519-jfDQx9WgguoUeN0XRy/KyxH8bRE\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1305,
    "path": "../public/_build/assets/index-BQI8r8OJ.js.gz"
  },
  "/_build/assets/index-BUMPztWr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e3-U6YW/anMhgfaWI37M2oAC3zT0U8\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 483,
    "path": "../public/_build/assets/index-BUMPztWr.css"
  },
  "/_build/assets/index-C1h2BJ6l.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fc-IdF95Ew7kpLK8x8UIamF/bkH/F8\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 252,
    "path": "../public/_build/assets/index-C1h2BJ6l.css"
  },
  "/_build/assets/index-C8JvlN6N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a69-bvVEQT8UmpCDz+2YY7ZZrOAD2Sg\"",
    "mtime": "2025-04-12T15:14:43.387Z",
    "size": 2665,
    "path": "../public/_build/assets/index-C8JvlN6N.js"
  },
  "/_build/assets/index-C8JvlN6N.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"482-QZnUxsBzdIyeMIhHi9u6ep7lpms\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1154,
    "path": "../public/_build/assets/index-C8JvlN6N.js.br"
  },
  "/_build/assets/index-C8JvlN6N.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"562-PrmgVIlEc7aGMzdV86cE8i9i/Uw\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1378,
    "path": "../public/_build/assets/index-C8JvlN6N.js.gz"
  },
  "/_build/assets/index-CeyMEmpq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"751-uYcRqPisN2CmdAIW0rvmgZASPsM\"",
    "mtime": "2025-04-12T15:14:43.403Z",
    "size": 1873,
    "path": "../public/_build/assets/index-CeyMEmpq.js"
  },
  "/_build/assets/index-CeyMEmpq.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"31e-uf1+/kgs7Ef3JQPCGdJfDEyvPZs\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 798,
    "path": "../public/_build/assets/index-CeyMEmpq.js.br"
  },
  "/_build/assets/index-CeyMEmpq.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3ad-TbC4bnYXYq2xJwSrnh9+Es6Z90s\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 941,
    "path": "../public/_build/assets/index-CeyMEmpq.js.gz"
  },
  "/_build/assets/index-CH-czpgK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"214b-bS6R/XepR1vkxO5lwOZmIvNUxkk\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 8523,
    "path": "../public/_build/assets/index-CH-czpgK.js"
  },
  "/_build/assets/index-CH-czpgK.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"9ac-TlxeEPPr7wwoQpwssx9FIRlKT4w\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 2476,
    "path": "../public/_build/assets/index-CH-czpgK.js.br"
  },
  "/_build/assets/index-CH-czpgK.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b22-JvmwxR/WFtmYE3BbQAKQIYQKeS8\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 2850,
    "path": "../public/_build/assets/index-CH-czpgK.js.gz"
  },
  "/_build/assets/index-CIjphGrZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"726-N1AyyXX2dMZefmtxJmnCDfdwVA0\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 1830,
    "path": "../public/_build/assets/index-CIjphGrZ.js"
  },
  "/_build/assets/index-CIjphGrZ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2d7-z2BrBrF3hywUWhIoFnIZcuzJrwg\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 727,
    "path": "../public/_build/assets/index-CIjphGrZ.js.br"
  },
  "/_build/assets/index-CIjphGrZ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"34f-Tf+JEuTcwu6OYMtPNYNBmLeSTzk\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 847,
    "path": "../public/_build/assets/index-CIjphGrZ.js.gz"
  },
  "/_build/assets/index-CORO8PuB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1284-8IqW4bpln33iTdBkBPHw+5cQpV4\"",
    "mtime": "2025-04-12T15:14:43.396Z",
    "size": 4740,
    "path": "../public/_build/assets/index-CORO8PuB.js"
  },
  "/_build/assets/index-CORO8PuB.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"668-MC2SvjckHVDr4GvsUn7TXZNjVnI\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1640,
    "path": "../public/_build/assets/index-CORO8PuB.js.br"
  },
  "/_build/assets/index-CORO8PuB.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"73b-qUdN5WAmdm1n/Rj2me4ZJmbohrQ\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1851,
    "path": "../public/_build/assets/index-CORO8PuB.js.gz"
  },
  "/_build/assets/index-COvTVlLR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dce-D8mdwlfknxyu/XDuNpAOREgqwEk\"",
    "mtime": "2025-04-12T15:14:43.403Z",
    "size": 3534,
    "path": "../public/_build/assets/index-COvTVlLR.js"
  },
  "/_build/assets/index-COvTVlLR.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"449-MN8finyoLzMc8itZJu46SJ5AGT0\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1097,
    "path": "../public/_build/assets/index-COvTVlLR.js.br"
  },
  "/_build/assets/index-COvTVlLR.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"517-j9uYsvbJophdk/wrHe0bpVlxX/g\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1303,
    "path": "../public/_build/assets/index-COvTVlLR.js.gz"
  },
  "/_build/assets/index-CWSqypye.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f63-P+QMJv+7gwsIImLM4FOSQabGWZM\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 3939,
    "path": "../public/_build/assets/index-CWSqypye.js"
  },
  "/_build/assets/index-CWSqypye.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5fb-tSNGqV/XW4+L/Ucd5QVza+VktvM\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1531,
    "path": "../public/_build/assets/index-CWSqypye.js.br"
  },
  "/_build/assets/index-CWSqypye.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6ea-U3qYHMrVGT/PVUkSmsdhb83ooRU\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1770,
    "path": "../public/_build/assets/index-CWSqypye.js.gz"
  },
  "/_build/assets/index-D5Hanbsc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f1-8KSBco3OcUG1J1dMPzmtPTa//pY\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 497,
    "path": "../public/_build/assets/index-D5Hanbsc.js"
  },
  "/_build/assets/index-D8rVyQy1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"88a4-YJT2hdJwp35xhHTKSrybJ0uReQA\"",
    "mtime": "2025-04-12T15:14:43.387Z",
    "size": 34980,
    "path": "../public/_build/assets/index-D8rVyQy1.js"
  },
  "/_build/assets/index-D8rVyQy1.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"319f-uvxbuo+bW1m8x9HtN8t2zfXFgnc\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 12703,
    "path": "../public/_build/assets/index-D8rVyQy1.js.br"
  },
  "/_build/assets/index-D8rVyQy1.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"36b8-VTA0uyINVLKYPghqXBYGJIDWoCY\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 14008,
    "path": "../public/_build/assets/index-D8rVyQy1.js.gz"
  },
  "/_build/assets/index-DB7IFhIG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1259-c7edGv5m4DRHyuwI0mFOl/bhPUw\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 4697,
    "path": "../public/_build/assets/index-DB7IFhIG.js"
  },
  "/_build/assets/index-DB7IFhIG.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"657-BvBTpnmcCu5m9a2uFPPbnc9tNgw\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1623,
    "path": "../public/_build/assets/index-DB7IFhIG.js.br"
  },
  "/_build/assets/index-DB7IFhIG.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"721-A+FRpnxReJ7EscAv8d8NFDL8VAs\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1825,
    "path": "../public/_build/assets/index-DB7IFhIG.js.gz"
  },
  "/_build/assets/index-DcaoqgVt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dbf-z6Bwq2c3L8+qL3M27MJ7P/p0zks\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 3519,
    "path": "../public/_build/assets/index-DcaoqgVt.js"
  },
  "/_build/assets/index-DcaoqgVt.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"445-cPBHuzAZsP7WpAhnZAzer5Hac/A\"",
    "mtime": "2025-04-12T15:14:55.565Z",
    "size": 1093,
    "path": "../public/_build/assets/index-DcaoqgVt.js.br"
  },
  "/_build/assets/index-DcaoqgVt.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"50d-QwycpuvP3IFsIw893Cm59mQIL6w\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1293,
    "path": "../public/_build/assets/index-DcaoqgVt.js.gz"
  },
  "/_build/assets/index-De9y16RJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1718-2/F241ZGRjKq93YBfGHX50McHjU\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 5912,
    "path": "../public/_build/assets/index-De9y16RJ.js"
  },
  "/_build/assets/index-De9y16RJ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"832-pOWKa1dXqHxT9h++nty5xK5/4rc\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 2098,
    "path": "../public/_build/assets/index-De9y16RJ.js.br"
  },
  "/_build/assets/index-De9y16RJ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"993-hGsiKn0z9s/dq6mrLi1hWCdS+hU\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 2451,
    "path": "../public/_build/assets/index-De9y16RJ.js.gz"
  },
  "/_build/assets/index-DlIApr22.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"807-SFXki7ald1v9BkS8w8lOAuh1Ds8\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 2055,
    "path": "../public/_build/assets/index-DlIApr22.js"
  },
  "/_build/assets/index-DlIApr22.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"384-cgIAdm2eFtW8JVwf46JhzvKgIG0\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 900,
    "path": "../public/_build/assets/index-DlIApr22.js.br"
  },
  "/_build/assets/index-DlIApr22.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"415-D21PcdeC8STPlifopL+R7n5DZYY\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1045,
    "path": "../public/_build/assets/index-DlIApr22.js.gz"
  },
  "/_build/assets/index-DMf-fkG-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eea-VwLwfZq6+vz9Eiw+gUIfCdt4GTs\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 3818,
    "path": "../public/_build/assets/index-DMf-fkG-.js"
  },
  "/_build/assets/index-DMf-fkG-.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5c1-CqOtpVpxASYlT1Hr+EeJ+xO+zis\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1473,
    "path": "../public/_build/assets/index-DMf-fkG-.js.br"
  },
  "/_build/assets/index-DMf-fkG-.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6a9-nTR6QtZW2gs8FNedc+J//+F4S/U\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1705,
    "path": "../public/_build/assets/index-DMf-fkG-.js.gz"
  },
  "/_build/assets/index-hJ-BwGgJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8fe-V3HZMxHlNwDR7F4tNJSinpQPRq0\"",
    "mtime": "2025-04-12T15:14:43.396Z",
    "size": 2302,
    "path": "../public/_build/assets/index-hJ-BwGgJ.js"
  },
  "/_build/assets/index-hJ-BwGgJ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"3fa-no5o9akWSOlT8Pp5AKKFTMJfsho\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1018,
    "path": "../public/_build/assets/index-hJ-BwGgJ.js.br"
  },
  "/_build/assets/index-hJ-BwGgJ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"49d-f4PIUSNm417DHjV8G3mTcMVEx5A\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1181,
    "path": "../public/_build/assets/index-hJ-BwGgJ.js.gz"
  },
  "/_build/assets/index-K3Oktdx6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b05-8XJtg3XlyDbP1WHQYLAcJ9ujyYM\"",
    "mtime": "2025-04-12T15:14:43.385Z",
    "size": 2821,
    "path": "../public/_build/assets/index-K3Oktdx6.js"
  },
  "/_build/assets/index-K3Oktdx6.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"474-NfThghETHgzbbJKfauQmYbGhvJU\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1140,
    "path": "../public/_build/assets/index-K3Oktdx6.js.br"
  },
  "/_build/assets/index-K3Oktdx6.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"520-lQPFxe453W6AsP/1N5YRAlH3YlY\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1312,
    "path": "../public/_build/assets/index-K3Oktdx6.js.gz"
  },
  "/_build/assets/index-Ky9zR5dV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"275-YocJd4VF6I9gUSSBMIiuWFc6Yaw\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 629,
    "path": "../public/_build/assets/index-Ky9zR5dV.css"
  },
  "/_build/assets/index.module-B9JvMj-k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"61-fttA+oQdwAnVEdIlpVmcCYuDqsI\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 97,
    "path": "../public/_build/assets/index.module-B9JvMj-k.js"
  },
  "/_build/assets/index.module-DJUCNMRy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"511-AcWz31JLiRdOtW0F4z1Oj/URL5w\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 1297,
    "path": "../public/_build/assets/index.module-DJUCNMRy.js"
  },
  "/_build/assets/index.module-DJUCNMRy.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2b4-NQqBQe6TZg3spfnC9/YPvEXWg5s\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 692,
    "path": "../public/_build/assets/index.module-DJUCNMRy.js.br"
  },
  "/_build/assets/index.module-DJUCNMRy.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2fa-k9Kq5u3Umiysk7hzk5sdQ0xHy68\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 762,
    "path": "../public/_build/assets/index.module-DJUCNMRy.js.gz"
  },
  "/_build/assets/Inputs-Bqq548qA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cac-5xUbqIysRq8KE3AOoV/cNoIabV0\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 3244,
    "path": "../public/_build/assets/Inputs-Bqq548qA.css"
  },
  "/_build/assets/Inputs-Bqq548qA.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"3c1-Ray3nts1Bwyo6sYthtbayyZbpCg\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 961,
    "path": "../public/_build/assets/Inputs-Bqq548qA.css.br"
  },
  "/_build/assets/Inputs-Bqq548qA.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"459-DoNxJCc+CJjJIOlW5HKj9K9vBR0\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1113,
    "path": "../public/_build/assets/Inputs-Bqq548qA.css.gz"
  },
  "/_build/assets/Inputs-hvbb28Ka.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14279-hMYwXauPQK9jjhIf3V7BZtI4f+U\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 82553,
    "path": "../public/_build/assets/Inputs-hvbb28Ka.js"
  },
  "/_build/assets/Inputs-hvbb28Ka.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"6dbc-59w6h7rS3ZeC98fEpo9AFA0L7qY\"",
    "mtime": "2025-04-12T15:14:55.585Z",
    "size": 28092,
    "path": "../public/_build/assets/Inputs-hvbb28Ka.js.br"
  },
  "/_build/assets/Inputs-hvbb28Ka.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"7a7b-aYC9zGlDmmTDrbsPCnnvjiNP6VA\"",
    "mtime": "2025-04-12T15:14:55.583Z",
    "size": 31355,
    "path": "../public/_build/assets/Inputs-hvbb28Ka.js.gz"
  },
  "/_build/assets/LazyLoadSpline-CHHaaTq7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c1-h7gBn1lAbvqMa5HMZBCw6XAmWJk\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 1473,
    "path": "../public/_build/assets/LazyLoadSpline-CHHaaTq7.js"
  },
  "/_build/assets/LazyLoadSpline-CHHaaTq7.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"26d-OaNWqTPq18xBO7cTLaVDLP+j/QU\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 621,
    "path": "../public/_build/assets/LazyLoadSpline-CHHaaTq7.js.br"
  },
  "/_build/assets/LazyLoadSpline-CHHaaTq7.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2c0-c/H1qD5AWonZQoqV9KzQLIKkGr0\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 704,
    "path": "../public/_build/assets/LazyLoadSpline-CHHaaTq7.js.gz"
  },
  "/_build/assets/Menu-DSzeyodt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"406-yXxJ7F5KIwI5YF6g5rdOrJ9UDNw\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 1030,
    "path": "../public/_build/assets/Menu-DSzeyodt.css"
  },
  "/_build/assets/Menu-DSzeyodt.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"169-hS7escrmswjNhFq5i/vIm4s7Y+c\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 361,
    "path": "../public/_build/assets/Menu-DSzeyodt.css.br"
  },
  "/_build/assets/Menu-DSzeyodt.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1c7-rIHpHvCKxxnv/ble8qHPJ+Qp4lc\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 455,
    "path": "../public/_build/assets/Menu-DSzeyodt.css.gz"
  },
  "/_build/assets/Menu-kyhemyOT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c42-muko49+Q0mRtg+y42NYey3kmB4Q\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 3138,
    "path": "../public/_build/assets/Menu-kyhemyOT.js"
  },
  "/_build/assets/Menu-kyhemyOT.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"42c-wp/JNEbBSdqTAXgBqMrn5UShg+g\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1068,
    "path": "../public/_build/assets/Menu-kyhemyOT.js.br"
  },
  "/_build/assets/Menu-kyhemyOT.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4ac-j7vdmFzEfVGqVbGy7iGcw0E/32w\"",
    "mtime": "2025-04-12T15:14:55.566Z",
    "size": 1196,
    "path": "../public/_build/assets/Menu-kyhemyOT.js.gz"
  },
  "/_build/assets/navmesh-BFd9Mv4x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d731-Kb2YazXaXx8UukT1V8fbYAAledo\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 55089,
    "path": "../public/_build/assets/navmesh-BFd9Mv4x.js"
  },
  "/_build/assets/navmesh-BFd9Mv4x.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"242b-AyUViR0pIsumkvh0QnJjBNdmQF8\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 9259,
    "path": "../public/_build/assets/navmesh-BFd9Mv4x.js.br"
  },
  "/_build/assets/navmesh-BFd9Mv4x.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2ada-9JAJZ0diOqKzBnJCR29GFmXMwH8\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 10970,
    "path": "../public/_build/assets/navmesh-BFd9Mv4x.js.gz"
  },
  "/_build/assets/opentype-LDE648lb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a5db-hbOgF/CNFYOeRph3sZUzV8rXP1I\"",
    "mtime": "2025-04-12T15:14:43.405Z",
    "size": 173531,
    "path": "../public/_build/assets/opentype-LDE648lb.js"
  },
  "/_build/assets/opentype-LDE648lb.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"a22e-Srei0AWa79aCVcT30QUPsRyZlt4\"",
    "mtime": "2025-04-12T15:14:55.588Z",
    "size": 41518,
    "path": "../public/_build/assets/opentype-LDE648lb.js.br"
  },
  "/_build/assets/opentype-LDE648lb.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c417-Nj2DKcaegMKgxd01UiGghIMVflc\"",
    "mtime": "2025-04-12T15:14:55.590Z",
    "size": 50199,
    "path": "../public/_build/assets/opentype-LDE648lb.js.gz"
  },
  "/_build/assets/otpInput-BLB8o3Md.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"865-svc1HFcwx+16unNPogICJIaz7nU\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 2149,
    "path": "../public/_build/assets/otpInput-BLB8o3Md.js"
  },
  "/_build/assets/otpInput-BLB8o3Md.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"430-zTJKUJX5uVvIjztou9GkVREW00s\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 1072,
    "path": "../public/_build/assets/otpInput-BLB8o3Md.js.br"
  },
  "/_build/assets/otpInput-BLB8o3Md.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4cb-emRZSJ1NcNTwa/z/ePdYljO4J6c\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 1227,
    "path": "../public/_build/assets/otpInput-BLB8o3Md.js.gz"
  },
  "/_build/assets/otpInput-DeXMA6XN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33b02-yQLLg4fWh3PlQAS8nr8cXyxP8cU\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 211714,
    "path": "../public/_build/assets/otpInput-DeXMA6XN.js"
  },
  "/_build/assets/otpInput-DeXMA6XN.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"90c9-80rmxyJpSFvGB4fu1AV2vJDwe4c\"",
    "mtime": "2025-04-12T15:14:55.588Z",
    "size": 37065,
    "path": "../public/_build/assets/otpInput-DeXMA6XN.js.br"
  },
  "/_build/assets/otpInput-DeXMA6XN.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"ab95-t4bJ+f/xxOWZs1RnGGo9zyBFx5o\"",
    "mtime": "2025-04-12T15:14:55.588Z",
    "size": 43925,
    "path": "../public/_build/assets/otpInput-DeXMA6XN.js.gz"
  },
  "/_build/assets/otpInput-tBTztLmB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"30e-BRU62CsVY4iiAFz59isIZdKOAGI\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 782,
    "path": "../public/_build/assets/otpInput-tBTztLmB.css"
  },
  "/_build/assets/physics-BM4kW-A5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e53b2-EbF8L0PN5bqhDak9pVn/9B0/qHE\"",
    "mtime": "2025-04-12T15:14:43.406Z",
    "size": 1987506,
    "path": "../public/_build/assets/physics-BM4kW-A5.js"
  },
  "/_build/assets/physics-BM4kW-A5.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"83d25-BA/85laVA4i/v6U2hxsxW9iGYS0\"",
    "mtime": "2025-04-12T15:14:59.620Z",
    "size": 539941,
    "path": "../public/_build/assets/physics-BM4kW-A5.js.br"
  },
  "/_build/assets/physics-BM4kW-A5.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b04c0-sa17y4mXzSBI6wrG3NSDQWI9csk\"",
    "mtime": "2025-04-12T15:14:55.801Z",
    "size": 722112,
    "path": "../public/_build/assets/physics-BM4kW-A5.js.gz"
  },
  "/_build/assets/preload-helper-CM3UJVvY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e0-Q0Bp0QjKFMyDOuO3rqIIPlfnrHI\"",
    "mtime": "2025-04-12T15:14:43.397Z",
    "size": 992,
    "path": "../public/_build/assets/preload-helper-CM3UJVvY.js"
  },
  "/_build/assets/process-DLQUZ-E7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"108af-DaNDFTw5boqdb0AHgBvFPocUvXM\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 67759,
    "path": "../public/_build/assets/process-DLQUZ-E7.js"
  },
  "/_build/assets/process-DLQUZ-E7.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"50da-0XPnxcR7tchth8aSq6nZpbw3tvE\"",
    "mtime": "2025-04-12T15:14:55.584Z",
    "size": 20698,
    "path": "../public/_build/assets/process-DLQUZ-E7.js.br"
  },
  "/_build/assets/process-DLQUZ-E7.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"59dd-7ix6D/7ifYupKRaNraySvKzoh+I\"",
    "mtime": "2025-04-12T15:14:55.585Z",
    "size": 23005,
    "path": "../public/_build/assets/process-DLQUZ-E7.js.gz"
  },
  "/_build/assets/prova-Dx2gmhDX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b1b-R+wWl06kSEz27yIGHkNHryvm13s\"",
    "mtime": "2025-04-12T15:14:43.396Z",
    "size": 2843,
    "path": "../public/_build/assets/prova-Dx2gmhDX.js"
  },
  "/_build/assets/prova-Dx2gmhDX.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"3ad-R9CsQeYCBShLGe4ct6LC9Gzutd0\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 941,
    "path": "../public/_build/assets/prova-Dx2gmhDX.js.br"
  },
  "/_build/assets/prova-Dx2gmhDX.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"425-G1xWcr9gRPUsy4gTN95fB7ZBEWc\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 1061,
    "path": "../public/_build/assets/prova-Dx2gmhDX.js.gz"
  },
  "/_build/assets/riv-CrzKM9lR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4bb-Ww4USC5R7dYNdCP7Bpw/RIOCPVo\"",
    "mtime": "2025-04-12T15:14:43.385Z",
    "size": 1211,
    "path": "../public/_build/assets/riv-CrzKM9lR.js"
  },
  "/_build/assets/riv-CrzKM9lR.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"28e-u6LRe8JoqizWlEn2kO9r5PNpww0\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 654,
    "path": "../public/_build/assets/riv-CrzKM9lR.js.br"
  },
  "/_build/assets/riv-CrzKM9lR.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2cd-rSgqcrxO7Z8qljOrVceVcKZ2Huo\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 717,
    "path": "../public/_build/assets/riv-CrzKM9lR.js.gz"
  },
  "/_build/assets/riv-VPAlW_cg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55-HKRxB0OLEvqM0460qByGA52sIg0\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 85,
    "path": "../public/_build/assets/riv-VPAlW_cg.css"
  },
  "/_build/assets/rive-D3j5nBow.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f2a4-QJybYrMahWNEnJa1MJJioyb0SW8\"",
    "mtime": "2025-04-12T15:14:43.406Z",
    "size": 127652,
    "path": "../public/_build/assets/rive-D3j5nBow.js"
  },
  "/_build/assets/rive-D3j5nBow.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"8938-PPxToKcfIPhGcG0x04ctnUx5X7E\"",
    "mtime": "2025-04-12T15:14:55.590Z",
    "size": 35128,
    "path": "../public/_build/assets/rive-D3j5nBow.js.br"
  },
  "/_build/assets/rive-D3j5nBow.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9ac2-16QPFDyhHfxpYHnD372uE0oQgNM\"",
    "mtime": "2025-04-12T15:14:55.588Z",
    "size": 39618,
    "path": "../public/_build/assets/rive-D3j5nBow.js.gz"
  },
  "/_build/assets/routing-BUmn5GEU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d65-yWCGRbivCVOzxGSX1cPGdL+0RuA\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 7525,
    "path": "../public/_build/assets/routing-BUmn5GEU.js"
  },
  "/_build/assets/routing-BUmn5GEU.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"c9a-UD84GrqjgfOCVVdMG1/yPhD2MwA\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 3226,
    "path": "../public/_build/assets/routing-BUmn5GEU.js.br"
  },
  "/_build/assets/routing-BUmn5GEU.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"dcf-0mEm/IKTG0fD9M5rL8CSk2SAhEY\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 3535,
    "path": "../public/_build/assets/routing-BUmn5GEU.js.gz"
  },
  "/_build/assets/runtime-BmWp8cEw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e497a-9NtpK7GD68Er/WZs4TWq2QmnaCQ\"",
    "mtime": "2025-04-12T15:14:43.399Z",
    "size": 1984890,
    "path": "../public/_build/assets/runtime-BmWp8cEw.js"
  },
  "/_build/assets/runtime-BmWp8cEw.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"71457-zZ/j/nneBZkNLpFNMsWI1PpmleY\"",
    "mtime": "2025-04-12T15:14:59.277Z",
    "size": 463959,
    "path": "../public/_build/assets/runtime-BmWp8cEw.js.br"
  },
  "/_build/assets/runtime-BmWp8cEw.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"89a06-ufBHSuNazNvxolqbyVcXymrIndQ\"",
    "mtime": "2025-04-12T15:14:55.786Z",
    "size": 563718,
    "path": "../public/_build/assets/runtime-BmWp8cEw.js.gz"
  },
  "/_build/assets/sendOtp-CjQewLXM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"444-AZgmL5CX7yNSbgbGN1cVQVGmQxU\"",
    "mtime": "2025-04-12T15:14:43.396Z",
    "size": 1092,
    "path": "../public/_build/assets/sendOtp-CjQewLXM.js"
  },
  "/_build/assets/sendOtp-CjQewLXM.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1fc-dnR5cfQXjZhmITIJYhnpUwaoYeo\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 508,
    "path": "../public/_build/assets/sendOtp-CjQewLXM.js.br"
  },
  "/_build/assets/sendOtp-CjQewLXM.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"245-xW8TOuxORkGcQ33w0VX0bdiPKiw\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 581,
    "path": "../public/_build/assets/sendOtp-CjQewLXM.js.gz"
  },
  "/_build/assets/server-runtime-6wq6LtAi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5686-OmBGSH0YViNnmTOiqEshDntStIU\"",
    "mtime": "2025-04-12T15:14:43.399Z",
    "size": 22150,
    "path": "../public/_build/assets/server-runtime-6wq6LtAi.js"
  },
  "/_build/assets/server-runtime-6wq6LtAi.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"16a6-D3wCVqpmz0hXW9SguYvIh+GwPGU\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 5798,
    "path": "../public/_build/assets/server-runtime-6wq6LtAi.js.br"
  },
  "/_build/assets/server-runtime-6wq6LtAi.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1962-gZo1GbULUQlFw+RXaYsM3pA6Bk4\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 6498,
    "path": "../public/_build/assets/server-runtime-6wq6LtAi.js.gz"
  },
  "/_build/assets/Title-BAWdhi0q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1409-yxC3aTrc4F8qk3v9wfUL0SAR+b0\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 5129,
    "path": "../public/_build/assets/Title-BAWdhi0q.js"
  },
  "/_build/assets/Title-BAWdhi0q.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"772-q1hLF6VyBfE1a0sMz8koODvV/iM\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 1906,
    "path": "../public/_build/assets/Title-BAWdhi0q.js.br"
  },
  "/_build/assets/Title-BAWdhi0q.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"86f-tdSX5lX0v01cebZl6qM4J+W/2Bg\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 2159,
    "path": "../public/_build/assets/Title-BAWdhi0q.js.gz"
  },
  "/_build/assets/Toggle-BgaoKUuk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e7-XMaEPn3Z3d2b1PuDRrTG1NL2iow\"",
    "mtime": "2025-04-12T15:14:43.386Z",
    "size": 743,
    "path": "../public/_build/assets/Toggle-BgaoKUuk.js"
  },
  "/_build/assets/ui-BRPadsgT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1673c-m2QBHuDwTbzqLwz+tkpqlayMwE4\"",
    "mtime": "2025-04-12T15:14:43.405Z",
    "size": 91964,
    "path": "../public/_build/assets/ui-BRPadsgT.js"
  },
  "/_build/assets/ui-BRPadsgT.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"63f8-wP7Vm3uWBeA5Jc1CTs6MY2uPn48\"",
    "mtime": "2025-04-12T15:14:55.585Z",
    "size": 25592,
    "path": "../public/_build/assets/ui-BRPadsgT.js.br"
  },
  "/_build/assets/ui-BRPadsgT.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"7093-UBXZYOqKk6O3qucityNlsJ50RuY\"",
    "mtime": "2025-04-12T15:14:55.587Z",
    "size": 28819,
    "path": "../public/_build/assets/ui-BRPadsgT.js.gz"
  },
  "/_build/assets/Waves-CQ3GUdkf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4aa-3G/7sL8p5o/AO3aZ5Me/2065sAk\"",
    "mtime": "2025-04-12T15:14:43.379Z",
    "size": 1194,
    "path": "../public/_build/assets/Waves-CQ3GUdkf.js"
  },
  "/_build/assets/Waves-CQ3GUdkf.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"205-NhwvtJF1GHfeCqyvx0gdS1AyPlU\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 517,
    "path": "../public/_build/assets/Waves-CQ3GUdkf.js.br"
  },
  "/_build/assets/Waves-CQ3GUdkf.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"25f-WNgDxpf6NwNfBdHY0jZADtB6tFo\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 607,
    "path": "../public/_build/assets/Waves-CQ3GUdkf.js.gz"
  },
  "/_build/assets/WavesWorker-CTH7zEzk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ad3-X5vf2QFhYNOY8WYy27Q9JMltYRM\"",
    "mtime": "2025-04-12T15:14:43.406Z",
    "size": 2771,
    "path": "../public/_build/assets/WavesWorker-CTH7zEzk.js"
  },
  "/_build/assets/WavesWorker-CTH7zEzk.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"517-Leci0CoEq2kHEO0U1YhcK2j5328\"",
    "mtime": "2025-04-12T15:14:55.568Z",
    "size": 1303,
    "path": "../public/_build/assets/WavesWorker-CTH7zEzk.js.br"
  },
  "/_build/assets/WavesWorker-CTH7zEzk.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5cd-x/DiIkTH6aR4jpWGg5AY+At/Y6k\"",
    "mtime": "2025-04-12T15:14:55.568Z",
    "size": 1485,
    "path": "../public/_build/assets/WavesWorker-CTH7zEzk.js.gz"
  },
  "/_build/assets/web-DcXN-p99.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65d6-r5d34neYbwOuT72NR+09Rc0E11g\"",
    "mtime": "2025-04-12T15:14:43.404Z",
    "size": 26070,
    "path": "../public/_build/assets/web-DcXN-p99.js"
  },
  "/_build/assets/web-DcXN-p99.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"23d4-15xquGgraYRqpzTI2rBMRQKjAuk\"",
    "mtime": "2025-04-12T15:14:55.567Z",
    "size": 9172,
    "path": "../public/_build/assets/web-DcXN-p99.js.br"
  },
  "/_build/assets/web-DcXN-p99.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"277a-LYxBPjOOpT9pVTKZznbj0g1rrEQ\"",
    "mtime": "2025-04-12T15:14:55.568Z",
    "size": 10106,
    "path": "../public/_build/assets/web-DcXN-p99.js.gz"
  },
  "/_build/assets/_..-D39vbXZ9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44ea-Hv6m+tmEfbb+wzixrawKm67P9YE\"",
    "mtime": "2025-04-12T15:14:43.376Z",
    "size": 17642,
    "path": "../public/_build/assets/_..-D39vbXZ9.css"
  },
  "/_build/assets/_..-D39vbXZ9.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"861-0donVGTyqHLQzOZdP6KKEZ6C4QU\"",
    "mtime": "2025-04-12T15:14:55.568Z",
    "size": 2145,
    "path": "../public/_build/assets/_..-D39vbXZ9.css.br"
  },
  "/_build/assets/_..-D39vbXZ9.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"ace-e+MM8TTmRp6yvUSfIgjDFSAg/v8\"",
    "mtime": "2025-04-12T15:14:55.568Z",
    "size": 2766,
    "path": "../public/_build/assets/_..-D39vbXZ9.css.gz"
  },
  "/_build/assets/_...404_-BOKr2Rfp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31a-o6wJxnsW94NV/HVRqcQ/ZowR5uc\"",
    "mtime": "2025-04-12T15:14:43.377Z",
    "size": 794,
    "path": "../public/_build/assets/_...404_-BOKr2Rfp.js"
  },
  "/_build/assets/_...slug_-D_Uu6UUA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17f4-D6WrU015q2aRLydqy8HLFgwVRBU\"",
    "mtime": "2025-04-12T15:14:43.385Z",
    "size": 6132,
    "path": "../public/_build/assets/_...slug_-D_Uu6UUA.js"
  },
  "/_build/assets/_...slug_-D_Uu6UUA.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"84f-BWf0/H9BoRl3bSu4pdlMC+Is05w\"",
    "mtime": "2025-04-12T15:14:55.573Z",
    "size": 2127,
    "path": "../public/_build/assets/_...slug_-D_Uu6UUA.js.br"
  },
  "/_build/assets/_...slug_-D_Uu6UUA.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"91f-/BbC4zflBgNsMX2JA9EZ41VMjeQ\"",
    "mtime": "2025-04-12T15:14:55.572Z",
    "size": 2335,
    "path": "../public/_build/assets/_...slug_-D_Uu6UUA.js.gz"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _zBFq2t = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, key + "" , value);
function K$3(t = {}) {
  let e, s = false;
  const r = (n) => {
    if (e && e !== n) throw new Error("Context conflict");
  };
  let a;
  if (t.asyncContext) {
    const n = t.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    n ? a = new n() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const d = () => {
    if (a) {
      const n = a.getStore();
      if (n !== void 0) return n;
    }
    return e;
  };
  return { use: () => {
    const n = d();
    if (n === void 0) throw new Error("Context is not available");
    return n;
  }, tryUse: () => d(), set: (n, i) => {
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
    h$2.add(p);
    try {
      const C = a ? a.run(n, i) : i();
      return s || (e = void 0), await C;
    } finally {
      h$2.delete(p);
    }
  } };
}
function B$3(t = {}) {
  const e = {};
  return { get(s, r = {}) {
    return e[s] || (e[s] = K$3({ ...t, ...r })), e[s];
  } };
}
const u$2 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, g$2 = "__unctx__", M$5 = u$2[g$2] || (u$2[g$2] = B$3()), z$2 = (t, e = {}) => M$5.get(t, e), y$3 = "__unctx_async_handlers__", h$2 = u$2[y$3] || (u$2[y$3] = /* @__PURE__ */ new Set());
function D$4(t) {
  let e;
  const s = x$3(t), r = { duplex: "half", method: t.method, headers: t.headers };
  return t.node.req.body instanceof ArrayBuffer ? new Request(s, { ...r, body: t.node.req.body }) : new Request(s, { ...r, get body() {
    return e || (e = Z$4(t), e);
  } });
}
function G$3(t) {
  var _a;
  return (_a = t.web) != null ? _a : t.web = { request: D$4(t), url: x$3(t) }, t.web.request;
}
function J$2() {
  return ne$3();
}
const m$1 = Symbol("$HTTPEvent");
function Q$4(t) {
  return typeof t == "object" && (t instanceof H3Event || (t == null ? void 0 : t[m$1]) instanceof H3Event || (t == null ? void 0 : t.__is_event__) === true);
}
function o$1(t) {
  return function(...e) {
    var _a;
    let s = e[0];
    if (Q$4(s)) e[0] = s instanceof H3Event || s.__is_event__ ? s : s[m$1];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (s = J$2(), !s) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      e.unshift(s);
    }
    return t(...e);
  };
}
const x$3 = o$1(getRequestURL), V$3 = o$1(getRequestIP), R$3 = o$1(setResponseStatus), S$3 = o$1(getResponseStatus), X$3 = o$1(getResponseStatusText), c$1 = o$1(getResponseHeaders), b$3 = o$1(getResponseHeader), Y$4 = o$1(setResponseHeader), H$2 = o$1(appendResponseHeader), ue$3 = o$1(parseCookies), le$2 = o$1(getCookie), fe$2 = o$1(setCookie), de$3 = o$1(useSession), pe$3 = o$1(setHeader), Z$4 = o$1(getRequestWebStream), ee$4 = o$1(removeResponseHeader), te$4 = o$1(G$3);
function se$3() {
  var _a;
  return z$2("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function ne$3() {
  return se$3().use().event;
}
const l = "solidFetchEvent";
function oe$1(t) {
  return { request: te$4(t), response: ae$1(t), clientAddress: V$3(t), locals: {}, nativeEvent: t };
}
function ge$3(t) {
  return { ...t };
}
function ye$3(t) {
  if (!t.context[l]) {
    const e = oe$1(t);
    t.context[l] = e;
  }
  return t.context[l];
}
function he$2(t, e) {
  for (const [s, r] of e.entries()) H$2(t, s, r);
}
let re$3 = class re {
  constructor(e) {
    __publicField$2(this, "event");
    this.event = e;
  }
  get(e) {
    const s = b$3(this.event, e);
    return Array.isArray(s) ? s.join(", ") : s || null;
  }
  has(e) {
    return this.get(e) !== void 0;
  }
  set(e, s) {
    return Y$4(this.event, e, s);
  }
  delete(e) {
    return ee$4(this.event, e);
  }
  append(e, s) {
    H$2(this.event, e, s);
  }
  getSetCookie() {
    const e = b$3(this.event, "Set-Cookie");
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
function ae$1(t) {
  return { get status() {
    return S$3(t);
  }, set status(e) {
    R$3(t, e);
  }, get statusText() {
    return X$3(t);
  }, set statusText(e) {
    R$3(t, S$3(t), e);
  }, headers: new re$3(t) };
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
var st = ((t) => (t[t.AggregateError = 1] = "AggregateError", t[t.ArrowFunction = 2] = "ArrowFunction", t[t.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", t[t.ObjectAssign = 8] = "ObjectAssign", t[t.BigIntTypedArray = 16] = "BigIntTypedArray", t[t.AbortSignal = 32] = "AbortSignal", t))(st || {});
function it$1(t) {
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
function g$1(t) {
  let e = "", r = 0, i;
  for (let a = 0, n = t.length; a < n; a++) i = it$1(t[a]), i && (e += t.slice(r, a) + i, r = a + 1);
  return r === 0 ? e = t : e += t.slice(r), e;
}
function at$1(t) {
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
function P$1(t) {
  return t.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, at$1);
}
var w$1 = "__SEROVAL_REFS__", D$3 = "$R", W$2 = `self.${D$3}`;
function nt(t) {
  return t == null ? `${W$2}=${W$2}||[]` : `(${W$2}=${W$2}||{})["${g$1(t)}"]=[]`;
}
function y$2(t, e) {
  if (!t) throw e;
}
var we$1 = /* @__PURE__ */ new Map(), S$2 = /* @__PURE__ */ new Map();
function Re$1(t) {
  return we$1.has(t);
}
function ot(t) {
  return S$2.has(t);
}
function lt$1(t) {
  return y$2(Re$1(t), new qt$1(t)), we$1.get(t);
}
function ct$1(t) {
  return y$2(ot(t), new Ht$1(t)), S$2.get(t);
}
typeof globalThis < "u" ? Object.defineProperty(globalThis, w$1, { value: S$2, configurable: true, writable: false, enumerable: false }) : typeof self < "u" ? Object.defineProperty(self, w$1, { value: S$2, configurable: true, writable: false, enumerable: false }) : typeof global < "u" && Object.defineProperty(global, w$1, { value: S$2, configurable: true, writable: false, enumerable: false });
function Ae$1(t, e) {
  for (let r = 0, i = e.length; r < i; r++) {
    let a = e[r];
    t.has(a) || (t.add(a), a.extends && Ae$1(t, a.extends));
  }
}
function Ie$1(t) {
  if (t) {
    let e = /* @__PURE__ */ new Set();
    return Ae$1(e, t), [...e];
  }
}
var ut$1 = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" }, ke = { [Symbol.asyncIterator]: 0, [Symbol.hasInstance]: 1, [Symbol.isConcatSpreadable]: 2, [Symbol.iterator]: 3, [Symbol.match]: 4, [Symbol.matchAll]: 5, [Symbol.replace]: 6, [Symbol.search]: 7, [Symbol.species]: 8, [Symbol.split]: 9, [Symbol.toPrimitive]: 10, [Symbol.toStringTag]: 11, [Symbol.unscopables]: 12 }, pt$1 = { 0: Symbol.asyncIterator, 1: Symbol.hasInstance, 2: Symbol.isConcatSpreadable, 3: Symbol.iterator, 4: Symbol.match, 5: Symbol.matchAll, 6: Symbol.replace, 7: Symbol.search, 8: Symbol.species, 9: Symbol.split, 10: Symbol.toPrimitive, 11: Symbol.toStringTag, 12: Symbol.unscopables }, ht$1 = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" }, dt$1 = { 2: true, 3: false, 1: void 0, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN }, _e = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" }, ft$1 = { 0: Error, 1: EvalError, 2: RangeError, 3: ReferenceError, 4: SyntaxError, 5: TypeError, 6: URIError }, s$1 = void 0;
function h$1(t, e, r, i, a, n, o, l, c, u, d, m) {
  return { t, i: e, s: r, l: i, c: a, m: n, p: o, e: l, a: c, f: u, b: d, o: m };
}
function z$1(t) {
  return h$1(2, s$1, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
var j$1 = z$1(2), B$2 = z$1(3), gt = z$1(1), mt$1 = z$1(0), yt$1 = z$1(4), bt$1 = z$1(5), zt$1 = z$1(6), Pt$1 = z$1(7);
function te$3(t) {
  return t instanceof EvalError ? 1 : t instanceof RangeError ? 2 : t instanceof ReferenceError ? 3 : t instanceof SyntaxError ? 4 : t instanceof TypeError ? 5 : t instanceof URIError ? 6 : 0;
}
function xt$1(t) {
  let e = _e[te$3(t)];
  return t.name !== e ? { name: t.name } : t.constructor.name !== e ? { name: t.constructor.name } : {};
}
function ce$1(t, e) {
  let r = xt$1(t), i = Object.getOwnPropertyNames(t);
  for (let a = 0, n = i.length, o; a < n; a++) o = i[a], o !== "name" && o !== "message" && (o === "stack" ? e & 4 && (r = r || {}, r[o] = t[o]) : (r = r || {}, r[o] = t[o]));
  return r;
}
function Ee$1(t) {
  return Object.isFrozen(t) ? 3 : Object.isSealed(t) ? 2 : Object.isExtensible(t) ? 0 : 1;
}
function St$1(t) {
  switch (t) {
    case Number.POSITIVE_INFINITY:
      return bt$1;
    case Number.NEGATIVE_INFINITY:
      return zt$1;
  }
  return t !== t ? Pt$1 : Object.is(t, -0) ? yt$1 : h$1(0, s$1, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function q$2(t) {
  return h$1(1, s$1, g$1(t), s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function vt$1(t) {
  return h$1(3, s$1, "" + t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function wt$1(t) {
  return h$1(4, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function Rt$1(t, e) {
  return h$1(5, t, e.toISOString(), s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function At$1(t, e) {
  return h$1(6, t, s$1, s$1, g$1(e.source), e.flags, s$1, s$1, s$1, s$1, s$1, s$1);
}
function It$1(t, e) {
  let r = new Uint8Array(e), i = r.length, a = new Array(i);
  for (let n = 0; n < i; n++) a[n] = r[n];
  return h$1(19, t, a, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function kt$1(t, e) {
  return h$1(17, t, ke[e], s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function _t$1(t, e) {
  return h$1(18, t, g$1(lt$1(e)), s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function Ce$1(t, e, r) {
  return h$1(25, t, r, s$1, g$1(e), s$1, s$1, s$1, s$1, s$1, s$1, s$1);
}
function Et$1(t, e, r) {
  return h$1(9, t, s$1, e.length, s$1, s$1, s$1, s$1, r, s$1, s$1, Ee$1(e));
}
function Ct$1(t, e) {
  return h$1(21, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, e, s$1, s$1);
}
function $t$1(t, e, r) {
  return h$1(15, t, s$1, e.length, e.constructor.name, s$1, s$1, s$1, s$1, r, e.byteOffset, s$1);
}
function Ft$1(t, e, r) {
  return h$1(16, t, s$1, e.length, e.constructor.name, s$1, s$1, s$1, s$1, r, e.byteOffset, s$1);
}
function Wt$1(t, e, r) {
  return h$1(20, t, s$1, e.byteLength, s$1, s$1, s$1, s$1, s$1, r, e.byteOffset, s$1);
}
function Dt$1(t, e, r) {
  return h$1(13, t, te$3(e), s$1, s$1, g$1(e.message), r, s$1, s$1, s$1, s$1, s$1);
}
function Ot$1(t, e, r) {
  return h$1(14, t, te$3(e), s$1, s$1, g$1(e.message), r, s$1, s$1, s$1, s$1, s$1);
}
function Nt$1(t, e, r) {
  return h$1(7, t, s$1, e, s$1, s$1, s$1, s$1, r, s$1, s$1, s$1);
}
function $e$1(t, e) {
  return h$1(28, s$1, s$1, s$1, s$1, s$1, s$1, s$1, [t, e], s$1, s$1, s$1);
}
function Fe$1(t, e) {
  return h$1(30, s$1, s$1, s$1, s$1, s$1, s$1, s$1, [t, e], s$1, s$1, s$1);
}
function We$1(t, e, r) {
  return h$1(31, t, s$1, s$1, s$1, s$1, s$1, s$1, r, e, s$1, s$1);
}
function Ut$1(t, e) {
  return h$1(32, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, e, s$1, s$1);
}
function Lt$1(t, e) {
  return h$1(33, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, e, s$1, s$1);
}
function Mt$1(t, e) {
  return h$1(34, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, e, s$1, s$1);
}
var { toString: re$2 } = Object.prototype;
function Tt$1(t, e) {
  return e instanceof Error ? `Seroval caught an error during the ${t} process.
  
${e.name}
${e.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new` : `Seroval caught an error during the ${t} process.

"${re$2.call(e)}"

For more information, please check the "cause" property of this error.`;
}
var se$2 = class se extends Error {
  constructor(e, r) {
    super(Tt$1(e, r)), this.cause = r;
  }
}, Vt$1 = class Vt extends se$2 {
  constructor(e) {
    super("parsing", e);
  }
}, jt$1 = class jt extends se$2 {
  constructor(t) {
    super("serialization", t);
  }
}, Bt$1 = class Bt extends se$2 {
  constructor(t) {
    super("deserialization", t);
  }
}, O = class extends Error {
  constructor(e) {
    super(`The value ${re$2.call(e)} of type "${typeof e}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`), this.value = e;
  }
}, De$1 = class De extends Error {
  constructor(e) {
    super('Unsupported node type "' + e.t + '".');
  }
}, Oe$1 = class Oe extends Error {
  constructor(t) {
    super('Missing plugin for tag "' + t + '".');
  }
}, x$2 = class x extends Error {
  constructor(t) {
    super('Missing "' + t + '" instance.');
  }
}, qt$1 = class qt extends Error {
  constructor(t) {
    super('Missing reference for the value "' + re$2.call(t) + '" of type "' + typeof t + '"'), this.value = t;
  }
}, Ht$1 = class Ht extends Error {
  constructor(e) {
    super('Missing reference for id "' + g$1(e) + '"');
  }
}, Kt$1 = class Kt extends Error {
  constructor(t) {
    super('Unknown TypedArray "' + t + '"');
  }
}, Xt$1 = class Xt {
  constructor(t, e) {
    this.value = t, this.replacement = e;
  }
}, Yt$1 = {}, Gt$1 = {}, Zt$1 = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
function H$1() {
  let t, e;
  return { promise: new Promise((r, i) => {
    t = r, e = i;
  }), resolve(r) {
    t(r);
  }, reject(r) {
    e(r);
  } };
}
function Jt$1(t) {
  return "__SEROVAL_STREAM__" in t;
}
function E() {
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
function Qt$1(t) {
  let e = E(), r = t[Symbol.asyncIterator]();
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
function er$1(t) {
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
          let u = H$1();
          return r.push(u), await u.promise;
        }
        return { done: false, value: e[c] };
      }
      return i > a ? { done: true, value: void 0 } : l();
    } };
  };
}
function Ne$1(t) {
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
function tr$1(t) {
  return () => {
    let e = 0;
    return { [Symbol.iterator]() {
      return this;
    }, next() {
      if (e > t.d) return { done: true, value: s$1 };
      let r = e++, i = t.v[r];
      if (r === t.t) throw i;
      return { done: r === t.d, value: i };
    } };
  };
}
var rr$1 = class rr {
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
    if (r != null) return this.markRef(r), { type: 1, value: wt$1(r) };
    let i = this.refs.size;
    return this.refs.set(e, i), { type: 0, value: i };
  }
  getReference(e) {
    let r = this.getIndexedValue(e);
    return r.type === 1 ? r : Re$1(e) ? { type: 2, value: _t$1(r.value, e) } : r;
  }
  parseWellKnownSymbol(e) {
    let r = this.getReference(e);
    return r.type !== 0 ? r.value : (y$2(e in ke, new O(e)), kt$1(r.value, e));
  }
  parseSpecialReference(e) {
    let r = this.getIndexedValue(Zt$1[e]);
    return r.type === 1 ? r.value : h$1(26, r.value, e, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1, s$1);
  }
  parseIteratorFactory() {
    let e = this.getIndexedValue(Yt$1);
    return e.type === 1 ? e.value : h$1(27, e.value, s$1, s$1, s$1, s$1, s$1, s$1, s$1, this.parseWellKnownSymbol(Symbol.iterator), s$1, s$1);
  }
  parseAsyncIteratorFactory() {
    let e = this.getIndexedValue(Gt$1);
    return e.type === 1 ? e.value : h$1(29, e.value, s$1, s$1, s$1, s$1, s$1, s$1, [this.parseSpecialReference(1), this.parseWellKnownSymbol(Symbol.asyncIterator)], s$1, s$1, s$1);
  }
  createObjectNode(e, r, i, a) {
    return h$1(i ? 11 : 10, e, s$1, s$1, s$1, s$1, a, s$1, s$1, s$1, s$1, Ee$1(r));
  }
  createMapNode(e, r, i, a) {
    return h$1(8, e, s$1, s$1, s$1, s$1, s$1, { k: r, v: i, s: a }, s$1, this.parseSpecialReference(0), s$1, s$1);
  }
  createPromiseConstructorNode(e) {
    return h$1(22, e, s$1, s$1, s$1, s$1, s$1, s$1, s$1, this.parseSpecialReference(1), s$1, s$1);
  }
  createAbortSignalConstructorNode(e) {
    return h$1(35, e, s$1, s$1, s$1, s$1, s$1, s$1, s$1, this.parseSpecialReference(5), s$1, s$1);
  }
};
function sr(t) {
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
      throw new Kt$1(t);
  }
}
function ue$2(t, e) {
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
var ir = class {
  constructor(e) {
    this.plugins = e.plugins, this.refs = e.refs || /* @__PURE__ */ new Map();
  }
  deserializeReference(e) {
    return this.assignIndexedValue(e.i, ct$1(P$1(e.s)));
  }
  deserializeArray(e) {
    let r = e.l, i = this.assignIndexedValue(e.i, new Array(r)), a;
    for (let n = 0; n < r; n++) a = e.a[n], a && (i[n] = this.deserialize(a));
    return ue$2(i, e.o), i;
  }
  deserializeProperties(e, r) {
    let i = e.s;
    if (i) {
      let a = e.k, n = e.v;
      for (let o = 0, l; o < i; o++) l = a[o], typeof l == "string" ? r[P$1(l)] = this.deserialize(n[o]) : r[this.deserialize(l)] = this.deserialize(n[o]);
    }
    return r;
  }
  deserializeObject(e) {
    let r = this.assignIndexedValue(e.i, e.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
    return this.deserializeProperties(e.p, r), ue$2(r, e.o), r;
  }
  deserializeDate(e) {
    return this.assignIndexedValue(e.i, new Date(e.s));
  }
  deserializeRegExp(e) {
    return this.assignIndexedValue(e.i, new RegExp(P$1(e.c), e.m));
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
    let r = sr(e.c), i = this.deserialize(e.f);
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
    let r = this.assignIndexedValue(e.i, new AggregateError([], P$1(e.m)));
    return this.deserializeDictionary(e, r);
  }
  deserializeError(e) {
    let r = ft$1[e.s], i = this.assignIndexedValue(e.i, new r(P$1(e.m)));
    return this.deserializeDictionary(e, i);
  }
  deserializePromise(e) {
    let r = H$1(), i = this.assignIndexedValue(e.i, r), a = this.deserialize(e.f);
    return e.s ? r.resolve(a) : r.reject(a), i.promise;
  }
  deserializeBoxed(e) {
    return this.assignIndexedValue(e.i, Object(this.deserialize(e.f)));
  }
  deserializePlugin(e) {
    let r = this.plugins;
    if (r) {
      let i = P$1(e.c);
      for (let a = 0, n = r.length; a < n; a++) {
        let o = r[a];
        if (o.tag === i) return this.assignIndexedValue(e.i, o.deserialize(e.s, this, { id: e.i }));
      }
    }
    throw new Oe$1(e.c);
  }
  deserializePromiseConstructor(e) {
    return this.assignIndexedValue(e.i, H$1()).promise;
  }
  deserializePromiseResolve(e) {
    let r = this.refs.get(e.i);
    y$2(r, new x$2("Promise")), r.resolve(this.deserialize(e.a[1]));
  }
  deserializePromiseReject(e) {
    let r = this.refs.get(e.i);
    y$2(r, new x$2("Promise")), r.reject(this.deserialize(e.a[1]));
  }
  deserializeIteratorFactoryInstance(e) {
    this.deserialize(e.a[0]);
    let r = this.deserialize(e.a[1]);
    return tr$1(r);
  }
  deserializeAsyncIteratorFactoryInstance(e) {
    this.deserialize(e.a[0]);
    let r = this.deserialize(e.a[1]);
    return er$1(r);
  }
  deserializeStreamConstructor(e) {
    let r = this.assignIndexedValue(e.i, E()), i = e.a.length;
    if (i) for (let a = 0; a < i; a++) this.deserialize(e.a[a]);
    return r;
  }
  deserializeStreamNext(e) {
    let r = this.refs.get(e.i);
    y$2(r, new x$2("Stream")), r.next(this.deserialize(e.f));
  }
  deserializeStreamThrow(e) {
    let r = this.refs.get(e.i);
    y$2(r, new x$2("Stream")), r.throw(this.deserialize(e.f));
  }
  deserializeStreamReturn(e) {
    let r = this.refs.get(e.i);
    y$2(r, new x$2("Stream")), r.return(this.deserialize(e.f));
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
    y$2(r, new x$2("AbortSignal")), r.abort(this.deserialize(e.a[1]));
  }
  deserializeAbortSignalSync(e) {
    return this.assignIndexedValue(e.i, AbortSignal.abort(this.deserialize(e.f)));
  }
  deserialize(e) {
    try {
      switch (e.t) {
        case 2:
          return dt$1[e.s];
        case 0:
          return e.s;
        case 1:
          return P$1(e.s);
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
          return pt$1[e.s];
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
          throw new De$1(e);
      }
    } catch (r) {
      throw new Bt$1(r);
    }
  }
}, ar = /^[$A-Z_][0-9A-Z_$]*$/i;
function pe$2(t) {
  let e = t[0];
  return (e === "$" || e === "_" || e >= "A" && e <= "Z" || e >= "a" && e <= "z") && ar.test(t);
}
function R$2(t) {
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
function nr(t) {
  let e = [], r = t[0];
  for (let i = 1, a = t.length, n, o = r; i < a; i++) n = t[i], n.t === 0 && n.v === o.v ? r = { t: 0, s: n.s, k: s$1, v: R$2(r) } : n.t === 2 && n.s === o.s ? r = { t: 2, s: R$2(r), k: n.k, v: n.v } : n.t === 1 && n.s === o.s ? r = { t: 1, s: R$2(r), k: s$1, v: n.v } : n.t === 3 && n.s === o.s ? r = { t: 3, s: R$2(r), k: n.k, v: s$1 } : (e.push(r), r = n), o = n;
  return e.push(r), e;
}
function he$1(t) {
  if (t.length) {
    let e = "", r = nr(t);
    for (let i = 0, a = r.length; i < a; i++) e += R$2(r[i]) + ",";
    return e;
  }
  return s$1;
}
var or = "Object.create(null)", lr = "new Set", cr = "new Map", ur = "Promise.resolve", pr = "Promise.reject", hr = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: s$1 }, dr = class {
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
      e += hr[n.type] + "(" + n.value + "),";
    }
    return e;
  }
  resolvePatches() {
    let e = he$1(this.assignments), r = this.resolveFlags();
    return e ? r ? e + r : e : r;
  }
  createAssignment(e, r) {
    this.assignments.push({ t: 0, s: e, k: s$1, v: r });
  }
  createAddAssignment(e, r) {
    this.assignments.push({ t: 1, s: this.getRefParam(e), k: s$1, v: r });
  }
  createSetAssignment(e, r, i) {
    this.assignments.push({ t: 2, s: this.getRefParam(e), k: r, v: i });
  }
  createDeleteAssignment(e, r) {
    this.assignments.push({ t: 3, s: this.getRefParam(e), k: r, v: s$1 });
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
    return this.assignIndexedValue(e.i, w$1 + '.get("' + e.s + '")');
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
      let a = Number(r), n = a >= 0 && a.toString() === r || pe$2(r);
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
    let n = this.serialize(a), o = Number(i), l = o >= 0 && o.toString() === i || pe$2(i);
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
      return this.stack.pop(), he$1(a);
    }
    return s$1;
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
    return this.pushObjectFlag(e.o, e.i), this.serializeDictionary(e, or);
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
    let r = lr, i = e.l, a = e.i;
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
    let r = cr, i = e.e.s, a = e.i, n = e.f, o = this.getRefParam(n.i);
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
    return this.serializeDictionary(e, "new " + _e[e.s] + '("' + e.m + '")');
  }
  serializePromise(e) {
    let r, i = e.f, a = e.i, n = e.s ? ur : pr;
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
    return this.assignIndexedValue(e.i, ut$1[e.s]);
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
    throw new Oe$1(e.c);
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
          return ht$1[e.s];
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
          throw new De$1(e);
      }
    } catch (r) {
      throw new jt$1(r);
    }
  }
}, fr = class extends dr {
  constructor(t) {
    super(t), this.mode = "cross", this.scopeId = t.scopeId;
  }
  getRefParam(t) {
    return D$3 + "[" + t + "]";
  }
  assignIndexedValue(t, e) {
    return this.getRefParam(t) + "=" + e;
  }
  serializeTop(t) {
    let e = this.serialize(t), r = t.i;
    if (r == null) return e;
    let i = this.resolvePatches(), a = this.getRefParam(r), n = this.scopeId == null ? "" : D$3, o = i ? "(" + e + "," + i + a + ")" : e;
    if (n === "") return t.t === 10 && !i ? "(" + o + ")" : o;
    let l = this.scopeId == null ? "()" : "(" + D$3 + '["' + g$1(this.scopeId) + '"])';
    return "(" + this.createFunction([n], o) + ")" + l;
  }
}, gr$1 = class gr extends rr$1 {
  parseItems(t) {
    let e = [];
    for (let r = 0, i = t.length; r < i; r++) r in t && (e[r] = this.parse(t[r]));
    return e;
  }
  parseArray(t, e) {
    return Et$1(t, e, this.parseItems(e));
  }
  parseProperties(t) {
    let e = Object.entries(t), r = [], i = [];
    for (let n = 0, o = e.length; n < o; n++) r.push(g$1(e[n][0])), i.push(this.parse(e[n][1]));
    let a = Symbol.iterator;
    return a in t && (r.push(this.parseWellKnownSymbol(a)), i.push($e$1(this.parseIteratorFactory(), this.parse(Ne$1(t))))), a = Symbol.asyncIterator, a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(Fe$1(this.parseAsyncIteratorFactory(), this.parse(E())))), a = Symbol.toStringTag, a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(q$2(t[a]))), a = Symbol.isConcatSpreadable, a in t && (r.push(this.parseWellKnownSymbol(a)), i.push(t[a] ? j$1 : B$2)), { k: r, v: i, s: r.length };
  }
  parsePlainObject(t, e, r) {
    return this.createObjectNode(t, e, r, this.parseProperties(e));
  }
  parseBoxed(t, e) {
    return Ct$1(t, this.parse(e.valueOf()));
  }
  parseTypedArray(t, e) {
    return $t$1(t, e, this.parse(e.buffer));
  }
  parseBigIntTypedArray(t, e) {
    return Ft$1(t, e, this.parse(e.buffer));
  }
  parseDataView(t, e) {
    return Wt$1(t, e, this.parse(e.buffer));
  }
  parseError(t, e) {
    let r = ce$1(e, this.features);
    return Dt$1(t, e, r ? this.parseProperties(r) : s$1);
  }
  parseAggregateError(t, e) {
    let r = ce$1(e, this.features);
    return Ot$1(t, e, r ? this.parseProperties(r) : s$1);
  }
  parseMap(t, e) {
    let r = [], i = [];
    for (let [a, n] of e.entries()) r.push(this.parse(a)), i.push(this.parse(n));
    return this.createMapNode(t, r, i, e.size);
  }
  parseSet(t, e) {
    let r = [];
    for (let i of e.keys()) r.push(this.parse(i));
    return Nt$1(t, e.size, r);
  }
  parsePlugin(t, e) {
    let r = this.plugins;
    if (r) for (let i = 0, a = r.length; i < a; i++) {
      let n = r[i];
      if (n.parse.sync && n.test(e)) return Ce$1(t, n.tag, n.parse.sync(e, this, { id: t }));
    }
  }
  parseStream(t, e) {
    return We$1(t, this.parseSpecialReference(4), []);
  }
  parsePromise(t, e) {
    return this.createPromiseConstructorNode(t);
  }
  parseAbortSignalSync(t, e) {
    return h$1(37, t, s$1, s$1, s$1, s$1, s$1, s$1, s$1, this.parse(e.reason), s$1, s$1);
  }
  parseAbortSignal(t, e) {
    return e.aborted ? this.parseAbortSignalSync(t, e) : this.createAbortSignalConstructorNode(t);
  }
  parseObject(t, e) {
    if (Array.isArray(e)) return this.parseArray(t, e);
    if (Jt$1(e)) return this.parseStream(t, e);
    let r = e.constructor;
    if (r === Xt$1) return this.parse(e.replacement);
    let i = this.parsePlugin(t, e);
    if (i) return i;
    switch (r) {
      case Object:
        return this.parsePlainObject(t, e, false);
      case void 0:
        return this.parsePlainObject(t, e, true);
      case Date:
        return Rt$1(t, e);
      case RegExp:
        return At$1(t, e);
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
        return It$1(t, e);
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
    throw new O(e);
  }
  parseFunction(t) {
    let e = this.getReference(t);
    if (e.type !== 0) return e.value;
    let r = this.parsePlugin(e.value, t);
    if (r) return r;
    throw new O(t);
  }
  parse(t) {
    try {
      switch (typeof t) {
        case "boolean":
          return t ? j$1 : B$2;
        case "undefined":
          return gt;
        case "string":
          return q$2(t);
        case "number":
          return St$1(t);
        case "bigint":
          return vt$1(t);
        case "object": {
          if (t) {
            let e = this.getReference(t);
            return e.type === 0 ? this.parseObject(e.value, t) : e.value;
          }
          return mt$1;
        }
        case "symbol":
          return this.parseWellKnownSymbol(t);
        case "function":
          return this.parseFunction(t);
        default:
          throw new O(t);
      }
    } catch (e) {
      throw new Vt$1(e);
    }
  }
}, mr = class extends gr$1 {
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
    for (let o = 0, l = r.length; o < l; o++) i.push(g$1(r[o][0])), a.push(this.parse(r[o][1]));
    let n = Symbol.iterator;
    return n in e && (i.push(this.parseWellKnownSymbol(n)), a.push($e$1(this.parseIteratorFactory(), this.parse(Ne$1(e))))), n = Symbol.asyncIterator, n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(Fe$1(this.parseAsyncIteratorFactory(), this.parse(Qt$1(e))))), n = Symbol.toStringTag, n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(q$2(e[n]))), n = Symbol.isConcatSpreadable, n in e && (i.push(this.parseWellKnownSymbol(n)), a.push(e[n] ? j$1 : B$2)), { k: i, v: a, s: i.length };
  }
  parsePromise(e, r) {
    return r.then((i) => {
      let a = this.parseWithError(i);
      a && this.onParse(h$1(23, e, s$1, s$1, s$1, s$1, s$1, s$1, [this.parseSpecialReference(2), a], s$1, s$1, s$1)), this.popPendingState();
    }, (i) => {
      if (this.alive) {
        let a = this.parseWithError(i);
        a && this.onParse(h$1(24, e, s$1, s$1, s$1, s$1, s$1, s$1, [this.parseSpecialReference(3), a], s$1, s$1, s$1));
      }
      this.popPendingState();
    }), this.pushPendingState(), this.createPromiseConstructorNode(e);
  }
  parsePlugin(e, r) {
    let i = this.plugins;
    if (i) for (let a = 0, n = i.length; a < n; a++) {
      let o = i[a];
      if (o.parse.stream && o.test(r)) return Ce$1(e, o.tag, o.parse.stream(r, this, { id: e }));
    }
    return s$1;
  }
  parseStream(e, r) {
    let i = We$1(e, this.parseSpecialReference(4), []);
    return this.pushPendingState(), r.on({ next: (a) => {
      if (this.alive) {
        let n = this.parseWithError(a);
        n && this.onParse(Ut$1(e, n));
      }
    }, throw: (a) => {
      if (this.alive) {
        let n = this.parseWithError(a);
        n && this.onParse(Lt$1(e, n));
      }
      this.popPendingState();
    }, return: (a) => {
      if (this.alive) {
        let n = this.parseWithError(a);
        n && this.onParse(Mt$1(e, n));
      }
      this.popPendingState();
    } }), i;
  }
  handleAbortSignal(e, r) {
    if (this.alive) {
      let i = this.parseWithError(r.reason);
      i && this.onParse(h$1(36, e, s$1, s$1, s$1, s$1, s$1, s$1, [this.parseSpecialReference(6), i], s$1, s$1, s$1));
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
      return this.onError(r), s$1;
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
}, yr = class extends mr {
  constructor() {
    super(...arguments), this.mode = "cross";
  }
};
function br(t, e) {
  let r = Ie$1(e.plugins), i = new yr({ plugins: r, refs: e.refs, disabledFeatures: e.disabledFeatures, onParse(a, n) {
    let o = new fr({ plugins: r, features: i.features, scopeId: e.scopeId, markedRefs: i.marked }), l;
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
var zr = class extends ir {
  constructor(t) {
    super(t), this.mode = "vanilla", this.marked = new Set(t.markedRefs);
  }
  assignIndexedValue(t, e) {
    return this.marked.has(t) && this.refs.set(t, e), e;
  }
};
function de$2(t, e = {}) {
  let r = Ie$1(e.plugins);
  return new zr({ plugins: r, markedRefs: t.m }).deserialize(t.t);
}
function N$1(t) {
  return { detail: t.detail, bubbles: t.bubbles, cancelable: t.cancelable, composed: t.composed };
}
var Pr = { tag: "seroval-plugins/web/CustomEvent", test(t) {
  return typeof CustomEvent > "u" ? false : t instanceof CustomEvent;
}, parse: { sync(t, e) {
  return { type: e.parse(t.type), options: e.parse(N$1(t)) };
}, async async(t, e) {
  return { type: await e.parse(t.type), options: await e.parse(N$1(t)) };
}, stream(t, e) {
  return { type: e.parse(t.type), options: e.parse(N$1(t)) };
} }, serialize(t, e) {
  return "new CustomEvent(" + e.serialize(t.type) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new CustomEvent(e.deserialize(t.type), e.deserialize(t.options));
} }, K$2 = Pr, xr = { tag: "seroval-plugins/web/DOMException", test(t) {
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
} }, X$2 = xr;
function U$1(t) {
  return { bubbles: t.bubbles, cancelable: t.cancelable, composed: t.composed };
}
var Sr = { tag: "seroval-plugins/web/Event", test(t) {
  return typeof Event > "u" ? false : t instanceof Event;
}, parse: { sync(t, e) {
  return { type: e.parse(t.type), options: e.parse(U$1(t)) };
}, async async(t, e) {
  return { type: await e.parse(t.type), options: await e.parse(U$1(t)) };
}, stream(t, e) {
  return { type: e.parse(t.type), options: e.parse(U$1(t)) };
} }, serialize(t, e) {
  return "new Event(" + e.serialize(t.type) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new Event(e.deserialize(t.type), e.deserialize(t.options));
} }, Y$3 = Sr, vr = { tag: "seroval-plugins/web/File", test(t) {
  return typeof File > "u" ? false : t instanceof File;
}, parse: { async async(t, e) {
  return { name: await e.parse(t.name), options: await e.parse({ type: t.type, lastModified: t.lastModified }), buffer: await e.parse(await t.arrayBuffer()) };
} }, serialize(t, e) {
  return "new File([" + e.serialize(t.buffer) + "]," + e.serialize(t.name) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new File([e.deserialize(t.buffer)], e.deserialize(t.name), e.deserialize(t.options));
} }, wr = vr;
function L$1(t) {
  let e = [];
  return t.forEach((r, i) => {
    e.push([i, r]);
  }), e;
}
var A$3 = {}, Rr = { tag: "seroval-plugins/web/FormDataFactory", test(t) {
  return t === A$3;
}, parse: { sync() {
}, async async() {
  return await Promise.resolve(void 0);
}, stream() {
} }, serialize(t, e) {
  return e.createEffectfulFunction(["e", "f", "i", "s", "t"], "f=new FormData;for(i=0,s=e.length;i<s;i++)f.append((t=e[i])[0],t[1]);return f");
}, deserialize() {
  return A$3;
} }, Ar = { tag: "seroval-plugins/web/FormData", extends: [wr, Rr], test(t) {
  return typeof FormData > "u" ? false : t instanceof FormData;
}, parse: { sync(t, e) {
  return { factory: e.parse(A$3), entries: e.parse(L$1(t)) };
}, async async(t, e) {
  return { factory: await e.parse(A$3), entries: await e.parse(L$1(t)) };
}, stream(t, e) {
  return { factory: e.parse(A$3), entries: e.parse(L$1(t)) };
} }, serialize(t, e) {
  return "(" + e.serialize(t.factory) + ")(" + e.serialize(t.entries) + ")";
}, deserialize(t, e) {
  let r = new FormData(), i = e.deserialize(t.entries);
  for (let a = 0, n = i.length; a < n; a++) {
    let o = i[a];
    r.append(o[0], o[1]);
  }
  return r;
} }, G$2 = Ar;
function M$4(t) {
  let e = [];
  return t.forEach((r, i) => {
    e.push([i, r]);
  }), e;
}
var Ir = { tag: "seroval-plugins/web/Headers", test(t) {
  return typeof Headers > "u" ? false : t instanceof Headers;
}, parse: { sync(t, e) {
  return e.parse(M$4(t));
}, async async(t, e) {
  return await e.parse(M$4(t));
}, stream(t, e) {
  return e.parse(M$4(t));
} }, serialize(t, e) {
  return "new Headers(" + e.serialize(t) + ")";
}, deserialize(t, e) {
  return new Headers(e.deserialize(t));
} }, k$1 = Ir, I = {}, kr = { tag: "seroval-plugins/web/ReadableStreamFactory", test(t) {
  return t === I;
}, parse: { sync() {
}, async async() {
  return await Promise.resolve(void 0);
}, stream() {
} }, serialize(t, e) {
  return e.createFunction(["d"], "new ReadableStream({start:" + e.createEffectfulFunction(["c"], "d.on({next:" + e.createEffectfulFunction(["v"], "c.enqueue(v)") + ",throw:" + e.createEffectfulFunction(["v"], "c.error(v)") + ",return:" + e.createEffectfulFunction([], "c.close()") + "})") + "})");
}, deserialize() {
  return I;
} };
function fe$1(t) {
  let e = E(), r = t.getReader();
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
var _r = { tag: "seroval/plugins/web/ReadableStream", extends: [kr], test(t) {
  return typeof ReadableStream > "u" ? false : t instanceof ReadableStream;
}, parse: { sync(t, e) {
  return { factory: e.parse(I), stream: e.parse(E()) };
}, async async(t, e) {
  return { factory: await e.parse(I), stream: await e.parse(fe$1(t)) };
}, stream(t, e) {
  return { factory: e.parse(I), stream: e.parse(fe$1(t)) };
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
} }, _$2 = _r;
function ge$2(t, e) {
  return { body: e, cache: t.cache, credentials: t.credentials, headers: t.headers, integrity: t.integrity, keepalive: t.keepalive, method: t.method, mode: t.mode, redirect: t.redirect, referrer: t.referrer, referrerPolicy: t.referrerPolicy };
}
var Er = { tag: "seroval-plugins/web/Request", extends: [_$2, k$1], test(t) {
  return typeof Request > "u" ? false : t instanceof Request;
}, parse: { async async(t, e) {
  return { url: await e.parse(t.url), options: await e.parse(ge$2(t, t.body ? await t.clone().arrayBuffer() : null)) };
}, stream(t, e) {
  return { url: e.parse(t.url), options: e.parse(ge$2(t, t.clone().body)) };
} }, serialize(t, e) {
  return "new Request(" + e.serialize(t.url) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new Request(e.deserialize(t.url), e.deserialize(t.options));
} }, Z$3 = Er;
function me$1(t) {
  return { headers: t.headers, status: t.status, statusText: t.statusText };
}
var Cr = { tag: "seroval-plugins/web/Response", extends: [_$2, k$1], test(t) {
  return typeof Response > "u" ? false : t instanceof Response;
}, parse: { async async(t, e) {
  return { body: await e.parse(t.body ? await t.clone().arrayBuffer() : null), options: await e.parse(me$1(t)) };
}, stream(t, e) {
  return { body: e.parse(t.clone().body), options: e.parse(me$1(t)) };
} }, serialize(t, e) {
  return "new Response(" + e.serialize(t.body) + "," + e.serialize(t.options) + ")";
}, deserialize(t, e) {
  return new Response(e.deserialize(t.body), e.deserialize(t.options));
} }, J$1 = Cr, $r = { tag: "seroval-plugins/web/URLSearchParams", test(t) {
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
} }, Q$3 = $r, Fr = { tag: "seroval-plugins/web/URL", test(t) {
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
} }, ee$3 = Fr;
const T = "Invariant Violation", { setPrototypeOf: Wr = function(t, e) {
  return t.__proto__ = e, t;
} } = Object;
class ie extends Error {
  constructor(e = T) {
    super(typeof e == "number" ? `${T}: ${e} (see https://github.com/apollographql/invariant-packages)` : e);
    __publicField$1(this, "framesToPop", 1);
    __publicField$1(this, "name", T);
    Wr(this, ie.prototype);
  }
}
function Dr(t, e) {
  if (!t) throw new ie(e);
}
const v = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function Or(t = {}) {
  const e = { options: t, rootNode: Ue$1(), staticRoutesMap: {} }, r = (i) => t.strictTrailingSlash ? i : i.replace(/\/$/, "") || "/";
  if (t.routes) for (const i in t.routes) ye$2(e, r(i), t.routes[i]);
  return { ctx: e, lookup: (i) => Nr(e, r(i)), insert: (i, a) => ye$2(e, r(i), a), remove: (i) => Ur(e, r(i)) };
}
function Nr(t, e) {
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
        const b = i.length - u;
        l = l.placeholderChildren.find((p) => p.maxDepth === b) || null;
      } else l = l.placeholderChildren[0] || null;
      if (!l) break;
      l.paramName && (a[l.paramName] = d), n = true;
    } else l = m;
  }
  return (l === null || l.data === null) && o !== null && (l = o, a[l.paramName || "_"] = c, n = true), l ? n ? { ...l.data, params: n ? a : void 0 } : l.data : null;
}
function ye$2(t, e, r) {
  let i = true;
  const a = e.split("/");
  let n = t.rootNode, o = 0;
  const l = [n];
  for (const c of a) {
    let u;
    if (u = n.children.get(c)) n = u;
    else {
      const d = Lr(c);
      u = Ue$1({ type: d, parent: n }), n.children.set(c, u), d === v.PLACEHOLDER ? (u.paramName = c === "*" ? `_${o++}` : c.slice(1), n.placeholderChildren.push(u), i = false) : d === v.WILDCARD && (n.wildcardChildNode = u, u.paramName = c.slice(3) || "_", i = false), l.push(u), n = u;
    }
  }
  for (const [c, u] of l.entries()) u.maxDepth = Math.max(l.length - c, u.maxDepth || 0);
  return n.data = r, i === true && (t.staticRoutesMap[e] = n), n;
}
function Ur(t, e) {
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
function Ue$1(t = {}) {
  return { type: t.type || v.NORMAL, maxDepth: 0, parent: t.parent || null, children: /* @__PURE__ */ new Map(), data: t.data || null, paramName: t.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function Lr(t) {
  return t.startsWith("**") ? v.WILDCARD : t[0] === ":" || t === "*" ? v.PLACEHOLDER : v.NORMAL;
}
const Le$1 = [{ page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index.mjs'), import: () => import('../build/index.mjs') }, path: "/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/index.tsx" }, { page: true, $component: { src: "src/routes/[...404].tsx?pick=default&pick=$css", build: () => import('../build/_...404_.mjs'), import: () => import('../build/_...404_.mjs') }, path: "/*404", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/[...404].tsx" }, { page: true, $component: { src: "src/routes/UI/Cursor.tsx?pick=default&pick=$css", build: () => import('../build/Cursor.mjs'), import: () => import('../build/Cursor.mjs') }, path: "/UI/Cursor", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Cursor.tsx" }, { page: true, $component: { src: "src/routes/UI/Waves.tsx?pick=default&pick=$css", build: () => import('../build/Waves.mjs'), import: () => import('../build/Waves.mjs') }, path: "/UI/Waves", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Waves.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css", build: () => import('../build/index2.mjs'), import: () => import('../build/index2.mjs') }, path: "/(Pages)/LoginRegistration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css", build: () => import('../build/riv.mjs'), import: () => import('../build/riv.mjs') }, path: "/(Pages)/LoginRegistration/riv", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/riv.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css", build: () => import('../build/index3.mjs'), import: () => import('../build/index3.mjs') }, path: "/(Pages)/Wallets/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css", build: () => import('../build/_...slug_.mjs'), import: () => import('../build/_...slug_.mjs') }, path: "/(Pages)/Wallets/*slug", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/[...slug].tsx" }, { page: true, $component: { src: "src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css", build: () => import('../build/deleteWallet.mjs'), import: () => import('../build/deleteWallet.mjs') }, path: "/API/Wallets/deleteWallet", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css", build: () => import('../build/Toggle.mjs'), import: () => import('../build/Toggle.mjs') }, path: "/(Pages)/LoginRegistration/components/Toggle", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/components/Toggle.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css", build: () => import('../build/index4.mjs'), import: () => import('../build/index4.mjs') }, path: "/(Pages)/LoginRegistration/Login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Login/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css", build: () => import('../build/index5.mjs'), import: () => import('../build/index5.mjs') }, path: "/(Pages)/LoginRegistration/Registration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index6.mjs'), import: () => import('../build/index6.mjs') }, path: "/(Pages)/Wallets/Wallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/index.tsx" }, { page: true, $component: { src: "src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css", build: () => import('../build/getTransactions.mjs'), import: () => import('../build/getTransactions.mjs') }, path: "/API/Wallets/Wallet/getTransactions", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css", build: () => import('../build/index7.mjs'), import: () => import('../build/index7.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Credentials/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css", build: () => import('../build/index8.mjs'), import: () => import('../build/index8.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Email/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css", build: () => import('../build/index9.mjs'), import: () => import('../build/index9.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css", build: () => import('../build/sendOtp.mjs'), import: () => import('../build/sendOtp.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/sendOtp", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css", build: () => import('../build/index10.mjs'), import: () => import('../build/index10.mjs') }, path: "/(Pages)/Wallets/_components/Card/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css", build: () => import('../build/index11.mjs'), import: () => import('../build/index11.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css", build: () => import('../build/LazyLoadSpline.mjs'), import: () => import('../build/LazyLoadSpline.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/LazyLoadSpline", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css", build: () => import('../build/index12.mjs'), import: () => import('../build/index12.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index13.mjs'), import: () => import('../build/index13.mjs') }, path: "/(Pages)/Wallets/_components/SetWallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css", build: () => import('../build/otpInput.mjs'), import: () => import('../build/otpInput.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css", build: () => import('../build/index14.mjs'), import: () => import('../build/index14.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/ProgressBar/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css", build: () => import('../build/index15.mjs'), import: () => import('../build/index15.mjs') }, path: "/(Pages)/Wallets/Wallet/components/table.tsx/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css", build: () => import('../build/Card.mjs'), import: () => import('../build/Card.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/Card/Card", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx" }], Mr = Tr(Le$1.filter((t) => t.page));
function Tr(t) {
  function e(r, i, a, n) {
    const o = Object.values(r).find((l) => a.startsWith(l.id + "/"));
    return o ? (e(o.children || (o.children = []), i, a.slice(o.id.length)), r) : (r.push({ ...i, id: a, path: a.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), r);
  }
  return t.sort((r, i) => r.path.length - i.path.length).reduce((r, i) => e(r, i, i.path, i.path), []);
}
function Vr(t) {
  return t.$HEAD || t.$GET || t.$POST || t.$PUT || t.$PATCH || t.$DELETE;
}
Or({ routes: Le$1.reduce((t, e) => {
  if (!Vr(e)) return t;
  let r = e.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (i, a) => `**:${a}`).split("/").map((i) => i.startsWith(":") || i.startsWith("*") ? i : encodeURIComponent(i)).join("/");
  if (/:[^/]*\?/g.test(r)) throw new Error(`Optional parameters are not supported in API routes: ${r}`);
  if (t[r]) throw new Error(`Duplicate API routes for "${r}" found at "${t[r].route.path}" and "${e.path}"`);
  return t[r] = { route: e }, t;
}, {}) });
var Br = " ";
const qr = { style: (t) => ssrElement("style", t.attrs, () => t.children, true), link: (t) => ssrElement("link", t.attrs, void 0, true), script: (t) => t.attrs.src ? ssrElement("script", mergeProps(() => t.attrs, { get id() {
  return t.key;
} }), () => ssr(Br), true) : null, noscript: (t) => ssrElement("noscript", t.attrs, () => escape(t.children), true) };
function Hr(t, e) {
  let { tag: r, attrs: { key: i, ...a } = { key: void 0 }, children: n } = t;
  return qr[r]({ attrs: { ...a, nonce: e }, key: i, children: n });
}
function Kr(t, e, r, i = "default") {
  return lazy(async () => {
    var _a;
    {
      const n = (await t.import())[i], l = (await ((_a = e.inputs) == null ? void 0 : _a[t.src].assets())).filter((u) => u.tag === "style" || u.attrs.rel === "stylesheet");
      return { default: (u) => [...l.map((d) => Hr(d)), createComponent(n, u)] };
    }
  });
}
function Me$1() {
  function t(r) {
    return { ...r, ...r.$$route ? r.$$route.require().route : void 0, info: { ...r.$$route ? r.$$route.require().route.info : {}, filesystem: true }, component: r.$component && Kr(r.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: r.children ? r.children.map(t) : void 0 };
  }
  return Mr.map(t);
}
let be$1;
const ys = isServer ? () => getRequestEvent().routes : () => be$1 || (be$1 = Me$1());
function Xr(t) {
  const e = le$2(t.nativeEvent, "flash");
  if (e) try {
    let r = JSON.parse(e);
    if (!r || !r.result) return;
    const i = [...r.input.slice(0, -1), new Map(r.input[r.input.length - 1])], a = r.error ? new Error(r.result) : r.result;
    return { input: i, url: r.url, pending: false, result: r.thrown ? void 0 : a, error: r.thrown ? a : void 0 };
  } catch (r) {
    console.error(r);
  } finally {
    fe$2(t.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function Yr(t) {
  const e = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, t.response.headers.set("Content-Type", "text/html"), Object.assign(t, { manifest: await e.json(), assets: [...await e.inputs[e.handler].assets()], router: { submission: Xr(t) }, routes: Me$1(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const Gr = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function Zr(t) {
  return t.status && Gr.has(t.status) ? t.status : 302;
}
const Jr = { "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1": { functionName: "deleteWallet_1", importer: () => import('../build/deleteWallet-DfS0S0n9.mjs') }, "src_routes_API_Wallets_Wallet_getTransactions_ts--getTransactions_1": { functionName: "getTransactions_1", importer: () => import('../build/getTransactions-B7wMQXy1.mjs') }, "src_routes_API_Auth_login_loginUser_ts--loginUser_action": { functionName: "loginUser_action", importer: () => import('../build/loginUser-lOKuXLaT.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getWallets_1": { functionName: "getWallets_1", importer: () => import('../build/getWallets.server-CbIIGRZN.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getWalletsContainer_1": { functionName: "getWalletsContainer_1", importer: () => import('../build/getWallets.server-CbIIGRZN.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getRecursiveWalletBalance_1": { functionName: "getRecursiveWalletBalance_1", importer: () => import('../build/getWallets.server-CbIIGRZN.mjs') }, "src_routes_API_Wallets_getWallets_server_ts--getWalletName_1": { functionName: "getWalletName_1", importer: () => import('../build/getWallets.server-CbIIGRZN.mjs') }, "src_Server_auth_server_ts--getUserId_1": { functionName: "getUserId_1", importer: () => import('../build/auth.server-DMy-hh56.mjs') }, "src_Server_auth_server_ts--getUsername_1": { functionName: "getUsername_1", importer: () => import('../build/auth.server-DMy-hh56.mjs') }, "src_Server_auth_server_ts--getUser_1": { functionName: "getUser_1", importer: () => import('../build/auth.server-DMy-hh56.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--getExchangeRate_1": { functionName: "getExchangeRate_1", importer: () => import('../build/exchangeRates-Dp8OcCeR.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--getConversionRate_1": { functionName: "getConversionRate_1", importer: () => import('../build/exchangeRates-Dp8OcCeR.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--calculateConvertedTotal_1": { functionName: "calculateConvertedTotal_1", importer: () => import('../build/exchangeRates-Dp8OcCeR.mjs') }, "src_routes_API_exchangeRates_exchangeRates_ts--convertBalance_1": { functionName: "convertBalance_1", importer: () => import('../build/exchangeRates-Dp8OcCeR.mjs') }, "src_routes_API_Wallets_getWallet_ts--getWallet_1": { functionName: "getWallet_1", importer: () => import('../build/getWallet-VD3qZcEm.mjs') }, "src_routes_API_Wallets_setWallet_ts--setWallet_action": { functionName: "setWallet_action", importer: () => import('../build/setWallet-BkA1dzP6.mjs') }, "src_routes_API_Auth_registration_createUser_ts--createUser_action": { functionName: "createUser_action", importer: () => import('../build/createUser-B8OMM0Mu.mjs') }, "src_routes_API_Auth_registration_credentials_usernameAlreadyexist_ts--usernameAlreadyexist_action": { functionName: "usernameAlreadyexist_action", importer: () => import('../build/usernameAlreadyexist-DlESc_vE.mjs') }, "src_routes_API_Auth_registration_phone_phoneAlreadyexist_ts--phoneAlreadyexist_action": { functionName: "phoneAlreadyexist_action", importer: () => import('../build/phoneAlreadyexist-bH2ki4sU.mjs') }, "src_routes_API_Auth_registration_email_emailAlreadyexist_ts--emailAlreadyexist_action": { functionName: "emailAlreadyexist_action", importer: () => import('../build/emailAlreadyexist-BASsf-Xu.mjs') } };
function Qr(t) {
  const e = new TextEncoder().encode(t), r = e.length, i = r.toString(16), a = "00000000".substring(0, 8 - i.length) + i, n = new TextEncoder().encode(`;0x${a};`), o = new Uint8Array(12 + r);
  return o.set(n), o.set(e, 12), o;
}
function ze$1(t, e) {
  return new ReadableStream({ start(r) {
    br(e, { scopeId: t, plugins: [K$2, X$2, Y$3, G$2, k$1, _$2, Z$3, J$1, Q$3, ee$3], onSerialize(i, a) {
      r.enqueue(Qr(a ? `(${nt(t)},${i})` : i));
    }, onDone() {
      r.close();
    }, onError(i) {
      r.error(i);
    } });
  } });
}
async function es(t) {
  const e = ye$3(t), r = e.request, i = r.headers.get("X-Server-Id"), a = r.headers.get("X-Server-Instance"), n = r.headers.has("X-Single-Flight"), o = new URL(r.url);
  let l, c;
  if (i) Dr(typeof i == "string", "Invalid server function"), [l, c] = i.split("#");
  else if (l = o.searchParams.get("id"), c = o.searchParams.get("name"), !l || !c) return new Response(null, { status: 404 });
  const u = Jr[l];
  let d;
  if (!u) return new Response(null, { status: 404 });
  d = await u.importer();
  const m = d[u.functionName];
  let b = [];
  if (!a || t.method === "GET") {
    const p = o.searchParams.get("args");
    if (p) {
      const f = JSON.parse(p);
      (f.t ? de$2(f, { plugins: [K$2, X$2, Y$3, G$2, k$1, _$2, Z$3, J$1, Q$3, ee$3] }) : f).forEach((C) => b.push(C));
    }
  }
  if (t.method === "POST") {
    const p = r.headers.get("content-type"), f = t.node.req, C = f instanceof ReadableStream, Te = f.body instanceof ReadableStream, ae = C && f.locked || Te && f.body.locked, ne = C ? f : f.body;
    if ((p == null ? void 0 : p.startsWith("multipart/form-data")) || (p == null ? void 0 : p.startsWith("application/x-www-form-urlencoded"))) b.push(await (ae ? r : new Request(r, { ...r, body: ne })).formData());
    else if (p == null ? void 0 : p.startsWith("application/json")) {
      const Ve = ae ? r : new Request(r, { ...r, body: ne });
      b = de$2(await Ve.json(), { plugins: [K$2, X$2, Y$3, G$2, k$1, _$2, Z$3, J$1, Q$3, ee$3] });
    }
  }
  try {
    let p = await provideRequestEvent(e, async () => (sharedConfig.context = { event: e }, e.locals.serverFunctionMeta = { id: l + "#" + c }, m(...b)));
    if (n && a && (p = await xe$1(e, p)), p instanceof Response) {
      if (p.headers && p.headers.has("X-Content-Raw")) return p;
      a && (p.headers && he$2(t, p.headers), p.status && (p.status < 300 || p.status >= 400) && R$3(t, p.status), p.customBody ? p = await p.customBody() : p.body == null && (p = null));
    }
    return a ? (pe$3(t, "content-type", "text/javascript"), ze$1(a, p)) : Pe$1(p, r, b);
  } catch (p) {
    if (p instanceof Response) n && a && (p = await xe$1(e, p)), p.headers && he$2(t, p.headers), p.status && (!a || p.status < 300 || p.status >= 400) && R$3(t, p.status), p.customBody ? p = p.customBody() : p.body == null && (p = null), pe$3(t, "X-Error", "true");
    else if (a) {
      const f = p instanceof Error ? p.message : typeof p == "string" ? p : "true";
      pe$3(t, "X-Error", f.replace(/[\r\n]+/g, ""));
    } else p = Pe$1(p, r, b, true);
    return a ? (pe$3(t, "content-type", "text/javascript"), ze$1(a, p)) : p;
  }
}
function Pe$1(t, e, r, i) {
  const a = new URL(e.url), n = t instanceof Error;
  let o = 302, l;
  return t instanceof Response ? (l = new Headers(t.headers), t.headers.has("Location") && (l.set("Location", new URL(t.headers.get("Location"), a.origin + "").toString()), o = Zr(t))) : l = new Headers({ Location: new URL(e.headers.get("referer")).toString() }), t && l.append("Set-Cookie", `flash=${encodeURIComponent(JSON.stringify({ url: a.pathname + a.search, result: n ? t.message : t, thrown: i, error: n, input: [...r.slice(0, -1), [...r[r.length - 1].entries()]] }))}; Secure; HttpOnly;`), new Response(null, { status: o, headers: l });
}
let V$2;
function ts(t) {
  var _a;
  const e = new Headers(t.request.headers), r = ue$3(t.nativeEvent), i = t.response.headers.getSetCookie();
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
async function xe$1(t, e) {
  let r, i = new URL(t.request.headers.get("referer")).toString();
  e instanceof Response && (e.headers.has("X-Revalidate") && (r = e.headers.get("X-Revalidate").split(",")), e.headers.has("Location") && (i = new URL(e.headers.get("Location"), new URL(t.request.url).origin + "").toString()));
  const a = ge$3(t);
  return a.request = new Request(i, { headers: ts(t) }), await provideRequestEvent(a, async () => {
    await Yr(a), V$2 || (V$2 = (await import('../build/app-DLO7lzbB.mjs')).default), a.router.dataOnly = r || true, a.router.previousUrl = t.request.headers.get("referer");
    try {
      renderToString(() => {
        sharedConfig.context.event = a, V$2();
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
const bs = eventHandler(es);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
function N(t = {}) {
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
    const H = () => {
      e = n;
    }, p = () => e === n ? H : void 0;
    h.add(p);
    try {
      const v = a ? a.run(n, i) : i();
      return s || (e = void 0), await v;
    } finally {
      h.delete(p);
    }
  } };
}
function K$1(t = {}) {
  const e = {};
  return { get(s, r = {}) {
    return e[s] || (e[s] = N({ ...t, ...r })), e[s];
  } };
}
const u$1 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, g = "__unctx__", B$1 = u$1[g] || (u$1[g] = K$1()), M$3 = (t, e = {}) => B$1.get(t, e), y$1 = "__unctx_async_handlers__", h = u$1[y$1] || (u$1[y$1] = /* @__PURE__ */ new Set());
function z(t) {
  let e;
  const s = m(t), r = { duplex: "half", method: t.method, headers: t.headers };
  return t.node.req.body instanceof ArrayBuffer ? new Request(s, { ...r, body: t.node.req.body }) : new Request(s, { ...r, get body() {
    return e || (e = Z$2(t), e);
  } });
}
function D$2(t) {
  var _a;
  return (_a = t.web) != null ? _a : t.web = { request: z(t), url: m(t) }, t.web.request;
}
function G$1() {
  return ne$2();
}
const x$1 = Symbol("$HTTPEvent");
function J(t) {
  return typeof t == "object" && (t instanceof H3Event || (t == null ? void 0 : t[x$1]) instanceof H3Event || (t == null ? void 0 : t.__is_event__) === true);
}
function o(t) {
  return function(...e) {
    var _a;
    let s = e[0];
    if (J(s)) e[0] = s instanceof H3Event || s.__is_event__ ? s : s[x$1];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (s = G$1(), !s) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      e.unshift(s);
    }
    return t(...e);
  };
}
const m = o(getRequestURL), Q$2 = o(getRequestIP), R$1 = o(setResponseStatus), S$1 = o(getResponseStatus), V$1 = o(getResponseStatusText), c = o(getResponseHeaders), b$2 = o(getResponseHeader), X$1 = o(setResponseHeader), Y$2 = o(appendResponseHeader), ue$1 = o(sendRedirect), de$1 = o(getCookie), le$1 = o(setCookie), fe = o(useSession), pe$1 = o(setHeader), Z$2 = o(getRequestWebStream), ee$2 = o(removeResponseHeader), te$2 = o(D$2);
function se$1() {
  var _a;
  return M$3("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function ne$2() {
  return se$1().use().event;
}
const d = "solidFetchEvent";
function oe(t) {
  return { request: te$2(t), response: ae(t), clientAddress: Q$2(t), locals: {}, nativeEvent: t };
}
function ge$1(t) {
  return { ...t };
}
function ye$1(t) {
  if (!t.context[d]) {
    const e = oe(t);
    t.context[d] = e;
  }
  return t.context[d];
}
let re$1 = class re {
  constructor(e) {
    __publicField(this, "event");
    this.event = e;
  }
  get(e) {
    const s = b$2(this.event, e);
    return Array.isArray(s) ? s.join(", ") : s || null;
  }
  has(e) {
    return this.get(e) !== void 0;
  }
  set(e, s) {
    return X$1(this.event, e, s);
  }
  delete(e) {
    return ee$2(this.event, e);
  }
  append(e, s) {
    Y$2(this.event, e, s);
  }
  getSetCookie() {
    const e = b$2(this.event, "Set-Cookie");
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
};
function ae(t) {
  return { get status() {
    return S$1(t);
  }, set status(e) {
    R$1(t, e);
  }, get statusText() {
    return V$1(t);
  }, set statusText(e) {
    R$1(t, S$1(t), e);
  }, headers: new re$1(t) };
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
let D$1;
function V() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), D$1 = window.history.state._depth;
}
isServer || V();
function qe(t) {
  return { ...t, _depth: window.history.state && window.history.state._depth };
}
function Ie(t, e) {
  let n = false;
  return () => {
    const r = D$1;
    V();
    const s = r == null ? null : D$1 - r;
    if (n) {
      n = false;
      return;
    }
    s && e(s) ? (n = true, window.history.go(-s)) : t();
  };
}
const we = /^(?:[a-z0-9]+:)?\/\//i, ve = /^\/+|(\/)\/+$/g, Pe = "http://sr";
function F$2(t, e = false) {
  const n = t.replace(ve, "$1");
  return n ? e || /^[?#]/.test(n) ? n : "/" + n : "";
}
function W$1(t, e, n) {
  if (we.test(e)) return;
  const r = F$2(t), s = n && F$2(n);
  let o = "";
  return !s || e.startsWith("/") ? o = r : s.toLowerCase().indexOf(r.toLowerCase()) !== 0 ? o = r + s : o = s, (o || "/") + F$2(e, !o);
}
function Re(t, e) {
  if (t == null) throw new Error(e);
  return t;
}
function xe(t, e) {
  return F$2(t).replace(/\/*(\*.*)?$/g, "") + F$2(e);
}
function Y$1(t) {
  const e = {};
  return t.searchParams.forEach((n, r) => {
    r in e ? Array.isArray(e[r]) ? e[r].push(n) : e[r] = [e[r], n] : e[r] = n;
  }), e;
}
function be(t, e, n) {
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
      const d = xe(e, m);
      let p = c ? d : d.split("/*", 1)[0];
      p = p.split("/").map((y) => y.startsWith(":") || y.startsWith("*") ? y : encodeURIComponent(y)).join("/"), h.push({ ...f, originalPath: l, pattern: p, matcher: be(p, !c, t.matchFilters) });
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
function M$2(t, e) {
  for (let n = 0, r = t.length; n < r; n++) {
    const s = t[n].matcher(e);
    if (s) return s;
  }
  return [];
}
function je(t, e, n) {
  const r = new URL(Pe), s = createMemo((l) => {
    const m = t();
    try {
      return new URL(m, r);
    } catch {
      return console.error(`Invalid path ${m}`), l;
    }
  }, r, { equals: (l, m) => l.href === m.href }), o = createMemo(() => s().pathname), a = createMemo(() => s().search, true), c = createMemo(() => s().hash), f = () => "", h = on(a, () => Y$1(s()));
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
  }, [v, E] = createSignal(s().value), [S, re] = createSignal(s().state), O = je(v, S, a.queryWrapper), j = [], z = createSignal(isServer ? ue() : []), H = createMemo(() => typeof r.transformUrl == "function" ? M$2(e(), r.transformUrl(O.pathname)) : M$2(e(), O.pathname)), K = () => {
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
    const g = M$2(e(), i.pathname), R = P;
    P = "preload";
    for (let B in g) {
      const { route: x, params: _ } = g[B];
      x.component && x.component.preload && x.component.preload();
      const { preload: b } = x;
      C = true, u && b && runWithOwner(n(), () => b({ params: _, location: { pathname: i.pathname, search: i.search, hash: i.hash, query: Y$1(i), state: null, key: "" }, intent: "preload" })), C = false;
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

function A$2(e) {
  e = mergeProps$1({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, r] = splitProps(e, ["href", "state", "class", "activeClass", "inactiveClass", "end"]), i = We(() => e.href), o = $e(i), l = De(), a = createMemo(() => {
    const n = i();
    if (n === void 0) return [false, false];
    const t = F$2(n.split(/[?#]/, 1)[0]).toLowerCase(), s = decodeURI(F$2(l.pathname).toLowerCase());
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

var u = ["<svg", ' class="Icon" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="', '"><path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.489a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79v10.51Zm-2-1V9.978l-7-5.445-7 5.445V19h14Z"></path></svg>'], w = ["<svg", ' class="Icon" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="', '"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 12v-4"></path><path d="M15 12v-2"></path><path d="M12 12v-1"></path><path d="M3 4h18"></path><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10"></path><path d="M12 16v4"></path><path d="M9 20h6"></path></svg>'], f = ["<svg", ' class="Icon" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" style="', '"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"></path></svg>'], x = ["<div", ' class="flex flex-col gap-27 mt-60">', "</div>"], M$1 = ["<div", ' class="', '"><div class="flex flex-col ml-15 gap-31 mt-60">', "</div><!--$-->", "<!--/--></div>"];
function H() {
  const [n, v] = createSignal(false), [s, c] = createSignal(null), l = [{ name: "Home", svg: ssr(u, ssrHydrationKey(), "overflow:visible;color:currentcolor;width:24px;height:24px") }, { name: "Dashboard", svg: ssr(w, ssrHydrationKey(), "overflow:visible;color:currentcolor;width:24px;height:24px") }, { name: "Wallets", svg: ssr(f, ssrHydrationKey(), "overflow:none;color:currentcolor;width:24px;height:24px") }], p = [{ name: "Home", icon: "Home", href: "/", svg: l[0].svg }, { name: "Dashboard", icon: "Dashboard", href: "/", svg: l[1].svg }, { name: "Wallets", icon: "Wallet", href: "/Wallets", svg: l[2].svg }], i = (e) => ({ onMouseEnter: () => c(e), onMouseLeave: () => c(null) });
  return ssr(M$1, ssrHydrationKey(), `Menu flex flex-row z-10 ${n() ? "Extend" : ""}`, escape(p.map((e) => createComponent$1(A$2, mergeProps({ get href() {
    return e.href;
  }, get class() {
    return `Icon ${s() === e.name ? "Hover" : ""}`;
  } }, () => i(e.name), { get children() {
    return e.svg;
  } })))), escape(createComponent$1(Show, { get when() {
    return n();
  }, get children() {
    return ssr(x, ssrHydrationKey(), escape(p.map((e) => createComponent$1(A$2, mergeProps({ get href() {
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
    return createComponent$1(H, {});
  } });
}

const k = "Location", K = 5e3, U = 18e4;
let R = /* @__PURE__ */ new Map();
isServer || setInterval(() => {
  const e = Date.now();
  for (let [t, r] of R.entries()) !r[4].count && e - r[0] > U && R.delete(t);
}, 3e5);
function b() {
  if (!isServer) return R;
  const e = getRequestEvent();
  if (!e) throw new Error("Cannot find cache context");
  return (e.router || (e.router = {})).cache || (e.router.cache = /* @__PURE__ */ new Map());
}
function X(e, t = true) {
  return startTransition(() => {
    const r = Date.now();
    D(e, (a) => {
      t && (a[0] = 0), a[4][1](r);
    });
  });
}
function D(e, t) {
  e && !Array.isArray(e) && (e = [e]);
  for (let r of R.keys()) (e === void 0 || M(r, e)) && t(R.get(r));
}
function A$1(e, t) {
  e.GET && (e = e.GET);
  const r = (...a) => {
    const i = b(), s = ze(), d = He(), E = getOwner() ? Me() : void 0, w = Date.now(), l = t + F$1(a);
    let n = i.get(l), y;
    if (isServer) {
      const o = getRequestEvent();
      if (o) {
        const u = (o.router || (o.router = {})).dataOnly;
        if (u) {
          const p = o && (o.router.data || (o.router.data = {}));
          if (p && l in p) return p[l];
          if (Array.isArray(u) && !M(l, u)) return p[l] = void 0, Promise.resolve();
        }
      }
    }
    if (getListener() && !isServer && (y = true, onCleanup(() => n[4].count--)), n && n[0] && (isServer || s === "native" || n[4].count || Date.now() - n[0] < K)) {
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
  return r.keyFor = (...a) => t + F$1(a), r.key = t, r;
}
A$1.get = (e) => b().get(e)[2];
A$1.set = (e, t) => {
  const r = b(), a = Date.now();
  let i = r.get(e);
  i ? (i[0] = a, i[1] = Promise.resolve(t), i[2] = t, i[3] = "preload") : (r.set(e, i = [a, Promise.resolve(t), t, "preload", createSignal(a)]), i[4].count = 0);
};
A$1.delete = (e) => b().delete(e);
A$1.clear = () => b().clear();
function M(e, t) {
  for (let r of t) if (r && e.startsWith(r)) return true;
  return false;
}
function F$1(e) {
  return JSON.stringify(e, (t, r) => q$1(r) ? Object.keys(r).sort().reduce((a, i) => (a[i] = r[i], a), {}) : r);
}
function q$1(e) {
  let t;
  return e != null && typeof e == "object" && (!(t = Object.getPrototypeOf(e)) || t === Object.prototype);
}
const S = /* @__PURE__ */ new Map();
function Y(e) {
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
    const i = new URL(t, Pe);
    return i.searchParams.set("args", F$1(r)), _$1(a, (i.origin === "https://action" ? i.origin : "") + i.pathname + i.search);
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
  return D(s, (h) => h[0] = 0), d && d.forEach((h) => A$1.set(h, i[h])), await X(s, false), a != null ? { data: a } : void 0;
}

const A = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function at(e = {}) {
  const r = { options: e, rootNode: le(), staticRoutesMap: {} }, t = (n) => e.strictTrailingSlash ? n : n.replace(/\/$/, "") || "/";
  if (e.routes) for (const n in e.routes) Q(r, t(n), e.routes[n]);
  return { ctx: r, lookup: (n) => it(r, t(n)), insert: (n, s) => Q(r, t(n), s), remove: (n) => lt(r, t(n)) };
}
function it(e, r) {
  const t = e.staticRoutesMap[r];
  if (t) return t.data;
  const n = r.split("/"), s = {};
  let o = false, i = null, a = e.rootNode, c = null;
  for (let l = 0; l < n.length; l++) {
    const m = n[l];
    a.wildcardChildNode !== null && (i = a.wildcardChildNode, c = n.slice(l).join("/"));
    const C = a.children.get(m);
    if (C === void 0) {
      if (a && a.placeholderChildren.length > 1) {
        const y = n.length - l;
        a = a.placeholderChildren.find((P) => P.maxDepth === y) || null;
      } else a = a.placeholderChildren[0] || null;
      if (!a) break;
      a.paramName && (s[a.paramName] = m), o = true;
    } else a = C;
  }
  return (a === null || a.data === null) && i !== null && (a = i, s[a.paramName || "_"] = c, o = true), a ? o ? { ...a.data, params: o ? s : void 0 } : a.data : null;
}
function Q(e, r, t) {
  let n = true;
  const s = r.split("/");
  let o = e.rootNode, i = 0;
  const a = [o];
  for (const c of s) {
    let l;
    if (l = o.children.get(c)) o = l;
    else {
      const m = ct(c);
      l = le({ type: m, parent: o }), o.children.set(c, l), m === A.PLACEHOLDER ? (l.paramName = c === "*" ? `_${i++}` : c.slice(1), o.placeholderChildren.push(l), n = false) : m === A.WILDCARD && (o.wildcardChildNode = l, l.paramName = c.slice(3) || "_", n = false), a.push(l), o = l;
    }
  }
  for (const [c, l] of a.entries()) l.maxDepth = Math.max(a.length - c, l.maxDepth || 0);
  return o.data = t, n === true && (e.staticRoutesMap[r] = o), o;
}
function lt(e, r) {
  let t = false;
  const n = r.split("/");
  let s = e.rootNode;
  for (const o of n) if (s = s.children.get(o), !s) return t;
  if (s.data) {
    const o = n.at(-1) || "";
    s.data = null, Object.keys(s.children).length === 0 && s.parent && (s.parent.children.delete(o), s.parent.wildcardChildNode = null, s.parent.placeholderChildren = []), t = true;
  }
  return t;
}
function le(e = {}) {
  return { type: e.type || A.NORMAL, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function ct(e) {
  return e.startsWith("**") ? A.WILDCARD : e[0] === ":" || e === "*" ? A.PLACEHOLDER : A.NORMAL;
}
const ce = [{ page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index16.mjs'), import: () => import('../build/index16.mjs') }, path: "/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/index.tsx" }, { page: true, $component: { src: "src/routes/[...404].tsx?pick=default&pick=$css", build: () => import('../build/_...404_2.mjs'), import: () => import('../build/_...404_2.mjs') }, path: "/*404", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/[...404].tsx" }, { page: true, $component: { src: "src/routes/UI/Cursor.tsx?pick=default&pick=$css", build: () => import('../build/Cursor2.mjs'), import: () => import('../build/Cursor2.mjs') }, path: "/UI/Cursor", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Cursor.tsx" }, { page: true, $component: { src: "src/routes/UI/Waves.tsx?pick=default&pick=$css", build: () => import('../build/Waves2.mjs'), import: () => import('../build/Waves2.mjs') }, path: "/UI/Waves", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/UI/Waves.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/index.tsx?pick=default&pick=$css", build: () => import('../build/index22.mjs'), import: () => import('../build/index22.mjs') }, path: "/(Pages)/LoginRegistration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/riv.tsx?pick=default&pick=$css", build: () => import('../build/riv2.mjs'), import: () => import('../build/riv2.mjs') }, path: "/(Pages)/LoginRegistration/riv", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/riv.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/index.tsx?pick=default&pick=$css", build: () => import('../build/index32.mjs'), import: () => import('../build/index32.mjs') }, path: "/(Pages)/Wallets/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/[...slug].tsx?pick=default&pick=$css", build: () => import('../build/_...slug_2.mjs'), import: () => import('../build/_...slug_2.mjs') }, path: "/(Pages)/Wallets/*slug", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/[...slug].tsx" }, { page: true, $component: { src: "src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=$css", build: () => import('../build/deleteWallet2.mjs'), import: () => import('../build/deleteWallet2.mjs') }, path: "/API/Wallets/deleteWallet", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/components/Toggle.tsx?pick=default&pick=$css", build: () => import('../build/Toggle2.mjs'), import: () => import('../build/Toggle2.mjs') }, path: "/(Pages)/LoginRegistration/components/Toggle", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/components/Toggle.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Login/index.tsx?pick=default&pick=$css", build: () => import('../build/index42.mjs'), import: () => import('../build/index42.mjs') }, path: "/(Pages)/LoginRegistration/Login/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Login/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/index.tsx?pick=default&pick=$css", build: () => import('../build/index52.mjs'), import: () => import('../build/index52.mjs') }, path: "/(Pages)/LoginRegistration/Registration/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index62.mjs'), import: () => import('../build/index62.mjs') }, path: "/(Pages)/Wallets/Wallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/index.tsx" }, { page: true, $component: { src: "src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=$css", build: () => import('../build/getTransactions2.mjs'), import: () => import('../build/getTransactions2.mjs') }, path: "/API/Wallets/Wallet/getTransactions", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx?pick=default&pick=$css", build: () => import('../build/index72.mjs'), import: () => import('../build/index72.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Credentials/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Credentials/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx?pick=default&pick=$css", build: () => import('../build/index82.mjs'), import: () => import('../build/index82.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Email/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Email/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx?pick=default&pick=$css", build: () => import('../build/index92.mjs'), import: () => import('../build/index92.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx?pick=default&pick=$css", build: () => import('../build/sendOtp2.mjs'), import: () => import('../build/sendOtp2.mjs') }, path: "/(Pages)/LoginRegistration/Registration/Phone/sendOtp", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/Phone/sendOtp.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card/index.tsx?pick=default&pick=$css", build: () => import('../build/index102.mjs'), import: () => import('../build/index102.mjs') }, path: "/(Pages)/Wallets/_components/Card/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/index.tsx?pick=default&pick=$css", build: () => import('../build/index112.mjs'), import: () => import('../build/index112.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx?pick=default&pick=$css", build: () => import('../build/LazyLoadSpline2.mjs'), import: () => import('../build/LazyLoadSpline2.mjs') }, path: "/(Pages)/Wallets/_components/Card3D/LazyLoadSpline", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/Card3D/LazyLoadSpline.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx?pick=default&pick=$css", build: () => import('../build/index122.mjs'), import: () => import('../build/index122.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx?pick=default&pick=$css", build: () => import('../build/index132.mjs'), import: () => import('../build/index132.mjs') }, path: "/(Pages)/Wallets/_components/SetWallet/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/SetWallet/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx?pick=default&pick=$css", build: () => import('../build/otpInput2.mjs'), import: () => import('../build/otpInput2.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/inputOtp/otpInput.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx?pick=default&pick=$css", build: () => import('../build/index142.mjs'), import: () => import('../build/index142.mjs') }, path: "/(Pages)/LoginRegistration/Registration/components/ProgressBar/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/LoginRegistration/Registration/components/ProgressBar/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx?pick=default&pick=$css", build: () => import('../build/index152.mjs'), import: () => import('../build/index152.mjs') }, path: "/(Pages)/Wallets/Wallet/components/table.tsx/", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/Wallet/components/table.tsx/index.tsx" }, { page: true, $component: { src: "src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx?pick=default&pick=$css", build: () => import('../build/Card2.mjs'), import: () => import('../build/Card2.mjs') }, path: "/(Pages)/Wallets/_components/cardHolder/Card/Card", filePath: "C:/Users/Matteo/Desktop/Pulsix/src/routes/(Pages)/Wallets/_components/cardHolder/Card/Card.tsx" }], ut = pt(ce.filter((e) => e.page));
function pt(e) {
  function r(t, n, s, o) {
    const i = Object.values(t).find((a) => s.startsWith(a.id + "/"));
    return i ? (r(i.children || (i.children = []), n, s.slice(i.id.length)), t) : (t.push({ ...n, id: s, path: s.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), t);
  }
  return e.sort((t, n) => t.path.length - n.path.length).reduce((t, n) => r(t, n, n.path, n.path), []);
}
function dt(e, r) {
  const t = ht.lookup(e);
  if (t && t.route) {
    const n = r === "HEAD" ? t.route.$HEAD || t.route.$GET : t.route[`$${r}`];
    return n === void 0 ? void 0 : { handler: n, params: t.params };
  }
}
function mt(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
const ht = at({ routes: ce.reduce((e, r) => {
  if (!mt(r)) return e;
  let t = r.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (n, s) => `**:${s}`).split("/").map((n) => n.startsWith(":") || n.startsWith("*") ? n : encodeURIComponent(n)).join("/");
  if (/:[^/]*\?/g.test(t)) throw new Error(`Optional parameters are not supported in API routes: ${t}`);
  if (e[t]) throw new Error(`Duplicate API routes for "${t}" found at "${e[t].route.path}" and "${r.path}"`);
  return e[t] = { route: r }, e;
}, {}) });
var ft = " ";
const Pt = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr(ft), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function q(e, r) {
  let { tag: t, attrs: { key: n, ...s } = { key: void 0 }, children: o } = e;
  return Pt[t]({ attrs: { ...s, nonce: r }, key: n, children: o });
}
function xt(e, r, t, n = "default") {
  return lazy(async () => {
    var _a;
    {
      const o = (await e.import())[n], a = (await ((_a = r.inputs) == null ? void 0 : _a[e.src].assets())).filter((l) => l.tag === "style" || l.attrs.rel === "stylesheet");
      return { default: (l) => [...a.map((m) => q(m)), createComponent(o, l)] };
    }
  });
}
function ue() {
  function e(t) {
    return { ...t, ...t.$$route ? t.$$route.require().route : void 0, info: { ...t.$$route ? t.$$route.require().route.info : {}, filesystem: true }, component: t.$component && xt(t.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: t.children ? t.children.map(e) : void 0 };
  }
  return ut.map(e);
}
let Z;
const $t = isServer ? () => getRequestEvent().routes : () => Z || (Z = ue());
function vt(e) {
  const r = de$1(e.nativeEvent, "flash");
  if (r) try {
    let t = JSON.parse(r);
    if (!t || !t.result) return;
    const n = [...t.input.slice(0, -1), new Map(t.input[t.input.length - 1])], s = t.error ? new Error(t.result) : t.result;
    return { input: n, url: t.url, pending: false, result: t.thrown ? void 0 : s, error: t.thrown ? s : void 0 };
  } catch (t) {
    console.error(t);
  } finally {
    le$1(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function kt(e) {
  const r = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await r.json(), assets: [...await r.inputs[r.handler].assets()], router: { submission: vt(e) }, routes: ue(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const yt = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function F(e) {
  return e.status && yt.has(e.status) ? e.status : 302;
}
function Ct(e, r, t = {}, n) {
  return eventHandler({ handler: (s) => {
    const o = ye$1(s);
    return provideRequestEvent(o, async () => {
      const i = dt(new URL(o.request.url).pathname, o.request.method);
      if (i) {
        const P = await i.handler.import(), k = o.request.method === "HEAD" ? P.HEAD || P.GET : P[o.request.method];
        o.params = i.params || {}, sharedConfig.context = { event: o };
        const u = await k(o);
        if (u !== void 0) return u;
        if (o.request.method !== "GET") throw new Error(`API handler for ${o.request.method} "${o.request.url}" did not return a response.`);
      }
      const a = await r(o), c = typeof t == "function" ? await t(a) : { ...t }, l = c.mode || "stream";
      if (c.nonce && (a.nonce = c.nonce), l === "sync") {
        const P = renderToString(() => (sharedConfig.context.event = a, e(a)), c);
        if (a.complete = true, a.response && a.response.headers.get("Location")) {
          const k = F(a.response);
          return ue$1(s, a.response.headers.get("Location"), k);
        }
        return P;
      }
      if (c.onCompleteAll) {
        const P = c.onCompleteAll;
        c.onCompleteAll = (k) => {
          te(a)(k), P(k);
        };
      } else c.onCompleteAll = te(a);
      if (c.onCompleteShell) {
        const P = c.onCompleteShell;
        c.onCompleteShell = (k) => {
          ee(a, s)(), P(k);
        };
      } else c.onCompleteShell = ee(a, s);
      const m = renderToStream(() => (sharedConfig.context.event = a, e(a)), c);
      if (a.response && a.response.headers.get("Location")) {
        const P = F(a.response);
        return ue$1(s, a.response.headers.get("Location"), P);
      }
      if (l === "async") return m;
      const { writable: C, readable: y } = new TransformStream();
      return m.pipeTo(C), y;
    });
  } });
}
function ee(e, r) {
  return () => {
    if (e.response && e.response.headers.get("Location")) {
      const t = F(e.response);
      R$1(r, t), pe$1(r, "Location", e.response.headers.get("Location"));
    }
  };
}
function te(e) {
  return ({ write: r }) => {
    e.complete = true;
    const t = e.response && e.response.headers.get("Location");
    t && r(`<script>window.location="${t}"<\/script>`);
  };
}
function Rt(e, r, t) {
  return Ct(e, kt, r);
}
const pe = createContext$1(), de = ["title", "meta"], j = [], B = ["name", "http-equiv", "content", "charset", "media"].concat(["property"]), _ = (e, r) => {
  const t = Object.fromEntries(Object.entries(e.props).filter(([n]) => r.includes(n)).sort());
  return (Object.hasOwn(t, "name") || Object.hasOwn(t, "property")) && (t.name = t.name || t.property, delete t.property), e.tag + JSON.stringify(t);
};
function wt() {
  if (!sharedConfig.context) {
    const t = document.head.querySelectorAll("[data-sm]");
    Array.prototype.forEach.call(t, (n) => n.parentNode.removeChild(n));
  }
  const e = /* @__PURE__ */ new Map();
  function r(t) {
    if (t.ref) return t.ref;
    let n = document.querySelector(`[data-sm="${t.id}"]`);
    return n ? (n.tagName.toLowerCase() !== t.tag && (n.parentNode && n.parentNode.removeChild(n), n = document.createElement(t.tag)), n.removeAttribute("data-sm")) : n = document.createElement(t.tag), n;
  }
  return { addTag(t) {
    if (de.indexOf(t.tag) !== -1) {
      const o = t.tag === "title" ? j : B, i = _(t, o);
      e.has(i) || e.set(i, []);
      let a = e.get(i), c = a.length;
      a = [...a, t], e.set(i, a);
      let l = r(t);
      t.ref = l, spread(l, t.props);
      let m = null;
      for (var n = c - 1; n >= 0; n--) if (a[n] != null) {
        m = a[n];
        break;
      }
      return l.parentNode != document.head && document.head.appendChild(l), m && m.ref && m.ref.parentNode && document.head.removeChild(m.ref), c;
    }
    let s = r(t);
    return t.ref = s, spread(s, t.props), s.parentNode != document.head && document.head.appendChild(s), -1;
  }, removeTag(t, n) {
    const s = t.tag === "title" ? j : B, o = _(t, s);
    if (t.ref) {
      const i = e.get(o);
      if (i) {
        if (t.ref.parentNode) {
          t.ref.parentNode.removeChild(t.ref);
          for (let a = n - 1; a >= 0; a--) i[a] != null && document.head.appendChild(i[a].ref);
        }
        i[n] = null, e.set(o, i);
      } else t.ref.parentNode && t.ref.parentNode.removeChild(t.ref);
    }
  } };
}
function bt() {
  const e = [];
  return useAssets(() => ssr(At(e))), { addTag(r) {
    if (de.indexOf(r.tag) !== -1) {
      const t = r.tag === "title" ? j : B, n = _(r, t), s = e.findIndex((o) => o.tag === r.tag && _(o, t) === n);
      s !== -1 && e.splice(s, 1);
    }
    return e.push(r), e.length;
  }, removeTag(r, t) {
  } };
}
const Et = (e) => {
  const r = isServer ? bt() : wt();
  return createComponent$1(pe.Provider, { value: r, get children() {
    return e.children;
  } });
}, Lt = (e, r, t) => (Tt({ tag: e, props: r, setting: t, id: createUniqueId(), get name() {
  return r.name || r.property;
} }), null);
function Tt(e) {
  const r = useContext(pe);
  if (!r) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const t = r.addTag(e);
    onCleanup(() => r.removeTag(e, t));
  });
}
function At(e) {
  return e.map((r) => {
    var _a, _b;
    const n = Object.keys(r.props).map((o) => o === "children" ? "" : ` ${o}="${escape(r.props[o], true)}"`).join("");
    let s = r.props.children;
    return Array.isArray(s) && (s = s.join("")), ((_a = r.setting) == null ? void 0 : _a.close) ? `<${r.tag} data-sm="${r.id}"${n}>${((_b = r.setting) == null ? void 0 : _b.escape) ? escape(s) : s || ""}</${r.tag}>` : `<${r.tag} data-sm="${r.id}"${n}/>`;
  }).join("");
}
const St = (e) => Lt("title", e, { escape: true, close: true }), me = (e) => (r) => {
  const { base: t } = r, n = children(() => r.children), s = createMemo(() => Oe(n(), r.base || ""));
  let o;
  const i = Ne(e, s, () => o, { base: t, singleFlight: r.singleFlight, transformUrl: r.transformUrl });
  return e.create && e.create(i), createComponent$1(Ee.Provider, { value: i, get children() {
    return createComponent$1(Nt, { routerState: i, get root() {
      return r.root;
    }, get preload() {
      return r.rootPreload || r.rootLoad;
    }, get children() {
      return [(o = getOwner()) && null, createComponent$1(Mt, { routerState: i, get branches() {
        return s();
      } })];
    } });
  } });
};
function Nt(e) {
  const r = e.routerState.location, t = e.routerState.params, n = createMemo(() => e.preload && untrack(() => {
    Ke(true), e.preload({ params: t, location: r, intent: ze() || "initial" }), Ke(false);
  }));
  return createComponent$1(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (s) => createComponent$1(s, { params: t, location: r, get data() {
    return n();
  }, get children() {
    return e.children;
  } }) });
}
function Mt(e) {
  if (isServer) {
    const s = getRequestEvent();
    if (s && s.router && s.router.dataOnly) {
      Wt(s, e.routerState, e.branches);
      return;
    }
    s && ((s.router || (s.router = {})).matches || (s.router.matches = e.routerState.matches().map(({ route: o, path: i, params: a }) => ({ path: o.originalPath, pattern: o.pattern, match: i, params: a, info: o.info }))));
  }
  const r = [];
  let t;
  const n = createMemo(on(e.routerState.matches, (s, o, i) => {
    let a = o && s.length === o.length;
    const c = [];
    for (let l = 0, m = s.length; l < m; l++) {
      const C = o && o[l], y = s[l];
      i && C && y.route.key === C.route.key ? c[l] = i[l] : (a = false, r[l] && r[l](), createRoot((P) => {
        r[l] = P, c[l] = Te(e.routerState, c[l - 1] || e.routerState.base, re(() => n()[l + 1]), () => e.routerState.matches()[l]);
      }));
    }
    return r.splice(s.length).forEach((l) => l()), i && a ? i : (t = c[0], c);
  }));
  return re(() => n() && t)();
}
const re = (e) => () => createComponent$1(Show, { get when() {
  return e();
}, keyed: true, children: (r) => createComponent$1(te$1.Provider, { value: r, get children() {
  return r.outlet();
} }) });
function Wt(e, r, t) {
  const n = new URL(e.request.url), s = M$2(t, new URL(e.router.previousUrl || e.request.url).pathname), o = M$2(t, n.pathname);
  for (let i = 0; i < o.length; i++) {
    (!s[i] || o[i].route !== s[i].route) && (e.router.dataOnly = true);
    const { route: a, params: c } = o[i];
    a.preload && a.preload({ params: c, location: r.location, intent: "preload" });
  }
}
function Dt([e, r], t, n) {
  return [e, n ? (s) => r(n(s)) : r];
}
function It(e) {
  let r = false;
  const t = (s) => typeof s == "string" ? { value: s } : s, n = Dt(createSignal(t(e.get()), { equals: (s, o) => s.value === o.value && s.state === o.state }), void 0, (s) => (!r && e.set(s), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), s));
  return e.init && onCleanup(e.init((s = e.get()) => {
    r = true, n[1](t(s)), r = false;
  })), me({ signal: n, create: e.create, utils: e.utils });
}
function Ut(e, r, t) {
  return e.addEventListener(r, t), () => e.removeEventListener(r, t);
}
function Ot(e, r) {
  const t = e && document.getElementById(e);
  t ? t.scrollIntoView() : r && window.scrollTo(0, 0);
}
function _t(e) {
  const r = new URL(e);
  return r.pathname + r.search;
}
function Ht(e) {
  let r;
  const t = { value: e.url || (r = getRequestEvent()) && _t(r.request.url) || "" };
  return me({ signal: [() => t, (n) => Object.assign(t, n)] })(e);
}
function qt(e = true, r = false, t = "/_server", n) {
  return (s) => {
    const o = s.base.path(), i = s.navigatorFactory(s.base);
    let a, c;
    function l(u) {
      return u.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function m(u) {
      if (u.defaultPrevented || u.button !== 0 || u.metaKey || u.altKey || u.ctrlKey || u.shiftKey) return;
      const p = u.composedPath().find((M) => M instanceof Node && M.nodeName.toUpperCase() === "A");
      if (!p || r && !p.hasAttribute("link")) return;
      const f = l(p), g = f ? p.href.baseVal : p.href;
      if ((f ? p.target.baseVal : p.target) || !g && !p.hasAttribute("state")) return;
      const b = (p.getAttribute("rel") || "").split(/\s+/);
      if (p.hasAttribute("download") || b && b.includes("external")) return;
      const L = f ? new URL(g, document.baseURI) : new URL(g);
      if (!(L.origin !== window.location.origin || o && L.pathname && !L.pathname.toLowerCase().startsWith(o.toLowerCase()))) return [p, L];
    }
    function C(u) {
      const p = m(u);
      if (!p) return;
      const [f, g] = p, N = s.parsePath(g.pathname + g.search + g.hash), b = f.getAttribute("state");
      u.preventDefault(), i(N, { resolve: false, replace: f.hasAttribute("replace"), scroll: !f.hasAttribute("noscroll"), state: b ? JSON.parse(b) : void 0 });
    }
    function y(u) {
      const p = m(u);
      if (!p) return;
      const [f, g] = p;
      n && (g.pathname = n(g.pathname)), s.preloadRoute(g, f.getAttribute("preload") !== "false");
    }
    function P(u) {
      clearTimeout(a);
      const p = m(u);
      if (!p) return c = null;
      const [f, g] = p;
      c !== f && (n && (g.pathname = n(g.pathname)), a = setTimeout(() => {
        s.preloadRoute(g, f.getAttribute("preload") !== "false"), c = f;
      }, 20));
    }
    function k(u) {
      if (u.defaultPrevented) return;
      let p = u.submitter && u.submitter.hasAttribute("formaction") ? u.submitter.getAttribute("formaction") : u.target.getAttribute("action");
      if (!p) return;
      if (!p.startsWith("https://action/")) {
        const g = new URL(p, Pe);
        if (p = s.parsePath(g.pathname + g.search), !p.startsWith(t)) return;
      }
      if (u.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const f = S.get(p);
      if (f) {
        u.preventDefault();
        const g = new FormData(u.target, u.submitter);
        f.call({ r: s, f: u.target }, u.target.enctype === "multipart/form-data" ? g : new URLSearchParams(g));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", C), e && (document.addEventListener("mousemove", P, { passive: true }), document.addEventListener("focusin", y, { passive: true }), document.addEventListener("touchstart", y, { passive: true })), document.addEventListener("submit", k), onCleanup(() => {
      document.removeEventListener("click", C), e && (document.removeEventListener("mousemove", P), document.removeEventListener("focusin", y), document.removeEventListener("touchstart", y)), document.removeEventListener("submit", k);
    });
  };
}
function Ft(e) {
  if (isServer) return Ht(e);
  const r = () => {
    const n = window.location.pathname.replace(/^\/+/, "/") + window.location.search, s = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: n + window.location.hash, state: s };
  }, t = ye();
  return It({ get: r, set({ value: n, replace: s, scroll: o, state: i }) {
    s ? window.history.replaceState(qe(i), "", n) : window.history.pushState(i, "", n), Ot(decodeURIComponent(window.location.hash.slice(1)), o), V();
  }, init: (n) => Ut(window, "popstate", Ie(n, (s) => {
    if (s && s < 0) return !t.confirm(s);
    {
      const o = r();
      return !t.confirm(o.value, { state: o.state });
    }
  })), create: qt(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (n) => window.history.go(n), beforeLeave: t } })(e);
}
var se = ["<div", ' class="', '" style="', '"></div>'], jt = ["<div", ' class="cursor-magnetic-ring" style="', '"></div>'], Bt = ["<div", ' class="cursor-trail-particle" style="', '"></div>'];
const Xt = () => {
  const [e, r] = createSignal({ x: 0, y: 0 }), [t, n] = createSignal([]), [s, o] = createSignal(false), [i, a] = createSignal(false), [c, l] = createSignal({ x: 0, y: 0 }), [m, C] = createSignal({ x: 0, y: 0 }), [y, P] = createSignal(false), k = 8, u = 15;
  return onMount(() => {
    let p = 0, f = 0, g = performance.now();
    const N = document.createElement("style");
    N.textContent = "* { cursor: none !important; }", document.head.appendChild(N);
    const b = (x) => {
      const $ = performance.now(), R = $ - g;
      if (R > 0) {
        const W = Math.abs((x.clientX - p) / R) * 20, H = Math.abs((x.clientY - f) / R) * 20, xe = Math.min(Math.sqrt(W * W + H * H), 10);
        l({ x: W, y: H }), document.documentElement.style.setProperty("--cursor-speed", xe);
      }
      C(e()), r({ x: x.clientX, y: x.clientY }), p = x.clientX, f = x.clientY, g = $;
    }, L = (x) => {
      const $ = x.target, R = $.tagName === "INPUT" || $.tagName === "TEXTAREA", W = $.tagName === "A" || $.tagName === "BUTTON" || $.classList.contains("clickable") || $.closest("button") || $.closest("a") || R;
      P(R), o(W);
    }, M = (x) => {
      a(true), fe(x.clientX, x.clientY);
      const $ = x.target, R = $.tagName === "INPUT" || $.tagName === "TEXTAREA";
      P(R);
    }, K = () => {
      a(false);
    }, fe = (x, $) => {
    }, Pe = setInterval(() => {
      n((x) => [...x, { ...e(), timestamp: Date.now() }].slice(-8));
    }, u), z = (x) => {
      const $ = x.target, R = x.relatedTarget;
      ($.tagName === "INPUT" || $.tagName === "TEXTAREA") && (!R || R.tagName !== "INPUT" && R.tagName !== "TEXTAREA") && P(false);
    };
    document.addEventListener("mousemove", b), document.addEventListener("mouseover", L), document.addEventListener("mouseout", z), document.addEventListener("mousedown", M), document.addEventListener("mouseup", K), document.body.style.cursor = "none", onCleanup(() => {
      document.removeEventListener("mousemove", b), document.removeEventListener("mouseover", L), document.removeEventListener("mouseout", z), document.removeEventListener("mousedown", M), document.removeEventListener("mouseup", K), clearInterval(Pe);
    });
  }), [t().map((p, f) => ssr(Bt, ssrHydrationKey(), `left:${escape(p.x, true)}px;top:${escape(p.y, true)}px` + (";opacity:" + escape(f, true) / escape(k, true)) + `;transform:scale(${0.5 + escape(f, true) / escape(k, true) / 2});animation-delay:${escape(f, true) * 50}ms`)), ssr(se, ssrHydrationKey(), `cursor-outer ${s() ? "hovering" : ""} ${i() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(e().x, true)}px;top:${escape(e().y, true)}px`), ssr(se, ssrHydrationKey(), `cursor-inner ${s() ? "hovering" : ""} ${i() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(e().x, true)}px;top:${escape(e().y, true)}px`), ssr(jt, ssrHydrationKey(), `left:${escape(e().x, true)}px;top:${escape(e().y, true)}px` + (";opacity:" + (s() ? 1 : 0)) + `;transform:translate(-50%, -50%) scale(${s() ? 1 : 0}) rotate(${escape(e().x, true) / 5}deg)`)];
};
function Kt() {
  return createComponent$1(Ft, { root: (e) => createComponent$1(Et, { get children() {
    return [createComponent$1(St, { children: "Pulsix" }), createComponent$1(Xt, {}), createComponent$1(y, {}), createComponent$1(Suspense, { get children() {
      return e.children;
    } })];
  } }), get children() {
    return createComponent$1($t, {});
  } });
}
const he = isServer ? (e) => {
  const r = getRequestEvent();
  return r.response.status = e.code, r.response.statusText = e.text, onCleanup(() => !r.nativeEvent.handled && !r.complete && (r.response.status = 200)), null;
} : (e) => null;
var zt = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">', "</span>"], Yt = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>'];
const Jt = (e) => {
  const r = isServer ? "500 | Internal Server Error" : "Error | Uncaught Client Exception";
  return createComponent$1(ErrorBoundary, { fallback: (t) => (console.error(t), [ssr(zt, ssrHydrationKey(), escape(r)), createComponent$1(he, { code: 500 })]), get children() {
    return e.children;
  } });
}, Vt = (e) => {
  let r = false;
  const t = catchError(() => e.children, (n) => {
    console.error(n), r = !!n;
  });
  return r ? [ssr(Yt, ssrHydrationKey()), createComponent$1(he, { code: 500 })] : t;
};
var ne = ["<script", ">", "<\/script>"], Gt = ["<script", ' type="module"', " async", "><\/script>"], Qt = ["<script", ' type="module" async', "><\/script>"];
const Zt = ssr("<!DOCTYPE html>");
function ge(e, r, t = []) {
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (s.path !== e[0].path) continue;
    let o = [...t, s];
    if (s.children) {
      const i = e.slice(1);
      if (i.length === 0 || (o = ge(i, s.children, o), !o)) continue;
    }
    return o;
  }
}
function er(e) {
  const r = getRequestEvent(), t = r.nonce;
  let n = [];
  return Promise.resolve().then(async () => {
    let s = [];
    if (r.router && r.router.matches) {
      const o = [...r.router.matches];
      for (; o.length && (!o[0].info || !o[0].info.filesystem); ) o.shift();
      const i = o.length && ge(o, r.routes);
      if (i) {
        const a = globalThis.MANIFEST.client.inputs;
        for (let c = 0; c < i.length; c++) {
          const l = i[c], m = a[l.$component.src];
          s.push(m.assets());
        }
      }
    }
    n = await Promise.all(s).then((o) => [...new Map(o.flat().map((i) => [i.attrs.key, i])).values()].filter((i) => i.attrs.rel === "modulepreload" && !r.assets.find((a) => a.attrs.key === i.attrs.key)));
  }), useAssets(() => n.length ? n.map((s) => q(s)) : void 0), createComponent$1(NoHydration, { get children() {
    return [Zt, createComponent$1(Vt, { get children() {
      return createComponent$1(e.document, { get assets() {
        return [createComponent$1(HydrationScript, {}), r.assets.map((s) => q(s, t))];
      }, get scripts() {
        return t ? [ssr(ne, ssrHydrationKey() + ssrAttribute("nonce", escape(t, true), false), `window.manifest = ${JSON.stringify(r.manifest)}`), ssr(Gt, ssrHydrationKey(), ssrAttribute("nonce", escape(t, true), false), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))] : [ssr(ne, ssrHydrationKey(), `window.manifest = ${JSON.stringify(r.manifest)}`), ssr(Qt, ssrHydrationKey(), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))];
      }, get children() {
        return createComponent$1(Hydration, { get children() {
          return createComponent$1(Jt, { get children() {
            return createComponent$1(Kt, {});
          } });
        } });
      } });
    } })];
  } });
}
var tr = ['<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/public/logo.png">', "</head>"], rr = ["<html", ' lang="en">', '<body><div id="app">', "</div><!--$-->", "<!--/--></body></html>"];
const gr = Rt(() => createComponent$1(er, { document: ({ assets: e, children: r, scripts: t }) => ssr(rr, ssrHydrationKey(), createComponent$1(NoHydration, { get children() {
  return ssr(tr, escape(e));
} }), escape(r), escape(t)) }));

const handlers = [
  { route: '', handler: _zBFq2t, lazy: false, middleware: true, method: undefined },
  { route: '/_server', handler: bs, lazy: false, middleware: true, method: undefined },
  { route: '/', handler: gr, lazy: false, middleware: true, method: undefined }
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
  await ensuredir(dirname$1(path));
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
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
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
      const entryPath = resolve$1(dir, entry.name);
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
      const entryPath = resolve$1(dir, entry.name);
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
  opts.base = resolve$1(opts.base);
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
    return O$1(
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

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { A$2 as A, De as D, Me as M, Q$1 as Q, Ue as U, Y, trapUnhandledNodeErrors as a, useNitroApp as b, de$3 as c, destr as d, b$1 as e, fe as f, ge$3 as g, ge$1 as h, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, ys as y };
//# sourceMappingURL=nitro.mjs.map
