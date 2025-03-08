// App.jsx
import { createSignal, createEffect, onMount, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import './Lightning.scss';

// Configurazione iniziale
const INITIAL_CONFIG = {
  min: 0,
  max: 20000,
  step: 0.01,
  value: 12010.0,
  pad: true,
  explode: false,
  transition: 2,
  currency: 'USD',
  ease: 'elastic',
  easeOptions: [
    'back',
    'basic',
    'bounce',
    'circ',
    'elastic',
    'expo',
    'power',
    'sine',
  ],
  currencyOptions: ['USD', 'GBP', 'EUR'],
};

// Formattatori per le valute
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
};

// Componente Character
const Character = (props:any) => {
  return (
    <span data-value={props.value} class={`character ${props.class || ''}`}>
      <span class="character__track" style={{ '--v': props.value }}>
        <span>9</span>
        <For each={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}>
          {(val, index) => <span>{val}</span>}
        </For>
        <span>0</span>
      </span>
    </span>
  );
};

// Componente Counter
const Counter = (props:any) => {
  const padCount = () => 
    props.pad
      ? INITIAL_CONFIG.max.toFixed(2).toString().length - props.value.toString().length
      : 0;

  const paddedValue = () => 
    props.value
      .toString()
      .padStart(props.value.toString().length + padCount(), '1');

  const renderValue = () => {
    let i = 0;
    return FORMATTERS[props.currency]
      .format(paddedValue())
      .split('')
      .map((character:any) => {
        if (!isNaN(parseInt(character, 10)) && i < padCount()) {
          i++;
          return '0';
        }
        return character;
      })
      .join('');
  };

  return (
    <div class="counter">
      <fieldset>
        <legend>MRR</legend>
        <h2>
          <span class="sr-only">{renderValue()}</span>
          <span aria-hidden="true" class="characters">
            <For each={renderValue().split('')}>
              {(character, index) => {
                if (isNaN(parseInt(character, 10)))
                  return (
                    <span class="character character--symbol">
                      {character}
                    </span>
                  );
                
                const isDecimal = index() > renderValue().split('').length - 3;
                
                return (
                  <Character
                    value={character}
                    class={isDecimal ? 'fraction' : ''}
                  />
                );
              }}
            </For>
          </span>
        </h2>
      </fieldset>
    </div>
  );
};

// Componente App principale
export default function Text() {
  const [config, setConfig] = createStore({
    ...INITIAL_CONFIG
  });
  const [value, setValue] = createSignal(INITIAL_CONFIG.value.toFixed(2));
  
  // Funzione di aggiornamento
  const updateConfig = (updates:any) => {
    setConfig(prev => ({ ...prev, ...updates }));
    
    document.documentElement.style.setProperty(
      '--transition',
      config.transition
    );
    document.documentElement.style.setProperty(
      '--ease',
      `var(--${config.ease})`
    );
    
    setValue(config.value.toFixed(2));
  };
  
  // Setup dei controlli
  onMount(() => {
    // In SolidStart non possiamo usare dat.gui direttamente nel bundle
    // Aggiungiamo i controlli solo se la libreria è disponibile
    if (typeof window !== 'undefined') {
      import('dat.gui').then(({ GUI }) => {
        const CTRL = new GUI({ width: 320 });
        const valueFolder = CTRL.addFolder('Config');
        
        valueFolder.add(config, 'min', 0, config.max - 1, 1)
          .name('Min')
          .onChange(val => {
            updateConfig({ min: val });
          });
          
        valueFolder.add(config, 'max', config.min + 1, 1000000, 1)
          .name('Max')
          .onChange(val => {
            updateConfig({ max: val });
          });
          
        valueFolder.add(config, 'step', 0.01, config.max, 0.01)
          .name('Step')
          .onChange(val => {
            updateConfig({ step: val });
          });
          
        valueFolder.add(config, 'pad')
          .name('Pad')
          .onChange(val => {
            updateConfig({ pad: val });
          });
          
        valueFolder.add(config, 'currency', config.currencyOptions)
          .name('Currency')
          .onChange(val => {
            updateConfig({ currency: val });
          });
          
        CTRL.add(config, 'transition', 0, 5, 0.05)
          .name('Transition (s)')
          .onChange(val => {
            updateConfig({ transition: val });
          });
          
        CTRL.add(config, 'ease', config.easeOptions)
          .name('Easing')
          .onChange(val => {
            updateConfig({ ease: val });
          });
          
        CTRL.add(config, 'value', config.min, config.max, config.step)
          .name('Value')
          .onChange(val => {
            updateConfig({ value: val });
          });
          
        CTRL.add(config, 'explode')
          .name('Explode?')
          .onChange(() => {
            document.documentElement.toggleAttribute('data-explode');
          });
      }).catch(err => {
        console.error('Failed to load dat.gui:', err);
      });
    }
  });

  return (
    <div id="app">
      <Counter pad={config.pad} value={value()} currency={config.currency} />
      <Counter pad={config.pad} value={value()} currency={config.currency} />
    </div>
  );
}