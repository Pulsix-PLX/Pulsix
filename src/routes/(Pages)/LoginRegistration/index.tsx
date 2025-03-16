import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import ProgressBar from './UI/ProgressBar';
import style from './index.module.scss';
import RiveCanvas from './riv';
import LampDemo from './UI/lamp/lamp-demo';
import LampMy from './UI/lamp/LampMy';
function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  return (
    <>
    <LampDemo></LampDemo>
      <RiveCanvas
        src="/rivs/LoginRegistration2.riv"
        stateMachines="State Machine 1"
        artboard="Sandesh" // Assicurati che sia lo stesso nome nell'editor di Rive
        onLoad={() => console.log('Animation loaded!')}
      />
      <LampMy></LampMy>
    </>
  );
}

export default index;
