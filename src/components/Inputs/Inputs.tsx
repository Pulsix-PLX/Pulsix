import { createSignal, Match, onMount, Switch, createEffect } from 'solid-js';
import { Form, SetForm, FormValues, SetFormValues } from '../../GlobalStores/FormStore';
import InputPassword from './InputPassword';
import InputField from './Input';
import { usernameAlreadyexist } from '~/routes/API/Auth/registration/credentials/usernameAlreadyexist';
import { useAction } from '@solidjs/router';
import { phoneAlreadyexist } from '~/routes/API/Auth/registration/phone/phoneAlreadyexist';
import { emailAlreadyexist } from '~/routes/API/Auth/registration/email/emailAlreadyexist';
import Select from './select';

interface InputProps {
  name: string;
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'passwordConfirm'
    | 'username'
    | 'phoneNumber'
    | 'usernameLogin'
    | 'color'
    | 'select';
  options?: any[];
  placeholder?: string;
  required?: boolean;
  label?: string;
  class?: string;
  style?: string;
  mountOn?: boolean;
  defaultValue?: string;
  ValidationSchema?: (value: any) => boolean;
}
export const [value, setValue] = createSignal('');
export default function Input(props: InputProps) {
  //actions
  const checkUsername = useAction(usernameAlreadyexist);
  const checkPhone = useAction(phoneAlreadyexist);
  const checkEmail = useAction(emailAlreadyexist);
  // Stato locale per questo componente
  const [loading, setLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [touched, setTouched] = createSignal<boolean>(false);

  onMount(() => {
    // Se il campo è richiesto, inizializzalo come non valido (false)
    // Se non è richiesto, inizializzalo come valido (true)
    if (props.required) {
      if (props.mountOn != false) {
        SetForm(props.name, false);
      }
    } else {
      SetForm(props.name, true);
    }
  });

  // Rivalidare passwordConfirm quando password cambia
  createEffect(() => {
    if (props.type === 'password' && FormValues.passwordConfirm) {
      // Rivalidare passwordConfirm quando password cambia
      const confirmInput = document.querySelector('[name="passwordConfirm"]') as HTMLInputElement;
      if (confirmInput && confirmInput.value) {
        const event = new Event('input', { bubbles: true });
        confirmInput.dispatchEvent(event);
      }
    }
  });

  // Schema Validation
  function validateInput(e: Event) {
    // Imposta touched a true quando l'utente interagisce con l'input
    setTouched(true);

    const target = e.target as HTMLInputElement;
    const inputValue = target.value;

    // Aggiorna il valore locale
    setValue(inputValue);

    // Salva il valore dell'input nello store
    SetFormValues(props.name, inputValue);

    console.log(props.name, value());

    // Se il campo non è richiesto e vuoto, impostalo su true
    if (!props.required && inputValue === '') {
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

  async function defaultValidationSchema(inputValue: string) {
    if (!inputValue && props.required) {
      SetForm(props.name, false);
      setErrorMessage('Provide something');
      return;
    }

    console.log(Form);

    // Default Validation Schema
    switch (props.type) {
      case 'text':
        if (!inputValue) {
          SetForm(props.name, false);
          setErrorMessage('Provide something');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;

      case 'password':
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

      case 'passwordConfirm':
        // Confronta con il valore della password
        if (inputValue !== FormValues.password) {
          SetForm(props.name, false);
          setErrorMessage('Le password non corrispondono');
          return;
        }
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
      case 'usernameLogin':
        try {
          console.log('Validating username:', inputValue);
          const response = await checkUsername(inputValue);
          console.log('Username check response:', response);

          if (response === 'already exist') {
            SetForm(props.name, true);
            setErrorMessage('');
          } else if (response.startsWith('error:')) {
            SetForm(props.name, false);
            setErrorMessage(`Errore verifica username: ${response.split(':')[1]}`);
          } else {
            SetForm(props.name, false);
            setErrorMessage('Username not found');
          }
        } catch (error) {
          console.error('Error in username validation:', error);
          setLoading(false);
          SetForm(props.name, false);
          setErrorMessage('Errore generico di verifica');
        }
        break;
      case 'username':
        try {
          console.log('Validating username:', inputValue);
          const response = await checkUsername(inputValue);
          console.log('Username check response:', response);

          if (response === 'already exist') {
            SetForm(props.name, false);
            if (props.type == 'username') {
              setErrorMessage('Username already exist');
            } else {
              setErrorMessage('');
            }
          } else if (response.startsWith('error:')) {
            SetForm(props.name, false);
            setErrorMessage(`Errore verifica username: ${response.split(':')[1]}`);
          } else {
            SetForm(props.name, true);

            setErrorMessage('Username avaible');
          }
        } catch (error) {
          console.error('Error in username validation:', error);
          setLoading(false);
          SetForm(props.name, false);
          setErrorMessage('Errore generico di verifica');
        }
        break;

      case 'phoneNumber':
        // Rimuovi eventuali spazi e trattini
        const cleanedNumber = inputValue.replace(/[\s-]/g, '');

        // Controllo che siano solo numeri
        if (!/^\d+$/.test(cleanedNumber)) {
          SetForm(props.name, false);
          setErrorMessage('Phone number must contain only digits');
          return;
        }

        // Controllo lunghezza (ad esempio tra 7 e 10 cifre dopo il prefisso)
        if (cleanedNumber.length < 7 || cleanedNumber.length > 10) {
          SetForm(props.name, false);
          setErrorMessage('Invalid phone number length');
          return;
        }

        // Controllo che non inizi con zeri non significativi
        if (cleanedNumber.startsWith('0')) {
          SetForm(props.name, false);
          setErrorMessage('Phone number should not start with unnecessary zeros');
          return;
        }

        const response = await checkPhone(inputValue);
        ////   Controllo che non ci siano gia numeri registrati come quello inserito /////
        if (response === 'already exist') {
          SetForm(props.name, false);
          setErrorMessage('Phone number already associated to another account');
          return;
        } else if (response.startsWith('error:')) {
          SetForm(props.name, false);
          setErrorMessage(`Errore verifica phone: ${response.split(':')[1]}`);
          return;
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }

        // Validazione passata
        SetForm(props.name, true);
        setErrorMessage('');
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci un indirizzo email valido');
          return;
        } else {
          setErrorMessage('');
        }
        const res = await checkEmail(inputValue);
        ////   Controllo che non ci siano gia numeri registrati come quello inserito /////
        console.log(res);
        if (res === 'already exist') {
          SetForm(props.name, false);
          setErrorMessage('Email already associated to another account');
          return;
        } else if (res.startsWith('error:')) {
          SetForm(props.name, false);
          setErrorMessage(`Errore verifica phone: ${res.split(':')[1]}`);
          return;
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }

        break;

      case 'number':
        const isNumber = !isNaN(Number(inputValue));
        if (!isNumber) {
          SetForm(props.name, false);
          setErrorMessage('Inserisci un numero valido');
        } else {
          SetForm(props.name, true);
          setErrorMessage('');
        }
        break;

      case 'date':
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
      {props.label && <label for={props.name}>{props.label}</label>}

      <Switch>
        <Match when={props.type === 'select'}>
          <Select
            name={props.name}
            onInput={validateInput}
            options={props.options}
            class={props.class}
            style={props.style}
            placeholder={props.defaultValue}
          />
        </Match>

        <Match when={props.type === 'password'}>
          <InputPassword
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="password"
            onInput={validateInput}
            initialValue={props.defaultValue}
          />
        </Match>

        <Match when={props.type === 'passwordConfirm'}>
          <InputPassword
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="password"
            onInput={validateInput}
          />
        </Match>

        <Match when={props.type === 'username' || props.type === 'usernameLogin'}>
          <InputField
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="text"
            onInput={validateInput}
          />
        </Match>

        <Match when={props.type === 'text'}>
          <InputField
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="text"
            onInput={validateInput}
            initialValue={props.defaultValue}
          />
        </Match>
        <Match when={props.type === 'phoneNumber'}>
          <InputField
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="text"
            onInput={validateInput}
          />
        </Match>
        <Match when={props.type === 'email'}>
          <InputField
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="text"
            onInput={validateInput}
            initialValue={value()}
          />
        </Match>

        <Match when={props.type === 'number'}>
          <input
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="number"
            onInput={validateInput}
            onChange={validateInput}
          />
        </Match>

        <Match when={props.type === 'date'}>
          <input
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="date"
            onInput={validateInput}
            onChange={validateInput}
          />
        </Match>
        <Match when={props.type === 'color'}>
          <input
            name={props.name}
            placeholder={props.placeholder}
            class={props.class}
            style={props.style}
            type="color"
            onInput={validateInput}
            value={props.defaultValue}
          />
        </Match>
      </Switch>

      {/* Mostra il messaggio di errore solo se il campo è stato toccato.*/}
      {touched() && errorMessage() && (
        <div class="error-message" style={{ color: 'var(--Secondary)' }}>
          {errorMessage()}
        </div>
      )}
    </div>
  );
}
