import { ssr, ssrHydrationKey, escape } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { b, w } from './index.module-0iUivGU7.mjs';
import 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

var s = ["<div", ' class="CM flex flex-col"><div class="', '"></div><div id="ContainerTexts" class="mt-[1vw] flex flex-row z-20 w-[4.5vw] h-[0.8vw]" style="', '"><div class="', '">Login</div><div class="', '">SignUp</div></div></div>'];
function c() {
  return ssr(s, ssrHydrationKey(), `${escape(b.toggle, true)}`, "text-align:center", `ml-[45%] text-center ${w() ? escape(b.activeText, true) : escape(b.text, true)}`, `ml-[150%] align-middle ${w() ? escape(b.text, true) : escape(b.activeText, true)}`);
}

export { c as default };
//# sourceMappingURL=Toggle.mjs.map
