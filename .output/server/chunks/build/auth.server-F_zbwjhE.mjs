import o from 'vite-plugin-node-polyfills/shims/process';
import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { b as be } from '../_/nitro.mjs';
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
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'solid-js';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

async function n() {
  var _a;
  if (!o.env.SESSION_SECRET) return console.error("SESSION_SECRET non \xE8 impostata! Impossibile recuperare la sessione."), null;
  try {
    return (_a = (await be({ password: o.env.SESSION_SECRET, name: o.env.JWT_ISSUER })).data) != null ? _a : null;
  } catch (r) {
    return console.error("[AUTH.SERVER] Errore durante il recupero/decodifica della sessione:", r), null;
  }
}
const p = E(async function() {
  const e = await n();
  if (e == null ? void 0 : e.userId) {
    const o = parseInt(e.userId, 10);
    return isNaN(o) ? (console.error(`ID utente nella sessione non \xE8 un numero valido: "${e.userId}"`), null) : o;
  }
  return null;
}, "src_server_auth_server_ts--getUserId_1", "C:/Users/Matteo/Desktop/Pulsix/src/server/auth.server.ts?tsr-directive-use-server="), S = E(async function() {
  var _a, _b;
  return (_b = (_a = await n()) == null ? void 0 : _a.username) != null ? _b : null;
}, "src_server_auth_server_ts--getUsername_1", "C:/Users/Matteo/Desktop/Pulsix/src/server/auth.server.ts?tsr-directive-use-server="), I = E(async function() {
  const e = await n();
  return (e == null ? void 0 : e.userId) && (e == null ? void 0 : e.username) ? { id: e.userId, username: e.username } : null;
}, "src_server_auth_server_ts--getUser_1", "C:/Users/Matteo/Desktop/Pulsix/src/server/auth.server.ts?tsr-directive-use-server=");

export { p as getUserId_1, I as getUser_1, S as getUsername_1 };
//# sourceMappingURL=auth.server-F_zbwjhE.mjs.map
