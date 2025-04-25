import { createStore } from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/solid-js@1.9.5/node_modules/solid-js/store/dist/server.js';

const [a, o] = createStore({ step: "upload", walletId: null, data: null, originalData: null, history: [], mappingResult: null, errorMessage: null });
function C(e, s) {
  console.log("CONTEXT ACTION: initializeFileData");
  const t = e.rows.map((n) => ({ ...n })), l = [...e.headers, "PulsixCategory", "PulsixSubCategory"];
  o("data", { headers: l, rows: t, length: e.rows.length }), o("originalData", { headers: l, rows: t, length: e.rows.length }), o("history", []), g("preview"), o("walletId", s), o("errorMessage", null), o("mappingResult", null), i();
}
function i() {
  console.log("CONTEXT ACTION: logContext ->", a);
}
function g(e) {
  console.log(`CONTEXT ACTION: setCurrentStep -> ${e}`), o("step", e);
}
function c(e) {
  console.log(`CONTEXT ACTION: setErrorMessage -> ${e}`), o("errorMessage", e);
}

export { C, a, c, g };
//# sourceMappingURL=context-5bbmmXgY2.mjs.map
