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
    class={`absolute w-[16.7vw] h-[10vw] ml-[0.5vw] ${style.card} flex justify-end items-start pr-[1vw]`} // 
    style={{
      'background-color': `${props.color}`,
      'margin-top': `-${props.position * 2 + 2}%`,
      "z-index": -props.position - 1,

    }}
  >

    <div class="flex flex-col max-w-full">
      {/* Allinea il testo a destra e permetti a parole lunghe di andare a capo */}
      <p class={` ${style.name} text-${props.color=='white'?'black':'white'} text-right break-words`}>{props.wallet}</p>
      {/* Allinea anche il saldo a destra */}
      <p class={` ${style.balance} text-right`}>${props.balance}</p>
    </div>
  </div>
  );
}
