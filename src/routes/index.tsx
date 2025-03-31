
import { onCleanup, onMount } from "solid-js";
import CanvasAnimation from "./UI/Waves";
import { setShowMenu } from "~/components/Menus/Menu";
import Title from "~/components/Title";
import './index.scss'


export default function Landing() {
    onMount(() => {
      setShowMenu(false);
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
      <div class="bg-red-500 try"></div>
    </>
  );
}
