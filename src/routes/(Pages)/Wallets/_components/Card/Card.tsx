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
      class={`absolute w-[18.7vw] h-[10vw] ml-[0.5vw] ${style.card}`}
      style={{
        'background-color': props.color,
        'margin-top': `-${props.position * 2+2}%`,
        "z-index": -props.position - 1
      }}
    >
      <div class="flex flex-col h-full">
        <p class={` ml-[15vw] ${style.name}`}>{props.wallet}</p>
        <p class={` ml-[15vw] ${style.balance}`}>${props.balance}</p>
      </div>
    </div>
  );
}
