import { ssr, ssrHydrationKey, ssrStyle, ssrAttribute, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { onMount } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

var l = ["<div", ' style="', '"', ">Contenuto Semplificato Uman Component</div>"];
function c(o) {
  return console.log("Componente Uman (semplificato) renderizzato"), onMount(() => {
    console.log("Componente Uman (semplificato) - onMount");
  }), ssr(l, ssrHydrationKey(), ssrStyle(o.style), ssrAttribute("class", escape(o.class, true), false));
}

export { c as default };
//# sourceMappingURL=index212.mjs.map
