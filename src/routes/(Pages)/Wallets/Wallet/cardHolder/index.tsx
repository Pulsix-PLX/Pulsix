import { createSignal, For } from 'solid-js';
import style from './index.module.scss';
import Card from './Card';

export default function CardHolder() {
  const [backCardHolderSize, setBackCardHolderSize] = createSignal(30);

const cards = [
  {
    color: '#FF5733', // Bright orange-red
    wallet: 'revolut',
    balance: 1000,
  },
  {
    color: '#4287f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  },
  {
    color: '#9987f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  },
  {
    color: '#9616f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  }
  ,
  {
    color: '#1187f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  }
  ,
  {
    color: '#9387f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  }
  ,
  {
    color: '#9387f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  }
  ,
  {
    color: '#9387f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  }
  ,
  {
    color: '#9387f5', // Bright blue
    wallet: 'n26',
    balance: 1500,
  }
];

  return (
    <div class="CM w-full max-w-[250px] mx-auto">
      {/* Back */}
      <img
        src="/public/img/wallets/backCardHolder.png"
        class={`w-[60vh] -z-50 ${style.backCardHolder}`}
        style={{
          height: `${cards.length*3}vh`,
         
        }}
      />

      {/* Front Card Holder with Overlapping Cards */}
    

          <For each={cards}>
            {(card, index) => (
              <Card
                color={card.color}
                wallet={card.wallet}
                balance={card.balance}
                position={index()} // Smaller increment to create overlap
              />
            )}
          </For>
          <div class="absolute top-[44%] left-0 w-full z-20">
        <img
          src="/public/img/wallets/frontCardHolder.png"
          class="w-full absolute top-0 left-0"
        />
      </div>

      {/* Cuciture */}
      <svg
        width="100%"
        height="10%"
        viewBox="0 0 290 240"
        preserveAspectRatio="xMidYMid meet"
        class="absolute -top-5 left-0 w-full h-full pointer-events-none"
      >
        <rect
          x="10"
          y="10"
          width="270"
          height={`${backCardHolderSize()}vh`}
          rx="20"
          ry="20"
          fill="none"
          stroke="hsla(0, 0%, 73%, 0.433)"
          stroke-width="1.2"
          stroke-dasharray="10 10"
        />
      </svg>
    </div>
  );
}
