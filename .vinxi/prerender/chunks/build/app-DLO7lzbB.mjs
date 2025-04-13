import { createComponent, isServer, ssr, ssrHydrationKey, escape, getRequestEvent, delegateEvents, useAssets, spread } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { Suspense, createContext, createUniqueId, createSignal, onMount, onCleanup, sharedConfig, useContext, createRenderEffect, children, createMemo, getOwner, untrack, Show, on, createRoot } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { y as ys } from '../_/nitro.mjs';
import { y } from './Menu-OQmUNT5t.mjs';
import { O as Oe$1, N as Ne$1, E as Ee, P as Pe, z as ze, T as Te, a as M$1, t as te, K as Ke$1, y as ye, q as qe$1, V as V$1, I as Ie$1 } from './routing-BSDkuvr3.mjs';
import { S } from './action-BVKOmiKt.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import './components-CJF4pMQg.mjs';

const J = (e) => (t) => {
  const { base: n } = t, o = children(() => t.children), r = createMemo(() => Oe$1(o(), t.base || ""));
  let a;
  const s = Ne$1(e, r, () => a, { base: n, singleFlight: t.singleFlight, transformUrl: t.transformUrl });
  return e.create && e.create(s), createComponent(Ee.Provider, { value: s, get children() {
    return createComponent(Ce, { routerState: s, get root() {
      return t.root;
    }, get preload() {
      return t.rootPreload || t.rootLoad;
    }, get children() {
      return [(a = getOwner()) && null, createComponent(Ne, { routerState: s, get branches() {
        return r();
      } })];
    } });
  } });
};
function Ce(e) {
  const t = e.routerState.location, n = e.routerState.params, o = createMemo(() => e.preload && untrack(() => {
    Ke$1(true), e.preload({ params: n, location: t, intent: ze() || "initial" }), Ke$1(false);
  }));
  return createComponent(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (r) => createComponent(r, { params: n, location: t, get data() {
    return o();
  }, get children() {
    return e.children;
  } }) });
}
function Ne(e) {
  if (isServer) {
    const r = getRequestEvent();
    if (r && r.router && r.router.dataOnly) {
      $e(r, e.routerState, e.branches);
      return;
    }
    r && ((r.router || (r.router = {})).matches || (r.router.matches = e.routerState.matches().map(({ route: a, path: s, params: u }) => ({ path: a.originalPath, pattern: a.pattern, match: s, params: u, info: a.info }))));
  }
  const t = [];
  let n;
  const o = createMemo(on(e.routerState.matches, (r, a, s) => {
    let u = a && r.length === a.length;
    const g = [];
    for (let l = 0, y = r.length; l < y; l++) {
      const L = a && a[l], b = r[l];
      s && L && b.route.key === L.route.key ? g[l] = s[l] : (u = false, t[l] && t[l](), createRoot((E) => {
        t[l] = E, g[l] = Te(e.routerState, g[l - 1] || e.routerState.base, V(() => o()[l + 1]), () => e.routerState.matches()[l]);
      }));
    }
    return t.splice(r.length).forEach((l) => l()), s && u ? s : (n = g[0], g);
  }));
  return V(() => o() && n)();
}
const V = (e) => () => createComponent(Show, { get when() {
  return e();
}, keyed: true, children: (t) => createComponent(te.Provider, { value: t, get children() {
  return t.outlet();
} }) });
function $e(e, t, n) {
  const o = new URL(e.request.url), r = M$1(n, new URL(e.router.previousUrl || e.request.url).pathname), a = M$1(n, o.pathname);
  for (let s = 0; s < a.length; s++) {
    (!r[s] || a[s].route !== r[s].route) && (e.router.dataOnly = true);
    const { route: u, params: g } = a[s];
    u.preload && u.preload({ params: g, location: t.location, intent: "preload" });
  }
}
function Se([e, t], n, o) {
  return [e, o ? (r) => t(o(r)) : t];
}
function ke(e) {
  let t = false;
  const n = (r) => typeof r == "string" ? { value: r } : r, o = Se(createSignal(n(e.get()), { equals: (r, a) => r.value === a.value && r.state === a.state }), void 0, (r) => (!t && e.set(r), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), r));
  return e.init && onCleanup(e.init((r = e.get()) => {
    t = true, o[1](n(r)), t = false;
  })), J({ signal: o, create: e.create, utils: e.utils });
}
function Ie(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Oe(e, t) {
  const n = e && document.getElementById(e);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function Ue(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function Me(e) {
  let t;
  const n = { value: e.url || (t = getRequestEvent()) && Ue(t.request.url) || "" };
  return J({ signal: [() => n, (o) => Object.assign(n, o)] })(e);
}
function je(e = true, t = false, n = "/_server", o) {
  return (r) => {
    const a = r.base.path(), s = r.navigatorFactory(r.base);
    let u, g;
    function l(c) {
      return c.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function y(c) {
      if (c.defaultPrevented || c.button !== 0 || c.metaKey || c.altKey || c.ctrlKey || c.shiftKey) return;
      const i = c.composedPath().find((C) => C instanceof Node && C.nodeName.toUpperCase() === "A");
      if (!i || t && !i.hasAttribute("link")) return;
      const m = l(i), d = m ? i.href.baseVal : i.href;
      if ((m ? i.target.baseVal : i.target) || !d && !i.hasAttribute("state")) return;
      const T = (i.getAttribute("rel") || "").split(/\s+/);
      if (i.hasAttribute("download") || T && T.includes("external")) return;
      const P = m ? new URL(d, document.baseURI) : new URL(d);
      if (!(P.origin !== window.location.origin || a && P.pathname && !P.pathname.toLowerCase().startsWith(a.toLowerCase()))) return [i, P];
    }
    function L(c) {
      const i = y(c);
      if (!i) return;
      const [m, d] = i, A = r.parsePath(d.pathname + d.search + d.hash), T = m.getAttribute("state");
      c.preventDefault(), s(A, { resolve: false, replace: m.hasAttribute("replace"), scroll: !m.hasAttribute("noscroll"), state: T ? JSON.parse(T) : void 0 });
    }
    function b(c) {
      const i = y(c);
      if (!i) return;
      const [m, d] = i;
      o && (d.pathname = o(d.pathname)), r.preloadRoute(d, m.getAttribute("preload") !== "false");
    }
    function E(c) {
      clearTimeout(u);
      const i = y(c);
      if (!i) return g = null;
      const [m, d] = i;
      g !== m && (o && (d.pathname = o(d.pathname)), u = setTimeout(() => {
        r.preloadRoute(d, m.getAttribute("preload") !== "false"), g = m;
      }, 20));
    }
    function R(c) {
      if (c.defaultPrevented) return;
      let i = c.submitter && c.submitter.hasAttribute("formaction") ? c.submitter.getAttribute("formaction") : c.target.getAttribute("action");
      if (!i) return;
      if (!i.startsWith("https://action/")) {
        const d = new URL(i, Pe);
        if (i = r.parsePath(d.pathname + d.search), !i.startsWith(n)) return;
      }
      if (c.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const m = S.get(i);
      if (m) {
        c.preventDefault();
        const d = new FormData(c.target, c.submitter);
        m.call({ r, f: c.target }, c.target.enctype === "multipart/form-data" ? d : new URLSearchParams(d));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", L), e && (document.addEventListener("mousemove", E, { passive: true }), document.addEventListener("focusin", b, { passive: true }), document.addEventListener("touchstart", b, { passive: true })), document.addEventListener("submit", R), onCleanup(() => {
      document.removeEventListener("click", L), e && (document.removeEventListener("mousemove", E), document.removeEventListener("focusin", b), document.removeEventListener("touchstart", b)), document.removeEventListener("submit", R);
    });
  };
}
function qe(e) {
  if (isServer) return Me(e);
  const t = () => {
    const o = window.location.pathname.replace(/^\/+/, "/") + window.location.search, r = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: o + window.location.hash, state: r };
  }, n = ye();
  return ke({ get: t, set({ value: o, replace: r, scroll: a, state: s }) {
    r ? window.history.replaceState(qe$1(s), "", o) : window.history.pushState(s, "", o), Oe(decodeURIComponent(window.location.hash.slice(1)), a), V$1();
  }, init: (o) => Ie(window, "popstate", Ie$1(o, (r) => {
    if (r && r < 0) return !n.confirm(r);
    {
      const a = t();
      return !n.confirm(a.value, { state: a.state });
    }
  })), create: je(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (o) => window.history.go(o), beforeLeave: n } })(e);
}
const z = createContext(), G = ["title", "meta"], M = [], j = ["name", "http-equiv", "content", "charset", "media"].concat(["property"]), I = (e, t) => {
  const n = Object.fromEntries(Object.entries(e.props).filter(([o]) => t.includes(o)).sort());
  return (Object.hasOwn(n, "name") || Object.hasOwn(n, "property")) && (n.name = n.name || n.property, delete n.property), e.tag + JSON.stringify(n);
};
function Xe() {
  if (!sharedConfig.context) {
    const n = document.head.querySelectorAll("[data-sm]");
    Array.prototype.forEach.call(n, (o) => o.parentNode.removeChild(o));
  }
  const e = /* @__PURE__ */ new Map();
  function t(n) {
    if (n.ref) return n.ref;
    let o = document.querySelector(`[data-sm="${n.id}"]`);
    return o ? (o.tagName.toLowerCase() !== n.tag && (o.parentNode && o.parentNode.removeChild(o), o = document.createElement(n.tag)), o.removeAttribute("data-sm")) : o = document.createElement(n.tag), o;
  }
  return { addTag(n) {
    if (G.indexOf(n.tag) !== -1) {
      const a = n.tag === "title" ? M : j, s = I(n, a);
      e.has(s) || e.set(s, []);
      let u = e.get(s), g = u.length;
      u = [...u, n], e.set(s, u);
      let l = t(n);
      n.ref = l, spread(l, n.props);
      let y = null;
      for (var o = g - 1; o >= 0; o--) if (u[o] != null) {
        y = u[o];
        break;
      }
      return l.parentNode != document.head && document.head.appendChild(l), y && y.ref && y.ref.parentNode && document.head.removeChild(y.ref), g;
    }
    let r = t(n);
    return n.ref = r, spread(r, n.props), r.parentNode != document.head && document.head.appendChild(r), -1;
  }, removeTag(n, o) {
    const r = n.tag === "title" ? M : j, a = I(n, r);
    if (n.ref) {
      const s = e.get(a);
      if (s) {
        if (n.ref.parentNode) {
          n.ref.parentNode.removeChild(n.ref);
          for (let u = o - 1; u >= 0; u--) s[u] != null && document.head.appendChild(s[u].ref);
        }
        s[o] = null, e.set(a, s);
      } else n.ref.parentNode && n.ref.parentNode.removeChild(n.ref);
    }
  } };
}
function Fe() {
  const e = [];
  return useAssets(() => ssr(Ye(e))), { addTag(t) {
    if (G.indexOf(t.tag) !== -1) {
      const n = t.tag === "title" ? M : j, o = I(t, n), r = e.findIndex((a) => a.tag === t.tag && I(a, n) === o);
      r !== -1 && e.splice(r, 1);
    }
    return e.push(t), e.length;
  }, removeTag(t, n) {
  } };
}
const Ke = (e) => {
  const t = isServer ? Fe() : Xe();
  return createComponent(z.Provider, { value: t, get children() {
    return e.children;
  } });
}, Be = (e, t, n) => (He({ tag: e, props: t, setting: n, id: createUniqueId(), get name() {
  return t.name || t.property;
} }), null);
function He(e) {
  const t = useContext(z);
  if (!t) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const n = t.addTag(e);
    onCleanup(() => t.removeTag(e, n));
  });
}
function Ye(e) {
  return e.map((t) => {
    var _a, _b;
    const o = Object.keys(t.props).map((a) => a === "children" ? "" : ` ${a}="${escape(t.props[a], true)}"`).join("");
    let r = t.props.children;
    return Array.isArray(r) && (r = r.join("")), ((_a = t.setting) == null ? void 0 : _a.close) ? `<${t.tag} data-sm="${t.id}"${o}>${((_b = t.setting) == null ? void 0 : _b.escape) ? escape(r) : r || ""}</${t.tag}>` : `<${t.tag} data-sm="${t.id}"${o}/>`;
  }).join("");
}
const Ve = (e) => Be("title", e, { escape: true, close: true });
var _ = ["<div", ' class="', '" style="', '"></div>'], _e = ["<div", ' class="cursor-magnetic-ring" style="', '"></div>'], De = ["<div", ' class="cursor-trail-particle" style="', '"></div>'];
const We = () => {
  const [e, t] = createSignal({ x: 0, y: 0 }), [n, o] = createSignal([]), [r, a] = createSignal(false), [s, u] = createSignal(false), [g, l] = createSignal({ x: 0, y: 0 }), [y, L] = createSignal({ x: 0, y: 0 }), [b, E] = createSignal(false), R = 8, c = 15;
  return onMount(() => {
    let i = 0, m = 0, d = performance.now();
    const A = document.createElement("style");
    A.textContent = "* { cursor: none !important; }", document.head.appendChild(A);
    const T = (f) => {
      const h = performance.now(), w = h - d;
      if (w > 0) {
        const N = Math.abs((f.clientX - i) / w) * 20, U = Math.abs((f.clientY - m) / w) * 20, ee = Math.min(Math.sqrt(N * N + U * U), 10);
        l({ x: N, y: U }), document.documentElement.style.setProperty("--cursor-speed", ee);
      }
      L(e()), t({ x: f.clientX, y: f.clientY }), i = f.clientX, m = f.clientY, d = h;
    }, P = (f) => {
      const h = f.target, w = h.tagName === "INPUT" || h.tagName === "TEXTAREA", N = h.tagName === "A" || h.tagName === "BUTTON" || h.classList.contains("clickable") || h.closest("button") || h.closest("a") || w;
      E(w), a(N);
    }, C = (f) => {
      u(true), Q(f.clientX, f.clientY);
      const h = f.target, w = h.tagName === "INPUT" || h.tagName === "TEXTAREA";
      E(w);
    }, F = () => {
      u(false);
    }, Q = (f, h) => {
    }, Z = setInterval(() => {
      o((f) => [...f, { ...e(), timestamp: Date.now() }].slice(-8));
    }, c), K = (f) => {
      const h = f.target, w = f.relatedTarget;
      (h.tagName === "INPUT" || h.tagName === "TEXTAREA") && (!w || w.tagName !== "INPUT" && w.tagName !== "TEXTAREA") && E(false);
    };
    document.addEventListener("mousemove", T), document.addEventListener("mouseover", P), document.addEventListener("mouseout", K), document.addEventListener("mousedown", C), document.addEventListener("mouseup", F), document.body.style.cursor = "none", onCleanup(() => {
      document.removeEventListener("mousemove", T), document.removeEventListener("mouseover", P), document.removeEventListener("mouseout", K), document.removeEventListener("mousedown", C), document.removeEventListener("mouseup", F), clearInterval(Z);
    });
  }), [n().map((i, m) => ssr(De, ssrHydrationKey(), `left:${escape(i.x, true)}px;top:${escape(i.y, true)}px` + (";opacity:" + escape(m, true) / escape(R, true)) + `;transform:scale(${0.5 + escape(m, true) / escape(R, true) / 2});animation-delay:${escape(m, true) * 50}ms`)), ssr(_, ssrHydrationKey(), `cursor-outer ${r() ? "hovering" : ""} ${s() ? "clicking" : ""} ${b() ? "text-input" : ""}`, `left:${escape(e().x, true)}px;top:${escape(e().y, true)}px`), ssr(_, ssrHydrationKey(), `cursor-inner ${r() ? "hovering" : ""} ${s() ? "clicking" : ""} ${b() ? "text-input" : ""}`, `left:${escape(e().x, true)}px;top:${escape(e().y, true)}px`), ssr(_e, ssrHydrationKey(), `left:${escape(e().x, true)}px;top:${escape(e().y, true)}px` + (";opacity:" + (r() ? 1 : 0)) + `;transform:translate(-50%, -50%) scale(${r() ? 1 : 0}) rotate(${escape(e().x, true) / 5}deg)`)];
};
function ct() {
  return createComponent(qe, { root: (e) => createComponent(Ke, { get children() {
    return [createComponent(Ve, { children: "Pulsix" }), createComponent(We, {}), createComponent(y, {}), createComponent(Suspense, { get children() {
      return e.children;
    } })];
  } }), get children() {
    return createComponent(ys, {});
  } });
}

export { ct as default };
//# sourceMappingURL=app-DLO7lzbB.mjs.map
