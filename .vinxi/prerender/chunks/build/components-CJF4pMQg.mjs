import { ssrElement, mergeProps as mergeProps$1 } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { mergeProps, splitProps, createMemo } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';
import { W as We, $ as $e, D as De, F } from './routing-BSDkuvr3.mjs';

function A(e) {
  e = mergeProps({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, r] = splitProps(e, ["href", "state", "class", "activeClass", "inactiveClass", "end"]), i = We(() => e.href), o = $e(i), l = De(), a = createMemo(() => {
    const n = i();
    if (n === void 0) return [false, false];
    const t = F(n.split(/[?#]/, 1)[0]).toLowerCase(), s = decodeURI(F(l.pathname).toLowerCase());
    return [e.end ? t === s : s.startsWith(t + "/") || s === t, t === s];
  });
  return ssrElement("a", mergeProps$1(r, { get href() {
    return o() || e.href;
  }, get state() {
    return JSON.stringify(e.state);
  }, get classList() {
    return { ...e.class && { [e.class]: true }, [e.inactiveClass]: !a()[0], [e.activeClass]: a()[0], ...r.classList };
  }, link: true, get "aria-current"() {
    return a()[1] ? "page" : void 0;
  } }), void 0, true);
}

export { A };
//# sourceMappingURL=components-CJF4pMQg.mjs.map
