import { createComponent, isServer, ssr, ssrHydrationKey, escape, getRequestEvent, delegateEvents, useAssets, spread } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount, createEffect, Show, Suspense, createSignal, onCleanup, createContext, createUniqueId, For, children, createMemo, getOwner, sharedConfig, useContext, createRenderEffect, untrack, on, createRoot } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { B as Bs } from '../_/nitro.mjs';
import { y } from './Menu-B3jw0GIl.mjs';
import { J } from './Cursor-6qc4Ma5i.mjs';
import { j } from './auth-BeHg-fWi.mjs';
import { M as Me$1, D as De$1, O as Oe$1, N as Ne$1, E as Ee$1, P as Pe$1, z as ze$1, T as Te$1, a as M$1, t as te, K as Ke$1, y as ye, q as qe$1, V, I as Ie$1 } from './routing-Th2JWmJV.mjs';
import { S } from './action-CiKOD-Zz.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import './components-Bjb1kgqQ.mjs';

const H = (e) => (t) => {
  const { base: n } = t, o = children(() => t.children), r = createMemo(() => Oe$1(o(), t.base || ""));
  let i;
  const a = Ne$1(e, r, () => i, { base: n, singleFlight: t.singleFlight, transformUrl: t.transformUrl });
  return e.create && e.create(a), createComponent(Ee$1.Provider, { value: a, get children() {
    return createComponent(Re, { routerState: a, get root() {
      return t.root;
    }, get preload() {
      return t.rootPreload || t.rootLoad;
    }, get children() {
      return [(i = getOwner()) && null, createComponent(Ce, { routerState: a, get branches() {
        return r();
      } })];
    } });
  } });
};
function Re(e) {
  const t = e.routerState.location, n = e.routerState.params, o = createMemo(() => e.preload && untrack(() => {
    Ke$1(true), e.preload({ params: n, location: t, intent: ze$1() || "initial" }), Ke$1(false);
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
function Ce(e) {
  if (isServer) {
    const r = getRequestEvent();
    if (r && r.router && r.router.dataOnly) {
      Ee(r, e.routerState, e.branches);
      return;
    }
    r && ((r.router || (r.router = {})).matches || (r.router.matches = e.routerState.matches().map(({ route: i, path: a, params: l }) => ({ path: i.originalPath, pattern: i.pattern, match: a, params: l, info: i.info }))));
  }
  const t = [];
  let n;
  const o = createMemo(on(e.routerState.matches, (r, i, a) => {
    let l = i && r.length === i.length;
    const h = [];
    for (let u = 0, p = r.length; u < p; u++) {
      const b = i && i[u], y = r[u];
      a && b && y.route.key === b.route.key ? h[u] = a[u] : (l = false, t[u] && t[u](), createRoot((S) => {
        t[u] = S, h[u] = Te$1(e.routerState, h[u - 1] || e.routerState.base, K(() => o()[u + 1]), () => e.routerState.matches()[u]);
      }));
    }
    return t.splice(r.length).forEach((u) => u()), a && l ? a : (n = h[0], h);
  }));
  return K(() => o() && n)();
}
const K = (e) => () => createComponent(Show, { get when() {
  return e();
}, keyed: true, children: (t) => createComponent(te.Provider, { value: t, get children() {
  return t.outlet();
} }) });
function Ee(e, t, n) {
  const o = new URL(e.request.url), r = M$1(n, new URL(e.router.previousUrl || e.request.url).pathname), i = M$1(n, o.pathname);
  for (let a = 0; a < i.length; a++) {
    (!r[a] || i[a].route !== r[a].route) && (e.router.dataOnly = true);
    const { route: l, params: h } = i[a];
    l.preload && l.preload({ params: h, location: t.location, intent: "preload" });
  }
}
function xe([e, t], n, o) {
  return [e, o ? (r) => t(o(r)) : t];
}
function Pe(e) {
  let t = false;
  const n = (r) => typeof r == "string" ? { value: r } : r, o = xe(createSignal(n(e.get()), { equals: (r, i) => r.value === i.value && r.state === i.state }), void 0, (r) => (!t && e.set(r), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), r));
  return e.init && onCleanup(e.init((r = e.get()) => {
    t = true, o[1](n(r)), t = false;
  })), H({ signal: o, create: e.create, utils: e.utils });
}
function Te(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Oe(e, t) {
  const n = e && document.getElementById(e);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function ke(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function Ne(e) {
  let t;
  const n = { value: e.url || (t = getRequestEvent()) && ke(t.request.url) || "" };
  return H({ signal: [() => n, (o) => Object.assign(n, o)] })(e);
}
function $e(e = true, t = false, n = "/_server", o) {
  return (r) => {
    const i = r.base.path(), a = r.navigatorFactory(r.base);
    let l, h;
    function u(s) {
      return s.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function p(s) {
      if (s.defaultPrevented || s.button !== 0 || s.metaKey || s.altKey || s.ctrlKey || s.shiftKey) return;
      const c = s.composedPath().find((I) => I instanceof Node && I.nodeName.toUpperCase() === "A");
      if (!c || t && !c.hasAttribute("link")) return;
      const m = u(c), d = m ? c.href.baseVal : c.href;
      if ((m ? c.target.baseVal : c.target) || !d && !c.hasAttribute("state")) return;
      const w = (c.getAttribute("rel") || "").split(/\s+/);
      if (c.hasAttribute("download") || w && w.includes("external")) return;
      const L = m ? new URL(d, document.baseURI) : new URL(d);
      if (!(L.origin !== window.location.origin || i && L.pathname && !L.pathname.toLowerCase().startsWith(i.toLowerCase()))) return [c, L];
    }
    function b(s) {
      const c = p(s);
      if (!c) return;
      const [m, d] = c, j = r.parsePath(d.pathname + d.search + d.hash), w = m.getAttribute("state");
      s.preventDefault(), a(j, { resolve: false, replace: m.hasAttribute("replace"), scroll: !m.hasAttribute("noscroll"), state: w ? JSON.parse(w) : void 0 });
    }
    function y(s) {
      const c = p(s);
      if (!c) return;
      const [m, d] = c;
      o && (d.pathname = o(d.pathname)), r.preloadRoute(d, m.getAttribute("preload") !== "false");
    }
    function S$1(s) {
      clearTimeout(l);
      const c = p(s);
      if (!c) return h = null;
      const [m, d] = c;
      h !== m && (o && (d.pathname = o(d.pathname)), l = setTimeout(() => {
        r.preloadRoute(d, m.getAttribute("preload") !== "false"), h = m;
      }, 20));
    }
    function U(s) {
      if (s.defaultPrevented) return;
      let c = s.submitter && s.submitter.hasAttribute("formaction") ? s.submitter.getAttribute("formaction") : s.target.getAttribute("action");
      if (!c) return;
      if (!c.startsWith("https://action/")) {
        const d = new URL(c, Pe$1);
        if (c = r.parsePath(d.pathname + d.search), !c.startsWith(n)) return;
      }
      if (s.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const m = S.get(c);
      if (m) {
        s.preventDefault();
        const d = new FormData(s.target, s.submitter);
        m.call({ r, f: s.target }, s.target.enctype === "multipart/form-data" ? d : new URLSearchParams(d));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", b), e && (document.addEventListener("mousemove", S$1, { passive: true }), document.addEventListener("focusin", y, { passive: true }), document.addEventListener("touchstart", y, { passive: true })), document.addEventListener("submit", U), onCleanup(() => {
      document.removeEventListener("click", b), e && (document.removeEventListener("mousemove", S$1), document.removeEventListener("focusin", y), document.removeEventListener("touchstart", y)), document.removeEventListener("submit", U);
    });
  };
}
function Ue(e) {
  if (isServer) return Ne(e);
  const t = () => {
    const o = window.location.pathname.replace(/^\/+/, "/") + window.location.search, r = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: o + window.location.hash, state: r };
  }, n = ye();
  return Pe({ get: t, set({ value: o, replace: r, scroll: i, state: a }) {
    r ? window.history.replaceState(qe$1(a), "", o) : window.history.pushState(a, "", o), Oe(decodeURIComponent(window.location.hash.slice(1)), i), V();
  }, init: (o) => Te(window, "popstate", Ie$1(o, (r) => {
    if (r && r < 0) return !n.confirm(r);
    {
      const i = t();
      return !n.confirm(i.value, { state: i.state });
    }
  })), create: $e(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (o) => window.history.go(o), beforeLeave: n } })(e);
}
const M = createContext(), B = ["title", "meta"], P = [], T = ["name", "http-equiv", "content", "charset", "media"].concat(["property"]), E = (e, t) => {
  const n = Object.fromEntries(Object.entries(e.props).filter(([o]) => t.includes(o)).sort());
  return (Object.hasOwn(n, "name") || Object.hasOwn(n, "property")) && (n.name = n.name || n.property, delete n.property), e.tag + JSON.stringify(n);
};
function je() {
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
    if (B.indexOf(n.tag) !== -1) {
      const i = n.tag === "title" ? P : T, a = E(n, i);
      e.has(a) || e.set(a, []);
      let l = e.get(a), h = l.length;
      l = [...l, n], e.set(a, l);
      let u = t(n);
      n.ref = u, spread(u, n.props);
      let p = null;
      for (var o = h - 1; o >= 0; o--) if (l[o] != null) {
        p = l[o];
        break;
      }
      return u.parentNode != document.head && document.head.appendChild(u), p && p.ref && p.ref.parentNode && document.head.removeChild(p.ref), h;
    }
    let r = t(n);
    return n.ref = r, spread(r, n.props), r.parentNode != document.head && document.head.appendChild(r), -1;
  }, removeTag(n, o) {
    const r = n.tag === "title" ? P : T, i = E(n, r);
    if (n.ref) {
      const a = e.get(i);
      if (a) {
        if (n.ref.parentNode) {
          n.ref.parentNode.removeChild(n.ref);
          for (let l = o - 1; l >= 0; l--) a[l] != null && document.head.appendChild(a[l].ref);
        }
        a[o] = null, e.set(i, a);
      } else n.ref.parentNode && n.ref.parentNode.removeChild(n.ref);
    }
  } };
}
function Ie() {
  const e = [];
  return useAssets(() => ssr(Ke(e))), { addTag(t) {
    if (B.indexOf(t.tag) !== -1) {
      const n = t.tag === "title" ? P : T, o = E(t, n), r = e.findIndex((i) => i.tag === t.tag && E(i, n) === o);
      r !== -1 && e.splice(r, 1);
    }
    return e.push(t), e.length;
  }, removeTag(t, n) {
  } };
}
const _e = (e) => {
  const t = isServer ? Ie() : je();
  return createComponent(M.Provider, { value: t, get children() {
    return e.children;
  } });
}, Fe = (e, t, n) => (qe({ tag: e, props: t, setting: n, id: createUniqueId(), get name() {
  return t.name || t.property;
} }), null);
function qe(e) {
  const t = useContext(M);
  if (!t) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const n = t.addTag(e);
    onCleanup(() => t.removeTag(e, n));
  });
}
function Ke(e) {
  return e.map((t) => {
    var _a, _b;
    const o = Object.keys(t.props).map((i) => i === "children" ? "" : ` ${i}="${escape(t.props[i], true)}"`).join("");
    let r = t.props.children;
    return Array.isArray(r) && (r = r.join("")), ((_a = t.setting) == null ? void 0 : _a.close) ? `<${t.tag} data-sm="${t.id}"${o}>${((_b = t.setting) == null ? void 0 : _b.escape) ? escape(r) : r || ""}</${t.tag}>` : `<${t.tag} data-sm="${t.id}"${o}/>`;
  }).join("");
}
const De = (e) => Fe("title", e, { escape: true, close: true });
var He = ["<div", ` class="fancy-spinner-container"><style>
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
        </style><div class="fancy-spinner">`, "</div></div>"], Me = ["<i", ' class="fancy-spinner-particle-i" style="', '"><b class="fancy-spinner-particle-b" style="', '"></b></i>'];
const x = 50, Be = 100, We = 3, ze = () => {
  const e = Array.from({ length: x });
  return ssr(He, ssrHydrationKey(), escape(createComponent(For, { each: e, children: (t, n) => {
    const o = n() + 1, r = o / x * 360, i = o * (We / x);
    return ssr(Me, ssrHydrationKey(), `transform:rotate(${escape(r, true)}deg) translate3d(${escape(Be, true)}px, 0, 0)`, `animation-delay:${escape(i, true)}s`);
  } })));
};
var Ve = ["<div", ' class="', '">', "</div>"], Ge = ["<div", ">Caricamento route...</div>"];
const Je = ["/LoginRegistration"], Xe = ["/", "/LoginRegistration", "/LoginRegistration/registration", "/LoginRegistration/Login", "/login"], Qe = (e) => {
  const t = Me$1(), n = De$1();
  let o;
  return createEffect(() => {
    const r = j.isLoading, i = j.isAuthenticated, a = n.pathname;
    if (r) {
      console.log("Effect Exit: Still loading.");
      return;
    }
    console.log(a), o = Je.includes(a);
    const l = Xe.includes(a);
    i || l || (console.log(`NOT AUTHENTICATED on PROTECTED path (${a}). Redirecting to /LoginRegistration.`), t("/LoginRegistration", { replace: true }));
  }), createComponent(_e, { get children() {
    return [createComponent(De, { children: "Pulsix" }), createComponent(J, {}), createComponent(Show, { get when() {
      return !j.isLoading;
    }, get fallback() {
      return ssr(Ve, ssrHydrationKey(), `${o ? "bg-black" : ""} fixed inset-0 flex items-center justify-center z-50`, escape(createComponent(ze, {})));
    }, get children() {
      return [createComponent(y, {}), createComponent(Suspense, { get fallback() {
        return ssr(Ge, ssrHydrationKey());
      }, get children() {
        return e.children;
      } })];
    } })];
  } });
};
function vt() {
  return onMount(() => {
    j.isAuthenticated || j.initialize();
  }), createComponent(Ue, { root: Qe, get children() {
    return createComponent(Bs, {});
  } });
}

export { vt as default };
//# sourceMappingURL=app-Cv8VhbCk.mjs.map
