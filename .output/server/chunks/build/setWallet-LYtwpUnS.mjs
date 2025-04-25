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

const _ = E(async (e) => {
  var _a;
  const t$1 = parseInt(e.get("category_id")) || null;
  try {
    let r;
    return e.get("type") == "wallet" && (r = await t.query("UPDATE wallets SET wallet_name = $1, currency = $2, nation = $3, color = $4, category_id = $5 WHERE id = $6", [e.get("walletName"), e.get("currency"), e.get("nation"), e.get("color"), t$1, e.get("id")])), e.get("type") == "container" && (r = await t.query("UPDATE wallets SET wallet_name = $1, category_id = $2 WHERE id = $3", [e.get("walletName"), t$1, e.get("id")])), (_a = r == null ? void 0 : r.rows) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", r), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_setWallet_ts--setWallet_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server=");

export { _ as setWallet_action };
//# sourceMappingURL=setWallet-LYtwpUnS.mjs.map
