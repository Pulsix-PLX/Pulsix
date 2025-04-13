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

const f = E(async function(t, s) {
  var _a;
  const r$1 = (/* @__PURE__ */ new Date()).toLocaleString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  try {
    let e;
    return e = await r.query("UPDATE wallets SET date_of_delete = $1 WHERE id = $2", [r$1, t]), (_a = e == null ? void 0 : e.rows) != null ? _a : [];
  } catch (e) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", e), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=");

export { f as deleteWallet_1 };
//# sourceMappingURL=deleteWallet-DfS0S0n9.mjs.map
