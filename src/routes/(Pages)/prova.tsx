import { useAction } from "@solidjs/router";
import Title from "~/components/Title";
import { usernameAlreadyexist } from "../API/prova";
import { createSignal } from "solid-js";

function Prova() {
  const check = useAction(usernameAlreadyexist);
  const handleCheck = async () => {
    const response = await check();
    console.log(response)
  };
   handleCheck();
  return (
    <>
      
      <button onClick={handleCheck} class="bg-white CM">Esegui Action</button>
      
      
    </>
  );
}

export default Prova;
