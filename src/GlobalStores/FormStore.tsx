import { createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";

interface FormState {
  [key: string]: any;
}

interface FormValuesState {
  [key: string]: any;
}

export const [Form, SetForm] = createStore<FormState>({});
export const [FormValues, SetFormValues] = createStore<FormValuesState>({});

// Remove a specific field from the Form store
export const removeFormField = (key: string) => {
  SetForm(
    produce((draft) => {
      delete draft[key];
    })
  );
};
// Completely reset the Form store
export const resetForm = () => {
  SetForm(produce(() => ({})));
};

// Completely reset the FormValues store
export const resetFormValues = () => {
  SetFormValues(produce(() => ({})));
};

// Reset both stores completely
export const resetAllFormData = () => {
  resetForm();
  resetFormValues();
};

// Check if all inputs are valid
export const allInputsValid = createMemo(() => {
  const keys = Object.keys(Form);
  if (keys.length === 0) return false;
  
  // Check that all fields are true
  return keys.every((key) => Form[key] === true);
});

// Utility methods

// Retrieve a value
export const getFormValue = (key: string) => {
  return FormValues[key];
};


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
