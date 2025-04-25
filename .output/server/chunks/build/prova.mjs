import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { i } from '../_/nitro.mjs';
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

const a = E(async function(s) {
  console.log("prima del check");
  const e = s.request.headers.get("authorization"), t = (e == null ? void 0 : e.startsWith("Bearer ")) ? e.slice(7) : null;
  console.log("Bearer Token:", t);
  try {
    return i({ success: true, message: "Good." }, { status: 200 });
  } catch {
    return i({ success: false, message: "Errore interno del server durante il login." }, { status: 500 });
  }
}, "src_routes_API_prova_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/prova.ts?pick=POST&tsr-directive-use-server="), g = a;

export { g as POST };
//# sourceMappingURL=prova.mjs.map
