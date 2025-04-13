import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount, onCleanup, createSignal } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev32.mjs';
import { r, j, y as ye, v as ve, f as fe } from './Inputs-BxVpbjg0.mjs';
import { e as b$1, Y, M as Me, f as fe$1, Q } from '../_/nitro.mjs';
import { w, D } from './db.server-Cxzv6220.mjs';
import * as h from 'bcryptjs';
import 'solid-js/store';
import 'gsap';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import 'solid-js/web/storage';
import 'node:async_hooks';
import 'node:path';
import 'pg';

const R = w(async (r) => {
  const { password: a, username: l } = r;
  try {
    const e = await D.query("SELECT id, username, password FROM users WHERE username = $1", [l]);
    if (e.rows.length === 0) return { success: false, message: "Credenziali non valide" };
    const s = e.rows[0];
    return await h.compare(a, s.password) ? (await (await fe$1({ password: process.env.SESSION_SECRET, name: "auth_session" })).update({ userId: s.id, username: s.username }), console.log(`Sessione (cookie criptato) aggiornata per utente ${s.username}`), { success: true }) : { success: false, message: "Credenziali non valide" };
  } catch (e) {
    return console.error("Errore durante il login:", e), process.env.SESSION_SECRET ? { success: false, message: "Errore durante il processo di login" } : (console.error("SESSION_SECRET non \xE8 impostata!"), { success: false, message: "Errore di configurazione server." });
  }
}, "src_routes_API_Auth_login_loginUser_ts--loginUser_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/loginUser.ts?tsr-directive-use-server="), $ = Q(R, "loginUser");
var P = ["<form", ' class="CM" method="post"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"], b = ["<p", ' class="text-red-500">Wrong credentials</p>'];
function G() {
  onMount(() => {
    b$1(false), r({}), j({}), console.log(ye("username")), console.log(ye("password"));
  }), onCleanup(() => {
    b$1(true);
  });
  const [r$1, a] = createSignal("");
  return Y($), Me(), [r$1() && ssr(b, ssrHydrationKey()), " ", ssr(P, ssrHydrationKey(), escape(createComponent(ve, { type: "usernameLogin", name: "username", placeholder: "Username", required: true })), escape(createComponent(ve, { type: "password", name: "password", placeholder: "Password", required: true })), escape(createComponent(B, { text: "Login", class: "ml-[auto] mr-[auto]", get disabled() {
    return !fe();
  } })))];
}

export { G as default };
//# sourceMappingURL=index42.mjs.map
