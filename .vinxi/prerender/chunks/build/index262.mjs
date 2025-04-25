import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/web/dist/server.js';
import { createSignal } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/dist/server.js';

var l = ["<svg", ' xmlns="http://www.w3.org/2000/svg" class="dropzone-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.33-2.13 5.25 5.25 0 011.168 10.9z"></path></svg>'], d = ["<div", ' class="modern-dropzone-wrapper"><div class="', '"><input', ' type="file"', "", ' style="', '" aria-hidden="true"><div class="dropzone-content"><!--$-->', '<!--/--> <p class="dropzone-text">', '</p><span class="dropzone-browse-link">Browse files</span></div><div class="dropzone-border-animation"></div></div></div>'], c = ["<strong", ">", "</strong>"], p = ["<br", ">"];
const g = () => ssr(l, ssrHydrationKey()), w = (r) => {
  var _a, _b, _c, _d;
  const [a, m] = createSignal(false);
  return ssr(d, ssrHydrationKey(), `modern-dropzone ${a() ? "dragging" : ""}`, ssrAttribute("id", escape(r.id, true), false), ssrAttribute("name", escape(r.name, true), false) + ssrAttribute("accept", escape(r.accept, true), false), ssrAttribute("required", r.required, true), "display:none", (_a = escape(r.icon)) != null ? _a : escape(createComponent(g, {})), a() ? (_b = escape(r.draggingLabel)) != null ? _b : "Drop the file here!" : (_d = escape(r.label)) != null ? _d : escape(["Drag & drop your ", ssr(c, ssrHydrationKey(), (_c = escape(r.accept)) != null ? _c : "file"), " here,", ssr(p, ssrHydrationKey()), " or click to select"]));
};

export { w as default };
//# sourceMappingURL=index262.mjs.map
