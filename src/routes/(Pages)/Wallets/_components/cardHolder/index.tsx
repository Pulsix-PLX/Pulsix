import { createResource, createSignal, For, Match, Show, Switch } from 'solid-js';
import Card from './Card/Card';
import style from './index.module.scss';

import {
  calculateConvertedTotal,
  ConvertedTotalResult,
} from '~/routes/API/exchangeRates/exchangeRates';
import { getUserId } from '~/Server/auth.server';
import SetWallet from '../SetWallet';
import { A } from '@solidjs/router';

interface CardContainerProps {
  name: string;
  id: number;
  data: card[];
  currency: string;
  href: string;
  onclick: () => void;
}

export interface card {
  color: any;
  wallet: string;
  balance: number;
  currency: string;
  position?: number;
  id: number;
}
// get id for edit wallet/container if it is pressed
export const [edit, setEdit] = createSignal<number | null>(null); 
export default function CardContainer(props: CardContainerProps) {

  const [hover, setHover] = createSignal<boolean>(false);
  const cardsFallback: card[] = [{ color: '', wallet: 'nothing', balance: 0, currency: 'USD', id: 0 }];

  ///--- Total balance converted ---
  // base currency
  const TARGET_DISPLAY_CURRENCY = 'USD';

  const [convertedTotalData] = createResource(
    () => ({
      containerId: props.id,
      targetCurrency: TARGET_DISPLAY_CURRENCY,
    }),
    async (sourceData): Promise<ConvertedTotalResult | null> => {
      const { containerId, targetCurrency } = sourceData;
      try {
        const userId = await getUserId();
        if (userId === null) {
          throw new Error('Utente non autenticato per calcolo totale.');
        }

        const result = await calculateConvertedTotal(containerId, targetCurrency, userId);
        return result;
      } catch (error) {
        console.error(
          `[ConvertedTotalResource] Error fetching/calculating total for container ${containerId}:`,
          error
        );
        throw error;
      }
    }
  );

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
      if (props.onclick) {
         console.log("Executing props.onclick");
         props.onclick(); // Esegui l'azione originale
      }
      // La navigazione href avverrà normalmente se props.onclick non fa preventDefault
    }
  };

  return (
    <>
  
          {/* Cards */}
          <For each={props.data && props.data.length > 0 ? props.data : null}>
            {(card, index) => {
              return (
                <Card
                  color={card.color}
                  wallet={card.wallet}
                  balance={card.balance}
                  position={index()}
                  currency={card.currency}
                  id={card.id}
                />
              );
            }}
          </For>
           
        
          <A href={props.href} onclick={handleLinkClick}>
          <Show when={hover()}>
            {/* edit/delete cardHolder */}
            <img
              class="absolute w-23 ml-[15.8vw] cursor-pointer z-100"
              src="/icons/edit.png"
              onClick={(event) => setEdit(props.id)}
              onmouseenter={() => setHover(true)}
              onmouseleave={() => setHover(false)}
              style={{
                'margin-top': `-${props.data?.length * 2 + 2}vw`,
              }}
            ></img>
          </Show>
            {/* back */}
            <img
              src="/img/wallets/backCardHolder.png"
              class={` ${style.backCardHolder}`}
              onmouseenter={() => setHover(true)}
              onmouseleave={() => setHover(false)}
              style={{
                height: `${(props.data?.length ?? cardsFallback.length) * 2 + 11}vw`,
                'margin-top': `-${(props.data?.length ?? cardsFallback.length) * 2 + 2.5}vw`,
                'z-index': -10,
              }}
            />

            {/* front */}
            <div class="relative w-[17.7vw] inline-block">
              <img
                src="/img/wallets/frontCardHolder.png"
                class="block w-full"
                onmouseenter={() => setHover(true)}
                onmouseleave={() => setHover(false)}
              />
              {/* Name of cardHolder */}
              <p
                class="absolute bottom-[3.8vw] left-1/2 transform -translate-x-1/2 z-10 text-[1.2vw] text-center whitespace-nowrap w-[90%] overflow-hidden text-ellipsis"
                onmouseenter={() => setHover(true)}
                onmouseleave={() => setHover(false)}
              >
                {props.name}
              </p>

              {/* total balance */}
              <p
                class="absolute bottom-[0.5vw] ml-[1vw] z-10 text-[1.3vw]  whitespace-nowrap text-left"
                onmouseenter={() => setHover(true)}
                onmouseleave={() => setHover(false)}
              >
                {/* Loading */}
                <Show
                  when={!convertedTotalData.loading && convertedTotalData.state !== 'unresolved'}
                  fallback={<span>...</span>}
                >
                  {/* Formatted resault */}
                  {(convertedTotalData()?.total_balance ?? 0).toLocaleString('it-IT', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {convertedTotalData()?.currency_code == 'USD'
                    ? '$'
                    : convertedTotalData()?.currency_code == 'USD'
                    ? '€'
                    : TARGET_DISPLAY_CURRENCY}
                  {/* Icona/Tooltip per eventuali Avvisi (es. tassi mancanti) */}
                  <Show
                    when={
                      convertedTotalData()?.warnings && convertedTotalData()!.warnings!.length > 0
                    }
                  >
                    <span
                      class="text-orange-500 text-xs ml-1 cursor-help"
                      title={convertedTotalData()!.warnings!.join('\n')}
                    >
                      (⚠️) {/* Semplice icona warning */}
                    </span>
                  </Show>
                </Show>

                {/* Error */}
                <Show when={convertedTotalData.error}>
                  <span
                    class="text-red-500 text-xs cursor-help"
                    title={convertedTotalData.error.message}
                  >
                    (Errore!)
                  </span>
                </Show>
              </p>
            </div>
            
          </A>
          
      
    </>
  );
}
