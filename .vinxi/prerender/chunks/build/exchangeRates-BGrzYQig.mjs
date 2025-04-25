import { createComponent, ssr, ssrHydrationKey, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { _ as _$1 } from './Card.module-nMwE8ysR2.mjs';
import { f as t, A as A$1 } from '../_/nitro.mjs';
import { E } from './server-fns-runtime-C3tiYEg6.mjs';

var b = ["<div", ' class><p class="', '">', '</p><p class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></p></div>"];
function B(a) {
  return createComponent(A$1, { get href() {
    return `/wallets/${a.id}`;
  }, get class() {
    return `absolute w-[16.7vw] h-[10vw] ml-[0.5vw] ${_$1.card} flex justify-end items-start pr-[1vw]`;
  }, get style() {
    return { "background-color": `${a.color}`, "margin-top": `-${a.position * 2 + 2}%`, "z-index": -a.position - 1 };
  }, get children() {
    return ssr(b, ssrHydrationKey(), ` ${escape(_$1.name, true)} text-${a.color == "white" ? "black" : "white"} text-right break-words`, escape(a.wallet), ` ${escape(_$1.balance, true)} text-right`, escape(a.balance), a.currency == "USD" ? "$" : a.currency == "EUR" ? "\u20AC" : escape(a.currency));
  } });
}
const S = "_backCardHolder_8wvpa_2", W = { backCardHolder: S }, A = E(async function(e) {
  if (!e || e.toUpperCase() === "EUR") return 1;
  try {
    const n = await t.query("SELECT rate FROM exchange_rates WHERE currency_code = $1 ORDER BY observation_date DESC LIMIT 1", [e.toUpperCase()]);
    return n.rows.length > 0 ? n.rows[0].rate : (console.warn(`[getExchangeRate] Tasso non trovato nel DB per ${e}. Restituisco null.`), null);
  } catch (n) {
    throw console.error(`[getExchangeRate] Errore recupero tasso per ${e}:`, n), new Error(`Errore DB recupero tasso per ${e}`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getExchangeRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), _ = A, D = E(async function(e, n) {
  const r = e.toUpperCase(), o = n.toUpperCase();
  if (r === o) return 1;
  try {
    const t = await _(r), s = await _(o);
    return t === null || s === null ? (console.warn(`[getConversionRate] Impossibile calcolare ${r} -> ${o}. Tasso EUR->${r} (${t}) o EUR->${o} (${s}) mancante.`), null) : t === 0 ? (console.error(`[getConversionRate] Impossibile calcolare ${r} -> ${o}. Tasso EUR->${r} \xE8 zero.`), null) : s / t;
  } catch (t) {
    return console.error(`[getConversionRate] Errore durante calcolo tasso ${r} -> ${o}:`, t), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getConversionRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), C = D, L = E(async function(e, n, r) {
  var _a;
  const o = "[Server Function:calculateConvertedTotalWithDeleteCheck]";
  if (isNaN(r) || r <= 0) throw console.error(`${o} User ID non valido: ${r}`), new Error("User ID non valido.");
  if (e !== null && (typeof e != "number" || isNaN(e) || e <= 0)) throw console.error(`${o} Container ID non valido: ${e}`), new Error("Container ID non valido.");
  if (typeof n != "string" || n.trim().length < 3) throw console.error(`${o} Codice valuta target non valido: ${n}`), new Error("Codice valuta target non valido.");
  const t$1 = n.toUpperCase();
  let s = 0;
  const v = [];
  try {
    const u = `
          WITH RECURSIVE WalletHierarchy AS (
              -- Anchor Member: Seleziona i figli diretti del container (o root)
              -- che NON sono stati eliminati.
              SELECT id, balance, currency, type, container_id
              FROM public.wallets
              WHERE user_id = $1
                AND ${e === null ? "container_id IS NULL" : "container_id = $2"}
                AND date_of_delete IS NULL -- <<< Esclude figli diretti eliminati

              UNION ALL

              -- Recursive Member: Seleziona i figli (w) degli elementi trovati (wh)
              -- assicurandosi che i figli (w) NON siano stati eliminati.
              SELECT w.id, w.balance, w.currency, w.type, w.container_id
              FROM public.wallets w
              JOIN WalletHierarchy wh ON w.container_id = wh.id -- Join con passo precedente
              WHERE w.user_id = $1 -- Verifica opzionale ma sicura
                AND w.date_of_delete IS NULL -- <<< Esclude elementi ricorsivi eliminati
                -- Non serve controllare wh.date_of_delete qui, \xE8 gi\xE0 filtrato prima
          )
          -- Seleziona i dettagli necessari SOLO dai WALLET validi trovati nella gerarchia
          SELECT id, balance, currency
          FROM WalletHierarchy
          WHERE type = 'wallet'           -- Considera solo i wallet
            AND balance IS NOT NULL     -- Ignora wallet con saldo nullo
            AND currency IS NOT NULL;     -- Ignora wallet con valuta nulla
      `, x = e === null ? [r] : [r, e], h = (_a = (await t.query(u, x)).rows) != null ? _a : [];
    if (h.length === 0) return { total_balance: 0, currency_code: t$1 };
    const R = [...new Set(h.map((c) => c.currency.toUpperCase()).filter((c) => c !== t$1))], $ = /* @__PURE__ */ new Map();
    if (R.length > 0) {
      const c = R.map((l) => C(l, t$1).catch((i) => (console.error(`${o} Errore recupero tasso per ${l}:`, i), null))), w = await Promise.all(c);
      R.forEach((l, i) => {
        const f = w[i];
        if ($.set(l, f), f === null) {
          const E = `Tasso di cambio non trovato o errore per ${l} -> ${t$1}. I saldi in ${l} verranno ignorati.`;
          v.push(E), console.warn(`${o} ${E}`);
        }
      });
    }
    $.set(t$1, 1);
    for (const c of h) {
      const w = c.balance;
      if (!c.currency) continue;
      const l = c.currency.toUpperCase(), i = $.get(l);
      typeof i == "number" && !isNaN(i) ? s += Math.round(w * i * 100) / 100 : l !== t$1 && console.warn(`${o} Salto wallet ${c.id} (${w} ${l}) per tasso mancante/non valido.`);
    }
    return s = Math.round(s * 100) / 100, { total_balance: s, currency_code: t$1, warnings: v.length > 0 ? v : void 0 };
  } catch (u) {
    throw console.error(`${o} Errore critico per container ${e != null ? e : "ROOT"} in ${t$1}, user ${r}:`, u), u instanceof Error && "code" in u && console.error(`DB Error Code: ${u.code}`), new Error(`Errore nel calcolo del totale convertito per container ${e != null ? e : "ROOT"}.`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--calculateConvertedTotal_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), z = L;
E(async function(e, n, r) {
  if (e == null || isNaN(e)) return console.warn(`[convertBalance] Ricevuto balance non valido o mancante: ${e}. Restituisco null.`), null;
  if (!n || !r) return console.warn(`[convertBalance] Ricevuto fromCurrencyCode (${n}) o toCurrencyCode (${r}) mancante. Restituisco null.`), null;
  const o = n.toUpperCase(), t = r.toUpperCase();
  if (o === t) return e;
  try {
    const s = await C(o, t);
    return s === null ? (console.warn(`[convertBalance] Tasso da ${o} a ${t} non disponibile. Impossibile convertire.`), null) : e * s;
  } catch (s) {
    return console.error(`[convertBalance] Errore durante la conversione di ${e} ${o} a ${t}:`, s), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--convertBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=");

export { B, W, z };
//# sourceMappingURL=exchangeRates-BGrzYQig.mjs.map
