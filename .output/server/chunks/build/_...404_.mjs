import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount, onCleanup } from 'solid-js';
import { B } from './ButtonSparkle-BxHzGCPC.mjs';
import { b } from './Menu-B3jw0GIl.mjs';
import 'solid-js/store';
import './components-Bjb1kgqQ.mjs';
import './routing-Th2JWmJV.mjs';

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
