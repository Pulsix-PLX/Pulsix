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

const y = E(async (r) => {
  try {
    console.log(r);
    const e = await t.query("SELECT email FROM users WHERE email=$1", [r]);
    return console.log(e.rows.length > 0 ? "already exist" : "available"), e.rows.length > 0 ? "already exist" : "available";
  } catch (e) {
    return console.error("Error checking email:", e), `error:${e.message}`;
  }
}, "src_routes_API_Auth_registration_email_emailAlreadyexist_ts--emailAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/email/emailAlreadyexist.ts?tsr-directive-use-server=");

export { y as emailAlreadyexist_action };
//# sourceMappingURL=emailAlreadyexist-BoJ37vKf.mjs.map
