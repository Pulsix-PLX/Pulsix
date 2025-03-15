import { createMemo, createSignal } from 'solid-js';
import style from './index.module.scss';
export default function ProgressBar() {
  const [next, setNext] = createSignal<number>(2);
  const steps: number = 3;

  createMemo(() => {
    if (typeof document !== 'undefined') {
      // Progresso della barra
      document.documentElement.style.setProperty('--width-upline', `${(next() / steps) * 100}%`);
    }
  });
  return (
    <>
      <div class={`CM mt-200 ${style.ProgressBar}`}>
        <div class={`CM gap-100 ${style.Steps}`}>
          <div class={`${style.Step}`} classList={{ [style.StepDone]: next() >= 1 }}>
            <p>1</p>
          </div>
          <div class={`${style.Step}`} classList={{ [style.StepDone]: next() >= 2 }}>
            <p>2</p>
          </div>
          <div class={`${style.Step}`} classList={{ [style.StepDone]: next() >= 3 }}>
            <p>3</p>
          </div>
        </div>
        <div class={`mt-31 ${style.Line}`} />
      </div>

      <button onclick={() => setNext(next() + 1)} class="CM mt-500 bg-white text-black w-185 h-100">
        button
      </button>
      <button onclick={() => setNext(0)} class="CM mt-500 ml-200 bg-white text-black w-185 h-100">
        Reset
      </button>
    </>
  );
}
