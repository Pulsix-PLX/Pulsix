import { createEffect, onCleanup, onMount } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import Fade from '~/components/Buttons/Fade';
import ProgressBar from './ProgressBar';
import { next } from './ProgressBar';
import Credentials from './Credentials';
import EmailVerification from './Email/vecchia';
import Email from './Email';
import { createSignal } from 'solid-js';

//non faccio reload della pagina prima lo chiedo
const [hasChanges, setHasChanges] = createSignal(true);
function ReloadConfirmation() {
  onMount(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges()) {
        event.preventDefault();
        event.returnValue = 'ciaoooo no';
        return 'nada';
      }
    };

    // Aggiungi event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Rimuovi event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  return null;
}

// Esporta la funzione per impostare le modifiche in altri componenti
export function markChanges(changed: boolean = true) {
  setHasChanges(changed);
}

// Esporta lo stato delle modifiche se serve controllarlo altrove
export function getHasChanges() {
  return hasChanges();
}

function index() {
  onMount(() => {
    setShowMenu(false);
  });

  onCleanup(() => {
    setShowMenu(true);
  });

  return (
    <>
      <ReloadConfirmation />
      <Fade in={true} fadeIn={4000} fadeOut={300} class={'CM -mt-30'}>
        <ProgressBar />
      </Fade>
      <Fade in={next() == 0} fadeIn={2000} fadeOut={300} class={'CM mt-140'}>
        <Credentials />
      </Fade>
      <Fade in={next() == 1} fadeIn={2000} fadeOut={300} class={'CM mt-140'}>
        <Email />
      </Fade>
    </>
  );
}

export default index;
