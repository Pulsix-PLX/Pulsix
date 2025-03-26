// src/components/AnimatedText.tsx
import { createSignal, onMount, Show, For } from "solid-js";
import "./AnimatedText.scss";

type AnimationType = "fade" | "slide" | "bounce" | "typewriter" | "gradient";

interface AnimatedTextProps {
  texts?: string[];
  initialAnimation?: AnimationType;
  changeInterval?: number;
}

export default function AnimatedText(props: AnimatedTextProps) {
  // Configurazione con valori di default
  const texts = () => props.texts || ["Hello", "Hola", "Ciao", "Bonjour", "Hallo"];
  const changeInterval = () => props.changeInterval || 3000;
  const initialAnimation = () => props.initialAnimation || "slide";

  // Stato del componente
  const [currentText, setCurrentText] = createSignal(texts()[0]);
  const [animationType, setAnimationType] = createSignal<AnimationType>(initialAnimation());
  const [isVisible, setIsVisible] = createSignal(true);
  const [colorIndex, setColorIndex] = createSignal(0);
  const [typedText, setTypedText] = createSignal("");
  const [isTyping, setIsTyping] = createSignal(false);

  // Colori disponibili
  const colors = ["blue", "purple", "pink", "green", "yellow"];


  // Cambio automatico del testo
  onMount(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const currentIndex = texts().indexOf(currentText());
        const nextIndex = (currentIndex + 1) % texts().length;
        setCurrentText(texts()[nextIndex]);
        setColorIndex((colorIndex() + 1) % colors.length);
        setIsVisible(true);
      }, 500);
    }, changeInterval());

    return () => clearInterval(interval);
  });

  // Animazione typewriter
  const startTypewriter = (text: string) => {
    setIsTyping(true);
    setTypedText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsTyping(false), 1000);
      }
    }, 100);
  };

  return (
    <div class="animated-text-container">

      <div class="text-display">
        <Show when={animationType() !== "typewriter" && animationType() !== "gradient"}>
          <div
            classList={{
              "text-animated": true,
              "fade": animationType() === "fade",
              "slide": animationType() === "slide",
              "bounce": animationType() === "bounce",
              "visible": isVisible(),
              [colors[colorIndex()]]: true
            }}
          >
            {currentText()}
          </div>
        </Show>

        <Show when={animationType() === "typewriter"}>
          <div
            classList={{
              "typewriter": true,
              "typing": isTyping(),
              [colors[colorIndex()]]: true
            }}
            onMouseEnter={() => startTypewriter(currentText())}
          >
            {typedText() || currentText()}
          </div>
        </Show>

        <Show when={animationType() === "gradient"}>
          <div class="gradient-text">
            {currentText()}
          </div>
        </Show>
      </div>
    </div>
  );
}
