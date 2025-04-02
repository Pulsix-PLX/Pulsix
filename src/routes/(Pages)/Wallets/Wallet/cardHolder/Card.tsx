// Card.tsx
import style from './Card.module.scss';

interface CardProps {
  color: string;
  wallet: string;
  balance: number;
  position: number;
}

export default function Card(props: CardProps) {
  return (
    <div
      class={`absolute w-[18.7vw] h-[10vw] ml-[1vh] ${style.card}`}
      style={{
        'background-color': props.color,
        'margin-top': `-${props.position * 2+2}%`,
        "z-index": -props.position - 1
      }}
    >
      <div class="flex flex-col h-full">
        <p class="text-white font-bold ml-[15vw]">{props.wallet}</p>
        <p class="text-white ml-[15vw]">${props.balance}</p>
      </div>
    </div>
  );
}
