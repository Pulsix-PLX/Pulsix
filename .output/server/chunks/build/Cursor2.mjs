import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, onCleanup } from 'solid-js';

var L = ["<div", ' class="', '" style="', '"></div>'], _ = ["<div", ' class="cursor-magnetic-ring" style="', '"></div>'], D = ["<div", ' class="cursor-trail-particle" style="', '"></div>'];
const j = () => {
  const [s, P] = createSignal({ x: 0, y: 0 }), [X, A] = createSignal([]), [l, w] = createSignal(false), [v, g] = createSignal(false), [O, M] = createSignal({ x: 0, y: 0 }), [S, b] = createSignal({ x: 0, y: 0 }), [y, p] = createSignal(false), T = 8, k = 15;
  return onMount(() => {
    let c = 0, a = 0, x = performance.now();
    const E = document.createElement("style");
    E.textContent = "* { cursor: none !important; }", document.head.appendChild(E);
    const $ = (t) => {
      const e = performance.now(), o = e - x;
      if (o > 0) {
        const i = Math.abs((t.clientX - c) / o) * 20, d = Math.abs((t.clientY - a) / o) * 20, Y = Math.min(Math.sqrt(i * i + d * d), 10);
        M({ x: i, y: d }), document.documentElement.style.setProperty("--cursor-speed", Y);
      }
      b(s()), P({ x: t.clientX, y: t.clientY }), c = t.clientX, a = t.clientY, x = e;
    }, f = (t) => {
      const e = t.target, o = e.tagName === "INPUT" || e.tagName === "TEXTAREA", i = e.tagName === "A" || e.tagName === "BUTTON" || e.classList.contains("clickable") || e.closest("button") || e.closest("a") || o;
      p(o), w(i);
    }, N = (t) => {
      g(true), C(t.clientX, t.clientY);
      const e = t.target, o = e.tagName === "INPUT" || e.tagName === "TEXTAREA";
      p(o);
    }, I = () => {
      g(false);
    }, C = (t, e) => {
    }, U = setInterval(() => {
      A((t) => [...t, { ...s(), timestamp: Date.now() }].slice(-8));
    }, k), h = (t) => {
      const e = t.target, o = t.relatedTarget;
      (e.tagName === "INPUT" || e.tagName === "TEXTAREA") && (!o || o.tagName !== "INPUT" && o.tagName !== "TEXTAREA") && p(false);
    };
    document.addEventListener("mousemove", $), document.addEventListener("mouseover", f), document.addEventListener("mouseout", h), document.addEventListener("mousedown", N), document.addEventListener("mouseup", I), document.body.style.cursor = "none", onCleanup(() => {
      document.removeEventListener("mousemove", $), document.removeEventListener("mouseover", f), document.removeEventListener("mouseout", h), document.removeEventListener("mousedown", N), document.removeEventListener("mouseup", I), clearInterval(U);
    });
  }), [X().map((c, a) => ssr(D, ssrHydrationKey(), `left:${escape(c.x, true)}px;top:${escape(c.y, true)}px` + (";opacity:" + escape(a, true) / escape(T, true)) + `;transform:scale(${0.5 + escape(a, true) / escape(T, true) / 2});animation-delay:${escape(a, true) * 50}ms`)), ssr(L, ssrHydrationKey(), `cursor-outer ${l() ? "hovering" : ""} ${v() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px`), ssr(L, ssrHydrationKey(), `cursor-inner ${l() ? "hovering" : ""} ${v() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px`), ssr(_, ssrHydrationKey(), `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px` + (";opacity:" + (l() ? 1 : 0)) + `;transform:translate(-50%, -50%) scale(${l() ? 1 : 0}) rotate(${escape(s().x, true) / 5}deg)`)];
};

export { j as default };
//# sourceMappingURL=Cursor2.mjs.map
