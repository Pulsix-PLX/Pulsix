import { createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { r, J, m as mt } from './Inputs-Cq_fgt2H.mjs';
import { p } from './getWallets.server-DFLq-knu.mjs';
import { v } from './auth.server-QlO-zn0G.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
import './server-fns-runtime-DEO2-sKc.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import '../_/nitro.mjs';
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
import './action-CiKOD-Zz.mjs';
import './routing-Th2JWmJV.mjs';

function B() {
  const [E, i] = createSignal(null), [_, s] = createSignal(void 0), [d, a] = createSignal([]), [m, n] = createSignal([]);
  return onMount(async () => {
    r({}), J({});
    try {
      const e = await v();
      if (e == null) console.warn("[onMount] getUserId ha restituito null/undefined."), i(null), s(void 0), a([]), n([]);
      else {
        i(e);
        const I = await p(e);
        s(I);
        const c = _();
        if (!c || !Array.isArray(c)) {
          console.warn("[onMount] Dati non validi o non presenti."), a([]), n([]);
          return;
        }
        const u = /* @__PURE__ */ new Map(), f = [];
        c.forEach((t) => {
          if (!t || typeof t != "object" || t.id === void 0 || t.id === null || !t.wallet_name) {
            console.warn("Elemento non valido o incompleto, saltato:", t);
            return;
          }
          let o = null, r;
          if (t.container_id === null || t.container_id === void 0) r = t.wallet_name;
          else {
            const h = u.get(t.container_id);
            h ? r = `${h.path}/${t.wallet_name}` : (console.warn(`Genitore con id '${t.container_id}' non trovato per '${t.wallet_name}' (id: ${t.id}). Sar\xE0 trattato come orfano.`), r = `__ORPHANED__/${t.wallet_name}`);
          }
          o = { id: t.id, wallet: t.wallet_name, path: r, type: t.type, container_id: t.container_id }, f.push(o), u.set(o.id, o);
        });
        const p$1 = f.filter((t) => t.type !== "container");
        p$1.sort((t, o) => t.path.localeCompare(o.path));
        const g = p$1.map((t) => t.path), v = p$1.map((t) => t.id);
        a(g), n(v), console.log("Paths Ordinati (no container):", d()), console.log("IDs Ordinati (no container):", m());
      }
    } catch (e) {
      console.error("[onMount] Errore durante recupero dati o elaborazione:", e), i(null), s(void 0), a([]), n([]);
    }
  }), createComponent(mt, { type: "select", name: "walletId", get options() {
    return d();
  }, get values() {
    return m();
  }, placeholder: "Wallet", class: "ml-30", required: true });
}

export { B as default };
//# sourceMappingURL=pathWallets.mjs.map
