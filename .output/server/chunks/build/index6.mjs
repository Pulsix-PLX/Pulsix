import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount, onCleanup } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { r, J, m as mt, u as ut } from './Inputs-Cq_fgt2H.mjs';
import { b } from './Menu-B3jw0GIl.mjs';
import { j } from './auth-B-0Ucn5g.mjs';
import { M as Me } from './routing-Th2JWmJV.mjs';
import 'solid-js/store';
import 'gsap';
import './server-fns-runtime-DEO2-sKc.mjs';
import 'solid-js/web/storage';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'vite-plugin-node-polyfills/shims/process';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'axios';
import 'node:fs';
import 'node:path';
import './action-CiKOD-Zz.mjs';
import './components-Bjb1kgqQ.mjs';

var f = ["<form", ' class="CM" method="post"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"], h = ["<div", ' class="auth-links text-center mt-4"><a href="/register" class="text-blue-600 hover:underline">Need an account? Register</a><span class="mx-2">|</span><a href="/forgot-password" class="text-blue-600 hover:underline">Forgot password?</a></div>'], g = ["<p", ' class="text-red-500">', "</p>"];
function R() {
  return Me(), onMount(() => {
    b(false), r({}), J({});
  }), onCleanup(() => {
    b(true);
  }), [j.error && ssr(g, ssrHydrationKey(), escape(j.error)), ssr(f, ssrHydrationKey(), escape(createComponent(mt, { type: "usernameLogin", name: "username", placeholder: "Username", required: true })), escape(createComponent(mt, { type: "password", name: "password", placeholder: "Password", required: true })), escape(createComponent(B, { text: "Login", class: "ml-[auto] mr-[auto]", get disabled() {
    return !ut();
  } }))), ssr(h, ssrHydrationKey())];
}

export { R as default };
//# sourceMappingURL=index6.mjs.map
