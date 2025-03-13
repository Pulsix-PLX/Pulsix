import { createSignal, Show, onMount } from 'solid-js'
import { gsap } from 'gsap'
import './Eye.css'

import { hidePassword,setHidePassword } from '../../Inputs'

export default function Eye() {
  const [clearing, setClearing] = createSignal(false)
  const [eyeClosed, setEyeClosed] = createSignal(false)
  let blinkTl: gsap.core.Timeline | null = null
  let eye: HTMLElement | null = null
  
  const BLINK = () => {
    if (eyeClosed()) return
    const delay = gsap.utils.random(2, 8)
    const duration = 0.075
    const repeat = Math.random() > 0.5 ? 3 : 1
    if (blinkTl) blinkTl.kill()
    blinkTl = gsap.timeline({
      delay,
      onComplete: () => BLINK(),
      repeat,
      yoyo: true,
    })
      .to('.lid--upper', {
        duration,
        attr: { d: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12" }
      })
  }

  const toggleEye = () => {
    setEyeClosed(!eyeClosed())
    if (blinkTl) blinkTl.kill()
    
    const timeline = gsap.timeline()
    
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
        }, 0.1)
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
        .call(() => BLINK(), [], 0.3)
    }
  }

  onMount(() => {
    BLINK()
    
    const posMapper = gsap.utils.mapRange(-100, 100, 30, -30)
    let reset: gsap.core.Tween | null = null
    
    const MOVE_EYE = (e: MouseEvent) => {
      if (!eye || eyeClosed()) return
      if (reset) reset.kill()
      
      reset = gsap.delayedCall(2, () => {
        gsap.to(eye, { xPercent: 0, yPercent: 0, duration: 0.2 })
      }) as unknown as gsap.core.Tween
      
      const BOUNDS = eye.getBoundingClientRect()
      gsap.set(eye, {
        xPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.x - e.clientX)),
        yPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.y - e.clientY))
      })
    }

    window.addEventListener('mousemove', MOVE_EYE)
    return () => {
      window.removeEventListener('mousemove', MOVE_EYE)
      if (blinkTl) blinkTl.kill()
    }
  })

  return (
<>


        <div class="input-wrapper">
          <div class="form-group__actions">
            <button 
              type="button" 
              title="Toggle Eye" 
              aria-pressed={eyeClosed()} 
              onClick={()=>setHidePassword(!hidePassword())}
              class="eye-button"
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
            </button>
          </div>
        </div>

</>
  )
}

