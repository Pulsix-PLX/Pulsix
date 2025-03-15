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
    <ProgressBar />
    </>
  )
}

export default index