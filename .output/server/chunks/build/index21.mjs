import { ssr, ssrHydrationKey, ssrStyle, ssrAttribute, escape } from 'solid-js/web';
import { onMount } from 'solid-js';

var l = ["<div", ' style="', '"', ">Contenuto Semplificato Uman Component</div>"];
function c(o) {
  return console.log("Componente Uman (semplificato) renderizzato"), onMount(() => {
    console.log("Componente Uman (semplificato) - onMount");
  }), ssr(l, ssrHydrationKey(), ssrStyle(o.style), ssrAttribute("class", escape(o.class, true), false));
}

export { c as default };
//# sourceMappingURL=index21.mjs.map
