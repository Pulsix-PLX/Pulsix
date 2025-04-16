import { onMount } from "solid-js"; // Tieni solo se usato
import Card from "./(Pages)/Wallets/_components/Card3D"; // Tieni se usato
import splineLoader from "./(Pages)/Wallets/_components/Card3D/preLoader"; // Tieni se usato
import Select from "~/components/Inputs/select";

// Convenzione: usa PascalCase per i nomi dei componenti
export default function IndexPage() {


  const v = ['CHF', 'USD', 'EUR', 'GBP', 'JPY'];

  return (
    <>
      <div class='flex flex-row ml-200'> {/* Controlla la classe ml-200, forse volevi usare utility Tailwind? */}
        <Select options={v} placeholder="prova" name="prova"></Select>


      </div>
    </>
  )
}

