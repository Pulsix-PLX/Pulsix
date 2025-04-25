import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createSignal, For, Show } from 'solid-js';
import { X } from './otpInput-DH-dkh0p.mjs';
import { Y } from '../_/nitro.mjs';
import './index-CI1g57kZ2.mjs';
import './icons-N8M97GAt2.mjs';
import './server-fns-runtime-C3tiYEg6.mjs';
import 'solid-js/web/storage';
import 'bcryptjs';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import './Inputs-D1T1pLkj.mjs';
import 'solid-js/store';
import 'gsap';
import './ButtonSparkle-BxHzGCPC2.mjs';
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
//# sourceMappingURL=otpInput2.mjs.map
