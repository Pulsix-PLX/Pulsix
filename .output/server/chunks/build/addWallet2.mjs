import { E } from './server-fns-runtime-C3tiYEg6.mjs';
import { e as i, g as t } from '../_/nitro.mjs';
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

const y = E(async function(o) {
  var _a;
  console.log("ADD WALLET");
  let t$1;
  try {
    t$1 = await o.request.json();
  } catch {
    return i({ success: false, message: "Corpo della richiesta non valido o mancante (JSON invalido)." }, { status: 400 });
  }
  const { walletName: a, type: r, nation: n, currency: u, container_id: s, color: p, type_ui: d, category_id: i$1 } = t$1, l = (_a = o.locals.user) == null ? void 0 : _a.id;
  console.log(t$1);
  try {
    let e;
    return r === "wallet" && (console.log("wallet"), e = await t.query("INSERT INTO public.wallets (wallet_name, type, nation, currency, category_id, user_id, container_id, color, type_ui) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [a, r, n, u, i$1, l, s, p, d])), r === "container" && (e = await t.query("INSERT INTO public.wallets (wallet_name, type, category_id, user_id, container_id) VALUES ($1, $2, $3, $4, $5);", [a, r, i$1, l, s])), "Success";
  } catch (e) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", e), new Error("Error.");
  }
}, "src_routes_API_Wallets_addWallet_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/addWallet.ts?pick=POST&tsr-directive-use-server="), W = y;

export { W as POST };
//# sourceMappingURL=addWallet2.mjs.map
