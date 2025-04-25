import { E } from './server-fns-runtime-DEO2-sKc.mjs';
import { a as t } from '../_/nitro.mjs';
import { Q } from './action-CiKOD-Zz.mjs';

const n = E(async function(r) {
  var _a;
  try {
    const t$1 = await t.query("SELECT * FROM wallets WHERE id = $1;", [r]);
    return console.log(t$1.rows[0]), (_a = t$1.rows[0]) != null ? _a : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_getWallet_ts--getWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/getWallet.ts?tsr-directive-use-server="), p = n, _ = E(async (e) => {
  var _a;
  const r = parseInt(e.get("category_id")) || null;
  try {
    let t$1;
    return e.get("type") == "wallet" && (t$1 = await t.query("UPDATE wallets SET wallet_name = $1, currency = $2, nation = $3, color = $4, category_id = $5 WHERE id = $6", [e.get("walletName"), e.get("currency"), e.get("nation"), e.get("color"), r, e.get("id")])), e.get("type") == "container" && (t$1 = await t.query("UPDATE wallets SET wallet_name = $1, category_id = $2 WHERE id = $3", [e.get("walletName"), r, e.get("id")])), (_a = t$1 == null ? void 0 : t$1.rows) != null ? _a : [];
  } catch (t) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", t), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_setWallet_ts--setWallet_action", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/setWallet.ts?tsr-directive-use-server="), D = Q(_), i = "_buttonDelete_jyjbm_1", u = "_text_jyjbm_10", W = "_paragraf_jyjbm_14", g = "_textDelete_jyjbm_18", w = "_textCancel_jyjbm_22", d = { buttonDelete: i, text: u, paragraf: W, textDelete: g, textCancel: w }, x = E(async function(r, t$1) {
  var _a;
  const a = /* @__PURE__ */ new Date();
  try {
    let l;
    return l = await t.query("UPDATE wallets SET date_of_delete = $1 WHERE id = $2", [a, r]), (_a = l == null ? void 0 : l.rows) != null ? _a : [];
  } catch (l) {
    throw console.error("[Server Function:getWalletsSub] Errore DB:", l), new Error("Errore recupero somma wallets.");
  }
}, "src_routes_API_Wallets_deleteWallet_ts--deleteWallet_1", "C:/Users/Matteo/Desktop/Pulsix/src/routes/API/Wallets/deleteWallet.ts?tsr-directive-use-server=");

export { D, d, p, x };
//# sourceMappingURL=deleteWallet-DdSpVRBs.mjs.map
