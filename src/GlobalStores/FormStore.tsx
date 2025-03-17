import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";

interface FormState {
  [key: string]: any;
}

interface FormValuesState {
  [key: string]: any;
}

export const [Form, SetForm] = createStore<FormState>({});
export const [FormValues, SetFormValues] = createStore<FormValuesState>({});

// Verifica se tutti gli input sono validi
export const allInputsValid = createMemo(() => {
  const keys = Object.keys(Form);
  if (keys.length === 0) return false;
  
  // Verifica che tutti i campi siano true
  return keys.every((key) => Form[key] === true);
});

// Basic implemention
/*
 /Da richiamare in ogni file utilizzato per ripulire

onMount(() => {
    // Imposta esplicitamente i campi richiesti come non validi all'avvio
    SetForm({});
    SetFormValues({});
  });
  
      <form
        action={isAdmin}
        method="post"
        onSubmit={(e) => {
          if (!allInputsValid()) {
            e.preventDefault();
            alert("Controlla i tuoi input!");
          }
        }}
      >
        <CompleteInputs
          name="password"
          type="password"
          required={true}
          placeholder="ciao"
        />
                <button type="submit" disabled={!allInputsValid()}>
          Verifica
        </button>
      </form>
        */
