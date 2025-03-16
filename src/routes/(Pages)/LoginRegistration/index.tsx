import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import ProgressBar from './UI/ProgressBar';
import style from './index.module.scss';
import RiveCanvas from './riv';
import LampDemo from './UI/lamp/lamp-demo';
import LampMy from './UI/lamp/LampMy';
import Toggle from './components/Toggle';
function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  return (
    <>
    <div class='-mt-[23%] ml-[6.5%] absolute'>
      <RiveCanvas
        src="/rivs/LoginRegistration.riv"
        stateMachines="State Machine 1"
        artboard="Sandesh" // Assicurati che sia lo stesso nome nell'editor di Rive
        onLoad={() => console.log('Animation loaded!')}
      />
      </div>
      <Toggle/>
    </>
  );
}

export default index;
