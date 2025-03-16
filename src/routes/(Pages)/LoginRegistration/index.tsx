import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import style from './index.module.scss';
import RiveCanvas from './riv';
import Toggle from './components/Toggle';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';

import { value } from './riv';
function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  return (
    <>
      <div class="-mt-[22.5%] ml-[4.5%] absolute">
        <RiveCanvas
          src="/rivs/LoginRegistration.riv"
          stateMachines="State Machine 1"
          artboard="Sandesh" // Assicurati che sia lo stesso nome nell'editor di Rive
          onLoad={() => console.log('Animation loaded!')}
        />
      </div>
      <div class="CM mt-249 -ml-32">
        <Toggle />
      </div>
      <div class="CM mt-[34%] -ml-[15%] ">
          <ButtonSparkle text="Access" shadow={10} shadowColor='rgba(150, 205, 234, 0.534)' class={`${!value() ? style.hidden : ''}`}/>
      </div>
      <div class="CM mt-[34%] ml-[15%] ">
          <ButtonSparkle text="Access" shadow={10} shadowColor='rgba(150, 205, 234, 0.534)' class={`${value() ? style.hidden : ''}`}/>
      </div>
    </>
  );
}

export default index;
