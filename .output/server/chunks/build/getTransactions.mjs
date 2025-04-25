import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { c as t } from '../_/nitro.mjs';
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

const g = E(async function(r) {
  var _a, _b;
  console.log("getTransactions", r);
  try {
    return (_b = (_a = await t.query("SELECT * FROM transactions WHERE wallet_id = $1 ORDER BY date DESC", [r])) == null ? void 0 : _a.rows) != null ? _b : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_Wallet_getTransactions_ts--getTransactions_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=%24css&tsr-directive-use-server=");

export { g as default };
//# sourceMappingURL=getTransactions.mjs.map
