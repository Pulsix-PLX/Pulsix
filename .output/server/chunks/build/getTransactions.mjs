import { E as E$1 } from './server-fns-runtime-4T1EILgx.mjs';
import { r } from './db.server-BYnrqg0d.mjs';
import 'solid-js/web';
import 'solid-js/web/storage';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import 'solid-js';
import 'node:async_hooks';
import 'node:path';
import 'pg';

const E = E$1(async function(r$1) {
  var _a, _b;
  console.log("getTransactions", r$1);
  try {
    return (_b = (_a = await r.query("SELECT * FROM transactions WHERE wallet_id = $1 ORDER BY date DESC", [r$1])) == null ? void 0 : _a.rows) != null ? _b : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_Wallet_getTransactions_ts--getTransactions_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/getTransactions.ts?pick=default&pick=%24css&tsr-directive-use-server=");

export { E as default };
//# sourceMappingURL=getTransactions.mjs.map
