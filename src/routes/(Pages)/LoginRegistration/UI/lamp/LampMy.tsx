import style from './LampMy.module.scss';
function LampMy() {
  return (
    <>
      <div class={`${style.container} CM`}>
        <div class={`${style.line} CM -mt-5`} />
        <div class={`${style.bulb} CM`} />
        
      </div>
      <img src='/hh.png' class=' mt-[90%] ml-180 w-350'></img>
    </>
  );
}

export default LampMy;
