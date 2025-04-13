import { w, D as D$1 } from './db.server-Cxzv6220.mjs';
import { Q } from '../_/nitro.mjs';

const n = w(async function(r) {
  var _a;
  try {
    const t = await D$1.query("SELECT * FROM wallets WHERE id = $1;", [r]);
    return console.log(t.rows[0]), (_a = t.rows[0]) != null ? _a : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallet_ts--getWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server="), d = n, i = w(async (e) => {
  var _a;
  const r = parseInt(e.get("category_id")) || null;
  try {
    let t;
    return e.get("type") == "wallet" && (t = await D$1.query("UPDATE wallets SET wallet_name = $1, currency = $2, nation = $3, color = $4, category_id = $5 WHERE id = $6", [e.get("walletName"), e.get("currency"), e.get("nation"), e.get("color"), r, e.get("id")])), e.get("type") == "container" && (t = await D$1.query("UPDATE wallets SET wallet_name = $1, category_id = $2 WHERE id = $3", [e.get("walletName"), r, e.get("id")])), (_a = t == null ? void 0 : t.rows) != null ? _a : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_setWallet_ts--setWallet_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server="), p = Q(i), u = "_buttonDelete_jyjbm_1", _ = "_text_jyjbm_10", g = "_paragraf_jyjbm_14", W = "_textDelete_jyjbm_18", m = "_textCancel_jyjbm_22", D = { buttonDelete: u, text: _, paragraf: g, textDelete: W, textCancel: m }, x = w(async function(r, t) {
  var _a;
  const a = (/* @__PURE__ */ new Date()).toLocaleString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  try {
    let l;
    return l = await D$1.query("UPDATE wallets SET date_of_delete = $1 WHERE id = $2", [a, r]), (_a = l == null ? void 0 : l.rows) != null ? _a : [];
  } catch (l) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", l), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=");

export { D, d, p, x };
//# sourceMappingURL=deleteWallet-CDUDB5HW.mjs.map
