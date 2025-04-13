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

const p = E(async (r$1) => {
  try {
    console.log(r$1);
    const e = await r.query("SELECT email FROM users WHERE email=$1", [r$1]);
    return console.log(e.rows.length > 0 ? "already exist" : "available"), e.rows.length > 0 ? "already exist" : "available";
  } catch (e) {
    return console.error("Error checking email:", e), `error:${e.message}`;
  }
}, "src_routes_API_Auth_registration_email_emailAlreadyexist_ts--emailAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=");

export { p as emailAlreadyexist_action };
//# sourceMappingURL=emailAlreadyexist-BASsf-Xu.mjs.map
