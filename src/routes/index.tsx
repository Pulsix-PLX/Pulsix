
import { onCleanup, onMount } from "solid-js";
import CanvasAnimation from "./UI/Waves";
import { setShowMenu } from "~/components/Menus/Menu";
import Title from "~/components/Title";
import './index.scss'
import { useSession } from "vinxi/http";
import { getUser } from "~/Server/auth.server";



export default function Landing() {
    onMount(async() => {
      setShowMenu(false);
      console.log(await getUser())
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
