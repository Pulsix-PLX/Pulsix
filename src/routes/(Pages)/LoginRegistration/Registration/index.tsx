import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import ProgressBar from '../UI/ProgressBar';
import style from './index.module.scss';
import RiveCanvas from '../riv';
import LampDemo from '../UI/lamp/lamp-demo';
import LampMy from '../UI/lamp/LampMy';
function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  return (
    <>

      
    </>
  );
}

export default index;
