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
  try {
    console.log(e);
    const r = await t.query("SELECT phone_number FROM users WHERE phone_number=$1", [e]);
    return console.log(r.rows), r.rows.length > 0 ? "already exist" : "available";
  } catch (r) {
    return console.error("Error checking phone:", r), `error:${r.message}`;
  }
}, "src_routes_API_Auth_registration_phone_phoneAlreadyexist_ts--phoneAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/phone/phoneAlreadyexist.ts?tsr-directive-use-server=");

export { _ as phoneAlreadyexist_action };
//# sourceMappingURL=phoneAlreadyexist-BFvINIFk.mjs.map
