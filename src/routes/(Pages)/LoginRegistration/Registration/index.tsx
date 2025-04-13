import { createSignal, onCleanup, onMount } from 'solid-js';
import Fade from '~/components/Buttons/Fade';
import { setShowMenu } from '~/components/Menus/Menu';
import ProgressBar, { next } from './components/ProgressBar';
import Credentials from './Credentials';
import Email from './Email';
import Phone from './Phone';
import { resetAllFormData } from '~/GlobalStores/FormStore';
import Uman from './components/spline';
import { setShowCursor } from '~/routes/UI/Cursor';

//non faccio reload della pagina prima lo chiedo
const [hasChanges, setHasChanges] = createSignal(true);
function ReloadConfirmation() {
  onMount(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges()) {
        event.preventDefault();
        event.returnValue = 'reload';
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
    setShowCursor(false);
  });

  onCleanup(() => {
    setShowMenu(true);
    setShowCursor(true);
  });

  return (
    <>
          <div style={{"z-index":-300}}>
      <Uman sceneUrl={'https://prod.spline.design/f1WOGEzpLvYuyCgl/scene.splinecode'} id="scenaAlternativa" class='CM ml-[30vw] -mt-[50vw] -z-200 w-[300%] h-[300%]' /> 
      </div>
    <div>
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
      <Fade in={next() == 2} fadeIn={2000} fadeOut={300} class={'CM mt-140'}>
        <Phone/>
      </Fade>
    
      <Uman />

      </div>
    </>
  );
}

export default index;
