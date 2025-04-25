import o from 'vite-plugin-node-polyfills/shims/process';
import E__default from 'bcryptjs';
import { y as ye, i, c as t, R as Re, b as be } from '../_/nitro.mjs';
import { w } from './utils-Be6c5Kfn.mjs';
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
import './server-fns-runtime-DEO2-sKc.mjs';
import 'jose';
import 'uuid';

async function l(t$1, r) {
  const o$1 = r != null ? String(r) : "unknown";
  console.warn(`Invalidating session/token for userId: ${o$1}`);
  const a = { httpOnly: true, secure: true, sameSite: "strict", path: "/" };
  try {
    Re(t$1.nativeEvent, "refresh_token", { ...a, maxAge: -1 }), console.log("[invalidateSession] Refresh token cookie deletion instruction sent.");
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
        Re(t$1.nativeEvent, "refresh_token", { path: "/", httpOnly: true, secure: true, sameSite: "strict", maxAge: -1 });
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
//# sourceMappingURL=refresh.mjs.map
