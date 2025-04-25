import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, onCleanup, Show } from 'solid-js';

var w = ["<div", ' class="', '" style="', '"></div>'], D = ["<div", ' class="cursor-magnetic-ring" style="', '"></div>'], O = ["<div", ' class="cursor-trail-particle" style="', '"></div>'];
const [q, G] = createSignal(true), J = () => {
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
  }), createComponent(Show, { get when() {
    return q();
  }, get children() {
    return [C().map((c, a) => ssr(O, ssrHydrationKey(), `left:${escape(c.x, true)}px;top:${escape(c.y, true)}px` + (";opacity:" + escape(a, true) / escape(T, true)) + `;transform:scale(${0.5 + escape(a, true) / escape(T, true) / 2});animation-delay:${escape(a, true) * 50}ms`)), ssr(w, ssrHydrationKey(), `cursor-outer ${l() ? "hovering" : ""} ${v() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px`), ssr(w, ssrHydrationKey(), `cursor-inner ${l() ? "hovering" : ""} ${v() ? "clicking" : ""} ${y() ? "text-input" : ""}`, `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px`), ssr(D, ssrHydrationKey(), `left:${escape(s().x, true)}px;top:${escape(s().y, true)}px` + (";opacity:" + (l() ? 1 : 0)) + `;transform:translate(-50%, -50%) scale(${l() ? 1 : 0}) rotate(${escape(s().x, true) / 5}deg)`)];
  } });
};

export { G, J };
//# sourceMappingURL=Cursor-6qc4Ma5i.mjs.map
