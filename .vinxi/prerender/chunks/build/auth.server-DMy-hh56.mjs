import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { d as de } from '../_/nitro.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._ae8b4a4268513f338805ff2549d5f795/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.0/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

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
