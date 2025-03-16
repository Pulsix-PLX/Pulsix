import { createSignal, onCleanup, onMount } from 'solid-js';
import { Motion } from 'solid-motionone';

// Helper function to combine CSS class names, filtering out falsy values
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// LampContainer: A component that creates a modern lamp effect with animated gradients
// Props:
// - children: Content to be displayed in the lamp's focal area
// - class: Additional CSS classes for styling
export const LampContainer: any = (props: any) => {
  // State to track if the lamp is in view for triggering animations
  const [inView, setInView] = createSignal(false);

  // Intersection Observer instance
  let observer: IntersectionObserver;

  // Setup intersection observer when component mounts
  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      {
        threshold: 0.5, // Adjust threshold as needed - controls when animation triggers
      }
    );

    // Start observing the lamp element
    observer.observe(document.querySelector('.motion-element')!);

    // Cleanup observer when component unmounts
    onCleanup(() => {
      observer.unobserve(document.querySelector('.motion-element')!);
      observer.disconnect();
    });
  });

  return (
    // Main container with dark background and centering
    <div
      class={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden  bg-transparent rounded-md z-0',
        props.class
      )}
    >
      {/* Lamp effect container with scaling */}
      <div class="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left gradient cone - animates width and opacity based on visibility */}
        <Motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          animate={inView() ? { opacity: 1, width: '30rem' } : { opacity: 0.5, width: '15rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          style={{
            'background-image': `conic-gradient(var(--conic-position) , var(--tw-gradient-stops))`,
          }}
          class="motion-element absolute inset-auto right-1/2 h-356 mt-300 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
        
        </Motion.div>
        {/* Right gradient cone - mirrors the left cone */}
        <Motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          animate={inView() ? { opacity: 1, width: '30rem' } : { opacity: 1, width: '15rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          style={{
            'background-image': `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          class="absolute inset-auto left-1/2 h-356 mt-300  w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          {/* Gradient masks for the right cone */}
         
        </Motion.div>

        {/* Background effects and glow */}
        {/* Dark background blur effect */}

        {/* Subtle blur overlay */}
        <div class="absolute top-1/2 z-50 h-98 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        {/* Main glow effect */}
        <div class="absolute  inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>

        {/* Animated lamp core */}
        <Motion.div
          initial={{ width: '8rem' }}
          animate={inView() ? { width: '64px' } : { width: '8rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          class="absolute inset-auto z-30 h-1 w-64 translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></Motion.div>

        {/* linea */}
        <Motion.div
          initial={{ width: '15rem' }}
          animate={inView() ? { width: '30rem' } : { width: '15rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          class="absolute  inset-auto z-50 h-0.5 w-[30rem] -mt-57 bg-cyan-400"
        ></Motion.div>


      </div>

      {/* Content container */}
      <div class="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {props.children}
      </div>
    </div>
  );
};
