import o from 'vite-plugin-node-polyfills/shims/process';
import { j as be, k as he, g as t, e as i } from '../_/nitro.mjs';
import { v } from './auth.server-ChqlnWrh.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'solid-js';
import 'solid-js/web';
import 'solid-js/web/storage';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';
import './server-fns-runtime-C3tiYEg6.mjs';

async function I(s) {
  console.log("Logout");
  const r = await v();
  console.log(r);
  try {
    await (await be(s.nativeEvent, { password: o.env.SESSION_SECRET, name: o.env.JWT_ISSUER, cookie: { maxAge: 86400, secure: true, httpOnly: true, sameSite: "lax" } })).clear(), console.log("Logout: Sessione server-side pulita.");
  } catch (e) {
    console.error("Logout: Errore aggiornamento sessione server-side:", e);
  }
  const i$1 = { httpOnly: true, secure: true, sameSite: "strict", path: "/" };
  try {
    he(s.nativeEvent, "refresh_token", i$1), console.log("Refresh token cookie deletion instruction sent.");
  } catch (e) {
    console.error("Error clearing refresh token cookie during logout:", e);
  }
  const o$1 = r;
  if (o$1) try {
    await t.query("DELETE FROM auth.active_sessions WHERE user_id = $1", [o$1]), console.log(`Cleared active_sessions for user: ${o$1}`);
  } catch (e) {
    console.error("Error clearing active session during logout:", e);
  }
  else console.log("No userId found in nativeEvent context, skipping active_sessions clear.");
  return i({ success: true });
}

export { I as POST };
//# sourceMappingURL=logout2.mjs.map
