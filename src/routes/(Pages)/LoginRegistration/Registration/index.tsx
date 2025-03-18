import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import Fade from '~/components/Buttons/Fade';
import ProgressBar from './ProgressBar';
import { next } from './ProgressBar';
import Credentials from './Credentials';
function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  
  return (
    <>
      <Fade in={true} fadeIn={4000} fadeOut={300} class={'CM'}> 
          <ProgressBar></ProgressBar>
      </Fade>
      <Fade in={next()==0} fadeIn={2000} fadeOut={300} class={'CM mt-160'}> 
          <Credentials/>
      </Fade>
    </>
  );
}

export default index;
