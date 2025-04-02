import style from './index.module.scss';
import { value } from '../riv';
export default function Toggle() {
  return (
    <>
    <div class='CM flex flex-col'>
      <div class={`${style.toggle}`}></div>
      <div id="ContainerTexts" class="mt-[1vw] flex flex-row z-20 w-[4.5vw] h-[0.8vw]" style={{"text-align":'center'}}>
        <div class={`ml-[45%] text-center ${value() ? style.activeText : style.text}`}>Login</div>
        <div class={`ml-[150%] align-middle ${value() ? style.text : style.activeText}`}>SignUp</div>
      </div>
    </div>
    </>
  );
}
