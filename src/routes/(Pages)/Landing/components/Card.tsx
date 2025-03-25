import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import './Card.css';

interface CardProps {
  logo?: any;
  title: string;
  description: string;
  class?: string;
  shadowColor?: string;
}

export default function SparkleCard(props: CardProps) {
  const [isActive, setIsActive] = createSignal(false);

  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);

  return (
    <div class="card-sparkle">
      <div
        class={`card ${isActive() ? 'card-hover' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div class="logo">{props.logo}</div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <span class="card-spark"></span>
        <span class="card-backdrop"></span>
      </div>
    </div>
  );
}