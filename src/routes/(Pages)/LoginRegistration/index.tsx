import { onCleanup, onMount } from "solid-js";
import { setShowMenu } from "~/components/Menus/Menu";
import ProgressBar from "./UI/ProgressBar";

function index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  return (
    <>
    <div class="CM">
     <ProgressBar />
    </div>
    </>
  )
}

export default index