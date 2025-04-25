import o from 'vite-plugin-node-polyfills/shims/process';
import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { b as be } from '../_/nitro.mjs';

async function n() {
  var _a;
  if (!o.env.SESSION_SECRET) return console.error("SESSION_SECRET non \xE8 impostata! Impossibile recuperare la sessione."), null;
  try {
    return (_a = (await be({ password: o.env.SESSION_SECRET, name: o.env.JWT_ISSUER })).data) != null ? _a : null;
  } catch (s) {
    return console.error("[AUTH.SERVER] Errore durante il recupero/decodifica della sessione:", s), null;
  }
}
const u = E(async function() {
  const e = await n();
  if (e == null ? void 0 : e.userId) {
    const a = parseInt(e.userId, 10);
    return isNaN(a) ? (console.error(`ID utente nella sessione non \xE8 un numero valido: "${e.userId}"`), null) : a;
  }
  return null;
}, "src_server_auth_server_ts--getUserId_1", "C:/Users/Matteo/Desktop/Pulsix/src/server/auth.server.ts?tsr-directive-use-server="), v = u;
E(async function() {
  var _a, _b;
  return (_b = (_a = await n()) == null ? void 0 : _a.username) != null ? _b : null;
}, "src_server_auth_server_ts--getUsername_1", "C:/Users/Matteo/Desktop/Pulsix/src/server/auth.server.ts?tsr-directive-use-server=");
E(async function() {
  const e = await n();
  return (e == null ? void 0 : e.userId) && (e == null ? void 0 : e.username) ? { id: e.userId, username: e.username } : null;
}, "src_server_auth_server_ts--getUser_1", "C:/Users/Matteo/Desktop/Pulsix/src/server/auth.server.ts?tsr-directive-use-server=");

export { v };
//# sourceMappingURL=auth.server-QlO-zn0G.mjs.map
