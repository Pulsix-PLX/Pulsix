import { createStore } from 'solid-js/store';

const [o, t] = createStore({ currentStep: "upload", fileData: null, originalRows: null, history: [], mappingResult: null, errorMessage: null });
function n(e) {
  console.log(`STORE ACTION: setCurrentStep -> ${e}`), t("currentStep", e);
}
function l(e) {
  console.log("STORE ACTION: setMappingResult"), t("mappingResult", e);
}
function a(e) {
  console.log(`STORE ACTION: setErrorMessage -> ${e}`), t("errorMessage", e);
}

export { a, l, n, o };
//# sourceMappingURL=context-XUFMQc9R2.mjs.map
