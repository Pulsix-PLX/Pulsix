import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { onMount } from 'solid-js';
import { PulsixButton } from 'pulsix-solid';
import { d as b } from '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'vite-plugin-node-polyfills/shims/process';
import 'vite-plugin-node-polyfills/shims/global';
import 'node:async_hooks';
import 'jsonwebtoken';
import 'pg';
import 'solid-js/web/storage';
import 'solid-js/store';
import 'axios';
import 'node:fs';
import 'node:path';

var n = ["<div", ' class="CM">', "</div>"];
function d() {
  return onMount(() => {
    setTimeout(() => b(true), 100);
  }), ssr(n, ssrHydrationKey(), escape(createComponent(PulsixButton, { buttonColor: "blue", label: "Button Pulsix", class: "ml-200" })));
}

export { d as default };
//# sourceMappingURL=index27.mjs.map
