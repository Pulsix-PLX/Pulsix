import style from './index.module.scss';
import { value } from '../riv';
export default function Toggle() {
  return (
    <>
    <div class='flex flex-col'>
      <div class={`ml-10 ${style.toggle}`}></div>
      <div id="ContainerTexts" class="mt-15 flex flex-row z-20">
        <div class={`ml-40  ${value() ? style.activeText : style.text}`}>Login</div>
        <div class={`ml-120 ${value() ? style.text : style.activeText}`}>Sign Up</div>
      </div>
    </div>
    </>
  );
}
