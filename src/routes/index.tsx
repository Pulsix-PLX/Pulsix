
import { onCleanup, onMount } from "solid-js";
import CanvasAnimation from "./UI/Waves";
import { setShowMenu } from "~/components/Menus/Menu";
import Title from "~/components/Title";



export default function Landing() {
    onMount(() => {
      setShowMenu(false);
    });
    onCleanup(() => {
      setShowMenu(true);
    });
  return (
    <>
     <img src='/public/logo.png' class='CM w-150'></img>
      
    </>
  );
}
