import { createSignal, For, JSX, onMount, createEffect } from 'solid-js';
import './select.scss'; // Assicurati che il percorso sia corretto

interface DropdownProps {
  name: string;
  options?: string[];
  values?: (string | number)[];
  placeholder?: string;
  initialValue?: string | number;
  onSelect?: (selectedValue: string | number | undefined, selectedOption: string | undefined) => void;
  class?: string;
  style?: string;
  // Aggiungiamo di nuovo onInput, ma definiamo precisamente cosa passeremo
  onInput?: (event: { target: { value: string | number | undefined } }) => void;
}

export default function Select(props: DropdownProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [value, setValue] = createSignal<string | number | undefined>(props.initialValue);
  const [selectedOptionText, setSelectedOptionText] = createSignal<string | undefined>(props.placeholder || 'Select an option');

  createEffect(() => {
    const initialVal = props.initialValue;
    if (initialVal !== undefined && props.values && props.options) {
      const initialIndex = props.values.findIndex(v => v === initialVal);
      if (initialIndex !== -1 && props.options[initialIndex] !== undefined) {
        setSelectedOptionText(props.options[initialIndex]);
        setValue(initialVal);
      } else {
         setSelectedOptionText(props.placeholder || 'Select an option');
         setValue(undefined);
      }
    } else if (initialVal === undefined) {
        setSelectedOptionText(props.placeholder || 'Select an option');
        setValue(undefined);
    }
  });

  const handleSelect = (selectedValue: string | number | undefined, optionText: string) => {
    setValue(selectedValue); // Aggiorna l'ID selezionato
    setSelectedOptionText(optionText); // Aggiorna il testo visualizzato
    setIsOpen(false); // Chiudi il dropdown

    // Chiama onSelect con entrambi i valori (ID e testo)
    props.onSelect?.(selectedValue, optionText);

    // --- SIMULAZIONE PER onInput ---
    // Se il padre ha fornito un handler onInput, glielo passiamo
    // creando un oggetto che imita la struttura { target: { value: ... } }
    if (props.onInput) {
      props.onInput({ target: { value: selectedValue } });
      // NOTA: Questo è un oggetto simulato, non un vero Event.
      // Funzionerà solo se il padre legge esclusivamente event.target.value.
    }
    // -----------------------------
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen());
  };

  let dropdownRef: HTMLDivElement | undefined;
  const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
          setIsOpen(false);
      }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    // Cleanup implicito nel return di onMount o createEffect in Solid > 1.0
    // return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <>
      <input type='hidden' value={value() ?? ''} name={props.name} />
      <div
        ref={dropdownRef}
        class={`dropdown  ${props.class ?? ''} ${isOpen() ? 'open' : ''} ${value() !== undefined ? 'filled' : ''}`}
        style={props.style}
      >
        <span class="dropdown-selected-text" onClick={toggleDropdown}>
             {selectedOptionText()}
        </span>
        <ul>
          {(props.options && props.values && props.options.length === props.values.length) ? (
            <For each={props.options}>
              {(optionText, index) => {
                const optionValue = props.values![index()];
                return (
                  <li class={value() === optionValue ? 'active' : ''}>
                    <a onClick={() => handleSelect(optionValue, optionText)}>{optionText}</a>
                  </li>
                );
              }}
            </For>
          ) : (
            <li>Nessuna opzione valida</li>
          )}
        </ul>
      </div>
    </>
  );
}