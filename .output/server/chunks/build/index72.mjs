import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev32.mjs';
import { r, j, f as fe, v as ve } from './Inputs-BxVpbjg0.mjs';
import { r as rt } from './Title-C8lsFfVd2.mjs';
import { x, s } from './index-CI1g57kZ2.mjs';
import { n } from './index.module-B9JvMj-k2.mjs';
import 'solid-js/store';
import 'gsap';
import './db.server-Cxzv6220.mjs';
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
import 'node:fs';
import 'node:async_hooks';
import 'node:path';
import 'pg';
import './icons-N8M97GAt2.mjs';

var c = ["<div", ' class="', '" style="', '"><!--$-->', '<!--/--><form class="', '" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form></div>"];
function g() {
  return onMount(() => {
    r({}), j({});
  }), ssr(c, ssrHydrationKey(), `w-500 ${escape(n.formContainer, true)} ${fe() ? escape(n.valid, true) : ""}`, "justify-items:center", escape(createComponent(rt, { title: "Credentials", class: "-mt-40" })), "w-300 mt-100", "justify-items:center", escape(createComponent(ve, { name: "username", type: "username", placeholder: "Username", required: true })), escape(createComponent(ve, { name: "password", type: "password", placeholder: "Password", required: true })), escape(createComponent(ve, { name: "passwordConfirm", type: "passwordConfirm", placeholder: "Confirm", required: true })), escape(createComponent(ve, { name: "name", type: "text", placeholder: "Name", required: true })), escape(createComponent(ve, { name: "surname", type: "text", placeholder: "Surmane", required: true })), escape(createComponent(ve, { name: "dateOfBirthday", type: "date", placeholder: "Surmane", required: true })), escape(createComponent(B, { shadow: 10, text: "Next", get disabled() {
    return !fe();
  }, class: "h-50", onClick: () => {
    x(s() + 1);
  } })));
}

export { g as default };
//# sourceMappingURL=index72.mjs.map
