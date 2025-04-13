import { ssr, ssrHydrationKey, escape, ssrAttribute, createComponent, ssrStyle } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, createEffect, onCleanup, Switch, Match } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { A as A$1 } from './components-CJF4pMQg.mjs';

var o = ["<div", ' class="', '" style="transform-style:preserve-3d;will-change:transform;transform:perspective(1000px) rotateX(0deg) rotateY(0deg);">', "</div>"], d = ["<div", ' style="', '">', "</div>"], y = ["<p", ' style="', '">', "</p>"], v = ["<button", ' style="', '">', "</button>"], $ = ["<a", ' style="', '"', ">", "</a>"];
const S = (e) => {
  const [n, w] = createSignal(false);
  return createEffect(() => {
    onCleanup(() => {
    });
  }), ssr(o, ssrHydrationKey(), `transform-gpu ${escape(e.class, true) || ""}`, escape(e.children));
}, x = (e) => ssr(d, ssrHydrationKey() + ssrAttribute("class", escape(e.class, true) || "", false), `background-color:${escape(e.color, true)};transform-style:preserve-3d`, escape(e.children)), A = (e) => {
  const n = `transform: translateZ(${e.translateZ || 0}px); transform-style: preserve-3d; transition: transform 0.2s ease;`;
  return createComponent(Switch, { get children() {
    return [createComponent(Match, { get when() {
      return e.as === "p";
    }, get children() {
      return ssr(y, ssrHydrationKey() + ssrAttribute("class", escape(e.class, true) || "", false), ssrStyle(n), escape(e.children));
    } }), createComponent(Match, { get when() {
      return e.as === "button";
    }, get children() {
      return ssr(v, ssrHydrationKey() + ssrAttribute("class", escape(e.class, true) || "", false), ssrStyle(n), escape(e.children));
    } }), createComponent(Match, { get when() {
      return e.as === "a" || e.href;
    }, get children() {
      return ssr($, ssrHydrationKey() + ssrAttribute("class", escape(e.class, true) || "", false), ssrStyle(n), ssrAttribute("href", escape(e.href, true), false) + ssrAttribute("target", escape(e.target, true), false), escape(e.children));
    } }), createComponent(Match, { get when() {
      return e.as === "A";
    }, get children() {
      return createComponent(A$1, { get class() {
        return e.class || "";
      }, style: n, get href() {
        return e.href || "";
      }, get target() {
        return e.target;
      }, get children() {
        return e.children;
      } });
    } }), createComponent(Match, { when: true, get children() {
      return ssr(d, ssrHydrationKey() + ssrAttribute("class", escape(e.class, true) || "", false), ssrStyle(n), escape(e.children));
    } })];
  } });
};

export { A, S, x };
//# sourceMappingURL=prova-UkNyxD49.mjs.map
