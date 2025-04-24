import { useNavigate } from '@solidjs/router';
import { createEffect, createSignal, For, onMount } from 'solid-js';
import ButtonSparkle from '~/components/Buttons/AnimatedIconButton/ButtonSparkle';
import DatePicker from '~/components/Inputs/DatePicker';
import DateRangePicker from '~/components/Inputs/DateRangePicker';
import Input from '~/components/Inputs/Inputs'; // Assumendo che questo sia il componente corretto
import { setShowMenu } from '~/components/Menus/Menu';
import { authStore } from '~/GlobalStores/auth';
import { allInputsValid, getFormValue, SetForm, SetFormValues } from '~/GlobalStores/FormStore';
// Rimuovo l'import di Select se ora usi Input type="select"
// import Select from "~/components/Inputs/select";
import { getWallets } from '~/routes/API/Wallets/getWallets.server'; // Assicurati che il percorso sia corretto
import { getUserId } from '~/Server/auth.server'; // Assicurati che il percorso sia corretto
import PathWallets from './utils/pathWallets';

interface WalletData {
  id: number;
  wallet_name: string;
  container_id?: number | null;
  balance?: number; // Aggiungo altre proprietà opzionali che potresti avere
  currency?: string;
  color?: string;
  type?: string; // <<< Proprietà importante per la nuova logica
  // ... altre proprietà
}

interface ProcessedWalletItem {
  id: number;
  wallet: string;
  path: string;
  type?: string; // Manteniamo il tipo per il filtraggio
  container_id?: number | null; // Utile per debug o logica futura
}

export default function Index() {
  const [walletPaths, setWalletPaths] = createSignal<string[]>([]);
  const [walletIds, setWalletIds] = createSignal<number[]>([]);





  const desiredWidth = 1700; // Imposta la larghezza desiderata
  const desiredHeight = 900; // Imposta l'altezza desiderata
  const screenWidth = window.screen.availWidth || window.screen.width; // Fallback a width
  const screenHeight = window.screen.availHeight || window.screen.height; // Fallback a height
  const desiredX = Math.max(0, (screenWidth - desiredWidth) / 2); // Usa Math.max per evitare coordinate negative su schermi piccoli
  const desiredY = Math.max(0, (screenHeight - desiredHeight) / 2);
  try {
    window.resizeTo(desiredWidth, desiredHeight);
    window.moveTo(desiredX, desiredY);
    console.log(`Window resize attempted to ${desiredWidth}x${desiredHeight}`);
} catch (resizeError) {
    // Il browser potrebbe bloccare il ridimensionamento
    console.warn("Window resize failed or was blocked by the browser:", resizeError);
    // Non è un errore bloccante per il login, quindi non rilanciamo l'errore
};

  onMount(() =>{setShowMenu(false);  SetFormValues('type', type())});
  const [type, setType] = createSignal<string>('income');
  async function handleSubmit() {
    const data = {
      cause: getFormValue('cause'),
      date: getFormValue('date'),
      categoryId: getFormValue('category') || null,
      amount: getFormValue('amount'),
      walletId: getFormValue('walletId'),
      type: getFormValue('type'),
    //  userId: await getUserId(),
    };
    console.log(data.walletId)
    await authStore.api.post('API/Wallets/Wallet/addTransaction', data);
  }
  createEffect(() => {
    SetFormValues('type', type());
    console.log(getFormValue('type'));
  });
  return (
    <>
      <button
        type="button"
        onClick={() => {
          window.location.href = '/Login'; //used to reset the global store values
        }}
      >
        Go back
      </button>
      <form
        // onSubmit={(e)=>e.preventDefault()}
        class="CM w-[25vw] mt-[15vh] pl-[5vw] pr-[5vw] pb-[2vw] pt-[2vw] min-w-[280px] min-h-[200px]"
        style={{
          border: `3px solid ${allInputsValid() ? 'var(--Secondary)' : 'rgba(255, 255, 255, 0.3)'}`,
          'border-radius': '40px',
        }}
      >
        {/* Wallet */}
        <PathWallets/>

        {/* Cause */}
        <Input type="text" name="cause" placeholder="Cause" />
        {/* Income / Expense */}
        <div class='flex flex-row gap-50 ml-0'>
        <ButtonSparkle text="Income" type="button" onClick={() => setType('Income')} />
        <ButtonSparkle text="Expense" type="button" onClick={() => setType('Expense')} />
        </div>
        {/* Amount */}
        <Input type="text" name="amount" placeholder="Amount" required />
        {/* Category */}
        <Input
          type="select"
          name="category"
          options={walletPaths()}
          values={walletIds()}
          class="ml-30"
          placeholder="category"
        />
        {/* Date */}
        <Input type="date" name="date" placeholder="Date" class="ml-10" />

        <ButtonSparkle
          text="Send"
          class="ml-[auto] mr-[auto]"
          onClick={handleSubmit}
          disabled={!allInputsValid()}
        ></ButtonSparkle>
      </form>
    </>
  );
}
