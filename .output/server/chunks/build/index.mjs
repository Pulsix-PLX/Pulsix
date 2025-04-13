import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { N } from './index-Bep36fvr.mjs';
import 'solid-js';

var t = ["<div", ' class="flex flex-row"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"];
function n() {
  return ssr(t, ssrHydrationKey(), escape(createComponent(N, { color: "purple", balance: "4000", wallet: "revolut" })), escape(createComponent(N, { color: "black", balance: "2000", wallet: "ash" })));
}

export { n as default };
//# sourceMappingURL=index.mjs.map
