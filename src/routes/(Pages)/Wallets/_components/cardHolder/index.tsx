import { For } from 'solid-js';
import Card from '../Card/Card';
import style from './index.module.scss';

interface datas {
data?:any[];
}
export interface card {
  color: string;
  wallet: string;
  balance: number;
}
export default function CardContainer(props:datas) {
  const cards:card[] = [
    {
      color: '#FF5733', // Bright orange-red
      wallet: 'revolut',
      balance: 1000,
    },
  ];
console.log(props.data?.length);
  return (
    <>
    <div class='w-[40vw]'>
      {/* Cards */}
      <For each={props.data || cards}>
        {(card, index) => (
          <Card
            color={card.color}
            wallet={card.wallet}
            balance={card.balance}
            position={index()} // Smaller increment to create overlap
          />
        )}
      </For>
      {/* Back */}
      <img
        src="/public/img/wallets/backCardHolder.png"
        class={` w-[19.7vw] h-[20vw] ${style.backCardHolder}`}
        style={{
          height: `${ props.data?.length  * 2 +11 }vw`,
          'margin-top': `-${props.data?.length  * 2 +2.5}vw`,
          'z-index': -10,
        }}
      />
      {/* Front*/}
      <img src="/public/img/wallets/frontCardHolder.png" class="w-[19.7vw] " />

      {/* Balance totale */}
      <p class="-mt-[3vw] ml-[2vw] z-50 absolute text-[1.5vw]">
        ${cards.reduce((sum, card) => sum + card.balance, 0)}
      </p>
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
</div>
    </>
  );
}
