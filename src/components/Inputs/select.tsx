// src/components/Dropdown.tsx
import { createSignal, For, JSX } from 'solid-js';
import './select.scss';
import {value,setValue} from './Inputs'
interface DropdownProps {
  name:string
  options?: any[];
  onInput?: any;
  placeholder?: string;
  onSelect?: (selected: string) => void;
  class?:string,
  style?:string
}

export default function Select(props: DropdownProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedOption, setSelectedOption] = createSignal(props.placeholder || 'Select an option');

  const handleSelect = (option: string,) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onSelect?.(option);
    const target = option;
    setValue(target);
    
    // Passa l'evento al genitore se è stata fornita una funzione onInput
    if (props.onInput) {
      props.onInput(e);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen());
  };

  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = e.currentTarget as HTMLElement;
    if (!dropdown.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
    <input type='hidden' value={selectedOption()} name={props.name} />
    <div 
      class={`dropdown ${props.class} ${isOpen() ? 'open' : ''} ${selectedOption() !== props.placeholder ? 'filled' : ''}`} 
      onClick={toggleDropdown}
      style={props.style}
      onBlur={handleClickOutside as unknown as JSX.EventHandlerUnion<HTMLDivElement, FocusEvent>}
    >
      <span>{selectedOption()}</span>
      <ul>
        <For each={props.options}>
          {(option) => (
            <li class={selectedOption() === option ? 'active' : ''}>
              <a onClick={(e) => handleSelect(option)}>{option}</a>
            </li>
          )}
        </For>
      </ul>
    </div>
    </>
  );
}