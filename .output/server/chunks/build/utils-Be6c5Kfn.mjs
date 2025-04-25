import o from 'vite-plugin-node-polyfills/shims/process';
import { E as E$1 } from './server-fns-runtime-DEO2-sKc.mjs';
import E__default from 'bcryptjs';
import * as i from 'jose';
import O from 'jsonwebtoken';
import { v4 } from 'uuid';
import { c as t } from '../_/nitro.mjs';

const l = o.env.JWT_SECRET || "", f = o.env.JWT_ISSUER || "app", E = Number(o.env.ACCESS_TOKEN_EXPIRY) || 900, d = Number(o.env.REFRESH_TOKEN_EXPIRY) || 1209600, g = E$1(function(r) {
  const e = { sub: r, jti: v4() };
  return O.sign(e, l, { algorithm: "HS256", expiresIn: E, issuer: f });
}, "src_routes_API_Auth_login_utils_ts--generateAccessToken_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/utils.ts?tsr-directive-use-server="), w = g, h = E$1(async function() {
  const r = await k(), e = /* @__PURE__ */ new Date();
  e.setSeconds(e.getSeconds() + d);
  try {
    return { token: r, expires_at: e };
  } catch (t) {
    throw console.error("Errore durante la memorizzazione del refresh token:", t), new Error("Impossibile generare il refresh token a causa di un errore del database.");
  }
}, "src_routes_API_Auth_login_utils_ts--generateRefreshToken_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/utils.ts?tsr-directive-use-server="), I = h;
async function k() {
  const s = await i.generateSecret("HS256"), r = v4() + v4();
  return await new i.CompactSign(new TextEncoder().encode(r)).setProtectedHeader({ alg: "HS256" }).sign(s);
}
E$1(async function(r) {
  try {
    const e = await t.query(`SELECT user_id, token_hash, expires_at FROM auth.active_sessions 
       WHERE expires_at > NOW()`);
    if (e.rows.length === 0) return null;
    for (const t of e.rows) if (await E__default.compare(r, t.token_hash)) return t.user_id;
    return null;
  } catch (e) {
    return console.error("Errore durante la verifica del refresh token:", e), null;
  }
}, "src_routes_API_Auth_login_utils_ts--verifyRefreshToken_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/utils.ts?tsr-directive-use-server=");

export { I, w };
//# sourceMappingURL=utils-Be6c5Kfn.mjs.map
