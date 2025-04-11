import { createSignal, createEffect, onMount, onCleanup, For } from "solid-js";
import { isServer } from "solid-js/web";

export default function EmbeddedGlowTitle(props) {

    function getCSSVariableValue(variableName: string) {
        if (isServer) return "";
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }
    // Ottieni il valore di --Secondary
let secondaryColor = getCSSVariableValue('--Secondary');
if (secondaryColor.startsWith('rgb(') && !secondaryColor.includes('rgba')) {
    secondaryColor = secondaryColor.replace('rgb(', 'rgba(').replace(')', ', 0.8)');
}
  const { title = "Text", baseColor = secondaryColor, glowColor = secondaryColor } = props;
  
  const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = createSignal(false);
  const [hoveredIndex, setHoveredIndex] = createSignal(-1);
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [relativePosition, setRelativePosition] = createSignal({ x: 0.5, y: 0.5 });
  const [activeLetters, setActiveLetters] = createSignal([]);
  const [barWidth, setBarWidth] = createSignal(0);
  const [hasActivatedBar, setHasActivatedBar] = createSignal(false);
  const [initialAnimationPhase, setInitialAnimationPhase] = createSignal(0);
  
  let titleRef;
  let letterRefs = [];
  let letterTimeouts = {};
  let globalTimeout = null;
  let barAnimationTimeout = null;
  let initialAnimationTimer = null;
  
  // Track mouse position
  const handleMouseMove = (e) => {
    if (isHovered()) {
      setMousePosition({ x: e.clientX, y: e.clientY });
      checkHoveredLetter(e.clientX, e.clientY);
    }
  };
  
  // Check which letter is under the cursor and calculate relative position
  const checkHoveredLetter = (mouseX, mouseY) => {
    for (let i = 0; i < letterRefs.length; i++) {
      if (!letterRefs[i]) continue;
      
      const rect = letterRefs[i].getBoundingClientRect();
      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      ) {
        // Calculate relative position inside the letter (0-1)
        const relX = (mouseX - rect.left) / rect.width;
        const relY = (mouseY - rect.top) / rect.height;
        
        setRelativePosition({ x: relX, y: relY });
        setHoveredIndex(i);
        
        // If it's the first activated letter, activate bar animation
        if (activeLetters().length === 0 && !hasActivatedBar()) {
          runFullBarAnimation();
          setHasActivatedBar(true);
        }
        
        // Add this letter to active letters if not already there
        if (!activeLetters().includes(i)) {
          setActiveLetters([...activeLetters(), i]);
          
          // Set a timeout to remove this letter after 5 seconds
          if (letterTimeouts[i]) {
            clearTimeout(letterTimeouts[i]);
          }
          
          letterTimeouts[i] = setTimeout(() => {
            // Remove this letter from active ones
            setActiveLetters(prev => prev.filter(idx => idx !== i));
            
            // If it was the last active letter, reset bar animation
            if (activeLetters().length === 1 && activeLetters()[0] === i) {
              runFullBarAnimation();
              setHasActivatedBar(false);
            }
          }, 5000);
        }
        
        return;
      }
    }
    
    // No letter found under cursor
    setHoveredIndex(-1);
  };
  
  // Run full bar animation
  const runFullBarAnimation = () => {
    // Cancel any ongoing bar animation
    if (barAnimationTimeout) {
      clearTimeout(barAnimationTimeout);
    }
    
    // Reset bar to zero width
    setBarWidth(0);
    
    // Force a DOM reflow to ensure zero width is applied
    if (titleRef) {
      void titleRef.offsetWidth;
    }
    
    // After a short delay, set width to 100% to start animation
    barAnimationTimeout = setTimeout(() => {
      setBarWidth(100);
    }, 50);
  };
  
  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(-1);
    
    // When mouse leaves title, start a global timeout
    if (activeLetters().length > 0 && !globalTimeout) {
      globalTimeout = setTimeout(() => {
        // After 5 seconds, cancel all individual letter timeouts
        Object.keys(letterTimeouts).forEach(key => {
          if (letterTimeouts[key]) {
            clearTimeout(letterTimeouts[key]);
            delete letterTimeouts[key];
          }
        });
        
        // Remove all active letters
        setActiveLetters([]);
        
        // Reactivate bar animation
        runFullBarAnimation();
        setHasActivatedBar(false);
        
        // Reset global timeout
        globalTimeout = null;
      }, 2000);
    }
  };
  
  // Initial polymorphization animation of letters
  const runInitialAnimation = () => {
    // Phase 1: Letters appear one by one
    setInitialAnimationPhase(1);
    
    // Activate each letter in sequence
    const titleLength = title.length;
    let activeIndices = [];
    
    for (let i = 0; i < titleLength; i++) {
      setTimeout(() => {
        activeIndices.push(i);
        setActiveLetters([...activeIndices]);
        
        // When all letters are active, move to phase 2
        if (i === titleLength - 1) {
          setTimeout(() => {
            // Phase 2: Wave effect crossing the title
            setInitialAnimationPhase(2);
            runWaveAnimation();
          }, 800);
        }
      }, i * 100); // Each letter appears after 100ms
    }
  };
  
  // Wave effect crossing the title
  const runWaveAnimation = () => {
    const titleLength = title.length;
    
    // First remove all active letters
    setTimeout(() => {
      setActiveLetters([]);
    }, 400);
    
    // Then create a wave of activation and deactivation
    setTimeout(() => {
      for (let i = 0; i < titleLength; i++) {
        // Activate each letter in sequence creating a wave
        setTimeout(() => {
          setActiveLetters([i]);
          
          // Deactivate the letter after a short period
          setTimeout(() => {
            setActiveLetters(prev => prev.filter(idx => idx !== i));
            
            // When the wave is complete, move to final phase
            if (i === titleLength - 1) {
              setTimeout(() => {
                setInitialAnimationPhase(3);
                
                // After a moment, return to normal state
                setTimeout(() => {
                  setActiveLetters([]);
                  setHasActivatedBar(false);
                  setInitialAnimationPhase(0); // Animation complete
                }, 1500);
              }, 300);
            }
          }, 300);
        }, i * 150);
      }
    }, 600);
  };
  
  onMount(() => {
    if (!isServer) {
      window.addEventListener('mousemove', handleMouseMove);
      
      setTimeout(() => {
        setIsLoaded(true);
        
        // Start initial animation sequence after component is loaded
        setTimeout(() => {
          // Activate the bar
          runFullBarAnimation();
          
          // Then start letter animations
          setTimeout(() => {
            runInitialAnimation();
          }, 500);
        }, 400);
      }, 100);
    }
  });
  
  onCleanup(() => {
    if (!isServer) {
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Clean up all timeouts
      Object.keys(letterTimeouts).forEach(key => {
        if (letterTimeouts[key]) {
          clearTimeout(letterTimeouts[key]);
        }
      });
      
      if (globalTimeout) {
        clearTimeout(globalTimeout);
      }
      
      if (barAnimationTimeout) {
        clearTimeout(barAnimationTimeout);
      }
      
      if (initialAnimationTimer) {
        clearTimeout(initialAnimationTimer);
      }
    }
  });
  
  // Normal letter style without effect
  const getNormalStyle = (index) => {
    // During phase 1 of initial animation, make letters invisible until activated
    if (initialAnimationPhase() === 1 && !activeLetters().includes(index)) {
      return {
        "text-shadow": "none",
        color: "transparent",
        opacity: "0",
        transform: "translateY(10px)"
      };
    }
    
    return {
      color: `rgb(34, 34, 34)`,
      "background-clip": "text",
      "-webkit-background-clip": "text",
      opacity: "1",
      transform: "translateY(0)"
    };
  };
  
  // Letter style with directional glow effect
  const getGlowStyle = (index) => {
    const pos = relativePosition();
    
    // Calculate glow intensity based on relative mouse position
    // Closer to edge = more intense
    const intensityTop = Math.max(0, 1 - pos.y * 2); // More intense at top
    const intensityBottom = Math.max(0, pos.y * 2 - 1); // More intense at bottom
    const intensityLeft = Math.max(0, 1 - pos.x * 2); // More intense at left
    const intensityRight = Math.max(0, pos.x * 2 - 1); // More intense at right
    
    // Calculate variations for each side
    const topShadow = intensityTop > 0.2 ? `0 -${Math.round(intensityTop * 5)}px ${Math.round(intensityTop * 10)}px ${glowColor}` : "none";
    const bottomShadow = intensityBottom > 0.2 ? `0 ${Math.round(intensityBottom * 5)}px ${Math.round(intensityBottom * 10)}px ${glowColor}` : "none";
    const leftShadow = intensityLeft > 0.2 ? `-${Math.round(intensityLeft * 5)}px 0 ${Math.round(intensityLeft * 10)}px ${glowColor}` : "none";
    const rightShadow = intensityRight > 0.2 ? `${Math.round(intensityRight * 5)}px 0 ${Math.round(intensityRight * 10)}px ${glowColor}` : "none";
    
    // Combine edge shadow effect
    const edgeShadow = [topShadow, bottomShadow, leftShadow, rightShadow]
      .filter(shadow => shadow !== "none")
      .join(", ");
    
    // More intense effect during initial animation
    const initialAnimationIntensity = initialAnimationPhase() > 0 ? "1px" : "0.5px";
    
    // Main color and base style
    return {
      // Text remains base color, but now has a luminous border
      color: baseColor,
      "text-shadow": initialAnimationPhase() === 2 
        ? `0 0 15px ${glowColor}, 0 0 20px ${baseColor}66, 0 0 30px ${baseColor}33` 
        : (edgeShadow || `0 0 5px ${glowColor}66`),
      "-webkit-text-stroke": `${initialAnimationIntensity} ${glowColor}`,
      position: "relative",
      "z-index": "1",
      opacity: "1",
      transform: initialAnimationPhase() === 1 ? "translateY(0) scale(1.05)" : "translateY(0) scale(1)",
      transition: initialAnimationPhase() > 0 ? "all 0.3s ease" : "all 0.15s ease"
    };
  };
  
  return (
    <div 
    class={`CM -mt-32 ${props.class}`}
      style={{
        display: "flex",
        overflow: "hidden",
        
      }}
    >
      <div
        style={{
          position: "relative",
          transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease",
          transform: isLoaded() ? "translateY(0)" : "translateY(20px)",
          opacity: isLoaded() ? 1 : 0
        }}
      >
        <h1
          ref={titleRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            "font-size": "1.5vw", 
            padding: "0 10px",
            position: "relative",
            "letter-spacing": "1px",
            "font-family": "inherit", // Use default font
            "font-weight": "bold",
          }}
        >
          <For each={Array.from(title)}>
            {(letter, index) => (
              <span
            ref={el => letterRefs[index()] = el}
            style={{
              display: "inline-block",
              "font-family": "inherit", // Use default font
              position: "relative",
              transition: initialAnimationPhase() > 0 ? "all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)" : "all 0.15s ease",
              ...(activeLetters().includes(index()) ? getGlowStyle(index()) : getNormalStyle(index()))
            }}
              >
            {letter}
              </span>
            )}
          </For>
          
          {/* Animated thin line */}
          <div 
            style={{
              position: "absolute",
              left: "0",
              bottom: "-8px",
              height: "2px",
              width: `${barWidth()}%`,
              "background-color": baseColor,
              "box-shadow": initialAnimationPhase() === 3
                ? `0 0 15px ${baseColor}, 0 0 20px ${baseColor}` 
                : `0 0 10px ${baseColor}`,
              transition: "width 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67), box-shadow 0.5s ease",
              opacity: initialAnimationPhase() === 3 ? "1" : "0.7"
            }}
          />
        </h1>
      </div>
    </div>
  );
}