import { createResource, createSignal, onCleanup, onMount } from 'solid-js';
import Title from '~/components/Title';
import { getWallets } from '~/routes/API/Wallets/getWallets.server';
import { getUser } from '~/Server/auth.server';
import type { wallet } from '~/Server/types/wallet'; // Importa il tipo

// Dentro il tuo componente Solid
function MyWalletComponent() {

  // --- Esempio 1: Se l'userId è reattivo (es. da uno stato, prop, signal) ---
  // Supponiamo che l'ID utente provenga da un signal o da un'altra fonte reattiva
  const [userIdSignal, setUserIdSignal] = createSignal(5);

  // CORRETTO per reattività: Usa la funzione freccia per tracciare userIdSignal
  const [data, { mutate, refetch }] = createResource(
    () => userIdSignal(), // Source Function
    getWallets            // Fetcher Function
  );

  const fixedUserId = 10;

  // CORRETTO per valore fisso (anche se () => fixedUserId è leggermente più esplicito)
   const [dataFixed, { mutate: mutateFixed, refetch: refetchFixed }] = createResource(
     () => fixedUserId, // Source function (restituisce sempre 3)
     getWallets
   );

  return (
    <div>
      <h2 class='text-white'>I miei Wallet (Utente ID: {userIdSignal()})</h2>
      {/* Usa data() per accedere ai dati. data.loading e data.error per gli stati */}
      {data.loading && <p>Caricamento wallet...</p>}
      {data.error && <p>Errore nel caricamento: {data.error.message}</p>}
      <ul>
        {/* data() potrebbe essere undefined prima del caricamento o dopo un errore */}
        {data()?.map((wallet: wallet) => (
          <li>
            {wallet.wallet_name} ({wallet.type}): {wallet.balance}
          </li>
        ))}
      </ul>

      {/* Esempio di utilizzo di refetch */}
      <button onClick={() => refetch()}>Ricarica Wallet</button>

      {/* Esempio di cambio utente (se usi il signal) */}
      <button onClick={() => setUserIdSignal(prev => prev + 1)}>
         Vedi Wallet Utente Successivo
      </button>
    </div>
  );
}

export default MyWalletComponent;
