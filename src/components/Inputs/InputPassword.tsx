import { createSignal, Show, onMount } from 'solid-js'
import { gsap } from 'gsap'
import './Input.css'

interface InputProps {
  name: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  placeholder?: string;
  required?: boolean;
  label?: string;
  class?: string;
  style?: string;
  onInput?: (e: any) => void;
  onChange?: (e: any) => void;
  initialValue?: string;
}

export default function InputPassword(props: InputProps) {
  // Stati locali per questa istanza del componente
  const [value, setValue] = createSignal(props.initialValue || '');
  const [hidePassword, setHidePassword] = createSignal(true);
  const [clearing, setClearing] = createSignal(false);
  const [eyeClosed, setEyeClosed] = createSignal(false);
  
  let blinkTl: gsap.core.Timeline | null = null;
  let eye: HTMLElement | null = null;
  
  const BLINK = () => {
    if (eyeClosed()) return;
    const delay = gsap.utils.random(2, 8);
    const duration = 0.075;
    const repeat = Math.random() > 0.5 ? 3 : 1;
    if (blinkTl) blinkTl.kill();
    blinkTl = gsap.timeline({
      delay,
      onComplete: () => BLINK(),
      repeat,
      yoyo: true,
    })
      .to('.lid--upper', {
        duration,
        attr: { d: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12" }
      });
  }

  const toggleEye = () => {
    setEyeClosed(!eyeClosed());
    setHidePassword(!hidePassword());
    if (blinkTl) blinkTl.kill();
    
    const timeline = gsap.timeline();
    
    if (eyeClosed()) {
      timeline
        .to('.lid--upper', {
          duration: 0.2,
          attr: { d: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12" },
          ease: "power2.inOut"
        })
        .to('.eye-circle', {
          duration: 0.1,
          scale: 0,
          opacity: 0,
          ease: "power2.in"
        }, 0)
        .to('.eye-glint', {
          duration: 0.1,
          scale: 0,
          opacity: 0,
          ease: "power2.in"
        }, 0)
        .to('.eyelashes', {
          duration: 0.1,
          opacity: 1,
          ease: "power2.out"
        }, 0.1);
    } else {
      timeline
        .to('.lid--upper', {
          duration: 0.2,
          attr: { d: "M1 12C1 12 5 4 12 4C19 4 23 12 23 12" },
          ease: "power2.out"
        })
        .to('.eye-circle', {
          duration: 0.2,
          scale: 1,
          opacity: 1,
          ease: "power2.out"
        }, 0.1)
        .to('.eye-glint', {
          duration: 0.2,
          scale: 1,
          opacity: 1,
          ease: "power2.out"
        }, 0.1)
        .to('.eyelashes', {
          duration: 0.1,
          opacity: 0,
          ease: "power2.in"
        }, 0)
        .call(() => BLINK(), [], 0.3);
    }
  }

  const clearInput = () => {
    setClearing(true);
    setTimeout(() => {
      setValue('');
      setClearing(false);
      
      // Notifica il componente genitore del cambiamento
      const event = new Event('input', { bubbles: true });
      const inputElement = document.querySelector(`input[name="${props.name}"]`);
      if (inputElement) {
        inputElement.dispatchEvent(event);
      }
    }, 1000);
  }

  // Gestore input per aggiornare lo stato locale e notificare il genitore
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    
    // Passa l'evento al genitore se è stata fornita una funzione onInput
    if (props.onInput) {
      props.onInput(e);
    }
  };

  onMount(() => {
    BLINK();
    
    const posMapper = gsap.utils.mapRange(-100, 100, 30, -30);
    let reset: gsap.core.Tween | null = null;
    
    const MOVE_EYE = (e: MouseEvent) => {
      if (!eye || eyeClosed()) return;
      if (reset) reset.kill();
      
      reset = gsap.delayedCall(2, () => {
        gsap.to(eye, { xPercent: 0, yPercent: 0, duration: 0.2 });
      }) as unknown as gsap.core.Tween;
      
      const BOUNDS = eye.getBoundingClientRect();
      gsap.set(eye, {
        xPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.x - e.clientX)),
        yPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.y - e.clientY))
      });
    }

    window.addEventListener('mousemove', MOVE_EYE);
    return () => {
      window.removeEventListener('mousemove', MOVE_EYE);
      if (blinkTl) blinkTl.kill();
    }
  });

  return (
    <>
      <div class="input-wrapper">
        <input
          name={props.name}
          type={hidePassword() ? 'password' : 'text'}
          class={`fancy-input ${props.class} ${clearing() ? 'text-clear' : ''}`}
          placeholder=''
          onInput={handleInput}
          onChange={handleInput}
          value={value()}
        />
        <label class={`input-label ${clearing() ? 'text-clear' : ''}`}>
          {props.placeholder}
        </label>
        <div class="input-underline">
          <div class={`clear-wave ${clearing() ? 'active' : ''}`}></div>
        </div>
        <div class="form-group__actions">
          <button 
            type="button" 
            title="Toggle Eye" 
            aria-pressed={eyeClosed()} 
            onClick={toggleEye}
            class="eye-button w-[50%] "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class={eyeClosed() ? 'eye-closed' : ''}
            >
              <path
                class="lid lid--upper"
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                class="lid lid--lower"
                d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              {/* Bottom eyelashes */}
              <path 
                class="eyelashes"
                d="M7 18L5 20 M12 21L12 23 M17 18L19 20"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <g class="eye" ref={eye}>
                <circle class="eye-circle" cy="12" cx="12" r="4" fill="currentColor" />
                <circle class="eye-glint" cy="11" cx="13" r="1" fill="var(--glint)" />
              </g>
            </svg>
            <span class="sr-only">Toggle Eye</span>
          </button>
          <Show when={value().length > 0}>
            <button 
              class="visible absolute text-white ml-20 text-m -mt-2"
              onClick={clearInput}
              disabled={clearing()}
            >
              x
            </button>
          </Show>
        </div>
      </div>
    </>
  )
}
