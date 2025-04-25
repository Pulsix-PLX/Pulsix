import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import { createSignal, Show, createResource, Switch, Match, Suspense, lazy } from 'solid-js';
import { S, x, A as A$2 } from './prova-BDuT1_bg.mjs';
import { m, P as P$1 } from './index-D_2WSMiS.mjs';
import { A as A$1 } from './components-Bjb1kgqQ.mjs';
import { m as mt } from './Inputs-Cq_fgt2H.mjs';
import { p, D, d, x as x$1 } from './deleteWallet-DdSpVRBs.mjs';
import { B as B$1 } from './ButtonSparkle-BxHzGCPC.mjs';

var L = ["<img", ' class="absolute w-23 cursor-pointer z-100" src="/icons/edit.png">'];
function X(e) {
  const [i, s] = createSignal(false);
  return createComponent(A$1, { get href() {
    return e.href;
  }, onclick: (c) => {
    console.log("Link clicked. Edit mode:", m()), m() ? (console.log("Preventing default link action and stopping propagation because edit=true"), c.preventDefault(), c.stopPropagation()) : e.onClick && (console.log("Executing props.onclick"), e.onClick());
  }, onmouseenter: () => s(true), onmouseleave: () => s(false), get children() {
    return createComponent(S, { get children() {
      return createComponent(x, { class: "border-black border-4 w-[21vw] h-[12.5vw] rounded-xl -mt-100", get color() {
        return e.color;
      }, get children() {
        return [createComponent(A$2, { translateZ: 10, class: "absolute ml-[17.7vw] mt-[9.2vw]", as: "button", get children() {
          return createComponent(Show, { get when() {
            return i();
          }, get children() {
            return ssr(L, ssrHydrationKey());
          } });
        } }), createComponent(A$2, { translateZ: 20, class: "text-white text-[1vw] text-center mt-[1vw]", get children() {
          return e.name;
        } }), createComponent(A$2, { as: "p", translateZ: 40, class: "text-white text-[1vw] text-center", get children() {
          return [e.balance, e.currency == "USD" ? "$" : e.currency == "EUR" ? "\u20AC" : e.currency];
        } })];
      } });
    } });
  } });
}
var P = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[27vh] ml-[11vw] z-50">'], U = ["<form", ' method="post" class="CM w-[25vw] mt-[25vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], H = ["<img", ' src="/icons/Delete.png" class=" CM w-20 h-20 mt-[24vh] ml-[11vw] z-50">'], V = ["<div", ' class="color-picker-container" style="', '">', "</div>"], B = ["<select", ' name="color"', '><option value="black">Black</option><option value="purple">Purple</option></select>'], I = ["<form", ' method="post" class="CM w-[25vw] mt-[22vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw]" style="', '"><input type="hidden" name="id"', '><input type="hidden" name="type"', "><!--$-->", '<!--/--><select name="currency"', '><option value="USD">USD</option><option value="EUR">EUR</option><option value="CHF">CHF</option></select><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><input type="hidden"', ' name="color"><!--$-->', '<!--/--><button type="button" class="', '" style="', '">Delete</button></form>'], N = ["<div", ' class="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>'], R = ["<div", ' class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[17vw] w-[27vw] rounded shadow-md z-50" style="', '"><p class="', '">Are you sure to delete this wallet?</p><p class="', '">It will be in the trash</p><p class="', '">you can restore it in 30 days</p><div class="flex flex-row justify-center items-center gap-34 mt-[3vw]"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"], A = ["<div", ">Loading Color Picker...</div>"];
const T = lazy(() => import('./index-WwoiZKEg.mjs').then((e) => ({ default: e.DefaultColorPicker })));
function Y() {
  const [e] = createResource(m(), p), [i, s] = createSignal(), [x, c] = createSignal(false), [d$1, p$1] = createSignal(null);
  return createComponent(Show, { get when() {
    return e();
  }, get children() {
    return [createComponent(Switch, { get children() {
      return [createComponent(Match, { get when() {
        var _a;
        return ((_a = e()) == null ? void 0 : _a.type) == "container";
      }, get children() {
        var _a, _b;
        return [ssr(P, ssrHydrationKey()), ssr(U, ssrHydrationKey() + ssrAttribute("action", escape(D, true), false), "border:3px solid rgba(255, 255, 255, 0.3);border-radius:40px", ssrAttribute("value", escape((_a = e()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = e()) == null ? void 0 : _b.type, true), false), escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.wallet_name;
        } })), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = e()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(B$1, { get text() {
          var _a2;
          return `Set ${((_a2 = e()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", onClick: () => setTimeout(() => P$1(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(d.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } }), createComponent(Match, { get when() {
        var _a;
        return ((_a = e()) == null ? void 0 : _a.type) == "wallet";
      }, get children() {
        var _a, _b, _c, _d;
        return [ssr(H, ssrHydrationKey()), ssr(I, ssrHydrationKey() + ssrAttribute("action", escape(D, true), false), `border:3px solid ${escape(i(), true) || "grey"};border-radius:40px`, ssrAttribute("value", escape((_a = e()) == null ? void 0 : _a.id, true), false), ssrAttribute("value", escape((_b = e()) == null ? void 0 : _b.type, true), false), escape(createComponent(mt, { type: "text", name: "walletName", placeholder: "Wallet Name", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.wallet_name;
        } })), ssrAttribute("value", escape((_c = e()) == null ? void 0 : _c.currency, true), false), escape(createComponent(mt, { type: "text", name: "category_id", placeholder: "Category", get defaultValue() {
          var _a2, _b2;
          return (_b2 = (_a2 = e()) == null ? void 0 : _a2.category_id) == null ? void 0 : _b2.toString();
        } })), escape(createComponent(mt, { type: "text", name: "nation", placeholder: "nation", get defaultValue() {
          var _a2;
          return (_a2 = e()) == null ? void 0 : _a2.nation;
        } })), escape(createComponent(Switch, { get children() {
          return [createComponent(Match, { get when() {
            var _a2;
            return ((_a2 = e()) == null ? void 0 : _a2.type_ui) == "card";
          }, get children() {
            return ssr(V, ssrHydrationKey(), "margin-bottom:2rem", escape(createComponent(Suspense, { get fallback() {
              return ssr(A, ssrHydrationKey());
            }, get children() {
              return createComponent(T, { get value() {
                var _a2;
                return i() || ((_a2 = e()) == null ? void 0 : _a2.color) || "#ff000000";
              }, onChange: ($) => s($), format: "hex" });
            } })));
          } }), createComponent(Match, { get when() {
            var _a2;
            return ((_a2 = e()) == null ? void 0 : _a2.type_ui) == "3D";
          }, get children() {
            var _a2;
            return ssr(B, ssrHydrationKey(), ssrAttribute("value", escape((_a2 = e()) == null ? void 0 : _a2.color, true), false));
          } })];
        } })), ssrAttribute("value", escape(i(), true) || escape((_d = e()) == null ? void 0 : _d.color, true) || "#ff000000", false), escape(createComponent(B$1, { get text() {
          var _a2;
          return `Set ${((_a2 = e()) == null ? void 0 : _a2.type) == "container" ? "Container" : "Wallet"}`;
        }, class: "ml-[auto] mr-[auto]", size: "large", get shadowColor() {
          return `${i()}`;
        }, shadow: 10, onClick: () => setTimeout(() => P$1(null), 500) })), ` text-white font-bold py-2 px-4 rounded ml-[auto] mr-[auto] mt-[1vw] ${escape(d.buttonDelete, true)}`, "border:2px solid red;border-radius:20px;width:100px;height:50px")];
      } })];
    } }), createComponent(Show, { get when() {
      return x();
    }, get children() {
      return [ssr(N, ssrHydrationKey()), ssr(R, ssrHydrationKey(), `background-color:#151515;border-radius:40px;border:3px solid ${escape(i(), true) || "#ffffffff"}`, `${escape(d.text, true)} text-[1.4vw] font-bold text-center`, `${d$1() == "cancel" ? escape(d.textCancel, true) : d$1() == "confirm" ? escape(d.textDelete, true) : escape(d.paragraf, true)} text-[1vw] font-bold text-center mt-[2vw]`, `${d$1() == "cancel" ? escape(d.textCancel, true) : d$1() == "confirm" ? escape(d.textDelete, true) : escape(d.paragraf, true)} text-[1vw] font-bold text-center mt-[0.5vw]`, escape(createComponent(B$1, { text: "Cancel", onClick: () => c(false), shadowColor: "hsl(0, 100%, 54%)", onMouseEnter: () => p$1("cancel"), onMouseLeave: () => p$1(null), shadow: 10 })), escape(createComponent(B$1, { shadowColor: "hsla(155, 100%, 50%, 0.922)", text: "Delete", shadow: 10, onClick: async () => {
        var _a, _b;
        await x$1((_a = e()) == null ? void 0 : _a.id, (_b = e()) == null ? void 0 : _b.type), setTimeout(() => P$1(null), 500);
      }, onMouseEnter: () => p$1("confirm"), onMouseLeave: () => p$1(null) })))];
    } })];
  } });
}

export { X, Y };
//# sourceMappingURL=index-C_IFjkFj.mjs.map
