import { createSignal, onCleanup, onMount } from 'solid-js';
import { Motion } from 'solid-motionone';

// Helper function to replace React's cn utility
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

export const LampContainer: any = (props:any) => {
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
    <div
      class={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        props.class,
      )}
    >
      <div class="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <Motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={inView() ? { opacity: 1, width: "30rem" } : { opacity: 0.5, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8
          }}
          style={{
            "background-image": `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          class="motion-element absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div class="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div class="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={inView() ? { opacity: 1, width: "30rem" } : { opacity: 0.5, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,

          }}
          style={{
            "background-image": `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          class="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div class="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div class="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </Motion.div>
        <div class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div class="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <Motion.div
          initial={{ width: "8rem" }}
          animate={inView() ? { width: "64px" } : { width: "8rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,

          }}
          class="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></Motion.div>
        <Motion.div
          initial={{ width: "15rem" }}
          animate={inView() ? { width: "30rem" } : { width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,

          }}
          class="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        ></Motion.div>

        <div class="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
      </div>

      <div class="relative z-50 flex -translate-y-80 flex-col items-center px-5">{props.children}</div>
    </div>
  )
}

