import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { i, c as t } from '../_/nitro.mjs';
import 'solid-js/web';
import 'solid-js/web/storage';
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
import 'solid-js';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

const m = E(async function(n) {
  var _a;
  let o;
  try {
    o = await n.request.json();
  } catch {
    return i({ success: false, message: "Corpo della richiesta non valido o mancante (JSON invalido)." }, { status: 400 });
  }
  const s = (_a = n.locals.user) == null ? void 0 : _a.id;
  if (console.log("Tarnsaction userId", s), !s) return i({ success: false, message: "Utente non autenticato o sessione scaduta." }, { status: 401 });
  const { cause: i$1, date: c, categoryId: l, amount: u, walletId: r, type: a } = o;
  if (a !== "Income" && a !== "Expense") return console.warn(`[API AddTransaction] Tentativo con tipo non valido: ${a} per user ${s}`), i({ success: false, message: 'Il campo "type" della transazione deve essere obbligatoriamente "Income" o "Expense".' }, { status: 400 });
  try {
    if ((await t.query("SELECT 1 FROM public.wallets WHERE id = $1 AND user_id = $2", [r, s])).rowCount === 0) return console.warn(`[API AddTransaction] Tentativo su wallet inesistente o non appartenente: walletId ${r} per user ${s}`), i({ success: false, message: `Il wallet specificato (ID: ${r}) non \xE8 stato trovato o non appartiene all'utente.` }, { status: 400 });
  } catch (e) {
    return console.error("[API AddTransaction] Errore DB durante il controllo del wallet:", e), i({ success: false, message: "Errore interno del server durante la verifica del wallet." }, { status: 500 });
  }
  console.log("Dati validati, tentativo inserimento transazione:", { cause: i$1, date: c, categoryId: l, amount: u, walletId: r, type: a, userId: s });
  try {
    const e = await t.query("INSERT INTO public.transactions (cause, amount, wallet_id, type, category_id, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [i$1, u, r, a, l, c, s]);
    return e.rowCount !== null && e.rowCount > 0 ? (console.log(`[API AddTransaction] Transazione inserita con successo ID: ${e.rows[0].id} per user ${s}`), i({ success: true, transaction: e.rows[0] }, { status: 201 })) : (console.error("[API AddTransaction] Inserimento transazione non riuscito (no rows returned) per user ${userId}. Dati:", o), i({ success: false, message: "Errore imprevisto durante la creazione della transazione." }, { status: 500 }));
  } catch (e) {
    return console.error("[API AddTransaction] Errore DB durante inserimento transazione:", e), i({ success: false, message: "Errore durante il salvataggio della transazione nel database." }, { status: 500 });
  }
}, "src_routes_API_lib_addTransaction_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/lib/addTransaction.ts?pick=POST&tsr-directive-use-server="), S = m;

export { S as POST };
//# sourceMappingURL=addTransaction.mjs.map
