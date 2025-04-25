import { ssr, ssrHydrationKey, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount, onCleanup, createResource, createEffect, Show, Suspense } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { M as Me } from '../_/nitro.mjs';
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

var S = ["<div", ' style="', '">Loading...</div>'], N = ["<div", ' style="', '"><strong>Errore Caricamento Spline</strong><pre style="', '">', "</pre></div>"], z = ["<canvas", ' style="', '"></canvas>'], O = ["<img", ' class="absolute ml-[20.7vw] -mt-[6vw] w-23" src="/icons/edit.png">'], _ = ["<div", ' class="landing-container"><div class="spline-wrapper" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div></div>"];
function Z(e) {
  const [C, h] = createSignal(false), w = () => {
    switch (console.log(`[Card3D ${e.id}] Calcolo URL per colore: ${e.color}`), e.color) {
      case "purple":
        return "https://prod.spline.design/j0mVtZ9nPBu6RBRy/scene.splinecode";
      default:
        return "https://prod.spline.design/mzKeaOgjz2ILR0uC/scene.splinecode";
    }
  };
  onMount(() => {
    console.error(`[Card3D ${e.id}] Errore: Canvas ref non trovato in onMount!`), onCleanup(() => {
      console.log(`[Card3D ${e.id}] Cleanup: reset isCanvasReady.`), h(false);
    });
  });
  const [n] = createResource(() => C() ? w() : null, async (r) => {
    throw console.error(`[Card3D ${e.id}] Fetcher: CanvasRef \xE8 nullo! Impossibile caricare.`), new Error("Canvas element reference is missing.");
  });
  createEffect((r) => {
    const a = n();
    return r && r !== a && (console.log(`[Card3D ${e.id}] createEffect[cleanup]: Dispose istanza Spline precedente.`), r.dispose()), a;
  }, void 0), onCleanup(() => {
    const r = n.latest;
    r ? (console.log(`[Card3D ${e.id}] onCleanup: Dispose istanza Spline finale.`), r.dispose()) : console.log(`[Card3D ${e.id}] onCleanup: Nessuna istanza Spline da pulire.`);
  }), createEffect(() => {
    var _a;
    const r = n();
    if (!r || n.loading || n.error) return;
    console.log(`[Card3D ${e.id}] Effetto Variabili: Esecuzione...`);
    const a = "Group 2", D = { x: 1.2, y: 1.2, z: 1.2 }, d = "wallet_name", g = e.name, m = "balance", y = (t) => {
      switch (t) {
        case "EUR":
          return "\u20AC";
        case "USD":
          return "$";
        case "GBP":
          return "\xA3";
        case "CHF":
          return "CHF";
        case "CAD":
          return "C$";
        case "AUD":
          return "A$";
        case "JPY":
          return "\xA5";
        case "CNY":
          return "\xA5";
        case "INR":
          return "\u20B9";
        case "BRL":
          return "R$";
        case "MXN":
          return "$";
        case "NZD":
          return "$";
        case "SGD":
          return "$";
        case "HKD":
          return "$";
        case "SEK":
          return "kr";
        case "NOK":
          return "kr";
        case "DKK":
          return "kr";
        case "PLN":
          return "z\u0142";
        case "CZK":
          return "K\u010D";
        case "HUF":
          return "Ft";
        case "RUB":
          return "\u20BD";
        case "TRY":
          return "\u20BA";
        case "ZAR":
          return "R";
        case "AED":
          return "\u062F. \u0625";
        default:
          return t;
      }
    }, p = `${e.balance} ${y(e.currency)}`;
    console.log(`[Card3D ${e.id}] -> Aggiorno: ${d}=${g}, ${m}=${p}`);
    try {
      r.setVariable(d, g), r.setVariable(m, p);
      const t = r.findObjectByName(a);
      t ? typeof ((_a = t == null ? void 0 : t.scale) == null ? void 0 : _a.x) == "number" ? Object.assign(t.scale, D) : console.warn(`[Card3D ${e.id}] -> ATTENZIONE: 'scale' non trovato su '${a}'.`) : console.warn(`[Card3D ${e.id}] -> ATTENZIONE: Oggetto '${a}' non trovato.`);
    } catch (t) {
      console.error(`[Card3D ${e.id}] -> ERRORE durante interazione Spline:`, t);
    }
  }), Me();
  const [k, K] = createSignal(true), [j, A] = createSignal(false), [T, I] = createSignal(0), [v, U] = createSignal(false);
  return ssr(_, ssrHydrationKey(), "width:80%;height:500px;position:relative", escape(createComponent(Show, { get when() {
    return n.loading;
  }, get children() {
    return ssr(S, ssrHydrationKey(), "width:90%;height:45%;inset:0;margin-top:130px;background:rgba(0, 0, 0, 0.6);display:flex;justify-content:center;align-items:center;border-radius:8px;z-index:10;color:white;font-size:1.1em");
  } })), escape(createComponent(Show, { get when() {
    return n.error && !n.loading;
  }, get children() {
    var _a;
    return ssr(N, ssrHydrationKey(), "position:absolute;inset:0;background:rgba(255, 200, 200, 0.9);color:darkred;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px;border-radius:8px;z-index:10;text-align:center;font-size:0.9em", "margin-top:8px;white-space:pre-wrap;max-height:100px;overflow:auto", escape((_a = n.error) == null ? void 0 : _a.message) || escape(JSON.stringify(n.error)));
  } })), escape(createComponent(Suspense, { get fallback() {
    return [];
  }, get children() {
    return ssr(z, ssrHydrationKey(), "width:100%;height:100%;display:block;outline:none" + (";opacity:" + (n.loading || n.error ? 0.3 : 1)) + ";background-color:transparent;transition:opacity 0.4s ease-in-out");
  } })), escape(createComponent(Show, { get when() {
    return v();
  }, get children() {
    return ssr(O, ssrHydrationKey());
  } })));
}

export { Z as default };
//# sourceMappingURL=index152.mjs.map
