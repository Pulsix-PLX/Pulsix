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

const u = E(async (e) => {
  var _a;
  const t = parseInt(e.get("category_id")) || null;
  try {
    let r$1;
    return e.get("type") == "wallet" && (r$1 = await r.query("UPDATE wallets SET wallet_name = $1, currency = $2, nation = $3, color = $4, category_id = $5 WHERE id = $6", [e.get("walletName"), e.get("currency"), e.get("nation"), e.get("color"), t, e.get("id")])), e.get("type") == "container" && (r$1 = await r.query("UPDATE wallets SET wallet_name = $1, category_id = $2 WHERE id = $3", [e.get("walletName"), t, e.get("id")])), (_a = r$1 == null ? void 0 : r$1.rows) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", r), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_setWallet_ts--setWallet_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=");

export { u as setWallet_action };
//# sourceMappingURL=setWallet-BkA1dzP6.mjs.map
