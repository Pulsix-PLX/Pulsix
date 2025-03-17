import { createSignal, Show, onMount } from 'solid-js'
import { gsap } from 'gsap'
import './Input.css'
export const [hidePassword, setHidePassword] = createSignal(true);
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
/// Validation ///
  // Stato locale per questo componente
  const [value, setValue] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [touched, setTouched] = createSignal<boolean>(false);

  onMount(() => {
    // Se il campo è richiesto, inizializzalo come non valido (false)
    // Se non è richiesto, inizializzalo come valido (true)
    if (props.required) {
      SetForm(props.name, false);
    } else {
      SetForm(props.name, true);
    }
  });

  // Schema Validation
  function validateInput(e: Event) {
    // Imposta touched a true quando l'utente interagisce con l'input
    setTouched(true);

    const target = e.target as HTMLInputElement;
    const inputValue = target.value;

    // Aggiorna il valore locale
    setValue(inputValue);

    console.log(props.name, value());

    // Se il campo non è richiesto e vuoto, impostalo su true
    if (!props.required && inputValue === '') {
      SetForm(props.name, true);
      return; // Esci dalla funzione per evitare ulteriori validazioni
    }

    // Se è presente uno schema di validazione personalizzato, usalo
    if (props.ValidationSchema) {
      const response = props.ValidationSchema(inputValue);
      SetForm(props.name, response);
      return;
    }

    // Altrimenti usa la validazione predefinita
    defaultValidationSchema(inputValue);
  }

  function defaultValidationSchema(inputValue: string) {
    if (!inputValue && props.required) {
      SetForm(props.name, false);
      setErrorMessage('Provide something');
      return;
    }

    console.log(Form);

    // Default Validation Schema
    switch (props.type) {
      case 'text':
        if (!inputValue) {
          SetForm(props.name, false);
          setErrorMessage('Provide something');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;

      case 'password':
        // At least 8 characters
        if (inputValue.length < 8) {
          SetForm(props.name, false);
          setErrorMessage('At least 8 characters');
          return;
        }
        // At least one uppercase letter
        if (!/[A-Z]/.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('At least one uppercase letter');
          return;
        }
        // At least one number
        if (!/[0-9]/.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('At least one number');
          return;
        }
        SetForm(props.name, true);
        setErrorMessage('');
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci un indirizzo email valido');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;

      case 'number':
        const isNumber = !isNaN(Number(inputValue));
        if (!isNumber) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci un numero valido');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;

      case 'date':
        const dateValid = !isNaN(Date.parse(inputValue));
        if (!dateValid) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci una data valida');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;
    }
  }
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
              class="visible absolute text-white ml-50 text-m mt-15"
              style={{width:'20px', height:'20px'}}
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
