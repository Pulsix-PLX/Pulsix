import o from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/vite-plugin-node-polyfills@_4e133e926bbaeb0b9cea849071ce5364/node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js';
import E__default from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js';
import { k as ye, d as i, f as t, j as he, g as be } from '../_/nitro.mjs';
import { w } from './utils-CmG_3rtr.mjs';
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
import './server-fns-runtime-C3tiYEg6.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/jose@6.0.10/node_modules/jose/dist/webapi/index.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/uuid@11.1.0/node_modules/uuid/dist/esm/index.js';

async function l(t$1, r) {
  const o$1 = r != null ? String(r) : "unknown";
  console.warn(`Invalidating session/token for userId: ${o$1}`);
  const a = { httpOnly: true, secure: true, sameSite: "strict", path: "/" };
  try {
    he(t$1.nativeEvent, "refresh_token", { ...a, maxAge: -1 }), console.log("[invalidateSession] Refresh token cookie deletion instruction sent.");
  } catch (n) {
    console.error("[invalidateSession] Error clearing refresh token cookie:", n);
  }
  if (r != null && t) try {
    const e = await t.query("DELETE FROM auth.active_sessions WHERE user_id = $1", [r]);
    console.log(`[invalidateSession] Invalidated DB refresh tokens/sessions for user ${r}. Rows: ${e.rowCount}`);
  } catch (n) {
    console.error(`[invalidateSession] Error invalidating DB tokens/sessions for user ${r}:`, n);
  }
  else console.log("[invalidateSession] No valid userId provided for DB invalidation.");
  try {
    await (await be(t$1.nativeEvent, { password: o.env.SESSION_SECRET, name: o.env.JWT_ISSUER, cookie: { httpOnly: true, secure: true, sameSite: "lax" } })).clear(), console.log("[invalidateSession] Server-side session (useSession) cleared.");
  } catch (n) {
    console.error("[invalidateSession] Error clearing server-side session:", n);
  }
}
async function b(t$1) {
  console.log("API Route: /api/auth/refresh [POST] hit");
  let r;
  try {
    if (r = ye(t$1.nativeEvent, "refresh_token"), !r) return console.log("/api/auth/refresh [REFRESH] Cookie refresh_token non trovato."), i({ message: "Authentication required (missing refresh token)." }, { status: 401 });
  } catch (e) {
    return console.error("Errore lettura cookie refresh_token:", e), i({ message: "Error reading authentication token." }, { status: 500 });
  }
  let o$1 = null, a = null;
  try {
    const e = await t.query("SELECT user_id, token_hash, expires_at FROM auth.active_sessions WHERE expires_at > NOW()");
    console.log(`Refresh: Found ${e.rowCount} potential tokens to check.`);
    for (const s of e.rows) {
      if (!s.token_hash) continue;
      if (await E__default.compare(r, s.token_hash)) {
        o$1 = s.user_id, a = s, console.log(`Refresh: bcrypt match found for user ${o$1}`);
        break;
      }
    }
    if (!o$1 || !a) {
      console.log("/api/auth/refresh [REFRESH] Nessun refresh token valido corrispondente trovato nel DB dopo verifica.");
      try {
        he(t$1.nativeEvent, "refresh_token", { path: "/", httpOnly: true, secure: true, sameSite: "strict", maxAge: -1 });
      } catch (s) {
        console.error("Failed to delete potentially invalid refresh token cookie", s);
      }
      return i({ message: "Session not found or invalid." }, { status: 401 });
    }
  } catch (e) {
    return console.error("Errore critico durante verifica refresh token (iterazione):", e), await l(t$1, null), i({ message: "Internal server error during refresh validation." }, { status: 500 });
  }
  try {
    const e = await t.query("SELECT state FROM auth.users WHERE id = $1", [o$1]);
    if (e.rows.length === 0) return console.warn(`Refresh: User ${o$1} associated with valid refresh token not found in users table. Invalidating session.`), await l(t$1, o$1), i({ message: "User associated with token no longer exists.", code: "USER_NOT_FOUND" }, { status: 401 });
    const s = e.rows[0].state;
    if (s === "suspended" || s === "blocked") return console.warn(`Refresh: Tentativo di refresh per utente ${o$1} con stato ${s}. Accesso negato e logout forzato.`), await l(t$1, o$1), i({ message: `User account is ${s}. Session terminated.`, code: `USER_${s.toUpperCase()}` }, { status: 403 });
  } catch (e) {
    return console.error(`Refresh: Errore DB durante controllo stato utente ${o$1}:`, e), await l(t$1, o$1), i({ message: "Internal server error during user state check." }, { status: 500 });
  }
  const n = w(o$1);
  try {
    await t.query("UPDATE auth.active_sessions SET last_active = CURRENT_TIMESTAMP WHERE user_id = $1 AND token_hash = $2", [o$1, a.token_hash]);
  } catch (e) {
    console.warn("Impossibile aggiornare last_active (non critico):", e);
  }
  try {
    const e = await be(t$1.nativeEvent, { password: o.env.SESSION_SECRET, name: o.env.JWT_ISSUER, cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 86400 } });
  } catch (e) {
    console.error("Refresh: Errore aggiornamento sessione (useSession):", e);
  }
  return console.log(`Refresh: Nuovo access token generato per utente ${o$1}`), i({ accessToken: n });
}

export { b as POST };
//# sourceMappingURL=refresh2.mjs.map
