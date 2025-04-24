import { createSignal, onMount } from 'solid-js'; // Tieni solo se usato

import splineLoader from './(Pages)/Wallets/_components/Card3D/preLoader'; // Tieni se usato
import Select from '~/components/Inputs/select';
import { authStore } from '~/GlobalStores/auth';
import FancySpinner from './UI/Loading';
import Card3D from './(Pages)/Wallets/_components/Card3D';
import { PulsixButton } from 'pulsix-solid';
import { setShowMenu } from '~/components/Menus/Menu';

export default function index() {

  onMount(() => {
    setTimeout(()=>setShowMenu(true),100)
    
  });

  return (
    <>

        <div class="CM">
        <PulsixButton buttonColor="blue" label='Button Pulsix' class='ml-200' />
      </div>
    </>
  );
}
