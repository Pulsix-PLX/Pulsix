import './ButtonProva.scss'
function ButtonProva() {
  
  return (
    <>
    <button class='animatedButton ml-200 mt-50'><p>Bottone</p></button>
    <div class="container ml-200">
    <div class="box w-160 h-70"><p>Effetto Fulmine</p></div>
    <svg class="lightning-path" viewBox="0 0 240 110">

      <defs>
        <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.453)" />
          <stop offset="50%" stop-color="rgba(255, 255, 255, 0.253)" /> 
          <stop offset="100%" stop-color="white" /> 
        </linearGradient>
      </defs>
      

      <rect x="40" y="20" width="160" height="70" rx="32" ry="32" class="lightning-main" />
    </svg>
  </div>
    </>
  )
}

export default ButtonProva