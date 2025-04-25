import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createSignal, For, Show } from 'solid-js';
import { X } from './otpInput-gt68IOgQ.mjs';
import { Y } from './action-CiKOD-Zz.mjs';
import './index-CI1g57kZ.mjs';
import './icons-N8M97GAt.mjs';
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
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';
import 'bcryptjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import './Inputs-Cq_fgt2H.mjs';
import 'gsap';
import './ButtonSparkle-BxHzGCPC.mjs';
import './routing-Th2JWmJV.mjs';

var h = ["<p", ' class="responseOTP">', "</p>"], g = ["<div", ' class="otp-container"><div class="otp-field">', "</div><!--$-->", "<!--/--></div>"], d = ["<input", ' type="number" pattern="[0-9]*" inputmode="numeric" maxlength="1"', ">"], v = ["<span", ' class="text-white text-3xl ml-10 mr-10">&#183;</span>'];
function J($) {
  const [n, y] = createSignal(Array(6).fill("")), [o, O] = createSignal("");
  return Y(X), ssr(g, ssrHydrationKey(), escape(createComponent(For, { get each() {
    return n();
  }, children: (a, t) => [ssr(d, ssrHydrationKey(), ssrAttribute("value", escape(a, true), false) + ssrAttribute("class", t() === 0 ? "inputLeft" : t() === 5 || t() === 2 ? "inputRight" : t() === 3 ? "inputLeft" : "", false)), t() === 2 && ssr(v, ssrHydrationKey())] })), escape(createComponent(Show, { get when() {
    return o();
  }, get children() {
    return ssr(h, ssrHydrationKey(), escape(o()));
  } })));
}

export { J as default };
//# sourceMappingURL=otpInput.mjs.map
