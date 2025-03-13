import { createSignal, onCleanup, onMount } from "solid-js";
import "./PasswordInput.css";
import gsap from 'gsap';
interface LoginFormProps {
  name: string;
  onSubmit?: (values: { email: string; password: string }) => void;
}

export default function Input(props: LoginFormProps) {
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [formStatus, setFormStatus] = createSignal<
    "idle" | "success" | "error"
  >("idle");
  const [passwordValue, setPasswordValue] = createSignal("");
  const [passwordDots, setPasswordDots] = createSignal<number[]>([]);
  const [isPasswordVisible, setIsPasswordVisible] = createSignal(false);

  let passwordInputRef: HTMLInputElement | undefined;
  let passwordContainerRef: HTMLDivElement | undefined;
  let submitButtonRef: HTMLButtonElement | undefined;
  let passwordListRef: HTMLDivElement | undefined;
  let eyeRef: SVGGElement | undefined;
  let blinkTl: gsap.core.Timeline | undefined;
  let pressed = false;

  const handlePasswordInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const currentValue = target.value;
    setPasswordValue(currentValue);

    // Update dots
    if (currentValue.length > passwordDots().length) {
      setPasswordDots([...passwordDots(), passwordDots().length]);
    }

    // Enable/disable submit button
    if (submitButtonRef) {
      submitButtonRef.disabled = !currentValue.length;
    }

    // Update cursor position
    if (passwordContainerRef) {
      passwordContainerRef.style.setProperty(
        "--cursor-x",
        `${currentValue.length * 10}px`
      );
    }
  };


  const handlePasswordKeyDown = (e: KeyboardEvent) => {
    // Prevent rapid key presses or when processing
    if (
      pressed ||
      isProcessing() ||
      (passwordValue().length > 14 && e.keyCode !== 8 && e.keyCode !== 13)
    ) {
      e.preventDefault();
      return;
    }

    pressed = true;
    setTimeout(() => (pressed = false), 50);

    // Handle backspace
    if (e.keyCode === 8 && passwordListRef) {
      const dots = passwordDots();
      if (dots.length > 0) {
        const lastDot = passwordListRef.querySelector("i:last-child");
        if (lastDot) {
          lastDot.classList.add("remove");
          setTimeout(() => {
            setPasswordDots(dots.slice(0, -1));
          }, 50);
        }
      }
    }
  };

  const preventSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    target.selectionStart = target.selectionEnd;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible());
  };


  const startBlinking = () => {
    if (typeof window === "undefined") return;

    const blinkspeeed = 0.075;
    const delay = Math.random() * 5 + 2;
    const repeat = Math.random() > 0.5 ? 3 : 1;

    blinkTl = gsap.timeline({
      delay,
      onComplete: () => startBlinking(),
      repeat,
      yoyo: true,
    });

    blinkTl.to(".lid--upper", {
      morphSVG: ".lid--lower",
      duration: blinkspeeed,
    });

    blinkTl.to(
      "#eye-open .eye circle:first-child",
      {
        scale: 0.1,
        opacity: 0,
        duration: blinkspeeed,
      },
      0
    );
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!isProcessing()) {
      setIsProcessing(true);


// Modifica la parte che gestisce l'errore nella funzione handleSubmit

// IF WRONG PASSWORD
setTimeout(() => {
  // Demo validation (in real application, rely on server response)
  const isCorrect = passwordValue() === "password";
  const status = isCorrect ? "success" : "error";

  setFormStatus(status);

if (status === "error") {
  const passwordWasVisible = isPasswordVisible();
  
  // Se la password è visibile, nascondiamola temporaneamente durante l'animazione
  if (passwordWasVisible) {
    // Nascondi il testo e mostra i puntini per l'animazione
    setIsPasswordVisible(false);
    
    // Crea i puntini corrispondenti alla lunghezza della password
    const tempDots = [];
    for (let i = 0; i < passwordValue().length; i++) {
      tempDots.push(i);
    }
    setPasswordDots(tempDots);
  }

  // Anima i puntini
  setTimeout(() => {
    const dots = document.querySelectorAll(".dots i, .dots .password-char");
    dots.forEach((dot, index) => {
      gsap.to(dot, {
        y: -20,
        opacity: 0,
        delay: index * 0.05,
        duration: 0.4,
        ease: "back.in",
        onComplete: () => {
          if (index === dots.length - 1) {
            // Clear password when animation completes
            setPasswordValue("");
            setPasswordDots([]);
            // Ripristina lo stato di visibilità se necessario
            if (passwordWasVisible) {
              setIsPasswordVisible(true);
            }
          }
        },
      });
    });
  }, 0);
}
  setTimeout(() => {
    setIsProcessing(false);
    setFormStatus("idle");

    if (status === "error") {
      if (submitButtonRef) submitButtonRef.disabled = true;
    }
  }, 2000);

  if (status === "error" && passwordContainerRef) {
    setTimeout(() => {
      passwordContainerRef.style.setProperty("--cursor-x", "0px");
    }, 600);
  }
}, 1500);
    }
  };

  onMount(() => {
    // Ensure the cursor starts at position 0
    if (passwordContainerRef) {
      passwordContainerRef.style.setProperty("--cursor-x", "0px");
    }

    // Initialize GSAP plugins explicitly
    if (typeof window !== "undefined" && (window as any).MorphSVGPlugin) {
      gsap.registerPlugin((window as any).MorphSVGPlugin);
    }
    startBlinking();
  });

  return (
    <>
      <form
        id="login-form"
        class={`${isProcessing() ? "processing" : ""} ${formStatus()}`}
        onSubmit={handleSubmit}
      >
       
      

        <div class="input password" ref={passwordContainerRef}>
          <div class="dots" ref={passwordListRef}>
            {isPasswordVisible() ? (
              <div class="password-text">{passwordValue()}</div>
            ) : (
              passwordDots().map(() => <i />)
            )}
          </div>

          <input
            type={isPasswordVisible() ? "text" : "password"}
            placeholder=" "
            ref={passwordInputRef}
            value={passwordValue()}
            name={`${props.name}-password`}
            onInput={handlePasswordInput}
            onKeyDown={handlePasswordKeyDown}
            onSelect={preventSelect}
          />

          <label>Password</label>
          <div class="cursor"></div>

          <div class="line">
            <svg>
              <use href="#line" />
            </svg>
          </div>

          <div class="tick">
            <svg>
              <use href="#tick" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          ref={submitButtonRef}
          disabled={!passwordValue().length}
        >
          <svg viewBox="0 0 16 16">
            <circle stroke-opacity=".1" cx="8" cy="8" r="6"></circle>
            <circle class="load" cx="8" cy="8" r="6"></circle>
          </svg>
          <span>Submit</span>
        </button>
</form>

      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol viewBox="0 0 44 44" id="logo">
          <path d="M33.0457936,22 L44,22 C44,34.1502645 34.1912695,44 22.0915872,44 C16.0417461,44 10.5646429,41.5375661 6.6,37.5563492 L14.3462931,29.7786761 C16.3285751,31.7689899 19.0669207,33 22.0915872,33 C25.1013453,33 27.827598,31.7810952 29.8075146,29.8080513 L22,22 L33.0457936,22.001001 C33.0457936,22.0006673 33.0457936,22.0003337 33.0457936,22 Z M21.9084128,0 C27.958756,0 33.4362661,2.4628426 37.400987,6.44464202 L29.6552,14.2228233 C27.6728001,12.2316284 24.9338388,11 21.9084128,11 C15.8585716,11 10.9542064,15.9248678 10.9542064,22 L10.954,22 L0,22 C0,9.8497355 9.8087305,0 21.9084128,0 Z"></path>
        </symbol>
        <symbol viewBox="0 0 900 22" id="line">
          <path d="M0,11 L180,11 C240,11.00344 300,13.6718267 360,19.00516 C450,27.00516 450,-4.99483997 540,3.00516003 C600,8.33849336 660,11.00344 720,11 L900,11"></path>
        </symbol>
        <symbol viewBox="0 0 32 28" id="tick">
          <path d="M3,12.5026479 L7,16.5026479 L13,9.50264792 C29.6216402,-12.0066881 40.3541164,26.00516 19,26.0026479 L-3.37507799e-13,26.0026479"></path>
        </symbol>
      </svg>
    </>
  );
}
