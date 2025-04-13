import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { createSignal, onMount, onCleanup, createResource, createEffect, Show, Suspense } from 'solid-js';

var R = ["<div", ' style="', '">Caricamento Scena 3D...</div>'], S = ["<div", ' style="', '"><strong>Errore Caricamento Spline</strong><pre style="', '">', "</pre></div>"], E = ["<canvas", ' style="', '"></canvas>'], z = ["<div", ' class="landing-container"> <div class="spline-wrapper" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div></div>"];
function N(e) {
  const [C, $] = createSignal(false), y = () => {
    switch (console.log(`[Card3D ${e.id}] Calcolo URL per colore: ${e.color}`), e.color) {
      case "purple":
        return "https://prod.spline.design/j0mVtZ9nPBu6RBRy/scene.splinecode";
      default:
        return "https://prod.spline.design/mzKeaOgjz2ILR0uC/scene.splinecode";
    }
  };
  onMount(() => {
    console.error(`[Card3D ${e.id}] Errore: Canvas ref non trovato in onMount!`), onCleanup(() => {
      console.log(`[Card3D ${e.id}] Cleanup: reset isCanvasReady.`), $(false);
    });
  });
  const [n] = createResource(() => C() ? y() : null, async (a) => {
    throw console.error(`[Card3D ${e.id}] Fetcher: CanvasRef \xE8 nullo! Impossibile caricare.`), new Error("Canvas element reference is missing.");
  });
  return createEffect((a) => {
    const t = n();
    return a && a !== t && (console.log(`[Card3D ${e.id}] createEffect[cleanup]: Dispose istanza Spline precedente.`), a.dispose()), t;
  }, void 0), onCleanup(() => {
    const a = n.latest;
    a ? (console.log(`[Card3D ${e.id}] onCleanup: Dispose istanza Spline finale.`), a.dispose()) : console.log(`[Card3D ${e.id}] onCleanup: Nessuna istanza Spline da pulire.`);
  }), createEffect(() => {
    var _a;
    const a = n();
    if (!a || n.loading || n.error) return;
    console.log(`[Card3D ${e.id}] Effetto Variabili: Esecuzione...`);
    const t = "Group 2", b = { x: 1.2, y: 1.2, z: 1.2 }, c = "wallet_name", d = e.name, u = "balance", v = (r) => {
      switch (r) {
        case "EUR":
          return "\u20AC";
        case "USD":
          return "$";
        case "GBP":
          return "\xA3";
        default:
          return r;
      }
    }, g = `${e.balance} ${v(e.currency)}`;
    console.log(`[Card3D ${e.id}] -> Aggiorno: ${c}=${d}, ${u}=${g}`);
    try {
      a.setVariable(c, d), a.setVariable(u, g);
      const r = a.findObjectByName(t);
      r ? typeof ((_a = r == null ? void 0 : r.scale) == null ? void 0 : _a.x) == "number" ? Object.assign(r.scale, b) : console.warn(`[Card3D ${e.id}] -> ATTENZIONE: 'scale' non trovato su '${t}'.`) : console.warn(`[Card3D ${e.id}] -> ATTENZIONE: Oggetto '${t}' non trovato.`);
    } catch (r) {
      console.error(`[Card3D ${e.id}] -> ERRORE durante interazione Spline:`, r);
    }
  }), ssr(z, ssrHydrationKey(), "width:80%;height:500px;position:relative", escape(createComponent(Show, { get when() {
    return n.loading;
  }, get children() {
    return ssr(R, ssrHydrationKey(), "position:absolute;inset:0;background:rgba(230, 230, 230, 0.8);display:flex;justify-content:center;align-items:center;border-radius:8px;z-index:10;color:#555;font-size:1.1em");
  } })), escape(createComponent(Show, { get when() {
    return n.error && !n.loading;
  }, get children() {
    var _a;
    return ssr(S, ssrHydrationKey(), "position:absolute;inset:0;background:rgba(255, 200, 200, 0.9);color:darkred;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px;border-radius:8px;z-index:10;text-align:center;font-size:0.9em", "margin-top:8px;white-space:pre-wrap;max-height:100px;overflow:auto", escape((_a = n.error) == null ? void 0 : _a.message) || escape(JSON.stringify(n.error)));
  } })), escape(createComponent(Suspense, { get fallback() {
    return [];
  }, get children() {
    return ssr(E, ssrHydrationKey(), "width:100%;height:100%;display:block;outline:none" + (";opacity:" + (n.loading || n.error ? 0.3 : 1)) + ";background-color:transparent;transition:opacity 0.4s ease-in-out");
  } })));
}

export { N };
//# sourceMappingURL=index-Bep36fvr2.mjs.map
