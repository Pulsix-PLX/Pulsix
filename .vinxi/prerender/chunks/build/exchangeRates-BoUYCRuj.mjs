import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { a as t } from '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
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

const C = E(async function(e) {
  if (!e || e.toUpperCase() === "EUR") return 1;
  try {
    const n = await t.query("SELECT rate FROM exchange_rates WHERE currency_code = $1 ORDER BY observation_date DESC LIMIT 1", [e.toUpperCase()]);
    return n.rows.length > 0 ? n.rows[0].rate : (console.warn(`[getExchangeRate] Tasso non trovato nel DB per ${e}. Restituisco null.`), null);
  } catch (n) {
    throw console.error(`[getExchangeRate] Errore recupero tasso per ${e}:`, n), new Error(`Errore DB recupero tasso per ${e}`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getExchangeRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), N = E(async function(e, n) {
  const r = e.toUpperCase(), o = n.toUpperCase();
  if (r === o) return 1;
  try {
    const t = await $(r), a = await $(o);
    return t === null || a === null ? (console.warn(`[getConversionRate] Impossibile calcolare ${r} -> ${o}. Tasso EUR->${r} (${t}) o EUR->${o} (${a}) mancante.`), null) : t === 0 ? (console.error(`[getConversionRate] Impossibile calcolare ${r} -> ${o}. Tasso EUR->${r} \xE8 zero.`), null) : a / t;
  } catch (t) {
    return console.error(`[getConversionRate] Errore durante calcolo tasso ${r} -> ${o}:`, t), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getConversionRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), M = E(async function(e, n, r) {
  var _a;
  const o = "[Server Function:calculateConvertedTotalWithDeleteCheck]";
  if (isNaN(r) || r <= 0) throw console.error(`${o} User ID non valido: ${r}`), new Error("User ID non valido.");
  if (e !== null && (typeof e != "number" || isNaN(e) || e <= 0)) throw console.error(`${o} Container ID non valido: ${e}`), new Error("Container ID non valido.");
  if (typeof n != "string" || n.trim().length < 3) throw console.error(`${o} Codice valuta target non valido: ${n}`), new Error("Codice valuta target non valido.");
  const t$1 = n.toUpperCase();
  let a = 0;
  const u = [];
  try {
    const l = `
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
      `, m = e === null ? [r] : [r, e], g = (_a = (await t.query(l, m)).rows) != null ? _a : [];
    if (g.length === 0) return { total_balance: 0, currency_code: t$1 };
    const w = [...new Set(g.map((s) => s.currency.toUpperCase()).filter((s) => s !== t$1))], h = /* @__PURE__ */ new Map();
    if (w.length > 0) {
      const s = w.map((i) => f(i, t$1).catch((c) => (console.error(`${o} Errore recupero tasso per ${i}:`, c), null))), p = await Promise.all(s);
      w.forEach((i, c) => {
        const d = p[c];
        if (h.set(i, d), d === null) {
          const E = `Tasso di cambio non trovato o errore per ${i} -> ${t$1}. I saldi in ${i} verranno ignorati.`;
          u.push(E), console.warn(`${o} ${E}`);
        }
      });
    }
    h.set(t$1, 1);
    for (const s of g) {
      const p = s.balance;
      if (!s.currency) continue;
      const i = s.currency.toUpperCase(), c = h.get(i);
      typeof c == "number" && !isNaN(c) ? a += Math.round(p * c * 100) / 100 : i !== t$1 && console.warn(`${o} Salto wallet ${s.id} (${p} ${i}) per tasso mancante/non valido.`);
    }
    return a = Math.round(a * 100) / 100, { total_balance: a, currency_code: t$1, warnings: u.length > 0 ? u : void 0 };
  } catch (l) {
    throw console.error(`${o} Errore critico per container ${e != null ? e : "ROOT"} in ${t$1}, user ${r}:`, l), l instanceof Error && "code" in l && console.error(`DB Error Code: ${l.code}`), new Error(`Errore nel calcolo del totale convertito per container ${e != null ? e : "ROOT"}.`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--calculateConvertedTotal_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), P = E(async function(e, n, r) {
  if (e == null || isNaN(e)) return console.warn(`[convertBalance] Ricevuto balance non valido o mancante: ${e}. Restituisco null.`), null;
  if (!n || !r) return console.warn(`[convertBalance] Ricevuto fromCurrencyCode (${n}) o toCurrencyCode (${r}) mancante. Restituisco null.`), null;
  const o = n.toUpperCase(), t = r.toUpperCase();
  if (o === t) return e;
  try {
    const a = await f(o, t);
    return a === null ? (console.warn(`[convertBalance] Tasso da ${o} a ${t} non disponibile. Impossibile convertire.`), null) : e * a;
  } catch (a) {
    return console.error(`[convertBalance] Errore durante la conversione di ${e} ${o} a ${t}:`, a), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--convertBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), $ = C, f = N;

export { M as calculateConvertedTotal_1, P as convertBalance_1, N as getConversionRate_1, C as getExchangeRate_1 };
//# sourceMappingURL=exchangeRates-BoUYCRuj.mjs.map
