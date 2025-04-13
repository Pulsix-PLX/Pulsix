import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape, ssrStyle } from 'solid-js/web';
import { createSignal, createMemo, createEffect, onCleanup, on, createContext, useContext, createComponent as createComponent$1, Suspense, splitProps, Show, For } from 'solid-js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const Dt = ["transparent", "currentColor", "inherit", "revert", "initial"], x = (a) => {
  const e = Math.floor(a);
  return a - e < 0.5 ? e : Math.round(a);
}, Xe = [["aliceblue", { r: 240, g: 248, b: 255 }], ["antiquewhite", { r: 250, g: 235, b: 215 }], ["aqua", { r: 0, g: 255, b: 255 }], ["aquamarine", { r: 127, g: 255, b: 212 }], ["azure", { r: 240, g: 255, b: 255 }], ["beige", { r: 245, g: 245, b: 220 }], ["bisque", { r: 255, g: 228, b: 196 }], ["black", { r: 0, g: 0, b: 0 }], ["blanchedalmond", { r: 255, g: 235, b: 205 }], ["blue", { r: 0, g: 0, b: 255 }], ["blueviolet", { r: 138, g: 43, b: 226 }], ["brown", { r: 165, g: 42, b: 42 }], ["burlywood", { r: 222, g: 184, b: 135 }], ["cadetblue", { r: 95, g: 158, b: 160 }], ["chartreuse", { r: 127, g: 255, b: 0 }], ["chocolate", { r: 210, g: 105, b: 30 }], ["coral", { r: 255, g: 127, b: 80 }], ["cornflowerblue", { r: 100, g: 149, b: 237 }], ["cornsilk", { r: 255, g: 248, b: 220 }], ["crimson", { r: 220, g: 20, b: 60 }], ["cyan", { r: 0, g: 255, b: 255 }], ["darkblue", { r: 0, g: 0, b: 139 }], ["darkcyan", { r: 0, g: 139, b: 139 }], ["darkgoldenrod", { r: 184, g: 134, b: 11 }], ["darkgray", { r: 169, g: 169, b: 169 }], ["darkgreen", { r: 0, g: 100, b: 0 }], ["darkgrey", { r: 169, g: 169, b: 169 }], ["darkkhaki", { r: 189, g: 183, b: 107 }], ["darkmagenta", { r: 139, g: 0, b: 139 }], ["darkolivegreen", { r: 85, g: 107, b: 47 }], ["darkorange", { r: 255, g: 140, b: 0 }], ["darkorchid", { r: 153, g: 50, b: 204 }], ["darkred", { r: 139, g: 0, b: 0 }], ["darksalmon", { r: 233, g: 150, b: 122 }], ["darkseagreen", { r: 143, g: 188, b: 143 }], ["darkslateblue", { r: 72, g: 61, b: 139 }], ["darkslategray", { r: 47, g: 79, b: 79 }], ["darkslategrey", { r: 47, g: 79, b: 79 }], ["darkturquoise", { r: 0, g: 206, b: 209 }], ["darkviolet", { r: 148, g: 0, b: 211 }], ["deeppink", { r: 255, g: 20, b: 147 }], ["deepskyblue", { r: 0, g: 191, b: 255 }], ["dimgray", { r: 105, g: 105, b: 105 }], ["dimgrey", { r: 105, g: 105, b: 105 }], ["dodgerblue", { r: 30, g: 144, b: 255 }], ["firebrick", { r: 178, g: 34, b: 34 }], ["floralwhite", { r: 255, g: 250, b: 240 }], ["forestgreen", { r: 34, g: 139, b: 34 }], ["fuchsia", { r: 255, g: 0, b: 255 }], ["gainsboro", { r: 220, g: 220, b: 220 }], ["ghostwhite", { r: 248, g: 248, b: 255 }], ["goldenrod", { r: 218, g: 165, b: 32 }], ["gold", { r: 255, g: 215, b: 0 }], ["gray", { r: 128, g: 128, b: 128 }], ["green", { r: 0, g: 128, b: 0 }], ["greenyellow", { r: 173, g: 255, b: 47 }], ["grey", { r: 128, g: 128, b: 128 }], ["honeydew", { r: 240, g: 255, b: 240 }], ["hotpink", { r: 255, g: 105, b: 180 }], ["indianred", { r: 205, g: 92, b: 92 }], ["indigo", { r: 75, g: 0, b: 130 }], ["ivory", { r: 255, g: 255, b: 240 }], ["khaki", { r: 240, g: 230, b: 140 }], ["lavenderblush", { r: 255, g: 240, b: 245 }], ["lavender", { r: 230, g: 230, b: 250 }], ["lawngreen", { r: 124, g: 252, b: 0 }], ["lemonchiffon", { r: 255, g: 250, b: 205 }], ["lightblue", { r: 173, g: 216, b: 230 }], ["lightcoral", { r: 240, g: 128, b: 128 }], ["lightcyan", { r: 224, g: 255, b: 255 }], ["lightgoldenrodyellow", { r: 250, g: 250, b: 210 }], ["lightgray", { r: 211, g: 211, b: 211 }], ["lightgreen", { r: 144, g: 238, b: 144 }], ["lightgrey", { r: 211, g: 211, b: 211 }], ["lightpink", { r: 255, g: 182, b: 193 }], ["lightsalmon", { r: 255, g: 160, b: 122 }], ["lightseagreen", { r: 32, g: 178, b: 170 }], ["lightskyblue", { r: 135, g: 206, b: 250 }], ["lightslategray", { r: 119, g: 136, b: 153 }], ["lightslategrey", { r: 119, g: 136, b: 153 }], ["lightsteelblue", { r: 176, g: 196, b: 222 }], ["lightyellow", { r: 255, g: 255, b: 224 }], ["lime", { r: 0, g: 255, b: 0 }], ["limegreen", { r: 50, g: 205, b: 50 }], ["linen", { r: 250, g: 240, b: 230 }], ["magenta", { r: 255, g: 0, b: 255 }], ["maroon", { r: 128, g: 0, b: 0 }], ["mediumaquamarine", { r: 102, g: 205, b: 170 }], ["mediumblue", { r: 0, g: 0, b: 205 }], ["mediumorchid", { r: 186, g: 85, b: 211 }], ["mediumpurple", { r: 147, g: 112, b: 219 }], ["mediumseagreen", { r: 60, g: 179, b: 113 }], ["mediumslateblue", { r: 123, g: 104, b: 238 }], ["mediumspringgreen", { r: 0, g: 250, b: 154 }], ["mediumturquoise", { r: 72, g: 209, b: 204 }], ["mediumvioletred", { r: 199, g: 21, b: 133 }], ["midnightblue", { r: 25, g: 25, b: 112 }], ["mintcream", { r: 245, g: 255, b: 250 }], ["mistyrose", { r: 255, g: 228, b: 225 }], ["moccasin", { r: 255, g: 228, b: 181 }], ["navajowhite", { r: 255, g: 222, b: 173 }], ["navy", { r: 0, g: 0, b: 128 }], ["oldlace", { r: 253, g: 245, b: 230 }], ["olive", { r: 128, g: 128, b: 0 }], ["olivedrab", { r: 107, g: 142, b: 35 }], ["orange", { r: 255, g: 165, b: 0 }], ["orangered", { r: 255, g: 69, b: 0 }], ["orchid", { r: 218, g: 112, b: 214 }], ["palegoldenrod", { r: 238, g: 232, b: 170 }], ["palegreen", { r: 152, g: 251, b: 152 }], ["paleturquoise", { r: 175, g: 238, b: 238 }], ["palevioletred", { r: 219, g: 112, b: 147 }], ["papayawhip", { r: 255, g: 239, b: 213 }], ["peachpuff", { r: 255, g: 218, b: 185 }], ["peru", { r: 205, g: 133, b: 63 }], ["pink", { r: 255, g: 192, b: 203 }], ["plum", { r: 221, g: 160, b: 221 }], ["powderblue", { r: 176, g: 224, b: 230 }], ["purple", { r: 128, g: 0, b: 128 }], ["rebeccapurple", { r: 102, g: 51, b: 153 }], ["red", { r: 255, g: 0, b: 0 }], ["rosybrown", { r: 188, g: 143, b: 143 }], ["royalblue", { r: 65, g: 105, b: 225 }], ["saddlebrown", { r: 139, g: 69, b: 19 }], ["salmon", { r: 250, g: 128, b: 114 }], ["sandybrown", { r: 244, g: 164, b: 96 }], ["seagreen", { r: 46, g: 139, b: 87 }], ["seashell", { r: 255, g: 245, b: 238 }], ["sienna", { r: 160, g: 82, b: 45 }], ["silver", { r: 192, g: 192, b: 192 }], ["skyblue", { r: 135, g: 206, b: 235 }], ["slateblue", { r: 106, g: 90, b: 205 }], ["slategray", { r: 112, g: 128, b: 144 }], ["slategrey", { r: 112, g: 128, b: 144 }], ["snow", { r: 255, g: 250, b: 250 }], ["springgreen", { r: 0, g: 255, b: 127 }], ["steelblue", { r: 70, g: 130, b: 180 }], ["tan", { r: 210, g: 180, b: 140 }], ["teal", { r: 0, g: 128, b: 128 }], ["thistle", { r: 216, g: 191, b: 216 }], ["tomato", { r: 255, g: 99, b: 71 }], ["turquoise", { r: 64, g: 224, b: 208 }], ["violet", { r: 238, g: 130, b: 238 }], ["wheat", { r: 245, g: 222, b: 179 }], ["white", { r: 255, g: 255, b: 255 }], ["whitesmoke", { r: 245, g: 245, b: 245 }], ["yellow", { r: 255, g: 255, b: 0 }], ["yellowgreen", { r: 154, g: 205, b: 50 }]], Pr = "deg|rad|grad|turn", Hr = "[-\\+]?\\d+%?", _r = "[-\\+]?\\d*\\.\\d+%?", Nr = `[-\\+]?\\d*\\.?\\d+(?:${Pr})?`, Ge = `(?:${_r})|(?:${Hr})`, $t = `(?:${Ge})|(?:${Nr}?)`, _a = "(?:[\\s|\\(\\s|\\s\\(\\s]+)?", Na = "(?:[\\s|\\)\\s]+)?", Jt = "(?:[,|\\s]+)", Ea = "(?:[,|\\/\\s]*)?", Se = `${_a}(${$t})${Jt}(${Ge})${Jt}(${Ge})${Ea}(${Ge})?${Na}`, se = { CSS_UNIT: new RegExp($t), ANGLES: Pr, CSS_ANGLE: Nr, CSS_INTEGER: Hr, CSS_NUMBER: _r, CSS_UNIT2: $t, PERMISSIVE_MATCH: Se, hwb: new RegExp(`hwb${Se}`), rgb: new RegExp(`rgb(?:a)?${Se}`), hsl: new RegExp(`hsl(?:a)?${Se}`), hsv: new RegExp(`hsv(?:a)?${Se}`), hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ }, Er = (a) => Dt.includes(a), Ne = (a, e) => a !== null && typeof a == "object" && Object.keys(e).every((t) => t in a), Tr = (a) => `${a}`.includes(".") && parseFloat(a) === 1, Vt = (a) => typeof a == "string" && a.includes("%"), K = (a) => !!se.CSS_UNIT.exec(`${a}`), Mr = ["rgb", "hex", "hsl", "hsv", "hwb"], Fr = (a) => Dt.includes(a) || ["#", ...Mr].some((e) => a.includes(e)) ? false : Xe.some(([e]) => a === e), Xt = 1e-6, Ta = (a, e) => Math.abs(a * e - e) < Xt ? 1 : a < Xt ? 0 : a, q = (a, e) => {
  let t = a;
  return Tr(a) && (t = "100%"), Vt(t) ? Number.parseFloat(t) / 100 : (t = typeof t != "number" ? Number.parseFloat(t) : t, e === 360 ? t = (t < 0 ? t % e + e : t > 360 ? t % e : t) / e : (t = Math.min(e, Math.max(0, t)), t = t / e), Ta(t, e));
}, Lt = (a) => {
  let e = parseFloat(a);
  return (Number.isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}, Oe = (a) => Math.min(1, Math.max(0, a)), be = (a) => a.length === 1 ? `0${a}` : String(a), Rr = (a) => {
  const [[, e]] = Xe.filter(([t]) => t === a.toLowerCase());
  return e;
}, G = (a) => parseInt(a, 16), kt = (a) => G(a) / 255, Dr = (a) => x(a * 255).toString(16), Yt = (a, e, t) => {
  const r = Math.max(a, e, t), l = Math.min(a, e, t);
  let s = 0, o = 0;
  const n = (r + l) / 2;
  if (r === l) o = 0, s = 0;
  else {
    const c = r - l;
    o = n > 0.5 ? c / (2 - r - l) : c / (r + l), r === a && (s = (e - t) / c + (e < t ? 6 : 0)), r === e && (s = (t - a) / c + 2), r === t && (s = (a - e) / c + 4), s /= 6;
  }
  return { h: s, s: o, l: n };
}, We = (a, e, t) => {
  let r = t;
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? a + (e - a) * (6 * r) : r < 1 / 2 ? e : r < 2 / 3 ? a + (e - a) * (2 / 3 - r) * 6 : a;
}, Fe = (a, e, t) => {
  let r = 0, l = 0, s = 0;
  if (e === 0) l = t, s = t, r = t;
  else {
    const o = t < 0.5 ? t * (1 + e) : t + e - t * e, n = 2 * t - o;
    r = We(n, o, a + 1 / 3), l = We(n, o, a), s = We(n, o, a - 1 / 3);
  }
  return { r, g: l, b: s };
}, Qt = (a, e, t) => {
  let r = 0, l = 0;
  const s = Math.min(a, e, t), o = Math.max(a, e, t), n = 1 - o;
  if (o === s) return { h: 0, w: s, b: n };
  a === s ? (r = e - t, l = 3) : (r = e === s ? t - a : a - e, l = e === s ? 5 : 1);
  const c = (l - r / (o - s)) / 6;
  return { h: c === 1 ? 0 : c, w: s, b: n };
}, Vr = (a, e, t) => {
  if (e + t >= 1) {
    const o = e / (e + t);
    return { r: o, g: o, b: o };
  }
  let { r, g: l, b: s } = Fe(a, 1, 0.5);
  return [r, l, s] = [r, l, s].map((o) => o * (1 - e - t) + e), { r, g: l, b: s };
}, er = (a, e, t) => {
  const r = Math.max(a, e, t), l = Math.min(a, e, t);
  let s = 0;
  const o = r, n = r - l, c = r === 0 ? 0 : n / r;
  return r === l ? s = 0 : (a === r && (s = (e - t) / n + (e < t ? 6 : 0)), e === r && (s = (t - a) / n + 2), t === r && (s = (a - e) / n + 4), s /= 6), { h: s, s: c, v: o };
}, yt = (a, e, t) => {
  const r = a * 6, l = e, s = t, o = Math.floor(r), n = r - o, c = s * (1 - l), i = s * (1 - n * l), g = s * (1 - (1 - n) * l), u = o % 6, h = [s, i, c, c, g, s][u], d = [g, s, s, i, c, c][u], p = [c, c, g, s, s, i][u];
  return { r: h, g: d, b: p };
}, nt = (a, e, t, r) => {
  const l = [be(x(a).toString(16)), be(x(e).toString(16)), be(x(t).toString(16))];
  return r && l[0].charAt(0) === l[0].charAt(1) && l[1].charAt(0) === l[1].charAt(1) && l[2].charAt(0) === l[2].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) : l.join("");
}, it = (a, e, t, r, l) => {
  const s = [be(x(a).toString(16)), be(x(e).toString(16)), be(x(t).toString(16)), be(Dr(r))];
  return l && s[0].charAt(0) === s[0].charAt(1) && s[1].charAt(0) === s[1].charAt(1) && s[2].charAt(0) === s[2].charAt(1) && s[3].charAt(0) === s[3].charAt(1) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0) : s.join("");
}, zr = (a) => {
  const e = String(a).trim().toLowerCase();
  if (Fr(e)) return Object.assign(Rr(e), { a: 1, format: "rgb", ok: true });
  if (Er(e)) return { r: 0, g: 0, b: 0, a: e === "transparent" ? 0 : 1, format: "rgb", ok: true };
  let [, t, r, l, s] = se.rgb.exec(e) || [];
  return t && r && l ? { r: t, g: r, b: l, a: s !== void 0 ? s : 1, format: "rgb", ok: true } : ([, t, r, l, s] = se.hsl.exec(e) || [], t && r && l ? { h: t, s: r, l, a: s !== void 0 ? s : 1, format: "hsl", ok: true } : ([, t, r, l, s] = se.hsv.exec(e) || [], t && r && l ? { h: t, s: r, v: l, a: s !== void 0 ? s : 1, format: "hsv", ok: true } : ([, t, r, l, s] = se.hwb.exec(e) || [], t && r && l ? { h: t, w: r, b: l, a: s !== void 0 ? s : 1, format: "hwb", ok: true } : ([, t, r, l, s] = se.hex8.exec(e) || [], t && r && l && s ? { r: G(t), g: G(r), b: G(l), a: kt(s), format: "hex", ok: true } : ([, t, r, l] = se.hex6.exec(e) || [], t && r && l ? { r: G(t), g: G(r), b: G(l), a: 1, format: "hex", ok: true } : ([, t, r, l, s] = se.hex4.exec(e) || [], t && r && l && s ? { r: G(t + t), g: G(r + r), b: G(l + l), a: kt(s + s), format: "hex", ok: true } : ([, t, r, l] = se.hex3.exec(e) || [], t && r && l ? { r: G(t + t), g: G(r + r), b: G(l + l), a: 1, format: "hex", ok: true } : { r: 0, g: 0, b: 0, a: 1, format: "rgb", ok: !a })))))));
}, Ma = (a, e, t) => ({ r: q(a, 255), g: q(e, 255), b: q(t, 255) }), tr = (a) => {
  let e = { r: 0, g: 0, b: 0 }, t = a, r = 1, l, s, o, n, c, i, g, u, h = "rgb", d = false;
  if ((!t || typeof t == "string") && (t = zr(t), d = t.ok || d), Ne(t, e) && K(t.r) && K(t.g) && K(t.b)) {
    if (["format", "ok", "originalInput"].every((p) => p in t)) return { ...t };
    (({ r: g, g: u, b: c } = t)), e = Ma(g, u, c), h = "format" in t ? t.format : "rgb";
  }
  return Ne(t, { h: 0, s: 0, v: 0 }) && K(t.h) && K(t.s) && K(t.v) && ({ h: i, s: l, v: s } = t, i = q(i, 360), l = q(l, 100), s = q(s, 100), e = yt(i, l, s), h = "hsv"), Ne(t, { h: 0, s: 0, l: 0 }) && K(t.h) && K(t.s) && K(t.l) && ({ h: i, s: l, l: o } = t, i = q(i, 360), l = q(l, 100), o = q(o, 100), e = Fe(i, l, o), h = "hsl"), Ne(t, { h: 0, w: 0, b: 0 }) && K(t.h) && K(t.w) && K(t.b) && ({ h: i, w: n, b: c } = t, i = q(i, 360), n = q(n, 100), c = q(c, 100), e = Vr(i, n, c), h = "hwb"), K(t.a) && (r = t.a, r = Vt(r) || parseFloat(`${r}`) > 1 ? q(r, 100) : r), { ...e, a: Lt(r), format: h, ok: d };
}, Fa = "1.0.13";
const _ae = class _ae {
  constructor(e, t) {
    __publicField(this, "r");
    __publicField(this, "g");
    __publicField(this, "b");
    __publicField(this, "a");
    __publicField(this, "format");
    __publicField(this, "ok");
    __publicField(this, "originalInput");
    const r = t && Mr.includes(t) ? t : "", { r: l, g: s, b: o, a: n, ok: c, format: i } = tr(e);
    this.originalInput = e, this.r = l, this.g = s, this.b = o, this.a = n, this.ok = c, this.format = r || i;
  }
  get isValid() {
    return this.ok;
  }
  get isDark() {
    return this.brightness < 120;
  }
  get luminance() {
    const { r: e, g: t, b: r } = this;
    let l = 0, s = 0, o = 0;
    return e <= 0.03928 ? l = e / 12.92 : l = ((e + 0.055) / 1.055) ** 2.4, t <= 0.03928 ? s = t / 12.92 : s = ((t + 0.055) / 1.055) ** 2.4, r <= 0.03928 ? o = r / 12.92 : o = ((r + 0.055) / 1.055) ** 2.4, 0.2126 * l + 0.7152 * s + 0.0722 * o;
  }
  get brightness() {
    const { r: e, g: t, b: r } = this.toRgb();
    return (e * 299 + t * 587 + r * 114) / 1e3;
  }
  get name() {
    const { r: e, g: t, b: r } = this.toRgb(), [l] = Xe.map(([s, o]) => {
      const n = (((o.r - e) * 0.3) ** 2 + ((o.g - t) * 0.6) ** 2 + ((o.b - r) * 0.1) ** 2) ** 0.5;
      return [s, n];
    }).find(([, s], o, n) => s === Math.min(...n.map(([, c]) => c)));
    return l;
  }
  toRgb() {
    let { r: e, g: t, b: r, a: l } = this;
    return [e, t, r] = [e, t, r].map((s) => x(s * 255 * 100) / 100), l = x(l * 100) / 100, { r: e, g: t, b: r, a: l };
  }
  toRgbString() {
    const { r: e, g: t, b: r, a: l } = this.toRgb(), [s, o, n] = [e, t, r].map(x);
    return l === 1 ? `rgb(${s}, ${o}, ${n})` : `rgba(${s}, ${o}, ${n}, ${l})`;
  }
  toRgbCSS4String() {
    const { r: e, g: t, b: r, a: l } = this.toRgb(), [s, o, n] = [e, t, r].map(x), c = l === 1 ? "" : ` / ${x(l * 100)}%`;
    return `rgb(${s} ${o} ${n}${c})`;
  }
  toHex(e) {
    let { r: t, g: r, b: l, a: s } = this;
    return [t, r, l] = [t, r, l].map((o) => x(o * 255)), s = x(s * 100) / 100, s === 1 ? nt(t, r, l, e) : it(t, r, l, s, e);
  }
  toHexString(e) {
    return `#${this.toHex(e)}`;
  }
  toHex8(e) {
    let { r: t, g: r, b: l, a: s } = this;
    return [t, r, l] = [t, r, l].map((o) => x(o * 255)), s = x(s * 100) / 100, s === 1 ? nt(t, r, l, e) : it(t, r, l, s, e);
  }
  toHex8String(e) {
    return `#${this.toHex8(e)}`;
  }
  toHsv() {
    const { r: e, g: t, b: r, a: l } = this, { h: s, s: o, v: n } = er(e, t, r);
    return { h: s, s: o, v: n, a: l };
  }
  toHsl() {
    const { r: e, g: t, b: r, a: l } = this, { h: s, s: o, l: n } = Yt(e, t, r);
    return { h: s, s: o, l: n, a: l };
  }
  toHslString() {
    let { h: e, s: t, l: r, a: l } = this.toHsl();
    return e = x(e * 360), t = x(t * 100), r = x(r * 100), l = x(l * 100) / 100, l === 1 ? `hsl(${e}, ${t}%, ${r}%)` : `hsla(${e}, ${t}%, ${r}%, ${l})`;
  }
  toHslCSS4String() {
    let { h: e, s: t, l: r, a: l } = this.toHsl();
    e = x(e * 360), t = x(t * 100), r = x(r * 100), l = x(l * 100);
    const s = l < 100 ? ` / ${x(l)}%` : "";
    return `hsl(${e}deg ${t}% ${r}%${s})`;
  }
  toHwb() {
    const { r: e, g: t, b: r, a: l } = this, { h: s, w: o, b: n } = Qt(e, t, r);
    return { h: s, w: o, b: n, a: l };
  }
  toHwbString() {
    let { h: e, w: t, b: r, a: l } = this.toHwb();
    e = x(e * 360), t = x(t * 100), r = x(r * 100), l = x(l * 100);
    const s = l < 100 ? ` / ${x(l)}%` : "";
    return `hwb(${e}deg ${t}% ${r}%${s})`;
  }
  setAlpha(e) {
    return typeof e != "number" ? this : (this.a = Lt(e), this);
  }
  saturate(e) {
    if (typeof e != "number") return this;
    const { h: t, s: r, l } = this.toHsl(), { r: s, g: o, b: n } = Fe(t, Oe(r + e / 100), l);
    return Object.assign(this, { r: s, g: o, b: n }), this;
  }
  desaturate(e) {
    return typeof e == "number" ? this.saturate(-e) : this;
  }
  greyscale() {
    return this.saturate(-100);
  }
  lighten(e) {
    if (typeof e != "number") return this;
    const { h: t, s: r, l } = this.toHsl(), { r: s, g: o, b: n } = Fe(t, r, Oe(l + e / 100));
    return Object.assign(this, { r: s, g: o, b: n }), this;
  }
  darken(e) {
    return typeof e == "number" ? this.lighten(-e) : this;
  }
  spin(e) {
    if (typeof e != "number") return this;
    const { h: t, s: r, l } = this.toHsl(), { r: s, g: o, b: n } = Fe(Oe((t * 360 + e) % 360 / 360), r, l);
    return Object.assign(this, { r: s, g: o, b: n }), this;
  }
  clone() {
    return new _ae(this);
  }
  toString(e) {
    const { format: t } = this;
    return t === "hex" ? this.toHexString(e) : t === "hsl" ? this.toHslString() : t === "hwb" ? this.toHwbString() : this.toRgbString();
  }
};
__publicField(_ae, "matchers", se);
__publicField(_ae, "isOnePointZero", Tr);
__publicField(_ae, "isPercentage", Vt);
__publicField(_ae, "isValidCSSUnit", K);
__publicField(_ae, "isNonColor", Er);
__publicField(_ae, "isColorName", Fr);
__publicField(_ae, "isColorType", Ne);
__publicField(_ae, "pad2", be);
__publicField(_ae, "clamp01", Oe);
__publicField(_ae, "bound01", q);
__publicField(_ae, "boundAlpha", Lt);
__publicField(_ae, "getRGBFromName", Rr);
__publicField(_ae, "convertHexToDecimal", kt);
__publicField(_ae, "convertDecimalToHex", Dr);
__publicField(_ae, "rgbToHsl", Yt);
__publicField(_ae, "rgbToHex", nt);
__publicField(_ae, "rgbToHsv", er);
__publicField(_ae, "rgbToHwb", Qt);
__publicField(_ae, "rgbaToHex", it);
__publicField(_ae, "hslToRgb", yt);
__publicField(_ae, "hsvToRgb", yt);
__publicField(_ae, "hueToRgb", We);
__publicField(_ae, "hwbToRgb", Vr);
__publicField(_ae, "parseIntFromHex", G);
__publicField(_ae, "stringInputToObject", zr);
__publicField(_ae, "inputToRGB", tr);
__publicField(_ae, "roundPart", x);
__publicField(_ae, "webColors", Xe);
__publicField(_ae, "nonColors", Dt);
__publicField(_ae, "version", Fa);
let ae = _ae;
const ct = "ArrowDown", gt = "ArrowUp", rr = "ArrowLeft", ar = "ArrowRight", Ra = "Enter", Da = "Escape", lr = "Space", Va = "transitionDuration", za = "transitionDelay", bt = "transitionend", Or = "transitionProperty", jr = (a, e, t, r) => {
  const l = r || false;
  a.addEventListener(e, t, l);
}, Ir = (a, e, t, r) => {
  const l = r || false;
  a.removeEventListener(e, t, l);
}, Oa = (a, e) => a.classList.contains(e), ja = (a, ...e) => Object.assign(a, ...e), Ia = (a, e) => a.dispatchEvent(e), De = (a, e, t) => {
  const r = getComputedStyle(a, t), l = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return r.getPropertyValue(l);
}, Ba = (a) => {
  const e = De(a, Or), t = De(a, za), r = t.includes("ms") ? 1 : 1e3, l = e && e !== "none" ? parseFloat(t) * r : 0;
  return Number.isNaN(l) ? 0 : l;
}, Ka = (a) => {
  const e = De(a, Or), t = De(a, Va), r = t.includes("ms") ? 1 : 1e3, l = e && e !== "none" ? parseFloat(t) * r : 0;
  return Number.isNaN(l) ? 0 : l;
}, sr = (a, e) => {
  let t = 0;
  const r = new Event(bt), l = Ka(a), s = Ba(a);
  if (l) {
    const o = (n) => {
      n.target === a && (e.apply(a, [n]), a.removeEventListener(bt, o), t = 1);
    };
    a.addEventListener(bt, o), setTimeout(() => {
      t || Ia(a, r);
    }, l + s + 17);
  } else e.apply(a, [r]);
}, we = (a, e) => a.focus(e), Ua = (a) => Object.entries(a), or = (a) => Object.keys(a), ut = (a) => a.offsetHeight, Br = (a, e) => {
  const { width: t, height: r, top: l, right: s, bottom: o, left: n } = a.getBoundingClientRect();
  let c = 1, i = 1;
  return { width: t / c, height: r / i, top: l / i, right: s / c, bottom: o / i, left: n / c, x: n / c, y: l / i };
}, nr = "aria-description", xt = "aria-expanded", Ga = "aria-hidden", ht = "aria-selected", Ce = "aria-valuenow", Ae = "aria-valuetext", Wa = "change", qa = "focusin", Za = "focusout", ir = "keydown", Ja = "keyup", St = "click", Xa = "pointerdown", Kr = "pointermove", Ya = "pointerup", Qa = "resize", el = "scroll", tl = "touchmove", ce = "ArrowDown", Pe = "ArrowUp", je = "ArrowLeft", me = "ArrowRight", rl = "Enter", al = "Escape", cr = "Space", ll = "transitionDuration", sl = "transitionProperty", ye = "tabindex", Ur = (a, e, t, r) => {
  const l = r || false;
  a.addEventListener(e, t, l);
}, Gr = (a, e, t, r) => {
  const l = r || false;
  a.removeEventListener(e, t, l);
}, Qe = (a, e) => a.getAttribute(e), C = (a, e, t) => a.setAttribute(e, t), pt = (a, e) => a.removeAttribute(e), ge = (a, ...e) => {
  a.classList.add(...e);
}, te = (a, ...e) => {
  a.classList.remove(...e);
}, Y = (a, e) => a.classList.contains(e), zt = (a) => a != null && typeof a == "object" || false, ze = (a) => zt(a) && typeof a.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => a.nodeType === e) || false, $e = (a) => ze(a) && a.nodeType === 1 || false, Le = /* @__PURE__ */ new Map(), Ve = { data: Le, set: (a, e, t) => {
  $e(a) && (Le.has(e) || Le.set(e, /* @__PURE__ */ new Map()), Le.get(e).set(a, t));
}, getAllFor: (a) => Le.get(a) || null, get: (a, e) => {
  if (!$e(a) || !e) return null;
  const t = Ve.getAllFor(e);
  return a && t && t.get(a) || null;
}, remove: (a, e) => {
  const t = Ve.getAllFor(e);
  !t || !$e(a) || (t.delete(a), t.size === 0 && Le.delete(e));
} }, ol = (a, e) => Ve.get(a, e), nl = (a) => a == null ? void 0 : a.trim().replace(/(?:^\w|[A-Z]|\b\w)/g, (e, t) => t === 0 ? e.toLowerCase() : e.toUpperCase()).replace(/\s+/g, ""), ue = (a) => typeof a == "string" || false, il = (a) => zt(a) && a.constructor.name === "Window" || false, Wr = (a) => ze(a) && a.nodeType === 9 || false, ie = (a) => Wr(a) ? a : ze(a) ? a.ownerDocument : il(a) ? a.document : globalThis.document, ne = (a, ...e) => Object.assign(a, ...e), z = (a) => {
  if (!a) return;
  if (ue(a)) return ie().createElement(a);
  const { tagName: e } = a, t = z(e);
  if (!t) return;
  const r = { ...a };
  return delete r.tagName, ne(t, r);
}, Ct = (a, e) => {
  if (!a || !e) return;
  if (ue(e)) return ie().createElementNS(a, e);
  const { tagName: t } = e, r = Ct(a, t);
  if (!r) return;
  const l = { ...e };
  return delete l.tagName, ne(r, l);
}, cl = (a, e) => a.dispatchEvent(e), At = (a, e, t) => {
  const r = getComputedStyle(a, t), l = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return r.getPropertyValue(l);
}, gl = (a) => {
  const e = At(a, sl), t = At(a, ll), r = t.includes("ms") ? 1 : 1e3, l = e && e !== "none" ? parseFloat(t) * r : 0;
  return Number.isNaN(l) ? 0 : l;
}, fe = (a, e) => a.focus(e), gr = (a) => ["true", true].includes(a) ? true : ["false", false].includes(a) ? false : ["null", "", null, void 0].includes(a) ? null : a !== "" && !Number.isNaN(+a) ? +a : a, qe = (a) => Object.entries(a), bl = (a, e, t, r) => {
  if (!$e(a)) return e;
  const l = { ...t }, s = { ...a.dataset }, o = { ...e }, n = {}, c = "title";
  return qe(s).forEach(([i, g]) => {
    const u = nl(i);
    n[u] = gr(g);
  }), qe(l).forEach(([i, g]) => {
    l[i] = gr(g);
  }), qe(e).forEach(([i, g]) => {
    i in l ? o[i] = l[i] : i in n ? o[i] = n[i] : o[i] = i === c ? Qe(a, c) : g;
  }), o;
}, br = (a) => Object.fromEntries(a), ul = (a) => a.offsetHeight, re = (a, e) => {
  qe(e).forEach(([t, r]) => {
    if (r && ue(t) && t.includes("--")) a.style.setProperty(t, r);
    else {
      const l = {};
      l[t] = r, ne(a.style, l);
    }
  });
}, hl = (a) => zt(a) && a.constructor.name === "Map" || false, qr = (a) => a.toUpperCase(), Zr = (a) => $e(a) && "offsetWidth" in a || false, Ie = (a, e) => {
  const { width: t, height: r, top: l, right: s, bottom: o, left: n } = a.getBoundingClientRect();
  let c = 1, i = 1;
  if (e && Zr(a)) {
    const { offsetWidth: g, offsetHeight: u } = a;
    c = g > 0 ? Math.round(t) / g : 1, i = u > 0 ? Math.round(r) / u : 1;
  }
  return { width: t / c, height: r / i, top: l / i, right: s / c, bottom: o / i, left: n / c, x: n / c, y: l / i };
}, dt = (a) => ie(a).documentElement, pl = (a) => {
  var _a2;
  return a ? Wr(a) ? a.defaultView : ze(a) ? (_a2 = a == null ? void 0 : a.ownerDocument) == null ? void 0 : _a2.defaultView : a : window;
};
let ur = 0, hr = 0;
const ke = /* @__PURE__ */ new Map(), Jr = (a, e) => {
  let t = e ? ur : hr;
  if (e) {
    const r = Jr(a), l = ke.get(r) || /* @__PURE__ */ new Map();
    ke.has(r) || ke.set(r, l), hl(l) && !l.has(e) ? (l.set(e, t), ur += 1) : t = l.get(e);
  } else {
    const r = a.id || a;
    ke.has(r) ? t = ke.get(r) : (ke.set(r, t), hr += 1);
  }
  return t;
}, mt = (a) => Array.isArray(a) || false, Xr = (a, e) => !a || !e ? null : a.closest(e) || Xr(a.getRootNode().host, e) || null, ve = (a, e) => $e(a) ? a : ($e(e) ? e : ie()).querySelector(a), He = (a, e) => (e && ze(e) ? e : ie()).getElementsByClassName(a), Ot = ["transparent", "currentColor", "inherit", "revert", "initial"], S = (a) => {
  const e = Math.floor(a);
  return a - e < 0.5 ? e : Math.round(a);
}, Ye = [["aliceblue", { r: 240, g: 248, b: 255 }], ["antiquewhite", { r: 250, g: 235, b: 215 }], ["aqua", { r: 0, g: 255, b: 255 }], ["aquamarine", { r: 127, g: 255, b: 212 }], ["azure", { r: 240, g: 255, b: 255 }], ["beige", { r: 245, g: 245, b: 220 }], ["bisque", { r: 255, g: 228, b: 196 }], ["black", { r: 0, g: 0, b: 0 }], ["blanchedalmond", { r: 255, g: 235, b: 205 }], ["blue", { r: 0, g: 0, b: 255 }], ["blueviolet", { r: 138, g: 43, b: 226 }], ["brown", { r: 165, g: 42, b: 42 }], ["burlywood", { r: 222, g: 184, b: 135 }], ["cadetblue", { r: 95, g: 158, b: 160 }], ["chartreuse", { r: 127, g: 255, b: 0 }], ["chocolate", { r: 210, g: 105, b: 30 }], ["coral", { r: 255, g: 127, b: 80 }], ["cornflowerblue", { r: 100, g: 149, b: 237 }], ["cornsilk", { r: 255, g: 248, b: 220 }], ["crimson", { r: 220, g: 20, b: 60 }], ["cyan", { r: 0, g: 255, b: 255 }], ["darkblue", { r: 0, g: 0, b: 139 }], ["darkcyan", { r: 0, g: 139, b: 139 }], ["darkgoldenrod", { r: 184, g: 134, b: 11 }], ["darkgray", { r: 169, g: 169, b: 169 }], ["darkgreen", { r: 0, g: 100, b: 0 }], ["darkgrey", { r: 169, g: 169, b: 169 }], ["darkkhaki", { r: 189, g: 183, b: 107 }], ["darkmagenta", { r: 139, g: 0, b: 139 }], ["darkolivegreen", { r: 85, g: 107, b: 47 }], ["darkorange", { r: 255, g: 140, b: 0 }], ["darkorchid", { r: 153, g: 50, b: 204 }], ["darkred", { r: 139, g: 0, b: 0 }], ["darksalmon", { r: 233, g: 150, b: 122 }], ["darkseagreen", { r: 143, g: 188, b: 143 }], ["darkslateblue", { r: 72, g: 61, b: 139 }], ["darkslategray", { r: 47, g: 79, b: 79 }], ["darkslategrey", { r: 47, g: 79, b: 79 }], ["darkturquoise", { r: 0, g: 206, b: 209 }], ["darkviolet", { r: 148, g: 0, b: 211 }], ["deeppink", { r: 255, g: 20, b: 147 }], ["deepskyblue", { r: 0, g: 191, b: 255 }], ["dimgray", { r: 105, g: 105, b: 105 }], ["dimgrey", { r: 105, g: 105, b: 105 }], ["dodgerblue", { r: 30, g: 144, b: 255 }], ["firebrick", { r: 178, g: 34, b: 34 }], ["floralwhite", { r: 255, g: 250, b: 240 }], ["forestgreen", { r: 34, g: 139, b: 34 }], ["fuchsia", { r: 255, g: 0, b: 255 }], ["gainsboro", { r: 220, g: 220, b: 220 }], ["ghostwhite", { r: 248, g: 248, b: 255 }], ["goldenrod", { r: 218, g: 165, b: 32 }], ["gold", { r: 255, g: 215, b: 0 }], ["gray", { r: 128, g: 128, b: 128 }], ["green", { r: 0, g: 128, b: 0 }], ["greenyellow", { r: 173, g: 255, b: 47 }], ["grey", { r: 128, g: 128, b: 128 }], ["honeydew", { r: 240, g: 255, b: 240 }], ["hotpink", { r: 255, g: 105, b: 180 }], ["indianred", { r: 205, g: 92, b: 92 }], ["indigo", { r: 75, g: 0, b: 130 }], ["ivory", { r: 255, g: 255, b: 240 }], ["khaki", { r: 240, g: 230, b: 140 }], ["lavenderblush", { r: 255, g: 240, b: 245 }], ["lavender", { r: 230, g: 230, b: 250 }], ["lawngreen", { r: 124, g: 252, b: 0 }], ["lemonchiffon", { r: 255, g: 250, b: 205 }], ["lightblue", { r: 173, g: 216, b: 230 }], ["lightcoral", { r: 240, g: 128, b: 128 }], ["lightcyan", { r: 224, g: 255, b: 255 }], ["lightgoldenrodyellow", { r: 250, g: 250, b: 210 }], ["lightgray", { r: 211, g: 211, b: 211 }], ["lightgreen", { r: 144, g: 238, b: 144 }], ["lightgrey", { r: 211, g: 211, b: 211 }], ["lightpink", { r: 255, g: 182, b: 193 }], ["lightsalmon", { r: 255, g: 160, b: 122 }], ["lightseagreen", { r: 32, g: 178, b: 170 }], ["lightskyblue", { r: 135, g: 206, b: 250 }], ["lightslategray", { r: 119, g: 136, b: 153 }], ["lightslategrey", { r: 119, g: 136, b: 153 }], ["lightsteelblue", { r: 176, g: 196, b: 222 }], ["lightyellow", { r: 255, g: 255, b: 224 }], ["lime", { r: 0, g: 255, b: 0 }], ["limegreen", { r: 50, g: 205, b: 50 }], ["linen", { r: 250, g: 240, b: 230 }], ["magenta", { r: 255, g: 0, b: 255 }], ["maroon", { r: 128, g: 0, b: 0 }], ["mediumaquamarine", { r: 102, g: 205, b: 170 }], ["mediumblue", { r: 0, g: 0, b: 205 }], ["mediumorchid", { r: 186, g: 85, b: 211 }], ["mediumpurple", { r: 147, g: 112, b: 219 }], ["mediumseagreen", { r: 60, g: 179, b: 113 }], ["mediumslateblue", { r: 123, g: 104, b: 238 }], ["mediumspringgreen", { r: 0, g: 250, b: 154 }], ["mediumturquoise", { r: 72, g: 209, b: 204 }], ["mediumvioletred", { r: 199, g: 21, b: 133 }], ["midnightblue", { r: 25, g: 25, b: 112 }], ["mintcream", { r: 245, g: 255, b: 250 }], ["mistyrose", { r: 255, g: 228, b: 225 }], ["moccasin", { r: 255, g: 228, b: 181 }], ["navajowhite", { r: 255, g: 222, b: 173 }], ["navy", { r: 0, g: 0, b: 128 }], ["oldlace", { r: 253, g: 245, b: 230 }], ["olive", { r: 128, g: 128, b: 0 }], ["olivedrab", { r: 107, g: 142, b: 35 }], ["orange", { r: 255, g: 165, b: 0 }], ["orangered", { r: 255, g: 69, b: 0 }], ["orchid", { r: 218, g: 112, b: 214 }], ["palegoldenrod", { r: 238, g: 232, b: 170 }], ["palegreen", { r: 152, g: 251, b: 152 }], ["paleturquoise", { r: 175, g: 238, b: 238 }], ["palevioletred", { r: 219, g: 112, b: 147 }], ["papayawhip", { r: 255, g: 239, b: 213 }], ["peachpuff", { r: 255, g: 218, b: 185 }], ["peru", { r: 205, g: 133, b: 63 }], ["pink", { r: 255, g: 192, b: 203 }], ["plum", { r: 221, g: 160, b: 221 }], ["powderblue", { r: 176, g: 224, b: 230 }], ["purple", { r: 128, g: 0, b: 128 }], ["rebeccapurple", { r: 102, g: 51, b: 153 }], ["red", { r: 255, g: 0, b: 0 }], ["rosybrown", { r: 188, g: 143, b: 143 }], ["royalblue", { r: 65, g: 105, b: 225 }], ["saddlebrown", { r: 139, g: 69, b: 19 }], ["salmon", { r: 250, g: 128, b: 114 }], ["sandybrown", { r: 244, g: 164, b: 96 }], ["seagreen", { r: 46, g: 139, b: 87 }], ["seashell", { r: 255, g: 245, b: 238 }], ["sienna", { r: 160, g: 82, b: 45 }], ["silver", { r: 192, g: 192, b: 192 }], ["skyblue", { r: 135, g: 206, b: 235 }], ["slateblue", { r: 106, g: 90, b: 205 }], ["slategray", { r: 112, g: 128, b: 144 }], ["slategrey", { r: 112, g: 128, b: 144 }], ["snow", { r: 255, g: 250, b: 250 }], ["springgreen", { r: 0, g: 255, b: 127 }], ["steelblue", { r: 70, g: 130, b: 180 }], ["tan", { r: 210, g: 180, b: 140 }], ["teal", { r: 0, g: 128, b: 128 }], ["thistle", { r: 216, g: 191, b: 216 }], ["tomato", { r: 255, g: 99, b: 71 }], ["turquoise", { r: 64, g: 224, b: 208 }], ["violet", { r: 238, g: 130, b: 238 }], ["wheat", { r: 245, g: 222, b: 179 }], ["white", { r: 255, g: 255, b: 255 }], ["whitesmoke", { r: 245, g: 245, b: 245 }], ["yellow", { r: 255, g: 255, b: 0 }], ["yellowgreen", { r: 154, g: 205, b: 50 }]], Yr = "deg|rad|grad|turn", Qr = "[-\\+]?\\d+%?", ea = "[-\\+]?\\d*\\.\\d+%?", ta = `[-\\+]?\\d*\\.?\\d+(?:${Yr})?`, Ze = `(?:${ea})|(?:${Qr})`, Pt = `(?:${Ze})|(?:${ta}?)`, dl = "(?:[\\s|\\(\\s|\\s\\(\\s]+)?", ml = "(?:[\\s|\\)\\s]+)?", pr = "(?:[,|\\s]+)", fl = "(?:[,|\\/\\s]*)?", _e = `${dl}(${Pt})${pr}(${Ze})${pr}(${Ze})${fl}(${Ze})?${ml}`, oe = { CSS_UNIT: new RegExp(Pt), ANGLES: Yr, CSS_ANGLE: ta, CSS_INTEGER: Qr, CSS_NUMBER: ea, CSS_UNIT2: Pt, PERMISSIVE_MATCH: _e, hwb: new RegExp(`hwb${_e}`), rgb: new RegExp(`rgb(?:a)?${_e}`), hsl: new RegExp(`hsl(?:a)?${_e}`), hsv: new RegExp(`hsv(?:a)?${_e}`), hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ }, ra = (a) => Ot.includes(a), Ee = (a, e) => a !== null && typeof a == "object" && Object.keys(e).every((t) => t in a), aa = (a) => `${a}`.includes(".") && parseFloat(a) === 1, jt = (a) => typeof a == "string" && a.includes("%"), U = (a) => !!oe.CSS_UNIT.exec(`${a}`), la = ["rgb", "hex", "hsl", "hsv", "hwb"], sa = (a) => Ot.includes(a) || ["#", ...la].some((e) => a.includes(e)) ? false : Ye.some(([e]) => a === e), dr = 1e-6, vl = (a, e) => Math.abs(a * e - e) < dr ? 1 : a < dr ? 0 : a, Z = (a, e) => {
  let t = a;
  return aa(a) && (t = "100%"), jt(t) ? Number.parseFloat(t) / 100 : (t = typeof t != "number" ? Number.parseFloat(t) : t, e === 360 ? t = (t < 0 ? t % e + e : t > 360 ? t % e : t) / e : (t = Math.min(e, Math.max(0, t)), t = t / e), vl(t, e));
}, Ht = (a) => {
  let e = parseFloat(a);
  return (Number.isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}, Be = (a) => Math.min(1, Math.max(0, a)), he = (a) => a.length === 1 ? `0${a}` : String(a), oa = (a) => {
  const [[, e]] = Ye.filter(([t]) => t === a.toLowerCase());
  return e;
}, W = (a) => parseInt(a, 16), _t = (a) => W(a) / 255, na = (a) => S(a * 255).toString(16), mr = (a, e, t) => {
  const r = Math.max(a, e, t), l = Math.min(a, e, t);
  let s = 0, o = 0;
  const n = (r + l) / 2;
  if (r === l) o = 0, s = 0;
  else {
    const c = r - l;
    o = n > 0.5 ? c / (2 - r - l) : c / (r + l), r === a && (s = (e - t) / c + (e < t ? 6 : 0)), r === e && (s = (t - a) / c + 2), r === t && (s = (a - e) / c + 4), s /= 6;
  }
  return { h: s, s: o, l: n };
}, Je = (a, e, t) => {
  let r = t;
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? a + (e - a) * (6 * r) : r < 1 / 2 ? e : r < 2 / 3 ? a + (e - a) * (2 / 3 - r) * 6 : a;
}, Re = (a, e, t) => {
  let r = 0, l = 0, s = 0;
  if (e === 0) l = t, s = t, r = t;
  else {
    const o = t < 0.5 ? t * (1 + e) : t + e - t * e, n = 2 * t - o;
    r = Je(n, o, a + 1 / 3), l = Je(n, o, a), s = Je(n, o, a - 1 / 3);
  }
  return { r, g: l, b: s };
}, fr = (a, e, t) => {
  let r = 0, l = 0;
  const s = Math.min(a, e, t), o = Math.max(a, e, t), n = 1 - o;
  if (o === s) return { h: 0, w: s, b: n };
  a === s ? (r = e - t, l = 3) : (r = e === s ? t - a : a - e, l = e === s ? 5 : 1);
  const c = (l - r / (o - s)) / 6;
  return { h: c === 1 ? 0 : c, w: s, b: n };
}, ia = (a, e, t) => {
  if (e + t >= 1) {
    const o = e / (e + t);
    return { r: o, g: o, b: o };
  }
  let { r, g: l, b: s } = Re(a, 1, 0.5);
  return [r, l, s] = [r, l, s].map((o) => o * (1 - e - t) + e), { r, g: l, b: s };
}, vr = (a, e, t) => {
  const r = Math.max(a, e, t), l = Math.min(a, e, t);
  let s = 0;
  const o = r, n = r - l, c = r === 0 ? 0 : n / r;
  return r === l ? s = 0 : (a === r && (s = (e - t) / n + (e < t ? 6 : 0)), e === r && (s = (t - a) / n + 2), t === r && (s = (a - e) / n + 4), s /= 6), { h: s, s: c, v: o };
}, Nt = (a, e, t) => {
  const r = a * 6, l = e, s = t, o = Math.floor(r), n = r - o, c = s * (1 - l), i = s * (1 - n * l), g = s * (1 - (1 - n) * l), u = o % 6, h = [s, i, c, c, g, s][u], d = [g, s, s, i, c, c][u], p = [c, c, g, s, s, i][u];
  return { r: h, g: d, b: p };
}, ft = (a, e, t, r) => {
  const l = [he(S(a).toString(16)), he(S(e).toString(16)), he(S(t).toString(16))];
  return r && l[0].charAt(0) === l[0].charAt(1) && l[1].charAt(0) === l[1].charAt(1) && l[2].charAt(0) === l[2].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) : l.join("");
}, vt = (a, e, t, r, l) => {
  const s = [he(S(a).toString(16)), he(S(e).toString(16)), he(S(t).toString(16)), he(na(r))];
  return l && s[0].charAt(0) === s[0].charAt(1) && s[1].charAt(0) === s[1].charAt(1) && s[2].charAt(0) === s[2].charAt(1) && s[3].charAt(0) === s[3].charAt(1) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0) : s.join("");
}, ca = (a) => {
  const e = String(a).trim().toLowerCase();
  if (sa(e)) return Object.assign(oa(e), { a: 1, format: "rgb", ok: true });
  if (ra(e)) return { r: 0, g: 0, b: 0, a: e === "transparent" ? 0 : 1, format: "rgb", ok: true };
  let [, t, r, l, s] = oe.rgb.exec(e) || [];
  return t && r && l ? { r: t, g: r, b: l, a: s !== void 0 ? s : 1, format: "rgb", ok: true } : ([, t, r, l, s] = oe.hsl.exec(e) || [], t && r && l ? { h: t, s: r, l, a: s !== void 0 ? s : 1, format: "hsl", ok: true } : ([, t, r, l, s] = oe.hsv.exec(e) || [], t && r && l ? { h: t, s: r, v: l, a: s !== void 0 ? s : 1, format: "hsv", ok: true } : ([, t, r, l, s] = oe.hwb.exec(e) || [], t && r && l ? { h: t, w: r, b: l, a: s !== void 0 ? s : 1, format: "hwb", ok: true } : ([, t, r, l, s] = oe.hex8.exec(e) || [], t && r && l && s ? { r: W(t), g: W(r), b: W(l), a: _t(s), format: "hex", ok: true } : ([, t, r, l] = oe.hex6.exec(e) || [], t && r && l ? { r: W(t), g: W(r), b: W(l), a: 1, format: "hex", ok: true } : ([, t, r, l, s] = oe.hex4.exec(e) || [], t && r && l && s ? { r: W(t + t), g: W(r + r), b: W(l + l), a: _t(s + s), format: "hex", ok: true } : ([, t, r, l] = oe.hex3.exec(e) || [], t && r && l ? { r: W(t + t), g: W(r + r), b: W(l + l), a: 1, format: "hex", ok: true } : { r: 0, g: 0, b: 0, a: 1, format: "rgb", ok: !a })))))));
}, wl = (a, e, t) => ({ r: Z(a, 255), g: Z(e, 255), b: Z(t, 255) }), wr = (a) => {
  let e = { r: 0, g: 0, b: 0 }, t = a, r = 1, l, s, o, n, c, i, g, u, h = "rgb", d = false;
  if ((!t || typeof t == "string") && (t = ca(t), d = t.ok || d), Ee(t, e) && U(t.r) && U(t.g) && U(t.b)) {
    if (["format", "ok", "originalInput"].every((p) => p in t)) return { ...t };
    (({ r: g, g: u, b: c } = t)), e = wl(g, u, c), h = "format" in t ? t.format : "rgb";
  }
  return Ee(t, { h: 0, s: 0, v: 0 }) && U(t.h) && U(t.s) && U(t.v) && ({ h: i, s: l, v: s } = t, i = Z(i, 360), l = Z(l, 100), s = Z(s, 100), e = Nt(i, l, s), h = "hsv"), Ee(t, { h: 0, s: 0, l: 0 }) && U(t.h) && U(t.s) && U(t.l) && ({ h: i, s: l, l: o } = t, i = Z(i, 360), l = Z(l, 100), o = Z(o, 100), e = Re(i, l, o), h = "hsl"), Ee(t, { h: 0, w: 0, b: 0 }) && U(t.h) && U(t.w) && U(t.b) && ({ h: i, w: n, b: c } = t, i = Z(i, 360), n = Z(n, 100), c = Z(c, 100), e = ia(i, n, c), h = "hwb"), U(t.a) && (r = t.a, r = jt(r) || parseFloat(`${r}`) > 1 ? Z(r, 100) : r), { ...e, a: Ht(r), format: h, ok: d };
}, $l = "1.0.13";
const _R = class _R {
  constructor(e, t) {
    __publicField(this, "r");
    __publicField(this, "g");
    __publicField(this, "b");
    __publicField(this, "a");
    __publicField(this, "format");
    __publicField(this, "ok");
    __publicField(this, "originalInput");
    const r = t && la.includes(t) ? t : "", { r: l, g: s, b: o, a: n, ok: c, format: i } = wr(e);
    this.originalInput = e, this.r = l, this.g = s, this.b = o, this.a = n, this.ok = c, this.format = r || i;
  }
  get isValid() {
    return this.ok;
  }
  get isDark() {
    return this.brightness < 120;
  }
  get luminance() {
    const { r: e, g: t, b: r } = this;
    let l = 0, s = 0, o = 0;
    return e <= 0.03928 ? l = e / 12.92 : l = ((e + 0.055) / 1.055) ** 2.4, t <= 0.03928 ? s = t / 12.92 : s = ((t + 0.055) / 1.055) ** 2.4, r <= 0.03928 ? o = r / 12.92 : o = ((r + 0.055) / 1.055) ** 2.4, 0.2126 * l + 0.7152 * s + 0.0722 * o;
  }
  get brightness() {
    const { r: e, g: t, b: r } = this.toRgb();
    return (e * 299 + t * 587 + r * 114) / 1e3;
  }
  get name() {
    const { r: e, g: t, b: r } = this.toRgb(), [l] = Ye.map(([s, o]) => {
      const n = (((o.r - e) * 0.3) ** 2 + ((o.g - t) * 0.6) ** 2 + ((o.b - r) * 0.1) ** 2) ** 0.5;
      return [s, n];
    }).find(([, s], o, n) => s === Math.min(...n.map(([, c]) => c)));
    return l;
  }
  toRgb() {
    let { r: e, g: t, b: r, a: l } = this;
    return [e, t, r] = [e, t, r].map((s) => S(s * 255 * 100) / 100), l = S(l * 100) / 100, { r: e, g: t, b: r, a: l };
  }
  toRgbString() {
    const { r: e, g: t, b: r, a: l } = this.toRgb(), [s, o, n] = [e, t, r].map(S);
    return l === 1 ? `rgb(${s}, ${o}, ${n})` : `rgba(${s}, ${o}, ${n}, ${l})`;
  }
  toRgbCSS4String() {
    const { r: e, g: t, b: r, a: l } = this.toRgb(), [s, o, n] = [e, t, r].map(S), c = l === 1 ? "" : ` / ${S(l * 100)}%`;
    return `rgb(${s} ${o} ${n}${c})`;
  }
  toHex(e) {
    let { r: t, g: r, b: l, a: s } = this;
    return [t, r, l] = [t, r, l].map((o) => S(o * 255)), s = S(s * 100) / 100, s === 1 ? ft(t, r, l, e) : vt(t, r, l, s, e);
  }
  toHexString(e) {
    return `#${this.toHex(e)}`;
  }
  toHex8(e) {
    let { r: t, g: r, b: l, a: s } = this;
    return [t, r, l] = [t, r, l].map((o) => S(o * 255)), s = S(s * 100) / 100, s === 1 ? ft(t, r, l, e) : vt(t, r, l, s, e);
  }
  toHex8String(e) {
    return `#${this.toHex8(e)}`;
  }
  toHsv() {
    const { r: e, g: t, b: r, a: l } = this, { h: s, s: o, v: n } = vr(e, t, r);
    return { h: s, s: o, v: n, a: l };
  }
  toHsl() {
    const { r: e, g: t, b: r, a: l } = this, { h: s, s: o, l: n } = mr(e, t, r);
    return { h: s, s: o, l: n, a: l };
  }
  toHslString() {
    let { h: e, s: t, l: r, a: l } = this.toHsl();
    return e = S(e * 360), t = S(t * 100), r = S(r * 100), l = S(l * 100) / 100, l === 1 ? `hsl(${e}, ${t}%, ${r}%)` : `hsla(${e}, ${t}%, ${r}%, ${l})`;
  }
  toHslCSS4String() {
    let { h: e, s: t, l: r, a: l } = this.toHsl();
    e = S(e * 360), t = S(t * 100), r = S(r * 100), l = S(l * 100);
    const s = l < 100 ? ` / ${S(l)}%` : "";
    return `hsl(${e}deg ${t}% ${r}%${s})`;
  }
  toHwb() {
    const { r: e, g: t, b: r, a: l } = this, { h: s, w: o, b: n } = fr(e, t, r);
    return { h: s, w: o, b: n, a: l };
  }
  toHwbString() {
    let { h: e, w: t, b: r, a: l } = this.toHwb();
    e = S(e * 360), t = S(t * 100), r = S(r * 100), l = S(l * 100);
    const s = l < 100 ? ` / ${S(l)}%` : "";
    return `hwb(${e}deg ${t}% ${r}%${s})`;
  }
  setAlpha(e) {
    return typeof e != "number" ? this : (this.a = Ht(e), this);
  }
  saturate(e) {
    if (typeof e != "number") return this;
    const { h: t, s: r, l } = this.toHsl(), { r: s, g: o, b: n } = Re(t, Be(r + e / 100), l);
    return Object.assign(this, { r: s, g: o, b: n }), this;
  }
  desaturate(e) {
    return typeof e == "number" ? this.saturate(-e) : this;
  }
  greyscale() {
    return this.saturate(-100);
  }
  lighten(e) {
    if (typeof e != "number") return this;
    const { h: t, s: r, l } = this.toHsl(), { r: s, g: o, b: n } = Re(t, r, Be(l + e / 100));
    return Object.assign(this, { r: s, g: o, b: n }), this;
  }
  darken(e) {
    return typeof e == "number" ? this.lighten(-e) : this;
  }
  spin(e) {
    if (typeof e != "number") return this;
    const { h: t, s: r, l } = this.toHsl(), { r: s, g: o, b: n } = Re(Be((t * 360 + e) % 360 / 360), r, l);
    return Object.assign(this, { r: s, g: o, b: n }), this;
  }
  clone() {
    return new _R(this);
  }
  toString(e) {
    const { format: t } = this;
    return t === "hex" ? this.toHexString(e) : t === "hsl" ? this.toHslString() : t === "hwb" ? this.toHwbString() : this.toRgbString();
  }
};
__publicField(_R, "matchers", oe);
__publicField(_R, "isOnePointZero", aa);
__publicField(_R, "isPercentage", jt);
__publicField(_R, "isValidCSSUnit", U);
__publicField(_R, "isNonColor", ra);
__publicField(_R, "isColorName", sa);
__publicField(_R, "isColorType", Ee);
__publicField(_R, "pad2", he);
__publicField(_R, "clamp01", Be);
__publicField(_R, "bound01", Z);
__publicField(_R, "boundAlpha", Ht);
__publicField(_R, "getRGBFromName", oa);
__publicField(_R, "convertHexToDecimal", _t);
__publicField(_R, "convertDecimalToHex", na);
__publicField(_R, "rgbToHsl", mr);
__publicField(_R, "rgbToHex", ft);
__publicField(_R, "rgbToHsv", vr);
__publicField(_R, "rgbToHwb", fr);
__publicField(_R, "rgbaToHex", vt);
__publicField(_R, "hslToRgb", Nt);
__publicField(_R, "hsvToRgb", Nt);
__publicField(_R, "hueToRgb", Je);
__publicField(_R, "hwbToRgb", ia);
__publicField(_R, "parseIntFromHex", W);
__publicField(_R, "stringInputToObject", ca);
__publicField(_R, "inputToRGB", wr);
__publicField(_R, "roundPart", S);
__publicField(_R, "webColors", Ye);
__publicField(_R, "nonColors", Ot);
__publicField(_R, "version", $l);
let R = _R;
class Et {
  constructor(...e) {
    __publicField(this, "hue");
    __publicField(this, "hueSteps");
    __publicField(this, "lightSteps");
    __publicField(this, "saturation");
    __publicField(this, "colors");
    let t = 0, r = 12, l = 10, s = [0.5], o = 100;
    if (e.length === 4) [t, r, l, o] = e;
    else if (e.length === 3) [t, r, l] = e;
    else if (e.length === 2 && ([r, l] = e, [r, l].some((p) => p < 1))) throw TypeError("ColorPalette: the two minimum arguments must be numbers higher than 0.");
    const n = [], c = 360 / r, i = R.roundPart((l - (l % 2 ? 1 : 0)) / 2), g = [0.25, 0.2, 0.15, 0.11, 0.09, 0.075], u = [[1, 2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13]], h = u.find((p) => p.includes(l)), d = h ? g[u.indexOf(h)] : 100 / (l + (l % 2 ? 0 : 1)) / 100;
    for (let p = 1; p < i + 1; p += 1) s = [...s, 0.5 + d * p];
    for (let p = 1; p < l - i; p += 1) s = [0.5 - d * p, ...s];
    for (let p = 0; p < r; p += 1) {
      const m = (t + p * c) % 360;
      s.forEach((f) => {
        const $ = new R({ h: m, s: 100, l: f * 100 });
        n.push(o < 100 ? $.saturate(o - 100) : $);
      });
    }
    this.hue = t, this.hueSteps = r, this.lightSteps = l, this.saturation = o, this.colors = n;
  }
}
__publicField(Et, "Color", R);
const Tt = { pickerLabel: "Colour Picker", appearanceLabel: "Colour Appearance", valueLabel: "Colour Value", toggleLabel: "Select Colour", presetsLabel: "Colour Presets", defaultsLabel: "Colour Defaults", formatLabel: "Format", alphaLabel: "Alpha", hexLabel: "Hexadecimal", hueLabel: "Hue", whitenessLabel: "Whiteness", blacknessLabel: "Blackness", saturationLabel: "Saturation", lightnessLabel: "Lightness", redLabel: "Red", greenLabel: "Green", blueLabel: "Blue" }, Te = ["white", "black", "grey", "red", "orange", "brown", "gold", "olive", "yellow", "lime", "green", "teal", "cyan", "blue", "violet", "magenta", "pink"], $r = (a) => {
  if (!ue(a)) return false;
  try {
    JSON.parse(a);
  } catch {
    return false;
  }
  return true;
}, Mt = "v-hidden", Ll = (a) => {
  const { format: e, id: t, componentLabels: r } = a, l = z({ tagName: "div", className: `color-form ${e}` });
  let s = ["hex"];
  return e === "rgb" ? s = ["red", "green", "blue", "alpha"] : e === "hsl" ? s = ["hue", "saturation", "lightness", "alpha"] : e === "hwb" && (s = ["hue", "whiteness", "blackness", "alpha"]), s.forEach((o) => {
    const [n] = e === "hex" ? ["#"] : qr(o).split(""), c = `color_${e}_${o}_${t}`, i = r[`${o}Label`], g = z({ tagName: "label" });
    C(g, "for", c), g.append(z({ tagName: "span", ariaHidden: "true", innerText: `${n}:` }), z({ tagName: "span", className: Mt, innerText: i }));
    const u = z({ tagName: "input", id: c, type: e === "hex" ? "text" : "number", value: o === "alpha" ? "100" : "0", className: `color-input ${o}`, autocomplete: "off", spellcheck: false });
    let h = "100", d = "1";
    o !== "alpha" && (e === "rgb" ? (h = "255", d = "1") : o === "hue" && (h = "360", d = "1")), ne(u, { min: "0", max: h, step: d }), l.append(g, u);
  }), l;
}, kl = (a) => {
  const { format: e, componentLabels: t } = a, { hueLabel: r, alphaLabel: l, lightnessLabel: s, saturationLabel: o, whitenessLabel: n, blacknessLabel: c } = t, i = e === "hsl" ? 360 : 100, g = e === "hsl" ? 100 : 360, u = 100;
  let h = e === "hsl" ? `${r} & ${s}` : `${s} & ${o}`;
  h = e === "hwb" ? `${n} & ${c}` : h;
  const d = e === "hsl" ? `${o}` : `${r}`, p = z({ tagName: "div", className: `color-controls ${e}` }), m = "color-pointer", f = "color-slider";
  return [{ i: 1, c: m, l: h, min: 0, max: i }, { i: 2, c: f, l: d, min: 0, max: g }, { i: 3, c: f, l, min: 0, max: u }].forEach(($) => {
    const { i: k, c: P, l: D, min: N, max: M } = $, E = z({ tagName: "div", className: "color-control", role: "presentation" });
    E.append(z({ tagName: "div", className: `visual-control visual-control${k}` }));
    const L = z({ tagName: "div", className: `${P} knob`, ariaLive: "polite", ariaLabel: D, role: "slider", tabIndex: 0, ariaValueMin: `${N}`, ariaValueMax: `${M}` });
    E.append(L), p.append(E);
  }), p;
}, Lr = (a, e, t) => {
  const { input: r, format: l, componentLabels: s } = a, { defaultsLabel: o, presetsLabel: n } = s, c = t === "color-options", i = e instanceof Et, g = c ? n : o, u = i ? e.colors : e, h = u.length, { lightSteps: d } = i ? e : { lightSteps: null }, p = d || [9, 10].find((y) => h >= y * 2 && !(h % y)) || 5, m = c && h > p;
  let f = 2;
  f = m && h > p * 2 ? 3 : f, f = m && h > p * 3 ? 4 : f, f = m && h > p * 4 ? 5 : f;
  const $ = f - (h <= p * 3 ? 1 : 2), k = m && h > $ * p;
  let P = t;
  P += k ? " scrollable" : "", P += m ? " multiline" : "";
  const D = m ? "1px" : "0.25rem";
  let N = m ? 1.75 : 2;
  N = p > 5 && m ? 1.5 : N;
  const M = `${$ * N}rem`, E = `calc(${f} * ${N}rem + ${f - 1} * ${D})`, L = z({ tagName: "ul", className: P, role: "listbox", ariaLabel: g });
  return k && re(L, { "--grid-item-size": `${N}rem`, "--grid-fit": `${p}`, "--grid-gap": D, "--grid-height": M, "--grid-hover-height": E }), u.forEach((y) => {
    let [v, H] = typeof y == "string" ? y.trim().split(":") : [];
    y instanceof R && (v = y.toHexString(), H = v);
    const V = new R(y instanceof R ? y : v, l).toString() === Qe(r, "value"), I = z({ tagName: "li", className: `color-option${V ? " active" : ""}`, innerText: `${H || v}`, tabIndex: 0, role: "option", ariaSelected: V ? "true" : "false" });
    C(I, "data-value", `${v}`), c && re(I, { backgroundColor: v }), L.append(I);
  }), L;
}, yl = (a) => {
  const { input: e, parent: t, format: r, id: l, componentLabels: s, colorKeywords: o, colorPresets: n } = a, c = Qe(e, "value") || "#fff", { nonColors: i } = R, { toggleLabel: g, pickerLabel: u, formatLabel: h, hexLabel: d } = s, p = i.includes(c) ? "#fff" : c;
  a.color = new R(p, r);
  const m = r === "hex" ? d : qr(r), f = z({ id: `picker-btn-${l}`, tagName: "button", type: "button", className: "picker-toggle btn-appearance", ariaExpanded: "false", ariaHasPopup: "true" });
  f.append(z({ tagName: "span", className: Mt, innerText: `${u}. ${h}: ${m}` }));
  const $ = z({ tagName: "div", className: "color-dropdown picker", role: "group", ariaLabelledBy: `picker-btn-${l}` }), k = kl(a), P = Ll(a);
  if ($.append(k, P), e.before(f), t.append($), o || n) {
    const D = z({ tagName: "div", className: "color-dropdown scrollable menu" });
    n && D.append(Lr(a, n, "color-options")), o && o.length && D.append(Lr(a, o, "color-defaults"));
    const N = z({ tagName: "button", type: "button", className: "menu-toggle btn-appearance", tabIndex: -1, ariaExpanded: "false", ariaHasPopup: "true" }), M = encodeURI("http://www.w3.org/2000/svg"), E = Ct(M, { tagName: "svg" });
    C(E, "xmlns", M), C(E, "viewBox", "0 0 512 512"), C(E, Ga, "true");
    const L = Ct(M, { tagName: "path" });
    C(L, "d", "M98,158l157,156L411,158l27,27L255,368L71,185L98,158z"), C(L, "fill", "#fff"), E.append(L), N.append(z({ tagName: "span", className: Mt, innerText: `${g}` }), E), t.append(N, D);
  }
  o && i.includes(c) && (a.value = c), C(e, ye, "-1");
}, xl = "2.0.3", xe = "color-picker", Sl = `[data-function="${xe}"]`, kr = `.${xe}`, Cl = { componentLabels: Tt, colorLabels: Te, format: "rgb", colorPresets: false, colorKeywords: false }, { roundPart: F, nonColors: Ke } = R, Al = (a) => ol(a, xe), Pl = (a) => new ua(a), yr = (a, e) => {
  const t = e ? Ur : Gr, { input: r, pickerToggle: l, menuToggle: s } = a;
  t(r, qa, a.showPicker), t(l, St, a.togglePicker), s && t(s, St, a.toggleMenu);
}, ga = (a, e) => {
  const t = e ? Ur : Gr, { input: r, colorMenu: l, parent: s } = a, o = ie(r), n = pl(o);
  t(a.controls, Xa, a.pointerDown), a.controlKnobs.forEach((c) => t(c, ir, a.handleKnobs)), t(n, el, a.handleScroll), t(n, Qa, a.update), [r, ...a.inputs].forEach((c) => t(c, Wa, a.changeHandler)), l && (t(l, St, a.menuClickHandler), t(l, ir, a.menuKeyHandler)), t(o, Kr, a.pointerMove), t(o, Ya, a.pointerUp), t(s, Za, a.handleFocusOut), t(o, Ja, a.handleDismiss);
}, xr = (a) => {
  cl(a.input, new CustomEvent("colorpicker.change"));
}, ba = (a) => {
  a && ["bottom", "top"].forEach((e) => te(a, e));
}, wt = (a, e) => {
  const { colorPicker: t, colorMenu: r, menuToggle: l, pickerToggle: s, parent: o } = a, n = e === t, c = n ? r : t, i = n ? l : s, g = n ? s : l;
  Y(o, "open") || ge(o, "open"), c && (te(c, "show"), ba(c)), ge(e, "bottom"), ul(e), ge(e, "show"), n && a.update(), a.isOpen || (ga(a, true), a.updateDropdownPosition(), a.isOpen = true, C(a.input, ye, "0"), l && C(l, ye, "0")), C(g, xt, "true"), i && C(i, xt, "false");
};
class ua {
  constructor(e, t) {
    __publicField(this, "id");
    __publicField(this, "input");
    __publicField(this, "color");
    __publicField(this, "format", "rgb");
    __publicField(this, "parent");
    __publicField(this, "dragElement");
    __publicField(this, "isOpen", false);
    __publicField(this, "controlPositions");
    __publicField(this, "colorLabels", br(Te.map((e) => [e, e])));
    __publicField(this, "colorKeywords");
    __publicField(this, "colorPresets");
    __publicField(this, "componentLabels");
    __publicField(this, "pickerToggle");
    __publicField(this, "menuToggle");
    __publicField(this, "colorPicker");
    __publicField(this, "colorMenu");
    __publicField(this, "controls");
    __publicField(this, "inputs");
    __publicField(this, "controlKnobs");
    __publicField(this, "visuals");
    __publicField(this, "handleFocusOut", ({ relatedTarget: e }) => {
      e && !this.parent.contains(e) && this.hide(true);
    });
    __publicField(this, "handleDismiss", ({ code: e }) => {
      this.isOpen && e === al && this.hide();
    });
    __publicField(this, "handleScroll", (e) => {
      const { activeElement: t } = ie(this.input);
      this.updateDropdownPosition(), ([Kr, tl].includes(e.type) && this.dragElement || t && this.controlKnobs.includes(t)) && (e.stopPropagation(), e.preventDefault());
    });
    __publicField(this, "menuKeyHandler", (e) => {
      const { target: t, code: r } = e, { previousElementSibling: l, nextElementSibling: s, parentElement: o } = t, n = o && Y(o, "color-options"), c = o ? [...o.children] : [], i = n && Number(At(o, "--grid-fit")), g = c.indexOf(t), u = g > -1 && i && c[g - i], h = g > -1 && i && c[g + i];
      [ce, Pe, cr].includes(r) && e.preventDefault(), n ? u && r === Pe ? fe(u) : h && r === ce ? fe(h) : l && r === je ? fe(l) : s && r === me && fe(s) : l && [je, Pe].includes(r) ? fe(l) : s && [me, ce].includes(r) && fe(s), [rl, cr].includes(r) && this.menuClickHandler(e);
    });
    __publicField(this, "menuClickHandler", (e) => {
      const { target: t } = e, { colorMenu: r } = this, l = (Qe(t, "data-value") || "").trim();
      if (!l.length) return;
      const s = ve("li.active", r);
      let o = l;
      o = Ke.includes(o) ? "white" : o, o = o === "transparent" ? "rgba(0,0,0,0)" : o;
      const { r: n, g: c, b: i, a: g } = new R(o);
      ne(this.color, { r: n, g: c, b: i, a: g }), this.update(), s !== t && (s && (te(s, "active"), pt(s, ht)), ge(t, "active"), C(t, ht, "true"), Ke.includes(l) && (this.value = l), xr(this));
    });
    __publicField(this, "pointerDown", (e) => {
      if (e.button !== 0) return;
      const { target: t, pageX: r, pageY: l } = e, { colorMenu: s, visuals: o, controlKnobs: n } = this, [c, i, g] = o, [u, h, d] = n, p = n.includes(t) ? t.previousElementSibling : t, m = Ie(p), f = dt(c), $ = r - f.scrollLeft - m.left, k = l - f.scrollTop - m.top;
      if (t === c || t === u ? (this.dragElement = p, this.changeControl1($, k)) : t === i || t === h ? (this.dragElement = p, this.changeControl2(k)) : (t === g || t === d) && (this.dragElement = p, this.changeAlpha(k)), s) {
        const P = ve("li.active", s);
        P && (te(P, "active"), pt(P, ht));
      }
      e.preventDefault();
    });
    __publicField(this, "pointerUp", ({ target: e }) => {
      const { parent: t } = this, r = ie(t), l = ve(`${kr}.open`, r) !== null, s = r.getSelection();
      !this.dragElement && (!s || !s.toString().length) && !t.contains(e) && this.hide(l), this.dragElement = void 0;
    });
    __publicField(this, "pointerMove", (e) => {
      const { dragElement: t, visuals: r } = this, [l, s, o] = r, { pageX: n, pageY: c } = e;
      if (!t) return;
      const i = Ie(t), g = dt(l), u = n - g.scrollLeft - i.left, h = c - g.scrollTop - i.top;
      t === l && this.changeControl1(u, h), t === s && this.changeControl2(h), t === o && this.changeAlpha(h);
    });
    __publicField(this, "handleKnobs", (e) => {
      const { target: t, code: r } = e;
      if (![Pe, ce, je, me].includes(r)) return;
      e.preventDefault();
      const { controlKnobs: l, visuals: s } = this, { offsetWidth: o, offsetHeight: n } = s[0], [c, i, g] = l, { activeElement: u } = ie(c), h = l.find((p) => p === u), d = n / 360;
      if (h) {
        let p = 0, m = 0;
        if (t === c) {
          const f = o / 100;
          [je, me].includes(r) ? this.controlPositions.c1x += r === me ? f : -f : [Pe, ce].includes(r) && (this.controlPositions.c1y += r === ce ? d : -d), p = this.controlPositions.c1x, m = this.controlPositions.c1y, this.changeControl1(p, m);
        } else t === i ? (this.controlPositions.c2y += [ce, me].includes(r) ? d : -d, m = this.controlPositions.c2y, this.changeControl2(m)) : t === g && (this.controlPositions.c3y += [ce, me].includes(r) ? d : -d, m = this.controlPositions.c3y, this.changeAlpha(m));
        this.handleScroll(e);
      }
    });
    __publicField(this, "changeHandler", () => {
      let e;
      const { inputs: t, format: r, value: l, input: s, controlPositions: o, visuals: n } = this, { activeElement: c } = ie(s), { offsetHeight: i } = n[0], [g, , , u] = t, [h, d, p, m] = r === "rgb" ? t.map((k) => parseFloat(k.value) / (k === u ? 100 : 1)) : t.map((k) => parseFloat(k.value) / (k !== g ? 100 : 360)), f = this.hasNonColor && Ke.includes(l), $ = u ? m : 1 - o.c3y / i;
      if (c === s || c && t.includes(c)) {
        c === s ? f ? e = l === "transparent" ? "rgba(0,0,0,0)" : "rgb(0,0,0)" : e = l : r === "hex" ? e = g.value : r === "hsl" ? e = { h, s: d, l: p, a: $ } : r === "hwb" ? e = { h, w: d, b: p, a: $ } : e = { r: h, g: d, b: p, a: $ };
        const { r: k, g: P, b: D, a: N } = new R(e);
        ne(this.color, { r: k, g: P, b: D, a: N }), this.setControlPositions(), this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals(), c === s && f && (this.value = l);
      }
    });
    __publicField(this, "update", () => {
      this.updateDropdownPosition(), this.updateAppearance(), this.setControlPositions(), this.updateInputs(true), this.updateControls(), this.updateVisuals();
    });
    __publicField(this, "togglePicker", (e) => {
      e && e.preventDefault();
      const { colorPicker: t } = this;
      this.isOpen && Y(t, "show") ? this.hide(true) : wt(this, t);
    });
    __publicField(this, "showPicker", () => {
      const { colorPicker: e } = this;
      ["top", "bottom"].some((t) => Y(e, t)) || wt(this, e);
    });
    __publicField(this, "toggleMenu", (e) => {
      e && e.preventDefault();
      const { colorMenu: t } = this;
      this.isOpen && Y(t, "show") ? this.hide(true) : wt(this, t);
    });
    const r = ve(e);
    if (typeof e > "u") throw new TypeError("ColorPicker target not specified.");
    if (!Zr(r)) throw new TypeError(`ColorPicker target "${e}" cannot be found.`);
    this.input = r;
    const l = Xr(r, kr);
    if (!l) throw new TypeError("ColorPicker requires a specific markup to work.");
    this.parent = l, this.id = Jr(r, xe), this.dragElement = void 0, this.isOpen = false, this.controlPositions = { c1x: 0, c1y: 0, c2y: 0, c3y: 0 }, this.colorKeywords = false, this.colorPresets = false;
    const { format: s, componentLabels: o, colorLabels: n, colorKeywords: c, colorPresets: i } = bl(r, Cl, t || {});
    let g = Te;
    mt(n) && n.length === 17 ? g = n : ue(n) && n.split(",").length === 17 && (g = n.split(",")), ne(this.colorLabels, br(g.map((m, f) => [Te[f], m])));
    const u = ue(o) && $r(o) ? JSON.parse(o) : o;
    if (this.componentLabels = ne({ ...Tt }, u), this.color = new R(r.value || "#fff", s), this.format = s, mt(c) && c.length ? this.colorKeywords = c : ue(c) && c.length && (this.colorKeywords = c.split(",").map((m) => m.trim())), mt(i) && i.length) this.colorPresets = i;
    else if (i && $r(i)) {
      const { hue: m, hueSteps: f, lightSteps: $, saturation: k } = JSON.parse(i);
      this.colorPresets = new Et(m, f, $, k);
    } else ue(i) && (this.colorPresets = i.split(",").map((m) => m.trim()));
    yl(this);
    const [h, d] = He("color-dropdown", l);
    this.pickerToggle = ve(".picker-toggle", l), this.menuToggle = ve(".menu-toggle", l), this.colorPicker = h, this.colorMenu = d, this.inputs = [...He("color-input", l)];
    const [p] = He("color-controls", l);
    this.controls = p, this.controlKnobs = [...He("knob", p)], this.visuals = [...He("visual-control", p)], this.update(), yr(this, true), Ve.set(r, xe, this);
  }
  get value() {
    return this.input.value;
  }
  set value(e) {
    this.input.value = e;
  }
  get hasNonColor() {
    return this.colorKeywords instanceof Array && this.colorKeywords.some((e) => Ke.includes(e));
  }
  get hex() {
    return this.color.toHex(true);
  }
  get hsv() {
    return this.color.toHsv();
  }
  get hsl() {
    return this.color.toHsl();
  }
  get hwb() {
    return this.color.toHwb();
  }
  get rgb() {
    return this.color.toRgb();
  }
  get brightness() {
    return this.color.brightness;
  }
  get luminance() {
    return this.color.luminance;
  }
  get isDark() {
    const { color: e, brightness: t } = this;
    return t < 120 && e.a > 0.33;
  }
  get isValid() {
    const e = this.input.value;
    return e !== "" && new R(e).isValid;
  }
  get appearance() {
    const { colorLabels: e, hsl: t, hsv: r, format: l } = this, s = F(t.h * 360), o = l === "hsl" ? t.s : r.s, n = F(o * 100), c = F(t.l * 100), i = r.v * 100;
    let g = "black";
    if (c === 100 && n === 0) g = e.white;
    else if (c === 0) g = e.black;
    else if (n === 0) g = e.grey;
    else if (s < 15 || s >= 345) g = e.red;
    else if (s >= 15 && s < 45) g = i > 80 && n > 80 ? e.orange : e.brown;
    else if (s >= 45 && s < 75) {
      const u = s > 46 && s < 54 && i < 80 && n > 90, h = s >= 54 && s < 75 && i < 80;
      g = u ? e.gold : e.yellow, g = h ? e.olive : g;
    } else s >= 75 && s < 155 ? g = i < 68 ? e.green : e.lime : s >= 155 && s < 175 ? g = e.teal : s >= 175 && s < 195 ? g = e.cyan : s >= 195 && s < 255 ? g = e.blue : s >= 255 && s < 270 ? g = e.violet : s >= 270 && s < 295 ? g = e.magenta : s >= 295 && s < 345 && (g = e.pink);
    return g;
  }
  updateVisuals() {
    const { controlPositions: e, visuals: t } = this, [r, l, s] = t, { offsetHeight: o } = r, n = e.c2y / o, { r: c, g: i, b: g } = new R({ h: n * 360, s: 100, l: 50 }).toRgb(), u = "linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)", h = 1 - e.c3y / o, d = F(h * 100) / 100, p = new R({ h: n * 360, s: 100, l: 50, a: h }).toRgbString();
    re(r, { background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,${d}) 100%),
      linear-gradient(to right, rgba(255,255,255,${d}) 0%, ${p} 100%),
      ${u}` }), re(l, { background: `linear-gradient(
      rgb(255,0,0) 0%, rgb(255,255,0) 16.67%,
      rgb(0,255,0) 33.33%, rgb(0,255,255) 50%,
      rgb(0,0,255) 66.67%, rgb(255,0,255) 83.33%,
      rgb(255,0,0) 100%)` }), re(s, { background: `linear-gradient(rgba(${c},${i},${g},1) 0%,rgba(${c},${i},${g},0) 100%)` });
  }
  changeControl1(e, t) {
    let [r, l] = [0, 0];
    const { controlPositions: s, visuals: o } = this, { offsetHeight: n, offsetWidth: c } = o[0];
    e > c ? r = c : e >= 0 && (r = e), t > n ? l = n : t >= 0 && (l = t);
    const i = s.c2y / n, g = r / c, u = 1 - l / n, h = 1 - s.c3y / n, { r: d, g: p, b: m, a: f } = new R({ h: i * 360, s: g * 100, v: u * 100, a: h });
    ne(this.color, { r: d, g: p, b: m, a: f }), this.controlPositions.c1x = r, this.controlPositions.c1y = l, this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals();
  }
  changeControl2(e) {
    const { controlPositions: t, visuals: r } = this, { offsetHeight: l, offsetWidth: s } = r[0];
    let o = 0;
    e > l ? o = l : e >= 0 && (o = e);
    const n = o / l, c = t.c1x / s, i = 1 - t.c1y / l, g = 1 - t.c3y / l, { r: u, g: h, b: d, a: p } = new R({ h: n * 360, s: c * 100, v: i * 100, a: g });
    ne(this.color, { r: u, g: h, b: d, a: p }), this.controlPositions.c2y = o, this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals();
  }
  changeAlpha(e) {
    const { visuals: t } = this, { offsetHeight: r } = t[0];
    let l = 0;
    e > r ? l = r : e >= 0 && (l = e);
    const s = 1 - l / r;
    this.color.setAlpha(s), this.controlPositions.c3y = l, this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals();
  }
  updateDropdownPosition() {
    const { input: e, colorPicker: t, colorMenu: r } = this, l = Ie(e), { top: s, bottom: o } = l, { offsetHeight: n } = e, c = dt(e).clientHeight, i = Y(t, "show") ? t : r;
    if (!i) return;
    const { offsetHeight: g } = i, u = c - o, h = s, d = s + g + n > c, p = s - g < 0;
    (Y(i, "bottom") || !p) && u < h && d ? (te(i, "bottom"), ge(i, "top")) : (te(i, "top"), ge(i, "bottom"));
  }
  setControlPositions() {
    const { visuals: e, color: t, hsv: r } = this, { offsetHeight: l, offsetWidth: s } = e[0], o = t.a, n = r.h, c = r.s, i = r.v;
    this.controlPositions.c1x = c * s, this.controlPositions.c1y = (1 - i) * l, this.controlPositions.c2y = n * l, this.controlPositions.c3y = (1 - o) * l;
  }
  updateAppearance() {
    const { componentLabels: e, color: t, parent: r, hsv: l, hex: s, format: o, controlKnobs: n } = this, { appearanceLabel: c, hexLabel: i, valueLabel: g } = e;
    let { r: u, g: h, b: d } = t.toRgb();
    const [p, m, f] = n, $ = F(l.h * 360), k = t.a, P = F(l.s * 100), D = F(l.v * 100), N = this.appearance;
    let M = `${i} ${s.split("").join(" ")}`;
    if (o === "hwb") {
      const { hwb: y } = this, v = F(y.w * 100), H = F(y.b * 100);
      M = `HWB: ${$}\xB0, ${v}%, ${H}%`, C(p, Ae, `${v}% & ${H}%`), C(p, Ce, `${v}`), C(m, nr, `${g}: ${M}. ${c}: ${N}.`), C(m, Ae, `${$}%`), C(m, Ce, `${$}`);
    } else [u, h, d] = [u, h, d].map(F), M = o === "hsl" ? `HSL: ${$}\xB0, ${P}%, ${D}%` : M, M = o === "rgb" ? `RGB: ${u}, ${h}, ${d}` : M, C(p, Ae, `${D}% & ${P}%`), C(p, Ce, `${D}`), C(m, nr, `${g}: ${M}. ${c}: ${N}.`), C(m, Ae, `${$}\xB0`), C(m, Ce, `${$}`);
    const E = F(k * 100);
    C(f, Ae, `${E}%`), C(f, Ce, `${E}`);
    const L = t.toString();
    re(this.input, { backgroundColor: L }), this.isDark ? (Y(r, "txt-light") && te(r, "txt-light"), Y(r, "txt-dark") || ge(r, "txt-dark")) : (Y(r, "txt-dark") && te(r, "txt-dark"), Y(r, "txt-light") || ge(r, "txt-light"));
  }
  updateControls() {
    const { controlKnobs: e, controlPositions: t } = this;
    let { c1x: r, c1y: l, c2y: s, c3y: o } = t;
    const [n, c, i] = e;
    [r, l, s, o] = [r, l, s, o].map(F), re(n, { transform: `translate3d(${r - 4}px,${l - 4}px,0)` }), re(c, { transform: `translate3d(0,${s - 4}px,0)` }), re(i, { transform: `translate3d(0,${o - 4}px,0)` });
  }
  updateInputs(e) {
    const { value: t, format: r, inputs: l, color: s, hsl: o } = this, [n, c, i, g] = l, u = F(s.a * 100), h = F(o.h * 360);
    let d = s.toString();
    if (r === "hex") d = this.color.toHexString(true), n.value = this.hex;
    else if (r === "hsl") {
      const p = F(o.l * 100), m = F(o.s * 100);
      d = this.color.toHslString(), n.value = `${h}`, c.value = `${m}`, i.value = `${p}`, g.value = `${u}`;
    } else if (r === "hwb") {
      const { w: p, b: m } = this.hwb, f = F(p * 100), $ = F(m * 100);
      d = this.color.toHwbString(), n.value = `${h}`, c.value = `${f}`, i.value = `${$}`, g.value = `${u}`;
    } else if (r === "rgb") {
      let { r: p, g: m, b: f } = this.rgb;
      [p, m, f] = [p, m, f].map(F), d = this.color.toRgbString(), n.value = `${p}`, c.value = `${m}`, i.value = `${f}`, g.value = `${u}`;
    }
    this.value = d, !e && d !== t && xr(this);
  }
  hide(e) {
    if (!this.isOpen) return;
    const { pickerToggle: t, menuToggle: r, colorPicker: l, colorMenu: s, parent: o, input: n } = this, c = Y(l, "show"), i = c ? l : s, g = c ? t : r, u = i && gl(i);
    this.value = this.color.toString(true), i && (te(i, "show"), C(g, xt, "false"), setTimeout(() => {
      ba(i), ve(".show", o) || (te(o, "open"), ga(this), this.isOpen = false);
    }, u)), e || fe(t), C(n, ye, "-1"), g === r && C(r, ye, "-1");
  }
  dispose() {
    const { input: e, parent: t } = this;
    this.hide(true), yr(this), [...t.children].forEach((r) => {
      r !== e && r.remove();
    }), pt(e, ye), re(e, { backgroundColor: "" }), ["txt-light", "txt-dark"].forEach((r) => te(t, r)), Ve.remove(e, xe);
  }
}
__publicField(ua, "Color", R);
__publicField(ua, "ColorPalette", Et);
__publicField(ua, "getInstance", Al);
__publicField(ua, "init", Pl);
__publicField(ua, "selector", Sl);
__publicField(ua, "roundPart", F);
__publicField(ua, "setElementStyle", re);
__publicField(ua, "setAttribute", C);
__publicField(ua, "getBoundingClientRect", Ie);
__publicField(ua, "version", xl);
__publicField(ua, "colorNames", Te);
__publicField(ua, "colorPickerLabels", Tt);
var Hl = ["<div", ' class="', '"><div class="color-control" role="presentation"', '><div class="visual-control visual-control1" style="', '"></div><div class="color-pointer knob" role="slider" tabindex="0" aria-live="polite" aria-valuemin="0" aria-valuemax="100" aria-label="', '" aria-valuetext="', '"', ' style="', '"></div></div><div class="color-control" role="presentation"', '><div class="visual-control visual-control2" style="', '"></div><div class="color-slider knob" aria-live="polite" role="slider" tabindex="0"', ' aria-valuemin="0" aria-valuemax="360" aria-description="', '" aria-valuetext="', '"', ' style="', '"></div></div><div class="color-control" role="presentation"', '><div class="visual-control visual-control3" style="', '"></div><div class="color-slider knob" aria-live="polite" role="slider" tabindex="0"', ' aria-valuemin="0" aria-valuemax="100" aria-valuetext="', '"', ' style="', '"></div></div></div>'], _l = ["<div", ' class="', '" role="group" id="', '"><!--$-->', '<!--/--><div class="color-form rgb"><label for="', '"><span aria-hidden="true">R:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input red" autocomplete="off" spellcheck="false" min="0" max="255" step="1"', '><label for="', '"><span aria-hidden="true">G:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input green" autocomplete="off" spellcheck="false" min="0" max="255" step="1"', '><label for="', '"><span aria-hidden="true">B:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input blue" autocomplete="off" spellcheck="false" min="0" max="255" step="1"', '><label for="', '"><span aria-hidden="true">A:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input alpha" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', "></div></div>"], Nl = ["<div", ' class="', '" role="group" id="', '"><!--$-->', '<!--/--><div class="color-form hsl"><label for="', '"><span aria-hidden="true">H:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input hue" autocomplete="off" spellcheck="false" min="0" max="360" step="1"', '><label for="', '"><span aria-hidden="true">S:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input saturation" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', '><label for="', '"><span aria-hidden="true">L:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input lightness" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', '><label for="', '"><span aria-hidden="true">A:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input alpha" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', "></div></div>"], El = ["<div", ' class="', '" role="group" id="', '"><!--$-->', '<!--/--><div class="color-form hwb"><label for="', '"><span aria-hidden="true">H:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input hue" autocomplete="off" spellcheck="false" min="0" max="360" step="1"', '><label for="', '"><span aria-hidden="true">W:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input whiteness" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', '><label for="', '"><span aria-hidden="true">B:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input blackness" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', '><label for="', '"><span aria-hidden="true">A:</span><span class="v-hidden">', '</span></label><input id="', '" type="number" class="color-input alpha" autocomplete="off" spellcheck="false" min="0" max="100" step="1"', "></div></div>"], Tl = ["<div", ' class="', '" role="group" id="', '"><!--$-->', '<!--/--><div class="color-form hex"><label for="color_hex_hex_1"><span aria-hidden="true">#:</span><span class="v-hidden">', '</span></label><input id="', '" type="text" class="color-input hex" autocomplete="off" spellcheck="false"', "></div></div>"], Ml = ["<ul", ' role="listbox"', ' style="', '">', "</ul>"], Fl = ["<li", ' tabindex="0" role="option"', ' style="', '">', "</li>"], Rl = ["<ul", ' class="color-defaults" role="listbox"', ">", "</ul>"], Dl = ["<li", ' tabindex="0" role="option"', ">", "</li>"], Vl = ["<button", ' class="menu-toggle btn-appearance" type="button"', ' aria-haspopup="true"><span class="v-hidden">', '</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path d="M98,158l157,156L411,158l27,27L255,368L71,185L98,158z" fill="#fff"></path></svg></button>'], zl = ["<div", "><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], Ol = ["<div", '><button class="picker-toggle btn-appearance"', ' aria-haspopup="true" type="button"><span class="v-hidden">', '</span></button><input type="text"', ' class="color-preview btn-appearance" autocomplete="off" spellcheck="false"', ' style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], ha = createContext({}), pe = () => useContext(ha), jl = () => globalThis.innerWidth > 980 ? 300 : 230, _ = jl, { roundPart: j } = ae, et = (a) => {
  const { drag: e, setDrag: t, color: r, setColor: l, locale: s, format: o, controlPositions: n, setControlPositions: c } = pe();
  let i;
  const { stringValue: g } = a, u = `linear-gradient(
    rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.67%, 
    rgb(0, 255, 0) 33.33%, 
    rgb(0, 255, 255) 50%, 
    rgb(0, 0, 255) 66.67%, 
    rgb(255, 0, 255) 83.33%, 
    rgb(255, 0, 0) 100%
  )`, h = () => n().c2y / _(), d = () => j(r().toHsv().v * 100), p = () => j(r().toHsv().s * 100), m = () => 1 - n().c3y / _(), f = () => new ae({ h: h() * 360, s: 100, l: 50, a: m() }), $ = () => {
    const L = j(m() * 100) / 100;
    return `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,${L}) 100%),
          linear-gradient(to right, rgba(255,255,255,${L}) 0%, ${f().toRgbString()} 100%), 
          linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)`;
  }, k = () => {
    const L = r().toHsl(), y = r().toHsv(), v = j(L.h * 360), H = o() === "hsl" ? L.s : y.s, V = j(H * 100), I = j(L.l * 100), J = y.v * 100;
    let A = "black";
    if (I === 100 && V === 0) A = s().white;
    else if (I === 0) A = s().black;
    else if (V === 0) A = s().grey;
    else if (v < 15 || v >= 345) A = s().red;
    else if (v >= 15 && v < 45) A = J > 80 && V > 80 ? s().orange : s().brown;
    else if (v >= 45 && v < 75) {
      const X = v > 46 && v < 54 && J < 80 && V > 90, de = v >= 54 && v < 75 && J < 80;
      A = X ? s().gold : s().yellow, A = de ? s().olive : A;
    } else v >= 75 && v < 155 ? A = J < 68 ? s().green : s().lime : v >= 155 && v < 175 ? A = s().teal : v >= 175 && v < 195 ? A = s().cyan : v >= 195 && v < 255 ? A = s().blue : v >= 255 && v < 270 ? A = s().violet : v >= 270 && v < 295 ? A = s().magenta : v >= 295 && v < 345 && (A = s().pink);
    return A;
  }, P = (L) => {
    const { pageX: y, pageY: v } = L;
    if (!e()) return;
    const H = [...i.children], V = Br(e()), { documentElement: I } = document, J = y - I.scrollLeft - V.left, A = v - I.scrollTop - V.top;
    H[0].contains(e()) ? D(J, A) : H[1].contains(e()) ? N(A) : H[2].contains(e()) && M(A);
  }, D = (L, y) => {
    let [v, H] = [0, 0];
    L > _() ? v = _() : L >= 0 && (v = L), y > _() ? H = _() : y >= 0 && (H = y);
    const V = n(), I = V.c2y / _(), J = v / _(), A = 1 - H / _(), X = 1 - V.c3y / _(), de = new ae({ h: I * 360, s: J * 100, v: A * 100, a: X }, o());
    l(de), c((tt) => ({ ...tt, c1x: v, c1y: H }));
  }, N = (L) => {
    let y = 0;
    L > _() ? y = _() : L >= 0 && (y = L);
    const v = n(), H = y / _(), V = v.c1x / _(), I = 1 - v.c1y / _(), J = 1 - v.c3y / _(), A = new ae({ h: H * 360, s: V * 100, v: I * 100, a: J }, o());
    l(A), c((X) => ({ ...X, c2y: y }));
  }, M = (L) => {
    let y = 0;
    L > _() ? y = _() : L >= 0 && (y = L);
    const v = 1 - y / _(), H = new ae(r().setAlpha(v), o());
    l(H), c((V) => ({ ...V, c3y: y }));
  }, E = (L) => {
    (L ? jr : Ir)(document, "pointermove", P);
  };
  return createEffect(() => {
    e() ? E(true) : E(), onCleanup(E);
  }), ssr(Hl, ssrHydrationKey(), `color-controls ${escape(o(), true)}`, ssrAttribute("tabindex", -1, false), "background:" + escape($(), true), `${escape(s().lightnessLabel, true)} &amp; ${escape(s().saturationLabel, true)}`, `${escape(d(), true)}% &amp; ${escape(p(), true)}%`, ssrAttribute("aria-valuenow", escape(d(), true), false), `transform:translate3d(${escape(n().c1x, true) - 4}px, ${escape(n().c1y, true) - 4}px, 0px)`, ssrAttribute("tabindex", -1, false), "background:" + escape(u, true), ssrAttribute("aria-label", escape(s().hueLabel, true), false), `${escape(s().valueLabel, true)}: ${escape(g(), true)}. ${escape(s().appearanceLabel, true)}: ${escape(k(), true)}.`, `${escape(j(h() * 100), true)}\xB0`, ssrAttribute("aria-valuenow", escape(j(h() * 100), true), false), `transform:translate3d(0px, ${escape(n().c2y, true) - 4}px, 0px)`, ssrAttribute("tabindex", -1, false), `background:linear-gradient(${escape(f().setAlpha(1).toRgbString(), true)} 0%, ${escape(f().setAlpha(0).toRgbString(), true)} 100%)`, ssrAttribute("aria-label", escape(s().alphaLabel, true), false), `${escape(j(m() * 100), true)}%`, ssrAttribute("aria-valuenow", escape(j(m() * 100), true), false), `transform:translate3d(0px, ${escape(n().c3y, true) - 4}px, 0px)`);
}, Il = (a) => {
  const { locale: e, format: t, color: r, setColor: l, updateControlPositions: s } = pe(), { id: o } = a, n = () => {
    let { r: i, g, b: u, a: h } = r().toRgb();
    return [i, g, u] = [i, g, u].map(j), h = j(h * 100), { r: i, g, b: u, a: h };
  }, c = () => {
    const { r: i, g, b: u } = n();
    return `${t().toUpperCase()}: ${i} ${g} ${u}`;
  };
  return ssr(_l, ssrHydrationKey(), `color-dropdown picker${escape(a.class(), true)}`, `${escape(o, true)}-picker`, escape(createComponent(et, { stringValue: c })), `color_rgb_red_${escape(o, true)}`, escape(e().redLabel), `color_rgb_red_${escape(o, true)}`, ssrAttribute("value", escape(n().r, true), false), `color_rgb_green_${escape(o, true)}`, escape(e().greenLabel), `color_rgb_green_${escape(o, true)}`, ssrAttribute("value", escape(n().g, true), false), `color_rgb_blue_${escape(o, true)}`, escape(e().blueLabel), `color_rgb_blue_${escape(o, true)}`, ssrAttribute("value", escape(n().b, true), false), `color_rgb_alpha_${escape(o, true)}`, escape(e().alphaLabel), `color_rgb_alpha_${escape(o, true)}`, ssrAttribute("value", escape(n().a, true), false));
}, Bl = (a) => {
  const { format: e, locale: t, color: r, setColor: l, updateControlPositions: s } = pe(), { id: o } = a, n = () => {
    let { h: i, s: g, l: u, a: h } = r().toHsl();
    return [i, g, u] = [i, g, u].map((d, p) => j(d * (p ? 100 : 360))), h = j(h * 100), { h: i, s: g, l: u, a: h };
  }, c = () => {
    const { h: i, s: g, l: u } = n();
    return `${e().toUpperCase()}: ${i}\xB0 ${g}% ${u}%`;
  };
  return ssr(Nl, ssrHydrationKey(), `color-dropdown picker${escape(a.class(), true)}`, `${escape(o, true)}-picker`, escape(createComponent(et, { stringValue: c })), `color_hsl_hue_${escape(o, true)}`, escape(t().hueLabel), `color_hsl_hue_${escape(o, true)}`, ssrAttribute("value", escape(n().h, true), false), `color_hsl_saturation_${escape(o, true)}`, escape(t().saturationLabel), `color_hsl_saturation_${escape(o, true)}`, ssrAttribute("value", escape(n().s, true), false), `color_hsl_lightness_${escape(o, true)}`, escape(t().lightnessLabel), `color_hsl_lightness_${escape(o, true)}`, ssrAttribute("value", escape(n().l, true), false), `color_hsl_alpha_${escape(o, true)}`, escape(t().alphaLabel), `color_hsl_alpha_${escape(o, true)}`, ssrAttribute("value", escape(n().a, true), false));
}, Kl = (a) => {
  const { locale: e, format: t, color: r, setColor: l, updateControlPositions: s } = pe(), { id: o } = a, n = () => {
    let { h: i, w: g, b: u, a: h } = r().toHwb();
    return [i, g, u] = [i, g, u].map((d, p) => j(d * (p ? 100 : 360))), h = j(h * 100), { h: i, w: g, b: u, a: h };
  }, c = () => {
    const { h: i, w: g, b: u } = n();
    return `${t().toUpperCase()}: ${i}\xB0 ${g}% ${u}%`;
  };
  return ssr(El, ssrHydrationKey(), `color-dropdown picker${escape(a.class(), true)}`, `${escape(o, true)}-picker`, escape(createComponent(et, { stringValue: c })), `color_hwb_hue_${escape(o, true)}`, escape(e().hueLabel), `color_hwb_hue_${escape(o, true)}`, ssrAttribute("value", escape(n().h, true), false), `color_hwb_whiteness_${escape(o, true)}`, escape(e().whitenessLabel), `color_hwb_whiteness_${escape(o, true)}`, ssrAttribute("value", escape(n().w, true), false), `color_hwb_blackness-${escape(o, true)}`, escape(e().blacknessLabel), `color_hwb_blackness-${escape(o, true)}`, ssrAttribute("value", escape(n().b, true), false), `color_hwb_alpha_${escape(o, true)}`, escape(e().alphaLabel), `color_hwb_alpha_${escape(o, true)}`, ssrAttribute("value", escape(n().a, true), false));
}, Ul = (a) => {
  const { format: e, locale: t, color: r, setColor: l, updateControlPositions: s } = pe(), { id: o } = a, n = () => r().toHex(), c = () => `${t().hexLabel}: ${n().toUpperCase()}`;
  return ssr(Tl, ssrHydrationKey(), `color-dropdown picker${escape(a.class(), true)}`, `${escape(o, true)}-picker`, escape(createComponent(et, { stringValue: c })), escape(t().hexLabel), `color_hex_${escape(o, true)}`, ssrAttribute("value", escape(n(), true), false));
}, Gl = { rgb: Il, hex: Ul, hsl: Bl, hwb: Kl }, Wl = (a) => {
  const { format: e } = pe(), t = () => createComponent$1(Gl[e()], a), [r, l] = createSignal(t());
  return createEffect(() => l(t())), createComponent(Suspense, { get children() {
    return r();
  } });
}, ql = Wl, { ColorPalette: Zl } = ua, Jl = (a) => {
  const [e, t] = splitProps(a, ["colorPresets"]), { locale: r, value: l, setColor: s, format: o } = pe(), n = () => new Zl(e.colorPresets().hue, e.colorPresets().hueSteps, e.colorPresets().lightSteps, e.colorPresets().saturation).colors, c = () => n().length, i = () => e.colorPresets().lightSteps, g = () => c() > i(), u = () => g() && c() > i() * 4 ? 5 : g() && c() > i() * 3 ? 4 : g() && c() > i() * 2 ? 3 : 2, h = () => u() - (c() <= i() * 3 ? 1 : 2), d = () => "color-options" + (g() && c() > h() * i() ? " scrollable" : "") + (g() ? " multiline" : ""), p = () => {
    const m = g() ? "1px" : "0.25rem", f = i() > 5 && g() ? 1.5 : g() ? 1.75 : 2, $ = `${h() * f}rem`, k = `calc(${u()} * ${f}rem + ${u() - 1} * ${m})`;
    return { "--grid-item-size": `${f}rem`, "--grid-fit": i(), "--grid-gap": m, "--grid-height": $, "--grid-hover-height": k };
  };
  return ssr(Ml, ssrHydrationKey() + ssrAttribute("class", escape(d(), true), false), ssrAttribute("aria-label", escape(r().presetsLabel, true), false), ssrStyle(p()), escape(createComponent(For, { get each() {
    return n();
  }, children: (m) => {
    const f = () => new ae(m, o()), $ = () => f().toString(), k = () => $() === l(), P = () => `color-option${k() ? " active" : ""}`;
    return ssr(Fl, ssrHydrationKey(), ssrAttribute("aria-selected", escape(k(), true), false) + ssrAttribute("class", escape(P(), true), false) + ssrAttribute("data-value", escape($(), true), false), "background-color:" + escape(m.toRgbString(), true), escape($()));
  } })));
}, Xl = (a) => {
  const [e, t] = splitProps(a, ["colorKeywords"]), { locale: r, value: l, setColor: s, format: o } = pe();
  return ssr(Rl, ssrHydrationKey(), ssrAttribute("aria-label", escape(r().defaultsLabel, true), false), escape(createComponent(For, { get each() {
    return e.colorKeywords();
  }, children: (n) => {
    const [c, i] = typeof n == "string" ? [n, n] : Ua(n)[0], g = () => [n, i].some((h) => h === l()), u = () => `color-option${g() ? " active" : ""}`;
    return ssr(Dl, ssrHydrationKey() + ssrAttribute("class", escape(u(), true), false), ssrAttribute("data-value", escape(i, true), false) + ssrAttribute("aria-selected", escape(g(), true), false), escape(c));
  } })));
}, Yl = (a) => {
  const [e, t] = splitProps(a, ["id", "class", "ref", "toggleMenu", "expanded", "locale"]), r = () => `${e.id}-menu`, l = () => `color-dropdown menu${e.class()}`, s = (o) => {
    const { target: n, currentTarget: c, code: i } = o, { previousElementSibling: g, nextElementSibling: u, parentElement: h } = n, d = Oa(c, "color-options"), p = [...h.children], m = d && Number(De(h, "--grid-fit") || 0) || 0, f = p.indexOf(n), $ = f > -1 && m && p[f - m], k = f > -1 && m && p[f + m];
    [ct, gt, lr].includes(i) && o.preventDefault(), d ? $ && i === gt ? we($) : k && i === ct ? we(k) : g && i === rr ? we(g) : u && i === ar && we(u) : g && [rr, gt].includes(i) ? we(g) : u && [ar, ct].includes(i) && we(u), [Ra, lr, "NumpadEnter"].includes(i) && n.click();
  };
  return createComponent(Show, { get when() {
    return t.colorKeywords() || t.colorPresets();
  }, get children() {
    return [ssr(Vl, ssrHydrationKey(), ssrAttribute("tabindex", e.expanded ? 0 : -1, false) + ssrAttribute("aria-expanded", escape(e.expanded, true), false), escape(e.locale().toggleLabel)), ssr(zl, ssrHydrationKey() + ssrAttribute("id", escape(r(), true), false) + ssrAttribute("class", escape(l(), true), false), escape(createComponent(Show, { get when() {
      return typeof t.colorPresets < "u" && t.colorPresets();
    }, get children() {
      return createComponent(Jl, { get colorPresets() {
        return t.colorPresets;
      }, keyHandler: s });
    } })), escape(createComponent(Show, { get when() {
      return typeof t.colorKeywords < "u" && t.colorKeywords();
    }, get children() {
      return createComponent(Xl, { get colorKeywords() {
        return t.colorKeywords;
      }, keyHandler: s });
    } })))];
  } });
}, Ql = Yl, es = { c1x: 0, c1y: 0, c2y: 0, c3y: 0 }, ts = es, rs = { white: "white", black: "black", grey: "grey", red: "red", orange: "orange", brown: "brown", gold: "gold", olive: "olive", yellow: "yellow", lime: "lime", green: "green", teal: "teal", cyan: "cyan", blue: "blue", violet: "violet", magenta: "magenta", pink: "pink", pickerLabel: "Colour Picker", appearanceLabel: "Colour Appearance", valueLabel: "Colour Value", toggleLabel: "Select Colour", placeholder: "Type colour value in % format", presetsLabel: "Colour Presets", defaultsLabel: "Colour Defaults", formatLabel: "Format", alphaLabel: "Alpha", hexLabel: "Hexadecimal", hueLabel: "Hue", whitenessLabel: "Whiteness", blacknessLabel: "Blackness", saturationLabel: "Saturation", lightnessLabel: "Lightness", redLabel: "Red", greenLabel: "Green", blueLabel: "Blue" }, as = { white: "\u0431\u0435\u043B\u044B\u0439", black: "\u0447\u0435\u0440\u043D\u044B\u0439", grey: "\u0441\u0435\u0440\u044B\u0439", red: "\u043A\u0440\u0430\u0441\u043D\u044B\u0439", orange: "\u043E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439", brown: "\u043A\u043E\u0440\u0438\u0447\u043D\u0435\u0432\u044B\u0439", gold: "\u0437\u043E\u043B\u043E\u0442\u043E\u0439", olive: "\u043E\u043B\u0438\u0432\u043A\u043E\u0432\u044B\u0439", yellow: "\u0436\u0435\u043B\u0442\u044B\u0439", lime: "\u043B\u0430\u0439\u043C", green: "\u0437\u0435\u043B\u0435\u043D\u044B\u0439", teal: "\u0447\u0438\u0440\u043E\u043A", cyan: "\u0433\u043E\u043B\u0443\u0431\u043E\u0439", blue: "\u0441\u0438\u043D\u0438\u0439", violet: "\u0444\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439", magenta: "\u043F\u0443\u0440\u043F\u0443\u0440\u043D\u044B\u0439", pink: "\u0440\u043E\u0437\u043E\u0432\u044B\u0439", pickerLabel: "\u041F\u0430\u043B\u0438\u0442\u0440\u0430 \u0446\u0432\u0435\u0442\u043E\u0432", appearanceLabel: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434 \u0446\u0432\u0435\u0442\u0430", valueLabel: "\u0426\u0432\u0435\u0442\u043E\u0432\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", toggleLabel: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0446\u0432\u0435\u0442\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 %", presetsLabel: "\u0426\u0432\u0435\u0442\u043E\u0432\u044B\u0435 \u043F\u0440\u0435\u0441\u0435\u0442\u044B", defaultsLabel: "\u0426\u0432\u0435\u0442\u043E\u0432\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E", formatLabel: "\u0424\u043E\u0440\u043C\u0430\u0442", alphaLabel: "\u0410\u043B\u044C\u0444\u0430", hexLabel: "\u0428\u0435\u0441\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u0438\u0440\u0438\u0447\u043D\u044B\u0439", hueLabel: "\u041E\u0442\u0442\u0435\u043D\u043E\u043A", whitenessLabel: "\u0411\u0435\u043B\u0438\u0437\u043D\u0430", blacknessLabel: "\u0427\u0435\u0440\u043D\u043E\u0442\u0430", saturationLabel: "\u041D\u0430\u0441\u044B\u0449\u0435\u043D\u043D\u043E\u0441\u0442\u044C", lightnessLabel: "\u0421\u0432\u0435\u0442\u043B\u043E\u0442\u0430", redLabel: "\u041A\u0440\u0430\u0441\u043D\u044B\u0439", greenLabel: "\u0417\u0435\u043B\u0435\u043D\u044B\u0439", blueLabel: "\u0421\u0438\u043D\u0438\u0439" }, ls = { white: "blanc", black: "noir", grey: "gris", red: "rouge", orange: "orange", brown: "marron", gold: "or", olive: "olive", yellow: "jaune", lime: "citron", green: "vert", teal: "sarcelle", cyan: "cyan", blue: "bleu", violet: "violet", magenta: "magenta", pink: "rose", pickerLabel: "S\xE9lecteur de couleur", appearanceLabel: "Apparence de la couleur", valueLabel: "Valeur de la couleur", toggleLabel: "S\xE9lectionner la couleur", placeholder: "Tapez la valeur de la couleur en format %", presetsLabel: "Pr\xE9r\xE9glages de couleur", defaultsLabel: "Couleurs par d\xE9faut", formatLabel: "Format", alphaLabel: "Alpha", hexLabel: "Hexad\xE9cimal", hueLabel: "Teinte", whitenessLabel: "Blancheur", blacknessLabel: "Noirceur", saturationLabel: "Saturation", lightnessLabel: "Luminosit\xE9", redLabel: "Rouge", greenLabel: "Vert", blueLabel: "Bleu" }, ss = { white: "\u0623\u0628\u064A\u0636", black: "\u0623\u0633\u0648\u062F", grey: "\u0631\u0645\u0627\u062F\u064A", red: "\u0623\u062D\u0645\u0631", orange: "\u0628\u0631\u062A\u0642\u0627\u0644\u064A", brown: "\u0628\u0646\u064A", gold: "\u0630\u0647\u0628\u064A", olive: "\u0632\u064A\u062A\u0648\u0646\u064A", yellow: "\u0623\u0635\u0641\u0631", lime: "\u0644\u064A\u0645\u0648\u0646\u064A", green: "\u0623\u062E\u0636\u0631", teal: "\u0641\u064A\u0631\u0648\u0632\u064A", cyan: "\u0633\u0645\u0627\u0648\u064A", blue: "\u0623\u0632\u0631\u0642", violet: "\u0628\u0646\u0641\u0633\u062C\u064A", magenta: "\u0642\u0631\u0645\u0632\u064A", pink: "\u0648\u0631\u062F\u064A", pickerLabel: "\u0645\u0646\u062A\u0642\u064A \u0627\u0644\u0623\u0644\u0648\u0627\u0646", appearanceLabel: "\u0645\u0638\u0647\u0631 \u0627\u0644\u0644\u0648\u0646", valueLabel: "\u0642\u064A\u0645\u0629 \u0627\u0644\u0644\u0648\u0646", toggleLabel: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0644\u0648\u0646", placeholder: "\u0627\u0643\u062A\u0628 \u0642\u064A\u0645\u0629 \u0627\u0644\u0644\u0648\u0646 \u0628\u062A\u0646\u0633\u064A\u0642 %", presetsLabel: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0645\u0633\u0628\u0642\u0629", defaultsLabel: "\u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629", formatLabel: "\u0627\u0644\u062A\u0646\u0633\u064A\u0642", alphaLabel: "\u0623\u0644\u0641\u0627", hexLabel: "\u0627\u0644\u0633\u0627\u062F\u0633 \u0639\u0634\u0631\u064A", hueLabel: "\u0627\u0644\u062A\u062F\u0631\u062C \u0627\u0644\u0644\u0648\u0646\u064A", whitenessLabel: "\u0627\u0644\u0628\u064A\u0627\u0636", blacknessLabel: "\u0627\u0644\u0633\u0648\u0627\u062F", saturationLabel: "\u0627\u0644\u062A\u0634\u0628\u0639", lightnessLabel: "\u0627\u0644\u0625\u0636\u0627\u0621\u0629", redLabel: "\u0623\u062D\u0645\u0631", greenLabel: "\u0623\u062E\u0636\u0631", blueLabel: "\u0623\u0632\u0631\u0642" }, os = { white: "alb", black: "negru", grey: "gri", red: "ro\u0219u", orange: "portocaliu", brown: "maro", gold: "auriu", olive: "m\u0103sliniu", yellow: "galben", lime: "l\u0103m\xE2i", green: "verde", teal: "turcoaz", cyan: "cian", blue: "albastru", violet: "violet", magenta: "magenta", pink: "roz", pickerLabel: "Panel de culori", appearanceLabel: "Aparen\u021Ba vizual\u0103", valueLabel: "Valoarea actual\u0103", toggleLabel: "Selecteaz\u0103 culoare", placeholder: "Tasteaz\u0103 culoare \xEEn format %", presetsLabel: "Culori prestabilite", defaultsLabel: "Valori implicite", formatLabel: "Format", alphaLabel: "Alfa", hexLabel: "Hexazecimal", whitenessLabel: "Alb", blacknessLabel: "Negru", hueLabel: "Nuan\u021B\u0103", saturationLabel: "Satura\u021Bie", lightnessLabel: "Luminozitate", redLabel: "Ro\u0219u", greenLabel: "Verde", blueLabel: "Albastru" }, ns = { white: "wei\xDF", black: "schwarz", grey: "grau", red: "rot", orange: "orange", brown: "braun", gold: "gold", olive: "olivgr\xFCn", yellow: "gelb", lime: "limone", green: "gr\xFCn", teal: "krickente", cyan: "zyan", blue: "blau", violet: "violett", magenta: "magenta", pink: "rosa", pickerLabel: "Farbauswahl", appearanceLabel: "Farberscheinung", valueLabel: "Farbwert", toggleLabel: "Farbe ausw\xE4hlen", placeholder: "Geben Sie den Farbwert im %-Format ein", presetsLabel: "Farbvoreinstellungen", defaultsLabel: "Farbstandards", formatLabel: "Format", alphaLabel: "Alpha", hexLabel: "Hexadezimal", hueLabel: "Farbton", whitenessLabel: "Wei\xDFgrad", blacknessLabel: "Schwarzgrad", saturationLabel: "S\xE4ttigung", lightnessLabel: "Helligkeit", redLabel: "Rot", greenLabel: "Gr\xFCn", blueLabel: "Blau" }, is = { white: "\u767D", black: "\u9ED1", grey: "\u7070\u8272", red: "\u7EA2\u8272", orange: "\u6A59", brown: "\u68D5\u8272", gold: "\u91D1\u8272", olive: "\u6A44\u6984\u8272", yellow: "\u9EC4\u8272", lime: "\u9752\u67E0\u8272", green: "\u7EFF", teal: "\u6C34\u9E2D\u8272", cyan: "\u9752\u8272", blue: "\u84DD", violet: "\u7D2B\u7F57\u5170\u8272", magenta: "\u54C1\u7EA2\u8272", pink: "\u7C89\u7EA2\u8272", pickerLabel: "\u989C\u8272\u9009\u62E9\u5668", appearanceLabel: "\u989C\u8272\u5916\u89C2", valueLabel: "\u989C\u8272\u503C", toggleLabel: "\u9009\u62E9\u989C\u8272", placeholder: "\u4EE5%\u683C\u5F0F\u8F93\u5165\u989C\u8272\u503C", presetsLabel: "\u989C\u8272\u9884\u8BBE", defaultsLabel: "\u9ED8\u8BA4\u989C\u8272", formatLabel: "\u683C\u5F0F", alphaLabel: "\u900F\u660E\u5EA6", hexLabel: "\u5341\u516D\u8FDB\u5236", hueLabel: "\u8272\u8C03", whitenessLabel: "\u767D\u5EA6", blacknessLabel: "\u9ED1\u5EA6", saturationLabel: "\u9971\u548C\u5EA6", lightnessLabel: "\u4EAE\u5EA6", redLabel: "\u7EA2\u8272", greenLabel: "\u7EFF\u8272", blueLabel: "\u84DD\u8272" }, cs = { white: "blanco", black: "negro", grey: "gris", red: "rojo", orange: "naranja", brown: "marr\xF3n", gold: "oro", olive: "aceituna", yellow: "amarillo", lime: "lima", green: "verde", teal: "cerceta", cyan: "cian", blue: "azul", violet: "violeta", magenta: "magenta", pink: "rosado", pickerLabel: "Selector de color", appearanceLabel: "Apariencia de color", valueLabel: "Valor de color", toggleLabel: "Seleccionar color", placeholder: "Escriba el valor del color en formato %", presetsLabel: "Ajustes preestablecidos de color", defaultsLabel: "Valores predeterminados de color", formatLabel: "Formato", alphaLabel: "Alfabeto", hexLabel: "Hexadecimal", hueLabel: "Tinte", whitenessLabel: "Blancura", blacknessLabel: "Negrura", saturationLabel: "Saturaci\xF3n", lightnessLabel: "Ligereza", redLabel: "Rojo", greenLabel: "Verde", blueLabel: "Azul" }, gs = { white: "Branco", black: "preto", grey: "cinzento", red: "vermelho", orange: "laranja", brown: "castanho", gold: "ouro", olive: "azeitona", yellow: "amarelo", lime: "cal", green: "verde", teal: "azul-marinho", cyan: "ciano", blue: "azul", violet: "violeta", magenta: "magenta", pink: "pink", pickerLabel: "Seletor de cores", appearanceLabel: "Apar\xEAncia da cor", valueLabel: "Valor da cor", toggleLabel: "Selecionar Cor", placeholder: "Digite o valor da cor no formato %", presetsLabel: "Predefini\xE7\xF5es de cor", defaultsLabel: "Padr\xF5es de cor", formatLabel: "Formato", alphaLabel: "Alfa", hexLabel: "Hexadecimal", hueLabel: "Matiz", whitenessLabel: "Brancura", blacknessLabel: "Negritude", saturationLabel: "Satura\xE7\xE3o", lightnessLabel: "Leveza", redLabel: "Vermelho", greenLabel: "Verde", blueLabel: "Azul" }, bs = { white: "bia\u0142y", black: "czarny", grey: "szary", red: "czerwony", orange: "pomara\u0144czowy", brown: "br\u0105zowy", gold: "z\u0142oto", olive: "oliwka", yellow: "\u017C\xF3\u0142ty", lime: "wapno", green: "zielony", teal: "turkus", cyan: "cyan", blue: "niebieski", violet: "fiolet", magenta: "purpura", pink: "r\xF3\u017Cowy", pickerLabel: "Wyb\xF3r koloru", appearanceLabel: "Wygl\u0105d koloru", valueLabel: "Warto\u015B\u0107 koloru", toggleLabel: "Wybierz kolor", placeholder: "Wpisz warto\u015B\u0107 koloru w formacie %", presetsLabel: "Predefiniowane kolory", defaultsLabel: "Domy\u015Blne kolory", formatLabel: "Format", alphaLabel: "Alfa", hexLabel: "Heksadecymalny", hueLabel: "Barwa", whitenessLabel: "Biela", blacknessLabel: "Czer\u0144", saturationLabel: "Nasycenie", lightnessLabel: "Jasno\u015B\u0107", redLabel: "Czerwony", greenLabel: "Zielony", blueLabel: "Niebieski" }, us = { white: "\u767D\u3044", black: "\u9ED2\u3044", grey: "\u7070\u8272", red: "\u8D64\u3044", orange: "\u30AA\u30EC\u30F3\u30B8", brown: "\u8910\u8272", gold: "\u91D1", olive: "\u30AA\u30EA\u30FC\u30D6", yellow: "\u9EC4\u8272", lime: "\u30E9\u30A4\u30E0", green: "\u7DD1", teal: "\u5C0F\u9D28", cyan: "\u30B7\u30A2\u30F3", blue: "\u9752\u3044", violet: "\u7D2B", magenta: "\u30DE\u30B8\u30A7\u30F3\u30BF", pink: "\u30D4\u30F3\u30AF", pickerLabel: "\u30D4\u30C3\u30AB\u30FC\u30E9\u30D9\u30EB", appearanceLabel: "\u5916\u89B3\u30E9\u30D9\u30EB", valueLabel: "\u5024\u30E9\u30D9\u30EB", toggleLabel: "\u30E9\u30D9\u30EB\u306E\u5207\u308A\u66FF\u3048", placeholder: "%\u5F62\u5F0F\u3067\u8272\u306E\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", presetsLabel: "\u30D7\u30EA\u30BB\u30C3\u30C8\u30E9\u30D9\u30EB", defaultsLabel: "\u65E2\u5B9A\u306E\u30E9\u30D9\u30EB", formatLabel: "\u30E9\u30D9\u30EB\u306E\u66F8\u5F0F\u8A2D\u5B9A", alphaLabel: "\u30A2\u30EB\u30D5\u30A1\u30E9\u30D9\u30EB", hexLabel: "\u30D8\u30C3\u30AF\u30B9\u30E9\u30D9\u30EB", hueLabel: "\u30D5\u30A8\u30E9\u30D9\u30EB", whitenessLabel: "\u767D\u8272\u5EA6\u30E9\u30D9\u30EB", blacknessLabel: "\u9ED2\u3055\u30E9\u30D9\u30EB", saturationLabel: "\u5F69\u5EA6\u30E9\u30D9\u30EB", lightnessLabel: "\u660E\u5EA6\u30E9\u30D9\u30EB", redLabel: "\u8D64\u3044\u30E9\u30D9\u30EB", greenLabel: "\u30B0\u30EA\u30FC\u30F3\u30E9\u30D9\u30EB", blueLabel: "\u9752\u3044\u30E9\u30D9\u30EB" }, hs = { white: "\uD558\uC580", black: "\uAC80\uC815", grey: "\uD68C\uC0C9", red: "\uBE68\uAC15", orange: "\uC624\uB80C\uC9C0", brown: "\uAC08\uC0C9", gold: "\uAE08", olive: "\uC62C\uB9AC\uBE0C", yellow: "\uD669\uC0C9", lime: "\uB77C\uC784", green: "\uB179\uC0C9", teal: "\uCCAD\uB85D", cyan: "\uCCAD\uB85D\uC0C9", blue: "\uD30C\uB791", violet: "\uBCF4\uB77C\uC0C9", magenta: "\uC790\uD64D\uC0C9", pink: "\uBD84\uD64D\uC0C9", pickerLabel: "\uC120\uD0DD\uAE30 \uB808\uC774\uBE14", appearanceLabel: "\uBAA8\uC591 \uB808\uC774\uBE14", valueLabel: "\uAC12 \uB808\uC774\uBE14", toggleLabel: "\uD1A0\uAE00 \uB808\uC774\uBE14", placeholder: "% \uD615\uC2DD\uC73C\uB85C \uC0C9\uC0C1 \uAC12\uC744 \uC785\uB825\uD558\uC2ED\uC2DC\uC624", presetsLabel: "\uC0AC\uC804 \uC124\uC815 \uB808\uC774\uBE14", defaultsLabel: "\uAE30\uBCF8 \uB808\uC774\uBE14", formatLabel: "\uD615\uC2DD \uB808\uC774\uBE14", alphaLabel: "\uC54C\uD30C \uB808\uC774\uBE14", hexLabel: "\uD5E5\uC2A4 \uB77C\uBCA8", hueLabel: "\uC0C9\uC870 \uB808\uC774\uBE14", whitenessLabel: "\uBC31\uC0C9 \uB77C\uBCA8", blacknessLabel: "blackness \uB808\uC774\uBE14", saturationLabel: "\uCC44\uB3C4 \uB808\uC774\uBE14", lightnessLabel: "\uAC00\uBCBC\uC6C0 \uB77C\uBCA8", redLabel: "\uB808\uB4DC \uB77C\uBCA8", greenLabel: "\uADF8\uB9B0 \uB77C\uBCA8", blueLabel: "\uBE14\uB8E8\uB77C\uBCA8" }, pa = { en: rs, ru: as, ar: ss, fr: ls, de: ns, ro: os, es: cs, pt: gs, pl: bs, zh: is, ja: us, ko: hs }, Ft = (a) => pa[a || "en"], ps = { value: "rgb(255,0,0)", placeholder: Ft("en").placeholder, format: "rgb", lang: "en", theme: "dark" }, Ue = ps, Sr = 0, ds = (a) => {
  const e = a.id ? a.id : `color-picker-${Sr}`, t = () => a.lang || Ue.lang, r = () => a.theme || Ue.theme, l = () => a.format || Ue.format, s = () => a.value || Ue.value, o = () => a.colorPresets, n = () => a.colorKeywords, c = () => a.placeholder ? a.placeholder : H().placeholder.replace(/%/g, l().toUpperCase()), [i, g] = createSignal(s()), [u, h] = createSignal(s()), [d, p] = createSignal(new ae(s(), l())), [m, f] = createSignal(void 0), [$, k] = createSignal(void 0), [P, D] = createSignal(false), [N, M] = createSignal(false), [E, L] = createSignal(""), [y, v] = createSignal(ts), H = createMemo(() => {
    if (t() !== "en" && or(pa).includes(t())) return Ft(t());
    const T = Ft(t());
    return a.locale && or(a.locale).length === 35 && ja(T, a.locale), T;
  }), V = () => {
    const T = new ae(u());
    return T.isDark && T.a > 0.33;
  }, I = () => ["color-picker", a.class ? a.class.split(/\s/) : "", V() ? "txt-dark" : "txt-light", r() === "light" ? " light" : "", m() ? "open" : ""].filter((T) => T).join(" ");
  Sr += 1;
  let J, A, X, de;
  const tt = () => `${m() === A ? " " + E() : ""}${P() ? " show" : ""}`, da = () => `${m() === X ? " " + E() : ""}${N() ? " show" : ""}`, ma = () => {
    f(X), L("bottom"), setTimeout(() => {
      M(true), ut(X), Kt(), D(false);
    }, 17);
  }, It = () => {
    M(false), ut(X), sr(X, Ut);
  }, Bt = () => {
    P() ? va() : N() && It();
  }, fa = () => {
    m() !== X ? ma() : It();
  }, va = () => {
    D(false), ut(A), sr(A, Ut);
  }, wa = (T) => {
    m() && T.key === Da && Bt();
  }, $a = (T) => {
    const O = document.getSelection();
    !$() && (!O || !O.toString().length) && !J.contains(T.target) && Bt(), k();
  }, Kt = () => {
    const T = Br(de), { top: O, bottom: lt } = T, { offsetHeight: st } = de, { clientHeight: Gt } = document.documentElement, Wt = m();
    if (!Wt) return;
    const { offsetHeight: qt } = Wt, La = Gt - lt, ka = O, ya = O + qt + st > Gt;
    !(O - qt < 0) && ya || La < ka ? L("top") : L("bottom");
  }, rt = () => {
    const { h: T, s: O, v: lt } = d().toHsv(), st = d().a;
    v({ c1x: O * _(), c1y: (1 - lt) * _(), c2y: T * _(), c3y: (1 - st) * _() });
  }, at = (T) => {
    const O = T ? jr : Ir;
    O(window, "scroll", Kt), O(window, "resize", rt), O(document, "keyup", wa), O(document, "pointerup", $a);
  }, Ut = () => {
    L(""), f(), we(de.previousElementSibling), g(u());
  };
  return createEffect(() => {
    P() || N() ? at(true) : at(), onCleanup(at);
  }), createEffect(on(l, (T) => {
    p(new ae(u(), T)), rt();
  })), createEffect(on(d, (T) => {
    const O = T.toString();
    h(O), g(O), typeof a.onChange == "function" && a.onChange(O);
  })), createComponent(ha.Provider, { value: { format: l, locale: H, value: u, setValue: h, setInputValue: g, color: d, setColor: p, drag: $, setDrag: k, controlPositions: y, setControlPositions: v, updateControlPositions: rt }, get children() {
    return ssr(Ol, ssrHydrationKey() + ssrAttribute("class", escape(I(), true), false) + ssrAttribute("lang", escape(t(), true), false), ssrAttribute("aria-expanded", escape(P(), true), false), `${escape(H().pickerLabel)}. ${escape(H().formatLabel)}: ${escape(l().toUpperCase())}`, ssrAttribute("name", escape(e, true), false) + ssrAttribute("id", escape(e, true), false), ssrAttribute("tabindex", P() ? -1 : 0, false) + ssrAttribute("placeholder", escape(c(), true), false) + ssrAttribute("value", escape(i(), true), false), "background-color:" + escape(u(), true), escape(createComponent(ql, { id: e, class: tt })), escape(createComponent(Ql, { id: e, class: da, colorPresets: o, colorKeywords: n, get expanded() {
      return N() || P();
    }, locale: H, toggleMenu: fa })));
  } });
}, ws = ds;

export { ws as DefaultColorPicker };
//# sourceMappingURL=index-WwoiZKEg2.mjs.map
