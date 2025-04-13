import Card from "./(Pages)/Wallets/_components/Card3D";
import splineLoader from "./(Pages)/Wallets/_components/Card3D/preLoader";
export default  function index() {
  const timeoutId = setTimeout(() => {
    splineLoader.preloadRuntime();
 }, 500); // Ritardo breve (es. 500ms)
  return (
    <>
    <div class='flex flex-row'>

    </div>
    </>
  )
}

