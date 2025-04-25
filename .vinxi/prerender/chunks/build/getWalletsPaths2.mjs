import { E } from './server-fns-runtime-C3tiYEg6.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import { p } from './getWallets.server-C5R6kBVO.mjs';
import { d as i } from '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
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

const u = E(async function(f) {
  try {
    const e = await v();
    if (e == null) return i({ success: false, message: "Utente non autenticato." }, { status: 401 });
    const a = await p(e);
    if (!a || !Array.isArray(a)) return console.warn(`[API Endpoint] Nessun dato wallet trovato o formato non valido per user id: ${e}.`), i({ success: true, wallets: [] }, { status: 200 });
    const n = /* @__PURE__ */ new Map(), i$1 = [];
    a.forEach((t) => {
      if (!t || typeof t != "object" || t.id === void 0 || t.id === null || !t.wallet_name || typeof t.wallet_name != "string") {
        console.warn("[API Endpoint] Elemento wallet non valido o incompleto, saltato:", t);
        return;
      }
      let o;
      if (t.container_id === null || t.container_id === void 0) o = t.wallet_name;
      else {
        const l = n.get(t.container_id);
        l ? o = `${l.path}/${t.wallet_name}` : (console.warn(`[API Endpoint] Genitore con id '${t.container_id}' non trovato per '${t.wallet_name}' (id: ${t.id}). Sar\xE0 trattato come orfano.`), o = `__ORPHANED__/${t.wallet_name}`);
      }
      const s = { id: t.id, wallet: t.wallet_name, path: o, type: t.type, container_id: t.container_id };
      i$1.push(s), n.set(s.id, s);
    });
    const c = i$1.filter((t) => t.type !== "container").sort((t, o) => t.path.localeCompare(o.path)).map((t) => ({ id: t.id, path: t.path }));
    return i({ success: true, wallets: c }, { status: 200 });
  } catch (e) {
    return console.error("[API Endpoint: POST /tuo/percorso] Errore durante elaborazione:", e), i({ success: false, message: "Errore interno del server durante l'elaborazione dei wallet." }, { status: 500 });
  }
}, "src_routes_API_lib_getWalletsPaths_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/lib/getWalletsPaths.ts?pick=POST&tsr-directive-use-server="), W = u;

export { W as POST };
//# sourceMappingURL=getWalletsPaths2.mjs.map
