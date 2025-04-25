import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { r, J, u as ut, m as mt } from './Inputs-Cq_fgt2H.mjs';
import { r as rt } from './Title-C8lsFfVd.mjs';
import { x, s } from './index-CI1g57kZ.mjs';
import { n } from './index.module-B9JvMj-k.mjs';
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
import './icons-N8M97GAt.mjs';

var c = ["<div", ' class="', '" style="', '"><!--$-->', '<!--/--><form class="', '" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form></div>"];
function H() {
  return onMount(() => {
    r({}), J({});
  }), ssr(c, ssrHydrationKey(), `w-500 ${escape(n.formContainer, true)} ${ut() ? escape(n.valid, true) : ""}`, "justify-items:center", escape(createComponent(rt, { title: "Credentials", class: "-mt-40" })), "w-300 mt-100", "justify-items:center", escape(createComponent(mt, { name: "username", type: "username", placeholder: "Username", required: true })), escape(createComponent(mt, { name: "password", type: "password", placeholder: "Password", required: true })), escape(createComponent(mt, { name: "passwordConfirm", type: "passwordConfirm", placeholder: "Confirm", required: true })), escape(createComponent(mt, { name: "dateOfBirthday", type: "date", placeholder: "Date of Birthday", required: true })), escape(createComponent(mt, { name: "name", type: "text", placeholder: "Name", required: true })), escape(createComponent(mt, { name: "surname", type: "text", placeholder: "Surmane", required: true })), escape(createComponent(B, { shadow: 10, text: "Next", get disabled() {
    return !ut();
  }, class: "h-50", onClick: () => {
    x(s() + 1);
  } })));
}

export { H as default };
//# sourceMappingURL=index10.mjs.map
