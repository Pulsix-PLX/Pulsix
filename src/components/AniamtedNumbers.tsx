// CounterComponent.tsx
import { createSignal, For, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import './AnimatedNumbers.css';
// Import GUI library
import * as dat from 'dat.gui';

// Formatters for different currencies
const FORMATTERS = {
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
  GBP: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  }),
  EUR: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }),
  YEN: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'YEN',
  }),
};

// Character component
const Character = (props) => {
  return (
    <span data-value={props.value} class={`character ${props.className || ''}`}>
      <span class="character__track" style={{ '--v': props.value }}>
        <span key="nine-9">9</span>
        <For each={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}>
          {(val) => <span key={`num-${val}`}>{val}</span>}
        </For>
        <span key="zero-0">0</span>
      </span>
    </span>
  );
};

// Counter component
const Counter = (props) => {
  const padCount = props.pad
    ? props.config.max.toFixed(2).toString().length - props.value.toString().length
    : 0;

  const paddedValue = props.value
    .toString()
    .padStart(props.value.toString().length + padCount, '1');

  let i = 0;
  const renderValue = FORMATTERS[props.currency]
    .format(paddedValue)
    .split('')
    .map((character) => {
      if (!isNaN(parseInt(character, 10)) && i < padCount) {
        i++;
        return '0';
      }
      return character;
    })
    .join('');

  return (
    <div class="counter">
      <fieldset>
        <legend>MRR</legend>
        <h2>
          <span class="sr-only">{renderValue}</span>
          <span aria-hidden="true" class="characters">
            {renderValue.split('').map((character, index) => {
              if (isNaN(parseInt(character, 10)))
                return (
                  <span key={`symbol-${index}-${character}`} class="character character--symbol">
                    {character}
                  </span>
                );
              return (
                <Character
                  key={`char-${index}-${character}`}
                  value={character}
                  className={index > renderValue.split('').length - 3 ? 'fraction' : ''}
                />
              );
            })}
          </span>
        </h2>
      </fieldset>
    </div>
  );
};

// Main component
export default function MRRCounter() {
  // Initial config
  const [config, setConfig] = createStore({
    min: 0,
    max: 20000,
    step: 0.01,
    value: 12010.0,
    pad: true,
    explode: false,
    ease: 'elastic.inOut',
    transition: 2,
    currency: 'USD',
    easeOptions: ['back', 'basic', 'bounce', 'circ', 'elastic', 'expo', 'power', 'sine'],
    currencyOptions: ['USD', 'GBP', 'EUR'],
  });

  const [value, setValue] = createSignal(config.value.toFixed(2));
  const [pad, setPad] = createSignal(config.pad);
  const [currency, setCurrency] = createSignal(config.currency);

  // Controller references for dat.gui
  let minController;
  let maxController;
  let stepController;
  let padController;
  let transitionController;
  let currencyController;
  let valueController;
  let easeController;
  let gui;

  // Update function to sync all controls
  const updateControls = () => {
    minController.max(config.max - 1);
    maxController.min(config.min + 1);
    stepController.max(config.max);
    valueController.max(config.max);
    valueController.min(config.min);
    valueController.step(config.step);

    setPad(config.pad);
    setCurrency(config.currency);
    setValue(config.value.toFixed(2));

    document.documentElement.style.setProperty('--transition', config.transition);
    document.documentElement.style.setProperty('--ease', `var(--${config.ease})`);
  };

  // Set up the dat.gui controller
  onMount(() => {
    gui = new dat.GUI({ width: 320 });
    const valueFolder = gui.addFolder('Config');

    minController = valueFolder
      .add(config, 'min', 0, config.max - 1, 1)
      .name('Min')
      .onChange(() => updateControls());

    maxController = valueFolder
      .add(config, 'max', config.min + 1, 1000000, 1)
      .name('Max')
      .onChange(() => updateControls());

    stepController = valueFolder
      .add(config, 'step', 0.01, config.max, 0.01)
      .name('Step')
      .onChange(() => updateControls());

    padController = valueFolder
      .add(config, 'pad')
      .name('Pad')
      .onChange(() => updateControls());

    currencyController = valueFolder
      .add(config, 'currency', config.currencyOptions)
      .name('Currency')
      .onChange(() => updateControls());

    transitionController = gui
      .add(config, 'transition', 0, 5, 0.05)
      .name('Transition (s)')
      .onChange(() => updateControls());

    easeController = gui
      .add(config, 'ease', config.easeOptions)
      .name('Easing')
      .onChange(() => updateControls());

    valueController = gui
      .add(config, 'value', config.min, config.max, config.step)
      .name('Value')
      .onChange(() => updateControls());

    gui
      .add(config, 'explode')
      .name('Explode?')
      .onChange(() => {
        document.documentElement.toggleAttribute('data-explode');
      });

    updateControls();
  });

  return (
    <div id="app">
      <Counter pad={pad()} value={value()} currency={currency()} config={config} />
      <Counter pad={pad()} value={value()} currency={currency()} config={config} />
    </div>
  );
}
