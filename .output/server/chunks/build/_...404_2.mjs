import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount, onCleanup } from 'solid-js';
import { B } from './ButtonSparkle-DNpTyev32.mjs';
import { e as b } from '../_/nitro.mjs';
import 'solid-js/store';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import 'solid-js/web/storage';
import 'node:async_hooks';
import 'node:path';

var l = ["<div", ' class="page-404-container"><h1 class="Error404 ">404</h1><div class="cloak__wrapper"><div class="cloak__container"><div class="cloak"></div></div></div><div class="button-container" style="', '">', "</div></div>"];
function h() {
  return onMount(() => {
    b(false);
  }), onCleanup(() => {
    b(true);
  }), ssr(l, ssrHydrationKey(), "position:fixed;bottom:20%;left:50%;transform:translateX(-50%)", escape(createComponent(B, { text: "Go to home", size: 1.5, onClick: () => window.location.href = "/" })));
}

export { h as default };
//# sourceMappingURL=_...404_2.mjs.map
