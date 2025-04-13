import { ssr, ssrHydrationKey, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount, onCleanup, createSignal } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, j, v as ve, w as we, y as ye } from './Inputs-CEYxPBfP.mjs';
import { b } from './Menu-OQmUNT5t.mjs';
import { E } from './server-fns-runtime-4T1EILgx.mjs';
import { d as de } from '../_/nitro.mjs';
import { r as r$1 } from './db.server-BYnrqg0d.mjs';
import * as h from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js';
import { Y, Q } from './action-BVKOmiKt.mjs';
import { M as Me } from './routing-BSDkuvr3.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/gsap@3.12.7/node_modules/gsap/dist/gsap.js';
import './components-CJF4pMQg.mjs';
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
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';

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
