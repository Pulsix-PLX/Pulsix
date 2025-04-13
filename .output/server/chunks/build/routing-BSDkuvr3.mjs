import { createContext, useContext, createSignal, createMemo, createRenderEffect, on, runWithOwner, getOwner, startTransition, resetErrorBoundaries, batch, untrack, createComponent } from 'solid-js';
import { isServer, getRequestEvent } from 'solid-js/web';

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
let D;
function V() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), D = window.history.state._depth;
}
isServer || V();
function qe(t) {
  return { ...t, _depth: window.history.state && window.history.state._depth };
}
function Ie(t, e) {
  let n = false;
  return () => {
    const r = D;
    V();
    const s = r == null ? null : D - r;
    if (n) {
      n = false;
      return;
    }
    s && e(s) ? (n = true, window.history.go(-s)) : t();
  };
}
const we = /^(?:[a-z0-9]+:)?\/\//i, ve = /^\/+|(\/)\/+$/g, Pe = "http://sr";
function F(t, e = false) {
  const n = t.replace(ve, "$1");
  return n ? e || /^[?#]/.test(n) ? n : "/" + n : "";
}
function W(t, e, n) {
  if (we.test(e)) return;
  const r = F(t), s = n && F(n);
  let o = "";
  return !s || e.startsWith("/") ? o = r : s.toLowerCase().indexOf(r.toLowerCase()) !== 0 ? o = r + s : o = s, (o || "/") + F(e, !o);
}
function Re(t, e) {
  if (t == null) throw new Error(e);
  return t;
}
function xe(t, e) {
  return F(t).replace(/\/*(\*.*)?$/g, "") + F(e);
}
function Y(t) {
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
      if (y && $(v, m(E))) l.params[E] = v;
      else if (y || !$(v, E)) return null;
      l.path += `/${v}`;
    }
    if (s) {
      const d = h ? f.slice(-h).join("/") : "";
      if ($(d, m(s))) l.params[s] = d;
      else return null;
    }
    return l;
  };
}
function $(t, e) {
  const n = (r) => r === t;
  return e === void 0 ? true : typeof e == "string" ? n(e) : typeof e == "function" ? e(t) : Array.isArray(e) ? e.some(n) : e instanceof RegExp ? e.test(t) : false;
}
function Ae(t) {
  const [e, n] = t.pattern.split("/*", 2), r = e.split("/").filter(Boolean);
  return r.reduce((s, o) => s + (o.startsWith(":") ? 2 : 3), r.length - (n === void 0 ? 0 : 1));
}
function Z(t) {
  const e = /* @__PURE__ */ new Map(), n = getOwner();
  return new Proxy({}, { get(r, s) {
    return e.has(s) || runWithOwner(n, () => e.set(s, createMemo(() => t()[s]))), e.get(s)();
  }, getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true };
  }, ownKeys() {
    return Reflect.ownKeys(t());
  } });
}
function ee(t) {
  let e = /(\/?\:[^\/]+)\?/.exec(t);
  if (!e) return [t];
  let n = t.slice(0, e.index), r = t.slice(e.index + e[0].length);
  const s = [n, n += e[1]];
  for (; e = /^(\/\:[^\/]+)\?/.exec(r); ) s.push(n += e[1]), r = r.slice(e[0].length);
  return ee(r).reduce((o, a) => [...o, ...s.map((c) => c + a)], []);
}
const Ce = 100, Ee = createContext(), te = createContext(), L = () => Re(useContext(Ee), "<A> and 'use' router primitives can be only used inside a Route."), Fe = () => useContext(te) || L().base, We = (t) => {
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
  return ne(t.path).reduce((h, l) => {
    for (const m of ee(l)) {
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
function ne(t) {
  return Array.isArray(t) ? t : [t];
}
function Oe(t, e = "", n = [], r = []) {
  const s = ne(t);
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
function M(t, e) {
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
  }, r, { equals: (l, m) => l.href === m.href }), o = createMemo(() => s().pathname), a = createMemo(() => s().search, true), c = createMemo(() => s().hash), f = () => "", h = on(a, () => Y(s()));
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
  }, query: n ? n(h) : Z(h) };
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
  const { signal: [s, o], utils: a = {} } = t, c = a.parsePath || ((i) => i), f = a.renderPath || ((i) => i), h = a.beforeLeave || ye(), l = W("", r.base || "");
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
  }, [v, E] = createSignal(s().value), [S, re] = createSignal(s().state), O = je(v, S, a.queryWrapper), j = [], z = createSignal(isServer ? ue() : []), H = createMemo(() => typeof r.transformUrl == "function" ? M(e(), r.transformUrl(O.pathname)) : M(e(), O.pathname)), K = () => {
    const i = H(), u = {};
    for (let g = 0; g < i.length; g++) Object.assign(u, i[g].params);
    return u;
  }, se = a.paramsWrapper ? a.paramsWrapper(K, e) : Z(K), N = { pattern: l, path: () => l, outlet: () => null, resolvePath(i) {
    return W(l, i);
  } };
  return createRenderEffect(on(s, (i) => y("native", i), { defer: true })), { base: N, location: O, params: se, isRouting: m, renderPath: f, parsePath: c, navigatorFactory: ae, matches: H, beforeLeave: h, preloadRoute: ce, singleFlight: r.singleFlight === void 0 ? true : r.singleFlight, submissions: z };
  function oe(i, u, g) {
    untrack(() => {
      if (typeof u == "number") {
        u && (a.go ? a.go(u) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const R = !u || u[0] === "?", { replace: B, resolve: x, scroll: _, state: b } = { replace: false, resolve: !R, scroll: true, ...g }, A = x ? i.resolvePath(u) : W(R && O.pathname || "", u);
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
    return i = i || useContext(te) || N, (u, g) => oe(i, u, g);
  }
  function ie(i) {
    const u = j[0];
    u && (o({ ...i, replace: u.replace, scroll: u.scroll }), j.length = 0);
  }
  function ce(i, u) {
    const g = M(e(), i.pathname), R = P;
    P = "preload";
    for (let B in g) {
      const { route: x, params: _ } = g[B];
      x.component && x.component.preload && x.component.preload();
      const { preload: b } = x;
      C = true, u && b && runWithOwner(n(), () => b({ params: _, location: { pathname: i.pathname, search: i.search, hash: i.hash, query: Y(i), state: null, key: "" }, intent: "preload" })), C = false;
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
    return W(s.path(), p, l());
  } };
}

export { $e as $, De as D, Ee as E, F, He as H, Ie as I, Ke as K, L, Me as M, Ne as N, Oe as O, Pe as P, Te as T, Ue as U, V, We as W, M as a, qe as q, te as t, ye as y, ze as z };
//# sourceMappingURL=routing-BSDkuvr3.mjs.map
