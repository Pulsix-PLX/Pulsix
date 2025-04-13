import { ssr, ssrHydrationKey, ssrAttribute, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, onCleanup } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

var d = ["<canvas", ' class="riv"></canvas>'];
const [z, w] = createSignal(true);
function I(t) {
  const [n, f] = createSignal(null);
  let a = null, i = null;
  return onMount(async () => {
    if (n()) try {
      const { Rive: e } = await import('../_/rive.mjs').then(function (n) { return n.r; });
      a = new e({ src: t.src, canvas: n(), autoplay: t.autoplay !== false, stateMachines: t.stateMachines, artboard: t.artboard, fit: t.fit || "contain", onLoad: () => {
        console.log("Animazione caricata!"), i = a.stateMachineInputs(t.stateMachines).find((l) => l.name === "Monthly"), console.log("Input trovato:", i);
      }, onLoadError: t.onErrorLoad });
    } catch (e) {
      console.error("Errore nell'inizializzazione di Rive:", e);
    }
  }), onCleanup(() => {
    a == null ? void 0 : a.stop();
  }), ssr(d, ssrHydrationKey() + ssrAttribute("width", escape(t.width, true) || 2e3, false) + ssrAttribute("height", escape(t.height, true) || 2e3, false));
}

export { I as default, w as setValue, z as value };
//# sourceMappingURL=riv.mjs.map
