import { E } from './server-fns-runtime-C3tiYEg6.mjs';
import { parse } from 'csv-parse/sync';
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

const m = E(async function(s) {
  try {
    const e = (await s.request.formData()).get("file");
    if (!e || !(e instanceof File)) throw new Error("No file uploaded or invalid file");
    const o = await e.text(), i = u(o);
    console.log(`Delimitatore rilevato: '${i}'`);
    const t = parse(o, { delimiter: i, columns: true, skip_empty_lines: true, trim: true, relax_quotes: true, relax_column_count: true }), l = t.length > 0 ? Object.keys(t[0]) : [];
    return console.log(l), { headers: l, rows: t, length: t.length };
  } catch (r) {
    return console.error("Errore nel parsing del CSV:", r), { error: "Errore durante l'elaborazione del file", details: r.message };
  }
}, "src_routes_API_Wallets_Wallet_addTransactionByFile_uploadFile_ts--POST_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/Wallet/addTransactionByFile/uploadFile.ts?pick=POST&tsr-directive-use-server="), P = m;
function u(n) {
  const s = n.split(`
`).slice(0, 10).join(`
`), r = [",", ";", "	", "|"];
  let e = ",", o = 0;
  for (const i of r) {
    const t = new RegExp(`(?=(?:[^"]*"[^"]*")*[^"]*$)\\${i}`, "g"), l = (s.match(t) || []).length;
    l > o && (o = l, e = i);
  }
  return e;
}

export { P as POST };
//# sourceMappingURL=uploadFile3.mjs.map
