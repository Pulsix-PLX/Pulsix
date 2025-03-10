import { createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import { Form, SetForm } from "../../GlobalStores/FormStore";

interface InputProps {
  name: string;
  type: "text" | "password" | "email" | "number" | "date";
  placeholder?:string,
  required?: boolean;
  label?: string;
  class?: string;
  style?: string;
  ValidationSchema?: (value: any) => boolean;
}

export default function Input(props: InputProps) {
  onMount(() => {
    // Se il campo è richiesto, inizializzalo come non valido (false)
    // Se non è richiesto, inizializzalo come valido (true)
    if (props.required) {
      SetForm(props.name, false);
    } else {
      SetForm(props.name, true);
    }
  });

  // Globals
  const [loading, setLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [touched, setTouched] = createSignal<boolean>(false);
  // Input
  const [value, setValue] = createSignal("");
  const [hidePassword, setHidePassword] = createSignal(true);

  // Schema Validation
  function validateInput(e: Event) {
    // Imposta touched a true quando l'utente interagisce con l'input
    setTouched(true);
    
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;
    
    // Aggiorna il valore locale
    setValue(inputValue);
  
    console.log(props.name, value());
  
    // Se il campo non è richiesto e vuoto, impostalo su true
    if (!props.required && inputValue === "") {
      SetForm(props.name, true);
      return; // Esci dalla funzione per evitare ulteriori validazioni
    }
  
    // Se è presente uno schema di validazione personalizzato, usalo
    if (props.ValidationSchema) {
      const response = props.ValidationSchema(inputValue);
      SetForm(props.name, response);
      return;
    }
  
    // Altrimenti usa la validazione predefinita
    defaultValidationSchema(inputValue);
  }
  

  function defaultValidationSchema(inputValue: string) {
    if (!inputValue && props.required) {
      SetForm(props.name, false);
      setErrorMessage('Provide something');
      return;
    }
    
    console.log(Form);
    
    // Default Validation Schema
    switch (props.type) {
      case "text":
        if (!inputValue) {
          SetForm(props.name, false);
          setErrorMessage('Provide something');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;
        
      case "password":
        // At least 8 characters
        if (inputValue.length < 8) {
          SetForm(props.name, false);
          setErrorMessage('At least 8 characters');
          return;
        }
        // At least one uppercase letter
        if (!/[A-Z]/.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('At least one uppercase letter');
          return;
        }
        // At least one number
        if (!/[0-9]/.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('At least one number');
          return;
        }
        SetForm(props.name, true);
        setErrorMessage('');
        break;
        
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci un indirizzo email valido');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;
        
      case "number":
        const isNumber = !isNaN(Number(inputValue));
        if (!isNumber) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci un numero valido');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;
        
      case "date":
        const dateValid = !isNaN(Date.parse(inputValue));
        if (!dateValid) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci una data valida');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;
    }
  }

  return (
    <div class="input-container">
      {props.label && (
        <label for={props.name}>{props.label}</label>
      )}
      
      <Switch>
        <Match when={props.type === "password"}>
          <div class="password-input-wrapper">
            <input
              id={props.name}
              name={props.name}
              placeholder={props.placeholder}
              class={props.class}
              style={props.style}
              type={hidePassword() ? "password" : "text"}
              onInput={validateInput}
              onChange={validateInput}
            />
            <button 
              type="button" 
              class="toggle-password"
              onClick={() => setHidePassword(!hidePassword())}
            >
              {hidePassword() ? "Show" : "Hide"}
            </button>
          </div>
        </Match>
        
        <Match when={props.type === "text"}>
          <input
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="text"
            onInput={validateInput}
            onChange={validateInput}
          />
        </Match>
        
        <Match when={props.type === "email"}>
          <input
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="email"
            onInput={validateInput}
            onChange={validateInput}
          />
        </Match>
        
        <Match when={props.type === "number"}>
          <input
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="number"
            onInput={validateInput}
            onChange={validateInput}
          />
        </Match>
        
        <Match when={props.type === "date"}>
          <input
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="date"
            onInput={validateInput}
            onChange={validateInput}
          />
        </Match>
      </Switch>
      
      {/* Mostra il messaggio di errore solo se il campo è stato toccato.*/}
      {touched() && errorMessage() && (
        <div class="error-message">{errorMessage()}</div>
      )}
    </div>
  );
}