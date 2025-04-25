import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { i, c as t } from '../_/nitro.mjs';
import { v } from './auth.server-QlO-zn0G.mjs';
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

const I = E(async function(l) {
  var _a, _b;
  let r;
  try {
    r = await l.request.json();
  } catch {
    return i({ message: "Corpo della richiesta non valido o mancante." }, { status: 400 });
  }
  const e = await v(), { cause: o, date: a, categoryId: s, amount: c, walletId: i$1, type: n } = r;
  console.log("cause:", o, "date:", a, "categoryId:", s, "amount:", c, "walletId:", i$1, "type:", n, "userId:", e);
  try {
    return (_b = (_a = await t.query("INSERT INTO public.transactions (cause, amount, wallet_id, type, category_id, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [o, c, i$1, n, s, a, e])) == null ? void 0 : _a.rows) != null ? _b : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_Wallet_addTransaction_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransaction.ts?pick=POST&tsr-directive-use-server="), h = I;

export { h as POST };
//# sourceMappingURL=addTransaction2.mjs.map
