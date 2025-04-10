import { createResource, Show, createMemo, createSignal } from 'solid-js';
import { CardBody, CardContainer, CardItem } from '~/components/3dImageRotation/prova'; // Adatta percorso
// Importa getConversionRate (che userà getExchangeRate dietro le quinte)
import { getConversionRate } from '~/routes/API/exchangeRates/exchangeRates'; // Adatta percorso
import { edit, setEdit } from '../cardHolder';
import { A } from '@solidjs/router';

// Interfaccia Props
interface WalletProps {
  id: number; // ID del wallet (non usato qui, ma utile per il futuro)
  name: string;
  balance: number | null | undefined; // Saldo (ASSUMIAMO SIA IN EUR)
  currency: string | null | undefined; // Valuta ORIGINALE/TARGET in cui visualizzare
  nation: string | null | undefined; // Nazione (non usata qui, ma utile per il futuro)
  category: number | null | undefined; // Categoria (non usata qui, ma utile per il futuro)
  href: string; // Percorso per il link (non usato qui, ma utile per il futuro)
  onClick: () => void; // Funzione da eseguire al click (non usata qui, ma utile per il futuro)
  color?: string;
}

export default function Wallet(props: WalletProps) {
  // --- Resource per ottenere il Saldo Riconvertito nella sua Valuta Originale ---
  // Calcola: SaldoInEUR * Tasso(EUR -> ValutaOriginale)
  const [balanceInOriginalCurrencyResource] = createResource(
    // 1. Source: dipende dal saldo (in EUR) e dalla valuta originale/target
    () => ({
      eurBalance: props.balance,
      targetOriginalCurrency: props.currency, // La valuta in cui VOGLIAMO visualizzare
    }),
    // 2. Fetcher: recupera il tasso EUR -> ValutaOriginale e moltiplica
    async (sourceData): Promise<number | null> => {
      const { eurBalance, targetOriginalCurrency } = sourceData;

      // Validazione Input
      if (
        eurBalance === null ||
        eurBalance === undefined ||
        isNaN(eurBalance) ||
        !targetOriginalCurrency
      ) {
        console.warn(`[Wallet ${props.name}] Dati non validi per riconversione:`, {
          eurBalance,
          targetOriginalCurrency,
        });
        return null;
      }

      const targetCode = targetOriginalCurrency.toUpperCase();

      // Se la valuta target è EUR, non serve conversione (il saldo è già in EUR)
      if (targetCode === 'EUR') {
        console.log(`[Wallet ${props.name}] Visualizzazione diretta in EUR: ${eurBalance}`);
        return eurBalance;
      }

      console.log(
        `[Wallet ${props.name}] Cerco tasso EUR -> ${targetCode} per riconvertire ${eurBalance} EUR`
      );
      try {
        // Ottieni il tasso: 1 EUR = X Valuta Target
        const rateEurToTarget = await getConversionRate('EUR', targetCode);

        if (rateEurToTarget === null) {
          console.warn(`[Wallet ${props.name}] Tasso EUR -> ${targetCode} non disponibile.`);
          return null; // Non possiamo riconvertire
        }

        // Calcola il valore nella valuta originale/target
        const valueInOriginalCurrency = eurBalance * rateEurToTarget;
        console.log(
          `[Wallet ${
            props.name
          }] Riconvertito: ${eurBalance} EUR * ${rateEurToTarget} = ${valueInOriginalCurrency.toFixed(
            4
          )} ${targetCode}`
        );

        return valueInOriginalCurrency;
      } catch (error) {
        console.error(
          `[Wallet ${props.name}] Errore durante getConversionRate(EUR -> ${targetCode}):`,
          error
        );
        throw error; // Lascia che createResource gestisca l'errore
      }
    }
  );
  // Risultato: balanceInOriginalCurrencyResource() è il valore nella valuta originale (o null/undefined)

  // --- Memo per formattare il risultato nella valuta originale ---
  const formattedOriginalCurrencyBalance = createMemo(() => {
    const amount = balanceInOriginalCurrencyResource();

    if (balanceInOriginalCurrencyResource.loading) {
      return 'Caricamento...';
    }
    if (balanceInOriginalCurrencyResource.error) {
      return (
        <span class="text-red-500 text-xs" title={balanceInOriginalCurrencyResource.error.message}>
          (Errore)
        </span>
      );
    }
    if (amount === null) {
      // Conversione fallita (es. tasso mancante)
      return `-- ${props.currency ?? '???'}`; // Mostra la valuta che si cercava di ottenere
    }

    // Formatta l'importo usando la valuta ORIGINALE (props.currency)
    try {
      return amount?.toLocaleString('it-IT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch (e) {
      console.error(`Errore formattazione valuta ${props.currency}:`, e);
      return `${amount?.toFixed(2)} ${props.currency ?? ''}`; // Fallback
    }
  });

  const [hover, setHover] = createSignal<boolean>(false);

  const handleLinkClick = (event:Event) => {
    console.log("Link clicked. Edit mode:", edit());
    if (edit()) {
      // Se siamo in modalità edit, previeni TUTTO
      console.log("Preventing default link action and stopping propagation because edit=true");
      event.preventDefault();  // Impedisce la navigazione href
      event.stopPropagation(); // Impedisce bubbling (buona pratica)
      // Non chiamare props.onclick se siamo in edit mode
    } else {
      // Se non siamo in modalità edit, esegui l'azione originale (se esiste)
      if (props.onClick) {
         console.log("Executing props.onclick");
         props.onClick(); // Esegui l'azione originale
      }
      // La navigazione href avverrà normalmente se props.onclick non fa preventDefault
    }
  };
  return (
    <>
      <A
        href={props.href}
        onclick={handleLinkClick}
        onmouseenter={() => setHover(true)}
        onmouseleave={() => setHover(false)}
      >
        <CardContainer>
          <CardBody
            class={`border-black border-4 w-[20vw] h-[12vw] rounded-xl -mt-100`}
            color={props.color}
          >
             {/* edit/delete cardHolder */}
             <CardItem translateZ={10} class="absolute ml-[16.5vw] mt-[8.6vw]" as='button'>
              <Show when={hover()}>
                <img
                  class="absolute w-23 cursor-pointer z-100"
                  src="/icons/edit.png"
                  onClick={(event) => {
                    console.log("Click su icona EDIT"); // Log per debug
                    // 1. Ferma l'evento qui per non farlo arrivare ad <A>
                    event.stopPropagation();
                    event.preventDefault()
                    // 2. Esegui l'azione specifica dell'icona
                    setEdit(props.id);
                  }}
                  onmouseenter={() => setHover(true)}
                  onmouseleave={() => setHover(false)}
                ></img>
              </Show>
            </CardItem>
            <CardItem translateZ={20} class="text-white text-[1vw] text-center mt-[1vw]">
              {props.name}
            </CardItem>
           
            <CardItem as="p" translateZ={40} class="text-white text-[1vw] text-center">
              {/* Mostra il saldo riconvertito nella sua valuta originale */}
              {formattedOriginalCurrencyBalance()}
              {props.currency == 'USD' ? '$' : props.currency == 'EUR' ? '€' : props.currency}
            </CardItem>
          </CardBody>
        </CardContainer>
      </A>
    </>
  );
}
