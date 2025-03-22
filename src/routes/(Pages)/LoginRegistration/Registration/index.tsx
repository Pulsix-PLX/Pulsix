import { onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import Fade from '~/components/Buttons/Fade';
import ProgressBar from './ProgressBar';
import { next } from './ProgressBar';
import Credentials from './Credentials';
import EmailVerification from './Email';
function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  
  return (
    <>
      <Fade in={true} fadeIn={4000} fadeOut={300} class={'CM -mt-30'}> 
          <ProgressBar></ProgressBar>
      </Fade>
      <Fade in={next()==0} fadeIn={2000} fadeOut={300} class={'CM mt-140'}> 
          <Credentials/>
      </Fade>
      <Fade in={next()==1} fadeIn={2000} fadeOut={300} class={'CM mt-140'}> 
          <EmailVerification></EmailVerification>
      </Fade>
    </>
  );
}

export default index;
