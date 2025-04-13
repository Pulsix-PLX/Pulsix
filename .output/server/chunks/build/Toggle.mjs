import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { b, w } from './index.module-0iUivGU7.mjs';
import 'solid-js';

var s = ["<div", ' class="CM flex flex-col"><div class="', '"></div><div id="ContainerTexts" class="mt-[1vw] flex flex-row z-20 w-[4.5vw] h-[0.8vw]" style="', '"><div class="', '">Login</div><div class="', '">SignUp</div></div></div>'];
function c() {
  return ssr(s, ssrHydrationKey(), `${escape(b.toggle, true)}`, "text-align:center", `ml-[45%] text-center ${w() ? escape(b.activeText, true) : escape(b.text, true)}`, `ml-[150%] align-middle ${w() ? escape(b.text, true) : escape(b.activeText, true)}`);
}

export { c as default };
//# sourceMappingURL=Toggle.mjs.map
