import { createComponent } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { r, J, m as mt } from './Inputs-D1T1pLkj.mjs';
import { p } from './getWallets.server-C5R6kBVO.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import 'solid-js/store';
import 'gsap';
import './server-fns-runtime-C3tiYEg6.mjs';
import 'solid-js/web/storage';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'vite-plugin-node-polyfills/shims/process';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'axios';
import 'node:fs';
import 'node:path';

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
//# sourceMappingURL=pathWallets2.mjs.map
