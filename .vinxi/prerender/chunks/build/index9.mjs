import o from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import * as E from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js';
import { v4 } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/uuid@11.1.0/node_modules/uuid/dist/esm/index.js';
import { i, a as t, h as he, b as be } from '../_/nitro.mjs';
import { w, I } from './utils-Be6c5Kfn.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/h3@1.15.1/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-fetch.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vinxi@0.5.3_@types+node@22._43e8e15a4bb8f875bc590eea815050cc/node_modules/vinxi/lib/app-manifest.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/global/dist/index.js';
import 'node:async_hooks';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/axios@1.8.3/node_modules/axios/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/unstorage@1.15.0_db0@0.3.1_ioredis@5.6.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import './server-fns-runtime-DEO2-sKc.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jose@6.0.10/node_modules/jose/dist/webapi/index.js';

async function j(r) {
  var _a;
  const f = Number(o.env.BCRYPT_COST) || 12;
  let i$1;
  try {
    i$1 = await r.request.json();
  } catch {
    return i({ success: false, message: "Corpo della richiesta non valido o mancante." }, { status: 400 });
  }
  const { username: c, password: u } = i$1;
  if (!c || !u) return i({ success: false, message: "Username e password sono obbligatori." }, { status: 400 });
  try {
    const a = await t.query("SELECT id, username, password, state FROM auth.users WHERE username = $1", [c]);
    if (a.rows.length === 0) return i({ success: false, message: "Credenziali non valide." }, { status: 401 });
    const e = a.rows[0];
    if (e.state == "suspended") return console.log("user sospended", e.id), i({ success: false, message: "user sospended." }, { status: 401 });
    if (e.state == "blocked") return console.log("user blocked", e.id), i({ success: false, message: "user blocked." }, { status: 401 });
    if (!await E.compare(u, e.password)) return console.log("password wrong"), i({ success: false, message: "Credenziali non valide." }, { status: 401 });
    const d = ((_a = r.request.headers.get("x-forwarded-for")) == null ? void 0 : _a.split(",")[0].trim()) || r.clientAddress || "unknown", l = r.request.headers.get("user-agent") || "";
    console.log(d, l);
    const _ = Number(e.id), p = w(_), n = await I();
    console.log("Access token: ", p), console.log("Refresh token: ", n);
    const m = await E.hash(n.token, f), S = n.expires_at;
    console.log(m);
    const w$1 = `
    INSERT INTO auth.active_sessions
      (id, user_id, ip_address, device_info, last_active, token_hash, expires_at, created_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (user_id) -- !! Richiede un vincolo UNIQUE o PRIMARY KEY su user_id !!
    DO UPDATE SET
      ip_address = EXCLUDED.ip_address,     -- Aggiorna IP con quello nuovo da $3
      device_info = EXCLUDED.device_info,  -- Aggiorna info device con quelle nuove da $4
      token_hash = EXCLUDED.token_hash,    -- Aggiorna con il NUOVO hash del token da $6
      expires_at = EXCLUDED.expires_at,    -- Aggiorna con la NUOVA scadenza da $7
      last_active = CURRENT_TIMESTAMP;     -- Aggiorna sempre l'ultimo accesso all'ora attuale
`, k = [v4(), e.id, d, l, /* @__PURE__ */ new Date(), m, S.toISOString(), /* @__PURE__ */ new Date()];
    try {
      await t.query(w$1, k), console.log(`[Login/Session] Record in auth.active_sessions inserito/aggiornato per user ${e.id}`);
    } catch (o) {
      console.error(`[Login/Session] Errore durante INSERT/UPDATE in auth.active_sessions per user ${e.id}:`, o);
    }
    const g = Number(o.env.REFRESH_TOKEN_EXPIRY || 1209600), v = new Date(Date.now() + g * 1e3);
    try {
      he(r.nativeEvent, "refresh_token", n.token, { httpOnly: true, secure: o.env.ENV === "production", sameSite: "strict", expires: v, path: "/", maxAge: g });
    } catch (o) {
      return console.error("Error setting refresh token cookie:", o), i({ success: false, message: "Errore durante l'impostazione del cookie di sessione." }, { status: 500 });
    }
    try {
      await (await be(r.nativeEvent, { password: o.env.SESSION_SECRET, name: o.env.JWT_ISSUER, cookie: { maxAge: 86400, secure: o.env.ENV === "production", httpOnly: true, sameSite: "lax" } })).update({ userId: e.id, username: e.username }), console.log(`Login: Sessione server-side aggiornata per userId: ${e.id}`);
    } catch (o) {
      console.error("Login: Errore aggiornamento sessione server-side:", o);
    }
    return i({ accessToken: p });
  } catch (a) {
    return console.error("Errore durante il processo di login:", a), i({ success: false, message: "Errore interno del server durante il login." }, { status: 500 });
  }
}

export { j as POST };
//# sourceMappingURL=index9.mjs.map
