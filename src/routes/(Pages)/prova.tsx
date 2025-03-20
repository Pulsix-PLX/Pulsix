import { useAction } from "@solidjs/router";
import Title from "~/components/Title";
import { provaAction } from "../API/prova";
import { createSignal } from "solid-js";

function Prova() {
  // Inizializza l'action
  const execute = useAction(provaAction);
  const [result, setResult] = createSignal();
  
  // Funzione per gestire l'esecuzione dell'action
  const handleExecuteAction = async () => {
    const response = await execute();
    setResult(response);
  };

  return (
    <>
      <Title title="prova" />
      <button onClick={handleExecuteAction} class="bg-white CM">Esegui Action</button>
      
      {/* Mostra i risultati se disponibili */}
      {result() && (
        <div>
          <h2>Risultato:</h2>
          <pre>{JSON.stringify(result(), null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default Prova;
