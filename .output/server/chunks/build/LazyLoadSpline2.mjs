import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { createSignal, onMount, onCleanup, Show } from 'solid-js';

var m = ["<div", ' style="', '">Caricamento Scena 3D...</div>'], f = ["<div", ' style="', '">', "</div>"];
const y = (e) => {
  const [a, n] = createSignal(false);
  onMount(() => {
    if (typeof IntersectionObserver > "u") {
      console.warn("IntersectionObserver non supportato, caricamento immediato."), n(true);
      return;
    }
    const r = new IntersectionObserver(([s]) => {
      s.isIntersecting && (n(true), r.disconnect());
    }, { rootMargin: e.rootMargin || "150px 0px", threshold: e.threshold || 0.01 });
    onCleanup(() => {
      r.disconnect();
    });
  });
  const c = ssr(m, ssrHydrationKey(), "display:flex;align-items:center;justify-content:center;height:100%;width:100%;background:#eee;color:#aaa;font-size:1.2em;border-radius:8px");
  return ssr(f, ssrHydrationKey(), "min-height:" + (escape(e.placeholderHeight, true) || "500px") + (";width:" + (escape(e.placeholderWidth, true) || "80%")) + ";position:relative", escape(createComponent(Show, { get when() {
    return a();
  }, get fallback() {
    return e.placeholderContent || c;
  }, get children() {
    return e.children;
  } })));
};

export { y as default };
//# sourceMappingURL=LazyLoadSpline2.mjs.map
