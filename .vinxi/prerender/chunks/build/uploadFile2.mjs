import { ssr, ssrHydrationKey, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal, createMemo, Show } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { o } from './context-XUFMQc9R.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';

var c = ["<p", ' style="', '">', "</p>"], d = ["<div", ' class="CM"><h1>Carica Estratto Conto (CSV)</h1><form enctype="multipart/form-data"><div><label for="csv-file-input" class="text-white">Seleziona file CSV:</label><input id="csv-file-input" type="file" name="csv" accept=".csv" required></div><!--$-->', "<!--/--></form><!--$-->", "<!--/--></div>"];
function C() {
  const [a, u] = createSignal(null), l = createMemo(() => !a());
  return ssr(d, ssrHydrationKey(), escape(createComponent(B, { type: "submit", get disabled() {
    return l();
  }, text: "Submit file" })), escape(createComponent(Show, { get when() {
    return o.errorMessage;
  }, get children() {
    return ssr(c, ssrHydrationKey(), "color:red;margin-top:10px", escape(o.errorMessage));
  } })));
}

export { C as default };
//# sourceMappingURL=uploadFile2.mjs.map
