import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createSignal, For, Show } from 'solid-js';
import { X } from './otpInput-Dlb7jUEo.mjs';
import { Y } from './action-BVKOmiKt.mjs';
import './index-CI1g57kZ.mjs';
import './icons-N8M97GAt.mjs';
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
import 'bcryptjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import './Inputs-CEYxPBfP.mjs';
import 'solid-js/store';
import 'gsap';
import './ButtonSparkle-DNpTyev3.mjs';
import './routing-BSDkuvr3.mjs';

var h = ["<p", ' class="responseOTP">', "</p>"], g = ["<div", ' class="otp-container"><div class="otp-field">', "</div><!--$-->", "<!--/--></div>"], d = ["<input", ' type="number" pattern="[0-9]*" inputmode="numeric" maxlength="1"', ">"], v = ["<span", ' class="text-white text-3xl ml-10 mr-10">&#183;</span>'];
function E($) {
  const [n, y] = createSignal(Array(6).fill("")), [o, O] = createSignal("");
  return Y(X), ssr(g, ssrHydrationKey(), escape(createComponent(For, { get each() {
    return n();
  }, children: (a, t) => [ssr(d, ssrHydrationKey(), ssrAttribute("value", escape(a, true), false) + ssrAttribute("class", t() === 0 ? "inputLeft" : t() === 5 || t() === 2 ? "inputRight" : t() === 3 ? "inputLeft" : "", false)), t() === 2 && ssr(v, ssrHydrationKey())] })), escape(createComponent(Show, { get when() {
    return o();
  }, get children() {
    return ssr(h, ssrHydrationKey(), escape(o()));
  } })));
}

export { E as default };
//# sourceMappingURL=otpInput.mjs.map
