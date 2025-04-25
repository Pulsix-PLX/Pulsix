import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { r, J, m as mt, u as ut } from './Inputs-Cq_fgt2H.mjs';
import { b } from './Menu-B3jw0GIl.mjs';
import { j } from './auth-BeHg-fWi.mjs';
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
import './routing-Th2JWmJV.mjs';
import './components-Bjb1kgqQ.mjs';

var d = ["<form", ' class="CM mt-[10vh]" method="post"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form>"], c = ["<div", ' class="CM mt-[90vh]"><button class="text-blue-600 hover:text-white">Need to register?</button></div>'], f = ["<p", ' class="text-red-500">', "</p>"];
function K() {
  return onMount(() => {
    b(false), r({}), J({});
  }), [j.error && ssr(f, ssrHydrationKey(), escape(j.error)), ssr(d, ssrHydrationKey(), escape(createComponent(mt, { type: "usernameLogin", name: "username", placeholder: "Username", required: true })), escape(createComponent(mt, { type: "password", name: "password", placeholder: "Password", required: true })), escape(createComponent(B, { text: "Go Transactions", class: "ml-[auto] mr-[auto] ", get disabled() {
    return !ut();
  } }))), ssr(c, ssrHydrationKey())];
}

export { K as default };
//# sourceMappingURL=index4.mjs.map
