import { createSignal, Show } from 'solid-js'
import './Input.css'

interface InputProps {
  name: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date' | 'color';
  placeholder?: string;
  required?: boolean;
  label?: string;
  class?: string;
  style?: string;
  onInput?: (e: any) => void;
  onChange?: (e: any) => void;
  initialValue?: string;
}

export default function InputField(props: InputProps) {
  // Crea un segnale locale per ogni istanza del componente
  const [value, setValue] = createSignal(props.initialValue || '');
  const [clearing, setClearing] = createSignal(false);

  const clearInput = () => {
    setClearing(true);
    setTimeout(() => {
      setValue('');
      setClearing(false);
      // Notifica il componente genitore del cambiamento
      const event = new Event('input', { bubbles: true });
      const inputElement = document.querySelector(`input[name="${props.name}"]`);
      if (inputElement) {
        inputElement.dispatchEvent(event);
      }
    }, 1000);
  };

  // Gestisce l'input mantenendo lo stato locale e passando l'evento al genitore
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    
    // Passa l'evento al genitore se è stata fornita una funzione onInput
    if (props.onInput) {
      props.onInput(e);
    }
  };

  return (
    <>
      <div class="input-wrapper">
        <input
          name={props.name}
          type={props.type || 'text'}
          class={`fancy-input ${props.class} ${clearing() ? 'text-clear' : ''}`}
          placeholder=""
          onInput={handleInput}
          onChange={handleInput}
          value={value()}
        />
        <label class={`input-label ${clearing() ? 'text-clear' : ''}`}>
          {props.placeholder}
        </label>
        <div class="input-underline">
          <div class={`clear-wave ${clearing() ? 'active' : ''}`}></div>
        </div>
        <div class="form-group__actions">
          <Show when={value().length > 0}>
            <button
              class="visible absolute text-white -ml-17 text-m mt-15"
              style={{width:'20px', height:'20px'}}
              onClick={clearInput}
              disabled={clearing()}
            >
              x
            </button>
          </Show>
        </div>
      </div>
    </>
  );
}
