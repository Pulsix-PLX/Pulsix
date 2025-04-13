import { ssr, ssrHydrationKey, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { N } from './index-Bep36fvr.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

var t = ["<div", ' class="flex flex-row"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"];
function n() {
  return ssr(t, ssrHydrationKey(), escape(createComponent(N, { color: "purple", balance: "4000", wallet: "revolut" })), escape(createComponent(N, { color: "black", balance: "2000", wallet: "ash" })));
}

export { n as default };
//# sourceMappingURL=index.mjs.map
