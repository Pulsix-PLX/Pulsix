import { ssr, ssrHydrationKey, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { PulsixButton } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pulsix-solid@1.0.17_pulsix@1.0.5_solid-js@1.9.5/node_modules/pulsix-solid/dist/index.mjs';
import { b } from './Menu-B3jw0GIl.mjs';
import './components-Bjb1kgqQ.mjs';
import './routing-Th2JWmJV.mjs';

var n = ["<div", ' class="CM">', "</div>"];
function d() {
  return onMount(() => {
    setTimeout(() => b(true), 100);
  }), ssr(n, ssrHydrationKey(), escape(createComponent(PulsixButton, { buttonColor: "blue", label: "Button Pulsix", class: "ml-200" })));
}

export { d as default };
//# sourceMappingURL=index.mjs.map
