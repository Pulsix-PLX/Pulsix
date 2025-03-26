import { createSignal, onCleanup, onMount, Show, Suspense } from 'solid-js';
import { setShowMenu } from '~/components/Menus/Menu';
import style from './index.module.scss';
import RiveCanvas from './riv';
import Toggle from './components/Toggle';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';

import { value } from './riv';
import { A, Navigate, useNavigate } from '@solidjs/router';
export default function LoginRegistration() {
 const [renderPage, setRenderPage] = createSignal(false)
  onMount(() => {
    setShowMenu(false);
    setTimeout(() => {
      setRenderPage(true);
    }, 300);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  const navigate = useNavigate();
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
      <Show when={renderPage()}>
      <p class="text-7xl bg-black CM -mt-30 -ml-10 pl-60 pr-60 pt-30">Pulsix now for</p>
      <div class="CM mt-[13.1%] -ml-[6%]">
        <Toggle />
      </div>
      {/* Login */}
      <div class={`CM flex flex-col mt-[21.5%] -ml-[15.5%] ${!value() ? style.hidden : ''}`}>
        <p class={`${style.titles}`}>Welcome back</p>
        <p class={`  ${style.paragraf}`}>Update your financial goals </p>
        <p class={`-mt-16 ${style.paragraf}`}> Continue tracking your progress</p>
        <div class="mt-[15%] ml-[23%]">
          <ButtonSparkle
            text="Go to dashboard"
            
            shadow={40}
            
            onClick={() => navigate('/LoginRegistration/Login')}
          />
        </div>
      </div>
      {/* Registration */}
      <div class={`CM flex flex-col mt-[21.5%] ml-[16.5%] ${value() ? style.hidden : ''}`}>
        <p class={`${style.titles}`}>Be one of us</p>
        <p class={`  ${style.paragraf}`}>Smart tracking</p>
        <p class={`-mt-16 ${style.paragraf}`}> Smarter decisions</p>
        <div class="mt-[15%] ml-[23%]">
          <ButtonSparkle
            text="Join Now"
            shadow={40}
            shadowColor="rgba(255, 27, 77, 1)"
            onClick={() => navigate('/LoginRegistration/Registration')}
          />
        </div>
      </div>
      </Show>
    </>
  );
}


