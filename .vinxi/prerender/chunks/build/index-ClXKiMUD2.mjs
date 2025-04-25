function b(t) {
  if (t == null || typeof t != "string" || t.trim() === "") return null;
  const r = t.replace(/[€$£]|CHF/gi, "").replace(/\s+/g, "").replace(/\.(?=.*\.)/g, "").replace(/,/g, "."), e = parseFloat(r);
  return isNaN(e) ? null : Math.abs(e);
}
function v(t) {
  if (t == null || typeof t != "string" || t.trim() === "") return 0;
  const r = t.replace(/[€$£]|CHF/gi, "").replace(/\s+/g, "").replace(/\.(?=.*\.)/g, "").replace(/,/g, "."), e = parseFloat(r);
  return isNaN(e) ? 0 : Math.sign(e);
}
function w(t, r, e) {
  var _a, _b, _c, _d, _e;
  const u = [], o = {};
  for (const n in r) {
    const s = r[n];
    s && (o[s] = n);
  }
  const l = o.amount, i = o.type_indicator;
  for (const n of t) {
    let s = null, a = null;
    if (l && n[l] !== void 0) {
      const g = n[l];
      if (a = b(g), a !== null && a !== 0) {
        if (e.mode === "auto") s = v(g) < 0 === e.negativeIsExpense ? "Expense" : "Income";
        else if (e.mode === "column" && i && n[i] !== void 0 && e.columnName && e.positiveValue && e.negativeValue) {
          const c = (_a = n[i]) == null ? void 0 : _a.trim().toLowerCase(), H = e.positiveValue.trim().toLowerCase(), y = e.negativeValue.trim().toLowerCase();
          c === H ? s = "Income" : c === y && (s = "Expense");
        }
      }
    }
    a === null && console.warn("Riga saltata o con importo nullo - Impossibile parsare l'importo:", n);
    const d = o.cause, p = o.date, m = o.category_id, f = o.subCategory_id, C = { amount: a, type: s, cause: d ? (_b = n[d]) != null ? _b : null : null, date: p ? (_c = n[p]) != null ? _c : null : null, category_id: m ? (_d = n[m]) != null ? _d : null : null, subCategory_id: f ? (_e = n[f]) != null ? _e : null : null };
    u.push(C);
  }
  return u;
}

export { w };
//# sourceMappingURL=index-ClXKiMUD2.mjs.map
