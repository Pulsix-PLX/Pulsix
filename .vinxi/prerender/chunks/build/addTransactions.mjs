import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { i, a as t } from '../_/nitro.mjs';
import { z } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/zod@3.24.3/node_modules/zod/lib/index.mjs';
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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const I = z.object({ cause: z.string().nullable(), amount: z.number().positive().nullable(), date: z.string().nullable(), type: z.enum(["Income", "Expense"]).nullable(), category_id: z.string().nullable(), subCategory_id: z.string().nullable() }).strict(), h = z.object({ walletId: z.number().int().positive(), transactions: z.array(I) }).strict();
class u extends Error {
  constructor(c, p, r) {
    super(c);
    __publicField(this, "index");
    __publicField(this, "transactionData");
    this.name = "RowProcessingError", this.index = p, this.transactionData = r;
  }
}
const T = E(async function(c) {
  var _a;
  const r = (_a = c.locals.user) == null ? void 0 : _a.id;
  if (!r) return console.error("FATAL: User ID not found in event.locals for addTransactions endpoint!"), i({ success: false, message: "Utente non autorizzato o errore interno." }, { status: 401 });
  let d;
  try {
    const e = await c.request.json();
    if (d = h.parse(e), d.transactions.length === 0) return i({ success: false, message: "Nessuna transazione valida fornita per l'importazione." }, { status: 400 });
  } catch (e) {
    return console.error("Errore parsing o validazione payload (Zod):", e), e instanceof z.ZodError ? i({ success: false, message: "Payload non valido.", errors: e.errors }, { status: 400 }) : i({ success: false, message: "Payload della richiesta non valido o malformato." }, { status: 400 });
  }
  const { walletId: n, transactions: m } = d;
  let o = 0;
  try {
    if ((await t.query("SELECT 1 FROM public.wallets WHERE id = $1 AND user_id = $2", [n, r])).rowCount === 0) return console.warn(`Tentativo di import nel wallet ${n} non trovato o non appartenente all'utente ${r}.`), i({ success: false, message: `Wallet di destinazione (ID: ${n}) non trovato o non accessibile.` }, { status: 400 });
  } catch (e) {
    return console.error(`Errore DB controllo wallet ${n} per utente ${r}:`, e), i({ success: false, message: "Errore interno durante la verifica del wallet." }, { status: 500 });
  }
  const l = await t.connect();
  try {
    await l.query("BEGIN"), console.log(`SERVER: Inizio inserimento atomico di ${m.length} transazioni nel wallet ${n} per user ${r}.`);
    for (let e = 0; e < m.length; e++) {
      const t = m[e];
      if (t.amount === null || t.amount <= 0) throw new u("Importo non valido o mancante.", e, t);
      if (t.type === null) throw new u("Tipo transazione (Income/Expense) non determinato.", e, t);
      let i;
      try {
        if (!t.date) throw new Error("Data mancante");
        if (i = new Date(t.date), isNaN(i.getTime())) throw new Error("Formato data non valido");
      } catch (y) {
        throw new u(`Data non valida (${y.message}): "${t.date}"`, e, t);
      }
      const E = `
            INSERT INTO public.transactions
            (cause, amount, wallet_id, type, category_id, subCategory_id, "date", user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id`, f = [t.cause, t.amount, n, t.type, t.category_id, t.subCategory_id, i.toISOString(), r];
      await l.query(E, f), o++;
    }
    return await l.query("COMMIT"), console.log(`SERVER: COMMIT Eseguito. ${o} transazioni inserite con successo per wallet ${n}, user ${r}.`), i({ success: true, message: `Importazione completata con successo. ${o} transazioni inserite.`, insertedCount: o }, { status: 200 });
  } catch (e) {
    console.error("[Server Bulk Insert] Errore durante l'inserimento - Esecuzione ROLLBACK. Righe processate prima errore:", o, "Errore:", e.message), await l.query("ROLLBACK");
    let t = `Errore durante l'importazione alla riga ${o + 1}. Importazione annullata.`;
    e.message;
    let i$1 = 500;
    return e instanceof u ? (t = `Errore alla riga ${e.index + 1}: ${e.message}. Importazione annullata.`, e.message, i$1 = 400) : t = `Errore database o interno alla riga ${o + 1}. Importazione annullata.`, i({ success: false, message: t, processedSuccessfully: o }, { status: i$1 });
  } finally {
    l.release();
  }
}, "src_routes_API_Wallets_Wallet_addTransactionByFile_addTransactions_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransactionByFile/addTransactions.ts?pick=POST&tsr-directive-use-server="), A = T;

export { A as POST };
//# sourceMappingURL=addTransactions.mjs.map
