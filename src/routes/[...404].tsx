import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '../components/Menus/Menu';
import './404.scss';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
export default function NotFound() {
  // Nasconde il menu quando la pagina 404 viene caricata
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });

  return (
    <>
   
      <h1 class="Error404">404</h1>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>

       <ButtonSparkle text='Go to Home' size={1.5}  class='CM mt-220 mb-250' shadow={50}/>

    </>
  );
}
