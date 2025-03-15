import { A } from '@solidjs/router';
import { onCleanup, onMount } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import { setShowMenu } from '../components/Menus/Menu';
import './404.scss';
export default function NotFound() {
  // Nasconde il menu quando la pagina 404 viene caricata
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  // Ripristina il menu quando l'utente lascia la pagina
  return (
    <div class="page-404-container">
      <h1 class="Error404 ">404</h1>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>
      <div
        class="button-container"
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        
          <ButtonSparkle text="Go to home" size={1.5} onClick={()=>window.location.href='/'}></ButtonSparkle>
        
      </div>
    </div>
  );
}
