import style from './index.module.scss';
function Toggle() {
  return (
    <div class={`CM mt-225 ${style.toggle}`}>
      <div id='ContainerTexts'class='flex flex-row mt-[5%]'>
        <div class={`ml-20 ${style.login}`}>Login</div>
        <div class={`ml-150 ${style.registration}`}>Sign Up</div>
      </div>
    </div>
  );
}

export default Toggle;
