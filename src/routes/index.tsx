import { createSignal, onMount } from 'solid-js'; // Tieni solo se usato

import splineLoader from './(Pages)/Wallets/_components/Card3D/preLoader'; // Tieni se usato
import Select from '~/components/Inputs/select';
import { authStore } from '~/GlobalStores/auth';
import FancySpinner from './UI/Loading';
import Card3D from './(Pages)/Wallets/_components/Card3D';
import { PulsixButton } from 'pulsix-solid';
import { setShowMenu } from '~/components/Menus/Menu';
/*
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'pulsix-button': JSX.HTMLAttributes<HTMLElement> & {
        // Usa JSX.HTMLAttributes per gli standard
        'button-text'?: string;
        'widget-id'?: string;
        'button-color'?: string;
        'popup-config-json'?: string;
        disabled?: boolean;
        // Aggiungi qui eventi custom se vuoi usare on:eventname
        // 'on:nome-evento-custom'?: (e: CustomEvent) => void;
      };
    }
  }
}
*/

export default function index() {
  const v = ['CHF', 'USD', 'EUR', 'GBP', 'JPY'];

  onMount(() => {
    setTimeout(()=>setShowMenu(true),100)
    
  });
  return (
    <>
      <div class="flex flex-row ml-200">
        {' '}
        {/* Controlla la classe ml-200, forse volevi usare utility Tailwind? */}
        <Select options={v} placeholder="prova" name="prova"></Select>
        <div class="CM"></div>
        <PulsixButton buttonColor="blue" label='Button Pulsix' class='ml-200' />
      </div>
    </>
  );
}
