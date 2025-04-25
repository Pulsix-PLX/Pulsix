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

const w = E(async function(t$1, a) {
  var _a;
  const r = /* @__PURE__ */ new Date();
  try {
    let e;
    return e = await t.query("UPDATE wallets SET date_of_delete = $1 WHERE id = $2", [r, t$1]), (_a = e == null ? void 0 : e.rows) != null ? _a : [];
  } catch (e) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", e), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts?pick=default&pick=%24css&tsr-directive-use-server=");

export { w as default };
//# sourceMappingURL=deleteWallet.mjs.map
