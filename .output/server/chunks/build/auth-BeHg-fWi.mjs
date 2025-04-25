import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import d from 'axios';

const n = d.create({ baseURL: "http://localhost:3000/", withCredentials: true, headers: { "Content-Type": "application/json" } });
function T() {
  const [u, a] = createSignal(null), [i, o] = createStore({ user: null, isAuthenticated: false, isLoading: true, error: null });
  async function g() {
    o({ isLoading: true, error: null });
    try {
      const e = await n.post("API/Auth/refresh");
      console.log(e.data.accessToken), a(e.data.accessToken), o({ isAuthenticated: true, error: null, isLoading: false });
    } catch {
      console.log("Initialization: No valid refresh token found or refresh failed."), a(null), o({ isAuthenticated: false, error: null });
    } finally {
      o({ isLoading: false });
    }
  }
  function A(e, t) {
    var _a, _b, _c, _d, _e, _f;
    let r = t;
    if (d.isAxiosError(e)) {
      const s = e;
      r = ((_b = (_a = s.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || ((_d = (_c = s.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) || s.message || t, ((_f = (_e = s.response) == null ? void 0 : _e.data) == null ? void 0 : _f.details) && (r = Object.values(s.response.data.details).map((P) => P._errors.join(", ")).join("; "));
    } else e instanceof Error && (r = e.message);
    console.error(`${t} Error:`, e), o({ error: r });
  }
  async function p(e, t) {
    o({ isLoading: true, error: null }), console.log("Login");
    try {
      const r = await n.post("API/Auth/login", { username: e, password: t });
      return a(r.data.accessToken), true;
    } catch (r) {
      return A(r, "Login failed"), false;
    } finally {
      o({ isLoading: false });
    }
  }
  async function h() {
    i.isLoading || o({ isLoading: true }), u(), a(null), o({ user: null, isAuthenticated: false, error: null });
    try {
      await n.post("API/Auth/logout");
    } catch (e) {
      console.error("Logout API call error:", e);
    } finally {
      o({ isLoading: false });
    }
  }
  n.interceptors.request.use((e) => {
    const t = u();
    return console.log("INTERCEPTOR: Token value:", t), console.log("INTERCEPTOR: Config headers object:", e.headers), t && e.headers && (console.log("token yess"), e.url !== "API/Auth/login" && e.url !== "API/Auth/registration" && (e.headers.Authorization = `Bearer ${t}`, console.log("header", e.headers.Authorization))), e;
  }, (e) => Promise.reject(e));
  let l = false, c = [];
  const f = (e, t = null) => {
    c.forEach((r) => {
      e ? r.reject(e) : (r.config.headers.Authorization = `Bearer ${t}`, n(r.config).then(r.resolve).catch(r.reject));
    }), c = [];
  };
  return n.interceptors.response.use((e) => e, async (e) => {
    var _a;
    const t = e.config;
    if (((_a = e.response) == null ? void 0 : _a.status) === 401 && t && t.url !== "API/Auth/refresh" && t.url !== "API/Auth/login" && t.url !== "API/Auth/registration") {
      if (l) return new Promise((r, s) => {
        c.push({ resolve: r, reject: s, config: t });
      }).catch((r) => Promise.reject(r));
      t._retry = true, l = true, console.log("Axios interceptor: 401 detected, attempting refresh...");
      try {
        const s = (await n.post("API/Auth/refresh")).data.accessToken;
        return a(s), console.log("Axios interceptor: Token refreshed successfully."), t.headers && (t.headers.Authorization = `Bearer ${s}`), f(null, s), n(t);
      } catch (r) {
        return console.error("Axios interceptor: Refresh token failed.", r), f(r, null), await h(), Promise.reject(r);
      } finally {
        l = false;
      }
    }
    return Promise.reject(e);
  }), { get user() {
    return i.user;
  }, get isAuthenticated() {
    return i.isAuthenticated;
  }, get isLoading() {
    return i.isLoading;
  }, get error() {
    return i.error;
  }, initialize: g, login: p, logout: h, api: n };
}
const j = T();

export { j };
//# sourceMappingURL=auth-BeHg-fWi.mjs.map
