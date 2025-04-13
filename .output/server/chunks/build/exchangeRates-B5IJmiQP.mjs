import { w, D as D$1 } from './db.server-Cxzv6220.mjs';
import { A as A$1, f as fe } from '../_/nitro.mjs';
import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { _ as _$1 } from './Card.module-nMwE8ysR2.mjs';

async function _() {
  var _a;
  if (!process.env.SESSION_SECRET) return console.error("SESSION_SECRET non \xE8 impostata! Impossibile recuperare la sessione."), null;
  try {
    return (_a = (await fe({ password: process.env.SESSION_SECRET, name: "auth_session" })).data) != null ? _a : null;
  } catch (n) {
    return console.error("Errore durante il recupero/decodifica della sessione:", n), null;
  }
}
const D = w(async function() {
  const e = await _();
  if (e == null ? void 0 : e.userId) {
    const s = parseInt(e.userId, 10);
    return isNaN(s) ? (console.error(`ID utente nella sessione non \xE8 un numero valido: "${e.userId}"`), null) : s;
  }
  return null;
}, "src_Server_auth_server_ts--getUserId_1", "C:/Users/Matteo/Desktop/Pulsix/src/Server/auth.server.ts?tsr-directive-use-server="), F = D;
w(async function() {
  var _a, _b;
  return (_b = (_a = await _()) == null ? void 0 : _a.username) != null ? _b : null;
}, "src_Server_auth_server_ts--getUsername_1", "C:/Users/Matteo/Desktop/Pulsix/src/Server/auth.server.ts?tsr-directive-use-server=");
w(async function() {
  const e = await _();
  return (e == null ? void 0 : e.userId) && (e == null ? void 0 : e.username) ? { id: e.userId, username: e.username } : null;
}, "src_Server_auth_server_ts--getUser_1", "C:/Users/Matteo/Desktop/Pulsix/src/Server/auth.server.ts?tsr-directive-use-server=");
var b = ["<div", ' class><p class="', '">', '</p><p class="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></p></div>"];
function q(n) {
  return createComponent(A$1, { get href() {
    return `/wallets/${n.id}`;
  }, get class() {
    return `absolute w-[16.7vw] h-[10vw] ml-[0.5vw] ${_$1.card} flex justify-end items-start pr-[1vw]`;
  }, get style() {
    return { "background-color": `${n.color}`, "margin-top": `-${n.position * 2 + 2}%`, "z-index": -n.position - 1 };
  }, get children() {
    return ssr(b, ssrHydrationKey(), ` ${escape(_$1.name, true)} text-${n.color == "white" ? "black" : "white"} text-right break-words`, escape(n.wallet), ` ${escape(_$1.balance, true)} text-right`, escape(n.balance), n.currency == "USD" ? "$" : n.currency == "EUR" ? "\u20AC" : escape(n.currency));
  } });
}
const O = "_backCardHolder_8wvpa_2", J = { backCardHolder: O }, L = w(async function(e) {
  if (!e || e.toUpperCase() === "EUR") return console.log("[getExchangeRate] Tasso per EUR richiesto, restituisco 1."), 1;
  console.log(`[getExchangeRate] Recupero tasso per ${e}...`);
  try {
    const s = await D$1.query("SELECT rate FROM exchange_rates WHERE currency_code = $1 ORDER BY observation_date DESC LIMIT 1", [e.toUpperCase()]);
    if (s.rows.length > 0) {
      const o = s.rows[0].rate;
      return console.log(`[getExchangeRate] Tasso trovato per ${e}: ${o}`), o;
    } else return console.warn(`[getExchangeRate] Tasso non trovato nel DB per ${e}. Restituisco null.`), null;
  } catch (s) {
    throw console.error(`[getExchangeRate] Errore recupero tasso per ${e}:`, s), new Error(`Errore DB recupero tasso per ${e}`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getExchangeRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), C = L, A = w(async function(e, s) {
  const o = e.toUpperCase(), t = s.toUpperCase();
  if (console.log(`[getConversionRate] Richiesto tasso da ${o} a ${t}`), o === t) return console.log(`[getConversionRate] Stessa valuta (${o}), tasso restituito: 1`), 1;
  try {
    const r = await C(o), a = await C(t);
    if (console.log(`[getConversionRate] Tasso DB (EUR -> ${o}): ${r}`), console.log(`[getConversionRate] Tasso DB (EUR -> ${t}): ${a}`), r === null || a === null) return console.warn(`[getConversionRate] Impossibile calcolare ${o} -> ${t}. Tasso EUR->${o} (${r}) o EUR->${t} (${a}) mancante.`), null;
    if (r === 0) return console.error(`[getConversionRate] Impossibile calcolare ${o} -> ${t}. Tasso EUR->${o} \xE8 zero.`), null;
    const i = a / r;
    return console.log(`[getConversionRate] Tasso calcolato ${o} -> ${t}: ${a} / ${r} = ${i}`), i;
  } catch (r) {
    return console.error(`[getConversionRate] Errore durante calcolo tasso ${o} -> ${t}:`, r), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--getConversionRate_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), U = A, M = w(async function(e, s, o) {
  var _a;
  const t = "[Server Function:calculateConvertedTotalWithDeleteCheck]";
  if (isNaN(o) || o <= 0) throw console.error(`${t} User ID non valido: ${o}`), new Error("User ID non valido.");
  if (e !== null && (typeof e != "number" || isNaN(e) || e <= 0)) throw console.error(`${t} Container ID non valido: ${e}`), new Error("Container ID non valido.");
  if (typeof s != "string" || s.trim().length < 3) throw console.error(`${t} Codice valuta target non valido: ${s}`), new Error("Codice valuta target non valido.");
  const r = s.toUpperCase();
  console.log(`${t} Inizio per container ${e != null ? e : "ROOT"} -> ${r}, user ${o}`);
  let a = 0;
  const i = [];
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
      `, E = e === null ? [o] : [o, e];
    console.log(`${t} Query: ${u.replace(/\s+/g, " ").trim()}, Params: ${JSON.stringify(E)}`);
    const d = (_a = (await D$1.query(u, E)).rows) != null ? _a : [];
    if (console.log(`${t} Trovati ${d.length} wallet validi (non eliminati, con saldo e valuta) nella gerarchia.`), d.length === 0) return { total_balance: 0, currency_code: r };
    const R = [...new Set(d.map((l) => l.currency.toUpperCase()).filter((l) => l !== r))], p = /* @__PURE__ */ new Map();
    if (R.length > 0) {
      console.log(`${t} Recupero tassi per: ${R.join(", ")} -> ${r}`);
      const l = R.map((c) => U(c, r).catch((g) => (console.error(`${t} Errore recupero tasso per ${c}:`, g), null))), h = await Promise.all(l);
      R.forEach((c, g) => {
        const f = h[g];
        if (p.set(c, f), f === null) {
          const m = `Tasso di cambio non trovato o errore per ${c} -> ${r}. I saldi in ${c} verranno ignorati.`;
          i.push(m), console.warn(`${t} ${m}`);
        }
      });
    }
    p.set(r, 1);
    for (const l of d) {
      const h = l.balance;
      if (!l.currency) continue;
      const c = l.currency.toUpperCase(), g = p.get(c);
      typeof g == "number" && !isNaN(g) ? a += Math.round(h * g * 100) / 100 : c !== r && console.warn(`${t} Salto wallet ${l.id} (${h} ${c}) per tasso mancante/non valido.`);
    }
    return a = Math.round(a * 100) / 100, console.log(`${t} Calcolo completato. Totale in ${r}: ${a}`), { total_balance: a, currency_code: r, warnings: i.length > 0 ? i : void 0 };
  } catch (u) {
    throw console.error(`${t} Errore critico per container ${e != null ? e : "ROOT"} in ${r}, user ${o}:`, u), u instanceof Error && "code" in u && console.error(`DB Error Code: ${u.code}`), new Error(`Errore nel calcolo del totale convertito per container ${e != null ? e : "ROOT"}.`);
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--calculateConvertedTotal_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server="), V = M;
w(async function(e, s, o) {
  if (e == null || isNaN(e)) return console.warn(`[convertBalance] Ricevuto balance non valido o mancante: ${e}. Restituisco null.`), null;
  if (!s || !o) return console.warn(`[convertBalance] Ricevuto fromCurrencyCode (${s}) o toCurrencyCode (${o}) mancante. Restituisco null.`), null;
  const t = s.toUpperCase(), r = o.toUpperCase();
  if (console.log(`[convertBalance] Richiesta conversione: ${e} ${t} -> ${r}`), t === r) return console.log(`[convertBalance] Valute identiche (${t}). Restituisco balance originale: ${e}`), e;
  try {
    const a = await U(t, r);
    if (a === null) return console.warn(`[convertBalance] Tasso da ${t} a ${r} non disponibile. Impossibile convertire.`), null;
    const i = e * a;
    return console.log(`[convertBalance] Convertito: ${e} ${t} * ${a} = ${i.toFixed(4)} ${r}`), i;
  } catch (a) {
    return console.error(`[convertBalance] Errore durante la conversione di ${e} ${t} a ${r}:`, a), null;
  }
}, "src_routes_API_exchangeRates_exchangeRates_ts--convertBalance_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/exchangeRates/exchangeRates.ts?tsr-directive-use-server=");

export { F, J, V, q };
//# sourceMappingURL=exchangeRates-B5IJmiQP.mjs.map
