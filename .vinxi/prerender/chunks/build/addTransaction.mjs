import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { i, a as t } from '../_/nitro.mjs';
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
