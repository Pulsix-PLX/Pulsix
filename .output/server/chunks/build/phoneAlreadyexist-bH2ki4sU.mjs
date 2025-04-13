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

const m = E(async (r$1) => {
  try {
    console.log(r$1);
    const e = await r.query("SELECT phone_number FROM users WHERE phone_number=$1", [r$1]);
    return console.log(e.rows), e.rows.length > 0 ? "already exist" : "available";
  } catch (e) {
    return console.error("Error checking phone:", e), `error:${e.message}`;
  }
}, "src_routes_API_Auth_registration_phone_phoneAlreadyexist_ts--phoneAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=");

export { m as phoneAlreadyexist_action };
//# sourceMappingURL=phoneAlreadyexist-bH2ki4sU.mjs.map
