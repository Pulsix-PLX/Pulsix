import { ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { createSignal, onMount, onCleanup } from 'solid-js';

var h = ["<canvas", ' class="riv"></canvas>'];
const [w, I] = createSignal(true);
function R(t) {
  const [n, m] = createSignal(null);
  let e = null, o = null;
  return onMount(async () => {
    if (n()) try {
      const { Rive: a } = await import('../_/rive.mjs').then(function (n) { return n.r; });
      e = new a({ src: t.src, canvas: n(), autoplay: t.autoplay !== false, stateMachines: t.stateMachines, artboard: t.artboard, fit: t.fit || "contain", onLoad: () => {
        console.log("Animazione caricata!"), o = e.stateMachineInputs(t.stateMachines).find((c) => c.name === "Monthly"), console.log("Input trovato:", o);
      }, onLoadError: t.onErrorLoad });
    } catch (a) {
      console.error("Errore nell'inizializzazione di Rive:", a);
    }
  }), onCleanup(() => {
    e == null ? void 0 : e.stop();
  }), ssr(h, ssrHydrationKey() + ssrAttribute("width", escape(t.width, true) || 2e3, false) + ssrAttribute("height", escape(t.height, true) || 2e3, false));
}
const d = "_toggle_16j67_1", f = "_text_16j67_22", _ = "_activeText_16j67_27", b = { toggle: d, text: f, activeText: _ };

export { R, b, w };
//# sourceMappingURL=index.module-0iUivGU72.mjs.map
