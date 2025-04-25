import { createRoot, createSignal } from 'solid-js';

function h() {
  const [r, a] = createSignal(false), [p, s] = createSignal(null), [i, c] = createSignal(false), l = /* @__PURE__ */ new Set(), [g, u] = createSignal(false);
  let o = null;
  const d = async () => {
    if (r() || i()) return r();
    c(true), s(null), console.log("SplineLoader: Starting runtime preload...");
    try {
      if (o = (await import('@splinetool/runtime')).Application, !o) throw new Error("Spline runtime module loaded but Application class not found.");
      return a(true), console.log("SplineLoader: Runtime preloaded successfully."), true;
    } catch (e) {
      return console.error("SplineLoader: Runtime preload failed:", e), s(e instanceof Error ? e : new Error(String(e))), a(false), false;
    } finally {
      c(false);
    }
  }, f = async (e) => {
    if (!(!e || l.has(e))) {
      console.log(`SplineLoader: Attempting to prefetch scene data for ${e}...`), u(true);
      try {
        const t = await fetch(e, { cache: "force-cache" });
        t.ok ? console.log(`SplineLoader: Prefetch for ${e} likely successful (status ${t.status}). Data might be cached.`) : console.warn(`SplineLoader: Prefetch for ${e} failed with status ${t.status}. The actual load might still work.`);
      } catch (t) {
        console.warn(`SplineLoader: Prefetch for ${e} threw an error:`, t);
      } finally {
        l.add(e), u(false);
      }
    }
  };
  return { preloadRuntime: d, prefetchSceneData: f, preloadRuntimeAndScenes: async (e) => {
    await d() ? (console.log("SplineLoader: Runtime ready, starting scene prefetch..."), e.forEach((m) => f(m))) : console.error("SplineLoader: Cannot prefetch scenes because runtime failed to load.");
  }, getRuntime: () => o, getRuntimeStatus: () => ({ isLoading: i(), isReady: r(), error: p() }) };
}
const A = createRoot(h);

export { A as default };
//# sourceMappingURL=preLoader.mjs.map
