import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { c as de } from '../_/nitro.mjs';
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
import 'node:fs';
import 'solid-js';
import 'node:async_hooks';
import 'node:path';

async function t() {
  var _a;
  if (!process.env.SESSION_SECRET) return console.error("SESSION_SECRET non \xE8 impostata! Impossibile recuperare la sessione."), null;
  try {
    return (_a = (await de({ password: process.env.SESSION_SECRET, name: "auth_session" })).data) != null ? _a : null;
  } catch (r) {
    return console.error("Errore durante il recupero/decodifica della sessione:", r), null;
  }
}
const v = E(async function() {
  const e = await t();
  if (e == null ? void 0 : e.userId) {
    const n = parseInt(e.userId, 10);
    return isNaN(n) ? (console.error(`ID utente nella sessione non \xE8 un numero valido: "${e.userId}"`), null) : n;
  }
  return null;
}, "src_Server_auth_server_ts--getUserId_1", "C:/Users/Matteo/Desktop/Pulsix/src/Server/auth.server.ts?tsr-directive-use-server="), S = E(async function() {
  var _a, _b;
  return (_b = (_a = await t()) == null ? void 0 : _a.username) != null ? _b : null;
}, "src_Server_auth_server_ts--getUsername_1", "C:/Users/Matteo/Desktop/Pulsix/src/Server/auth.server.ts?tsr-directive-use-server="), d = E(async function() {
  const e = await t();
  return (e == null ? void 0 : e.userId) && (e == null ? void 0 : e.username) ? { id: e.userId, username: e.username } : null;
}, "src_Server_auth_server_ts--getUser_1", "C:/Users/Matteo/Desktop/Pulsix/src/Server/auth.server.ts?tsr-directive-use-server=");

export { v as getUserId_1, d as getUser_1, S as getUsername_1 };
//# sourceMappingURL=auth.server-DMy-hh56.mjs.map
