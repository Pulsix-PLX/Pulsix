
import { onCleanup, onMount } from "solid-js";
import CanvasAnimation from "./UI/Waves";
import { setShowMenu } from "~/components/Menus/Menu";
import Title from "~/components/Title";
import './index.scss'
import { getAuth } from "~/GlobalStores/AuthStore";


export default function Landing() {
    onMount(() => {
      setShowMenu(false);
        console.log(getAuth('userId'), getAuth('username'))
    });
    onCleanup(() => {
      setShowMenu(true);
    });
  return (
    <>
    <div class="CM flex flex-row">
     <img src='/public/logo.png' class='absolute w-150 mt-25 -ml-150'></img>
      <p class="mt-75 -ml-30 logo">ULSIX</p>
      </div>
    </>
  );
}
