import { createComponent, ssr, ssrHydrationKey, escape, mergeProps } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';
import { A } from './components-Bjb1kgqQ.mjs';

var u = ["<svg", ' class="Icon" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="', '"><path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.489a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79v10.51Zm-2-1V9.978l-7-5.445-7 5.445V19h14Z"></path></svg>'], w = ["<svg", ' class="Icon" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="', '"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 12v-4"></path><path d="M15 12v-2"></path><path d="M12 12v-1"></path><path d="M3 4h18"></path><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10"></path><path d="M12 16v4"></path><path d="M9 20h6"></path></svg>'], f = ["<svg", ' class="Icon" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" style="', '"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"></path></svg>'], x = ["<div", ' class="flex flex-col gap-27 mt-60">', "</div>"], M = ["<div", ' class="', '"><div class="flex flex-col ml-15 gap-31 mt-60">', "</div><!--$-->", "<!--/--></div>"];
function H() {
  const [n, v] = createSignal(false), [s, c] = createSignal(null), l = [{ name: "Home", svg: ssr(u, ssrHydrationKey(), "overflow:visible;color:currentcolor;width:24px;height:24px") }, { name: "Dashboard", svg: ssr(w, ssrHydrationKey(), "overflow:visible;color:currentcolor;width:24px;height:24px") }, { name: "Wallets", svg: ssr(f, ssrHydrationKey(), "overflow:none;color:currentcolor;width:24px;height:24px") }], p = [{ name: "Home", icon: "Home", href: "/", svg: l[0].svg }, { name: "Dashboard", icon: "Dashboard", href: "/", svg: l[1].svg }, { name: "Wallets", icon: "Wallet", href: "/Wallets", svg: l[2].svg }], i = (e) => ({ onMouseEnter: () => c(e), onMouseLeave: () => c(null) });
  return ssr(M, ssrHydrationKey(), `Menu flex flex-row z-10 ${n() ? "Extend" : ""}`, escape(p.map((e) => createComponent(A, mergeProps({ get href() {
    return e.href;
  }, get class() {
    return `Icon ${s() === e.name ? "Hover" : ""}`;
  } }, () => i(e.name), { get children() {
    return e.svg;
  } })))), escape(createComponent(Show, { get when() {
    return n();
  }, get children() {
    return ssr(x, ssrHydrationKey(), escape(p.map((e) => createComponent(A, mergeProps({ get href() {
      return e.href;
    }, get class() {
      return `Text ${s() === e.name ? "Hover" : ""} ${s() !== e.name && s() ? "Blur" : ""}`;
    } }, () => i(e.name), { get children() {
      return e.name;
    } })))));
  } })));
}
const [$, b] = createSignal(true);
function y() {
  const [n, v] = createSignal(false);
  return setTimeout(() => {
    v(true);
  }, 300), createComponent(Show, { get when() {
    return $() && n();
  }, get children() {
    return createComponent(H, {});
  } });
}

export { b, y };
//# sourceMappingURL=Menu-B3jw0GIl.mjs.map
