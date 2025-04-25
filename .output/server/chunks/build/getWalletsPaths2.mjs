import { E } from './server-fns-runtime-C3tiYEg6.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import { p } from './getWallets.server-C5R6kBVO.mjs';
import { e as i } from '../_/nitro.mjs';
import 'solid-js/web';
import 'solid-js/web/storage';
import 'vite-plugin-node-polyfills/shims/process';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'solid-js';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

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
