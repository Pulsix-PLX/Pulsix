import { onMount } from "solid-js";
import Card from "./(Pages)/Wallets/_components/Card3D";
import splineLoader from "./(Pages)/Wallets/_components/Card3D/preLoader";
import Select from "~/components/Inputs/select";
export default  function index() {


   const v = ['CHF', 'USD', 'EUR', 'GBP', 'JPY'];
  return (
    <>
    <div class='flex flex-row ml-200'>
      <Select options={v} placeholder="prova" name="prova"></Select>
    </div>
    </>
  )
}

