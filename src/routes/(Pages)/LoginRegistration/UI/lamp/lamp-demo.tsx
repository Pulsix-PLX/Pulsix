import { createSignal, onCleanup, onMount } from 'solid-js';
import { Motion } from 'solid-motionone';
import { LampContainer } from './lamp';
export default function LampDemo() {
  const [inView, setInView] = createSignal(false);

  let observer: IntersectionObserver;

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setInView(true);
      } else {
        setInView(false);
      }
    }, {
      threshold: 0.5, // Aggiusta il threshold come necessario
    });

    observer.observe(document.querySelector('.motion-element')!);

    onCleanup(() => {
      observer.unobserve(document.querySelector('.motion-element')!);
      observer.disconnect();
    });
  });

  return (
    <LampContainer>
      <Motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        animate={inView() ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8

        }}
        class="motion-element mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </Motion.h1>
    </LampContainer>
  );
}
