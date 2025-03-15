import { createEffect, createMemo, createSignal } from 'solid-js';
import './animations.css';
import { ProgressIcons } from './icons';
import style from './index.module.scss';

export default function ProgressBar() {
  const [next, setNext] = createSignal<number>(0);
  const [hoveredStep, setHoveredStep] = createSignal<number | null>(null);
  const steps: number = 3;
  const stepsArray = Array.from({ length: steps }, (_, i) => i + 1);

  createMemo(() => {
    if (typeof document !== 'undefined') {
      // Progress bar animation
      document.documentElement.style.setProperty('--width-upline', `${(next() / steps) * 100}%`);
    }
  });

  // Add subtle animation when step changes
  createEffect((prev) => {
    const current = next();
    if (prev !== undefined && prev !== current && typeof document !== 'undefined') {
      // Add a flash effect when progress changes
      const line = document.querySelector(`.${style.Line}`);
      if (line) {
        line.classList.add('flash');
        setTimeout(() => line.classList.remove('flash'), 700);
      }

      // Animate connectors when step changes
      if (current > 0) {
        for (let i = 0; i < current; i++) {
          const connector = document.querySelectorAll(`.${style.Connector}`)[i];
          if (connector) {
            connector.classList.add('connector-appear');
          }
        }
      }
    }
    return current;
  });

  const handleStepClick = (stepNum: number) => {
    if (stepNum <= next() + 1) {
      // Add ripple effect on click
      const step = document.querySelectorAll(`.${style.Step}`)[stepNum - 1];
      if (step) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        step.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
      }
      setNext(stepNum);
    }
  };

  const handleStepHover = (stepNum: number | null) => {
    setHoveredStep(stepNum);
  };
  return (
    <>
      <div class={`CM mt-200 ${style.ProgressBar}`}>
        <div class={`CM gap-100 ${style.Steps}`}>
          <div
            class={`${style.Step}`}
            classList={{ [style.StepDone]: next() >= 1 }}
            onMouseEnter={() => handleStepHover(1)}
            onMouseLeave={() => handleStepHover(null)}
          >
            {ProgressIcons[0].svg}
            {/* Shadow effect for active step */}
            {next() >= 1 && (
              <div
                class="glow"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  'border-radius': '50%',
                  'z-index': '-1',
                }}
              ></div>
            )}
            {/* Connector */}
            <div
              class={`${style.Connector}`}
              classList={{ [style.ConnectorActive]: next() >= 1 }}
            />
          </div>
          <div
            class={`${style.Step}`}
            classList={{ [style.StepDone]: next() >= 2 }}
            onMouseEnter={() => handleStepHover(2)}
            onMouseLeave={() => handleStepHover(null)}
          >
            {ProgressIcons[1].svg}
            {/* Shadow effect for active step */}
            {next() >= 2 && (
              <div
                class="glow"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  'border-radius': '50%',
                  'z-index': '-1',
                }}
              ></div>
            )}
            {/* Connector */}
            <div
              class={`${style.Connector}`}
              classList={{ [style.ConnectorActive]: next() >= 2 }}
            />
          </div>
          <div
            class={`${style.Step}`}
            classList={{ [style.StepDone]: next() >= 3 }}
            onMouseEnter={() => handleStepHover(3)}
            onMouseLeave={() => handleStepHover(null)}
          >
            {ProgressIcons[2].svg}
            {/* Particles for active step */}
            {next() >= 3 && (
              <div
                class="glow"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  'border-radius': '50%',
                  'z-index': '-1',
                }}
              ></div>
            )}
            {/* Connector */}
            <div
              class={`${style.Connector}`}
              classList={{ [style.ConnectorActive]: next() >= 3 }}
            />
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
