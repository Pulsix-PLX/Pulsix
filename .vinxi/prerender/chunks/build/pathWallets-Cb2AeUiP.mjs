import { createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, onMount } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { r, J, m as mt } from './Inputs-D1T1pLkj.mjs';
import { p } from './getWallets.server-C5R6kBVO.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';

function w() {
  const [E, s] = createSignal(null), [_, i] = createSignal(void 0), [p$1, a] = createSignal([]), [u, n] = createSignal([]);
  return onMount(async () => {
    r({}), J({});
    try {
      const e = await v();
      if (e == null) console.warn("[onMount] getUserId ha restituito null/undefined."), s(null), i(void 0), a([]), n([]);
      else {
        s(e);
        const I = await p(e);
        i(I);
        const c = _();
        if (!c || !Array.isArray(c)) {
          console.warn("[onMount] Dati non validi o non presenti."), a([]), n([]);
          return;
        }
        const m = /* @__PURE__ */ new Map(), f = [];
        c.forEach((t) => {
          if (!t || typeof t != "object" || t.id === void 0 || t.id === null || !t.wallet_name) {
            console.warn("Elemento non valido o incompleto, saltato:", t);
            return;
          }
          let o = null, r;
          if (t.container_id === null || t.container_id === void 0) r = t.wallet_name;
          else {
            const h = m.get(t.container_id);
            h ? r = `${h.path}/${t.wallet_name}` : (console.warn(`Genitore con id '${t.container_id}' non trovato per '${t.wallet_name}' (id: ${t.id}). Sar\xE0 trattato come orfano.`), r = `__ORPHANED__/${t.wallet_name}`);
          }
          o = { id: t.id, wallet: t.wallet_name, path: r, type: t.type, container_id: t.container_id }, f.push(o), m.set(o.id, o);
        });
        const d = f.filter((t) => t.type !== "container");
        d.sort((t, o) => t.path.localeCompare(o.path));
        const g = d.map((t) => t.path), v = d.map((t) => t.id);
        a(g), n(v), console.log("Paths Ordinati (no container):", p$1()), console.log("IDs Ordinati (no container):", u());
      }
    } catch (e) {
      console.error("[onMount] Errore durante recupero dati o elaborazione:", e), s(null), i(void 0), a([]), n([]);
    }
  }), createComponent(mt, { type: "select", name: "walletId", get options() {
    return p$1();
  }, get values() {
    return u();
  }, placeholder: "Wallet", class: "ml-30", required: true });
}

export { w };
//# sourceMappingURL=pathWallets-Cb2AeUiP.mjs.map
