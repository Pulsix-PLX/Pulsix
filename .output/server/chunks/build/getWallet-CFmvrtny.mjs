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

const w = E(async function(e) {
  var _a;
  try {
    const r = await t.query("SELECT * FROM wallets WHERE id = $1;", [e]);
    return console.log(r.rows[0]), (_a = r.rows[0]) != null ? _a : [];
  } catch (r) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", r), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallet_ts--getWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server=");

export { w as getWallet_1 };
//# sourceMappingURL=getWallet-CFmvrtny.mjs.map
