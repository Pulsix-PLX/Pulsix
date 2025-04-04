import { For } from 'solid-js';
import Card from './Card/Card';
import style from './index.module.scss';

interface datas {
  name: string;
  id: number;
  data: any[];
}
export interface card {
  color: any;
  wallet: string;
  balance: number;
}
export default function CardContainer(props: datas) {
  const cards: card[] = [
    {
      color: '#FF5733', // Bright orange-red
      wallet: 'revolut',
      balance: 1000,
    },
  ];
  return (
    <>
  
        {/* Cards */}
        <For each={props.data || cards}>
          {(card, index) => {
            console.log(`Rendering card at index ${index()}:`, card.color);
            return (
              <Card
          color={card.color}
          wallet={card.wallet}
          balance={card.balance}
          position={index()} // Smaller increment to create overlap
              />
            );
          }}
        </For>
        {/* Back */}
        <img
          src="/public/img/wallets/backCardHolder.png"
          class={` ${style.backCardHolder}`}
          style={{
            height: `${props.data?.length * 2 + 11}vw`,
            'margin-top': `-${props.data?.length * 2 + 2.5}vw`,
            'z-index': -10,
          }}
        />

   {/* Contenitore Relativo per Immagine Frontale e Testi */}
   <div class="relative w-[17.7vw] inline-block"> {/* Aggiunto inline-block per rispettare la larghezza */}
        {/* Front Image */}
        <img
          src="/img/wallets/frontCardHolder.png" // Rimosso /public/
          class="block w-full" /* block previene spazio extra sotto l'img, w-full la adatta al div */
        />

        {/* Nome del Wallet (Centrato Orizzontalmente) */}
        <p class="absolute bottom-[3.8vw] left-1/2 transform -translate-x-1/2 z-10 text-[1.2vw] text-center whitespace-nowrap w-[90%] overflow-hidden text-ellipsis">
          {/*
            - absolute: posiziona rispetto al div relativo
            - bottom-[3.8vw]: Distanza dal fondo (aggiusta questo valore!)
            - left-1/2: Sposta l'inizio del testo al 50% del contenitore
            - transform -translate-x-1/2: Tira indietro il testo del 50% della SUA larghezza per centrarlo
            - z-10: Assicura sia sopra l'immagine frontale
            - text-center: Centra il testo se dovesse andare a capo (improbabile con nowrap)
            - whitespace-nowrap: Evita che il testo vada a capo
            - w-[90%]: Limita la larghezza per evitare che esca se troppo lungo
            - overflow-hidden text-ellipsis: Mostra "..." se il testo è troppo lungo per w-[90%]
          */}
          {props.name}
        </p>

        {/* Bilancio Totale (Centrato Orizzontalmente sotto il nome) */}
        <p class="absolute bottom-[0.5vw] left-1/4 transform -translate-x-1/2 z-10 text-[1.5vw] text-center whitespace-nowrap">
          {/*
            - Stessa tecnica di centraggio del nome
            - bottom-[1.5vw]: Distanza dal fondo (più in basso del nome, aggiusta!)
          */}
         $ {props.data.reduce((sum, card) => sum + card.balance, 0)}
        </p>
      </div>
        {/* Cuciture
  <svg

    viewBox="0 0 290 240"
    preserveAspectRatio="xMinYMin slice"
    class="absolute top-0 left-0 pointer-events-none"
    style={{
      height: `${cards.length * 5}vh`,
      
    }}
  >
    <rect
      x="10"
      y="10"
      width="220"
      height="220"
      rx="20"
      ry="20"
      fill="none"
      stroke="hsla(0, 0%, 73%, 0.433)"
      stroke-width="1.2"
      stroke-dasharray="10 10"
    />
  </svg>
*/}
     
    </>
  );
}
