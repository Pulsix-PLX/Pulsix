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
    const r = await t.query("SELECT username FROM auth.users WHERE username=$1", [e]);
    return console.log(r.rows), r.rows.length > 0 ? "already exist" : "available";
  } catch (r) {
    return console.error("Error checking username:", r), `error:${r.message}`;
  }
}, "src_routes_API_Auth_registration_credentials_usernameAlreadyexist_ts--usernameAlreadyexist_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/registration/credentials/usernameAlreadyexist.ts?tsr-directive-use-server=");

export { _ as usernameAlreadyexist_action };
//# sourceMappingURL=usernameAlreadyexist-CUMQy92F.mjs.map
