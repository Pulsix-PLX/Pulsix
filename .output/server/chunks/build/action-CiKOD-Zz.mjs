import { getOwner, onCleanup, createSignal, startTransition, getListener, sharedConfig } from 'solid-js';
import { isServer, getRequestEvent } from 'solid-js/web';
import { L, P as Pe, M as Me, z as ze, H as He } from './routing-Th2JWmJV.mjs';

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
function M(e, t) {
  for (let r of t) if (r && e.startsWith(r)) return true;
  return false;
}
function F(e) {
  return JSON.stringify(e, (t, r) => q(r) ? Object.keys(r).sort().reduce((a, i) => (a[i] = r[i], a), {}) : r);
}
function q(e) {
  let t;
  return e != null && typeof e == "object" && (!(t = Object.getPrototypeOf(e)) || t === Object.prototype);
}
const S = /* @__PURE__ */ new Map();
function Y(e) {
  const t = L();
  return (...r) => e.apply({ r: t }, r);
}
function Q(e, t = {}) {
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
  return r.base = i, _(r, i);
}
function _(e, t) {
  return e.toString = () => {
    if (!t) throw new Error("Client Actions need explicit names if server rendered");
    return t;
  }, e.with = function(...r) {
    const a = function(...s) {
      return e.call(this, ...r, ...s);
    };
    a.base = e.base;
    const i = new URL(t, Pe);
    return i.searchParams.set("args", F(r)), _(a, (i.origin === "https://action" ? i.origin : "") + i.pathname + i.search);
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
  return D(s, (h) => h[0] = 0), d && d.forEach((h) => A.set(h, i[h])), await X(s, false), a != null ? { data: a } : void 0;
}

export { Q, S, Y };
//# sourceMappingURL=action-CiKOD-Zz.mjs.map
