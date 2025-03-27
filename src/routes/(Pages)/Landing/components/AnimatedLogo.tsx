import { Component, Show } from 'solid-js';
import styles from './AnimatedLogo.module.scss';

interface NeonTextProps {
  text: string;
  font?: string;
  fastFlickerChars?: string[];
  normalFlickerChars?: string[];
  animationType?: 'slide' | 'fade' | 'zoom' | 'rotate';
  sparkle?: boolean;
}

const NeonText: Component<NeonTextProps> = (props) => {
  const renderText = () => {
    return props.text.split('').map((char, index) => {
      const isFastFlicker = props.fastFlickerChars?.includes(char.toLowerCase());
      const isNormalFlicker = props.normalFlickerChars?.includes(char.toLowerCase());
      
      const characterClassName = isFastFlicker 
        ? styles['fast-flicker'] 
        : isNormalFlicker 
        ? styles['flicker'] 
        : '';
      
      return (
        <span 
          class={`${characterClassName} ${styles['letter-container']}`} 
          data-letter={char}
        >
          {char}
          <Show when={props.sparkle}>
            <span class={styles['letter-sparkle']}></span>
          </Show>
        </span>
      );
    });
  };

  const getAnimationClass = () => {
    switch(props.animationType) {
      case 'slide': return styles['slide-in'];
      case 'fade': return styles['fade-in'];
      case 'zoom': return styles['zoom-in'];
      case 'rotate': return styles['rotate-in'];
      default: return styles['slide-in'];
    }
  };

  return (
    <div 
      class={`${styles['sign']} ${getAnimationClass()}`} 
      style={{ 'font-family': props.font || 'Clip' }}
    >
      {renderText()}
    </div>
  );
};

export default NeonText;