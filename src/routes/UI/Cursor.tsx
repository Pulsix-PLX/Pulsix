import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import './Cursor.scss';
export   const [showCursor, setShowCursor] = createSignal(true);

const SpectacularCursor = () => {


  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [trail, setTrail] = createSignal([]);
  const [isHovering, setIsHovering] = createSignal(false);
  const [isClicking, setIsClicking] = createSignal(false);
  const [velocity, setVelocity] = createSignal({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = createSignal({ x: 0, y: 0 });
  const [isTextInput, setIsTextInput] = createSignal(false);

  // Configurazione dell'effetto scia
  const trailLength = 8;
  const trailUpdateInterval = 15; // ms

  onMount(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTimestamp = performance.now();

    // Ensure the default cursor is hidden on all elements
    const style = document.createElement('style');
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    // Segui la posizione del mouse con effetto di ritardo
    const updatePosition = (e) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimestamp;

      // Calcola la velocità di movimento del mouse
      if (deltaTime > 0) {
        const velocityX = Math.abs((e.clientX - lastX) / deltaTime) * 20;
        const velocityY = Math.abs((e.clientY - lastY) / deltaTime) * 20;
        const speed = Math.min(Math.sqrt(velocityX * velocityX + velocityY * velocityY), 10);

        setVelocity({ x: velocityX, y: velocityY });

        // Aggiorna il CSS per la variabile di velocità
        document.documentElement.style.setProperty('--cursor-speed', speed);
      }

      setPrevPosition(position());
      setPosition({ x: e.clientX, y: e.clientY });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTimestamp = currentTime;
    };

    // Funzione per rilevare gli elementi interattivi
    const checkHoverable = (e) => {
      const target = e.target;
      const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      const isHoverable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('clickable') ||
        target.closest('button') ||
        target.closest('a') ||
        isInputElement;

      // Gestiamo lo stato del cursore di testo direttamente nel componente
      // invece di aggiungere una classe al body
      setIsTextInput(isInputElement);
      setIsHovering(isHoverable);
    };

    // Gestione click con effetti avanzati
    const handleMouseDown = (e) => {
      setIsClicking(true);
      createClickRipple(e.clientX, e.clientY);

      // Gestiamo lo stato del cursore di testo direttamente nel componente
      const target = e.target;
      const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      setIsTextInput(isInputElement);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Funzione per il click (senza effetto ripple)
    const createClickRipple = (x, y) => {
      // Non creiamo più l'effetto ripple come richiesto
      // L'effetto è gestito direttamente dal CSS sul cursor-inner
    };

    // Aggiorna la scia del cursore
    const updateTrail = () => {
      setTrail((prev) => {
        const newTrail = [...prev, { ...position(), timestamp: Date.now() }];
        return newTrail.slice(-trailLength);
      });
    };

    // Timer per aggiornare la scia
    const trailTimer = setInterval(updateTrail, trailUpdateInterval);

    // Funzione per gestire l'uscita da elementi di input
    const handleMouseOut = (e) => {
      const target = e.target;
      const relatedTarget = e.relatedTarget;

      // Se stiamo uscendo da un input o textarea
      if (
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        (!relatedTarget ||
          (relatedTarget.tagName !== 'INPUT' && relatedTarget.tagName !== 'TEXTAREA'))
      ) {
        setIsTextInput(false);
      }
    };

    // Aggiungi listener per gli eventi
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', checkHoverable);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Nascondi il cursore predefinito
    document.body.style.cursor = 'none';

    // Cleanup
    onCleanup(() => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', checkHoverable);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(trailTimer);
    });
  });

  return (
    <>
    <Show when={showCursor()}>
      {/* Particelle di scia */}
      {trail().map((point, index) => (
        <div
          class="cursor-trail-particle"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: index / trailLength,
            transform: `scale(${0.5 + index / trailLength / 2})`,
            'animation-delay': `${index * 50}ms`,
          }}
        />
      ))}

      {/* Cursore principale esterno */}
      <div
        class="cursor-outer"
        style={{
          left: `${position().x}px`,
          top: `${position().y}px`,
        }}
        classList={{
          hovering: isHovering(),
          clicking: isClicking(),
          'text-input': isTextInput(),
        }}
      />

      {/* Nucleo interno del cursore */}
      <div
        class="cursor-inner"
        style={{
          left: `${position().x}px`,
          top: `${position().y}px`,
        }}
        classList={{
          hovering: isHovering(),
          clicking: isClicking(),
          'text-input': isTextInput(),
        }}
      />

      {/* Anello magnetico quando si passa sopra elementi cliccabili */}
      <div
        class="cursor-magnetic-ring"
        style={{
          left: `${position().x}px`,
          top: `${position().y}px`,
          opacity: isHovering() ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovering() ? 1 : 0}) rotate(${
            position().x / 5
          }deg)`,
        }}
      />
      </Show>
    </>
  );
};

export default SpectacularCursor;
