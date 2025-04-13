import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { r, j, y as ye, w as we } from './Inputs-CEYxPBfP.mjs';
import { r as rt } from './Title-C8lsFfVd.mjs';
import { x, s } from './index-CI1g57kZ.mjs';
import { n } from './index.module-B9JvMj-k.mjs';
import 'solid-js/store';
import 'gsap';
import './server-fns-runtime-4T1EILgx.mjs';
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
import './db.server-BYnrqg0d.mjs';
import 'pg';
import './action-BVKOmiKt.mjs';
import './routing-BSDkuvr3.mjs';
import './icons-N8M97GAt.mjs';

var c = ["<div", ' class="', '" style="', '"><!--$-->', '<!--/--><form class="', '" style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form></div>"];
function G() {
  return onMount(() => {
    r({}), j({});
  }), ssr(c, ssrHydrationKey(), `w-500 ${escape(n.formContainer, true)} ${ye() ? escape(n.valid, true) : ""}`, "justify-items:center", escape(createComponent(rt, { title: "Credentials", class: "-mt-40" })), "w-300 mt-100", "justify-items:center", escape(createComponent(we, { name: "username", type: "username", placeholder: "Username", required: true })), escape(createComponent(we, { name: "password", type: "password", placeholder: "Password", required: true })), escape(createComponent(we, { name: "passwordConfirm", type: "passwordConfirm", placeholder: "Confirm", required: true })), escape(createComponent(we, { name: "name", type: "text", placeholder: "Name", required: true })), escape(createComponent(we, { name: "surname", type: "text", placeholder: "Surmane", required: true })), escape(createComponent(we, { name: "dateOfBirthday", type: "date", placeholder: "Surmane", required: true })), escape(createComponent(B, { shadow: 10, text: "Next", get disabled() {
    return !ye();
  }, class: "h-50", onClick: () => {
    x(s() + 1);
  } })));
}

export { G as default };
//# sourceMappingURL=index7.mjs.map
