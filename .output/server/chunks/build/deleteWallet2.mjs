import { w, D } from './db.server-Cxzv6220.mjs';
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

const _ = w(async function(t, s) {
  var _a;
  const r = (/* @__PURE__ */ new Date()).toLocaleString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  try {
    let e;
    return e = await D.query("UPDATE wallets SET date_of_delete = $1 WHERE id = $2", [r, t]), (_a = e == null ? void 0 : e.rows) != null ? _a : [];
  } catch (e) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", e), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=%24css&tsr-directive-use-server=");

export { _ as default };
//# sourceMappingURL=deleteWallet2.mjs.map
