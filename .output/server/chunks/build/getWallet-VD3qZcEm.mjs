import { E } from './server-fns-runtime-4T1EILgx.mjs';
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

const W = E(async function(e) {
  var _a;
  try {
    const r$1 = await r.query("SELECT * FROM wallets WHERE id = $1;", [e]);
    return console.log(r$1.rows[0]), (_a = r$1.rows[0]) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", r), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallet_ts--getWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=");

export { W as getWallet_1 };
//# sourceMappingURL=getWallet-VD3qZcEm.mjs.map
