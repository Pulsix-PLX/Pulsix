import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC2.mjs';
import { a, c } from './context-5bbmmXgY2.mjs';
import { w } from './index-B8s1itkY2.mjs';
import { u as ut } from './Inputs-D1T1pLkj.mjs';
import { w as w$1 } from './pathWallets-Cb2AeUiP.mjs';
import 'solid-js/store';
import 'gsap';
import './server-fns-runtime-C3tiYEg6.mjs';
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
import './getWallets.server-C5R6kBVO.mjs';
import './auth.server-ChqlnWrh.mjs';

var C = ["<p", ' style="', '">Selected file: <strong>', "</strong></p>"], $ = ["<p", ' style="', '">', "</p>"], S = ["<div", ' class="CM"><h1>Carica Estratto Conto (CSV)</h1><form enctype="multipart/form-data" class><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></form></div>"], v = ["<strong", ">CSV file</strong>"], y = ["<br", ">"];
function N() {
  const [i, l] = createSignal(null);
  function a$1(c$1) {
    var _a;
    const n = (_a = c$1.currentTarget.files) == null ? void 0 : _a[0];
    n ? n.name.toLowerCase().endsWith(".csv") ? (l(n), c(null)) : (l(null), c("File selected is not a csv file")) : (l(null), c(null));
  }
  return ssr(S, ssrHydrationKey(), escape(createComponent(w, { id: "csv-file-input", name: "csv", accept: ".csv", required: true, onChange: a$1, get label() {
    return ["Drag & drop your ", ssr(v, ssrHydrationKey()), " here,", ssr(y, ssrHydrationKey()), " or click to select"];
  }, draggingLabel: "Release to drop the CSV file!" })), escape(createComponent(Show, { get when() {
    return i();
  }, get children() {
    var _a;
    return ssr(C, ssrHydrationKey(), "margin-top:1rem;color:#e2e8f0", escape((_a = i()) == null ? void 0 : _a.name));
  } })), escape(createComponent(Show, { get when() {
    return a.errorMessage;
  }, get children() {
    return ssr($, ssrHydrationKey(), "color:red;margin-top:10px", escape(a.errorMessage));
  } })), escape(createComponent(w$1, {})), escape(createComponent(B, { type: "submit", get disabled() {
    return !i() || !ut();
  }, text: "Submit file", class: "ml-130 mt-100" })));
}

export { N as default };
//# sourceMappingURL=index252.mjs.map
