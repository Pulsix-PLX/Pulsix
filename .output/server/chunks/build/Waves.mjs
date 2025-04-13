import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { ssr, ssrHydrationKey } from 'solid-js/web';
import { onMount, onCleanup } from 'solid-js';

var p = ["<canvas", ' style="', '"></canvas>'];
function y() {
  let a, e, t, n, i;
  return onMount(() => {
    e = new Worker(new URL("./WavesWorker.tsx", globalThis._importMeta_.url), { type: "module" }), e.onmessage = (r) => {
      const { type: w, data: c } = r.data;
    };
    const o = () => {
      cancelAnimationFrame(i), t = window.innerWidth, n = window.innerHeight, a.width = t, a.height = n, e.postMessage({ type: "resize", width: t, height: n });
    };
    window.addEventListener("resize", o), e.postMessage({ type: "renderFrame" }), onCleanup(() => {
      e.terminate(), cancelAnimationFrame(i), window.removeEventListener("resize", o);
    });
  }), ssr(p, ssrHydrationKey(), "display:block;position:absolute;top:0;left:0;z-index:-1" + (";opacity:" + 0.8));
}

export { y as default };
//# sourceMappingURL=Waves.mjs.map
