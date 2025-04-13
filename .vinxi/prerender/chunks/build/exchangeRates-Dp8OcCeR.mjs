import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { r } from './db.server-BYnrqg0d.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';

const C = E(async function(e) {
  if (!e || e.toUpperCase() === "EUR") return console.log("[getExchangeRate] Tasso per EUR richiesto, restituisco 1."), 1;
  console.log(`[getExchangeRate] Recupero tasso per ${e}...`);
  try {
    const a = await r.query("SELECT rate FROM exchange_rates WHERE currency_code = $1 ORDER BY observation_date DESC LIMIT 1", [e.toUpperCase()]);
    if (a.rows.length > 0) {
      const r = a.rows[0].rate;
      return console.log(`[getExchangeRate] Tasso trovato per ${e}: ${r}`), r;
    } else return console.warn(`[getExchangeRate] Tasso non trovato nel DB per ${e}. Restituisco null.`), null;
  } catch (a) {
    throw console.error(`[getExchangeRate] Errore recupero tasso per ${e}:`, a), new Error(`Errore DB recupero tasso per ${e}`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getExchangeRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), T = E(async function(e, a) {
  const r = e.toUpperCase(), o = a.toUpperCase();
  if (console.log(`[getConversionRate] Richiesto tasso da ${r} a ${o}`), r === o) return console.log(`[getConversionRate] Stessa valuta (${r}), tasso restituito: 1`), 1;
  try {
    const t = await _(r), n = await _(o);
    if (console.log(`[getConversionRate] Tasso DB (EUR -> ${r}): ${t}`), console.log(`[getConversionRate] Tasso DB (EUR -> ${o}): ${n}`), t === null || n === null) return console.warn(`[getConversionRate] Impossibile calcolare ${r} -> ${o}. Tasso EUR->${r} (${t}) o EUR->${o} (${n}) mancante.`), null;
    if (t === 0) return console.error(`[getConversionRate] Impossibile calcolare ${r} -> ${o}. Tasso EUR->${r} \xE8 zero.`), null;
    const i = n / t;
    return console.log(`[getConversionRate] Tasso calcolato ${r} -> ${o}: ${n} / ${t} = ${i}`), i;
  } catch (t) {
    return console.error(`[getConversionRate] Errore durante calcolo tasso ${r} -> ${o}:`, t), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getConversionRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), B = E(async function(e, a, r$1) {
  var _a;
  const o = "[Server Function:calculateConvertedTotalWithDeleteCheck]";
  if (isNaN(r$1) || r$1 <= 0) throw console.error(`${o} User ID non valido: ${r$1}`), new Error("User ID non valido.");
  if (e !== null && (typeof e != "number" || isNaN(e) || e <= 0)) throw console.error(`${o} Container ID non valido: ${e}`), new Error("Container ID non valido.");
  if (typeof a != "string" || a.trim().length < 3) throw console.error(`${o} Codice valuta target non valido: ${a}`), new Error("Codice valuta target non valido.");
  const t = a.toUpperCase();
  console.log(`${o} Inizio per container ${e != null ? e : "ROOT"} -> ${t}, user ${r$1}`);
  let n = 0;
  const i = [];
  try {
    const c = `
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
      `, w = e === null ? [r$1] : [r$1, e];
    console.log(`${o} Query: ${c.replace(/\s+/g, " ").trim()}, Params: ${JSON.stringify(w)}`);
    const g = (_a = (await r.query(c, w)).rows) != null ? _a : [];
    if (console.log(`${o} Trovati ${g.length} wallet validi (non eliminati, con saldo e valuta) nella gerarchia.`), g.length === 0) return { total_balance: 0, currency_code: t };
    const $ = [...new Set(g.map((s) => s.currency.toUpperCase()).filter((s) => s !== t))], h = /* @__PURE__ */ new Map();
    if ($.length > 0) {
      console.log(`${o} Recupero tassi per: ${$.join(", ")} -> ${t}`);
      const s = $.map((l) => m(l, t).catch((u) => (console.error(`${o} Errore recupero tasso per ${l}:`, u), null))), R = await Promise.all(s);
      $.forEach((l, u) => {
        const E = R[u];
        if (h.set(l, E), E === null) {
          const d = `Tasso di cambio non trovato o errore per ${l} -> ${t}. I saldi in ${l} verranno ignorati.`;
          i.push(d), console.warn(`${o} ${d}`);
        }
      });
    }
    h.set(t, 1);
    for (const s of g) {
      const R = s.balance;
      if (!s.currency) continue;
      const l = s.currency.toUpperCase(), u = h.get(l);
      typeof u == "number" && !isNaN(u) ? n += Math.round(R * u * 100) / 100 : l !== t && console.warn(`${o} Salto wallet ${s.id} (${R} ${l}) per tasso mancante/non valido.`);
    }
    return n = Math.round(n * 100) / 100, console.log(`${o} Calcolo completato. Totale in ${t}: ${n}`), { total_balance: n, currency_code: t, warnings: i.length > 0 ? i : void 0 };
  } catch (c) {
    throw console.error(`${o} Errore critico per container ${e != null ? e : "ROOT"} in ${t}, user ${r$1}:`, c), c instanceof Error && "code" in c && console.error(`DB Error Code: ${c.code}`), new Error(`Errore nel calcolo del totale convertito per container ${e != null ? e : "ROOT"}.`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--calculateConvertedTotal_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), I = E(async function(e, a, r) {
  if (e == null || isNaN(e)) return console.warn(`[convertBalance] Ricevuto balance non valido o mancante: ${e}. Restituisco null.`), null;
  if (!a || !r) return console.warn(`[convertBalance] Ricevuto fromCurrencyCode (${a}) o toCurrencyCode (${r}) mancante. Restituisco null.`), null;
  const o = a.toUpperCase(), t = r.toUpperCase();
  if (console.log(`[convertBalance] Richiesta conversione: ${e} ${o} -> ${t}`), o === t) return console.log(`[convertBalance] Valute identiche (${o}). Restituisco balance originale: ${e}`), e;
  try {
    const n = await m(o, t);
    if (n === null) return console.warn(`[convertBalance] Tasso da ${o} a ${t} non disponibile. Impossibile convertire.`), null;
    const i = e * n;
    return console.log(`[convertBalance] Convertito: ${e} ${o} * ${n} = ${i.toFixed(4)} ${t}`), i;
  } catch (n) {
    return console.error(`[convertBalance] Errore durante la conversione di ${e} ${o} a ${t}:`, n), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--convertBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), _ = C, m = T;

export { B as calculateConvertedTotal_1, I as convertBalance_1, T as getConversionRate_1, C as getExchangeRate_1 };
//# sourceMappingURL=exchangeRates-Dp8OcCeR.mjs.map
