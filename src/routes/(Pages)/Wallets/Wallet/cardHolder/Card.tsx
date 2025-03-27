import style from './Card.module.scss';

interface props {
  color: string;
  wallet: string;
  balance: number;
  position:any
}

export default function Card(props: props) {
  return (
  <div 
    class={`absolute ${style.card}`} 
    style={{ 
      'background-color': props.color,
      top: `${(props.position)}rem`, // Use top instead of margin-top
      'z-index': -props.position
    }}
  >
    <p class="text-black">{props.wallet}</p>
  </div>
  )
}
