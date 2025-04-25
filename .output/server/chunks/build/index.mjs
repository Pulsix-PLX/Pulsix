import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount } from 'solid-js';
import { PulsixButton } from 'pulsix-solid';
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
