import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount, onCleanup, createSignal } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, j, v as ve, w as we, y as ye } from './Inputs-CEYxPBfP.mjs';
import { b } from './Menu-OQmUNT5t.mjs';
import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { c as de } from '../_/nitro.mjs';
import { r as r$1 } from './db.server-BYnrqg0d.mjs';
import * as h from 'bcryptjs';
import { Y, Q } from './action-BVKOmiKt.mjs';
import { M as Me } from './routing-BSDkuvr3.mjs';
import 'solid-js/store';
import 'gsap';
import './components-CJF4pMQg.mjs';
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
import 'node:async_hooks';
import 'node:path';
import 'pg';

const R = E(async (s) => {
  const { password: a, username: l } = s;
  try {
    const e = await r$1.query("SELECT id, username, password FROM users WHERE username = $1", [l]);
    if (e.rows.length === 0) return { success: false, message: "Credenziali non valide" };
    const r = e.rows[0];
    return await h.compare(a, r.password) ? (await (await de({ password: process.env.SESSION_SECRET, name: "auth_session" })).update({ userId: r.id, username: r.username }), console.log(`Sessione (cookie criptato) aggiornata per utente ${r.username}`), { success: true }) : { success: false, message: "Credenziali non valide" };
  } catch (e) {
    return console.error("Errore durante il login:", e), process.env.SESSION_SECRET ? { success: false, message: "Errore durante il processo di login" } : (console.error("SESSION_SECRET non \xE8 impostata!"), { success: false, message: "Errore di configurazione server." });
  }
}, "src_routes_API_Auth_login_loginUser_ts--loginUser_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Auth/login/loginUser.ts?tsr-directive-use-server="), $ = Q(R, "loginUser");
var P = ["<form", ' class="CM" method="post"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"], A = ["<p", ' class="text-red-500">Wrong credentials</p>'];
function J() {
  onMount(() => {
    b(false), r({}), j({}), console.log(ve("username")), console.log(ve("password"));
  }), onCleanup(() => {
    b(true);
  });
  const [s, a] = createSignal("");
  return Y($), Me(), [s() && ssr(A, ssrHydrationKey()), " ", ssr(P, ssrHydrationKey(), escape(createComponent(we, { type: "usernameLogin", name: "username", placeholder: "Username", required: true })), escape(createComponent(we, { type: "password", name: "password", placeholder: "Password", required: true })), escape(createComponent(B, { text: "Login", class: "ml-[auto] mr-[auto]", get disabled() {
    return !ye();
  } })))];
}

export { J as default };
//# sourceMappingURL=index4.mjs.map
