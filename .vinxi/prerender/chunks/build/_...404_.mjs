import { ssr, ssrHydrationKey, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount, onCleanup } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { B } from './ButtonSparkle-DNpTyev3.mjs';
import { b } from './Menu-OQmUNT5t.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';
import './components-CJF4pMQg.mjs';
import './routing-BSDkuvr3.mjs';

var l = ["<div", ' class="page-404-container"><h1 class="Error404 ">404</h1><div class="cloak__wrapper"><div class="cloak__container"><div class="cloak"></div></div></div><div class="button-container" style="', '">', "</div></div>"];
function h() {
  return onMount(() => {
    b(false);
  }), onCleanup(() => {
    b(true);
  }), ssr(l, ssrHydrationKey(), "position:fixed;bottom:20%;left:50%;transform:translateX(-50%)", escape(createComponent(B, { text: "Go to home", size: 1.5, onClick: () => window.location.href = "/" })));
}

export { h as default };
//# sourceMappingURL=_...404_.mjs.map
